// 방 안에서 실제로 움직이는 것들. 피그마에서 그린 요소를 다른 화면에서 복제해 와서(donor.js) 화면 이동 없이 덧붙인다.
// 1) 플러스 메뉴(이모지): 어느 방 상태에서나 눌러서 연다. 화면은 바뀌지 않는다.
// 2) 고민 배너: 접힌 배너를 누르면 그 자리에서 부드럽게 펼쳐진다.
// 3) 마이크: 누르면 브라우저가 허용을 묻고, 허용하면 내 목소리를 받아서 말할 때 내 의자가 빛난다.
// 4) 말하는 사람: 일반 모드와 현장 모드에서 여러 명이 돌아가며 말한다.
// 5) 이름: 박스 의자는 없앤다(팀 피드백). 6) 온보딩: DRR, KAK 대신 주전부리 퀵슬롯.
import { motion, live as LIVE } from '../tokens.js';
import { q, relRect, scaleOf, setText, wait } from './dom.js';
import { cloneOf } from './donor.js';
import { bannerSpec, styleBannerLine, styleBannerBody, fitStaticBanners } from './roomConcern.js';

const BAR = '[data-figma="input/속성 14"]';

// ---------- 알림 글 ----------
export function toast(root, text) {
  const bar = root.querySelector(BAR);
  const y = bar ? relRect(root, bar).y : 754;
  const t = document.createElement('div');
  t.setAttribute('role', 'status');
  t.textContent = text;
  Object.assign(t.style, { position: 'absolute', left: '24px', width: '342px', top: y - 62 + 'px', zIndex: '40', boxSizing: 'border-box', padding: '12px 16px', borderRadius: '12px', background: '#222628', color: '#F8F8F8', fontFamily: "'SUIT', system-ui, sans-serif", fontSize: '14px', fontWeight: '600', lineHeight: '20px', textAlign: 'center', letterSpacing: '-0.02em', pointerEvents: 'none', boxShadow: '0 6px 16px 0 rgba(0,0,0,0.32)' });
  root.appendChild(t);
  t.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: motion.stateIn + 100, easing: motion.emphasizedDecel });
  window.setTimeout(() => {
    const a = t.animate([{ opacity: 1 }, { opacity: 0 }], { duration: motion.stateIn, fill: 'forwards' });
    a.onfinish = () => t.remove();
  }, LIVE.toastMs);
}

// ---------- 1) 플러스 메뉴 ----------
// 팀 피그마 이모지 컴포넌트(2096:22600, 프레임 2096:22531): 62 x 230 세로 칸, 모서리 30, 검정 바탕, 1px #222628 선(칸 배치에 1px 포함, 첫 칸 y 525), 여백 6, 칸 간격 8.
// 칸은 48 x 48 원(#222628, 불투명도 0.8), 고른 칸은 불투명도 1과 안쪽 2px #2EE59D 링. 얼굴은 24 x 24 그림(sob, laugh, angry, thinking)을 피그마에서 SVG로 받은 파일이다.
// 생성 화면(1807:23281)의 옛 얼굴과 투명 테두리를 이 값으로 바꾼다. 마지막으로 고른 얼굴이 선택 칸으로 남는다.
const EMOJI_FACE = { '웃김': 'sob', '토닥': 'laugh', '응원': 'angry', '공감': 'thinking' };
let emojiPicked = '';
const faceUrl = (k) => new URL('assets/room2/emo-' + k + '.svg', document.baseURI).href;
function styleEmojiMenu(menu) {
  Object.assign(menu.style, { background: '#000000', border: '1px solid #222628', boxShadow: 'none', borderRadius: '30px', padding: '6px', gap: '8px', width: '62px', height: '230px', boxSizing: 'border-box' });
  q(menu, '[data-figma^="emoji ·"]').forEach((it) => {
    const key = (it.getAttribute('data-figma') || '').replace(/^emoji · /, '');
    const on = key === emojiPicked;
    Object.assign(it.style, { width: '48px', height: '48px', borderRadius: '24px', background: '#222628', border: '0', boxSizing: 'border-box', opacity: on ? '1' : '0.8', boxShadow: on ? 'inset 0 0 0 2px #2EE59D' : 'none' });
    // 생성 화면이 칸 바탕과 링을 따로 그린 그림(span[aria-hidden])은 숨긴다. 바탕과 링은 위 값으로 칸이 직접 그린다.
    q(it, ':scope > span[aria-hidden]').forEach((o) => (o.style.display = 'none'));
    const emo = it.querySelector('[data-figma="Reaction Emoji"]');
    const face = EMOJI_FACE[key];
    if (emo && face && !emo.dataset.face) {
      emo.dataset.face = face;
      emo.innerHTML = '';
      const img = document.createElement('img');
      img.src = faceUrl(face);
      img.alt = '';
      img.draggable = false;
      Object.assign(img.style, { display: 'block', width: '24px', height: '24px' });
      emo.appendChild(img);
    }
  });
}

