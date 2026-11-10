// 주전부리 던지기: 퀵슬롯의 주전부리를 손가락이나 마우스로 끌어서 방 한가운데 테이블 위에 놓으면 테이블에 던져 올린다.
// 끄는 동안 테이블이 빛나고, 놓으면 날아가 테이블 위에 떨어지며 효과음이 난다. 개수가 보이는 칸은 한 번 던지면 개수가 줄어든다.
// 던진 뒤 쿨타임(tokens live.throwCooldownSec, 3초) 동안 던진 칸에 하늘색 2px 안쪽 선과 검정 60% 부채꼴 덮개가 줄어들고(혼자 방 1647:24874 표시),
// 그동안 모든 칸은 눌리지 않는다. 끝나면 다시 던질 수 있다. 개수가 0이 된 칸만 계속 40% 투명이다.
// 던지는 대상은 사람이 아니라 테이블이다. 받는 사람이나 온도와는 관계가 없다.
import { motion, live as LIVE } from '../tokens.js';
import { q, relRect, scaleOf, setText } from './dom.js';
import { sfx, playSound, preloadSounds } from './sfx.js';
import { SLOT_ITEM, throwDoneText } from './itemSounds.js';
import { toast } from './room.js';

// 던진 기록은 화면을 옮기거나 퀵슬롯을 접었다 펴도 남는다(이름별 남은 개수, 쿨타임 중인 칸과 시작과 끝 시각).
const inv = {};
const cool = { name: '', start: 0, until: 0 };
const cooling = () => Date.now() < cool.until;
const nameOf = (slot) => (slot.getAttribute('data-figma') || '').replace(/^slot · /, '');
const rand = (a, b) => a + Math.random() * (b - a);

