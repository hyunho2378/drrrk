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
        .buttonStyle(PressStyle())
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
        .buttonStyle(PressStyle())
        .accessibilityLabel("닫기")
    }
}

// MARK: - 홈 배경(편의점 장면, 로고, 지금 드르륵 중, 프로필)
// 피그마 1647:23475(접힌 홈)와 1647:23436(펼친 홈)은 배경과 위쪽 요소가 같고, 펼친 홈에서만 딤과 입력칸이 위에 올라온다.

private struct HomeBackdrop: View {
    @Environment(Router.self) private var router
    @State private var pulse = false

    var body: some View {
        ZStack(alignment: .topLeading) {
            // 피그마 1647:23476 배경 한 장(Drrrk 간판 편의점, 파란 의자와 흰 탁자). 레이어 흐림 1.
            Image("L-home-bg").resizable().scaledToFill()
                .frame(width: 390, height: 761).clipped()
                .blur(radius: 0.5, opaque: true)
                .accessibilityHidden(true)
            // 피그마 1647:23503 로고 묶음(24, 64, 90 x 34)
            Image("logo-wordmark").resizable().frame(width: 90, height: 34).at(24, 64)
                .accessibilityLabel("Drrrk")
            // 피그마 1647:23509 "지금 23개 방에서 드르륵 중"(24, 118, 167 x 31). 누르면 라이브 탭으로 간다.
            Button { router.select(.live) } label: {
                HStack(spacing: 8) {
                    Circle().fill(DS.Palette.brandPrimary).frame(width: 8, height: 8)
                        .scaleEffect(pulse ? 1 : 0.7).opacity(pulse ? 1 : 0.5)
                    Text("지금 23개 방에서 드르륵 중").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                }
                .padding(.vertical, 8).padding(.horizontal, 14)
                .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 20))
                .fixedSize()
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("지금 23개 방에서 드르륵 중")
            .accessibilityHint("라이브 탭으로 이동")
            .at(24, 118)
            // 피그마 1647:23512 프로필(339, 69, 26 x 26). 누르면 알림으로 간다.
            Button { router.push(.notiActivity) } label: {
                Image("L-home-profile").resizable().frame(width: 26, height: 26)
                    .frame(width: 40, height: 40).contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .at(332, 62)
            .accessibilityLabel("알림")
        }
        .onAppear { withAnimation(.easeInOut(duration: 1.2).repeatForever(autoreverses: true)) { pulse = true } }
    }
}

// MARK: - 홈(입력칸을 누르면 딤이 덮이고 입력칸이 키보드 위로 올라간다)

struct HomeView: View {
    var startUp = false
    @Environment(Router.self) private var router
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var open = false
    @State private var text = ""
    /// 키보드 윗변(화면 좌표, pt). 키보드가 없으면 nil
    @State private var keyboardTop: CGFloat?
    /// 마지막으로 본 키보드 높이(pt). 처음에는 피그마 키보드 2047:14061 높이 303을 화면 배율로 키운 값
    @State private var lastKeyboardHeight: CGFloat = 303 * HomeView.scale
    @FocusState private var focused: Bool
    /// 고민 분석으로 넘어가는 중(완료 키와 화살표가 겹쳐 두 번 넘어가지 않게 막는다)
    @State private var sending = false

    private static var screen: CGSize {
        UIScreen.main.bounds.size
    }

    /// 피그마 390 폭을 기기 폭에 맞춘 배율(ClipCanvas와 같다)
    private static var scale: CGFloat {
        screen.width / 390
    }

    /// 입력칸 자리(피그마 좌표). 접힘 2045:11658(24, 655), 펼침 1671:45255(20, 446)는 키보드(541) 위 29에 붙는다.
    private var inputOrigin: CGPoint {
        guard open else { return CGPoint(x: 24, y: 655) }
        let top = keyboardTop ?? (Self.screen.height - lastKeyboardHeight)
        return CGPoint(x: 20, y: top / Self.scale - 29 - 66)
    }

    private var motion: Animation? {
        reduceMotion ? nil : DS.Motion.standard
    }

