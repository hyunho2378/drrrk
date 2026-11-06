// 같은 방 안 상태 변화(시트, 모달, 이모지, 고민 펼치기, 탭 전환)를 요소 단위로 잇는다.
// 두 화면의 최상위 요소를 이름, 자리, 글자로 맞춰 보고 같은 것은 그대로 두고, 사라지는 것은 먼저 빠지고, 새로 생긴 것만 들어온다.
// 움직임은 transform과 opacity만 쓴다(web.dev, How to create high-performance CSS animations).
import { motion } from '../tokens.js';

const screenRoot = (layer) => layer.querySelector('[data-node]');

// 피그마 마무리 단계가 만든 캔버스는 주인 요소 옆에 붙는다. 상자 층(data-raster)은 주인 앞, 그림 캔버스는 주인 뒤에 있다.
function units(root) {
  const host = root.querySelector(':scope > [data-scroll] > [data-scroll-content]');
  const lists = host ? [Array.from(host.children), Array.from(root.children).filter((c) => !c.hasAttribute('data-scroll'))] : [Array.from(root.children)];
  const out = [];
  for (const kids of lists) {
    let pendingBox = [];
    for (const el of kids) {
      if (el.tagName === 'CANVAS') {
        if (el.hasAttribute('data-raster')) pendingBox.push(el);
        else if (out.length) out[out.length - 1].els.push(el);
        continue;
      }
      const r = el.getBoundingClientRect();
      const rr = root.getBoundingClientRect();
      const name = el.getAttribute('data-figma') || el.tagName;
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160);
      const sig = [name, Math.round(r.left - rr.left), Math.round(r.top - rr.top), Math.round(r.width), Math.round(r.height), text].join('|');
      out.push({ el, els: [...pendingBox, el], sig, name, r: { x: r.left - rr.left, y: r.top - rr.top, w: r.width, h: r.height }, H: rr.height, W: rr.width });
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
    ? { k: [{ opacity: 0 }, { opacity: 1 }], d: motion.stateIn, e: motion.standard }
    : { k: [{ opacity: 1 }, { opacity: 0 }], d: motion.stateOut, e: motion.standard };
}

function run(list, dir, reduced) {
  let longest = 0;
  const anims = [];
  for (const u of list) {
    const f = frames(kindOf(u), dir, reduced);
    longest = Math.max(longest, f.d);
    for (const el of u.els) anims.push(el.animate(f.k, { duration: f.d, easing: f.e, fill: 'both' }));
  }
  return { anims, wait: () => new Promise((res) => (longest ? window.setTimeout(res, longest + 20) : res())) };
}

// prev, next: 레이어 요소. next는 opacity 0으로 미리 그려져 있다. 끝나면 prev를 치울 수 있게 resolve한다.
export async function morph(prev, next, reduced) {
  const pr = screenRoot(prev), nr = screenRoot(next);
  if (!pr || !nr) {
    next.style.opacity = '1';
    return;
  }
  const pu = units(pr), nu = units(nr);
  const ps = new Set(pu.map((u) => u.sig)), ns = new Set(nu.map((u) => u.sig));
  const exiting = pu.filter((u) => !ns.has(u.sig));
  const entering = nu.filter((u) => !ps.has(u.sig));
  // 1) 사라지는 것: 이전 화면을 위에 둔 채 빠진다.
  prev.style.zIndex = '2';
  next.style.zIndex = '1';
  const hideIn = entering.flatMap((u) => u.els.map((el) => el.animate([{ opacity: 0 }], { duration: 1, fill: 'forwards' })));
  next.style.opacity = '1';
  if (exiting.length) await run(exiting, 'out', reduced).wait();
  // 2) 이전 화면을 치우고(같은 요소는 픽셀이 같아 티가 안 난다) 새로 생긴 것이 들어온다.
  prev.style.visibility = 'hidden';
  hideIn.forEach((a) => a.cancel());
  const r = run(entering, 'in', reduced);
  await r.wait();
  r.anims.forEach((a) => a.cancel());
  next.style.zIndex = '';
}
