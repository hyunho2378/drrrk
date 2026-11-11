import SwiftUI

// 네이버 클립 모방 두 화면을 그리는 도구. 팀 피그마 섹션 "네이버 클립 모방"(1843:40426)의 값을 웹 프로토타입과 같은 데이터
// (Resources/Data/clip-scenes.json)에서 읽어 390 x 844 좌표 그대로 그린다. 아이콘은 SVG 벡터 에셋(A-clipsvg-*), 그림은 G-clip-*다
// (2026. 11. 9. 피그마 1843:40980, 1843:40911 사진 교체분).

struct ClipFill: Decodable {
    var c: String?
    var a: Double?
    var g: [[ClipValue]]?
    var img: String?
}

/// 숫자나 글자가 섞인 배열 값(그라디언트 [색, 투명도, 위치], 글자 색칠 [시작, 끝, 색])
enum ClipValue: Decodable {
    case num(Double), str(String)
    init(from d: Decoder) throws {
        let c = try d.singleValueContainer()
        if let n = try? c.decode(Double.self) {
            self = .num(n)
        } else {
            self = try .str(c.decode(String.self))
        }
    }

    var num: Double {
        if case let .num(v) = self {
            return v
        }; return 0
    }

    var str: String {
        if case let .str(v) = self {
            return v
        }; return ""
    }
}

struct ClipStroke: Decodable { var w: Double; var c: String; var a: Double? }
struct ClipPillText: Decodable { var s: String; var size: Double; var wt: Int; var c: String? }

final class ClipItem: Decodable, Identifiable {
    let id = UUID()
    var k = ""
    var n = ""
    var x: Double?
    var y: Double?
    var w: Double?
    var wAuto = false
    var h: Double?
    var r: [Double]?
    var f: ClipFill?
    var text: String?
    var stroke: ClipStroke?
    var size: Double?
    var wt: Int?
    var c: String?
    var a: Double?
    var cx: Double?
    var cy: Double?
    var lh: Double?
    /// 자간(퍼센트). 없으면 피그마 기본 -2%.
    var ls: Double?
    var sp: [[ClipValue]]?
    var sh: [Double]?
    var ml: Double?
    var img: String?
    var asset: String?
    var items: [ClipItem]?
    var ch: [ClipItem]?
    var clip: Bool?
    var blur: Double?
    var pad: [Double]?
    var gap: Double?
    var px: Double?
    var rad: Double?
    var pill: ClipPillText?
    var right: Double?

    enum Key: String, CodingKey { case k, n, x, y, w, h, r, f, s, size, wt, c, a, cx, cy, lh, ls, sp, sh, ml, img, asset, items, ch, clip, blur, pad, gap, px, rad, text, right }

    init(from d: Decoder) throws {
        let c = try d.container(keyedBy: Key.self)
        k = (try? c.decode(String.self, forKey: .k)) ?? ""
        n = (try? c.decode(String.self, forKey: .n)) ?? ""
        x = try? c.decode(Double.self, forKey: .x)
        y = try? c.decode(Double.self, forKey: .y)
        if let v = try? c.decode(Double.self, forKey: .w) {
            w = v
        } else if (try? c.decode(String.self, forKey: .w)) == "auto" {
            wAuto = true
        }
        h = try? c.decode(Double.self, forKey: .h)
        if let v = try? c.decode(Double.self, forKey: .r) {
            r = [v, v, v, v]
        } else {
            r = try? c.decode([Double].self, forKey: .r)
        }
        f = try? c.decode(ClipFill.self, forKey: .f)
        if let s = try? c.decode(String.self, forKey: .s) {
            text = s
        } else {
            stroke = try? c.decode(ClipStroke.self, forKey: .s)
        }
        size = try? c.decode(Double.self, forKey: .size)
        wt = try? c.decode(Int.self, forKey: .wt)
        self.c = try? c.decode(String.self, forKey: .c)
        a = try? c.decode(Double.self, forKey: .a)
        cx = try? c.decode(Double.self, forKey: .cx)
        cy = try? c.decode(Double.self, forKey: .cy)
        lh = try? c.decode(Double.self, forKey: .lh)
        ls = try? c.decode(Double.self, forKey: .ls)
        sp = try? c.decode([[ClipValue]].self, forKey: .sp)
        sh = try? c.decode([Double].self, forKey: .sh)
        ml = try? c.decode(Double.self, forKey: .ml)
        img = try? c.decode(String.self, forKey: .img)
        asset = try? c.decode(String.self, forKey: .asset)
        items = try? c.decode([ClipItem].self, forKey: .items)
        ch = try? c.decode([ClipItem].self, forKey: .ch)
        clip = try? c.decode(Bool.self, forKey: .clip)
        blur = try? c.decode(Double.self, forKey: .blur)
        pad = try? c.decode([Double].self, forKey: .pad)
        gap = try? c.decode(Double.self, forKey: .gap)
        px = try? c.decode(Double.self, forKey: .px)
        rad = try? c.decode(Double.self, forKey: .rad)
        pill = try? c.decode(ClipPillText.self, forKey: .text)
        right = try? c.decode(Double.self, forKey: .right)
    }
}

