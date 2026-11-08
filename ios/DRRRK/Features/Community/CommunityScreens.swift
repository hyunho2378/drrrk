import SwiftUI

// 커뮤니티 목록(피그마 1953:19406)과 글 상세(1953:12298, 댓글 포함). 프로필 사진은 사람마다 다른 의자(Avatars)다.

struct CommunityView: View {
    @Environment(Router.self) private var router
    @State private var category = "전체"
    @State private var page = 0
    @State private var sort: LiveSort = .popular
    @State private var showSort = false

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
                    FeaturedCarousel(items: featured, page: $page) { router.push(.communityDetail) }
                        .padding(.top, 18)
                    PageDots(count: 5, index: page).frame(maxWidth: .infinity).padding(.top, 12)
                    CategoryTabs(selected: $category, showDot: true).padding(.top, 18)
                    HStack {
                        Text("지난 밤 이야기").suit(18, .bold, tracking: -0.72).foregroundStyle(DS.Palette.textPrimary)
                        Spacer()
                        SortButton(title: sort.rawValue) { showSort = true }
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 24)
                    VStack(spacing: 12) {
                        ForEach(posts) { post in
                            Button { router.push(.communityDetail) } label: { PostCard(post: post) }
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
            BottomNav()
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
                HStack(spacing: 4) {
                    Image("C-thumb-up-outline").renderingMode(.template).resizable().frame(width: 14, height: 14)
                    Text("\(post.likes)").suit(12, .medium, tracking: -0.48)
                    Image("C-comment").renderingMode(.template).resizable().frame(width: 14, height: 14).padding(.leading, 8)
                    Text("\(post.comments)").suit(12, .medium, tracking: -0.48)
                }
                .foregroundStyle(DS.Palette.textTertiary)
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

struct ProfileChair: View {
    let name: String
    var size: CGFloat = 32
    var body: some View {
        Image(Avatars.image(for: name)).resizable().scaledToFit()
            .padding(size * 0.12)
            .frame(width: size, height: size)
            .background(.white, in: Circle())
            .clipShape(Circle())
    }
}

struct CommunityDetailView: View {
    @Environment(Router.self) private var router
    @State private var liked = false
    @State private var likedComments: Set<UUID> = []
    @State private var comments = CommunityData.comments
    @State private var draft = ""

    private let likes = 48

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Button { router.pop() } label: {
                    Image("C-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44)
                }
                .buttonStyle(.plain)
                .accessibilityLabel("뒤로")
                Spacer()
                ShareLink(item: "둘이 찍은 사진인데 지만 보정해서 올린 여우") {
                    Image("C-share").renderingMode(.template).resizable().frame(width: 24, height: 24)
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44)
                }
                .accessibilityLabel("공유")
            }
            .padding(.horizontal, 14)
            .frame(height: 56)
            ScrollViewReader { proxy in
                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        post
                        Rectangle().fill(DS.Palette.bgBase.opacity(0.5)).frame(height: 8).padding(.top, 20)
                        Text("댓글 \(comments.count + 16)").suit(16, .bold, tracking: -0.64).foregroundStyle(DS.Palette.textPrimary)
                            .padding(.horizontal, 24).padding(.top, 22)
                        VStack(alignment: .leading, spacing: 26) {
                            ForEach(comments) { c in commentRow(c).id(c.id) }
                        }
                        .padding(.horizontal, 24)
                        .padding(.top, 18)
                        .padding(.bottom, 110)
                    }
                }
                .scrollIndicators(.hidden)
                .onChange(of: comments.count) { _, _ in withAnimation(DS.Motion.standard) { proxy.scrollTo(comments.last?.id, anchor: .bottom) } }
            }
        }
        .overlay(alignment: .bottom) { inputBar }
        .background(DS.Palette.bgSurface.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }

    private var post: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 8) {
                ProfileChair(name: CommunityData.detailAuthor, size: 28)
                Text(CommunityData.detailAuthor).suit(13, .bold, tracking: -0.52).foregroundStyle(DS.Palette.textPrimary)
                Text("방금").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textTertiary)
            }
            Text("둘이 찍은 사진인데\n지만 보정해서 올린 여우").suit(20, .bold, tracking: -0.8).foregroundStyle(DS.Palette.textPrimary)
                .lineSpacing(3).padding(.top, 16)
            Text(CommunityData.detailBody).suit(15, .medium, tracking: -0.6).foregroundStyle(DS.Palette.textSecondary)
                .lineSpacing(5).padding(.top, 14)
            ZStack(alignment: .topLeading) {
                Image(CommunityData.detailScene).resizable().scaledToFill().frame(height: 150).frame(maxWidth: .infinity).clipped()
                HStack(spacing: 6) {
                    Image("C-play").renderingMode(.template).resizable().frame(width: 16, height: 16)
                    Text("대화 다시보기 · 12:32").suit(12, .bold, tracking: -0.48)
                }
                .foregroundStyle(DS.Palette.textPrimary)
                .padding(.horizontal, 10).frame(height: 28)
                .background(.black.opacity(0.6), in: Capsule())
                .padding(12)
                HStack(spacing: -8) {
                    ForEach(CommunityData.detailSeats, id: \.self) { img in
                        Image(img).resizable().scaledToFit().padding(3).frame(width: 30, height: 30)
                            .background(.white, in: Circle()).overlay(Circle().strokeBorder(DS.Palette.bgElevated, lineWidth: 2))
                    }
                    Text("의자 3").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary).padding(.leading, 14)
                }
                .padding(12)
                .frame(maxHeight: .infinity, alignment: .bottom)
            }
            .frame(height: 150)
            .clipShape(RoundedRectangle(cornerRadius: DS.Radius.card))
            .padding(.top, 20)
            HStack(spacing: 6) {
                Button {
                    withAnimation(DS.Motion.stateIn) { liked.toggle() }
                    UIImpactFeedbackGenerator(style: .light).impactOccurred()
                } label: {
                    HStack(spacing: 6) {
                        Image(liked ? "C-thumb-up" : "C-thumb-up-outline").renderingMode(.template).resizable().frame(width: 16, height: 16)
                        Text("\(likes + (liked ? 1 : 0))").suit(12, .bold, tracking: -0.48).contentTransition(.numericText())
                    }
                    .foregroundStyle(liked ? DS.Palette.brandPrimary : DS.Palette.textSecondary)
                    .frame(minHeight: 44)
                }
                .buttonStyle(.plain)
                .accessibilityLabel(liked ? "공감 취소" : "공감")
                Image("C-comment").renderingMode(.template).resizable().frame(width: 16, height: 16).padding(.leading, 12)
                Text("댓글 \(comments.count + 16)").suit(12, .medium, tracking: -0.48)
                Spacer()
                ShareLink(item: "둘이 찍은 사진인데 지만 보정해서 올린 여우") {
                    HStack(spacing: 6) {
                        Image("C-share").renderingMode(.template).resizable().frame(width: 16, height: 16)
                        Text("공유").suit(12, .medium, tracking: -0.48)
                    }
                    .frame(minHeight: 44)
                }
            }
            .foregroundStyle(DS.Palette.textSecondary)
            .padding(.top, 4)
        }
        .padding(.horizontal, 24)
        .padding(.top, 4)
    }

    private func commentRow(_ c: PostComment) -> some View {
        let on = likedComments.contains(c.id)
        return HStack(alignment: .top, spacing: 10) {
            ProfileChair(name: c.name, size: 32)
            VStack(alignment: .leading, spacing: 6) {
                HStack(spacing: 6) {
                    Text(c.name).suit(13, .bold, tracking: -0.52).foregroundStyle(DS.Palette.textPrimary)
                    Text(c.time).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textTertiary)
                }
                Text(c.text).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary).lineSpacing(4)
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
                            Image(on ? "C-thumb-up" : "C-thumb-up-outline").renderingMode(.template).resizable().frame(width: 14, height: 14)
                            Text("\(c.likes + (on ? 1 : 0))").suit(12, .medium, tracking: -0.48)
                        }
                        .foregroundStyle(on ? DS.Palette.brandPrimary : DS.Palette.textTertiary)
                    }
                    .buttonStyle(.plain)
                    Text("답글 달기").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
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
        .padding(8)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.input))
        .padding(.horizontal, 24)
        .padding(.bottom, 12)
    }

    private func send() {
        let t = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !t.isEmpty else { return }
        withAnimation(DS.Motion.emphasizedDecel) { comments.append(.init(name: "새벽2시 피시방", time: "방금", text: t, likes: 0)) }
        draft = ""
    }
}
