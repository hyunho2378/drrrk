import SwiftUI

// 커뮤니티 목록(피그마 1953:19406)과 글 상세(v5 2100:23295, 댓글 모음 2100:23497). 프로필 사진은 사람마다 다른 의자(Avatars)다.
// 11. 10. 팀 메모 반영(웹 CommunityPost.jsx와 같은 값):
//  상단 바는 뒤로가기만(공유는 아래 액션줄에만, 2100:23637). 액션줄은 좋아요 24와 숫자 16, 공유 24와 "공유" 16이고 댓글 수는 뺐다(2100:23633, Actions 2100:23321).
//  댓글마다 의자 프로필(2100:23632).
// 11. 11. 23시 팀 수정본 글 상세 2298:22028(의정 "커뮤니티 상세 탭 이 화면으로 반영"): 작성자는 의자 프로필 32(푹신한 가죽 소파12),
//  대화 다시보기 카드는 오른쪽 아래 "12:32" 칩과 "+1" 의자 셋 "의자 4", "라이브 다시보기"이고 누르면 대화 다시보기(ReplayView, 피그마 2322:12283)로 들어간다.

extension CommunityData {
    /// 글 상세 작성자(피그마 2298:22031): "의자 프로필" 32 원(#33383D, sofa_05)을 통째로 내본 그림과 이름. 웹 communityPostData.js와 같다.
    static let postAuthor = "푹신한 가죽 소파12"
    static let postAuthorAvatar = "C-author-sofa5"
    /// 목록에서 연 글 제목. 글 상세 제목에 쓴다(웹 community.js pickedPostTitle과 같은 규칙). 기본은 사진보정 글이고 본문과 댓글은 같다.
    nonisolated(unsafe) static var openedTitle = WatchPick.photoTitle
    /// 누른 목록 카드의 따봉 수와 댓글 수(글 상세 숫자를 카드와 같게, 웹 community.js pickedPostStats와 같다). 같은 제목도 탭마다 숫자가 달라 따로 기억한다.
    nonisolated(unsafe) static var openedCounts: (likes: Int, comments: Int)? = nil
    /// 목록 카드를 누를 때 부른다.
    static func open(_ post: CommunityPost) {
        openedTitle = post.title
        openedCounts = (post.likes, post.comments)
    }
}

struct CommunityView: View {
    @Environment(Router.self) private var router
    @State private var category = "전체"
    @State private var page = 0
    @State private var sort: LiveSort = .popular
    @State private var showSort = false
    @State private var loveDots = LoveDotStore.shared


    /// 고른 카테고리 탭의 카드(CommunityTabs.swift). 전체는 기존 목록이다.
    private var posts: [CommunityPost] {
        let base = CommunityData.posts(for: category)
        switch sort {
        case .popular: return base.sorted { $0.likes > $1.likes }
        case .latest: return base.reversed()
        case .match: return base
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    AppTitleBar(title: "커뮤니티")
                    HStack(spacing: 6) {
                        Image("C-hall").resizable().frame(width: 24, height: 24)
                        Text("명예의 전당").suit(20, .bold, tracking: -0.8).foregroundStyle(DS.Palette.textPrimary)
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 22)
                    // 11. 12. 새 섹션 2340:28014 캐러셀(2366:34754): 지난 밤 이야기 카드와 같은 작은 글 카드 다섯 장(342 x 112, 사이 12).
                    // 제목 아래 6에서 시작하고(y 158), 점은 카드 아래 12(y 282), 탭 줄은 점 아래 20(y 308)이다. 어느 카드를 눌러도 그 글 상세로 간다(웹과 같다).
                    HallCarousel(items: CommunityData.hallCards, page: $page) { post in
                        CommunityData.open(post)
                        router.push(.communityDetail)
                    }
                        .padding(.top, 6)
                    PageDots(count: CommunityData.hallCards.count, index: page).frame(maxWidth: .infinity).padding(.top, 12)
                    CategoryTabs(selected: $category, showDot: !loveDots.communityLoveSeen).padding(.top, 20)
                        .onChange(of: category, initial: true) { _, new in
                            if new == "연애" { loveDots.markCommunity() }
                            CommunityTabState.selected = new
                        }
                    HStack {
                        Text("지난 밤 이야기").suit(18, .bold, tracking: -0.72).foregroundStyle(DS.Palette.textPrimary)
                        Spacer()
                        SortButton(title: sort.rawValue) { showSort = true }
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 24)
                    // 탭을 바꾸면 앞 목록과 새 목록이 같은 자리에 겹쳐 180ms 동안 얕어지고 짙어진다(투명도만). 탭 줄과 머리는 제자리에 있다.
                    ZStack(alignment: .top) {
                        VStack(spacing: 12) {
                            ForEach(posts) { post in
                                Button {
                                    CommunityData.open(post)
                                    router.push(.communityDetail)
                                } label: { PostCard(post: post) }
                                    .buttonStyle(PressStyle())
                            }
                        }
                        .padding(.horizontal, 24)
                        .padding(.top, 15)
                        .padding(.bottom, 24)
                        .animation(DS.Motion.emphasizedDecel, value: sort)
                        .id(category)
                        .transition(.opacity)
                    }
                    .animation(CommunityTabState.fade, value: category)
                }
            }
            .scrollIndicators(.hidden)
            .contentMargins(.bottom, BottomNav.height - 34, for: .scrollContent)
        }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
        .sheet(isPresented: $showSort) {
            SortSheet(selected: $sort)
                .presentationDetents([.height(268)])
                .presentationCornerRadius(24)
                .presentationBackground(DS.Palette.bgElevated)
        }
    }
}

