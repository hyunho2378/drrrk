import SwiftUI

// 디자인 토큰. 값과 이름은 팀 피그마 변수(DRRRK / Color Dark)와 웹 프로토타입 tokens.css를 그대로 옮겼다.
// 화면 코드에서는 숫자나 색을 직접 쓰지 않고 이 이름만 쓴다.

extension Color {
    init(hex: UInt32, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: alpha
        )
    }
}

enum DS {
    enum Palette {
        static let bgBase = Color(hex: 0x000000)
        static let bgSurface = Color(hex: 0x121415)
        static let bgElevated = Color(hex: 0x222628)
        static let bgOverlay = Color(hex: 0x0A0B0C)
        static let textPrimary = Color(hex: 0xF8F8F8)
        static let textSecondary = Color(hex: 0x9AA1A6)
        static let textTertiary = Color(hex: 0x6E767C)
        static let brandPrimary = Color(hex: 0x36D2FF)
        static let brandSubtle = Color(hex: 0x06303C)
        static let danger = Color(hex: 0xFF4D6A)
        static let success = Color(hex: 0x2EE59D)
        static let warning = Color(hex: 0xFFC93C)
        static let accentOrange = Color(hex: 0xFF9A4D)
        static let accentYellow = Color(hex: 0xFFC24D)
        static let gray800 = Color(hex: 0x30363A)
    }

    enum Radius {
        static let chip: CGFloat = 12
        static let bubble: CGFloat = 14
        static let card: CGFloat = 16
        static let pill: CGFloat = 20
        static let input: CGFloat = 32
    }

    /// 움직임. 웹 프로토타입 motion 값(Material 3 곡선)을 그대로 쓴다.
    enum Motion {
        static let standard = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.3)
        static let emphasizedDecel = Animation.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.52)
        static let emphasizedAccel = Animation.timingCurve(0.3, 0, 0.8, 0.15, duration: 0.36)
        static let banner = Animation.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.3)
        static let stateIn = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.15)
        static let press = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.1)
        static func decel(_ seconds: Double) -> Animation {
            .timingCurve(0.05, 0.7, 0.1, 1, duration: seconds)
        }
    }
}

/// SUIT 글꼴. 피그마 글자 값(크기, 굵기, 자간 px)을 그대로 받는다.
enum SUITWeight: String {
    case regular = "SUIT-Regular"
    case medium = "SUIT-Medium"
    case semibold = "SUIT-SemiBold"
    case bold = "SUIT-Bold"
    case extrabold = "SUIT-ExtraBold"
    case heavy = "SUIT-Heavy"
}

struct SUITText: ViewModifier {
    let size: CGFloat
    let weight: SUITWeight
    let tracking: CGFloat
    let lineHeight: CGFloat?

    func body(content: Content) -> some View {
        content
            .font(.custom(weight.rawValue, fixedSize: size))
            .tracking(tracking)
            .lineSpacing(lineHeight.map { max(0, $0 - size * 1.25) } ?? 0)
    }
}

extension View {
    func suit(_ size: CGFloat, _ weight: SUITWeight = .medium, tracking: CGFloat = 0, lineHeight: CGFloat? = nil) -> some View {
        modifier(SUITText(size: size, weight: weight, tracking: tracking, lineHeight: lineHeight))
    }
}
