// 카테고리 탭 "연애" 옆 빨간 점. 라이브 점과 커뮤니티 점은 서로 다른 점이라 따로 지운다.
// 라이브(10, 47~52): 연애 화면(49)에 들어가면 지워지고, 모든 라이브 화면에서 함께 지워진 모습이 된다.
// 커뮤니티(39): 같은 화면 안에서 연애 탭을 누르면 지워진다.
// 알림(57~59)의 연애 점은 예전처럼 라이브 점을 따른다(숨기기만 한다).
// 상태는 탭 세션 동안 sessionStorage 키 두 개로 따로 남긴다.
import { motion, live as LIVE } from '../tokens.js';

const KEY = { live: 'drrrk-dot-live-love', community: 'drrrk-dot-community-love' };
const mem = { live: false, community: false };
const COMMUNITY = 39;

const isOff = (k) => {
  if (mem[k]) return true;
  try { return window.sessionStorage.getItem(KEY[k]) === '1'; } catch (e) { return false; }
};
const setOff = (k) => {
  mem[k] = true;
  try { window.sessionStorage.setItem(KEY[k], '1'); } catch (e) { /* 저장이 막힌 창에서는 이번 세션 변수로만 기억한다 */ }
};
const kindOf = (n) => (n === COMMUNITY ? 'community' : 'live');
const dotOf = (root) => root.querySelector('[data-figma="Tab Dot"]');
const fade = (dot) => dot.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.3)' }], { duration: 320, delay: 160, easing: motion.emphasizedAccel, fill: 'forwards' });

// 보이기 전: 이미 지운 점은 처음부터 없는 모습으로 그린다(라이브 연애 화면에 처음 들어가는 경우는 붙인 뒤 사라지게 둔다).
export function prepLoveDot(root, n) {
  const dot = dotOf(root);
  if (!dot) return;
  const k = kindOf(n);
  if (isOff(k) && !(n === LIVE.loveScreen && dot.dataset.dotFading)) dot.style.display = 'none';
}

// 다 보인 뒤: 라이브 연애 화면이면 라이브 점을 지우고, 커뮤니티면 연애 탭 누름에 커뮤니티 점 지우기를 건다.
export function attachLoveDot(root, n) {
  const dot = dotOf(root);
  if (!dot) return;
  const k = kindOf(n);
  if (n === LIVE.loveScreen && !isOff('live')) {
    setOff('live');
    dot.dataset.dotFading = '1';
    fade(dot);
    return;
  }
  if (isOff(k)) {
    if (!dot.dataset.dotFading) dot.style.display = 'none';
    return;
  }
  if (n === COMMUNITY && !dot.dataset.dotWired) {
    const tab = root.querySelector('[data-figma="Tabs"] [data-figma="Tab / 연애"]');
    if (!tab) return;
    dot.dataset.dotWired = '1';
    tab.addEventListener('click', () => {
      if (isOff('community')) return;
      setOff('community');
      dot.dataset.dotFading = '1';
      fade(dot);
    });
  }
}
