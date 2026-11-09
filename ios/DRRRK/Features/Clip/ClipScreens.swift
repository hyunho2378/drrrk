import SwiftUI

extension ClipData {
    /// 더보기 시트가 열리면 피그마 1870:19873처럼 영상과 아래 검정 영역, 뒤로, 소리 아이콘만 남긴다.
    static let bareNames: Set<String> = ["영상 / 쌍밍아웃", "아래 검정 영역", "Icon / 뒤로", "Icon / 소리"]

    static let raw: Data = {
        let url = Bundle.main.url(forResource: "clip-scenes", withExtension: "json")!
        return (try? Data(contentsOf: url)) ?? Data()
    }()

    /// 장면 데이터를 새로 읽는다. 상태에 맞게 값을 바꿔 그릴 때 원본(file)을 건드리지 않으려고 쓴다.
    static func fresh() -> File {
        (try? JSONDecoder().decode(File.self, from: raw)) ?? File(list: [], player: [])
    }

    static func strip(_ asset: String) -> String {
        asset.hasPrefix("G-clip-") ? String(asset.dropFirst(7)) : asset
    }
}

// MARK: - 영상 보기 장면 요소

/// 영상 보기 장면을 클립과 상태에 맞게 바꾼다. 웹 ClipPlayer.jsx decorate와 같다.
enum ClipPlayerScene {
    /// 클립이 바뀌어도 움직이지 않는 요소(위쪽 그늘, 아래 검정 영역)
    static let chrome: Set<String> = ["Scrim 위", "아래 검정 영역"]
    /// 따로 그리는 요소(영상 그림, 진행 막대, 에이전트, 크리에이터 줄)
    static let custom: Set<String> = ["영상 / 쌍밍아웃", "진행 바 트랙", "진행 바", "드르륵 에이전트 버튼", "크리에이터 이름 줄"]
    static let back: Set<String> = ["Icon / 뒤로"]
    static let sound: Set<String> = ["Icon / 소리"]
    static let input: Set<String> = ["댓글 입력", "댓글 입력 안내"]
    static let like: Set<String> = ["Icon / 좋아요", "좋아요 수"]
    static let comment: Set<String> = ["Icon / 댓글", "댓글 수"]
    static let save: Set<String> = ["Icon / 저장", "저장 라벨"]
    static let more: Set<String> = ["Icon / 더보기"]
    static let bubble: Set<String> = ["댓글 말풍선"]
    static let caption: Set<String> = ["캡션"]

    static func isEvent(_ n: String) -> Bool {
        n == "배지 / 이벤트" || n.hasPrefix("이벤트")
    }

    /// 눌림 칸이 직접 그리는 요소(같은 요소를 두 번 그리지 않게 장면에서 뺀다)
    static func ownedByHit(_ n: String) -> Bool {
        like.contains(n) || comment.contains(n) || save.contains(n) || more.contains(n) || bubble.contains(n) || caption.contains(n) || isEvent(n)
    }

    struct Page {
        let items: [ClipItem]
        let row: ClipItem?
    }

    private static var cache: [String: Page] = [:]

    static func page(_ c: ClipInfo, st: ClipState) -> Page {
        let following = st.isFollowing(c.creator)
        let key = [c.id, st.likedClips.contains(c.id) ? "L" : "l", st.savedClips.contains(c.id) ? "S" : "s", following ? "F" : "f", String(st.total(for: c))].joined(separator: ".")
        if let hit = cache[key] {
            return hit
        }
        var row: ClipItem?
        var out: [ClipItem] = []
        for it in ClipData.fresh().player {
            if it.n == "크리에이터 이름 줄" {
                row = decorateRow(it, c, following)
                continue
            }
            if custom.contains(it.n) || chrome.contains(it.n) || back.contains(it.n) || sound.contains(it.n) || input.contains(it.n) {
                continue
            }
            switch it.n {
            case "Icon / 좋아요": if st.likedClips.contains(c.id) {
                    it.asset = "A-clipsvg-like-on"
                }
            case "좋아요 수": it.text = clipCount(st.likeCount(c))
            case "Icon / 저장": if st.savedClips.contains(c.id) {
                    it.asset = "A-clipsvg-save-on"
                }
            case "저장 라벨": if st.savedClips.contains(c.id) {
                    it.text = "저장됨"
                }
            case "댓글 수": it.text = clipCount(st.total(for: c))
            case "댓글 말풍선":
                it.ch?.first?.img = ClipData.strip(c.bubbleAvatar)
                if let t = it.ch?.last {
                    t.text = c.bubble
                }
            case "아바타 / 쌍수일기": it.img = ClipData.strip(c.avatar)
            case "캡션": if c.id != "s0" {
                    let head = fitCaption(c.title, size: it.size ?? 14)
                    let n = head.count
                    it.text = head + "... 더보기"
                    // 첫 클립(피그마)과 같은 자리(제목 끝에서 3글자 뒤부터 3글자)를 옅게 칠한다.
                    it.sp = [[.num(Double(n + 3)), .num(Double(n + 6)), .str("#B7B9BB")]]
                }
            default: break
            }
            out.append(it)
        }
        let page = Page(items: out, row: row)
        cache[key] = page
        return page
    }

