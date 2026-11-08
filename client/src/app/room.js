// 방 안에서 실제로 움직이는 것들. 피그마에서 그린 요소를 다른 화면에서 복제해 와서(donor.js) 화면 이동 없이 덧붙인다.
// 1) 플러스 메뉴(이모지): 어느 방 상태에서나 눌러서 연다. 화면은 바뀌지 않는다.
// 2) 고민 배너: 접힌 배너를 누르면 그 자리에서 부드럽게 펼쳐진다.
// 3) 마이크: 누르면 브라우저가 허용을 묻고, 허용하면 내 목소리를 받아서 말할 때 내 의자가 빛난다.
// 4) 말하는 사람: 일반 모드와 현장 모드에서 여러 명이 돌아가며 말한다.
// 5) 이름: 박스 의자는 없앤다(팀 피드백). 6) 온보딩: DRR, KAK 대신 주전부리 퀵슬롯.
import { motion, live as LIVE } from '../tokens.js';
import { q, relRect, scaleOf, setText, wait } from './dom.js';
import { cloneOf } from './donor.js';

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
      it.animate([{ opacity: 0, transform: 'translateY(14px) scale(0.9)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], { duration: 340, delay: 80 + (items.length - 1 - i) * 60, easing: motion.emphasizedDecel, fill: 'backwards' });
      it.addEventListener('click', (e) => { e.stopPropagation(); fly(it); close(); });
    });
    document.addEventListener('pointerdown', onDoc, true);
  };
  plus.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pop) close(); else openMenu();
  });
}

// ---------- 2) 고민 배너 ----------
export function attachBanner(root) {
  const col = root.querySelector('[data-figma="고민 주제 · 최소화 (탭하면 자세히)"]');
  if (!col || col.dataset.live) return;
  col.dataset.live = 'banner';
  col.style.cursor = 'pointer';
  const solo = !!root.querySelector('[data-figma="AI 드르륵 의자"]');
  let exp = null, busy = false;
  const radius = () => (parseFloat(getComputedStyle(col).borderTopLeftRadius) || 14) + 'px';
  const collapse = () => {
    if (!exp || busy) return;
    busy = true;
    const e = exp;
    exp = null;
    const h = LIVE.bannerOpenH, c = LIVE.bannerClosedH;
    const a = e.animate([{ clipPath: 'inset(0 0 0 0 round ' + radius() + ')' }, { clipPath: 'inset(0 0 ' + (h - c) + 'px 0 round ' + radius() + ')' }], { duration: LIVE.bannerMs, easing: motion.emphasizedAccel, fill: 'forwards' });
    col.animate([{ opacity: 0 }, { opacity: 1 }], { duration: motion.stateIn, delay: LIVE.bannerMs - 90, fill: 'both' });
    a.onfinish = () => { e.remove(); col.style.opacity = ''; busy = false; };
  };
  const expand = async () => {
    if (exp || busy) return;
    busy = true;
    const e = await cloneOf(43, '[data-figma="고민 주제"]');
    if (!e || !root.isConnected) { busy = false; return; }
    if (!solo) {
      const ps = q(e, 'p[data-outline]');
      const body = ps.slice().sort((a, b) => b.textContent.length - a.textContent.length)[0];
      setText(body, LIVE.bannerBody);
      Object.assign(body.style, { whiteSpace: 'pre-wrap', wordBreak: 'keep-all', height: 'auto' });
      const tags = ps.filter((p) => /^#/.test(p.textContent.trim()));
      // 키워드 칩: 팀 글자 길이에 맞춘 고정 폭을 풀고 글자 길이대로 늘어나게 한다(좌우 여백이 같아야 한다).
      tags.forEach((t, i) => {
        if (!LIVE.bannerTags[i]) return;
        setText(t, LIVE.bannerTags[i]);
        Object.assign(t.style, { width: 'auto', whiteSpace: 'nowrap' });
        if (t.parentElement) Object.assign(t.parentElement.style, { width: 'auto', flex: '0 0 auto' });
      });
      const ctx = tags[0] && tags[0].closest('[data-figma="AI 맥락"]');
      if (ctx) ctx.style.width = 'auto';
    }
    const r = relRect(root, col);
    Object.assign(e.style, { left: r.x + 'px', top: r.y + 'px', zIndex: '15', cursor: 'pointer' });
    root.appendChild(e);
    exp = e;
    const h = LIVE.bannerOpenH, c = LIVE.bannerClosedH;
    col.style.opacity = '0';
    const a = e.animate([{ clipPath: 'inset(0 0 ' + (h - c) + 'px 0 round ' + radius() + ')', opacity: 0.4 }, { clipPath: 'inset(0 0 0 0 round ' + radius() + ')', opacity: 1 }], { duration: LIVE.bannerMs, easing: motion.emphasizedDecel });
    q(e, ':scope > *').slice(1).forEach((k) => k.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: LIVE.bannerMs, delay: 60, easing: motion.emphasizedDecel, fill: 'backwards' }));
    a.onfinish = () => { busy = false; };
    e.addEventListener('click', (ev) => { ev.stopPropagation(); collapse(); });
  };
  col.addEventListener('click', (ev) => { ev.stopPropagation(); expand(); });
}