enum ClipData {
    struct File: Decodable { let list: [ClipItem]; let player: [ClipItem] }
    static let file: File = {
        let url = Bundle.main.url(forResource: "clip-scenes", withExtension: "json")!
        return try! JSONDecoder().decode(File.self, from: Data(contentsOf: url))
    }()
}

// MARK: - 색과 글자

func clipColor(_ hex: String?, _ a: Double? = nil) -> Color {
    let s = (hex ?? "#FFFFFF").replacingOccurrences(of: "#", with: "")
    let v = UInt32(s, radix: 16) ?? 0xFFFFFF
    return Color(hex: v, alpha: a ?? 1)
}

func suitWeight(_ wt: Int?) -> SUITWeight {
    switch wt ?? 400 {
    case ..<450: .regular
    case ..<550: .medium
    case ..<650: .semibold
    case ..<750: .bold
    case ..<850: .extrabold
    default: .heavy
    }
}

@ViewBuilder
func clipFillView(_ f: ClipFill?) -> some View {
    if let f {
        if let img = f.img {
            Image("G-clip-" + img).resizable().scaledToFill()
        } else if let g = f.g {
            LinearGradient(stops: g.map { .init(color: clipColor($0[0].str, $0[1].num), location: $0[2].num) }, startPoint: .top, endPoint: .bottom)
        } else {
            clipColor(f.c, f.a)
        }
    } else {
        Color.clear
    }
}

private func corners(_ r: [Double]?) -> UnevenRoundedRectangle {
    let v = r ?? [0, 0, 0, 0]
    return UnevenRoundedRectangle(topLeadingRadius: v[0], bottomLeadingRadius: v[3], bottomTrailingRadius: v[2], topTrailingRadius: v[1], style: .continuous)
}

struct ClipTextView: View {
    let it: ClipItem
    var body: some View {
        let size = it.size ?? 14
        let lh = it.lh ?? (size * 1.4).rounded()
        Text(attributed)
            .font(.custom(suitWeight(it.wt).rawValue, fixedSize: size))
            .tracking((it.ls ?? -2) / 100 * size)
            .lineSpacing(max(0, lh - size * 1.25))
            .foregroundStyle(clipColor(it.c, it.a))
            .shadow(color: .black.opacity(it.sh?[3] ?? 0), radius: (it.sh?[2] ?? 0) / 2, x: it.sh?[0] ?? 0, y: it.sh?[1] ?? 0)
            .fixedSize()
            .frame(minHeight: lh)
    }

    private var attributed: AttributedString {
        var s = AttributedString(it.text ?? "")
        guard let sp = it.sp else { return s }
        let chars = Array(it.text ?? "")
        for span in sp {
            let a = Int(span[0].num), b = Int(span[1].num)
            guard a < b, b <= chars.count else { continue }
            let start = s.index(s.startIndex, offsetByCharacters: a)
            let end = s.index(s.startIndex, offsetByCharacters: b)
            s[start ..< end].foregroundColor = clipColor(span[2].str)
        }
        return s
    }
}

struct ClipItemView: View {
    let it: ClipItem
    var flow = false
    var parentWidth: Double = 390

    var body: some View {
        switch it.k {
        case "rect": rect
        case "img": avatar
        case "svg": svg
        case "text": textItem
        case "pill": pillItem
        case "group": group
        case "row": row
        default: EmptyView()
        }
    }

    @ViewBuilder
    private func place(_ v: some View, _ x: Double?, _ y: Double?) -> some View {
        if flow {
            v.padding(.leading, it.ml ?? 0)
        } else {
            v.offset(x: x ?? 0, y: y ?? 0)
        }
    }

