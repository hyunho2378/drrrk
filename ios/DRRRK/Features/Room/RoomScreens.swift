import SwiftUI

// 방 묶음 화면. 값은 팀 피그마(일반 모드 1647:23954, 이름 탭 1952:16328, 미니 프로필 1952:15659 / 15800,
// 신고 1647:22101, 차단 1647:22209, 혼자 드르륵 1647:24874 / 1804:12770, 종료 2023:30658, 아침 1647:26876,
// 오늘 나눈 대화 1647:27027)에서 읽었다. 동작은 웹 room.js와 live.js를 따른다.

// MARK: - 공용

struct RoomParticipant: Identifiable, Hashable {
    var id: String {
        name
    }

    let name: String
    let asset: String
    let isMe: Bool
    let muted: Bool
}

enum RoomPeople {
    static let normal: [RoomParticipant] = [
        .init(name: "새벽2시 피시방", asset: "B-chair-swivel", isMe: true, muted: false),
        .init(name: "진실의 의자10", asset: "B-chair-lime", isMe: false, muted: false),
        .init(name: "딱딱한 나무 스툴12", asset: "B-chair-stool", isMe: false, muted: true),
        .init(name: "차가운 새벽의자92", asset: "B-chair-white", isMe: false, muted: false),
    ]
}

private struct BackHeader: View {
    let onBack: () -> Void
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
            .accessibilityLabel("뒤로")
            Spacer()
        }
        .padding(.leading, 14).padding(.trailing, 24)
        .frame(height: 56)
    }
}

private struct PrimaryButton: View {
    let title: String
    let action: () -> Void
    var body: some View {
        Button(action: action) {
            Text(title).suit(16, .bold, tracking: -0.32)
                .foregroundStyle(.black)
                .frame(maxWidth: .infinity).frame(height: 56)
                .background(DS.Palette.brandPrimary, in: Capsule())
        }
        .buttonStyle(RoomPressStyle())
    }
}

/// 앱 전체 눌림 반응(PressStyle)과 같다. 예전 이름을 쓰는 자리를 위해 남겨 둔다.
struct RoomPressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        PressStyle().makeBody(configuration: configuration)
    }
}

private struct ClockPill: View {
    let model: RoomModel
    var body: some View {
        TimelineView(.periodic(from: .now, by: 0.25)) { ctx in
            HStack(spacing: 8) {
                Image("icon-clock").renderingMode(.template).resizable().foregroundStyle(DS.Palette.brandPrimary).frame(width: 16, height: 16)
                Text("해 뜨기까지").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                Text(model.clockText(at: ctx.date)).suit(12, .bold, tracking: -0.48).monospacedDigit()
                    .foregroundStyle(DS.Palette.brandPrimary)
                    .contentTransition(.numericText(countsDown: true))
            }
            .padding(.leading, 12).padding(.trailing, 16).frame(height: 32)
            .background(DS.Palette.bgElevated, in: Capsule())
        }
    }
}

// MARK: - 일반 모드

struct RoomNormalView: View {
    @Environment(Router.self) private var router
    @State private var model = RoomModel()
    @State private var speaker = "진실의 의자10"
    @State private var emojiOpen = false
    @State private var flying: [FlyingEmoji] = []
    @State private var sent: [String] = []
    private let people = RoomPeople.normal

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button { router.pop() } label: {
                    Image("icon-chevron-left").renderingMode(.template).resizable()
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 24, height: 24)
                        .frame(width: 44, height: 44, alignment: .leading).contentShape(Rectangle())
                }
                .buttonStyle(PressStyle()).accessibilityLabel("나가기")
                Spacer()
                ClockPill(model: model)
                Spacer()
                Button { router.pop() } label: {
                    Image("icon-view-field").renderingMode(.template).resizable().foregroundStyle(DS.Palette.textPrimary)
                        .frame(width: 18, height: 18).frame(width: 46, height: 32)
                        .background(DS.Palette.bgOverlay.opacity(0.6), in: Capsule())
                }
                .buttonStyle(PressStyle()).accessibilityLabel("현장 모드로 보기")
            }
            .padding(.leading, 14).padding(.trailing, 24).frame(height: 56)

            // 접힌 고민 줄(아래 화살표)을 누르면 현장 모드와 같이 그 자리에서 펼쳐진다. 접힌 모양은 예전 줄과 같은 값이다.
            TopicBanner(model: model)
                .padding(.horizontal, 24).padding(.top, 5)

            LazyVGrid(columns: [GridItem(.flexible(), spacing: 12), GridItem(.flexible(), spacing: 12)], spacing: 14) {
                ForEach(people) { p in
                    Button { router.present(.miniProfile) } label: {
                        ParticipantTile(person: p, speaking: p.name == speaker)
                    }
                    .buttonStyle(RoomPressStyle())
                    .disabled(p.isMe)
                }
            }
            .padding(.horizontal, 24).padding(.top, 16)

            // 피그마 Page Dots: 지금 칸 16 x 6 #F8F8F8, 다른 칸 6 #6E767C, 사이 6
            HStack(spacing: 6) {
                Capsule().fill(DS.Palette.textPrimary).frame(width: 16, height: 6)
                Circle().fill(DS.Palette.textTertiary).frame(width: 6, height: 6)
            }
            .frame(maxWidth: .infinity)
            .padding(.top, 20)

            Spacer(minLength: 0)

            VStack(alignment: .leading, spacing: 8) {
                ForEach(model.chats.suffix(2)) { line in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(line.name).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary.opacity(0.5))
                        Text(line.text).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary)
                            .padding(.horizontal, 12).padding(.vertical, 8)
                            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                    }
                }
                Text("나만 예민한 거 아니지?").suit(14, .medium, tracking: -0.56).foregroundStyle(.black)
                    .padding(.horizontal, 12).padding(.vertical, 8)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                    .frame(maxWidth: .infinity, alignment: .trailing)
                // 입력줄에서 보낸 말은 최근 두 줄까지 내 말풍선으로 이어 붙는다.
                ForEach(Array(sent.suffix(2).enumerated()), id: \.offset) { _, t in
                    Text(t).suit(14, .medium, tracking: -0.56).foregroundStyle(.black)
                        .padding(.horizontal, 12).padding(.vertical, 8)
                        .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                        .frame(maxWidth: .infinity, alignment: .trailing)
                        .transition(.opacity.combined(with: .offset(y: 8)))
                }
            }
            .padding(.horizontal, 24)
            .overlay(alignment: .bottomLeading) {
                if emojiOpen {
                    EmojiMenu { pick in
                        let item = FlyingEmoji(asset: pick)
                        flying.append(item)
                        withAnimation(DS.Motion.emphasizedAccel) { emojiOpen = false }
                        Task { try? await Task.sleep(for: .seconds(1.1)); flying.removeAll { $0.id == item.id } }
                    }
                    .padding(.leading, 24).padding(.bottom, -14)
                    .transition(.opacity.combined(with: .scale(scale: 0.86, anchor: .bottomLeading)).combined(with: .offset(y: 18)))
                }
            }
            .overlay { ForEach(flying) { FlyingEmojiView(item: $0) } }

            RoomInputBar(emojiOpen: $emojiOpen) { t in
                withAnimation(DS.Motion.emphasizedDecel) { sent.append(t) }
            }
                .padding(.horizontal, 24).padding(.top, 20).padding(.bottom, 24)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .overlay { RoomToastLayer() }
        .toolbar(.hidden, for: .navigationBar)
        .task {
            try? await Task.sleep(for: .seconds(1.6))
            while !Task.isCancelled {
                // 나와 마이크를 끈 사람은 말하는 사람으로 뽑지 않는다.
                let pool = people.filter { !$0.isMe && !$0.muted && $0.name != speaker }
                if let n = pool.randomElement() {
                    withAnimation(DS.Motion.standard) { speaker = n.name }
                }
                try? await Task.sleep(for: .seconds(.random(in: 2.2 ... 4.6)))
            }
        }
    }
}

