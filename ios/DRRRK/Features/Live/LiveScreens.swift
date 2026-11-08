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

/// 라이브 목록 카드(피그마 1972:22375 "라이브 · 리스트 시안 v2", 상태 정의 1972:22488). 342 x 112, #222628, 모서리 16.
/// 왼쪽은 제목(16 굵게, 196 폭)과 보는 수, 남은 시간. 오른쪽은 앉은 의자 원(큰 원 48, 작은 원 32, 남는 수는 +N).
/// 상태: 말하는 중(큰 원 초록 테두리와 말하는 표시), 조용함, 혼자 있는 방(빈 자리 +, 첫 대화 상대를 기다려요), 곧 끝(5분 이하, 빨간 시계), 막 열린 방(방금 열림, 하늘색 점).
struct LiveRoomCard: View {
    let room: LiveRoom

    private enum Phase { case speaking, quiet, alone, ending, fresh }

    private var phase: Phase {
        if room.seconds > 0, room.seconds <= 300 { return .ending }
        if room.talkers <= 1 { return .alone }
        if room.seconds >= 17 * 60 + 30 { return .fresh }
        return room.talkers >= 4 ? .speaking : .quiet
    }

    /// 방마다 같은 의자가 앉도록 제목으로 고른다(투명판 의자 그림).
    private static let chairs = ["D-chairt-4fdd18ce8a", "D-chairt-51be0a544b", "D-chairt-cf2670f44f", "D-chairt-eab22a7a4d",
                                 "D-chairt-d7b0bb5005", "D-chairt-66dbe89dae", "D-chairt-6e90eda49e", "D-chairt-33871c043e"]
    private var seats: [String] {
        let seed = room.title.unicodeScalars.reduce(0) { ($0 &* 31 &+ Int($1.value)) & 0xFFFF }
        return (0 ..< 3).map { Self.chairs[(seed + $0 * 3) % Self.chairs.count] }
    }

    var body: some View {
        let p = phase
        ZStack(alignment: .topLeading) {
            if p == .fresh {
                Circle().fill(DS.Palette.brandPrimary).frame(width: 6, height: 6).offset(x: 8, y: 20)
            }
            VStack(alignment: .leading, spacing: 0) {
                Text(room.title).suit(16, .bold, lineHeight: 22.4).foregroundStyle(DS.Palette.textPrimary)
                    .multilineTextAlignment(.leading).lineLimit(2)
                    .frame(width: 196, alignment: .leading)
                Spacer(minLength: 0)
                meta(p)
            }
            .padding(.leading, 16).padding(.top, 16).padding(.bottom, 13)
            .frame(maxHeight: .infinity, alignment: .topLeading)

            if p == .ending {
                TimerBadge(time: room.time, urgent: true).offset(x: 269, y: 16)
            }
            avatars(p)
                .frame(width: 342 - 16, height: 112 - 18, alignment: .bottomTrailing)
        }
        .frame(width: 342, height: 112, alignment: .topLeading)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 16))
    }

    private func meta(_ p: Phase) -> some View {
        HStack(spacing: 6) {
            HStack(spacing: 4) {
                Image("C-view").renderingMode(.template).resizable().frame(width: 16, height: 16)
                Text(room.viewers).suit(12, .bold, tracking: -0.48)
            }
            .foregroundStyle(DS.Palette.textTertiary)
            if p != .ending {
                Circle().fill(DS.Palette.textSecondary).frame(width: 3, height: 3)
                switch p {
                case .alone:
                    Text("첫 대화 상대를 기다려요").suit(12, .medium, lineHeight: 17).foregroundStyle(DS.Palette.brandPrimary)
                case .fresh:
                    Text("방금 열림").suit(12, .medium, lineHeight: 17).foregroundStyle(DS.Palette.brandPrimary)
                default:
                    Text("\(room.time) 남음").suit(12, .medium, lineHeight: 17).foregroundStyle(DS.Palette.textSecondary)
                }
            }
        }
        .frame(height: 23)
    }

    /// 오른쪽 아래 의자 원 묶음. 작은 원은 22씩 겹치고, 큰 원(48)이 맨 앞 오른쪽이다.
    private func avatars(_ p: Phase) -> some View {
        let count = p == .alone ? 1 : min(3, max(2, room.talkers))
        let extra = max(0, room.talkers - 3)
        let speaking = p == .speaking || (p == .ending && room.talkers >= 4) || p == .fresh
        return HStack(alignment: .bottom, spacing: -10) {
            if extra > 0 {
                Text("+\(extra)").suit(9.72, .bold, lineHeight: 13.8).foregroundStyle(Color(hex: 0xD9DEE3))
                    .frame(width: 26, height: 26)
                    .background(Color(hex: 0x33383D), in: Circle())
                    .overlay(Circle().strokeBorder(DS.Palette.bgElevated, lineWidth: 2))
                    .padding(.trailing, -3)
                    .padding(.bottom, 3)
            }
            if p == .alone {
                Text("+").suit(16, .bold, lineHeight: 22).foregroundStyle(.white.opacity(0.5))
                    .frame(width: 32, height: 32)
                    .background(DS.Palette.bgElevated, in: Circle())
                    .overlay(Circle().strokeBorder(.white.opacity(0.35), lineWidth: 1.5))
            }
            ForEach(0 ..< count - 1, id: \.self) { i in
                chair(seats[i + 1], 32, ring: nil)
            }
            chair(seats[0], 48, ring: speaking ? DS.Palette.success : nil)
                .overlay(alignment: .bottomTrailing) {
                    if speaking {
                        HStack(alignment: .center, spacing: 2) {
                            ForEach([4.0, 8.0, 5.0], id: \.self) { h in
                                RoundedRectangle(cornerRadius: 1).fill(Color(hex: 0x0D331F)).frame(width: 2, height: h)
                            }
                        }
                        .frame(width: 20, height: 16)
                        .background(DS.Palette.success, in: Capsule())
                        .overlay(Capsule().strokeBorder(DS.Palette.bgElevated, lineWidth: 2))
                        .offset(x: 6, y: 3)
                    }
                }
        }
    }

    private func chair(_ img: String, _ size: CGFloat, ring: Color?) -> some View {
        Image(img).resizable().scaledToFit()
            .frame(width: size * 0.8, height: size * 0.8)
            .frame(width: size, height: size)
            .background(Color(hex: 0x33383D), in: Circle())
            .overlay(Circle().strokeBorder(ring ?? DS.Palette.bgElevated, lineWidth: ring == nil ? 2 : 2.5))
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
                // 피그마 1943:12838 Seats: 칸 58, 사이 14, 원 54(#222628 바탕에 투명판 의자 그림), 빈 자리는 #06303C 바탕 하늘색 실선 1.5
                HStack(alignment: .top, spacing: 14) {
                    ForEach(WatchData.seats) { seat in
                        VStack(spacing: 6) {
                            Image(seat.image).resizable().scaledToFit().frame(width: 54, height: 54)
                                .background(DS.Palette.bgElevated)
                                .clipShape(Circle())
                            Text(seat.name).suit(11, .medium).foregroundStyle(DS.Palette.textSecondary)
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
                                .overlay(Circle().strokeBorder(DS.Palette.brandPrimary, lineWidth: 1.5))
                            Text("앉기").suit(11, .bold).foregroundStyle(DS.Palette.brandPrimary)
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
