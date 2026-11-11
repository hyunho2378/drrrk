// 주전부리 퀵슬롯 펼치기와 접기. 화면을 바꾸지 않는다. 같은 방 안에서 퀵슬롯만 제자리에서 펼쳐지고 접힌다.
// 배경 장면과 채팅, 시계는 그대로이고 퀵슬롯 요소만 움직인다(피그마 28, 30의 목록과 29, 31, 40의 접힌 알약을 짝으로 쓴다).
// 목록은 피그마 28 화면에서 복제해 와서 피그마 값 그대로이고, 펼친 뒤에는 주전부리 던지기도 그대로 된다.
import { cloneOf, warm } from './donor.js';
import { attachThrow } from './throw.js';
import { relRect, scaleOf } from './dom.js';

const PANEL = '[data-figma="주전부리 퀵슬롯"]';
const PILL = '[data-figma="퀵슬롯 · 접힘"]';
// 66은 혼자 방 해 뜨는 단계(피그마 2351:34553). 접힌 알약과 숨겨 둔 41 목록(solo.js prepareSoloSunrise)을 짝으로 쓴다.
// 혼자 방(46, 43, 41, 42, 66)도 함께 방과 같은 퀵슬롯이다(사용자 11/12 03:25). 접힌 알약을 누르면 다른 화면(41)으로 가지 않고 제자리에서 펼쳐지고,
// 목록은 함께 방 목록(28, 개수 배지 없음)을 쓴다. 그래서 개수 제한도 없고 모든 주전부리를 계속 던질 수 있다(쿨타임 3초만 같다).
const SOLO = [46, 43, 41, 42, 66];
const ROOMS = [28, 29, 30, 31, 40, ...SOLO];
const groupOf = (n) => (SOLO.includes(n) ? 'C' : 'B');
// 펼침 상태는 같은 방 안 화면 전환(혼자 방 46에서 41로 넘어가는 자동 전환, 안내 창 42, 해 뜨는 단계 66, 함께 방 29에서 40)에서 이어진다.
// 새 화면은 보이기 전(prepareQuickSlot)에 같은 상태로 만들어 둔다. 다른 방이나 방 밖에서 들어오면 피그마 프레임 그대로 시작한다.
let carry = null;
const setCarry = (st) => { carry = { g: st.g, open: st.open }; };
// 접기 핸들 바탕(피그마 1979:27597, 검정 45%). 함께 방 28 화면은 scene.js가 칠한다. 복제해 온 목록도 같은 모양이 되게 한다.
const dress = (panel) => { const h = panel.querySelector(':scope > [data-figma="접기 핸들"]'); if (h) h.style.background = 'rgba(0, 0, 0, 0.45)'; return panel; };
const CLOSED_H = 86;
const HEAD_H = 34;
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
const EASE_IN = 'cubic-bezier(0.3, 0, 0.8, 0.15)';
const OPEN_MS = 300;
const CLOSE_MS = 220;

const hide = (el) => { el.style.visibility = 'hidden'; };
// 고민 배너가 펼쳐지면 room.js가 퀵슬롯을 transform으로 104px 내린다. 새로 붙이는 목록과 알약은 피그마 기본 자리(top)에 두고
// 그 내림 값만 이어받는다. 예전에는 내려간 자리를 top으로 굳혀서, 배너를 접어도 퀵슬롯이 296에 남아 이름표와 채팅 위에 겹쳤다(11. 10. 팀 메모 2116:28613).
const baseTop = (el) => parseFloat(el.style.top || getComputedStyle(el).top) || 192;
const follow = (el, from) => { el.style.transition = 'none'; el.style.transform = from ? from.style.transform : ''; };
const show = (el) => { el.style.visibility = 'visible'; };

function bindPill(root, st) {
  const pill = st.pill;
  if (!pill || pill.dataset.qs) return;
  pill.dataset.qs = '1';
  pill.style.cursor = 'pointer';
  pill.style.touchAction = 'manipulation';
  // 누름 반응은 scale 속성으로 한다(transform은 배너가 펼쳐질 때 내려가는 값이 쓰고 있다).
  const up = () => { pill.style.transition = 'scale 120ms ' + EASE + ', transform ' + 300 + 'ms ' + EASE; pill.style.scale = ''; };
  pill.addEventListener('pointerdown', () => { pill.style.transition = 'scale 70ms ' + EASE; pill.style.scale = '0.93'; });
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
    dress(panel);
    const top = st.pill ? baseTop(st.pill) : 192;
    Object.assign(panel.style, { top: top + 'px', zIndex: '20' });
    follow(panel, st.pill);
    root.appendChild(panel);
    st.panel = panel;
    attachThrow(root);
    bindPanel(root, st);
  } else {
    follow(panel, st.pill);
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
  setCarry(st);
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
    Object.assign(pill.style, { top: baseTop(panel) + 'px', zIndex: '19' });
    root.appendChild(pill);
    st.pill = pill;
    bindPill(root, st);
  }
  const pill = st.pill;
  follow(pill, panel);
  show(pill);
  pill.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, delay: 70, easing: 'linear', fill: 'backwards' });
  const a = panel.animate(
    [{ clipPath: 'inset(0px 0px 0px 0px round 20px)', opacity: 1 }, { clipPath: 'inset(0px 0px ' + Math.max(0, pr.h - CLOSED_H) + 'px 0px round 20px)', opacity: 0 }],
    { duration: CLOSE_MS, easing: EASE_IN, fill: 'forwards' },
  );
  st.open = false;
  setCarry(st);
  a.onfinish = () => { hide(panel); a.cancel(); st.busy = false; };
}

