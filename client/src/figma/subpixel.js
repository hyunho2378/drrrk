// 자동 생성: figma-to-code. 피그마와 같은 픽셀로 그리는 마무리 단계. 화면 루트에서 useFigmaSubpixel(ref)로 부른다.
// 1) 소수 위치: 브라우저는 그래픽을 기기 픽셀로 반올림한 자리에 그린다. data-px 요소를 피그마의 소수 위치로 되돌린다.
// 2) 16점 표본: 피그마는 글자와 도형 가장자리를 픽셀당 16점(4x4)으로 칠한다. 브라우저는 SVG를 4점으로 칠한다.
//    data-px SVG(아이콘, 벡터, 글자 윤곽)를 4배 해상도로 그려 4x4 평균을 낸 캔버스로 덮는다. 원래 SVG는 숨기고 자리와 배치는 그대로다.
// FIGMA_EXACT를 false로 두면 1)만 한다.
import { useLayoutEffect } from 'react';
export const FIGMA_EXACT = true;
export function fixSubpixel(root) {
  const dpr = window.devicePixelRatio || 1;
  const els = Array.from(root.querySelectorAll('[data-px]'));
  els.forEach(el => {
    el.style.translate = '';
  });
  els.forEach(el => {
    const r = el.getBoundingClientRect();
    const dx = r.left - Math.round(r.left * dpr) / dpr,
      dy = r.top - Math.round(r.top * dpr) / dpr;
    if (Math.abs(dx) > 1e-3 || Math.abs(dy) > 1e-3) el.style.translate = dx.toFixed(4) + 'px ' + dy.toFixed(4) + 'px';
  });
}

// 조상(또는 자신)에 이동이 아닌 변환(회전, 뒤집기, 기울임)이 있으면 다시 그리지 않고 CSS 그대로 둔다(실측: -15도 회전한 의자 그림이 크게, 180도 회전한 꺾쇠가 뒤집히지 않게 다시 그려졌다).
const transformed = (el, selfOk = false) => {
  for (let a = selfOk ? el.parentElement : el; a && a !== document.body; a = a.parentElement) {
    const t = getComputedStyle(a).transform;
    if (t && t !== 'none') {
      const m = new DOMMatrix(t);
      if (Math.abs(m.a - 1) > 1e-6 || Math.abs(m.b) > 1e-6 || Math.abs(m.c) > 1e-6 || Math.abs(m.d - 1) > 1e-6) return true;
    }
  }
  return false;
};
const load = s => new Promise(r => {
  const i = new Image();
  i.onload = () => r(i);
  i.onerror = () => r(null);
  i.src = s;
});

