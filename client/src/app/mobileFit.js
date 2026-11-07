// 휴대폰에서 화면을 꽉 채운다. 피그마 화면(390 x 844)을 폭에 맞춰 키우고, 창 높이가 모자란 만큼을 아래 순서로 맞춘다.
// 1) 휴대폰에는 진짜 상태바가 있으므로 피그마 상태바 줄(위 crop px)과 홈 표시 막대는 숨긴다.
// 2) 머리말 아래 빈 띠(요소가 없는 줄)를 비율대로 줄여 아래 요소를 끌어올린다. 요소 크기와 글자는 그대로다.
// 3) 빈 띠가 모자라면 바닥 요소(탭바, 입력창, 버튼, 시트와 그 위에 바로 이어 붙은 채팅)를 창 바닥에 붙이고,
//    그 사이 내용은 위아래로 스크롤해서 본다(live.js). 피그마에 원래 스크롤 칸이 있는 화면은 그 칸 높이만 줄인다.
// 4) 화면 전체를 덮는 배경 그림은 그림 속 의자와 이름표가 어긋나지 않게 아래쪽 기준점이 움직인 만큼 같이 옮긴다.
import { mobile as M } from '../tokens.js';

const px = (v) => parseFloat(v) || 0;

export function fitMobile(container, root, visibleH) {
  if (!root || root.dataset.fit) return;
  root.dataset.fit = '1';
  const H0 = px(getComputedStyle(root).height);
  const delta = H0 - M.crop - visibleH;
  const rb = root.getBoundingClientRect();
  const s = rb.width / (px(getComputedStyle(root).width) || 390) || 1;
  root.querySelectorAll('[data-figma]').forEach((el) => {
    const name = el.getAttribute('data-figma') || '';
    if (/^(Status Bar|스테이터스바)/.test(name)) {
      el.style.visibility = 'hidden';
      return;
    }
    const r = el.getBoundingClientRect();
    const w = r.width / s, h = r.height / s, t = (r.top - rb.top) / s;
    if (Math.abs(w - M.homeBar[0]) < 2 && Math.abs(h - M.homeBar[1]) < 1.5 && t > H0 - 30) el.style.visibility = 'hidden';
  });
  root.__fit = { rest: 0, pinned: new Set(), native: false, input: false };
  if (Math.abs(delta) < 1) return;
  const kids = Array.from(root.children).map((el) => {
    const cs = getComputedStyle(el);
    const t = px(cs.top), h = px(cs.height);
    return {
      el, t, h, b: t + h, l: px(cs.left), w: px(cs.width),
      abs: cs.position === 'absolute',
      hidden: cs.opacity === '0' || cs.visibility === 'hidden',
      native: /(auto|scroll)/.test(cs.overflowY) && h >= M.bgMin,
      text: !!el.querySelector('p'),
      name: el.getAttribute('data-figma') || '',
    };
  }).filter((k) => k.abs && k.h > 0);
  const isBg = (k) => k.h >= M.bgMin && !k.native && !k.text;
  const blocks = kids.filter((k) => !isBg(k) && !k.native && !k.hidden && !(k.t <= 1 && k.h <= 70) && k.b > M.head).sort((a, b) => a.t - b.t);
  const native = kids.filter((k) => k.native);
  // 바닥에 붙일 요소: 바닥까지 닿는 전체 폭 요소(탭바, 시트, 그라데이션)와 바닥 띠 안에 들어 있는 요소(입력창, 버튼, 링크).
  // 시트 위에 얹힌 요소(시트 윗선 아래에서 시작하는 요소)도 시트와 같이 붙인다.
  const pinned = new Set(blocks.filter((k) => (k.b >= H0 - 1 && k.l <= 1 && k.w >= 389) || (k.t >= H0 - M.bottomSeed && k.b <= H0 + 1)));
  const sheets = Array.from(pinned).filter((k) => k.l <= 1 && k.w >= 389 && k.b >= H0 - 1);
  const sheetTop = sheets.length ? Math.min(...sheets.map((k) => k.t)) : H0;
  blocks.forEach((k) => { if (k.t >= sheetTop) pinned.add(k); });
  let pinTop = pinned.size ? Math.min(...Array.from(pinned).map((k) => k.t)) : H0;
  // 빈 띠(머리말 아래부터 바닥 요소 윗선까지)
  const gaps = [];
  let cur = M.head;
  if (!native.length) {
    blocks.forEach((k) => {
      if (pinned.has(k)) return;
      if (k.t > cur && k.t <= pinTop) gaps.push({ a: cur, z: Math.min(k.t, pinTop) });
      cur = Math.max(cur, k.b);
    });
    if (cur < pinTop) gaps.push({ a: cur, z: pinTop });
  }
  gaps.forEach((g) => (g.use = Math.max(0, g.z - g.a - M.keep)));
  const total = gaps.reduce((a, g) => a + g.use, 0);
  const take = delta > 0 ? Math.min(delta, total) : 0;
  gaps.forEach((g) => (g.cut = total ? (g.use * take) / total : 0));
  const rest = delta - take;
  const shiftAt = (y) => {
    let v = 0;
    gaps.forEach((g) => {
      if (y >= g.z) v += g.cut;
      else if (y > g.a) v += Math.min(g.cut, y - g.a);
    });
    return v;
  };
  // 빈 띠가 모자라면 입력창 바로 위에 이어 붙은 채팅도 입력창과 같이 올린다. 단, 올린 자리가 다른 내용(배경 그림 제외)과 겹치면 올리지 않는다.
  if (rest > 0) {
    let top = pinTop;
    const grown = [];
    for (let grew = true; grew; ) {
      grew = false;
      blocks.forEach((k) => {
        if (pinned.has(k) || grown.includes(k) || k.t < M.clusterMin || k.b > top + 1) return;
        if (k.b >= top - M.clusterGap) {
          grown.push(k);
          top = Math.min(top, k.t);
          grew = true;
        }
      });
    }
    const clash = grown.some((g) => blocks.some((o) => !pinned.has(o) && !grown.includes(o) &&
      Math.min(g.b - delta, o.b) - Math.max(g.t - delta, o.t) > 4 && Math.min(g.l + g.w, o.l + o.w) - Math.max(g.l, o.l) > 4));
    if (!clash) grown.forEach((g) => pinned.add(g));
  }
  const shiftOf = (k) => {
    if (k.native) return 0;
    if (isBg(k)) return shiftAt(k.t + k.h * M.bgAnchor);
    if (k.t < M.head) return 0;
    // 바닥 요소는 창 바닥에 맞게 차이 전체만큼 옮기고, 나머지는 줄인 빈 띠만큼 옮긴다.
    return pinned.has(k) ? delta : shiftAt(k.t);
  };
  kids.forEach((k) => {
    k.shift = shiftOf(k);
    if (k.shift) k.el.style.top = k.t - k.shift + 'px';
    // 바닥 요소는 스크롤되는 내용 위에 놓는다.
    if (pinned.has(k) && rest > 0) k.el.style.zIndex = String(M.pinZ);
  });
  // 피그마 스크롤 칸은 보이는 높이까지만 남긴다(안쪽 내용은 그대로 스크롤된다).
  native.forEach((k) => {
    if (delta > 0) k.el.style.height = Math.max(0, H0 - delta - k.t) + 'px';
  });
  // 누르는 자리도 그 아래 요소와 같이 옮긴다.
  container.querySelectorAll('[data-hotspot]').forEach((b) => {
    const x = px(b.style.left) + px(b.style.width) / 2, y = px(b.style.top) + px(b.style.height) / 2;
    const under = kids.filter((k) => !isBg(k) && !k.native && x >= k.l && x <= k.l + k.w && y >= k.t && y <= k.b).sort((p, q) => p.w * p.h - q.w * q.h)[0];
    const d = under ? under.shift : shiftAt(y);
    if (d) b.style.top = px(b.style.top) - d + 'px';
    b.dataset.fitPinned = under && pinned.has(under) ? '1' : '';
  });
  root.__fit = {
    rest: Math.max(0, rest),
    pinned: new Set(Array.from(pinned).map((k) => k.el)),
    native: native.length > 0,
    // 라이브 댓글 화면은 입력창 바로 위 댓글이 보이도록 맨 아래에서 시작한다.
    input: !!root.querySelector('[data-figma="댓글 (라이브 채팅)"]'),
  };
}
