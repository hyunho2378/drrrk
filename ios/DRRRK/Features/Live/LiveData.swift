import SwiftUI

// 라이브, 커뮤니티, 알림 화면의 글과 그림. 팀 피그마 프레임(라이브 1943:12396 외 카테고리 5장, 커뮤니티 1953:19406, 글 상세 1953:12298,
// 알림 1952:14673, 1952:14617, 1952:14693)에 적힌 그대로다. 그림 이름은 피그마 원본 해시 앞 12자리다.

struct LiveRoom: Identifiable, Hashable {
    let id = UUID()
    let title: String
    let talk: String
    let viewers: String
    let time: String
    let thumb: String
    var talkers: Int {
        Int(talk.filter(\.isNumber)) ?? 0
    }

    var seconds: Int {
        let p = time.split(separator: ":").compactMap { Int($0) }; return p.count == 2 ? p[0] * 60 + p[1] : 0
    }
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
    static let rooms: [String: [LiveRoom]] = [
        "전체": [
            .init(title: "친구가 썸남 앞에서\n내 쌍밍아웃함", talk: "4명 이야기 중", viewers: "22", time: "12:32", thumb: "C-aed9f13a722e"),
            .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", talk: "6명 이야기 중", viewers: "31", time: "17:32", thumb: "C-7a39098e95ff"),
            .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", talk: "2명 이야기 중", viewers: "7", time: "09:05", thumb: "C-25a2bc805dc3"),
        ],
        "친구": [
            .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", talk: "2명 이야기 중", viewers: "11", time: "16:32", thumb: "C-5534d467597a"),
            .init(title: "생일에 나만 선물\n안 챙겨준 베프", talk: "5명 이야기 중", viewers: "10", time: "02:41", thumb: "C-7a39098e95ff"),
            .init(title: "맨날 얻어먹고 한 번도 안 사는\n친구 손절할까요?\n잡았대요..", talk: "2명 이야기 중", viewers: "7", time: "09:05", thumb: "C-1864c996939e"),
        ],
        "연애": [
            .init(title: "3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?", talk: "3명 이야기 중", viewers: "4", time: "17:32", thumb: "C-34524f68bebb"),
            .init(title: "전 애인이랑 아직\n맞팔 중인 남친, 미친거아냐?", talk: "3명 이야기 중", viewers: "4", time: "16:32", thumb: "C-c5b63a54c6dc"),
            .init(title: "친구 전남친이랑 썸 타는 중… \n괜찮음?", talk: "2명 이야기 중", viewers: "7", time: "09:05", thumb: "C-1864c996939e"),
        ],
        "가족": [
            .init(title: "동생이 내 옷 말없이\n입고 나감. 개열받는다", talk: "4명 이야기 중", viewers: "4", time: "18:32", thumb: "C-42487f59e8cf"),
            .init(title: "오빠랑 아빠랑 \n심하게 싸워서 눈치보여", talk: "6명 이야기 중", viewers: "10", time: "01:51", thumb: "C-935b1b80a260"),
            .init(title: "부모님 싸우는 소리에 \n잠을 못 자겠어", talk: "2명 이야기 중", viewers: "4", time: "09:05", thumb: "C-34524f68bebb"),
        ],
        "학교": [
            .init(title: "조별과제 무임승차한 동기\n이름 빼버릴까?", talk: "4명 이야기 중", viewers: "6", time: "12:32", thumb: "C-8ae1794643d8"),
            .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", talk: "6명 이야기 중", viewers: "7", time: "02:41", thumb: "C-9820410bac5a"),
            .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", talk: "2명 이야기 중", viewers: "2", time: "09:05", thumb: "C-1864c996939e"),
        ],
        "진로": [
            .init(title: "모의고사 4등급.\n대학 갈 수 있을까?", talk: "3명 이야기 중", viewers: "21", time: "17:32", thumb: "C-7e1a4cbf18b3"),
            .init(title: "담임이 반 애들 앞에서\n내 성적 말함;", talk: "3명 이야기 중", viewers: "5", time: "16:32", thumb: "C-ac5b50b3432d"),
            .init(title: "담임이랑 수시상담했다\n질문 받는다", talk: "2명 이야기 중", viewers: "2", time: "10:05", thumb: "C-34524f68bebb"),
        ],
    ]
    static let featured: [LiveFeatured] = [
        .init(title: "둘이 찍은 사진인데\n지만 보정해서 올린 여우", versus: "이거 백퍼 질투 맞지?", time: "04:30", viewers: "22", scene: "C-e6895f376e87"),
        .init(title: "남친이 1주년 선물로\n다이소 틴트 사줌", versus: "헤어질까 말까", time: "07:50", viewers: "15", scene: "C-1d4163290693"),
    ]
    static let bell = "C-4fdd18ce8a29"
}

