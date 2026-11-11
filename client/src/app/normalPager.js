// 일반 모드(22, 32, 33) 참여자 칸 두 장 넘기기. 팀 댓글(탁빛나 2023:11805 "나", 핀 (370,531) "슬라이드 넘어가게 수정").
// 첫 장은 생성 화면의 2 x 2 참여자 칸 그대로이고, 둘째 장은 피그마 "나"(2023:11805) 프레임 값 그대로다:
// 왼쪽 위 칸(24, 180, 165 x 147, #222628, 모서리 16)에 내 의자(원 72 #121415 안 그림 52, 피그마 그림 4fdd18ce8a…)와
// 이름 칸(검정, 모서리 8, 위아래 3 좌우 8, SUIT Bold 11 자간 -0.44, "편의점 의자11 " #F8F8F8 + "(나)" #36D2FF),
// 나머지 세 칸은 같은 칸 모양에 불투명도 0.4인 빈 칸이다.
// 끌기(터치와 마우스), 트랙패드 가로 굴림, 키보드 좌우 화살표로 넘긴다. 끄는 동안 손가락을 따라 transform으로 움직이고,
// 놓으면 장 폭의 25%를 넘겼을 때 다음 장, 아니면 제자리로 맞춘다(220ms 표준 곡선). 아래 점도 같은 시간에 옮긴다.
// 머리, 고민 줄, 채팅 줄, 입력줄은 움직이지 않는다. 둘째 장 그림은 보이기 전에(prepare) 받아 디코드한다.
// iOS RoomNormalView와 같은 값이다.
import { q, relRect, scaleOf } from './dom.js';

const SCREENS = [22, 32, 33];
const W = 390;
const MS = 220;
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
const SNAP = 0.25;
// 참여자 칸 줄(피그마 180에서 488)과 점 줄(515, 핀 531)까지를 넘기는 자리로 본다.
const BAND = [172, 540];
const TILES = [[24, 180], [201, 180], [24, 341], [201, 341]];
const ME_IMG = (import.meta.env.BASE_URL || '/') + 'assets/chairs/v2/t-4fdd18ce8a29808bfd7f5ea576d5d32be7ecf5ee.png';
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function el(tag, style, text) {
  const e = document.createElement(tag);
  if (style) Object.assign(e.style, style);
  if (text != null) e.textContent = text;
  return e;
}

// 둘째 장(피그마 "나" 2023:11805). 왼쪽 끝을 W만큼 오른쪽에 둔다.
function pageTwo() {
  const page = el('div', { position: 'absolute', left: W + 'px', top: '0px', width: W + 'px', height: '0px' });
  page.dataset.figma = '나';
  TILES.forEach(([x, y], i) => {
    const t = el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '165px', height: '147px', borderRadius: '16px', background: '#222628', opacity: i ? '0.4' : '1' });
    t.dataset.figma = i ? '빈 칸' : '내 칸';
    if (i) { t.setAttribute('aria-hidden', 'true'); page.appendChild(t); return; }
    const disc = el('div', { position: 'absolute', left: '47px', top: '18px', width: '72px', height: '72px', borderRadius: '50%', background: '#121415', overflow: 'hidden' });
    const img = el('img', { position: 'absolute', left: '10px', top: '10px', width: '52px', height: '52px', objectFit: 'cover', display: 'block' });
    img.alt = '';
    img.src = ME_IMG;
    disc.appendChild(img);
    t.appendChild(disc);
    // 이름 칸은 칸 가운데(피그마 60.5, 283, 93 x 20).
    const name = el('div', { position: 'absolute', left: '82.5px', top: '103px', height: '20px', transform: 'translateX(-50%)', padding: '3px 8px', boxSizing: 'border-box', borderRadius: '8px', background: '#000', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' });
    const p = el('p', { margin: '0', fontFamily: "'SUIT', system-ui, sans-serif", fontWeight: '700', fontSize: '11px', lineHeight: '14px', letterSpacing: '-0.04em', color: '#F8F8F8' }, '편의점 의자11 ');
    p.appendChild(el('span', { color: '#36D2FF' }, '(나)'));
    name.appendChild(p);
    t.appendChild(name);
    page.appendChild(t);
    page.__img = img;
  });
  return page;
}