    var body: some View {
        ZStack(alignment: .topLeading) {
            Canvas390 {
                HomeBackdrop()
            }
            .accessibilityHidden(open)
            // 펼친 동안은 앱 전체 아래 탭을 끄고 같은 자리에 그려 딤 밑에 깐다. 키보드에도 움직이지 않는다.
            if router.navLocal {
                BottomNav()
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottom)
                    .ignoresSafeArea()
                    .allowsHitTesting(false)
                    .accessibilityHidden(true)
            }
            // 피그마 2047:14201 dim(0, 0, 390 x 844, 검정 60%). 빈 곳을 누르면 키보드가 내려가고 접힌 홈으로 돌아간다.
            Color.black.opacity(0.6)
                .ignoresSafeArea()
                .opacity(open ? 1 : 0)
                .animation(DS.Motion.standard, value: open)
                .contentShape(Rectangle())
                .onTapGesture { close() }
                .allowsHitTesting(open)
                .accessibilityLabel("입력 닫기")
                .accessibilityAddTraits(.isButton)
                .accessibilityHidden(!open)
            Canvas390(background: .clear) {
                input
                    .at(inputOrigin.x, inputOrigin.y)
                    .animation(motion, value: open)
                    .animation(motion, value: keyboardTop)
                infoLine
                    .at(98, 729)
                    .opacity(open ? 0 : 1)
                    .animation(DS.Motion.standard, value: open)
            }
        }
        .ignoresSafeArea(.keyboard)
        .toolbar(.hidden, for: .navigationBar)
        .onReceive(NotificationCenter.default.publisher(for: UIResponder.keyboardWillChangeFrameNotification)) { note in
            guard let frame = note.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
            if frame.minY < Self.screen.height {
                keyboardTop = frame.minY
                lastKeyboardHeight = Self.screen.height - frame.minY
            } else {
                keyboardTop = nil
            }
        }
        .onReceive(NotificationCenter.default.publisher(for: UIResponder.keyboardWillHideNotification)) { _ in
            keyboardTop = nil
        }
        .onChange(of: focused) { _, now in
            if now, !open { open = true }
            if !now, open { open = false }
        }
        .onChange(of: open, initial: true) { _, now in
            var t = Transaction()
            t.disablesAnimations = true
            withTransaction(t) { router.navLocal = now }
        }
        .onAppear {
            sending = false
            if startUp {
                open = true
                focused = true
            }
        }
        .onDisappear {
            focused = false
            open = false
            router.navLocal = false
        }
    }

    // 피그마 input 2045:11658, 1671:45255: 342 x 66, #222628, 반경 32, 글 왼쪽 21, 버튼 둘레 9, 글과 버튼 사이 8.
    // 안내 글 SUIT 16, 자간 -4%, #9AA1A6(접힘 Regular, 펼침 Bold). 전송 버튼 48 x 48 #36D2FF, 검정 화살표 18 x 12.
    private var input: some View {
        HStack(spacing: 8) {
            TextField("", text: $text, prompt: Text("편하게 고민을 꺼내보아요")
                .font(.custom((open ? SUITWeight.bold : SUITWeight.regular).rawValue, fixedSize: 16))
                .tracking(-0.64)
                .foregroundStyle(DS.Palette.textSecondary))
                .suit(16, .regular, tracking: -0.64)
                .foregroundStyle(DS.Palette.textPrimary)
                .tint(DS.Palette.brandPrimary)
                .focused($focused)
                // 시스템 키보드의 체크(완료) 키 한 번으로 키보드를 내리고 고민 분석으로 바로 넘어간다(글이 비어도, 한글 조합 중에도).
                .submitLabel(.done)
                .onSubmit(send)
                .padding(.trailing, 16)
                .frame(width: 256, height: 48)
                .accessibilityLabel("고민 입력")
            Button(action: send) {
                Image("A-icon-arrow-right").renderingMode(.template).resizable().scaledToFit()
                    .foregroundStyle(.black)
                    .frame(width: 18, height: 12)
                    .frame(width: 48, height: 48)
                    .background(DS.Palette.brandPrimary, in: Circle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("고민 보내기")
        }
        .padding(EdgeInsets(top: 9, leading: 21, bottom: 9, trailing: 9))
        .frame(width: 342, height: 66)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 32))
        .contentShape(RoundedRectangle(cornerRadius: 32))
        .onTapGesture { focused = true }
    }

    // 피그마 2045:11669(98, 729, 195 x 16): 정보 아이콘 16, 간격 4, SUIT Medium 12 자간 -4% 흰색
    private var infoLine: some View {
        HStack(spacing: 4) {
            Image("L-home-info").resizable().frame(width: 16, height: 16)
            Text("자기 전 뒤척이게 만드는 친구의 한 마디").suit(12, .medium, tracking: -0.48)
                .foregroundStyle(.white)
                .fixedSize()
        }
        .frame(width: 195, height: 16)
        .allowsHitTesting(false)
        .accessibilityElement(children: .combine)
    }

    private func close() {
        focused = false
        open = false
    }

    private func send() {
        guard !sending, router.path.last != .analysis else { return }
        sending = true
        close()
        // 홈에서 고민을 쓰고 들어가는 흐름은 쌍밍아웃 이야기다(App/Story.swift).
        Story.current = .ssang
        router.push(.analysis)
    }
}

