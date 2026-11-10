import Observation
import SwiftUI

/// 현장 모드 방의 상태. 팀 피그마 "주전부리 · 퀵슬롯 (기본)"(1979:27515)과 웹 프로토타입 동작을 따른다.
@Observable
final class RoomModel {
    // 해 뜨기 시계: 화면에는 20:00에서 00:00까지 줄어들고, 실제로는 3분(180초)에 끝난다(웹 tokens.js realRoomSeconds와 같은 값).
    static let shownSeconds: Double = 20 * 60
    static let realSeconds: Double = 180
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

    /// 던진 뒤 퀵슬롯이 쉬는 시간(초). 웹 tokens.js live.throwCooldownSec와 같은 값이고, 마이 아이템 시트 글도 이 값을 읽는다.
    static let throwCooldownSeconds: Double = 3

    /// 한 이야기가 방에 그리는 내용(장면, 의자 이름표, 채팅, 고민 글, 테이블 자리). 글은 피그마 프레임 글자 그대로다.
    struct StoryContent {
        /// 장면 그림 imageset 이름
        let scene: String
        let seats: [Seat]
        /// 방에 들어왔을 때 말하는 사람(피그마 초록 점과 파동이 붙은 이름표)
        let firstSpeaker: String
        /// 들어온 직후
        let opening: [ChatEntry]
        /// 이야기가 무르익은 뒤
        let talk: [ChatEntry]
        /// 해 뜨기 1분 전
        let lastMinute: [ChatEntry]
        /// 일반 모드 채팅 칸
        let normalChats: [ChatLine]
        let topicShort: String
        let topicBody: String
        let topicTags: [String]
        /// 테이블(피그마 화면 좌표): 놓을 수 있는 자리와 떨어지는 자리
        let tableDrop: CGRect
        let tableLand: CGRect
    }

    /// 쌍밍아웃(홈 흐름). 피그마 2096:22459(접힘, 들어온 직후), 2096:22171(기본), 2096:22269와 2096:22364(펼침), 2096:22531(이모지).
    /// 장면은 2096:22172 "image 1208091463"(해시 fefcb80d) 원본 그대로인 room-scene. 해 뜨기 1분 전 프레임은 사진보정(2100:24394)에만 있어
    /// 같은 틀에 쌍밍아웃 의자 이름을 넣었다(사진보정 의자와 같은 자리의 의자: 바퀴 달린 의자26은 진실의 의자10, 폭신폭신 소파38은 차가운 새벽의자92).
    static let ssang = StoryContent(
        scene: "room-scene",
        // 이름 글자 상자의 가운데(2096:22173 묶음 안 글자 상자)
        seats: [
            .init(id: "lime", name: "진실의 의자10", x: 56.5, y: 396, isMe: false),
            .init(id: "stool", name: "딱딱한 나무 스툴12", x: 146.5, y: 382, isMe: false),
            .init(id: "swivel", name: "새벽2시 피시방", x: 261, y: 331.5, isMe: false),
            .init(id: "white", name: "차가운 새벽의자92", x: 344.5, y: 396, isMe: false),
        ],
        firstSpeaker: "새벽2시 피시방",
        opening: [
            .other(.init(name: "진실의 의자10", text: "잼얘 없음?", opacity: 0.8)),
            .other(.init(name: "차가운 새벽의자92", text: "님선 ㄱㄱ", opacity: 1)),
            .mine("아니 오늘 나 뭔일 있었냐면"),
        ],
        talk: [
            .other(.init(name: "진실의 의자10", text: "엥? 미친거 아님?", opacity: 0.4)),
            .other(.init(name: "딱딱한 나무 스툴12", text: "걍 싸우자는 거인듯 ㅋㅋ", opacity: 0.8)),
            .other(.init(name: "새벽2시 피시방", text: "나도 비슷한 일 있었음.. 그거 완전 여우짓임", opacity: 1)),
            .mine("나만 예민한 거 아니지?"),
        ],
        lastMinute: [
            .other(.init(name: "진실의 의자10", text: "근데 진짜 신경 ㄴㄴ", opacity: 0.8)),
            .mine("응 그냥 무시하려고 ㅎㅎ"),
            .system("해 뜨기 1분 전!"),
            .other(.init(name: "차가운 새벽의자92", text: "맞아여 앞으로 그런 애한테 신경쓰지 마요", opacity: 1)),
        ],
        normalChats: [
            .init(name: "진실의 의자10", text: "엥? 미친거 아님?", opacity: 0.4),
            .init(name: "딱딱한 나무 스툴12", text: "걍 싸우자는 거인듯 ㅋㅋ", opacity: 0.8),
            .init(name: "새벽2시 피시방", text: "나도 비슷한 일 있었음.. 그거 완전 여우짓임", opacity: 1),
        ],
        topicShort: "친구가 썸남 앞에서 내 쌍밍아웃함. 셋이…",
        // 피그마 I2096:22334;56:391 본문 글자의 줄바꿈 그대로
        topicBody: "친구가 썸남 앞에서 내 쌍밍아웃함. 셋이 떡볶이 먹으러\n가고 있었는데 나보고 볼 때마다 00이 쌍수 참 예쁘게 잘되지\n않았냐고 그러는거야. 걔 완전 미친거 아니야? 하..",
        topicTags: ["#친구관계", "#연애고민"],
        // room-scene의 흰 테이블 윗면 x 140~250, y 482~512
        tableDrop: CGRect(x: 120, y: 440, width: 150, height: 120),
        tableLand: CGRect(x: 150, y: 490, width: 90, height: 12)
    )