    private static func decorateRow(_ row: ClipItem, _ c: ClipInfo, _ following: Bool) -> ClipItem {
        guard var parts = row.items else { return row }
        parts.first?.text = c.creator
        if !c.badge, parts.count > 2 {
            parts.remove(at: 1)
        }
        if let pill = parts.last, pill.k == "pill" {
            pill.pill?.s = following ? "팔로잉" : "팔로우"
            if following {
                // 팔로잉이면 바탕을 한 단계 어둡게 한다(흰 7% 대신 검정 22%).
                pill.f = ClipFill(c: "#000000", a: 0.22, g: nil, img: nil)
            }
        }
        row.items = parts
        return row
    }

    /// 캡션 한 줄(16 ~ 326)에 "... 더보기"까지 들어가게 제목을 줄인다.
    static func fitCaption(_ title: String, size: Double) -> String {
        let font = UIFont(name: SUITWeight.regular.rawValue, size: size) ?? .systemFont(ofSize: size)
        let attrs: [NSAttributedString.Key: Any] = [.font: font, .kern: -0.02 * size]
        func width(_ s: String) -> CGFloat {
            (s as NSString).size(withAttributes: attrs).width
        }
        var head = title
        while !head.isEmpty, width(head + "... 더보기") > 310 {
            head.removeLast()
        }
        return head.trimmingCharacters(in: .whitespaces)
    }

    /// 움직이지 않는 위아래 요소. 더보기 시트가 열리면 피그마처럼 검정 영역과 뒤로, 소리만 남는다.
    static func chromeItems(bare: Bool) -> [ClipItem] {
        ClipData.file.player.filter { bare ? $0.n == "아래 검정 영역" : chrome.contains($0.n) }
    }

    static func items(_ names: Set<String>, mute: Bool = false) -> [ClipItem] {
        ClipData.fresh().player.filter { names.contains($0.n) }.map { it in
            if it.n == "Icon / 소리", mute {
                it.asset = "A-clipsvg-mute"
            }
            return it
        }
    }

    static let fixedBack = items(back)
    static let fixedInput = items(input)
    static let soundOn = items(sound)
    static let soundOff = items(sound, mute: true)
}

// MARK: - 재생 시계

/// 영상 재생 시계. 매 장면마다 상태를 바꾸지 않고 시작 시각만 적어 두어, 진행 막대만 다시 그린다.
@Observable
final class ClipClock {
    var base: Double = 0
    var start: Date?
    var loop = true

    var playing: Bool {
        start != nil
    }

    func time(_ now: Date = .now) -> Double {
        let raw = base + (start.map { now.timeIntervalSince($0) } ?? 0)
        return loop ? raw.truncatingRemainder(dividingBy: ClipInfo.duration) : min(raw, ClipInfo.duration)
    }

    func play() {
        if !loop, base >= ClipInfo.duration - 0.05 {
            base = 0
        }
        start = .now
    }

    func pause() {
        base = time()
        start = nil
    }

    func seek(_ t: Double) {
        base = min(max(0, t), ClipInfo.duration)
        if playing {
            start = .now
        }
    }

    func rebase() {
        base = time()
        if playing {
            start = .now
        }
    }
}

/// 화면 아래 얇은 진행 막대(피그마 0, 748.5, 390 x 2, #82CD4A). 누르거나 끌면 그 자리로 간다.
private struct ClipProgressBar: View {
    let clock: ClipClock
    @State private var scrubbing = false

    var body: some View {
        // 멈춘 채로 끌 때도 막대가 따라오게 시계 값을 이 화면에서 읽어 둔다.
        let _ = (clock.base, clock.start, clock.loop)
        ZStack(alignment: .topLeading) {
            TimelineView(.animation(minimumInterval: 1 / 30, paused: !clock.playing)) { ctx in
                let p = clock.time(ctx.date) / ClipInfo.duration
                let h: CGFloat = scrubbing ? 4 : 2
                ZStack(alignment: .leading) {
                    Rectangle().fill(clipColor("#FFFFFF", 0.18)).frame(width: 390, height: h)
                    Rectangle().fill(clipColor("#82CD4A")).frame(width: 390 * p, height: h)
                }
                .offset(y: 748.5 + 2 - h)
            }
            .allowsHitTesting(false)
            Color.clear.frame(width: 390, height: 24).contentShape(Rectangle())
                .offset(y: 737)
                .gesture(DragGesture(minimumDistance: 0).onChanged { v in
                    if !scrubbing {
                        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.12)) { scrubbing = true }
                    }
                    clock.seek(Double(v.location.x / 390) * ClipInfo.duration)
                }.onEnded { _ in
                    withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.12)) { scrubbing = false }
                })
                .accessibilityLabel("재생 위치")
        }
    }
}