export function attachEmoji(root) {
  const bar = root.querySelector(BAR);
  const plus = bar && bar.querySelector('[data-figma="btn_더보기"]');
  if (!plus || plus.dataset.live) return;
  plus.dataset.live = 'emoji';
  plus.style.cursor = 'pointer';
  let pop = null, saved = null, busy = false;
  const onDoc = (e) => {
    if (!root.isConnected) { document.removeEventListener('pointerdown', onDoc, true); return; }
    if (pop && !pop.contains(e.target) && !plus.contains(e.target)) close();
  };
  const close = () => {
    if (!pop) return;
    const p = pop;
    pop = null;
    document.removeEventListener('pointerdown', onDoc, true);
    if (saved) {
      plus.className = saved.cls;
      plus.innerHTML = saved.html;
      saved = null;
    }
    const a = p.animate([{ opacity: 1, transform: 'translateY(0) scale(1)' }, { opacity: 0, transform: 'translateY(8px) scale(0.94)' }], { duration: motion.stateOut + 60, easing: motion.emphasizedAccel, fill: 'forwards' });
    a.onfinish = () => p.remove();
  };
  const fly = (item) => {
    const emo = item.querySelector('[data-figma="Reaction Emoji"]');
    if (!emo) return;
    const r = relRect(root, item);
    const f = emo.cloneNode(true);
    Object.assign(f.style, { position: 'absolute', left: r.x + (r.w - 24) / 2 + 'px', top: r.y + (r.h - 24) / 2 + 'px', zIndex: '30', pointerEvents: 'none' });
    root.appendChild(f);
    const a = f.animate([{ opacity: 1, transform: 'translate(0,0) scale(1)' }, { opacity: 1, transform: 'translate(36px,-120px) scale(2)', offset: 0.55 }, { opacity: 0, transform: 'translate(52px,-190px) scale(2.4)' }], { duration: LIVE.emojiFlyMs, easing: motion.emphasizedDecel });
    a.onfinish = () => f.remove();
  };
  const openMenu = async () => {
    if (busy) return;
    busy = true;
    const [menu, x] = await Promise.all([cloneOf(31, '[data-figma="플러스 메뉴 · 이모지"]'), cloneOf(31, '[data-figma="btn_더보기"]', BAR)]);
    busy = false;
    if (!menu || pop || !root.isConnected) return;
    styleEmojiMenu(menu);
    const shift = relRect(root, bar).y - 754;
    menu.style.top = 518 + shift + 'px';
    menu.style.zIndex = '25';
    menu.style.transformOrigin = '30px 100%';
    root.appendChild(menu);
    pop = menu;
    if (x) {
      saved = { cls: plus.className, html: plus.innerHTML };
      plus.className = x.className;
      plus.innerHTML = x.innerHTML;
    }
    // 열리는 속도: 너무 빠르지 않게 420ms, 이모지는 아래부터 60ms 간격으로 올라온다.
    menu.animate([{ opacity: 0, transform: 'translateY(18px) scale(0.86)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 420, easing: motion.emphasizedDecel });
    const items = q(menu, '[data-figma^="emoji ·"]');
    items.forEach((it, i) => {
      it.style.cursor = 'pointer';
      it.animate([{ opacity: 0, transform: 'translateY(14px) scale(0.9)' }, { opacity: Number(it.style.opacity) || 1, transform: 'translateY(0) scale(1)' }], { duration: 340, delay: 80 + (items.length - 1 - i) * 60, easing: motion.emphasizedDecel, fill: 'backwards' });
      it.addEventListener('click', (e) => { e.stopPropagation(); emojiPicked = (it.getAttribute('data-figma') || '').replace(/^emoji · /, ''); styleEmojiMenu(menu); fly(it); close(); });
    });
    document.addEventListener('pointerdown', onDoc, true);
  };
  plus.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pop) close(); else openMenu();
  });
}

