// 말한 내용 받아쓰기(11/11 밤 사용자 결정: "1초 뒤에 파란 말풍선으로 올라가게").
// 마이크가 켜져 있고(room.js micState: live 이고 muted 아님) 브라우저 음성 인식이 있으면 함께 드르륵 방 입력칸에 말한 글이 실시간으로 채워지고,
// 1.0초 동안 새 결과가 없으면 입력줄 보내기와 같은 경로(live.js attachInputs 의 send)로 내 파란 말풍선이 된다.
// 엔진이 스스로 끝나면 300ms 뒤 다시 듣는다(연속 실패 3번이면 조용히 멈춤). 인식만 하고 소리 재생(방 입장 영상, 대사 녹음, 주전부리 소리)과는 엮지 않는다.
//
// 마이크가 켜진 채 남지 않게(11/11 밤 사용자 지시 "음성만 계속 켜져 있거나 그러면 안 됨", QR 로 들어오는 아이폰 사파리와 갤럭시 삼성 인터넷, 크롬 기준):
// 받아쓰기와 마이크 입력은 사용자가 마이크 버튼을 누른 뒤에만 시작하고, 아래 경우 바로 엔진 abort 와 모든 track.stop 으로 놓는다.
//   mic-off 마이크 버튼으로 끔, leave 방 화면을 떠남(방 위 시트는 받아쓰기만 잠시 멈춤 pause), hidden 페이지 숨김(visibilitychange, pagehide),
//   room-end 방 시간이 끝나 종료로 감, idle 말 없음 tokens.js live.dictIdleSec(30초), safari-restart-fail 사파리에서 누름 없이 다시 시작이 안 됨.
// 페이지가 다시 보여도 저절로 켜지지 않는다. 사용자가 버튼을 다시 눌러야 켜진다.
import { micState, micHooks, releaseMic, openMic, toast } from './room.js';
import { live as LIVE } from '../tokens.js';

const SILENCE_MS = 1000;
const RESTART_MS = 300;
const MAX_FAILS = 3;
const DUP_MS = 4000;
const BAR = '[data-figma="input/속성 14"]';

const st = {
  root: null, input: null, rec: null, want: false, sid: 0,
  base: 0, text: '', timer: 0, restart: 0, fails: 0, gaveUp: false,
  hadResult: false, results: 0, lastSent: '', lastAt: 0, pending: '',
  // auto: 누름 없이 다시 시작한 엔진(사파리 규칙), wasOn: 지난 sync 때 마이크가 켜져 있었는지, lastAct: 마지막으로 말한 시각.
  auto: false, wasOn: false, lastAct: 0, idle: 0, lastRoot: null,
};

const log = (type, extra) => {
  if (typeof window === 'undefined') return;
  const list = window.__drrrkDictation || (window.__drrrkDictation = []);
  list.push(Object.assign({ t: Math.round(performance.now()), type }, extra || {}));
  if (list.length > 400) list.splice(0, list.length - 400);
};

// 시험용 가짜 엔진은 개발 서버에서만 받는다(window.__drrrkDictationFake 에 생성자를 넣는다).
const Ctor = () => {
  if (typeof window === 'undefined') return null;
  if (import.meta.env.DEV && window.__drrrkDictationFake !== undefined) return window.__drrrkDictationFake || null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};
export const dictationSupported = () => !!Ctor();

// 아이폰 사파리(아이폰 카메라 QR 은 사파리로 연다)와 맥 사파리. 아이폰의 다른 브라우저도 같은 WebKit 엔진이라 같은 규칙을 쓴다.
// 안드로이드(크롬, 삼성 인터넷)는 UA 에 Android 가 있어 여기서 빠진다.
export function isSafari() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/Android/i.test(ua)) return false;
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|SamsungBrowser|Firefox|FxiOS/i.test(ua);
}
// 사파리에서는 받아쓰기가 마이크 입력을 혼자 맡는다(room.js 가 getUserMedia 스트림을 열지 않는다). 사파리 음성 인식은 누름 안에서
// start 해야 하고, 같은 페이지에서 getUserMedia 와 음성 인식이 함께 마이크를 잡으면 WebKit 이 한쪽 입력을 끊을 수 있어서다.
// 음량 측정(mic.speaking)은 화면에서 쓰는 곳이 없어 받아쓰기 결과 시각으로 대신한다.
micHooks.ownsMic = () => isSafari() && !!Ctor();

const micOn = () => { const m = micState(); return !!(m && m.live && !m.muted && !m.denied); };

