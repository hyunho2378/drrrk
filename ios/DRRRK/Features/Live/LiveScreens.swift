import SwiftUI

// 라이브 탭(피그마 라이브- 1 1943:12396, 라이브- 2 1943:12647, 카테고리 5장 1943:12264, 11783, 11901, 12022, 12143, 정렬 시트 1971:21974)과 방 구경(1943:12838).
// 화면은 피그마 390 폭 값을 그대로 두고 기기 폭에 맞춰 같은 배율로 키운다(iPhone 17 402 폭에서도 비율이 그대로다).
// 카테고리를 바꾸면 그 카테고리 프레임의 카드가 그대로 나온다. 정렬을 고르면 카드가 자리를 바꾸며 옮겨 간다.

/// 피그마 390 폭 화면을 기기 폭에 맞춰 키운 세로 스크롤. height는 피그마 단위 내용 높이다.
struct FigmaScroll<Content: View>: View {
    let height: CGFloat
    var background: Color = DS.Palette.bgSurface
    @ViewBuilder var content: () -> Content
    var body: some View {
        GeometryReader { geo in
            let s = geo.size.width / 390
            ScrollView {
                VStack(spacing: 0) {
                    content()
                        .frame(width: 390, height: height, alignment: .topLeading)
                        .scaleEffect(s, anchor: .topLeading)
                        .frame(width: geo.size.width, height: height * s, alignment: .topLeading)
                    // 맨 아래로 옮길 때 쓰는 자리(ScrollViewReader.scrollTo(FigmaScrollEnd.id))
                    Color.clear.frame(height: 0).id(FigmaScrollEnd.id)
                }
            }
            .scrollIndicators(.hidden)
            // 내용이 상태바 밑부터 그려지게(피그마 y 0이 화면 맨 위) 스크롤 안쪽 여백을 두지 않는다.
            .ignoresSafeArea(.container)
        }
        .background(background)
        .ignoresSafeArea(.container)
    }
}

enum FigmaScrollEnd { static let id = "figma-scroll-end" }

/// 피그마 390 폭 띠(머리줄, 아래 입력창, 시트)를 기기 폭에 맞춰 키운다. anchor 쪽 끝에 붙는다.
struct FigmaBand<Content: View>: View {
    let height: CGFloat
    var anchor: UnitPoint = .top
    @ViewBuilder var content: () -> Content
    var body: some View {
        GeometryReader { geo in
            let s = geo.size.width / 390
            content()
                .frame(width: 390, height: height, alignment: .topLeading)
                .scaleEffect(s, anchor: anchor)
                .frame(width: geo.size.width, height: height * s, alignment: anchor == .bottom ? .bottom : .top)
                .frame(maxHeight: .infinity, alignment: anchor == .bottom ? .bottom : .top)
        }
    }
}

struct LiveView: View {
    @Environment(Router.self) private var router
    @State private var category = "전체"
    @State private var sort: LiveSort = .popular
    @State private var showSort = false
    @State private var page = 0
    @State private var loveDots = LoveDotStore.shared

    private var cards: [LiveCard] {
        let list = LiveData.cards[category] ?? []
        switch sort {
        // 인기순: 보는 수가 큰 방부터(같으면 피그마 프레임 순서)
        case .popular:
            return list.enumerated().sorted { a, b in
                let x = Int(a.element.viewers) ?? 0, y = Int(b.element.viewers) ?? 0
                return x != y ? x > y : a.offset < b.offset
            }.map(\.element)
        // 최신순: 방금 열린 방, 첫 대화 상대를 기다리는 방, 그다음 남은 시간이 긴 방부터
        case .latest:
            func rank(_ c: LiveCard) -> Int { c.fresh ? 0 : (c.meta.contains("기다려요") ? 1 : 2) }
            return list.enumerated().sorted { a, b in
                let x = rank(a.element), y = rank(b.element)
                if x != y { return x < y }
                if a.element.remaining != b.element.remaining { return a.element.remaining > b.element.remaining }
                return a.offset < b.offset
            }.map(\.element)
        // 맞춤순: 친구 이야기와 썸, 연애 이야기가 둘 다 있는 글이 먼저, 그다음 한쪽, 나머지는 피그마 순서(웹 liveV2.js와 같은 규칙)
        case .match:
            func score(_ t: String) -> Int {
                var n = 0
                if t.range(of: "친구|베프|동기", options: .regularExpression) != nil { n += 1 }
                if t.range(of: "썸|남친|애인|여친", options: .regularExpression) != nil { n += 1 }
                return n
            }
            return list.enumerated().sorted { a, b in
                let x = score(a.element.title), y = score(b.element.title)
                return x != y ? x > y : a.offset < b.offset
            }.map(\.element)
        }
    }

