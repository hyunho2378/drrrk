// 화면 위에서 실제로 움직이는 것들. 피그마 생성물(src/figma)은 고치지 않고, 그려진 화면의 요소를 이름(data-figma)으로 찾아 덧붙인다.
// 1) 상태바 시계: 왼쪽 시간을 실제 시각으로(강릉페이 리뉴얼과 같은 방식, 오른쪽 아이콘은 그대로).
// 2) 방 시계: 해 뜨기까지 남은 시간을 tokens.js live.timeScale 빠르기로 줄이고, 01:12(해 뜨는 단계)과 0에서 다음 화면으로 넘긴다.
// 3) 채팅: 방에 처음 들어가면 대화가 하나씩 올라온다.
// 4) 입력: 채팅과 댓글을 실제로 쓰고 보내면 화면에 붙는다.
// 5) 고민 분석: 원이 0부터 차고 단계가 하나씩 체크된다.
import { watchStart } from './liveV2.js';
import { motion, live as LIVE } from '../tokens.js';
import { patchLiveV2, patchWatchSeats } from './liveV2.js';
import { startWatchChat, prepareWatchChat } from './watchChat.js';
import { handOff, handoffNow, takeRoomStart, stepReady } from './roomClockHandoff.js';
import { q, rootOf, scaleOf, relRect, setText } from './dom.js';
import { attachRoom } from './room.js';
import { attachThrow } from './throw.js';
import { voiceOnBubble, voiceOnScreen } from './roomVoice.js';
import { roomChatPrepare, roomChatAttach, roomChatLeave } from './roomChat.js';
import { attachQuickSlot } from './quickSlot.js';
import { attachTaps } from './taps.js';
import { prepGauge, animateGauge, fillItem, pickItem, itemFrom } from './my.js';
import { prepLoveDot, attachLoveDot } from './loveDots.js';
import { warm, cloneOf } from './donor.js';
import { applySync } from './sync.js';
import { patchCommunity } from './community.js';
import { patchMyChair, mineRel, fixedRel, commitDraft, openStudio } from './chairs.js';
import { attachPost } from './post.js';
import { attachSort } from './sort.js';
import { fixWraps } from './wrapFix.js';
import { patchSolo } from './solo.js';
import { swapScene, patchRoom2 } from './scene.js';
import { applyAvatars } from './avatars.js';
import { patchReportStory } from './reportPatch.js';
import { prepReportMotion, attachReportMotion, endFloor } from './reportMotion.js';
import { prefetchSunrise, prepareSunrise, attachSunrise, sunriseHolding } from './sunriseVideo.js';
import { prepareRoomEnter, attachRoomEnter } from './roomEnterVideo.js';
import { prepareNormalPager, attachNormalPager } from './normalPager.js';
import { attachDictation } from './dictation.js';

export { setText };

// 방마다 묶은 화면. W는 라운지에서 구경하는 방(시계만 흐르고 화면은 넘기지 않는다).
// 해 뜨는 단계(40)는 함께 드르륵 방(B)에 둔다. 그래서 29에서 40으로 넘어가도 같은 방 시계가 이어진다(11/10 해뜨기 영상).
export const ROOMS = { A: [9, 5, 6, 7, 8, 22, 23], B: [29, 28, 30, 31, 32, 33, 35, 40], C: [46, 43, 41, 42], W: [37] };
export const sceneOf = (n) => Object.keys(ROOMS).find((k) => ROOMS[k].includes(n)) || null;

const hashN = () => Number((/\/s\/(\d+)/.exec(window.location.hash) || [])[1]);

// 누른 자리가 가는 곳을 정한다. 아이템 상세를 닫으면 눌렀던 화면으로 돌아가고, 아이템을 누르면 어떤 아이템인지 적어 둔다.
export function resolveTo(l) {
  // 네이버 클립에서 드르륵으로 들어가는 길: 스플래시를 띄우고 화면은 바로 바꾼다(스플래시가 덮고 있는 동안 홈이 그려진다).
  if (l.t === 'enter') {
    window.dispatchEvent(new Event('drrrk:splash'));
    return Object.assign({}, l, { t: 'none' });
  }
  // 의자 꾸미기: 열 때 보여 줄 의자(새로 얻은 의자 또는 지금 의자)와 확정을 링크의 act로 정한다.
  if (l.act === 'commit' && !commitDraft()) {
    window.dispatchEvent(new Event('drrrk:chair-locked'));
    return null;
  }
  // 방에 어디서 들어왔는지 적어 둔다. 라이브 방 구경에서 앉아 들어온 방은 나가면 라이브 목록으로 돌아간다(11/10 수정사항: 라이브 흐름).
  if (l.to === 29 && (l.from === 37 || l.from === 27 || l.from === 42)) {
    try { sessionStorage.setItem('drrrk-room-from', l.from === 37 ? 'live' : 'home'); } catch (e) { /* 기본값 home */ }
    // 방 구경에서 앉는 순간의 시계 값을 방 시계로 넘긴다(roomClockHandoff.js).
    if (l.from === 37 && room.scene === 'W') handOff(remaining());
  }
  if (l.t === 'back' && l.to === 25 && [28, 29, 30, 31, 32, 40].includes(l.from)) {
    let origin = 'home';
    try { origin = sessionStorage.getItem('drrrk-room-from') || 'home'; } catch (e) { /* 기본값 home */ }
    if (origin === 'live') return Object.assign({}, l, { to: 10 });
  }
  if (l.to === 20) openStudio(l.act === 'fresh');
  // 활동 알림(57)의 의자 꾸미기 알림으로 연 의자 꾸미기는 뒤로와 저장하기 모두 알림으로 돌아간다(iOS router.pop과 같다. NotiScreens.jsx).
  if (l.to === 20) { try { sessionStorage.setItem('drrrk-studio-from', l.from === 57 ? 'noti' : 'my'); } catch (e) { /* 기본값 마이 */ } }
  if (l.from === 20 && l.to === 36 && l.t === 'back') { let o = 'my'; try { o = sessionStorage.getItem('drrrk-studio-from') || 'my'; } catch (e) { /* 기본값 마이 */ } if (o === 'noti') return Object.assign({}, l, { to: 57 }); }
  if (l.item) pickItem(l.item, l.from);
  if (l.to === 'item-from') return Object.assign({}, l, { to: itemFrom() });
  return l;
}

// 피그마에서 윤곽 글자를 못 받은 칸(화면 밖에 걸친 카드 등)은 덮개가 비어 글자가 안 보인다. 그런 칸은 실제 글자를 보이게 한다.
// 피그마에서 일부러 숨긴 글자(opacity 0)는 그대로 둔다.
function showEmptyOutlines(root) {
  q(root, 'p[data-outline]').forEach((p) => {
    const ov = p.querySelector(':scope > span[aria-hidden]');
    if (!ov || ov.innerHTML.trim() || !p.textContent.trim()) return;
    p.style.webkitTextFillColor = 'currentColor';
  });
}

// ---------- 1) 상태바 시계 ----------
// 24시간제(23:50). iOS 상태바와 같은 두 자리 시.
const fmtClock = (d) => String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
function applyClock(root) {
  q(root, '[data-figma="9:41"]').forEach((el) => {
    if (el.dataset.live) return;
    el.dataset.live = 'clock';
    el.innerHTML = '';
    const s = document.createElement('span');
    s.className = 'live-clock';
    Object.assign(s.style, LIVE.clockStyle);
    s.textContent = fmtClock(new Date());
    el.appendChild(s);
  });
}
export function mountClock(el) {
  applyClock(el);
  tickClock();
}
function tickClock() {
  const t = fmtClock(new Date());
  document.querySelectorAll('.live-clock').forEach((s) => {
    if (s.textContent !== t) s.textContent = t;
  });
}

