// 라운지 카테고리 점, MY의 엉따 온도 막대, 편의점 아이템 상세를 움직인다.
import { motion, live as LIVE } from '../tokens.js';
import { q, setText } from './dom.js';
import { cloneOf } from './donor.js';

const state = { love: false, item: null, from: 36, slot: 0 };

// 아이템을 누르면 어느 화면에서 눌렀는지 적어 둔다(상세를 닫으면 그 화면으로 돌아간다).
// slot은 업적 편의점 8칸 중 몇 번째 칸인지(0~7)다. 마이(36)는 직접 넘기고, 나의 편의점(53)은 누른 칸 자리로 정한다.
export function pickItem(name, from, slot) {
  state.item = name;
  state.from = from;
  if (slot != null) state.slot = slot;
}
// 54 아이템 상세가 열 칸 번호. 36에서 연 경우와 53에서 연 경우 모두 여기서 읽는다.
export const pickedSlot = () => state.slot || 0;
// 53의 아이템 칸(flow 링크, 이름이 같은 마지막처럼 두 칸 포함)은 누른 칸의 자리(x 31, 113, 195, 277 / y 216, 347)로 칸 번호를 정한다.
if (typeof document !== 'undefined' && !window.__drrrkItemSlot) {
  window.__drrrkItemSlot = true;
  document.addEventListener('click', (e) => {
    const h = e.target && e.target.closest && e.target.closest('[data-hotspot][aria-label^="아이템 "]');
    if (!h || h.getAttribute('aria-label') === '아이템 닫기') return;
    const col = Math.round((parseFloat(h.style.left) - 31) / 82);
    const row = parseFloat(h.style.top) > 300 ? 1 : 0;
    if (col >= 0 && col < 4) state.slot = row * 4 + col;
  }, true);
}
export const itemFrom = () => state.from;
// 54가 열 아이템 이름(53에서 누른 칸의 이름표, 36에서 누른 칸의 이름)
export const pickedName = () => state.item;

// 마이 엉따 막대가 39도를 넘는 순간 의자 획득 장면(19)을 보여 주고, 같은 세션에서는 다시 보여 주지 않는다(11. 10. 메모).
// 막대 전체 길이(244.8)가 지금 온도 39.2도라서, 채움 비율이 39 / 39.2에 닿는 순간이 39도를 넘는 순간이다.
// 막대는 200ms 뒤 1000ms 동안 cubic-bezier(0.05, 0.7, 0.1, 1)로 차오르므로 그 비율에 닿는 시각은 시작 후 약 1011ms다(iOS도 같은 값).
// popGapMs: 39°를 넘은 뒤 의자 획득 장면이 뜨기 전에 마이를 보여 주는 시간(11/10 팀원 피드백 "팝업되는 뉴 디자인의자 텁이 좀 더 있어야"). iOS MyChairGet.popGapSeconds와 같은 값.
export const CHAIR_GET = { temp: 39, now: 39.2, key: 'drrrk:chairGetSeen', delayMs: 200, fillMs: 1000, crossMs: 1011, popGapMs: 1100 };
export const crossRatio = () => CHAIR_GET.temp / CHAIR_GET.now;
export function chairGetSeen() {
  try { return window.sessionStorage.getItem(CHAIR_GET.key) === '1'; } catch (e) { return !!window.__drrrkChairGetSeen; }
}
export function markChairGetSeen() {
  window.__drrrkChairGetSeen = true;
  try { window.sessionStorage.setItem(CHAIR_GET.key, '1'); } catch (e) { /* 저장소를 못 쓰면 창 안 값만 쓴다 */ }
}

// 연애 카테고리를 한 번 열면 빨간 점이 사라진다.
export function attachTabs(root, n) {
  const dot = root.querySelector('[data-figma="Tab Dot"]');
  if (!dot) return;
  if (n === LIVE.loveScreen && !state.love) {
    state.love = true;
    dot.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.3)' }], { duration: 320, delay: 160, easing: motion.emphasizedAccel, fill: 'forwards' });
  } else if (state.love) dot.style.display = 'none';
}

// 엉따 온도 막대가 왼쪽에서 오른쪽으로 부드럽게 찬다(색은 그대로 두고 드러내기만 한다).
// 보이기 전에 막대를 0으로 비워 두고(prepGauge), 화면이 자리를 잡으면 채운다(animateGauge).
const EMPTY = 'inset(0 100% 0 0 round 99px)';
export function prepGauge(root) {
  q(root, '[data-figma="gauge"] [data-figma="fill"]').forEach((f) => (f.style.clipPath = EMPTY));
}
export function animateGauge(root) {
  q(root, '[data-figma="gauge"] [data-figma="fill"]').forEach((f) => {
    const a = f.animate([{ clipPath: EMPTY }, { clipPath: 'inset(0 0 0 0 round 99px)' }], { duration: LIVE.gaugeMs, delay: LIVE.gaugeDelay, easing: motion.emphasizedDecel, fill: 'both' });
    a.onfinish = () => { f.style.clipPath = ''; a.cancel(); };
  });
}

// 라운지 카테고리의 빨간 점: 이미 연애를 열어 본 뒤에는 처음부터 없는 모습으로 그린다.
export function prepTabs(root, n) {
  const dot = root.querySelector('[data-figma="Tab Dot"]');
  if (dot && state.love && n !== LIVE.loveScreen) dot.style.display = 'none';
}

// 아이템 상세(54): 누른 아이템의 이름, 개수, 그림으로 바꾼다. 새우깡이면 피그마 그대로다.
export async function fillItem(root) {
  if (root.dataset.itemFilled) return;
  root.dataset.itemFilled = '1';
  // 설명 문구는 피그마 원문이 사람에게 던지는 것으로 적혀 있어서, 던지는 곳이 가운데 테이블이라는 문구로 바꾼다.
  const desc = q(root, 'p[data-figma^="라이브에서 던지면"]')[0];
  if (desc) { setText(desc, LIVE.itemDesc); Object.assign(desc.style, { width: 'auto', whiteSpace: 'pre', textAlign: 'center' }); }
  const name = state.item;
  if (!name || name === '새우깡') return;
  const src = await cloneOf(53, '[data-figma="item · ' + name + '"]');
  if (!src || !root.isConnected) return;
  const img = src.querySelector(':scope > :not([data-figma="count"])');
  const cnt = src.querySelector('[data-figma="count"] p');
  const hero = root.querySelector('[data-figma="item hero"]');
  const title = root.querySelector('[data-figma="item detail sheet"] > p[data-figma="새우깡"]');
  const own = root.querySelector('[data-figma="보유"] [data-figma="3개"]');
  if (hero && img) {
    const old = hero.firstElementChild;
    Object.assign(img.style, { width: '112px', height: '112px', position: 'relative', left: '0px', top: '0px' });
    if (old) old.replaceWith(img); else hero.appendChild(img);
  }
  if (title) { setText(title, name); Object.assign(title.style, { width: 'auto' }); }
  if (own && cnt) { setText(own, cnt.textContent.trim() + '개'); Object.assign(own.style, { width: 'auto' }); }
}
