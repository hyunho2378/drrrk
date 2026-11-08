import SwiftUI

// 방 묶음 화면. 값은 팀 피그마(일반 모드 1647:23954, 이름 탭 1952:16328, 미니 프로필 1952:15659 / 15800,
// 신고 1647:22101, 차단 1647:22209, 혼자 드르륵 1647:24874 / 1804:12770, 종료 1647:26726, 아침 1647:26876,
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
            .buttonStyle(.plain)
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

struct RoomPressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(configuration.isPressed ? 0.85 : 1)
            .animation(DS.Motion.press, value: configuration.isPressed)
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

private struct TopicLine: View {
    let text: String
    var body: some View {
        HStack(spacing: 8) {
            Text("고민").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.brandPrimary)
            Text(text).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary).lineLimit(1)
            Spacer(minLength: 0)
            Image("icon-chevron-down").renderingMode(.template).resizable().foregroundStyle(DS.Palette.textPrimary).frame(width: 16, height: 16)
        }
        .padding(.horizontal, 14).padding(.vertical, 10)
        .background(DS.Palette.bgOverlay.opacity(0.6), in: RoundedRectangle(cornerRadius: 16))
        .padding(.horizontal, 24).padding(.top, 5)
    }
}

// MARK: - 일반 모드

struct RoomNormalView: View {
    @Environment(Router.self) private var router
    @State private var model = RoomModel()
    @State private var speaker = "진실의 의자10"
    @State private var emojiOpen = false
    @State private var flying: [FlyingEmoji] = []
    private let people = RoomPeople.normal

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button { router.pop() } label: {
                    Image("icon-chevron-left").renderingMode(.template).resizable()
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 24, height: 24)
                        .frame(width: 44, height: 44, alignment: .leading).contentShape(Rectangle())
                }
                .buttonStyle(.plain).accessibilityLabel("나가기")
                Spacer()
                ClockPill(model: model)
                Spacer()
                Button { router.pop() } label: {
                    Image("icon-view-field").renderingMode(.template).resizable().foregroundStyle(DS.Palette.textPrimary)
                        .frame(width: 18, height: 18).frame(width: 46, height: 32)
                        .background(DS.Palette.bgOverlay.opacity(0.6), in: Capsule())
                }
                .buttonStyle(.plain).accessibilityLabel("현장 모드로 보기")
            }
            .padding(.leading, 14).padding(.trailing, 24).frame(height: 56)

            TopicLine(text: model.topicShort)

            LazyVGrid(columns: [GridItem(.flexible(), spacing: 12), GridItem(.flexible(), spacing: 12)], spacing: 14) {
                ForEach(people) { p in
                    Button { router.push(.miniProfile) } label: {
                        ParticipantTile(person: p, speaking: p.name == speaker)
                    }
                    .buttonStyle(RoomPressStyle())
                    .disabled(p.isMe)
                }
            }
            .padding(.horizontal, 24).padding(.top, 16)

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

            RoomInputBar(emojiOpen: $emojiOpen)
                .padding(.horizontal, 24).padding(.top, 20).padding(.bottom, 24)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
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

