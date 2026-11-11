// 라이브 맨 위 가로 카드 다섯 장(탁빛나 11. 12. 00:29 1943:12396 핀 (162,172) "라이브 캐러셀 업데이트 반영 안되어 있습니다!!").
// 피그마 1943:12396 안 "캐러셀"(2340:22269, 가로 자동 배치 사이 12) 은 왼쪽부터 Carousel / 1, 4, 3, 2, 5 다섯 장이다.
// 친구(1943:12264), 학교(1943:12022), 진로(1943:12143) 프레임도 같은 다섯 장이라 라이브 탭 화면(10, 47~52) 모두 같은 카드를 쓴다.
// 생성 화면에는 예전 두 장(Carousel / 1, 2)만 있다. 첫 장을 본으로 다섯 장을 330 간격(폭 318, 사이 12)으로 다시 깐다.
// 바뀐 값: 윗줄 작은 글(Versus) 없음, 어둡게 덮는 판(Fade)은 검정 35% 지점 0에서 끝 80%, 보는 중 알약은 카드 왼쪽 253 에 붙고 흐림 없음.
// 둘째 장(남친이 1주년)은 곧 끝 방이라 시계 배지가 빨강(#FF4D6A) 바탕에 검정 시계와 글자다.
// 그림: 첫 장은 assets/live2/scene-1.webp, 둘째부터 다섯째 장은 명예의 전당과 같은 그림(피그마 그림 해시가 같고 내보낸 그림의 픽셀 차이 평균 1.1~1.3)이라 assets/hall5 를 그대로 쓴다.
// 그림은 보이기 전에 받아서 디코드까지 끝낸다(예전 그림이 먼저 보였다가 바뀌지 않게). 카드 넘기기와 점은 live.js carouselOf 가 맡으므로 attachDrag 보다 먼저 부른다.
// 누름: 첫 장과 둘째 장 자리는 원래 누름 자리(flow.js "라이브 방 구경")가 37 로 옮기고 liveV2.js 가 카드 값을 정한다. 셋째부터 다섯째 장은 카드가 직접 받는다.
import { setText } from './dom.js';
import { motion } from '../tokens.js';
import { openWatch } from './liveV2.js';

const B = import.meta.env.BASE_URL || '/';
const STEP = 330;
export const LIVE_CAR_SCREENS = [10, 47, 48, 49, 50, 51, 52];
// 피그마 x 순서. tw 는 제목 칸 폭, bw 와 tpw 는 시계 배지와 시계 글 폭, vw 와 vpw 는 보는 중 알약과 숫자 폭(피그마 값).
// 폭은 새 섹션 "자간줄여" 라이브 탭 다섯 장(친구 2340:26873, 연애 2340:26318, 가족 2340:26462, 학교 2340:26595, 진로 2340:26742, 전체 2340:27679) 값이다.
// 자간 -4% 로 글 폭이 줄어 배지와 제목 칸이 1~3 좁아졌다(탁빛나 11. 12. 01:35 "캐러셀 변경되어 반영 필요합니다"). 여섯 장 모두 카드, 그림, 순서가 같다.
export const LIVE_CARDS = [
  { name: 'Carousel / 1', node: '2340:22270', scene: 'assets/live2/scene-1.webp', title: '둘이 찍은 사진인데\n지만 보정해서 올린 여우', tw: 180, views: '22', vw: 53, vpw: 14, time: '04:30', bw: 73.25, tpw: 37, st: 'talk' },
  { name: 'Carousel / 4', node: '2340:22274', scene: 'assets/hall5/hall-2.webp', title: '남친이 1주년 선물로\n다이소 틴트 사줌', tw: 150, views: '12', vw: 51, vpw: 12, time: '02:30', bw: 72.25, tpw: 36, st: 'soon' },
  { name: 'Carousel / 3', node: '2340:22278', scene: 'assets/hall5/hall-3.webp', title: '남사친이 자꾸만\n좋아져서 고민이야', tw: 139, views: '66', vw: 53, vpw: 14, time: '10:31', bw: 67.25, tpw: 31, st: 'talk' },
  { name: 'Carousel / 2', node: '2340:22282', scene: 'assets/hall5/hall-4.webp', title: '너네는 친구가 남미새면\n어떻게 할거야?', tw: 176, views: '13', vw: 51, vpw: 12, time: '06:43', bw: 72.25, tpw: 36, st: 'talk' },
  { name: 'Carousel / 5', node: '2340:22286', scene: 'assets/hall5/hall-5.webp', title: '친친 스토리에 나만 빼고\n등록해둔 친구가 있어', tw: 180, views: '62', vw: 53, vpw: 14, time: '04:12', bw: 69.25, tpw: 33, st: 'talk' },
];
// 방 구경(37)에 넘기는 카드 값(liveV2.js pickWatch 모양). 곧 끝 카드는 시계 배지 값에서 시작한다.
export const featuredOf = (c) => ({ title: c.title, views: c.views, meta: c.time + ' 남음', st: c.st, timer: c.st === 'soon' ? c.time : undefined });