// 회전, 뒤집기 안의 SVG: 상자 세 모서리에 측정점을 넣어 화면 좌표(아핀 변환)를 읽고, 그 변환으로 4배 캔버스에 그린다.
// 캔버스는 가장 바깥 변환 요소 바로 뒤에 둔다(변환을 다시 받지 않게).
async function rasterTransformed(sv, dpr, K) {
  const cs = getComputedStyle(sv);
  const w = parseFloat(cs.width),
    h = parseFloat(cs.height);
  if (!(w > 0 && h > 0)) return;
  const host = sv.parentElement;
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  // SVG 요소는 offsetLeft가 없다. 절대 배치면 left, top 값, 아니면 host 안쪽 왼쪽 위(0, 0)다.
  const sl = cs.position === 'absolute' ? parseFloat(cs.left) || 0 : 0,
    st = cs.position === 'absolute' ? parseFloat(cs.top) || 0 : 0;
  const pts = [[0, 0], [w, 0], [0, h]].map(([x, y]) => {
    const p = document.createElement('i');
    p.style.cssText = 'position:absolute;width:0;height:0;left:' + (sl + x) + 'px;top:' + (st + y) + 'px';
    host.appendChild(p);
    const r = p.getBoundingClientRect();
    p.remove();
    return [r.left, r.top];
  });
  const P0 = pts[0],
    P1 = pts[1],
    P2 = pts[2];
  const ax = (P1[0] - P0[0]) / w,
    ay = (P1[1] - P0[1]) / w,
    bx = (P2[0] - P0[0]) / h,
    by = (P2[1] - P0[1]) / h;
  const xs = [P0[0], P1[0], P2[0], P1[0] + P2[0] - P0[0]],
    ys = [P0[1], P1[1], P2[1], P1[1] + P2[1] - P0[1]];
  const pad = 2;
  const X0 = Math.floor(Math.min(...xs) * dpr) - pad,
    Y0 = Math.floor(Math.min(...ys) * dpr) - pad,
    X1 = Math.ceil(Math.max(...xs) * dpr) + pad,
    Y1 = Math.ceil(Math.max(...ys) * dpr) + pad;
  const W = X1 - X0,
    H = Y1 - Y0;
  const color = cs.color;
  const cl = sv.cloneNode(true);
  cl.removeAttribute('style');
  cl.setAttribute('width', String(w));
  cl.setAttribute('height', String(h));
  if (!cl.getAttribute('xmlns')) cl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const img = await load('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(cl).replace(/currentColor/g, color)));
  if (!img) return;
  const big = document.createElement('canvas');
  big.width = W * K;
  big.height = H * K;
  const g = big.getContext('2d', {
    willReadFrequently: true
  });
  g.setTransform(ax * dpr * K, ay * dpr * K, bx * dpr * K, by * dpr * K, (P0[0] * dpr - X0) * K, (P0[1] * dpr - Y0) * K);
  g.drawImage(img, 0, 0, w, h);
  g.setTransform(1, 0, 0, 1, 0, 0);
  const bd = g.getImageData(0, 0, big.width, big.height).data;
  const out = document.createElement('canvas');
  out.width = W;
  out.height = H;
  const og = out.getContext('2d');
  const od = og.createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let r = 0,
      gg = 0,
      b = 0,
      a = 0;
    for (let j = 0; j < K; j++) {
      let i = ((y * K + j) * big.width + x * K) * 4;
      for (let q = 0; q < K; q++, i += 4) {
        const al = bd[i + 3];
        if (!al) continue;
        r += bd[i] * al;
        gg += bd[i + 1] * al;
        b += bd[i + 2] * al;
        a += al;
      }
    }
    const o = (y * W + x) * 4;
    if (a > 0) {
      od.data[o] = r / a;
      od.data[o + 1] = gg / a;
      od.data[o + 2] = b / a;
    }
    od.data[o + 3] = a / (K * K);
  }
  og.putImageData(od, 0, 0);
  out.setAttribute('data-raster', '');
  let outer = sv.parentElement;
  for (let a = sv.parentElement; a && a !== document.body; a = a.parentElement) {
    const t = getComputedStyle(a).transform;
    if (t && t !== 'none') outer = a;
  }
  const place = outer.parentElement;
  if (getComputedStyle(place).position === 'static') place.style.position = 'relative';
  const pr = place.getBoundingClientRect();
  const oc = getComputedStyle(outer);
  out.style.cssText = 'position:absolute;pointer-events:none;width:' + W / dpr + 'px;height:' + H / dpr + 'px;left:' + (X0 / dpr - pr.left - place.clientLeft) + 'px;top:' + (Y0 / dpr - pr.top - place.clientTop) + 'px' + (oc.zIndex !== 'auto' ? ';z-index:' + oc.zIndex : '');
  outer.insertAdjacentElement('afterend', out);
  const cr = out.getBoundingClientRect();
  const dx = X0 / dpr - cr.left,
    dy = Y0 / dpr - cr.top;
  if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) out.style.translate = dx + 'px ' + dy + 'px';
  sv.style.visibility = 'hidden';
}
export async function figmaRaster(root, K = 4) {
  const dpr = window.devicePixelRatio || 1;
  root.querySelectorAll('canvas[data-raster]').forEach(c => c.remove());
  const svgs = Array.from(root.querySelectorAll('svg[data-px]')).filter(s => !(s.parentElement && s.parentElement.closest('svg')));
  for (const sv of svgs) {
    sv.style.visibility = '';
    sv.style.translate = '';
    // 상자 층은 주인 상자의 바깥 상자를 기준으로 그린다. 브라우저는 border 두께를 기기 픽셀로 반올림해(1.723 → 1.5) SVG 자리가 0.2px 어긋난다.
    const host = sv.parentElement;
    const boxOwner = sv.hasAttribute('data-box') ? host.parentElement : null;
    if (!boxOwner && transformed(sv)) {
      await rasterTransformed(sv, dpr, K);
      continue;
    }
    const hr = (boxOwner || sv).getBoundingClientRect();
    if (!hr.width || !hr.height || transformed(boxOwner || sv)) continue;
    const color = getComputedStyle(sv).color;
    const cl = sv.cloneNode(true);
    cl.removeAttribute('style');
    cl.setAttribute('width', String(hr.width));
    cl.setAttribute('height', String(hr.height));
    // CSS 변수로 칠한 요소는 계산된 색을 속성으로 박는다(이미지로 그릴 때 변수가 풀리지 않는다).
    const srcEls = Array.from(sv.querySelectorAll('[style*="var("]'));
    const dstEls = Array.from(cl.querySelectorAll('[style*="var("]'));
    srcEls.forEach((e, i) => {
      const c2 = getComputedStyle(e);
      const d = dstEls[i];
      if (!d) return;
      d.removeAttribute('style');
      if (c2.fill && c2.fill !== 'none') d.setAttribute('fill', c2.fill);
      if (c2.stroke && c2.stroke !== 'none') d.setAttribute('stroke', c2.stroke);
    });
    if (!cl.getAttribute('xmlns')) cl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const img = await load('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(cl).replace(/currentColor/g, color)));
    if (!img) continue;
    const ox = hr.left * dpr,
      oy = hr.top * dpr;
    const X0 = Math.floor(ox),
      Y0 = Math.floor(oy);
    const fx = ox - X0,
      fy = oy - Y0;
    const pad = 2;
    const W = Math.ceil(hr.width * dpr + fx) + pad * 2,
      H = Math.ceil(hr.height * dpr + fy) + pad * 2;
    // 4배 캔버스는 가로 띠(64 기기 픽셀 높이)로 나눠 그린다. 화면만 한 상자를 한 번에 그리면 메모리가 넘친다.
    const out = document.createElement('canvas');
    out.width = W;
    out.height = H;
    const og = out.getContext('2d');
    const od = og.createImageData(W, H);
    const SH = 64;
    const big = document.createElement('canvas');
    big.width = W * K;
    big.height = SH * K;
    const g = big.getContext('2d', {
      willReadFrequently: true
    });
    for (let y0 = 0; y0 < H; y0 += SH) {
      const sh = Math.min(SH, H - y0);
      g.clearRect(0, 0, big.width, big.height);
      g.drawImage(img, (fx + pad) * K, (fy + pad - y0) * K, hr.width * dpr * K, hr.height * dpr * K);
      const bd = g.getImageData(0, 0, big.width, sh * K).data;
      for (let yy = 0; yy < sh; yy++) for (let x = 0; x < W; x++) {
        let r = 0,
          gg = 0,
          b = 0,
          a = 0;
        for (let j = 0; j < K; j++) {
          let i = ((yy * K + j) * big.width + x * K) * 4;
          for (let q = 0; q < K; q++, i += 4) {
            const al = bd[i + 3];
            if (!al) continue;
            r += bd[i] * al;
            gg += bd[i + 1] * al;
            b += bd[i + 2] * al;
            a += al;
          }
        }
        const o = ((y0 + yy) * W + x) * 4;
        if (a > 0) {
          od.data[o] = r / a;
          od.data[o + 1] = gg / a;
          od.data[o + 2] = b / a;
        }
        od.data[o + 3] = a / (K * K);
      }
    }
    og.putImageData(od, 0, 0);
    // 상자 층(data-box)은 그 상자 앞 형제로 둔다. 상자의 overflow 잘림은 자기 배경과 선에 걸리지 않는다(피그마와 같다). 상자의 불투명도와 혼합 모드는 복사한다.
    const owner = sv.hasAttribute('data-box') ? sv.parentElement.parentElement : null;
    const place = owner && owner.parentElement ? owner.parentElement : host;
    out.setAttribute('data-raster', '');
    if (getComputedStyle(place).position === 'static') place.style.position = 'relative';
    const hostR = place.getBoundingClientRect();
    const zi = getComputedStyle(sv).zIndex;
    if (owner) {
      const oc = getComputedStyle(owner);
      out.style.opacity = oc.opacity;
      out.style.mixBlendMode = oc.mixBlendMode;
    }
    out.style.cssText += ';position:absolute;pointer-events:none;width:' + W / dpr + 'px;height:' + H / dpr + 'px;left:' + ((X0 - pad) / dpr - hostR.left - place.clientLeft) + 'px;top:' + ((Y0 - pad) / dpr - hostR.top - place.clientTop) + 'px';
    if (owner && owner.parentElement) {
      const oz = getComputedStyle(owner).zIndex;
      if (oz !== 'auto') out.style.zIndex = oz;
      owner.insertAdjacentElement('beforebegin', out);
    } else {
      if (zi !== 'auto') out.style.zIndex = zi;
      sv.insertAdjacentElement('afterend', out);
    }
    const cr = out.getBoundingClientRect();
    const dx = (X0 - pad) / dpr - cr.left,
      dy = (Y0 - pad) / dpr - cr.top;
    if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) out.style.translate = dx + 'px ' + dy + 'px';
    sv.style.visibility = 'hidden';
  }
}