// ---------- 2) 고민 배너 ----------
// 배너가 펼쳐진 상태는 퀵슬롯을 열고 닫아 화면이 바뀌어도 이어진다(새 화면에서 바로 펼친 모습으로 시작한다).
let bannerOpen = false;
export function attachBanner(root) {
  const col = root.querySelector('[data-figma="고민 주제 · 최소화 (탭하면 자세히)"]');
  if (!col) { bannerOpen = false; return; }
  const solo = !!root.querySelector('[data-figma="AI 드르륵 의자"]');
  // 접힌 한 줄: 모든 함께 방(새 방, 일반 모드, 옛 방)이 같은 글(roomConcern.js)을 쓴다. 넘치는 글은 생성 화면의 말줄임(text-overflow)으로 줄인다.
  if (!solo) {
    const line = bannerSpec(root.dataset.room2).line;
    const bp = [...col.querySelectorAll(':scope > p')].find((p) => p.textContent.trim() !== '고민');
    if (bp && bp.textContent !== line) { bp.dataset.sync = '1'; setText(bp, line); }
  }
  // 접힌 한 줄 행간 140%(피그마 1884:11512). 함께 방과 혼자 방, 일반 모드, 시트 뒤 화면이 모두 같은 컴포넌트라 모두 맞춘다.
  styleBannerLine([...col.querySelectorAll(':scope > p')].find((p) => p.textContent.trim() !== '고민'));
  if (col.dataset.live) return;
  col.dataset.live = 'banner';
  col.style.cursor = 'pointer';
  let exp = null, busy = false;
  const radius = () => (parseFloat(getComputedStyle(col).borderTopLeftRadius) || 14) + 'px';
  // 배너가 펼쳐지면 그 아래 퀵슬롯(접힌 알약이나 열린 목록)이 펼쳐진 만큼 부드럽게 내려간다.
  const dockEls = () => q(root, ':scope > [data-figma="주전부리 퀵슬롯"], :scope > [data-figma="퀵슬롯 · 접힘"]');
  // 내려가는 거리는 펼친 높이에서 접힌 높이를 뺀 값이다(배너 아래와 퀵슬롯 사이 28 유지). 144 배너는 104(피그마 2096:22269 192에서 296), 153 배너는 113.
  const pushDock = (down, instant, shift) => {
    const dy = down ? (shift || LIVE.dockShift) : 0;
    dockEls().forEach((d) => {
      d.style.transition = instant ? 'none' : 'transform ' + LIVE.bannerMs + 'ms ' + (down ? motion.emphasizedDecel : motion.emphasizedAccel);
      d.style.transform = 'translateY(' + dy + 'px)';
    });
  };
  const collapse = () => {
    if (!exp || busy) return;
    busy = true;
    const e = exp;
    exp = null;
    bannerOpen = false;
    pushDock(false);
    const h = Number(e.dataset.openH) || LIVE.bannerOpenH, c = LIVE.bannerClosedH;
    const a = e.animate([{ clipPath: 'inset(0 0 0 0 round ' + radius() + ')' }, { clipPath: 'inset(0 0 ' + (h - c) + 'px 0 round ' + radius() + ')' }], { duration: LIVE.bannerMs, easing: motion.emphasizedAccel, fill: 'forwards' });
    col.animate([{ opacity: 0 }, { opacity: 1 }], { duration: motion.stateIn, delay: LIVE.bannerMs - 90, fill: 'both' });
    a.onfinish = () => { e.remove(); col.style.opacity = ''; busy = false; };
  };
  const expand = async (instant) => {
    if (exp || busy) return;
    busy = true;
    const e = await cloneOf(43, '[data-figma="고민 주제"]');
    if (!e || !root.isConnected) { busy = false; return; }
    if (!solo) {
      // 함께 방은 모두 이야기의 고민 글(쌍밍아웃 2096:22269, 사진보정 2100:24227)이나 카드별 고민(카드 제목 두 줄과 탭 키워드)을 쓴다.
      // 새 방은 patchRoom2가 적어 둔 이야기(root.dataset.room2)를, 일반 모드와 옛 방은 지금 이야기를 읽는다.
      const B = bannerSpec(root.dataset.room2);
      const ps = q(e, 'p[data-outline]');
      const body = ps.slice().sort((a, b) => b.textContent.length - a.textContent.length)[0];
      setText(body, B.body);
      Object.assign(body.style, { whiteSpace: 'pre-wrap', wordBreak: 'keep-all', height: 'auto' });
      // 제목 줄: 팀 피그마 배너 펼침(1979:27613, 고민 주제 I1979:27707;56:389)의 글자 그대로다.
      const title = ps.find((p) => /님의 고민$|의 고민$/.test(p.textContent.trim()));
      if (title && B.title) { setText(title, B.title); Object.assign(title.style, { width: 'auto', whiteSpace: 'pre' }); }
      const tags = ps.filter((p) => /^#/.test(p.textContent.trim()));
      // 키워드 칩: 팀 글자 길이에 맞춘 고정 폭을 풀고 글자 길이대로 늘어나게 한다(좌우 여백이 같아야 한다).
      tags.forEach((t, i) => {
        // 카드별 고민은 키워드가 하나다. 남는 칩은 숨긴다.
        if (t.parentElement) t.parentElement.style.display = B.tags[i] ? '' : 'none';
        if (!B.tags[i]) return;
        setText(t, B.tags[i]);
        Object.assign(t.style, { width: 'auto', whiteSpace: 'nowrap' });
        if (t.parentElement) Object.assign(t.parentElement.style, { width: 'auto', flex: '0 0 auto' });
      });
      const ctx = tags[0] && tags[0].closest('[data-figma="AI 맥락"]');
      if (ctx) ctx.style.width = 'auto';
    }
    const r = relRect(root, col);
    Object.assign(e.style, { left: r.x + 'px', top: r.y + 'px', zIndex: '35', cursor: 'pointer' });
    root.appendChild(e);
    exp = e;
    bannerOpen = true;
    // 펼친 본문 행간 140%와 줄 수에 맞춘 박스 높이(피그마 1884:11599, 3줄 153, 2줄 133.4).
    const body = q(e, 'p[data-outline]').sort((a, b) => b.textContent.length - a.textContent.length)[0];
    const fit = styleBannerBody(e, body);
    // 펼친 배너 높이는 실제 그려진 높이를 쓴다.
    const h = fit || Math.round(e.getBoundingClientRect().height / ((root.getBoundingClientRect().width / LIVE.screenW) || 1)) || LIVE.bannerOpenH, c = LIVE.bannerClosedH;
    pushDock(true, instant === true, h - c);
    e.dataset.openH = String(h);
    col.style.opacity = '0';
    if (instant === true) { busy = false; } else {
      const a = e.animate([{ clipPath: 'inset(0 0 ' + (h - c) + 'px 0 round ' + radius() + ')', opacity: 0.4 }, { clipPath: 'inset(0 0 0 0 round ' + radius() + ')', opacity: 1 }], { duration: LIVE.bannerMs, easing: motion.emphasizedDecel });
      q(e, ':scope > *').slice(1).forEach((k) => k.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: LIVE.bannerMs, delay: 60, easing: motion.emphasizedDecel, fill: 'backwards' }));
      a.onfinish = () => { busy = false; };
    }
    e.addEventListener('click', (ev) => { ev.stopPropagation(); collapse(); });
  };
  col.addEventListener('click', (ev) => { ev.stopPropagation(); expand(); });
  if (bannerOpen) window.setTimeout(() => expand(true), 0);
}

