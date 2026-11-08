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
                    Button { router.present(.miniProfile) } label: {
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
            Color.black.opacity(shown ? 0.6 : 0).ignoresSafeArea().onTapGesture { router.close() }
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
                    Button("신고하기") { router.present(.report) }
                    Button("차단하기") { router.present(.block) }
                }
                .suit(13, .medium, tracking: -0.26).foregroundStyle(DS.Palette.textSecondary)
                .padding(.top, 14).padding(.bottom, 12)
            }
            .padding(.horizontal, 24)
            .frame(maxWidth: .infinity)
            .background(DS.Palette.bgSurface, in: UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24))
            .offset(y: shown ? 0 : 500)
        }
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
            BackHeader(onBack: { router.close() })
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
            PrimaryButton(title: "신고하기") { router.close() }
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
            Color.black.opacity(0.6).ignoresSafeArea().onTapGesture { router.close() }
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
                    Button { router.close() } label: {
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
// 피그마 "종료"(1647:26726), "DRRRK / 아침"(1647:26876), "DRRRK / 오늘 나눈 대화"(1647:27027)의 자리와 글자 값을 그대로 옮겼다.
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
    private let steps = [
        ("고민을 꺼냈어요", "\"이거 일부러야?\"로 이야기가 시작됐어요"),
        ("서로의 생각을 나눴어요", "서운한 마음에 공감하면서, 실수였을 가능성도 얘기했어요."),
        ("다음 행동을 정했어요", "다음엔 한번 직접 말해보기로 했어요"),
    ]
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
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 8) {
                Image(asset).resizable().scaledToFill().frame(width: 24, height: 24)
                    .background(dark ? DS.Palette.bgSurface : .clear).clipShape(Circle())
                Text(name).fig(12, .bold, DS.Palette.textSecondary)
            }
            HStack(alignment: .center, spacing: 8) {
                Text(text).fig(16, .medium, DS.Palette.textPrimary).lineLimit(1)
                Spacer(minLength: 0)
                if let likes {
                    HStack(spacing: 4) {
                        Image(systemName: "hand.thumbsup.fill").font(.system(size: 12)).frame(width: 16, height: 16)
                        Text(likes).fig(12, .bold, DS.Palette.brandPrimary)
                    }
                    .foregroundStyle(DS.Palette.brandPrimary)
                }
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 16))
    }
}

/// 04 대화 상대 추천: 양쪽 화살표와 의자 세 칸. 최대 두 명까지 고른다.
private struct RecommendPicker: View {
    var cell: CGFloat = 80
    var showCount = true
    /// 종료 화면: 72 칸, 이름 12, 고른 칸에 하늘색 테두리 2, 첫 칸은 노란 의자 "드르륵 칵"
    var compact = false
    @State private var picked: Set<String> = ["sofa"]
    private var people: [(String, String, String)] {
        [compact ? ("box", "새벽2시\n드르륵 칵", "B-chair-yellow") : ("box", "새벽2시\n택배상자", "B-chair-box"),
         ("sofa", "따뜻한\n가죽소파29", "B-chair-sofa"), ("stool", "딱딱한\n나무 스툴12", "B-chair-stool")]
    }
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if showCount {
                HStack(spacing: 4) {
                    Text("\(picked.count)명 선택").fig(12, .bold, DS.Palette.brandPrimary)
                    Text("최대 2명").fig(12, .medium, DS.Palette.textTertiary)
                }
            }
            HStack(alignment: .top, spacing: 8) {
                arrow(left: true)
                HStack(alignment: .top, spacing: 12) {
                    ForEach(people, id: \.0) { p in
                        let on = picked.contains(p.0)
                        Button {
                            withAnimation(DS.Motion.stateIn) {
                                if on { picked.remove(p.0) } else if picked.count < 2 { picked.insert(p.0) }
                            }
                            UISelectionFeedbackGenerator().selectionChanged()
                        } label: {
                            VStack(spacing: 8) {
                                Image(p.2).resizable().scaledToFill().frame(width: compact ? cell : cell + 4, height: compact ? cell : cell + 4)
                                    .frame(width: cell, height: cell).background(DS.Palette.bgSurface).clipShape(Circle())
                                    .overlay(Circle().strokeBorder(DS.Palette.brandPrimary, lineWidth: 2).opacity(compact && on ? 1 : 0))
                                Text(p.1).fig(compact ? 12 : 16, .medium, on ? DS.Palette.brandPrimary : DS.Palette.textPrimary)
                                    .multilineTextAlignment(.center).fixedSize()
                            }
                            .frame(width: cell)
                        }
                        .buttonStyle(RoomPressStyle())
                    }
                }
                .frame(maxWidth: .infinity)
                arrow(left: false)
            }
        }
    }

    private func arrow(left: Bool) -> some View {
        let size: CGFloat = compact ? 24 : 28
        return Image("icon-chevron-left").renderingMode(.template).resizable().frame(width: size, height: size)
            .foregroundStyle(DS.Palette.textPrimary)
            .rotationEffect(.degrees(left ? 0 : 180))
            .opacity(left ? 0.3 : 1)
            .frame(width: size, height: compact ? 72 : 84)
    }
}

