// 휴대폰에서 화면을 꽉 채운다. 피그마 화면(390 x 844)을 폭에 맞춰 키우고, 창 높이가 모자란 만큼은 빈 띠에서 줄인다.
// 1) 휴대폰에는 진짜 상태바가 있으므로 피그마 상태바 줄(위 crop px)과 홈 표시 막대는 숨긴다.
// 2) 머리말 아래의 빈 띠(요소가 없는 줄)를 비율대로 줄여 아래 요소를 끌어올린다. 요소 크기와 글자는 그대로다.
// 3) 빈 띠가 모자라면 바닥에 붙은 묶음(탭바, 입력창, 시트와 그 위에 이어 붙은 채팅)을 나머지만큼 더 올린다.
// 4) 화면 전체를 덮는 배경 그림은 그림 속 의자와 이름표가 어긋나지 않게 아래쪽 기준점이 움직인 만큼 같이 옮긴다.
import { mobile as M } from '../tokens.js';

const px = (v) => parseFloat(v) || 0;

export function fitMobile(container, root, visibleH) {
  if (!root || root.dataset.fit) return;
  root.dataset.fit = '1';
  const H0 = px(getComputedStyle(root).height);
  const delta = H0 - M.crop - visibleH;
  const all = Array.from(root.querySelectorAll('[data-figma]'));
  const rb = root.getBoundingClientRect();
  const s = rb.width / px(getComputedStyle(root).width) || 1;
  // 상태바와 홈 표시 막대 숨기기
  all.forEach((el) => {
    const name = el.getAttribute('data-figma') || '';
    if (/^(Status Bar|스테이터스바)/.test(name)) el.style.visibility = 'hidden';
    else {
      const r = el.getBoundingClientRect();
      const w = r.width / s, h = r.height / s, t = (r.top - rb.top) / s;
      if (Math.abs(w - M.homeBar[0]) < 2 && Math.abs(h - M.homeBar[1]) < 1.5 && t > H0 - 30) el.style.visibility = 'hidden';
    }
  });
  if (Math.abs(delta) < 1) return;
  const kids = Array.from(root.children).map((el) => {
    const cs = getComputedStyle(el);
    const t = px(cs.top), h = px(cs.height);
    return { el, t, h, b: t + h, l: px(cs.left), w: px(cs.width), abs: cs.position === 'absolute', hidden: cs.opacity === '0' || cs.visibility === 'hidden' };
  }).filter((k) => k.abs && k.h > 0);
  const isBg = (k) => k.h >= M.bgMin;
  const blocks = kids.filter((k) => !isBg(k) && !k.hidden && !(k.t <= 1 && k.h <= 70) && k.b > M.head).sort((a, b) => a.t - b.t);
  // 빈 띠 찾기
  const gaps = [];
  let cur = M.head;
  blocks.forEach((k) => {
    if (k.t > cur) gaps.push({ a: cur, z: k.t });
    cur = Math.max(cur, k.b);
  });
  if (cur < H0) gaps.push({ a: cur, z: H0 });
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
  // 바닥 묶음
  const cluster = new Set(blocks.filter((k) => k.b >= H0 - M.bottomSeed && k.t > M.clusterMin));
  let top = cluster.size ? Math.min(...Array.from(cluster).map((k) => k.t)) : H0;
  for (let grew = true; grew; ) {
    grew = false;
    blocks.forEach((k) => {
      if (cluster.has(k) || k.t < M.clusterMin) return;
      if (k.b >= top - M.clusterGap) {
        cluster.add(k);
        top = Math.min(top, k.t);
        grew = true;
      }
    });
  }
  const shiftOf = (k) => {
    if (isBg(k)) return shiftAt(k.t + k.h * M.bgAnchor);
    if (k.t < M.head) return 0;
    return shiftAt(k.t) + (cluster.has(k) ? rest : 0);
  };
  kids.forEach((k) => {
    const d = shiftOf(k);
    k.shift = d;
    if (d) k.el.style.top = k.t - d + 'px';
  });
  // 누르는 자리도 그 아래 요소와 같이 옮긴다.
  container.querySelectorAll('[data-hotspot]').forEach((b) => {
    const x = px(b.style.left) + px(b.style.width) / 2, y = px(b.style.top) + px(b.style.height) / 2;
    const under = kids.filter((k) => !isBg(k) && x >= k.l && x <= k.l + k.w && y >= k.t && y <= k.b).sort((p, q) => p.w * p.h - q.w * q.h)[0];
    const d = under ? under.shift : shiftAt(y) + (y >= top ? rest : 0);
    if (d) b.style.top = px(b.style.top) - d + 'px';
  });
}
