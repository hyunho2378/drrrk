// 혼자 드르륵 방 그리드(64). 팀 댓글(탁빛나, 페이지 영역 3911~4823, 32169~33095, 2026. 11. 12.) "혼자 드르륵도 그리드 볼 수 있도록 반영"과
// 1647:25199 오른쪽 위 버튼 자리(327~360, 59~125) "작동하도록 반영"에 따른 화면이다.
// 피그마 새 프레임 두 장(2340:21259 "나", 2340:21344 "AI의자")은 같은 머리, 고민 줄, 입력줄에 큰 칸 하나(22, 180, 346 x 308, #222628, 모서리 16)만 다르다.
//   첫 장: 흰 AI 의자 그림과 이름 칸 "AI 의자"(2340:21328). 둘째 장: 파란 내 의자 그림과 이름 칸 "새벽2시 피시방"(2340:21384).
//   큰 칸 안: 원 151(97, 40, #121415) 안 의자 그림 109(118, 61), 이름 칸 검정 모서리 16 위아래 6 좌우 16, SUIT Bold 20 행간 24.96 자간 -0.8 #F8F8F8, 가운데 x 171.5(칸 기준).
//   점(Page Dots 181, 515, 28 x 6): 긴 점 16 x 6 #F8F8F8 모서리 3, 둥근 점 6 #6E767C. 두 프레임 모두 둥근 점 0, 긴 점 12 모양이라
//   함께 방 일반 모드(normalPager.js)와 같이 첫 장은 긴 점 0, 둥근 점 22, 둘째 장은 둥근 점 0, 긴 점 12로 옮긴다.
//   채팅: AI 말 세 줄(567 불투명도 0.3, 610 0.7, 654 1)과 내 말풍선(오른쪽 끝 366, 698). 말풍선 #222628(내 말 #36D2FF) 모서리 14, 위아래 8 좌우 12, SUIT Medium 14 행간 19.6 자간 -0.56.
// 화면 바탕은 46번 생성 화면(SoloVideo)을 그대로 쓰고 현장 장면(그림, 어둡게 깐 판, 채팅 그라데이션, 퀵슬롯, 현장 채팅 줄)만 보이기 전에 뺀다.
// 머리 오른쪽 버튼은 함께 방 일반 모드(32)의 "현장 모드로 보기" 버튼(필드 아이콘)을 빌려 온다. 피그마 두 프레임의 모드 토글과 같은 모양이다.
// 넘기기(끌기, 트랙패드 가로 굴림, 키보드 좌우)는 normalPager.js와 같은 값(장 폭 25% 넘기면 다음 장, 220ms 표준 곡선, 끝에서 1/3만 따라옴)이다.
// 혼자 방 시계(90초)와 채팅 진행, 받아쓰기는 같은 방(live.js ROOMS C) 안 전환이라 이어진다. iOS RoomSoloView의 grid와 같은 값이다.
import { q, scaleOf } from './dom.js';
import { cloneOf } from './donor.js';

export const SOLO_GRID = 64;
const FIELD = [46, 41, 43];
const KEY = 'drrrk-solo-grid-from';
const W = 390;
const MS = 220;
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
const SNAP = 0.25;
const BAND = [172, 540];
const BASE = (import.meta.env.BASE_URL || '/') + 'assets/solo/';
const PAGES = [
  { name: 'AI 의자', img: BASE + 'grid-ai.png', figma: '2340:21328' },
  { name: '새벽2시 피시방', img: BASE + 'grid-me.png', figma: '2340:21384' },
];
const LINES = [
  { top: 567, o: '0.3', text: '그 친구가 널 좀 질투하나봐' },
  { top: 610, o: '0.7', text: '속상한 마음은 좀 괜찮아졌어?' },
  { top: 654, o: '1', text: '푹자고 일어나서 학교 가!' },
];
const MINE = { top: 698, text: '고마워. 덕분에 마음이 조금 나아졌어.' };
// 현장 장면에만 있는 요소(그리드 프레임에는 없음). 옛 "AI 드르륵 의자" 이름표는 solo.js가 이미 숨겼고, 고민 줄(room.js attachBanner)이 혼자 방인지 알아보는 표식이라 남긴다.
const FIELD_ONLY = ['scene dim', 'image 1208091463', 'chat fade', '퀵슬롯 · 접힘', 'row · 리클라이너', '내 채팅 (잠깐 떴다 사라짐)'];
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SUIT = "'SUIT', system-ui, sans-serif";

// 그리드에 들어올 때 온 현장 화면을 적어 두고, "현장 모드" 버튼은 그 화면으로 돌린다(live.js resolveTo).
export function soloGridRoute(l) {
  if (l.to === SOLO_GRID && l.t !== 'back') {
    try { sessionStorage.setItem(KEY, String(FIELD.includes(l.from) ? l.from : 46)); } catch (e) { /* 기본값 46 */ }
    return null;
  }
  if (l.from === SOLO_GRID && l.label === '현장 모드') {
    let f = 46;
    try { f = Number(sessionStorage.getItem(KEY)) || 46; } catch (e) { /* 기본값 46 */ }
    return Object.assign({}, l, { to: FIELD.includes(f) ? f : 46 });
  }
  return null;
}