    /// 사진보정(라이브 첫 카드 흐름). 피그마 2100:24129(기본), 2100:24227(펼침), 2100:24030(사용과 쿨타임), 2100:24394(해 뜨기 1분 전).
    /// 장면 2100:24130(해시 cf4489b3)은 이미 있는 E-room-scene-new(1979:27516을 3배로 받은 같은 그림)를 쓴다.
    static let photo = StoryContent(
        scene: "E-room-scene-new",
        seats: [
            .init(id: "sofa", name: "폭신폭신 소파38", x: 52, y: 383, isMe: false),
            .init(id: "wheel", name: "바퀴 달린 의자26", x: 143, y: 343, isMe: false),
            .init(id: "purple", name: "보라돌이 의자71", x: 260, y: 349.5, isMe: false),
            .init(id: "store", name: "편의점 드르륵71", x: 341, y: 366, isMe: false),
        ],
        firstSpeaker: "보라돌이 의자71",
        // 들어온 직후(피그마 1979:27708)
        opening: [
            .other(.init(name: "폭신폭신 소파38", text: "제목보고 들어옴", opacity: 0.8)),
            .other(.init(name: "바퀴 달린 의자26", text: "댓글 단 사람들 미쳤나???", opacity: 1)),
            .mine("아니 진짜 선 넘는다 아니야?"),
        ],
        talk: [
            .other(.init(name: "바퀴 달린 의자26", text: "헐 자기 얼굴만 보정한 거 실화?", opacity: 0.4)),
            .other(.init(name: "보라돌이 의자71", text: "그건 서운할 만하지 ㅠㅠ", opacity: 0.8)),
            .other(.init(name: "편의점 드르륵71", text: "지만 쏙 빼고 보정한건 진짜 선넘는다", opacity: 1)),
            .mine("나만 예민한 거 아니지?"),
        ],
        lastMinute: [
            .other(.init(name: "바퀴 달린 의자26", text: "근데 진짜 신경 ㄴㄴ", opacity: 0.8)),
            .mine("응 그냥 무시하려고 ㅎㅎ"),
            .system("해 뜨기 1분 전!"),
            .other(.init(name: "폭신폭신 소파38", text: "맞아여 앞으로 그런 애한테 신경쓰지 마요", opacity: 1)),
        ],
        normalChats: [
            .init(name: "바퀴 달린 의자26", text: "헐 자기 얼굴만 보정한 거 실화?", opacity: 0.4),
            .init(name: "보라돌이 의자71", text: "그건 서운할 만하지 ㅠㅠ", opacity: 0.8),
            .init(name: "편의점 드르륵71", text: "지만 쏙 빼고 보정한건 진짜 선넘는다", opacity: 1),
        ],
        topicShort: "오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가…",
        // 피그마 I2100:24321;56:391 본문 글자의 줄바꿈 그대로
        topicBody: "오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가 인스타\n게시글에 자기 얼굴만 보정을 해서 올렸더라고.. 다들 엄청\n이쁘다고 비교된다는 식으로 댓글 달리는데 너무 속상해...",
        topicTags: ["#친구관계", "#외모고민"],
        // E-room-scene-new의 흰 테이블 윗면 x 129~258, y 496~537
        tableDrop: CGRect(x: 124, y: 466, width: 150, height: 120),
        tableLand: CGRect(x: 145, y: 506, width: 100, height: 20)
    )

    static func content(_ story: StoryKind) -> StoryContent {
        switch story {
        case .ssang: ssang
        case .photo: photo
        }
    }

    /// 이 방이 그리는 이야기(App/Story.swift의 Story.current). 방을 만들 때 한 번 읽는다.
    let story: StoryKind
    var content: StoryContent {
        Self.content(story)
    }

    init(story: StoryKind = Story.current) {
        self.story = story
        let c = Self.content(story)
        seats = c.seats
        speaker = c.firstSpeaker
        chats = c.normalChats
        topicShort = c.topicShort
        topicBody = c.topicBody
        topicTags = c.topicTags
        dropRect = c.tableDrop
        landRect = c.tableLand
    }

