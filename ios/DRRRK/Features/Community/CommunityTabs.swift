import SwiftUI

// 커뮤니티 목록 카테고리 탭(의정 11. 11. "커뮤니티 탭 눌러서 바뀌는 화면 추가", 피그마 섹션 2272:13452). 웹 communityTabs.js와 같은 값이다.
// 다섯 프레임(친구 2271:12436, 연애 2271:12587, 가족 2271:12738, 학교 2271:12889, 진로 2271:13040)과 전체(1953:19406)를 노드마다 비교하면
// 다른 곳은 목록 카드 5장의 제목과 따봉 수, 댓글 수, 썸네일 그림, 고른 탭 글자와 밑줄 자리뿐이다. 명예의 전당과 정렬 줄, 머리, 아래 탭은 같다.
// 썸네일은 피그마 그림 3장을 카드 자리마다 정해진 자르기로 80 x 80에 늘린 모양이다. 전체 탭에 있던 짝은 F-community-thumb-1~3을 다시 쓰고,
// 새 짝 6개는 피그마 원본 그림을 같은 자르기로 240 x 240에 자른 JPEG(F-community-thumb-<그림>-<자르기>)다.

// 11. 12. 새 섹션 "자간줄여" 탭 프레임(2340:30370 친구, 2340:30480 연애, 2340:30590 가족, 2340:30700 학교, 2340:30810 진로, 탁빛나 "UI 변경되어 반영 필요합니다"):
// 친구 카드 2 숫자와 그림, 연애와 가족 카드 1, 2 그림, 학교 카드 1, 2 그림, 진로 카드 1 그림이 바뀌었다. 새 그림 6장은 피그마 Thumb 노드를 3배로 내보낸 PNG(F-community-thumb-<그림>)다.

/// 고른 탭. 글 상세에 갔다가 뒤로 오면 이어지고(목록 화면이 살아 있다), 아래 탭으로 다른 화면에 갔다 오면 전체에서 다시 시작한다(웹 sessionStorage drrrk-comm-tab과 같은 규칙).
enum CommunityTabState {
    nonisolated(unsafe) static var selected = "전체"
    /// 탭을 바꿀 때 목록이 겹쳐 옅어지고 짙어지는 시간(웹 180ms, 표준 곡선)
    static let fade = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.18)
}

extension CommunityData {
    /// 탭별 카드 5장. 글과 숫자는 각 피그마 프레임의 List Card / 1~5 그대로다.
    static let tabPosts: [String: [CommunityPost]] = [
        "친구": [
            .init(title: "친구가 썸남 앞에서\n내 쌍밍아웃함", likes: 128, comments: 52, thumb: "F-community-thumb-1"),
            .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", likes: 48, comments: 23, thumb: "F-community-thumb-3"),
            .init(title: "단톡방에 나만 빼고\n새 방 판 거 알아버림", likes: 73, comments: 38, thumb: "F-community-thumb-3"),
            .init(title: "생일 파티에 나만\n초대 못 받은 썰", likes: 58, comments: 27, thumb: "F-community-thumb-1"),
            .init(title: "절친이 내 흑역사를\n스토리에 올렸다", likes: 44, comments: 19, thumb: "F-community-thumb-935b1b-t1"),
        ],
        "연애": [
            .init(title: "고백했는데 답장이\n'ㅇㅋ' 두 글자였다", likes: 214, comments: 87, thumb: "F-community-thumb-e2f891"),
            .init(title: "전남친이 내 친구랑\n사귄다는 소식 들음", likes: 156, comments: 63, thumb: "F-community-thumb-6b25e7"),
            .init(title: "첫 데이트에서\n의외의 취미 발견!", likes: 102, comments: 48, thumb: "F-community-thumb-4748fa-t3"),
            .init(title: "남친 폰에서 내 이름이\n'과제 조원'이었다", likes: 89, comments: 36, thumb: "F-community-thumb-935b1b-t1"),
            .init(title: "100일 선물로\n문화상품권 받은 썰", likes: 67, comments: 22, thumb: "F-community-thumb-1864c9-t1"),
        ],
        "가족": [
            .init(title: "엄마가 내 일기장\n읽고 모른 척하는 중", likes: 143, comments: 58, thumb: "F-community-thumb-cfa7e0"),
            .init(title: "동생이 내 옷 입고\n소개팅 나갔다", likes: 91, comments: 33, thumb: "F-community-thumb-a7bbcf"),
            .init(title: "아빠 카톡 프사가\n내 흑역사 사진임", likes: 78, comments: 29, thumb: "F-community-thumb-935b1b-t3"),
            .init(title: "명절마다 듣는\n'취업은 했니' 대처법", likes: 62, comments: 44, thumb: "F-community-thumb-1864c9-t1"),
            .init(title: "가족 단톡방에\n잘못 보낸 메시지", likes: 39, comments: 15, thumb: "F-community-thumb-1"),
        ],
        "학교": [
            .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", likes: 131, comments: 47, thumb: "F-community-thumb-2"),
            .init(title: "조별과제 혼자 다 했는데\n이름은 다섯 명", likes: 118, comments: 56, thumb: "F-community-thumb-5b7485"),
            .init(title: "시험 공부 대신\n친구들과 노래방 간 썰", likes: 84, comments: 31, thumb: "F-community-thumb-3"),
            .init(title: "담임쌤한테 '엄마'라고\n불러버렸다", likes: 70, comments: 24, thumb: "F-community-thumb-1"),
            .init(title: "발표하다 목소리\n뒤집힌 썰 푼다", likes: 52, comments: 18, thumb: "F-community-thumb-935b1b-t1"),
        ],
        "진로": [
            .init(title: "꿈이 없다고 했더니\n상담이 2시간 됐다", likes: 109, comments: 45, thumb: "F-community-thumb-17e148"),
            .init(title: "부모님은 공무원 하라는데\n나는 그림이 좋다", likes: 97, comments: 61, thumb: "F-community-thumb-1864c9-t2"),
            .init(title: "면접에서 장점 묻는데\n머리가 하얘짐", likes: 81, comments: 34, thumb: "F-community-thumb-4748fa-t3"),
            .init(title: "전과할지 말지\n3학기째 고민 중", likes: 56, comments: 28, thumb: "F-community-thumb-935b1b-t1"),
            .init(title: "퇴사하고 싶은데\n통장 잔고가 말린다", likes: 48, comments: 37, thumb: "F-community-thumb-1864c9-t1"),
        ],
    ]

    /// 탭의 카드. 전체는 기존 목록(피그마 1953:19406) 그대로다.
    static func posts(for tab: String) -> [CommunityPost] {
        tabPosts[tab] ?? posts
    }
}
