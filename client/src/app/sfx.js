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

function tone(from, to, dur, type, vol) {
  if (!ok()) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(30, to), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function burst(at, dur, freq, q, vol) {
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
  s.connect(f).connect(g).connect(ctx.destination);
  s.start(t);
}

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