private struct ParticipantTile: View {
    let person: RoomParticipant
    let speaking: Bool
    var body: some View {
        VStack(spacing: 13) {
            Image(person.asset).resizable().scaledToFit()
                .frame(width: 52, height: 52)
                .frame(width: 72, height: 72)
                .background(DS.Palette.bgSurface, in: Circle())
            Text(person.name).suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                .lineLimit(1)
                .padding(.horizontal, 8).padding(.vertical, 3)
                .background(.black, in: Capsule())
        }
        .frame(maxWidth: .infinity).frame(height: 147)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
        .overlay(RoundedRectangle(cornerRadius: DS.Radius.card).strokeBorder(DS.Palette.success, lineWidth: 2).opacity(speaking ? 1 : 0))
        .overlay(alignment: .topTrailing) {
            if person.muted {
                Image("icon-mic-off").renderingMode(.template).resizable().foregroundStyle(DS.Palette.danger)
                    .frame(width: 16, height: 16).frame(width: 28, height: 28).background(.black, in: Circle())
                    .padding(12)
            } else if speaking {
                SpeakingBars().padding(.top, 18).padding(.trailing, 14)
            }
        }
        .animation(DS.Motion.standard, value: speaking)
    }
}

private struct SpeakingBars: View {
    @State private var on = false
    var body: some View {
        HStack(spacing: 2) {
            ForEach(0 ..< 5, id: \.self) { i in
                RoundedRectangle(cornerRadius: 2).fill(DS.Palette.success)
                    .frame(width: 3, height: ([5, 11, 20, 10, 6] as [CGFloat])[i])
                    .scaleEffect(y: on ? ([0.5, 1.2, 0.7, 1.15, 0.6] as [CGFloat])[i] : 1)
                    .animation(.easeInOut(duration: 0.62 + Double(i) * 0.11).repeatForever(autoreverses: true), value: on)
            }
        }
        .frame(height: 20)
        .onAppear { on = true }
    }
}

// MARK: - 미니 프로필(시트), 신고, 차단

/// 미니 프로필(피그마 1972:22293, 1972:22875 "캐릭터 카드" 개선안). 방 위에 겹쳐 뜨는 바텀시트다.
/// 시트 390 x 278(#121415, 위 모서리 24) 위로 의자 그림 132가 62만큼 걸쳐 올라오고, 이름 옆에는 말하는 중 막대가 붙는다.
/// 오른쪽 위 점 세 개를 누르면 신고하기와 차단하기가 나온다.
struct MiniProfileView: View {
    @Environment(Router.self) private var router
    @State private var recommended = false
    @State private var shown = false
    @State private var menuOpen = false

    var body: some View {
        ZStack(alignment: .bottom) {
            Color.black.opacity(shown ? 0.6 : 0).ignoresSafeArea().onTapGesture { close() }
            VStack(spacing: 12) {
                if recommended {
                    Text("딱딱한 나무 스툴12님의 엉따 지수가 0.1°\n올라갔어요")
                        .suit(12, .medium, tracking: -0.48).multilineTextAlignment(.center)
                        .foregroundStyle(DS.Palette.textPrimary)
                        .padding(.horizontal, 16).padding(.vertical, 10)
                        .background(DS.Palette.gray800, in: RoundedRectangle(cornerRadius: 12))
                        .transition(.opacity.combined(with: .offset(y: 6)))
                        .padding(.bottom, 74)
                }
                sheet
            }
            .offset(y: shown ? 0 : 520)
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear { withAnimation(DS.Motion.decel(0.3)) { shown = true } }
    }

    private var sheet: some View {
        VStack(spacing: 0) {
            // 카드 헤더: 위 74, 이름 줄 27, 아래 20
            HStack(spacing: 8) {
                Text("딱딱한 나무 스툴12").suit(19, .bold, tracking: -0.38, lineHeight: 26.6).foregroundStyle(DS.Palette.textPrimary)
                MiniVoiceWave()
            }
            .frame(height: 27)
            .padding(.top, 74)
            .padding(.bottom, 20)
            VStack(spacing: 20) {
                HStack(alignment: .center, spacing: 0) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("엉따 지수").suit(13, .medium, lineHeight: 18).foregroundStyle(DS.Palette.textSecondary)
                        Text("41.5°").suit(22, .bold, tracking: -0.44, lineHeight: 30.8).foregroundStyle(DS.Palette.accentOrange)
                    }
                    Spacer(minLength: 0)
                    HStack(spacing: 8) {
                        ForEach(["snack-peanut", "snack-shrimp", "snack-drrra"], id: \.self) { asset in
                            Image(asset).resizable().scaledToFit().frame(width: 34, height: 34)
                                .frame(width: 44, height: 44)
                                .background(Color(hex: 0x1F2226), in: RoundedRectangle(cornerRadius: 12))
                        }
                    }
                    .accessibilityLabel("대표 업적 오징어땅콩, 새우깡, 드르라")
                }
                Button {
                    withAnimation(DS.Motion.emphasizedDecel) { recommended.toggle() }
                    UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                } label: {
                    HStack(spacing: 10) {
                        Text(recommended ? "추천했어요" : "추천하기").suit(16, .bold, lineHeight: 22.4)
                            .foregroundStyle(recommended ? DS.Palette.brandPrimary : .black)
                        if !recommended {
                            Text("엉따 +0.1°").suit(12, .medium, lineHeight: 18).foregroundStyle(Color(hex: 0x0D4054))
                        }
                    }
                    .frame(maxWidth: .infinity).frame(height: 46)
                    .background(recommended ? DS.Palette.brandSubtle : DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 28))
                }
                .buttonStyle(RoomPressStyle())
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
        }
        .frame(maxWidth: .infinity)
        .background {
            UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24).fill(DS.Palette.bgSurface).ignoresSafeArea(edges: .bottom)
        }
        // 의자(크게) 132, 시트 위로 62 걸침, 그림자 검정 45% 아래 10 흐림 18
        .overlay(alignment: .top) {
            Image("B-chair-stool").resizable().scaledToFit().frame(width: 132, height: 132)
                .shadow(color: .black.opacity(0.45), radius: 9, y: 10)
                .offset(y: -62)
                .allowsHitTesting(false)
        }
        .overlay(alignment: .topTrailing) {
            VStack(alignment: .trailing, spacing: 6) {
                Button { withAnimation(DS.Motion.stateIn) { menuOpen.toggle() } } label: {
                    HStack(spacing: 3) {
                        ForEach(0 ..< 3, id: \.self) { _ in Circle().fill(DS.Palette.textPrimary).frame(width: 4, height: 4) }
                    }
                    .frame(width: 44, height: 44)
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel("더보기")
                if menuOpen {
                    VStack(alignment: .leading, spacing: 0) {
                        menuRow("신고하기") { router.present(.report) }
                        menuRow("차단하기") { router.present(.block) }
                    }
                    .padding(.vertical, 4)
                    .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 12))
                    .shadow(color: .black.opacity(0.4), radius: 12, y: 6)
                    .transition(.opacity.combined(with: .scale(scale: 0.94, anchor: .topTrailing)))
                }
            }
            // 피그마 btn_더보기: 오른쪽 16, 위 16에 34 x 24(누르는 자리는 44로 넓힘)
            .padding(.top, 6).padding(.trailing, 11)
        }
        .ignoresSafeArea(edges: .bottom)
    }

    private func menuRow(_ title: String, _ action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(title).suit(14, .medium, tracking: -0.28).foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 120, height: 40, alignment: .leading)
                .padding(.horizontal, 16)
                .contentShape(Rectangle())
        }
        .buttonStyle(PressStyle())
    }

    private func close() {
        withAnimation(DS.Motion.emphasizedAccel) { shown = false }
        Task {
            try? await Task.sleep(for: .seconds(0.3))
            router.close()
        }
    }
}

/// 미니 프로필 이름 옆 말하는 중 막대(피그마 voice wave 23 x 14, 막대 3, 간격 2, #2EE59D)
private struct MiniVoiceWave: View {
    @State private var on = false
    private let heights: [CGFloat] = [5, 10, 14, 10, 5]
    var body: some View {
        HStack(spacing: 2) {
            ForEach(heights.indices, id: \.self) { i in
                RoundedRectangle(cornerRadius: 2).fill(DS.Palette.success)
                    .frame(width: 3, height: heights[i])
                    .scaleEffect(y: on ? ([0.5, 1.2, 0.7, 1.15, 0.6] as [CGFloat])[i] : 1)
                    .animation(.easeInOut(duration: 0.62 + Double(i) * 0.11).repeatForever(autoreverses: true), value: on)
            }
        }
        .frame(width: 23, height: 14)
        .onAppear { on = true }
    }
}