    private var rect: some View {
        let shape = corners(it.r)
        return place(
            clipFillView(it.f)
                .frame(width: it.w ?? 0, height: it.h ?? 0)
                .clipShape(shape)
                .overlay(shape.strokeBorder(clipColor(it.stroke?.c, it.stroke?.a), lineWidth: it.stroke?.w ?? 0))
                .shadow(color: .black.opacity(it.sh?[3] ?? 0), radius: (it.sh?[2] ?? 0) / 2, x: it.sh?[0] ?? 0, y: it.sh?[1] ?? 0),
            it.x, it.y
        )
    }

    private var avatar: some View {
        place(
            Image("G-clip-" + (it.img ?? "")).resizable().scaledToFill()
                .frame(width: it.w ?? 0, height: it.h ?? 0)
                .background(Color(hex: 0x2D2D2D))
                .clipShape(Circle()),
            it.x, it.y
        )
    }

    private var svg: some View {
        place(
            Image(it.asset ?? "").resizable()
                .frame(width: it.w ?? 0, height: it.h ?? 0)
                .shadow(color: .black.opacity(it.sh?[3] ?? 0), radius: (it.sh?[2] ?? 0) / 2, x: it.sh?[0] ?? 0, y: it.sh?[1] ?? 0),
            it.x, it.y
        )
    }

    @ViewBuilder
    private var textItem: some View {
        let size = it.size ?? 14
        let lh = it.lh ?? (size * 1.4).rounded()
        if flow {
            ClipTextView(it: it).padding(.leading, it.ml ?? 0)
        } else if let cx = it.cx {
            ClipTextView(it: it).frame(width: 300).offset(x: cx - 150, y: (it.cy ?? 0) - lh / 2)
        } else {
            ClipTextView(it: it).offset(x: it.x ?? 0, y: it.cy.map { $0 - lh / 2 } ?? (it.y ?? 0))
        }
    }

    @ViewBuilder
    private var pillItem: some View {
        let t = it.pill
        let body = Text(t?.s ?? "")
            .font(.custom(suitWeight(t?.wt).rawValue, fixedSize: t?.size ?? 12))
            .tracking(-0.02 * (t?.size ?? 12))
            .foregroundStyle(clipColor(t?.c))
            .padding(.horizontal, it.px ?? 0)
            .frame(height: it.h ?? 0)
            .background(clipFillView(it.f))
            .clipShape(RoundedRectangle(cornerRadius: it.rad ?? 0))
            .overlay(RoundedRectangle(cornerRadius: it.rad ?? 0).strokeBorder(clipColor(it.stroke?.c, it.stroke?.a), lineWidth: it.stroke?.w ?? 0))
            .fixedSize()
        if flow {
            body.padding(.leading, it.ml ?? 0)
        } else if let right = it.right {
            Color.clear.frame(width: right, height: it.h ?? 0)
                .overlay(alignment: .trailing) { body }
                .offset(y: it.y ?? 0)
        } else {
            body.offset(x: it.x ?? 0, y: it.y ?? 0)
        }
    }

    @ViewBuilder
    private var group: some View {
        let shape = corners(it.r)
        if it.wAuto {
            let pad = it.pad ?? [0, 0, 0, 0]
            place(
                HStack(spacing: it.gap ?? 0) {
                    ForEach(it.ch ?? []) { ClipItemView(it: $0, flow: true) }
                }
                .padding(EdgeInsets(top: pad[0], leading: pad[3], bottom: pad[2], trailing: pad[1]))
                .frame(height: it.h.map { CGFloat($0) })
                .background {
                    if it.blur != nil {
                        shape.fill(.ultraThinMaterial)
                    }
                    clipFillView(it.f).clipShape(shape)
                }
                .fixedSize(),
                it.x, it.y
            )
        } else {
            place(
                ZStack(alignment: .topLeading) {
                    clipFillView(it.f)
                    ForEach(it.ch ?? []) { ClipItemView(it: $0, parentWidth: it.w ?? 0) }
                }
                .frame(width: it.w ?? 0, height: it.h ?? 0, alignment: .topLeading)
                .clipShape(shape),
                it.x, it.y
            )
        }
    }