struct MiniProfileView: View {
    @Environment(Router.self) private var router
    @State private var recommended = false
    @State private var shown = false
    var body: some View {
        ZStack(alignment: .bottom) {
            Color.black.opacity(shown ? 0.6 : 0).ignoresSafeArea().onTapGesture { router.pop() }
            VStack(spacing: 0) {
                Capsule().fill(DS.Palette.textTertiary).frame(width: 40, height: 4).padding(.top, 10)
                if recommended {
                    Text("딱딱한 나무 스툴12님의 엉따 지수가 0.3°\n올라갔어요")
                        .suit(12, .medium, tracking: -0.48).multilineTextAlignment(.center)
                        .foregroundStyle(DS.Palette.textPrimary)
                        .padding(.horizontal, 16).padding(.vertical, 10)
                        .background(DS.Palette.gray800, in: RoundedRectangle(cornerRadius: 12))
                        .padding(.top, 12)
                        .transition(.opacity.combined(with: .offset(y: -6)))
                }
                Image("B-chair-stool").resizable().scaledToFit().frame(width: 51, height: 51)
                    .frame(width: 84, height: 84).background(DS.Palette.bgElevated, in: Circle())
                    .padding(.top, 20)
                Text("딱딱한 나무 스툴12").suit(19, .bold, tracking: -0.38).foregroundStyle(DS.Palette.textPrimary).padding(.top, 12)
                HStack(spacing: 12) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("엉따 지수").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
                        Text("41.5°").suit(22, .bold, tracking: -0.44).foregroundStyle(DS.Palette.accentOrange)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading).padding(14)
                    .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
                    VStack(alignment: .leading, spacing: 4) {
                        Text("대표 업적 편의점").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
                        HStack(spacing: 4) {
                            Image("snack-shrimp").resizable().scaledToFit().frame(width: 25, height: 25)
                            Image("snack-soju").resizable().scaledToFit().frame(width: 30, height: 30)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading).padding(14)
                    .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
                }
                .padding(.top, 16)
                Button {
                    withAnimation(DS.Motion.emphasizedDecel) { recommended.toggle() }
                    UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                } label: {
                    Text(recommended ? "추천했어요" : "추천하기").suit(16, .bold, tracking: -0.32)
                        .foregroundStyle(recommended ? DS.Palette.brandPrimary : .black)
                        .frame(maxWidth: .infinity).frame(height: 52)
                        .background(recommended ? DS.Palette.brandSubtle : DS.Palette.brandPrimary, in: Capsule())
                }
                .buttonStyle(RoomPressStyle()).padding(.top, 20)
                HStack(spacing: 24) {
                    Button("신고하기") { router.push(.report) }
                    Button("차단하기") { router.push(.block) }
                }
                .suit(13, .medium, tracking: -0.26).foregroundStyle(DS.Palette.textSecondary)
                .padding(.top, 14).padding(.bottom, 12)
            }
            .padding(.horizontal, 24)
            .frame(maxWidth: .infinity)
            .background(DS.Palette.bgSurface, in: UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24))
            .offset(y: shown ? 0 : 500)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
        .onAppear { withAnimation(DS.Motion.decel(0.3)) { shown = true } }
    }
}

struct ReportView: View {
    @Environment(Router.self) private var router
    @State private var reason: Int? = nil
    @State private var alsoBlock = false
    @State private var detail = ""
    private let reasons = ["욕설, 비하, 혐오 표현", "성적인 발언", "개인정보를 묻거나 노출함", "스팸, 홍보", "대화 방해(도배, 소음)", "기타"]
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            BackHeader(onBack: { router.pop() })
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    Text("딱딱한 나무 스툴12님을 신고할까요?").suit(18, .bold, tracking: -0.36).foregroundStyle(DS.Palette.textPrimary)
                    Text("신고 사유를 하나 골라주세요").suit(13, .medium, tracking: -0.26).foregroundStyle(DS.Palette.textSecondary).padding(.top, 8)
                    VStack(spacing: 0) {
                        ForEach(reasons.indices, id: \.self) { i in
                            Button { withAnimation(DS.Motion.stateIn) { reason = i } } label: {
                                HStack {
                                    Text(reasons[i]).suit(14, .medium, tracking: -0.28).foregroundStyle(DS.Palette.textPrimary)
                                    Spacer()
                                    Circle().strokeBorder(reason == i ? DS.Palette.brandPrimary : DS.Palette.textTertiary, lineWidth: reason == i ? 6 : 1.5)
                                        .frame(width: 20, height: 20)
                                }
                                .frame(height: 44).contentShape(Rectangle())
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.top, 20)
                    Text("자세한 상황을 알려주세요 (선택)").suit(13, .medium, tracking: -0.26).foregroundStyle(DS.Palette.textSecondary).padding(.top, 20)
                    TextField("", text: $detail, axis: .vertical)
                        .suit(14).foregroundStyle(DS.Palette.textPrimary).lineLimit(3 ... 5)
                        .padding(14).background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                        .padding(.top, 8)
                    Text("\(detail.count)/200").suit(11).foregroundStyle(DS.Palette.textTertiary).frame(maxWidth: .infinity, alignment: .trailing).padding(.top, 6)
                    Text("신고해도 통화는 그대로 유지되고, 상대에게 알리지 않아요. 바로 대화를 끊고 싶다면 차단도 함께 해주세요.")
                        .suit(12, .medium, tracking: -0.24).foregroundStyle(DS.Palette.textSecondary).padding(.top, 14)
                    Toggle(isOn: $alsoBlock) { Text("차단도 함께 하기").suit(13, .medium).foregroundStyle(DS.Palette.textPrimary) }
                        .tint(DS.Palette.brandPrimary).padding(.top, 14)
                }
                .padding(.horizontal, 24)
            }
            PrimaryButton(title: "신고하기") { router.pop() }
                .disabled(reason == nil).opacity(reason == nil ? 0.4 : 1)
                .padding(.horizontal, 24).padding(.bottom, 16)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }
}