// 보이기 전: 첫 장 요소를 넘기는 판(track)으로 옮기고 둘째 장을 옆에 붙인다. 옮겨도 화면 위치는 같다(판은 화면과 같은 자리, 같은 크기).
export async function prepareNormalPager(layer, root, n) {
  if (!SCREENS.includes(n) || !root || root.dataset.pager) return;
  const tiles = q(root, ':scope > [data-figma^="참여자 타일"], :scope > [data-figma^="Participant Tile"]');
  if (tiles.length < 4) return;
  root.dataset.pager = '1';
  const inBand = (c) => { const r = relRect(root, c); return r.h > 0 && r.y >= BAND[0] - 8 && r.y + r.h <= 492 && r.x >= -1 && r.x + r.w <= W + 1; };
  const kids = [...root.children].filter((c) => !c.dataset.figma || !/^(Page Dots|Header|Status Bar)/.test(c.dataset.figma)).filter(inBand);
  const clip = el('div', { position: 'absolute', left: '0px', top: '0px', width: W + 'px', height: '100%', overflow: 'hidden', pointerEvents: 'none' });
  clip.dataset.figma = '참여자 넘기기';
  const track = el('div', { position: 'absolute', left: '0px', top: '0px', width: W + 'px', height: '100%', pointerEvents: 'none' });
  clip.appendChild(track);
  // 판은 첫 참여자 칸 자리에 끼운다. 그 앞에 있던 칸 바탕(room.js tidyTiles)은 판 맨 앞에 두어 칸 뒤에 깔린 순서를 지킨다.
  root.insertBefore(clip, tiles[0]);
  kids.forEach((c) => {
    if (getComputedStyle(c).pointerEvents !== 'none') c.style.pointerEvents = 'auto';
    track.appendChild(c);
  });
  const two = pageTwo();
  track.appendChild(two);
  root.__pager = { clip, track, two, page: 0 };
  const img = two.__img;
  if (img && img.decode) {
    await Promise.race([img.decode().catch(() => {}), new Promise((r) => window.setTimeout(r, 1500))]);
  }
}

// 점: 피그마 Page Dots(28 x 6). 첫 장은 긴 점(16)이 왼쪽 0, 둥근 점(6)이 22. 둘째 장은 둥근 점 0, 긴 점 12(피그마 "나" 값).
function dotsOf(root) {
  const g = root.querySelector(':scope > [data-figma="Page Dots"]');
  if (!g) return null;
  const act = g.querySelector(':scope > [data-figma="Dot / active"]');
  const dot = [...g.children].find((d) => d !== act);
  return act && dot ? { act, dot } : null;
}

export function attachNormalPager(layer, root, n) {
  const pg = root && root.__pager;
  if (!SCREENS.includes(n) || !pg || root.dataset.pagerOn) return;
  root.dataset.pagerOn = '1';
  const dots = dotsOf(root);
  // 22의 "참여자 탭" 누름 자리(첫 장 왼쪽 위 칸)는 첫 장에서만 눌린다.
  const hot = q(layer, '[data-hotspot]').filter((b) => { const t = parseFloat(b.style.top); return t >= BAND[0] && t < 492; });
  let x = 0;
  const set = (v, ms) => {
    x = v;
    pg.track.style.transition = ms ? 'transform ' + ms + 'ms ' + EASE : 'none';
    pg.track.style.transform = v ? 'translate3d(' + v + 'px, 0, 0)' : '';
  };
  const go = (j) => {
    j = Math.max(0, Math.min(1, j));
    pg.page = j;
    root.dataset.normalPage = String(j + 1);
    const ms = reduced() ? 0 : MS;
    set(-j * W, ms);
    if (dots) {
      const tr = ms ? 'transform ' + ms + 'ms ' + EASE : 'none';
      dots.act.style.transition = tr;
      dots.dot.style.transition = tr;
      dots.act.style.transform = j ? 'translateX(12px)' : '';
      dots.dot.style.transform = j ? 'translateX(-22px)' : '';
    }
    hot.forEach((b) => { b.style.pointerEvents = j ? 'none' : ''; });
  };
  go(0);
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
    // 첫 장 앞과 둘째 장 뒤로는 1/3만 따라온다.
    set(v > 0 ? v / 3 : v < -W ? -W + (v + W) / 3 : v, 0);
  });
  const up = (e) => {
    if (!g || e.pointerId !== g.id) return;
    const axis = g.axis;
    const dx = (e.clientX - g.x) / scaleOf(root);
    g = null;
    if (axis !== 'x') return;
    const dir = dx < -W * SNAP ? 1 : dx > W * SNAP ? -1 : 0;
    go(pg.page + dir);
  };
  layer.addEventListener('pointerup', up);
  layer.addEventListener('pointercancel', up);
  if (!layer.style.touchAction) layer.style.touchAction = 'pan-y';
  // 끌어서 넘긴 직후의 누름은 화면 이동(참여자 탭 등)으로 보지 않는다.
  layer.addEventListener('click', (e) => {
    if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
  }, true);
  // 트랙패드 가로 굴림(또는 Shift와 세로 굴림): 한 번 미는 동안 한 장만 넘긴다.
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
  // 키보드 좌우 화살표. 입력칸에서 글을 쓰는 중이면 넘기지 않는다. 화면이 내려가면 듣기를 뗀다.
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