// ---------- 2) 방 시계 ----------
const room = { scene: null, kind: null, left: 0, at: 0, chatDone: false, fired: {} };
// 시계 종류: 기다리는 시간(혼자 드르륵 처음 화면)과 해 뜨기까지 남은 시간은 따로 센다.
const timerKind = (root) => (root.querySelector('[data-figma*="기다리는 중"]') ? 'wait' : 'sun');
const parseMMSS = (s) => {
  const m = /(\d{1,2}):(\d{2})/.exec(s || '');
  return m ? +m[1] * 60 + +m[2] : null;
};
const fmtMMSS = (sec) => {
  const v = Math.max(0, Math.ceil(sec));
  return String(Math.floor(v / 60)).padStart(2, '0') + ':' + String(v % 60).padStart(2, '0');
};
const timerTexts = (root) => q(root, '[data-figma^="Timer Pill"] [data-figma="time"], [data-figma^="Timer Badge"] p[data-outline], [data-figma^="해 뜨기까지"] [data-figma="time"]').filter((p) => /\d:\d\d/.test(p.textContent));
const remaining = () => room.left - ((performance.now() - room.at) / 1000) * LIVE.timeScale;

// ---------- 3) 채팅이 하나씩 ----------
const CHAT_SEL = '[data-figma^="row ·"], [data-figma^="내 채팅"], [data-figma^="Chat Bubble"]';
// 방 구경(37) 채팅 칸 줄은 watchChat.js가 맡으니 뺀다. 입력줄 안 글도 뺀다.
const chatItems = (root) => {
  const items = q(root, CHAT_SEL).filter((el) => !el.closest('[data-figma^="input"]') && !el.closest('[data-figma="댓글 (라이브 채팅)"]'));
  return items.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
};
// 줄을 언제 보일지는 roomChat.js가 정한다(0.8초 뒤 첫 줄, 1.3초에서 2.0초 간격, 덮개가 떠 있으면 멈춤, 같은 방 안에서는 이어짐).
function staggerChat(root, n, fresh) {
  roomChatAttach(root, n, chatItems(root), fresh, (el) => voiceOnBubble(el, root));
}

// ---------- 4) 입력 ----------
function postRoomChat(root, text) {
  const mine = q(root, '[data-figma^="내 채팅"], [data-figma^="Chat Bubble · 나"]').filter((el) => el.style.display !== 'none');
  const tpl = mine.sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];
  if (!tpl) return;
  const r = relRect(root, tpl);
  const node = tpl.cloneNode(true);
  node.removeAttribute('data-node');
  const p = node.querySelector('p[data-outline]');
  setText(p, text);
  if (p) Object.assign(p.style, { width: 'auto', maxWidth: LIVE.bubbleMax + 'px', whiteSpace: 'pre-wrap', wordBreak: 'keep-all' });
  Object.assign(node.style, { width: 'auto', height: 'auto', left: 'auto', right: LIVE.screenW - (r.x + r.w) + 'px', top: r.y + r.h + 'px', opacity: '' });
  tpl.parentElement.appendChild(node);
  const h = node.getBoundingClientRect().height / scaleOf(root);
  const shift = h + LIVE.chatSpacing;
  node.style.top = r.y + r.h - h + 'px';
  q(root, CHAT_SEL).filter((el) => el !== node && !el.closest('[data-figma^="input"]')).forEach((el) => {
    const cur = parseFloat(el.dataset.shift || '0') + shift;
    el.dataset.shift = String(cur);
    const top = relRect(root, el).y;
    el.animate([{ transform: 'translateY(' + -(cur - shift) + 'px)' }, { transform: 'translateY(' + -cur + 'px)' }], { duration: motion.stateIn + 100, easing: motion.standard, fill: 'forwards' });
    if (top - shift < LIVE.chatTop) el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: motion.stateIn, fill: 'forwards' });
  });
  node.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: motion.stateIn + 100, easing: motion.emphasizedDecel });
}

function postLiveComment(root, text) {
  const box = root.querySelector('[data-figma="댓글 (라이브 채팅)"]');
  const tpl = box && box.querySelector('[data-figma="내 댓글"]');
  if (!tpl) return;
  const node = tpl.cloneNode(true);
  node.removeAttribute('data-node');
  // 처음 뜨는 방 구경 채팅 칸은 비어 있고 피그마 줄은 틀로만 숨겨 둔다(watchChat.js). 틀을 복제한 내 댓글은 보이게 한다.
  node.style.display = '';
  delete node.dataset.watchTpl;
  node.dataset.watchRow = '1';
  setText(node.querySelector('p[data-outline]'), text);
  q(node, '[data-figma="bubble"], p[data-outline]').forEach((el) => Object.assign(el.style, { width: 'auto' }));
  Object.assign(box.style, { justifyContent: 'flex-end', overflow: 'hidden' });
  box.appendChild(node);
  node.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: motion.stateIn + 100, easing: motion.emphasizedDecel });
}

function postPostComment(root, text) {
  const items = q(root, '[data-figma="Community / Comment Item"]');
  const tpl = items[0];
  if (!tpl) return;
  const node = tpl.cloneNode(true);
  node.removeAttribute('data-node');
  const ps = q(node, 'p[data-outline]');
  const body = ps.slice().sort((a, b) => b.textContent.length - a.textContent.length)[0];
  ps.forEach((p, i) => {
    if (p === body) setText(p, text);
    else if (i === 0) setText(p, LIVE.myName);
    else if (/전|방금/.test(p.textContent)) setText(p, LIVE.justNow);
    else return;
    // 글이 짧아지면 피그마 고정 폭 때문에 옆 글자와 벌어진다. 바꾼 글자만 내용 폭으로 줄인다.
    if (p !== body) Object.assign(p.style, { width: 'auto', flex: '0 0 auto' });
  });
  if (body) Object.assign(body.style, { whiteSpace: 'pre-wrap', wordBreak: 'keep-all', height: 'auto' });
  tpl.parentElement.insertBefore(node, tpl);
  node.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: motion.stateIn + 100, easing: motion.emphasizedDecel });
  q(root, 'p[data-outline]').filter((p) => /^댓글 \d+$/.test(p.textContent.trim())).forEach((p) => setText(p, '댓글 ' + (parseInt(p.textContent.replace(/\D/g, ''), 10) + 1)));
}