    /// 피그마 단위 내용 높이: 카드 첫 줄 488, 카드 112와 사이 12, 아래 탭(760부터) 위로 24 띄운다.
    private var contentHeight: CGFloat {
        488 + CGFloat(cards.count) * 124 - 12 + (844 - 760) + 24
    }

    var body: some View {
        FigmaScroll(height: contentHeight) {
            ZStack(alignment: .topLeading) {
                LiveHeader()
                LiveCarousel(items: LiveData.featured, page: $page) { router.watch = nil; router.push(.liveWatch) }
                    .offset(y: 128)
                LiveDots(index: page).offset(x: 163, y: 372)
                LiveTabs(selected: $category, showDot: !loveDots.liveLoveSeen)
                    .offset(y: 396)
                    .onChange(of: category, initial: true) { _, new in
                        if new == "연애" { loveDots.markLive() }
                    }
                Text("지금 들어갈 수 있는 방").suit(18, .bold, lineHeight: 25).foregroundStyle(DS.Palette.textPrimary)
                    .offset(x: 24, y: 448)
                Button { withAnimation(DS.Motion.emphasizedDecel) { showSort = true } } label: {
                    HStack(spacing: 2) {
                        Text(sort.rawValue).suit(13, .medium, lineHeight: 19)
                        Image("C-chevron-down").renderingMode(.template).resizable().frame(width: 16, height: 16)
                    }
                    .foregroundStyle(DS.Palette.textSecondary)
                    .frame(height: 44).contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
                .frame(width: 366, alignment: .trailing)
                .offset(y: 438)
                .accessibilityLabel("정렬 " + sort.rawValue)
                VStack(spacing: 12) {
                    ForEach(cards) { card in
                        Button { router.watch = WatchPick(title: card.title, viewers: card.viewers, left: card.remaining > 0 ? card.remaining : 1200); router.push(.liveWatch) } label: { LiveCardView(card: card) }
                            .buttonStyle(PressStyle())
                            .transition(.opacity)
                    }
                }
                .id(category)
                .transition(.opacity)
                .offset(x: 24, y: 488)
                .animation(DS.Motion.emphasizedDecel, value: sort)
            }
            .animation(DS.Motion.stateIn, value: category)
        }
        .overlay { sortSheet }
        .toolbar(.hidden, for: .navigationBar)
        .onChange(of: showSort, initial: true) { _, open in
            var t = Transaction(); t.disablesAnimations = true
            withTransaction(t) { router.navLocal = open }
        }
        .onDisappear { router.navLocal = false }
    }

    /// 정렬 시트(피그마 1971:21974): 아래 탭까지 덮는 검정 60%, 시트 390 x 289 #121415 위 모서리 24.
    private var sortSheet: some View {
        ZStack(alignment: .bottom) {
            if showSort {
            // 시트가 열린 동안은 앱 전체 아래 탭을 끄고 같은 자리에 그려 덮개 밑에 깐다.
            BottomNav().frame(maxHeight: .infinity, alignment: .bottom).allowsHitTesting(false)
                .transition(.identity)
            Color.black.opacity(0.6).ignoresSafeArea()
                .onTapGesture { close() }
                .transition(.opacity)
            FigmaBand(height: 289, anchor: .bottom) {
                LiveSortSheet(selected: sort) { s in
                    UISelectionFeedbackGenerator().selectionChanged()
                    withAnimation(DS.Motion.emphasizedDecel) { sort = s }
                    Task { try? await Task.sleep(for: .milliseconds(180)); close() }
                }
            }
            .background(alignment: .bottom) {
                DS.Palette.bgSurface.frame(height: 40).ignoresSafeArea()
            }
            .ignoresSafeArea(.container, edges: .bottom)
            .transition(.move(edge: .bottom))
            }
        }
    }

    private func close() {
        withAnimation(DS.Motion.emphasizedAccel) { showSort = false }
    }
}

/// 머리줄: 로고(24, 64, 90 x 34), "라이브"(125, 69, 20 굵게), 알림 종(339, 69, 26 흰 원)과 빨간 점(358, 67, 8).
private struct LiveHeader: View {
    @Environment(Router.self) private var router
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image("logo-wordmark").resizable().scaledToFit().frame(width: 90, height: 34).offset(x: 24, y: 64)
            Text("라이브").suit(20, .bold, lineHeight: 24).foregroundStyle(DS.Palette.textPrimary).offset(x: 125, y: 69)
            Button { router.push(.notiActivity) } label: {
                ZStack(alignment: .topLeading) {
                    Image(LiveData.bell).resizable().scaledToFill().frame(width: 26, height: 26)
                        .background(.white).clipShape(Circle()).offset(x: 9, y: 11)
                    Circle().fill(DS.Palette.danger).frame(width: 8, height: 8).offset(x: 28, y: 9)
                }
                .frame(width: 44, height: 44, alignment: .topLeading)
                .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .offset(x: 330, y: 58)
            .accessibilityLabel("알림")
        }
    }
}

