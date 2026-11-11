import SwiftUI

// 라이브, 커뮤니티, 알림 화면의 글과 그림. 팀 피그마 프레임(라이브 1943:12396 외 카테고리 5장, 커뮤니티 1953:19406, 글 상세 1953:12298,
// 알림 1952:14673, 1952:14617, 1952:14693)에 적힌 그대로다. 그림 이름은 피그마 원본 해시 앞 12자리다.

/// 라이브 목록 카드 하나(피그마 1972:22375 "라이브 · 리스트 시안 v2", 상태 정의 1972:22488). 342 x 112.
struct LiveCard: Identifiable, Hashable {
    var id: String { title }
    let title: String
    let viewers: String
    /// 보는 수 옆 글(남은 시간, 방금 열림, 첫 대화 상대를 기다려요). 곧 끝나는 방은 빨간 시계 배지와 같은 값으로 "03:00 남음"을 쓴다
    /// (11/11 의정 댓글 1943:12022 핀 (88,699) "여기도 남은 시간 뜨게", 웹 liveV2.js metaRow와 같다).
    let meta: String
    let metaBlue: Bool
    let els: [LiveCardEl]

    var fresh: Bool { meta == "방금 열림" }
    var remaining: Int {
        for el in els {
            if case let .timer(_, _, v) = el { return LiveCard.secs(v) }
        }
        return LiveCard.secs(meta.replacingOccurrences(of: " 남음", with: ""))
    }

    static func secs(_ t: String) -> Int {
        let p = t.split(separator: ":").compactMap { Int($0) }
        return p.count == 2 ? p[0] * 60 + p[1] : 0
    }
}

/// 카드 오른쪽 아래 요소. 자리는 카드 왼쪽 위 기준이고 크기와 색은 피그마 값이다.
enum LiveCardEl: Hashable {
    /// 의자 얼굴 원(32 또는 48). ring이면 말하는 중(초록 2.5 테두리)
    case chair(CGFloat, CGFloat, CGFloat, String, ring: Bool)
    /// 더 앉은 수 원(26)
    case more(CGFloat, CGFloat, String)
    /// 혼자 있는 방의 빈 자리(32, 점선)
    case empty(CGFloat, CGFloat)
    /// 말하는 중 막대 배지(20 x 16)
    case speaking(CGFloat, CGFloat)
    /// 곧 끝나는 방의 빨간 시계(61 x 20)
    case timer(CGFloat, CGFloat, String)
    /// 막 열린 방의 하늘색 점(6)
    case fresh(CGFloat, CGFloat)
}

struct LiveFeatured: Identifiable, Hashable {
    let id = UUID()
    let title: String
    let versus: String
    let time: String
    let viewers: String
    let scene: String
    /// 곧 끝 방(빨간 시계 배지, 피그마 1943:12396 캐러셀 둘째 장)
    var urgent: Bool = false
}

enum LiveSort: String, CaseIterable, Identifiable {
    case popular = "인기순", latest = "최신순", match = "맞춤순"
    var id: String {
        rawValue
    }

    var hint: String {
        switch self {
        case .popular: "보는 사람과 공감이 많은 방부터"
        case .latest: "방금 의자를 꺼낸 방부터"
        case .match: "내 고민이랑 비슷한 이야기부터"
        }
    }
}

