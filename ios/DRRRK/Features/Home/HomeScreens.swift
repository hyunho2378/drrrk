import SwiftUI

// 홈 계열 화면. 좌표와 값은 팀 피그마 프레임(390 x 844)에서 그대로 가져왔고, ClipCanvas로 기기 폭에 맞춰 키운다.
// 홈 1647:23436(시트 올림)과 1647:23475(시트 내림), 고민 분석 1647:23515, 추천 드르륵 1671:45285, 방을 찾지 못함 1647:25167,
// 함께 드르륵 온보딩 섹션 1829:11173 다섯 장, 혼자 드르륵 온보딩 1647:22976과 1647:23028.

/// 390 x 844 틀 안에 자리 그대로 놓는 도우미
private extension View {
    func at(_ x: CGFloat, _ y: CGFloat) -> some View {
        offset(x: x, y: y)
    }
}

private struct Canvas390<Content: View>: View {
    var background: Color = DS.Palette.bgSurface
    @ViewBuilder var content: () -> Content
    var body: some View {
        ClipCanvas(items: [], background: background) { content() }
    }
}

private struct BackChevron: View {
    let action: () -> Void
    var body: some View {
        Button(action: action) {
            Image("icon-chevron-left").renderingMode(.template).resizable()
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 24, height: 24)
                .frame(width: 44, height: 44)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel("뒤로")
    }
}

private struct CloseX: View {
    let action: () -> Void
    var body: some View {
        Button(action: action) {
            Path { p in
                p.move(to: CGPoint(x: 6, y: 6)); p.addLine(to: CGPoint(x: 18, y: 18))
                p.move(to: CGPoint(x: 18, y: 6)); p.addLine(to: CGPoint(x: 6, y: 18))
            }
            .stroke(DS.Palette.textPrimary, style: StrokeStyle(lineWidth: 2, lineCap: .round))
            .frame(width: 24, height: 24)
            .frame(width: 44, height: 44)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel("닫기")
    }
}

// MARK: - 홈 배경(하늘, 별, 의자, 로고, 지금 드르륵 중, 알림)

private struct HomeBackdrop: View {
    @Environment(Router.self) private var router
    @State private var pulse = false

    var body: some View {
        ZStack(alignment: .topLeading) {
            Image("A-home-sky").resizable().scaledToFill().frame(width: 390, height: 761).clipped()
            Image("A-home-top").resizable().scaledToFill().frame(width: 390, height: 271).clipped()
            Image("A-home-chair").resizable().frame(width: 168, height: 192).at(193, 305)
            Image("logo-wordmark").resizable().frame(width: 90, height: 34).at(24, 64)
            HStack(spacing: 8) {
                Circle().fill(DS.Palette.brandPrimary).frame(width: 8, height: 8)
                    .scaleEffect(pulse ? 1 : 0.7).opacity(pulse ? 1 : 0.5)
                Text("지금 23개 방에서 드르륵 중").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
            }
            .padding(.vertical, 8).padding(.horizontal, 14)
            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 20))
            .fixedSize()
            .at(24, 118)
            Button { router.push(.notiActivity) } label: {
                Image("A-home-bell").resizable().frame(width: 26, height: 26)
                    .frame(width: 40, height: 40).contentShape(Rectangle())
            }
            .buttonStyle(ClipPressStyle(radius: 20))
            .at(332, 62)
            .accessibilityLabel("알림")
        }
        .onAppear { withAnimation(.easeInOut(duration: 1.2).repeatForever(autoreverses: true)) { pulse = true } }
    }
}

// MARK: - 홈(시트를 올리면 고민 입력, 내리면 배경이 보인다)

struct HomeView: View {
    var startUp = false
    @Environment(Router.self) private var router
    @State private var up = false
    @State private var text = ""
    @State private var drag: CGFloat = 0
    @FocusState private var focused: Bool

    /// 시트 위 끝: 올림 517, 내림 717(피그마 두 프레임)
    private var sheetTop: CGFloat {
        (up ? 517 : 717) + drag
    }