/// 맨 위 카드 줄(Carousel / 1, 2: 318 x 232, 모서리 20, 사이 12, 양옆 24).
private struct LiveCarousel: View {
    let items: [LiveFeatured]
    @Binding var page: Int
    let onTap: () -> Void
    var body: some View {
        ScrollView(.horizontal) {
            LazyHStack(spacing: 12) {
                ForEach(Array(items.enumerated()), id: \.element.id) { i, item in
                    Button(action: onTap) { card(item, dimViewers: i > 0) }
                        .buttonStyle(PressStyle())
                        .id(i)
                }
            }
            .scrollTargetLayout()
        }
        .contentMargins(.horizontal, 24, for: .scrollContent)
        .scrollTargetBehavior(.viewAligned)
        .scrollIndicators(.hidden)
        .scrollPosition(id: Binding(get: { page }, set: { page = $0 ?? 0 }))
        .frame(width: 390, height: 232)
    }

    private func card(_ item: LiveFeatured, dimViewers: Bool) -> some View {
        ZStack(alignment: .topLeading) {
            Image(item.scene).resizable().scaledToFill().frame(width: 318, height: 232).clipped()
            // 피그마 Fade: #121415, 위 35%까지 투명, 아래 끝 90%
            LinearGradient(stops: [.init(color: DS.Palette.bgSurface.opacity(0), location: 0), .init(color: DS.Palette.bgSurface.opacity(0), location: 0.35), .init(color: DS.Palette.bgSurface.opacity(0.9), location: 1)], startPoint: .top, endPoint: .bottom)
            Text(item.versus).suit(13, .medium, lineHeight: 16).foregroundStyle(DS.Palette.textPrimary.opacity(0.8)).offset(x: 16, y: 140)
            Text(item.title).suit(20, .bold, lineHeight: 24).foregroundStyle(DS.Palette.textPrimary)
                .multilineTextAlignment(.leading).fixedSize().offset(x: 16, y: 164)
            LiveTimerPill(time: item.time).offset(x: 12, y: 12)
            // 피그마 Carousel / 2의 보는 중 알약은 10%로 흐리다.
            LiveViewersPill(count: item.viewers).opacity(dimViewers ? 0.1 : 1)
                .frame(width: 306, alignment: .trailing).offset(y: 12)
        }
        .frame(width: 318, height: 232, alignment: .topLeading)
        .background(DS.Palette.bgElevated)
        .clipShape(RoundedRectangle(cornerRadius: 20))
    }
}

/// 카드 위 시계(75 x 26, 검정 75%, 하늘색 시계 16과 13.75 굵은 글자)
struct LiveTimerPill: View {
    let time: String
    var body: some View {
        HStack(spacing: 4) {
            Image("C-clock").renderingMode(.template).resizable().frame(width: 16, height: 16)
            Text(time).suit(13.75, .bold, lineHeight: 18).monospacedDigit()
        }
        .foregroundStyle(DS.Palette.brandPrimary)
        .padding(.leading, 8).padding(.trailing, 8)
        .frame(height: 26)
        .background(.black.opacity(0.75), in: Capsule())
    }
}

/// 보는 중 알약(53 x 27, 검정 70%, 눈 16과 12 굵은 글자)
struct LiveViewersPill: View {
    let count: String
    var body: some View {
        HStack(spacing: 4) {
            Image("C-view").renderingMode(.template).resizable().frame(width: 16, height: 16)
            Text(count).suit(12, .bold, lineHeight: 17)
        }
        .foregroundStyle(DS.Palette.textPrimary)
        .padding(.leading, 9).padding(.trailing, 10)
        .frame(height: 27)
        .background(.black.opacity(0.7), in: Capsule())
    }
}

/// 캐러셀 점(5개, 지금 16 x 6 #F8F8F8, 나머지 6 #6E767C, 사이 6)
private struct LiveDots: View {
    let index: Int
    var body: some View {
        HStack(spacing: 6) {
            ForEach(0 ..< 5, id: \.self) { i in
                Capsule().fill(i == index ? DS.Palette.textPrimary : DS.Palette.textTertiary)
                    .frame(width: i == index ? 16 : 6, height: 6)
            }
        }
        .animation(DS.Motion.standard, value: index)
    }
}