/// 명예의 전당 카드 줄. 카드 한 장씩 맞춰 멈추고(viewAligned), 보이는 카드 번호를 점에 알린다.
private struct HallCarousel: View {
    let items: [CommunityPost]
    @Binding var page: Int
    let onTap: (CommunityPost) -> Void
    var body: some View {
        ScrollView(.horizontal) {
            LazyHStack(spacing: 12) {
                ForEach(Array(items.enumerated()), id: \.element.id) { i, post in
                    Button { onTap(post) } label: { PostCard(post: post).frame(width: 342) }
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
        .frame(height: 112)
    }
}

extension CommunityData {
    /// 명예의 전당 다섯 장(피그마 2366:34754 왼쪽부터 List Card / 1, 2, 4, 5, 6). 그림은 목록 카드와 같은 그림을 다시 쓴다.
    static let hallCards: [CommunityPost] = [
        .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", likes: 128, comments: 52, thumb: "F-community-thumb-1"),
        .init(title: "부모님은 공무원 하라는데\n나는 그림이 좋다", likes: 97, comments: 61, thumb: "F-community-thumb-1864c9-t2"),
        .init(title: "조별과제 혼자 다 했는데\n이름은 다섯 명", likes: 118, comments: 56, thumb: "F-community-thumb-5b7485"),
        .init(title: "전남친이 내 친구랑\n사귄다는 소식 들음", likes: 156, comments: 63, thumb: "F-community-thumb-6b25e7"),
        .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", likes: 31, comments: 17, thumb: "F-community-thumb-2"),
    ]
}

private struct PostCard: View {
    let post: CommunityPost
    var body: some View {
        HStack(alignment: .top, spacing: 16) {
            VStack(alignment: .leading, spacing: 0) {
                Text(post.title).suit(16, .bold, tracking: -0.64).foregroundStyle(DS.Palette.textPrimary)
                    .multilineTextAlignment(.leading).lineSpacing(2)
                Spacer(minLength: 8)
                // 피그마 1953:19406 stats(2223:13623 등, 의정 11. 10. "좋아요/댓글 사이 간격 수정"): 따봉 16, 숫자, 댓글 16, 숫자를 간격 4로만 잇는다.
                // 줄 높이 16, 카드 위에서 76(아래 여백 20), 글자색 #9AA1A6.
                HStack(spacing: 4) {
                    Image("C-thumb-up-outline").renderingMode(.template).resizable().frame(width: 16, height: 16)
                    Text("\(post.likes)").suit(12, .medium, tracking: -0.48)
                    Image("C-comment").renderingMode(.template).resizable().frame(width: 16, height: 16)
                    Text("\(post.comments)").suit(12, .medium, tracking: -0.48)
                }
                .frame(height: 16)
                .padding(.bottom, 4)
                .foregroundStyle(DS.Palette.textSecondary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            ZStack(alignment: .bottomTrailing) {
                Image(post.thumb).resizable().scaledToFill().frame(width: 80, height: 80).clipShape(RoundedRectangle(cornerRadius: 12))
                Image("C-play").renderingMode(.template).resizable().frame(width: 26, height: 26)
                    .foregroundStyle(DS.Palette.textPrimary).offset(x: -6, y: -6)
            }
        }
        .padding(16)
        .frame(height: 112)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
    }
}

/// 피그마 "의자 프로필"(1953:20583 계열): 32 원, 바탕 #33383D, 안쪽 의자 그림 28.5(사방 1.75).
struct ProfileChair: View {
    let name: String
    var size: CGFloat = 32
    var image: String? = nil
    var body: some View {
        Image(image ?? Avatars.image(for: name)).resizable().scaledToFill()
            .frame(width: size * 28.5 / 32, height: size * 28.5 / 32)
            .frame(width: size, height: size)
            .background(Color(hex: 0x33383D), in: Circle())
            .clipShape(Circle())
    }
}

struct CommunityDetailView: View {
    @Environment(Router.self) private var router
    @State private var liked = false
    @State private var likedComments: Set<UUID> = []
    // 목록에서 연 글(표에 있으면 그 글, 없으면 사진보정 원문). 웹 CommunityPost.jsx postFor와 같은 규칙이다.
    private let script = CommunityData.script(for: CommunityData.openedTitle)
    @State private var comments = CommunityData.script(for: CommunityData.openedTitle)?.comments ?? CommunityData.comments
    @State private var draft = ""
    @State private var title = CommunityData.script(for: CommunityData.openedTitle)?.title ?? CommunityData.openedTitle
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @FocusState private var typing: Bool

    private var likes: Int { script == nil ? 48 : (CommunityData.openedCounts?.likes ?? 48) }
    /// "댓글 N": 카드 댓글 수에 새로 단 댓글 수를 더한다(사진보정 원문은 23).
    private var commentTotal: Int {
        let base = script == nil ? 23 : (CommunityData.openedCounts?.comments ?? 23)
        return base + comments.count - (script?.comments.count ?? CommunityData.comments.count)
    }

    var body: some View {
        ZStack(alignment: .bottom) {
        VStack(spacing: 0) {
            HStack {
                Button { router.pop() } label: {
                    Image("C-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44)
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel("뒤로")
                Spacer()
            }
            .padding(.horizontal, 14)
            .frame(height: 56)
            ScrollViewReader { proxy in
                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        post
                        // 피그마 Divider 390 x 8, #222628
                        Rectangle().fill(DS.Palette.bgElevated).frame(height: 8)
                        Text("댓글 \(commentTotal)").suit(16, .bold).foregroundStyle(DS.Palette.textPrimary)
                            .padding(.horizontal, 24).padding(.top, 16)
                        VStack(alignment: .leading, spacing: 0) {
                            ForEach(comments) { c in commentRow(c).padding(.vertical, 14).id(c.id) }
                        }
                        .padding(.horizontal, 24)
                        .padding(.bottom, 130)
                    }
                }
                .scrollIndicators(.hidden)
                .onChange(of: comments.count) { _, _ in withAnimation(DS.Motion.standard) { proxy.scrollTo(comments.last?.id, anchor: .bottom) } }
            }
        }
            // 피그마 2298:22208: 아래 136 높이 검은 그라데이션(0%에서 투명, 73.24%에서 검정) 위에 입력창(342 x 66, 모서리 32), 화면 바닥에서 24
            LinearGradient(stops: [.init(color: .black.opacity(0), location: 0), .init(color: .black, location: 0.7324)], startPoint: .top, endPoint: .bottom)
                .frame(height: 136).allowsHitTesting(false)
            inputBar
        }
        .ignoresSafeArea(.container, edges: .bottom)
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }

    private var post: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 8) {
                // 피그마 2298:22032 "의자 프로필": 32 원, 바탕 #33383D, 안쪽 sofa_05 28.5
                if let script {
                    ProfileChair(name: script.author, size: 32)
                } else {
                    Image(CommunityData.postAuthorAvatar).resizable().frame(width: 32, height: 32)
                }
                Text(script?.author ?? CommunityData.postAuthor).suit(13, .bold).foregroundStyle(DS.Palette.textPrimary)
                Text("· " + (script?.time ?? "방금")).suit(12, .medium).foregroundStyle(DS.Palette.textTertiary)
            }
            Text(title).suit(20, .bold, lineHeight: 28).foregroundStyle(DS.Palette.textPrimary)
                .padding(.top, 16)
            Text(script?.body ?? CommunityData.detailBody).suit(15, .regular, lineHeight: 24).foregroundStyle(Color(hex: 0xD9DBDE))
                .padding(.top, 12)
            // 대화 다시보기 카드(2298:22040, 11. 11. 23시 팀 수정본) 342 x 176, 모서리 16, #1F2226. 웹 CommunityPost.jsx와 같은 값.
            // 장면 그림 150 높이는 피그마 fade(2298:22042)가 scene을 모두 덮은 모습 그대로다. 오른쪽 아래 재생 시간 칩(2298:22043),
            // play 버튼(2298:22047)은 피그마에서 안쪽 그림이 지워져 보이지 않아 그리지 않는다. 카드를 누르면 대화 다시보기로 들어간다.
            Button { router.push(.replay) } label: {
            ZStack(alignment: .topLeading) {
                Image(CommunityData.detailScene).resizable().scaledToFill().frame(height: 150).frame(maxWidth: .infinity).clipped()
                // 재생 시간(2298:22043): 45 x 25, 카드 안 283, 97, 안쪽 여백 좌우 8 위아래 4, 검정 55%
                Text("12:32").suit(12, .medium, lineHeight: 17)
                    .foregroundStyle(.white)
                    .padding(.horizontal, 8).padding(.vertical, 4)
                    .frame(height: 25)
                    .background(.black.opacity(0.55), in: Capsule())
                    .frame(maxWidth: .infinity, alignment: .trailing)
                    .padding(.trailing, 14)
                    .offset(y: 97)
                // 라이브 보기 바(2298:22048): 왼쪽 여백 12, 오른쪽 10, 양 끝 정렬
                HStack(spacing: 0) {
                    HStack(spacing: 8) {
                        // "+1"과 의자 프로필 셋(2298:22051, 97 x 32). 내보낸 그림은 양쪽 1씩 더 넓어(99) 왼쪽으로 1 당긴다.
                        Image("C-replay-seats4").resizable().frame(width: 99, height: 32)
                            .frame(width: 97, height: 32)
                        Text("의자 4").suit(12, .medium, lineHeight: 16.8).foregroundStyle(DS.Palette.textPrimary)
                    }
                    Spacer(minLength: 0)
                    // 라이브 보기 CTA(2298:22059): 13 Bold #36D2FF, 사이 2, chevron 16
                    HStack(spacing: 2) {
                        Text("라이브 다시보기").suit(13, .bold, lineHeight: 16.2)
                        Image("C-chevron-right-16").renderingMode(.template).resizable().frame(width: 16, height: 16)
                    }
                    .foregroundStyle(DS.Palette.brandPrimary)
                }
                .padding(.leading, 12).padding(.trailing, 10)
                .frame(maxWidth: .infinity)
                .frame(height: 44)
                .background(DS.Palette.bgElevated)
                .offset(y: 132)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 176, alignment: .topLeading)
            .background(Color(hex: 0x1F2226))
            .clipShape(RoundedRectangle(cornerRadius: 16))
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("라이브 다시보기")
            .padding(.top, 24)
            // 피그마 Actions 2100:23321: 342 x 36. 좋아요(채운 엄지 24, 사이 8, 숫자 16 Bold 자간 -4%), 오른쪽 공유(아이콘 24, 사이 4, "공유" 16 Bold 자간 -4%). 색 #9AA1A6, 누르면 #36D2FF.
            HStack(spacing: 0) {
                Button {
                    withAnimation(DS.Motion.stateIn) { liked.toggle() }
                    UIImpactFeedbackGenerator(style: .light).impactOccurred()
                } label: {
                    HStack(spacing: 8) {
                        Image("C-thumb-up").renderingMode(.template).resizable().frame(width: 24, height: 24)
                            // 웹과 같은 튀는 움직임: 360ms 동안 1.38배, -14도까지 갔다가 돌아온다(40% 지점이 꼭대기).
                            // 줄인 움직임을 켠 사람에게는 trigger가 바뀌지 않아 튀지 않는다(숫자와 색만 바뀐다).
                            .keyframeAnimator(initialValue: 1.0, trigger: reduceMotion ? false : liked) { view, k in
                                view.scaleEffect(k).rotationEffect(.degrees((k - 1) / 0.38 * -14))
                            } keyframes: { _ in
                                CubicKeyframe(1.38, duration: 0.144)
                                CubicKeyframe(1.0, duration: 0.216)
                            }
                        Text("\(likes + (liked ? 1 : 0))").suit(16, .bold, tracking: -0.64).contentTransition(.numericText())
                    }
                    .foregroundStyle(liked ? DS.Palette.brandPrimary : DS.Palette.textSecondary)
                    .frame(minHeight: 44)
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel(liked ? "좋아요 취소" : "좋아요")
                Spacer()
                ShareLink(item: title.replacingOccurrences(of: "\n", with: " ")) {
                    HStack(spacing: 4) {
                        Image("C-share").renderingMode(.template).resizable().frame(width: 24, height: 24)
                        Text("공유").suit(16, .bold, tracking: -0.64)
                    }
                    .frame(minHeight: 44)
                    .contentShape(Rectangle())
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel("공유")
            }
            .foregroundStyle(DS.Palette.textSecondary)
            .frame(height: 36)
            .padding(.top, 16)
        }
        .padding(.horizontal, 24)
        .padding(.top, 2)
        .padding(.bottom, 24)
    }

    private func commentRow(_ c: PostComment) -> some View {
        let on = likedComments.contains(c.id)
        return HStack(alignment: .top, spacing: 10) {
            ProfileChair(name: c.name, size: 32, image: c.avatar)
            VStack(alignment: .leading, spacing: 6) {
                HStack(spacing: 6) {
                    Text(c.name).suit(13, .bold).foregroundStyle(DS.Palette.textPrimary)
                    Text(c.time).suit(12, .medium).foregroundStyle(DS.Palette.textTertiary)
                }
                Text(c.text).suit(14, .regular, lineHeight: 21).foregroundStyle(DS.Palette.textPrimary)
                HStack(spacing: 14) {
                    Button {
                        withAnimation(DS.Motion.stateIn) {
                            if on {
                                likedComments.remove(c.id)
                            } else {
                                likedComments.insert(c.id)
                            }
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Image(on ? "C-thumb-up" : "C-thumb-up-outline").renderingMode(.template).resizable().frame(width: 16, height: 16)
                            Text("\(c.likes + (on ? 1 : 0))").suit(12, .medium, tracking: -0.48)
                        }
                        .foregroundStyle(on ? DS.Palette.brandPrimary : DS.Palette.textSecondary)
                    }
                    .buttonStyle(PressStyle())
                    // 답글 달기: 아래 입력칸에 커서를 두고 그 사람 이름을 앞에 붙여 둔다.
                    Button {
                        if !draft.hasPrefix("@" + c.name) { draft = "@" + c.name + " " + draft }
                        typing = true
                    } label: {
                        Text("답글 달기").suit(12, .medium).foregroundStyle(DS.Palette.textTertiary)
                    }
                    .buttonStyle(PressStyle())
                }
            }
        }
        .padding(.leading, c.reply ? 42 : 0)
    }

    private var inputBar: some View {
        HStack(spacing: 8) {
            // 피그마 2340:28315(11. 12. 최종): "댓글 달기" 14 Regular, x 45. 보내기 버튼 x 309(오른쪽 안쪽 여백 9). 웹 CommunityPost.jsx와 같은 값.
            TextField("", text: $draft, prompt: Text("댓글 달기").foregroundStyle(DS.Palette.textSecondary))
                .suit(14, .regular, tracking: -0.56)
                .foregroundStyle(DS.Palette.textPrimary)
                .focused($typing)
                .submitLabel(.send)
                .onSubmit(send)
                .padding(.leading, 13)
            Button(action: send) {
                Image("C-arrow-right").renderingMode(.template).resizable().frame(width: 24, height: 24)
                    .foregroundStyle(.black).frame(width: 48, height: 48).background(DS.Palette.brandPrimary, in: Circle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("댓글 보내기")
        }
        .padding(.vertical, 8).padding(.trailing, 9).padding(.leading, 8)
        .frame(height: 66)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 32))
        .padding(.horizontal, 24)
        .padding(.bottom, 24)
    }

    private func send() {
        let t = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !t.isEmpty else { return }
        withAnimation(DS.Motion.emphasizedDecel) { comments.append(.init(name: "새벽2시 피시방", time: "방금", text: t, likes: 0)) }
        draft = ""
    }
}