// ---------- 3) 마이크 ----------
// 마이크는 사용자가 방에서 마이크 버튼을 눌러야만 켠다(방에 들어오자마자 듣지 않는다). 첫 버튼 모양은 생성 화면(피그마) 그대로다.
// 끌 때는 음소거(track.enabled)가 아니라 마이크를 완전히 놓는다(모든 track.stop, AudioContext close). 브라우저 주소창의 마이크 표시와
// 아이폰 상태바 주황 점이 남지 않게 한다. 다시 누르면 getUserMedia 를 다시 부른다(이미 허용한 사이트는 다시 묻지 않는다).
// 받아쓰기(dictation.js)가 마이크를 놓아야 할 때(방을 떠남, 페이지 숨김, 말 없음, 방 종료)도 releaseMic 을 부른다.
const mic = { stream: null, ctx: null, an: null, buf: null, live: false, muted: false, denied: false, level: 0, speaking: false, timer: 0, viaDict: false, why: '' };
export const micState = () => mic;
// 받아쓰기가 마이크 입력을 혼자 맡는 환경인지(사파리). dictation.js 가 채운다. 사파리는 음성 인식을 누름 안에서 바로 시작해야 하고,
// getUserMedia 스트림과 음성 인식이 같은 마이크를 함께 잡지 않게 스트림을 열지 않는다.
export const micHooks = { ownsMic: () => false };
const redOf = (el) => { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(getComputedStyle(el).backgroundColor); return !!m && +m[1] > 200 && +m[2] < 140; };
const dlog = (type, extra) => {
  const list = window.__drrrkDictation || (window.__drrrkDictation = []);
  list.push(Object.assign({ t: Math.round(performance.now()), type }, extra || {}));
  if (list.length > 400) list.splice(0, list.length - 400);
};

async function startMic() {
  const md = navigator.mediaDevices;
  if (!md || !md.getUserMedia) throw new Error('unsupported');
  const stream = await md.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  // 권한을 묻는 사이에 방을 떠났거나 페이지가 숨겨졌으면 받은 마이크를 바로 놓는다.
  if (mic.why === 'abandon') { stream.getTracks().forEach((t) => t.stop()); throw new Error('abandoned'); }
  mic.stream = stream;
  const AC = window.AudioContext || window.webkitAudioContext;
  try {
    mic.ctx = new AC();
    const src = mic.ctx.createMediaStreamSource(mic.stream);
    mic.an = mic.ctx.createAnalyser();
    mic.an.fftSize = 512;
    src.connect(mic.an);
    mic.buf = new Uint8Array(mic.an.fftSize);
  } catch (e) { mic.ctx = null; mic.an = null; }
  mic.live = true;
  mic.muted = false;
  mic.denied = false;
  mic.why = '';
  window.clearInterval(mic.timer);
  let hold = 0;
  mic.timer = window.setInterval(() => {
    if (!mic.live || mic.muted || !mic.an) { mic.level = 0; mic.speaking = false; return; }
    mic.an.getByteTimeDomainData(mic.buf);
    let s = 0;
    for (let i = 0; i < mic.buf.length; i++) { const v = (mic.buf[i] - 128) / 128; s += v * v; }
    mic.level = Math.min(1, Math.sqrt(s / mic.buf.length) * 6);
    if (mic.level > LIVE.micThreshold) hold = 6;
    else if (hold > 0) hold--;
    mic.speaking = hold > 0;
  }, 80);
}

// 마이크를 완전히 놓는다. muted 가 true 면 버튼을 꺼짐(빨강)으로 바꾸고, false 면 방에 처음 들어온 상태로 되돌린다(방을 떠남, 방 종료).
export function releaseMic(why, muted) {
  const had = !!(mic.live || mic.stream);
  const tracks = mic.stream ? mic.stream.getTracks() : [];
  tracks.forEach((t) => { try { t.stop(); } catch (e) { /* 이미 멈춤 */ } });
  if (mic.ctx) { try { mic.ctx.close(); } catch (e) { /* 이미 닫힘 */ } }
  window.clearInterval(mic.timer);
  Object.assign(mic, { stream: null, ctx: null, an: null, buf: null, live: false, viaDict: false, level: 0, speaking: false, timer: 0 });
  mic.muted = !!muted;
  if (!muted) mic.denied = false;
  // 권한 창이 떠 있는 동안 놓으라는 신호가 오면 뒤늦게 받은 스트림도 놓는다(startMic).
  mic.why = had ? why : 'abandon';
  if (had || tracks.length) dlog('mic-release', { why, tracks: tracks.map((t) => t.readyState), muted: !!muted });
  if (had || muted) window.dispatchEvent(new Event('drrrk:mic'));
  return had;
}

// getUserMedia 로 마이크를 연다(사파리가 아닌 브라우저의 버튼 누름, 사파리에서 음성 인식이 처음부터 안 될 때 dictation.js).
// 열리면 true. 거부와 미지원은 기존 안내 글을 띄우고 버튼을 꺼짐으로 둔다. withToast 가 false 면 켜짐 안내는 띄우지 않는다(이미 띄움).
export async function openMic(root, withToast) {
  mic.why = '';
  try {
    await startMic();
    window.dispatchEvent(new Event('drrrk:mic'));
    if (root && withToast !== false) toast(root, LIVE.micOnText);
    return true;
  } catch (err) {
    if (err && err.message === 'abandoned') return false;
    if (mic.live) releaseMic('denied', true);
    mic.denied = true;
    window.dispatchEvent(new Event('drrrk:mic'));
    if (root) toast(root, err && err.message === 'unsupported' ? LIVE.micUnsupportedText : LIVE.micDeniedText);
    return false;
  }
}