/// 카테고리 탭: 글자 15(고른 탭 굵게 #F8F8F8, 나머지 #9AA1A6), x 24부터 63 간격, 밑줄 27 x 2(y 27), 아래 1px #222628 선(y 27).
/// 연애 옆 빨간 점(6)은 라이브에서 연애를 처음 열면 사라진다(LoveDotStore.liveLoveSeen, 커뮤니티 점과 따로).
private struct LiveTabs: View {
    @Binding var selected: String
    var showDot: Bool
    var body: some View {
        ZStack(alignment: .topLeading) {
            Rectangle().fill(DS.Palette.bgElevated).frame(width: 390, height: 1).offset(y: 27)
            ForEach(Array(LiveData.categories.enumerated()), id: \.offset) { i, c in
                let on = c == selected
                Button {
                    UISelectionFeedbackGenerator().selectionChanged()
                    withAnimation(DS.Motion.emphasizedDecel) { selected = c }
                } label: {
                    Text(c).suit(15, on ? .bold : .medium, lineHeight: 19)
                        .foregroundStyle(on ? DS.Palette.textPrimary : DS.Palette.textSecondary)
                        .fixedSize()
                        .frame(width: 63, height: 44, alignment: .topLeading)
                        .contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
                .offset(x: 24 + CGFloat(i) * 63)
                if c == "연애", showDot {
                    Circle().fill(DS.Palette.danger).frame(width: 6, height: 6).offset(x: 179, y: 0)
                        .transition(LoveDotStore.transition)
                }
            }
            Rectangle().fill(DS.Palette.textPrimary).frame(width: 27, height: 2)
                .offset(x: 24 + CGFloat(LiveData.categories.firstIndex(of: selected) ?? 0) * 63, y: 27)
                .animation(DS.Motion.emphasizedDecel, value: selected)
        }
        .frame(width: 390, height: 29, alignment: .topLeading)
    }
}

/// 정렬 시트 내용(피그마 바텀시트 · 정렬): 손잡이 40 x 4 #6E767C, 줄마다 69 높이, 이름 15 굵게(고른 줄 하늘색), 설명 12 #6E767C, 고른 줄 오른쪽 체크 20.
private struct LiveSortSheet: View {
    let selected: LiveSort
    let pick: (LiveSort) -> Void
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            RoundedRectangle(cornerRadius: 2).fill(DS.Palette.textTertiary).frame(width: 40, height: 4).frame(maxWidth: .infinity)
            Color.clear.frame(height: 8)
            ForEach(LiveSort.allCases) { s in
                let on = s == selected
                Button { pick(s) } label: {
                    HStack(spacing: 12) {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(s.rawValue).suit(15, .bold, lineHeight: 22).foregroundStyle(on ? DS.Palette.brandPrimary : DS.Palette.textPrimary)
                            Text(s.hint).suit(12, .regular, lineHeight: 17).foregroundStyle(DS.Palette.textTertiary)
                        }
                        Spacer(minLength: 0)
                        if on {
                            Image("C-check").renderingMode(.template).resizable().frame(width: 20, height: 20)
                                .foregroundStyle(DS.Palette.brandPrimary)
                        }
                    }
                    .padding(.vertical, 14)
                    .frame(height: 69)
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
            }
            Spacer(minLength: 0)
        }
        .padding(.top, 14).padding(.horizontal, 24)
        .frame(width: 390, height: 289, alignment: .top)
        .background(DS.Palette.bgSurface, in: UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24))
    }
}