// 그림: 피그마는 픽셀당 16점(4x4)에서 그림을 샘플링해 평균 낸다. 각 점은 밉맵(2x2 평균 단계) + 삼선형 보간이고, 단계는 점 간격 기준(픽셀 기준보다 2단계 낮다).
// (실측: 픽셀 기준 한 점 모형은 그림마다 맞는 바이어스가 달랐고, 16점 모형은 소파 774 → 1, 일반 모드 580 → 0픽셀.)
export const IMG = {
  LOD_MIN: 0,
  BIAS: -0.5,
  SS: 4
};
const pyr = new Map();
async function pyramid(src) {
  if (pyr.has(src)) return pyr.get(src);
  const im = await load(src);
  if (!im) return null;
  const c = document.createElement('canvas');
  c.width = im.naturalWidth;
  c.height = im.naturalHeight;
  const g = c.getContext('2d');
  g.drawImage(im, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;
  // GPU 텍스처처럼 8비트 미리곱 색으로 둔다(메모리도 실수형의 1/4).
  const a0 = new Uint8ClampedArray(c.width * c.height * 4);
  for (let i = 0; i < a0.length; i += 4) {
    const al = d[i + 3] / 255;
    a0[i] = d[i] * al;
    a0[i + 1] = d[i + 1] * al;
    a0[i + 2] = d[i + 2] * al;
    a0[i + 3] = d[i + 3];
  }
  const lv = [{
    w: c.width,
    h: c.height,
    a: a0
  }];
  while (lv[lv.length - 1].w > 1 && lv[lv.length - 1].h > 1) {
    const p = lv[lv.length - 1];
    const w = Math.max(1, p.w >> 1),
      h = Math.max(1, p.h >> 1);
    const a = new Uint8ClampedArray(w * h * 4);
    const pa = p.a,
      pw = p.w;
    for (let y = 0; y < h; y++) {
      const y0 = Math.min(p.h - 1, 2 * y),
        y1 = Math.min(p.h - 1, 2 * y + 1);
      for (let x = 0; x < w; x++) {
        const x0 = Math.min(pw - 1, 2 * x),
          x1 = Math.min(pw - 1, 2 * x + 1);
        const i00 = (y0 * pw + x0) * 4,
          i10 = (y0 * pw + x1) * 4,
          i01 = (y1 * pw + x0) * 4,
          i11 = (y1 * pw + x1) * 4,
          o = (y * w + x) * 4;
        a[o] = (pa[i00] + pa[i10] + pa[i01] + pa[i11]) * 0.25;
        a[o + 1] = (pa[i00 + 1] + pa[i10 + 1] + pa[i01 + 1] + pa[i11 + 1]) * 0.25;
        a[o + 2] = (pa[i00 + 2] + pa[i10 + 2] + pa[i01 + 2] + pa[i11 + 2]) * 0.25;
        a[o + 3] = (pa[i00 + 3] + pa[i10 + 3] + pa[i01 + 3] + pa[i11 + 3]) * 0.25;
      }
    }
    lv.push({
      w,
      h,
      a
    });
  }
  c.width = c.height = 0;
  pyr.set(src, lv);
  return lv;
}
const bil = (L, u, v, k) => {
  const x = u * L.w - 0.5,
    y = v * L.h - 0.5;
  const x0 = Math.floor(x),
    y0 = Math.floor(y),
    fx = x - x0,
    fy = y - y0;
  const at = (xx, yy) => {
    xx = Math.max(0, Math.min(L.w - 1, xx));
    yy = Math.max(0, Math.min(L.h - 1, yy));
    return L.a[(yy * L.w + xx) * 4 + k];
  };
  return (at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx) * (1 - fy) + (at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx) * fy;
};
// 양선형 표본을 acc에 가중치 w로 더한다(채널 4개를 한 번에).
const samp = (L, u, v, w, acc) => {
  const x = u * L.w - 0.5,
    y = v * L.h - 0.5;
  let x0 = Math.floor(x),
    y0 = Math.floor(y);
  const fx = x - x0,
    fy = y - y0;
  const xa = x0 < 0 ? 0 : x0 >= L.w ? L.w - 1 : x0,
    xb = x0 + 1 < 0 ? 0 : x0 + 1 >= L.w ? L.w - 1 : x0 + 1,
    ya = y0 < 0 ? 0 : y0 >= L.h ? L.h - 1 : y0,
    yb = y0 + 1 < 0 ? 0 : y0 + 1 >= L.h ? L.h - 1 : y0 + 1;
  const a = L.a;
  const i00 = (ya * L.w + xa) * 4,
    i10 = (ya * L.w + xb) * 4,
    i01 = (yb * L.w + xa) * 4,
    i11 = (yb * L.w + xb) * 4;
  const w00 = (1 - fx) * (1 - fy) * w,
    w10 = fx * (1 - fy) * w,
    w01 = (1 - fx) * fy * w,
    w11 = fx * fy * w;
  for (let k = 0; k < 4; k++) acc[k] += a[i00 + k] * w00 + a[i10 + k] * w10 + a[i01 + k] * w01 + a[i11 + k] * w11;
};
export async function figmaImages(root) {
  const dpr = window.devicePixelRatio || 1;
  for (const el of Array.from(root.querySelectorAll('[data-img]'))) {
    // 다시 그릴 때를 위해 원래 배경 그림을 보관하고, 매번 되돌린 뒤 시작한다(실측: 세 번째 실행에서 배경이 none이라 그림 경로를 잃고 빈 화면이 됐다).
    if (el.dataset.bgOrig === undefined) el.dataset.bgOrig = el.style.backgroundImage || '';else el.style.backgroundImage = el.dataset.bgOrig;
    const o = JSON.parse(el.getAttribute('data-img') || '{}');
    const src = resolveSrc(el, o.src);
    if (!src) continue;
    const lv = await pyramid(src);
    if (!lv) continue;
    const W0 = lv[0].w,
      H0 = lv[0].h;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || transformed(el, true)) continue;
    let A = 1,
      B = 0,
      Bx = 0,
      C = 0,
      D = 1,
      Ty = 0;
    if ((o.mode === 'CROP' || o.mode === 'STRETCH') && o.tf) {
      A = o.tf[0][0];
      B = o.tf[0][1];
      Bx = o.tf[0][2];
      C = o.tf[1][0];
      D = o.tf[1][1];
      Ty = o.tf[1][2];
    } else {
      const s = o.mode === 'FIT' ? Math.min(r.width / W0, r.height / H0) : Math.max(r.width / W0, r.height / H0);
      A = r.width / (W0 * s);
      D = r.height / (H0 * s);
      Bx = (1 - A) / 2;
      Ty = (1 - D) / 2;
    }
    const lod = Math.log2(Math.max(Math.hypot(A, C) * W0 / (r.width * dpr), Math.hypot(B, D) * H0 / (r.height * dpr)));
    if (lod < IMG.LOD_MIN) continue;
    const l = Math.max(0, lod - Math.log2(IMG.SS) + IMG.BIAS);
    const l0 = Math.min(lv.length - 1, Math.floor(l)),
      l1 = Math.min(lv.length - 1, l0 + 1),
      fr = l - Math.floor(l);
    const cs = getComputedStyle(el);
    const rad = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, r.width / 2, r.height / 2);
    const X0 = Math.floor(r.left * dpr),
      Y0 = Math.floor(r.top * dpr),
      X1 = Math.ceil(r.right * dpr),
      Y1 = Math.ceil(r.bottom * dpr);
    const W = X1 - X0,
      H = Y1 - Y0;
    const out = document.createElement('canvas');
    out.width = W;
    out.height = H;
    const og = out.getContext('2d');
    const od = og.createImageData(W, H);
    const acc = new Float64Array(4);
    const inside = (x, y) => {
      if (x < 0 || y < 0 || x > r.width || y > r.height) return false;
      if (!rad) return true;
      const cx = x < rad ? rad : x > r.width - rad ? r.width - rad : x,
        cy = y < rad ? rad : y > r.height - rad ? r.height - rad : y;
      return (x - cx) ** 2 + (y - cy) ** 2 <= rad * rad;
    };
    // 마스크 그룹(data-mask) 안 그림: 16점마다 마스크 도형 안팎을 판정한다.
    const mEl = el.parentElement && el.parentElement.hasAttribute('data-mask') ? el.parentElement : null;
    let mtest = null;
    if (mEl) {
      const md = JSON.parse(mEl.getAttribute('data-mask') || '{}');
      const mr = mEl.getBoundingClientRect();
      const tc = document.createElement('canvas').getContext('2d');
      const ps = (md.g || []).map(g => ({
        p: new Path2D(g.d),
        r: g.r === 'EVENODD' ? 'evenodd' : 'nonzero'
      }));
      mtest = (x, y) => {
        const lx = x - mr.left - md.x,
          ly = y - mr.top - md.y;
        for (const q of ps) if (tc.isPointInPath(q.p, lx, ly, q.r)) return true;
        return false;
      };
    }
    const SS = IMG.SS,
      wq = 1 / (SS * SS);
    for (let py = 0; py < H; py++) for (let px = 0; px < W; px++) {
      // 픽셀당 SS x SS 점: 그림 상자(모서리 포함)와 마스크 안의 점만 색과 덮임에 더한다(피그마 16점 표본).
      const c = acc;
      c[0] = c[1] = c[2] = c[3] = 0;
      let any = false;
      for (let j = 0; j < SS; j++) for (let i = 0; i < SS; i++) {
        const gx = (X0 + px + (i + 0.5) / SS) / dpr,
          gy = (Y0 + py + (j + 0.5) / SS) / dpr;
        const lx = gx - r.left,
          ly = gy - r.top;
        if (!inside(lx, ly)) continue;
        if (mtest && !mtest(gx, gy)) continue;
        any = true;
        let sx2 = lx / r.width,
          sy2 = ly / r.height;
        if (o.flip === 'x') sx2 = 1 - sx2;
        if (o.flip === 'y') sy2 = 1 - sy2;
        const u = A * sx2 + B * sy2 + Bx,
          v = C * sx2 + D * sy2 + Ty;
        samp(lv[l0], u, v, wq * (1 - fr), c);
        if (fr > 0) samp(lv[l1], u, v, wq * fr, c);
      }
      if (!any) continue;
      const q = (py * W + px) * 4;
      if (c[3] > 0) {
        od.data[q] = c[0] / (c[3] / 255);
        od.data[q + 1] = c[1] / (c[3] / 255);
        od.data[q + 2] = c[2] / (c[3] / 255);
      }
      od.data[q + 3] = Math.round(c[3] * (o.op ?? 1));
    }
    if (mEl) {
      if (mEl.dataset.maskOrig === undefined) mEl.dataset.maskOrig = '1';
      mEl.style.maskImage = 'none';
      mEl.style.webkitMaskImage = 'none';
    }
    out.setAttribute('data-raster', '');
    if (!el.firstElementChild) {
      // 자식이 없는 그림 요소: 캔버스를 바로 뒤 형제로 둔다. 요소 변환(뒤집기)을 받지 않으므로 화면 그대로 그린 픽셀을 쓴다. 불투명도, 혼합 모드, 보임은 복사한다.
      og.putImageData(od, 0, 0);
      const host = el.parentElement;
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      const hr = host.getBoundingClientRect();
      out.style.cssText = 'position:absolute;pointer-events:none;width:' + W / dpr + 'px;height:' + H / dpr + 'px;left:' + (X0 / dpr - hr.left - host.clientLeft) + 'px;top:' + (Y0 / dpr - hr.top - host.clientTop) + 'px;opacity:' + cs.opacity + ';mix-blend-mode:' + cs.mixBlendMode + ';visibility:' + cs.visibility + (cs.zIndex !== 'auto' ? ';z-index:' + cs.zIndex : '');
      el.insertAdjacentElement('afterend', out);
      const cr = out.getBoundingClientRect();
      const dx = X0 / dpr - cr.left,
        dy = Y0 / dpr - cr.top;
      if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) out.style.translate = dx + 'px ' + dy + 'px';
    } else {
      // 자식이 있는 요소(배경 그림 위에 자식): 캔버스를 요소 안 맨 아래 층에 둔다. 뒤집힌 요소는 요소 변환이 다시 뒤집으므로 미리 뒤집는다.
      if (o.flip === 'x' || o.flip === 'y') {
        const t = og.createImageData(W, H);
        for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < W; xx++) {
          const sx = o.flip === 'x' ? W - 1 - xx : xx,
            sy = o.flip === 'y' ? H - 1 - yy : yy;
          const a = (sy * W + sx) * 4,
            b = (yy * W + xx) * 4;
          t.data[b] = od.data[a];
          t.data[b + 1] = od.data[a + 1];
          t.data[b + 2] = od.data[a + 2];
          t.data[b + 3] = od.data[a + 3];
        }
        og.putImageData(t, 0, 0);
      } else og.putImageData(od, 0, 0);
      if (cs.position === 'static') el.style.position = 'relative';
      el.style.isolation = 'isolate';
      const bl = el.clientLeft,
        bt = el.clientTop;
      let lx = X0 / dpr - r.left - bl,
        ly = Y0 / dpr - r.top - bt;
      if (o.flip === 'x') lx = r.right - X1 / dpr - bl;
      if (o.flip === 'y') ly = r.bottom - Y1 / dpr - bt;
      out.style.cssText = 'position:absolute;pointer-events:none;z-index:-1;width:' + W / dpr + 'px;height:' + H / dpr + 'px;left:' + lx + 'px;top:' + ly + 'px';
      el.insertBefore(out, el.firstChild);
      const cr = out.getBoundingClientRect();
      const dx = X0 / dpr - cr.left,
        dy = Y0 / dpr - cr.top;
      if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) {
        const sx = o.flip === 'x' ? -1 : 1,
          sy = o.flip === 'y' ? -1 : 1;
        out.style.translate = dx * sx + 'px ' + dy * sy + 'px';
      }
    }
    el.style.backgroundImage = 'none';
  }
}
// 그림 경로: 렌더된 요소의 background-image(번들러가 바꾼 경로 포함)를 우선 쓴다.
function resolveSrc(el, fallback) {
  const m = /url\(["']?([^"')]+)["']?\)/.exec(el.style.backgroundImage || getComputedStyle(el).backgroundImage || '');
  return m ? m[1] : fallback;
}