struct WatchSeat: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let image: String
}

enum WatchData {
    static let scene = "C-841d51748126"
    static let title = "둘이 찍은 사진인데\n지만 보정해서 올린 여우"
    static let seats: [WatchSeat] = [
        .init(name: "리클라이너21", image: "C-3ab7dfb2602d"),
        .init(name: "나무스툴12", image: "C-6977f0a432c8"),
        .init(name: "가죽소파19", image: "C-24a5f181f678"),
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
}

enum CommunityData {
    static let scenes = ["C-4376d77ef680", "C-1d4163290693"]
    static let featuredTitles = ["둘이 찍은 사진인데\n지만 보정해서 올린 여우", "남친이 1주년 선물로\n다이소 틴트 사줌"]
    static let posts: [CommunityPost] = [
        .init(title: "친구가 썸남 앞에서\n내 쌍밍아웃함", likes: 128, comments: 52, thumb: "C-4748fadc3ec9"),
        .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", likes: 31, comments: 17, thumb: "C-7a39098e95ff"),
        .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", likes: 48, comments: 23, thumb: "C-25a2bc805dc3"),
        .init(title: "시험 공부 대신\n친구들과 노래방 간 썰", likes: 75, comments: 35, thumb: "C-4748fadc3ec9"),
        .init(title: "첫 데이트에서\n의외의 취미 발견!", likes: 64, comments: 29, thumb: "C-4748fadc3ec9"),
    ]
    static let detailScene = "C-4376d77ef680"
    static let detailAuthor = "딱딱한 나무스툴12"
    static let detailBody = "유진이 얼굴만 잡티 하나 없이 보정해서 올렸어. 내 얼굴은 그대로… 이거 나만 서운한 거야?"
    static let detailSeats = ["C-3ab7dfb2602d", "C-6977f0a432c8", "C-24a5f181f678"]
    static let comments: [PostComment] = [
        .init(name: "푹신푹신 리클라이너17", time: "2시간 전", text: "질투 반, 귀찮음 반임 ㅋㅋ “나도 좀 해주지~” 하고 웃으면서 던져봐", likes: 48),
        .init(name: "딱딱한 나무스툴12", time: "1시간 전", text: "근데 웃으면서 말하면 오히려 더 어색하지 않아?", likes: 12, reply: true),
        .init(name: "새벽2시 소파", time: "41분 전", text: "나도 똑같은 일 있었는데 물어보니까 진짜 걍 생각없이 올린거였음", likes: 9),
        .init(name: "퇴근길 편의점 의자", time: "1시간 전", text: "사람들이 너무 많아서 한참 기다렸다가 탄 기억이 나네요", likes: 15),
        .init(name: "주말 아침 나무스툴", time: "3시간 전", text: "조용한 분위기와 향긋한 커피 덕분에 힐링했어요", likes: 23),
        .init(name: "비 오는 날 바퀴달린의자", time: "5시간 전", text: "갑자기 비가 쏟아져서 우산 없이 고생했어요", likes: 8),
        .init(name: "길거리 편의점 의자", time: "7시간 전", text: "우연히 본 벽화가 너무 예뻐서 사진 찍었네요", likes: 12),
    ]
}

/// 프로필 의자: 피그마 "프로필용 의자들" 25개(편의점 의자, 스툴, 소파, 바퀴달린 의자, 리클라이너 각 5색). 이름마다 같은 의자를 쓴다.
enum Avatars {
    static let all = ["C-4fdd18ce8a29", "C-5e85ee935bf4", "C-b5c25c4caef8", "C-33871c043e7c", "C-6bfc511e24bf", "C-51be0a544b5f", "C-bbab91fe747a", "C-450692c4dbd6", "C-d7b0bb5005bf", "C-90255286edc8", "C-eab22a7a4d50", "C-6e90eda49e34", "C-b684e5de0a90", "C-4a2fafbdd2df", "C-66dbe89daeb4", "C-40b4fa7cb4ef", "C-f77c03c1bf89", "C-801d8aedde75", "C-cf2670f44f76", "C-ad12677ce6f5", "C-ef3d01c18073", "C-3ff806dcf77f", "C-ad4a14569046", "C-7c2f0480f099", "C-25629e6f941c"]
    static func image(for name: String) -> String {
        let groups: [(String, Int)] = [("편의점", 0), ("스툴", 5), ("소파", 10), ("바퀴", 15), ("리클라이너", 20)]
        let seed = name.unicodeScalars.reduce(7) { ($0 &* 31 &+ Int($1.value)) & 0x7FFF_FFFF }
        if let g = groups.first(where: { name.contains($0.0) }) {
            return all[g.1 + seed % 5]
        }
        return all[seed % all.count]
    }
}