/// 맨 위 로고와 제목, 알림 종. 종을 누르면 활동 알림으로 간다.
struct AppTitleBar: View {
    let title: String
    @Environment(Router.self) private var router
    var body: some View {
        HStack(alignment: .center, spacing: 11) {
            Image("logo-wordmark").resizable().scaledToFit().frame(width: 90, height: 34)
            Text(title).suit(20, .bold, tracking: -0.8).foregroundStyle(DS.Palette.textPrimary)
            Spacer()
            Button { router.push(.notiActivity) } label: {
                ZStack(alignment: .topTrailing) {
                    Image(LiveData.bell).resizable().scaledToFill().frame(width: 26, height: 26).clipShape(Circle())
                    Circle().fill(DS.Palette.danger).frame(width: 8, height: 8).offset(x: 1, y: -2)
                }
                .frame(width: 44, height: 44)
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("알림")
        }
        .padding(.leading, 24)
        .padding(.trailing, 14)
        .padding(.top, 8)
    }
}

struct FeaturedCarousel: View {
    let items: [LiveFeatured]
    @Binding var page: Int
    let onTap: () -> Void
    var body: some View {
        ScrollView(.horizontal) {
            LazyHStack(spacing: 12) {
                ForEach(Array(items.enumerated()), id: \.element.id) { i, item in
                    Button(action: onTap) {
                        ZStack(alignment: .bottomLeading) {
                            Image(item.scene).resizable().scaledToFill().frame(width: 318, height: 232).clipped()
                            LinearGradient(colors: [.black.opacity(0), .black.opacity(0.7)], startPoint: .center, endPoint: .bottom)
                            VStack(alignment: .leading, spacing: 8) {
                                if !item.versus.isEmpty {
                                    Text(item.versus).suit(13, .medium, tracking: -0.52).foregroundStyle(DS.Palette.textPrimary.opacity(0.8))
                                }
                                Text(item.title).suit(20, .bold, tracking: -0.8).foregroundStyle(DS.Palette.textPrimary)
                                    .multilineTextAlignment(.leading)
                            }
                            .padding(16)
                            if !item.time.isEmpty {
                                VStack {
                                    HStack {
                                        TimerBadge(time: item.time, large: true)
                                        Spacer()
                                        ViewersPill(count: item.viewers)
                                    }
                                    Spacer()
                                }
                                .padding(12)
                            }
                        }
                        .frame(width: 318, height: 232)
                        .clipShape(RoundedRectangle(cornerRadius: 20))
                    }
                    .buttonStyle(PressStyle())
                    .id(i)
                }
            }
            .scrollTargetLayout()
        }
        .contentMargins(.horizontal, 24, for: .scrollContent)
        .scrollTargetBehavior(.viewAligned)
        .scrollIndicators(.hidden)
        .scrollPosition(id: Binding(get: { page }, set: { page = $0 ?? 0 }))
        .frame(height: 232)
    }
}

struct PageDots: View {
    let count: Int
    let index: Int
    var body: some View {
        HStack(spacing: 6) {
            ForEach(0 ..< count, id: \.self) { i in
                Capsule().fill(i == index ? DS.Palette.textPrimary : DS.Palette.textTertiary)
                    .frame(width: i == index ? 16 : 6, height: 6)
            }
        }
        .animation(DS.Motion.standard, value: index)
    }
}

struct CategoryTabs: View {
    @Binding var selected: String
    var showDot: Bool
    @Namespace private var ns
    var body: some View {
        VStack(spacing: 0) {
            HStack(spacing: 0) {
                ForEach(LiveData.categories, id: \.self) { c in
                    Button {
                        withAnimation(DS.Motion.emphasizedDecel) { selected = c }
                    } label: {
                        VStack(spacing: 8) {
                            Text(c).suit(15, c == selected ? .bold : .medium, tracking: -0.6)
                                .foregroundStyle(c == selected ? DS.Palette.textPrimary : DS.Palette.textSecondary)
                                .overlay(alignment: .topTrailing) {
                                    if c == "연애", showDot {
                                        Circle().fill(DS.Palette.danger).frame(width: 6, height: 6).offset(x: 7, y: 0)
                                            .transition(LoveDotStore.transition)
                                    }
                                }
                            ZStack {
                                Rectangle().fill(.clear).frame(height: 2)
                                if c == selected {
                                    Rectangle().fill(DS.Palette.textPrimary).frame(width: 27, height: 2)
                                        .matchedGeometryEffect(id: "line", in: ns)
                                }
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(PressStyle())
                }
            }
            .padding(.horizontal, 10)
            Rectangle().fill(DS.Palette.bgElevated).frame(height: 1)
        }
    }
}

struct SortButton: View {
    let title: String
    let action: () -> Void
    var body: some View {
        Button(action: action) {
            HStack(spacing: 2) {
                Text(title).suit(13, .medium, tracking: -0.52)
                Image("C-chevron-down").renderingMode(.template).resizable().frame(width: 16, height: 16)
            }
            .foregroundStyle(DS.Palette.textSecondary)
            .frame(minHeight: 44)
        }
        .buttonStyle(PressStyle())
    }
}

struct SortSheet: View {
    @Binding var selected: LiveSort
    @Environment(\.dismiss) private var dismiss
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Capsule().fill(DS.Palette.textTertiary).frame(width: 40, height: 4).frame(maxWidth: .infinity).padding(.top, 10)
            ForEach(LiveSort.allCases) { s in
                Button {
                    withAnimation(DS.Motion.emphasizedDecel) { selected = s }
                    Task { try? await Task.sleep(for: .milliseconds(180)); dismiss() }
                } label: {
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(s.rawValue).suit(15, .bold, tracking: -0.6)
                                .foregroundStyle(s == selected ? DS.Palette.brandPrimary : DS.Palette.textPrimary)
                            Text(s.hint).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
                        }
                        Spacer()
                        if s == selected {
                            Image("C-check").renderingMode(.template).resizable().frame(width: 20, height: 20)
                                .foregroundStyle(DS.Palette.brandPrimary)
                        }
                    }
                    .padding(.horizontal, 24)
                    .frame(height: 72)
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
            }
            Spacer(minLength: 0)
        }
    }
}

struct TimerBadge: View {
    let time: String
    var large = false
    /// 곧 끝나는 방(5분 이하): 빨간 바탕(#FF4D6A)에 검정 글자(피그마 1972:22375 ④)
    var urgent = false
    var body: some View {
        HStack(spacing: 4) {
            Image("C-clock").renderingMode(.template).resizable().frame(width: large ? 16 : 13, height: large ? 16 : 13)
            Text(time).suit(large ? 13.75 : 11, .bold, tracking: urgent ? 0 : -0.4).monospacedDigit()
        }
        .foregroundStyle(urgent ? Color.black : DS.Palette.brandPrimary)
        .padding(.horizontal, large ? 8 : 6)
        .frame(height: large ? 26 : 20)
        .background(urgent ? AnyShapeStyle(DS.Palette.danger) : AnyShapeStyle(Color.black.opacity(0.6)), in: Capsule())
    }
}

struct ViewersPill: View {
    let count: String
    var body: some View {
        HStack(spacing: 4) {
            Image("C-view").renderingMode(.template).resizable().frame(width: 16, height: 16)
            Text(count).suit(12, .medium, tracking: -0.48)
        }
        .foregroundStyle(DS.Palette.textPrimary)
        .padding(.horizontal, 9)
        .frame(height: 27)
        .background(.black.opacity(0.5), in: Capsule())
    }
}

/// 라이브 목록 카드(피그마 1972:22375, 상태 정의 1972:22488). 342 x 112, #222628, 모서리 16.
/// 제목(16, 16) 16 굵게 행간 140%, 아래 줄(16, 76): 눈 16 #6E767C와 보는 수 12 굵게, 점 3 #9AA1A6, 남은 시간 12(하늘색이면 방금 열림, 첫 대화 상대를 기다려요).
/// 오른쪽 아래 의자 원과 배지는 카드마다 피그마 자리 그대로다.
struct LiveCardView: View {
    let card: LiveCard
    var body: some View {
        ZStack(alignment: .topLeading) {
            Text(card.title).suit(16, .bold, lineHeight: 22.4).foregroundStyle(DS.Palette.textPrimary)
                .multilineTextAlignment(.leading).lineLimit(2)
                .frame(width: 196, alignment: .leading)
                .offset(x: 16, y: 16)
            HStack(spacing: 6) {
                HStack(spacing: 4) {
                    Image("C-view").renderingMode(.template).resizable().frame(width: 16, height: 16)
                    Text(card.viewers).suit(12, .bold, lineHeight: 17)
                }
                .foregroundStyle(DS.Palette.textTertiary)
                if !card.meta.isEmpty {
                    Circle().fill(DS.Palette.textSecondary).frame(width: 3, height: 3)
                    Text(card.meta).suit(12, .medium, lineHeight: 17)
                        .foregroundStyle(card.metaBlue ? DS.Palette.brandPrimary : DS.Palette.textSecondary)
                }
            }
            .frame(height: 23)
            .offset(x: 16, y: 76)
            ForEach(Array(card.els.enumerated()), id: \.offset) { _, el in element(el) }
        }
        .frame(width: 342, height: 112, alignment: .topLeading)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 16))
        .contentShape(RoundedRectangle(cornerRadius: 16))
    }

    @ViewBuilder private func element(_ el: LiveCardEl) -> some View {
        switch el {
        case let .chair(x, y, size, img, ring):
            // 원 #33383D, 안쪽 테두리 2(#222628) 또는 말하는 중 2.5(#2EE59D), 그림은 32 원에 28, 48 원에 43
            let inner: CGFloat = size >= 48 ? 43 : 28
            Image(img).resizable().scaledToFill().frame(width: inner, height: inner)
                .frame(width: size, height: size)
                .background(Color(hex: 0x33383D))
                .clipShape(Circle())
                .overlay(Circle().strokeBorder(ring ? DS.Palette.success : DS.Palette.bgElevated, lineWidth: ring ? 2.5 : 2))
                .offset(x: x, y: y)
        case let .more(x, y, t):
            Text(t).suit(9.72, .bold, lineHeight: 14).foregroundStyle(Color(hex: 0xD9DEE3))
                .frame(width: 26, height: 26)
                .background(Color(hex: 0x33383D), in: Circle())
                .overlay(Circle().strokeBorder(DS.Palette.bgElevated, lineWidth: 2))
                .offset(x: x, y: y)
        case let .empty(x, y):
            Text("+").suit(16, .bold, lineHeight: 22).foregroundStyle(.white.opacity(0.5))
                .frame(width: 32, height: 32)
                .background(DS.Palette.bgElevated, in: Circle())
                .overlay(Circle().strokeBorder(.white.opacity(0.35), style: StrokeStyle(lineWidth: 1.5, dash: [3, 3])))
                .offset(x: x, y: y)
        case let .speaking(x, y):
            ZStack(alignment: .topLeading) {
                Capsule().fill(DS.Palette.success)
                    .overlay(Capsule().strokeBorder(DS.Palette.bgElevated, lineWidth: 2))
                RoundedRectangle(cornerRadius: 1).fill(Color(hex: 0x0D331F)).frame(width: 2, height: 4).offset(x: 5, y: 6)
                RoundedRectangle(cornerRadius: 1).fill(Color(hex: 0x0D331F)).frame(width: 2, height: 8).offset(x: 9, y: 4)
                RoundedRectangle(cornerRadius: 1).fill(Color(hex: 0x0D331F)).frame(width: 2, height: 5).offset(x: 13, y: 6)
            }
            .frame(width: 20, height: 16, alignment: .topLeading)
            .offset(x: x, y: y)
        case let .timer(x, y, t):
            // 곧 끝(5분 이하): 빨간 #FF4D6A 알약 61 x 20, 검정 시계 13과 11 굵은 글자
            HStack(spacing: 3) {
                Image("C-clock").renderingMode(.template).resizable().frame(width: 13, height: 13)
                Text(t).suit(11, .bold, lineHeight: 14).monospacedDigit()
            }
            .foregroundStyle(.black)
            .padding(.leading, 6).padding(.trailing, 7)
            .frame(width: 61, height: 20)
            .background(DS.Palette.danger, in: Capsule())
            .offset(x: x, y: y)
        case let .fresh(x, y):
            Circle().fill(DS.Palette.brandPrimary).frame(width: 6, height: 6).offset(x: x, y: y)
        }
    }
}