/// 고민 입력: 홈과 같은 화면에서 딤을 덮고 입력칸에 바로 커서를 둔다.
struct WorryInputView: View {
    var body: some View {
        HomeView(startUp: true)
    }
}

// MARK: - 고민 분석(26)

struct AnalysisView: View {
    @Environment(Router.self) private var router
    @State private var progress: CGFloat = 0
    /// 단계마다 체크와 글이 같은 때에 함께 나타난다(글만 먼저 뜨지 않는다).
    @State private var done = [false, false, false]

    private let steps = ["고민 맥락 분석 중", "비슷한 경험 찾는 중", "드르륵 방 연결 중"]
    private let total = 2.4

    var body: some View {
        Canvas390(background: DS.Palette.bgOverlay) {
            BackChevron { router.pop() }.at(14, 69)
            // 피그마 1647:23519 의자 그림 133 x 133, 반시계 15도 회전(왼쪽 위 모서리 기준 114.05, 232.48). 회전 후 중심이 링 중심(195, 280)에 오는데,
            // 회전 없이 왼쪽 위 모서리만 맞추면 중심이 (180.6, 299)로 어긋난다. 그래서 중심(195.49, 279.50)에 맞추고 중심을 기준으로 돌린다. 링 아래에 깔리고 원으로 자르지 않는다.
            Image("A-analysis-chair").resizable().frame(width: 133, height: 133)
                .rotationEffect(.degrees(-15), anchor: .center)
                .at(195.49 - 66.5, 279.50 - 66.5)
            // 피그마 1647:23520, 1647:23521 링 200 x 200, 안쪽 반지름 95%(두께 5). 선 가운데 지름 195.
            ZStack {
                Circle().stroke(DS.Palette.bgElevated, lineWidth: 5)
                Circle().trim(from: 0, to: progress)
                    .stroke(DS.Palette.brandPrimary, style: StrokeStyle(lineWidth: 5, lineCap: .round))
                    .rotationEffect(.degrees(-90))
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
                                // 피그마 1647:23529: (7, 8.8)에서 M0 3.5 L3.4 6.8 L10 0, 선 2.4 둥근 끝
                                p.move(to: CGPoint(x: 7, y: 12.3)); p.addLine(to: CGPoint(x: 10.4, y: 15.6)); p.addLine(to: CGPoint(x: 17, y: 8.8))
                            }
                            .stroke(.black, style: StrokeStyle(lineWidth: 2.4, lineCap: .round, lineJoin: .round))
                        }
                        .frame(width: 24, height: 24)
                        // 피그마 1647:23525: 끝난 단계 글은 SUIT Regular 16, #9AA1A6
                        Text(steps[i]).suit(16, .regular, tracking: -0.64)
                            .foregroundStyle(DS.Palette.textSecondary)
                    }
                    .frame(height: 24)
                    .opacity(done[i] ? 1 : 0)
                    .offset(y: done[i] ? 0 : 6)
                }
            }
            .at(119, 560)
        }
        .toolbar(.hidden, for: .navigationBar)
        .task { await play() }
    }

    /// 원이 2.4초 동안 차오르고, 단계 i는 (i + 0.6) x 칸 시간에 체크와 글이 함께 아래에서 올라오며 나타난다(웹 live.js playAnalysis와 같다).
    /// 끝나면 추천 화면으로 간다.
    private func play() async {
        withAnimation(.linear(duration: total)) { progress = 1 }
        let slot = total / 3.4
        var at = 0.0
        for i in steps.indices {
            let next = (Double(i) + 0.6) * slot
            try? await Task.sleep(for: .seconds(next - at))
            at = next
            UISelectionFeedbackGenerator().selectionChanged()
            withAnimation(DS.Motion.decel(0.42)) { done[i] = true }
        }
        try? await Task.sleep(for: .seconds(max(0.2, 2.6 - at)))
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
            // 피그마 1671:45314: 첫 줄 SUIT Bold, 둘째 줄 ExtraBold, 28, 자간 -4%, 행간 140%
            (Text("비슷한 고민으로\n").font(.custom(SUITWeight.bold.rawValue, fixedSize: 28))
                + Text("지금 이야기 중인 방을 찾았어요").font(.custom(SUITWeight.extrabold.rawValue, fixedSize: 28)))
                .tracking(-1.12)
                .lineSpacing(39.2 - 28 * 1.25)
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
            .buttonStyle(PressStyle())
            .at(24, 726)
            Button { router.push(.noRoom) } label: {
                Text("혼자 드르륵 앉기").suit(14, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textSecondary)
                    .frame(width: 342, height: 44).contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
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
        .buttonStyle(PressStyle())
        .accessibilityAddTraits(on ? .isSelected : [])
    }
}