enum LiveData {
    static let categories = ["전체", "친구", "연애", "가족", "학교", "진로"]
    /// 카테고리마다 피그마 프레임(라이브- 1 1943:12396, 친구 1943:12264, 연애 1943:11783, 가족 1943:11901, 학교 1943:12022, 진로 1943:12143)의 카드를 위에서부터 그대로 옮겼다.
    /// 요소 자리는 카드 왼쪽 위 기준(342 x 112)이고, 앞에 적힌 요소가 뒤에 깔린다.
    static let cards: [String: [LiveCard]] = [
        "전체": [
            .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", viewers: "11", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D2-chair-ad4a1456", ring: true), .speaking(309, 81)]),
            .init(title: "내 머리 끝부터 발끝까지\n따라하는 손민수 친구가 있어", viewers: "7", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D2-chair-25629e6f", ring: false), .chair(278, 51, 48, "D-chairt-6e90eda49e", ring: false)]),
            .init(title: "생일에 나만 선물\n안 챙겨준 베프", viewers: "10", meta: "첫 대화 상대를 기다려요", metaBlue: true, els: [.empty(256, 62), .chair(278, 46, 48, "D-chairt-51be0a544b", ring: false)]),
            .init(title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-f77c03c1bf", ring: false), .chair(278, 46, 48, "D2-chair-25629e6f", ring: true), .speaking(312, 81)]),
            .init(title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?", viewers: "22", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-6bfc511e24", ring: true), .speaking(309, 81)]),
            .init(title: "친구 전남친이랑 썸 타는 중… \n괜찮음?", viewers: "22", meta: "03:00 남음", metaBlue: false, els: [.timer(269, 16, "03:00"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(253, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(275, 46, 48, "D-chairt-3ff806dcf7", ring: true), .speaking(309, 81)]),
            .init(title: "동생이 내 옷 말없이\n입고 나감. 개열받는다", viewers: "4", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-801d8aedde", ring: false), .chair(253, 62, 32, "D-chairt-bbab91fe74", ring: false), .chair(275, 46, 48, "D-chairt-b5c25c4cae", ring: true), .speaking(309, 81)]),
            .init(title: "오빠랑 아빠랑 \n심하게 싸워서 눈치보여", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(278, 46, 48, "D-chairt-ef3d01c180", ring: true), .speaking(312, 81)]),
            .init(title: "부모님 싸우는 소리에 \n잠을 못 자겠어", viewers: "4", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D-chairt-b5c25c4cae", ring: false), .chair(278, 51, 48, "D-chairt-801d8aedde", ring: false)]),
            .init(title: "조별과제 무임승차한 동기\n이름 빼버릴까?", viewers: "6", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(253, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(275, 46, 48, "D-chairt-33871c043e", ring: true), .speaking(309, 81)]),
            .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", viewers: "7", meta: "03:00 남음", metaBlue: false, els: [.timer(269, 16, "03:00"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(253, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(275, 46, 48, "D2-chair-7c2f0480", ring: true), .speaking(309, 81)]),
            .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", viewers: "2", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D2-chair-ad4a1456", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-5e85ee935b", ring: true), .speaking(309, 81)]),
        ],
        "친구": [
            .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", viewers: "11", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D2-chair-ad4a1456", ring: true), .speaking(309, 81)]),
            .init(title: "내 머리 끝부터 발끝까지\n따라하는 손민수 친구가 있어", viewers: "7", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D2-chair-25629e6f", ring: false), .chair(278, 51, 48, "D-chairt-4a2fafbdd2", ring: false)]),
            .init(title: "생일에 나만 선물\n안 챙겨준 베프", viewers: "10", meta: "첫 대화 상대를 기다려요", metaBlue: true, els: [.empty(256, 62), .chair(278, 46, 48, "D-chairt-51be0a544b", ring: false)]),
        ],
        "연애": [
            .init(title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-f77c03c1bf", ring: false), .chair(278, 46, 48, "D2-chair-25629e6f", ring: true), .speaking(312, 81)]),
            .init(title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?", viewers: "22", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-6bfc511e24", ring: true), .speaking(309, 81)]),
            // 연애 탭의 같은 방은 피그마(1943:11783, 새 섹션 2340:26318)에서 보는 수 32, 남은 시간 03:32 다(전체 탭은 22, 03:00).
            .init(title: "친구 전남친이랑 썸 타는 중… \n괜찮음?", viewers: "32", meta: "03:32 남음", metaBlue: false, els: [.timer(269, 16, "03:32"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(253, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(275, 46, 48, "D-chairt-3ff806dcf7", ring: true), .speaking(309, 81)]),
        ],
        "가족": [
            .init(title: "동생이 내 옷 말없이\n입고 나감. 개열받는다", viewers: "4", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-801d8aedde", ring: false), .chair(253, 62, 32, "D-chairt-bbab91fe74", ring: false), .chair(275, 46, 48, "D-chairt-b5c25c4cae", ring: true), .speaking(309, 81)]),
            .init(title: "오빠랑 아빠랑 \n심하게 싸워서 눈치보여", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(278, 46, 48, "D-chairt-ef3d01c180", ring: true), .speaking(312, 81)]),
            .init(title: "부모님 싸우는 소리에 \n잠을 못 자겠어", viewers: "4", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D-chairt-b5c25c4cae", ring: false), .chair(278, 51, 48, "D-chairt-801d8aedde", ring: false)]),
        ],
        "학교": [
            .init(title: "조별과제 무임승차한 동기\n이름 빼버릴까?", viewers: "6", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(253, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(275, 46, 48, "D-chairt-33871c043e", ring: true), .speaking(309, 81)]),
            .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", viewers: "7", meta: "03:00 남음", metaBlue: false, els: [.timer(269, 16, "03:00"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(253, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(275, 46, 48, "D2-chair-7c2f0480", ring: true), .speaking(309, 81)]),
            .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", viewers: "2", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D2-chair-ad4a1456", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-5e85ee935b", ring: true), .speaking(309, 81)]),
        ],
        "진로": [
            .init(title: "모의고사 7등급이야\n나 대학 갈 수 있을까?", viewers: "21", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-eab22a7a4d", ring: false), .chair(253, 62, 32, "D-chairt-b5c25c4cae", ring: false), .chair(275, 46, 48, "D-chairt-4fdd18ce8a", ring: true), .speaking(309, 81)]),
            .init(title: "담임이 반 애들 앞에서\n내 성적 말함;", viewers: "5", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(278, 51, 48, "D-chairt-90255286ed", ring: false)]),
            .init(title: "편입 준비하는 애들아\n나만 포기하고 싶니..", viewers: "2", meta: "첫 대화 상대를 기다려요", metaBlue: true, els: [.empty(256, 62), .chair(278, 46, 48, "D-chairt-66dbe89dae", ring: false)]),
        ],
    ]
    // 위 가로 카드 다섯 장(피그마 1943:12396 "캐러셀" 2340:22269, 왼쪽부터 Carousel / 1, 4, 3, 2, 5). 윗줄 작은 글(Versus)은 팀이 지웠다.
    // 둘째부터 다섯째 장면은 명예의 전당과 같은 그림(피그마 그림 해시가 같다)이다. 웹 liveCarousel.js LIVE_CARDS와 같은 값이다.
    static let featured: [LiveFeatured] = [
        .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", versus: "", time: "04:30", viewers: "22", scene: "D3-live-scene-1"),
        .init(title: "남친이 1주년 선물로\n다이소 틴트 사줌", versus: "", time: "02:30", viewers: "12", scene: "C-hall-2", urgent: true),
        .init(title: "남사친이 자꾸만\n좋아져서 고민이야", versus: "", time: "10:31", viewers: "66", scene: "C-hall-3"),
        .init(title: "너네는 친구가 남미새면\n어떻게 할거야?", versus: "", time: "06:43", viewers: "13", scene: "C-hall-4"),
        .init(title: "친친 스토리에 나만 빼고\n등록해둔 친구가 있어", versus: "", time: "04:12", viewers: "62", scene: "C-hall-5"),
    ]
    static let bell = "C-4fdd18ce8a29"

    /// 카드가 속한 탭 이름. 친구, 연애, 가족, 학교, 진로 목록에서 같은 제목(빈칸과 줄바꿈 무시)을 찾는다.
    /// 전체에만 있거나 어느 탭에도 없는 제목은 빈 글자. 웹 liveV2.js tabOf와 같은 규칙이다.
    static func tab(for title: String) -> String {
        let flat: (String) -> String = { $0.filter { !$0.isWhitespace } }
        let t = flat(title)
        for name in ["친구", "연애", "가족", "학교", "진로"] where (cards[name] ?? []).contains(where: { flat($0.title) == t }) {
            return name
        }
        return ""
    }
}

struct WatchSeat: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let image: String
}

