import Observation
import SwiftUI

/// 현장 모드 방의 상태. 팀 피그마 "주전부리 · 퀵슬롯 (기본)"(1979:27515)과 웹 프로토타입 동작을 따른다.
@Observable
final class RoomModel {
    // 해 뜨기 시계: 화면에는 20:00에서 00:00까지 줄어들고, 실제로는 1분(60초)에 끝난다(웹 tokens.js realRoomSeconds와 같은 값).
    static let shownSeconds: Double = 20 * 60
    static let realSeconds: Double = 60
    /// 화면 시계가 01:12에 닿으면 해 뜨기 1분 전 장면(피그마 1979:27780)으로 바뀐다.
    static let lastMinuteShown: Double = 72

    struct Snack: Identifiable, Hashable {
        let id: String
        let name: String
        let asset: String
        var count: Int
    }

    struct Seat: Identifiable, Hashable {
        let id: String
        let name: String
        // 피그마 390 x 844 화면 좌표. 이름 글자 상자의 가운데
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

    /// 현장 모드 채팅 칸에 위에서부터 놓이는 줄. 해 뜨기 1분 전에는 안내 한 줄이 채팅 사이에 끼어든다(1979:27780).
    enum ChatEntry: Identifiable, Hashable {
        case other(ChatLine)
        case mine(String)
        case system(String)
        /// 입력줄에서 내가 보낸 말(같은 글을 두 번 보내도 따로 쌓이게 번호를 붙인다)
        case sent(Int, String)

        var id: String {
            switch self {
            case let .other(line): "o" + line.id.uuidString
            case let .mine(text): "m" + text
            case let .system(text): "s" + text
            case let .sent(n, _): "n\(n)"
            }
        }
    }

    var startedAt = Date()
    var bannerOpen = false
    // 방에 처음 들어오면 퀵슬롯은 접혀 있다(피그마 1807:23214 "주전부리 · 퀵슬롯 (접힘)").
    var dockOpen = false
    /// 대화 흐름 단계. 0은 들어온 직후(피그마 1979:27708), 1은 이야기가 무르익은 뒤(1979:27515), 2는 해 뜨기 1분 전(1979:27780).
    var stage = 0
    var speaker: String = "보라돌이 의자71"
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

    /// 장면 속 의자 이름표(피그마 1979:27517). 피그마에 "나" 칸이 없어 네 사람이 돌아가며 말한다.
    let seats: [Seat] = [
        .init(id: "sofa", name: "폭신폭신 소파38", x: 52, y: 383, isMe: false),
        .init(id: "wheel", name: "바퀴 달린 의자26", x: 143, y: 343, isMe: false),
        .init(id: "purple", name: "보라돌이 의자71", x: 260, y: 349.5, isMe: false),
        .init(id: "store", name: "편의점 드르륵71", x: 341, y: 366, isMe: false),
    ]

    /// 들어온 직후(피그마 1979:27708)
    static let fieldOpening: [ChatEntry] = [
        .other(.init(name: "폭신폭신 소파38", text: "제목보고 들어옴", opacity: 0.8)),
        .other(.init(name: "바퀴 달린 의자26", text: "댓글 단 사람들 미쳤나???", opacity: 1)),
        .mine("아니 진짜 선 넘는다 아니야?"),
    ]

    /// 이야기가 무르익은 뒤(피그마 1979:27515)
    static let fieldTalk: [ChatEntry] = [
        .other(.init(name: "바퀴 달린 의자26", text: "헐 자기 얼굴만 보정한 거 실화?", opacity: 0.4)),
        .other(.init(name: "보라돌이 의자71", text: "그건 서운할 만하지 ㅠㅠ", opacity: 0.8)),
        .other(.init(name: "편의점 드르륵71", text: "지만 쏙 빼고 보정한건 진짜 선넘는다", opacity: 1)),
        .mine("나만 예민한 거 아니지?"),
    ]

