import SwiftUI
import UIKit

// 온보딩 카드 부품 공용 도구. 위쪽 Visual(326 x 220)은 그림 한 장이 아니라 팀 피그마 Visual 프레임 안의 부품을
// 하나씩 뷰로 옮겨 그린다(함께 드르륵 1829:11174, 1955:12292, 1829:11275, 11323, 11366 / 혼자 드르륵 1647:22976, 23028).
// 움직임은 offset, opacity, scale, rotation만 쓰고, 동작 줄이기를 켠 사람에게는 마지막 모습만 바로 보여 준다.

/// 온보딩 움직임 곡선. 웹 motion 값(Material 3)과 같은 두 곡선만 쓴다.
enum ObMotion {
    /// 부품 등장(0.05, 0.7, 0.1, 1), 360ms
    static let enter = Animation.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.36)
    /// 글 어절 등장, 260ms
    static let text = Animation.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.26)
    /// 짧은 상태 변화(0.2, 0, 0, 1), 180ms
    static let quick = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.18)
    /// 나가는 글, 120ms
    static let fadeOut = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.12)
    /// 튕기며 나타나는 아바타와 아이콘
    static let pop = Animation.spring(response: 0.36, dampingFraction: 0.62)

    static func decel(_ seconds: Double) -> Animation {
        .timingCurve(0.05, 0.7, 0.1, 1, duration: seconds)
    }

    static func standard(_ seconds: Double) -> Animation {
        .timingCurve(0.2, 0, 0, 1, duration: seconds)
    }
}

/// 피그마 Visual 안의 Dev Mode 값(그림자 0, 6, blur 16, #000 12%)
extension View {
    func obShadow() -> some View {
        shadow(color: DS.Palette.bgBase.opacity(0.12), radius: 8, x: 0, y: 6)
    }

    /// 보이기 전 상태(밀림, 크기, 투명)에서 마지막 자리로 들어온다. 동작 줄이기면 바로 마지막 자리에 둔다.
    func obEnter(
        _ shown: Bool,
        _ delay: Double,
        dx: CGFloat = 0,
        dy: CGFloat = 0,
        sx: CGFloat = 1,
        sy: CGFloat = 1,
        anchor: UnitPoint = .center,
        animation: Animation = ObMotion.enter
    ) -> some View {
        modifier(ObEnter(shown: shown, delay: delay, dx: dx, dy: dy, sx: sx, sy: sy, anchor: anchor, animation: animation))
    }

    func obEnter(_ shown: Bool, _ delay: Double, scale: CGFloat, dx: CGFloat = 0, dy: CGFloat = 0, animation: Animation = ObMotion.enter) -> some View {
        modifier(ObEnter(shown: shown, delay: delay, dx: dx, dy: dy, sx: scale, sy: scale, anchor: .center, animation: animation))
    }
}

struct ObEnter: ViewModifier {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let shown: Bool
    let delay: Double
    let dx: CGFloat
    let dy: CGFloat
    let sx: CGFloat
    let sy: CGFloat
    let anchor: UnitPoint
    let animation: Animation

    func body(content: Content) -> some View {
        content
            .scaleEffect(x: shown ? 1 : sx, y: shown ? 1 : sy, anchor: anchor)
            .offset(x: shown ? 0 : dx, y: shown ? 0 : dy)
            .opacity(shown ? 1 : 0)
            .animation(reduceMotion ? nil : animation.delay(delay), value: shown)
    }
}

/// 잠깐 기다림. 뷰가 사라져 Task가 취소되면 false를 돌려준다.
func obWait(_ seconds: Double) async -> Bool {
    do {
        try await Task.sleep(for: .seconds(seconds))
        return true
    } catch {
        return false
    }
}

// MARK: - 흰 패널(48, 44, 230 x 200, 반경 18)

struct ObPanel<Content: View>: View {
    var shadow = true
    @ViewBuilder var content: () -> Content

    var body: some View {
        ZStack(alignment: .topLeading) { content() }
            .frame(width: 230, height: 200, alignment: .topLeading)
            .background(DS.Palette.textPrimary, in: RoundedRectangle(cornerRadius: 18))
            .shadow(color: DS.Palette.bgBase.opacity(shadow ? 0.12 : 0), radius: 8, x: 0, y: 6)
    }
}

// MARK: - 스켈레톤(피그마 skel, #9AA1A6 28%)