// ---------- 3) 마이크 ----------
const mic = { stream: null, ctx: null, an: null, buf: null, live: false, muted: false, denied: false, level: 0, speaking: false, timer: 0 };
export const micState = () => mic;
const redOf = (el) => { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(getComputedStyle(el).backgroundColor); return !!m && +m[1] > 200 && +m[2] < 140; };

async function startMic() {
  const md = navigator.mediaDevices;
  if (!md || !md.getUserMedia) throw new Error('unsupported');
  mic.stream = await md.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const AC = window.AudioContext || window.webkitAudioContext;
  mic.ctx = new AC();
  const src = mic.ctx.createMediaStreamSource(mic.stream);
  mic.an = mic.ctx.createAnalyser();
  mic.an.fftSize = 512;
  src.connect(mic.an);
  mic.buf = new Uint8Array(mic.an.fftSize);
  mic.live = true;
  mic.muted = false;
  window.clearInterval(mic.timer);
  let hold = 0;
  mic.timer = window.setInterval(() => {
    if (!mic.live || mic.muted) { mic.level = 0; mic.speaking = false; return; }
    mic.an.getByteTimeDomainData(mic.buf);
    let s = 0;
    for (let i = 0; i < mic.buf.length; i++) { const v = (mic.buf[i] - 128) / 128; s += v * v; }
    mic.level = Math.min(1, Math.sqrt(s / mic.buf.length) * 6);
    if (mic.level > LIVE.micThreshold) hold = 6;
    else if (hold > 0) hold--;
    mic.speaking = hold > 0;
  }, 80);
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
  const show = async (kind) => {
    const src = await variant(kind);
    btns.forEach((b, i) => {
      const d = src[i] || src[0];
      if (!d || b.dataset.kind === kind) return;
      b.className = d.className;
      b.innerHTML = d.innerHTML;
      b.dataset.kind = kind;
    });
  };
  const paint = () => {
    if (mic.live && !mic.muted) show('on');
    else if (mic.muted || mic.denied) show('off');
  };
  btns.forEach((b) => {
    b.dataset.live = 'mic';
    b.dataset.kind = redOf(b) ? 'off' : 'on';
    b.style.cursor = 'pointer';
    b.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!mic.stream) {
        try {
          await startMic();
          await show('on');
          toast(root, LIVE.micOnText);
        } catch (err) {
          mic.denied = true;
          await show('off');
          toast(root, err && err.message === 'unsupported' ? LIVE.micUnsupportedText : LIVE.micDeniedText);
        }
      } else {
        mic.muted = !mic.muted;
        mic.stream.getAudioTracks().forEach((t) => (t.enabled = !mic.muted));
        await show(mic.muted ? 'off' : 'on');
        toast(root, mic.muted ? LIVE.micMutedText : LIVE.micOnText);
      }
    });
  });
  paint();
  // 말할 때 내 마이크 버튼이나 내 의자에는 초록 테두리와 번짐을 붙이지 않는다(팀 지시). 켜짐과 꺼짐 색만 바뀐다.
}

// ---------- 4) 말하는 사람 돌리기 ----------
const pickNext = (n, cur, meIdx) => {
  const weights = [];
  for (let i = 0; i < n; i++) {
    if (i === cur) weights.push(0);
    else if (i === meIdx) weights.push(0); // 말하는 표시(초록 테두리와 바)는 나에게는 붙이지 않는다
    else weights.push(1);
  }
  const sum = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * sum;
  for (let i = 0; i < n; i++) { r -= weights[i]; if (r <= 0) return i; }
  return (cur + 1) % n;
};

