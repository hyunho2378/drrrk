import Observation
import SwiftUI

// 마이 묶음. 마이 리디자인(팀 피그마 1980:28455, 1972:22735에 "+ 0.5°" 칩이 더해진 판, 히어로와 엉따 밴드, 업적 편의점 격자), 스킨 획득 팝업(1972:22149),
// 나의 편의점 시트(1790:10756), 아이템 상세(1790:10988).
// 좌표와 값은 피그마 390 x 844 기준이다. 시트와 팝업은 마이 화면 위에 같은 화면 안에서 올라온다(화면 이동 없음).

struct MyShelfItem: Identifiable, Hashable {
    let id: String
    let name: String
    let asset: String
    let count: Int
    let group: String
    var isNew = false
}

enum MyShelfData {
    static let shrimp = MyShelfItem(id: "shrimp", name: "새우깡", asset: "D-snack-shrimp", count: 3, group: "과자")
    static let soju = MyShelfItem(id: "soju", name: "마지막처럼", asset: "D-snack-soju", count: 2, group: "음료")
    static let peanut = MyShelfItem(id: "peanut", name: "오징어땅콩", asset: "D-snack-peanut", count: 1, group: "과자")
    static let nogari = MyShelfItem(id: "nogari", name: "노가리", asset: "D-snack-nogari", count: 4, group: "안주")
    static let drrra = MyShelfItem(id: "drrra", name: "드르라", asset: "D-snack-drrra", count: 2, group: "음료")
    static let squid = MyShelfItem(id: "squid", name: "오징어", asset: "D-snack-squid", count: 1, group: "안주")
    static let monster = MyShelfItem(id: "monster", name: "몬스타", asset: "D-snack-monster", count: 5, group: "음료", isNew: true)
    static let byeollo = MyShelfItem(id: "byeollo", name: "별로", asset: "D-snack-byeollo", count: 1, group: "음료")
    /// 잠긴 칸을 누르면 여는 미획득 시트(피그마 2116:28586)
    static let locked = MyShelfItem(id: "locked", name: "???", asset: "", count: 0, group: "")

    /// 마이 업적 편의점 격자(피그마 1972:22735 순서 그대로). 끝의 두 칸(몬스타, 마지막처럼)은 아직 잠긴 칸이다.
    static let main: [MyShelfItem] = [shrimp, soju, peanut, nogari, drrra, squid, monster, soju]
    static let lockedFrom = 6
    // 나의 편의점 전체(8종 19개)
    static let all: [MyShelfItem] = [shrimp, soju, peanut, nogari, drrra, squid, monster, byeollo]
    static let filters = ["전체", "과자", "음료", "안주"]
}

/// 마이 엉따 막대가 39도를 넘는 순간 의자 획득 장면을 띄운다(11. 10. 메모 "마이에서 엉따 온도 올라가서 의자 획득하는 장면 나오게").
/// 막대 전체 길이(244.8)가 지금 온도 39.2도라서 채움 비율이 39 / 39.2에 닿는 순간이 39도를 넘는 순간이다.
/// 막대는 0.2초 뒤 1.0초 동안 timingCurve(0.05, 0.7, 0.1, 1)로 차오르므로 그 비율에 닿는 시각은 시작 후 약 1.011초다(웹 my.js CHAIR_GET과 같은 값).
/// 앱이 켜져 있는 동안 한 번만 띄운다.
enum MyChairGet {
    static let crossSeconds = 1.011
    /// 39도를 넘은 뒤 획득 장면이 뜨기 전에 마이를 보여 주는 시간(11/10 팀원 피드백 "텁이 좀 더 있어야"). 웹 my.js CHAIR_GET.popGapMs와 같은 값.
    static let popGapSeconds = 1.1
    @MainActor static var seen = false
}

enum MyOverlay: Equatable {
    case none, shelf, skin
}

// MARK: - 라우트 화면

struct MyView: View {
    var startOverlay: MyOverlay = .none
    var startItem: MyShelfItem?
    var pushed = false

    var body: some View {
        MyHome(startOverlay: startOverlay, startItem: startItem, pushed: pushed)
    }
}

struct MySkinView: View {
    var body: some View {
        MyView(startOverlay: .skin, pushed: true)
    }
}

struct MyShelfView: View {
    var body: some View {
        MyView(startOverlay: .shelf, pushed: true)
    }
}

struct MyItemView: View {
    var body: some View {
        MyView(startItem: MyShelfData.shrimp, pushed: true)
    }
}