/// 앱 전체 눌림 반응 하나. 누르면 0.97배, 85%로 90ms 동안 줄고, 떼면 120ms 동안 돌아온다.
/// 누르는 자리는 버튼 틀 전체(contentShape)라서 글자만 있는 버튼도 빈 곳까지 눌린다. 크기와 자리는 바뀌지 않는다.
struct PressStyle: ButtonStyle {
    static let pressIn = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.09)
    static let release = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.12)
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .contentShape(Rectangle())
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(configuration.isPressed ? 0.85 : 1)
            .animation(configuration.isPressed ? Self.pressIn : Self.release, value: configuration.isPressed)
    }
}

// MARK: - 방 구경(피그마 1943:12838)

struct LiveWatchView: View {
    @Environment(Router.self) private var router
    @State private var draft = ""
    @State private var mine = WatchData.myComments
    @FocusState private var focused: Bool
    /// 방 시계(초). 누른 카드의 남은 시간에서 시작하고, 방 시계와 같은 빠르기(20분이 실제 3분)로 줄어든다. 위 가로 카드로 들어오면 피그마 값 06:12.
    @State private var left: Double = 372
    private let clock = Timer.publish(every: 0.25, on: .main, in: .common).autoconnect()
    private var watchClock: String {
        let v = max(0, Int(left.rounded(.up)))
        return String(format: "%02d:%02d", v / 60, v % 60)
    }