export function attachSpeakers(root) {
  if (root.dataset.speakers) return;
  const tiles = q(root, ':scope > [data-figma^="참여자 타일"]');
  const bars = q(root, ':scope > [data-figma="voice wave"]');
  const group = root.querySelector(':scope > [data-figma="Group 2147229349"]');
  if (tiles.length >= 3 && bars.length >= 5) {
    root.dataset.speakers = 'tiles';
    const ring = LIVE.speakRing;
    const meIdx = Math.max(0, tiles.findIndex((t) => /새벽2시/.test(t.getAttribute('data-figma'))));
    const r0 = tiles.map((t) => relRect(root, t));
    const bar0 = bars.slice(0, 5).map((b) => relRect(root, b));
    let cur = (meIdx + 1) % tiles.length;
    tiles.forEach((t) => {
      t.style.transition = 'box-shadow 260ms ' + motion.standard;
      // 피그마가 말하는 칸 하나에만 그려 둔 초록 테두리(SVG)는 숨기고, 돌아가는 테두리로 대신한다.
      q(t, ':scope > span[aria-hidden]').forEach((o) => { if (o.querySelector('path[style*="2EE59D"]')) o.style.display = 'none'; });
    });
    const place = (i) => {
      tiles.forEach((t, k) => (t.style.boxShadow = k === i ? 'inset 0 0 0 2px ' + ring : 'inset 0 0 0 0 ' + ring));
      const ox = r0[i].x + r0[i].w - (r0[meIdx].x + r0[meIdx].w), oy = r0[i].y - r0[meIdx].y;
      bars.slice(0, 5).forEach((b, k) => {
        b.style.left = bar0[k].x + ox + 'px';
        b.style.top = bar0[k].y + oy + 'px';
      });
    };
    bars.slice(0, 5).forEach((b, k) => b.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.45)' }, { transform: 'scaleY(1.25)' }, { transform: 'scaleY(0.7)' }], { duration: 620 + k * 110, iterations: Infinity, easing: 'ease-in-out' }));
    place(cur);
    const step = () => {
      if (!root.isConnected) return;
      cur = pickNext(tiles.length, cur, meIdx);
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
    if (!dot || !wave || labels.length < 4) return;
    root.dataset.speakers = 'floor';
    const meLabel = labels.find((p) => /새벽2시/.test(p.textContent)) || labels[0];
    const rects = labels.map((p) => relRect(root, p));
    const d0 = relRect(root, dot), w0 = relRect(root, wave), m0 = relRect(root, meLabel);
    const meIdx = labels.indexOf(meLabel);
    let cur = (meIdx + 1) % labels.length;
    [dot, wave].forEach((e) => (e.style.transition = 'transform 320ms ' + motion.emphasizedDecel + ', opacity 200ms'));
    const place = (i) => {
      const r = rects[i];
      const dx = r.x - m0.x, dy = r.y - m0.y;
      const cx = (r.x + r.w / 2) - (m0.x + m0.w / 2);
      dot.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      wave.style.transform = 'translate(' + cx + 'px,' + dy + 'px)';
    };
    q(wave, '[data-figma="voice wave"]').forEach((b, k) => b.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.45)' }, { transform: 'scaleY(1.25)' }, { transform: 'scaleY(0.7)' }], { duration: 620 + k * 110, iterations: Infinity, easing: 'ease-in-out' }));
    void d0; void w0;
    place(cur);
    const step = () => {
      if (!root.isConnected) return;
      cur = pickNext(labels.length, cur, meIdx);
      place(cur);
      window.setTimeout(step, LIVE.speakMin + Math.random() * (LIVE.speakMax - LIVE.speakMin));
    };
    window.setTimeout(step, LIVE.speakFirst);
  }
}

// ---------- 5) 이름과 입력줄 ----------
export function fixNames(root) {
  q(root, 'p[data-outline]').forEach((p) => {
    const t = p.textContent;
    if (!/택배상자/.test(t)) return;
    // 원문 끝에 줄바꿈이 붙어 있어서 그대로 쓰면 이름 칸 밖으로 글자가 밀려난다. 끝 공백은 지운다.
    setText(p, t.replace(/택배상자/g, '드르륵 칵').replace(/\s+$/, ''));
  });
}

// 댓글 입력줄(방 구경)의 DRR, KAK 버튼은 없앴다. 입력칸이 그 자리까지 넓어진다.
export function fixCommentBar(root) {
  const bar = root.querySelector('[data-figma="input"]');
  if (!bar) return;
  const btns = q(bar, '[data-figma="btn_드르륵 칵"]');
  if (!btns.length) return;
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
  fixCommentBar(root);
  attachEmoji(root);
  attachBanner(root);
  attachMic(root);
  attachSpeakers(root);
  if (n === LIVE.onboardScreen) patchOnboarding(root);
}