// MARK: - 마이 본 화면

private struct MyHome: View {
    let startOverlay: MyOverlay
    let startItem: MyShelfItem?
    let pushed: Bool

    @Environment(Router.self) private var router
    @State private var chairs = ChairStore.shared
    @State private var overlay: MyOverlay = .none
    @State private var item: MyShelfItem?
    @State private var gauge: CGFloat = 0

    var body: some View {
        ZStack(alignment: .top) {
            background

            VStack(spacing: 0) {
                canvas
                    .frame(width: 390, height: 740, alignment: .topLeading)
                    .frame(maxWidth: .infinity, alignment: .top)
                Spacer(minLength: 0)
            }

            // 나의 편의점 시트: 아래 탭은 시트 위에 그대로 보인다(피그마 53).
            MySheet(isPresented: overlay == .shelf, top: 96, dim: 0.6, background: .black, onClose: closeOverlay) {
                MyShelfSheet { open($0) }
            }

            // 평소에는 앱 전체 아래 탭이 보이고, 아이템 시트나 팝업이 열릴 때만 여기서 같은 자리에 그려 시트 아래에 깐다.
            if router.navLocal {
                BottomNav().frame(maxHeight: .infinity, alignment: .bottom)
            }

            MySheet(isPresented: item != nil, height: item?.id == MyShelfData.locked.id ? 397 : 393, dim: 0.6, background: DS.Palette.bgSurface, onClose: closeItem) {
                if let item {
                    MyItemSheet(item: item)
                }
            }

            if overlay == .skin {
                MySkinModal(
                    sit: {
                        chairs.openStudio(fresh: true)
                        withAnimation(DS.Motion.emphasizedAccel) { overlay = .none }
                        router.push(.chairStudio)
                    },
                    later: closeOverlay
                )
                .transition(.opacity)
                .zIndex(5)
            }
        }
        .ignoresSafeArea(edges: .top)
        .toolbar(.hidden, for: .navigationBar)
        .onChange(of: item != nil || overlay == .skin, initial: true) { _, covered in
            var t = Transaction(); t.disablesAnimations = true
            withTransaction(t) { router.navLocal = covered }
        }
        .onDisappear { router.navLocal = false }
        .onAppear {
            overlay = startOverlay
            item = startItem
            // 아이템 녹음 파일 8개를 미리 열어 둔다(첫 누름 소리가 늦지 않게).
            ItemSound.shared.preloadFiles()
            // 엉따 막대는 다른 탭이나 화면에서 마이로 들어올 때만 0에서 차오른다.
            // 그때는 이 화면이 새로 만들어져 gauge가 0이다. 의자 꾸미기에서 뒤로 오거나 시트와 팝업을 닫을 때는
            // 같은 화면이 남아 있어 gauge가 이미 1이므로 다시 비우거나 채우지 않는다.
            if gauge < 1 {
                withAnimation(DS.Motion.decel(1.0).delay(0.2)) { gauge = 1 }
                // 다른 화면에서 들어와 막대가 차오를 때만, 39도를 넘는 순간 의자 획득 장면으로 넘어간다.
                if startOverlay == .none, startItem == nil, !MyChairGet.seen {
                    Task { @MainActor in
                        try? await Task.sleep(for: .seconds(MyChairGet.crossSeconds + MyChairGet.popGapSeconds))
                        guard !MyChairGet.seen, overlay == .none, item == nil else { return }
                        MyChairGet.seen = true
                        withAnimation(DS.Motion.decel(0.35)) { overlay = .skin }
                    }
                }
            }
        }
    }

    /// 히어로 배경(피그마 hero bg 390 x 336: 밤하늘 사진 위 푸른 그라데이션). 아래는 #121415.
    private var background: some View {
        VStack(spacing: 0) {
            Image("D2-my-hero").resizable().scaledToFill()
                .frame(maxWidth: .infinity).frame(height: 336).clipped()
            DS.Palette.bgSurface
        }
        .background(DS.Palette.bgSurface)
        .ignoresSafeArea()
    }

