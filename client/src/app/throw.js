// 주전부리 던지기: 퀵슬롯의 주전부리를 손가락이나 마우스로 끌어서 의자 위에 놓으면 그 의자 앞에 던진다.
// 끄는 동안 의자가 빛나고, 놓으면 날아가 떨어지며 효과음이 난다. 한 번 던지면 개수가 줄고 쿨타임이 돈다.
import { motion, live as LIVE } from '../tokens.js';
import { q, relRect, scaleOf, setText } from './dom.js';
import { sfx } from './sfx.js';
import { toast } from './room.js';

// 던진 기록은 화면을 옮겨도 남는다(이름별 남은 개수와 쿨타임이 끝나는 시각).
const inv = {};
const nameOf = (slot) => (slot.getAttribute('data-figma') || '').replace(/^slot · /, '');

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
  // 의자 자리: 이름표 둘레를 의자 위로 본다. 놓는 순간 위치로 계산한다.
  const zones = () => {
    const labels = group ? q(group, ':scope > p[data-outline]') : [];
    return labels.map((p) => {
      const r = relRect(root, p);
      return { label: p, x: r.x - 56, y: r.y - 26, w: r.w + 112, h: 210, cx: r.x + r.w / 2, fy: r.y + 130 };
    });
  };
  const zoneAt = (pt) => zones().findIndex((z) => pt.x >= z.x && pt.x <= z.x + z.w && pt.y >= z.y && pt.y <= z.y + z.h);
  let glow = null;
  const setGlow = (z) => {
    if (!glow) {
      glow = document.createElement('div');
      Object.assign(glow.style, { position: 'absolute', borderRadius: '16px', background: 'rgba(46,229,157,0.14)', boxShadow: 'inset 0 0 0 2px #2EE59D', pointerEvents: 'none', zIndex: '12', opacity: '0', transition: 'opacity 140ms linear' });
      root.appendChild(glow);
    }
    if (z) Object.assign(glow.style, { left: z.x + 'px', top: z.y + 'px', width: z.w + 'px', height: z.h + 'px', opacity: '1' });
    else glow.style.opacity = '0';
  };

  const cool = (slot, secs) => {
    const name = nameOf(slot);
    const until = Date.now() + secs * 1000;
    inv[name] = Object.assign(inv[name] || {}, { until });
    paintCool(slot);
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
      if (slot.dataset.cool === 'empty') { sfx.deny(); toast(root, '남은 주전부리가 없어요'); return; }
      if (slot.dataset.cool) { sfx.deny(); toast(root, '쿨타임이에요. 조금만 기다려 주세요'); return; }
      const sx = e.clientX, sy = e.clientY;
      const img = slot.querySelector(':scope > [data-figma]:not([data-figma="count"])');
      if (!img) return;
      let ghost = null, hot = -1, last = null;
      const move = (ev) => {
        if (!ghost) {
          if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < LIVE.dragStart) return;
          ghost = img.cloneNode(true);
          Object.assign(ghost.style, { position: 'absolute', left: '0px', top: '0px', width: '32px', height: '32px', zIndex: '45', pointerEvents: 'none', willChange: 'transform' });
          root.appendChild(ghost);
          slot.style.opacity = '0.45';
          sfx.pick();
        }
        last = toRoot(ev);
        ghost.style.transform = 'translate(' + (last.x - 16) + 'px,' + (last.y - 16) + 'px) scale(1.25)';
        const z = zoneAt(last);
        if (z !== hot) {
          hot = z;
          setGlow(z >= 0 ? zones()[z] : null);
          if (z >= 0) sfx.tick();
        }
      };
      const done = (ev) => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', done);
        window.removeEventListener('pointercancel', done);
        setGlow(null);
        if (!ghost) { toast(root, '의자 쪽으로 끌어서 놓으면 던져요'); return; }
        const pt = toRoot(ev);
        const z = zoneAt(pt);
        const from = 'translate(' + (pt.x - 16) + 'px,' + (pt.y - 16) + 'px) scale(1.25)';
        if (z < 0) {
          const sr = relRect(root, slot);
          const a = ghost.animate([{ transform: from, opacity: 1 }, { transform: 'translate(' + (sr.x + 6) + 'px,' + (sr.y + 6) + 'px) scale(1)', opacity: 0.6 }], { duration: 220, easing: motion.emphasizedDecel, fill: 'forwards' });
          a.onfinish = () => { ghost.remove(); slot.style.opacity = ''; };
          sfx.miss();
          return;
        }
        const zone = zones()[z];
        const tx = zone.cx - 16, ty = zone.fy;
        sfx.throw();
        const a = ghost.animate([
          { transform: from },
          { transform: 'translate(' + (tx + (pt.x - 16 - tx) * 0.4) + 'px,' + (Math.min(ty, pt.y) - 70) + 'px) scale(1.5) rotate(-18deg)', offset: 0.5 },
          { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(8deg)' },
        ], { duration: LIVE.throwFlyMs, easing: motion.emphasizedDecel, fill: 'forwards' });
        a.onfinish = () => {
          sfx.land();
          ghost.animate([{ transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(8deg)' }, { transform: 'translate(' + tx + 'px,' + (ty - 12) + 'px) scale(1.12) rotate(4deg)' }, { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(8deg)' }], { duration: 240, easing: motion.standard });
          const plus = document.createElement('div');
          plus.textContent = '+' + LIVE.throwWarm.toFixed(1) + '°';
          Object.assign(plus.style, { position: 'absolute', left: zone.cx - 22 + 'px', top: zone.fy - 24 + 'px', width: '44px', textAlign: 'center', color: '#36D2FF', fontFamily: "'SUIT', system-ui, sans-serif", fontSize: '15px', fontWeight: '800', zIndex: '46', pointerEvents: 'none' });
          root.appendChild(plus);
          plus.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(-10px)', offset: 0.25 }, { opacity: 0, transform: 'translateY(-34px)' }], { duration: 1300, easing: 'ease-out' }).onfinish = () => plus.remove();
          window.setTimeout(() => ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' }).onfinish = () => ghost.remove(), 1500);
        };
        // 개수와 쿨타임
        const name = nameOf(slot);
        const cp = slot.querySelector('[data-figma="count"] p');
        const cur = inv[name] && inv[name].count !== undefined ? inv[name].count : parseInt((cp && cp.textContent) || '0', 10);
        const next = Math.max(0, cur - 1);
        inv[name] = Object.assign(inv[name] || {}, { count: next });
        if (cp) setText(cp, String(next));
        cool(slot, LIVE.throwCooldown);
        toast(root, '주전부리를 던졌어요. 받은 사람의 엉따 온도가 올라가요');
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', done);
      window.addEventListener('pointercancel', done);
    });
  });
}