enum WatchData {
    static let scene = "D2-watch-scene"
    static let title = "둘이 찍은 사진인데\n지만 보정해서 올린 여우"
    static let seats: [WatchSeat] = [
        // 투명판 의자 그림(흰 바탕 원본을 쓰면 원 바깥에 흰 테두리가 보인다)
        .init(name: "리클라이너21", image: "D-chairt-4fdd18ce8a"),
        .init(name: "나무스툴12", image: "D-chairt-51be0a544b"),
        .init(name: "가죽소파19", image: "D-chairt-eab22a7a4d"),
    ]
    static let floorNames: [(String, CGFloat, CGFloat, Bool)] = [
        ("부드러운 리클라이너21", -14, 132, false), ("새벽2시 편의점 의자", 106, 140, true),
        ("아기자기 나무스툴12", 204, 164, false), ("새로 산 가죽소파19", 303, 148, false),
    ]
    static let comments: [(String, String)] = [("구경하는 스툴3", "가죽소파님 목소리 너무 차분해서 더 슬픔"), ("폭신한 방석20", "그 친구 원래 그런 스타일이야?")]
    static let myComments = ["가죽소파님 힘내요!!"]
    /// 사진보정 글 상세 댓글 일곱 줄(11. 12. 03시 CommunityData.comments 값). 커뮤니티 글마다 댓글이 따로 생겨도 첫 카드 방 구경 채팅은 그대로 둔다.
    static let postComments: [(String, String)] = [
        ("푹신푹신 리클라이너17", "내가 봤을 때는 백퍼 글쓴이 질투하는듯\n웃으면서 나도 보정 좀 해주지~라고 댓글 달아봐"),
        ("딱딱한 나무스툴12", "근데 사이 틀어질지도.. 괜히 어사되면 어캄"),
        ("새벽2시 소파", "나도 똑같은 일 있었는데 물어보니까 진짜 걍 생각없이 올린거였음"),
        ("퇴근길 편의점 의자", "그건 선 넘었다 ㅋㅋ"),
        ("주말 아침 나무스툴", "근데 그걸 까먹을 수가 있나?"),
        ("비 오는 날 바퀴달린의자", "쫀득하게 자기만 보정하면 어떡해ㅠㅠ 속상했겠다..."),
        ("길거리 편의점 의자", "너도 그런거 하나 올려봐ㅋㅋㅋ 역지사지가 되어야함"),
    ]
    /// 대화 중 의자 이름표. 카드 글(WatchScripts)이 있으면 그 이름, 없으면 피그마 이름(리클라이너21, 나무스툴12, 가죽소파19). 그림은 그대로다.
    static func seatNames(_ title: String?) -> [String] {
        WatchScripts.of(title)?.seats ?? seats.map(\.name)
    }
}

/// 방 구경 채팅 한 줄. mine이면 내 댓글(하늘색 말풍선, 이름 없음).
struct WatchLine: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let text: String
    let mine: Bool
}

/// 방 구경 채팅이 라이브 방송처럼 계속 올라온다(11/10 팀원 피드백 "라이브-눌러서 라방 보듯이 할라면 계속 새 메시지가 올라오는 것 처럼 해야할듯").
/// 화면이 처음 뜰 때 채팅 칸은 비어 있다(11. 10. 팀 요청 "처음에 시작했을 때 댓글 아무 것도 없다가 하나씩 생겨나는 느낌으로").
/// 0.7초 뒤 첫 줄, 처음 4줄까지는 1.0초에서 1.8초 사이 간격, 그 뒤는 2.4초에서 4.2초 사이 간격.
/// 웹 client/src/app/watchChat.js와 같은 값, 같은 글 순서, 같은 간격 수열이다.
enum WatchFeed {
    static let firstDelay: Double = 0.7
    static let fastCount = 4
    static let fastMinGap: Double = 1.0
    static let fastMaxGap: Double = 1.8
    static let minGap: Double = 2.4
    static let maxGap: Double = 4.2
    static let seed: UInt32 = 1110
    static let maxRows = 5
    /// 줄이 밀려 올라가고 나타나는 움직임 220ms, 표준 곡선
    static let motion = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.22)

    /// 처음 칸은 비어 있다. 피그마 댓글 두 줄은 글 후보(lines) 끝에서 차례가 오면 나온다.
    static var initial: [WatchLine] { [] }

    /// 이미 올라온 줄 수(shown) 다음의 간격. 4번째 줄까지는 빠른 간격, 그 뒤는 보통 간격(웹 watchChat.js delay와 같다).
    static func gap(after shown: Int, _ random: inout Random) -> Double {
        let r = random.next()
        return shown < fastCount ? fastMinGap + r * (fastMaxGap - fastMinGap) : minGap + r * (maxGap - minGap)
    }

    /// 글 후보: 지금 이야기 방 채팅 줄(들어온 직후와 무르익은 뒤의 다른 의자 줄), 다른 이야기 줄, 커뮤니티 글 상세 댓글, 방 구경 댓글 순서.
    /// 사진보정 카드는 photo 줄을, 그 밖의 카드는 ssang 줄을 먼저 쓴다. 순서대로 돌아 같은 줄이 연달아 나오지 않는다.
    /// 카드 제목별 글(WatchScripts)이 있으면 그 카드 채팅 여덟 줄과 댓글 세 줄을 돈다(웹 watchChat.js feedLines와 같다).
    /// 표에 없는 제목은 아래 예전 규칙. 사진보정 글 댓글 일곱 줄은 11. 12. 03시 값 그대로 붙잡아 둔다(WatchData.postComments).
    static func lines(_ story: StoryKind, title: String? = nil) -> [(String, String)] {
        if let sc = WatchScripts.of(title) { return sc.chat + sc.comments }
        func talk(_ c: RoomModel.StoryContent) -> [(String, String)] {
            (c.opening + c.talk).compactMap { entry in
                if case let .other(line) = entry { return (line.name, line.text) }
                return nil
            }
        }
        let first = talk(RoomModel.content(story))
        let second = talk(RoomModel.content(story == .photo ? .ssang : .photo))
        return first + second + WatchData.postComments + WatchData.comments
    }

    /// 새 줄을 아래에 붙이고 오래된 줄을 지워 5줄을 넘지 않게 한다.
    static func push(_ feed: inout [WatchLine], _ line: WatchLine) {
        feed.append(line)
        if feed.count > maxRows { feed.removeFirst(feed.count - maxRows) }
    }

    /// 같은 시작 값이면 같은 수열(32비트 선형 합동). 웹 makeRandom과 같은 식이다.
    struct Random {
        var state: UInt32 = WatchFeed.seed
        mutating func next() -> Double {
            state = state &* 1_664_525 &+ 1_013_904_223
            return Double(state) / 4_294_967_296
        }
    }
}