    private var canvas: some View {
        ZStack(alignment: .topLeading) {
            Image("logo-wordmark").resizable().scaledToFit()
                .frame(width: 90, height: 34)
                .offset(x: 24, y: 64)

            Image("D-icon-settings").renderingMode(.template).resizable()
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 24, height: 24)
                .frame(width: 40, height: 40)
                .contentShape(Rectangle())
                .offset(x: 326, y: 68)
                .accessibilityLabel("설정")

            // 현재 의자(100, 126, 190 x 190). 누르면 의자 꾸미기로 간다.
            Button {
                chairs.openStudio(fresh: false)
                router.push(.chairStudio)
            } label: {
                Image(chairs.myBig).resizable().scaledToFit()
                    .frame(width: 190, height: 190)
                    .contentShape(Rectangle())
            }
            .buttonStyle(ChairPressStyle())
            .accessibilityLabel("의자 꾸미기, 지금 의자 \(chairs.myKind.name)")
            .offset(x: 100, y: 126)

            // 디자인 버튼(278, 280, 84 x 36): 검정 45% 바탕, 하늘색 70% 테두리
            Button {
                chairs.openStudio(fresh: false)
                router.push(.chairStudio)
            } label: {
                HStack(spacing: 6) {
                    Image("D2-icon-hanger").resizable().frame(width: 18, height: 18)
                    Text("디자인").suit(12, .bold, lineHeight: 18).foregroundStyle(DS.Palette.brandPrimary)
                }
                .padding(.leading, 13)
                .frame(width: 84, height: 36, alignment: .leading)
                .background(.black.opacity(0.45), in: Capsule())
                .overlay(Capsule().strokeBorder(DS.Palette.brandPrimary.opacity(0.7), lineWidth: 1))
            }
            .buttonStyle(ChairPressStyle())
            .accessibilityLabel("의자 디자인 바꾸기")
            .offset(x: 278, y: 280)

            warmBand.offset(x: 24, y: 356)
            shelfHeader.offset(x: 24, y: 498)
            shelfGrid.offset(x: 24, y: 534)
        }
    }

    /// 엉따 온도 밴드(피그마 336 ~ 482): 제목과 39.2°, 막대(342 x 6), 다음 캐릭터 줄(40 높이)
    private var warmBand: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top, spacing: 0) {
                MyCardTitle("엉따 온도")
                Spacer(minLength: 0)
                Text("39.2°").suit(26, .bold, tracking: -0.52, lineHeight: 36.4)
                    .foregroundStyle(DS.Palette.accentOrange)
                    .frame(height: 36)
            }
            .frame(height: 36)
            // 막대가 왼쪽에서 오른쪽으로 차오른다(244.8 / 342).
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: 3).fill(Color(hex: 0x6E767C, alpha: 0.4))
                RoundedRectangle(cornerRadius: 3)
                    .fill(LinearGradient(colors: [DS.Palette.brandPrimary, DS.Palette.accentOrange], startPoint: .leading, endPoint: .trailing))
                    .frame(width: 244.8)
                    .mask(alignment: .leading) { Rectangle().frame(width: 244.8 * gauge) }
            }
            .frame(width: 342, height: 6)
            HStack(spacing: 10) {
                Image(ChairStore.thumb(4, 0)).resizable().scaledToFit()
                    .frame(width: 30, height: 30).opacity(0.85)
                    .frame(width: 40, height: 40)
                    .background(.white.opacity(0.08), in: Circle())
                VStack(alignment: .leading, spacing: 2) {
                    Text("다음 캐릭터 · ???").suit(13, .bold, lineHeight: 18).foregroundStyle(DS.Palette.textPrimary)
                    Text("0.8° 더 따뜻해지면 열려요").suit(12, .medium, lineHeight: 17).foregroundStyle(DS.Palette.textSecondary)
                }
                Spacer(minLength: 0)
                Text("40°").suit(14, .bold, lineHeight: 20).foregroundStyle(DS.Palette.textPrimary)
            }
            .frame(height: 40)
        }
        .frame(width: 342, alignment: .topLeading)
        // 피그마 1980:28595: 39.2° 왼쪽 "+ 0.5°" 칩(밴드 기준 213, 5). 49 x 25, 모서리 11, #36D2FF, 오른쪽 꼬리(1980:28598)
        .overlay(alignment: .topLeading) { WarmGainChip().offset(x: 213, y: 5) }
    }

    /// 업적 편의점 머리줄(24, 498): 제목과 "전체 8"
    private var shelfHeader: some View {
        HStack {
            MyCardTitle("업적 편의점")
            Spacer()
            Button {
                withAnimation(DS.Motion.emphasizedDecel) { overlay = .shelf }
            } label: {
                HStack(spacing: 2) {
                    Text("전체 8").suit(13, .medium, lineHeight: 18).foregroundStyle(DS.Palette.textSecondary)
                    Image("D-icon-chevron-right").renderingMode(.template).resizable()
                        .foregroundStyle(DS.Palette.textSecondary)
                        .frame(width: 14, height: 14).padding(1)
                }
                .frame(height: 20)
                .padding(.vertical, 12)
                .padding(.leading, 12)
                .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .padding(.vertical, -12)
            .accessibilityLabel("나의 편의점 전체 8종 보기")
        }
        .frame(width: 342, height: 20)
    }

    /// 업적 편의점 격자(342 x 198): 4칸 두 줄, 칸 76 x 93, 줄 사이 12. 끝의 두 칸은 잠긴 칸(그림 35%, 자물쇠, ???).
    private var shelfGrid: some View {
        let items = MyShelfData.main
        let step: CGFloat = (342 - 76) / 3
        return ZStack(alignment: .topLeading) {
            ForEach(items.indices, id: \.self) { i in
                let it = items[i]
                let locked = i >= MyShelfData.lockedFrom
                Button {
                    // 칸을 누르면 그 아이템 소리가 나고 상세 시트가 열린다. 잠긴 칸은 잠금 소리와 미획득 시트다.
                    ItemSound.shared.play(locked ? "locked" : it.id)
                    open(locked ? MyShelfData.locked : it)
                } label: {
                    VStack(spacing: 4) {
                        ZStack {
                            Image(it.asset).resizable().scaledToFit()
                                .frame(width: 68, height: 68)
                                .opacity(locked ? 0.35 : 1)
                            if locked {
                                Image("D-icon-lock").renderingMode(.template).resizable()
                                    .foregroundStyle(.white)
                                    .frame(width: 24, height: 24)
                            }
                        }
                        .frame(width: 72, height: 72)
                        Text(locked ? "???" : it.name).suit(12, .medium, lineHeight: 17)
                            .foregroundStyle(locked ? Color(hex: 0x666B73) : Color(hex: 0xD9DEE3))
                            .lineLimit(1)
                            .frame(height: 17)
                    }
                    .frame(width: 76, height: 93, alignment: .top)
                    .contentShape(Rectangle())
                }
                .buttonStyle(ChairPressStyle())
                .accessibilityLabel(locked ? "잠긴 칸" : "\(it.name), 보유 \(it.count)개")
                .offset(x: CGFloat(i % 4) * step, y: CGFloat(i / 4) * 105)
            }
        }
        .frame(width: 342, height: 198, alignment: .topLeading)
    }

    private func open(_ i: MyShelfItem) {
        UISelectionFeedbackGenerator().selectionChanged()
        withAnimation(DS.Motion.emphasizedDecel) { item = i }
    }

    private func closeItem() {
        withAnimation(DS.Motion.emphasizedAccel) { item = nil }
        if pushed, startItem != nil, overlay == .none {
            popSoon()
        }
    }

    private func closeOverlay() {
        withAnimation(DS.Motion.emphasizedAccel) { overlay = .none }
        if pushed, startOverlay != .none {
            popSoon()
        }
    }

    private func popSoon() {
        Task {
            try? await Task.sleep(for: .seconds(0.3))
            router.pop()
        }
    }
}

