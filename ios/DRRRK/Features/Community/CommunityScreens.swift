import SwiftUI

// 커뮤니티 목록(피그마 1953:19406)과 글 상세(v5 2100:23295, 댓글 모음 2100:23497). 프로필 사진은 사람마다 다른 의자(Avatars)다.
// 11. 10. 팀 메모 반영(웹 CommunityPost.jsx와 같은 값):
//  상단 바는 뒤로가기만(공유는 아래 액션줄에만, 2100:23637). 액션줄은 좋아요 24와 숫자 16, 공유 24와 "공유" 16이고 댓글 수는 뺐다(2100:23633, Actions 2100:23321).
//  댓글마다 의자 프로필(2100:23632). 대화 다시보기 카드는 모양만 맞추고 누른 뒤 화면은 만들지 않는다(2100:23495, 2100:23496).

extension CommunityData {
    /// 목록에서 연 글 제목. 글 상세 제목에 쓴다(웹 community.js pickedPostTitle과 같은 규칙). 기본은 사진보정 글이고 본문과 댓글은 같다.
    nonisolated(unsafe) static var openedTitle = WatchPick.photoTitle
}

struct CommunityView: View {
    @Environment(Router.self) private var router
    @State private var category = "전체"
    @State private var page = 0
    @State private var sort: LiveSort = .popular
    @State private var showSort = false
    @State private var loveDots = LoveDotStore.shared

    private var featured: [LiveFeatured] {
        zip(CommunityData.featuredTitles, CommunityData.scenes).map { .init(title: $0, versus: "", time: "", viewers: "", scene: $1) }
    }

    private var posts: [CommunityPost] {
        switch sort {
        case .popular: CommunityData.posts.sorted { $0.likes > $1.likes }
        case .latest: CommunityData.posts.reversed()
        case .match: CommunityData.posts
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
                    FeaturedCarousel(items: featured, page: $page) {
                        CommunityData.openedTitle = featured[min(page, featured.count - 1)].title
                        router.push(.communityDetail)
                    }
                        .padding(.top, 18)
                    PageDots(count: 5, index: page).frame(maxWidth: .infinity).padding(.top, 12)
                    CategoryTabs(selected: $category, showDot: !loveDots.communityLoveSeen).padding(.top, 18)
                        .onChange(of: category, initial: true) { _, new in
                            if new == "연애" { loveDots.markCommunity() }
                        }
                    HStack {
                        Text("지난 밤 이야기").suit(18, .bold, tracking: -0.72).foregroundStyle(DS.Palette.textPrimary)
                        Spacer()
                        SortButton(title: sort.rawValue) { showSort = true }
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 24)
                    VStack(spacing: 12) {
                        ForEach(posts) { post in
                            Button {
                                CommunityData.openedTitle = post.title
                                router.push(.communityDetail)
                            } label: { PostCard(post: post) }
                                .buttonStyle(PressStyle())
                        }
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 15)
                    .padding(.bottom, 24)
                    .animation(DS.Motion.emphasizedDecel, value: sort)
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
    @State private var comments = CommunityData.comments
    @State private var draft = ""
    @State private var title = CommunityData.openedTitle
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @FocusState private var typing: Bool

    private let likes = 48

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
                        Text("댓글 \(comments.count + 16)").suit(16, .bold).foregroundStyle(DS.Palette.textPrimary)
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
            // 피그마: 아래 212 높이 검은 그라데이션 위에 입력창(342 x 66, 모서리 32), 화면 바닥에서 24
            LinearGradient(colors: [.black.opacity(0), .black], startPoint: .top, endPoint: .bottom)
                .frame(height: 212).allowsHitTesting(false)
            inputBar
        }
        .ignoresSafeArea(.container, edges: .bottom)
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }

    private var post: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 8) {
                // 피그마 1953:12302: 28 원, 바탕 #222628, 그림 FIT
                Image(CommunityData.detailAuthorAvatar).resizable().scaledToFit()
                    .frame(width: 28, height: 28)
                    .background(DS.Palette.bgElevated, in: Circle())
                    .clipShape(Circle())
                Text(CommunityData.detailAuthor).suit(13, .bold).foregroundStyle(DS.Palette.textPrimary)
                Text("· 방금").suit(12, .medium).foregroundStyle(DS.Palette.textTertiary)
            }
            Text(title).suit(20, .bold, lineHeight: 28).foregroundStyle(DS.Palette.textPrimary)
                .padding(.top, 16)
            Text(CommunityData.detailBody).suit(15, .regular, lineHeight: 24).foregroundStyle(Color(hex: 0xD9DBDE))
                .padding(.top, 12)
            // 대화 다시보기 카드 342 x 150, 모서리 16, #1F2226. 장면 그림은 피그마 fade(1953:12313, 편의점 장면)가 scene을 모두 덮은 모습 그대로다.
            ZStack(alignment: .topLeading) {
                Image(CommunityData.detailScene).resizable().scaledToFill().frame(height: 150).frame(maxWidth: .infinity).clipped()
                HStack(spacing: 6) {
                    Image("C-play").renderingMode(.template).resizable().frame(width: 18, height: 18)
                    Text("대화 다시보기 · 12:32").suit(12, .medium)
                }
                .foregroundStyle(.white)
                .padding(.leading, 6).padding(.trailing, 12).padding(.vertical, 4)
                .background(.black.opacity(0.55), in: Capsule())
                .padding(12)
                HStack(spacing: 8) {
                    HStack(spacing: -8) {
                        ForEach(CommunityData.detailSeats, id: \.self) { img in
                            Image(img).resizable().scaledToFit().frame(width: 30, height: 30)
                                .background(DS.Palette.bgElevated, in: Circle()).clipShape(Circle())
                                .overlay(Circle().strokeBorder(Color(hex: 0x1F2226), lineWidth: 2))
                        }
                    }
                    Text("의자 3").suit(12, .medium).foregroundStyle(DS.Palette.textPrimary)
                }
                .padding(.leading, 12).padding(.bottom, 12)
                .frame(maxHeight: .infinity, alignment: .bottom)
                // 피그마 1971:22954: 카드 아래 32 높이 #222628 판이 참여 의자 줄 위를 덮는다.
                Rectangle().fill(DS.Palette.bgElevated).frame(height: 32)
                    .frame(maxHeight: .infinity, alignment: .bottom)
            }
            .frame(height: 150)
            .background(Color(hex: 0x1F2226))
            .clipShape(RoundedRectangle(cornerRadius: 16))
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
            TextField("", text: $draft, prompt: Text("댓글 달기").foregroundStyle(DS.Palette.textSecondary))
                .suit(14, .medium, tracking: -0.56)
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
        .padding(.vertical, 8).padding(.trailing, 8).padding(.leading, 8)
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