export function attachThrow(root) {
  const dock = root.querySelector('[data-figma="주전부리 퀵슬롯"]');
  if (!dock || dock.dataset.live) return;
  dock.dataset.live = 'throw';
  // 방에 들어오면 칸마다의 녹음 파일을 미리 받아 둔다(착지 소리가 늦지 않게, itemSounds.js).
  preloadSounds(Object.values(SLOT_ITEM));
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

  // 쿨타임 덮개: 칸 안에 하늘색 안쪽 선과, 오른쪽 반과 왼쪽 반 반원 두 장을 돌려 만든 부채꼴(12시에서 시계 방향, 남은 비율만큼)을 둔다.
  // 움직임은 transform(rotate)과 opacity만 쓴다. 남은 비율 1에서 0까지 앞 절반은 왼쪽 반이, 뒤 절반은 오른쪽 반이 줄어든다.
  const coverOf = (slot) => slot.querySelector(':scope > [data-cool]');
  const dropCover = (slot) => {
    const c = coverOf(slot);
    if (!c) return;
    c.removeAttribute('data-cool');
    const a = c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: motion.standard, fill: 'forwards' });
    a.onfinish = () => c.remove();
  };
  const makeCover = (slot) => {
    if (getComputedStyle(slot).position === 'static') slot.style.position = 'relative';
    const W = slot.offsetWidth || 44, D = W * 1.6, off = (W - D) / 2;
    const c = document.createElement('div');
    c.setAttribute('data-cool', '');
    c.setAttribute('aria-hidden', 'true');
    Object.assign(c.style, { position: 'absolute', left: '0', top: '0', width: W + 'px', height: W + 'px', borderRadius: 'inherit', overflow: 'hidden', pointerEvents: 'none', zIndex: '2' });
    const half = (side) => {
      // side 'R': 오른쪽 반만 보이는 칸 안에 왼쪽 반원을 둔다. side 'L': 왼쪽 반만 보이는 칸 안에 오른쪽 반원을 둔다.
      const clip = document.createElement('div');
      Object.assign(clip.style, { position: 'absolute', top: off + 'px', width: D / 2 + 'px', height: D + 'px', overflow: 'hidden', left: side === 'R' ? W / 2 + 'px' : off + 'px' });
      const disc = document.createElement('div');
      Object.assign(disc.style, { position: 'absolute', top: '0', width: D / 2 + 'px', height: D + 'px', background: 'rgba(0,0,0,0.6)', left: side === 'R' ? -D / 2 + 'px' : D / 2 + 'px', borderRadius: side === 'R' ? D / 2 + 'px 0 0 ' + D / 2 + 'px' : '0 ' + D / 2 + 'px ' + D / 2 + 'px 0', transformOrigin: side === 'R' ? '100% 50%' : '0% 50%' });
      clip.appendChild(disc);
      c.appendChild(clip);
      return disc;
    };
    const right = half('R'), left = half('L');
    const ring = document.createElement('div');
    Object.assign(ring.style, { position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', borderRadius: 'inherit', boxShadow: 'inset 0 0 0 2px #36D2FF' });
    c.appendChild(ring);
    slot.appendChild(c);
    const ms = LIVE.throwCooldownSec * 1000;
    const at = Math.min(ms, Math.max(0, Date.now() - cool.start));
    const opt = { duration: ms, easing: 'linear', fill: 'both' };
    const l = left.animate([{ transform: 'rotate(180deg)' }, { transform: 'rotate(0deg)', offset: 0.5 }, { transform: 'rotate(0deg)' }], opt);
    const r = right.animate([{ transform: 'rotate(180deg)' }, { transform: 'rotate(180deg)', offset: 0.5 }, { transform: 'rotate(0deg)' }], opt);
    l.currentTime = at;
    r.currentTime = at;
    c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: at > 0 ? 0 : 120, easing: motion.standard });
  };
  const paintCool = (slot) => {
    const st = inv[nameOf(slot)];
    const empty = !!st && st.count === 0;
    const mine = cooling() && cool.name === nameOf(slot);
    slot.dataset.cool = empty ? 'empty' : mine ? '1' : '';
    slot.style.opacity = empty ? '0.4' : '';
    if (mine && !coverOf(slot)) makeCover(slot);
    if (!mine) dropCover(slot);
  };
  const paintAll = () => slots.forEach(paintCool);
  let endTimer = 0;
  const armEnd = () => {
    window.clearTimeout(endTimer);
    if (!cooling()) return;
    endTimer = window.setTimeout(() => { if (root.isConnected) paintAll(); }, cool.until - Date.now() + 10);
  };
  // 이미 던진 기록을 화면에 다시 적용한다.
  slots.forEach((slot) => {
    const st = inv[nameOf(slot)];
    const cp = slot.querySelector('[data-figma="count"] p');
    if (st && cp && st.count !== undefined) setText(cp, String(st.count));
  });
  paintAll();
  armEnd();

  slots.forEach((slot) => {
    slot.style.touchAction = 'none';
    slot.style.cursor = 'grab';
    slot.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (slot.dataset.cool === 'empty') { sfx.deny(); toast(root, LIVE.throwEmptyText); return; }
      // 쿨타임 중에는 어느 칸도 들리지 않는다.
      if (cooling()) { sfx.deny(); return; }
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
        const soundKey = SLOT_ITEM[nameOf(slot)];
        const a = ghost.animate([
          { transform: from },
          { transform: 'translate(' + (tx + (pt.x - 20 - tx) * 0.4) + 'px,' + (Math.min(ty, pt.y) - 60) + 'px) scale(1.15) rotate(-16deg)', offset: 0.5 },
          { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(' + rot + 'deg)' },
        ], { duration: LIVE.throwFlyMs, easing: motion.emphasizedDecel, fill: 'forwards' });
        a.onfinish = () => {
          sfx.land();
          // 착지하는 순간 그 주전부리의 녹음 파일(11. 10. 피드백 "주전부리 올렸을때 소리 반영").
          if (soundKey) playSound(soundKey, { channel: 'item' });
          ghost.animate([{ transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(' + rot + 'deg)' }, { transform: 'translate(' + tx + 'px,' + (ty - 12) + 'px) scale(1.1) rotate(' + rot + 'deg)' }, { transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1) rotate(' + rot + 'deg)' }], { duration: 240, easing: motion.standard });
          // 머무는 시간의 마지막 throwFadeMs 동안 서서히 투명해지며 작아진 뒤 지운다(갑자기 없어지지 않게).
          const at = 'translate(' + tx + 'px,' + ty + 'px) rotate(' + rot + 'deg) ';
          window.setTimeout(() => {
            if (!ghost.isConnected) return;
            ghost.animate([{ opacity: 1, transform: at + 'scale(1)' }, { opacity: 0, transform: at + 'scale(' + LIVE.throwFadeScale + ')' }], { duration: LIVE.throwFadeMs, easing: 'ease-out', fill: 'forwards' }).onfinish = () => ghost.remove();
          }, LIVE.throwStayMs - LIVE.throwFadeMs);
        };
        // 개수와 쿨타임. 개수 글자가 없는 칸(함께 드르륵 퀵슬롯)은 개수를 세지 않는다.
        // 예전에는 개수 글자가 없을 때 0에서 1을 빼 0개로 저장해서, 한 번 던진 칸이 영영 40% 투명으로 남았다(11. 10. 팀 메모 2116:28612).
        const name = nameOf(slot);
        const cp = slot.querySelector('[data-figma="count"] p');
        const had = inv[name] && inv[name].count !== undefined ? inv[name].count : cp ? parseInt(cp.textContent || '0', 10) : undefined;
        if (had !== undefined) {
          const next = Math.max(0, had - 1);
          inv[name] = Object.assign(inv[name] || {}, { count: next });
          if (cp) setText(cp, String(next));
        }
        cool.name = name;
        cool.start = Date.now();
        cool.until = cool.start + LIVE.throwCooldownSec * 1000;
        paintAll();
        armEnd();
        // 안내 글은 던진 주전부리 이름을 말한다(예: 새우깡을 테이블에 올렸어요). 이름을 모르는 칸은 예전 글 그대로다.
        toast(root, SLOT_ITEM[name] ? throwDoneText(name) : LIVE.throwDoneText);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', done);
      window.addEventListener('pointercancel', done);
    });
  });
}