export function attachMic(root) {
  const bar = root.querySelector(BAR);
  const btns = q(root, '[data-figma="btn_마이크 상태"]');
  if (!bar || !btns.length || btns[0].dataset.live) return;
  const doners = {};
  const variant = async (kind) => {
    if (!doners[kind]) {
      const n = kind === 'on' ? 29 : 31;
      doners[kind] = (await Promise.all([cloneOf(n, '[data-figma="btn_마이크 상태"]', BAR), cloneOf(n, ':scope > [data-figma="btn_마이크 상태"]')])).filter(Boolean);
    }
    return doners[kind];
  };
  // 입력줄 버튼 위에 빨강 끔 버튼이 겹쳐 있는 화면(29, 31)과 달리 입력줄 버튼 하나만 있는 화면(일반 모드 22, 32, 해 뜨는 단계 40)은
  // 끔 모양을 입력줄 버튼 자리에 직접 그린다: 31 화면 빨강 끔 버튼의 아이콘과 바탕(#FF4D6A), 입력줄 버튼의 배치 클래스.
  const solo = btns.length === 1 && !!btns[0].closest(BAR);
  const show = async (kind) => {
    const src = await variant(kind);
    btns.forEach((b, i) => {
      const d = src[i] || src[0];
      if (!d || b.dataset.kind === kind) return;
      // 혼자 방(41, 42)은 입력줄 버튼이 빨강 끔 버튼 위에 그려져 꺼져도 초록이 보였다(11/11 확인). 끔 때는 입력줄 버튼도 빨강 끔 모양으로 바꾼다.
      if ((solo || b.closest(BAR)) && kind === 'off' && src[1]) {
        b.className = d.className.replace('[background:#2EE59D]', '[background:#FF4D6A]');
        b.innerHTML = src[1].innerHTML;
      } else {
        b.className = d.className;
        b.innerHTML = d.innerHTML;
      }
      b.dataset.kind = kind;
    });
  };
  const paint = () => {
    if (mic.live && !mic.muted) show('on');
    else if (mic.muted || mic.denied) show('off');
  };
  // 마이크를 밖에서 놓았을 때(말 없음, 페이지 숨김, 사파리 재시작 실패) 이 화면 버튼도 꺼짐으로 바꾼다.
  const onMic = () => { if (!root.isConnected) { window.removeEventListener('drrrk:mic', onMic); return; } paint(); };
  window.addEventListener('drrrk:mic', onMic);
  btns.forEach((b) => {
    b.dataset.live = 'mic';
    b.dataset.kind = redOf(b) ? 'off' : 'on';
    b.style.cursor = 'pointer';
    b.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (mic.live) {
        // 끔: 받아쓰기(dictation.js)는 drrrk:mic 신호로 바로 멈추고, 마이크는 완전히 놓는다.
        releaseMic('mic-off', true);
        await show('off');
        toast(root, LIVE.micMutedText);
        return;
      }
      if (micHooks.ownsMic()) {
        // 사파리: 이 누름 안에서 바로 음성 인식을 시작한다(drrrk:mic 신호는 같은 호출 안에서 dictation.js 의 start 를 부른다).
        Object.assign(mic, { live: true, muted: false, denied: false, viaDict: true, why: '' });
        window.dispatchEvent(new Event('drrrk:mic'));
        await show('on');
        toast(root, LIVE.micOnText);
        return;
      }
      const ok = await openMic(root, true);
      if (root.isConnected && (ok || mic.denied)) await show(ok ? 'on' : 'off');
    });
  });
  paint();
  // 말할 때 내 마이크 버튼이나 내 의자에는 초록 테두리와 번짐을 붙이지 않는다(팀 지시). 켜짐과 꺼짐 색만 바뀐다.
}

// ---------- 4) 말하는 사람 돌리기 ----------
// 뽑을 수 있는 사람 중에서 방금 말한 사람을 빼고 고른다. 나와 마이크를 끈 사람은 뽑지 않는다.
const pickFrom = (cands, cur) => {
  const pool = cands.filter((i) => i !== cur);
  const list = pool.length ? pool : cands;
  return list[Math.floor(Math.random() * list.length)];
};

const TILE_SEL = '[data-figma^="참여자 타일"], [data-figma^="Participant Tile"]';
const NAME_P = '[data-figma="name"] p[data-outline], [data-figma="name"] p';
const inside = (r, x, y) => x >= r.x - 2 && x <= r.x + r.w + 2 && y >= r.y - 2 && y <= r.y + r.h + 2;

// 타일 안과 밖에 흩어진 요소(이름 칸, 의자, 말하는 막대)를 타일 칸 안에 있는지로 묶는다.
function tilesOf(root) {
  const tiles = q(root, TILE_SEL);
  return tiles.map((el) => ({ el, r: relRect(root, el) }));
}
function labelOfTile(root, t) {
  const names = q(root, NAME_P).filter((p) => p.getBoundingClientRect().width > 0);
  const hit = names.find((p) => { const r = relRect(root, p); return inside(t.r, r.x + r.w / 2, r.y + r.h / 2); });
  return hit ? hit.textContent.trim() : '';
}

