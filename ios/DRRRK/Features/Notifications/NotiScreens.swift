import SwiftUI

// 알림: 활동(피그마 2100:24856), 키워드 알림(2100:25022), 키워드 관리(2100:24964). 11/10 1110코딩기준 섹션.
// 활동과 키워드 알림은 한 화면 안 탭이다. 탭을 바꾸면 아래 목록만 바뀐다.
// 피그마 프레임은 1093, 1479 높이로 길게 그렸지만 앱은 폰 화면 크기이고 안에서 스크롤한다(웹 NotiScreens.jsx와 같다).
// 활동: 머리말과 탭, 칩 줄이 위에 남고 목록만 스크롤한다. 키워드 알림: 머리말과 탭이 남고 요약, 칩 줄, 목록이 함께 스크롤한다.

private struct ActivityItem: Identifiable {
    let id = UUID()
    let kind: String
    let icon: String
    let title: String
    let ago: String
    let body: String
    let more: String?
    let unread: Bool
    /// 누르면 갈 화면이 있는 알림인지(새 기능 안내와 친구 초대 보상은 갈 화면이 없다)
    var link = true
}

private struct KeywordHit: Identifiable {
    let id = UUID()
    let keyword: String
    let title: String
    let meta: String
    let time: String?
    let thumb: String
    let unread: Bool

    /// 시계 칩의 남은 시간(초). 종료 카드는 nil
    var secondsLeft: Int? {
        guard let time else { return nil }
        let p = time.split(separator: ":").compactMap { Int($0) }
        return p.count == 2 ? p[0] * 60 + p[1] : nil
    }

    /// 메타 글의 "N명 이야기 중"에서 읽은 이야기 수
    var talkers: String {
        meta.split(separator: " ").first { $0.hasSuffix("명") }.map { String($0.dropLast()) } ?? ""
    }
}