struct BlockView: View {
    @Environment(Router.self) private var router
    @State private var alsoReport = false
    var body: some View {
        ZStack {
            Color.black.opacity(0.6).ignoresSafeArea().onTapGesture { router.pop() }
            VStack(spacing: 0) {
                Text("딱딱한 나무 스툴12님을\n차단할까요?").suit(18, .bold, tracking: -0.36).multilineTextAlignment(.center).foregroundStyle(DS.Palette.textPrimary)
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(["지금 바로 서로의 목소리와 채팅이 끊겨요", "앞으로 같은 방에 매칭되지 않아요", "나는 이 방에 계속 남아 있어요"], id: \.self) {
                        Text($0).suit(13, .medium, tracking: -0.26).foregroundStyle(DS.Palette.textSecondary)
                    }
                }
                .padding(.top, 16)
                Toggle(isOn: $alsoReport) { Text("신고도 함께 하기").suit(13, .medium).foregroundStyle(DS.Palette.textPrimary) }
                    .tint(DS.Palette.brandPrimary).padding(.top, 16)
                HStack(spacing: 8) {
                    Button { router.pop() } label: {
                        Text("취소").suit(15, .bold).foregroundStyle(DS.Palette.textPrimary).frame(maxWidth: .infinity).frame(height: 48)
                            .background(DS.Palette.gray800, in: Capsule())
                    }
                    Button { router.popToRoot() } label: {
                        Text("차단하기").suit(15, .bold).foregroundStyle(.white).frame(maxWidth: .infinity).frame(height: 48)
                            .background(DS.Palette.danger, in: Capsule())
                    }
                }
                .buttonStyle(RoomPressStyle()).padding(.top, 20)
            }
            .padding(24)
            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 24))
            .padding(.horizontal, 24)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }
}

// MARK: - 혼자 드르륵(AI 드르륵 의자)

