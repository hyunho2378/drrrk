import Observation
import SwiftUI

/// 카테고리 탭 "연애" 옆 빨간 점. 라이브 점과 커뮤니티 점은 따로 지워진다.
/// 라이브에서 연애를 열면 라이브 점만, 커뮤니티에서 연애를 열면 커뮤니티 점만 사라진다.
/// 앱이 켜져 있는 동안만 기억하고 저장하지 않는다(앱을 다시 켜면 두 점이 다시 보인다. 웹의 탭 세션 유지와 같다).
@Observable
final class LoveDotStore {
    static let shared = LoveDotStore()

    var liveLoveSeen = false
    var communityLoveSeen = false

    /// 점이 사라지는 움직임(웹 my.js attachTabs와 같은 값): 0.16초 뒤 0.32초 동안 작아지며 옅어진다.
    static let hide = Animation.timingCurve(0.3, 0, 0.8, 0.15, duration: 0.32).delay(0.16)
    static let transition: AnyTransition = .scale(scale: 0.3).combined(with: .opacity)

    func markLive() {
        guard !liveLoveSeen else { return }
        withAnimation(Self.hide) { liveLoveSeen = true }
    }

    func markCommunity() {
        guard !communityLoveSeen else { return }
        withAnimation(Self.hide) { communityLoveSeen = true }
    }
}