// MARK: - 콘텐츠 리스트(55)

struct ClipListView: View {
    @Environment(Router.self) private var router
    @State private var st = ClipState.shared
    /// 아래 탭에서 잠깐 눌려 선택된 칸(220ms 뒤 클립으로 돌아온다)
    @State private var flashTab: String?
    @State private var toTop = 0

    private let tabs: [(ClipFeedTab, String)] = [(.subs, "탭 구독"), (.rec, "탭 추천"), (.mine, "탭 내클립")]

    var body: some View {
        let scene = ClipData.fresh().list
        ClipCanvas(items: [], background: Color(hex: 0x131313)) {
            ClipFeed(tab: st.tab, st: st, toTop: toTop, open: openClip, openBanner: openBanner)
            header(scene)
            bottomBar(scene)
            ClipAgentButton()
        }
        .toolbar(.hidden, for: .navigationBar)
    }

    private func openClip(_ c: ClipInfo) {
        st.pick = ClipInfo.all.firstIndex(of: c) ?? 0
        router.push(.clipPlayer)
    }

    private func openBanner() {
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        withAnimation(.easeOut(duration: 0.3)) { router.enterFromClip() }
    }

    // 위쪽: 즐겨찾기, 탭 세 개와 밑줄, 검색
    @ViewBuilder
    private func header(_ scene: [ClipItem]) -> some View {
        let fav = scene.filter { $0.n == "Icon / 즐겨찾기" }
        let _ = (fav.first?.asset = st.favorite ? "J-clipsvg-fav-on" : "A-clipsvg-L-0")
        ClipHit(label: st.favorite ? "즐겨찾기 해제" : "즐겨찾기", box: CGRect(x: 10, y: 57, width: 37, height: 36), radius: 18, items: fav) {
            UIImpactFeedbackGenerator(style: .light).impactOccurred()
            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) { st.favorite.toggle() }
        }
        ClipHit(label: "검색", box: CGRect(x: 343, y: 56, width: 37, height: 37), radius: 18, items: scene.filter { $0.n == "Icon / 검색" }) {}
        ForEach(tabs, id: \.0) { tab, name in
            let it = scene.first { $0.n == name }
            if let it {
                let x = it.x ?? 0
                let w = Self.tabWidth(it.text ?? "")
                let _ = (it.c = st.tab == tab ? "#FFFFFF" : "#B0B0B0")
                ClipHit(label: it.text ?? "", box: CGRect(x: x - 6, y: 58, width: w + 12, height: 34), radius: 8, items: [it]) {
                    select(tab)
                }
                .animation(.timingCurve(0.2, 0, 0, 1, duration: 0.3), value: st.tab)
            }
        }
        // 탭 밑줄(피그마 172, 86.4, 33 x 2.4). 고른 탭 아래로 옮겨 간다.
        let sel = scene.first { $0.n == tabs.first { $0.0 == st.tab }?.1 }
        RoundedRectangle(cornerRadius: 1.2).fill(Color.white)
            .frame(width: Self.tabWidth(sel?.text ?? "추천"), height: 2.4)
            .offset(x: sel?.x ?? 172, y: 86.4)
            .animation(.timingCurve(0.2, 0, 0, 1, duration: 0.3), value: st.tab)
            .allowsHitTesting(false)
    }

    private func select(_ tab: ClipFeedTab) {
        guard tab != st.tab else {
            toTop += 1
            return
        }
        UISelectionFeedbackGenerator().selectionChanged()
        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.18)) { st.tab = tab }
    }

    /// 탭 글자 폭. 피그마 밑줄(추천 33)과 같은 비율로 다른 탭 글자 폭을 잰다.
    static func tabWidth(_ text: String) -> CGFloat {
        let font = UIFont(name: SUITWeight.bold.rawValue, size: 19) ?? .boldSystemFont(ofSize: 19)
        let attrs: [NSAttributedString.Key: Any] = [.font: font, .kern: -0.38]
        let w = (text as NSString).size(withAttributes: attrs).width
        let base = ("추천" as NSString).size(withAttributes: attrs).width
        return base > 0 ? 33 * w / base : 33
    }

    // 아래 탭(쇼핑, 홈, 투데이, 클립, 마이)
    @ViewBuilder
    private func bottomBar(_ scene: [ClipItem]) -> some View {
        if let bar = scene.first(where: { $0.n == "하단 바" }) {
            // 화면을 다시 그릴 때마다 bar.ch를 덮어쓰면 아이콘과 글자 목록이 사라진다. 처음 목록을 한 번만 저장해 둔다.
            let kids = clipBarKidsMemo(bar)
            let slots: [(String, String, CGFloat)] = [
                ("아이콘 / 쇼핑 N+ 넓다세일", "라벨 쇼핑", 38.3), ("Icon / 홈", "라벨 홈", 116.5), ("Icon / 투데이", "라벨 투데이", 194.5),
                ("Icon / 클립", "라벨 클립", 272.5), ("Icon / 마이", "라벨 마이", 350.6),
            ]
            let selected = flashTab ?? "라벨 클립"
            let _ = bar.ch = kids.filter { $0.n == "구분선" }
            ZStack(alignment: .topLeading) {
                ClipItemView(it: bar).offset(x: -(bar.x ?? 0), y: -(bar.y ?? 0))
                ForEach(slots, id: \.1) { icon, label, cx in
                    let items = kids.filter { $0.n == icon || $0.n == label }
                    let _ = items.forEach { it in
                        if it.n == label {
                            it.c = label == selected ? "#FFFFFF" : "#D9D9D9"
                            it.wt = label == selected ? 600 : 400
                        }
                    }
                    ClipHit(label: String(label.dropFirst(3)), box: CGRect(x: cx - 31, y: 12, width: 62, height: 58), radius: 14, items: items) {
                        tapBottom(label)
                    }
                }
            }
            .frame(width: 390, height: bar.h ?? 88.5, alignment: .topLeading)
            .offset(x: bar.x ?? 0, y: bar.y ?? 0)
        }
    }

    private func tapBottom(_ label: String) {
        if label == "라벨 클립" {
            toTop += 1
            return
        }
        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.12)) { flashTab = label }
        Task {
            try? await Task.sleep(for: .milliseconds(220))
            withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.18)) {
                if flashTab == label {
                    flashTab = nil
                }
            }
        }
    }
}