struct RoomSoloView: View {
    @Environment(Router.self) private var router
    @State private var model = RoomModel()
    @State private var found = false
    @State private var emojiOpen = false
    private let lines: [(String, Bool)] = [("조금씩 해가 뜨고있어", false), ("좀 괜찮아졌어?", false), ("푹자고 일어나서 학교 가!", false), ("고마워. 덕분에 마음이 조금 나아졌어.", true)]

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .top) {
                LinearGradient(colors: [.black.opacity(0), .black.opacity(0.7)], startPoint: .top, endPoint: .bottom)
                    .frame(height: 334).frame(maxHeight: .infinity, alignment: .bottom).allowsHitTesting(false)
                    .ignoresSafeArea()
                QuickSlotDock(model: model)
                    .padding(.top, 129)
                    .padding(.trailing, 24)
                    .frame(maxWidth: .infinity, alignment: .trailing)
                VStack(spacing: 0) {
                    HStack {
                        Button { router.pop() } label: {
                            Image("icon-chevron-left").renderingMode(.template).resizable().foregroundStyle(DS.Palette.textPrimary)
                                .frame(width: 24, height: 24).frame(width: 44, height: 44, alignment: .leading).contentShape(Rectangle())
                        }.buttonStyle(.plain).accessibilityLabel("나가기")
                        Spacer()
                        ClockPill(model: model)
                        Spacer()
                        Color.clear.frame(width: 46, height: 32)
                    }
                    .padding(.leading, 14).padding(.trailing, 24).frame(height: 56)
                    TopicLine(text: "오늘 자다가, 엄마 아빠 싸우는 소리에 잠이 깼…")
                    HStack(spacing: 5) {
                        Circle().fill(DS.Palette.success).frame(width: 7, height: 7)
                        Text("AI 드르륵 의자").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                    }
                    .padding(.top, 100)
                    Spacer()
                    VStack(alignment: .leading, spacing: 8) {
                        ForEach(lines.indices, id: \.self) { i in
                            Text(lines[i].0).suit(14, .medium, tracking: -0.56)
                                .foregroundStyle(lines[i].1 ? .black : DS.Palette.textPrimary)
                                .padding(.horizontal, 12).padding(.vertical, 8)
                                .background(lines[i].1 ? DS.Palette.brandPrimary : DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                                .frame(maxWidth: .infinity, alignment: lines[i].1 ? .trailing : .leading)
                                .opacity(i == 0 ? 0.4 : 1)
                        }
                    }
                    .padding(.horizontal, 24)
                    RoomInputBar(emojiOpen: $emojiOpen).padding(.horizontal, 24).padding(.top, 20).padding(.bottom, 12)
                }
                .frame(width: geo.size.width, height: geo.size.height)
                if found {
                    FoundModal(onStay: { withAnimation(DS.Motion.emphasizedAccel) { found = false } }, onJoin: { router.push(.room) })
                }
            }
        }
        .background {
            Image("B-field-scene").resizable().scaledToFill().ignoresSafeArea()
        }
        .background(DS.Palette.bgBase)
        .toolbar(.hidden, for: .navigationBar)
        .task {
            // 혼자 이야기하다 보면 비슷한 고민의 사람들을 찾았다는 안내가 뜬다.
            try? await Task.sleep(for: .seconds(8))
            withAnimation(DS.Motion.emphasizedDecel) { found = true }
        }
    }
}

private struct FoundModal: View {
    let onStay: () -> Void
    let onJoin: () -> Void
    var body: some View {
        ZStack {
            Color.black.opacity(0.5).ignoresSafeArea().onTapGesture(perform: onStay)
            VStack(spacing: 0) {
                Image("tab-home").renderingMode(.template).resizable().foregroundStyle(DS.Palette.brandPrimary)
                    .frame(width: 28, height: 28).frame(width: 56, height: 56).background(DS.Palette.brandSubtle, in: Circle())
                Text("비슷한 고민의 사람들을\n발견했어요!").suit(18, .bold, tracking: -0.36).multilineTextAlignment(.center)
                    .foregroundStyle(DS.Palette.textPrimary).padding(.top, 16)
                Text("지금 바로 함께 앉아서 이야기 할까요?").suit(13, .medium, tracking: -0.26).foregroundStyle(DS.Palette.textSecondary).padding(.top, 8)
                HStack(spacing: 8) {
                    Button(action: onStay) {
                        Text("마저 얘기하기").suit(15, .bold).foregroundStyle(DS.Palette.textPrimary).frame(maxWidth: .infinity).frame(height: 48)
                            .background(DS.Palette.gray800, in: Capsule())
                    }
                    Button(action: onJoin) {
                        Text("함께 드르륵 앉기").suit(15, .bold).foregroundStyle(.black).frame(maxWidth: .infinity).frame(height: 48)
                            .background(DS.Palette.brandPrimary, in: Capsule())
                    }
                }
                .buttonStyle(RoomPressStyle()).padding(.top, 24)
            }
            .padding(24)
            .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 24))
            .padding(.horizontal, 24)
            .transition(.opacity.combined(with: .scale(scale: 0.92)))
        }
    }
}

// MARK: - 종료, 아침, 오늘 나눈 대화