struct CommunityPost: Identifiable, Hashable {
    let id = UUID()
    let title: String
    let likes: Int
    let comments: Int
    let thumb: String
}

struct PostComment: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let time: String
    let text: String
    let likes: Int
    var reply = false
    /// 피그마 댓글 칸에 정해진 의자 그림. 없으면 이름으로 고른다.
    var avatar: String? = nil
}

enum CommunityData {
    // 명예의 전당 카우셀 다섯 장(피그마 1953:19406 안 캐러셀 2298:20561, 왼쪽부터 Carousel / 1, 4, 3, 2, 5).
    // 첫 장면은 라이브 목록 1943:12456과 같은 그림이고, 둘째부터 다섯째 장면은 피그마 Scene 노드를 2배로 내보낸 그림이다(웹 assets/hall5와 같다).
    static let scenes = ["D3-live-scene-1", "C-hall-2", "C-hall-3", "C-hall-4", "C-hall-5"]
    static let featuredTitles = [
        "둘이 찍은 사진인데\n지만 보정해서 올린 여우",
        "남친이 1주년 선물로\n다이소 틴트 사줌",
        "남사친이 자꾸만\n좋아져서 고민이야",
        "너네는 친구가 남미새면\n어떻게 할거야?",
        "친친 스토리에 나만 빼고\n등록해둔 친구가 있어",
    ]
    static let posts: [CommunityPost] = [
        .init(title: "친구가 썸남 앞에서\n내 쌍밍아웃함", likes: 128, comments: 52, thumb: "F-community-thumb-1"),
        .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", likes: 31, comments: 17, thumb: "F-community-thumb-2"),
        .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", likes: 48, comments: 23, thumb: "F-community-thumb-3"),
        .init(title: "시험 공부 대신\n친구들과 노래방 간 썰", likes: 75, comments: 35, thumb: "F-community-thumb-1"),
        .init(title: "첫 데이트에서\n의외의 취미 발견!", likes: 64, comments: 29, thumb: "F-community-thumb-1"),
    ]
    static let detailScene = "F-community-detail-scene"
    /// 글쓴이 프사(피그마 1953:12302, 어두운 원 #222628 위 그림 FIT)
    static let detailAuthorAvatar = "C-6977f0a432c8"
    static let detailAuthor = "딱딱한 나무스툴12"
    static let detailBody = "유진이 얼굴만 잡티 하나 없이 보정해서 올렸어. 내 얼굴은 그대로… 이거 나만 서운한 거야?"
    static let detailSeats = ["C-3ab7dfb2602d", "C-6977f0a432c8", "C-24a5f181f678"]
    static let comments: [PostComment] = [
        .init(name: "푹신푹신 리클라이너17", time: "2시간 전", text: "내가 봤을 때는 백퍼 글쓴이 질투하는듯\n웃으면서 나도 보정 좀 해주지~라고 댓글 달아봐", likes: 48, avatar: "C-ad4a14569046"),
        .init(name: "딱딱한 나무스툴12", time: "1시간 전", text: "근데 사이 틀어질지도.. 괜히 어사되면 어캄", likes: 12, reply: true, avatar: "C-90255286edc8"),
        .init(name: "새벽2시 소파", time: "41분 전", text: "나도 똑같은 일 있었는데 물어보니까 진짜 걍 생각없이 올린거였음", likes: 9, avatar: "C-4a2fafbdd2df"),
        .init(name: "퇴근길 편의점 의자", time: "1시간 전", text: "그건 선 넘었다 ㅋㅋ", likes: 15, avatar: "C-b5c25c4caef8"),
        .init(name: "주말 아침 나무스툴", time: "3시간 전", text: "근데 그걸 까먹을 수가 있나?", likes: 23, avatar: "C-d7b0bb5005bf"),
        .init(name: "비 오는 날 바퀴달린의자", time: "5시간 전", text: "쫀득하게 자기만 보정하면 어떡해ㅠㅠ 속상했겠다...", likes: 8, avatar: "C-cf2670f44f76"),
        .init(name: "길거리 편의점 의자", time: "7시간 전", text: "너도 그런거 하나 올려봐ㅋㅋㅋ 역지사지가 되어야함", likes: 12, avatar: "C-33871c043e7c"),
    ]
}

/// 프로필 의자: 피그마 "프로필용 의자들" 25개(편의점 의자, 스툴, 소파, 바퀴달린 의자, 리클라이너 각 5색). 이름마다 같은 의자를 쓴다.
enum Avatars {
    static let all = ["C-4fdd18ce8a29", "C-5e85ee935bf4", "C-b5c25c4caef8", "C-33871c043e7c", "C-6bfc511e24bf", "C-51be0a544b5f", "C-bbab91fe747a", "C-450692c4dbd6", "C-d7b0bb5005bf", "C-90255286edc8", "C-eab22a7a4d50", "C-6e90eda49e34", "C-b684e5de0a90", "C-4a2fafbdd2df", "C-66dbe89daeb4", "C-40b4fa7cb4ef", "C-f77c03c1bf89", "C-801d8aedde75", "C-cf2670f44f76", "C-ad12677ce6f5", "C-ef3d01c18073", "C-3ff806dcf77f", "C-ad4a14569046", "C-7c2f0480f099", "C-25629e6f941c"]
    /// 피그마 커뮤니티 글 상세(1953:12298)에 정해진 사람별 의자
    static let fixed: [String: String] = [
        "푹신푹신 리클라이너17": "C-3ff806dcf77f", "딱딱한 나무스툴12": "C-51be0a544b5f", "새벽2시 소파": "C-eab22a7a4d50",
        "퇴근길 편의점 의자": "C-4fdd18ce8a29", "주말 아침 나무스툴": "C-d7b0bb5005bf", "비 오는 날 바퀴달린의자": "C-f77c03c1bf89",
        "길거리 편의점 의자": "C-33871c043e7c",
    ]

    static func image(for name: String) -> String {
        if let f = fixed[name] { return f }
        let groups: [(String, Int)] = [("편의점", 0), ("스툴", 5), ("소파", 10), ("바퀴", 15), ("리클라이너", 20)]
        let seed = name.unicodeScalars.reduce(7) { ($0 &* 31 &+ Int($1.value)) & 0x7FFF_FFFF }
        if let g = groups.first(where: { name.contains($0.0) }) {
            return all[g.1 + seed % 5]
        }
        return all[seed % all.count]
    }
}

