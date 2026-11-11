import { live as LIVE } from '../tokens.js';
// 방 시계 값(화면에 보이는 남은 초)과 방에 들어온 뒤 지난 실제 초 사이를 바꾼다. 방 시계(live.js), 방 구경(37), 이어받기(roomClockHandoff.js)가 모두 이 함수를 쓴다.
// 함께 드르륵 방(B)과 방 구경(W)은 두 구간이다(11/11 사용자 전달 "함께 드르륵 실제 체감 시간 30초로").
//   20:00에서 01:12까지 실제 24.6초(이야기 구간), 01:12에서 00:00까지 실제 5.4초(해뜨기 구간, 해뜨기 영상 5.17초가 잘리지 않는다).
//   00:00 아래(영상 마지막 장면에 머무는 3초)는 해뜨기 구간 빠르기 그대로다.
// 혼자 드르륵 방(C)과 옛 방(A)은 예전처럼 20:00에서 00:00까지 실제 90초 한 구간이다. iOS RoomModel.left(after:from:together:)와 같다.
const C = LIVE.clock;
const together = (scene) => scene === 'B' || scene === 'W';

// 시계 값 left가 20:00에서 몇 실제 초 뒤의 값인지.
export function realOf(left, scene = 'B') {
  if (!together(scene)) return (LIVE.roomSeconds - left) / LIVE.timeScale;
  if (left >= LIVE.sunriseAt) return (LIVE.roomSeconds - left) / C.storyScale;
  return C.storyReal + (LIVE.sunriseAt - left) / C.sunriseScale;
}

// 20:00에서 실제 real초 뒤의 시계 값.
export function leftAt(real, scene = 'B') {
  if (!together(scene)) return LIVE.roomSeconds - real * LIVE.timeScale;
  if (real <= C.storyReal) return LIVE.roomSeconds - real * C.storyScale;
  return LIVE.sunriseAt - (real - C.storyReal) * C.sunriseScale;
}

// 시계 값 left에서 실제 sec초가 지난 뒤의 값.
export const leftAfter = (left, sec, scene = 'B') => leftAt(realOf(left, scene) + sec, scene);
