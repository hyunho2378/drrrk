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

// 글 상세와 대화 다시보기 더미 글(2026. 11. 12. 03:13 사용자 지시 "상세페이지 죄다 다르게"). 웹 postScripts.js와 같은 값이다.
// 명예의 전당 5장과 탭 여섯 목록 카드 제목 25개마다 작성자, 시간, 본문, 댓글 일곱 개(둘째는 첫 댓글의 답글), 다시보기 댓글 두 줄.
// 사진보정 글은 이 표에 없고 피그마 원문(CommunityData.detailBody, comments)을 쓴다. 따봉 수와 댓글 수는 누른 목록 카드 숫자를 쓴다.
// 댓글 의자 그림은 이름으로 고른다(Avatars.image(for:), 웹 chairAvatar와 같은 계산).
struct PostScript {
    let title: String
    let author: String
    let time: String
    let body: String
    let comments: [PostComment]
    let replay: [(name: String, text: String)]
}

extension CommunityData {
    static let scripts: [PostScript] = [
        .init(title: "친구가 썸남 앞에서\n내 쌍밍아웃함", author: "흔들리는 소파23", time: "3시간 전",
              body: "셋이 떡볶이 먹으러 가는데 걔가 썸남 앞에서 내 쌍수 잘됐다고 크게 말함.. 썸남 표정 보고 집에 오자마자 이불 찼어",
              comments: [
                .init(name: "흔들리는 가죽 소파8", time: "2시간 전", text: "그걸 굳이 썸남 앞에서 말하는 건 일부러인듯", likes: 21),
                .init(name: "눈 오는 날 편의점 의자3", time: "1시간 전", text: "222 타이밍이 너무 기가 막혀서 실수는 아닌듯..", likes: 7, reply: true),
                .init(name: "도서관 나무스툴17", time: "58분 전", text: "썸남은 뭐라고 했는데? 반응이 제일 중요함", likes: 14),
                .init(name: "옥상 바퀴달린의자17", time: "1시간 전", text: "나 같으면 그 자리에서 응 나 잘됐지? 하고 웃어버릴듯 ㅋㅋ", likes: 33),
                .init(name: "구석 소파26", time: "2시간 전", text: "쌍수가 뭐 어때서 요즘 다 하는데 ㅠㅠ 기죽지 마", likes: 19),
                .init(name: "말랑한 바퀴달린의자2", time: "3시간 전", text: "그 친구한테 나중에 따로 말은 해봐야 할듯", likes: 11),
                .init(name: "말랑한 리클라이너5", time: "3시간 전", text: "썸남이 괜찮은 사람이면 신경도 안 씀 걱정 노노", likes: 26),
              ],
              replay: [("따뜻한 소파24", "셋이 있을 때 그러면 할 말 없어지지"), ("작은 소파15", "썸남 반응 궁금해서 끝까지 봄 ㅋㅋ")]),
        .init(title: "화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", author: "작은 리클라이너10", time: "5시간 전",
              body: "같이 먹을 애가 없어서 급식 빵 챙겨서 화장실 칸에서 먹는데 옆 칸에서 우리 반 회장 목소리가 들림.. 숨도 못 쉬고 나옴",
              comments: [
                .init(name: "창가 가죽 소파23", time: "4시간 전", text: "헐 회장이 알아챈 거야? 그 뒤에 아는 척함?", likes: 12),
                .init(name: "일요일 리클라이너12", time: "3시간 전", text: "아는 척 안 하는 게 더 어색할듯..", likes: 4, reply: true),
                .init(name: "기울어진 소파9", time: "2시간 전", text: "나도 중학교 때 혼밥 무서워서 도서관 갔었음", likes: 17),
                .init(name: "일요일 나무스툴11", time: "1시간 전", text: "다음엔 나랑 먹자 진짜로 ㅠㅠ", likes: 22),
                .init(name: "졸린 나무스툴2", time: "3시간 전", text: "혼자 먹는 거 생각보다 아무도 신경 안 써 당당하게 먹어도 됨", likes: 15),
                .init(name: "빈티지 바퀴달린의자25", time: "4시간 전", text: "회장이 오히려 같이 먹자고 할 수도 있잖아", likes: 8),
                .init(name: "구석 편의점 의자8", time: "5시간 전", text: "썰 푼다길래 웃긴 얘긴 줄 알았는데 마음 아프다..", likes: 10),
              ],
              replay: [("줄무늬 바퀴달린의자18", "옆 칸 회장 나올 때 소름 돋았음"), ("보들보들 가죽 소파17", "혼밥 진짜 아무렇지 않은 건데 ㅠㅠ")]),
        .init(title: "맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", author: "작은 편의점 의자23", time: "1시간 전",
              body: "편의점 갈 때마다 나만 계산함. 이번엔 나 지갑 없다 했더니 걔도 없다고 그냥 나가자 함.. 이거 나만 손해 보는 거 맞지?",
              comments: [
                .init(name: "반짝이는 바퀴달린의자8", time: "52분 전", text: "그 친구 지갑은 평생 집에 있는듯 ㅋㅋ", likes: 18),
                .init(name: "기울어진 소파5", time: "40분 전", text: "ㅋㅋㅋ 집에 고이 모셔둠", likes: 6, reply: true),
                .init(name: "분홍 나무스툴5", time: "47분 전", text: "다음엔 반반 하자고 대놓고 말해봐", likes: 11),
                .init(name: "흔들리는 소파2", time: "33분 전", text: "손절 전에 한 번은 말해보는 게 좋을듯 모를 수도 있음", likes: 9),
                .init(name: "흔들리는 나무스툴25", time: "29분 전", text: "나도 그런 친구 있었는데 말하니까 바로 고치더라", likes: 13),
                .init(name: "낡은 편의점 의자6", time: "21분 전", text: "계좌번호 보내 ㅋㅋ 장난처럼", likes: 7),
                .init(name: "동그란 가죽 소파19", time: "12분 전", text: "몇 년 친구냐에 따라 다를듯.. 오래됐으면 얘기부터", likes: 5),
              ],
              replay: [("하굣길 나무스툴10", "편의점 계산대 앞 그 침묵 뭔지 앎"), ("동그란 소파18", "반반 얘기 꺼내는 게 제일 어려움")]),
        .init(title: "시험 공부 대신\n친구들과 노래방 간 썰", author: "창가 나무스툴9", time: "6시간 전",
              body: "시험 전날 딱 한 시간만 하고 들어갔는데 서비스 시간이 계속 들어옴.. 나와보니 밤 11시였고 시험은 내일 1교시야",
              comments: [
                .init(name: "작은 가죽 소파6", time: "5시간 전", text: "서비스 시간은 못 참지 ㅋㅋㅋ", likes: 25),
                .init(name: "노란 가죽 소파21", time: "5시간 전", text: "사장님이 시험 망하게 하려고 작정함", likes: 9, reply: true),
                .init(name: "옥상 나무스툴2", time: "4시간 전", text: "그래서 시험은 어떻게 됐는데? 후기 ㄱㄱ", likes: 14),
                .init(name: "출근길 소파11", time: "3시간 전", text: "나 같으면 노래방에서 교과서 펼침 ㅋㅋ", likes: 8),
                .init(name: "단단한 가죽 소파12", time: "2시간 전", text: "그 노래방 어디임 서비스 많이 주는 곳이면 알려줘", likes: 6),
                .init(name: "노란 나무스툴3", time: "1시간 전", text: "시험은 다음에 잘 보면 되고 추억은 남았잖아", likes: 12),
                .init(name: "키 큰 편의점 의자2", time: "30분 전", text: "마지막 곡 뭐 불렀는지가 제일 궁금함", likes: 5),
              ],
              replay: [("골목길 가죽 소파23", "서비스 30분 추가될 때 다들 환호함 ㅋㅋ"), ("골목길 바퀴달린의자25", "1교시 시험이라니 너무 슬프다")]),
        .init(title: "첫 데이트에서\n의외의 취미 발견!", author: "회색 소파12", time: "2시간 전",
              body: "첫 데이트로 영화 보기로 했는데 걔가 갑자기 뜨개질 카페 가보자 함. 실 고르는 눈빛이 진지해서 나도 목도리 하나 시작했어",
              comments: [
                .init(name: "하굣길 나무스툴14", time: "1시간 전", text: "뜨개질에 진심인 사람 너무 귀엽잖아", likes: 31),
                .init(name: "기울어진 편의점 의자13", time: "1시간 전", text: "인정 손 꼼꼼한 사람이 다정함", likes: 10, reply: true),
                .init(name: "졸린 리클라이너4", time: "50분 전", text: "목도리 완성하면 서로 바꿔 끼는 거임?", likes: 15),
                .init(name: "일요일 리클라이너14", time: "44분 전", text: "첫 데이트부터 같이 할 거 생긴 거 부럽다", likes: 12),
                .init(name: "보들보들 바퀴달린의자3", time: "38분 전", text: "나는 첫 데이트에 낚시 따라감 ㅋㅋ 의외로 재밌었음", likes: 7),
                .init(name: "출근길 가죽 소파6", time: "25분 전", text: "완성하면 인증 꼭 올려줘", likes: 9),
                .init(name: "버스정류장 리클라이너14", time: "10분 전", text: "실 고르는 모습 상상돼서 웃김 ㅋㅋ", likes: 6),
              ],
              replay: [("기울어진 바퀴달린의자26", "뜨개질 카페 처음 들어봄 가보고 싶다"), ("기울어진 가죽 소파26", "목도리 색 뭐로 했는지 궁금함")]),
        .init(title: "단톡방에 나만 빼고\n새 방 판 거 알아버림", author: "골목길 바퀴달린의자4", time: "4시간 전",
              body: "친구 폰 알림 보다가 우리 넷 중에 나만 없는 방을 봤어. 방 이름이 주말 계획인데 나는 그 주말 얘기 처음 들음..",
              comments: [
                .init(name: "줄무늬 바퀴달린의자16", time: "3시간 전", text: "그거 보는 순간 심장 쿵 했겠다 ㅠㅠ", likes: 16),
                .init(name: "회색 소파13", time: "3시간 전", text: "숨 막히는 기분 뭔지 앎", likes: 5, reply: true),
                .init(name: "삐걱대는 소파19", time: "2시간 전", text: "혹시 깜짝 파티 준비하는 거 아님? 생일 가깝지 않아?", likes: 22),
                .init(name: "단단한 바퀴달린의자6", time: "2시간 전", text: "모른 척하고 주말에 뭐 하냐고 물어봐 반응 보면 앎", likes: 13),
                .init(name: "회색 편의점 의자28", time: "1시간 전", text: "넷 중에 셋이면 그냥 일정 맞는 애들끼리 만든 걸 수도", likes: 8),
                .init(name: "등받이 높은 소파23", time: "1시간 전", text: "나도 겪어봤는데 결국 내가 먼저 멀어짐..", likes: 6),
                .init(name: "일요일 나무스툴23", time: "20분 전", text: "너 서운한 거 당연해 이상한 거 아님", likes: 10),
              ],
              replay: [("구석 나무스툴17", "깜짝 파티면 좋겠다 진짜로"), ("단단한 나무스툴19", "방 이름 보고 나도 같이 놀람")]),
        .init(title: "생일 파티에 나만\n초대 못 받은 썰", author: "반짝이는 소파6", time: "7시간 전",
              body: "반 애들 거의 다 간 생일 파티였는데 나만 몰랐음. 월요일에 다들 사진 얘기하는데 혼자 웃으면서 듣고 있었어..",
              comments: [
                .init(name: "키 큰 소파23", time: "6시간 전", text: "월요일 교실 분위기 상상만 해도 힘들다", likes: 14),
                .init(name: "하굣길 바퀴달린의자21", time: "6시간 전", text: "웃으면서 듣는 게 제일 어려운 거임", likes: 6, reply: true),
                .init(name: "하늘색 가죽 소파5", time: "5시간 전", text: "명단에서 실수로 빠진 걸 수도 있어 물어보는 것도 방법", likes: 9),
                .init(name: "버스정류장 나무스툴14", time: "4시간 전", text: "그 생일 주인공이랑 원래 친했어?", likes: 5),
                .init(name: "기울어진 가죽 소파6", time: "3시간 전", text: "다음 내 생일엔 친한 애들만 불러서 더 재밌게 놀자", likes: 17),
                .init(name: "흔들리는 리클라이너29", time: "2시간 전", text: "사진 얘기 나오면 그냥 자리 피해도 돼", likes: 7),
                .init(name: "줄무늬 소파21", time: "1시간 전", text: "나도 그런 적 있는데 나중에 걔가 미안하다고 했음", likes: 8),
              ],
              replay: [("옥상 리클라이너4", "혼자 웃으면서 듣는 장면 너무 짠함"), ("하굣길 편의점 의자27", "실수였으면 좋겠다 ㅠㅠ")]),
        .init(title: "절친이 내 흑역사를\n스토리에 올렸다", author: "접이식 소파5", time: "1시간 전",
              body: "중학생 때 앞머리 자르고 운 사진을 생일 축하한다고 스토리에 올림.. 좋아요는 계속 오르는데 내리라고 하기도 애매해",
              comments: [
                .init(name: "쿠션 빠진 가죽 소파10", time: "55분 전", text: "생일 축하 명분이면 내리라고 하기 애매하다 ㅋㅋ", likes: 13),
                .init(name: "구석 바퀴달린의자10", time: "49분 전", text: "축하라서 화도 못 냄 ㅋㅋㅋ", likes: 4, reply: true),
                .init(name: "조용한 리클라이너24", time: "41분 전", text: "너도 걔 생일에 똑같이 해주면 됨", likes: 19),
                .init(name: "하늘색 바퀴달린의자17", time: "36분 전", text: "앞머리 사진은 누구나 하나씩 있음 괜찮아", likes: 7),
                .init(name: "회색 나무스툴14", time: "27분 전", text: "친한 친구 공개로 바꿔달라고만 해봐", likes: 9),
                .init(name: "말랑한 편의점 의자4", time: "18분 전", text: "근데 그 사진 귀여울 것 같은데?", likes: 5),
                .init(name: "출근길 리클라이너21", time: "6분 전", text: "하루만 참으면 스토리 사라짐 버텨", likes: 11),
              ],
              replay: [("옥상 바퀴달린의자24", "앞머리 자르고 운 거 너무 공감됨"), ("회색 소파7", "생일 축하라 뭐라 하기도 힘들지")]),
        .init(title: "고백했는데 답장이\n'ㅇㅋ' 두 글자였다", author: "도서관 리클라이너4", time: "9시간 전",
              body: "밤새 고민해서 긴 카톡으로 고백했는데 10분 뒤에 ㅇㅋ 하고 끝. 받아준 건지 알겠다는 건지 몰라서 잠을 못 잤어",
              comments: [
                .init(name: "낡은 편의점 의자19", time: "8시간 전", text: "ㅇㅋ는 진짜 해석 불가 ㅋㅋㅋ", likes: 41),
                .init(name: "등받이 높은 편의점 의자21", time: "8시간 전", text: "수능 국어보다 어려운 두 글자", likes: 17, reply: true),
                .init(name: "따뜻한 소파13", time: "7시간 전", text: "다음 날 얼굴 보면 바로 알듯 표정이 답임", likes: 22),
                .init(name: "출근길 편의점 의자8", time: "6시간 전", text: "혹시 너무 떨려서 짧게 보낸 거 아닐까?", likes: 19),
                .init(name: "말랑한 편의점 의자6", time: "4시간 전", text: "그래서 ㅇㅋ가 무슨 뜻이냐고 물어봤어?", likes: 12),
                .init(name: "보들보들 리클라이너23", time: "3시간 전", text: "나였으면 바로 ㅇㅋ가 뭔데 하고 보냄 ㅋㅋ", likes: 9),
                .init(name: "버스정류장 리클라이너26", time: "1시간 전", text: "후기 꼭 올려줘 궁금해서 잠 못 자겠다", likes: 15),
              ],
              replay: [("초록 가죽 소파5", "ㅇㅋ 두 글자에 다들 소리 지름 ㅋㅋ"), ("낡은 나무스툴6", "떨려서 짧게 보낸 거면 좋겠다")]),
        .init(title: "전남친이 내 친구랑\n사귄다는 소식 들음", author: "동그란 가죽 소파29", time: "8시간 전",
              body: "헤어진 지 두 달 됐는데 같이 다니던 친구랑 사귄대. 둘 다 아무렇지 않게 단톡에서 말 거는데 나만 이상한 사람 같아",
              comments: [
                .init(name: "빈티지 나무스툴6", time: "7시간 전", text: "두 달이면 너무 빠른 거 아님?", likes: 27),
                .init(name: "일요일 소파4", time: "7시간 전", text: "222 마음 정리할 시간은 줘야지", likes: 9, reply: true),
                .init(name: "새벽3시 바퀴달린의자21", time: "6시간 전", text: "단톡에서 아무렇지 않은 척하는 게 더 서운하다", likes: 18),
                .init(name: "일요일 리클라이너9", time: "5시간 전", text: "친구한테 지금은 좀 거리 두고 싶다고 말해도 돼", likes: 14),
                .init(name: "조용한 소파16", time: "4시간 전", text: "너 이상한 사람 아니야 누구라도 그럴 거야", likes: 21),
                .init(name: "옥상 편의점 의자10", time: "2시간 전", text: "나도 겪었는데 반년 지나니까 아무렇지 않아짐", likes: 11),
                .init(name: "졸린 편의점 의자27", time: "1시간 전", text: "단톡은 잠깐 알림 꺼두자", likes: 7),
              ],
              replay: [("눈 오는 날 나무스툴22", "같이 다니던 친구라 더 힘들듯"), ("눈 오는 날 소파11", "단톡 알림 끄는 거 찬성")]),
        .init(title: "남친 폰에서 내 이름이\n'과제 조원'이었다", author: "흔들리는 소파15", time: "3시간 전",
              body: "사귄 지 석 달인데 남친 폰에 전화 왔을 때 화면에 과제 조원이라고 뜸.. 조별과제 하다 만나긴 했는데 아직도?",
              comments: [
                .init(name: "눈 오는 날 소파22", time: "2시간 전", text: "석 달이면 바꿀 시간 충분했는데 ㅋㅋ", likes: 16),
                .init(name: "작은 바퀴달린의자13", time: "2시간 전", text: "귀찮아서 그런 거면 더 서운함", likes: 6, reply: true),
                .init(name: "단단한 소파27", time: "2시간 전", text: "그 자리에서 내 이름 바꿔줘 하고 직접 바꿔", likes: 21),
                .init(name: "반짝이는 편의점 의자23", time: "1시간 전", text: "우리 남친은 내 이름 아직도 성까지 풀네임임 ㅋㅋ", likes: 8),
                .init(name: "차가운 편의점 의자21", time: "1시간 전", text: "혹시 주변에 비밀로 하고 싶은 건 아니지?", likes: 10),
                .init(name: "하굣길 소파12", time: "43분 전", text: "과제 조원 귀엽긴 한데 석 달이면 좀 그렇다", likes: 5),
                .init(name: "옥상 리클라이너21", time: "15분 전", text: "하트 하나라도 붙여달라고 해", likes: 12),
              ],
              replay: [("말랑한 편의점 의자10", "과제 조원 뜰 때 다 같이 빵 터짐"), ("출근길 리클라이너19", "하트 붙이는 거 찬성")]),
        .init(title: "100일 선물로\n문화상품권 받은 썰", author: "도서관 가죽 소파13", time: "5시간 전",
              body: "나는 한 달 동안 용돈 모아서 커플링 샀는데 걔는 봉투에 문화상품권 만 원 넣어서 줌.. 고맙다고는 했는데 표정 관리가 안 됐어",
              comments: [
                .init(name: "조용한 나무스툴27", time: "4시간 전", text: "커플링이랑 만 원이면 표정 관리 힘들지 ㅠㅠ", likes: 18),
                .init(name: "구석 리클라이너4", time: "4시간 전", text: "봉투 열 때 기대했을 거 생각하면 짠하다", likes: 5, reply: true),
                .init(name: "등받이 높은 리클라이너4", time: "3시간 전", text: "혹시 그걸로 같이 영화 보자는 뜻 아님?", likes: 11),
                .init(name: "키 큰 바퀴달린의자11", time: "3시간 전", text: "선물보다 편지라도 있었으면 좋았을 텐데", likes: 9),
                .init(name: "쿠션 빠진 나무스툴17", time: "2시간 전", text: "다음 기념일 전에 서로 하고 싶은 거 미리 얘기해봐", likes: 7),
                .init(name: "일요일 편의점 의자23", time: "1시간 전", text: "걔가 선물 고르는 거 진짜 못하는 스타일일 수도", likes: 6),
                .init(name: "졸린 가죽 소파8", time: "35분 전", text: "그래도 100일 축하해", likes: 4),
              ],
              replay: [("버스정류장 편의점 의자8", "봉투 열 때 다들 숨 참음 ㅋㅋ"), ("보들보들 리클라이너12", "커플링 너무 예쁘다")]),
        .init(title: "엄마가 내 일기장\n읽고 모른 척하는 중", author: "흔들리는 리클라이너14", time: "6시간 전",
              body: "일기장에 쓴 짝사랑 얘기를 엄마가 저녁 먹다가 은근슬쩍 꺼냄. 모른 척하는데 자꾸 그 애 이름 비슷한 말을 해서 미치겠어",
              comments: [
                .init(name: "흔들리는 바퀴달린의자15", time: "5시간 전", text: "은근슬쩍 꺼내는 거 진짜 엄마들 특기임 ㅋㅋ", likes: 29),
                .init(name: "눈 오는 날 나무스툴8", time: "5시간 전", text: "우리 엄마도 그래서 일기장 자물쇠 삼", likes: 8, reply: true),
                .init(name: "동그란 리클라이너18", time: "4시간 전", text: "엄마도 궁금해서 그런 거니까 귀엽게 봐줘", likes: 13),
                .init(name: "말랑한 가죽 소파15", time: "3시간 전", text: "일기장 숨길 곳 추천함 책장 맨 아래 칸", likes: 6),
                .init(name: "출근길 리클라이너15", time: "2시간 전", text: "그냥 엄마 내 일기 봤지? 하고 웃으면서 물어봐", likes: 17),
                .init(name: "새벽3시 소파18", time: "2시간 전", text: "나는 일기를 아예 폰 메모장에 씀 비번 걸고", likes: 10),
                .init(name: "조용한 가죽 소파5", time: "1시간 전", text: "이름 비슷한 말 뭐였는지 너무 궁금하다 ㅋㅋ", likes: 7),
              ],
              replay: [("동그란 나무스툴10", "저녁 식탁 분위기 상상돼서 웃김"), ("동그란 바퀴달린의자19", "엄마 반응 너무 현실적이다")]),
        .init(title: "동생이 내 옷 입고\n소개팅 나갔다", author: "줄무늬 소파8", time: "2시간 전",
              body: "아까워서 한 번도 안 입은 원피스가 없어서 찾았는데 동생 소개팅 사진에 그대로 있음. 심지어 소개팅은 잘됐대..",
              comments: [
                .init(name: "분홍 가죽 소파25", time: "1시간 전", text: "소개팅 잘된 게 제일 킹받는 포인트 ㅋㅋ", likes: 24),
                .init(name: "반짝이는 가죽 소파13", time: "1시간 전", text: "내 원피스 덕분인데 고맙단 말도 없음", likes: 7, reply: true),
                .init(name: "말랑한 소파25", time: "57분 전", text: "대여료 받아 진짜로", likes: 16),
                .init(name: "노란 나무스툴6", time: "48분 전", text: "나는 언니 옷 몰래 입었다가 소스 묻혀서 지금까지 혼남", likes: 11),
                .init(name: "하늘색 리클라이너15", time: "39분 전", text: "첫 개시를 동생이 한 거 너무 억울하다", likes: 9),
                .init(name: "빈티지 소파11", time: "22분 전", text: "이제 그 원피스는 동생 행운템 됐네", likes: 5),
                .init(name: "동그란 바퀴달린의자15", time: "9분 전", text: "옷장 비번 거는 거 고려해봐 ㅋㅋ", likes: 6),
              ],
              replay: [("동그란 리클라이너19", "소개팅 잘됐다는 데서 다 웃음"), ("등받이 높은 나무스툴17", "대여료 얼마 받을지 투표하자")]),
        .init(title: "아빠 카톡 프사가\n내 흑역사 사진임", author: "졸린 나무스툴28", time: "4시간 전",
              body: "아빠가 내 어릴 때 짜장 묻힌 사진을 프사로 해둠. 친구들도 다 봤대.. 바꿔달래도 안 바꿔줌",
              comments: [
                .init(name: "삐걱대는 가죽 소파12", time: "3시간 전", text: "아빠들은 그 사진이 제일 귀여운 줄 앎 ㅋㅋ", likes: 22),
                .init(name: "작은 리클라이너7", time: "3시간 전", text: "아빠 눈엔 그게 레전드임", likes: 6, reply: true),
                .init(name: "보들보들 소파12", time: "2시간 전", text: "요즘 사진으로 하나 예쁘게 찍어서 드려봐", likes: 14),
                .init(name: "따뜻한 리클라이너28", time: "2시간 전", text: "짜장 사진이면 오히려 귀여울듯", likes: 8),
                .init(name: "삐걱대는 편의점 의자29", time: "1시간 전", text: "우리 아빠는 내 졸업식 우는 사진 해둠 동지다", likes: 10),
                .init(name: "키 큰 소파17", time: "1시간 전", text: "프사 바꾸면 용돈 드린다고 해봐 ㅋㅋ", likes: 5),
                .init(name: "회색 나무스툴27", time: "17분 전", text: "아빠 사랑 듬뿍이라 뭐라 하기도 애매하다", likes: 4),
              ],
              replay: [("눈 오는 날 편의점 의자22", "짜장 사진 상상하니까 너무 귀엽다"), ("일요일 소파2", "아빠한테 새 사진 선물 찬성")]),
        .init(title: "명절마다 듣는\n'취업은 했니' 대처법", author: "등받이 높은 리클라이너5", time: "10시간 전",
              body: "졸업하고 준비 중인데 명절마다 친척들이 돌아가면서 물어봄. 올해는 대답 미리 정해서 가려는데 다들 어떻게 넘겨?",
              comments: [
                .init(name: "단단한 편의점 의자2", time: "9시간 전", text: "준비 중이라고 하고 바로 전 부치러 감 ㅋㅋ", likes: 19),
                .init(name: "하늘색 소파20", time: "9시간 전", text: "부엌이 최고의 피난처임", likes: 8, reply: true),
                .init(name: "하늘색 리클라이너2", time: "8시간 전", text: "사촌 동생 성적 얘기로 화제 돌리기 추천", likes: 12),
                .init(name: "도서관 소파24", time: "6시간 전", text: "좋은 소식 생기면 제일 먼저 알려드릴게요 하고 웃음", likes: 15),
                .init(name: "일요일 소파22", time: "5시간 전", text: "나는 명절에 알바 잡아서 안 감", likes: 6),
                .init(name: "키 큰 편의점 의자5", time: "3시간 전", text: "묻는 사람도 별생각 없이 묻는 거라 너무 신경 쓰지 마", likes: 9),
                .init(name: "줄무늬 소파4", time: "1시간 전", text: "올해는 꼭 좋은 소식 있을 거야", likes: 5),
              ],
              replay: [("졸린 편의점 의자23", "전 부치러 도망가는 거 국룰임"), ("삐걱대는 나무스툴19", "화제 돌리기 스킬 배워감")]),
        .init(title: "가족 단톡방에\n잘못 보낸 메시지", author: "기울어진 리클라이너20", time: "30분 전",
              body: "친구한테 보내려던 엄마 잔소리 너무 길어 라는 말을 가족 단톡에 보냄.. 1이 바로 사라졌고 엄마는 아직 아무 말도 없어",
              comments: [
                .init(name: "조용한 소파2", time: "28분 전", text: "1 사라지는 순간 심장 멎었겠다 ㅋㅋ", likes: 13),
                .init(name: "구석 가죽 소파12", time: "26분 전", text: "그 침묵이 더 무서움", likes: 5, reply: true),
                .init(name: "버스정류장 소파23", time: "24분 전", text: "지금이라도 엄마 사랑해 보내 빨리", likes: 17),
                .init(name: "옥상 리클라이너5", time: "19분 전", text: "나는 남친한테 보낼 거 아빠한테 보낸 적 있음", likes: 8),
                .init(name: "키 큰 편의점 의자18", time: "14분 전", text: "엄마도 잔소리 길었던 거 아는 눈치일걸", likes: 4),
                .init(name: "하늘색 바퀴달린의자6", time: "8분 전", text: "저녁 때 설거지 먼저 해두자", likes: 6),
                .init(name: "차가운 바퀴달린의자16", time: "방금", text: "후기 기다림 엄마 답장 뭐 왔는지", likes: 3),
              ],
              replay: [("하굣길 바퀴달린의자8", "1 사라질 때 다 같이 비명 ㅋㅋ"), ("골목길 바퀴달린의자29", "설거지 작전 좋다")]),
        .init(title: "조별과제 혼자 다 했는데\n이름은 다섯 명", author: "보들보들 나무스툴20", time: "11시간 전",
              body: "자료 조사부터 피피티 발표까지 나 혼자 했는데 단톡에선 다들 수고했다고만 함. 교수님께 기여도 말씀드려도 될까?",
              comments: [
                .init(name: "단단한 바퀴달린의자29", time: "10시간 전", text: "기여도 평가 있으면 무조건 솔직하게 써", likes: 26),
                .init(name: "말랑한 나무스툴15", time: "10시간 전", text: "222 참으면 다음 과제도 똑같음", likes: 9, reply: true),
                .init(name: "초록 리클라이너22", time: "9시간 전", text: "단톡 캡처 꼭 남겨둬 증거임", likes: 18),
                .init(name: "버스정류장 가죽 소파9", time: "7시간 전", text: "수고했다고만 하는 거 진짜 얄밉다", likes: 11),
                .init(name: "구석 나무스툴20", time: "5시간 전", text: "교수님들 생각보다 다 알고 계심", likes: 14),
                .init(name: "출근길 리클라이너10", time: "3시간 전", text: "다음엔 처음부터 역할 나눠서 문서로 남기자", likes: 7),
                .init(name: "차가운 가죽 소파22", time: "2시간 전", text: "혼자 다 한 거 진짜 대단하다 고생했어", likes: 10),
              ],
              replay: [("줄무늬 리클라이너2", "수고했다고만 하는 단톡 너무 현실적임"), ("접이식 가죽 소파28", "교수님께 말하는 거 찬성")]),
        .init(title: "담임쌤한테 '엄마'라고\n불러버렸다", author: "골목길 편의점 의자2", time: "3시간 전",
              body: "수업 시간에 손 들고 엄마 이거 모르겠어요 해버림. 반 애들 다 웃고 쌤도 웃으면서 그래 딸 하셨는데 아직도 얼굴 뜨거워",
              comments: [
                .init(name: "일요일 바퀴달린의자6", time: "2시간 전", text: "쌤 대처 너무 센스 있다 ㅋㅋ", likes: 21),
                .init(name: "창가 가죽 소파4", time: "2시간 전", text: "그래 딸 에서 웃음 터짐", likes: 7, reply: true),
                .init(name: "빈티지 리클라이너20", time: "2시간 전", text: "이건 누구나 한 번씩 하는 실수임", likes: 13),
                .init(name: "창가 편의점 의자12", time: "1시간 전", text: "나는 편의점 사장님한테 아빠라고 함", likes: 16),
                .init(name: "조용한 편의점 의자23", time: "1시간 전", text: "일주일만 지나면 다 까먹음 걱정 마", likes: 6),
                .init(name: "빈티지 나무스툴3", time: "31분 전", text: "쌤이 귀여워서 오래 기억하실듯", likes: 5),
                .init(name: "출근길 편의점 의자9", time: "11분 전", text: "졸업할 때까지 별명 될 수도 있음 ㅋㅋ", likes: 8),
              ],
              replay: [("등받이 높은 나무스툴15", "쌤 대답 듣고 다 같이 웃음"), ("키 큰 편의점 의자12", "편의점 사장님 썰도 듣고 싶다")]),
        .init(title: "발표하다 목소리\n뒤집힌 썰 푼다", author: "조용한 나무스툴21", time: "1시간 전",
              body: "수행평가 발표 첫 문장에서 목소리가 삑 하고 뒤집힘. 다들 조용해져서 그냥 처음부터 다시 했는데 끝나고 박수는 받았어",
              comments: [
                .init(name: "반짝이는 편의점 의자14", time: "54분 전", text: "처음부터 다시 한 거 진짜 멋있다", likes: 17),
                .init(name: "초록 바퀴달린의자2", time: "50분 전", text: "그 멘탈이면 뭐든 함", likes: 6, reply: true),
                .init(name: "말랑한 가죽 소파14", time: "42분 전", text: "박수 받았으면 성공한 발표임", likes: 12),
                .init(name: "보들보들 나무스툴28", time: "35분 전", text: "나는 발표하다 딸꾹질 나서 그대로 끝까지 함 ㅋㅋ", likes: 9),
                .init(name: "일요일 편의점 의자13", time: "26분 전", text: "다들 자기 발표 걱정하느라 금방 잊어", likes: 5),
                .init(name: "기울어진 나무스툴9", time: "14분 전", text: "물 한 모금 마시고 시작하면 덜 뒤집힘 꿀팁", likes: 8),
                .init(name: "쿠션 빠진 편의점 의자27", time: "3분 전", text: "삑 소리 상상하니까 귀엽다 ㅋㅋ", likes: 4),
              ],
              replay: [("하굣길 나무스툴18", "삑 하는 순간 다들 숨 멈춤"), ("창가 바퀴달린의자5", "박수 받았다니까 다행이다")]),
        .init(title: "꿈이 없다고 했더니\n상담이 2시간 됐다", author: "눈 오는 날 바퀴달린의자2", time: "7시간 전",
              body: "진로 상담에서 꿈이 없다니까 쌤이 적성검사 결과까지 꺼내심. 2시간 뒤 결론은 일단 생각해보자였어",
              comments: [
                .init(name: "출근길 소파6", time: "6시간 전", text: "2시간 상담 끝에 생각해보자 ㅋㅋㅋ", likes: 25),
                .init(name: "키 큰 나무스툴28", time: "6시간 전", text: "쌤도 지치셨을듯", likes: 8, reply: true),
                .init(name: "쿠션 빠진 리클라이너26", time: "5시간 전", text: "지금 꿈 없는 게 정상임 다들 찾는 중", likes: 19),
                .init(name: "옥상 소파27", time: "4시간 전", text: "좋아하는 거 작은 거부터 적어보는 거 추천", likes: 11),
                .init(name: "쿠션 빠진 나무스툴13", time: "3시간 전", text: "나도 고3 때까지 없었는데 대학 와서 생김", likes: 14),
                .init(name: "눈 오는 날 리클라이너21", time: "2시간 전", text: "쌤이 2시간이나 들어준 거 보면 좋은 분인듯", likes: 7),
                .init(name: "옥상 나무스툴28", time: "40분 전", text: "적성검사 결과는 뭐 나왔어?", likes: 5),
              ],
              replay: [("접이식 나무스툴23", "결론 듣고 다 같이 웃음 ㅋㅋ"), ("도서관 가죽 소파21", "쌤 열정 대단하다")]),
        .init(title: "부모님은 공무원 하라는데\n나는 그림이 좋다", author: "작은 바퀴달린의자25", time: "12시간 전",
              body: "미대 가고 싶다니까 엄마는 공무원 책을 사 오심. 포트폴리오 몰래 준비 중인데 들킬까 봐 떨려",
              comments: [
                .init(name: "조용한 편의점 의자15", time: "11시간 전", text: "몰래 준비하는 거 너무 응원한다", likes: 22),
                .init(name: "졸린 가죽 소파27", time: "10시간 전", text: "나도 몰래 준비해서 붙었음 할 수 있어", likes: 12, reply: true),
                .init(name: "낡은 소파5", time: "9시간 전", text: "그린 거 하나 부모님께 보여드려 봐 마음 바뀔 수도", likes: 17),
                .init(name: "쿠션 빠진 소파17", time: "7시간 전", text: "공무원 책은 일단 책장에 잘 꽂아두자 ㅋㅋ", likes: 8),
                .init(name: "동그란 가죽 소파24", time: "5시간 전", text: "그림 좋아하는 마음이 제일 큰 재능임", likes: 14),
                .init(name: "보들보들 리클라이너28", time: "3시간 전", text: "미대 입시 학원 상담 같이 가자고 해봐", likes: 6),
                .init(name: "옥상 나무스툴18", time: "1시간 전", text: "포트폴리오 완성하면 여기 올려줘 보고 싶다", likes: 9),
              ],
              replay: [("따뜻한 가죽 소파16", "공무원 책 사 오신 데서 다 탄식함"), ("접이식 리클라이너14", "포트폴리오 꼭 보여줘")]),
        .init(title: "면접에서 장점 묻는데\n머리가 하얘짐", author: "새벽3시 바퀴달린의자9", time: "2시간 전",
              body: "알바 면접에서 본인 장점이 뭐냐고 묻는데 아무 말도 안 떠올라서 성실합니다만 세 번 말함.. 결과는 아직이야",
              comments: [
                .init(name: "구석 편의점 의자17", time: "1시간 전", text: "성실합니다 세 번이면 진짜 성실한 거임 ㅋㅋ", likes: 20),
                .init(name: "동그란 소파2", time: "1시간 전", text: "성실함 인증 완료", likes: 7, reply: true),
                .init(name: "노란 소파7", time: "1시간 전", text: "나는 장점 묻는데 단점 말함 ㅋㅋ", likes: 13),
                .init(name: "키 큰 가죽 소파7", time: "46분 전", text: "면접 전에 장점 세 개 적어두고 가면 좋아", likes: 11),
                .init(name: "구석 가죽 소파13", time: "37분 전", text: "사장님들은 성실한 사람 제일 좋아함 붙을듯", likes: 16),
                .init(name: "말랑한 나무스툴6", time: "23분 전", text: "하얘지는 거 다들 똑같아 너무 자책하지 마", likes: 6),
                .init(name: "따뜻한 편의점 의자13", time: "7분 전", text: "합격하면 후기 올려줘", likes: 4),
              ],
              replay: [("창가 편의점 의자13", "성실합니다 세 번에서 터짐 ㅋㅋ"), ("흔들리는 편의점 의자11", "붙었으면 좋겠다 진짜")]),
        .init(title: "전과할지 말지\n3학기째 고민 중", author: "낡은 소파3", time: "9시간 전",
              body: "지금 과 수업은 재미가 없는데 막상 옮기려니 학점이랑 친구들이 걸려. 고민만 하다가 신청 기간이 또 지나가고 있어",
              comments: [
                .init(name: "반짝이는 바퀴달린의자23", time: "8시간 전", text: "3학기째면 마음은 이미 정해진 거 아닐까", likes: 15),
                .init(name: "조용한 소파10", time: "8시간 전", text: "222 걸리는 게 무서운 거지", likes: 5, reply: true),
                .init(name: "따뜻한 소파18", time: "7시간 전", text: "옮기고 싶은 과 수업 하나 청강해봐", likes: 12),
                .init(name: "빈티지 편의점 의자9", time: "5시간 전", text: "나 전과했는데 처음 한 학기만 힘들고 지금은 만족함", likes: 18),
                .init(name: "노란 리클라이너7", time: "4시간 전", text: "친구는 과 달라도 계속 만날 수 있어", likes: 7),
                .init(name: "말랑한 소파27", time: "2시간 전", text: "학과 사무실에 학점 인정 먼저 물어보자", likes: 9),
                .init(name: "단단한 바퀴달린의자18", time: "1시간 전", text: "이번 학기엔 꼭 결정하자 응원할게", likes: 4),
              ],
              replay: [("동그란 가죽 소파11", "청강 추천 진짜 좋은 방법인듯"), ("기울어진 나무스툴11", "신청 기간 놓치지 마")]),
        .init(title: "퇴사하고 싶은데\n통장 잔고가 말린다", author: "분홍 편의점 의자12", time: "4시간 전",
              body: "첫 직장 1년 차인데 매일 아침 출근길이 너무 길어. 사표는 벌써 써뒀는데 통장 보면 다시 서랍에 넣게 됨",
              comments: [
                .init(name: "구석 리클라이너7", time: "3시간 전", text: "사표 서랍에 넣는 거 너무 공감된다", likes: 16),
                .init(name: "단단한 가죽 소파27", time: "3시간 전", text: "서랍 속 사표 동지 여기 있음", likes: 8, reply: true),
                .init(name: "졸린 가죽 소파12", time: "2시간 전", text: "석 달 버틸 돈 모으고 나가는 거 추천", likes: 12),
                .init(name: "차가운 편의점 의자28", time: "2시간 전", text: "이직 먼저 알아보고 나가면 덜 불안함", likes: 14),
                .init(name: "노란 바퀴달린의자15", time: "1시간 전", text: "1년 버틴 것도 진짜 대단한 거야", likes: 9),
                .init(name: "보들보들 가죽 소파19", time: "1시간 전", text: "나는 퇴사하고 한 달 쉬었는데 그게 제일 잘한 일이었음", likes: 6),
                .init(name: "말랑한 바퀴달린의자16", time: "24분 전", text: "출근길에 좋아하는 노래라도 듣자 ㅠㅠ", likes: 5),
              ],
              replay: [("등받이 높은 바퀴달린의자24", "서랍 속 사표 얘기에 다 끄덕임"), ("작은 소파11", "이직 먼저 찾는 거 찬성")]),
    ]

    /// 제목으로 글을 찾는다(빈칸과 줄바꿈은 보지 않는다). 없으면 nil(사진보정 원문).
    static func script(for title: String) -> PostScript? {
        let key = title.filter { !$0.isWhitespace }
        return scripts.first { $0.title.filter { !$0.isWhitespace } == key }
    }
}