    var body: some View {
        ZStack(alignment: .bottom) {
            Canvas390 {
                HomeBackdrop()
                sheet.at(0, sheetTop)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear {
            if startUp {
                up = true; focused = true
            }
        }
    }

    private var sheet: some View {
        ZStack(alignment: .topLeading) {
            UnevenRoundedRectangle(topLeadingRadius: 20, topTrailingRadius: 20).fill(.black).frame(width: 390, height: 327)
            Capsule().fill(DS.Palette.textTertiary).frame(width: 40, height: 4).at(175, 12)
            Text("유난히 잠 못드는 밤\n혹시 무슨 일 있어?")
                .suit(28, .bold, tracking: -1.12, lineHeight: 39.2)
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 342, alignment: .leading)
                .at(24, up ? 40 : 38)
            input.at(24, up ? 138 : 136)
            Text("자기 전 뒤척이게 만드는 친구의 한 마디").suit(12, .medium, tracking: -0.48)
                .foregroundStyle(DS.Palette.brandPrimary)
                .frame(width: 390).at(0, up ? 212 : 204)
        }
        .frame(width: 390, height: 327, alignment: .topLeading)
        .contentShape(Rectangle())
        .onTapGesture {
            if !up {
                withAnimation(DS.Motion.emphasizedDecel) { up = true }
            }
        }
        .gesture(DragGesture()
            .onChanged { v in drag = up ? max(0, v.translation.height) : min(0, v.translation.height) }
            .onEnded { v in
                withAnimation(DS.Motion.emphasizedDecel) {
                    if up, v.translation.height > 60 {
                        up = false; focused = false
                    }
                    if !up, v.translation.height < -40 {
                        up = true
                    }
                    drag = 0
                }
            })
    }

    private var input: some View {
        HStack(spacing: 8) {
            TextField("", text: $text, prompt: Text("편하게 고민을 꺼내보아요").foregroundStyle(DS.Palette.textSecondary), axis: .horizontal)
                .suit(16, .regular, tracking: -0.64)
                .foregroundStyle(DS.Palette.textPrimary)
                .focused($focused)
                .submitLabel(.send)
                .onSubmit(send)
                .frame(height: 48)
            Button(action: send) {
                Image("A-icon-arrow-right").renderingMode(.template).resizable().scaledToFit()
                    .foregroundStyle(.black)
                    .frame(width: 18, height: 12)
                    .frame(width: 48, height: 48)
                    .background(DS.Palette.brandPrimary, in: Circle())
            }
            .buttonStyle(ClipPressStyle(radius: 24))
            .accessibilityLabel("고민 보내기")
        }
        .padding(EdgeInsets(top: 8, leading: 20, bottom: 8, trailing: 8))
        .frame(width: 342, height: 66)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 32))
        .onTapGesture {
            if !up {
                withAnimation(DS.Motion.emphasizedDecel) { up = true }
            }
            focused = true
        }
    }

    private func send() {
        focused = false
        router.push(.analysis)
    }
}

/// 고민 입력: 홈과 같은 화면에서 시트를 올리고 입력칸에 바로 커서를 둔다.
struct WorryInputView: View {
    var body: some View {
        HomeView(startUp: true)
    }
}

// MARK: - 고민 분석(26)

struct AnalysisView: View {
    @Environment(Router.self) private var router
    @State private var progress: CGFloat = 0
    @State private var shown = [true, false, false]
    @State private var done = [false, false, false]

    private let steps = ["고민 맥락 분석 중", "비슷한 경험 찾는 중", "드르륵 방 연결 중"]
    private let total = 2.4

