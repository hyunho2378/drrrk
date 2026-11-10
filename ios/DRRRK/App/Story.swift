import Foundation

/// 두 가지 이야기. 같은 방 화면을 두 이야기가 나눠 쓴다(팀 피그마 "1110코딩기준 _수정사항" 섹션, 2096:22144).
/// ssang 쌍밍아웃: 홈에서 고민을 쓰고 들어가는 흐름. 방 장면은 라임 의자 장면, 의자 이름은 진실의 의자10 계열.
/// photo 사진보정: 라이브 목록 첫 카드(둘이 찍은 사진인데 지만 보정해서 올린 여우)로 들어가는 흐름. 방 장면은 소파 장면, 의자 이름은 바퀴 달린 의자26 계열.
/// 웹 client/src/app/story.js와 같은 규칙이다. 화면마다 따로 기억하지 않고 이 한 곳만 읽고 쓴다.
enum StoryKind: String {
    case ssang
    case photo
}

enum Story {
    /// 앱을 켜면 ssang. 화면이 나타날 때 읽는다.
    nonisolated(unsafe) static var current: StoryKind = .ssang

    /// 카드별 고민(11/10 피드백 "고민 탭 내용 변경 안됨"). 라이브 목록에서 사진보정이 아닌 카드를 누르고 앉으면
    /// 방의 고민 탭(접힌 한 줄, 펼친 글)이 그 카드의 제목을 보여 준다. 홈에서 들어오는 흐름과 사진보정 카드는 nil이다.
    /// title은 줄바꿈 없이 공백 하나, tag는 카드가 속한 탭 이름(친구, 연애, 가족, 학교, 진로). 웹 story.js setConcern과 같은 규칙.
    nonisolated(unsafe) static var concern: (title: String, tag: String)? = nil
}
