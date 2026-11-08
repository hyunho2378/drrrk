import SwiftUI

// 라이브 탭(피그마 라이브 · 전체 1943:12396와 카테고리 5장, 정렬 시트 1943:12512)과 방 구경(1943:12838).
// 카테고리를 바꾸면 화면은 그대로 있고 목록만 바뀐다. 정렬을 고르면 카드가 자리를 바꾸며 옮겨 간다.

struct LiveView: View {
    @Environment(Router.self) private var router
    @State private var category = "전체"
    @State private var sort: LiveSort = .popular
    @State private var showSort = false
    @State private var page = 0
    @State private var loveSeen = false

    private var rooms: [LiveRoom] {
        let list = LiveData.rooms[category] ?? []
        switch sort {
        case .popular: return list.sorted { (Int($0.viewers) ?? 0) + $0.talkers * 3 > (Int($1.viewers) ?? 0) + $1.talkers * 3 }
        case .latest: return list.sorted { $0.seconds > $1.seconds }
        case .match: return list
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    AppTitleBar(title: "라이브")
                    FeaturedCarousel(items: LiveData.featured, page: $page) { router.push(.liveWatch) }
                        .padding(.top, 14)
                    PageDots(count: 5, index: page).frame(maxWidth: .infinity).padding(.top, 12)
                    CategoryTabs(selected: $category, showDot: !loveSeen)
                        .padding(.top, 18)
                        .onChange(of: category) {
                            _, v in if v == "연애" {
                                loveSeen = true
                            }
                        }
                    HStack {
                        Text("지금 들어갈 수 있는 방").suit(18, .bold, tracking: -0.72).foregroundStyle(DS.Palette.textPrimary)
                        Spacer()
                        SortButton(title: sort.rawValue) { showSort = true }
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 24)
                    VStack(spacing: 12) {
                        ForEach(rooms) { room in
                            Button { router.push(.liveWatch) } label: { LiveRoomCard(room: room) }
                                .buttonStyle(PressStyle())
                        }
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 15)
                    .padding(.bottom, 24)
                    .animation(DS.Motion.emphasizedDecel, value: sort)
                    .animation(DS.Motion.stateIn, value: category)
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
            .buttonStyle(.plain)
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
                    .buttonStyle(.plain)
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
        .buttonStyle(.plain)
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
                .buttonStyle(.plain)
            }
            Spacer(minLength: 0)
        }
    }
}

struct TimerBadge: View {
    let time: String
    var large = false
    var body: some View {
        HStack(spacing: 4) {
            Image("C-clock").renderingMode(.template).resizable().frame(width: large ? 16 : 13, height: large ? 16 : 13)
            Text(time).suit(large ? 13.75 : 11, .bold, tracking: -0.4).monospacedDigit()
        }
        .foregroundStyle(DS.Palette.brandPrimary)
        .padding(.horizontal, large ? 8 : 6)
        .frame(height: large ? 26 : 20)
        .background(.black.opacity(0.6), in: Capsule())
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

struct LiveRoomCard: View {
    let room: LiveRoom
    var body: some View {
        HStack(alignment: .top, spacing: 16) {
            VStack(alignment: .leading, spacing: 0) {
                Text(room.title).suit(16, .bold, tracking: -0.64).foregroundStyle(DS.Palette.textPrimary)
                    .multilineTextAlignment(.leading).lineSpacing(2)
                Spacer(minLength: 8)
                HStack(spacing: 6) {
                    Image("C-voice").renderingMode(.template).resizable().frame(width: 16, height: 10).foregroundStyle(DS.Palette.success)
                    Text(room.talk).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textSecondary)
                    Circle().fill(DS.Palette.textTertiary).frame(width: 3, height: 3)
                    Image("C-view").renderingMode(.template).resizable().frame(width: 14, height: 14).foregroundStyle(DS.Palette.textTertiary)
                    Text(room.viewers).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textTertiary)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            ZStack(alignment: .bottomTrailing) {
                Image(room.thumb).resizable().scaledToFill().frame(width: 80, height: 80).clipShape(RoundedRectangle(cornerRadius: 12))
                TimerBadge(time: room.time).offset(x: -3, y: -4)
            }
        }
        .padding(16)
        .frame(height: 112)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
    }
}

struct PressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(configuration.isPressed ? 0.9 : 1)
            .animation(DS.Motion.press, value: configuration.isPressed)
    }
}