// ---------- 입력칸 ----------
const userOwns = (input) => !!(input && input.value && input.dataset.dict !== '1');
function placeholderOf(input) {
  const field = input && input.parentElement;
  return field ? field.querySelector('p[data-outline]') : null;
}
function writeInput(text) {
  const input = st.input;
  if (!input || !input.isConnected) return false;
  if (userOwns(input)) { st.pending = text; return false; }
  st.pending = '';
  input.__dictWriting = true;
  input.value = text;
  input.dataset.dict = text ? '1' : '';
  // live.js 의 input 처리가 자리 표시 글을 숨기고 되살린다.
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.__dictWriting = false;
  const ph = placeholderOf(input);
  if (ph) ph.style.opacity = text ? '0' : '';
  return true;
}
function clearDictText() {
  st.text = '';
  st.pending = '';
  window.clearTimeout(st.timer);
  if (st.input && st.input.dataset.dict === '1') writeInput('');
}

function bindInput(input) {
  if (!input || input.__dictBound) return;
  input.__dictBound = true;
  input.addEventListener('input', () => {
    if (input.__dictWriting) return;
    // 사용자가 직접 친 글이면 받아쓰기 글이 아니다. 칸이 비면 기다리던 받아쓰기 글을 다시 쓴다.
    input.dataset.dict = '';
    if (!input.value && st.input === input && (st.pending || st.text)) {
      writeInput(st.pending || st.text);
      if (st.text) armSilence();
    }
  });
}

// ---------- 보내기 ----------
function commit() {
  const text = st.text.trim();
  if (!text) { st.text = ''; return; }
  const input = st.input;
  if (!input || !input.isConnected || typeof input.__send !== 'function') return;
  if (userOwns(input)) { st.pending = st.text; log('wait-typing', { text }); return; }
  st.base = st.results;
  st.text = '';
  if (text === st.lastSent && performance.now() - st.lastAt < DUP_MS) {
    log('dup', { text });
    writeInput('');
    return;
  }
  st.lastSent = text;
  st.lastAt = performance.now();
  writeInput(text);
  input.__send();
  input.dataset.dict = '';
  log('sent', { text });
}
function armSilence() {
  window.clearTimeout(st.timer);
  st.timer = window.setTimeout(commit, SILENCE_MS);
}

// ---------- 엔진 ----------
function onResult(e) {
  st.hadResult = true;
  st.fails = 0;
  st.auto = false;
  markSpoke();
  const res = e.results;
  st.results = res.length;
  let text = '';
  let fin = true;
  for (let i = st.base; i < res.length; i++) {
    const r = res[i];
    text += (r[0] && r[0].transcript) || '';
    if (!r.isFinal) fin = false;
  }
  text = text.replace(/\s+/g, ' ').replace(/^\s+/, '');
  if (!text.trim()) return;
  // 이미 보낸 문장이 다시 최종으로 오면(엔진 재시작 뒤 같은 결과) 무시한다.
  if (fin && text.trim() === st.lastSent && performance.now() - st.lastAt < DUP_MS) { st.base = res.length; log('dup', { text: text.trim() }); return; }
  st.text = text;
  log(fin ? 'final' : 'interim', { text: text.trim() });
  writeInput(text);
  armSilence();
}

