// 두 가지 이야기. 같은 방 화면을 두 이야기가 나눠 쓴다(팀 피그마 "1110코딩기준 _수정사항" 섹션, 2096:22144).
//   'ssang' 쌍밍아웃: 홈에서 고민을 쓰고 들어가는 흐름. 방 장면은 라임 의자 장면, 의자 이름은 진실의 의자10 계열.
//   'photo' 사진보정: 라이브 목록 첫 카드(둘이 찍은 사진인데 지만 보정해서 올린 여우)로 들어가는 흐름. 방 장면은 소파 장면, 의자 이름은 바퀴 달린 의자26 계열.
// 화면마다 따로 기억하지 않고 이 한 곳만 읽고 쓴다. 탭 세션 동안 유지된다.
const KEY = 'drrrk-story';

export function getStory() {
  try {
    return sessionStorage.getItem(KEY) === 'photo' ? 'photo' : 'ssang';
  } catch (e) {
    return 'ssang';
  }
}

export function setStory(next) {
  try {
    sessionStorage.setItem(KEY, next === 'photo' ? 'photo' : 'ssang');
  } catch (e) {
    /* 저장소를 못 쓰는 환경에서는 기본값 ssang */
  }
}
