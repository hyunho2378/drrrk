import AVKit
import SwiftUI

/// 앱 시작: 네이버 클립 목록에서 시작한다. 클립 영상의 드르륵 에이전트를 누르면 로고 스플래시를 거쳐 드르륵 홈으로 들어간다.
struct RootView: View {
    @State private var router = Router()

    var body: some View {
        ZStack {
            if router.enteredApp {
                AppShell()
                    .transition(.opacity)
            } else {
                NavigationStack(path: $router.path) {
                    ClipListView()
                        .navigationDestination(for: Route.self) { ScreenRegistry.view(for: $0) }
                        .toolbar(.hidden, for: .navigationBar)
                }
            }
            if router.showSplash {
                SplashView { withAnimation(.easeOut(duration: 0.4)) { router.showSplash = false } }
                    .transition(.opacity)
                    .zIndex(10)
            }
        }
        .environment(router)
        .background(DS.Palette.bgBase)
        .onAppear(perform: applyLaunchRoute)
    }

    private func applyLaunchRoute() {
        guard let r = Router.launchRoute() else { return }
        switch r {
        case .clipList: return
        case .clipPlayer: router.path = [.clipPlayer]
        case .homeEmpty:
            router.enteredApp = true
            router.clipDone = true
            router.tab = .home
        case .miniProfile, .report, .block:
            // 방 위에 겹쳐 뜨는 창은 방을 깔고 연다.
            router.enteredApp = true
            router.path = [.roomNormal]
            router.modal = r
        default:
            router.enteredApp = true
            if let tab = Tab.allCases.first(where: { $0.root == r }) {
                router.tab = tab
            } else {
                router.tab = Router.tab(for: r)
                router.path = [r]
            }
        }
    }
}

/// 드르륵 앱 안: 탭 네 개와 각 탭의 화면 쌓기.
struct AppShell: View {
    @Environment(Router.self) private var router

    var body: some View {
        @Bindable var router = router
        NavigationStack(path: $router.path) {
            ZStack(alignment: .bottom) {
                ScreenRegistry.view(for: router.tab.root)
                    .id(router.tab)
                    .transition(.opacity)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .animation(.timingCurve(0.2, 0, 0, 1, duration: 0.18), value: router.tab)
            .navigationDestination(for: Route.self) { ScreenRegistry.view(for: $0) }
            .toolbar(.hidden, for: .navigationBar)
        }
        .overlay { GlobalBottomNav().allowsHitTesting(Router.navMode(for: router.current) == .normal) }
        .fullScreenCover(item: $router.modal) { r in
            ScreenRegistry.view(for: r)
                .presentationBackground(.clear)
                .environment(router)
        }
        .transaction { t in if router.modal != nil { t.disablesAnimations = true } }
    }
}

/// 아래 탭 막대. 피그마 bottom_navigation(390 x 84, #121415, 위 1px #222628, 탭 56 x 52, 글자 12 굵게).
struct BottomNav: View {
    @Environment(Router.self) private var router

    var body: some View {
        VStack(spacing: 0) {
            Rectangle().fill(DS.Palette.bgElevated).frame(height: 1)
            HStack(spacing: 0) {
                ForEach(Tab.allCases, id: \.self) { tab in
                    let on = router.tab == tab
                    Button {
                        router.select(tab)
                    } label: {
                        VStack(spacing: 4) {
                            Image(tab.icon).renderingMode(.template).resizable().scaledToFit()
                                .frame(width: 24, height: 24)
                            Text(tab.rawValue).suit(12, on ? .bold : .medium, tracking: -0.48)
                        }
                        .foregroundStyle(on ? DS.Palette.brandPrimary : DS.Palette.textTertiary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 52)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityAddTraits(on ? .isSelected : [])
                }
            }
            .padding(.top, 11)
            .padding(.horizontal, 20)
            Spacer(minLength: 0)
        }
        // 피그마 bottom_navigation은 홈 표시줄 자리까지 포함해 84 높이다. 화면 바닥에 붙이고 키보드에도 움직이지 않는다.
        .frame(maxWidth: .infinity)
        .frame(height: BottomNav.height, alignment: .top)
        .background(DS.Palette.bgSurface)
        .ignoresSafeArea(.all, edges: .bottom)
    }

    /// 피그마 화면(390 x 844)은 폭에 맞춰 키워 그린다. 아래 탭 윗선도 피그마 y 760이 키워진 자리에 오도록,
    /// 높이는 화면 높이에서 760 x 배율을 뺀 값이다(iPhone 17: 874 - 783.4 = 90.6).
    static var height: CGFloat {
        let b = UIScreen.main.bounds
        return max(84, b.height - 760 * b.width / 390)
    }
}

/// 앱 전체에 하나만 있는 아래 탭. 탭을 바꾸거나 화면을 넘겨도 같은 자리에 머문다.
struct GlobalBottomNav: View {
    @Environment(Router.self) private var router

    var body: some View {
        let mode = Router.navMode(for: router.current)
        ZStack(alignment: .bottom) {
            if mode != .none, !router.navLocal {
                BottomNav()
                    .overlay {
                        if mode == .dim {
                            Color.black.opacity(0.6).ignoresSafeArea(.all, edges: .bottom).allowsHitTesting(false)
                        }
                    }
                    .allowsHitTesting(mode == .normal)
                    .transition(.opacity)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottom)
        .ignoresSafeArea(.all, edges: .bottom)
        .animation(.timingCurve(0.2, 0, 0, 1, duration: 0.18), value: mode)
    }
}

/// 로고 모션 스플래시. 웹과 같게 영상을 1.6배로 틀고 움직임이 끝나는 2.3초에서 끊은 뒤 옅어진다.
struct SplashView: View {
    let onDone: () -> Void
    @State private var player = AVPlayer(url: Bundle.main.url(forResource: "logo-motion", withExtension: "mp4")!)

    var body: some View {
        ZStack {
            Color(hex: 0x121416).ignoresSafeArea()
            VideoPlayerLayer(player: player)
                .aspectRatio(16 / 9, contentMode: .fit)
                .allowsHitTesting(false)
        }
        .task {
            // 웹과 같게 로고 소리를 원래 크기의 50%로 튼다.
            player.volume = 0.5
            player.isMuted = false
            player.playImmediately(atRate: 1.6)
            try? await Task.sleep(for: .seconds(2.3 / 1.6))
            onDone()
        }
    }
}

struct VideoPlayerLayer: UIViewRepresentable {
    let player: AVPlayer
    func makeUIView(context _: Context) -> PlayerView {
        let v = PlayerView()
        v.playerLayer.player = player
        v.playerLayer.videoGravity = .resizeAspect
        v.backgroundColor = .clear
        return v
    }

    func updateUIView(_: PlayerView, context _: Context) {}

    final class PlayerView: UIView {
        override class var layerClass: AnyClass {
            AVPlayerLayer.self
        }

        var playerLayer: AVPlayerLayer {
            layer as! AVPlayerLayer
        }
    }
}
