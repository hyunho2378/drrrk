import Observation
import SwiftUI

/// 함께 드르륵 방 채팅이 하나둘씩 달린다(11. 10. 팀 요청 "함께드르륵 대화 시작할때 하나둘씩 대화 달리는 느낌으로").
/// 방에 들어오면 채팅 칸은 비어 있고, 0.8초 뒤 첫 줄, 다음 줄은 1.3초에서 2.0초 사이 간격으로 장면의 기존 순서(위에서 아래로)대로 나타난다.
/// 간격은 시작 값 1110으로 고정한 같은 수열(WatchFeed.Random)이라 웹 client/src/app/roomChat.js와 같은 순서와 간격을 낸다.
/// 채팅 시계는 방 화면(현장 모드, 일반 모드)이 보이고 온보딩 덮개가 없을 때만 흐른다. 덮개가 닫히면 0.8초 뒤 첫 줄부터 시작한다.
/// 같은 방 안에서 일반 모드로 갔다 오거나 미니프로필을 열었다 닫아도 이미 나온 줄 수는 남는다. 방을 나갔다가 새로 들어오면 다시 비어 있는 상태로 시작한다.
@MainActor
@Observable
final class RoomChat {
    static let shared = RoomChat()

    static let firstDelay: Double = 0.8
    static let minGap: Double = 1.3
    static let maxGap: Double = 2.0
    static let seed: UInt32 = 1110
    static let tick: Double = 0.1
    /// 줄이 아래에서 8 올라오며 옅게 나타나는 움직임 220ms, 표준 곡선(웹 roomChat.js moveMs, rise와 같다)
    static let motion = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.22)
    static let rise: CGFloat = 8

    /// 지금 방에서 나온 줄 수. 화면은 장면 채팅 줄 중 앞에서 이만큼만 그린다.
    private(set) var shown = 0

    @ObservationIgnored private var owner: ObjectIdentifier?
    @ObservationIgnored private var random = WatchFeed.Random(state: RoomChat.seed)
    @ObservationIgnored private var due: [Double] = []
    @ObservationIgnored private var clock: Double = 0

    /// 현장 모드 방이 나타날 때. 다른 방(새 RoomModel)이면 비우고 새로 시작한다. 새로 시작했으면 true.
    @discardableResult
    func enter(_ room: RoomModel) -> Bool {
        let id = ObjectIdentifier(room)
        if owner == id { return false }
        owner = id
        shown = 0
        clock = 0
        due = []
        random = WatchFeed.Random(state: Self.seed)
        return true
    }

    /// 일반 모드가 나타날 때. 현장 모드에서 넘어왔으면 그 방을 이어 가고, 진행 중인 방이 없을 때만 새로 시작한다.
    func join(_ room: RoomModel) {
        if owner == nil { enter(room) }
    }

    /// 방을 나갔을 때(현장 모드 방이 길에서 빠졌을 때).
    func leave() {
        owner = nil
    }

    /// i번째 줄이 나타나는 채팅 시계 값(초). 필요할 때 차례로 만든다(같은 수열).
    private func dueOf(_ i: Int) -> Double {
        while due.count <= i {
            let k = due.count
            due.append(k == 0 ? Self.firstDelay : due[k - 1] + Self.minGap + random.next() * (Self.maxGap - Self.minGap))
        }
        return due[i]
    }

    /// 채팅 시계를 돌린다. 화면의 .task에서 부르고, 화면이 사라지거나 덮개가 뜨면 작업이 취소되어 시계가 멈춘다.
    /// limit은 지금 화면이 그릴 수 있는 장면 줄 수(단계가 바뀌면 달라진다).
    func run(limit: @escaping () -> Int) async {
        var last = Date()
        while !Task.isCancelled {
            let now = Date()
            clock += now.timeIntervalSince(last)
            last = now
            while shown < limit(), clock >= dueOf(shown) {
                withAnimation(Self.motion) { shown += 1 }
            }
            try? await Task.sleep(for: .seconds(Self.tick))
        }
    }
}