    private var row: some View {
        HStack(spacing: 0) {
            ForEach(it.items ?? []) { ClipItemView(it: $0, flow: true) }
        }
        .frame(height: 32)
        .fixedSize()
        .offset(x: it.x ?? 0, y: (it.cy ?? 0) - 16)
    }
}

/// 390 x 844 장면을 기기 폭에 맞춰 키운다. 장면 위에 얹는 버튼도 같은 좌표계에서 함께 커진다.
struct ClipCanvas<Overlay: View>: View {
    let items: [ClipItem]
    let background: Color
    @ViewBuilder var overlay: () -> Overlay

    var body: some View {
        GeometryReader { geo in
            let s = geo.size.width / 390
            ZStack(alignment: .topLeading) {
                ForEach(items) { ClipItemView(it: $0) }
                overlay()
            }
            .frame(width: 390, height: 844, alignment: .topLeading)
            .scaleEffect(s, anchor: .topLeading)
            .frame(width: geo.size.width, height: geo.size.height, alignment: .topLeading)
        }
        .background(background)
        .ignoresSafeArea()
    }
}

// MARK: - 클립 표와 공유 상태


// 네이버 클립 리스트와 영상 보기가 함께 쓰는 클립 표와 상태. 웹 clipState.js(CLIPS, SUBS, DURATION)와 같은 값이다.
// 클립 순서는 리스트 카드 순서(위에서 아래, 같은 높이면 왼쪽 먼저)이고, 첫 클립(쌍밍아웃)은 피그마 영상 보기 값 그대로다.

struct ClipInfo: Identifiable, Hashable {
    let id: String
    /// 장면 그림(G-clip-*). 리스트 썸네일과 같은 그림이다.
    let image: String
    /// 가로 영상(혼술바)은 화면 폭에 맞춰 가운데에 놓는다.
    let wide: Bool
    let title: String
    let tags: String
    let creator: String
    /// 더보기 메뉴의 "~ 콘텐츠 숨기기"에 쓰는 채널 이름
    let channel: String
    let avatar: String
    let badge: Bool
    let likes: Int
    let comments: Int
    let plays: String
    let when: String
    let bubble: String
    let bubbleAvatar: String
    let bubbleName: String
    /// 리스트 카드 자리(390 x 844 좌표)와 카드를 이루는 장면 요소 이름
    let card: CGRect
    let parts: [String]

    static let all: [ClipInfo] = [
        .init(id: "s0", image: "G-clip-vid", wide: false, title: "베프가 내 비밀을 까발린다 ep.01", tags: "#친구관계 #연애",
              creator: "흔한 웹드", channel: "웹드플리", avatar: "G-clip-av-webd", badge: true, likes: 2413, comments: 187, plays: "2.4만", when: "3일 전",
              bubble: "와 이번꺼 공감 100000%", bubbleAvatar: "G-clip-av-mjg", bubbleName: "먼작귀더쿠",
              card: CGRect(x: 7.6, y: 109, width: 183.4, height: 354.4),
              parts: ["썸네일 / 쌍밍아웃 영상", "아바타 / 쌍수일기", "크리에이터 이름 줄 / 쌍수일기"]),
        .init(id: "s1", image: "G-clip-desk", wide: true, title: "드디어 가봤습니다 혼술바!", tags: "#혼술 #바투어",
              creator: "트민언니", channel: "트민언니", avatar: "G-clip-av-trm", badge: false, likes: 864, comments: 52, plays: "9,120", when: "5일 전",
              bubble: "분위기 미쳤다 위치 어디예요", bubbleAvatar: "G-clip-av-lucky", bubbleName: "럭키비키",
              card: CGRect(x: 199.2, y: 305.4, width: 183, height: 151.4),
              parts: ["썸네일 / 편집 영상", "NEW 알약 / 편집 영상", "시간 알약 / 02:00", "제목 / 편집 영상", "아바타 / 편집하는 하루", "크리에이터 / 편집하는 하루"]),
        .init(id: "s2", image: "G-clip-dance", wide: false, title: "연습실에서 11초 챌린지 찍어 봤어요", tags: "#댄스챌린지 #연습실",
              creator: "연습실일지", channel: "연습실일지", avatar: "G-clip-av-lucky", badge: false, likes: 1532, comments: 96, plays: "1.8만", when: "1일 전",
              bubble: "동작 너무 깔끔해요", bubbleAvatar: "G-clip-av-mjg", bubbleName: "먼작귀더쿠",
              card: CGRect(x: 199.2, y: 473, width: 183, height: 284),
              parts: ["썸네일 / 댄스 연습실", "시간 알약 / 00:11"]),
        .init(id: "s3", image: "G-clip-cafe", wide: false, title: "군자 주민들만 몰래 가는 느좋 카페 추천 top 3", tags: "#군자카페 #카페추천",
              creator: "군자동산책", channel: "군자동산책", avatar: "G-clip-av-mjg", badge: false, likes: 677, comments: 38, plays: "7,450", when: "2일 전",
              bubble: "저장해 두고 이번 주말에 가요", bubbleAvatar: "G-clip-av-lucky", bubbleName: "럭키비키",
              card: CGRect(x: 7.6, y: 479.2, width: 183.4, height: 290),
              parts: ["썸네일 / 카페 모아보기", "NEW 알약 / 카페 모아보기", "제목 / 카페 모아보기"]),
    ]

