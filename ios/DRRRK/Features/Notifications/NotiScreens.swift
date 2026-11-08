import SwiftUI

// 알림: 활동(피그마 1952:14673), 키워드 알림(1952:14700, 풀버전 1952:14617), 키워드 관리(1952:14693).
// 활동과 키워드 알림은 한 화면 안 탭이다. 탭을 바꾸면 아래 목록만 바뀐다.

private struct ActivityItem: Identifiable {
    let id = UUID()
    let kind: String
    let icon: String
    let title: String
    let ago: String
    let body: String
    let more: String?
    let unread: Bool
}

private struct KeywordHit: Identifiable {
    let id = UUID()
    let keyword: String
    let title: String
    let meta: String
    let time: String?
    let thumb: String
    let unread: Bool
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
    ]
    static let sections: [(String, [KeywordHit])] = [
        ("오늘", [
            .init(keyword: "썸", title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?", meta: "연애 · 방금 전 · 4명 이야기 중", time: "19:00", thumb: "C-7db688548ef3", unread: true),
            .init(keyword: "전남친", title: "친구 전남친이랑 썸 타는 중…\n괜찮음?", meta: "연애 · 6분 전 · 3명 이야기 중", time: "14:12", thumb: "C-42487f59e8cf", unread: true),
            .init(keyword: "조별과제", title: "조별과제 무임승차한 동기\n이름 빼버릴까?", meta: "학교 · 7분 전 · 4명 이야기 중", time: "13:01", thumb: "C-8ae1794643d8", unread: false),
        ]),
        ("어제", [
            .init(keyword: "부모님", title: "부모님 싸우는 소리에\n잠을 못 자겠어", meta: "가족 · 어제 오후 11:42 · 6명 참여", time: nil, thumb: "C-ac5b50b3432d", unread: false),
            .init(keyword: "급식", title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", meta: "학교 · 어제 오후 12:30 · 6명 참여", time: nil, thumb: "C-9820410bac5a", unread: false),
            .init(keyword: "썸", title: "친구가 썸남 앞에서\n내 쌍밍아웃함", meta: "학교 · 어제 오전 9:15 · 4명 참여", time: nil, thumb: "C-7e1a4cbf18b3", unread: false),
        ]),
        ("이번 주", [
            .init(keyword: "남친", title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?", meta: "연애 · 11월 5일 · 3명 참여", time: nil, thumb: "C-935b1b80a260", unread: false),
            .init(keyword: "남친", title: "남친이 1주년 선물로\n다이소 틴트 사줌", meta: "연애 · 11월 4일 · 8명 참여", time: nil, thumb: "C-1864c996939e", unread: false),
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
                Text(title).suit(17, .bold, tracking: -0.68).foregroundStyle(DS.Palette.textPrimary)
            }
            HStack {
                Button { router.pop() } label: {
                    Image("C-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44)
                }
                .buttonStyle(.plain)
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
        HStack(spacing: 0) {
            ForEach(Array(["활동", "키워드 알림"].enumerated()), id: \.offset) { i, t in
                Button { withAnimation(DS.Motion.emphasizedDecel) { tab = i } } label: {
                    VStack(spacing: 10) {
                        Text(t).suit(15, i == tab ? .bold : .medium, tracking: -0.6)
                            .foregroundStyle(i == tab ? DS.Palette.textPrimary : DS.Palette.textSecondary)
                            .overlay(alignment: .topTrailing) {
                                if i == 1 {
                                    Circle().fill(DS.Palette.danger).frame(width: 5, height: 5).offset(x: 7, y: -1)
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
                .buttonStyle(.plain)
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
        HStack(spacing: 4) {
            Text(title).suit(14, .medium, tracking: -0.56)
            if let count {
                Text("\(count)").suit(13, .bold, tracking: -0.52).foregroundStyle(DS.Palette.brandPrimary)
            }
        }
        .foregroundStyle(on ? DS.Palette.bgSurface : DS.Palette.textPrimary)
        .padding(.horizontal, 14)
        .frame(height: 32)
        .background(on ? DS.Palette.textPrimary : DS.Palette.bgElevated, in: Capsule())
    }
}

struct NotiActivityView: View {
    @Environment(Router.self) private var router
    @State private var tab = 0
    @State private var filter = "전체"
    @State private var keywordFilter = "전체"
    @State private var store = KeywordStore.shared

    var body: some View {
        VStack(spacing: 0) {
            NotiHeader(title: tab == 1 ? "키워드" : nil)
            NotiTabs(tab: $tab).padding(.top, 2)
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
        .onAppear {
            if router.path.last == .notiKeyword {
                tab = 1
            }
        }
    }

    private var activity: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                ScrollView(.horizontal) {
                    HStack(spacing: 8) {
                        ForEach(NotiData.filters, id: \.self) { f in
                            Button { withAnimation(DS.Motion.stateIn) { filter = f } } label: { FilterChip(title: f, on: f == filter) }
                                .buttonStyle(.plain)
                        }
                    }
                }
                .contentMargins(.horizontal, 24, for: .scrollContent)
                .scrollIndicators(.hidden)
                .padding(.top, 18)
                VStack(spacing: 0) {
                    ForEach(NotiData.activity.filter { filter == "전체" || $0.kind == filter }) { a in
                        HStack(alignment: .top, spacing: 12) {
                            Image(a.icon).resizable().frame(width: 40, height: 40)
                            VStack(alignment: .leading, spacing: 6) {
                                HStack(spacing: 6) {
                                    Text(a.title).suit(14, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary)
                                    Spacer()
                                    Text(a.ago).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
                                    if a.unread {
                                        Circle().fill(DS.Palette.danger).frame(width: 5, height: 5)
                                    }
                                }
                                Text(a.body).suit(15, .medium, tracking: -0.6).foregroundStyle(DS.Palette.textPrimary).lineSpacing(4)
                                if let more = a.more {
                                    Text(more).suit(13, .medium, tracking: -0.52).foregroundStyle(DS.Palette.textPrimary)
                                        .padding(.horizontal, 14).frame(height: 32)
                                        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 8))
                                        .padding(.top, 6)
                                }
                            }
                        }
                        .padding(.horizontal, 24)
                        .padding(.vertical, 20)
                        .transition(.opacity)
                    }
                }
                .padding(.top, 10)
                .animation(DS.Motion.standard, value: filter)
            }
        }
        .scrollIndicators(.hidden)
    }

    private var keywordList: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                HStack(alignment: .firstTextBaseline) {
                    (Text("알림 받는 키워드 ").foregroundStyle(DS.Palette.textPrimary) + Text("\(store.keywords.count)개").foregroundStyle(DS.Palette.brandPrimary))
                        .suit(18, .bold, tracking: -0.72)
                    Spacer()
                    Button { router.push(.notiKeywordSettings) } label: {
                        HStack(spacing: 2) {
                            Text("키워드 관리").suit(15, .medium, tracking: -0.6)
                            Image("C-chevron-right").renderingMode(.template).resizable().frame(width: 16, height: 16)
                        }
                        .foregroundStyle(DS.Palette.textSecondary)
                        .frame(minHeight: 44)
                    }
                    .buttonStyle(.plain)
                }
                .padding(.horizontal, 24)
                .padding(.top, 20)
                ScrollView(.horizontal) {
                    HStack(spacing: 8) {
                        Button { keywordFilter = "전체" } label: { FilterChip(title: "전체", on: keywordFilter == "전체") }.buttonStyle(.plain)
                        ForEach(store.keywords, id: \.self) { k in
                            let n = NotiData.sections.flatMap(\.1).filter { $0.keyword == k }.count
                            Button { withAnimation(DS.Motion.stateIn) { keywordFilter = k } } label: { FilterChip(title: "#" + k, on: keywordFilter == k, count: n) }
                                .buttonStyle(.plain)
                        }
                    }
                }
                .contentMargins(.horizontal, 24, for: .scrollContent)
                .scrollIndicators(.hidden)
                .padding(.top, 10)
                Rectangle().fill(DS.Palette.bgBase.opacity(0.5)).frame(height: 8).padding(.top, 20)
                ForEach(NotiData.sections, id: \.0) { section in
                    let hits = section.1.filter { keywordFilter == "전체" || $0.keyword == keywordFilter }
                    if !hits.isEmpty {
                        Text(section.0).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textSecondary)
                            .padding(.horizontal, 24).padding(.top, 24)
                        ForEach(hits) { h in
                            Button { router.push(.liveWatch) } label: { hitRow(h) }.buttonStyle(.plain)
                        }
                    }
                }
                Color.clear.frame(height: 24)
            }
            .animation(DS.Motion.standard, value: keywordFilter)
        }
        .scrollIndicators(.hidden)
    }

    private func hitRow(_ h: KeywordHit) -> some View {
        HStack(alignment: .top, spacing: 14) {
            ZStack {
                Image(h.thumb).resizable().scaledToFill().frame(width: 72, height: 72).clipShape(RoundedRectangle(cornerRadius: 12))
                if let t = h.time {
                    TimerBadge(time: t).frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading).padding(4)
                } else {
                    RoundedRectangle(cornerRadius: 12).fill(.black.opacity(0.5))
                    Text("종료").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                }
            }
            .frame(width: 72, height: 72)
            VStack(alignment: .leading, spacing: 4) {
                Text("‘\(h.keyword)’ 키워드 알림").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.brandPrimary)
                Text(h.title).suit(15, .bold, tracking: -0.6).foregroundStyle(h.time == nil ? DS.Palette.textSecondary : DS.Palette.textPrimary)
                    .multilineTextAlignment(.leading)
                Text(h.meta).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
            }
            Spacer(minLength: 0)
            if h.unread {
                Circle().fill(DS.Palette.danger).frame(width: 5, height: 5).padding(.top, 4)
            }
        }
        .padding(.horizontal, 24)
        .padding(.top, 16)
        .contentShape(Rectangle())
    }
}

struct NotiKeywordView: View {
    var body: some View {
        NotiActivityView()
    }
}

struct NotiKeywordSettingsView: View {
    @State private var store = KeywordStore.shared
    @State private var draft = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            NotiHeader(title: "키워드 관리 (\(store.keywords.count)/\(store.limit))")
            HStack {
                TextField("", text: $draft, prompt: Text("알림 받을 키워드를 입력해주세요").foregroundStyle(DS.Palette.textSecondary))
                    .suit(14, .medium, tracking: -0.56)
                    .foregroundStyle(DS.Palette.textPrimary)
                    .submitLabel(.done)
                    .onSubmit(register)
                Button("등록", action: register).suit(14, .bold, tracking: -0.56)
                    .foregroundStyle(draft.isEmpty ? DS.Palette.textSecondary : DS.Palette.brandPrimary)
                    .frame(minWidth: 44, minHeight: 44)
            }
            .padding(.leading, 20).padding(.trailing, 10)
            .frame(height: 56)
            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
            .padding(.horizontal, 24)
            .padding(.top, 8)
            VStack(spacing: 0) {
                ForEach(store.keywords, id: \.self) { k in
                    HStack {
                        Text(k).suit(16, .medium, tracking: -0.64).foregroundStyle(DS.Palette.textPrimary)
                        Spacer()
                        Button { withAnimation(DS.Motion.standard) { store.remove(k) } } label: {
                            Image("C-close").renderingMode(.template).resizable().frame(width: 18, height: 18)
                                .foregroundStyle(DS.Palette.textSecondary).frame(width: 44, height: 44)
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel(k + " 지우기")
                    }
                    .frame(height: 65)
                    .overlay(alignment: .bottom) { Rectangle().fill(DS.Palette.bgElevated).frame(height: 1) }
                    .transition(.opacity.combined(with: .move(edge: .leading)))
                }
            }
            .padding(.leading, 28).padding(.trailing, 14)
            .padding(.top, 8)
            (Text("따뜻한 가죽소파29님이 ").foregroundStyle(DS.Palette.textPrimary) + Text("최근 본").foregroundStyle(DS.Palette.brandPrimary) + Text(" 키워드예요.").foregroundStyle(DS.Palette.textPrimary))
                .suit(15, .bold, tracking: -0.6)
                .padding(.horizontal, 24).padding(.top, 28)
            FlowChips(items: store.suggestions) { k in withAnimation(DS.Motion.standard) { store.add(k) } }
                .padding(.horizontal, 24).padding(.top, 14)
            Spacer()
            Rectangle().fill(DS.Palette.bgElevated).frame(height: 1)
            VStack(alignment: .leading, spacing: 4) {
                CheckRow(title: "내 연령대(20대) 방만 알림 받기", on: $store.sameAge)
                CheckRow(title: "새벽 시간(00시~06시)에도 알림 받기", on: $store.dawn)
            }
            .padding(.horizontal, 24).padding(.vertical, 16)
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
                    RoundedRectangle(cornerRadius: 4).fill(on ? DS.Palette.brandPrimary : DS.Palette.bgElevated).frame(width: 20, height: 20)
                    if on {
                        Image("C-check").renderingMode(.template).resizable().frame(width: 14, height: 14).foregroundStyle(.black)
                    }
                }
                Text(title).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary)
            }
            .frame(minHeight: 36)
        }
        .buttonStyle(.plain)
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
                        Text(k).suit(14, .medium, tracking: -0.56)
                        Image("C-plus").renderingMode(.template).resizable().frame(width: 14, height: 14)
                    }
                    .foregroundStyle(DS.Palette.textPrimary)
                    .padding(.horizontal, 14).frame(height: 36)
                    .background(DS.Palette.bgElevated, in: Capsule())
                }
                .buttonStyle(.plain)
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