/// 회색 막대 위로 밝은 띠가 왼쪽에서 오른쪽으로 1.4초마다 지나간다.
struct ObSkeleton: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let width: CGFloat
    let height: CGFloat
    let radius: CGFloat
    /// 반짝임 시작까지 기다리는 시간(뷰가 나타난 때부터)
    var shimmerDelay: Double = 0.6
    @State private var sweep = false

    var body: some View {
        let band = max(36, width * 0.55)
        RoundedRectangle(cornerRadius: radius)
            .fill(DS.Palette.textSecondary.opacity(0.28))
            .overlay {
                if !reduceMotion {
                    LinearGradient(
                        colors: [DS.Palette.textPrimary.opacity(0), DS.Palette.textPrimary.opacity(0.75), DS.Palette.textPrimary.opacity(0)],
                        startPoint: .leading, endPoint: .trailing
                    )
                    .frame(width: band)
                    .offset(x: sweep ? (width + band) / 2 : -(width + band) / 2)
                    .animation(sweep ? ObMotion.standard(1.4).repeatForever(autoreverses: false) : nil, value: sweep)
                }
            }
            .frame(width: width, height: height)
            .clipShape(RoundedRectangle(cornerRadius: radius))
            .task {
                guard !reduceMotion, await obWait(shimmerDelay) else { return }
                sweep = true
            }
    }
}

// MARK: - 아바타(원 안의 의자 그림)

/// 그림이 뜨기 전에는 회색 원이 반짝이고, 뜨면 80ms 페이드로 바뀐다.
struct ObAvatar: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let asset: String
    let size: CGFloat
    var imageDelay: Double = 0.2
    @State private var loaded = false

    var body: some View {
        ZStack {
            ObSkeleton(width: size, height: size, radius: size / 2, shimmerDelay: 0)
                .opacity(loaded ? 0 : 1)
            ZStack {
                Circle().fill(DS.Palette.bgSurface)
                Image(asset).resizable().scaledToFill()
                    .frame(width: size, height: size)
                    .clipShape(Circle())
            }
            .opacity(loaded ? 1 : 0)
        }
        .frame(width: size, height: size)
        .animation(reduceMotion ? nil : ObMotion.standard(0.08), value: loaded)
        .task {
            if reduceMotion {
                loaded = true
                return
            }
            guard await obWait(imageDelay) else { return }
            loaded = true
        }
    }
}

// MARK: - 칩(아이콘 + 굵은 글자, 그림자)

struct ObChip<Icon: View>: View {
    let label: String
    let fontSize: CGFloat
    let dark: Bool
    let width: CGFloat
    let height: CGFloat
    /// 상태 글 맥박(opacity 0.5와 1 사이, 한 바퀴 1.6초)
    var labelPulse = false
    @ViewBuilder var icon: () -> Icon

    var body: some View {
        HStack(spacing: 6) {
            icon()
            Text(label).suit(fontSize, .bold)
                .foregroundStyle(dark ? DS.Palette.textPrimary : DS.Palette.bgSurface)
                .fixedSize()
                .opacity(labelPulse ? 0.5 : 1)
                .animation(labelPulse ? ObMotion.standard(0.8).repeatForever(autoreverses: true) : ObMotion.quick, value: labelPulse)
        }
        .padding(.leading, 12)
        .frame(width: width, height: height, alignment: .leading)
        .background(dark ? DS.Palette.bgSurface : DS.Palette.textPrimary, in: Capsule())
        .obShadow()
    }
}

/// 칩 안 아이콘이 한 번 -8도로 기울었다 돌아온다(360ms).
struct ObTiltIcon: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let asset: String
    let size: CGFloat
    let delay: Double
    @State private var tilt = 0

    var body: some View {
        Image(asset).resizable().frame(width: size, height: size)
            .keyframeAnimator(initialValue: 0.0, trigger: tilt) { view, angle in
                view.rotationEffect(.degrees(angle))
            } keyframes: { _ in
                CubicKeyframe(-8, duration: 0.18)
                CubicKeyframe(0, duration: 0.18)
            }
            .task {
                guard !reduceMotion, await obWait(delay) else { return }
                tilt += 1
            }
    }
}

/// 한 번 살짝 튕긴다(누를 때 반응, 끝나는 순간 강조).
struct ObBounce: ViewModifier {
    let trigger: Int
    let peak: CGFloat
    var up: Double = 0.09
    var down: Double = 0.09

    func body(content: Content) -> some View {
        content.keyframeAnimator(initialValue: CGFloat(1), trigger: trigger) { view, scale in
            view.scaleEffect(scale)
        } keyframes: { _ in
            CubicKeyframe(peak, duration: up)
            CubicKeyframe(1, duration: down)
        }
    }
}

