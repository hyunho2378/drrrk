import SwiftUI

/// 피그마 화면(390 x 844) 좌표를 지금 기기 화면 좌표로 바꾼다. 배경 장면은 화면을 꽉 채우게(cover) 놓이므로
/// 장면 위에 얹는 것(의자 이름표, 테이블, 떨어진 주전부리)은 같은 비율과 같은 가운데 기준으로 옮긴다.
struct SceneMap {
    let size: CGSize
    var scale: CGFloat {
        max(size.width / 390, size.height / 844)
    }

    var dx: CGFloat {
        (size.width - 390 * scale) / 2
    }

    var dy: CGFloat {
        (size.height - 844 * scale) / 2
    }

    func point(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
        CGPoint(x: dx + x * scale, y: dy + y * scale)
    }

    func rect(_ r: CGRect) -> CGRect {
        CGRect(origin: point(r.minX, r.minY), size: CGSize(width: r.width * scale, height: r.height * scale))
    }
}

struct RoomView: View {
    @State private var model = RoomModel()
    @State private var drag: (id: String, asset: String, at: CGPoint)?
    @State private var overTable = false
    @Namespace private var dockSpace

    var body: some View {
        GeometryReader { geo in
            let map = SceneMap(size: geo.size)
            ZStack(alignment: .topLeading) {
                Image("room-scene")
                    .resizable()
                    .scaledToFill()
                    .frame(width: geo.size.width, height: geo.size.height)
                    .clipped()

                sceneLayer(map)

                LinearGradient(colors: [.black.opacity(0), .black.opacity(0.7)], startPoint: .top, endPoint: .bottom)
                    .frame(height: 334)
                    .frame(maxHeight: .infinity, alignment: .bottom)
                    .allowsHitTesting(false)

                chrome(map)

                if let d = drag {
                    Image(d.asset).resizable().scaledToFit()
                        .frame(width: 40, height: 40)
                        .position(d.at)
                        .allowsHitTesting(false)
                }
            }
            .coordinateSpace(name: "room")
        }
        .ignoresSafeArea()
        .background(DS.Palette.bgBase)
        .task { await rotateSpeakers() }
    }

    // MARK: 장면 위에 얹는 것

    @ViewBuilder
    private func sceneLayer(_ map: SceneMap) -> some View {
        let table = map.rect(RoomModel.tableDrop)
        Ellipse()
            .fill(DS.Palette.success.opacity(0.16))
            .overlay(Ellipse().strokeBorder(DS.Palette.success, lineWidth: 2))
            .frame(width: table.width - 20, height: table.height - 70)
            .position(x: table.midX, y: table.minY + 30 + (table.height - 70) / 2)
            .opacity(overTable ? 1 : 0)
            .animation(DS.Motion.stateIn, value: overTable)
            .allowsHitTesting(false)

        ForEach(model.landed) { item in
            let p = map.point(item.point.x, item.point.y)
            LandedSnack(asset: item.asset, angle: item.angle)
                .position(p)
                .transition(.opacity)
        }

        ForEach(model.seats) { seat in
            let speaking = seat.name == model.speaker
            let p = map.point(seat.x, seat.y)
            SeatLabel(name: seat.name, speaking: speaking)
                .fixedSize()
                .position(x: p.x + 40, y: p.y + 7)
                .animation(DS.Motion.emphasizedDecel, value: model.speaker)
        }
    }

    // MARK: 화면 틀(머리말, 고민 배너, 퀵슬롯, 채팅, 입력줄)

    private func chrome(_ map: SceneMap) -> some View {
        VStack(spacing: 0) {
            Color.clear.frame(height: max(geoTopInset(), 47))
            RoomHeader(model: model)
                .frame(height: 56)
            TopicBanner(model: model)
                .padding(.horizontal, 24)
                .padding(.top, 5)
            HStack {
                Spacer()
                dock(map)
            }
            .padding(.trailing, 24)
            .padding(.top, 28)
            Spacer(minLength: 0)
            ChatColumn(model: model)
                .padding(.horizontal, 24)
            RoomInputBar()
                .padding(.horizontal, 24)
                .padding(.top, 20)
                .padding(.bottom, 24)
        }
    }