const FADE = 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.8) 100%)';
// 곧 끝 시계(피그마 I2340:22406;1126:2277 을 SVG 로 내보낸 값. 17 칸 좌표를 16.25 칸에 맞춰 줄인다).
const RED_TIMER = '<svg width="16.25" height="16.25" viewBox="0 0 17 17" fill="none" style="position:absolute;left:0;top:0;display:block;overflow:visible"><path d="M15.9375 8.5C15.9375 12.6076 12.6076 15.9375 8.5 15.9375C4.39238 15.9375 1.0625 12.6076 1.0625 8.5C1.0625 4.39238 4.39238 1.0625 8.5 1.0625C12.6076 1.0625 15.9375 4.39238 15.9375 8.5Z" stroke-width="2.09231" stroke="black"/><path d="M8.5 8.49864V2.83197C9.6963 2.83275 10.8617 3.21212 11.8292 3.91572L8.5 8.49864Z" fill="black"/></svg>';

const ready = new Map();
function load(url) {
  if (!ready.has(url)) {
    const im = new Image();
    im.decoding = 'async';
    im.src = url;
    ready.set(url, (im.decode ? im.decode() : Promise.resolve()).catch(() => {}));
  }
  return ready.get(url);
}
// 라이브 탭에 오기 전에도 미리 받아 둘 수 있게 내보낸다(두 번 불러도 한 번만 받는다).
export const preloadLiveCarousel = () => Promise.all(LIVE_CARDS.map((c) => load(B + c.scene)));

function paintScene(card, url) {
  card.querySelectorAll(':scope > [data-figma="Scene"]').forEach((e) => e.remove());
  // 연애(49) 생성 화면은 장면 칸 없이 카드 바탕에 장면을 깔고 있다. 바탕은 지우고 장면 칸을 맨 아래에 새로 놓는다.
  card.style.setProperty('background-image', 'none', 'important');
  const img = document.createElement('img');
  img.alt = '';
  img.decoding = 'sync';
  img.draggable = false;
  img.src = url;
  img.setAttribute('data-figma', 'Scene');
  Object.assign(img.style, { position: 'absolute', left: '0px', top: '0px', width: '318px', height: '232px', display: 'block', objectFit: 'fill', pointerEvents: 'none' });
  card.prepend(img);
}