/// 방 구경(liveWatch)으로 들어가는 한 곳. 라이브 목록, 위 가로 카드, 알림 키워드 카드가 모두 이 함수로 들어간다(웹 liveV2.js openWatch와 같은 규칙).
/// 사진보정 카드(둘이 찍은 사진인데 지만 보정해서 올린 여우)면 Story.current = .photo, 다른 카드는 .ssang(팀 메모 2100:24023).
extension Router {
    func openWatch(_ pick: WatchPick) {
        let photo = WatchPick.isPhoto(pick.title)
        Story.current = photo ? .photo : .ssang
        // 카드별 고민(방 고민 탭이 읽는다): 사진보정 카드는 nil, 그 밖의 카드는 제목(줄바꿈 없이 빈칸 하나)과 카드가 속한 탭 이름. 웹 liveV2.js pickWatch와 같다.
        Story.concern = photo ? nil : (title: pick.title.split(whereSeparator: \.isWhitespace).joined(separator: " "), tag: LiveData.tab(for: pick.title))
        watch = pick
        push(.liveWatch)
    }
}

extension WatchPick {
    static let photoTitle = "둘이 찍은 사진인데\n지만 보정해서 올린 여우"
    static func isPhoto(_ title: String) -> Bool {
        title.filter { !$0.isWhitespace } == photoTitle.filter { !$0.isWhitespace }
    }
    /// 라이브 목록 카드 값으로 만든다. 남은 시간이 없는 방(방금 열림, 기다리는 방)은 20:00에서 시작한다.
    init(card: LiveCard) {
        self.init(title: card.title, viewers: card.viewers, left: card.remaining > 0 ? card.remaining : 1200)
    }
    /// 위 가로 카드 값으로 만든다(카드 시계 값에서 시작).
    init(featured f: LiveFeatured) {
        self.init(title: f.title, viewers: f.viewers, left: LiveCard.secs(f.time))
    }
}

/// 방 구경 카드별 글(11. 12. 03:13 사용자 지시 "라이브 메인 제외하고 나머지들 그 상세페이지에 채팅 나오는 거 다 상황 맥락에 맞게 더미로 만들고(다 다르게)").
/// 웹 client/src/app/watchScripts.js 와 같은 글, 같은 순서다. 제목(빈칸과 줄바꿈 무시)으로 찾고, 없으면(첫 카드 사진보정, 알림 키워드 카드 등) 기존 줄을 쓴다.
/// seats는 대화 중 의자 이름표 세 개(리클라이너, 나무스툴, 가죽소파 순서, 그림은 WatchData.seats 그대로), chat은 채팅 여덟 줄, comments는 의자들에게 남기는 댓글 세 줄.
struct WatchScript {
    let title: String
    let seats: [String]
    let chat: [(String, String)]
    let comments: [(String, String)]
}

enum WatchScripts {
    static func of(_ title: String?) -> WatchScript? {
        guard let title else { return nil }
        let flat: (String) -> String = { $0.filter { !$0.isWhitespace } }
        let t = flat(title)
        return all.first { flat($0.title) == t }
    }