// 타일 바탕과 이름 칸을 모든 칸에서 같게 맞춘다. 말하는 칸으로 그려진 피그마 타일에는 바탕색이 없어서 카드가 사라지는 일이 있었다.
export function tidyTiles(root) {
  const tiles = tilesOf(root);
  if (tiles.length < 3 || root.dataset.tidied) return;
  root.dataset.tidied = '1';
  const base = tiles.map((t) => getComputedStyle(t.el)).find((cs) => cs.backgroundColor && !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor));
  const bg = base ? base.backgroundColor : 'rgb(34, 38, 40)';
  const radius = base ? base.borderRadius : '16px';
  tiles.forEach((t) => {
    const cs = getComputedStyle(t.el);
    if (/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)) {
      const card = document.createElement('div');
      card.setAttribute('data-card', 'tile');
      Object.assign(card.style, { position: 'absolute', left: t.r.x + 'px', top: t.r.y + 'px', width: t.r.w + 'px', height: t.r.h + 'px', background: bg, borderRadius: radius, pointerEvents: 'none' });
      root.insertBefore(card, root.firstChild);
    }
  });
  // 이름 칸 안의 빈 조각(안 보이는 아이콘 자리)은 지운다. 검정 칸 왼쪽이 비어 보이던 원인이다.
  q(root, '[data-figma="name"]').forEach((nm) => {
    [...nm.children].forEach((c) => {
      if (c.tagName === 'DIV' && !c.textContent.trim() && !c.querySelector('svg, img')) c.style.display = 'none';
    });
    nm.querySelectorAll('p').forEach((p) => {
      if (/\s$/.test(p.textContent)) setText(p, p.textContent.replace(/\s+$/, ''));
      p.style.width = 'auto';
    });
  });
  // 이름이 바뀌어 글자 길이가 달라졌으므로 이름 칸 폭을 글자에 맞추고 타일 가운데에 다시 놓는다.
  requestAnimationFrame(() => {
    tiles.forEach((t) => {
      const nm = q(root, '[data-figma="name"]').find((n) => { const r = relRect(root, n); return inside(t.r, r.x + r.w / 2, r.y + r.h / 2); });
      if (!nm) return;
      const before = relRect(root, nm);
      nm.style.width = 'auto';
      const after = relRect(root, nm);
      const dx = (t.r.x + t.r.w / 2) - (after.x + after.w / 2);
      nm.style.transform = 'translateX(' + Math.round(dx * 2) / 2 + 'px)';
      void before;
    });
  });
  // 내 의자 뒤에 원이 없으면 다른 칸과 같은 원을 깐다.
  const me = tiles.find((t) => /새벽2시/.test(labelOfTile(root, t)));
  if (me) {
    const frames = q(root, '[data-figma^="Frame"]').filter((f) => { const r = relRect(root, f); return r.w > 60 && r.w < 90 && inside(me.r, r.x + r.w / 2, r.y + r.h / 2); });
    const hasDisc = frames.some((f) => q(f, 'div').some((d) => /rgb\(18, 20, 2[01]\)/.test(getComputedStyle(d).backgroundColor)));
    if (frames.length && !hasDisc) {
      const r = relRect(root, frames[0]);
      const disc = document.createElement('div');
      Object.assign(disc.style, { position: 'absolute', left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px', borderRadius: '50%', background: 'rgb(18, 20, 21)', pointerEvents: 'none' });
      root.insertBefore(disc, frames[0].parentElement === root ? frames[0] : root.firstChild.nextSibling);
    }
  }
}

export function attachSpeakers(root) {
  if (root.dataset.speakers) return;
  const tiles = tilesOf(root);
  const group = root.querySelector(':scope > [data-figma="Group 2147229349"]');
  if (tiles.length >= 3) {
    root.dataset.speakers = 'tiles';
    const ring = LIVE.speakRing;
    const meIdx = tiles.findIndex((t) => /새벽2시/.test(labelOfTile(root, t)));
    // 마이크를 끈 사람(음소거 배지가 있는 칸)은 말할 수 없다.
    const muted = tiles.map((t) => !!t.el.querySelector('[data-figma="음소거 배지"]') || !!q(root, '[data-figma="음소거 배지"]').find((b) => { const r = relRect(root, b); return inside(t.r, r.x + r.w / 2, r.y + r.h / 2); }));
    const cands = tiles.map((_, i) => i).filter((i) => i !== meIdx && !muted[i]);
    if (!cands.length) return;
    // 피그마가 말하는 칸 하나에만 그려 둔 초록 테두리는 숨기고, 돌아가는 테두리로 대신한다.
    tiles.forEach((t) => {
      t.el.style.transition = 'box-shadow 260ms ' + motion.standard;
      q(t.el, ':scope > span[aria-hidden]').forEach((o) => { if (o.querySelector('path[style*="2EE59D"]')) o.style.display = 'none'; });
    });
    // 말하는 막대는 화면 바닥(root)으로 옮겨서 칸마다 따라 움직이게 한다.
    let bars = q(root, '[data-figma="voice wave"]').filter((b) => b.getBoundingClientRect().width > 0).slice(0, 5);
    const bar0 = bars.map((b) => relRect(root, b));
    bars.forEach((b, k) => {
      root.appendChild(b);
      Object.assign(b.style, { position: 'absolute', left: bar0[k].x + 'px', top: bar0[k].y + 'px', zIndex: '6', transition: 'left 320ms ' + motion.emphasizedDecel + ', top 320ms ' + motion.emphasizedDecel });
      b.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.45)' }, { transform: 'scaleY(1.25)' }, { transform: 'scaleY(0.7)' }], { duration: 620 + k * 110, iterations: Infinity, easing: 'ease-in-out' });
    });
    const home = bar0.length ? tiles.findIndex((t) => inside(t.r, bar0[0].x + bar0[0].w / 2, bar0[0].y + bar0[0].h / 2)) : -1;
    const homeIdx = home >= 0 ? home : 0;
    // 막대가 하나도 없는 화면은 오른쪽 위에 직접 만든다.
    if (!bars.length) {
      const hs = [5, 11, 20, 10, 6];
      bars = hs.map((h, k) => {
        const el = document.createElement('div');
        Object.assign(el.style, { position: 'absolute', width: '3px', height: h + 'px', borderRadius: '2px', background: '#2EE59D', zIndex: '6', left: tiles[homeIdx].r.x + 129 + k * 5 + 'px', top: tiles[homeIdx].r.y + 32 - h / 2 + 'px', transition: 'left 320ms ' + motion.emphasizedDecel + ', top 320ms ' + motion.emphasizedDecel });
        root.appendChild(el);
        el.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.45)' }, { transform: 'scaleY(1.25)' }, { transform: 'scaleY(0.7)' }], { duration: 620 + k * 110, iterations: Infinity, easing: 'ease-in-out' });
        return el;
      });
      bar0.length = 0;
      bars.forEach((el) => bar0.push({ x: parseFloat(el.style.left), y: parseFloat(el.style.top) }));
    }
    const place = (i) => {
      tiles.forEach((t, k) => (t.el.style.boxShadow = k === i ? 'inset 0 0 0 2px ' + ring : 'inset 0 0 0 0 ' + ring));
      const dx = tiles[i].r.x - tiles[homeIdx].r.x, dy = tiles[i].r.y - tiles[homeIdx].r.y;
      bars.forEach((b, k) => { b.style.left = bar0[k].x + dx + 'px'; b.style.top = bar0[k].y + dy + 'px'; });
    };
    let cur = cands.includes(homeIdx) ? homeIdx : cands[0];
    place(cur);
    const step = () => {
      if (!root.isConnected) return;
      cur = pickFrom(cands, cur);
      place(cur);
      window.setTimeout(step, LIVE.speakMin + Math.random() * (LIVE.speakMax - LIVE.speakMin));
    };
    window.setTimeout(step, LIVE.speakFirst);
    return;
  }
  if (group) {
    const dot = group.querySelector(':scope > [data-figma="Ellipse"]');
    const wave = group.querySelector(':scope > [data-figma="Group 2147229021"]');
    const labels = q(group, ':scope > p[data-outline]');
    if (!dot || !wave || labels.length < 2) return;
    // 나(새벽2시 피시방)는 말하는 표시를 받지 않는다. 남은 이름표가 돌아가며 말한다(옛 방 9는 이름표 둘 중 하나만 남는다).
    const meIdx = labels.findIndex((p) => /새벽2시/.test(p.textContent));
    const cands = labels.map((_, i) => i).filter((i) => i !== meIdx);
    if (!cands.length) return;
    root.dataset.speakers = 'floor';
    // 이름표 글자(11/10 피드백 "말하는거 활성화 된 의자 이름이 회색-화이트로"): 평소는 피그마 회색(#F8F8F8 50%, Medium 11),
    // 말하는 이름표만 흰색(#F8F8F8, Bold 12, 피그마 2100:24129와 2096:22171의 말하는 이름표 값). 색은 200ms로 바뀐다.
    // 생성 화면이 이름표마다 덧그린 글자 그림(그림자 포함 SVG)은 피그마 처음 색과 굵기로 고정돼 있어서 지우고, 같은 그림자(흐림 4, 검정 50%, 말하는 이름표 25%)를 글자에 직접 준다.
    labels.forEach((p) => q(p, ':scope > span[aria-hidden]').forEach((o) => o.remove()));
    const paint = (i) => labels.forEach((p, k) => {
      const on = k === i;
      p.dataset.speaking = on ? '1' : '';
      Object.assign(p.style, { transition: 'color 200ms ' + motion.standard, textShadow: on ? '0 0 4px rgba(0, 0, 0, 0.25)' : '0 0 4px rgba(0, 0, 0, 0.5)', webkitTextFillColor: 'currentColor', color: on ? '#F8F8F8' : 'rgba(248, 248, 248, 0.5)', fontWeight: on ? '700' : '500', fontSize: on ? '12px' : '11px', lineHeight: on ? '15px' : '14px', letterSpacing: on ? '-0.48px' : '-0.44px', height: on ? '15px' : '14px', width: 'auto', whiteSpace: 'pre' });
    });
    // 기준 자리: 피그마에서 초록 점과 파동이 붙어 있는 이름표. 점은 이름표 왼쪽, 파동은 이름표 가운데 위에 같은 간격으로 붙는다.
    const d0 = relRect(root, dot), w0 = relRect(root, wave);
    const rects0 = labels.map((p) => relRect(root, p));
    const homeIdx = rects0.reduce((b, r, i) => (Math.abs(r.y - d0.y) + Math.abs(r.x - d0.x) < Math.abs(rects0[b].y - d0.y) + Math.abs(rects0[b].x - d0.x) ? i : b), 0);
    paint(homeIdx);
    const m0 = relRect(root, labels[homeIdx]);
    const dotOff = { x: d0.x - m0.x, y: d0.y - m0.y };
    const waveOff = { x: (w0.x + w0.w / 2) - (m0.x + m0.w / 2), y: w0.y - m0.y };
    const marks = [dot, wave];
    const put = (i) => {
      paint(i);
      const r = relRect(root, labels[i]);
      dot.style.transform = 'translate(' + (r.x + dotOff.x - d0.x) + 'px,' + (r.y + dotOff.y - d0.y) + 'px)';
      wave.style.transform = 'translate(' + ((r.x + r.w / 2) + waveOff.x - (w0.x + w0.w / 2)) + 'px,' + (r.y + waveOff.y - w0.y) + 'px)';
    };
    // 바뀔 때는 점과 파동이 100ms에 사라지고, 새 이름표에서 흰 글자(200ms)와 같이 나타난다. 다른 의자로 미끄러지는 동안 어긋나 보이지 않게 한다.
    const move = (i) => {
      marks.forEach((e) => { e.style.transition = 'opacity 100ms ' + motion.standard; e.style.opacity = '0'; });
      window.setTimeout(() => {
        if (!root.isConnected) return;
        put(i);
        marks.forEach((e) => { e.style.transition = 'opacity 200ms ' + motion.standard; e.style.opacity = '1'; });
      }, 100);
    };
    q(wave, '[data-figma="voice wave"]').forEach((b, k) => b.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.45)' }, { transform: 'scaleY(1.25)' }, { transform: 'scaleY(0.7)' }], { duration: 620 + k * 110, iterations: Infinity, easing: 'ease-in-out' }));
    let cur = cands.includes(homeIdx) ? homeIdx : cands[0];
    put(cur);
    const step = () => {
      if (!root.isConnected) return;
      const next = pickFrom(cands, cur);
      if (next !== cur) { cur = next; move(cur); }
      window.setTimeout(step, LIVE.speakMin + Math.random() * (LIVE.speakMax - LIVE.speakMin));
    };
    window.setTimeout(step, LIVE.speakFirst);
  }
}

