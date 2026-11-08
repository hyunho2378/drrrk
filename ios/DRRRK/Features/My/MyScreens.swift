import Observation
import SwiftUI

// 마이 묶음. 새 마이(팀 피그마 1804:20170), 새 의자 팝업(1804:20299), 나의 편의점 시트(1790:10756), 아이템 상세(1790:10988).
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

    /// 마이 업적 편의점 선반(피그마 순서 그대로, 끝의 마지막처럼도 피그마에 있는 대로다)
    static let main: [MyShelfItem] = [shrimp, soju, peanut, nogari, drrra, squid, monster, soju]
    // 나의 편의점 전체(8종 19개)
    static let all: [MyShelfItem] = [shrimp, soju, peanut, nogari, drrra, squid, monster, byeollo]
    static let filters = ["전체", "과자", "음료", "안주"]
    static let itemDesc = "라이브에서 던지면 가운데 테이블 위에 바삭하게 올라가요."
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

            VStack { Spacer(); BottomNav() }

            MySheet(isPresented: item != nil, height: 411, dim: 0.6, background: DS.Palette.bgSurface, onClose: closeItem) {
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
        .onAppear {
            overlay = startOverlay
            item = startItem
            gauge = 0
            withAnimation(DS.Motion.decel(1.0).delay(0.2)) { gauge = 1 }
        }
    }

    private var background: some View {
        ZStack(alignment: .top) {
            Color(hex: 0x17505F)
            Image("D-sky").resizable().scaledToFill()
                .frame(height: 271).frame(maxWidth: .infinity).clipped()
            VStack(spacing: 0) {
                Color.clear.frame(height: 391)
                DS.Palette.bgSurface
            }
        }
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
                .background(Color(hex: 0x454545, alpha: 0.6), in: Circle())
                .offset(x: 326, y: 61)
                .accessibilityLabel("설정")

            // 내 의자. 누르면 의자 꾸미기로 간다.
            Button {
                chairs.openStudio(fresh: false)
                router.push(.chairStudio)
            } label: {
                Image(chairs.myBig).resizable().scaledToFit()
                    .frame(width: 252, height: 252)
                    .contentShape(Rectangle())
            }
            .buttonStyle(ChairPressStyle())
            .accessibilityLabel("의자 꾸미기, 지금 의자 \(chairs.myKind.name)")
            .offset(x: 69, y: 134)

            temperatureCard
                .offset(x: 24, y: 421)

            shelfCard
                .offset(x: 24, y: 555)
        }
    }

    /// 엉따 온도 카드(342 x 118)
    private var temperatureCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top) {
                MyCardTitle("엉따 온도")
                Spacer()
                Text("39.2°").suit(26, .bold, tracking: -0.52)
                    .foregroundStyle(DS.Palette.accentOrange)
                    .frame(height: 36)
            }
            .frame(height: 36)
            // 막대가 왼쪽에서 오른쪽으로 찬다.
            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: 3).fill(Color(hex: 0x6E767C, alpha: 0.4))
                RoundedRectangle(cornerRadius: 3)
                    .fill(LinearGradient(colors: [DS.Palette.brandPrimary, DS.Palette.accentOrange], startPoint: .leading, endPoint: .trailing))
                    .frame(width: 245)
                    .mask(alignment: .leading) { Rectangle().frame(width: 245 * gauge) }
            }
            .frame(width: 306, height: 6)
            HStack(spacing: 6) {
                Image(ChairStore.thumb(4, 0)).resizable().scaledToFit()
                    .frame(width: 24, height: 24).opacity(0.5)
                Text("0.8° 더 따뜻해지면 새 캐릭터가 열려요").suit(12, .regular, tracking: -0.24)
                    .foregroundStyle(DS.Palette.textSecondary)
            }
            .frame(height: 24)
        }
        .padding(.vertical, 16)
        .padding(.horizontal, 18)
        .frame(width: 342, height: 118, alignment: .topLeading)
        .background(Color(hex: 0x222628, alpha: 0.85), in: RoundedRectangle(cornerRadius: 18))
    }

    /// 업적 편의점 카드(342 x 173). 선반은 옆으로 넘긴다.
    private var shelfCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                MyCardTitle("업적 편의점")
                Spacer()
                Button {
                    withAnimation(DS.Motion.emphasizedDecel) { overlay = .shelf }
                } label: {
                    HStack(spacing: 2) {
                        Text("전체 8").suit(13, .medium).foregroundStyle(DS.Palette.textSecondary)
                        Image("D-icon-chevron-right").renderingMode(.template).resizable()
                            .foregroundStyle(DS.Palette.textSecondary)
                            .frame(width: 14, height: 14).padding(1)
                    }
                    .frame(height: 20)
                    .padding(.vertical, 10)
                    .padding(.leading, 12)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .padding(.vertical, -10)
                .accessibilityLabel("나의 편의점 전체 8종 보기")
            }
            .frame(height: 20)

            ZStack(alignment: .trailing) {
                ScrollView(.horizontal, showsIndicators: false) {
                    MyShelfRow(items: MyShelfData.main, pad: 16, counts: false) { open($0) }
                }
                .frame(width: 324, height: 111)
                LinearGradient(colors: [.black.opacity(0), .black.opacity(0.95)], startPoint: .leading, endPoint: .trailing)
                    .frame(width: 129, height: 111)
                    .allowsHitTesting(false)
            }
            .padding(.trailing, -18)
        }
        .padding(.vertical, 16)
        .padding(.horizontal, 18)
        .frame(width: 342, height: 173, alignment: .topLeading)
        .background(Color(hex: 0x222628, alpha: 0.85))
        .clipShape(RoundedRectangle(cornerRadius: 18))
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
                    VStack(spacing: 0) {
                        RoundedRectangle(cornerRadius: 2).fill(Color(hex: 0x6E767C))
                            .frame(width: 40, height: 4)
                            .padding(.top, 10)
                        content()
                        Spacer(minLength: 0)
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: h, alignment: .top)
                    .background(background, in: UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24))
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
                    .transition(.move(edge: .bottom))
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