    /// 드르륵 배너 카드(누르면 스플래시를 거쳐 드르륵 홈)
    static let bannerCard = CGRect(x: 199.2, y: 109.4, width: 183, height: 183)
    static let bannerPart = "배너 / 오늘의 행운 뽑기"

    /// 구독 탭에 늘 보이는 크리에이터(팀 지시: 흔한 웹드, 트민언니). 영상 보기에서 팔로우한 크리에이터도 더해진다.
    static let subscribed: Set<String> = ["흔한 웹드", "트민언니"]
    /// 영상 한 편 길이(초). 끝나면 처음부터 다시 돈다.
    static let duration: Double = 38
}

enum ClipFeedTab: String, CaseIterable { case subs, rec, mine }

/// 누를 수 있는 요소 목록(웹 clipState.js CLIP_TOUCH와 같은 값). 11/11 팀 요청 "군자, 느좋녀 패션템, 혼술바 전부 터치 안되게"와 사용자 "쓸데없는 거 클릭 안 되게".
/// 목록에 있는 것만 눌리고, 없는 것은 Button 대신 일반 뷰로 같은 자리에 같은 모양만 그린다(allowsHitTesting false, 눌림 스타일 없음). 되돌리려면 이름을 다시 넣는다.
/// 리스트: card:<클립 id>, banner, agent. 막힘: tabs, fav, search, bottom, creator.
/// 영상 보기: back, video, like, comments, save, more, sound, progress, agent, sheet, immExit. 막힘: event, bubble, input, caption, follow, swipe.
enum ClipTouch {
    enum Screen { case list, player }
    static let list: Set<String> = ["card:s0", "banner", "agent"]
    static let player: Set<String> = ["back", "video", "like", "comments", "save", "more", "sound", "progress", "agent", "sheet", "immExit"]
    static func can(_ screen: Screen, _ key: String) -> Bool {
        (screen == .list ? list : player).contains(key)
    }
    /// 쓸어 넘기기가 막혀 있으면 영상이 있는 첫 클립 한 장만 보인다.
    static var firstVideo: Int { ClipInfo.all.firstIndex { $0.hasVideo } ?? 0 }
}

/// 화면을 나갔다 들어와도 켜 둔 상태가 남는다. 리스트와 영상 보기가 같은 저장소를 쓴다.
@Observable
final class ClipState {
    static let shared = ClipState()

    /// 영상 보기에서 보고 있는 클립 번호(ClipInfo.all 순서)
    var pick = 0
    var tab: ClipFeedTab = .rec
    var favorite = false
    var follow: Set<String> = []
    var likedClips: Set<String> = []
    var savedClips: Set<String> = []
    var mute = false
    /// 반복 재생(true)과 한 번만 재생(false)
    var loop = true
    /// 클립마다 멈춘 자리(초). 첫 클립은 피그마 진행 막대(107 / 390) 자리다.
    var progress: [String: Double] = ["s0": 10.4]
    /// 클립마다 댓글 목록
    var threads: [String: [ClipComment]] = ClipState.seedThreads()
    /// 공감을 누른 댓글
    var liked: Set<Int> = []
    private var nextID = 1000

    var current: ClipInfo {
        ClipInfo.all[min(max(pick, 0), ClipInfo.all.count - 1)]
    }

