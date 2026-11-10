import SwiftUI

// 라이브, 커뮤니티, 알림 화면의 글과 그림. 팀 피그마 프레임(라이브 1943:12396 외 카테고리 5장, 커뮤니티 1953:19406, 글 상세 1953:12298,
// 알림 1952:14673, 1952:14617, 1952:14693)에 적힌 그대로다. 그림 이름은 피그마 원본 해시 앞 12자리다.

/// 라이브 목록 카드 하나(피그마 1972:22375 "라이브 · 리스트 시안 v2", 상태 정의 1972:22488). 342 x 112.
struct LiveCard: Identifiable, Hashable {
    var id: String { title }
    let title: String
    let viewers: String
    /// 보는 수 옆 글(남은 시간, 방금 열림, 첫 대화 상대를 기다려요). 곧 끝나는 방은 비어 있고 빨간 시계가 뜬다.
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
            .init(title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-f77c03c1bf", ring: false), .chair(278, 46, 48, "D2-chair-25629e6f", ring: true), .speaking(312, 81), .fresh(8, 24)]),
            .init(title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?", viewers: "22", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-6bfc511e24", ring: true), .speaking(309, 81)]),
            .init(title: "친구 전남친이랑 썸 타는 중… \n괜찮음?", viewers: "22", meta: "", metaBlue: false, els: [.timer(269, 16, "03:00"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(253, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(275, 46, 48, "D-chairt-3ff806dcf7", ring: true), .speaking(309, 81)]),
            .init(title: "동생이 내 옷 말없이\n입고 나감. 개열받는다", viewers: "4", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-801d8aedde", ring: false), .chair(253, 62, 32, "D-chairt-bbab91fe74", ring: false), .chair(275, 46, 48, "D-chairt-b5c25c4cae", ring: true), .speaking(309, 81)]),
            .init(title: "오빠랑 아빠랑 \n심하게 싸워서 눈치보여", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(278, 46, 48, "D-chairt-ef3d01c180", ring: true), .speaking(312, 81), .fresh(8, 24)]),
            .init(title: "부모님 싸우는 소리에 \n잠을 못 자겠어", viewers: "4", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D-chairt-b5c25c4cae", ring: false), .chair(278, 51, 48, "D-chairt-801d8aedde", ring: false)]),
            .init(title: "조별과제 무임승차한 동기\n이름 빼버릴까?", viewers: "6", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(253, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(275, 46, 48, "D-chairt-33871c043e", ring: true), .speaking(309, 81)]),
            .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", viewers: "7", meta: "", metaBlue: false, els: [.timer(269, 16, "03:00"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(253, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(275, 46, 48, "D2-chair-7c2f0480", ring: true), .speaking(309, 81)]),
            .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", viewers: "2", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D2-chair-ad4a1456", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-5e85ee935b", ring: true), .speaking(309, 81)]),
        ],
        "친구": [
            .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", viewers: "11", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D2-chair-ad4a1456", ring: true), .speaking(309, 81)]),
            .init(title: "내 머리 끝부터 발끝까지\n따라하는 손민수 친구가 있어", viewers: "7", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D2-chair-25629e6f", ring: false), .chair(278, 51, 48, "D-chairt-4a2fafbdd2", ring: false)]),
            .init(title: "생일에 나만 선물\n안 챙겨준 베프", viewers: "10", meta: "첫 대화 상대를 기다려요", metaBlue: true, els: [.empty(256, 62), .chair(278, 46, 48, "D-chairt-51be0a544b", ring: false)]),
        ],
        "연애": [
            .init(title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-f77c03c1bf", ring: false), .chair(278, 46, 48, "D2-chair-25629e6f", ring: true), .speaking(312, 81), .fresh(8, 24)]),
            .init(title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?", viewers: "22", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-6bfc511e24", ring: true), .speaking(309, 81)]),
            .init(title: "친구 전남친이랑 썸 타는 중… \n괜찮음?", viewers: "22", meta: "", metaBlue: false, els: [.timer(269, 16, "03:00"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(253, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(275, 46, 48, "D-chairt-3ff806dcf7", ring: true), .speaking(309, 81)]),
        ],
        "가족": [
            .init(title: "동생이 내 옷 말없이\n입고 나감. 개열받는다", viewers: "4", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-801d8aedde", ring: false), .chair(253, 62, 32, "D-chairt-bbab91fe74", ring: false), .chair(275, 46, 48, "D-chairt-b5c25c4cae", ring: true), .speaking(309, 81)]),
            .init(title: "오빠랑 아빠랑 \n심하게 싸워서 눈치보여", viewers: "22", meta: "방금 열림", metaBlue: true, els: [.chair(256, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(278, 46, 48, "D-chairt-ef3d01c180", ring: true), .speaking(312, 81), .fresh(8, 24)]),
            .init(title: "부모님 싸우는 소리에 \n잠을 못 자겠어", viewers: "4", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D-chairt-b5c25c4cae", ring: false), .chair(278, 51, 48, "D-chairt-801d8aedde", ring: false)]),
        ],
        "학교": [
            .init(title: "조별과제 무임승차한 동기\n이름 빼버릴까?", viewers: "6", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-cf2670f44f", ring: false), .chair(253, 62, 32, "D-chairt-d7b0bb5005", ring: false), .chair(275, 46, 48, "D-chairt-33871c043e", ring: true), .speaking(309, 81)]),
            .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", viewers: "7", meta: "", metaBlue: false, els: [.timer(269, 16, "03:00"), .more(212, 65, "+3"), .chair(231, 62, 32, "D-chairt-6e90eda49e", ring: false), .chair(253, 62, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(275, 46, 48, "D2-chair-7c2f0480", ring: true), .speaking(309, 81)]),
            .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", viewers: "2", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D2-chair-ad4a1456", ring: false), .chair(253, 62, 32, "D-chairt-450692c4db", ring: false), .chair(275, 46, 48, "D-chairt-5e85ee935b", ring: true), .speaking(309, 81)]),
        ],
        "진로": [
            .init(title: "모의고사 7등급이야\n나 대학 갈 수 있을까?", viewers: "21", meta: "12:32 남음", metaBlue: false, els: [.more(212, 65, "+1"), .chair(231, 62, 32, "D-chairt-eab22a7a4d", ring: false), .chair(253, 62, 32, "D-chairt-b5c25c4cae", ring: false), .chair(275, 46, 48, "D-chairt-4fdd18ce8a", ring: true), .speaking(309, 81)]),
            .init(title: "담임이 반 애들 앞에서\n내 성적 말함;", viewers: "5", meta: "8:10 남음", metaBlue: false, els: [.chair(256, 67, 32, "D-chairt-4fdd18ce8a", ring: false), .chair(278, 51, 48, "D-chairt-90255286ed", ring: false)]),
            .init(title: "편입 준비하는 애들아\n나만 포기하고 싶니..", viewers: "2", meta: "첫 대화 상대를 기다려요", metaBlue: true, els: [.empty(256, 62), .chair(278, 46, 48, "D-chairt-66dbe89dae", ring: false)]),
        ],
    ]
    static let featured: [LiveFeatured] = [
        .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", versus: "이거 백퍼 질투 맞지?", time: "04:30", viewers: "22", scene: "D3-live-scene-1"),
        .init(title: "남친이 1주년 선물로\n다이소 틴트 사줌", versus: "헤어질까 말까", time: "07:50", viewers: "15", scene: "D3-live-scene-2"),
    ]
    static let bell = "C-4fdd18ce8a29"
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
    // 피그마 1953:19492(첫 장면, 라이브 목록 1943:12456과 같은 그림)와 1953:19497
    static let scenes = ["D3-live-scene-1", "C-1d4163290693"]
    static let featuredTitles = ["둘이 찍은 사진인데\n지만 보정해서 올린 여우", "남친이 1주년 선물로\n다이소 틴트 사줌"]
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
        .init(name: "퇴근길 편의점 의자", time: "1시간 전", text: "사람들이 너무 많아서 한참 기다렸다가 탄 기억이 나네요", likes: 15, avatar: "C-b5c25c4caef8"),
        .init(name: "주말 아침 나무스툴", time: "3시간 전", text: "조용한 분위기와 향긋한 커피 덕분에 힐링했어요", likes: 23, avatar: "C-d7b0bb5005bf"),
        .init(name: "비 오는 날 바퀴달린의자", time: "5시간 전", text: "갑자기 비가 쏟아져서 우산 없이 고생했어요", likes: 8, avatar: "C-cf2670f44f76"),
        .init(name: "길거리 편의점 의자", time: "7시간 전", text: "우연히 본 벽화가 너무 예뻐서 사진 찍었네요", likes: 12, avatar: "C-33871c043e7c"),
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
        Story.current = WatchPick.isPhoto(pick.title) ? .photo : .ssang
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