// MARK: - 부품

private struct MyCardTitle: View {
    let text: String
    init(_ text: String) {
        self.text = text
    }

    var body: some View {
        HStack(spacing: 4) {
            Text(text).suit(14, .bold, tracking: -0.28).foregroundStyle(DS.Palette.textPrimary)
            Image("D-icon-info").renderingMode(.template).resizable()
                .foregroundStyle(DS.Palette.textSecondary)
                .frame(width: 13, height: 13)
        }
        .frame(height: 20)
    }
}

/// 선반 한 줄: 아이템(82 x 80), 판자(8), 이름(23).
private struct MyShelfRow: View {
    let items: [MyShelfItem]
    let pad: CGFloat
    let counts: Bool
    var empties = 0
    var fullWidth: CGFloat?
    let onTap: (MyShelfItem) -> Void

    /// 판자는 줄 전체 폭이다. 가로로 넘기는 칸 안에서는 폭을 정해 주지 않으면 판자가 줄어든다.
    private var rowWidth: CGFloat {
        fullWidth ?? (pad * 2 + 82 * CGFloat(items.count + empties))
    }

    var body: some View {
        VStack(spacing: 0) {
            HStack(spacing: 0) {
                ForEach(Array(items.enumerated()), id: \.offset) { _, it in
                    Button { onTap(it) } label: {
                        ZStack(alignment: .topLeading) {
                            Image(it.asset).resizable().scaledToFit()
                                .frame(width: 76, height: 76)
                                .offset(x: 3, y: 4)
                            if counts {
                                Text("\(it.count)").suit(12, .bold).foregroundStyle(DS.Palette.textPrimary)
                                    .frame(minWidth: 10).padding(.horizontal, 5)
                                    .frame(height: 18)
                                    .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 8))
                                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.white.opacity(0.2), lineWidth: 1))
                                    .offset(x: 60, y: 60)
                            }
                            if it.isNew {
                                Circle().fill(DS.Palette.brandPrimary).frame(width: 6, height: 6)
                                    .offset(x: 68, y: 4)
                            }
                        }
                        .frame(width: 82, height: 80, alignment: .topLeading)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(ChairPressStyle())
                    .accessibilityLabel("\(it.name), 보유 \(it.count)개")
                }
                ForEach(0 ..< empties, id: \.self) { _ in
                    RoundedRectangle(cornerRadius: 12)
                        .strokeBorder(.white.opacity(0.15), style: StrokeStyle(lineWidth: 1.5, dash: [4, 4]))
                        .frame(width: 60, height: 60)
                        .padding(.horizontal, 11).padding(.top, 18).padding(.bottom, 2)
                        .accessibilityHidden(true)
                }
            }
            .padding(.horizontal, pad)
            .frame(width: rowWidth, alignment: .leading)

            LinearGradient(colors: [Color(hex: 0x4A4F57), Color(hex: 0x292B30)], startPoint: .top, endPoint: .bottom)
                .frame(width: rowWidth, height: 8)
                .shadow(color: .black.opacity(0.6), radius: 5, x: 0, y: 6)
                .zIndex(1)

            HStack(spacing: 0) {
                ForEach(Array(items.enumerated()), id: \.offset) { _, it in
                    Text(it.name).suit(12, .medium).foregroundStyle(Color(hex: 0xD9DEE3))
                        .lineLimit(1).frame(width: 82, height: 17)
                }
                ForEach(0 ..< empties, id: \.self) { _ in
                    Text("?").suit(12, .medium).foregroundStyle(Color(hex: 0x595E66)).frame(width: 82, height: 17)
                }
            }
            .padding(.horizontal, pad)
            .padding(.top, 6)
            .frame(width: rowWidth, alignment: .leading)
        }
        .frame(height: 111, alignment: .top)
    }
}