/// 아래 탭 장면 요소는 구분선만 남기도록 bar.ch를 바꾸므로, 바꾸기 전 목록을 처음 한 번 저장해 두고 돌려준다.
private var clipBarKidsStore: [ObjectIdentifier: [ClipItem]] = [:]
private func clipBarKidsMemo(_ bar: ClipItem) -> [ClipItem] {
    let key = ObjectIdentifier(bar)
    if let saved = clipBarKidsStore[key] { return saved }
    let kids = bar.ch ?? []
    clipBarKidsStore[key] = kids
    return kids
}

/// 리스트 피드. 위 탭과 아래 탭 사이에서 세로로 움직이고, 맨 위에서 당기면 80까지 늘어났다가 돌아온다.
private struct ClipFeed: View {
    let tab: ClipFeedTab
    let st: ClipState
    let toTop: Int
    let open: (ClipInfo) -> Void
    let openBanner: () -> Void
    @Environment(\.accessibilityReduceMotion) private var reduce
    @State private var offset: CGFloat = 0
    @State private var start: CGFloat?

    private struct Placed: Identifiable {
        let id: String
        let box: CGRect
        let at: CGPoint
        let clip: ClipInfo?
    }

    var body: some View {
        let placed = layout()
        let bottom = placed.map { $0.at.y + $0.box.height }.max() ?? 0
        let maxScroll = max(0, bottom + 16 - 755.5)
        ZStack(alignment: .topLeading) {
            Color.clear.frame(width: 390, height: 844).contentShape(Rectangle())
            ZStack(alignment: .topLeading) {
                if placed.isEmpty {
                    Text("저장한 클립이 없어요").suit(15, .regular, tracking: -0.3)
                        .foregroundStyle(Color(hex: 0x9AA1A6))
                        .frame(width: 390)
                        .offset(y: 416)
                }
                ForEach(placed) { card($0) }
            }
            .frame(width: 390, height: 844, alignment: .topLeading)
            .offset(y: offset)
            .id(tab)
            .transition(.opacity)
        }
        .frame(width: 390, height: 844, alignment: .topLeading)
        // 위 탭(0 ~ 98) 아래로만 보인다. 위 탭과 아래 탭은 고정이다.
        .mask(alignment: .topLeading) { Rectangle().frame(width: 390, height: 746).offset(y: 98) }
        .simultaneousGesture(DragGesture(minimumDistance: 6).onChanged { v in
            if start == nil {
                start = offset
            }
            let raw = (start ?? 0) + v.translation.height
            offset = Self.band(raw, maxScroll)
        }.onEnded { v in
            let raw = (start ?? 0) + v.predictedEndTranslation.height
            start = nil
            withAnimation(.spring(response: 0.42, dampingFraction: 0.86)) { offset = min(0, max(-maxScroll, raw)) }
        })
        .onChange(of: tab) { offset = 0 }
        .onChange(of: toTop) {
            withAnimation(reduce ? .easeOut(duration: 0.2) : .spring(response: 0.45, dampingFraction: 0.9)) { offset = 0 }
        }
    }

