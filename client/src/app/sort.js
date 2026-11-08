// 라운지 목록(10, 48~52)의 정렬. 정렬 버튼을 누르면 같은 화면 위로 정렬 시트가 올라오고(화면 이동 없음),
// 고르면 시트가 내려가면서 카드가 제자리에서 자리를 바꾼다. 처음 모습은 인기순이다.
//   인기순: 보는 중 숫자가 큰 방부터(보는 사람과 공감이 많은 방)
//   최신순: 남은 시간이 많이 남은 방부터(방금 의자를 꺼낸 방)
//   맞춤순: 기본 고민("친구가 썸남 앞에서 내 쌍밍아웃함", 키워드 친구관계와 연애)과 이야기가 가까운 방부터
import { motion } from '../tokens.js';
import { q, relRect, scaleOf, setText } from './dom.js';
import { cloneOf } from './donor.js';

export const SORT_SCREENS = [10, 48, 49, 50, 51, 52];
const KEYS = ['인기순', '최신순', '맞춤순'];
const MODE_BY_KEY = { 인기순: 'popular', 최신순: 'new', 맞춤순: 'match' };
const LABEL_BY_MODE = { popular: '인기순', new: '최신순', match: '맞춤순' };
const ON_COLOR = '#36D2FF';
const OFF_COLOR = '#F8F8F8';

// 맞춤순 순서(카드 번호 1부터). 화면마다 지금 있는 카드 글을 보고 기본 고민과 가까운 순으로 정했다.
//  10, 51, 52(전체와 같은 글): 같은 상황인 카드, 친구 이야기, 그 밖의 이야기
//  48 친구: 친구가 나만 따로 대한 이야기(사진), 친구가 서운하게 한 이야기(선물), 친구와 돈 이야기
//  49 연애: 친구와 썸이 얽힌 이야기, 썸남 이야기, 남친 이야기
//  50 가족: 서운하고 화가 나는 이야기가 먼저, 부모님 이야기는 뒤
const MATCH = { 10: [1, 3, 2], 48: [1, 2, 3], 49: [3, 1, 2], 50: [1, 2, 3], 51: [1, 3, 2], 52: [1, 3, 2] };

let mode = 'popular';
export const currentMode = () => mode;

const num = (s) => parseInt(String(s || '').replace(/\D/g, ''), 10) || 0;
const secs = (s) => { const m = /(\d{1,2}):(\d{2})/.exec(s || ''); return m ? +m[1] * 60 + +m[2] : 0; };

function cardsOf(root) {
  return [1, 2, 3].map((i) => {
    const el = root.querySelector(':scope > [data-figma="List Card / ' + i + '"]');
    if (!el) return null;
    const view = el.querySelector('[data-figma="보는 중"] p');
    const time = el.querySelector('[data-figma^="Timer Badge"] [data-figma="time"]');
    return { el, i, view: num(view && view.textContent), left: secs(time && time.textContent), top: parseFloat(getComputedStyle(el).top) };
  }).filter(Boolean);
}

function orderOf(cards, m, n) {
  const arr = cards.slice();
  if (m === 'new') return arr.sort((a, b) => b.left - a.left || a.i - b.i);
  if (m === 'match') {
    const rank = MATCH[n] || [1, 2, 3];
    return arr.sort((a, b) => rank.indexOf(a.i) - rank.indexOf(b.i));
  }
  return arr.sort((a, b) => b.view - a.view || a.i - b.i);
}

// 카드가 놓일 자리(위에서부터 세 칸)는 그대로 두고 카드만 자리를 바꾼다. animate가 true면 제자리에서 미끄러진다.
export function applySort(root, n, animate) {
  const cards = cardsOf(root);
  if (cards.length < 2) return;
  const slots = cards.map((c) => c.top).sort((a, b) => a - b);
  const order = orderOf(cards, mode, n);
  order.forEach((c, k) => {
    const to = slots[k];
    if (animate && Math.abs(c.top - to) > 0.5 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      c.el.animate([{ top: c.top + 'px' }, { top: to + 'px' }], { duration: 440, easing: motion.emphasizedDecel });
    }
    c.el.style.top = to + 'px';
  });
  const label = root.querySelector('[data-figma="정렬 · 인기순"] p');
  if (label && label.textContent.trim() !== LABEL_BY_MODE[mode]) setText(label, LABEL_BY_MODE[mode]);
  // 스크롤 계산(clip)이 카드의 새 자리를 알도록 다시 잰다.
  if (root.__scroller && root.__scroller.remeasure) root.__scroller.remeasure();
  root.dataset.sortMode = mode;
}