    /// 피그마 단위 내용 높이: 내 댓글 하나(658~690) 뒤로 새 댓글마다 40, 입력창(754부터) 위로 띄운다.
    private var contentHeight: CGFloat {
        max(844, 690 + CGFloat(mine.count - 1) * 40 + (844 - 754) + 24)
    }

    var body: some View {
        ScrollViewReader { proxy in
            FigmaScroll(height: contentHeight) {
                ZStack(alignment: .topLeading) {
                    Image(WatchData.scene).resizable().scaledToFill().frame(width: 390, height: 440).clipped()
                    LinearGradient(colors: [DS.Palette.bgSurface.opacity(0), DS.Palette.bgSurface], startPoint: .top, endPoint: .bottom)
                        .frame(width: 404, height: 140).offset(x: -7, y: 300)
                    LinearGradient(colors: [.black, .black.opacity(0)], startPoint: .top, endPoint: .bottom)
                        .frame(width: 390, height: 125)
                    room
                    Rectangle().fill(DS.Palette.bgElevated).frame(width: 92, height: 1).offset(y: 519)
                    Rectangle().fill(DS.Palette.bgElevated).frame(width: 92, height: 1).offset(x: 298, y: 519)
                    Text("댓글은 이야기 중인 의자들에게도 보여요").suit(11, .regular, lineHeight: 16).foregroundStyle(DS.Palette.textTertiary)
                        .fixedSize().frame(width: 390).offset(y: 512)
                    comments.offset(x: 24, y: 540)
                }
            }
            .onChange(of: mine.count) { _, _ in withAnimation(DS.Motion.standard) { proxy.scrollTo(FigmaScrollEnd.id, anchor: .bottom) } }
        }
        .overlay { topBar }
        .overlay(alignment: .bottom) {
            FigmaBand(height: 90, anchor: .bottom) { inputBar }
                .ignoresSafeArea(.container, edges: .bottom)
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear { left = Double(router.watch?.left ?? 372) }
        .onReceive(clock) { _ in left = max(0, left - 0.25 * (RoomModel.shownSeconds / RoomModel.realSeconds)) }
    }

    /// 고민 묶음(24, 321): 제목 21 굵게 행간 28, "대화 중 3"(12 아래), 의자 자리 58 칸 사이 14(12 아래), 원 54 흰 바탕, 이름 11 #9AA1A6, 빈 자리 #06303C 하늘색 점선 1.5.
    private var room: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(router.watch?.title ?? WatchData.title).suit(21, .bold, lineHeight: 28).foregroundStyle(DS.Palette.textPrimary).fixedSize()
            HStack(spacing: 6) {
                Image("C-voice").renderingMode(.template).resizable().scaledToFit().frame(width: 18, height: 18)
                    .foregroundStyle(DS.Palette.brandPrimary)
                Text("대화 중 \(WatchData.seats.count)").suit(14, .bold, lineHeight: 21).foregroundStyle(DS.Palette.textPrimary)
            }
            HStack(alignment: .top, spacing: 14) {
                ForEach(WatchData.seats) { seat in
                    VStack(spacing: 6) {
                        // 피그마처럼 흰 원 바탕에 의자를 꽉 채운다. 그림은 투명판이라 원 가장자리가 깨끗하다.
                        Image(seat.image).resizable().scaledToFill().frame(width: 54, height: 54)
                            .background(Color.white)
                            .clipShape(Circle())
                        Text(seat.name).suit(11, .medium, lineHeight: 13).foregroundStyle(DS.Palette.textSecondary)
                            .lineLimit(1).frame(width: 58)
                    }
                    .frame(width: 58)
                }
                Button { router.push(.room) } label: {
                    VStack(spacing: 6) {
                        Image("C-plus").renderingMode(.template).resizable().frame(width: 22, height: 22)
                            .foregroundStyle(DS.Palette.brandPrimary)
                            .frame(width: 54, height: 54)
                            .background(DS.Palette.brandSubtle, in: Circle())
                            .overlay(Circle().strokeBorder(DS.Palette.brandPrimary, style: StrokeStyle(lineWidth: 1.5, dash: [4, 3])))
                        Text("앉기").suit(11, .bold, lineHeight: 13).foregroundStyle(DS.Palette.brandPrimary)
                    }
                    .frame(width: 54)
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel("이 방에 앉기")
            }
        }
        .offset(x: 24, y: 321)
    }