/// 신고와 차단 화면의 위험 색(피그마 btn, Button / Danger: #FF5A5F)
private let reportRed = Color(hex: 0xFF5A5F)

/// 피그마 글자 스타일(행간 140%, 자간 -2%)
private extension View {
    func rb(_ size: CGFloat, _ w: SUITWeight, _ c: Color) -> some View {
        suit(size, w, tracking: -0.02 * size, lineHeight: size * 1.4).foregroundStyle(c)
    }
}

/// 체크박스(피그마 checkbox: 칸 20, #6E767C 2px 테두리, 모서리 6, 글자 13 Medium, 간격 8). 켜면 하늘색 칸에 검은 체크.
private struct ReportCheckBox: View {
    let title: String
    @Binding var on: Bool
    var body: some View {
        Button {
            withAnimation(DS.Motion.stateIn) { on.toggle() }
            UISelectionFeedbackGenerator().selectionChanged()
        } label: {
            HStack(spacing: 8) {
                ZStack {
                    RoundedRectangle(cornerRadius: 6).fill(on ? DS.Palette.brandPrimary : .clear)
                    RoundedRectangle(cornerRadius: 6).strokeBorder(on ? DS.Palette.brandPrimary : DS.Palette.textTertiary, lineWidth: 2)
                    if on {
                        CheckMark().stroke(.black, style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round))
                            .frame(width: 14, height: 14)
                    }
                }
                .frame(width: 20, height: 20)
                Text(title).rb(13, .medium, DS.Palette.textPrimary)
            }
            .frame(minHeight: 44)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressStyle())
        .accessibilityAddTraits(on ? .isSelected : [])
    }
}

/// 피그마 icon/check(14 x 14) 선
private struct CheckMark: Shape {
    func path(in r: CGRect) -> Path {
        let k = r.width / 14
        var p = Path()
        p.move(to: CGPoint(x: r.minX + 11.6663 * k, y: r.minY + 3.5 * k))
        p.addLine(to: CGPoint(x: r.minX + 5.2497 * k, y: r.minY + 9.9167 * k))
        p.addLine(to: CGPoint(x: r.minX + 2.333 * k, y: r.minY + 7 * k))
        return p
    }
}

/// 신고(피그마 1647:22101 "바텀시트 · 신고"). 방 위에 Dim 60%를 깔고 아래에서 올라오는 시트(390 x 657, #121415, 위 모서리 24).
struct ReportView: View {
    @Environment(Router.self) private var router
    /// 고른 사유. 피그마와 웹처럼 첫 줄이 골라진 채로 열리고, 다른 줄을 누르면 그 줄만 켜진다.
    /// 고른 사유가 없을 때(nil)는 신고하기가 흐리고 눌리지 않는다.
    @State private var reason: Int? = 0
    @State private var alsoBlock = false
    @State private var detail = ""
    @State private var shown = false
    @FocusState private var typing: Bool
    // 사유 문구는 피그마 그대로(가운뎃점 포함)
    private let reasons = ["욕설 · 비하 · 혐오 표현", "성적인 발언", "개인정보를 묻거나 노출함", "스팸 · 홍보", "대화 방해 (도배 · 소음)", "기타"]

    var body: some View {
        ZStack(alignment: .bottom) {
            Color.black.opacity(shown ? 0.6 : 0).ignoresSafeArea().onTapGesture { close() }
            sheet.offset(y: shown ? 0 : 700)
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear { withAnimation(DS.Motion.decel(0.34)) { shown = true } }
    }

    private var sheet: some View {
        VStack(spacing: 16) {
            RoundedRectangle(cornerRadius: 2).fill(DS.Palette.textTertiary).frame(width: 40, height: 4)
            VStack(spacing: 4) {
                Text("딱딱한 나무 스툴12님을 신고할까요?").rb(18, .bold, DS.Palette.textPrimary).multilineTextAlignment(.center)
                Text("신고 사유를 하나 골라주세요").rb(13, .regular, DS.Palette.textSecondary).multilineTextAlignment(.center)
            }
            VStack(spacing: 4) {
                ForEach(reasons.indices, id: \.self) { i in
                    let on = reason == i
                    Button {
                        guard !on else { return }
                        withAnimation(DS.Motion.stateIn) { reason = i }
                        UISelectionFeedbackGenerator().selectionChanged()
                    } label: {
                        HStack(spacing: 12) {
                            ZStack {
                                Circle().strokeBorder(on ? DS.Palette.brandPrimary : DS.Palette.textTertiary, lineWidth: 2)
                                Circle().fill(DS.Palette.brandPrimary).frame(width: 10, height: 10).opacity(on ? 1 : 0)
                            }
                            .frame(width: 20, height: 20)
                            Text(reasons[i]).rb(14, on ? .bold : .medium, DS.Palette.textPrimary)
                            Spacer(minLength: 0)
                        }
                        .padding(.horizontal, 14)
                        .frame(height: 40)
                        .background(on ? DS.Palette.brandSubtle : .clear, in: RoundedRectangle(cornerRadius: 12))
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(PressStyle())
                    .accessibilityAddTraits(on ? .isSelected : [])
                }
            }
            // 상세 입력(선택) 342 x 76, #222628, 모서리 14
            ZStack(alignment: .topLeading) {
                RoundedRectangle(cornerRadius: 14).fill(DS.Palette.bgElevated)
                TextField("", text: $detail, prompt: Text("자세한 상황을 알려주세요 (선택)").foregroundStyle(DS.Palette.textTertiary), axis: .vertical)
                    .rb(13, .regular, DS.Palette.textPrimary)
                    .lineLimit(1 ... 2)
                    .focused($typing)
                    .onChange(of: detail) { _, v in if v.count > 200 { detail = String(v.prefix(200)) } }
                    .padding(.top, 12).padding(.horizontal, 14)
                Text("\(detail.count)/200").rb(11, .regular, DS.Palette.textTertiary).monospacedDigit()
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomTrailing)
                    .padding(.trailing, 11).padding(.bottom, 7)
            }
            .frame(height: 76)
            .onTapGesture { typing = true }
            // 정책 안내 342 x 58, #222628, 모서리 14, 안쪽 12 / 14, 정보 아이콘 16
            HStack(alignment: .top, spacing: 8) {
                Image("B2-icon-info").renderingMode(.template).resizable().frame(width: 16, height: 16)
                    .foregroundStyle(DS.Palette.brandPrimary)
                Text("신고해도 통화는 그대로 유지되고, 상대에게 알리지 않아요.  바로 대화를 끊고 싶다면 차단도 함께 해주세요.")
                    .rb(12, .regular, DS.Palette.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
                Spacer(minLength: 0)
            }
            .padding(.vertical, 12).padding(.horizontal, 14)
            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 14))
            ReportCheckBox(title: "차단도 함께 하기", on: $alsoBlock)
                .frame(height: 20)
            Button(action: submit) {
                Text("신고하기").suit(16, .bold, tracking: -0.64, lineHeight: 22.4).foregroundStyle(.white)
                    .frame(maxWidth: .infinity).frame(height: 46)
                    .background(reportRed, in: RoundedRectangle(cornerRadius: 28))
            }
            .buttonStyle(RoomPressStyle())
            // 사유를 고르기 전에는 흐리고 눌리지 않는다.
            .disabled(reason == nil)
            .opacity(reason == nil ? 0.4 : 1)
            .animation(DS.Motion.stateIn, value: reason)
        }
        .padding(.top, 14).padding(.horizontal, 24).padding(.bottom, 36)
        .frame(maxWidth: .infinity)
        .background {
            UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24).fill(DS.Palette.bgSurface)
                .ignoresSafeArea(.container, edges: .bottom)
        }
        .ignoresSafeArea(.container, edges: .bottom)
    }

    /// 신고하기: 시트를 닫고 방에 "신고가 접수됐어요"를 띄운다. 차단도 함께 하기를 켰어도 따로 창을 띄우지 않는다.
    private func submit() {
        guard reason != nil else { return }
        UINotificationFeedbackGenerator().notificationOccurred(.success)
        typing = false
        close()
        Task {
            try? await Task.sleep(for: .seconds(0.32))
            RoomToastCenter.shared.show("신고가 접수됐어요")
        }
    }

    private func close() {
        typing = false
        withAnimation(DS.Motion.emphasizedAccel) { shown = false }
        Task {
            try? await Task.sleep(for: .seconds(0.3))
            router.close()
        }
    }
}