export function attachSort(root, n, first) {
  if (!SORT_SCREENS.includes(n)) return;
  if (!root.dataset.sortReady) {
    root.dataset.sortReady = '1';
    applySort(root, n, false);
  }
  if (first) return;
  const btn = root.querySelector('[data-figma="정렬 · 인기순"]');
  if (!btn || btn.dataset.live) return;
  btn.dataset.live = 'sort';
  btn.style.cursor = 'pointer';
  btn.setAttribute('role', 'button');
  // 누르는 자리를 넓힌다(글자 줄 52 x 19는 손가락에 너무 작다).
  const hit = document.createElement('span');
  Object.assign(hit.style, { position: 'absolute', left: '-14px', right: '-14px', top: '-12px', bottom: '-12px' });
  btn.appendChild(hit);
  let sheet = null, dim = null, busy = false;
  const close = (after) => {
    if (!sheet) return;
    const s = sheet, d = dim;
    sheet = null; dim = null;
    s.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }], { duration: motion.sheetOut, easing: motion.emphasizedAccel, fill: 'forwards' });
    const a = d.animate([{ opacity: 1 }, { opacity: 0 }], { duration: motion.sheetOut, easing: motion.standard, fill: 'forwards' });
    a.onfinish = () => { s.remove(); d.remove(); };
    if (after) window.setTimeout(after, Math.round(motion.sheetOut * 0.45));
  };
  const open = async () => {
    if (sheet || busy) return;
    busy = true;
    const [d, s] = await Promise.all([cloneOf(47, ':scope > [data-figma="dim"]'), cloneOf(47, ':scope > [data-figma="바텀시트 · 정렬"]')]);
    busy = false;
    if (!d || !s || sheet || !root.isConnected) return;
    const H = root.getBoundingClientRect().height / scaleOf(root);
    Object.assign(d.style, { top: '0px', left: '0px', height: H + 'px', zIndex: '30', cursor: 'pointer' });
    Object.assign(s.style, { top: H - 289 + 'px', zIndex: '31' });
    // 고른 정렬에 맞춰 글자 색과 체크를 옮긴다.
    const rows = KEYS.map((k) => s.querySelector(':scope > [data-figma="' + k + '"]'));
    const check = s.querySelector('[data-figma="icon/check"]');
    const home = rows.find((r) => r && r.contains(check));
    rows.forEach((r, i) => {
      if (!r) return;
      const on = MODE_BY_KEY[KEYS[i]] === mode;
      const label = [...r.querySelectorAll('p')].find((x) => x.textContent.trim() === KEYS[i]);
      if (label) { setText(label, KEYS[i]); label.style.color = on ? ON_COLOR : OFF_COLOR; Object.assign(label.style, { width: 'auto' }); }
      r.style.cursor = 'pointer';
      r.addEventListener('click', (e) => {
        e.stopPropagation();
        mode = MODE_BY_KEY[KEYS[i]];
        close(() => applySort(root, n, true));
      });
    });
    d.addEventListener('click', (e) => { e.stopPropagation(); close(); });
    root.appendChild(d);
    root.appendChild(s);
    dim = d; sheet = s;
    // 체크는 고른 줄로 옮긴다(시트가 화면에 붙은 뒤에야 줄 위치를 잴 수 있다).
    const onRow = rows[KEYS.findIndex((k) => MODE_BY_KEY[k] === mode)];
    if (check && home && onRow && onRow !== home) check.style.transform = 'translateY(' + (relRect(s, onRow).y - relRect(s, home).y) + 'px)';
    d.animate([{ opacity: 0 }, { opacity: 1 }], { duration: motion.sheetIn, easing: motion.standard });
    s.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: motion.sheetIn + 40, easing: motion.emphasizedDecel });
  };
  btn.addEventListener('click', (e) => { e.stopPropagation(); open(); });
}