/// 아래에서 올라오는 시트. 끌어내리거나 바깥을 누르면 닫힌다.
private struct MySheet<Content: View>: View {
    let isPresented: Bool
    var top: CGFloat?
    var height: CGFloat?
    let dim: Double
    let background: Color
    let onClose: () -> Void
    @ViewBuilder let content: () -> Content
    @State private var drag: CGFloat = 0

    var body: some View {
        GeometryReader { geo in
            let full = geo.size.height
            let h = height ?? (full - (top ?? 0))
            ZStack(alignment: .bottom) {
                if isPresented {
                    Color.black.opacity(dim)
                        .onTapGesture(perform: onClose)
                        .transition(.opacity)
                        .zIndex(0)
                    VStack(spacing: 0) {
                        RoundedRectangle(cornerRadius: 2).fill(Color(hex: 0x6E767C))
                            .frame(width: 40, height: 4)
                            .padding(.top, 10)
                        content()
                        Spacer(minLength: 0)
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: h, alignment: .top)
                    // 시트 판은 올라올 때와 내려갈 때 모두 불투명 단색 그대로다(옅어지는 움직임 없음, 위치로만 움직인다).
                    .background(UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24).fill(background))
                    .compositingGroup()
                    .offset(y: max(0, drag))
                    .gesture(
                        DragGesture()
                            .onChanged { drag = $0.translation.height }
                            .onEnded { v in
                                if v.translation.height > 120 || v.predictedEndTranslation.height > 260 {
                                    onClose()
                                }
                                withAnimation(DS.Motion.emphasizedDecel) { drag = 0 }
                            }
                    )
                    .transition(.asymmetric(insertion: .move(edge: .bottom), removal: .move(edge: .bottom)))
                    .zIndex(1)
                }
            }
            .frame(width: geo.size.width, height: geo.size.height, alignment: .bottom)
        }
        .ignoresSafeArea()
        .allowsHitTesting(isPresented)
    }
}

/// 나의 편의점 전체(피그마 53). 위 필터를 누르면 그 묶음만 선반에 다시 놓인다.
private struct MyShelfSheet: View {
    let onTap: (MyShelfItem) -> Void
    @State private var filter = "전체"