// ---------- 5) 이름과 입력줄 ----------
export function fixNames(root) {
  q(root, 'p[data-outline]').forEach((p) => {
    const t = p.textContent;
    // 이름 칸(글자 전체가 이름)만 바꾼다. 채팅 글 속 '택배상자님' 같은 원문은 그대로 둔다.
    if (!/^\s*새벽2시 (택배상자|드르륵 칵)\s*$/.test(t)) return;
    // 원문 끝에 줄바꿈이 붙어 있어서 그대로 쓰면 이름 칸 밖으로 글자가 밀려난다. 끝 공백은 지운다.
    setText(p, t.replace(/택배상자/g, '피시방').replace(/드르륵 칵/g, '피시방').replace(/\s+$/, ''));
  });
}

// 댓글 입력줄(방 구경)의 DRR, KAK 버튼은 없앴다. 입력칸이 그 자리까지 넓어진다.
export function fixCommentBar(root) {
  const bar = root.querySelector('[data-figma="input"]');
  if (!bar) return;
  const btns = q(bar, '[data-figma="btn_드르륵 칵"]');
  if (!btns.length) return;
  // 팀 피그마 최신(11. 9.)은 이 자리에 따봉, 싫어요 아이콘 버튼을 두었다. 글자 DRR, KAK이 있는 옛 버튼만 숨긴다.
  if (!btns.some((b) => /DRR|KAK/i.test(b.textContent))) return;
  const wrap = btns[0].parentElement;
  wrap.style.display = 'none';
  const cm = bar.querySelector(':scope > [data-figma="댓글"]');
  if (!cm) return;
  cm.style.width = '326px';
  cm.style.flex = '1 1 auto';
  const field = cm.querySelector('[data-figma="채팅 입력"]');
  if (field) { field.style.width = 'auto'; field.style.flex = '1 1 auto'; }
}