    /// 범위 밖으로 끌면 고무줄처럼 덜 따라온다. 위쪽은 80, 아래쪽은 40까지만 늘어난다.
    static func band(_ raw: CGFloat, _ maxScroll: CGFloat) -> CGFloat {
        if raw > 0 {
            return 80 * (1 - exp(-raw / 160))
        }
        if raw < -maxScroll {
            let over = -maxScroll - raw
            return -maxScroll - 40 * (1 - exp(-over / 80))
        }
        return raw
    }

    /// 추천은 피그마 자리 그대로, 구독과 내클립은 두 줄로 위에서부터 다시 쌓는다.
    private func layout() -> [Placed] {
        if tab == .rec {
            var out = ClipInfo.all.map { Placed(id: $0.id, box: $0.card, at: $0.card.origin, clip: $0) }
            out.insert(Placed(id: "banner", box: ClipInfo.bannerCard, at: ClipInfo.bannerCard.origin, clip: nil), at: 1)
            return out
        }
        let xs: [CGFloat] = [7.6, 199.2]
        var ys: [CGFloat] = [109, 109]
        return st.clips(in: tab).map { c in
            let col = ys[0] <= ys[1] ? 0 : 1
            let p = Placed(id: c.id, box: c.card, at: CGPoint(x: xs[col], y: ys[col]), clip: c)
            ys[col] += c.card.height + 14
            return p
        }
    }

    private func card(_ p: Placed) -> some View {
        let names: Set<String> = p.clip.map { Set($0.parts) } ?? [ClipInfo.bannerPart]
        let items = ClipData.file.list.filter { names.contains($0.n) }
        return ZStack(alignment: .topLeading) {
            ClipItemsLayer(items: items).offset(x: -p.box.minX, y: -p.box.minY).allowsHitTesting(false)
        }
        .frame(width: p.box.width, height: p.box.height, alignment: .topLeading)
        .clipPressable {
            if let c = p.clip {
                open(c)
            } else {
                openBanner()
            }
        }
        .offset(x: p.at.x, y: p.at.y)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(p.clip?.title ?? "드르륵 칵! 일단 앉아")
        .accessibilityAddTraits(.isButton)
    }
}

// MARK: - 영상 보기(56)

struct ClipPlayerView: View {
    @Environment(Router.self) private var router
    @Environment(\.accessibilityReduceMotion) private var reduce
    @State private var st = ClipState.shared
    @State private var clock = ClipClock()
    @State private var popped = false
    @State private var sheet: ClipSheetKind?
    @State private var sheetOpen = false
    @State private var toast: String?
    /// 위아래로 끄는 거리(390 좌표)
    @State private var drag: CGFloat = 0
    @State private var flash: Flash?
    @State private var hearts: [Heart] = []
    @State private var lastTap: Date?
    @State private var single: Task<Void, Never>?
    @State private var pop: String?

    enum ClipSheetKind { case comments, info, more }

    struct Flash: Equatable { let id = UUID(); let playing: Bool }
    struct Heart: Identifiable { let id = UUID(); let clip: String; let at: CGPoint; let tilt: Double }