    var body: some View {
        let shown = filter == "전체" ? MyShelfData.all : MyShelfData.all.filter { $0.group == filter }
        let rows = stride(from: 0, to: shown.count, by: 4).map { Array(shown[$0 ..< min($0 + 4, shown.count)]) }
        ScrollView(.vertical, showsIndicators: false) {
            VStack(alignment: .leading, spacing: 0) {
                HStack(alignment: .firstTextBaseline) {
                    Text("나의 편의점").suit(18, .bold, tracking: -0.36).foregroundStyle(DS.Palette.textPrimary)
                    Spacer()
                    Text("8종 · 19개").suit(13, .medium).foregroundStyle(DS.Palette.textSecondary)
                }
                .padding(.horizontal, 24)
                .padding(.top, 16)

                HStack(spacing: 8) {
                    ForEach(MyShelfData.filters, id: \.self) { f in
                        let on = f == filter
                        Button {
                            withAnimation(DS.Motion.decel(0.34)) { filter = f }
                            UISelectionFeedbackGenerator().selectionChanged()
                        } label: {
                            Text(f).suit(13, on ? .bold : .medium)
                                .foregroundStyle(on ? DS.Palette.bgSurface : Color(hex: 0xCCD1D6))
                                .padding(.horizontal, 14).frame(height: 30)
                                .background(on ? DS.Palette.brandPrimary : .white.opacity(0.08), in: Capsule())
                        }
                        .buttonStyle(ChairPressStyle())
                        .accessibilityAddTraits(on ? .isSelected : [])
                    }
                }
                .padding(.horizontal, 24)
                .padding(.top, 13)

                VStack(spacing: 20) {
                    ForEach(Array(rows.enumerated()), id: \.offset) { _, row in
                        MyShelfRow(items: row, pad: 31, counts: true, empties: 4 - row.count, fullWidth: 390, onTap: onTap)
                    }
                    MyShelfRow(items: [], pad: 31, counts: false, empties: 4, fullWidth: 390, onTap: onTap)
                }
                .padding(.top, 22)
                .id(filter)
                .transition(.opacity)

                Text("라이브에서 드르륵하면 새 주전부리가 들어와요").suit(12, .regular)
                    .foregroundStyle(DS.Palette.textSecondary)
                    .frame(maxWidth: .infinity)
                    .padding(.top, 24)
                    .padding(.bottom, 120)
            }
        }
    }
}

/// 아이템 상세 시트(팀 피그마 "Section 1" 2116:28581 시트 9장, 웹 MyHome.jsx ItemSheet와 같은 값): 390 x 393(미획득 397).
/// 손잡이(위 10, 40 x 4) 아래로 그림 칸(24 띄움, 132 x 132, 모서리 28, 흰 6%, 그림 112), 이름(16 띄움, Bold 20, 행간 28),
/// 설명(18 띄움, Regular 14, 행간 21, 자간 -4%, 가운데, 두 줄), 칩 줄(16 띄움, 칩 높이 27, 사이 8). 피그마 시트에 보유 개수 줄이 없어 뺐다.
/// 그림 칸을 누르면 그 아이템 소리가 난다.
private struct MyItemSheet: View {
    let item: MyShelfItem

    private var isLocked: Bool { item.id == MyShelfData.locked.id }
    private var copy: ItemCopy { isLocked ? ItemCopyData.locked : ItemCopyData.copy(for: item.id) }
    private var chips: [String] { isLocked ? ItemCopyData.lockedChips : ItemCopyData.chips }