// ---------- 6) 온보딩 ----------
// 따봉, 싫어요 버튼(DRR KAK)은 없애고 이모지 알약을 가운데로 키워서 반응의 중심으로 둔다. 제목은 팀 문구 그대로다.
export async function patchOnboarding(root) {
  const box = root.querySelector('[data-figma="DRR KAK"]');
  if (!box || box.dataset.live) return;
  box.dataset.live = 'emoji';
  box.style.display = 'none';
  q(root, '[data-figma="skel / 말풍선"]').slice(2).forEach((b) => (b.style.display = 'none'));
  const chip = root.querySelector('[data-figma="칩"]');
  if (chip) {
    const par = chip.parentElement;
    const pr = relRect(root, par), cr = relRect(root, chip);
    // 알약을 흰 패널 가운데 아래쪽으로 옮기고 1.5배로 키운다.
    const tx = pr.w / 2 - (cr.x - pr.x + cr.w / 2);
    const ty = 150 - (cr.y - pr.y + cr.h / 2);
    Object.assign(chip.style, { transformOrigin: '50% 50%', transform: 'translate(' + tx + 'px,' + ty + 'px) scale(1.5)', zIndex: '3' });
    // 하트 하나가 위로 떠오르며 날아간다.
    const heart = chip.querySelector('[data-figma="heart-1"]');
    if (heart) {
      const hr = relRect(root, heart);
      const fly = heart.cloneNode(true);
      Object.assign(fly.style, { position: 'absolute', left: hr.x - pr.x + tx + 'px', top: hr.y - pr.y + ty - 18 + 'px', zIndex: '4', pointerEvents: 'none', opacity: '0', transformOrigin: '50% 50%' });
      par.appendChild(fly);
      fly.animate([
        { opacity: 0, transform: 'translate(0,10px) scale(1.2) rotate(0deg)' },
        { opacity: 1, transform: 'translate(8px,-14px) scale(1.7) rotate(8deg)', offset: 0.2 },
        { opacity: 0, transform: 'translate(26px,-74px) scale(2.1) rotate(16deg)' },
      ], { duration: 2400, iterations: Infinity, easing: 'ease-out' });
    }
  }
  const title = root.querySelector('[data-figma="title"]');
  const sub = root.querySelector('[data-figma="sub"]');
  if (LIVE.onboardTitle) setText(title, LIVE.onboardTitle);
  setText(sub, LIVE.onboardSub);
  [title, sub].forEach((p) => p && Object.assign(p.style, { width: 'auto', whiteSpace: 'pre', textAlign: 'center' }));
}

export function attachRoom(root, n) {
  fixNames(root);
  tidyTiles(root);
  fixCommentBar(root);
  attachEmoji(root);
  attachBanner(root);
  fitStaticBanners(root);
  attachMic(root);
  attachSpeakers(root);
  if (n === LIVE.onboardScreen) patchOnboarding(root);
}
