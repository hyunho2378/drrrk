// 라운지 카테고리 점, MY의 엉따 온도 막대, 편의점 아이템 상세를 움직인다.
import { motion, live as LIVE } from '../tokens.js';
import { q, setText } from './dom.js';
import { cloneOf } from './donor.js';

const state = { love: false, item: null, from: 36 };

// 아이템을 누르면 어느 화면에서 눌렀는지 적어 둔다(상세를 닫으면 그 화면으로 돌아간다).
export function pickItem(name, from) {
  state.item = name;
  state.from = from;
}
export const itemFrom = () => state.from;

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
export function animateGauge(root) {
  q(root, '[data-figma="gauge"] [data-figma="fill"]').forEach((f) => {
    const h = f.getBoundingClientRect().height / (root.getBoundingClientRect().width / LIVE.screenW || 1);
    f.animate([{ clipPath: 'inset(0 100% 0 0 round ' + h / 2 + 'px)' }, { clipPath: 'inset(0 0 0 0 round ' + h / 2 + 'px)' }], { duration: LIVE.gaugeMs, delay: LIVE.gaugeDelay, easing: motion.emphasizedDecel, fill: 'backwards' });
  });
}

// 아이템 상세(54): 누른 아이템의 이름, 개수, 그림으로 바꾼다. 새우깡이면 피그마 그대로다.
export async function fillItem(root) {
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
