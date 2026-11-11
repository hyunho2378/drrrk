// 같은 방 안 상태 변화(퀵슬롯 열기와 접기, 시트, 모달, 카테고리 바꾸기)를 한 화면 안의 움직임으로 잇는다.
// 피그마 프로토타입의 Smart Animate와 같은 방식이다. 두 화면의 최상위 요소를 이름으로 짝지어,
// 짝이 있는 요소는 제자리에서 자리와 크기를 옮기며 바뀌고(퀵슬롯이 알약에서 목록으로 펼쳐진다), 짝이 없는 요소만 사라지거나 들어온다.
// 모든 움직임이 동시에 한 번에 흐른다(사라지는 것이 끝나길 기다리지 않는다). 움직임은 transform, opacity, clip-path만 쓴다.
import { motion, live as LIVE } from '../tokens.js';

const screenRoot = (layer) => layer.querySelector('[data-node]');
const SMART = 320;

// 피그마 마무리 단계가 만든 캔버스는 주인 요소 옆에 붙는다. 상자 층(data-raster)은 주인 앞, 그림 캔버스는 주인 뒤에 있다.
function units(root) {
  const host = root.querySelector(':scope > [data-scroll] > [data-scroll-content]');
  const lists = host ? [Array.from(host.children), Array.from(root.children).filter((c) => !c.hasAttribute('data-scroll'))] : [Array.from(root.children)];
  const out = [];
  const rr = root.getBoundingClientRect();
  const s = rr.width / LIVE.screenW || 1;
  for (const kids of lists) {
    let pendingBox = [];
    for (const el of kids) {
      if (el.tagName === 'CANVAS') {
        if (el.hasAttribute('data-raster')) pendingBox.push(el);
        else if (out.length) out[out.length - 1].els.push(el);
        continue;
      }
      const r = el.getBoundingClientRect();
      const fig = el.getAttribute('data-figma');
      const name = fig || el.tagName;
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160);
      const rect = { x: (r.left - rr.left) / s, y: (r.top - rr.top) / s, w: r.width / s, h: r.height / s };
      const sig = [name, Math.round(rect.x), Math.round(rect.y), Math.round(rect.w), Math.round(rect.h), text].join('|');
      out.push({ el, els: [...pendingBox, el], sig, name, named: !!fig, text, r: rect, H: rr.height / s, W: rr.width / s });
      pendingBox = [];
    }
  }
  return out;
}

function kindOf(u) {
  const n = u.name;
  if (/바텀시트|bottom ?sheet|drawer/i.test(n) || (u.r.w >= u.W - 2 && u.r.y > u.H * 0.3 && Math.abs(u.r.y + u.r.h - u.H) < 2 && u.r.h < u.H * 0.8)) return 'sheet';
  if (/^dim$|scene dim|^Dim/i.test(n) || (u.r.w >= u.W - 2 && u.r.h >= u.H - 2)) return 'dim';
  if (/모달|modal|dialog|팝업|popup|toast|토스트/i.test(n)) return 'modal';
  return 'fade';
}