/// 리포트 본문(엉따 카드부터 추천까지). 피그마 Report 묶음의 순서와 간격.
private struct ReportBody: View {
    let kind: ReportKind
    var body: some View {
        VStack(alignment: .leading, spacing: kind == .end ? 36 : 40) {
            if kind != .summary { WarmthCard() }
            TalkTimeline(gap: kind == .end ? 12 : 20)
            VStack(alignment: .leading, spacing: 12) {
                if kind == .end {
                    SectionHead(title: "오늘의 드르륵 대화들", desc: "유저들과 주로 이런 대화를 나눴어요")
                } else {
                    SectionHead(title: "오늘의 베스트 댓글", desc: "의자들이 가장 많이 공감한 말이에요")
                }
                VStack(spacing: 8) {
                    BestCard(name: "따뜻한 가죽소파29", text: kind == .morning ? "그 친구 외모정병 레전드인듯..ㅠ" : "그 친구 인성 레전드인듯..ㅠ",
                             likes: kind == .morning ? "24" : nil, asset: "B-chair-sofa", dark: false)
                    BestCard(name: "새벽2시 택배상자", text: kind == .morning ? "다음 사진은 네가 먼저 보정해서 올려버려 ㅋㅋ" : "다음엔 ‘엥 너 사진?’ 하고 물어봐봐 ㅋ",
                             likes: kind == .morning ? "17" : nil, asset: "B-chair-box")
                    BestCard(name: "딱딱한 나무 스툴12", text: kind == .end ? "요즘 쌍수가 성형이냐" : "걍 물어보면 안됨? 나 저런 애들 이해가 안돼",
                             likes: kind == .end ? nil : "11", asset: "B-chair-stool")
                }
            }
            VStack(alignment: .leading, spacing: kind == .end ? 16 : 12) {
                SectionHead(title: kind == .end ? "도움이 된 유저가 있었나요?" : "도움이 된 의자가 있었나요?", desc: "좋은 이야기를 나눠준 유저를 추천해주세요")
                RecommendPicker(cell: kind == .end ? 72 : 80, showCount: kind != .end, compact: kind == .end)
            }
        }
    }
}

/// 아래 두 버튼(346 x 46 알약, 모서리 28 / 글자 버튼). 피그마 btn과 "새 방 만들기".
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
            .buttonStyle(.plain)
        }
    }
}

/// 결과 화면 틀. 뒤로 가기(24, 79)와 본문 스크롤. 아침과 오늘 나눈 대화는 아래 버튼이 검은 그라데이션 위에 고정되고,
/// 종료는 긴 화면 맨 끝에 버튼이 붙는다.
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
        .buttonStyle(.plain)
        .accessibilityLabel("뒤로")
    }

    @ViewBuilder private var hero: some View {
        if kind == .morning {
            // 해 146 x 146 (122, 273), 엉따 카드는 452에서 시작
            Image("B-morning-sun").resizable().scaledToFit().frame(width: 146, height: 146)
                .frame(maxWidth: .infinity).padding(.top, 273 - 240).padding(.bottom, 452 - 419)
        } else {
            Image("B-end-hero").resizable().scaledToFit().frame(width: 224, height: 160)
                .frame(maxWidth: .infinity).padding(.top, 268 - 240).padding(.bottom, 452 - 428)
        }
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