private enum NotiData {
    static let filters = ["전체", "엉따지수", "댓글", "업적 편의점", "의자꾸미기"]
    static let activity: [ActivityItem] = [
        .init(kind: "엉따지수", icon: "C-noti-0", title: "엉따지수", ago: "2일 전", body: "3이 연속 DRR에 입장해서 엉따 온도가 36.8°로 올랐어요.", more: "2건 더보기", unread: true),
        .init(kind: "댓글", icon: "C-noti-1", title: "댓글", ago: "7일 전", body: "‘3일째 읽씹하는 썸남’ 방에 새 댓글이 달렸어요. “나도 비슷한 일 있었음”", more: nil, unread: false),
        .init(kind: "업적 편의점", icon: "C-noti-2", title: "업적 편의점", ago: "17일 전", body: "‘새우깡’ 주전부리를 받았어요!", more: "1건 더보기", unread: false),
        .init(kind: "중요", icon: "C-noti-3", title: "신고 결과 · 중요 알림", ago: "20일 전", body: "신고해주신 ‘새벽2시 택배상자’님을 드르륵 운영정책에 따라 조치했어요. 신고해주셔서 감사해요 :)", more: nil, unread: false),
        .init(kind: "의자꾸미기", icon: "C-noti-4", title: "의자 꾸미기", ago: "21일 전", body: "새 의자 ‘푹신푹신 리클라이너’가 잠금 해제됐어요. 지금 앉아볼까요?", more: nil, unread: false),
        .init(kind: "댓글", icon: "C-noti-5", title: "댓글", ago: "22일 전", body: "내 댓글에 따봉이 5개 달렸어요.", more: nil, unread: false),
        .init(kind: "중요", icon: "C-noti-3", title: "새 기능 안내", ago: "23일 전", body: "드르륵에 새로 추가된 '테마 변경' 기능을 사용해보세요! 나만의 스타일로 꾸며보세요.", more: nil, unread: false, link: false),
        .init(kind: "의자꾸미기", icon: "C-noti-4", title: "친구 초대 보상", ago: "24일 전", body: "친구를 초대하면 특별한 보상을 드려요! 지금 초대하고 선물을 받아가세요.", more: nil, unread: false, link: false),
    ]
    static let sections: [(String, [KeywordHit])] = [
        ("오늘", [
            .init(keyword: "썸", title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?", meta: "연애 · 방금 전 · 4명 이야기 중", time: "19:00", thumb: "H-noti-thumb-1", unread: true),
            .init(keyword: "전남친", title: "친구 전남친이랑 썸 타는 중…\n나 이대로 괜찮을까", meta: "연애 · 6분 전 · 3명 이야기 중", time: "14:12", thumb: "H-noti-thumb-2", unread: true),
            .init(keyword: "조별과제", title: "조별과제 무임승차한 동기\n이름 빼버리고 싶은데", meta: "학교 · 7분 전 · 4명 이야기 중", time: "13:01", thumb: "H-noti-thumb-3", unread: false),
        ]),
        ("어제", [
            .init(keyword: "부모님", title: "부모님 싸우는 소리에\n잠을 못 자겠어", meta: "가족 · 어제 오후 11:42 · 6명 참여", time: nil, thumb: "H-noti-thumb-4", unread: false),
            .init(keyword: "급식", title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", meta: "학교 · 어제 오후 12:30 · 6명 참여", time: nil, thumb: "H-noti-thumb-5", unread: false),
            .init(keyword: "썸", title: "친구가 아무래도 썸남을\n좋아하는 것 같은데..", meta: "학교 · 어제 오전 9:15 · 4명 참여", time: nil, thumb: "H-noti-thumb-6", unread: false),
        ]),
        ("이번 주", [
            .init(keyword: "남친", title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?", meta: "연애 · 11월 5일 · 3명 참여", time: nil, thumb: "C-935b1b80a260", unread: false),
            .init(keyword: "남친", title: "남친이 1주년 선물로\n다이소 틴트 사줌", meta: "연애 · 11월 4일 · 8명 참여", time: nil, thumb: "H-noti-thumb-8", unread: false),
        ]),
    ]
}

@Observable
final class KeywordStore {
    static let shared = KeywordStore()
    var keywords = ["썸", "전남친", "남친"]
    var suggestions = ["짝사랑", "용돈", "단톡방", "바람", "고등학교", "연애"]
    var sameAge = true
    var dawn = true
    let limit = 30

    func add(_ k: String) {
        let t = k.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !t.isEmpty, !keywords.contains(t), keywords.count < limit else { return }
        keywords.append(t)
        suggestions.removeAll { $0 == t }
    }

    func remove(_ k: String) {
        keywords.removeAll { $0 == k }
    }
}

private struct NotiHeader: View {
    let title: String?
    @Environment(Router.self) private var router
    var body: some View {
        ZStack {
            if let title {
                Text(title).suit(17, .bold, tracking: -0.34).foregroundStyle(DS.Palette.textPrimary)
            }
            HStack {
                Button { router.pop() } label: {
                    Image("C-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44)
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel("뒤로")
                Spacer()
            }
        }
        .padding(.horizontal, 14)
        .frame(height: 56)
    }
}

private struct NotiTabs: View {
    @Binding var tab: Int
    @Namespace private var ns
    var body: some View {
        // 피그마: 탭 칸 165 두 개, 사이 12, 글자 15(행간 19, 자간 0), 글자와 밑줄 사이 8.
        // 글자 굵기는 활동 화면(1952:14676)에서 고른 "활동"만 Bold, 키워드 알림 화면(1952:14704)에서 고른 "키워드 알림"은 Medium이다.
        // 빨간 점 6 x 6은 "키워드 알림" 글자 오른쪽 끝에서 2 띄우고 글자 위 1에 놓는다(1952:14707).
        HStack(spacing: 12) {
            ForEach(Array(["활동", "키워드 알림"].enumerated()), id: \.offset) { i, t in
                Button { withAnimation(DS.Motion.emphasizedDecel) { tab = i } } label: {
                    VStack(spacing: 8) {
                        Text(t).suit(15, i == 0 && tab == 0 ? .bold : .medium, lineHeight: 19)
                            .foregroundStyle(i == tab ? DS.Palette.textPrimary : DS.Palette.textSecondary)
                            .overlay(alignment: .topTrailing) {
                                if i == 1 {
                                    Circle().fill(DS.Palette.danger).frame(width: 6, height: 6).offset(x: 8, y: -1)
                                }
                            }
                        ZStack {
                            Rectangle().fill(.clear).frame(height: 2)
                            if i == tab {
                                Rectangle().fill(DS.Palette.textPrimary).frame(height: 2).matchedGeometryEffect(id: "u", in: ns)
                            }
                        }
                    }
                    .frame(maxWidth: .infinity)
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
            }
        }
        .padding(.horizontal, 24)
    }
}

private struct FilterChip: View {
    let title: String
    let on: Bool
    var count: Int?
    var body: some View {
        // 피그마 Chip: 안쪽 7 / 14, 글자 14(고른 칩 SemiBold, 나머지 Medium, 행간 17, 자간 0), 숫자 13 Bold, 높이 31
        HStack(spacing: 4) {
            Text(title).suit(14, on ? .semibold : .medium, lineHeight: 17)
            if let count {
                Text("\(count)").suit(13, .bold, lineHeight: 16).foregroundStyle(DS.Palette.brandPrimary)
            }
        }
        .foregroundStyle(on ? DS.Palette.bgSurface : DS.Palette.textPrimary)
        .padding(.horizontal, 14)
        .frame(height: 31)
        .background(on ? DS.Palette.textPrimary : DS.Palette.bgElevated, in: Capsule())
    }
}

struct NotiActivityView: View {
    @Environment(Router.self) private var router
    /// 고른 탭(0 활동 알림, 1 키워드 알림). 키워드 알림 길(notiKeyword)로 열면 첫 그리기부터 1이다.
    /// 예전에는 0으로 그린 뒤 onAppear에서 1로 바꿔 활동 알림 목록이 먼저 보였다가 키워드 목록으로 옅어지며 바뀌었다(11. 11. "예전 화면이 떴다가 바뀌는" 현상).
    @State private var tab: Int

    init(startTab: Int = 0) {
        _tab = State(initialValue: startTab)
    }
    @State private var filter = "전체"
    @State private var keywordFilter = "전체"
    @State private var store = KeywordStore.shared

    var body: some View {
        VStack(spacing: 0) {
            NotiHeader(title: nil)
            NotiTabs(tab: $tab).padding(.top, 6)
            ZStack {
                if tab == 0 {
                    activity.transition(.opacity)
                } else {
                    keywordList.transition(.opacity)
                }
            }
            .animation(DS.Motion.stateIn, value: tab)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }

    private var activity: some View {
        VStack(alignment: .leading, spacing: 0) {
            // 피그마 Keyword Chips(2100:24867): 탭 밑줄 아래 20, 안쪽 위 2, 칩 사이 8. 목록이 스크롤해도 제자리에 남는다.
            ScrollView(.horizontal) {
                HStack(spacing: 8) {
                    ForEach(NotiData.filters, id: \.self) { f in
                        Button { withAnimation(DS.Motion.stateIn) { filter = f } } label: { FilterChip(title: f, on: f == filter) }
                            .buttonStyle(PressStyle())
                    }
                }
            }
            .contentMargins(.horizontal, 24, for: .scrollContent)
            .scrollIndicators(.hidden)
            .padding(.top, 22)
            ScrollView {
                // 피그마 Activity List(2100:24878): 칩 줄 아래 14에서 시작, 안쪽 위 8, 아래 24, 줄 사이 4
                VStack(spacing: 4) {
                    ForEach(NotiData.activity.filter { filter == "전체" || $0.kind == filter }) { a in
                        // 알림 줄과 "N건 더보기"를 누르면 그 알림이 가리키는 화면으로 간다. 신고 결과 알림은 갈 화면이 없어 줄만 보인다.
                        if let go = destination(a) {
                            Button(action: go) { activityRow(a) }
                                .buttonStyle(PressStyle())
                                .transition(.opacity)
                        } else {
                            activityRow(a).transition(.opacity)
                        }
                    }
                }
                .padding(.top, 22)
                .padding(.bottom, 24)
                .animation(DS.Motion.standard, value: filter)
            }
            .scrollIndicators(.hidden)
        }
    }

    /// 알림 종류별 갈 곳: 엉따지수는 마이, 댓글은 글 상세, 업적 편의점은 나의 편의점, 의자 꾸미기는 의자 꾸미기
    private func destination(_ a: ActivityItem) -> (() -> Void)? {
        guard a.link else { return nil }
        return switch a.kind {
        case "엉따지수": { router.select(.my) }
        case "댓글": { router.push(.communityDetail) }
        case "업적 편의점": { router.push(.myShelf) }
        case "의자꾸미기": {
                ChairStore.shared.openStudio(fresh: false)
                router.push(.chairStudio)
            }
        default: nil
        }
    }

    private func activityRow(_ a: ActivityItem) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(a.icon).resizable().frame(width: 40, height: 40)
            // 피그마 content(2100:24882): 폭 266, 사이 4. 제목 14 Bold, 시간 12 Regular, 본문 15 Regular, 모두 행간 145% 자간 -2%.
            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 6) {
                    Text(a.title).suit(14, .bold, tracking: -0.28, lineHeight: 20).foregroundStyle(DS.Palette.textPrimary)
                    Spacer()
                    Text(a.ago).suit(12, .regular, tracking: -0.24, lineHeight: 17).foregroundStyle(DS.Palette.textSecondary)
                    if a.unread {
                        Circle().fill(DS.Palette.danger).frame(width: 6, height: 6)
                    }
                }
                Text(a.body).suit(15, .regular, tracking: -0.3, lineHeight: 22).foregroundStyle(DS.Palette.textPrimary)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
                if let more = a.more {
                    // 피그마 더보기 버튼: 본문 아래 12, 안쪽 7 / 14, 글자 13 Bold, 반경 8
                    Text(more).suit(13, .bold, tracking: -0.26, lineHeight: 19).foregroundStyle(DS.Palette.textPrimary)
                        .padding(.horizontal, 14).padding(.vertical, 7)
                        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 8))
                        .padding(.top, 8)
                }
            }
            .frame(width: 266, alignment: .leading)
            // 피그마 more(2100:24892): 20 x 20, 점 셋 지름 3.2, 가운데 x 9.6, y 3.2 9.6 16
            VStack(spacing: 3.2) {
                ForEach(0 ..< 3, id: \.self) { _ in Circle().fill(DS.Palette.textSecondary).frame(width: 3.2, height: 3.2) }
            }
            .frame(width: 20, height: 20)
        }
        // 피그마 줄: 왼쪽 24, 점 세 개 칸 오른쪽 끝 374(오른쪽 16)
        .padding(.leading, 24)
        .padding(.trailing, 16)
        .padding(.vertical, 14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .contentShape(Rectangle())
    }

    private var keywordList: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                HStack(alignment: .firstTextBaseline) {
                    (Text("알림 받는 키워드 ").foregroundStyle(DS.Palette.textPrimary) + Text("\(store.keywords.count)개").foregroundStyle(DS.Palette.brandPrimary))
                        .suit(18, .bold, lineHeight: 22)
                    Spacer()
                    Button { router.push(.notiKeywordSettings) } label: {
                        HStack(spacing: 2) {
                            Text("키워드 관리").suit(15, .medium, lineHeight: 19)
                            Image("C-chevron-right").renderingMode(.template).resizable().frame(width: 16, height: 16)
                        }
                        .foregroundStyle(DS.Palette.textSecondary)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(PressStyle())
                }
                .padding(.horizontal, 24)
                .padding(.top, 24).padding(.bottom, 12)
                ScrollView(.horizontal) {
                    HStack(spacing: 8) {
                        Button { keywordFilter = "전체" } label: { FilterChip(title: "전체", on: keywordFilter == "전체") }.buttonStyle(PressStyle())
                        ForEach(store.keywords, id: \.self) { k in
                            let n = NotiData.sections.flatMap(\.1).filter { $0.keyword == k }.count
                            Button { withAnimation(DS.Motion.stateIn) { keywordFilter = k } } label: { FilterChip(title: "#" + k, on: keywordFilter == k, count: n) }
                                .buttonStyle(PressStyle())
                        }
                    }
                }
                .contentMargins(.horizontal, 24, for: .scrollContent)
                .scrollIndicators(.hidden)
                .frame(height: 36)
                // 피그마 Divider 390 x 8, #0A0B0C
                Rectangle().fill(DS.Palette.bgOverlay).frame(height: 8).padding(.top, 12)
                ForEach(NotiData.sections, id: \.0) { section in
                    let hits = section.1.filter { keywordFilter == "전체" || $0.keyword == keywordFilter }
                    if !hits.isEmpty {
                        // 피그마 Group 머리: 앞 묶음과 사이 12, 안쪽 위 20, 아래 4, 글자 14 Bold 행간 17
                        Text(section.0).suit(14, .bold, lineHeight: 17).foregroundStyle(DS.Palette.textSecondary)
                            .padding(.horizontal, 24).padding(.top, 32).padding(.bottom, 4)
                        ForEach(hits) { h in
                            // 오늘 카드(시계 칩이 있는 방)는 그 라이브의 방 구경으로 바로 간다. 제목, 남은 시간, 이야기 수는 카드 값을 넘긴다.
                            // 어제와 이번 주의 종료 카드는 끝난 방이라 누름 반응이 없다.
                            if let left = h.secondsLeft {
                                Button { router.openWatch(WatchPick(title: h.title, viewers: h.talkers, left: left)) } label: { hitRow(h) }
                                    .buttonStyle(PressStyle()).padding(.top, 12)
                            } else {
                                hitRow(h).padding(.top, 12)
                            }
                        }
                    }
                }
                Color.clear.frame(height: 24)
            }
            .animation(DS.Motion.standard, value: keywordFilter)
        }
        .scrollIndicators(.hidden)
    }