    var body: some View {
        let bare = sheet == .more && sheetOpen
        ClipCanvas(items: [], background: .black) {
            pages(bare: bare)
            ClipItemsLayer(items: ClipPlayerScene.chromeItems(bare: bare)).allowsHitTesting(false)
            if !bare {
                ClipProgressBar(clock: clock)
            }
            ClipHit(label: "소리", box: CGRect(x: 340, y: 53, width: 46, height: 44), radius: 22, items: st.mute ? ClipPlayerScene.soundOff : ClipPlayerScene.soundOn) {
                withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { st.mute.toggle() }
            }
            ClipHit(label: "뒤로", box: CGRect(x: 0, y: 56, width: 64, height: 44), radius: 0, items: ClipPlayerScene.fixedBack) { router.pop() }
            if !bare {
                ClipHit(label: "댓글 입력", box: CGRect(x: 15, y: 759, width: 359, height: 47), radius: 24, items: ClipPlayerScene.fixedInput) { open(.comments) }
            }
            if let flash {
                Image(systemName: flash.playing ? "play.fill" : "pause.fill")
                    .font(.system(size: 30, weight: .bold))
                    .foregroundStyle(.white)
                    .frame(width: 68, height: 68)
                    .background(Circle().fill(Color.black.opacity(0.4)))
                    .offset(x: 195 - 34, y: 375 - 34)
                    .transition(.scale(scale: 0.8).combined(with: .opacity))
                    .id(flash.id)
                    .allowsHitTesting(false)
            }
            sheets
            // 에이전트는 시트와 덮개 위에서도 같은 자리(344, 298)에 떠 있다(피그마 클립 화면 네 장 공통).
            ClipAgentButton(popped: popped)
            if let toast {
                Text(toast).suit(13.5, .semibold, tracking: -0.27)
                    .foregroundStyle(Color(hex: 0xF2F2F7))
                    .padding(.horizontal, 16).padding(.vertical, 10)
                    .background(Color(hex: 0x2C2C2E, alpha: 0.96), in: RoundedRectangle(cornerRadius: 14))
                    .fixedSize()
                    .frame(width: 390)
                    .offset(y: 692)
                    .transition(.opacity.combined(with: .offset(y: 8)))
                    .allowsHitTesting(false)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .onAppear {
            clock.loop = st.loop
            clock.base = st.progress[st.current.id] ?? 0
            clock.play()
        }
        .onDisappear {
            st.progress[st.current.id] = clock.time()
            clock.pause()
        }
        .onChange(of: st.loop) {
            clock.rebase()
            clock.loop = st.loop
        }
        .task {
            try? await Task.sleep(for: .seconds(1.0))
            withAnimation(.spring(response: 0.55, dampingFraction: 0.6)) { popped = true }
        }
    }

    // MARK: 클립 넘기기

    @ViewBuilder
    private func pages(bare: Bool) -> some View {
        let all = ClipInfo.all
        let near = reduce ? [st.pick] : [st.pick - 1, st.pick, st.pick + 1].filter { all.indices.contains($0) }
        ZStack(alignment: .topLeading) {
            ForEach(near, id: \.self) { i in
                page(all[i], current: i == st.pick, bare: bare)
                    .offset(y: CGFloat(i - st.pick) * 750 + drag)
                    .transition(.opacity)
            }
        }
        .frame(width: 390, height: 750, alignment: .topLeading)
        .clipped()
    }

    @ViewBuilder
    private func page(_ c: ClipInfo, current: Bool, bare: Bool) -> some View {
        let scene = ClipPlayerScene.page(c, st: st)
        ZStack(alignment: .topLeading) {
            video(c)
            if !bare {
                ClipItemsLayer(items: current ? scene.items.filter { !ClipPlayerScene.ownedByHit($0.n) } : scene.items)
                    .allowsHitTesting(false)
                if !current, let row = scene.row {
                    creatorRow(row, c, interactive: false)
                }
            }
            if current {
                surface
                ForEach(hearts.filter { $0.clip == c.id }) { ClipHeartBurst(heart: $0) }
                if !bare {
                    hits(scene, c)
                }
            }
        }
        .frame(width: 390, height: 750, alignment: .topLeading)
    }

    /// 영상 그림. 세로 영상은 화면을 채우고, 가로 영상(혼술바)은 폭에 맞춰 가운데에 둔다.
    @ViewBuilder
    private func video(_ c: ClipInfo) -> some View {
        if c.wide {
            Color.black.frame(width: 390, height: 750)
                .overlay { Image(c.image).resizable().scaledToFit().frame(width: 390) }
        } else {
            Image(c.image).resizable().scaledToFill().frame(width: 390, height: 750).clipped()
        }
    }

    /// 영상 가운데를 누르는 판: 한 번은 일시정지와 재생, 두 번은 하트와 좋아요, 위아래로 쓸면 다음과 이전 클립.
    private var surface: some View {
        Color.clear.frame(width: 390, height: 750).contentShape(Rectangle())
            .gesture(DragGesture(minimumDistance: 12, coordinateSpace: .global).onChanged { v in
                guard abs(v.translation.height) > abs(v.translation.width), !reduce else { return }
                let dy = v.translation.height / scale
                let atEdge = (dy > 0 && st.pick == 0) || (dy < 0 && st.pick == ClipInfo.all.count - 1)
                drag = atEdge ? (dy > 0 ? 1 : -1) * 60 * (1 - exp(-abs(dy) / 120)) : dy
            }.onEnded { v in
                let dy = v.translation.height / scale
                let fling = v.predictedEndTranslation.height / scale
                guard abs(v.translation.height) > abs(v.translation.width) else {
                    withAnimation(.spring(response: 0.35, dampingFraction: 0.9)) { drag = 0 }
                    return
                }
                if (dy < -90 || fling < -260), st.pick < ClipInfo.all.count - 1 {
                    go(1)
                } else if (dy > 90 || fling > 260), st.pick > 0 {
                    go(-1)
                } else {
                    withAnimation(.spring(response: 0.35, dampingFraction: 0.9)) { drag = 0 }
                }
            })
            .simultaneousGesture(SpatialTapGesture().onEnded { v in tap(at: v.location) })
            .accessibilityLabel(clock.playing ? "일시정지" : "재생")
            .accessibilityAddTraits(.isButton)
    }

    private var scale: CGFloat {
        max(0.5, UIScreen.main.bounds.width / 390)
    }

    private func go(_ d: Int) {
        st.progress[st.current.id] = clock.time()
        single?.cancel()
        let next = st.pick + d
        let anim: Animation = reduce ? .easeInOut(duration: 0.2) : .timingCurve(0.2, 0, 0, 1, duration: 0.3)
        withAnimation(anim) {
            st.pick = next
            drag = 0
        }
        clock.base = st.progress[ClipInfo.all[next].id] ?? 0
        clock.play()
    }

    private func tap(at p: CGPoint) {
        let now = Date()
        if let lastTap, now.timeIntervalSince(lastTap) < 0.28 {
            // 두 번 빠르게 누르면 누른 자리에 하트가 오르고 좋아요가 켜진다(이미 켜져 있으면 그대로 둔다).
            single?.cancel()
            single = nil
            self.lastTap = now
            let h = Heart(clip: st.current.id, at: p, tilt: Double.random(in: -18 ... 18))
            hearts.append(h)
            if !st.like {
                UIImpactFeedbackGenerator(style: .light).impactOccurred()
                withAnimation(.spring(response: 0.3, dampingFraction: 0.55)) { st.like = true }
                bump("like")
            }
            Task {
                try? await Task.sleep(for: .seconds(1.0))
                hearts.removeAll { $0.id == h.id }
            }
            return
        }
        lastTap = now
        single?.cancel()
        single = Task {
            try? await Task.sleep(for: .milliseconds(290))
            guard !Task.isCancelled else { return }
            togglePlay()
        }
    }

    private func togglePlay() {
        if clock.playing {
            clock.pause()
        } else {
            clock.play()
        }
        let f = Flash(playing: clock.playing)
        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { flash = f }
        Task {
            try? await Task.sleep(for: .milliseconds(600))
            withAnimation(.easeOut(duration: 0.2)) {
                if flash == f {
                    flash = nil
                }
            }
        }
    }

    // MARK: 오른쪽 버튼과 아래 글

    @ViewBuilder
    private func hits(_ scene: ClipPlayerScene.Page, _ c: ClipInfo) -> some View {
        let named = { (names: Set<String>) in scene.items.filter { names.contains($0.n) } }
        ClipHit(label: "이벤트 댓글 남기기", box: CGRect(x: 333, y: 410, width: 52, height: 56), radius: 26, items: scene.items.filter { ClipPlayerScene.isEvent($0.n) }) { open(.comments) }
        ClipHit(label: st.like ? "좋아요 취소" : "좋아요", box: CGRect(x: 338, y: 483, width: 44, height: 62), items: named(ClipPlayerScene.like), pop: pop == "like" ? 1.18 : 1) { flip(\.like) }
        ClipHit(label: "댓글", box: CGRect(x: 338, y: 552, width: 44, height: 62), items: named(ClipPlayerScene.comment)) { open(.comments) }
        ClipHit(label: st.save ? "저장 취소" : "저장", box: CGRect(x: 338, y: 622, width: 44, height: 62), items: named(ClipPlayerScene.save), pop: pop == "save" ? 1.18 : 1) {
            flip(\.save)
            say(st.save ? "저장했어요" : "저장을 취소했어요")
        }
        ClipHit(label: "더보기", box: CGRect(x: 336, y: 696, width: 48, height: 32), radius: 16, items: named(ClipPlayerScene.more)) { open(.more) }
        ClipHit(label: "댓글 미리보기", box: CGRect(x: 12, y: 580, width: 300, height: 38), radius: 19, items: named(ClipPlayerScene.bubble)) { open(.comments) }
        ClipHit(label: "캡션 더보기", box: CGRect(x: 12, y: 664, width: 318, height: 28), radius: 8, items: named(ClipPlayerScene.caption)) { open(.info) }
        if let row = scene.row {
            creatorRow(row, c, interactive: true)
        }
    }

    /// 크리에이터 이름 줄(이름, 인증 배지, 팔로우 알약). 알약은 리스트 구독 탭과 같은 팔로우 상태를 켜고 끈다.
    private func creatorRow(_ row: ClipItem, _ c: ClipInfo, interactive: Bool) -> some View {
        let parts = row.items ?? []
        return HStack(spacing: 0) {
            ForEach(parts) { it in
                if it.k == "pill" {
                    // 알약 왼쪽 간격(ml 6)은 ClipItemView가 안쪽에 넣는다.
                    Button {
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.18)) { st.toggleFollow(c.creator) }
                    } label: {
                        ClipItemView(it: it, flow: true).padding(.vertical, 6).contentShape(Rectangle())
                    }
                    .buttonStyle(ClipPressStyle(radius: 10, clips: false))
                    .padding(.vertical, -6)
                    .allowsHitTesting(interactive)
                    .accessibilityLabel(st.isFollowing(c.creator) ? "팔로잉" : "팔로우")
                } else {
                    ClipItemView(it: it, flow: true)
                }
            }
        }
        .frame(height: 32)
        .fixedSize()
        .offset(x: row.x ?? 0, y: (row.cy ?? 0) - 16)
    }