function el(tag, style, text) {
  const e = document.createElement(tag);
  if (style) Object.assign(e.style, style);
  if (text != null) e.textContent = text;
  return e;
}

function bigTile(p, i) {
  const page = el('div', { position: 'absolute', left: i * W + 'px', top: '0px', width: W + 'px', height: '0px' });
  page.dataset.figma = i ? '그리드 둘째 장' : '그리드 첫 장';
  const t = el('div', { position: 'absolute', left: '22px', top: '180px', width: '346px', height: '308px', borderRadius: '16px', background: '#222628' });
  t.dataset.figma = '참여자 타일 · ' + p.name;
  const disc = el('div', { position: 'absolute', left: '97px', top: '40px', width: '151px', height: '151px', borderRadius: '50%', background: '#121415', overflow: 'hidden' });
  const img = el('img', { position: 'absolute', left: '21px', top: '21px', width: '109px', height: '109px', objectFit: 'cover', display: 'block' });
  img.alt = '';
  img.draggable = false;
  img.src = p.img;
  disc.appendChild(img);
  t.appendChild(disc);
  const name = el('div', { position: 'absolute', left: '171.5px', top: '218.9px', transform: 'translateX(-50%)', padding: '6px 16px', boxSizing: 'border-box', borderRadius: '16px', background: '#000', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' });
  name.appendChild(el('p', { margin: '0', fontFamily: SUIT, fontWeight: '700', fontSize: '20px', lineHeight: '24.96px', letterSpacing: '-0.04em', color: '#F8F8F8' }, p.name));
  t.appendChild(name);
  page.appendChild(t);
  page.__img = img;
  return page;
}

function bubble(text, mine) {
  const b = el('div', { display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: '14px', background: mine ? '#36D2FF' : '#222628', boxSizing: 'border-box' });
  b.dataset.figma = 'Frame';
  b.appendChild(el('p', { margin: '0', fontFamily: SUIT, fontWeight: '500', fontSize: '14px', lineHeight: '19.6px', letterSpacing: '-0.04em', color: mine ? '#000' : '#F8F8F8', whiteSpace: 'pre' }, text));
  return b;
}

// 보이기 전(live.js prepare): 현장 장면을 빼고 큰 칸 두 장, 점, 채팅 줄을 깔고, 오른쪽 위 버튼을 필드 아이콘 버튼으로 바꾼다. 의자 그림은 디코드까지 기다린다.
export async function prepareSoloGrid(layer, root, n) {
  if (n !== SOLO_GRID || !root || root.dataset.soloGrid) return;
  root.dataset.soloGrid = '1';
  root.dataset.figma = '혼자 드르륵 · 그리드';
  [...root.children].forEach((c) => { if (FIELD_ONLY.includes(c.dataset.figma || '')) c.remove(); });
  q(root, ':scope > p[data-figma="AI 드르륵 의자"]').forEach((c) => c.setAttribute('data-solo-hide', ''));
  // 머리 오른쪽 버튼: 함께 방 일반 모드(32)의 모드 토글(필드 아이콘)로 바꾼다. 못 빌려 오면 그대로 둔다.
  const tog = root.querySelector('[data-figma="Header"] [data-figma="모드 토글"]');
  const own = tog && await cloneOf(32, '[data-figma="Header"] [data-figma="모드 토글"]');
  if (tog && own && tog.isConnected) {
    own.style.left = tog.style.left;
    own.style.top = tog.style.top;
    own.className = tog.className;
    tog.replaceWith(own);
  }
  const clip = el('div', { position: 'absolute', left: '0px', top: '0px', width: W + 'px', height: '100%', overflow: 'hidden', pointerEvents: 'none' });
  clip.dataset.figma = '그리드 넘기기';
  const track = el('div', { position: 'absolute', left: '0px', top: '0px', width: W + 'px', height: '100%', pointerEvents: 'none' });
  const pages = PAGES.map(bigTile);
  pages.forEach((p) => track.appendChild(p));
  clip.appendChild(track);
  root.insertBefore(clip, root.firstChild);
  const dots = el('div', { position: 'absolute', left: '181px', top: '515px', width: '28px', height: '6px', pointerEvents: 'none' });
  dots.dataset.figma = 'Page Dots';
  const act = el('div', { position: 'absolute', left: '0px', top: '0px', width: '16px', height: '6px', borderRadius: '3px', background: '#F8F8F8' });
  act.dataset.figma = 'Dot / active';
  const dot = el('div', { position: 'absolute', left: '22px', top: '0px', width: '6px', height: '6px', borderRadius: '50%', background: '#6E767C' });
  dot.dataset.figma = 'Dot';
  dots.append(act, dot);
  root.appendChild(dots);
  // 채팅 줄(live.js chatItems가 찾는 이름). 입력줄 앞에 둔다.
  const input = root.querySelector(':scope > [data-figma="input/속성 14"]');
  LINES.forEach((L) => {
    const row = el('div', { position: 'absolute', left: '24px', top: L.top + 'px', width: '342px', height: '36px', opacity: L.o, display: 'flex', alignItems: 'flex-start' });
    row.dataset.figma = 'row · 리클라이너';
    row.appendChild(bubble(L.text, false));
    root.insertBefore(row, input || null);
  });
  const mine = el('div', { position: 'absolute', right: '24px', top: MINE.top + 'px', height: '36px', display: 'flex' });
  mine.dataset.figma = '내 채팅 (잠깐 떴다 사라짐)';
  mine.appendChild(bubble(MINE.text, true));
  root.insertBefore(mine, input || null);
  root.__soloGrid = { track, act, dot, page: 0 };
  await Promise.race([
    Promise.all(pages.map((p) => (p.__img.decode ? p.__img.decode().catch(() => {}) : null))),
    new Promise((r) => window.setTimeout(r, 1500)),
  ]);
}

export function attachSoloGrid(layer, root, n) {
  const pg = root && root.__soloGrid;
  if (n !== SOLO_GRID || !pg || root.dataset.soloGridOn) return;
  root.dataset.soloGridOn = '1';
  const set = (v, ms) => {
    pg.track.style.transition = ms ? 'transform ' + ms + 'ms ' + EASE : 'none';
    pg.track.style.transform = v ? 'translate3d(' + v + 'px, 0, 0)' : '';
  };
  const go = (j) => {
    j = Math.max(0, Math.min(1, j));
    pg.page = j;
    root.dataset.gridPage = String(j + 1);
    const ms = reduced() ? 0 : MS;
    set(-j * W, ms);
    const tr = ms ? 'transform ' + ms + 'ms ' + EASE : 'none';
    pg.act.style.transition = tr;
    pg.dot.style.transition = tr;
    pg.act.style.transform = j ? 'translateX(12px)' : '';
    pg.dot.style.transform = j ? 'translateX(-22px)' : '';
  };
  go(0);
  root.__soloGridGo = go;
  const yOf = (e) => (e.clientY - root.getBoundingClientRect().top) / scaleOf(root);
  let g = null, moved = false;
  layer.addEventListener('pointerdown', (e) => {
    const y = yOf(e);
    if (y < BAND[0] || y > BAND[1]) { g = null; return; }
    g = { x: e.clientX, y: e.clientY, id: e.pointerId, axis: null, base: -pg.page * W };
    moved = false;
  });
  layer.addEventListener('pointermove', (e) => {
    if (!g || e.pointerId !== g.id) return;
    const s = scaleOf(root);
    const dx = (e.clientX - g.x) / s, dy = (e.clientY - g.y) / s;
    if (!g.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
      if (Math.abs(dx) <= Math.abs(dy)) { g = null; return; }
      g.axis = 'x';
      moved = true;
      try { layer.setPointerCapture(e.pointerId); } catch (err) { /* 무시 */ }
    }
    const v = g.base + dx;
    set(v > 0 ? v / 3 : v < -W ? -W + (v + W) / 3 : v, 0);
  });
  const up = (e) => {
    if (!g || e.pointerId !== g.id) return;
    const axis = g.axis;
    const dx = (e.clientX - g.x) / scaleOf(root);
    g = null;
    if (axis !== 'x') return;
    go(pg.page + (dx < -W * SNAP ? 1 : dx > W * SNAP ? -1 : 0));
  };
  layer.addEventListener('pointerup', up);
  layer.addEventListener('pointercancel', up);
  if (!layer.style.touchAction) layer.style.touchAction = 'pan-y';
  layer.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  let acc = 0, armed = true, last = 0;
  layer.addEventListener('wheel', (e) => {
    const y = yOf(e);
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (!dx || y < BAND[0] || y > BAND[1]) return;
    e.preventDefault();
    const now = performance.now();
    if (now - last > 160) { armed = true; acc = 0; }
    last = now;
    acc += dx;
    if (armed && Math.abs(acc) > 24) { armed = false; go(pg.page + (acc > 0 ? 1 : -1)); }
  }, { passive: false });
  const key = (e) => {
    if (!root.isConnected) { window.removeEventListener('keydown', key); return; }
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (layer.style.pointerEvents === 'none' || getComputedStyle(layer).opacity === '0') return;
    e.preventDefault();
    go(pg.page + (e.key === 'ArrowRight' ? 1 : -1));
  };
  window.addEventListener('keydown', key);
}