function frames(kind, dir, reduced) {
  const enter = dir === 'in';
  if (reduced) return { k: [{ opacity: enter ? 0 : 1 }, { opacity: enter ? 1 : 0 }], d: motion.reduced, e: motion.easeOut };
  if (kind === 'sheet') return enter
    ? { k: [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], d: motion.sheetIn, e: motion.emphasizedDecel }
    : { k: [{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }], d: motion.sheetOut, e: motion.emphasizedAccel };
  if (kind === 'modal') return enter
    ? { k: [{ opacity: 0, transform: 'scale(' + motion.modalScale + ')' }, { opacity: 1, transform: 'scale(1)' }], d: motion.modalIn, e: motion.emphasizedDecel }
    : { k: [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(' + motion.modalScale + ')' }], d: motion.modalOut, e: motion.emphasizedAccel };
  if (kind === 'dim') return enter
    ? { k: [{ opacity: 0 }, { opacity: 1 }], d: motion.sheetIn, e: motion.standard }
    : { k: [{ opacity: 1 }, { opacity: 0 }], d: motion.sheetOut, e: motion.standard };
  return enter
    ? { k: [{ opacity: 0 }, { opacity: 1 }], d: motion.stateIn + 60, e: motion.standard }
    : { k: [{ opacity: 1 }, { opacity: 0 }], d: motion.stateOut + 40, e: motion.standard };
}

// 이름이 같은 요소끼리 짝짓는다. 이름이 여러 개면 자리가 가장 가까운 것끼리 짝짓는다.
function pairUp(pu, nu) {
  const byName = new Map();
  pu.forEach((u) => { if (u.named) (byName.get(u.name) || byName.set(u.name, []).get(u.name)).push(u); });
  const used = new Set();
  const pairs = [];
  nu.forEach((v) => {
    const arr = v.named && byName.get(v.name);
    if (!arr) return;
    let best = null, bd = Infinity;
    arr.forEach((u) => {
      if (used.has(u)) return;
      const d = Math.abs(u.r.x - v.r.x) + Math.abs(u.r.y - v.r.y) + Math.abs(u.r.w - v.r.w) + Math.abs(u.r.h - v.r.h);
      if (d < bd) { bd = d; best = u; }
    });
    if (best && bd < 700) { used.add(best); pairs.push([best, v]); }
  });
  return pairs;
}

const px = (v) => Math.round(v * 100) / 100;

// 주전부리 퀵슬롯: 접힌 알약(PILL)이 목록 패널(PANEL)로 펼쳐지고, 접을 때는 반대로 접힌다. 이모지처럼 칸마다 시차를 둔다.
const PANEL = '주전부리 퀵슬롯';
const PILL = '퀵슬롯 · 접힘';
const CLOSED_H = 86;
function expandPanel(v, play) {
  const H = v.r.h;
  v.els.forEach((el) => play(el, [{ clipPath: 'inset(0px 0px ' + px(Math.max(0, H - CLOSED_H)) + 'px 0px round 20px)', opacity: 0.35 }, { clipPath: 'inset(0px 0px 0px 0px round 20px)', opacity: 1 }], 520, motion.emphasizedDecel));
  Array.from(v.el.children).forEach((c, i) => play(c, [{ opacity: 0, transform: 'translateY(-18px) scale(0.88)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], 380, motion.emphasizedDecel, 90 + i * 50));
}
function collapsePanel(u, play) {
  const H = u.r.h;
  u.els.forEach((el) => play(el, [{ clipPath: 'inset(0px 0px 0px 0px round 20px)', opacity: 1 }, { clipPath: 'inset(0px 0px ' + px(Math.max(0, H - CLOSED_H)) + 'px 0px round 20px)', opacity: 0 }], 360, motion.emphasizedAccel));
  Array.from(u.el.children).forEach((c, i) => play(c, [{ opacity: 1 }, { opacity: 0 }], 160, motion.standard, i * 12));
}
// 배경 그림 주소가 서로 다른가(같은 이름과 자리의 장면 그림이 바뀌는 경우).
const bgUrl = (el) => { const m = /url\(["']?([^"')]+)/.exec(getComputedStyle(el).backgroundImage || ''); return m ? m[1] : ''; };
const bgChanged = (a, b) => { const x = bgUrl(a), y = bgUrl(b); return !!(x && y && x !== y); };

// prev, next: 레이어 요소. next는 opacity 0으로 미리 그려져 있다. 끝나면 prev를 치울 수 있게 resolve한다.
export async function morph(prev, next, reduced) {
  const pr = screenRoot(prev), nr = screenRoot(next);
  if (!pr || !nr) {
    next.style.opacity = '1';
    return;
  }
  const pu = units(pr), nu = units(nr);
  const pairs = pairUp(pu, nu);
  const pairedP = new Set(pairs.map((p) => p[0])), pairedN = new Set(pairs.map((p) => p[1]));
  const exiting = pu.filter((u) => !pairedP.has(u) && !nu.some((v) => v.sig === u.sig));
  const entering = nu.filter((v) => !pairedN.has(v) && !pu.some((u) => u.sig === v.sig));
  // 이전 화면은 위에 두되 바탕은 투명하게 한다(아래 새 화면의 요소가 비쳐 보여야 한다). 이전 화면의 같은 요소는 새 화면이 같은 모양으로 이어받는다.
  prev.style.zIndex = '2';
  next.style.zIndex = '1';
  const bgs = [prev, prev.firstElementChild, pr].filter(Boolean).map((e) => [e, e.style.background]);
  bgs.forEach(([e]) => (e.style.background = 'transparent'));
  next.style.opacity = '1';
  const anims = [];
  let longest = 0;
  const play = (el, k, d, e, delay = 0) => {
    longest = Math.max(longest, d + delay);
    anims.push(el.animate(k, { duration: d, delay, easing: e, fill: 'both' }));
  };
  const hidePrev = [];
  const D = reduced ? motion.reduced : SMART;
  for (const [u, v] of pairs) {
    if (u.sig === v.sig) {
      // 같은 자리의 요소라도 배경 그림이 다르면(장면이 바뀌면) 이전 그림이 옅어지며 새 그림이 드러난다.
      if (!reduced && bgChanged(u.el, v.el)) { u.els.forEach((el) => play(el, [{ opacity: 1 }, { opacity: 0 }], 340, motion.standard)); continue; }
      hidePrev.push(u);
      continue;
    }
    // 같은 이름의 시트가 거의 같은 자리와 크기에서 내용만 바뀌면(나의 편의점 시트가 아이템 상세 아래에 깔리는 경우) 두 시트를 겹쳐 섞지 않고 바로 바꾼다.
    // 그래야 위로 올라오는 상세 시트 아래에서 옛 시트가 반투명으로 비쳐 겹쳐 보이지 않는다.
    if (!reduced && kindOf(v) === 'sheet' && u.text !== v.text && Math.abs(v.r.h - u.r.h) < 24 && Math.abs(v.r.y - u.r.y) < 24) { hidePrev.push(u); continue; }
    const dx = u.r.x - v.r.x, dy = u.r.y - v.r.y;
    const sizeSame = Math.abs(u.r.w - v.r.w) < 1.5 && Math.abs(u.r.h - v.r.h) < 1.5;
    if (reduced) { hidePrev.push(u); v.els.forEach((el) => play(el, [{ opacity: 0 }, { opacity: 1 }], D, motion.easeOut)); continue; }
    if (sizeSame && u.text === v.text) {
      // 자리만 바뀐 요소: 제자리에서 미끄러진다.
      hidePrev.push(u);
      v.els.forEach((el) => play(el, [{ transform: 'translate(' + px(dx) + 'px,' + px(dy) + 'px)' }, { transform: 'translate(0,0)' }], D, motion.emphasizedDecel));
    } else if (v.r.w >= u.r.w - 1 && v.r.h >= u.r.h - 1) {
      // 커지는 요소(알약이 목록으로, 접힌 줄이 펼쳐진 줄로): 이전 자리와 크기에서 펼쳐진다. 이전 요소는 그 사이 옅어진다.
      const L = Math.max(0, u.r.x - v.r.x), T = Math.max(0, u.r.y - v.r.y);
      const R = Math.max(0, v.r.x + v.r.w - (u.r.x + u.r.w)), B = Math.max(0, v.r.y + v.r.h - (u.r.y + u.r.h));
      v.els.forEach((el) => play(el, [{ clipPath: 'inset(' + px(T) + 'px ' + px(R) + 'px ' + px(B) + 'px ' + px(L) + 'px round 14px)', opacity: 0.2 }, { clipPath: 'inset(0px 0px 0px 0px round 14px)', opacity: 1 }], D, motion.emphasizedDecel));
      u.els.forEach((el) => play(el, [{ opacity: 1 }, { opacity: 0 }], Math.round(D * 0.6), motion.standard));
    } else {
      // 줄어드는 요소: 이전 요소가 새 크기로 접히며 옅어지고, 새 요소가 들어온다.
      const L = Math.max(0, v.r.x - u.r.x), T = Math.max(0, v.r.y - u.r.y);
      const R = Math.max(0, u.r.x + u.r.w - (v.r.x + v.r.w)), B = Math.max(0, u.r.y + u.r.h - (v.r.y + v.r.h));
      u.els.forEach((el) => play(el, [{ clipPath: 'inset(0px 0px 0px 0px round 14px)', opacity: 1 }, { clipPath: 'inset(' + px(T) + 'px ' + px(R) + 'px ' + px(B) + 'px ' + px(L) + 'px round 14px)', opacity: 0 }], D, motion.emphasizedAccel));
      v.els.forEach((el) => play(el, [{ opacity: 0 }, { opacity: 1 }], D, motion.standard, Math.round(D * 0.25)));
    }
  }
  // 같은 모양으로 이어받는 요소와 자리만 옮기는 요소는 이전 화면 쪽을 숨긴다(두 번 그려져 겹쳐 보이지 않게).
  hidePrev.forEach((u) => u.els.forEach((el) => (el.style.visibility = 'hidden')));
  // 짝이 없는 요소: 사라지는 것은 이전 화면 위에서 빠지고, 새로 생기는 것은 같은 때에 들어온다.
  exiting.forEach((u) => {
    if (!reduced && u.name === PANEL) { collapsePanel(u, play); return; }
    if (!reduced && u.name === PILL) { u.els.forEach((el) => play(el, [{ opacity: 1 }, { opacity: 0 }], 160, motion.standard)); return; }
    const f = frames(kindOf(u), 'out', reduced);
    u.els.forEach((el) => play(el, f.k, f.d, f.e));
  });
  entering.forEach((v) => {
    // 자기 모션을 위해 보이기 전에 숨겨 둔 요소(inline opacity 0, 예: 종료 1의 해 그림 촤라락 모션)는 건드리지 않는다.
    // 여기서 0에서 1로 드러내면 전환이 끝날 때 다시 숨었다가 자기 모션으로 다시 나타났다(11/11 검사: 35에서 1로, 해 그림 +50 보임, +267 사라짐, +467 다시 보임).
    if (v.el.style.opacity === '0') return;
    if (!reduced && v.name === PANEL) { expandPanel(v, play); return; }
    if (!reduced && v.name === PILL) { v.els.forEach((el) => play(el, [{ opacity: 0 }, { opacity: 1 }], 220, motion.standard, 240)); return; }
    const f = frames(kindOf(v), 'in', reduced);
    v.els.forEach((el) => play(el, f.k, f.d, f.e, reduced ? 0 : 40));
  });
  await new Promise((res) => window.setTimeout(res, longest ? longest + 24 : 0));
  prev.style.visibility = 'hidden';
  anims.forEach((a) => a.cancel());
  bgs.forEach(([e, b]) => (e.style.background = b));
  next.style.zIndex = '';
}