function startEngine(auto) {
  const C = Ctor();
  if (!C || st.rec || st.gaveUp) return;
  const safari = isSafari();
  let rec;
  try {
    rec = new C();
    rec.lang = 'ko-KR';
    // 안드로이드 크롬과 삼성 인터넷은 연속 듣기에서 앞 문장 결과가 다음 결과에 겹쳐 다시 들어온다("안녕" 다음에 "안녕안녕하세요").
    // 안드로이드에서는 한 문장씩 듣고 끝나면 다시 시작한다(onend 다시 시작 규칙을 그대로 쓴다). 사파리와 데스크톱 크롬은 연속으로 듣는다.
    rec.continuous = !/Android/i.test(navigator.userAgent || '');
    rec.interimResults = true;
    rec.maxAlternatives = 1;
  } catch (e) { if (safari) { safariFail(!!auto, 'create'); return; } fail('create'); return; }
  const sid = ++st.sid;
  st.rec = rec;
  st.base = 0;
  st.results = 0;
  st.hadResult = false;
  st.auto = !!auto;
  let errored = '';
  rec.onresult = (e) => { if (sid === st.sid) onResult(e); };
  rec.onerror = (e) => {
    if (sid !== st.sid) return;
    errored = (e && e.error) || 'error';
    log('error', { error: errored });
    // 권한 거부는 받아쓰기 없이 마이크만 켜진 상태로 둔다.
    if (errored === 'not-allowed' || errored === 'service-not-allowed' || errored === 'language-not-supported') st.gaveUp = true;
  };
  rec.onend = () => {
    if (sid !== st.sid) return;
    st.rec = null;
    const real = errored && errored !== 'no-speech' && errored !== 'aborted';
    if (safari) {
      log('end', { error: errored || undefined, auto: st.auto || undefined });
      // 사파리: 결과 없이 오류로 끝나면 누름 안의 첫 시작은 받아쓰기 없는 마이크로 넘기고, 누름 없는 다시 시작은 마이크를 끈다.
      if (real && !st.hadResult) { safariFail(st.auto, errored); return; }
      st.gaveUp = false;
      if (st.want) {
        window.clearTimeout(st.restart);
        st.restart = window.setTimeout(() => { if (st.want && !st.rec) { log('restart'); startEngine(true); } }, RESTART_MS);
      }
      return;
    }
    // 말 없음(no-speech)과 중단(aborted)은 실패로 세지 않는다.
    if (real && !st.hadResult) st.fails++;
    log('end', { error: errored || undefined, fails: st.fails });
    if (st.fails >= MAX_FAILS) { st.gaveUp = true; log('giveup'); }
    if (st.want && !st.gaveUp) {
      window.clearTimeout(st.restart);
      st.restart = window.setTimeout(() => { if (st.want && !st.rec) { log('restart'); startEngine(true); } }, RESTART_MS);
    }
  };
  try {
    rec.start();
    log('start', { sid, auto: !!auto || undefined, continuous: rec.continuous });
  } catch (e) {
    st.rec = null;
    st.sid++;
    if (safari) { safariFail(!!auto, 'start'); return; }
    fail('start');
  }
}
// 사파리에서 받아쓰기가 실패했다. 누름 없이 다시 시작한 엔진이면 받아쓰기를 멈추고 마이크 버튼을 꺼짐으로 바꾼다(규칙 4).
// 누름 안의 첫 시작이 실패하면(음성 인식 권한 거부, Siri 와 받아쓰기 꺼짐) 받아쓰기 없이 getUserMedia 마이크로 이어 간다(마이크와 채팅은 그대로).
function safariFail(auto, error) {
  st.gaveUp = true;
  log('halt', { why: auto ? 'safari-restart-fail' : 'safari-start-fail', error });
  stopEngine(auto ? 'safari-restart-fail' : 'safari-start-fail');
  if (auto) { releaseMic('safari-restart-fail', true); return; }
  const m = micState();
  m.viaDict = false;
  log('fallback-mic', { error });
  openMic(st.root || st.lastRoot, false);
}
function fail(where) {
  st.fails++;
  log('error', { error: where, fails: st.fails });
  if (st.fails >= MAX_FAILS) { st.gaveUp = true; log('giveup'); return; }
  window.clearTimeout(st.restart);
  st.restart = window.setTimeout(() => { if (st.want && !st.rec) { log('restart'); startEngine(true); } }, RESTART_MS);
}
function stopEngine(why) {
  window.clearTimeout(st.restart);
  const rec = st.rec;
  st.rec = null;
  st.sid++;
  if (rec) {
    try { rec.onresult = null; rec.onend = null; rec.onerror = null; rec.abort(); } catch (e) { /* 이미 멈춤 */ }
    log('stop', { why });
  }
  clearDictText();
}

// ---------- 말 없음과 마이크 놓기 ----------
const idleMs = () => (Number(LIVE.dictIdleSec) || 30) * 1000;
let spokeTimer = 0;
// 말했다(받아쓰기 결과). 사파리처럼 음량 측정 스트림이 없을 때 mic.speaking 을 결과 시각으로 대신한다.
function markSpoke() {
  st.lastAct = performance.now();
  const m = micState();
  if (m.viaDict) {
    m.speaking = true;
    window.clearTimeout(spokeTimer);
    spokeTimer = window.setTimeout(() => { m.speaking = false; }, 600);
  }
}
function idleTick() {
  const m = micState();
  if (!micOn()) { window.clearInterval(st.idle); st.idle = 0; return; }
  // 받아쓰기가 돌지 않을 때(지원 안 함, 권한 거부, 시트로 잠시 멈춤)는 음량 측정(mic.speaking)으로 말했는지 본다.
  if (!st.rec && m.speaking && !m.viaDict) st.lastAct = performance.now();
  if (performance.now() - st.lastAct < idleMs()) return;
  const root = (st.root && st.root.isConnected) ? st.root : (st.lastRoot && st.lastRoot.isConnected ? st.lastRoot : null);
  log('idle', { sec: idleMs() / 1000 });
  stopEngine('idle');
  releaseMic('idle', true);
  if (root) toast(root, LIVE.micMutedText);
}
// 받아쓰기와 마이크를 함께 놓는다. muted 가 true 면 마이크 버튼이 꺼짐(빨강)으로 남는다.
function hardStop(why, muted) {
  const m = micState();
  // 아무것도 켜져 있지 않으면 권한 창이 떠 있는 중일 수 있다. 뒤늦게 받은 스트림도 놓도록 표시만 한다(room.js startMic).
  if (!m.live && !m.stream && !st.rec) {
    m.why = 'abandon';
    // 끈 채로 방을 떠나면(leave, room-end) 다음 방은 처음 상태(생성 화면 버튼 모양, 듣지 않음)로 시작한다.
    if (!muted && m.muted) { m.muted = false; m.denied = false; window.dispatchEvent(new Event('drrrk:mic')); }
    return false;
  }
  log('halt', { why });
  stopEngine(why);
  releaseMic(why, muted);
  return true;
}
// 방 시간이 끝나 종료 화면으로 갈 때 live.js tick 이 부른다.
export function endDictation(why) { return hardStop(why || 'room-end', false); }