/// 차단 확인(피그마 1647:22209 "모달 · 차단 확인"). 방 위 Dim 60%, 가운데 326 폭 창(#121415, #222628 1px 테두리, 모서리 24).
/// 차단해도 나는 이 방에 남으므로 창만 닫는다.
struct BlockView: View {
    @Environment(Router.self) private var router
    @State private var alsoReport = false
    @State private var shown = false
    private let facts = ["지금 바로 서로의 목소리와 채팅이 끊겨요", "앞으로 같은 방에 매칭되지 않아요", "나는 이 방에 계속 남아 있어요"]

    var body: some View {
        ZStack {
            Color.black.opacity(shown ? 0.6 : 0).ignoresSafeArea().onTapGesture { close() }
            VStack(spacing: 16) {
                // 금지 아이콘 원 56, #FF5A5F 15%, 아이콘 26
                ZStack {
                    Circle().fill(reportRed.opacity(0.15))
                    BanIcon().stroke(reportRed, style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round))
                        .frame(width: 26, height: 26)
                }
                .frame(width: 56, height: 56)
                Text("딱딱한 나무 스툴12님을\n차단할까요?").rb(18, .bold, DS.Palette.textPrimary).multilineTextAlignment(.center)
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(facts, id: \.self) { t in
                        HStack(spacing: 8) {
                            CheckMark().stroke(DS.Palette.textTertiary, style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round))
                                .frame(width: 14, height: 14)
                            Text(t).rb(13, .regular, DS.Palette.textPrimary)
                        }
                        .frame(height: 18)
                    }
                }
                .padding(.vertical, 14).padding(.horizontal, 16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 14))
                ReportCheckBox(title: "신고도 함께 하기", on: $alsoReport)
                    .frame(height: 20)
                HStack(spacing: 10) {
                    Button { close() } label: {
                        Text("취소").rb(15, .bold, DS.Palette.textPrimary)
                            .frame(maxWidth: .infinity).frame(height: 46)
                            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 26))
                    }
                    Button(action: block) {
                        Text("차단하기").rb(15, .bold, DS.Palette.textPrimary)
                            .frame(maxWidth: .infinity).frame(height: 46)
                            .background(reportRed, in: RoundedRectangle(cornerRadius: 26))
                    }
                }
                .buttonStyle(RoomPressStyle())
            }
            .padding(.top, 28).padding(.horizontal, 24).padding(.bottom, 24)
            .frame(width: 326)
            .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 24))
            .overlay(RoundedRectangle(cornerRadius: 24).strokeBorder(DS.Palette.bgElevated, lineWidth: 1))
            .scaleEffect(shown ? 1 : 0.92)
            .opacity(shown ? 1 : 0)
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear { withAnimation(DS.Motion.emphasizedDecel) { shown = true } }
    }

    /// 차단하기: 신고도 함께 하기를 켰든 안 켰든 창만 닫는다(차단해도 나는 이 방에 남는다).
    private func block() {
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        close()
    }

    private func close() {
        withAnimation(DS.Motion.emphasizedAccel) { shown = false }
        Task {
            try? await Task.sleep(for: .seconds(0.25))
            router.close()
        }
    }
}

/// 피그마 icon/ban(26 x 26): 원과 대각선
private struct BanIcon: Shape {
    func path(in r: CGRect) -> Path {
        let k = r.width / 26
        var p = Path()
        p.addEllipse(in: CGRect(x: r.minX + 2.167 * k, y: r.minY + 2.166 * k, width: 21.667 * k, height: 21.667 * k))
        p.move(to: CGPoint(x: r.minX + 5.309 * k, y: r.minY + 5.309 * k))
        p.addLine(to: CGPoint(x: r.minX + 20.692 * k, y: r.minY + 20.692 * k))
        return p
    }
}

// MARK: - 혼자 드르륵(AI 드르륵 의자)
// 피그마 흐름: 방을 찾지 못함(1647:25167)에서 "혼자 드르륵 앉기"를 누르면 혼자 방(영상 1647:25199)에 앉는다.
// 처음 들어오면 혼자 드르륵 온보딩 두 장(1647:22976, 1647:23028)이 이 방 위에 겹쳐 뜬다.
// 고민 배너를 누르면 펼쳐지고(1647:25052), 퀵슬롯을 펼치면 개수 배지와 쿨타임이 보인다(1647:24874).
// 이야기가 이어지다 비슷한 고민의 사람들을 찾으면 안내 창이 뜨고(1804:12770), "함께 드르륵 앉기"는 함께 방으로 옮긴다.

private struct SoloLine: Identifiable, Hashable {
    let id = UUID()
    let text: String
    let opacity: Double
}

struct RoomSoloView: View {
    var forceOnboarding = false
    @Environment(Router.self) private var router
    @State private var model = RoomModel.solo()
    @State private var stage = 0
    @State private var mine: String?
    @State private var found = false
    @State private var emojiOpen = false
    @State private var flying: [FlyingEmoji] = []
    @State private var showOnboarding: Bool

    init(forceOnboarding: Bool = false) {
        self.forceOnboarding = forceOnboarding
        _showOnboarding = State(initialValue: forceOnboarding || !OnboardingSeen.solo)
    }

    /// 처음 인사(1647:25199)와 이야기가 이어진 뒤(1647:24874)의 AI 드르륵 의자 말
    private let firstLines = [SoloLine(text: "많이 당황했겠다. 지금은 좀 어때?", opacity: 1)]
    private let laterLines = [
        SoloLine(text: "그 친구가 널 좀 질투하나봐", opacity: 0.3),
        SoloLine(text: "속상한 마음은 좀 괜찮아졌어?", opacity: 0.7),
        SoloLine(text: "푹자고 일어나서 학교 가!", opacity: 1),
    ]

    var body: some View {
        GeometryReader { geo in
            let map = SceneMap(size: geo.size)
            ZStack(alignment: .topLeading) {
                Image("B-field-scene").resizable().scaledToFill()
                    .frame(width: geo.size.width, height: geo.size.height).clipped()
                ForEach(model.landed) { item in
                    LandedSnack(asset: item.asset, angle: item.angle)
                        .position(map.point(item.point.x, item.point.y))
                        .transition(.identity)
                }
                LinearGradient(stops: [.init(color: .black.opacity(0), location: 0), .init(color: .black, location: 0.65)], startPoint: .top, endPoint: .bottom)
                    .frame(height: 334).frame(maxHeight: .infinity, alignment: .bottom).allowsHitTesting(false)
                chrome
                if found {
                    FoundModal(
                        onStay: { withAnimation(DS.Motion.emphasizedAccel) { found = false } },
                        onJoin: {
                            router.pop()
                            router.push(.room)
                        }
                    )
                    .transition(.opacity)
                    .zIndex(5)
                }
            }
        }
        .ignoresSafeArea()
        .background(DS.Palette.bgBase)
        .overlay { RoomToastLayer().ignoresSafeArea() }
        .overlay {
            if showOnboarding {
                OnboardingOverlay(pages: OnboardingPages.solo) {
                    withAnimation(DS.Motion.emphasizedAccel) { showOnboarding = false }
                }
                .transition(.opacity)
            }
        }
        .onAppear { OnboardingSeen.solo = true }
        .toolbar(.hidden, for: .navigationBar)
        .task(id: showOnboarding) { await play() }
        .task { await watchClock() }
    }

