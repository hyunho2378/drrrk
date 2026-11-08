// 주전부리 던지기: 퀵슬롯의 주전부리를 손가락이나 마우스로 끌어서 방 한가운데 테이블 위에 놓으면 테이블에 던져 올린다.
// 끄는 동안 테이블이 빛나고, 놓으면 날아가 테이블 위에 떨어지며 효과음이 난다. 한 번 던지면 개수가 줄어든다. 쿨타임은 없다.
// 던지는 대상은 사람이 아니라 테이블이다. 받는 사람이나 온도와는 관계가 없다.
import { motion, live as LIVE } from '../tokens.js';
import { q, relRect, scaleOf, setText } from './dom.js';
import { sfx } from './sfx.js';
import { toast } from './room.js';

// 던진 기록은 화면을 옮겨도 남는다(이름별 남은 개수와 쿨타임이 끝나는 시각).
const inv = {};
const nameOf = (slot) => (slot.getAttribute('data-figma') || '').replace(/^slot · /, '');
const rand = (a, b) => a + Math.random() * (b - a);

export function attachThrow(root) {
  const dock = root.querySelector('[data-figma="주전부리 퀵슬롯"]');
  if (!dock || dock.dataset.live) return;
  dock.dataset.live = 'throw';
  const group = root.querySelector('[data-figma="Group 2147229349"]');
  const slots = q(dock, '[data-figma^="slot · "]');
  const toRoot = (ev) => {
    const rr = root.getBoundingClientRect();
    const s = scaleOf(root);
    return { x: (ev.clientX - rr.left) / s, y: (ev.clientY - rr.top) / s };
  };
  // 테이블 자리. 피그마 화면 기준 좌표에 의자 이름표 묶음이 움직인 만큼을 더한다(휴대폰에서 배경이 옮겨져도 테이블을 따라간다).
  const table = () => {
    let dx = 0, dy = 0;
    if (group) {
      const g = relRect(root, group);
      dx = g.x - LIVE.nameGroupAt[0];
      dy = g.y - LIVE.nameGroupAt[1];
    }
    const t = LIVE.throwTable, l = LIVE.throwLand;
    return { x: t.x + dx, y: t.y + dy, w: t.w, h: t.h, land: { x: l.x + dx, y: l.y + dy, w: l.w, h: l.h } };
  };
  const inTable = (pt) => {
    const t = table();
    return pt.x >= t.x && pt.x <= t.x + t.w && pt.y >= t.y && pt.y <= t.y + t.h;
  };
  let glow = null;
  const setGlow = (on) => {
    if (!glow) {
      glow = document.createElement('div');
      Object.assign(glow.style, { position: 'absolute', borderRadius: '50%', background: 'rgba(46,229,157,0.16)', boxShadow: 'inset 0 0 0 2px #2EE59D', pointerEvents: 'none', zIndex: '12', opacity: '0', transition: 'opacity 140ms linear' });
      root.appendChild(glow);
    }
    if (on) {
      const t = table();
      Object.assign(glow.style, { left: t.x + 10 + 'px', top: t.y + 30 + 'px', width: t.w - 20 + 'px', height: t.h - 70 + 'px', opacity: '1' });
    } else glow.style.opacity = '0';
  };

  const paintCool = (slot) => {
    const name = nameOf(slot);
    const st = inv[name];
    let badge = slot.querySelector(':scope > [data-cool]');
    const left = st && st.until ? Math.ceil((st.until - Date.now()) / 1000) : 0;
    const empty = st && st.count === 0;
    if (left <= 0 && !empty) {
      slot.style.opacity = '';
      slot.dataset.cool = '';
      if (badge) badge.remove();
      return;
    }
    slot.dataset.cool = empty ? 'empty' : '1';
    slot.style.opacity = '0.4';
    if (!empty) {
      if (!badge) {
        badge = document.createElement('div');
        badge.setAttribute('data-cool', '');
        Object.assign(badge.style, { position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8F8F8', fontFamily: "'SUIT', system-ui, sans-serif", fontSize: '15px', fontWeight: '700', pointerEvents: 'none' });
        slot.appendChild(badge);
      }
      badge.textContent = String(left);
      window.setTimeout(() => root.isConnected && paintCool(slot), 1000);
    }
  };
  // 이미 던진 기록을 화면에 다시 적용한다.
  slots.forEach((slot) => {
    const st = inv[nameOf(slot)];
    if (!st) return;
    const cp = slot.querySelector('[data-figma="count"] p');
    if (cp && st.count !== undefined) setText(cp, String(st.count));
    paintCool(slot);
  });

  slots.forEach((slot) => {
    slot.style.touchAction = 'none';
    slot.style.cursor = 'grab';
    slot.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (slot.dataset.cool === 'empty') { sfx.deny(); toast(root, LIVE.throwEmptyText); return; }
      const sx = e.clientX, sy = e.clientY;
      const img = slot.querySelector(':scope > [data-figma]:not([data-figma="count"])');
      if (!img) return;
      let ghost = null, hot = false;
      const move = (ev) => {
        if (!ghost) {
          if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < LIVE.dragStart) return;
          ghost = img.cloneNode(true);
          Object.assign(ghost.style, { position: 'absolute', left: '0px', top: '0px', width: '40px', height: '40px', zIndex: '45', pointerEvents: 'none', willChange: 'transform' });
          root.appendChild(ghost);
          slot.style.opacity = '0.45';
          sfx.pick();
        }
        const p = toRoot(ev);
        ghost.style.transform = 'translate(' + (p.x - 20) + 'px,' + (p.y - 20) + 'px) scale(1)';
        const on = inTable(p);
        if (on !== hot) {
          hot = on;
          setGlow(on);
          if (on) sfx.tick();
        }
      };
      const done = (ev) => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', done);
        window.removeEventListener('pointercancel', done);
        setGlow(false);
        if (!ghost) { toast(root, LIVE.throwHintText); return; }
        // 끌고 놓은 손가락이 바로 뒤 click으로 이어지면 빈 곳 누름 안내(누를 수 있는 자리 하늘색 표시)가 떴다(11/09 QA). 한 번만 막는다.
        const eat = (ce) => { ce.stopPropagation(); ce.preventDefault(); };
        window.addEventListener('click', eat, { capture: true, once: true });
        window.setTimeout(() => window.removeEventListener('click', eat, { capture: true }), 400);
        const pt = toRoot(ev);
        const from = 'translate(' + (pt.x - 20) + 'px,' + (pt.y - 20) + 'px) scale(1)';
        if (!inTable(pt)) {
          const sr = relRect(root, slot);
          const a = ghost.animate([{ transform: from, opacity: 1 }, { transform: 'translate(' + (sr.x + 6) + 'px,' + (sr.y + 6) + 'px) scale(1)', opacity: 0.6 }], { duration: 220, easing: motion.emphasizedDecel, fill: 'forwards' });
          a.onfinish = () => { ghost.remove(); slot.style.opacity = ''; };
          sfx.miss();
          return;
        }
        // 테이블 위 아무 곳에나 떨어진다.
        const t = table();
        const tx = rand(t.land.x, t.land.x + t.land.w) - 20;
        const ty = rand(t.land.y, t.land.y + t.land.h) - 20;
        const rot = rand(-14, 14);
        sfx.throw();
        const a = ghost.animate([
          { transform: from },
          { transform: 'translate(' + (tx + (pt.x - 20 - tx) * 0.4) + 'px,' + (Math.min(ty, pt.y) - 60) + 'px) scale(1.15) rotate(-16deg)', offset: 0.5 },
          { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(' + rot + 'deg)' },
        ], { duration: LIVE.throwFlyMs, easing: motion.emphasizedDecel, fill: 'forwards' });
        a.onfinish = () => {
          sfx.land();
          ghost.animate([{ transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(' + rot + 'deg)' }, { transform: 'translate(' + tx + 'px,' + (ty - 12) + 'px) scale(1.1) rotate(' + rot + 'deg)' }, { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(' + rot + 'deg)' }], { duration: 240, easing: motion.standard });
          // 머무는 시간의 마지막 throwFadeMs 동안 서서히 투명해지며 작아진 뒤 지운다(갑자기 없어지지 않게).
          const at = 'translate(' + tx + 'px,' + ty + 'px) rotate(' + rot + 'deg) ';
          window.setTimeout(() => {
            if (!ghost.isConnected) return;
            ghost.animate([{ opacity: 1, transform: at + 'scale(1)' }, { opacity: 0, transform: at + 'scale(' + LIVE.throwFadeScale + ')' }], { duration: LIVE.throwFadeMs, easing: 'ease-out', fill: 'forwards' }).onfinish = () => ghost.remove();
          }, LIVE.throwStayMs - LIVE.throwFadeMs);
        };
        // 개수와 쿨타임
        const name = nameOf(slot);
        const cp = slot.querySelector('[data-figma="count"] p');
        const cur = inv[name] && inv[name].count !== undefined ? inv[name].count : parseInt((cp && cp.textContent) || '0', 10);
        const next = Math.max(0, cur - 1);
        inv[name] = Object.assign(inv[name] || {}, { count: next });
        if (cp) setText(cp, String(next));
        paintCool(slot);
        toast(root, LIVE.throwDoneText);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', done);
      window.addEventListener('pointercancel', done);
    });
  });
}
