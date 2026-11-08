import Observation
import SwiftUI

/// 현장 모드 방의 상태. 팀 피그마 "주전부리 · 퀵슬롯 (기본)"(1807:23107)과 웹 프로토타입 동작을 따른다.
@Observable
final class RoomModel {
    // 해 뜨기 시계: 화면에는 20:00에서 00:00까지 줄어들고, 실제로는 3분(180초)에 끝난다.
    static let shownSeconds: Double = 20 * 60
    static let realSeconds: Double = 180

    struct Snack: Identifiable, Hashable {
        let id: String
        let name: String
        let asset: String
        var count: Int
    }

    struct Seat: Identifiable, Hashable {
        let id: String
        let name: String
        // 피그마 390 x 844 화면 좌표(이름표 자리)
        let x: CGFloat
        let y: CGFloat
        let isMe: Bool
    }

    struct Landed: Identifiable {
        let id = UUID()
        let asset: String
        let point: CGPoint
        let angle: Double
    }

    struct ChatLine: Identifiable, Hashable {
        let id = UUID()
        let name: String
        let text: String
        let opacity: Double
    }

    var startedAt = Date()
    var bannerOpen = false
    // 방에 처음 들어오면 퀵슬롯은 접혀 있다(피그마 1807:23214 "주전부리 · 퀵슬롯 (접힘)").
    var dockOpen = false
    /// 대화 흐름 단계. 0은 들어온 직후(피그마 1807:23214), 1은 이야기가 무르익은 뒤(1807:22997, 1971:21253).
    var stage = 0
    var speaker: String = "새벽2시 피시방"
    var landed: [Landed] = []
    var myChats: [String] = ["나만 예민한 거 아니지?"]

    var snacks: [Snack] = [
        .init(id: "shrimp", name: "새우깡", asset: "snack-shrimp", count: 5),
        .init(id: "soju", name: "소주", asset: "snack-soju", count: 2),
        .init(id: "peanut", name: "오징어땅콩", asset: "snack-peanut", count: 3),
        .init(id: "nogari", name: "노가리", asset: "snack-nogari", count: 1),
        .init(id: "drrra", name: "DRRRA", asset: "snack-drrra", count: 4),
        .init(id: "squid", name: "오징어", asset: "snack-squid", count: 2),
        .init(id: "monster", name: "몬스타", asset: "snack-monster", count: 1),
    ]

    /// 접힌 퀵슬롯 알약에 겹쳐 보이는 세 개(피그마 1807:23214 순서)
    var pillSnacks: [Snack] {
        ["shrimp", "drrra", "soju"].compactMap { id in snacks.first { $0.id == id } }
    }

    let seats: [Seat] = [
        .init(id: "truth", name: "진실의 의자10", x: 27, y: 389, isMe: false),
        .init(id: "stool", name: "딱딱한 나무 스툴12", x: 107, y: 375, isMe: false),
        .init(id: "pcbang", name: "새벽2시 피시방", x: 227, y: 324, isMe: false),
        .init(id: "cold", name: "차가운 새벽의자92", x: 305, y: 389, isMe: false),
    ]

    let chats: [ChatLine] = [
        .init(name: "진실의 의자10", text: "엥? 미친거 아님?", opacity: 0.4),
        .init(name: "딱딱한 나무 스툴12", text: "걍 싸우자는 거인듯 ㅋㅋ", opacity: 0.8),
        .init(name: "새벽2시 피시방", text: "나도 비슷한 일 있었음.. 그거 완전 여우짓임", opacity: 1),
    ]

    /// 들어온 직후의 대화(피그마 1807:23214)
    let openingChats: [ChatLine] = [
        .init(name: "진실의 의자10", text: "잼얘 없음?", opacity: 0.8),
        .init(name: "차가운 새벽의자92", text: "님선 ㄱㄱ", opacity: 1),
    ]