// 구운 노드(PNG): 피그마에서 8배로 내보낸 PNG를 기기 픽셀 격자에 맞춰 면적 평균으로 줄인다. 4x4 평균이 피그마의 16점 표본과 같은 가장자리를 만든다.
export async function figmaHires(root) {
  const dpr = window.devicePixelRatio || 1;
  for (const im of Array.from(root.querySelectorAll('img[data-hires]'))) {
    im.style.visibility = '';
    const src = im.currentSrc || im.src;
    const img = await load(src);
    if (!img) continue;
    const r = im.getBoundingClientRect();
    if (!r.width || !r.height || transformed(im)) continue;
    const sw = img.naturalWidth,
      sh = img.naturalHeight;
    const kx = sw / (r.width * dpr),
      ky = sh / (r.height * dpr);
    const c0 = document.createElement('canvas');
    c0.width = sw;
    c0.height = sh;
    const g0 = c0.getContext('2d');
    g0.drawImage(img, 0, 0);
    const sd = g0.getImageData(0, 0, sw, sh).data;
    const X0 = Math.floor(r.left * dpr),
      Y0 = Math.floor(r.top * dpr),
      X1 = Math.ceil(r.right * dpr),
      Y1 = Math.ceil(r.bottom * dpr);
    const W = X1 - X0,
      H = Y1 - Y0;
    const out = document.createElement('canvas');
    out.width = W;
    out.height = H;
    const og = out.getContext('2d');
    const od = og.createImageData(W, H);
    for (let py = 0; py < H; py++) {
      const ya = (Y0 + py - r.top * dpr) * ky,
        yb = ya + ky;
      for (let px = 0; px < W; px++) {
        const xa = (X0 + px - r.left * dpr) * kx,
          xb = xa + kx;
        let R = 0,
          G = 0,
          B = 0,
          A = 0;
        for (let y = Math.max(0, Math.floor(ya)); y < Math.min(sh, Math.ceil(yb)); y++) {
          const wy = Math.min(yb, y + 1) - Math.max(ya, y);
          if (wy <= 0) continue;
          for (let x = Math.max(0, Math.floor(xa)); x < Math.min(sw, Math.ceil(xb)); x++) {
            const wx = Math.min(xb, x + 1) - Math.max(xa, x);
            if (wx <= 0) continue;
            const i = (y * sw + x) * 4;
            const a = sd[i + 3] * wx * wy;
            R += sd[i] * a;
            G += sd[i + 1] * a;
            B += sd[i + 2] * a;
            A += a;
          }
        }
        const q = (py * W + px) * 4;
        if (A > 0) {
          od.data[q] = R / A;
          od.data[q + 1] = G / A;
          od.data[q + 2] = B / A;
        }
        od.data[q + 3] = A / (kx * ky);
      }
    }
    og.putImageData(od, 0, 0);
    out.setAttribute('data-raster', '');
    const cs = getComputedStyle(im);
    const host = im.parentElement;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    const hr = host.getBoundingClientRect();
    out.style.cssText = 'position:absolute;pointer-events:none;width:' + W / dpr + 'px;height:' + H / dpr + 'px;left:' + (X0 / dpr - hr.left - host.clientLeft) + 'px;top:' + (Y0 / dpr - hr.top - host.clientTop) + 'px;opacity:' + cs.opacity + ';mix-blend-mode:' + cs.mixBlendMode + (cs.zIndex !== 'auto' ? ';z-index:' + cs.zIndex : '');
    im.insertAdjacentElement('afterend', out);
    const cr = out.getBoundingClientRect();
    const dx = X0 / dpr - cr.left,
      dy = Y0 / dpr - cr.top;
    if (Math.abs(dx) > 1e-4 || Math.abs(dy) > 1e-4) out.style.translate = dx + 'px ' + dy + 'px';
    im.style.visibility = 'hidden';
  }
}
export function useFigmaSubpixel(ref) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let seq = 0;
    const run = async () => {
      const my = ++seq;
      el.removeAttribute('data-raster-done');
      const t = {};
      let t0 = performance.now();
      fixSubpixel(el);
      if (FIGMA_EXACT && window.__figmaExact !== false) {
        /* 앱은 window.__figmaExact = false로 16점 다시 그리기를 끈다(대조 도구에서만 켠다). */if (document.fonts) await document.fonts.ready;
        if (window.__figmaHold) await window.__figmaHold; /* 앱이 화면 전환 중이면 끝날 때까지 기다린다(전환 중 캔버스가 끼어들지 않게). */
        if (my !== seq) return;
        t0 = performance.now();
        await figmaRaster(el);
        t.raster = performance.now() - t0;
        if (my !== seq) return;
        t0 = performance.now();
        await figmaImages(el);
        t.images = performance.now() - t0;
        if (my !== seq) return;
        t0 = performance.now();
        await figmaHires(el);
        t.hires = performance.now() - t0;
      }
      window.__figmaTimes = t;
      if (my === seq) el.setAttribute('data-raster-done', '');
    };
    run().catch(e => {
      window.__figmaErr = String(e && e.stack || e);
      el.setAttribute('data-raster-done', 'error');
    });
    let w = el.getBoundingClientRect().width;
    const ro = new ResizeObserver(() => {
      const nw = el.getBoundingClientRect().width;
      if (nw !== w) {
        w = nw;
        run();
      }
    });
    ro.observe(el);
    // 그림이나 글꼴을 나중에 바꿨으면 window.dispatchEvent(new Event('figma-raster'))로 다시 그린다.
    const onEv = () => {
      run().catch(e => {
        window.__figmaErr = String(e && e.stack || e);
        el.setAttribute('data-raster-done', 'error');
      });
    };
    window.addEventListener('figma-raster', onEv);
    return () => {
      seq++;
      ro.disconnect();
      window.removeEventListener('figma-raster', onEv);
    };
  }, []);
}