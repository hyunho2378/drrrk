import SwiftUI

// 네이버 클립 모방 두 화면을 그리는 도구. 팀 피그마 섹션 "네이버 클립 모방"(1843:40426)의 값을 웹 프로토타입과 같은 데이터
// (Resources/Data/clip-scenes.json)에서 읽어 390 x 844 좌표 그대로 그린다. 아이콘은 SVG 벡터 에셋(A-clipsvg-*), 그림은 A-clip-*다.

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

    enum Key: String, CodingKey { case k, n, x, y, w, h, r, f, s, size, wt, c, a, cx, cy, lh, sp, sh, ml, img, asset, items, ch, clip, blur, pad, gap, px, rad, text, right }

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
            Image("A-clip-" + img).resizable().scaledToFill()
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
            .tracking(-0.02 * size)
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
            Image("A-clip-" + (it.img ?? "")).resizable().scaledToFill()
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