    private var chrome: some View {
        VStack(spacing: 0) {
            Color.clear.frame(height: max(roomTopInset(), 47))
            RoomHeader(model: model, onBack: { router.pop() }, onToggle: {
                UISelectionFeedbackGenerator().selectionChanged()
            })
            .frame(height: 56)
            TopicBanner(model: model)
                .padding(.horizontal, 24)
                .padding(.top, 5)
            HStack {
                Spacer()
                SoloQuickSlot(model: model) { snack in throwSnack(snack) }
            }
            .padding(.trailing, 24)
            .padding(.top, 28)
            Spacer(minLength: 0)
            chat
                .padding(.horizontal, 24)
                .overlay(alignment: .bottomLeading) {
                    if emojiOpen {
                        EmojiMenu { pick in sendEmoji(pick) }
                            .padding(.leading, 24).padding(.bottom, -14)
                            .transition(.opacity.combined(with: .scale(scale: 0.86, anchor: .bottomLeading)).combined(with: .offset(y: 18)))
                    }
                }
                .overlay { ForEach(flying) { FlyingEmojiView(item: $0) } }
            RoomInputBar(emojiOpen: $emojiOpen) { t in
                withAnimation(DS.Motion.emphasizedDecel) { mine = t }
            }
                .padding(.horizontal, 24)
                .padding(.top, 20)
                .padding(.bottom, 24)
        }
    }

    /// 채팅 줄(피그마 row: 이름 12 흰 50%, 말풍선 #222628 모서리 14, 안쪽 8 / 12, 글자 14). 내 말은 하늘색.
    private var chat: some View {
        VStack(alignment: .leading, spacing: 8) {
            if stage == 0 {
                VStack(alignment: .leading, spacing: 4) {
                    Text("AI 드르륵 의자").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary.opacity(0.5))
                        .shadow(color: .black.opacity(0.4), radius: 2)
                    bubble(firstLines[0].text)
                }
                .transition(.opacity)
            } else {
                ForEach(laterLines) { line in
                    bubble(line.text).opacity(line.opacity)
                        .transition(.opacity.combined(with: .offset(y: 10)))
                }
            }
            if let mine {
                Text(mine).suit(14, .medium, tracking: -0.56, lineHeight: 19.6).foregroundStyle(.black)
                    .padding(.horizontal, 12).padding(.vertical, 8)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                    .frame(maxWidth: .infinity, alignment: .trailing)
                    .transition(.opacity.combined(with: .offset(y: 8)))
            }
        }
    }

    private func bubble(_ text: String) -> some View {
        Text(text).suit(14, .medium, tracking: -0.56, lineHeight: 19.6).foregroundStyle(DS.Palette.textPrimary)
            .padding(.horizontal, 12).padding(.vertical, 8)
            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
    }

    /// 대화 흐름. 온보딩을 닫은 뒤부터 흐른다.
    /// 1초 뒤 내 말이 잠깐 떴다 사라지고, 6초에 AI 말이 이어지고, 7.2초에 내 답, 10초에 사람을 찾았다는 안내가 뜬다.
    private func play() async {
        guard !showOnboarding, stage == 0 else { return }
        func wait(_ s: Double) async -> Bool {
            try? await Task.sleep(for: .seconds(s))
            return !Task.isCancelled
        }
        guard await wait(1.0) else { return }
        withAnimation(DS.Motion.emphasizedDecel) { mine = "원래부터 걔가 나한테 좀…" }
        guard await wait(2.6) else { return }
        withAnimation(DS.Motion.standard) { mine = nil }
        guard await wait(2.4) else { return }
        withAnimation(DS.Motion.emphasizedDecel) { stage = 1 }
        guard await wait(1.2) else { return }
        withAnimation(DS.Motion.emphasizedDecel) { mine = "고마워. 덕분에 마음이 조금 나아졌어." }
        guard await wait(2.8) else { return }
        UINotificationFeedbackGenerator().notificationOccurred(.success)
        withAnimation(DS.Motion.emphasizedDecel) { found = true }
    }

    private func throwSnack(_ snack: RoomModel.Snack) {
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        withAnimation(DS.Motion.decel(0.62)) {
            if let item = model.throwSnack(snack.id) {
                Task {
                    try? await Task.sleep(for: .seconds(LandedSnack.stay))
                    model.removeLanded(item.id)
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

    /// 혼자 방도 해 뜨기 시계를 따른다(화면 20:00, 실제 180초). 0이 되면 아침 화면으로 넘어간다.
    private func watchClock() async {
        while !Task.isCancelled {
            if model.remaining(at: .now) <= 0 {
                router.push(.roomMorning)
                return
            }
            try? await Task.sleep(for: .seconds(0.5))
        }
    }
}

/// 비슷한 고민의 사람들을 찾았다는 안내 창(피그마 1804:12770 "모달": 326 폭, #121415, #222628 1px 테두리, 모서리 24).
private struct FoundModal: View {
    let onStay: () -> Void
    let onJoin: () -> Void
    @State private var shown = false
    var body: some View {
        ZStack {
            Color.black.opacity(0.35).ignoresSafeArea().onTapGesture(perform: onStay)
            VStack(spacing: 16) {
                Image("tab-home").renderingMode(.template).resizable().scaledToFit().foregroundStyle(DS.Palette.brandPrimary)
                    .frame(width: 32, height: 32).frame(width: 56, height: 56).background(DS.Palette.brandSubtle, in: Circle())
                VStack(spacing: 4) {
                    Text("비슷한 고민의 사람들을\n발견했어요!").suit(18, .bold, tracking: -0.36, lineHeight: 25.2).multilineTextAlignment(.center)
                        .foregroundStyle(DS.Palette.textPrimary)
                    Text("지금 바로 함께 앉아서 이야기 할까요?").suit(13, .regular, tracking: -0.26, lineHeight: 18.2)
                        .foregroundStyle(DS.Palette.textSecondary)
                }
                HStack(spacing: 10) {
                    Button(action: onStay) {
                        Text("마저 얘기하기").suit(15, .bold, tracking: -0.3).foregroundStyle(DS.Palette.textPrimary)
                            .frame(maxWidth: .infinity).frame(height: 46)
                            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 26))
                    }
                    Button(action: onJoin) {
                        Text("함께 드르륵 앉기").suit(15, .bold, tracking: -0.3).foregroundStyle(.black)
                            .frame(maxWidth: .infinity).frame(height: 46)
                            .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 26))
                    }
                }
                .buttonStyle(RoomPressStyle())
            }
            .padding(.top, 28).padding(.horizontal, 24).padding(.bottom, 24)
            .frame(width: 326)
            .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 24))
            .overlay(RoundedRectangle(cornerRadius: 24).strokeBorder(DS.Palette.bgElevated, lineWidth: 1))
            .scaleEffect(shown ? 1 : 0.92)
            .opacity(shown ? 1 : 0)
        }
        .onAppear { withAnimation(DS.Motion.emphasizedDecel) { shown = true } }
    }
}

// MARK: - 종료, 아침, 오늘 나눈 대화
// 피그마 "종료"(2023:30658, 옛 1647:26726을 대신함), "DRRRK / 아침"(1647:26876), "DRRRK / 오늘 나눈 대화"(1647:27027)의 자리와 글자 값을 그대로 옮겼다.
// 글자는 모두 SUIT, 행간 140%, 자간 -4%다.

private extension View {
    /// 피그마 글자 스타일: 크기, 굵기, 행간 140%, 자간 -4%
    func fig(_ size: CGFloat, _ w: SUITWeight, _ c: Color) -> some View {
        suit(size, w, tracking: -0.04 * size, lineHeight: size * 1.4).foregroundStyle(c)
    }
}

private enum ReportKind { case end, morning, summary }

/// 00 엉따온도 카드(342 x 188, #222628, 모서리 20, 안쪽 24 / 20)
private struct WarmthCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            (Text("오늘 대화에서 의자가\n").foregroundColor(DS.Palette.textPrimary)
                + Text("1.1°C ").foregroundColor(DS.Palette.brandPrimary)
                + Text("더 뜨끈해졌어요").foregroundColor(DS.Palette.textPrimary))
                .suit(24, .bold, tracking: -0.96, lineHeight: 33.6)
                .frame(maxWidth: .infinity, alignment: .leading)
            VStack(spacing: 12) {
                HStack(alignment: .center, spacing: 0) {
                    HStack(spacing: 4) {
                        Text("엉따 온도").fig(16, .bold, DS.Palette.textPrimary)
                        Image("B-icon-info").renderingMode(.template).resizable().frame(width: 12, height: 12)
                            .foregroundStyle(DS.Palette.textPrimary)
                    }
                    Spacer(minLength: 0)
                    Text("39.2°").fig(24, .bold, DS.Palette.accentOrange)
                }
                .frame(height: 36)
                GeometryReader { g in
                    ZStack(alignment: .leading) {
                        Capsule().fill(DS.Palette.bgSurface)
                        Capsule().fill(LinearGradient(colors: [DS.Palette.brandPrimary, DS.Palette.accentOrange], startPoint: .leading, endPoint: .trailing))
                            .frame(width: g.size.width * 224 / 302)
                    }
                }
                .frame(height: 12)
            }
        }
        .padding(.vertical, 24).padding(.horizontal, 20)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 20))
    }
}

