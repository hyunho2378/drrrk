import Observation
import SwiftUI

/// 앱의 모든 화면 이름. 웹 프로토타입 화면 번호와 피그마 프레임에 하나씩 대응한다.
enum Route: String, Hashable, CaseIterable {
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
    var enteredApp = false

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