    /// 제목 안의 키워드만 하늘색으로(피그마 Title 글자 구간 색)
    private func highlighted(_ title: String, _ key: String) -> Text {
        guard let r = title.range(of: key) else { return Text(title).foregroundColor(DS.Palette.textPrimary) }
        return Text(title[..<r.lowerBound]).foregroundColor(DS.Palette.textPrimary)
            + Text(title[r]).foregroundColor(DS.Palette.brandPrimary)
            + Text(title[r.upperBound...]).foregroundColor(DS.Palette.textPrimary)
    }

    private func hitRow(_ h: KeywordHit) -> some View {
        HStack(alignment: .top, spacing: 14) {
            ZStack {
                Image(h.thumb).resizable().scaledToFill().frame(width: 72, height: 72).clipShape(RoundedRectangle(cornerRadius: 12))
                if let t = h.time {
                    // 피그마 Timer Badge(2009:12602): 썸네일 왼쪽 8, 아래 6
                    KeywordTimerBadge(time: t).frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading)
                        .padding(.leading, 8).padding(.bottom, 6)
                } else {
                    // 피그마 Ended Overlay(2009:12666): 검정 55%
                    RoundedRectangle(cornerRadius: 12).fill(.black.opacity(0.55))
                    Text("종료").suit(12, .bold, lineHeight: 15).foregroundStyle(DS.Palette.textPrimary)
                }
            }
            .frame(width: 72, height: 72)
            VStack(alignment: .leading, spacing: 4) {
                Text("‘\(h.keyword)’ 키워드 알림").suit(12, .bold, lineHeight: 17).foregroundStyle(DS.Palette.brandPrimary)
                highlighted(h.title, h.keyword).suit(15, .bold, lineHeight: 22)
                    .multilineTextAlignment(.leading)
                Text(h.meta).suit(12, .regular, lineHeight: 17).foregroundStyle(DS.Palette.textSecondary)
            }
            // 끝난 방은 글 묶음을 50%로 흐리게(피그마 Body opacity 0.5)
            .opacity(h.time == nil ? 0.5 : 1)
            Spacer(minLength: 0)
            if h.unread {
                Circle().fill(DS.Palette.danger).frame(width: 6, height: 6)
            }
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 16)
        .contentShape(Rectangle())
    }
}