/// 섹션 머리: 제목 20 굵게, 설명 12
private struct SectionHead: View {
    let title: String
    let desc: String
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title).fig(20, .bold, DS.Palette.textPrimary)
            Text(desc).fig(12, .regular, DS.Palette.textSecondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

/// 02 오늘 나눈 대화: 칩과 단계 세 줄(번호 원 24, 잇는 선 4 x 40)
private struct TalkTimeline: View {
    var gap: CGFloat
    /// 아침(1647:26923)만 3단계 설명이 "디엠으로"가 들어간 글이다. 종료(1647:26790)와 오늘 나눈 대화(1647:27059)는 같다.
    var morning = false
    private var steps: [(String, String)] {
        [
            ("고민을 꺼냈어요", "\"이거 일부러야?\"로 이야기가 시작됐어요"),
            ("서로의 생각을 나눴어요", "서운한 마음에 공감하면서, 실수였을 가능성도 얘기했어요."),
            ("다음 행동을 정했어요", morning ? "다음엔 한번 디엠으로 직접 말해보기로 했어요" : "다음엔 한번 직접 말해보기로 했어요"),
        ]
    }
    var body: some View {
        VStack(alignment: .leading, spacing: gap) {
            VStack(alignment: .leading, spacing: 8) {
                Text("오늘 나눈 대화").fig(20, .bold, DS.Palette.textPrimary)
                HStack(spacing: 8) {
                    Text("오늘의 고민").fig(12, .bold, DS.Palette.brandPrimary)
                        .padding(.vertical, 4).padding(.horizontal, 8)
                        .background(DS.Palette.brandSubtle, in: Capsule())
                    Text("둘이 찍은 사진, 자기만 보정한 친구").fig(12, .medium, DS.Palette.textTertiary)
                }
            }
            VStack(alignment: .leading, spacing: 0) {
                ForEach(steps.indices, id: \.self) { i in
                    let last = i == steps.count - 1
                    HStack(alignment: .top, spacing: 12) {
                        VStack(spacing: 4) {
                            Text("\(i + 1)").fig(12, .bold, DS.Palette.textSecondary)
                                .frame(width: 24, height: 24).background(DS.Palette.bgElevated, in: Circle())
                            if !last { Rectangle().fill(DS.Palette.bgElevated).frame(width: 4, height: 40) }
                        }
                        .frame(width: 24)
                        VStack(alignment: .leading, spacing: 4) {
                            Text(steps[i].0).fig(16, .bold, DS.Palette.textPrimary)
                            Text(steps[i].1).fig(12, .regular, DS.Palette.textSecondary)
                        }
                        .padding(.top, 4).padding(.bottom, last ? 0 : 20)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
            }
        }
    }
}

/// 03 베스트 댓글 카드(#222628, 모서리 16, 안쪽 16)
private struct BestCard: View {
    let name: String
    let text: String
    let likes: String?
    let asset: String
    var dark = true
    /// 종료(2023:30715, 30723, 30729)와 오늘 나눈 대화(2023:30479, 30487, 30493)의 "의자 프로필" 24 원은
    /// 피그마에서 원째(#121415 바탕과 28 x 28 그림을 원으로 자른 모양) 내보낸 M-end-avatar 그림을 그대로 쓴다.
    var exported = false
    /// 웹 taps.js thumbs와 같이 따봉을 누르면 수가 하나 오르고 다시 누르면 내려간다.
    @State private var liked = false
    @State private var pop = false
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                // 피그마 Thumb 24 원 안에서 의자 그림(Chair 24 x 24)이 4 아래로 내려가 있다(1647:26800, 26815, 26828).
                if exported {
                    Image(asset).resizable().frame(width: 24, height: 24)
                } else {
                    Image(asset).resizable().scaledToFill().frame(width: 24, height: 24).offset(y: 4)
                        .frame(width: 24, height: 24)
                        .background(dark ? DS.Palette.bgSurface : .clear).clipShape(Circle())
                }
                Text(name).fig(12, .bold, DS.Palette.textSecondary)
            }
            HStack(alignment: .center, spacing: 8) {
                Text(text).fig(16, .medium, DS.Palette.textPrimary).lineLimit(1)
                Spacer(minLength: 0)
                if let likes {
                    Button {
                        withAnimation(DS.Motion.stateIn) { liked.toggle() }
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { pop = true }
                        Task {
                            try? await Task.sleep(for: .milliseconds(150))
                            withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { pop = false }
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "hand.thumbsup.fill").font(.system(size: 12)).frame(width: 16, height: 16)
                                .scaleEffect(pop ? 1.25 : 1)
                            Text("\((Int(likes) ?? 0) + (liked ? 1 : 0))").fig(12, .bold, DS.Palette.brandPrimary)
                                .contentTransition(.numericText())
                        }
                        .foregroundStyle(DS.Palette.brandPrimary)
                    }
                    .buttonStyle(PressStyle())
                    .accessibilityLabel(liked ? "따봉 취소" : "따봉")
                }
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 16))
    }
}

/// 04 대화 상대 추천: 양쪽 화살표와 의자 세 칸. 최대 두 명까지 고른다.
/// 아침(1647:26978): 화살표 28 x 84(왼쪽 30%), 칸 80, 이름 16, 줄은 왼쪽 붙임(24에서 360까지), "1명 선택 · 최대 2명".
/// 피그마 그대로 택배상자와 스툴의 얼굴은 80 x 84, 소파 얼굴은 80 x 80이고 의자 그림 84 x 84를 얼굴 왼쪽 위에 맞춰 자른다.
/// compact는 오늘 나눈 대화 04 묶음(2023:30497): 화살표 24 x 72(왼쪽 30%), 칸 72, 이름 12, 줄은 가운데(43에서 347까지),
/// 칸은 "진실의 의자10", "새벽2시 피시방"(고른 상태, 하늘색), "딱딱한 나무 스툴12". 칸 그림은 72 원(#222628)과 의자 56을
/// 한 장으로 내보낸 M-end-pick 그림이다.
/// 웹 taps.js chairPicker와 같은 동작: 의자를 누르면 이름이 하늘색이 되고 그림이 살짝(1.06배) 튄다. 세 번째를 고르면 처음 고른 의자가 빠진다.
/// 오른쪽 화살표는 줄을 한 칸 왼쪽으로 밀며(300ms) 첫 칸을 옅게 빼서 맨 뒤에 다시 들이고(160ms), 왼쪽 화살표는 그 반대다.
private struct RecommendPicker: View {
    let cell: CGFloat
    let showCount: Bool
    let compact: Bool
    /// 고른 순서대로 쌓는다. 맨 앞이 처음 고른 의자다.
    @State private var picked: [String]
    /// 지금 줄에 놓인 순서
    @State private var order: [String]
    @State private var shift: CGFloat = 0
    @State private var hidden: String?
    @State private var bump: String?
    @State private var busy = false
    private let gap: CGFloat = 12

    init(cell: CGFloat = 80, showCount: Bool = true, compact: Bool = false) {
        self.cell = cell
        self.showCount = showCount
        self.compact = compact
        _picked = State(initialValue: compact ? ["swivel"] : ["sofa"])
        _order = State(initialValue: compact ? ["lime", "swivel", "stool"] : ["box", "sofa", "stool"])
    }

    private var people: [String: (String, String)] {
        compact
            ? ["lime": ("진실의\n의자10", "M-end-pick-lime"),
               "swivel": ("새벽2시\n피시방", "M-end-pick-swivel"),
               "stool": ("딱딱한\n나무 스툴12", "M-end-pick-stool")]
            : ["box": ("새벽2시\n택배상자", "B-chair-box"),
               "sofa": ("따뜻한\n가죽소파29", "B-chair-sofa"),
               "stool": ("딱딱한\n나무 스툴12", "B-chair-stool")]
    }

