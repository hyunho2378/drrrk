import Observation
import SwiftUI

// 종료(RoomEndView)와 아침(RoomMorningView)의 움직임. 웹 client/src/app/reportMotion.js와 같은 시간과 거리다.
// 1) 엉따 온도 막대: 화면에 보이는 순간 왼쪽에서 오른쪽으로 1.0초 동안 찬다(의정 1647:26876 "왼쪽에서 게이지 차는 듯한 모션").
//    처음부터 보이면 입장 0.2초 뒤, 스크롤 아래에 있으면 화면에 들어오는 순간 시작한다. 곡선은 마이 막대와 같은 decel(0.05, 0.7, 0.1, 1).
// 2) 종료만: 내용 덩어리가 화면 아래 80pt 안으로 들어오는 순간 아래에서 16pt 올라오며 옅게 나타난다(420ms, 표준 곡선).
//    덩어리 안의 줄은 60ms 간격으로 이어진다. 처음 보이는 덩어리는 입장 0.1초 뒤부터 시작한다. 한 번 나온 덩어리는 다시 숨지 않는다.
//    (의정 1647:26726 "스크롤 내리면서 촤라락 펼쳐지는 모션")
// 줄인 움직임 설정이면 막대와 덩어리 모두 처음부터 다 보인다.

enum ReportMotion {
    static let rowDuration = 0.42
    static let rowRise: CGFloat = 16
    static let rowGap = 0.06
    static let firstDelay = 0.1
    static let enterBand: CGFloat = 80
    static let gaugeDelay = 0.2
    static let gaugeDuration = 1.0
    /// 결과 화면 스크롤 칸의 좌표 이름(칸 위끝이 0)
    static let space = "reportScroll"
    static var rowAnimation: Animation {
        .timingCurve(0.2, 0, 0, 1, duration: rowDuration)
    }
}

/// 종료 화면의 덩어리 펼침 순서를 잡는다. 덩어리 번호 x 100 + 줄 번호를 열쇠로 쓴다.
@MainActor
@Observable
final class EndReveal {
    private(set) var shown: Set<Int> = []
    let reduceMotion: Bool
    @ObservationIgnored private var started: Set<Int> = []
    @ObservationIgnored private var nextAt: Date = .distantPast
    @ObservationIgnored private let entered = Date()

    init(reduceMotion: Bool) {
        self.reduceMotion = reduceMotion
    }

    func isShown(block: Int, row: Int) -> Bool {
        reduceMotion || shown.contains(block * 100 + row)
    }

    /// 덩어리가 화면에 들어왔다. 처음 한 번만 줄을 차례로 띄운다.
    func reach(block: Int, rows: Int) {
        guard !reduceMotion, !started.contains(block) else { return }
        started.insert(block)
        let now = Date()
        let base = max(now, entered.addingTimeInterval(ReportMotion.firstDelay), nextAt)
        nextAt = base.addingTimeInterval(Double(rows) * ReportMotion.rowGap)
        for row in 0 ..< rows {
            let delay = base.timeIntervalSince(now) + Double(row) * ReportMotion.rowGap
            Task { @MainActor [weak self] in
                try? await Task.sleep(for: .seconds(max(0, delay)))
                withAnimation(ReportMotion.rowAnimation) { _ = self?.shown.insert(block * 100 + row) }
            }
        }
    }
}

private struct EndRevealKey: EnvironmentKey {
    static let defaultValue: EndReveal? = nil
}

private struct ReportViewportKey: EnvironmentKey {
    static let defaultValue: CGFloat = 844
}

extension EnvironmentValues {
    /// 종료 화면에서만 들어 있다. 아침과 오늘 나눈 대화에서는 nil이라 줄이 바로 보인다.
    var endReveal: EndReveal? {
        get { self[EndRevealKey.self] }
        set { self[EndRevealKey.self] = newValue }
    }

    /// 결과 화면 스크롤 칸의 보이는 높이
    var reportViewportHeight: CGFloat {
        get { self[ReportViewportKey.self] }
        set { self[ReportViewportKey.self] = newValue }
    }
}

/// 스크롤 칸 안에서 이 뷰의 위끝(칸 기준)을 잰다. 처음 그려질 때와 스크롤할 때마다 알린다.
private struct TopReader: ViewModifier {
    let onTop: (CGFloat) -> Void
    func body(content: Content) -> some View {
        content.background(
            GeometryReader { g in
                let top = g.frame(in: .named(ReportMotion.space)).minY
                Color.clear
                    .onAppear { onTop(top) }
                    .onChange(of: top) { _, y in onTop(y) }
            }
        )
    }
}

/// 덩어리: 위끝이 화면 아래 80pt 안으로 들어오면 펼침을 시작한다.
private struct EndBlock: ViewModifier {
    let block: Int
    let rows: Int
    @Environment(\.endReveal) private var reveal
    @Environment(\.reportViewportHeight) private var viewH
    func body(content: Content) -> some View {
        if let reveal {
            content.modifier(TopReader { y in
                if y < viewH - ReportMotion.enterBand { reveal.reach(block: block, rows: rows) }
            })
        } else {
            content
        }
    }
}

/// 줄: 펼쳐지기 전에는 16pt 아래에서 투명하다.
private struct EndRow: ViewModifier {
    let block: Int
    let row: Int
    @Environment(\.endReveal) private var reveal
    func body(content: Content) -> some View {
        let on = reveal?.isShown(block: block, row: row) ?? true
        content.opacity(on ? 1 : 0).offset(y: on ? 0 : ReportMotion.rowRise)
    }
}

extension View {
    func endBlock(_ block: Int, rows: Int) -> some View {
        modifier(EndBlock(block: block, rows: rows))
    }

    func endRow(_ block: Int, _ row: Int) -> some View {
        modifier(EndRow(block: block, row: row))
    }
}

/// 엉따 온도 막대 채움(0에서 1). 막대가 화면에 들어오는 순간 한 번 찬다.
struct GaugeFill: ViewModifier {
    @Binding var fill: CGFloat
    @Environment(\.reportViewportHeight) private var viewH
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var appeared: Date?
    func body(content: Content) -> some View {
        content.modifier(TopReader { y in
            if appeared == nil { appeared = Date() }
            guard fill < 1, y < viewH else { return }
            if reduceMotion { fill = 1; return }
            let first = Date().timeIntervalSince(appeared ?? Date()) < 0.05
            withAnimation(DS.Motion.decel(ReportMotion.gaugeDuration).delay(first ? ReportMotion.gaugeDelay : 0)) { fill = 1 }
        })
    }
}