/// 키워드 알림 썸네일 위 남은 시간(피그마 Timer Badge 2009:12602): 안쪽 위아래 3, 왼쪽 6, 오른쪽 7, 사이 3,
/// 시계 13, 글자 11 Bold(행간 130%, 자간 0), 바탕 검정 75%
private struct KeywordTimerBadge: View {
    let time: String
    var body: some View {
        HStack(spacing: 3) {
            Image("C-clock").renderingMode(.template).resizable().frame(width: 13, height: 13)
            Text(time).suit(11, .bold, lineHeight: 14.3).monospacedDigit()
        }
        .foregroundStyle(DS.Palette.brandPrimary)
        .padding(.leading, 6).padding(.trailing, 7)
        .frame(height: 20)
        .background(Color.black.opacity(0.75), in: Capsule())
    }
}

struct NotiKeywordView: View {
    var body: some View {
        NotiActivityView(startTab: 1)
    }
}

struct NotiKeywordSettingsView: View {
    @State private var store = KeywordStore.shared
    @State private var draft = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            NotiHeader(title: "키워드 관리 (\(store.keywords.count)/\(store.limit))")
            Rectangle().fill(Color(hex: 0x2A2F32)).frame(height: 1)
            HStack {
                TextField("", text: $draft, prompt: Text("알림 받을 키워드를 입력해주세요").foregroundStyle(DS.Palette.textSecondary))
                    .suit(14, .regular, tracking: -0.28)
                    .foregroundStyle(DS.Palette.textPrimary)
                    .submitLabel(.done)
                    .onSubmit(register)
                Button("등록", action: register).suit(14, .medium, tracking: -0.28)
                    .foregroundStyle(draft.isEmpty ? DS.Palette.textSecondary : DS.Palette.brandPrimary)
                    .frame(minHeight: 44)
                    .buttonStyle(PressStyle())
            }
            .padding(.horizontal, 20)
            .frame(height: 56)
            .background(DS.Palette.bgElevated, in: Capsule())
            .padding(.horizontal, 24)
            .padding(.top, 16)
            VStack(spacing: 0) {
                ForEach(store.keywords, id: \.self) { k in
                    HStack {
                        Text(k).suit(16, .medium, tracking: -0.32).foregroundStyle(DS.Palette.textPrimary)
                        Spacer()
                        Button { withAnimation(DS.Motion.standard) { store.remove(k) } } label: {
                            Image("C-close").renderingMode(.template).resizable().frame(width: 16, height: 16)
                                .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44)
                        }
                        .buttonStyle(PressStyle())
                        .accessibilityLabel(k + " 지우기")
                    }
                    .padding(.leading, 4).padding(.trailing, -10)
                    .frame(height: 65)
                    .overlay(alignment: .bottom) { Rectangle().fill(Color(hex: 0x2A2F32)).frame(height: 1) }
                    .transition(.opacity.combined(with: .move(edge: .leading)))
                }
            }
            .padding(.horizontal, 24)
            .padding(.top, 16)
            (Text("따뜻한 가죽소파29님이 ").foregroundStyle(DS.Palette.textPrimary) + Text("최근 본").foregroundStyle(DS.Palette.brandPrimary) + Text(" 키워드예요.").foregroundStyle(DS.Palette.textPrimary))
                .suit(15, .bold, tracking: -0.3, lineHeight: 21)
                .padding(.horizontal, 24).padding(.top, 30)
            FlowChips(items: store.suggestions) { k in withAnimation(DS.Motion.standard) { store.add(k) } }
                .padding(.horizontal, 24).padding(.top, 14)
            Spacer()
            Rectangle().fill(Color(hex: 0x2A2F32)).frame(height: 1)
            VStack(alignment: .leading, spacing: 16) {
                CheckRow(title: "내 연령대(20대) 방만 알림 받기", on: $store.sameAge)
                CheckRow(title: "새벽 시간(00시~06시)에도 알림 받기", on: $store.dawn)
            }
            .padding(.horizontal, 24).padding(.top, 20).padding(.bottom, 24)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }

    private func register() {
        withAnimation(DS.Motion.standard) { store.add(draft) }
        draft = ""
    }
}