extension View {
    func obBounce(_ trigger: Int, peak: CGFloat = 1.12, up: Double = 0.09, down: Double = 0.09) -> some View {
        modifier(ObBounce(trigger: trigger, peak: peak, up: up, down: down))
    }
}

/// 출발점에서 포물선을 그리며 지금 자리로 날아온다. t가 0이면 출발점, 1이면 제자리.
struct ObArc: GeometryEffect {
    var t: CGFloat
    let dx: CGFloat
    let dy: CGFloat
    let lift: CGFloat

    var animatableData: CGFloat {
        get { t }
        set { t = newValue }
    }

    func effectValue(size: CGSize) -> ProjectionTransform {
        let x = dx * (1 - t)
        let y = dy * (1 - t) - lift * 4 * t * (1 - t)
        return ProjectionTransform(CGAffineTransform(translationX: x, y: y))
    }
}

// MARK: - 카드 글(제목 줄과 어절 쪼개기)

/// 제목은 줄마다 고정 가로줄, 줄 안은 어절 조각으로 나눠 아래에서 4pt 올라오며 나타난다(어절 45ms, 줄 90ms 시차, 260ms).
/// 부제는 제목이 끝난 뒤 한 덩이로 올라온다. 글자 값은 팀 문구 그대로이고 보여 주는 방식만 나눈다.
struct ObSplitText: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    let title: String
    let sub: String
    let forward: Bool
    @State private var shown = false

    private static let startDelay = 0.08
    private static let wordGap = 0.045
    private static let lineGap = 0.09

    private static func lastDelay(_ lines: [[String]]) -> Double {
        var latest = 0.0
        for (li, words) in lines.enumerated() {
            let wordCount = Double(max(0, words.count - 1))
            latest = max(latest, startDelay + Double(li) * lineGap + wordCount * wordGap)
        }
        return latest
    }

    var body: some View {
        let lines = title.components(separatedBy: "\n").map { $0.split(separator: " ").map(String.init) }
        let lastWordDelay = Self.lastDelay(lines)
        let side: CGFloat = forward ? 4 : -4
        VStack(spacing: 8) {
            VStack(spacing: 0) {
                ForEach(Array(lines.enumerated()), id: \.offset) { li, words in
                    HStack(spacing: 0) {
                        ForEach(Array(words.enumerated()), id: \.offset) { wi, word in
                            Text(wi < words.count - 1 ? word + " " : word)
                                .suit(16, .bold, tracking: -0.64)
                                .foregroundStyle(DS.Palette.bgSurface)
                                .fixedSize()
                                .obEnter(shown, Self.startDelay + Double(li) * Self.lineGap + Double(wi) * Self.wordGap,
                                         dx: side, dy: 4, animation: ObMotion.text)
                        }
                    }
                    .frame(height: 22.4)
                }
            }
            .accessibilityElement(children: .ignore)
            .accessibilityLabel(title.replacingOccurrences(of: "\n", with: " "))
            .accessibilityAddTraits(.isHeader)
            Text(sub).suit(12, .regular, tracking: -0.48)
                .multilineTextAlignment(.center)
                .foregroundStyle(DS.Palette.textTertiary)
                .fixedSize()
                .obEnter(shown, lastWordDelay + 0.2, dy: 4, animation: ObMotion.text)
        }
        .task { shown = true }
    }
}

// MARK: - 닫기 X(눌림 반응과 함께 90도 돌며 사라진다)

struct ObCloseButton: View {
    let action: () -> Void
    @State private var spun = false

    var body: some View {
        Button {
            withAnimation(ObMotion.quick) { spun = true }
            action()
        } label: {
            Path { p in
                p.move(to: CGPoint(x: 6, y: 6)); p.addLine(to: CGPoint(x: 18, y: 18))
                p.move(to: CGPoint(x: 18, y: 6)); p.addLine(to: CGPoint(x: 6, y: 18))
            }
            .stroke(DS.Palette.textPrimary, style: StrokeStyle(lineWidth: 2, lineCap: .round))
            .frame(width: 24, height: 24)
            .rotationEffect(.degrees(spun ? 90 : 0))
            .opacity(spun ? 0 : 1)
            .frame(width: 44, height: 44)
            .contentShape(Rectangle())
        }
        .buttonStyle(PressStyle())
        .accessibilityLabel("닫기")
    }
}
