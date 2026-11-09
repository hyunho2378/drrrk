// 주전부리 퀵슬롯 펼치기와 접기. 화면을 바꾸지 않는다. 같은 방 안에서 퀵슬롯만 제자리에서 펼쳐지고 접힌다.
// 배경 장면과 채팅, 시계는 그대로이고 퀵슬롯 요소만 움직인다(피그마 28, 30의 목록과 29, 31, 40의 접힌 알약을 짝으로 쓴다).
// 목록은 피그마 28 화면에서 복제해 와서 피그마 값 그대로이고, 펼친 뒤에는 주전부리 던지기도 그대로 된다.
import { cloneOf, warm } from './donor.js';
import { attachThrow } from './throw.js';
import { relRect, scaleOf } from './dom.js';

const PANEL = '[data-figma="주전부리 퀵슬롯"]';
const PILL = '[data-figma="퀵슬롯 · 접힘"]';
const ROOMS = [28, 29, 30, 31, 40];
const CLOSED_H = 86;
const HEAD_H = 34;
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
const EASE_IN = 'cubic-bezier(0.3, 0, 0.8, 0.15)';
const OPEN_MS = 300;
const CLOSE_MS = 220;

const hide = (el) => { el.style.visibility = 'hidden'; };
const show = (el) => { el.style.visibility = 'visible'; };

function bindPill(root, st) {
  const pill = st.pill;
  if (!pill || pill.dataset.qs) return;
  pill.dataset.qs = '1';
  pill.style.cursor = 'pointer';
  pill.style.touchAction = 'manipulation';
  const up = () => { pill.style.transition = 'transform 120ms ' + EASE; pill.style.transform = ''; };
  pill.addEventListener('pointerdown', () => { pill.style.transition = 'transform 70ms ' + EASE; pill.style.transform = 'scale(0.93)'; });
  pill.addEventListener('pointerup', up);
  pill.addEventListener('pointercancel', up);
  pill.addEventListener('pointerleave', up);
  pill.addEventListener('click', (e) => { e.stopPropagation(); up(); expand(root, st); });
}

function bindPanel(root, st) {
  const panel = st.panel;
  if (!panel || panel.dataset.qsc) return;
  panel.dataset.qsc = '1';
  panel.addEventListener('click', (e) => {
    const rr = root.getBoundingClientRect();
    const s = scaleOf(root);
    const y = (e.clientY - rr.top) / s;
    if (y - relRect(root, panel).y <= HEAD_H) { e.stopPropagation(); collapse(root, st); }
  });
}

async function expand(root, st) {
  if (st.busy || st.open) return;
  st.busy = true;
  let panel = st.panel;
  if (!panel) {
    panel = await cloneOf(28, PANEL);
    if (!panel || !root.isConnected) { st.busy = false; return; }
    if (st.fix) st.fix(panel);
    const top = st.pill ? relRect(root, st.pill).y : 192;
    Object.assign(panel.style, { top: top + 'px', zIndex: '20' });
    root.appendChild(panel);
    st.panel = panel;
    attachThrow(root);
    bindPanel(root, st);
  } else {
    show(panel);
  }
  const H = relRect(root, panel).h;
  const a = panel.animate(
    [{ clipPath: 'inset(0px 0px ' + Math.max(0, H - CLOSED_H) + 'px 0px round 20px)', opacity: 0.4 }, { clipPath: 'inset(0px 0px 0px 0px round 20px)', opacity: 1 }],
    { duration: OPEN_MS, easing: EASE, fill: 'backwards' },
  );
  Array.from(panel.children).forEach((c, i) => c.animate(
    [{ opacity: 0, transform: 'translateY(-14px) scale(0.9)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }],
    { duration: 200, delay: 20 + i * 24, easing: EASE, fill: 'backwards' },
  ));
  if (st.pill) {
    const p = st.pill;
    const f = p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 110, easing: 'linear', fill: 'forwards' });
    f.onfinish = () => { hide(p); f.cancel(); };
  }
  st.open = true;
  a.onfinish = () => { st.busy = false; };
  window.setTimeout(() => { st.busy = false; }, OPEN_MS + 40);
}

async function collapse(root, st) {
  if (st.busy || !st.open || !st.panel) return;
  st.busy = true;
  const panel = st.panel;
  const pr = relRect(root, panel);
  if (!st.pill) {
    const pill = await cloneOf(29, PILL);
    if (!pill || !root.isConnected) { st.busy = false; return; }
    Object.assign(pill.style, { top: pr.y + 'px', zIndex: '19' });
    root.appendChild(pill);
    st.pill = pill;
    bindPill(root, st);
  }
  const pill = st.pill;
  show(pill);
  pill.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, delay: 70, easing: 'linear', fill: 'backwards' });
  const a = panel.animate(
    [{ clipPath: 'inset(0px 0px 0px 0px round 20px)', opacity: 1 }, { clipPath: 'inset(0px 0px ' + Math.max(0, pr.h - CLOSED_H) + 'px 0px round 20px)', opacity: 0 }],
    { duration: CLOSE_MS, easing: EASE_IN, fill: 'forwards' },
  );
  st.open = false;
  a.onfinish = () => { hide(panel); a.cancel(); st.busy = false; };
}

export function attachQuickSlot(root, n, fix) {
  if (!ROOMS.includes(n) || root.__qs) return;
  const pill = root.querySelector(PILL);
  const panel = root.querySelector(PANEL);
  if (!pill && !panel) return;
  const st = { pill, panel, open: !!panel, busy: false, fix: fix ? (el) => fix(el) : null };
  root.__qs = st;
  bindPill(root, st);
  bindPanel(root, st);
  warm([28, 29]);
}