function attachInputs(root, n, go) {
  q(root, '[data-figma="채팅 입력"]').forEach((field) => {
    if (field.dataset.live) return;
    // 진짜 입력칸만 살린다. 안내 글 한 줄(placeholder)만 있어야 하고, 그 자리가 다른 것(시트, 덮개, 누르는 자리)에 가려지지 않아야 한다.
    const ps = q(field, 'p[data-outline]');
    if (ps.length !== 1 || !LIVE.inputHint.test(ps[0].textContent)) return;
    const fb = field.getBoundingClientRect();
    const hit = document.elementFromPoint(fb.left + fb.width / 2, fb.top + fb.height / 2);
    if (hit && !field.contains(hit) && fb.top >= 0 && fb.bottom <= window.innerHeight) return;
    field.dataset.live = 'input';
    const ph = ps[0];
    const cs = ph ? getComputedStyle(ph) : null;
    const input = document.createElement('input');
    input.type = 'text';
    input.enterKeyHint = 'send';
    input.setAttribute('aria-label', ph ? ph.textContent.trim() : '입력');
    input.className = 'live-input';
    Object.assign(input.style, LIVE.inputStyle, cs ? { fontFamily: cs.fontFamily, fontSize: cs.fontSize, letterSpacing: cs.letterSpacing } : {});
    if (getComputedStyle(field).position === 'static') field.style.position = 'relative';
    field.appendChild(input);
    input.addEventListener('input', () => { if (ph) ph.style.opacity = input.value ? '0' : ''; });
    const send = () => {
      const v = input.value.trim();
      if (!v) return;
      input.value = '';
      if (ph) ph.style.opacity = '';
      if (root.querySelector('[data-figma="Community / Comment Item"]')) postPostComment(root, v);
      else if (root.querySelector('[data-figma="댓글 (라이브 채팅)"]')) postLiveComment(root, v);
      else postRoomChat(root, v);
      const next = LIVE.afterSend[n];
      if (next) window.setTimeout(() => go({ to: next, t: 'fade' }), LIVE.afterSendMs);
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); send(); } });
    // 받아쓰기(dictation.js)도 이 보내기를 그대로 쓴다.
    input.__send = send;
    const btn = field.parentElement && field.parentElement.querySelector('[data-figma^="btn_전송"]');
    if (btn) { btn.style.cursor = 'pointer'; btn.addEventListener('click', send); }
  });
}

// 방 온보딩 덮개가 입력칸을 가린 채 화면이 붙으면 입력칸이 만들어지지 않았다. 덮개가 닫힌 뒤 같은 화면이면 입력칸과 받아쓰기를 붙인다.
function lateInputs(layer, root, n, go, inRoom) {
  if (root.__lateInputs || root.querySelector('input.live-input')) return;
  if (!q(root, '[data-figma="채팅 입력"]').length) return;
  const until = performance.now() + 120000;
  root.__lateInputs = window.setInterval(() => {
    const done = () => { window.clearInterval(root.__lateInputs); root.__lateInputs = 0; };
    if (current.layer !== layer || !root.isConnected || performance.now() > until) { done(); return; }
    if (document.querySelector('[data-figma="방 온보딩"]')) return;
    attachInputs(root, n, go);
    if (root.querySelector('input.live-input')) { attachDictation(root, inRoom); done(); }
  }, 400);
}

// ---------- 5) 고민 분석 ----------
function halfRing(side) {
  const R = 100, r = 95;
  const d = side === 'left'
    ? 'M100 0 A100 100 0 0 0 100 200 L100 195 A95 95 0 0 1 100 5 Z'
    : 'M100 0 A100 100 0 0 1 100 200 L100 195 A95 95 0 0 0 100 5 Z';
  return '<svg width="200" height="200" viewBox="0 0 200 200" style="display:block"><path d="' + d + '" fill="' + LIVE.ringColor + '"/></svg>' + (R && r ? '' : '');
}
// 고민 분석은 보이기 전에 0에서 시작하는 모습(initAnalysis)을 만들어 두고, 화면이 자리를 잡은 뒤(playAnalysis) 차오른다.
function initAnalysis(root) {
  const ring = root.querySelector('[data-figma^="ring progress"]');
  if (ring && !ring.dataset.live) {
    ring.dataset.live = 'ring';
    ring.innerHTML = '';
    Object.assign(ring.style, { overflow: 'visible' });
    const mk = (left) => {
      const clip = document.createElement('div');
      Object.assign(clip.style, { position: 'absolute', top: '0', left: left ? '0' : '100px', width: '100px', height: '200px', overflow: 'hidden' });
      const rot = document.createElement('div');
      rot.innerHTML = halfRing(left ? 'right' : 'left');
      Object.assign(rot.style, { position: 'absolute', top: '0', left: left ? '0' : '-100px', width: '200px', height: '200px', transformOrigin: '100px 100px', transform: 'rotate(0deg)' });
      clip.appendChild(rot);
      ring.appendChild(clip);
      return rot;
    };
    ring.__rots = [mk(false), mk(true)];
  }
  // 세 단계는 모두 체크 없이 시작한다. 글자는 첫 단계만 흐리게 보이고, 나머지 단계는 차례가 올 때 하나씩 나타난다. 줄 높이가 변하지 않게 한 줄로 고정한다.
  const list = root.querySelector('[data-figma="progress steps"]');
  if (list) list.style.overflow = 'visible';
  q(root, '[data-figma^="step ·"]').forEach((st) => {
    const icon = st.querySelector('[data-figma="check"], [data-figma="spinner"]');
    const label = st.querySelector('p[data-outline]');
    if (icon) icon.style.opacity = '0';
    st.style.opacity = '1';
  });
  // 체크와 글은 함께 나타난다. 처음에는 세 단계 모두 비어 있다.
  q(root, '[data-figma^="step ·"]').forEach((st) => {
    const label = st.querySelector('p[data-outline]');
    if (label) { label.style.opacity = '0'; Object.assign(label.style, { whiteSpace: 'nowrap', width: 'auto' }); }
  });
}
function playAnalysis(root, ms) {
  const ring = root.querySelector('[data-figma^="ring progress"]');
  if (ring && ring.__rots && !ring.dataset.played) {
    ring.dataset.played = '1';
    const [first, second] = ring.__rots;
    const half = ms / 2;
    first.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], { duration: half, easing: 'linear', fill: 'forwards' });
    second.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], { duration: half, delay: half, easing: 'linear', fill: 'forwards' });
  }
  // 세 단계가 끝나면 모두 맨 위 단계와 같은 밝은 체크가 된다. 돌아가는 아이콘 칸은 비우고 체크 그림만 같은 크기로 넣는다(칸 크기와 자리는 그대로).
  const steps = q(root, '[data-figma^="step ·"]');
  if (root.dataset.analysisPlayed) return;
  root.dataset.analysisPlayed = '1';
  const tpl = steps[0] && steps[0].querySelector('[data-figma="check"]');
  const lab0 = steps[0] && steps[0].querySelector('p[data-outline]');
  const color0 = lab0 ? getComputedStyle(lab0).color : '';
  const slot = ms / (steps.length + 0.4);
  steps.forEach((st, i) => {
    const icon = st.querySelector('[data-figma="check"], [data-figma="spinner"]');
    const label = st.querySelector('p[data-outline]');
    // 단계마다 체크와 글이 같은 때에 함께 나타난다(글만 먼저 뜨지 않는다).
    window.setTimeout(() => {
      if (!root.isConnected) return;
      // 둘째 단계의 어두운 체크와 셋째 단계의 돌아가는 아이콘은 맨 위 단계와 같은 밝은 체크 그림으로 바꾼다.
      if (icon && tpl && i > 0) {
        icon.innerHTML = tpl.innerHTML;
        icon.setAttribute('data-figma', 'check');
      }
      const rise = [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }];
      const opt = { duration: motion.modalIn, easing: motion.emphasizedDecel };
      if (icon) { icon.style.opacity = ''; icon.animate(rise, opt); }
      if (label) {
        if (i > 0 && color0) { label.style.color = color0; setText(label, label.textContent); Object.assign(label.style, { whiteSpace: 'nowrap', width: 'auto' }); }
        label.style.opacity = '';
        label.animate(rise, opt);
      }
    }, (i + 0.6) * slot);
  });
}

// ---------- 6) 끌기: 가로 카드 넘기기와 세로 스크롤 ----------
// 요소마다 가로(카드 넘기기)와 세로(스크롤) 이동값을 따로 들고, transform 하나로 합쳐서 놓는다.
const off = new WeakMap();
function move(el, k, v, ms) {
  const o = off.get(el) || { x: 0, y: 0 };
  o[k] = v;
  off.set(el, o);
  el.style.transition = ms ? 'transform ' + ms + 'ms ' + motion.emphasizedDecel : 'none';
  el.style.transform = o.x || o.y ? 'translate(' + o.x + 'px, ' + o.y + 'px)' : '';
}