    var body: some View {
        Canvas390(background: DS.Palette.bgOverlay) {
            BackChevron { router.pop() }.at(14, 69)
            ZStack {
                Circle().stroke(DS.Palette.bgElevated, lineWidth: 5)
                Circle().trim(from: 0, to: progress)
                    .stroke(DS.Palette.brandPrimary, style: StrokeStyle(lineWidth: 5, lineCap: .round))
                    .rotationEffect(.degrees(-90))
                Image("A-analysis-chair").resizable().scaledToFill().frame(width: 163, height: 163).clipShape(Circle())
            }
            .frame(width: 195, height: 195)
            .at(97.5, 182.5)
            VStack(spacing: 8) {
                Text("드르륵 읽는 중...").suit(28, .bold, tracking: -1.12).foregroundStyle(DS.Palette.textPrimary)
                Text("비슷한 고민을 가진 사람을 찾고 있어요").suit(16, .regular, tracking: -0.64).foregroundStyle(DS.Palette.textSecondary)
            }
            .frame(width: 342).at(24, 420)
            VStack(alignment: .leading, spacing: 20) {
                ForEach(steps.indices, id: \.self) { i in
                    HStack(spacing: 12) {
                        ZStack {
                            Circle().fill(DS.Palette.brandPrimary)
                            Path { p in
                                p.move(to: CGPoint(x: 7.5, y: 12.5)); p.addLine(to: CGPoint(x: 10.5, y: 15.5)); p.addLine(to: CGPoint(x: 16.5, y: 9))
                            }
                            .stroke(.black, style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round))
                        }
                        .frame(width: 24, height: 24)
                        .scaleEffect(done[i] ? 1 : 0.6)
                        .opacity(done[i] ? 1 : 0)
                        Text(steps[i]).suit(16, done[i] ? .medium : .regular, tracking: -0.64)
                            .foregroundStyle(done[i] ? DS.Palette.textPrimary : DS.Palette.textSecondary)
                            .opacity(shown[i] ? (done[i] ? 1 : 0.4) : 0)
                            .offset(y: shown[i] ? 0 : 6)
                    }
                    .frame(height: 24)
                }
            }
            .at(119, 560)
        }
        .toolbar(.hidden, for: .navigationBar)
        .task { await play() }
    }

    /// 원이 2.4초 동안 차오르고, 앞 단계가 끝나는 때에 다음 단계 글이 흐리게 나타난 뒤 체크가 붙는다. 끝나면 추천 화면으로 간다.
    private func play() async {
        withAnimation(.linear(duration: total)) { progress = 1 }
        let slot = total / 3.4
        for i in steps.indices {
            if i > 0 {
                try? await Task.sleep(for: .seconds(0.001))
                withAnimation(DS.Motion.decel(0.25)) { shown[i] = true }
            }
            try? await Task.sleep(for: .seconds(slot))
            UISelectionFeedbackGenerator().selectionChanged()
            withAnimation(DS.Motion.decel(0.25)) { done[i] = true }
        }
        try? await Task.sleep(for: .seconds(2.6 - total + 0.2))
        if router.path.last == .analysis {
            router.path.removeLast()
        }
        router.push(.recommend)
    }
}

// MARK: - 추천 드르륵(27)

private struct RecRoomCard: Identifiable {
    let id: Int
    let title: String
    let chip: String
    let time: String
    let views: String
    let thumb: String
}

private struct RecTimerBadge: View {
    let time: String
    var body: some View {
        HStack(spacing: 4) {
            Image("A-icon-timer").resizable().frame(width: 12, height: 12)
            Text(time).suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.brandPrimary)
        }
        .padding(.horizontal, 8).padding(.vertical, 4)
        .background(.black.opacity(0.75), in: Capsule())
    }
}

struct RecommendView: View {
    @Environment(Router.self) private var router
    @State private var selected = 1

    private let cards: [RecRoomCard] = [
        .init(id: 1, title: "친구가 썸남 앞에서\n내 쌍밍아웃함", chip: "연애", time: "04:30", views: "22", thumb: "A-rec-thumb1"),
        .init(id: 2, title: "친구가 내 몸무게\n공개해버림", chip: "학교", time: "04:11", views: "12", thumb: "A-rec-thumb2"),
    ]

