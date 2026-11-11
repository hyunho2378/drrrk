// 말한 내용 받아쓰기(11/11 밤 사용자 결정: "1초 뒤에 파란 말풍선으로 올라가게").
// 마이크가 켜져 있고(room.js micState: live 이고 muted 아님) 브라우저 음성 인식이 있으면 함께 드르륵 방 입력칸에 말한 글이 실시간으로 채워지고,
// 1.0초 동안 새 결과가 없으면 입력줄 보내기와 같은 경로(live.js attachInputs 의 send)로 내 파란 말풍선이 된다.
// 마이크를 끄면 바로 멈추고 진행 중인 글은 버린다. 엔진이 스스로 끝나면 300ms 뒤 다시 듣는다(연속 실패 3번이면 조용히 멈춤).
// 인식만 하고 소리 재생(방 입장 영상, 대사 녹음, 주전부리 소리)과는 엮지 않는다.
import { micState } from './room.js';

const SILENCE_MS = 1000;
const RESTART_MS = 300;
const MAX_FAILS = 3;
const DUP_MS = 4000;
const BAR = '[data-figma="input/속성 14"]';

const st = {
  root: null, input: null, rec: null, want: false, sid: 0,
  base: 0, text: '', timer: 0, restart: 0, fails: 0, gaveUp: false,
  hadResult: false, results: 0, lastSent: '', lastAt: 0, pending: '',
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

function startEngine() {
  const C = Ctor();
  if (!C || st.rec || st.gaveUp) return;
  let rec;
  try {
    rec = new C();
    rec.lang = 'ko-KR';
    // 안드로이드 크롬은 연속 듣기에서 앞 문장 결과가 다음 결과에 겹쳐 다시 들어온다("안녕" 다음에 "안녕안녕하세요").
    // 안드로이드에서는 한 문장씩 듣고 끝나면 다시 시작한다(onend 다시 시작 규칙을 그대로 쓴다).
    rec.continuous = !/Android/i.test(navigator.userAgent || '');
    rec.interimResults = true;
    rec.maxAlternatives = 1;
  } catch (e) { fail('create'); return; }
  const sid = ++st.sid;
  st.rec = rec;
  st.base = 0;
  st.results = 0;
  st.hadResult = false;
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
    // 말 없음(no-speech)과 중단(aborted)은 실패로 세지 않는다.
    if (errored && errored !== 'no-speech' && errored !== 'aborted' && !st.hadResult) st.fails++;
    log('end', { error: errored || undefined, fails: st.fails });
    if (st.fails >= MAX_FAILS) { st.gaveUp = true; log('giveup'); }
    if (st.want && !st.gaveUp) {
      window.clearTimeout(st.restart);
      st.restart = window.setTimeout(() => { if (st.want && !st.rec) { log('restart'); startEngine(); } }, RESTART_MS);
    }
  };
  try {
    rec.start();
    log('start', { sid });
  } catch (e) {
    st.rec = null;
    fail('start');
  }
}
function fail(where) {
  st.fails++;
  log('error', { error: where, fails: st.fails });
  if (st.fails >= MAX_FAILS) { st.gaveUp = true; log('giveup'); return; }
  window.clearTimeout(st.restart);
  st.restart = window.setTimeout(() => { if (st.want && !st.rec) { log('restart'); startEngine(); } }, RESTART_MS);
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

function sync() {
  const want = !!(st.input && st.input.isConnected && micOn() && Ctor() && !st.gaveUp);
  st.want = want;
  if (want && !st.rec) startEngine();
  else if (!want && st.rec) stopEngine(micOn() ? 'leave' : 'mic-off');
  else if (!want) clearDictText();
}

if (typeof window !== 'undefined' && !window.__drrrkDictationBound) {
  window.__drrrkDictationBound = true;
  window.addEventListener('drrrk:mic', sync);
  window.__drrrkDictationState = () => ({ want: st.want, running: !!st.rec, text: st.text, fails: st.fails, gaveUp: st.gaveUp, supported: dictationSupported() });
  // 시험용: 가짜 엔진을 바꿔 끼운 뒤 실패 기록을 지우고 다시 맞춘다(개발 서버 전용).
  if (import.meta.env.DEV) window.__drrrkDictationReset = () => { stopEngine('reset'); st.fails = 0; st.gaveUp = false; st.lastSent = ''; st.lastAt = 0; sync(); };
}

// 방 화면이 보일 때(live.js attach) 부른다. 입력줄(BAR) 안 실제 입력칸과 마이크 버튼이 있는 방 화면이면 그 칸에 붙고, 아니면 멈춘다.
export function attachDictation(root, inRoom) {
  const input = inRoom && root ? Array.from(root.querySelectorAll(BAR + ' input.live-input')).find((el) => typeof el.__send === 'function') : null;
  const hasMic = !!(root && root.querySelector('[data-figma="btn_마이크 상태"]'));
  if (!input || !hasMic) {
    st.root = null;
    st.input = null;
    sync();
    return;
  }
  const moved = st.input && st.input !== input;
  const keep = st.text;
  st.root = root;
  st.input = input;
  bindInput(input);
  // 같은 방 안에서 화면이 바뀌면(현장 모드와 일반 모드) 말하던 글을 새 입력칸으로 옮긴다.
  if (moved && keep) writeInput(keep);
  sync();
}