// MARK: - 방을 찾지 못함(45)
// 피그마 1647:25167. 흰 편의점 의자 위로 오징어땅콩, 먹태(dried_fish), 몬스타가 떠 있고(240 x 240 틀 안에서 잘림),
// 셋은 각자 다른 박자로 살짝 좌우로 흔들린다(팀 피그마 댓글 2026. 11. 9.).

private struct WobbleSnack: View {
    let asset: String
    /// 피그마 회전(반시계가 +)
    let figmaRotation: Double
    let amplitude: Double
    let period: Double
    let delay: Double
    @State private var swing = false
    var body: some View {
        Image(asset).resizable().scaledToFit()
            .frame(width: 68, height: 68)
            .rotationEffect(.degrees(-figmaRotation + (swing ? amplitude : -amplitude)))
            .onAppear {
                withAnimation(.easeInOut(duration: period / 2).repeatForever(autoreverses: true).delay(delay)) { swing = true }
            }
    }
}

struct NoRoomView: View {
    @Environment(Router.self) private var router
    var body: some View {
        Canvas390 {
            BackChevron { router.pop() }.at(14, 69)
            (Text("비슷한 고민으로\n").font(.custom(SUITWeight.bold.rawValue, fixedSize: 28))
                + Text("이야기 중인 방을 찾지 못했어요").font(.custom(SUITWeight.extrabold.rawValue, fixedSize: 28)))
                .tracking(-1.12)
                .lineSpacing(39.2 - 28 * 1.25)
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 342, alignment: .leading)
                .at(24, 159)
            (Text("대신, ").foregroundColor(DS.Palette.textSecondary)
                + Text("혼자 드르륵").foregroundColor(Color(hex: 0xDDDDDD))
                + Text(" 앉아서 고민을 털어놓아 볼까요?").foregroundColor(DS.Palette.textSecondary))
                .suit(14, .medium, tracking: -0.56)
                .at(24, 245)
            // 그림 묶음 "image" 240 x 240 (75, 374), 안을 넘는 부분은 잘린다. 자리는 각 그림의 가운데 기준.
            ZStack(alignment: .topLeading) {
                Image("B2-noroom-chair").resizable().scaledToFit().frame(width: 216, height: 216).at(12, 39)
                WobbleSnack(asset: "B2-snack-peanut", figmaRotation: 33.7, amplitude: 5, period: 2.4, delay: 0)
                    .at(122.15 - 75 - 34, 413.3 - 374 - 34)
                WobbleSnack(asset: "B2-snack-monster", figmaRotation: -37.7, amplitude: 4, period: 2.9, delay: 0.35)
                    .at(286.8 - 75 - 34, 459.7 - 374 - 34)
                WobbleSnack(asset: "B2-snack-nogari", figmaRotation: -38.9, amplitude: 6, period: 2.6, delay: 0.7)
                    .at(262.9 - 75 - 34, 406.8 - 374 - 34)
            }
            .frame(width: 240, height: 240, alignment: .topLeading)
            .clipped()
            .allowsHitTesting(false)
            .at(75, 374)
            LinearGradient(colors: [.black.opacity(0), .black], startPoint: .top, endPoint: .bottom)
                .frame(width: 390, height: 230).at(0, 614).allowsHitTesting(false)
            Button { router.push(.roomSolo) } label: {
                Text("혼자 드르륵 앉기").suit(16, .bold, tracking: -0.64).foregroundStyle(.black)
                    .frame(width: 342, height: 46)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 28))
            }
            .buttonStyle(PressStyle())
            .at(24, 726)
            Button { router.select(.live) } label: {
                Text("라이브 둘러보기").suit(14, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textSecondary)
                    .frame(width: 342, height: 44).contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .at(24, 772)
        }
        .toolbar(.hidden, for: .navigationBar)
    }
}

