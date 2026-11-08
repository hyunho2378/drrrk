import Observation
import SwiftUI

/// 앱의 모든 화면 이름. 웹 프로토타입 화면 번호와 피그마 프레임에 하나씩 대응한다.
enum Route: String, Hashable, CaseIterable, Identifiable {
    var id: String { rawValue }
    /// 네이버 클립에서 들어오는 길
    case clipList, clipPlayer
    // 탭: 홈
    case home, worryInput, analysis, recommend, noRoom
    case onboardingTogether, onboardingSolo
    // 방
    case room, roomNormal, roomSolo, roomEnd, roomMorning, roomSummary
    case miniProfile, report, block
    // 탭: 라이브
    case live, liveWatch
    // 탭: 커뮤니티
    case community, communityDetail
    // 탭: 마이
    case my, mySkin, chairStudio, myShelf, myItem
    // 알림
    case notiActivity, notiKeyword, notiKeywordSettings
}

enum Tab: String, CaseIterable {
    case home = "홈", live = "라이브", community = "커뮤니티", my = "마이"

    var root: Route {
        switch self {
        case .home: .home
        case .live: .live
        case .community: .community
        case .my: .my
        }
    }

    var icon: String {
        switch self {
        case .home: "tab-home"
        case .live: "tab-live"
        case .community: "tab-community"
        case .my: "tab-my"
        }
    }
}

@Observable
final class Router {
    var path: [Route] = []
    var tab: Tab = .home
    var showSplash = false
    // 화면 위에 겹쳐 뜨는 시트와 창(미니 프로필, 신고, 차단). 뒤 화면이 그대로 비친다.
    var modal: Route?
    var enteredApp = false
    /// 마이 화면에서 아이템 시트나 팝업이 아래 탭을 덮을 때만 true. 이때는 마이 화면이 같은 자리에 자기 탭을 그린다.
    var navLocal = false

    /// 지금 맨 위에 보이는 화면
    var current: Route {
        path.last ?? tab.root
    }

    enum NavMode: Equatable { case none, normal, dim }

    /// 화면마다 아래 탭을 보일지. 온보딩은 어둡게 깔린 채로 보인다.
    static func navMode(for r: Route) -> NavMode {
        switch r {
        case .home, .live, .community, .my, .mySkin, .myShelf, .myItem: .normal
        // 온보딩은 방 위에 겹쳐 뜨므로(2026. 11. 9.) 방과 같이 아래 탭을 보이지 않는다.
        case .onboardingTogether, .onboardingSolo: .none
        default: .none
        }
    }

    func push(_ r: Route) {
        path.append(r)
    }

    func pop() {
        if !path.isEmpty {
            path.removeLast()
        }
    }

    func popToRoot() {
        path.removeAll()
    }

    func present(_ r: Route) {
        modal = r
    }

    func dismissModal() {
        modal = nil
    }

    /// 겹친 창이면 닫고, 아니면 한 칸 뒤로 간다.
    func close() {
        if modal != nil { modal = nil } else { pop() }
    }

    func select(_ t: Tab) {
        guard t != tab || !path.isEmpty else { return }
        path.removeAll()
        tab = t
    }

    /// 네이버 클립에서 드르륵 에이전트를 누르면 스플래시를 띄우고 홈으로 들어간다.
    func enterFromClip() {
        showSplash = true
        enteredApp = true
        tab = .home
        path.removeAll()
    }

    /// 화면이 어느 탭에 속하는지(아래 탭 표시용)
    static func tab(for r: Route) -> Tab {
        switch r {
        case .live, .liveWatch: .live
        case .community, .communityDetail: .community
        case .my, .mySkin, .chairStudio, .myShelf, .myItem: .my
        default: .home
        }
    }

    /// 시뮬레이터에서 화면 하나를 바로 열어 확인할 때 쓴다: -route <이름>
    static func launchRoute() -> Route? {
        let args = ProcessInfo.processInfo.arguments
        guard let i = args.firstIndex(of: "-route"), i + 1 < args.count else { return nil }
        return Route(rawValue: args[i + 1])
    }
}