    /// 댓글(24, 540): 이름 11 #6E767C, 4 아래 말풍선(12 / 7, 모서리 14, 13 글자), 댓글 사이 8. 내 댓글은 하늘색 말풍선 오른쪽 끝.
    private var comments: some View {
        VStack(alignment: .leading, spacing: 8) {
            ForEach(WatchData.comments, id: \.0) { c in
                VStack(alignment: .leading, spacing: 4) {
                    Text(c.0).suit(11, .medium, lineHeight: 15).foregroundStyle(DS.Palette.textTertiary)
                    Text(c.1).suit(13, .medium, lineHeight: 18).foregroundStyle(DS.Palette.textPrimary)
                        .padding(.horizontal, 12).padding(.vertical, 7)
                        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 14))
                }
            }
            ForEach(Array(mine.enumerated()), id: \.offset) { _, t in
                Text(t).suit(13, .medium, lineHeight: 18).foregroundStyle(.black)
                    .padding(.horizontal, 12).padding(.vertical, 7)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 14))
                    .frame(width: 342, alignment: .trailing)
                    .transition(.asymmetric(insertion: .opacity.combined(with: .offset(y: 8)), removal: .opacity))
            }
        }
        .frame(width: 342, alignment: .topLeading)
    }

    /// 뒤로(24, 79), 보는 중(313, 78), 시계(266, 120). 스크롤해도 같은 자리에 있다.
    private var topBar: some View {
        FigmaBand(height: 150) {
            ZStack(alignment: .topLeading) {
                Button { router.pop() } label: {
                    Image("C-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44).contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel("뒤로")
                .offset(x: 14, y: 69)
                LiveViewersPill(count: router.watch?.viewers ?? "22").offset(x: 313, y: 78)
                LiveTimerPill(time: watchClock).offset(x: 266, y: 120)
            }
        }
        .ignoresSafeArea(.container, edges: .top)
    }

    /// 입력창(24, 754, 342 x 66, 모서리 32, #222628): 글자 14 #9AA1A6(21 안쪽), 오른쪽 보내기 48 하늘색 원.
    private var inputBar: some View {
        HStack(spacing: 8) {
            TextField("", text: $draft, prompt: Text("댓글 달기").foregroundStyle(DS.Palette.textSecondary))
                .suit(14, .regular)
                .foregroundStyle(DS.Palette.textPrimary)
                .focused($focused)
                .submitLabel(.send)
                .onSubmit(send)
                .padding(.leading, 21 - 9)
            Button(action: send) {
                Image("C-arrow-right").renderingMode(.template).resizable().frame(width: 24, height: 24)
                    .foregroundStyle(.black).frame(width: 48, height: 48).background(DS.Palette.brandPrimary, in: Circle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("보내기")
        }
        .padding(9)
        .frame(width: 342, height: 66)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 32))
        .offset(x: 24)
    }

    private func send() {
        let t = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !t.isEmpty else { return }
        withAnimation(DS.Motion.emphasizedDecel) { mine.append(t) }
        draft = ""
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }
}