/// 아이템 상세(피그마 54). 설명 문구는 던지는 곳이 가운데 테이블이라는 웹 문구, 쿨타임 칩은 쿨타임이 없어져 뺐다.
private struct MyItemSheet: View {
    let item: MyShelfItem
    var body: some View {
        VStack(spacing: 0) {
            Spacer().frame(height: 24)
            Image(item.asset).resizable().scaledToFit()
                .frame(width: 112, height: 112)
                .padding(10)
                .background(.white.opacity(0.06), in: RoundedRectangle(cornerRadius: 28))
            Spacer().frame(height: 16)
            Text(item.name).suit(20, .bold).foregroundStyle(DS.Palette.textPrimary).frame(height: 28)
            Spacer().frame(height: 4)
            HStack(spacing: 4) {
                Text("보유").suit(13, .medium).foregroundStyle(DS.Palette.textSecondary)
                Text("\(item.count)개").suit(13, .bold).foregroundStyle(DS.Palette.brandPrimary)
            }
            .frame(height: 18)
            Spacer().frame(height: 14)
            Text(MyShelfData.itemDesc).suit(14, .regular, lineHeight: 21)
                .foregroundStyle(Color(hex: 0xCCD1D6))
                .multilineTextAlignment(.center)
            Spacer().frame(height: 16)
            Text("라이브 전용").suit(12, .medium).foregroundStyle(Color(hex: 0xCCD1D6))
                .padding(.horizontal, 10).frame(height: 27)
                .background(.white.opacity(0.08), in: RoundedRectangle(cornerRadius: 8))
        }
        .padding(.horizontal, 24)
        .id(item.id)
    }
}

/// 새 의자를 얻었어요 팝업(피그마 1804:20299, 326 x 399).
private struct MySkinModal: View {
    let sit: () -> Void
    let later: () -> Void
    @State private var shown = false

    var body: some View {
        ZStack {
            Color.black.opacity(0.72).ignoresSafeArea()
                .onTapGesture(perform: later)
            VStack(spacing: 20) {
                VStack(spacing: 0) {
                    Text("엉따 39.0°").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.accentOrange)
                        .padding(.horizontal, 10).frame(height: 25)
                        .background(DS.Palette.accentOrange.opacity(0.18), in: Capsule())
                    Image(ChairStore.big(2, 0)).resizable().scaledToFit()
                        .frame(width: 170, height: 170)
                    VStack(spacing: 4) {
                        Text("새 의자를 얻었어요!").suit(20, .bold, tracking: -0.8).foregroundStyle(DS.Palette.textPrimary)
                            .frame(height: 28)
                        Text("‘푹신한 가죽 소파’를 획득했어요").suit(14, .regular, tracking: -0.56)
                            .foregroundStyle(DS.Palette.textSecondary).frame(height: 20)
                    }
                }
                VStack(spacing: 12) {
                    Button(action: sit) {
                        Text("지금 앉아보기").suit(16, .bold, tracking: -0.64).foregroundStyle(.black)
                            .frame(width: 278, height: 46)
                            .background(DS.Palette.brandPrimary, in: Capsule())
                    }
                    .buttonStyle(ChairPressStyle())
                    Button(action: later) {
                        Text("나중에 할게요").suit(13, .medium, tracking: -0.52).foregroundStyle(DS.Palette.textTertiary)
                            .frame(height: 18).padding(.horizontal, 20).contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.top, 32).padding(.horizontal, 24).padding(.bottom, 24)
            .frame(width: 326)
            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 28))
            .scaleEffect(shown ? 1 : 0.92)
            .opacity(shown ? 1 : 0)
        }
        .onAppear { withAnimation(DS.Motion.decel(0.25)) { shown = true } }
    }
}
