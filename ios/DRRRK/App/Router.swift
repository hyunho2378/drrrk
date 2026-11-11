import Observation
import SwiftUI

/// 앱의 모든 화면 이름. 웹 프로토타입 화면 번호와 피그마 프레임에 하나씩 대응한다.
enum Route: String, Hashable, CaseIterable, Identifiable {
    var id: String { rawValue }
    /// 네이버 클립에서 들어오는 길
    case clipList, clipPlayer
    // 탭: 홈
    case home, worryInput, analysis, recommend, noRoom
    /// 시뮬레이터 확인용: 함께 드르륵을 한 판 한 뒤의 빈 홈(clipDone true)을 바로 연다. 화면은 home과 같다.
    case homeEmpty
    case onboardingTogether, onboardingSolo
    // 방
    case room, roomNormal, roomSolo, roomEnd, roomMorning, roomSummary
    /// 혼자 드르륵 종료 리포트(피그마 2337:15695, 웹 65). 혼자 방 시계가 0이 되면 들어온다.
    case roomSoloEnd
    case miniProfile, report, block
    // 탭: 라이브
    case live, liveWatch
    // 탭: 커뮤니티
    case community, communityDetail, replay
    // 탭: 마이
    // 나의 편의점 시트 펼침(myShelf, 피그마 1790:10756, 웹 53)은 사용자 11/12 03:30 지시로 지웠다.
    case my, mySkin, chairStudio, myItem
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

/// 라이브 목록에서 누른 카드. 방 구경 화면의 제목, 보는 수, 시계 시작 값에 쓴다.
struct WatchPick: Hashable {
    let title: String
    let viewers: String
    let left: Int
}

@Observable
final class Router {
    var watch: WatchPick?
    var path: [Route] = []
    var tab: Tab = .home
    var showSplash = false
    // 화면 위에 겹쳐 뜨는 시트와 창(미니 프로필, 신고, 차단). 뒤 화면이 그대로 비친다.
    var modal: Route?
    var enteredApp = false
    /// 마이 화면에서 아이템 시트나 팝업이 아래 탭을 덮을 때만 true. 이때는 마이 화면이 같은 자리에 자기 탭을 그린다.
    var navLocal = false
    /// 함께 드르륵 방(room)에 한 번 앉은 뒤면 true. 홈은 true면 빈 홈(1647:23475), false면 클립이 붙은 홈(2296:20815)을 그린다.
    /// 네이버 클립에서 다시 들어오면 false로 돌아간다(웹 client/src/app/clipHome.js drrrk-clip-done과 같은 규칙, 11/11 23:18 팀 흐름 변경).
    var clipDone = false

    /// 지금 맨 위에 보이는 화면
    var current: Route {
        path.last ?? tab.root
    }

    enum NavMode: Equatable { case none, normal, dim }

    /// 화면마다 아래 탭을 보일지. 온보딩은 어둡게 깔린 채로 보인다.
    static func navMode(for r: Route) -> NavMode {
        switch r {
        case .home, .homeEmpty, .worryInput, .live, .community, .my, .mySkin, .myItem: .normal
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
    /// empty가 true면(클립 리스트의 드르륵 배너) 텍스트필드만 있는 빈 홈으로 들어간다(탁빛나 11/12 1843:40980, 웹 live.js resolveTo enter와 같다).
    func enterFromClip(empty: Bool = false) {
        showSplash = true
        enteredApp = true
        clipDone = empty
        tab = .home
        path.removeAll()
    }

    /// 화면이 어느 탭에 속하는지(아래 탭 표시용)
    static func tab(for r: Route) -> Tab {
        switch r {
        case .live, .liveWatch: .live
        case .community, .communityDetail, .replay: .community
        case .my, .mySkin, .chairStudio, .myItem: .my
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