// MARK: - 온보딩(함께 드르륵 다섯 장, 혼자 드르륵 두 장)
// 온보딩은 홈 위가 아니라 실제 방 위에 겹쳐 뜬다. 함께 드르륵은 추천에서 방(1807:23214)에 처음 들어갈 때,
// 혼자 드르륵은 혼자 방(1647:25199)에 처음 들어갈 때 한 번 뜬다. 방에는 Dim 60%가 깔리고 카드(326 x 379, 32, 213)가 올라온다.

struct OnboardingPage {
    /// 위쪽 Visual(326 x 220). 피그마 Visual 안 부품을 하나씩 뷰로 그린다(Features/Onboarding).
    let visual: OnboardingVisual
    let title: String
    let sub: String
}

/// 앱을 켜 둔 동안 한 번 본 온보딩은 다시 띄우지 않는다.
enum OnboardingSeen {
    static var together = false
    static var solo = false
}

enum OnboardingPages {
    static let together: [OnboardingPage] = [
        .init(visual: .together1, title: "고민을 적으면\n비슷한 사람들과 매칭돼요", sub: "대화방에서 사람들이 내 고민을 들어줘요"),
        .init(visual: .together2, title: "말하기 부담되면\n이모지로 반응해요", sub: "+ 버튼을 눌러 이모지를 날려요"),
        .init(visual: .together3, title: "주전부리를 던지면\n가운데 테이블에 올라가요", sub: "오른쪽 퀵슬롯에서 주전부리를 눌러 던져요"),
        .init(visual: .together4, title: "대화는 20분 뒤\n저장되지 않고 사라져요", sub: "해 뜨기 타이머가 끝나면 대화방이 종료돼요"),
        .init(visual: .together5, title: "대화가 끝나면\n리포트가 도착해요", sub: "공감과 추천을 받으면 엉따 온도가 올라가요"),
    ]

    /// 팀 피그마 1647:22976, 1647:23028 문구
    static let solo: [OnboardingPage] = [
        .init(visual: .solo1, title: "매칭될 사람이 없으면\nAI와 먼저 대화해요", sub: "기다리지 않고 바로 고민을 털어놓아요"),
        .init(visual: .solo2, title: "대화 중에 사람이 매칭되면\n함께 대화방으로 옮겨가요", sub: "AI와 대화하는 동안에도 계속 사람을 찾아요"),
    ]
}

/// 방 화면 위에 겹쳐 뜨는 온보딩. 닫기, 건너뛰기, 시작하기는 덮개만 닫고 방은 그대로 이어진다.
/// 장을 넘기면 나가는 Visual과 글은 반대쪽으로 밀리며 사라지고, 들어오는 Visual은 부품이 차례로, 글은 어절 단위로 올라온다.
/// Visual과 글은 장 번호(id)로 새로 만들어서 넘기는 중에 연타해도 앞 장의 움직임(Task)이 취소되고 상태가 섞이지 않는다.
struct OnboardingOverlay: View {
    let pages: [OnboardingPage]
    let onFinish: () -> Void
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var index = 0
    @State private var forward = true
    @State private var dragX: CGFloat = 0