    private func geoTopInset() -> CGFloat {
        (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.windows.first?.safeAreaInsets.top ?? 47
    }

    @ViewBuilder
    private func dock(_ map: SceneMap) -> some View {
        if model.dockOpen {
            VStack(spacing: 6) {
                Button {
                    withAnimation(DS.Motion.emphasizedAccel) { model.dockOpen = false }
                } label: {
                    RoundedRectangle(cornerRadius: 2).fill(.white.opacity(0.6)).frame(width: 16, height: 3)
                        .frame(width: 44, height: 20)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel("퀵슬롯 접기")

                ForEach(model.snacks) { snack in
                    SnackSlot(snack: snack)
                        .matchedGeometryEffect(id: snack.id, in: dockSpace, isSource: model.dockOpen)
                        .gesture(throwGesture(snack, map))
                        .accessibilityLabel(snack.name)
                }
            }
            .transition(.asymmetric(insertion: .opacity.combined(with: .scale(scale: 0.9, anchor: .top)), removal: .opacity))
        } else {
            Button {
                withAnimation(DS.Motion.emphasizedDecel) { model.dockOpen = true }
            } label: {
                CollapsedDock(snacks: model.pillSnacks, ns: dockSpace)
            }
            .buttonStyle(.plain)
            .accessibilityLabel("퀵슬롯 열기")
            .transition(.opacity)
        }
    }

    private func throwGesture(_ snack: RoomModel.Snack, _ map: SceneMap) -> some Gesture {
        DragGesture(minimumDistance: 6, coordinateSpace: .named("room"))
            .onChanged { v in
                guard model.canThrow(snack) else { return }
                if drag == nil {
                    UIImpactFeedbackGenerator(style: .light).impactOccurred()
                }
                drag = (snack.id, snack.asset, v.location)
                let inside = map.rect(RoomModel.tableDrop).contains(v.location)
                if inside != overTable {
                    overTable = inside
                    if inside {
                        UISelectionFeedbackGenerator().selectionChanged()
                    }
                }
            }
            .onEnded { v in
                let inside = map.rect(RoomModel.tableDrop).contains(v.location)
                drag = nil
                overTable = false
                guard inside else { return }
                withAnimation(DS.Motion.decel(0.62)) {
                    if let item = model.throwSnack(snack.id) {
                        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                        Task {
                            try? await Task.sleep(for: .seconds(6))
                            withAnimation(.easeOut(duration: 0.5)) { model.removeLanded(item.id) }
                        }
                    }
                }
            }
    }

    private func rotateSpeakers() async {
        try? await Task.sleep(for: .seconds(1.6))
        while !Task.isCancelled {
            withAnimation(DS.Motion.emphasizedDecel) { model.nextSpeaker() }
            try? await Task.sleep(for: .seconds(.random(in: 2.2 ... 4.6)))
        }
    }
}

// MARK: - 부품

private struct SeatLabel: View {
    let name: String
    let speaking: Bool
    var body: some View {
        VStack(spacing: 6) {
            VoiceWave().opacity(speaking ? 1 : 0)
            HStack(spacing: 5) {
                Circle().fill(DS.Palette.success).frame(width: 7, height: 7).opacity(speaking ? 1 : 0)
                Text(name)
                    .suit(speaking ? 12 : 11, speaking ? .bold : .medium, tracking: speaking ? -0.48 : -0.44)
                    .foregroundStyle(speaking ? DS.Palette.textPrimary : DS.Palette.textPrimary.opacity(0.5))
            }
        }
    }
}

private struct VoiceWave: View {
    @State private var phase = false
    private let heights: [CGFloat] = [8, 14, 20, 14, 8]
    var body: some View {
        HStack(spacing: 4) {
            ForEach(heights.indices, id: \.self) { i in
                RoundedRectangle(cornerRadius: 2)
                    .fill(DS.Palette.success)
                    .frame(width: 3, height: heights[i])
                    .scaleEffect(y: phase ? [0.45, 1.25, 0.7, 1.1, 0.6][i] : 1, anchor: .center)
                    .animation(.easeInOut(duration: 0.62 + Double(i) * 0.11).repeatForever(autoreverses: true), value: phase)
            }
        }
        .frame(height: 20)
        .onAppear { phase = true }
    }
}

private struct LandedSnack: View {
    let asset: String
    let angle: Double
    @State private var landed = false
    var body: some View {
        Image(asset).resizable().scaledToFit()
            .frame(width: 32, height: 32)
            .rotationEffect(.degrees(landed ? angle : -16))
            .scaleEffect(landed ? 1 : 1.45)
            .offset(y: landed ? 0 : -60)
            .onAppear { withAnimation(DS.Motion.decel(0.62)) { landed = true } }
    }
}

private struct SnackSlot: View {
    let snack: RoomModel.Snack
    var body: some View {
        Image(snack.asset).resizable().scaledToFit()
            .frame(width: 32, height: 32)
            .padding(6)
            .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: DS.Radius.chip))
            .opacity(snack.count > 0 ? 1 : 0.4)
    }
}

