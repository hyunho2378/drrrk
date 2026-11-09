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

/// 화면 위쪽 안전 영역 높이(상태 막대). 방 화면들은 머리말을 이 아래에 둔다.
func roomTopInset() -> CGFloat {
    (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.windows.first?.safeAreaInsets.top ?? 47
}

struct RoomView: View {
    /// 시뮬레이터 확인용(onboardingTogether 라우트): 이미 본 적이 있어도 온보딩을 다시 띄운다.
    var forceOnboarding = false
    @Environment(Router.self) private var router
    @State private var model = RoomModel.field()
    @State private var showOnboarding: Bool

    init(forceOnboarding: Bool = false) {
        self.forceOnboarding = forceOnboarding
        _showOnboarding = State(initialValue: forceOnboarding || !OnboardingSeen.together)
    }

    @State private var emojiOpen = false
    @State private var flying: [FlyingEmoji] = []
    @State private var lastMinute = false
    @State private var drag: (id: String, asset: String, at: CGPoint)?
    @State private var overTable = false
    @Namespace private var dockSpace

    var body: some View {
        GeometryReader { geo in
            let map = SceneMap(size: geo.size)
            ZStack(alignment: .topLeading) {
                // 피그마 1979:27516 "image 1208091463"(해시 eadc5541)을 3배로 받은 장면
                Image("E-room-scene-new")
                    .resizable()
                    .scaledToFill()
                    .frame(width: geo.size.width, height: geo.size.height)
                    .clipped()

                sceneLayer(map)

                // 피그마 chat fade: 아래 334 높이, 검정 0에서 65% 지점에 100%
                LinearGradient(stops: [.init(color: .black.opacity(0), location: 0), .init(color: .black, location: 0.65)], startPoint: .top, endPoint: .bottom)
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
        .overlay { RoomToastLayer().ignoresSafeArea() }
        // 함께 드르륵 온보딩: 추천에서 방에 처음 들어오면 이 방 위에 어둡게 깔고 다섯 장을 띄운다. 닫으면 방이 그대로 이어진다.
        .overlay {
            if showOnboarding {
                OnboardingOverlay(pages: OnboardingPages.together) {
                    withAnimation(DS.Motion.emphasizedAccel) { showOnboarding = false }
                }
                .transition(.opacity)
            }
        }
        .onAppear { OnboardingSeen.together = true }
        .task { await rotateSpeakers() }
        .task { await watchClock() }
        .task(id: showOnboarding) {
            // 온보딩을 닫은 뒤 7초가 지나면 이야기가 무르익은 장면(1979:27515)으로 넘어간다.
            guard !showOnboarding, model.stage == 0 else { return }
            try? await Task.sleep(for: .seconds(7))
            guard !Task.isCancelled else { return }
            withAnimation(DS.Motion.emphasizedDecel) { model.stage = 1 }
        }
        .toolbar(.hidden, for: .navigationBar)
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
            // 피그마 1979:27497: 테이블에 놓인 주전부리 24 x 24
            LandedSnack(asset: item.asset, angle: item.angle, size: 24)
                .position(p)
                .transition(.identity)
        }

        ForEach(model.seats) { seat in
            let speaking = seat.name == model.speaker
            // 이름 글자 상자의 가운데를 피그마 좌표에 맞춘다. 초록 점과 파동은 글자 밖에 겹쳐 그린다.
            let p = map.point(seat.x, seat.y)
            // 의자 이름을 누르면 미니 프로필이 방 위에 겹쳐 뜬다(피그마 1972:22293 "이름 칩 (탭하면 미니 프로필)").
            Button { router.present(.miniProfile) } label: {
                SeatLabel(name: seat.name, speaking: speaking)
                    .fixedSize()
                    .padding(8)
                    .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .position(p)
            .animation(DS.Motion.emphasizedDecel, value: model.speaker)
            .accessibilityLabel(seat.name + " 프로필")
        }
    }

    // MARK: 화면 틀(머리말, 고민 배너, 퀵슬롯, 채팅, 입력줄)

    private func chrome(_ map: SceneMap) -> some View {
        VStack(spacing: 0) {
            Color.clear.frame(height: max(roomTopInset(), 47))
            RoomHeader(model: model, lastMinute: lastMinute, onBack: { router.pop() }, onToggle: { router.push(.roomNormal) })
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
                .overlay(alignment: .bottomLeading) {
                    if emojiOpen {
                        EmojiMenu { pick in sendEmoji(pick) }
                            .padding(.leading, 24)
                            .padding(.bottom, -14)
                            .transition(.asymmetric(insertion: .opacity.combined(with: .scale(scale: 0.86, anchor: .bottomLeading)).combined(with: .offset(y: 18)), removal: .opacity.combined(with: .offset(y: 8))))
                    }
                }
                .overlay {
                    ForEach(flying) { e in FlyingEmojiView(item: e) }
                }
            RoomInputBar(emojiOpen: $emojiOpen) { t in
                withAnimation(DS.Motion.emphasizedDecel) { model.send(t) }
            }
                .padding(.horizontal, 24)
                .padding(.top, 20)
                .padding(.bottom, 24)
        }
    }

    @ViewBuilder
    private func dock(_ map: SceneMap) -> some View {
        if model.dockOpen {
            VStack(spacing: 6) {
                Button {
                    withAnimation(DS.Motion.emphasizedAccel) { model.dockOpen = false }
                } label: {
                    DockHandle()
                }
                .buttonStyle(.plain)
                .accessibilityLabel("퀵슬롯 접기")
                .padding(.bottom, 2)

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
                            // 서서히 사라지는 움직임은 LandedSnack이 맡고, 다 사라진 뒤 목록에서만 지운다.
                            try? await Task.sleep(for: .seconds(LandedSnack.stay))
                            model.removeLanded(item.id)
                        }
                    }
                }
            }
    }

    private func sendEmoji(_ asset: String) {
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
        let item = FlyingEmoji(asset: asset)
        flying.append(item)
        withAnimation(DS.Motion.emphasizedAccel) { emojiOpen = false }
        Task {
            try? await Task.sleep(for: .seconds(1.1))
            flying.removeAll { $0.id == item.id }
        }
    }

    /// 해 뜨기 1분(화면 시계) 전에는 시계가 빨개지고 안내가 한 줄 뜬다. 0이 되면 아침 화면으로 넘어간다.
    private func watchClock() async {
        while !Task.isCancelled {
            let left = model.remaining(at: .now)
            if left <= RoomModel.lastMinuteShown, !lastMinute {
                withAnimation(DS.Motion.emphasizedDecel) {
                    lastMinute = true
                    model.stage = 2
                }
            }
            if left <= 0 {
                router.push(.roomMorning)
                return
            }
            try? await Task.sleep(for: .seconds(0.25))
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

/// 장면 속 의자 이름표(피그마 1979:27517). 글자만 자리를 차지하고, 말하는 중에는 글자 왼쪽 4 떨어진 곳에 초록 점 7,
/// 글자 가운데 위(글자 위 끝에서 16 위)에 파동 31 x 20이 붙는다.
private struct SeatLabel: View {
    let name: String
    let speaking: Bool
    var body: some View {
        Text(name)
            .suit(speaking ? 12 : 11, speaking ? .bold : .medium, tracking: speaking ? -0.48 : -0.44)
            .foregroundStyle(speaking ? DS.Palette.textPrimary : DS.Palette.textPrimary.opacity(0.5))
            .overlay(alignment: .leading) {
                Circle().fill(DS.Palette.success).frame(width: 7, height: 7)
                    .offset(x: -11)
                    .opacity(speaking ? 1 : 0)
            }
            .overlay(alignment: .top) {
                VoiceWave()
                    .offset(y: -36)
                    .opacity(speaking ? 1 : 0)
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

/// 테이블에 떨어진 주전부리. 6초 머무는 동안 마지막 1.2초는 투명해지며 0.9배로 작아진다(웹 throw.js와 같은 값).
struct LandedSnack: View {
    let asset: String
    let angle: Double
    var size: CGFloat = 40
    static let stay: Double = 6
    static let fade: Double = 1.2
    @State private var landed = false
    @State private var fading = false
    var body: some View {
        Image(asset).resizable().scaledToFit()
            .frame(width: size, height: size)
            .rotationEffect(.degrees(landed ? angle : -16))
            .scaleEffect(landed ? (fading ? 0.9 : 1) : 1.15)
            .offset(y: landed ? 0 : -60)
            .opacity(fading ? 0 : 1)
            .onAppear { withAnimation(DS.Motion.decel(0.62)) { landed = true } }
            .task {
                try? await Task.sleep(for: .seconds(Self.stay - Self.fade))
                guard !Task.isCancelled else { return }
                withAnimation(.easeOut(duration: Self.fade)) { fading = true }
            }
    }
}

/// 펼친 퀵슬롯 맨 위 접기 손잡이(피그마 "접기 핸들" 44 x 20, 검정 45%, 모서리 10)
struct DockHandle: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 2).fill(.white.opacity(0.6)).frame(width: 16, height: 3)
            .frame(width: 44, height: 20)
            .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: 10))
            .contentShape(Rectangle())
    }
}

/// 퀵슬롯 한 칸(피그마 "slot" 44 x 44, 검정 45%, 흰 12% 1px 테두리, 모서리 12, 그림 32).
/// 혼자 방(1647:24874)에서는 남은 개수 배지와, 막 던진 칸의 하늘색 2px 테두리와 쿨타임 덮개가 붙는다.
struct SnackSlot: View {
    let snack: RoomModel.Snack
    var showCount = false
    var selected = false
    /// 남은 쿨타임 비율(1에서 0으로 줄어든다)
    var cooldown: Double = 0
    var body: some View {
        Image(snack.asset).resizable().scaledToFit()
            .frame(width: 32, height: 32)
            .frame(width: 44, height: 44)
            .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: DS.Radius.chip))
            .overlay {
                if selected {
                    PieSlice(progress: cooldown, minimum: 0)
                        .fill(.black.opacity(0.6))
                        .frame(width: 70.4, height: 70.4)
                        .frame(width: 44, height: 44)
                        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.chip))
                        .allowsHitTesting(false)
                }
            }
            .overlay(
                RoundedRectangle(cornerRadius: DS.Radius.chip)
                    .strokeBorder(selected ? DS.Palette.brandPrimary : .white.opacity(0.12), lineWidth: selected ? 2 : 1)
            )
            .overlay(alignment: .topLeading) {
                if showCount {
                    Text("\(snack.count)").suit(12, .bold, lineHeight: 16).foregroundStyle(DS.Palette.textPrimary)
                        .monospacedDigit()
                        .contentTransition(.numericText(countsDown: true))
                        .padding(.horizontal, 5)
                        .frame(minWidth: 20, minHeight: 18)
                        .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 8))
                        .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.white.opacity(0.2), lineWidth: 1))
                        .offset(x: 28, y: 30)
                }
            }
            .opacity(snack.count > 0 ? 1 : 0.4)
    }
}