    private var stepWidth: CGFloat {
        cell + gap
    }

    private func faceHeight(_ key: String) -> CGFloat {
        key == "sofa" ? cell : cell + 4
    }

    private func toggle(_ key: String) {
        withAnimation(DS.Motion.stateIn) {
            if let i = picked.firstIndex(of: key) {
                picked.remove(at: i)
            } else {
                picked.append(key)
                if picked.count > 2 { picked.removeFirst() }
            }
        }
        UISelectionFeedbackGenerator().selectionChanged()
        guard picked.contains(key) else { return }
        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { bump = key }
        Task {
            try? await Task.sleep(for: .milliseconds(150))
            withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { if bump == key { bump = nil } }
        }
    }

    private func step(_ dir: Int) {
        guard !busy, order.count > 1 else { return }
        busy = true
        UISelectionFeedbackGenerator().selectionChanged()
        let quiet: Transaction = { var t = Transaction(); t.disablesAnimations = true; return t }()
        if dir > 0 {
            let first = order[0]
            withAnimation(DS.Motion.standard) { shift = -stepWidth; hidden = first }
            Task {
                try? await Task.sleep(for: .milliseconds(300))
                withTransaction(quiet) { order.append(order.removeFirst()); shift = 0 }
                withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.16)) { hidden = nil }
                busy = false
            }
        } else {
            let last = order[order.count - 1]
            withTransaction(quiet) { order.insert(order.removeLast(), at: 0); shift = -stepWidth; hidden = last }
            Task {
                try? await Task.sleep(for: .milliseconds(16))
                withAnimation(DS.Motion.standard) { shift = 0; hidden = nil }
                try? await Task.sleep(for: .milliseconds(300))
                busy = false
            }
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if showCount {
                HStack(spacing: 4) {
                    Text("\(picked.count)명 선택").fig(12, .bold, DS.Palette.brandPrimary)
                        .contentTransition(.numericText())
                    Text("· 최대 2명").fig(12, .medium, DS.Palette.textTertiary)
                }
            }
            HStack(alignment: .top, spacing: 8) {
                arrow(left: true)
                HStack(alignment: .top, spacing: gap) {
                    ForEach(order, id: \.self) { key in
                        let p = people[key] ?? ("", "")
                        let on = picked.contains(key)
                        Button { toggle(key) } label: {
                            VStack(spacing: 8) {
                                Group {
                                    if compact {
                                        Image(p.1).resizable().frame(width: cell, height: cell)
                                    } else {
                                        Image(p.1).resizable().scaledToFill()
                                            .frame(width: cell + 4, height: cell + 4)
                                            .frame(width: cell, height: faceHeight(key), alignment: .topLeading)
                                            .background(DS.Palette.bgSurface).clipShape(Capsule())
                                    }
                                }
                                .scaleEffect(bump == key ? 1.06 : 1)
                                Text(p.0).fig(compact ? 12 : 16, .medium, on ? DS.Palette.brandPrimary : DS.Palette.textPrimary)
                                    .multilineTextAlignment(.center).fixedSize()
                            }
                            .frame(width: cell)
                        }
                        .buttonStyle(PressStyle())
                        .opacity(hidden == key ? 0 : 1)
                        .allowsHitTesting(!busy)
                        .accessibilityAddTraits(on ? .isSelected : [])
                    }
                }
                .offset(x: shift)
                .frame(width: cell * 3 + gap * 2, alignment: .leading)
                .clipped()
                arrow(left: false)
            }
            .frame(maxWidth: .infinity, alignment: compact ? .center : .leading)
        }
    }

    /// 화살표 모양과 흐림(왼쪽 30%)은 피그마 그대로 두고, 누르면 줄을 한 칸씩 돌린다.
    private func arrow(left: Bool) -> some View {
        let size: CGFloat = compact ? 24 : 28
        return Button { step(left ? -1 : 1) } label: {
            Image("icon-chevron-left").renderingMode(.template).resizable().frame(width: size, height: size)
                .foregroundStyle(DS.Palette.textPrimary)
                .rotationEffect(.degrees(left ? 0 : 180))
                .opacity(left ? 0.3 : 1)
                .frame(width: size, height: compact ? 72 : 84)
        }
        .buttonStyle(PressStyle())
        .accessibilityLabel(left ? "이전 의자" : "다음 의자")
    }
}

/// 종료 04 대화 상대 추천(2023:30737): 가운데 의자 한 개를 크게 보여 주고 좌우 화살표로 한 칸씩 넘긴다.
/// 피그마 값: 줄 304(43에서 347까지) = 화살표 24 x 72, 사이 8, 칸 자리 240, 사이 8, 화살표 24 x 72. 칸 72 x 116은 240 가운데(159).
/// 그림은 72 원(#222628)과 의자 56(8, 8)을 한 장으로 내보낸 M-end-pick 그림, 이름 12 Medium 가운데.
/// 피그마 첫 모습은 "차가운 새벽의자92"이고 왼쪽 화살표가 또렷하고 오른쪽 화살표가 30%다. 그래서 이 의자를 줄의 마지막 칸으로 두고
/// 끝에 닿은 쪽 화살표를 30%로 흐리게 한다. 나머지 칸은 같은 방 의자(오늘 나눈 대화 2023:30510, 30515, 30520 칸)다.
/// 가운데 의자를 누르면 이름이 하늘색으로 켜지고 꺼진다(피그마에 고른 상태 그림이 없어 이름 색만 바꾼다). 최대 두 명이고,
/// 세 번째를 고르면 처음 고른 의자가 빠진다(웹 taps.js chairPicker와 같은 규칙).
private struct SingleChairPicker: View {
    private let chairs: [(key: String, name: String, asset: String)] = [
        ("lime", "진실의\n의자10", "M-end-pick-lime"),
        ("swivel", "새벽2시\n피시방", "M-end-pick-swivel"),
        ("stool", "딱딱한\n나무 스툴12", "M-end-pick-stool"),
        ("white", "차가운\n새벽의자92", "M-end-pick-white"),
    ]
    @State private var index = 3
    @State private var picked: [String] = []
    @State private var forward = true
    @State private var bump = false

    private func go(_ dir: Int) {
        let next = index + dir
        guard chairs.indices.contains(next) else { return }
        UISelectionFeedbackGenerator().selectionChanged()
        forward = dir > 0
        withAnimation(DS.Motion.standard) { index = next }
    }

    private func toggle(_ key: String) {
        withAnimation(DS.Motion.stateIn) {
            if let i = picked.firstIndex(of: key) {
                picked.remove(at: i)
            } else {
                picked.append(key)
                if picked.count > 2 { picked.removeFirst() }
            }
        }
        UISelectionFeedbackGenerator().selectionChanged()
        guard picked.contains(key) else { return }
        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { bump = true }
        Task {
            try? await Task.sleep(for: .milliseconds(150))
            withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { bump = false }
        }
    }

    var body: some View {
        HStack(alignment: .top, spacing: 8) {
            arrow(left: true)
            ZStack(alignment: .top) {
                let chair = chairs[index]
                let on = picked.contains(chair.key)
                Button { toggle(chair.key) } label: {
                    VStack(spacing: 8) {
                        Image(chair.asset).resizable().frame(width: 72, height: 72)
                            .scaleEffect(bump ? 1.06 : 1)
                        Text(chair.name).fig(12, .medium, on ? DS.Palette.brandPrimary : DS.Palette.textPrimary)
                            .multilineTextAlignment(.center).fixedSize()
                    }
                    .frame(width: 72, height: 116, alignment: .top)
                }
                .buttonStyle(PressStyle())
                .accessibilityAddTraits(on ? .isSelected : [])
                .id(chair.key)
                .transition(.asymmetric(
                    insertion: .offset(x: forward ? 84 : -84).combined(with: .opacity),
                    removal: .offset(x: forward ? -84 : 84).combined(with: .opacity)
                ))
            }
            .frame(width: 240, height: 116)
            .clipped()
            arrow(left: false)
        }
        .frame(maxWidth: .infinity)
    }