    var body: some View {
        ZStack {
            // 화면 비율이 피그마와 달라도 어둡게 깔린 판이 화면 전체를 덮는다.
            Color.black.opacity(0.6).ignoresSafeArea()
                .contentShape(Rectangle())
                .onTapGesture {}
            Canvas390(background: .clear) {
                ObCloseButton { onFinish() }.at(322, 165)
                card.at(32, 213)
            }
        }
    }

    private var visualTransition: AnyTransition {
        if reduceMotion { return .opacity }
        let d: CGFloat = forward ? 24 : -24
        return .asymmetric(
            insertion: .offset(x: d).combined(with: .opacity),
            removal: .offset(x: -d).combined(with: .opacity)
        )
    }

    private var textTransition: AnyTransition {
        .asymmetric(
            insertion: .identity,
            removal: .opacity.combined(with: .offset(x: reduceMotion ? 0 : (forward ? -8 : 8))).animation(ObMotion.fadeOut)
        )
    }

    /// 앞뒤 방향을 먼저 그려 둔 다음 장을 바꾼다(나가는 쪽 전환이 새 방향을 쓰게).
    private func turn(_ delta: Int) {
        forward = delta > 0
        DispatchQueue.main.async {
            let target = index + delta
            guard pages.indices.contains(target) else { return }
            UIImpactFeedbackGenerator(style: .light).impactOccurred()
            withAnimation(reduceMotion ? ObMotion.quick : DS.Motion.emphasizedDecel) { index = target }
        }
    }

    private var card: some View {
        let last = index == pages.count - 1
        return VStack(spacing: 0) {
            ZStack {
                OnboardingVisualView(kind: pages[index].visual)
                    .id(index)
                    .transition(visualTransition)
            }
            .offset(x: dragX * 0.3)
            .frame(width: 326, height: 220)
            .background(DS.Palette.brandPrimary)
            .clipped()
            ZStack {
                ObSplitText(title: pages[index].title, sub: pages[index].sub, forward: forward)
                    .id(index)
                    .transition(textTransition)
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
                    .buttonStyle(PressStyle())
                    .opacity(last ? 0 : 1)
                    .disabled(last)
                    Spacer()
                    Button {
                        if last {
                            UISelectionFeedbackGenerator().selectionChanged()
                            onFinish()
                        } else {
                            turn(1)
                        }
                    } label: {
                        // 마지막 장에서 "다음"이 "시작하기"로 위아래로 밀리며 바뀐다.
                        ZStack {
                            Text(last ? "시작하기" : "다음").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.brandPrimary)
                                .fixedSize()
                                .id(last)
                                .transition(reduceMotion ? .opacity : .asymmetric(
                                    insertion: .offset(y: 12).combined(with: .opacity),
                                    removal: .offset(y: -12).combined(with: .opacity)
                                ))
                        }
                        .frame(height: 44).padding(.horizontal, 26)
                        .clipped()
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(PressStyle())
                }
                .padding(.horizontal, 4)
            }
            .frame(width: 326, height: 68)
        }
        .frame(width: 326, height: 379)
        .background(DS.Palette.textPrimary)
        .clipShape(RoundedRectangle(cornerRadius: 24))
        .gesture(DragGesture(minimumDistance: 20)
            .onChanged { v in
                guard !reduceMotion else { return }
                // 첫 장에서 오른쪽, 마지막 장에서 왼쪽으로 끌면 덜 따라온다.
                let edge = (index == 0 && v.translation.width > 0) || (last && v.translation.width < 0)
                dragX = v.translation.width * (edge ? 0.35 : 1)
            }
            .onEnded { v in
                withAnimation(DS.Motion.emphasizedDecel) { dragX = 0 }
                if v.translation.width < -40, index < pages.count - 1 {
                    turn(1)
                } else if v.translation.width > 40, index > 0 {
                    turn(-1)
                }
            })
    }
}

/// 시뮬레이터 확인용 라우트(onboardingTogether): 함께 방 위에 온보딩을 바로 띄운다.
struct OnboardingTogetherView: View {
    var body: some View {
        RoomView(forceOnboarding: true)
    }
}

/// 시뮬레이터 확인용 라우트(onboardingSolo): 혼자 방 위에 온보딩을 바로 띄운다.
struct OnboardingSoloView: View {
    var body: some View {
        RoomSoloView(forceOnboarding: true)
    }
}