// 라운지 맨 위 카드 줄(Carousel / 1, 2). 놓으면 가까운 카드에 맞추고, 아래 점도 그 자리로 옮긴다.
function carouselOf(layer, root) {
  const cards = q(root, ':scope > [data-figma^="Carousel /"]');
  if (cards.length < 2) return null;
  const r0 = relRect(root, cards[0]);
  const stops = cards.map((c) => r0.x - relRect(root, c).x);
  const hot = q(layer, '[data-hotspot]').filter((b) => Math.abs(parseFloat(b.style.top) - r0.y) < 1 && Math.abs(parseFloat(b.style.height) - r0.h) < 1);
  const els = cards.concat(hot);
  const c = { x: 0, base: 0, i: 0, band: [r0.y, r0.y + r0.h] };
  c.drag = (dx) => els.forEach((el) => move(el, 'x', Math.max(Math.min(...stops) - 40, Math.min(40, c.base + dx)), 0));
  c.go = (j) => {
    j = Math.max(0, Math.min(stops.length - 1, j));
    c.i = j;
    c.x = c.base = stops[j];
    els.forEach((el) => move(el, 'x', c.x, motion.stateIn + 150));
    const dots = root.querySelector('[data-figma="Page Dots"]');
    const act = dots && dots.querySelector(':scope > [data-figma="Dot / active"]');
    if (act) {
      // 점은 절대 위치로 놓여 있다. 왼쪽부터 폭과 사이 간격(피그마 값)을 더해 다시 놓는다.
      const rest = [...dots.children].filter((d) => d !== act).sort((p, p2) => parseFloat(getComputedStyle(p).left) - parseFloat(getComputedStyle(p2).left));
      let left = 0;
      rest.slice(0, j).concat([act], rest.slice(j)).forEach((d) => {
        d.style.left = left + 'px';
        left += d.getBoundingClientRect().width / scaleOf(root) + LIVE.dotGap;
      });
    }
  };
  c.step = (dir) => c.go(c.i + dir);
  c.end = (dx) => {
    const want = c.base + dx;
    const near = stops.reduce((bi, s, k) => (Math.abs(s - want) < Math.abs(stops[bi] - want) ? k : bi), 0);
    const dir = dx < -LIVE.swipeMin ? 1 : dx > LIVE.swipeMin ? -1 : 0;
    c.go(dir ? c.i + dir : near);
  };
  return c;
}

// 라이브와 커뮤니티 목록은 탭바 밑에 가려진 내용이 있다. 위아래로 끌거나 휠을 굴리면 머리말 아래부터 탭바 위까지가 움직인다.
function scrollerOf(layer, root, n) {
  // 휴대폰에서 바닥 요소를 창 바닥에 붙인 화면(mobileFit.js)도 가려진 내용을 스크롤로 본다.
  const fit = root.__fit;
  const generic = !!(fit && fit.rest > 0 && !fit.native);
  if (!LIVE.scrollScreens.includes(n) && !generic) return null;
  const nav = root.querySelector(':scope > [data-figma="bottom_navigation"]');
  const named = (LIVE.pinNames[n] || []).map((nm) => root.querySelector(':scope > [data-figma="' + nm + '"]')).filter(Boolean);
  const pins = [...(fit && fit.pinned.size ? [...fit.pinned] : nav ? [nav] : []), ...named];
  // 종료(1)는 바닥 요소가 없고, 휴대폰에서는 뿌리 칸이 보이는 창 바닥까지 늘어난다(mobileFit.js). 그 바닥까지 움직인다.
  const floor = n === 1 ? endFloor(root) : LIVE.screenH;
  const bottom = pins.length ? Math.min(...pins.map((p) => relRect(root, p).y)) : floor;
  const box = root.querySelector(':scope > [data-figma="Scroll"]');
  let items, top;
  if (box) {
    // 커뮤니티: 피그마의 Scroll 칸 안이 통째로 움직인다. 안쪽 Feed가 자기 칸에서 잘리지 않게 풀고, 바깥 Scroll 칸이 자른다.
    top = relRect(root, box).y;
    items = [...box.children];
    q(box, '[data-figma="Feed"]').forEach((f) => (f.style.overflow = 'visible'));
  } else {
    top = LIVE.scrollTop;
    items = [...root.children].filter((c) => !pins.includes(c) && c !== nav && relRect(root, c).y >= top - 0.5);
  }
  let end = 0;
  items.forEach((el) => {
    const r = relRect(root, el);
    end = Math.max(end, r.y + r.h);
    q(el, '*').forEach((d) => {
      const rr = relRect(root, d);
      if (rr.h > 0) end = Math.max(end, rr.y + rr.h);
    });
  });
  const max = Math.max(0, end + (LIVE.scrollPadBy[n] ?? LIVE.scrollPad) - bottom);
  if (!max) return null;
  const hot = q(layer, '[data-hotspot]').filter((b) => {
    const t = parseFloat(b.style.top);
    // 종료(1)의 아래 버튼(y1590, 1640)은 창 아래(844 넘어)에 있다가 스크롤로 올라온다. 누르는 자리도 같이 움직인다.
    const below = n === 1 && t >= LIVE.screenH;
    return ((t >= top - 0.5 && t < bottom) || below) && b.getAttribute('aria-label') !== '탭바' && !b.dataset.fitPinned;
  });
  const clipNeeded = !box;
  const y0 = new Map(items.map((el) => [el, relRect(root, el).y]));
  const h0 = new Map(items.map((el) => [el, relRect(root, el).h]));
  const s = { y: 0, base: 0, max, top, bottom };
  const place = (ms) => {
    items.forEach((el) => {
      move(el, 'y', -s.y, ms);
      if (clipNeeded) {
        // 머리말 아래로 올라간 부분은 잘라서 머리말 글자와 겹치지 않게 한다.
        // 머리말 아래로 올라간 부분과 바닥 요소(탭바, 입력창) 윗선 아래로 내려간 부분은 잘라서 비치지 않게 한다.
        const yy = y0.get(el) - s.y;
        const cut = Math.max(0, top - yy);
        const cutB = Math.max(0, yy + h0.get(el) - bottom);
        el.style.clipPath = cut || cutB ? 'inset(' + cut + 'px -400px ' + cutB + 'px -400px)' : '';
        if (ms) el.style.transition += ', clip-path ' + ms + 'ms ' + motion.emphasizedDecel;
      }
    });
    hot.forEach((b) => {
      move(b, 'y', -s.y, ms);
      const t = parseFloat(b.style.top) - s.y, h = parseFloat(b.style.height);
      b.style.visibility = t + h <= top || t >= bottom ? 'hidden' : '';
    });
  };
  s.drag = (dy) => {
    const v = s.base - dy;
    s.y = v < 0 ? v / 3 : v > max ? max + (v - max) / 3 : v;
    place(0);
  };
  s.end = () => {
    s.y = s.base = Math.max(0, Math.min(max, s.y));
    place(motion.stateIn + 150);
  };
  s.wheel = (dy) => {
    s.y = s.base = Math.max(0, Math.min(max, s.y + dy));
    place(0);
  };
  s.inRegion = (y) => y >= top && y <= bottom;
  // 카드가 자리를 바꾼 뒤(정렬) 새 자리를 다시 잰다.
  s.remeasure = () => {
    items.forEach((el) => y0.set(el, relRect(root, el).y + s.y));
    place(0);
  };
  root.__scroller = s;
  // 라이브 댓글 화면은 입력창 바로 위 댓글이 보이도록 맨 아래에서 시작한다.
  if (generic && fit.input) s.y = s.base = max;
  place(0);
  return s;
}

