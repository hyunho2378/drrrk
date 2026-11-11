import { leftAfter } from './roomClock.js';
// 방 구경 시계를 방 시계로 이어 준다(11/10 팀원 피드백 "라이브 누르기 전 타이머-앉기 눌렀을때 타이머 연동해야함").
// 라이브 카드의 남은 시간에서 방 구경(37) 시계가 줄고, 앉기를 누르는 순간의 값과 그 시각을 여기 맡긴다.
// 방(29)에 들어오면 그 값과 시각에서 같은 두 구간 시계(roomClock.js, 01:12 위 실제 24.6초 구간과 아래 5.4초 구간)로 이어 줄어든다. 그래서 앉는 순간 두 시계가 같은 값이다.
// 한 번 쓰면 비운다. 다른 길(홈 흐름, ?at=29)로 들어온 방은 맡긴 값이 없어 기본 20:00이다.
let hand = null;
// 맡긴 값이 이 시간(ms) 안에 방에서 쓰이지 않으면 버린다(앉기를 누르고 화면이 바뀌는 데 걸리는 시간보다 넉넉하다).
const KEEP_MS = 10000;
// 방에 들어온 직후, 그리고 앞 단계 전환 직후에는 이 시간(ms)이 지나야 다음 단계(해 뜨기 1분 전, 끝)로 넘어간다.
// 이어받은 값이 이미 1분 아래이면 들어오자마자 1분 전 장면으로 튀지 않고 약 3초 뒤에 넘어간다. iOS RoomClockHandoff.graceSeconds와 같다.
export const STEP_GRACE_MS = 3000;

export function handOff(left, at = performance.now()) {
  hand = { left: Math.max(0, left), at };
}

function fresh() {
  if (hand && performance.now() - hand.at > KEEP_MS) hand = null;
  return hand;
}

// 지금 보여 줄 값(초). 맡긴 값이 없으면 def. 방 화면을 미리 그릴 때(prepare) 쓴다.
export function handoffNow(def) {
  const h = fresh();
  return h ? leftAfter(h.left, (performance.now() - h.at) / 1000, 'B') : def;
}

// 방 시계 시작 값과 시작 시각. 맡긴 값이 있으면 그것을 꺼내고 비운다.
export function takeRoomStart(def) {
  const h = fresh();
  hand = null;
  return h ? { left: h.left, at: h.at } : { left: def, at: performance.now() };
}

// 이 단계로 넘어가도 되는지. room.entered(방에 들어온 시각)와 room.stepAt(앞 단계 전환 시각)에서 STEP_GRACE_MS가 지나야 한다.
export function stepReady(room, now = performance.now()) {
  return now - Math.max(room.entered || 0, room.stepAt || 0) >= STEP_GRACE_MS;
}