    var startedAt = Date()
    var bannerOpen = false
    // 방에 처음 들어오면 퀵슬롯은 접혀 있다(피그마 2096:22459 "주전부리 · 퀵슬롯 (접힘)").
    var dockOpen = false
    /// 대화 흐름 단계. 0은 들어온 직후, 1은 이야기가 무르익은 뒤, 2는 해 뜨기 1분 전.
    var stage = 0
    var speaker: String
    var landed: [Landed] = []

    var snacks: [Snack] = [
        .init(id: "shrimp", name: "새우깡", asset: "snack-shrimp", count: 5),
        .init(id: "soju", name: "소주", asset: "snack-soju", count: 2),
        .init(id: "peanut", name: "오징어땅콩", asset: "snack-peanut", count: 3),
        .init(id: "nogari", name: "노가리", asset: "snack-nogari", count: 1),
        .init(id: "drrra", name: "DRRRA", asset: "snack-drrra", count: 4),
        .init(id: "squid", name: "오징어", asset: "snack-squid", count: 2),
        .init(id: "monster", name: "몬스타", asset: "snack-monster", count: 1),
    ]

    /// 접힌 퀵슬롯 알약에 겹쳐 보이는 세 개(피그마 2096:22524 순서)
    var pillSnacks: [Snack] {
        ["shrimp", "drrra", "soju"].compactMap { id in snacks.first { $0.id == id } }
    }

    /// 장면 속 의자 이름표. 네 사람이 돌아가며 말한다.
    var seats: [Seat]

    /// 입력줄에서 보낸 내 말. 단계 글 뒤에 이어 붙고, 채팅 칸에는 최근 네 줄만 남는다.
    var sentChats: [String] = []

    var visibleEntries: [ChatEntry] {
        let base: [ChatEntry] = switch stage {
        case 0: content.opening
        case 1: content.talk
        default: content.lastMinute
        }
        guard !sentChats.isEmpty else { return base }
        let sent = sentChats.enumerated().map { ChatEntry.sent($0.offset, $0.element) }
        return Array((base + sent).suffix(4))
    }

    func send(_ text: String) {
        sentChats.append(text)
    }

    var chats: [ChatLine]

    var topicShort: String
    var topicBody: String
    var topicTags: [String]

    /// 주전부리를 놓을 수 있는 자리와 떨어지는 자리. 혼자 방은 장면 속 흰 테이블 위로 바꾼다.
    var dropRect: CGRect
    var landRect: CGRect

    /// 함께 드르륵 현장 모드 방. 지금 이야기(Story.current)를 읽어 장면과 글을 정한다.
    static func field() -> RoomModel {
        RoomModel(story: Story.current)
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

    // 예전 이름(사진보정 장면의 테이블). 새 코드는 dropRect와 landRect를 읽는다.
    static let tableDrop = photo.tableDrop
    static let tableLand = photo.tableLand

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

    // MARK: 던진 뒤 쉬는 시간(쿨타임)
    // 쉬는 칸과 끝나는 시각을 화면이 아니라 모델에 둔다. 퀵슬롯을 접었다 펴거나 화면이 다시 만들어져도 남고,
    // 끝나는 시각이 지나면 isCooling이 저절로 false가 되어 개수가 남은 칸은 다시 던질 수 있다(개수 0인 칸만 계속 쉰다).

    /// 방금 던진 칸(하늘색 선과 덮개가 붙는 칸)
    var coolingID: String?
    var coolingUntil: Date = .distantPast
    private var coolingSerial = 0

    func isCooling(at date: Date = .now) -> Bool {
        date < coolingUntil
    }

    /// 남은 쉬는 시간 비율(1에서 0으로 줄어든다)
    func cooldownLeft(at date: Date = .now) -> Double {
        max(0, min(1, coolingUntil.timeIntervalSince(date) / Self.throwCooldownSeconds))
    }

    func canThrow(_ snack: Snack, at date: Date = .now) -> Bool {
        snack.count > 0 && !isCooling(at: date)
    }

    private func startCooldown(_ id: String) {
        coolingSerial += 1
        let mine = coolingSerial
        coolingID = id
        coolingUntil = Date().addingTimeInterval(Self.throwCooldownSeconds)
        Task { @MainActor [weak self] in
            try? await Task.sleep(for: .seconds(Self.throwCooldownSeconds))
            // 취소되거나 늦게 깨어나도 같은 쿨타임이면 반드시 푼다(그 사이 새로 던졌으면 새 쿨타임에 맡긴다).
            guard let self, mine == self.coolingSerial else { return }
            withAnimation(DS.Motion.stateIn) { self.coolingID = nil }
        }
    }

    func throwSnack(_ id: String) -> Landed? {
        guard !isCooling(), let i = snacks.firstIndex(where: { $0.id == id }), snacks[i].count > 0 else { return nil }
        snacks[i].count -= 1
        startCooldown(id)
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