struct CollapsedDock: View {
    let snacks: [RoomModel.Snack]
    let ns: Namespace.ID
    var body: some View {
        VStack(spacing: -10) {
            ForEach(snacks) { snack in
                Image(snack.asset).resizable().scaledToFit()
                    .frame(width: 20, height: 20)
                    .frame(width: 28, height: 28)
                    .background(DS.Palette.bgElevated, in: Circle())
                    .overlay(Circle().strokeBorder(.black, lineWidth: 2))
                    .matchedGeometryEffect(id: snack.id, in: ns, isSource: false)
            }
        }
        // 피그마 "퀵슬롯 · 접힘" 42 x 82, 안쪽 8 / 6, 칸 28이 10씩 겹친다.
        .padding(.vertical, 9)
        .padding(.horizontal, 7)
        .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: 20))
        .overlay(RoundedRectangle(cornerRadius: 20).strokeBorder(.white.opacity(0.12), lineWidth: 1))
    }
}

struct RoomHeader: View {
    let model: RoomModel
    var lastMinute = false
    var onBack: () -> Void = {}
    var onToggle: () -> Void = {}
    var body: some View {
        HStack {
            Button(action: onBack) {
                Image("icon-chevron-left").renderingMode(.template).resizable()
                    .foregroundStyle(DS.Palette.textPrimary)
                    .frame(width: 24, height: 24)
                    .frame(width: 44, height: 44, alignment: .leading)
                    .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("나가기")
            Spacer()
            TimelineView(.periodic(from: .now, by: 0.25)) { ctx in
                HStack(spacing: 8) {
                    SunClock(progress: 1 - model.remaining(at: ctx.date) / RoomModel.shownSeconds)
                        .frame(width: 16, height: 16)
                    Text("해 뜨기까지").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                    Text(model.clockText(at: ctx.date)).suit(12, .bold, tracking: -0.48).monospacedDigit()
                        .foregroundStyle(lastMinute ? DS.Palette.danger : DS.Palette.brandPrimary)
                        .contentTransition(.numericText(countsDown: true))
                }
                .padding(.leading, 12).padding(.trailing, 16)
                .frame(height: 32)
                // 피그마 1979:27584(평소 #222628)와 2009:12512(1분 전: 빨강 18% 바탕, 빨강 1 안쪽 선)
                .background(lastMinute ? DS.Palette.danger.opacity(0.18) : DS.Palette.bgElevated, in: Capsule())
                .overlay(Capsule().strokeBorder(DS.Palette.danger, lineWidth: 1).opacity(lastMinute ? 1 : 0))
            }
            Spacer()
            Button(action: onToggle) {
                Image("icon-view-grid").renderingMode(.template).resizable()
                    .foregroundStyle(DS.Palette.textPrimary)
                    .frame(width: 16, height: 16)
                    .frame(width: 46, height: 32)
                    .background(DS.Palette.bgOverlay.opacity(0.6), in: Capsule())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("일반 모드로 보기")
        }
        // 피그마 Header: 뒤로 아이콘 x 24, 모드 토글 오른쪽 끝 24
        .padding(.leading, 24).padding(.trailing, 24)
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

struct PieSlice: Shape {
    var progress: Double
    var minimum: Double = 0.08
    var animatableData: Double {
        get { progress } set { progress = newValue }
    }

    func path(in rect: CGRect) -> Path {
        var p = Path()
        let c = CGPoint(x: rect.midX, y: rect.midY)
        p.move(to: c)
        p.addArc(center: c, radius: rect.width / 2, startAngle: .degrees(-90), endAngle: .degrees(-90 + 360 * max(minimum, progress)), clockwise: false)
        p.closeSubpath()
        return p
    }
}

struct TopicBanner: View {
    @Bindable var model: RoomModel
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if model.bannerOpen {
                HStack {
                    HStack(spacing: 8) {
                        Text("고민").suit(11, .bold, tracking: -0.44).foregroundStyle(DS.Palette.brandPrimary)
                        // 피그마 1979:27707 "나 "는 SemiBold 흰색, "의 고민"은 Medium #9AA1A6
                        (Text("나 ").font(.custom(SUITWeight.semibold.rawValue, size: 12)).foregroundColor(.white)
                            + Text("의 고민").font(.custom(SUITWeight.medium.rawValue, size: 12)).foregroundColor(DS.Palette.textSecondary))
                            .tracking(-0.48)
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

/// 현장 모드 채팅 칸(피그마 1979:27515, 1979:27708, 1979:27780). 줄 사이 8, 이름과 말풍선 사이 4.
private struct ChatColumn: View {
    let model: RoomModel
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ForEach(model.visibleEntries) { entry in
                switch entry {
                case let .other(line):
                    VStack(alignment: .leading, spacing: 4) {
                        Text(line.name).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary.opacity(0.5))
                        Text(line.text).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary)
                            .padding(.horizontal, 12).padding(.vertical, 8)
                            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                    }
                    .opacity(line.opacity)
                    .transition(.opacity)
                case let .mine(text), let .sent(_, text):
                    Text(text).suit(14, .medium, tracking: -0.56).foregroundStyle(.black)
                        .padding(.horizontal, 12).padding(.vertical, 8)
                        .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                        .frame(maxWidth: .infinity, alignment: .trailing)
                        .transition(.opacity)
                case let .system(text):
                    SystemLine(text: text)
                        .transition(.opacity.combined(with: .offset(y: 8)))
                }
            }
        }
    }
}

struct RoomInputBar: View {
    @Binding var emojiOpen: Bool
    /// 보내기(키보드 보내기 키). 빈 글은 보내지 않는다.
    var onSend: (String) -> Void = { _ in }
    @State private var text = ""
    @FocusState private var typing: Bool
    @State private var micOn = true
    var body: some View {
        HStack(spacing: 8) {
            Button {
                withAnimation(emojiOpen ? DS.Motion.emphasizedAccel : DS.Motion.decel(0.42)) { emojiOpen.toggle() }
            } label: {
                Image("icon-plus").renderingMode(.template).foregroundStyle(DS.Palette.textPrimary)
                    .rotationEffect(.degrees(emojiOpen ? 45 : 0))
                    .frame(width: 48, height: 48)
                    .background(.black, in: Circle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel(emojiOpen ? "이모지 닫기" : "이모지 열기")
            TextField("", text: $text, prompt: Text("채팅으로 한마디...").foregroundStyle(DS.Palette.textSecondary))
                .suit(16, .regular, tracking: -0.64)
                .foregroundStyle(DS.Palette.textPrimary)
                .focused($typing)
                .submitLabel(.send)
                .onSubmit(send)
                .frame(height: 48)
            Button {
                withAnimation(DS.Motion.stateIn) { micOn.toggle() }
                UIImpactFeedbackGenerator(style: .light).impactOccurred()
            } label: {
                // 피그마 1979:27492: 끈 상태도 검정 아이콘, 바탕만 빨강
                Image(micOn ? "icon-mic" : "icon-mic-off").renderingMode(.template)
                    .foregroundStyle(.black)
                    .frame(width: 48, height: 48)
                    .background(micOn ? DS.Palette.success : DS.Palette.danger, in: Circle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel(micOn ? "마이크 끄기" : "마이크 켜기")
        }
        .padding(8)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.input))
    }

    private func send() {
        let t = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !t.isEmpty else { return }
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
        onSend(t)
        text = ""
        typing = true
    }
}

// MARK: - 방 안내 글(토스트)
// 웹 room.js toast와 같은 모양: 342 폭, 안쪽 12 / 16, 모서리 12, #222628, 글자 14 SemiBold 행간 20,
// 입력줄 위 18에 아래에서 8 올라오며 나타나고 2.4초 뒤 옅어진다. 신고 시트처럼 방 위 창이 닫힌 뒤에도 방에 남는다.

@Observable
final class RoomToastCenter {
    static let shared = RoomToastCenter()
    var text: String?
    private var serial = 0

    func show(_ message: String) {
        serial += 1
        let mine = serial
        withAnimation(DS.Motion.decel(0.25)) { text = message }
        Task { @MainActor in
            try? await Task.sleep(for: .seconds(2.4))
            guard mine == self.serial else { return }
            withAnimation(DS.Motion.stateIn) { self.text = nil }
        }
    }
}

struct RoomToastLayer: View {
    @State private var center = RoomToastCenter.shared
    /// 화면 바닥에서 토스트 아래 끝까지(입력줄 아래 여백 24 + 입력줄 64 + 사이 18)
    var bottom: CGFloat = 106
    var body: some View {
        VStack {
            Spacer()
            if let t = center.text {
                Text(t).suit(14, .semibold, tracking: -0.28, lineHeight: 20)
                    .foregroundStyle(DS.Palette.textPrimary)
                    .multilineTextAlignment(.center)
                    .padding(.vertical, 12).padding(.horizontal, 16)
                    .frame(width: 342)
                    .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 12))
                    .shadow(color: .black.opacity(0.32), radius: 8, y: 6)
                    .padding(.bottom, bottom)
                    .transition(.opacity.combined(with: .offset(y: 8)))
                    .accessibilityAddTraits(.isStaticText)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .allowsHitTesting(false)
    }
}

#Preview {
    RoomView().environment(Router())
}

// MARK: - 이모지 메뉴(피그마 "플러스 메뉴 · 이모지" 62 x 230, 검정 알약, 칸 48, 간격 8)

struct FlyingEmoji: Identifiable {
    let id = UUID()
    let asset: String
}

struct EmojiMenu: View {
    let onPick: (String) -> Void
    static let items = ["B-emoji-laugh", "B-emoji-pat", "B-emoji-cheer", "B-emoji-agree"]
    @State private var shown = false
    var body: some View {
        VStack(spacing: 8) {
            ForEach(Array(Self.items.enumerated()), id: \.offset) { i, asset in
                Button { onPick(asset) } label: {
                    Image(asset).resizable().scaledToFit()
                        .frame(width: 24, height: 24)
                        .frame(width: 48, height: 48)
                        .background(DS.Palette.bgElevated, in: Circle())
                }
                .buttonStyle(PressStyle())
                .opacity(shown ? 1 : 0)
                .offset(y: shown ? 0 : 14)
                .scaleEffect(shown ? 1 : 0.9)
                // 아래 칸부터 60ms 간격으로 올라온다.
                .animation(DS.Motion.decel(0.34).delay(0.08 + Double(Self.items.count - 1 - i) * 0.06), value: shown)
                .accessibilityLabel(["웃김", "토닥", "응원", "공감"][i])
            }
        }
        .padding(6)
        .background(.black, in: Capsule())
        .onAppear { shown = true }
    }
}

struct FlyingEmojiView: View {
    let item: FlyingEmoji
    @State private var go = false
    var body: some View {
        Image(item.asset).resizable().scaledToFit()
            .frame(width: 24, height: 24)
            .scaleEffect(go ? 2.4 : 1)
            .offset(x: go ? 52 : 0, y: go ? -190 : 0)
            .opacity(go ? 0 : 1)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading)
            .padding(.leading, 36)
            .allowsHitTesting(false)
            .onAppear { withAnimation(DS.Motion.decel(1.0)) { go = true } }
    }
}

/// 카카오톡 관리자 메시지처럼 가운데 한 줄로 뜨는 시스템 안내(피그마 2009:12527 "System / 1분 전" 116 x 28,
/// 안내 아이콘 16, 사이 6, 안쪽 6 / 12, 모서리 14, #0A0B0C 60%).
struct SystemLine: View {
    let text: String
    var body: some View {
        HStack(spacing: 6) {
            Image("E-icon-information").renderingMode(.template).resizable()
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 16, height: 16)
            Text(text).suit(12, .medium, tracking: -0.48)
                .foregroundStyle(DS.Palette.textPrimary)
        }
        .padding(.horizontal, 12).padding(.vertical, 6)
        .background(DS.Palette.bgOverlay.opacity(0.6), in: RoundedRectangle(cornerRadius: 14))
        .frame(maxWidth: .infinity)
    }
}

/// 혼자 방 퀵슬롯(피그마 1647:25199 접힘, 1647:24874 펼침). 펼치면 칸마다 남은 개수가 붙고,
/// 칸을 누르면 그 주전부리가 장면 속 테이블로 떨어진 뒤 3초 쿨타임 동안 하늘색 테두리와 어두운 덮개가 줄어든다.
struct SoloQuickSlot: View {
    @Bindable var model: RoomModel
    let onThrow: (RoomModel.Snack) -> Void
    @State private var cooling: String?
    @State private var cooldown: Double = 0
    @Namespace private var ns

    static let cooldownSeconds: Double = 3

    var body: some View {
        if model.dockOpen {
            VStack(spacing: 6) {
                Button {
                    withAnimation(DS.Motion.emphasizedAccel) { model.dockOpen = false }
                } label: {
                    DockHandle()
                }
                .buttonStyle(.plain)
                .accessibilityLabel("퀵슬롯 접기")
                .padding(.bottom, 2)
                ForEach(model.snacks) { snack in
                    Button { tap(snack) } label: {
                        SnackSlot(snack: snack, showCount: true, selected: cooling == snack.id, cooldown: cooling == snack.id ? cooldown : 0)
                    }
                    .buttonStyle(RoomPressStyle())
                    .disabled(snack.count == 0 || cooling != nil)
                    .matchedGeometryEffect(id: snack.id, in: ns, isSource: model.dockOpen)
                    .accessibilityLabel("\(snack.name) \(snack.count)개")
                }
            }
            .transition(.asymmetric(insertion: .opacity.combined(with: .scale(scale: 0.9, anchor: .top)), removal: .opacity))
        } else {
            Button {
                withAnimation(DS.Motion.emphasizedDecel) { model.dockOpen = true }
            } label: {
                CollapsedDock(snacks: model.pillSnacks, ns: ns)
            }
            .buttonStyle(.plain)
            .accessibilityLabel("퀵슬롯 열기")
            .transition(.opacity)
        }
    }

    private func tap(_ snack: RoomModel.Snack) {
        guard cooling == nil, snack.count > 0 else { return }
        onThrow(snack)
        cooling = snack.id
        cooldown = 1
        withAnimation(.linear(duration: Self.cooldownSeconds)) { cooldown = 0 }
        Task {
            try? await Task.sleep(for: .seconds(Self.cooldownSeconds))
            withAnimation(DS.Motion.stateIn) { cooling = nil }
        }
    }
}