// MY 편의점 선반(가로 스크롤). 끌면 선반과 그 위의 누르는 자리가 같이 움직인다.
function shelfOf(layer, root) {
  const content = root.querySelector('[data-figma="shelf content"]');
  if (!content) return null;
  const r = relRect(root, content);
  const hot = q(layer, '[data-hotspot]').filter((b) => (b.getAttribute('aria-label') || '').startsWith('아이템 '));
  const min = -(r.w - LIVE.screenW);
  const els = [content, ...hot];
  const s = { x: 0, base: 0, band: [r.y, r.y + r.h + 20] };
  s.drag = (dx) => {
    const v = s.base + dx;
    s.x = v > 0 ? v / 3 : v < min ? min + (v - min) / 3 : v;
    els.forEach((el) => move(el, 'x', s.x, 0));
  };
  s.end = () => {
    s.x = s.base = Math.max(min, Math.min(0, s.x));
    els.forEach((el) => move(el, 'x', s.x, motion.stateIn + 150));
  };
  s.wheel = (dx) => {
    s.x = s.base = Math.max(min, Math.min(0, s.x - dx));
    els.forEach((el) => move(el, 'x', s.x, 0));
  };
  return s;
}

function attachDrag(layer, root, n) {
  if (root.dataset.drag) return;
  root.dataset.drag = '1';
  const car = carouselOf(layer, root);
  const scr = scrollerOf(layer, root, n);
  const sh = shelfOf(layer, root);
  if (!car && !scr && !sh) return;
  const yOf = (e) => (e.clientY - root.getBoundingClientRect().top) / scaleOf(root);
  let g = null, moved = false;
  layer.addEventListener('pointerdown', (e) => {
    g = { x: e.clientX, y: e.clientY, sy: yOf(e), axis: null, id: e.pointerId };
    moved = false;
    if (car) car.base = car.x;
    if (scr) scr.base = scr.y;
    if (sh) sh.base = sh.x;
  });
  layer.addEventListener('pointermove', (e) => {
    if (!g || e.pointerId !== g.id) return;
    const s = scaleOf(root);
    const dx = (e.clientX - g.x) / s, dy = (e.clientY - g.y) / s;
    if (!g.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
      const sy = g.sy + (scr ? scr.y : 0);
      if (Math.abs(dx) > Math.abs(dy) && sh && g.sy >= sh.band[0] && g.sy <= sh.band[1]) g.axis = 'h';
      else if (Math.abs(dx) > Math.abs(dy) && car && sy >= car.band[0] && sy <= car.band[1]) g.axis = 'x';
      else if (Math.abs(dy) >= Math.abs(dx) && scr && scr.inRegion(g.sy)) g.axis = 'y';
      else { g = null; return; }
      moved = true;
      try { layer.setPointerCapture(e.pointerId); } catch (err) { /* 무시 */ }
    }
    if (g.axis === 'x') car.drag(dx);
    else if (g.axis === 'h') sh.drag(dx);
    else scr.drag(dy);
  });
  const up = (e) => {
    if (!g || e.pointerId !== g.id) return;
    const s = scaleOf(root);
    if (g.axis === 'x') car.end((e.clientX - g.x) / s);
    else if (g.axis === 'h') sh.end();
    else if (g.axis === 'y') scr.end();
    g = null;
  };
  layer.addEventListener('pointerup', up);
  layer.addEventListener('pointercancel', up);
  if (scr) layer.style.touchAction = 'none';
  else layer.style.touchAction = 'pan-y';
  // 휠과 트랙패드: 가로로 굴리면(또는 Shift와 함께 굴리면) 카드 줄과 선반이 터치 없이 넘어간다. 세로로 굴리면 목록이 움직인다.
  let acc = 0, armed = true, lastWheel = 0;
  layer.addEventListener('wheel', (e) => {
    const y = yOf(e);
    const sy = y + (scr ? scr.y : 0);
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (dx && ((car && sy >= car.band[0] && sy <= car.band[1]) || (sh && y >= sh.band[0] && y <= sh.band[1]))) {
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 160) { armed = true; acc = 0; }
      lastWheel = now;
      if (car && sy >= car.band[0] && sy <= car.band[1]) {
        acc += dx;
        if (armed && Math.abs(acc) > 24) { armed = false; car.step(acc > 0 ? 1 : -1); }
      } else sh.wheel(dx / scaleOf(root));
      return;
    }
    if (scr && scr.inRegion(y)) {
      e.preventDefault();
      scr.wheel(e.deltaY / scaleOf(root));
    }
  }, { passive: false });
  // 끌어서 움직인 직후의 누름은 화면 이동으로 보지 않는다.
  layer.addEventListener('click', (e) => {
    if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
  }, true);
}