    var like: Bool {
        get { likedClips.contains(current.id) }
        set { if newValue { likedClips.insert(current.id) } else { likedClips.remove(current.id) } }
    }

    var save: Bool {
        get { savedClips.contains(current.id) }
        set { if newValue { savedClips.insert(current.id) } else { savedClips.remove(current.id) } }
    }

    var comments: [ClipComment] {
        get { threads[current.id] ?? [] }
        set { threads[current.id] = newValue }
    }

    /// 지금 클립의 댓글 수(바탕 수에 새로 남긴 댓글을 더한다)
    var total: Int {
        total(for: current)
    }

    func total(for c: ClipInfo) -> Int {
        let seeded = ClipState.seedThreads()[c.id]?.count ?? 0
        return c.comments + (threads[c.id]?.count ?? 0) - seeded
    }

    func likeCount(_ c: ClipInfo) -> Int {
        c.likes + (likedClips.contains(c.id) ? 1 : 0)
    }

    func isFollowing(_ name: String) -> Bool {
        follow.contains(name)
    }

    func toggleFollow(_ name: String) {
        if follow.contains(name) { follow.remove(name) } else { follow.insert(name) }
    }

    func makeID() -> Int {
        nextID += 1
        return nextID
    }

    /// 탭마다 보이는 클립. 추천은 피그마 피드 전체, 구독은 팔로우한 크리에이터, 내클립은 저장한 클립이다.
    func clips(in tab: ClipFeedTab) -> [ClipInfo] {
        switch tab {
        case .rec: ClipInfo.all
        case .subs: ClipInfo.all.filter { ClipInfo.subscribed.contains($0.creator) || follow.contains($0.creator) }
        case .mine: ClipInfo.all.filter { savedClips.contains($0.id) }
        }
    }

    static func seedThreads() -> [String: [ClipComment]] {
        var out: [String: [ClipComment]] = ["s0": ClipComment.seed]
        for (i, c) in ClipInfo.all.enumerated() where c.id != "s0" {
            out[c.id] = [.init(id: 10 + i, name: c.bubbleName, avatar: c.bubbleAvatar, text: c.bubble, when: c.when, order: 1, likes: 12 + i * 7)]
        }
        return out
    }
}

struct ClipComment: Identifiable, Hashable {
    let id: Int
    let name: String
    let avatar: String?
    let text: String
    let when: String
    let order: Int
    var likes: Int
    /// 답글이면 원 댓글 번호
    var parent: Int? = nil

    static let seed: [ClipComment] = [
        .init(id: 1, name: "먼작귀더쿠", avatar: "G-clip-av-mjg", text: "와 이번꺼 공감 100000% 나도 꼭 저렇게\n여우짓하는 애 있었는데 손절한지 4년됨", when: "3일 전", order: 3, likes: 355),
        .init(id: 2, name: "럭키비키", avatar: "G-clip-av-lucky", text: "얼굴 화끈거리는 마음 너무 알아서 두 번 봤어", when: "2일 전", order: 2, likes: 128),
        .init(id: 3, name: "모카빵굽는밤", avatar: nil, text: "일단 그 친구한테 바로 따지지 말고 마음 정리부터 해 보자", when: "1일 전", order: 1, likes: 76),
        .init(id: 4, name: "새벽세시", avatar: nil, text: "이럴 땐 드르륵에서 비슷한 고민 방을 열어 보는 것도 방법이야", when: "20시간 전", order: 0, likes: 41),
    ]
}

/// 2413 같은 수를 2,413으로 적는다.
func clipCount(_ n: Int) -> String {
    let s = String(n)
    var out = ""
    for (i, ch) in s.enumerated() {
        if i > 0, (s.count - i) % 3 == 0 {
            out.append(",")
        }
        out.append(ch)
    }
    return out
}

// MARK: - 눌림 반응

/// 누르는 즉시 scale 0.97, opacity 0.85(90ms), 떼면 120ms로 돌아온다(웹 ClipKit.jsx PRESS_CSS와 같은 값).
struct ClipPressStyle: ButtonStyle {
    var radius: CGFloat = 12
    /// 장면 그림을 담은 누름 칸은 그림이 칸 밖으로 조금 나가도 잘리지 않게 false로 둔다.
    var clips = true

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .contentShape(RoundedRectangle(cornerRadius: radius))
            .modifier(ClipOptionalClip(radius: radius, on: clips))
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(configuration.isPressed ? 0.85 : 1)
            .animation(.timingCurve(0.2, 0, 0, 1, duration: configuration.isPressed ? 0.09 : 0.12), value: configuration.isPressed)
    }
}