    var body: some View {
        VStack(spacing: 0) {
            Spacer().frame(height: 24)
            Button {
                ItemSound.shared.play(isLocked ? "locked" : item.id)
            } label: {
                ZStack {
                    if isLocked {
                        Image("D-icon-lock").renderingMode(.template).resizable()
                            .foregroundStyle(.white)
                            .frame(width: 40, height: 40)
                    } else {
                        Image(item.asset).resizable().scaledToFit()
                            .frame(width: 112, height: 112)
                    }
                }
                .frame(width: 132, height: 132)
                .background(.white.opacity(0.06), in: RoundedRectangle(cornerRadius: 28))
                .contentShape(RoundedRectangle(cornerRadius: 28))
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel(isLocked ? "잠긴 아이템 소리 듣기" : "\(copy.name) 소리 듣기")
            Spacer().frame(height: 16)
            Text(copy.name).suit(20, .bold, lineHeight: 28).foregroundStyle(DS.Palette.textPrimary).frame(height: 28)
            Spacer().frame(height: 18)
            Text(copy.text).suit(14, .regular, tracking: isLocked ? 0 : -0.56, lineHeight: 21)
                .foregroundStyle(Color(hex: 0xCCD1D6))
                .multilineTextAlignment(.center)
                .fixedSize()
            Spacer().frame(height: 16)
            HStack(spacing: 8) {
                ForEach(chips.indices, id: \.self) { i in
                    Text(chips[i]).suit(isLocked ? 14 : 12, isLocked ? .regular : .medium, lineHeight: isLocked ? 21 : 17)
                        .foregroundStyle(Color(hex: 0xCCD1D6))
                        .padding(.horizontal, 10).padding(.vertical, 5)
                        .background(.white.opacity(0.08), in: RoundedRectangle(cornerRadius: 8))
                }
            }
        }
        .padding(.horizontal, 24)
        .id(item.id)
    }
}

/// 스킨 획득 팝업(피그마 1972:22149). 마이 화면 위에 짙은 막(#05080A 88%, 흐림 16)이 덮이고, 주황 빛과 빛줄기 위에
/// 새 의자(푹신한 가죽 소파 230 x 230), "새로운 디자인" 칩, 이름, 엉따 39° 도달 막대, 지금 앉아보기, 나중에 할게요가 놓인다.
private struct MySkinModal: View {
    let sit: () -> Void
    let later: () -> Void
    @State private var shown = false
    @State private var fill: CGFloat = 0

    private let orange = Color(hex: 0xFF9959)
    private let sparkles: [(CGFloat, CGFloat, CGFloat)] = [(70, 176, 22), (300, 190, 16), (320, 360, 24), (56, 370, 14), (250, 140, 12), (120, 420, 10)]

    var body: some View {
        GeometryReader { geo in
            let s = geo.size.width / 390
            ZStack(alignment: .topLeading) {
                Image("D2-skin-glow").resizable().frame(width: 380, height: 380).offset(x: 5, y: 101)
                Image("D2-skin-rays").resizable().frame(width: 390, height: 390).offset(x: 0, y: 100)
                Image(ChairStore.big(2, 0)).resizable().scaledToFit()
                    .frame(width: 230, height: 230)
                    .shadow(color: .black.opacity(0.5), radius: 10, x: 0, y: 16)
                    .scaleEffect(shown ? 1 : 0.85)
                    .offset(x: 80, y: 180)
                ForEach(sparkles.indices, id: \.self) { i in
                    Image("D2-sparkle-\(i + 1)").resizable()
                        .frame(width: sparkles[i].2, height: sparkles[i].2)
                        .opacity(shown ? 1 : 0)
                        .offset(x: sparkles[i].0, y: sparkles[i].1)
                }
                VStack(spacing: 6) {
                    Text("새로운 디자인").suit(12, .bold, lineHeight: 18).foregroundStyle(DS.Palette.brandPrimary)
                        .frame(width: 92, height: 28)
                        .background(.black.opacity(0.45), in: Capsule())
                        .overlay(Capsule().strokeBorder(DS.Palette.brandPrimary.opacity(0.7), lineWidth: 1))
                    Text("푹신한 가죽 소파").suit(28, .bold, lineHeight: 38).foregroundStyle(DS.Palette.textPrimary)
                        .frame(height: 38)
                }
                .frame(width: 390)
                .offset(y: 450)
                gauge.offset(x: 75, y: 542)
                Text("엉따 온도 39°에 도달해서 열렸어요").suit(13, .medium, lineHeight: 18)
                    .foregroundStyle(DS.Palette.textSecondary)
                    .frame(width: 390)
                    .offset(y: 600)
                VStack(spacing: 12) {
                    Button(action: sit) {
                        Text("지금 앉아보기").suit(16, .bold, tracking: -0.64, lineHeight: 22.4).foregroundStyle(.black)
                            .frame(width: 278, height: 46)
                            .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 28))
                    }
                    .buttonStyle(ChairPressStyle())
                    Button(action: later) {
                        Text("나중에 할게요").suit(13, .medium, tracking: -0.52, lineHeight: 18.2).foregroundStyle(DS.Palette.textTertiary)
                            .frame(height: 18).padding(.horizontal, 20).padding(.vertical, 8).contentShape(Rectangle())
                    }
                    .buttonStyle(PressStyle())
                    .padding(.vertical, -8)
                }
                .frame(width: 390)
                .offset(y: 668)
            }
            .frame(width: 390, height: 844, alignment: .topLeading)
            .scaleEffect(s, anchor: .topLeading)
            .opacity(shown ? 1 : 0)
            .frame(width: geo.size.width, height: geo.size.height, alignment: .topLeading)
        }
        .background {
            ZStack {
                Rectangle().fill(.ultraThinMaterial)
                Color(hex: 0x05080A).opacity(0.88)
            }
            .opacity(shown ? 1 : 0)
            .onTapGesture(perform: later)
        }
        .ignoresSafeArea()
        .onAppear {
            MyChairGet.seen = true
            withAnimation(DS.Motion.decel(0.35)) { shown = true }
            withAnimation(DS.Motion.decel(0.9).delay(0.25)) { fill = 1 }
        }
    }

    /// 36°에서 40°까지 막대(240 x 6, 흰 12%), 39°까지 차오른 부분(180), 도달 점(14, 주황, 테두리 #0A0D0F 3)
    private var gauge: some View {
        ZStack(alignment: .topLeading) {
            Text("39°").suit(13, .bold, lineHeight: 18).foregroundStyle(orange)
                .offset(x: 169.5)
                .opacity(fill)
            RoundedRectangle(cornerRadius: 3).fill(.white.opacity(0.12)).frame(width: 240, height: 6).offset(y: 24)
            RoundedRectangle(cornerRadius: 3)
                .fill(LinearGradient(colors: [DS.Palette.brandPrimary, orange], startPoint: .leading, endPoint: .trailing))
                .frame(width: 180, height: 6)
                .mask(alignment: .leading) { Rectangle().frame(width: 180 * fill) }
                .offset(y: 24)
            Circle().fill(orange)
                .overlay(Circle().strokeBorder(Color(hex: 0x0A0D0F), lineWidth: 3))
                .frame(width: 14, height: 14)
                .shadow(color: orange.opacity(0.8), radius: 5)
                .opacity(fill)
                .offset(x: 173, y: 20)
            Text("36°").suit(11, .medium, lineHeight: 15).foregroundStyle(DS.Palette.textSecondary).offset(y: 34)
            Text("40°").suit(11, .medium, lineHeight: 15).foregroundStyle(DS.Palette.textSecondary)
                .frame(width: 240, alignment: .trailing).offset(y: 34)
        }
        .frame(width: 240, height: 50, alignment: .topLeading)
    }
}