private struct CheckRow: View {
    let title: String
    @Binding var on: Bool
    var body: some View {
        Button { withAnimation(DS.Motion.stateIn) { on.toggle() } } label: {
            HStack(spacing: 10) {
                ZStack {
                    RoundedRectangle(cornerRadius: 5).fill(on ? DS.Palette.brandPrimary : DS.Palette.bgElevated).frame(width: 20, height: 20)
                    if on {
                        Image("C-check").renderingMode(.template).resizable().frame(width: 14, height: 14).foregroundStyle(.black)
                    }
                }
                Text(title).suit(14, .medium, tracking: -0.28).foregroundStyle(DS.Palette.textPrimary)
            }
            .frame(minHeight: 20)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressStyle())
        .accessibilityAddTraits(on ? .isSelected : [])
    }
}

private struct FlowChips: View {
    let items: [String]
    let onAdd: (String) -> Void
    var body: some View {
        ChipFlow(spacing: 8) {
            ForEach(items, id: \.self) { k in
                Button { onAdd(k) } label: {
                    HStack(spacing: 4) {
                        Text(k).suit(14, .medium, tracking: -0.28)
                        Image("C-plus").renderingMode(.template).resizable().frame(width: 14, height: 14)
                    }
                    .foregroundStyle(DS.Palette.textPrimary)
                    .padding(.leading, 14).padding(.trailing, 10).frame(height: 36)
                    // 피그마 칩: 채움 없이 #3A4045 1px 외곽선
                    .overlay(Capsule().strokeBorder(Color(hex: 0x3A4045), lineWidth: 1))
                }
                .buttonStyle(PressStyle())
                .transition(.opacity.combined(with: .scale(scale: 0.9)))
            }
        }
    }
}

private struct ChipFlow: Layout {
    var spacing: CGFloat
    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache _: inout ()) -> CGSize {
        let w = proposal.width ?? 342
        var x: CGFloat = 0, y: CGFloat = 0, row: CGFloat = 0
        for s in subviews {
            let d = s.sizeThatFits(.unspecified)
            if x + d.width > w, x > 0 {
                x = 0; y += row + spacing; row = 0
            }
            x += d.width + spacing; row = max(row, d.height)
        }
        return CGSize(width: w, height: y + row)
    }

    func placeSubviews(in bounds: CGRect, proposal _: ProposedViewSize, subviews: Subviews, cache _: inout ()) {
        var x = bounds.minX, y = bounds.minY, row: CGFloat = 0
        for s in subviews {
            let d = s.sizeThatFits(.unspecified)
            if x + d.width > bounds.maxX, x > bounds.minX {
                x = bounds.minX; y += row + spacing; row = 0
            }
            s.place(at: CGPoint(x: x, y: y), proposal: .unspecified)
            x += d.width + spacing; row = max(row, d.height)
        }
    }
}