private struct ClipOptionalClip: ViewModifier {
    let radius: CGFloat
    let on: Bool
    func body(content: Content) -> some View {
        if on {
            content.clipShape(RoundedRectangle(cornerRadius: radius))
        } else {
            content
        }
    }
}

/// 끌어서 움직이는 판 위(리스트 피드)의 카드용 눌림. 10 넘게 움직이면 끌기로 보고 눌림을 풀고, 누름도 하지 않는다.
struct ClipPressable: ViewModifier {
    let action: () -> Void
    @State private var down = false

    func body(content: Content) -> some View {
        content
            .scaleEffect(down ? 0.97 : 1)
            .opacity(down ? 0.85 : 1)
            .animation(.timingCurve(0.2, 0, 0, 1, duration: down ? 0.09 : 0.12), value: down)
            .contentShape(Rectangle())
            // 눌림 판정을 드래그 제스처 끝에서 한다. onTapGesture를 같이 쓰면 드래그와 겹쳐 누름이 안 들어오는 경우가 있다(11/10 시뮬레이터 확인).
            .simultaneousGesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { v in down = hypot(v.translation.width, v.translation.height) < 10 }
                    .onEnded { v in
                        down = false
                        if hypot(v.translation.width, v.translation.height) < 10 { action() }
                    }
            )
            .accessibilityAction(.default) { action() }
    }
}

extension View {
    func clipPressable(_ action: @escaping () -> Void) -> some View {
        modifier(ClipPressable(action: action))
    }
}

/// 장면 요소를 담은 누름 칸. box(390 x 844 좌표) 안에서만 눌리고, 칸 안에 장면 요소를 같은 자리에 그려 눌림 반응이 그림에 보인다.
struct ClipHit: View {
    let label: String
    let box: CGRect
    var radius: CGFloat = 12
    var items: [ClipItem] = []
    var pop: CGFloat = 1
    /// false면 같은 자리에 같은 모양만 그리고 눌리지 않는다(ClipTouch 목록에 없는 요소). 글자는 화면 읽기에서 그대로 읽힌다.
    var on: Bool = true
    let action: () -> Void

    var body: some View {
        if on {
            pressable
        } else {
            ZStack(alignment: .topLeading) {
                ClipItemsLayer(items: items)
                    .offset(x: -box.minX, y: -box.minY)
            }
            .frame(width: box.width, height: box.height, alignment: .topLeading)
            .allowsHitTesting(false)
            .offset(x: box.minX, y: box.minY)
        }
    }

    private var pressable: some View {
        Button(action: action) {
            ZStack(alignment: .topLeading) {
                ClipItemsLayer(items: items)
                    .offset(x: -box.minX, y: -box.minY)
                    .allowsHitTesting(false)
            }
            .frame(width: box.width, height: box.height, alignment: .topLeading)
            .scaleEffect(pop)
            .contentShape(Rectangle())
        }
        .buttonStyle(ClipPressStyle(radius: radius, clips: false))
        .offset(x: box.minX, y: box.minY)
        .accessibilityLabel(label)
    }
}

/// 장면 요소 묶음을 390 x 844 좌표 그대로 그린다.
struct ClipItemsLayer: View {
    let items: [ClipItem]
    var body: some View {
        ZStack(alignment: .topLeading) {
            ForEach(items) { ClipItemView(it: $0) }
        }
        .frame(width: 390, height: 844, alignment: .topLeading)
    }
}

/// 화면 키보드 높이(390 좌표 기준). 댓글 입력칸을 키보드 위로 올릴 때 쓴다.
@Observable
final class ClipKeyboard {
    var height: CGFloat = 0
    private var token: NSObjectProtocol?

    init() {
        token = NotificationCenter.default.addObserver(forName: UIResponder.keyboardWillChangeFrameNotification, object: nil, queue: .main) { [weak self] n in
            guard let end = n.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
            let screen = UIScreen.main.bounds
            let s = screen.width / 390
            let h = max(0, screen.maxY - end.minY) / s
            withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.25)) { self?.height = h }
        }
    }

    deinit {
        if let token {
            NotificationCenter.default.removeObserver(token)
        }
    }
}