    var visibleChats: [ChatLine] {
        stage == 0 ? openingChats : chats
    }

    var visibleMine: [String] {
        stage == 0 ? ["아니 오늘 나 뭔일 있었냐면"] : myChats
    }

    var topicShort = "친구가 썸남 앞에서 내 쌍밍아웃함. 셋이…"
    var topicBody = "친구가 썸남 앞에서 내 쌍밍아웃함. 셋이 떡볶이 먹으러 가고 있었는데 나보고 볼 때마다 00이 쌍수 참 예쁘게 잘되지 않았냐고 그러는거야. 걔 완전 미친거 아니야? 하.."
    var topicTags = ["#가족관계", "#가정사"]

    /// 던진 주전부리가 떨어지는 자리. 혼자 방은 장면 속 흰 테이블 위로 바꾼다.
    var landRect: CGRect = RoomModel.tableLand

    /// 혼자 드르륵 방(피그마 1647:25199, 1647:25052, 1647:24874). 고민 글과 AI가 읽은 맥락이 다르다.
    static func solo() -> RoomModel {
        let m = RoomModel()
        m.topicShort = "오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가…"
        m.topicBody = "오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가 인스타 게시글에 자기 얼굴만 보정을 해서 올렸더라고.. 다들 엄청 이쁘다고 비교된다는 식으로 댓글 달리는데 너무 속상해..."
        m.topicTags = ["#친구관계", "#외모고민"]
        m.snacks = [
            .init(id: "shrimp", name: "새우깡", asset: "snack-shrimp", count: 5),
            .init(id: "soju", name: "소주", asset: "snack-soju", count: 2),
            .init(id: "peanut", name: "오징어땅콩", asset: "snack-peanut", count: 3),
            .init(id: "nogari", name: "노가리", asset: "snack-nogari", count: 1),
            .init(id: "drrra", name: "DRRRA", asset: "snack-drrra", count: 4),
            .init(id: "squid", name: "오징어", asset: "snack-squid", count: 2),
            .init(id: "monster", name: "몬스타", asset: "snack-monster", count: 1),
        ]
        // 혼자 방 장면(B-field-scene)의 흰 테이블 윗면, 피그마 화면 좌표
        m.landRect = CGRect(x: 120, y: 492, width: 130, height: 26)
        return m
    }

    // 테이블(피그마 화면 좌표): 놓을 수 있는 자리와 떨어지는 자리
    static let tableDrop = CGRect(x: 120, y: 440, width: 150, height: 120)
    static let tableLand = CGRect(x: 150, y: 462, width: 90, height: 30)

    func remaining(at date: Date) -> Double {
        let real = date.timeIntervalSince(startedAt)
        return max(0, Self.shownSeconds - real * (Self.shownSeconds / Self.realSeconds))
    }

    func clockText(at date: Date) -> String {
        let s = Int(remaining(at: date).rounded(.up))
        return String(format: "%02d:%02d", s / 60, s % 60)
    }

    /// 말하는 사람은 마이크를 쓰는 다른 사람 중에서 돌아가며 바뀐다(나는 빠진다).
    func nextSpeaker() {
        let pool = seats.filter { !$0.isMe && $0.name != speaker }
        if let next = pool.randomElement() {
            speaker = next.name
        }
    }

    func canThrow(_ snack: Snack) -> Bool {
        snack.count > 0
    }

    func throwSnack(_ id: String) -> Landed? {
        guard let i = snacks.firstIndex(where: { $0.id == id }), snacks[i].count > 0 else { return nil }
        snacks[i].count -= 1
        let r = landRect
        let p = CGPoint(x: .random(in: r.minX ... r.maxX), y: .random(in: r.minY ... r.maxY))
        let item = Landed(asset: snacks[i].asset, point: p, angle: .random(in: -14 ... 14))
        landed.append(item)
        return item
    }

    func removeLanded(_ id: UUID) {
        landed.removeAll { $0.id == id }
    }
}