// ---------- 보이기 전에 맞추기 ----------
// 화면은 투명하게 먼저 그려지고 그림이 준비되면 보인다. 피그마 기본 모습이 잠깐 보였다가 바뀌는 깜빡임이 없도록,
// 글자와 그림을 바꾸는 일과 처음 모습(고민 분석 0, 채팅 숨김, 시계, 엉따 막대 0, 가로 카드 위치)은 보이기 전에 끝낸다.
// 의자 그림: 작게 줄여 저장했던 옛 그림은 일러스트 자산 원본에서 만든 그림으로 바꾼다(chairs.js). 큰 자리(170px)는 원본 PNG, 작은 자리는 256px 무손실이다.
// 박스 의자는 없앴다. 박스 그림이 '나'의 자리인 화면(1, 2, 3, 22, 23)은 내가 고른 의자로, 그 밖의 자리는 편의점 의자로 바꾼다.
const IMG = {
  box: '3ce7017af2e5445570968a1ddfceafe220f58ff8.webp',
  sofa: 'eab22a7a4d5070b5801bb3367d4f0342e5726543.webp',
  stool: '51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp',
  recl: 'ef3d01c1807348609019737b6ad41d82875319aa.webp',
  yellow: '68313ae4f5a7ed9ed1fc3186bcbbe79e0d0726ba.webp',
  myOld: 'f76f40b49cba6dd89cb0cf61935be0f11b55cfcc.webp',
};
const MINE_BOX = [1, 2, 3, 22, 23];
const MINE_YELLOW = [1, 32, 33];
// 28, 30, 31은 팀 피그마 최신 장면(라임 의자, 회색 리클라이너, 흰 의자)으로 바꾼다.
export const SCREEN_SWAP = {};
export function swapMap(n) {
  const map = Object.assign({}, SCREEN_SWAP[n] || {});
  map[IMG.sofa] = fixedRel('sofa', 1, n === 19);
  map[IMG.stool] = n === 19 ? mineRel(true) : fixedRel('stool', 1, false);
  map[IMG.recl] = fixedRel('recl', 1, false);
  map[IMG.box] = MINE_BOX.includes(n) ? mineRel(false) : fixedRel('conv', 1, false);
  if (MINE_YELLOW.includes(n)) map[IMG.yellow] = mineRel(false);
  map[IMG.myOld] = mineRel(true);
  // 고민 분석 의자: 생성 코드가 678KB PNG를 가리켜 휴대폰에서 늦게 떴다. 같은 그림의 78KB WebP(미리 받아 둔 그림)로 바꾼다.
  map['df0a1d154446b484e3518dd2e5f901753261b27f.webp'] = 'df0a1d154446b484e3518dd2e5f901753261b27f.webp';
  return map;
}
export function swapAssets(el, n) {
  const map = swapMap(n);
  const keys = Object.keys(map);
  // 새로 뽑은 화면은 그림 주소를 class 안 url(assets/...)로 둔다. 이 주소는 CSS 파일(/assets/) 기준으로 풀려 /assets/assets/... 가 되어
  // 그림이 하나도 안 뜬다(11/09 퀵슬롯 주전부리 빈 원). 같은 그림을 문서 기준 주소로 inline에 옮긴다.
  const base = import.meta.env.BASE_URL || '/';
  el.querySelectorAll('[class*="url("]').forEach((e) => {
    const cls = typeof e.className === 'string' ? e.className : (e.getAttribute('class') || '');
    const m = cls.match(/url\(([^)]+)\)/);
    if (!m) return;
    let v = m[1].replace(/["']/g, '');
    if (/^(https?:|data:|\/)/.test(v)) return;
    // 패치가 이미 정한 inline 그림(새 장면, 썸네일)과 한 번 옮긴 그림은 다시 쓰지 않는다. 다시 쓰면 생성 화면의 기본 그림으로 되돌아간다(11/11).
    if (e.dataset.swapBg || (e.style.backgroundImage && e.style.backgroundImage !== 'none')) return;
    e.dataset.swapBg = '1';
    v = v.replace(/^\.\//, '');
    for (const k of keys) if (v.indexOf(k) >= 0) v = v.split(k).join(map[k]);
    e.style.backgroundImage = 'url("' + base + v + '")';
  });
  el.querySelectorAll('[style]').forEach((e) => {
    const st = e.getAttribute('style') || '';
    if (st.indexOf('url(') < 0) return;
    for (const k of keys) {
      if (st.indexOf(k) >= 0) e.setAttribute('style', st.split(k).join(map[k]));
    }
  });
}

// 목록 카드의 눈 아이콘: 팀 피그마의 현재 아이콘(carbon:view-filled, 16 x 16, #6E767C)이다. 옛 그림은 원본이 지워져 비어 있었다.
const EYE_SVG = '<svg style="display:block" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#6E767C"/><path d="M15.47 7.83C14.8819 6.30882 13.861 4.99331 12.5334 4.04604C11.2058 3.09878 9.62971 2.56129 7.99997 2.5C6.37023 2.56129 4.79416 3.09878 3.46657 4.04604C2.13898 4.99331 1.11805 6.30882 0.52997 7.83C0.490254 7.93985 0.490254 8.06015 0.52997 8.17C1.11805 9.69118 2.13898 11.0067 3.46657 11.954C4.79416 12.9012 6.37023 13.4387 7.99997 13.5C9.62971 13.4387 11.2058 12.9012 12.5334 11.954C13.861 11.0067 14.8819 9.69118 15.47 8.17C15.5097 8.06015 15.5097 7.93985 15.47 7.83ZM7.99997 11.25C7.35718 11.25 6.72883 11.0594 6.19437 10.7023C5.65991 10.3452 5.24335 9.83758 4.99736 9.24372C4.75138 8.64986 4.68702 7.99639 4.81242 7.36596C4.93782 6.73552 5.24735 6.15642 5.70187 5.7019C6.15639 5.24738 6.73549 4.93785 7.36593 4.81245C7.99637 4.68705 8.64983 4.75141 9.24369 4.99739C9.83755 5.24338 10.3451 5.65994 10.7022 6.1944C11.0594 6.72886 11.25 7.35721 11.25 8C11.2486 8.86155 10.9058 9.68743 10.2966 10.2966C9.6874 10.9058 8.86152 11.2487 7.99997 11.25Z" fill="#6E767C"/></svg>';
function fixIcons(root) {
  q(root, '[data-figma="icon/eye"]').forEach((el) => {
    if (el.dataset.fixed) return;
    el.dataset.fixed = '1';
    el.innerHTML = EYE_SVG;
    Object.assign(el.style, { width: '16px', height: '16px' });
    const meta = el.closest('[data-figma="meta"]');
    if (meta) Object.assign(meta.style, { width: 'auto' });
  });
}

// 라운지 카테고리 화면(48 친구)은 전체 화면 틀에서 선택된 탭과 카드 내용을 바꾼다.
function patchLounge(root, n) {
  const spec = LIVE.lounge && LIVE.lounge[n];
  if (!spec || root.dataset.lounge) return;
  root.dataset.lounge = '1';
  q(root, '[data-figma^="Tab / "]').forEach((p) => {
    const on = p.getAttribute('data-figma') === 'Tab / ' + spec.tab;
    setText(p, p.textContent.trim());
    Object.assign(p.style, { color: on ? '#F8F8F8' : '#9AA1A6', fontWeight: on ? '700' : '500' });
    if (on) {
      const ul = root.querySelector('[data-figma="Tab Underline"]');
      if (ul) Object.assign(ul.style, { left: parseFloat(getComputedStyle(p).left) + 'px' });
    }
  });
  [1, 2, 3].forEach((i) => {
    const card = root.querySelector('[data-figma="List Card / ' + i + '"]');
    const c = spec.cards[i - 1];
    if (!card || !c) return;
    const title = card.querySelector('[data-figma="List Title"]');
    if (title) { setText(title, c[0]); Object.assign(title.style, { height: 'auto', width: '214px' }); }
    const who = [...card.querySelectorAll('p')].find((p) => /이야기 중/.test(p.textContent));
    if (who) { setText(who, c[1]); Object.assign(who.style, { width: 'auto' }); }
    const view = card.querySelector('[data-figma="보는 중"] p');
    if (view) { setText(view, c[2]); Object.assign(view.style, { width: 'auto' }); }
    const time = card.querySelector('[data-figma^="Timer Badge"] [data-figma="time"]');
    if (time) setText(time, c[3]);
  });
}

// 옛 장면(28, 30, 31)에서 팀 피그마가 옮긴 이름표 묶음 위치를 맞추던 자리. 11. 9. 새 방 장면으로 바뀌어 scene.js patchRoom2가 새 값(묶음 17, 306, 358 x 84)으로 맞춘다.
const SCENE_FIX = [];
function patchScene(root, n) {
  if (!SCENE_FIX.includes(n) || root.dataset.sceneFix) return;
  root.dataset.sceneFix = '1';
  const g = root.querySelector(':scope > [data-figma="Group 2147229349"]');
  if (g) {
    g.style.top = '288px';
    g.style.height = '115px';
    [...g.children].forEach((k) => {
      const top = parseFloat(getComputedStyle(k).top);
      if (!Number.isNaN(top)) k.style.top = top + 25 + 'px';
    });
  }
}

// 해 뜬 순간(35)의 시계 알약: 팀 피그마의 해 뜸 변형(바탕 #FFC24D 18%, 해 모양 아이콘)이다. 옛 생성 화면은 아이콘 그림이 비어 있었다.
const SUN_SVG = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="display:block" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="2.33" stroke="#FFC24D" stroke-width="1.8"/><path d="M7 1.2V2.6M7 11.4V12.8M1.2 7H2.6M11.4 7H12.8M3.9 3.9L2.9 2.9M10.1 3.9L11.1 2.9M3.9 10.1L2.9 11.1M10.1 10.1L11.1 11.1" stroke="#FFC24D" stroke-width="1.7" stroke-linecap="round"/></svg>';
function patchPill(root, n) {
  if (n !== 35 || root.dataset.pill) return;
  root.dataset.pill = '1';
  const pill = root.querySelector('[data-figma="Timer Pill"]');
  if (!pill) return;
  Object.assign(pill.style, { background: 'rgba(255, 194, 77, 0.18)', width: 'auto', padding: '0 14px 0 12px', gap: '6px' });
  const icon = pill.querySelector('[data-figma="timer"]');
  if (icon) {
    icon.innerHTML = SUN_SVG;
    Object.assign(icon.style, { width: '14px', height: '14px', overflow: 'visible' });
  }
}

// 아침(2)과 오늘 나눈 대화(3): 스크롤하면 내용이 머리말(상태바, 뒤로 가기) 밑으로 올라가 글자와 겹쳤고, 맨 끝 내용은 아래 버튼 띠에 가렸다.
// 머리말 높이만큼 바탕색 띠를 두고, 맨 끝에는 버튼 띠 높이만큼 여백을 더한다.
function patchReport(root, n) {
  if ((n !== 2 && n !== 3) || root.dataset.report) return;
  const scroll = root.querySelector(':scope > [data-scroll]');
  if (!scroll) return;
  root.dataset.report = '1';
  const bg = getComputedStyle(root).backgroundColor || '#121415';
  const mask = document.createElement('div');
  mask.setAttribute('aria-hidden', 'true');
  Object.assign(mask.style, { position: 'absolute', left: '0px', top: '0px', width: '390px', height: '112px', pointerEvents: 'none', background: 'linear-gradient(to bottom, ' + bg + ' 0, ' + bg + ' 98px, transparent 112px)' });
  scroll.after(mask);
  const content = scroll.querySelector(':scope > [data-scroll-content]') || scroll;
  const pad = document.createElement('div');
  pad.setAttribute('aria-hidden', 'true');
  // 내용 칸은 높이가 고정이고 안쪽이 모두 절대 위치라서, 여백은 내용 맨 아래(칸 높이 자리)에 절대 위치로 둔다.
  Object.assign(pad.style, { position: 'absolute', left: '0px', top: parseFloat(getComputedStyle(content).height) + 'px', width: '1px', height: (n === 3 ? 0 : 204) + 'px' });
  // 3번(W-END2, 11. 10.): 내용 칸 1256 안에서 마지막 줄(의자 이름 끝 y1016)이 맨 아래 스크롤(412)에서 604에 서서 버튼(726)보다 위라 여백을 더하지 않는다. 2번은 그대로 204.
  content.appendChild(pad);
  // 아래 버튼 띠(함께 드르륵 앉기, 새 방 만들기)는 피그마에서 화면 바닥에 고정이다. 생성 화면에서는 스크롤 칸 안에 들어 있어 내용과 같이 올라가 겹쳤다. 칸 밖으로 옮겨 바닥에 고정한다.
  const cta = [...content.children].find((c) => c !== pad && c.getAttribute('data-figma') !== 'Report' && /함께 드르륵 앉기/.test(c.textContent) && c.textContent.length < 60);
  if (cta) {
    const rr = relRect(root, cta);
    root.appendChild(cta);
    Object.assign(cta.style, { position: 'absolute', left: rr.x + 'px', top: rr.y + 'px' });
  }
  // 아래 버튼 막대(huisu 1647:27027 "이 하단 바가 계속 따라오게", 11. 11.): 막대는 이미 창 바닥(y726)에 고정이다.
  // 막대 뒤로 지나가는 글이 버튼 윗선에서 잘려 보이지 않게 막대 바로 위에 바탕색에서 투명으로 가는 24px 띠를 둔다.
  // 띠는 막대의 첫 자식으로 넣어 휴대폰 맞춤(mobileFit.js)에서 막대가 옮겨져도 같이 따라간다.
  // 막대 윗선 아래는 피그마 검은 그라데이션(Rectangle 1954141374, y632 높이 212, 73.24%에서 검정)이 빈 바탕 위에 그리는 색을 그대로 이어 칠한다.
  // 띠 아래로 내용이 비쳐 경계선처럼 보이는 일을 막고, 내용이 없을 때의 모습은 피그마와 같다.
  // 띠는 버튼 글자 밑에 깔리도록 막대를 따로 쌓고(isolation) 띠를 그 안 맨 아래(z -1)에 둔다.
  const bar = root.querySelector(':scope > [data-figma="Frame 2147249293"]');
  const scrim = root.querySelector(':scope > [data-figma="Rectangle 1954141374"]');
  if (bar && scrim && !bar.querySelector(':scope > [data-report-band]')) {
    const band = document.createElement('div');
    band.setAttribute('aria-hidden', 'true');
    band.setAttribute('data-report-band', '');
    const br = relRect(root, bar), sr = relRect(root, scrim);
    const blackAt = sr.y + sr.h * 0.7324;
    const a = Math.max(0, Math.min(1, (br.y - sr.y) / (blackAt - sr.y)));
    const rgb = (bg.match(/\d+/g) || [18, 20, 21]).slice(0, 3).map((v) => Math.round(v * (1 - a)));
    const below = sr.y + sr.h - br.y;
    const B = LIVE.reportBand;
    const grad = 'linear-gradient(to bottom, transparent 0px, rgb(' + rgb.join(', ') + ') ' + B + 'px, #000 ' + (B + Math.max(0, blackAt - br.y)) + 'px, #000 ' + (B + below) + 'px)';
    Object.assign(band.style, { position: 'absolute', left: -br.x + 'px', top: -B + 'px', width: LIVE.screenW + 'px', height: B + below + 'px', pointerEvents: 'none', background: grad });
    band.style.zIndex = '-1';
    Object.assign(bar.style, { overflow: 'visible', isolation: 'isolate' });
    bar.prepend(band);
  }
}

// 새 의자 팝업(19) 뒤 화면: 옛 뱃지 시트(불꽃 드륵 등)는 쓰지 않는다. MY 화면(36)의 나의 업적 편의점 시트로 바꾼다.
async function patchSkinPopup(root, n) {
  if (n !== 19 || root.dataset.skin) return;
  root.dataset.skin = '1';
  const old = root.querySelector(':scope > [data-figma="bottom sheet · 뱃지"]');
  if (!old) return;
  const sheet = await cloneOf(36, ':scope > [data-figma="bottom sheet · 나의 편의점"]');
  if (!sheet || !root.isConnected) return;
  old.replaceWith(sheet);
}

function prepareChat(root, n) {
  const sc = sceneOf(n);
  if (!sc) return;
  // 새 방이면 줄을 모두 숨기고, 같은 방의 다음 화면이면 아직 나오지 않은 줄만 숨긴다(roomChat.js).
  roomChatPrepare(chatItems(root), !(room.scene === sc && room.chatDone));
}
function prepareRoomClock(root, n) {
  const sc = sceneOf(n);
  if (!sc) return;
  const same = room.scene === sc && room.kind === timerKind(root);
  const raw = same ? remaining() : n === 37 ? watchStart() : handoffNow(LIVE.roomSeconds);
  const txt = fmtMMSS(n === 40 ? Math.min(raw, LIVE.sunriseAt) : raw);
  timerTexts(root).forEach((p) => { if (p.textContent !== txt) setText(p, txt); });
}

export async function prepare(layer, n, prevN) {
  const root = rootOf(layer);
  if (!root || root.dataset.prepared) return;
  root.dataset.prepared = '1';
  applySync(root);
  fixWraps(root);
  swapScene(root, n);
  patchSolo(root, n);
  applyAvatars(root, n);
  showEmptyOutlines(root);
  patchScene(root, n);
  await patchRoom2(root, n);
  attachRoom(root, n);
  attachThrow(root);
  attachQuickSlot(root, n, (el) => swapAssets(el, 28));
  attachSort(root, n, true);
  // 일반 모드 참여자 칸 두 장 넘기기(normalPager.js): 칸을 넘기는 판으로 옮기고 둘째 장(피그마 "나" 2023:11805) 그림을 보이기 전에 받는다.
  await prepareNormalPager(layer, root, n);
  // 라이브 목록(liveV2.js)을 먼저 깔아야 화면 스크롤(attachDrag)이 새 카드 목록 끝까지 잰다(11/10 전체 탭 스크롤 수정).
  patchLiveV2(root, n);
  attachDrag(layer, root, n);
  prepLoveDot(root, n);
  fixIcons(root);
  patchLounge(root, n);
  patchWatchSeats(root, n);
  prepareWatchChat(root, n);
  if ([19, 36, 53, 54].includes(n)) patchMyChair(root);
  attachPost(root);
  patchPill(root, n);
  patchReport(root, n);
  patchReportStory(root, n);
  prepReportMotion(root, n);
  if (LIVE.myScreens.includes(n) && !LIVE.myScreens.includes(prevN)) { root.dataset.gauge = '1'; prepGauge(root); }
  if (n === LIVE.itemScreen) await fillItem(root);
  await patchSkinPopup(root, n);
  if (n === LIVE.analysisScreen) initAnalysis(root);
  prepareRoomClock(root, n);
  // 방 입장 영상과 해뜨기 영상: 보이기 전에 장면 칸 그림을 영상 첫 장면으로 대체하고 영상 첫 프레임이 준비될 때까지 기다린다(roomEnterVideo.js, sunriseVideo.js).
  await prepareRoomEnter(root, n, sceneOf(n) === 'B' && room.scene !== 'B');
  await prepareSunrise(root, n);
  prepareChat(root, n);
  patchCommunity(root, n);
}

// ---------- 붙이기(전환이 끝난 뒤) ----------
let ticker = 0;
let current = { n: 0, go: null, layer: null };
// 손으로 쓴 화면(온보딩 등)이 화면 이동을 부탁할 때 쓰는 신호. 지금 보이는 화면의 go로 넘긴다.
if (typeof window !== 'undefined' && !window.__drrrkGo) {
  window.__drrrkGo = true;
  window.addEventListener('drrrk:go', (e) => { if (current && current.go && e.detail) current.go(e.detail); });
}

export function attach(layer, n, go, prevN) {
  const root = rootOf(layer);
  if (!root) return;
  current = { n, go, layer };
  // 클립 영상 보기가 다 보이면 에이전트 버튼이 오른쪽에서 튀어나온다(ClipPlayer.jsx).
  if (n === 56) window.dispatchEvent(new Event('drrrk:clip-shown'));
  // prepare가 못 한 경우(예: 준비 중에 오류)를 위해 같은 일을 한 번 더 한다. 모두 두 번 해도 같은 결과가 되도록 만들어져 있다.
  applySync(root);
  showEmptyOutlines(root);
  patchScene(root, n);
  attachRoom(root, n);
  attachThrow(root);
  attachQuickSlot(root, n, (el) => swapAssets(el, 28));
  attachInputs(root, n, go);
  // 말한 내용 받아쓰기: 함께 드르륵과 혼자 방(방 구경 37 제외) 입력줄에 붙는다(dictation.js).
  { const dsc = sceneOf(n); attachDictation(root, !!dsc && dsc !== 'W'); lateInputs(layer, root, n, go, !!dsc && dsc !== 'W'); }
  attachTaps(root, n, go, prevN);
  attachSort(root, n, false);
  patchLiveV2(root, n);
  attachDrag(layer, root, n);
  attachNormalPager(layer, root, n);
  attachLoveDot(root, n);
  attachPost(root);
  fixIcons(root);
  patchLounge(root, n);
  patchWatchSeats(root, n);
  startWatchChat(root, n);
  patchCommunity(root, n);
  if (root.dataset.gauge === '1') { root.dataset.gauge = '2'; animateGauge(root); }
  attachReportMotion(root, n);
  warm(LIVE.warmDonors);
  const sc = sceneOf(n);
  voiceOnScreen(n, sc);
  // 해뜨기 영상: 방(B)과 방 구경(W)에 들어오면 미리 받고, 해 뜨는 단계(40)에서 재생한다. 다른 화면이면 멈추고 뺀다(sunriseVideo.js).
  if (sc === 'B' || sc === 'W') prefetchSunrise();
  attachSunrise(root, n);
  // 방 입장 영상: 새로 들어온 방이면 한 번 재생하고, 같은 방 안 전환이면 이어 가거나 멈춘다(roomEnterVideo.js). room.scene이 바뀌기 전에 부른다.
  attachRoomEnter(root, n, sc === 'B' && room.scene !== 'B');
  if (sc) {
    const kind = timerKind(root);
    if (room.scene !== sc || room.kind !== kind) {
      if (room.scene !== sc) room.chatDone = false;
      room.scene = sc;
      room.kind = kind;
      const start = n === 37 ? { left: watchStart(), at: performance.now() } : takeRoomStart(LIVE.roomSeconds);
      room.left = start.left;
      room.at = start.at;
      room.fired = {};
      room.entered = performance.now();
      room.stepAt = 0;
    }
    // 해 뜨기 1분 전(40)은 피그마처럼 01:12에서 센다. 더 많이 남은 시계로 들어오면 01:12로 맞춘다.
    if (n === 40 && remaining() > LIVE.sunriseAt) {
      room.left = LIVE.sunriseAt;
      room.at = performance.now();
    }
    const freshChat = !room.chatDone;
    room.chatDone = true;
    staggerChat(root, n, freshChat);
  } else { room.scene = null; roomChatLeave(); }
  if (n === LIVE.analysisScreen) { initAnalysis(root); playAnalysis(root, LIVE.analysisMs); }
  if (!ticker) ticker = window.setInterval(tick, 250);
  tick();
}

function tick() {
  tickClock();
  if (!room.scene || !current.layer) return;
  // 화면을 옮기는 중(주소가 이미 다음 화면)이면 이전 방 시계로 화면을 넘기지 않는다.
  if (hashN() !== current.n) return;
  const root = rootOf(current.layer);
  if (!root) return;
  const left = remaining();
  const txt = fmtMMSS(left);
  timerTexts(root).forEach((p) => { if (p.textContent !== txt) setText(p, txt); });
  const rule = room.kind === 'sun' ? LIVE.rooms[room.scene] : null;
  if (!rule || !current.go) return;
  for (const step of rule) {
    // 그 단계의 화면(1분 전 40)에 이미 와 있으면 지나간 것으로 센다. 안 그러면 40에서 일반 모드로 갈 때 0.5초 뒤 40으로 되돌아왔다(11/09 QA).
    if (step.to === current.n) room.fired[step.at] = true;
    // 방에 들어온 직후와 앞 단계 직후 3초는 다음 단계로 넘기지 않는다(이어받은 시계가 이미 짧을 때, roomClockHandoff.js).
    if (left <= step.at && !room.fired[step.at] && step.to !== current.n && !stepReady(room)) break;
    // 해 뜨는 단계(40)에서는 해뜨기 영상이 끝나고 마지막 장면이 머문 뒤에 종료로 넘긴다(sunriseVideo.js).
    if (left <= step.at && !room.fired[step.at] && step.to !== current.n && current.n === 40 && sunriseHolding()) break;
    if (left <= step.at && !room.fired[step.at] && step.to !== current.n) {
      room.fired[step.at] = true;
      room.stepAt = performance.now();
      current.go({ to: step.to, t: 'fade' });
      break;
    }
  }
}