    /// 해 뜨기 1분 전(피그마 1979:27780)
    static let fieldLastMinute: [ChatEntry] = [
        .other(.init(name: "바퀴 달린 의자26", text: "근데 진짜 신경 ㄴㄴ", opacity: 0.8)),
        .mine("응 그냥 무시하려고 ㅎㅎ"),
        .system("해 뜨기 1분 전!"),
        .other(.init(name: "폭신폭신 소파38", text: "맞아여 앞으로 그런 애한테 신경쓰지 마요", opacity: 1)),
    ]

    /// 입력줄에서 보낸 내 말. 단계 글 뒤에 이어 붙고, 채팅 칸에는 최근 네 줄만 남는다.
    var sentChats: [String] = []

    var visibleEntries: [ChatEntry] {
        let base: [ChatEntry] = switch stage {
        case 0: Self.fieldOpening
        case 1: Self.fieldTalk
        default: Self.fieldLastMinute
        }
        guard !sentChats.isEmpty else { return base }
        let sent = sentChats.enumerated().map { ChatEntry.sent($0.offset, $0.element) }
        return Array((base + sent).suffix(4))
    }

    func send(_ text: String) {
        sentChats.append(text)
    }

    let chats: [ChatLine] = [
        .init(name: "진실의 의자10", text: "엥? 미친거 아님?", opacity: 0.4),
        .init(name: "딱딱한 나무 스툴12", text: "걍 싸우자는 거인듯 ㅋㅋ", opacity: 0.8),
        .init(name: "새벽2시 피시방", text: "나도 비슷한 일 있었음.. 그거 완전 여우짓임", opacity: 1),
    ]

    var topicShort = "친구가 썸남 앞에서 내 쌍밍아웃함. 셋이…"
    var topicBody = "친구가 썸남 앞에서 내 쌍밍아웃함. 셋이 떡볶이 먹으러 가고 있었는데 나보고 볼 때마다 00이 쌍수 참 예쁘게 잘되지 않았냐고 그러는거야. 걔 완전 미친거 아니야? 하.."
    var topicTags = ["#가족관계", "#가정사"]

    /// 던진 주전부리가 떨어지는 자리. 혼자 방은 장면 속 흰 테이블 위로 바꾼다.
    var landRect: CGRect = RoomModel.tableLand

    /// 함께 드르륵 현장 모드 방(피그마 1979:27515, 1979:27613). 일반 모드는 아직 옛 이야기를 쓰므로 기본값은 그대로 둔다.
    static func field() -> RoomModel {
        let m = RoomModel()
        m.topicShort = "오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가…"
        // 피그마 1979:27707 본문 글자의 줄바꿈 그대로
        m.topicBody = "오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가 인스타\n게시글에 자기 얼굴만 보정을 해서 올렸더라고.. 다들 엄청\n이쁘다고 비교된다는 식으로 댓글 달리는데 너무 속상해..."
        m.topicTags = ["#친구관계", "#외모고민"]
        return m
    }

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

    // 테이블(피그마 화면 좌표, 새 장면 E-room-scene-new의 흰 테이블 윗면 x 129~258, y 496~537): 놓을 수 있는 자리와 떨어지는 자리
    static let tableDrop = CGRect(x: 124, y: 466, width: 150, height: 120)
    static let tableLand = CGRect(x: 145, y: 506, width: 100, height: 20)

    func remaining(at date: Date) -> Double {
        let real = date.timeIntervalSince(startedAt)
        return max(0, Self.shownSeconds - real * (Self.shownSeconds / Self.realSeconds))
    }

    func clockText(at date: Date) -> String {
        let s = Int(remaining(at: date).rounded(.up))
        return String(format: "%02d:%02d", s / 60, s % 60)
    }

    /// 말하는 사람은 장면 속 네 사람 중에서 돌아가며 바뀐다(나는 이름표가 없어 말하는 표시가 붙지 않는다).
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