    var body: some View {
        Canvas390 {
            BackChevron { router.pop() }.at(14, 69)
            CloseX { router.popToRoot() }.at(332, 69)
            Text("비슷한 고민으로\n지금 이야기 중인 방을 찾았어요")
                .suit(28, .extrabold, tracking: -1.12, lineHeight: 39.2)
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 342, alignment: .leading)
                .at(24, 159)
            ForEach(Array(cards.enumerated()), id: \.element.id) { i, c in
                card(c).at(24, 277 + CGFloat(i) * 124)
            }
            Button { router.push(.room) } label: {
                Text("선택한 방에 드르륵 앉기").suit(16, .bold, tracking: -0.64).foregroundStyle(.black)
                    .frame(width: 342, height: 46)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 28))
            }
            .buttonStyle(ClipPressStyle(radius: 28))
            .at(24, 726)
            Button { router.push(.onboardingSolo) } label: {
                Text("혼자 드르륵 앉기").suit(14, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textSecondary)
                    .frame(width: 342, height: 44).contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .at(24, 772)
        }
        .toolbar(.hidden, for: .navigationBar)
    }

    private func card(_ c: RecRoomCard) -> some View {
        let on = selected == c.id
        return Button {
            UISelectionFeedbackGenerator().selectionChanged()
            withAnimation(DS.Motion.standard) { selected = c.id }
        } label: {
            ZStack(alignment: .topLeading) {
                RoundedRectangle(cornerRadius: 16).fill(DS.Palette.bgElevated)
                RoundedRectangle(cornerRadius: 16).strokeBorder(DS.Palette.brandPrimary, lineWidth: 2.5).opacity(on ? 1 : 0)
                Text(c.title).suit(16, .bold, lineHeight: 22.4).foregroundStyle(DS.Palette.textPrimary)
                    .frame(width: 214, alignment: .leading).multilineTextAlignment(.leading)
                    .at(16, 16)
                HStack(spacing: 6) {
                    Text(c.chip).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
                        .padding(.horizontal, 8).padding(.vertical, 4)
                        .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 6))
                    RecTimerBadge(time: c.time)
                    HStack(spacing: 4) {
                        Image("A-icon-eye").resizable().frame(width: 16, height: 16)
                        Text(c.views).suit(14, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textTertiary)
                    }
                }
                .at(16, 73)
                Image(c.thumb).resizable().scaledToFill().frame(width: 80, height: 80)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .at(246, 16)
            }
            .frame(width: 342, height: 112)
        }
        .buttonStyle(ClipPressStyle(radius: 16))
        .accessibilityAddTraits(on ? .isSelected : [])
    }
}

// MARK: - 방을 찾지 못함(45)

struct NoRoomView: View {
    @Environment(Router.self) private var router
    var body: some View {
        Canvas390 {
            BackChevron { router.pop() }.at(14, 69)
            CloseX { router.popToRoot() }.at(332, 69)
            Text("비슷한 고민으로\n이야기 중인 방을 찾지 못했어요")
                .suit(28, .extrabold, tracking: -1.12, lineHeight: 39.2)
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 342, alignment: .leading)
                .at(24, 159)
            Text("대신, 혼자 드르륵 앉아서 고민을 털어놓아 볼까요?").suit(14, .medium, tracking: -0.56)
                .foregroundStyle(Color(hex: 0xDDDDDD)).at(24, 245)
            LinearGradient(stops: [.init(color: .black.opacity(0), location: 0), .init(color: .black, location: 0.7324)], startPoint: .top, endPoint: .bottom)
                .frame(width: 390, height: 230).at(0, 614).allowsHitTesting(false)
            Button { router.push(.onboardingSolo) } label: {
                Text("혼자 드르륵 앉기").suit(16, .bold, tracking: -0.64).foregroundStyle(.black)
                    .frame(width: 342, height: 46)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 28))
            }
            .buttonStyle(ClipPressStyle(radius: 28))
            .at(24, 726)
            Button { router.select(.live) } label: {
                Text("라이브 둘러보기").suit(14, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textSecondary)
                    .frame(width: 342, height: 44).contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .at(24, 772)
        }
        .toolbar(.hidden, for: .navigationBar)
    }
}

// MARK: - 온보딩(함께 드르륵 다섯 장, 혼자 드르륵 두 장)

struct OnboardingPage {
    let visual: String
    let title: String
    let sub: String
}

private struct OnboardingDeck: View {
    let pages: [OnboardingPage]
    let onFinish: () -> Void
    @State private var index = 0

    var body: some View {
        // 아래 탭은 화면 바닥(안전 영역 위)에 고정한다. 카드 장이 바뀌어도 크기 계산에 끼지 않게 배경과 덮개로 나눈다.
        Color.clear
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background {
                Canvas390 {
                    HomeBackdrop().allowsHitTesting(false)
                    Color.black.opacity(0.6).frame(width: 390, height: 844)
                    CloseX { onFinish() }.at(322, 165)
                    card.at(32, 213)
                }
            }

        .toolbar(.hidden, for: .navigationBar)
    }