private struct CollapsedDock: View {
    let snacks: [RoomModel.Snack]
    let ns: Namespace.ID
    var body: some View {
        VStack(spacing: -10) {
            ForEach(snacks) { snack in
                Image(snack.asset).resizable().scaledToFit()
                    .frame(width: 20, height: 20)
                    .frame(width: 28, height: 28)
                    .background(DS.Palette.bgElevated, in: Circle())
                    .overlay(Circle().strokeBorder(.black, lineWidth: 1.5))
                    .matchedGeometryEffect(id: snack.id, in: ns, isSource: false)
            }
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 6)
        .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: 20))
        .overlay(RoundedRectangle(cornerRadius: 20).strokeBorder(.white.opacity(0.12), lineWidth: 1))
    }
}

private struct RoomHeader: View {
    let model: RoomModel
    var body: some View {
        HStack {
            Image("icon-chevron-left").renderingMode(.template).resizable()
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 24, height: 24)
            Spacer()
            TimelineView(.periodic(from: .now, by: 0.25)) { ctx in
                HStack(spacing: 8) {
                    SunClock(progress: 1 - model.remaining(at: ctx.date) / RoomModel.shownSeconds)
                        .frame(width: 16, height: 16)
                    Text("해 뜨기까지").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                    Text(model.clockText(at: ctx.date)).suit(12, .bold, tracking: -0.48).monospacedDigit()
                        .foregroundStyle(DS.Palette.brandPrimary)
                        .contentTransition(.numericText(countsDown: true))
                }
                .padding(.leading, 12).padding(.trailing, 16)
                .frame(height: 32)
                .background(DS.Palette.bgElevated, in: Capsule())
            }
            Spacer()
            Image("icon-view-grid").renderingMode(.template).resizable()
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 16, height: 16)
                .frame(width: 46, height: 32)
                .background(DS.Palette.bgOverlay.opacity(0.6), in: Capsule())
        }
        .padding(.horizontal, 24)
    }
}

/// 해 뜨기 시계 아이콘: 지난 시간만큼 원이 채워진다.
private struct SunClock: View {
    let progress: Double
    var body: some View {
        ZStack {
            Circle().strokeBorder(DS.Palette.brandPrimary, lineWidth: 1.5)
            PieSlice(progress: progress).fill(DS.Palette.brandPrimary).padding(3)
        }
    }
}

private struct PieSlice: Shape {
    var progress: Double
    var animatableData: Double {
        get { progress } set { progress = newValue }
    }

    func path(in rect: CGRect) -> Path {
        var p = Path()
        let c = CGPoint(x: rect.midX, y: rect.midY)
        p.move(to: c)
        p.addArc(center: c, radius: rect.width / 2, startAngle: .degrees(-90), endAngle: .degrees(-90 + 360 * max(0.08, progress)), clockwise: false)
        p.closeSubpath()
        return p
    }
}

