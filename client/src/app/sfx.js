// 효과음. 소리 파일 없이 브라우저 오디오(Web Audio)로 짧게 만든다. 첫 터치 때 켜지고(사파리 규칙), 소리 크기는 작게 둔다.
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
// 사용자가 누를 때만 부른다. 150ms 안에 다시 누르면 무시하고, 그보다 늦게 누르면 앞 소리를 30ms 만에 줄여 끊은 뒤 새로 낸다(겹쳐 쌓이지 않는다).
// 아이폰이 무음 모드면 사파리의 Web Audio도 소리가 나지 않을 뿐 오류는 없다.
const ITEM_GAP_MS = 150;
const ITEM_VOL = 0.5;
let itemBus = null;
let itemAt = 0;

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
  if (itemBus) {
    const old = itemBus;
    old.gain.cancelScheduledValues(t);
    old.gain.setValueAtTime(old.gain.value, t);
    old.gain.linearRampToValueAtTime(0, t + 0.03);
    window.setTimeout(() => old.disconnect(), 80);
  }
  const bus = ctx.createGain();
  bus.gain.value = ITEM_VOL;
  bus.connect(ctx.destination);
  itemBus = bus;
  make(bus);
  window.setTimeout(() => { if (itemBus === bus) { bus.disconnect(); itemBus = null; } }, 1200);
}

// 아이템 소리를 낸다. 키는 itemCopy.js의 아이템 키(shrimp, soju, peanut, nogari, drrra, squid, monster, byeollo)이거나 locked다.
export function playItem(key) {
  if (!AC) return false;
  const now = Date.now();
  if (now - itemAt < ITEM_GAP_MS) return false;
  itemAt = now;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'running') playItemNow(key);
  else ctx.resume().then(() => { if (ok()) playItemNow(key); });
  return true;
}
// 확인용: 지금 오디오 상태와 아이템 소리 묶음이 살아 있는지
export const itemAudioState = () => ({ state: ctx ? ctx.state : 'none', busy: !!itemBus });

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
