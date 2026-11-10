// 효과음. 짧은 효과음은 소리 파일 없이 브라우저 오디오(Web Audio)로 만든다. 첫 터치 때 켜지고(사파리 규칙), 소리 크기는 작게 둔다.
// 아이템 소리와 방 대사는 팀이 녹음한 mp3(itemSounds.js)를 같은 오디오로 낸다. 파일을 못 불러오면 아이템은 아래 합성 소리로 대신한다.
import { SOUND_FILES, UNIQUE_SOUND_KEYS } from './itemSounds.js';
const AC = typeof window !== 'undefined' ? window.AudioContext || window.webkitAudioContext : null;
let ctx = null;

function unlock() {
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') ctx.resume();
}
if (typeof document !== 'undefined') document.addEventListener('pointerdown', unlock, true);

const ok = () => ctx && ctx.state === 'running';

// out을 주면 그 노드(아이템 소리의 묶음 음량)로 보내고, at만큼 늦게 시작한다. 주지 않으면 예전처럼 바로 스피커로 간다.
function tone(from, to, dur, type, vol, out, at = 0) {
  if (!ok()) return;
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(30, to), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out || ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function burst(at, dur, freq, q, vol, out) {
  if (!ok()) return;
  const t = ctx.currentTime + at;
  const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = ctx.createBufferSource();
  s.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(out || ctx.destination);
  s.start(t);
}

// 아이템 소리(11. 10. 메모 "아이템 눌렀을때 사운드 들어볼 수 있으면 좋겠어요", 피그마 댓글 "소리 코드에 넣기 필요").
// 소리 파일 없이 tone과 burst로 아이템마다 0.5초에서 1초 길이로 만든다. 묶음 음량은 0.5다.
// 사용자가 누를 때만 부른다. 같은 아이템을 150ms 안에 다시 누르면 무시하고, 그보다 늦게 누르면 그 아이템의 앞 소리만 30ms 만에 줄여 끊은 뒤 새로 낸다.
// 서로 다른 아이템의 소리는 서로를 끊지 않고 겹쳐서 끝까지 난다(11. 10. 밤 팀 요청 "동시에 여러 개 놓을 수 있게").
// 아이폰이 무음 모드면 사파리의 Web Audio도 소리가 나지 않을 뿐 오류는 없다.
const ITEM_GAP_MS = 150;
const ITEM_VOL = 0.5;
const itemBus = {};
const itemAt = {};

const crunch = (out, at, n, freq, gap, vol) => {
  for (let i = 0; i < n; i++) burst(at + i * gap + (i % 2) * 0.012, 0.05 + (i % 3) * 0.012, freq + (i % 3) * 420, 1.3, vol * (1 - i / (n + 1)), out);
};
const chew = (out, at, n, gap, freq, vol) => {
  for (let i = 0; i < n; i++) {
    tone(170 - i * 8, 105, 0.13, 'sine', vol, out, at + i * gap);
    burst(at + i * gap + 0.01, 0.14, freq, 2.2, vol * 0.8, out);
  }
};
const glug = (out, at, n, gap, from, vol) => {
  for (let i = 0; i < n; i++) {
    const f = from + i * 40;
    tone(f, f * 1.7, 0.08, 'sine', vol, out, at + i * gap);
    burst(at + i * gap, 0.06, f * 2, 3, vol * 0.4, out);
  }
};
const canOpen = (out, at, click, hiss, vol) => {
  burst(at, 0.018, click, 2, vol, out);
  tone(click * 0.45, click * 0.3, 0.035, 'triangle', vol * 0.5, out, at);
  burst(at + 0.03, hiss, 5200, 0.6, vol * 0.7, out);
};
const fizz = (out, at, n, span, vol) => {
  for (let i = 0; i < n; i++) {
    const f = 3000 + ((i * 1733) % 3200);
    tone(f, f * 1.15, 0.025, 'sine', vol, out, at + (span * ((i * 37) % n)) / n);
  }
};

const ITEM_SOUND = {
  // 새우깡: 봉지 속 과자가 바삭하게 부서지는 소리 다섯 번(0.5초)
  shrimp: (o) => crunch(o, 0, 5, 3400, 0.1, 0.45),
  // 마지막처럼: 병뚜껑을 비틀어 따는 소리, 잔에 꼴꼴 따르는 소리(0.9초)
  soju: (o) => { burst(0, 0.05, 2400, 4, 0.35, o); tone(900, 620, 0.06, 'triangle', 0.18, o, 0.02); glug(o, 0.22, 6, 0.1, 320, 0.3); },
  // 오징어땅콩: 바삭한 소리 넷과 봉지 흔드는 소리(0.6초)
  peanut: (o) => { crunch(o, 0, 4, 2400, 0.11, 0.42); burst(0.45, 0.14, 1800, 0.7, 0.12, o); },
  // 노가리: 천천히 질기게 씹는 소리 셋(0.75초)
  nogari: (o) => chew(o, 0, 3, 0.25, 700, 0.32),
  // 드르라: 캔 따는 딸깍과 칙 소리, 탄산 거품(0.9초)
  drrra: (o) => { canOpen(o, 0, 4200, 0.28, 0.4); fizz(o, 0.34, 14, 0.5, 0.05); },
  // 오징어: 쫄깃하게 빠르게 씹는 소리 넷(0.6초)
  squid: (o) => chew(o, 0, 4, 0.15, 1100, 0.3),
  // 몬스타: 조금 낮은 캔 따는 소리와 긴 칙 소리, 탄산(0.95초)
  monster: (o) => { canOpen(o, 0, 3400, 0.36, 0.42); fizz(o, 0.42, 16, 0.5, 0.05); },
  // 별로: 투명한 병에서 꼴꼴 따르는 소리만(0.85초)
  byeollo: (o) => glug(o, 0, 8, 0.1, 360, 0.3),
  // 미획득: 낮게 덜컥 잠긴 소리 두 번(0.5초)
  locked: (o) => { tone(170, 110, 0.14, 'square', 0.12, o); burst(0.005, 0.04, 900, 3, 0.25, o); tone(130, 85, 0.26, 'square', 0.1, o, 0.24); burst(0.245, 0.05, 700, 3, 0.2, o); },
};

function playItemNow(key) {
  const make = ITEM_SOUND[key] || ITEM_SOUND.shrimp;
  const t = ctx.currentTime;
  const old = itemBus[key];
  if (old) {
    old.gain.cancelScheduledValues(t);
    old.gain.setValueAtTime(old.gain.value, t);
    old.gain.linearRampToValueAtTime(0, t + 0.03);
    window.setTimeout(() => old.disconnect(), 80);
  }
  const bus = ctx.createGain();
  bus.gain.value = ITEM_VOL;
  bus.connect(ctx.destination);
  itemBus[key] = bus;
  make(bus);
  window.setTimeout(() => { if (itemBus[key] === bus) { bus.disconnect(); itemBus[key] = null; } }, 1200);
}

// 아이템 소리를 낸다. 키는 itemCopy.js의 아이템 키(shrimp, soju, peanut, nogari, drrra, squid, monster, byeollo)이거나 locked다.
// 8개 아이템은 녹음 파일을 내고, 파일을 못 불러오면 합성 소리를 낸다. 미획득(locked)은 합성 소리 그대로다.
export function playItem(key) {
  if (!AC) return false;
  const now = Date.now();
  if (now - (itemAt[key] || 0) < ITEM_GAP_MS) return false;
  itemAt[key] = now;
  if (!ctx) ctx = new AC();
  const synth = () => { if (ok()) playItemNow(key); };
  if (key !== 'locked' && SOUND_FILES[key]) {
    playSound(key, { channel: itemChannel(key), fallback: synth });
    return true;
  }
  stopChannel(itemChannel(key));
  if (ctx.state === 'running') playItemNow(key);
  else ctx.resume().then(synth);
  return true;
}
// 아이템마다 따로 쓰는 소리 통로 이름. 마이 아이템 누름과 방 착지 소리가 같은 이름을 쓴다(같은 아이템만 앞 소리를 끊는다).
export const itemChannel = (key) => 'item:' + key;
// 마이 화면에 들어오면 아이템 소리 파일 4개(건어물, 과자, 캔, 소주)를 미리 받아 둔다(첫 누름 소리가 늦지 않게). 8개 아이템이 이 4개를 둘씩 함께 쓴다.
export const preloadItemSounds = () => preloadSounds(UNIQUE_SOUND_KEYS);

// ---------- 녹음 파일 재생 ----------
// 파일은 fetch로 받아 decodeAudioData로 풀어 두고(오디오가 아직 잠겨 있어도 풀 수 있다), 부를 때 바로 낸다.
// 통로(channel)마다 소리는 하나만 난다: 같은 소리를 150ms 안에 다시 부르면 무시하고, 새 소리가 오면 앞 소리를 30ms 만에 줄여 끊는다.
// 통로가 다르면 서로 끊지 않는다. 아이템 소리는 아이템마다 통로가 따로라서(itemChannel) 여러 개가 겹쳐 난다. 소리마다 새 AudioBufferSource를 만든다.
// 풀어 둔 소리는 파일 주소 단위로 한 번만 받는다(새우깡과 오징어땅콩처럼 같은 파일을 쓰는 아이템은 같은 버퍼를 함께 쓴다).
// 음량은 0.8이다. 브라우저는 사용자가 화면을 한 번 누르기 전에는 소리를 막는다. 그때 부른 소리는 내지 않고 기록에 blocked로 남긴다.
const SOUND_VOL = 0.8;
const SOUND_GAP_MS = 150;
const SOUND_FADE = 0.03;
const bufs = {};
const loading = {};
const chans = {};
const asked = {};
const ensureCtx = () => { if (!AC) return null; if (!ctx) ctx = new AC(); return ctx; };

// 확인용 기록: 부른 시각, 파일, 오디오 상태, 결과(played, gap, blocked, late, fallback). 개발 도구에서 window.__drrrkSound 로 읽는다.
const soundLog = typeof window !== 'undefined' ? (window.__drrrkSound = window.__drrrkSound || []) : [];
const note = (key, channel, result) => {
  soundLog.push({ t: Math.round(performance.now()), key, file: (SOUND_FILES[key] || '').split('/').pop(), channel, state: ctx ? ctx.state : 'none', result });
  if (soundLog.length > 80) soundLog.shift();
};

export function loadSound(key) {
  const url = SOUND_FILES[key];
  if (!url) return Promise.resolve(null);
  if (bufs[url]) return Promise.resolve(bufs[url]);
  if (loading[url]) return loading[url];
  const c = ensureCtx();
  if (!c) return Promise.resolve(null);
  loading[url] = fetch(url)
    .then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.arrayBuffer(); })
    .then((ab) => new Promise((res, rej) => c.decodeAudioData(ab, res, rej)))
    .then((b) => (bufs[url] = b))
    .catch(() => { loading[url] = null; return null; });
  return loading[url];
}
export const preloadSounds = (keys) => keys.forEach((k) => loadSound(k));