export function attachQuickSlot(root, n, fix) {
  if (!ROOMS.includes(n) || root.__qs) return;
  const pill = root.querySelector(PILL);
  const panel = root.querySelector(PANEL);
  if (!pill && !panel) return;
  const st = { pill, panel, g: groupOf(n), open: !!panel && panel.style.visibility !== 'hidden', busy: false, fix: fix ? (el) => fix(el) : null };
  root.__qs = st;
  setCarry(st);
  bindPill(root, st);
  bindPanel(root, st);
  warm([28, 29]);
}

// 보이기 전(live.js prepare)에 부른다. sameRoom은 앞 화면이 같은 방(live.js ROOMS 묶음)이었는지다.
// 1) 혼자 방 화면의 목록(41 생성 화면, 칸마다 개수 배지)은 함께 방 목록(28)으로 바꾼다. 자리와 보임 상태는 그대로 둔다.
// 2) 안내 창(42) 생성 화면에는 퀵슬롯이 없다. 뒤에 깔린 방이 그대로 보이게 같은 자리(324, 192)에 퀵슬롯을 둔다(안내 창 판 아래).
// 3) 같은 방 안에서 넘어왔으면 앞 화면의 펼침 상태를 그대로 만든다(움직임 없이).
export async function prepareQuickSlot(root, n, sameRoom, fix) {
  if (!ROOMS.includes(n) || !root || root.dataset.qsPrep) return;
  root.dataset.qsPrep = '1';
  const g = groupOf(n);
  if (!sameRoom || !carry || carry.g !== g) carry = null;
  let panel = root.querySelector(':scope > ' + PANEL);
  let pill = root.querySelector(':scope > ' + PILL);
  if (g === 'C' && panel && !panel.dataset.qs28) {
    const np = await cloneOf(28, PANEL);
    if (!np || !root.isConnected) return;
    np.dataset.qs28 = '1';
    if (fix) fix(np);
    dress(np);
    ['left', 'top', 'visibility', 'zIndex'].forEach((k) => { np.style[k] = panel.style[k]; });
    panel.replaceWith(np);
    panel = np;
  }
  if (g === 'C' && !panel && !pill) {
    const want = carry ? carry.open : false;
    const el = want ? await cloneOf(28, PANEL) : await cloneOf(46, PILL);
    if (!el || !root.isConnected) return;
    if (want) { el.dataset.qs28 = '1'; if (fix) fix(el); dress(el); }
    Object.assign(el.style, { left: want ? '' : '324px', top: '192px' });
    const modal = root.querySelector(':scope > [data-figma^="모달"]');
    const dim = modal && modal.previousElementSibling && modal.previousElementSibling.dataset.figma === 'scene dim' ? modal.previousElementSibling : modal;
    if (dim) dim.before(el); else root.appendChild(el);
    if (want) panel = el; else pill = el;
  }
  if (!carry) return;
  const isOpen = !!panel && panel.style.visibility !== 'hidden';
  if (carry.open && !isOpen) {
    if (!panel) {
      panel = await cloneOf(28, PANEL);
      if (!panel || !root.isConnected) return;
      panel.dataset.qs28 = '1';
      if (fix) fix(panel);
      dress(panel);
      panel.style.top = (pill ? baseTop(pill) : 192) + 'px';
      if (pill) pill.before(panel); else root.appendChild(panel);
    }
    follow(panel, pill);
    show(panel);
    if (pill) hide(pill);
  } else if (!carry.open && isOpen) {
    if (!pill) {
      pill = await cloneOf(g === 'C' ? 46 : 29, PILL);
      if (!pill || !root.isConnected) return;
      pill.style.top = baseTop(panel) + 'px';
      panel.before(pill);
    }
    follow(pill, panel);
    show(pill);
    hide(panel);
  }
}