    /// 화살표 24 x 72(아이콘 24가 세로 가운데). 끝에 닿은 쪽은 피그마처럼 30%로 흐리고 누르지 않는다.
    private func arrow(left: Bool) -> some View {
        let atEnd = left ? index == 0 : index == chairs.count - 1
        return Button { go(left ? -1 : 1) } label: {
            Image("icon-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                .foregroundStyle(DS.Palette.textPrimary)
                .rotationEffect(.degrees(left ? 0 : 180))
                .opacity(atEnd ? 0.3 : 1)
                .frame(width: 24, height: 72)
                .contentShape(Rectangle())
        }
        .buttonStyle(PressStyle())
        .disabled(atEnd)
        .accessibilityLabel(left ? "이전 의자" : "다음 의자")
    }
}

/// 리포트 본문. 피그마 Report 묶음의 순서와 간격.
/// 종료(2023:30661): 엉따 카드, 오늘 나눈 대화(12), 오늘의 드르륵 대화들, 도움이 된 유저(머리와 줄 사이 24, 의자 한 개), 묶음 사이 36.
/// 오늘 나눈 대화(2023:30425): 오늘 나눈 대화(12), 오늘의 드르륵 대화들, 도움이 된 유저(24, 의자 세 칸), 묶음 사이 36.
/// 아침(1647:26878): 엉따 카드, 오늘 나눈 대화(20), 오늘의 베스트 댓글, 도움이 된 의자(12, 선택 수, 의자 세 칸), 묶음 사이 40.
private struct ReportBody: View {
    let kind: ReportKind
    var body: some View {
        VStack(alignment: .leading, spacing: kind == .morning ? 40 : 36) {
            if kind != .summary { WarmthCard() }
            TalkTimeline(gap: kind == .morning ? 20 : 12, morning: kind == .morning)
            if kind == .morning {
                VStack(alignment: .leading, spacing: 12) {
                    SectionHead(title: "오늘의 베스트 댓글", desc: "의자들이 가장 많이 공감한 말이에요")
                    VStack(spacing: 8) {
                        BestCard(name: "따뜻한 가죽소파29", text: "그 친구 외모정병 레전드인듯..ㅠ", likes: "24", asset: "B-chair-sofa", dark: false)
                        BestCard(name: "새벽2시 택배상자", text: "다음 사진은 네가 먼저 보정해서 올려버려 ㅋㅋ", likes: "17", asset: "B-chair-box")
                        BestCard(name: "딱딱한 나무 스툴12", text: "걍 물어보면 안됨? 나 저런 애들 이해가 안돼", likes: "11", asset: "B-chair-stool")
                    }
                }
                VStack(alignment: .leading, spacing: 12) {
                    SectionHead(title: "도움이 된 의자가 있었나요?", desc: "좋은 이야기를 나눠준 유저를 추천해주세요")
                    RecommendPicker(cell: 80, showCount: true, compact: false)
                }
            } else {
                // 종료 2023:30711과 오늘 나눈 대화 2023:30475: 아바타는 연두 의자(33871c043e), 나무 스툴(51be0a544b), 회색 바퀴 의자(f77c03c1bf).
                VStack(alignment: .leading, spacing: 12) {
                    SectionHead(title: "오늘의 드르륵 대화들", desc: "유저들과 주로 이런 대화를 나눴어요")
                    VStack(spacing: 8) {
                        BestCard(name: "진실의 의자10", text: "그 친구 인성 레전드인듯..ㅠ", likes: nil, asset: "M-end-avatar-lime", exported: true)
                        BestCard(name: "따딱한 나무 스툴12", text: "다음엔 ‘엥 너 사진?’ 하고 물어봐봐 ㅋ", likes: nil, asset: "M-end-avatar-stool", exported: true)
                        BestCard(name: "새벽2시 피시방", text: "요즘 쌍수가 성형이냐", likes: nil, asset: "M-end-avatar-swivel", exported: true)
                    }
                }
                VStack(alignment: .leading, spacing: 24) {
                    SectionHead(title: "도움이 된 유저가 있었나요?", desc: "좋은 이야기를 나눠준 유저를 추천해주세요")
                    if kind == .end {
                        SingleChairPicker()
                    } else {
                        RecommendPicker(cell: 72, showCount: false, compact: true)
                    }
                }
            }
        }
    }
}

/// 아래 두 버튼(342 x 46, 모서리 28 / 글자 버튼, 사이 12). 피그마 btn과 둘째 글자.
private struct ReportButtons: View {
    let primary: String
    let secondary: String
    let filled: Bool
    let onPrimary: () -> Void
    let onSecondary: () -> Void
    var body: some View {
        VStack(spacing: 12) {
            Button(action: onPrimary) {
                Text(primary).fig(16, .bold, filled ? .black : DS.Palette.textSecondary)
                    .frame(maxWidth: .infinity).frame(height: 46)
                    .background(filled ? DS.Palette.brandPrimary : DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 28))
            }
            .buttonStyle(RoomPressStyle())
            Button(action: onSecondary) {
                Text(secondary).fig(14, .bold, DS.Palette.textSecondary).frame(maxWidth: .infinity).frame(height: 20)
            }
            .buttonStyle(PressStyle())
        }
    }
}

/// 결과 화면 틀. 뒤로 가기(24, 79)와 본문 스크롤. 아침과 오늘 나눈 대화는 아래 버튼이 검은 그라데이션(632에서 844, 높이 212) 위에 고정되고,
/// 종료는 긴 화면(1708) 맨 끝에 버튼이 붙는다(본문 끝 1548, 버튼 1590, 아래 여백 40).
/// 고정 버튼 화면은 본문 끝에 그라데이션 높이(212)만큼 빈 자리를 두어 맨 아래까지 밀면 마지막 줄이 버튼 묶음(위 726) 위로 올라온다.
private struct ReportScreen: View {
    let kind: ReportKind
    @Environment(Router.self) private var router

    var body: some View {
        ZStack(alignment: .bottom) {
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    backButton.padding(.top, 79 - 62)
                    if kind == .summary {
                        ReportBody(kind: kind).padding(.top, 160 - 103)
                    } else {
                        Text("아침이 밝아\n대화가 종료되었어요").fig(28, .bold, DS.Palette.textPrimary).padding(.top, 160 - 103)
                        hero
                        ReportBody(kind: kind)
                    }
                    if kind == .end {
                        buttons.padding(.top, 42).padding(.bottom, 40)
                    } else {
                        Color.clear.frame(height: 212)
                    }
                }
                .padding(.horizontal, 24)
            }
            .scrollIndicators(.hidden)
            if kind != .end {
                ZStack(alignment: .bottom) {
                    LinearGradient(colors: [.black.opacity(0), .black], startPoint: .top, endPoint: .bottom)
                        .frame(height: 212).allowsHitTesting(false)
                    buttons.padding(.horizontal, 24).padding(.bottom, 40)
                }
            }
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .ignoresSafeArea(edges: .bottom)
        .toolbar(.hidden, for: .navigationBar)
    }

    private var backButton: some View {
        Button { router.pop() } label: {
            Image("icon-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                .foregroundStyle(DS.Palette.textPrimary).contentShape(Rectangle())
        }
        .buttonStyle(PressStyle())
        .accessibilityLabel("뒤로")
    }

    /// 해 146 x 146 (122, 273), 엉따 카드는 452에서 시작. 아침(1951:20746)과 종료(2023:30769)가 같은 그림(해시 23749c04da)이다.
    private var hero: some View {
        Image("B-morning-sun").resizable().scaledToFit().frame(width: 146, height: 146)
            .frame(maxWidth: .infinity).padding(.top, 273 - 240).padding(.bottom, 452 - 419)
    }

    @ViewBuilder private var buttons: some View {
        if kind == .end {
            ReportButtons(primary: "커뮤니티에 고민 올리기", secondary: "올리지 않고 홈으로", filled: true,
                          onPrimary: { router.select(.community) }, onSecondary: { router.popToRoot() })
        } else {
            ReportButtons(primary: "함께 드르륵 앉기", secondary: "새 방 만들기", filled: false,
                          onPrimary: { router.popToRoot(); router.push(.room) }, onSecondary: { router.popToRoot() })
        }
    }
}

struct RoomEndView: View {
    var body: some View { ReportScreen(kind: .end) }
}

struct RoomMorningView: View {
    var body: some View { ReportScreen(kind: .morning) }
}

struct RoomSummaryView: View {
    var body: some View { ReportScreen(kind: .summary) }
}