    private func flip(_ key: ReferenceWritableKeyPath<ClipState, Bool>) {
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
        withAnimation(.spring(response: 0.3, dampingFraction: 0.55)) { st[keyPath: key].toggle() }
        if st[keyPath: key] {
            bump(key == \ClipState.like ? "like" : "save")
        }
    }

    /// 켜질 때 아이콘이 한 번 톡 커졌다 돌아온다.
    private func bump(_ name: String) {
        withAnimation(.spring(response: 0.18, dampingFraction: 0.5)) { pop = name }
        Task {
            try? await Task.sleep(for: .milliseconds(160))
            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                if pop == name {
                    pop = nil
                }
            }
        }
    }

    private func say(_ text: String) {
        withAnimation(DS.Motion.decel(0.24)) { toast = text }
        Task {
            try? await Task.sleep(for: .seconds(1.9))
            withAnimation(.easeOut(duration: 0.2)) {
                if toast == text {
                    toast = nil
                }
            }
        }
    }

    private func open(_ kind: ClipSheetKind) {
        sheet = kind
        Task {
            try? await Task.sleep(for: .milliseconds(30))
            withAnimation(.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.36)) { sheetOpen = true }
        }
    }

    private func close(then: (() -> Void)? = nil) {
        withAnimation(.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.36)) { sheetOpen = false }
        Task {
            try? await Task.sleep(for: .seconds(0.4))
            sheet = nil
            then?()
        }
    }

    @ViewBuilder
    private var sheets: some View {
        switch sheet {
        case .comments, .info:
            ClipCommentSheet(open: sheetOpen, info: sheet == .info, state: st, onClose: { close() }, say: say)
        case .more:
            ClipMoreSheet(open: sheetOpen, state: st, onClose: { close() }) { action in
                switch action {
                case "like": flip(\.like)
                case "save": flip(\.save); say(st.save ? "저장했어요" : "저장을 취소했어요")
                case "comments": close { open(.comments) }
                // 반복 재생 줄은 시트를 닫지 않고 누를 때마다 꼬리 글자만 바꾼다.
                case "play": UISelectionFeedbackGenerator().selectionChanged(); withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.15)) { st.loop.toggle() }
                case "hide": close(); say("이 콘텐츠를 숨겼어요")
                case "hideCreator": close(); say("\(st.current.channel) 콘텐츠를 숨겼어요")
                case "report": close(); say("신고가 접수됐어요")
                case "share": close(); say("링크를 복사했어요")
                default: close()
                }
            }
        case nil:
            EmptyView()
        }
    }
}