/// 엉따 온도 옆 "+ 0.5°" 말풍선 칩(피그마 1980:28595, 57.5 x 25)
/// 칩 1980:28596: 49 x 25, 모서리 11, 안쪽 여백 9, 4, #36D2FF. 글자 1980:28597: SUIT Bold 11, 자간 -4%, 행간 150%, 검정.
/// 꼬리 1980:28598: 칩 오른쪽(48, 8)에서 9 x 9, 끝이 둥근 삼각형.
private struct WarmGainChip: View {
    var body: some View {
        ZStack(alignment: .topLeading) {
            WarmGainTail().fill(DS.Palette.brandPrimary)
                .frame(width: 58, height: 25)
            Text("+ 0.5°").suit(11, .bold, tracking: -0.44, lineHeight: 16.5)
                .foregroundStyle(.black)
                .lineLimit(1)
                .fixedSize()
                .frame(width: 49, height: 25)
                .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 11))
        }
        .frame(width: 58, height: 25, alignment: .topLeading)
        .accessibilityLabel("0.5도 올랐어요")
    }
}

/// 피그마 내보내기 SVG 경로 그대로(58 x 25 칸 기준)
private struct WarmGainTail: Shape {
    func path(in rect: CGRect) -> Path {
        let sx = rect.width / 58, sy = rect.height / 25
        var p = Path()
        p.move(to: CGPoint(x: 55.5921 * sx, y: 11.5962 * sy))
        p.addLine(to: CGPoint(x: 48 * sx, y: 8 * sy))
        p.addLine(to: CGPoint(x: 48 * sx, y: 17 * sy))
        p.addLine(to: CGPoint(x: 55.5921 * sx, y: 13.4037 * sy))
        p.addCurve(to: CGPoint(x: 55.5921 * sx, y: 11.5962 * sy),
                   control1: CGPoint(x: 56.3547 * sx, y: 13.0425 * sy),
                   control2: CGPoint(x: 56.3547 * sx, y: 11.9574 * sy))
        p.closeSubpath()
        return p
    }
}