// 통로의 지금 소리를 30ms 만에 줄여 끊는다. 받는 중인 소리도 내지 않게 한다.
export function stopChannel(channel) {
  asked[channel] = null;
  const cur = chans[channel];
  if (!cur || !ctx) return;
  chans[channel] = null;
  cur.stopped = true;
  const t = ctx.currentTime;
  try {
    cur.gain.gain.cancelScheduledValues(t);
    cur.gain.gain.setValueAtTime(cur.gain.gain.value, t);
    cur.gain.gain.linearRampToValueAtTime(0, t + SOUND_FADE);
    cur.src.stop(t + SOUND_FADE + 0.01);
  } catch (e) { /* 이미 끝난 소리 */ }
}

// 소리를 낸다. onEnded는 끝까지 재생되었을 때만 부른다(끊긴 경우는 부르지 않는다). fallback은 파일을 못 불러왔을 때 부른다.
// offset(초)을 주면 파일의 그 지점부터 낸다(앞 무음을 건너뛸 때).
export function playSound(key, { channel = 'item', vol = SOUND_VOL, onEnded, fallback, offset = 0 } = {}) {
  const c = ensureCtx();
  if (!c) { note(key, channel, 'noaudio'); if (fallback) fallback(); return false; }
  const now = performance.now();
  const last = asked[channel];
  if (last && last.key === key && now - last.at < SOUND_GAP_MS) { note(key, channel, 'gap'); return false; }
  const me = { key, at: now };
  asked[channel] = me;
  const start = (buf) => {
    // 받는 동안 같은 통로에 다른 소리가 왔거나 끊으라고 했으면 내지 않는다.
    if (asked[channel] !== me) return;
    if (!buf) { note(key, channel, 'fallback'); if (fallback) fallback(); return; }
    if (c.state !== 'running') { note(key, channel, 'blocked'); return; }
    // 파일을 받는 동안 1.5초가 지나면 늦은 소리가 되므로 내지 않는다.
    if (performance.now() - now > 1500) { note(key, channel, 'late'); return; }
    const prev = chans[channel];
    if (prev) { asked[channel] = null; stopChannel(channel); asked[channel] = me; }
    const src = c.createBufferSource();
    src.buffer = buf;
    const gain = c.createGain();
    gain.gain.value = vol;
    src.connect(gain).connect(c.destination);
    const playing = { key, src, gain, stopped: false };
    chans[channel] = playing;
    src.onended = () => {
      if (chans[channel] === playing) chans[channel] = null;
      if (!playing.stopped && onEnded) onEnded();
    };
    src.start(0, Math.max(0, Math.min(offset, buf.duration - 0.05)));
    note(key, channel, 'played');
  };
  const go = (buf) => (c.state === 'running' ? start(buf) : c.resume().then(() => start(buf), () => start(buf)));
  const ready = bufs[SOUND_FILES[key]];
  if (ready) go(ready);
  else loadSound(key).then(go);
  return true;
}
export const channelBusy = (channel) => !!chans[channel];
// 확인용: 지금 오디오 상태와 아이템 소리 묶음이 살아 있는지
export const itemAudioState = () => ({ state: ctx ? ctx.state : 'none', busy: Object.values(itemBus).some(Boolean) });

export const sfx = {
  pick: () => tone(520, 760, 0.09, 'sine', 0.14),
  tick: () => tone(980, 980, 0.035, 'triangle', 0.05),
  // 던지는 소리: 바람 가르는 짧은 소리
  throw: () => { burst(0, 0.16, 1800, 0.8, 0.07); tone(420, 220, 0.16, 'sine', 0.05); },
  // 바삭하게 떨어지는 소리: 잘게 부서지는 소리 세 번과 바닥에 닿는 낮은 소리
  land: () => { tone(150, 62, 0.12, 'sine', 0.2); burst(0.02, 0.06, 3200, 1.4, 0.2); burst(0.08, 0.05, 2600, 1.6, 0.16); burst(0.14, 0.07, 3600, 1.2, 0.13); },
  miss: () => tone(320, 170, 0.14, 'sine', 0.1),
  pop: () => tone(660, 1040, 0.08, 'sine', 0.13),
  on: () => { tone(440, 660, 0.1, 'sine', 0.12); tone(660, 880, 0.1, 'sine', 0.1); },
  off: () => tone(660, 330, 0.12, 'sine', 0.11),
  deny: () => { tone(220, 160, 0.1, 'square', 0.04); },
};