function sync() {
  const on = micOn();
  if (on && !st.wasOn) {
    // 사용자가 마이크를 켰다. 지난번 실패 기록을 지우고 말 없음 시계를 지금부터 센다.
    st.lastAct = performance.now();
    st.fails = 0;
    st.gaveUp = false;
    window.clearInterval(st.idle);
    st.idle = window.setInterval(idleTick, 250);
  }
  if (!on && st.idle) { window.clearInterval(st.idle); st.idle = 0; }
  st.wasOn = on;
  const want = !!(st.input && st.input.isConnected && on && Ctor() && !st.gaveUp);
  st.want = want;
  if (want && !st.rec) startEngine(false);
  else if (!want && st.rec) stopEngine(on ? 'pause' : (micState().why || 'mic-off'));
  else if (!want) clearDictText();
}

if (typeof window !== 'undefined' && !window.__drrrkDictationBound) {
  window.__drrrkDictationBound = true;
  window.addEventListener('drrrk:mic', sync);
  // 페이지가 숨겨지면(다른 앱, 화면 꺼짐, 탭 전환) 바로 놓는다. 다시 보여도 저절로 켜지지 않는다(버튼은 꺼짐으로 남는다).
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') hardStop('hidden', true); });
  window.addEventListener('pagehide', () => hardStop('hidden', true));
  window.__drrrkDictationState = () => ({ want: st.want, running: !!st.rec, text: st.text, fails: st.fails, gaveUp: st.gaveUp, supported: dictationSupported(), safari: isSafari(), mic: (({ live, muted, denied, viaDict }) => ({ live, muted, denied, viaDict, stream: !!micState().stream }))(micState()) });
  // 시험용: 가짜 엔진을 바꿔 끼운 뒤 실패 기록을 지우고 다시 맞춘다(개발 서버 전용).
  if (import.meta.env.DEV) window.__drrrkDictationReset = () => { stopEngine('reset'); st.fails = 0; st.gaveUp = false; st.lastSent = ''; st.lastAt = 0; sync(); };
}

// 방 화면이 보일 때(live.js attach) 부른다. 입력줄(BAR) 안 실제 입력칸과 마이크 버튼이 있는 방 화면이면 그 칸에 붙고, 아니면 멈춘다.
export function attachDictation(root, inRoom) {
  const input = inRoom && root ? Array.from(root.querySelectorAll(BAR + ' input.live-input')).find((el) => typeof el.__send === 'function') : null;
  const hasMic = !!(root && root.querySelector('[data-figma="btn_마이크 상태"]'));
  if (!inRoom) {
    // 방 화면을 떠났다(뒤로, 다른 화면, 종료 리포트). 받아쓰기와 마이크를 모두 놓고 다음 방은 처음 상태로 시작한다.
    st.root = null;
    st.input = null;
    st.lastRoot = null;
    hardStop('leave', false);
    sync();
    return;
  }
  if (!input || !hasMic) {
    // 방 위 시트(미니프로필 등)나 입력줄이 아직 없는 같은 방 화면: 받아쓰기만 잠시 멈추고 마이크는 둔다.
    st.root = null;
    st.input = null;
    sync();
    return;
  }
  const moved = st.input && st.input !== input;
  const keep = st.text;
  st.root = root;
  st.lastRoot = root;
  st.input = input;
  bindInput(input);
  // 같은 방 안에서 화면이 바뀌면(현장 모드와 일반 모드) 말하던 글을 새 입력칸으로 옮긴다.
  if (moved && keep) writeInput(keep);
  sync();
}