function fill(card, c) {
  const fade = card.querySelector(':scope > [data-figma="Fade"]');
  if (fade) fade.style.setProperty('background', FADE, 'important');
  const vs = card.querySelector(':scope > [data-figma="Versus"]');
  if (vs) vs.remove();
  const t = card.querySelector(':scope > [data-figma="Carousel Title"]');
  if (t) { setText(t, c.title); Object.assign(t.style, { width: c.tw + 'px', left: '16px', top: '164px' }); }
  const pill = card.querySelector(':scope > [data-figma="보는 중"]');
  if (pill) {
    Object.assign(pill.style, { left: '253px', top: '12px', width: c.vw + 'px', opacity: '1' });
    const p = pill.querySelector(':scope > p');
    if (p) { setText(p, c.views); p.style.width = c.vpw + 'px'; p.setAttribute('data-figma', c.views); }
  }
  const badge = card.querySelector(':scope > [data-figma="Timer Badge"]');
  if (badge) {
    Object.assign(badge.style, { left: '12px', top: '12px', width: c.bw + 'px' });
    const svg = badge.querySelector(':scope > span > svg');
    if (svg) {
      svg.setAttribute('width', String(c.bw));
      svg.setAttribute('viewBox', '0 0 ' + c.bw + ' 25.5');
      const r = svg.querySelector('rect');
      if (r) { r.setAttribute('width', String(c.bw)); if (c.st === 'soon') r.style.fill = '#FF4D6A'; }
    }
    const tp = badge.querySelector(':scope > [data-figma="time"]');
    if (tp) { setText(tp, c.time); tp.style.width = c.tpw + 'px'; if (c.st === 'soon') tp.style.color = '#000000'; }
    const tm = badge.querySelector(':scope > [data-figma="timer"]');
    if (tm && c.st === 'soon') tm.innerHTML = RED_TIMER;
  }
}

// 셋째부터 다섯째 장 누름: 원래 누름 자리와 같은 눌림 덮개(밝은 10%)를 띄우고 motion.press 뒤 방 구경으로 간다.
// 끌어서 넘긴 직후의 누름은 live.js attachDrag 의 잡기 단계 처리가 먼저 막는다.
function pressable(card, c) {
  const cover = document.createElement('span');
  cover.setAttribute('aria-hidden', 'true');
  Object.assign(cover.style, { position: 'absolute', inset: '0', borderRadius: 'inherit', background: 'var(--text-primary, #F8F8F8)', opacity: '0', transition: 'opacity ' + motion.press + 'ms ease-out', pointerEvents: 'none' });
  card.appendChild(cover);
  card.style.cursor = 'pointer';
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', c.title.replace(/\n/g, ' '));
  const off = () => (cover.style.opacity = '0');
  card.addEventListener('pointerdown', () => (cover.style.opacity = String(motion.pressOpacity)));
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => card.addEventListener(ev, off));
  card.addEventListener('click', () => window.setTimeout(() => openWatch(featuredOf(c)), motion.press));
}

export async function prepareLiveCarousel(root, n) {
  if (!LIVE_CAR_SCREENS.includes(n) || !root || root.dataset.liveCar) return;
  const base = root.querySelector(':scope > [data-figma="Carousel / 1"]');
  if (!base) return;
  root.dataset.liveCar = '1';
  await preloadLiveCarousel();
  const tmpl = base.cloneNode(true);
  root.querySelectorAll(':scope > [data-figma^="Carousel /"]').forEach((e) => { if (e !== base) e.remove(); });
  const left0 = parseFloat(getComputedStyle(base).left) || 24;
  let after = base;
  LIVE_CARDS.forEach((c, i) => {
    const card = i === 0 ? base : tmpl.cloneNode(true);
    card.setAttribute('data-figma', c.name);
    // 첫 장은 생성 화면 노드 번호를 그대로 두고(다른 도구가 읽는다), 덧붙인 장만 피그마 새 노드 번호를 단다.
    if (i > 0) {
      card.setAttribute('data-node', c.node);
      card.querySelectorAll('[data-node]').forEach((el) => el.removeAttribute('data-node'));
      card.style.left = left0 + STEP * i + 'px';
      after.after(card);
      after = card;
    }
    card.style.top = '128px';
    paintScene(card, B + c.scene);
    fill(card, c);
    if (i >= 2) pressable(card, c);
  });
}