private struct SummaryBlock: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("오늘 나눈 대화").suit(20, .bold, tracking: -0.4).foregroundStyle(DS.Palette.textPrimary)
            HStack(spacing: 6) {
                Text("오늘의 고민").suit(12, .medium).foregroundStyle(DS.Palette.textSecondary)
                Text("둘이 찍은 사진, 자기만 보정한 친구").suit(12, .bold).foregroundStyle(DS.Palette.textPrimary)
            }
            .padding(.top, 16)
            VStack(alignment: .leading, spacing: 20) {
                step(1, "고민을 꺼냈어요", "\"이거 일부러야?\"로 이야기가 시작됐어요")
                step(2, "서로의 생각을 나눴어요", "서운한 마음에 공감하면서, 실수였을 가능성도 얘기했어요.")
                step(3, "다음 행동을 정했어요", "다음엔 한번 직접 말해보기로 했어요")
            }
            .padding(.top, 24)
            Text("오늘의 베스트 댓글").suit(20, .bold, tracking: -0.4).foregroundStyle(DS.Palette.textPrimary).padding(.top, 40)
            Text("의자들이 가장 많이 공감한 말이에요").suit(12, .medium).foregroundStyle(DS.Palette.textSecondary).padding(.top, 6)
            VStack(spacing: 12) {
                best("BEST 1", "따뜻한 가죽소파29", "그 친구 인성 레전드인듯..ㅠ", "24", "B-chair-sofa")
                best("BEST 2", "새벽2시 택배상자", "다음엔 ‘엥 너 사진?’ 하고 물어봐봐 ㅋ", "17", "B-chair-box")
                best("BEST 3", "딱딱한 나무 스툴12", "걍 물어보면 안됨? 나 저런 애들 이해가 안돼", "11", "B-chair-stool")
            }
            .padding(.top, 16)
            Text("도움이 된 의자가 있었나요?").suit(20, .bold, tracking: -0.4).foregroundStyle(DS.Palette.textPrimary).padding(.top, 40)
            Text("좋은 이야기를 나눠준 유저를 추천해주세요").suit(12, .medium).foregroundStyle(DS.Palette.textSecondary).padding(.top, 6)
            RecommendPicker().padding(.top, 20)
        }
    }

    private func step(_ n: Int, _ t: String, _ d: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Text("\(n)").suit(12, .bold).foregroundStyle(.black).frame(width: 24, height: 24).background(DS.Palette.brandPrimary, in: Circle())
            VStack(alignment: .leading, spacing: 6) {
                Text(t).suit(16, .bold, tracking: -0.32).foregroundStyle(DS.Palette.textPrimary)
                Text(d).suit(12, .medium, tracking: -0.24).foregroundStyle(DS.Palette.textSecondary).fixedSize(horizontal: false, vertical: true)
            }
        }
    }

    private func best(_ rank: String, _ name: String, _ text: String, _ likes: String, _ asset: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(asset).resizable().scaledToFit().frame(width: 18, height: 18).frame(width: 24, height: 24)
                .background(DS.Palette.bgSurface, in: Circle())
            VStack(alignment: .leading, spacing: 6) {
                HStack(spacing: 6) {
                    Text(rank).suit(12, .bold).foregroundStyle(DS.Palette.brandPrimary)
                    Text(name).suit(12, .medium).foregroundStyle(DS.Palette.textSecondary)
                }
                Text(text).suit(16, .medium, tracking: -0.32).foregroundStyle(DS.Palette.textPrimary)
            }
            Spacer()
            Text(likes).suit(12, .bold).foregroundStyle(DS.Palette.textSecondary)
        }
        .padding(16).background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
    }
}

private struct RecommendPicker: View {
    @State private var picked: Set<String> = []
    private let people = [("새벽2시\n택배상자", "B-chair-box"), ("따뜻한\n가죽소파29", "B-chair-sofa"), ("딱딱한\n나무 스툴12", "B-chair-stool")]
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 4) {
                Text("\(picked.count)명 선택").suit(12, .bold).foregroundStyle(DS.Palette.brandPrimary)
                Text("최대 2명").suit(12, .medium).foregroundStyle(DS.Palette.textTertiary)
            }
            HStack(spacing: 12) {
                ForEach(people, id: \.0) { p in
                    let on = picked.contains(p.0)
                    Button {
                        withAnimation(DS.Motion.stateIn) {
                            if on {
                                picked.remove(p.0)
                            } else if picked.count < 2 {
                                picked.insert(p.0)
                            }
                        }
                        UISelectionFeedbackGenerator().selectionChanged()
                    } label: {
                        VStack(spacing: 10) {
                            Image(p.1).resizable().scaledToFit().frame(width: 60, height: 60)
                                .frame(width: 84, height: 84).background(DS.Palette.bgElevated, in: Circle())
                                .overlay(Circle().strokeBorder(DS.Palette.brandPrimary, lineWidth: 2).opacity(on ? 1 : 0))
                            Text(p.0).suit(16, .bold, tracking: -0.32).multilineTextAlignment(.center)
                                .foregroundStyle(on ? DS.Palette.brandPrimary : DS.Palette.textPrimary)
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(RoomPressStyle())
                }
            }
        }
    }
}