// MARK: - 방 구경

struct LiveWatchView: View {
    @Environment(Router.self) private var router
    @State private var draft = ""
    @State private var mine = WatchData.myComments
    @State private var speaker = 1
    @FocusState private var focused: Bool

    var body: some View {
        ZStack(alignment: .top) {
            DS.Palette.bgSurface.ignoresSafeArea()
            ScrollViewReader { proxy in
                ScrollView {
                    VStack(alignment: .leading, spacing: 0) {
                        sceneHeader
                        HStack(spacing: 8) {
                            Rectangle().fill(DS.Palette.bgElevated).frame(height: 1)
                            Text("댓글은 이야기 중인 의자들에게도 보여요").suit(11, .medium, tracking: -0.44)
                                .foregroundStyle(DS.Palette.textTertiary).fixedSize()
                            Rectangle().fill(DS.Palette.bgElevated).frame(height: 1)
                        }
                        .padding(.top, 17)
                        VStack(alignment: .leading, spacing: 8) {
                            ForEach(WatchData.comments, id: \.0) { c in
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(c.0).suit(11, .medium, tracking: -0.44).foregroundStyle(DS.Palette.textSecondary)
                                    Text(c.1).suit(13, .medium, tracking: -0.52).foregroundStyle(DS.Palette.textPrimary)
                                        .padding(.horizontal, 12).padding(.vertical, 7)
                                        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                                }
                            }
                            ForEach(Array(mine.enumerated()), id: \.offset) { i, t in
                                Text(t).suit(13, .medium, tracking: -0.52).foregroundStyle(.black)
                                    .padding(.horizontal, 12).padding(.vertical, 7)
                                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                                    .frame(maxWidth: .infinity, alignment: .trailing)
                                    .id("mine\(i)")
                                    .transition(.asymmetric(insertion: .opacity.combined(with: .offset(y: 8)), removal: .opacity))
                            }
                        }
                        .padding(.horizontal, 24)
                        .padding(.top, 12)
                        .padding(.bottom, 110)
                    }
                }
                .scrollIndicators(.hidden)
                .ignoresSafeArea(edges: .top)
                .onChange(of: mine.count) { _, n in withAnimation(DS.Motion.standard) { proxy.scrollTo("mine\(n - 1)", anchor: .bottom) } }
            }
            topBar
            VStack { Spacer(); inputBar }
        }
        .toolbar(.hidden, for: .navigationBar)
        .task {
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(.random(in: 2.2 ... 4.6)))
                withAnimation(DS.Motion.emphasizedDecel) { speaker = [0, 2, 3].filter { $0 != speaker }.randomElement() ?? 1 }
            }
        }
    }

    private var sceneHeader: some View {
        ZStack(alignment: .topLeading) {
            Image(WatchData.scene).resizable().scaledToFill().frame(height: 440).frame(maxWidth: .infinity).clipped()
            LinearGradient(colors: [.black.opacity(0.5), .clear], startPoint: .top, endPoint: .init(x: 0.5, y: 0.3))
            LinearGradient(colors: [DS.Palette.bgSurface.opacity(0), DS.Palette.bgSurface], startPoint: .init(x: 0.5, y: 0.6), endPoint: .init(x: 0.5, y: 0.9))
            GeometryReader { g in
                let s = g.size.width / 390
                ForEach(Array(WatchData.floorNames.enumerated()), id: \.offset) { i, f in
                    let on = i == speaker
                    VStack(spacing: 6) {
                        Image("C-voice").renderingMode(.template).resizable().frame(width: 31, height: 20)
                            .foregroundStyle(DS.Palette.success).opacity(on ? 1 : 0)
                        Text(f.0).suit(on ? 12 : 11, on ? .bold : .medium, tracking: -0.44)
                            .foregroundStyle(on ? DS.Palette.textPrimary : DS.Palette.textPrimary.opacity(0.6)).fixedSize()
                    }
                    .position(x: (f.1 + 46) * s, y: (f.2 - 6) * s)
                }
            }
            .frame(height: 440)
            VStack(alignment: .leading, spacing: 12) {
                Text(WatchData.title).suit(21, .bold, tracking: -0.84).foregroundStyle(DS.Palette.textPrimary).lineSpacing(3)
                HStack(spacing: 6) {
                    Image("C-voice").renderingMode(.template).resizable().frame(width: 16, height: 12).foregroundStyle(DS.Palette.brandPrimary)
                    Text("대화 중 \(WatchData.seats.count)").suit(14, .bold, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary)
                }
                HStack(alignment: .top, spacing: 16) {
                    ForEach(WatchData.seats) { seat in
                        VStack(spacing: 6) {
                            Image(seat.image).resizable().scaledToFit().padding(6).frame(width: 54, height: 54)
                                .background(.white, in: Circle())
                            Text(seat.name).suit(11, .medium, tracking: -0.44).foregroundStyle(DS.Palette.textSecondary)
                                .lineLimit(1).frame(width: 60)
                        }
                    }
                    Button { router.push(.room) } label: {
                        VStack(spacing: 6) {
                            Image("C-plus").renderingMode(.template).resizable().frame(width: 22, height: 22)
                                .foregroundStyle(DS.Palette.brandPrimary)
                                .frame(width: 54, height: 54)
                                .background(DS.Palette.brandSubtle, in: Circle())
                                .overlay(Circle().strokeBorder(DS.Palette.brandPrimary, style: StrokeStyle(lineWidth: 1.5, dash: [4, 3])))
                            Text("앉기").suit(11, .bold, tracking: -0.44).foregroundStyle(DS.Palette.brandPrimary)
                        }
                    }
                    .buttonStyle(PressStyle())
                    .accessibilityLabel("이 방에 앉기")
                }
            }
            .padding(.horizontal, 24)
            .padding(.top, 321)
        }
        .frame(height: 495)
    }

    private var topBar: some View {
        HStack(alignment: .top) {
            Button { router.pop() } label: {
                Image("C-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                    .foregroundStyle(DS.Palette.textPrimary).frame(width: 44, height: 44)
            }
            .buttonStyle(.plain)
            .accessibilityLabel("뒤로")
            Spacer()
            TimerBadge(time: "06:12", large: true).padding(.top, 50)
            ViewersPill(count: "22").padding(.top, 8)
        }
        .padding(.leading, 14)
        .padding(.trailing, 24)
    }

    private var inputBar: some View {
        HStack(spacing: 8) {
            TextField("", text: $draft, prompt: Text("댓글 달기").foregroundStyle(DS.Palette.textSecondary))
                .suit(14, .medium, tracking: -0.56)
                .foregroundStyle(DS.Palette.textPrimary)
                .focused($focused)
                .submitLabel(.send)
                .onSubmit(send)
                .padding(.leading, 13)
            Button(action: send) {
                Image("C-arrow-right").renderingMode(.template).resizable().frame(width: 24, height: 24)
                    .foregroundStyle(.black).frame(width: 48, height: 48).background(DS.Palette.brandPrimary, in: Circle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("보내기")
        }
        .padding(8)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.input))
        .padding(.horizontal, 24)
        .padding(.bottom, 12)
    }

    private func send() {
        let t = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !t.isEmpty else { return }
        withAnimation(DS.Motion.emphasizedDecel) { mine.append(t) }
        draft = ""
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }
}