    static let all: [WatchScript] = [
        .init(
            title: "내 머리 끝부터 발끝까지\n따라하는 손민수 친구가 있어",
            seats: ["리클라이너34", "나무스툴27", "가죽소파52"],
            chat: [
                ("말랑한 방석14", "헐 신발까지 똑같이 샀다고?"),
                ("창가 나무스툴31", "손민수 진짜 소름이다 ㅋㅋ"),
                ("졸린 리클라이너8", "나 같으면 바로 물어봄 왜 따라하냐고"),
                ("학교 앞 편의점 의자", "머리 색까지 따라했으면 말 다했지"),
                ("삐걱대는 바퀴달린의자40", "처음엔 귀여웠는데 계속되면 숨막힘"),
                ("노을 진 소파29", "걍 칭찬으로 받아들이면 안됨?"),
                ("옥상 나무스툴6", "사진 찍으면 쌍둥이처럼 나오겠다 ㅋㅋ"),
                ("동네 리클라이너45", "다음 쇼핑은 몰래 가야겠네"),
            ],
            comments: [
                ("구경하는 방석9", "나무스툴님 말 완전 공감됨"),
                ("따끈한 편의점 의자", "가죽소파님 친구도 손민수였다니 ㅠㅠ"),
                ("반짝이는 스툴18", "리클라이너님 해결법 궁금함!"),
            ]
        ),
        .init(
            title: "생일에 나만 선물\n안 챙겨준 베프",
            seats: ["리클라이너63", "나무스툴45", "가죽소파28"],
            chat: [
                ("비 오는 날 방석23", "생일에 나만 빼고?? 너무하다"),
                ("새벽3시 편의점 의자", "혹시 깜빡한 거 아닐까.."),
                ("푹신한 가죽소파7", "다른 애들은 다 받았다는 게 포인트임"),
                ("낡은 나무스툴50", "나라면 서운하다고 바로 말함"),
                ("꾸벅꾸벅 리클라이너12", "베프면 더 섭섭하지 ㅠㅠ"),
                ("퇴근길 바퀴달린의자3", "혹시 서프라이즈 준비 중인 거 아님?"),
                ("창밖 보는 소파61", "작년엔 챙겨줬는지가 궁금함"),
                ("골목길 스툴44", "늦게라도 줬으면 좋겠다"),
            ],
            comments: [
                ("지나가던 방석30", "리클라이너님 생일 축하해요!!"),
                ("말없는 편의점 의자", "나무스툴님 말투 너무 다정함"),
                ("잠 못 드는 소파5", "가죽소파님 얘기 듣고 나도 생각남"),
            ]
        ),
        .init(
            title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?",
            seats: ["리클라이너72", "나무스툴36", "가죽소파14"],
            chat: [
                ("새벽 감성 소파41", "전 애인이랑 맞팔은 좀 아니지"),
                ("학원 끝난 스툴9", "언팔하면 오히려 신경쓰는 거라던데"),
                ("시끄러운 편의점 의자", "좋아요까지 누르면 그건 선넘음"),
                ("기울어진 리클라이너3", "남친한테 직접 물어보는 게 답임"),
                ("반쯤 졸린 방석55", "나도 그거 때문에 싸운 적 있음 ㅋㅋ"),
                ("동네 바퀴달린의자19", "맞팔 정리 안 하는 이유가 뭐래?"),
                ("체크무늬 소파26", "그냥 귀찮아서 냅둔 걸수도"),
                ("새벽4시 나무스툴", "내가 다 찝찝하네.."),
            ],
            comments: [
                ("바닷가 편의점 의자", "가죽소파님 완전 쿨하다"),
                ("보송한 방석11", "나무스툴님 경험담 더 듣고 싶음"),
                ("눈 오는 날 스툴2", "리클라이너님 남친 반응 어땠어요?"),
            ]
        ),
        .init(
            title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?",
            seats: ["리클라이너25", "나무스툴58", "가죽소파33"],
            chat: [
                ("설레는 바퀴달린의자8", "3일이면 좀 길긴 하다.."),
                ("밤샘하는 소파13", "시험기간이면 바쁜 거 아닐까"),
                ("버스정류장 스툴", "먼저 연락하는 게 뭐 어때서!"),
                ("졸업반 리클라이너50", "읽고 답 안 하는 건 좀 서운함"),
                ("비밀스러운 방석4", "가볍게 밥 먹었냐고 보내봐"),
                ("초코우유 편의점 의자", "나 같으면 스토리 올리고 반응 봄 ㅋㅋ"),
                ("휘청이는 나무스툴22", "썸은 원래 밀당이라던데"),
                ("뒷자리 가죽소파60", "연락 오면 바로 알려줘야 함"),
            ],
            comments: [
                ("첫눈 기다리는 스툴", "리클라이너님 조언 현실적이다"),
                ("하품하는 방석35", "가죽소파님 썸 꼭 이뤄지길!!"),
                ("동그란 편의점 의자", "나무스툴님 목소리 설렌다 ㅋㅋ"),
            ]
        ),
        .init(
            title: "친구 전남친이랑 썸 타는 중… \n괜찮음?",
            seats: ["리클라이너48", "나무스툴73", "가죽소파39"],
            chat: [
                ("조심스러운 소파52", "와 이건 진짜 어려운 문제다"),
                ("쉬는시간 바퀴달린의자", "친구한테 먼저 말은 해봤음?"),
                ("운동장 나무스툴18", "헤어진 지 얼마나 됐는지가 중요함"),
                ("다락방 리클라이너6", "나라면 친구 눈치 엄청 볼듯"),
                ("새벽1시 방석", "좋아하는 마음은 어쩔 수 없잖아 ㅠㅠ"),
                ("엘리베이터 편의점 의자", "들키기 전에 말하는 게 나음"),
                ("구석자리 소파17", "친구가 아직 못 잊었으면 큰일임"),
                ("짝다리 스툴27", "이거 결말 너무 궁금하다"),
            ],
            comments: [
                ("귤 까먹는 방석42", "가죽소파님 의견 완전 어른스러움"),
                ("노래방 바퀴달린의자", "리클라이너님 마음 이해돼요"),
                ("도서관 나무스툴", "나무스툴님 친구 반응 듣고 싶다"),
            ]
        ),
        .init(
            title: "동생이 내 옷 말없이\n입고 나감. 개열받는다",
            seats: ["리클라이너31", "나무스툴64", "가죽소파47"],
            chat: [
                ("맏언니 소파", "동생들 원래 다 그럼 ㅋㅋㅋ"),
                ("현관 앞 나무스툴", "새로 산 옷이면 진짜 화나지"),
                ("빨래 개는 리클라이너11", "말이라도 하고 입지.."),
                ("막내 바퀴달린의자", "나도 언니 옷 몰래 입다 걸림 ㅋㅋ"),
                ("거실 방석37", "옷장에 자물쇠 달아야 함"),
                ("늦잠 자는 편의점 의자", "얼룩까지 묻혀오면 끝장임"),
                ("옷걸이 스툴15", "대신 동생 옷 하나 빌려 입어"),
                ("장롱 옆 가죽소파2", "오늘 저녁 집 분위기 살벌하겠다"),
            ],
            comments: [
                ("방구석 리클라이너29", "가죽소파님 형제 썰 너무 웃김"),
                ("뽀송한 스툴53", "나무스툴님 해결책 좋다"),
                ("김 서린 편의점 의자", "리클라이너님 동생 몇 살이에요?"),
            ]
        ),
        .init(
            title: "오빠랑 아빠랑 \n심하게 싸워서 눈치보여",
            seats: ["리클라이너56", "나무스툴9", "가죽소파38"],
            chat: [
                ("조용한 소파70", "집에서 큰소리 나면 진짜 숨막힘"),
                ("계단참 나무스툴43", "무슨 일로 싸운 거야?"),
                ("이불 속 리클라이너14", "괜히 내 방에서도 숨죽이게 됨"),
                ("저녁 먹던 방석", "중간에서 눈치 보는 게 제일 힘듦 ㅠㅠ"),
                ("새벽 편의점 의자33", "오빠한테 따로 말 걸어봐"),
                ("창문 연 바퀴달린의자", "하루 이틀 지나면 풀리더라"),
                ("베란다 스툴", "둘 다 고집 세면 오래감.."),
                ("식탁 옆 가죽소파25", "너 잘못 아니니까 너무 신경쓰지마"),
            ],
            comments: [
                ("이어폰 낀 방석48", "리클라이너님 마음 고생 많았겠다"),
                ("따뜻한 리클라이너40", "가죽소파님 말에 위로받고 감"),
                ("우산 쓴 스툴8", "나무스툴님 얘기 너무 공감돼요"),
            ]
        ),
        .init(
            title: "부모님 싸우는 소리에 \n잠을 못 자겠어",
            seats: ["리클라이너80", "나무스툴34", "가죽소파11"],
            chat: [
                ("새벽2시 방석", "나도 그 소리 들으면 심장 쿵쾅거림"),
                ("불 끈 리클라이너37", "이어폰 끼고 노래 틀어봐"),
                ("잠옷 입은 스툴", "매일 그러셔?"),
                ("베개 끌어안은 소파16", "아침에 괜찮은 척하는 게 더 힘듦"),
                ("달빛 편의점 의자", "내일 학교 가야 하는데 어떡해 ㅠㅠ"),
                ("이불킥 바퀴달린의자", "소리 들린다고 부모님께 말해봐"),
                ("뒤척이는 나무스툴61", "우리집도 그런 시기 있었는데 지나감"),
                ("커튼 친 방석", "여기서라도 털어놔서 다행이다"),
            ],
            comments: [
                ("별 보는 스툴", "가죽소파님 오늘은 푹 잤으면 좋겠다"),
                ("차분한 리클라이너", "나무스툴님 말투 엄청 다정함"),
                ("따뜻한 방석60", "리클라이너님 토닥토닥"),
            ]
        ),
        .init(
            title: "조별과제 무임승차한 동기\n이름 빼버릴까?",
            seats: ["리클라이너42", "나무스툴88", "가죽소파23"],
            chat: [
                ("과제하는 바퀴달린의자", "조별과제 빌런 어디에나 있음 ㅋㅋ"),
                ("강의실 나무스툴", "단톡방 읽씹하는 애 맞지?"),
                ("밤샌 리클라이너2", "이름 빼는 거 완전 가능"),
                ("카페 구석 소파", "교수님한테 기여도 제출하면 됨"),
                ("노트북 든 편의점 의자", "발표날만 나타나는 거 국룰임"),
                ("휴학하고픈 방석", "빼기 전에 마지막으로 경고 한 번?"),
                ("마감 직전 스툴20", "나도 혼자 다 한 적 있어서 빡침"),
                ("졸린 동기 가죽소파", "이름 빼면 그 동기 반응 궁금함"),
            ],
            comments: [
                ("2학년 리클라이너", "가죽소파님 팀플 썰 레전드다"),
                ("시험기간 방석", "나무스툴님 진짜 고생했겠다"),
                ("복학생 스툴", "리클라이너님 말이 정답임"),
            ]
        ),
        .init(
            title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다",
            seats: ["리클라이너15", "나무스툴70", "가죽소파44"],
            chat: [
                ("점심시간 소파", "헐 누구한테 걸렸어?"),
                ("급식실 나무스툴", "메뉴 뭐였는지가 더 궁금함 ㅋㅋ"),
                ("매점 앞 편의점 의자", "혼밥이 뭐 어때서"),
                ("조퇴하고픈 리클라이너", "걸린 순간 표정 상상됨 ㅋㅋㅋ"),
                ("복도 끝 바퀴달린의자", "그 친구가 소문 안 냈으면 좋겠다"),
                ("교복 입은 방석", "나도 도서관에서 몰래 먹은 적 있음"),
                ("체육복 스툴", "다음엔 같이 먹자고 하는 애 있을걸?"),
                ("청소당번 가죽소파", "썰 푸는 목소리 너무 웃기다"),
            ],
            comments: [
                ("교실 뒷자리 방석", "리클라이너님 썰 2탄 해줘요"),
                ("하굣길 편의점 의자", "나무스툴님 리액션 최고 ㅋㅋ"),
                ("조용한 스툴", "가죽소파님 그때 많이 놀랐겠다"),
            ]
        ),
        .init(
            title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?",
            seats: ["리클라이너66", "나무스툴51", "가죽소파7"],
            chat: [
                ("지갑 얇은 소파", "몇 번이나 얻어먹었는데?"),
                ("영수증 든 나무스툴", "한두 번이면 몰라도 계속이면 문제임"),
                ("더치페이 리클라이너", "이제부터 더치하자고 말해"),
                ("배고픈 바퀴달린의자", "고맙다는 말은 해?"),
                ("분식집 방석", "나 같으면 다음엔 니가 사라고 함 ㅋㅋ"),
                ("용돈날 편의점 의자", "손절은 좀 이르고 일단 말해봐"),
                ("떡볶이 먹는 스툴", "이거 은근 많은 사람들이 겪음"),
                ("계산대 앞 가죽소파", "친구가 형편이 어려운 걸수도 있음"),
            ],
            comments: [
                ("알뜰한 방석", "가죽소파님 너무 착하다"),
                ("퇴근길 리클라이너", "나무스툴님 말 시원하다 ㅋㅋ"),
                ("동전 모으는 스툴", "리클라이너님 다음 얘기 궁금함"),
            ]
        ),
        .init(
            title: "모의고사 7등급이야\n나 대학 갈 수 있을까?",
            seats: ["리클라이너39", "나무스툴26", "가죽소파81"],
            chat: [
                ("수험생 소파", "7등급이어도 아직 시간 있음!"),
                ("독서실 나무스툴", "몇 학년이야? 고2면 충분함"),
                ("인강 듣는 리클라이너", "나도 6등급에서 많이 올렸어"),
                ("문제집 든 방석", "한 과목씩 잡으면 됨"),
                ("새벽공부 편의점 의자", "등급보다 꾸준함이 중요하더라"),
                ("학원 버스 바퀴달린의자", "대학 갈 수 있지 당연히"),
                ("연필 깎는 스툴", "오답노트 진짜 효과 있음"),
                ("기숙사 가죽소파", "응원한다 진짜로 ㅠㅠ"),
            ],
            comments: [
                ("재수했던 방석", "나무스툴님 공부법 공유해줘요"),
                ("수능 끝난 리클라이너", "가죽소파님 꼭 원하는 대학 가요"),
                ("고3 스툴", "리클라이너님 말 듣고 힘남"),
            ]
        ),
        .init(
            title: "담임이 반 애들 앞에서\n내 성적 말함;",
            seats: ["리클라이너59", "나무스툴13", "가죽소파65"],
            chat: [
                ("교탁 앞 소파", "그건 선생님이 잘못했다"),
                ("출석부 나무스툴", "애들 앞에서는 진짜 아니지;"),
                ("반장 리클라이너", "나였으면 하루 종일 얼굴 빨개짐"),
                ("쉬는시간 방석", "따로 불러서 말하면 되잖아"),
                ("칠판 옆 편의점 의자", "부모님한테 말해봐도 될듯"),
                ("자습실 바퀴달린의자", "친구들은 별로 신경 안 쓸거야"),
                ("종례 끝난 스툴", "서운했다고 선생님께 말할 수 있음"),
                ("사물함 가죽소파", "그 순간 너무 창피했겠다 ㅠㅠ"),
            ],
            comments: [
                ("졸업앨범 방석", "가죽소파님 위로해주는 말 좋다"),
                ("체육관 리클라이너", "나무스툴님 비슷한 경험 있었구나"),
                ("급식 기다리는 스툴", "리클라이너님 힘내요!!"),
            ]
        ),
        .init(
            title: "편입 준비하는 애들아\n나만 포기하고 싶니..",
            seats: ["리클라이너24", "나무스툴77", "가죽소파16"],
            chat: [
                ("편입러 소파", "나도 지금 포기하고 싶음 ㅠㅠ"),
                ("토익 공부 나무스툴", "몇 개월째 준비 중이야?"),
                ("휴학생 리클라이너", "편입은 멘탈 싸움이라던데"),
                ("스터디 카페 방석", "같이 버티자 진짜"),
                ("단어장 든 편의점 의자", "나 작년에 붙었어 할 수 있음!"),
                ("막차 탄 바퀴달린의자", "하루 쉬고 다시 하면 됨"),
                ("형광펜 스툴", "주변에서 뭐라 하는 게 제일 힘들지"),
                ("합격 기원 가죽소파", "이 방 다 붙었으면 좋겠다"),
            ],
            comments: [
                ("새벽 열람실 방석", "나무스툴님 합격 수기 듣고 싶어요"),
                ("커피 마시는 리클라이너", "가죽소파님 같이 화이팅"),
                ("책상 위 스툴", "리클라이너님 말 위로됨"),
            ]
        ),
        .init(
            title: "남친이 1주년 선물로\n다이소 틴트 사줌",
            seats: ["리클라이너53", "나무스툴40", "가죽소파32"],
            chat: [
                ("기념일 소파", "1주년에 틴트 하나는 좀 서운하다"),
                ("리본 묶은 나무스툴", "근데 색은 예뻤어?"),
                ("꽃다발 리클라이너", "가격보다 마음이 중요하긴 함"),
                ("케이크 든 방석", "편지라도 같이 줬으면 괜찮음"),
                ("커플링 편의점 의자", "너는 뭐 줬는데? 그게 중요함 ㅋㅋ"),
                ("데이트 가는 바퀴달린의자", "남친이 학생이면 이해됨"),
                ("포장지 스툴", "나도 비슷한 선물 받고 울었음 ㅋㅋ"),
                ("설레는 가죽소파", "2주년엔 기대해봐도 될듯"),
            ],
            comments: [
                ("하트 뿅뿅 방석", "가죽소파님 남친 착한 듯"),
                ("기념일 챙기는 스툴", "나무스툴님 말 완전 맞음"),
                ("연애 고수 리클라이너", "리클라이너님 1주년 축하해요!"),
            ]
        ),
        .init(
            title: "남사친이 자꾸만\n좋아져서 고민이야",
            seats: ["리클라이너47", "나무스툴55", "가죽소파29"],
            chat: [
                ("짝사랑 소파", "남사친 좋아지는 거 진짜 설렘 ㅠㅠ"),
                ("고백각 나무스툴", "걔도 너 좋아하는 거 아님?"),
                ("우정 지킴이 리클라이너", "고백했다가 어색해질까 봐 무섭지"),
                ("단짝 방석", "둘이 자주 연락해?"),
                ("망설이는 편의점 의자", "슬쩍 떠보는 질문 해봐"),
                ("두근대는 바퀴달린의자", "나도 남사친이랑 사귀는 중 ㅋㅋ"),
                ("고민 많은 스툴", "친구로 남을지 정하는 게 제일 어려움"),
                ("응원단 가죽소파", "이 방 다들 연애 고수인듯"),
            ],
            comments: [
                ("핑크빛 방석", "가죽소파님 꼭 잘됐으면 좋겠다"),
                ("설렘 가득 리클라이너", "나무스툴님 경험담 짱이다"),
                ("수줍은 스툴", "리클라이너님 결과 알려줘요!"),
            ]
        ),
        .init(
            title: "너네는 친구가 남미새면\n어떻게 할거야?",
            seats: ["리클라이너68", "나무스툴30", "가죽소파57"],
            chat: [
                ("솔직한 소파", "남미새 친구 진짜 피곤함 ㅋㅋ"),
                ("약속 깨진 나무스툴", "남친 생기면 연락 끊기는 타입?"),
                ("단톡방 리클라이너", "우리 약속 잡아놓고 매번 취소함"),
                ("서운한 방석", "그래도 친구니까 한 번은 말해봐"),
                ("혼자 남은 편의점 의자", "나도 그런 친구 있어서 거리 둠"),
                ("연애 상담 바퀴달린의자", "헤어지면 다시 연락 오는 게 국룰"),
                ("쿨한 스툴", "각자 연애 스타일이 다른 거지 뭐"),
                ("기다리는 가죽소파", "이거 공감하는 사람 엄청 많을 듯"),
            ],
            comments: [
                ("듣고 있는 방석", "리클라이너님 썰 너무 공감됨"),
                ("맞장구 스툴", "가죽소파님 사이다 발언 ㄹㅇ"),
                ("차분한 편의점 의자", "나무스툴님 생각 멋있다"),
            ]
        ),
        .init(
            title: "친친 스토리에 나만 빼고\n등록해둔 친구가 있어",
            seats: ["리클라이너75", "나무스툴62", "가죽소파20"],
            chat: [
                ("스토리 보는 소파", "친친에서 빠진 거 알면 진짜 서운함"),
                ("하트 누른 나무스툴", "실수로 빠진 걸수도 있지 않아?"),
                ("눈치 빠른 리클라이너", "다른 애들은 다 들어가 있대?"),
                ("핸드폰 든 방석", "나라면 모른 척하고 계속 지켜봄"),
                ("캡처한 편의점 의자", "친친 목록 확인하는 법 있음?"),
                ("알림 켠 바퀴달린의자", "이건 대놓고 거리 두는 거 같은데"),
                ("프사 바꾼 스툴", "직접 물어보면 엄청 어색할듯 ㅠㅠ"),
                ("팔로잉 가죽소파", "나도 당해봐서 무슨 기분인지 앎"),
            ],
            comments: [
                ("공감 백배 방석", "가죽소파님 마음 너무 이해돼요"),
                ("새벽 감성 리클라이너", "나무스툴님 조언 찰떡이다"),
                ("구독자 스툴", "리클라이너님 그 친구랑 얘기해봤어요?"),
            ]
        ),
    ]
}
