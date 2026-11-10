import Foundation

/// 방 구경 시계를 방 시계로 이어 준다(11/10 팀원 피드백 "라이브 누르기 전 타이머-앉기 눌렀을때 타이머 연동해야함").
/// 방 구경(LiveWatchView)에서 앉기를 누르는 순간의 시계 값과 시각을 맡기고, 방(RoomModel.field)이 그 값과 시각에서 같은 빠르기로 이어 줄인다.
/// 한 번 쓰면 비운다. 홈 흐름처럼 맡긴 값이 없으면 방은 20:00에서 시작한다. 웹 client/src/app/roomClockHandoff.js와 같은 규칙이다.
enum RoomClockHandoff {
    /// 맡긴 값이 이 시간(초) 안에 방에서 쓰이지 않으면 버린다.
    static let keepSeconds: TimeInterval = 10
    /// 방에 들어온 직후와 앞 단계 전환 직후에는 이 시간(초)이 지나야 다음 단계(해 뜨기 1분 전, 끝)로 넘어간다.
    /// 이어받은 값이 이미 1분 아래이면 들어오자마자 넘어가지 않고 약 3초 뒤에 넘어간다(웹 STEP_GRACE_MS 3000).
    static let graceSeconds: TimeInterval = 3

    nonisolated(unsafe) private static var hand: (left: Double, at: Date)?

    static func give(left: Double, at: Date = .now) {
        hand = (max(0, left), at)
    }

    /// 방 시계 시작 값과 시작 시각. 맡긴 값이 있으면 꺼내고 비운다.
    static func take() -> (left: Double, at: Date)? {
        defer { hand = nil }
        guard let h = hand, Date.now.timeIntervalSince(h.at) <= keepSeconds else { return nil }
        return h
    }
}