    private var card: some View {
        let last = index == pages.count - 1
        return VStack(spacing: 0) {
            ZStack {
                ForEach(pages.indices, id: \.self) { i in
                    Image(pages[i].visual).resizable().frame(width: 326, height: 220)
                        .opacity(i == index ? 1 : 0)
                        .offset(x: i == index ? 0 : (i < index ? -24 : 24))
                }
            }
            .frame(width: 326, height: 220)
            .clipped()
            ZStack {
                VStack(spacing: 8) {
                    Text(pages[index].title).suit(16, .bold, tracking: -0.64, lineHeight: 22.4)
                        .multilineTextAlignment(.center).foregroundStyle(Color(hex: 0x121415))
                    Text(pages[index].sub).suit(12, .regular, tracking: -0.48)
                        .multilineTextAlignment(.center).foregroundStyle(DS.Palette.textTertiary)
                }
                    .id(index)
                    .transition(.opacity)
            }
            .frame(width: 326, height: 91, alignment: .center)
            .padding(.top, 2)
            ZStack {
                HStack(spacing: 6) {
                    ForEach(pages.indices, id: \.self) { i in
                        Capsule().fill(i == index ? DS.Palette.brandPrimary : DS.Palette.textSecondary.opacity(0.4))
                            .frame(width: i == index ? 16 : 6, height: 6)
                    }
                }
                HStack {
                    Button { onFinish() } label: {
                        Text("건너뛰기").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textTertiary)
                            .frame(height: 44).padding(.horizontal, 20).contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .opacity(last ? 0 : 1)
                    .disabled(last)
                    Spacer()
                    Button {
                        UISelectionFeedbackGenerator().selectionChanged()
                        if last {
                            onFinish()
                        } else {
                            withAnimation(DS.Motion.emphasizedDecel) { index += 1 }
                        }
                    } label: {
                        Text(last ? "시작하기" : "다음").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.brandPrimary)
                            .frame(height: 44).padding(.horizontal, 26).contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                }
                .padding(.horizontal, 4)
            }
            .frame(width: 326, height: 68)
        }
        .frame(width: 326, height: 379)
        .background(DS.Palette.textPrimary)
        .clipShape(RoundedRectangle(cornerRadius: 24))
        .gesture(DragGesture(minimumDistance: 20).onEnded { v in
            withAnimation(DS.Motion.emphasizedDecel) {
                if v.translation.width < -40, index < pages.count - 1 {
                    index += 1
                }
                if v.translation.width > 40, index > 0 {
                    index -= 1
                }
            }
        })
    }
}

struct OnboardingTogetherView: View {
    @Environment(Router.self) private var router
    var body: some View {
        OnboardingDeck(pages: [
            .init(visual: "A-ob-together-1", title: "고민을 적으면\n비슷한 사람들과 매칭돼요", sub: "대화방에서 사람들이 내 고민을 들어줘요"),
            .init(visual: "A-ob-together-2", title: "말하기 부담되면\n이모지로 반응해요", sub: "+ 버튼을 눌러 이모지를 날려요"),
            .init(visual: "A-ob-together-3", title: "주전부리를 던지면\n가운데 테이블에 올라가요", sub: "오른쪽 퀵슬롯에서 주전부리를 눌러 던져요"),
            .init(visual: "A-ob-together-4", title: "대화는 20분 뒤\n저장되지 않고 사라져요", sub: "해 뜨기 타이머가 끝나면 대화방이 종료돼요"),
            .init(visual: "A-ob-together-5", title: "대화가 끝나면\n리포트가 도착해요", sub: "공감과 추천을 받으면 엉따 온도가 올라가요"),
        ]) { router.pop() }
    }
}

struct OnboardingSoloView: View {
    @Environment(Router.self) private var router
    var body: some View {
        OnboardingDeck(pages: [
            .init(visual: "A-ob-solo-1", title: "매칭될 사람이 없으면\nAI와 먼저 대화해요", sub: "기다리지 않고 바로 고민을 털어놓아요"),
            .init(visual: "A-ob-solo-2", title: "대화 중에 사람이 매칭되면\n함께 대화방으로 옮겨가요", sub: "AI와 대화하는 동안에도 계속 사람을 찾아요"),
        ]) {
            router.pop()
            router.push(.roomSolo)
        }
    }
}
