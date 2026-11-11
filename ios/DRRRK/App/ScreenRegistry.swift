import SwiftUI

/// 화면 이름과 실제 화면을 잇는다. 화면 묶음마다 자기 폴더(Features/...)에 같은 이름의 View를 둔다.
enum ScreenRegistry {
    @ViewBuilder
    static func view(for route: Route) -> some View {
        switch route {
        case .clipList: ClipListView()
        case .clipPlayer: ClipPlayerView()
        case .home: HomeView()
        case .homeEmpty: HomeView()
        case .worryInput: WorryInputView()
        case .analysis: AnalysisView()
        case .recommend: RecommendView()
        case .noRoom: NoRoomView()
        case .onboardingTogether: OnboardingTogetherView()
        case .onboardingSolo: OnboardingSoloView()
        case .room: RoomView()
        case .roomNormal: RoomNormalView()
        case .roomSolo: RoomSoloView()
        case .roomEnd: RoomEndView()
        case .roomMorning: RoomMorningView()
        case .roomSummary: RoomSummaryView()
        case .roomSoloEnd: RoomSoloEndView()
        case .miniProfile: MiniProfileView()
        case .report: ReportView()
        case .block: BlockView()
        case .live: LiveView()
        case .liveWatch: LiveWatchView()
        case .community: CommunityView()
        case .communityDetail: CommunityDetailView()
        case .replay: ReplayView()
        case .my: MyView()
        case .mySkin: MySkinView()
        case .chairStudio: ChairStudioView()
        case .myItem: MyItemView()
        case .notiActivity: NotiActivityView()
        case .notiKeyword: NotiKeywordView()
        case .notiKeywordSettings: NotiKeywordSettingsView()
        }
    }
}

/// 아직 옮기지 않은 화면 자리. 화면 묶음 작업이 끝나면 하나도 남지 않아야 한다.
struct PendingScreen: View {
    let title: String
    var tab = false
    @Environment(Router.self) private var router
    var body: some View {
        VStack(spacing: 12) {
            Spacer()
            Text(title).suit(17, .bold).foregroundStyle(DS.Palette.textPrimary)
            Button("뒤로") { router.pop() }.suit(14).foregroundStyle(DS.Palette.brandPrimary)
            Spacer()
        }
        .frame(maxWidth: .infinity)
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }
}