/// 두 번 누른 자리에서 커지며 위로 올라가 사라지는 하트
private struct ClipHeartBurst: View {
    let heart: ClipPlayerView.Heart
    @State private var shown = false
    @State private var gone = false

    var body: some View {
        Image(systemName: "heart.fill")
            .font(.system(size: 84))
            .foregroundStyle(Color(hex: 0xFF3B5C))
            .shadow(color: .black.opacity(0.25), radius: 6, x: 0, y: 2)
            .rotationEffect(.degrees(heart.tilt))
            .scaleEffect(gone ? 1.3 : (shown ? 1 : 0.4))
            .opacity(gone ? 0 : 1)
            .offset(x: heart.at.x - 46, y: heart.at.y - 46 - (gone ? 90 : 0))
            .allowsHitTesting(false)
            .onAppear {
                withAnimation(.spring(response: 0.22, dampingFraction: 0.5)) { shown = true }
                withAnimation(.easeIn(duration: 0.5).delay(0.32)) { gone = true }
            }
    }
}

/// 드르륵 에이전트 버튼. 네이버 클립 모든 화면(리스트, 영상 보기, 댓글 시트, 더보기 메뉴)에서 오른쪽 끝(344, 298, 60 x 60)에
/// 걸쳐 위아래로 천천히 떠다닌다. 누르면 로고 스플래시를 거쳐 드르륵 홈으로 들어간다.
struct ClipAgentButton: View {
    var popped = true
    @Environment(Router.self) private var router
    @State private var bob = false

    var body: some View {
        Button {
            UIImpactFeedbackGenerator(style: .medium).impactOccurred()
            withAnimation(.easeOut(duration: 0.3)) { router.enterFromClip() }
        } label: {
            Image("G-clip-agent").resizable().scaledToFill()
                .frame(width: 60, height: 60)
                .clipShape(RoundedRectangle(cornerRadius: 13))
                .shadow(color: .black.opacity(0.35), radius: 4, x: 0, y: 2)
        }
        .buttonStyle(ClipPressStyle(radius: 13))
        .offset(y: bob ? -6 : 6)
        .scaleEffect(popped ? 1 : 0.7)
        .offset(x: popped ? 344 : 410, y: 298)
        .opacity(popped ? 1 : 0)
        .accessibilityLabel("드르륵 에이전트")
        .onAppear {
            withAnimation(.easeInOut(duration: 1.6).repeatForever(autoreverses: true)) { bob = true }
        }
    }
}