private struct TopicBanner: View {
    @Bindable var model: RoomModel
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if model.bannerOpen {
                HStack {
                    HStack(spacing: 8) {
                        Text("고민").suit(11, .bold, tracking: -0.44).foregroundStyle(DS.Palette.brandPrimary)
                        Text("나 의 고민").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
                    }
                    Spacer()
                    Image("icon-chevron-up").renderingMode(.template).resizable()
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 16, height: 16)
                }
                Text(model.topicBody)
                    .suit(14, .medium, tracking: -0.56)
                    .foregroundStyle(DS.Palette.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
                    .transition(.opacity.combined(with: .offset(y: -6)))
                HStack(spacing: 6) {
                    Text("AI가 읽은 맥락").suit(11, .medium, tracking: -0.44).foregroundStyle(DS.Palette.textTertiary)
                    ForEach(model.topicTags, id: \.self) { tag in
                        Text(tag).suit(11, .bold, tracking: -0.44).foregroundStyle(DS.Palette.brandPrimary)
                            .padding(.horizontal, 9).padding(.vertical, 4)
                            .background(DS.Palette.brandSubtle, in: RoundedRectangle(cornerRadius: 11))
                    }
                }
                .transition(.opacity.combined(with: .offset(y: -6)))
            } else {
                HStack(spacing: 8) {
                    Text("고민").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.brandPrimary)
                    Text(model.topicShort).suit(14, .medium, tracking: -0.56)
                        .foregroundStyle(DS.Palette.textPrimary).lineLimit(1)
                    Spacer(minLength: 0)
                    Image("icon-chevron-down").renderingMode(.template).resizable()
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 16, height: 16)
                }
            }
        }
        .padding(.horizontal, model.bannerOpen ? 16 : 14)
        .padding(.top, model.bannerOpen ? 14 : 10)
        .padding(.bottom, model.bannerOpen ? 12 : 10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(DS.Palette.bgOverlay.opacity(0.6), in: RoundedRectangle(cornerRadius: model.bannerOpen ? 18 : 16))
        .contentShape(Rectangle())
        .onTapGesture {
            withAnimation(model.bannerOpen ? DS.Motion.emphasizedAccel : DS.Motion.banner) { model.bannerOpen.toggle() }
        }
        .accessibilityAddTraits(.isButton)
    }
}

private struct ChatColumn: View {
    let model: RoomModel
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ForEach(model.chats) { line in
                VStack(alignment: .leading, spacing: 4) {
                    Text(line.name).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary.opacity(0.5))
                    Text(line.text).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary)
                        .padding(.horizontal, 12).padding(.vertical, 8)
                        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                }
                .opacity(line.opacity)
            }
            ForEach(model.myChats, id: \.self) { text in
                Text(text).suit(14, .medium, tracking: -0.56).foregroundStyle(.black)
                    .padding(.horizontal, 12).padding(.vertical, 8)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                    .frame(maxWidth: .infinity, alignment: .trailing)
            }
        }
    }
}

private struct RoomInputBar: View {
    @State private var text = ""
    @State private var micOn = true
    var body: some View {
        HStack(spacing: 8) {
            Image("icon-plus").renderingMode(.template).foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 48, height: 48)
                .background(.black, in: Circle())
            TextField("", text: $text, prompt: Text("채팅으로 한마디...").foregroundStyle(DS.Palette.textSecondary))
                .suit(16, .regular, tracking: -0.64)
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(height: 48)
            Button {
                withAnimation(DS.Motion.stateIn) { micOn.toggle() }
                UIImpactFeedbackGenerator(style: .light).impactOccurred()
            } label: {
                Image(micOn ? "icon-mic" : "icon-mic-off").renderingMode(.template)
                    .foregroundStyle(micOn ? .black : DS.Palette.textPrimary)
                    .frame(width: 48, height: 48)
                    .background(micOn ? DS.Palette.success : DS.Palette.danger, in: Circle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel(micOn ? "마이크 끄기" : "마이크 켜기")
        }
        .padding(8)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.input))
    }
}

#Preview {
    RoomView()
}