private struct ResultScaffold<Top: View>: View {
    let primary: String
    let secondary: String
    let onPrimary: () -> Void
    let onSecondary: () -> Void
    @ViewBuilder let top: () -> Top
    var body: some View {
        ZStack(alignment: .bottom) {
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    top()
                    SummaryBlock().padding(.top, 40)
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 170)
            }
            .scrollIndicators(.hidden)
            // 아래 버튼 띠는 스크롤과 상관없이 고정이다.
            VStack(spacing: 4) {
                PrimaryButton(title: primary, action: onPrimary)
                Button(secondary, action: onSecondary).suit(14, .medium).foregroundStyle(DS.Palette.textSecondary).frame(height: 40)
            }
            .padding(.horizontal, 24).padding(.top, 24).padding(.bottom, 8)
            .background(
                LinearGradient(stops: [.init(color: DS.Palette.bgSurface.opacity(0), location: 0), .init(color: DS.Palette.bgSurface, location: 0.3)], startPoint: .top, endPoint: .bottom)
                    .ignoresSafeArea(edges: .bottom)
            )
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }
}

private struct MorningHero: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("아침이 밝아\n대화가 종료되었어요").suit(28, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary).padding(.top, 60)
            Image("B-end-hero").resizable().scaledToFit().frame(width: 232, height: 160).frame(maxWidth: .infinity).padding(.top, 40)
            (Text("오늘 대화에서 의자가 ").foregroundStyle(DS.Palette.textPrimary) + Text("1.1°C").foregroundStyle(DS.Palette.brandPrimary) + Text(" 더 뜨끈해졌어요").foregroundStyle(DS.Palette.textPrimary))
                .suit(24, .bold, tracking: -0.48).padding(.top, 60)
            HStack {
                Text("엉따 온도").suit(16, .medium).foregroundStyle(DS.Palette.textSecondary)
                Spacer()
                Text("39.2°").suit(24, .bold).foregroundStyle(DS.Palette.accentOrange)
            }
            .padding(.top, 24)
            GeometryReader { g in
                ZStack(alignment: .leading) {
                    Capsule().fill(DS.Palette.textTertiary.opacity(0.4))
                    Capsule().fill(LinearGradient(colors: [DS.Palette.brandPrimary, DS.Palette.accentOrange], startPoint: .leading, endPoint: .trailing))
                        .frame(width: g.size.width * 0.8)
                }
            }
            .frame(height: 6).padding(.top, 12)
        }
    }
}

struct RoomEndView: View {
    @Environment(Router.self) private var router
    var body: some View {
        ResultScaffold(primary: "커뮤니티에 고민 올리기", secondary: "올리지 않고 홈으로",
                       onPrimary: { router.select(.community) },
                       onSecondary: { router.popToRoot() }) { MorningHero() }
    }
}

struct RoomMorningView: View {
    @Environment(Router.self) private var router
    var body: some View {
        ResultScaffold(primary: "함께 드르륵 앉기", secondary: "새 방 만들기",
                       onPrimary: { router.popToRoot(); router.push(.room) },
                       onSecondary: { router.popToRoot() }) { MorningHero() }
    }
}

struct RoomSummaryView: View {
    @Environment(Router.self) private var router
    var body: some View {
        ResultScaffold(primary: "함께 드르륵 앉기", secondary: "새 방 만들기",
                       onPrimary: { router.popToRoot(); router.push(.room) },
                       onSecondary: { router.popToRoot() })
        {
            BackHeader(onBack: { router.pop() }).padding(.horizontal, -24)
        }
    }
}
