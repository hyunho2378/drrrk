// 함께 드르륵 방 채팅이 하나둘씩 달린다(11. 10. 팀 요청 "함께드르륵 대화 시작할때 하나둘씩 대화 달리는 느낌으로").
// 방에 들어오면 채팅 영역은 비어 있고, 0.8초 뒤 첫 줄, 다음 줄은 1.3초에서 2.0초 사이 간격으로 장면의 기존 순서(위에서 아래로)대로 나타난다.
// 간격은 시작 값 1110으로 고정한 같은 수열(watchChat.js makeRandom)이라 iOS RoomChat과 같은 순서와 간격을 낸다.
// 같은 방 안에서 화면이 바뀌면(일반 모드, 미니프로필 시트, 단계 화면) 이미 나온 줄 수만큼은 바로 보이고 나머지만 이어서 달린다.
// 방을 나갔다가 새로 들어오면(live.js room.chatDone이 풀리면) 다시 비어 있는 상태로 시작한다.
// 방 온보딩 덮개가 떠 있는 동안은 채팅 시계가 멈춘다. 덮개가 닫히면 0.8초 뒤 첫 줄부터 시작한다(덮개 뒤에서 미리 달리면 닫았을 때 이미 다 차 있어 하나둘씩 달리는 모습이 보이지 않는다).
import { makeRandom } from './watchChat.js';

export const ROOM_CHAT = { firstMs: 800, minMs: 1300, maxMs: 2000, seed: 1110, tickMs: 100, moveMs: 220, rise: 8 };
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';

// 한 방(묶음) 동안 이어지는 상태. 화면(root)은 바뀌어도 이 값은 남는다.
const st = { on: false, shown: 0, clock: 0, last: 0, due: [], rnd: null, root: null, items: [], onShow: null, timer: 0 };
// 확인용 기록(window.__drrrkRoomChat): 줄이 나타난 시각(채팅 시계 기준 ms)과 화면 번호
const clog = typeof window !== 'undefined' ? (window.__drrrkRoomChat = window.__drrrkRoomChat || []) : [];

const covered = () => !!document.querySelector('[data-figma="방 온보딩"]') || document.visibilityState === 'hidden';
// i번째 줄이 나타나는 채팅 시계 값(ms). 필요할 때 차례로 만든다(같은 수열).
function dueOf(i) {
  while (st.due.length <= i) {
    const k = st.due.length;
    st.due.push(k === 0 ? ROOM_CHAT.firstMs : st.due[k - 1] + ROOM_CHAT.minMs + st.rnd() * (ROOM_CHAT.maxMs - ROOM_CHAT.minMs));
  }
  return st.due[i];
}

// 줄이 원래 가진 불투명도(피그마 맨 위 줄 0.4, 0.8 등)를 기억해 두고 숨긴다.
function hide(el) {
  if (el.dataset.chatO == null) el.dataset.chatO = el.style.opacity === '0' ? '' : el.style.opacity;
  el.style.opacity = '0';
}
function reveal(el, animate) {
  if (el.dataset.chatO == null) return;
  el.style.opacity = el.dataset.chatO;
  if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.animate([{ opacity: 0, transform: 'translateY(' + ROOM_CHAT.rise + 'px)' }, { opacity: Number(el.dataset.chatO || 1), transform: 'translateY(0)' }], { duration: ROOM_CHAT.moveMs, easing: EASE });
  }
}

// 화면을 준비할 때(live.js prepare): 이번 방에서 아직 나오지 않은 줄을 숨긴다. fresh면 새 방이라 모두 숨긴다.
export function roomChatPrepare(items, fresh) {
  const shown = fresh ? 0 : st.shown;
  items.forEach((el, i) => { if (i >= shown) hide(el); });
}

// 방을 떠나면(live.js attach에서 방이 아닌 화면) 상태를 닫는다.
export function roomChatLeave() {
  st.on = false;
  st.root = null;
  st.items = [];
  window.clearInterval(st.timer);
  st.timer = 0;
}

function tick() {
  const now = performance.now();
  const dt = now - st.last;
  st.last = now;
  if (!st.on) return;
  if (!st.root || !st.root.isConnected) return;
  if (covered()) return;
  st.clock += dt;
  while (st.shown < st.items.length && st.clock >= dueOf(st.shown)) {
    const el = st.items[st.shown];
    reveal(el, true);
    clog.push({ i: st.shown, at: Math.round(st.clock), n: st.n, text: (el.textContent || '').trim().slice(0, 20) });
    if (clog.length > 80) clog.shift();
    st.shown += 1;
    if (st.onShow) st.onShow(el);
  }
}

// 화면이 다 보인 뒤(live.js attach). items는 위에서 아래 순서의 채팅 줄, fresh는 새로 들어온 방, onShow는 줄이 나타날 때(대사 녹음).
export function roomChatAttach(root, n, items, fresh, onShow) {
  if (fresh || !st.on) {
    st.on = true;
    st.shown = 0;
    st.clock = 0;
    st.due = [];
    st.rnd = makeRandom(ROOM_CHAT.seed);
    clog.length = 0;
  }
  clog.push({ ev: 'attach', n, fresh, items: items.length, shown: st.shown, at: Math.round(st.clock) });
  st.root = root;
  st.n = n;
  st.items = items;
  st.onShow = onShow;
  // 이미 나온 줄은 바로 보인다(움직임 없이). 대사 녹음은 한 번 난 말풍선에 다시 나지 않는다(roomVoice.js data-voiced).
  items.forEach((el, i) => { if (i < st.shown) reveal(el, false); else if (el.dataset.chatO == null) hide(el); });
  st.last = performance.now();
  if (!st.timer) st.timer = window.setInterval(tick, ROOM_CHAT.tickMs);
  tick();
}

export const roomChatState = () => ({ on: st.on, shown: st.shown, clock: Math.round(st.clock), total: st.items.length, n: st.n });
