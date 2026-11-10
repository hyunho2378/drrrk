// 방 대사 녹음. 함께 드르륵 방에서 내 말풍선(파란 말풍선, data-figma "내 채팅")이 나타날 때 같은 대사의 녹음을 낸다(11. 10. 팀 음성 파일).
// 짝: "아니 오늘 나 뭔일 있었냐면"은 무슨 일이 있었냐면.mp3(voice-museun-il), "나만 예민한 거 아니지?"는 나만예민한거아니지.mp3(voice-naman-yemin).
// 무슨 일이 있었냐면은 앞 0.9초가 무음이라 0.9초 지점부터 재생해 말풍선이 나타나는 순간 목소리가 바로 나온다. 나만 예민한은 처음부터 재생한다.
// (11. 10. 팀 요청 "보이스 중에 들어봐봐 보이스만 넣고 개킹받아 부분 빼기"로 개킹받아 최종 녹음은 뺐다.)
// 내는 조건: 방 화면이 보이고, 방 온보딩 덮개가 없고, 내 마이크가 꺼짐(빨강)이 아닐 때. 말풍선이 새로 나타나는 한 번에 한 번만 낸다.
// 말풍선이 온보딩 덮개 아래에서 나타나면 덮개가 닫힐 때까지 기다렸다가 낸다. 재생 중에 덮개가 뜨거나, 마이크를 끄거나, 방을 나가면 멈춘다.
// 말하는 표시(초록 바와 테두리)는 나에게 붙이지 않는다(기존 규칙). 이 모듈은 소리만 낸다.
// iOS RoomView.swift의 RoomVoice와 같은 규칙이다.
import { playSound, stopChannel, preloadSounds } from './sfx.js';
import { micState } from './room.js';

const VOICE_LINES = [
  { text: '아니 오늘 나 뭔일 있었냐면', keys: ['voiceMuseun'], offset: 0.9 },
  { text: '나만 예민한 거 아니지?', keys: ['voiceNaman'], offset: 0 },
];
const NEXT_GAP_MS = 400;
const WAIT_MAX_MS = 120000;
const CH = 'voice';
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();

let curScene = null;
let token = 0;
let watch = 0;
let nextTimer = 0;
// 확인용 기록(window.__drrrkVoice): 말풍선이 나타난 일, 기다림, 낸 소리, 멈춤과 그 이유.
const vlog = typeof window !== 'undefined' ? (window.__drrrkVoice = window.__drrrkVoice || []) : [];
const note = (ev, extra) => { vlog.push(Object.assign({ t: Math.round(performance.now()), ev }, extra)); if (vlog.length > 60) vlog.shift(); };

const onboardingUp = () => !!document.querySelector('[data-figma="방 온보딩"]');
function micOff(root) {
  const m = micState();
  if (m && (m.muted || m.denied)) return true;
  // 마이크 끔 화면(31)은 같은 자리에 버튼이 둘 겹쳐 있고 위의 빨강 버튼이 보인다. 보이는 빨강 버튼이 하나라도 있으면 꺼짐이다.
  if (!root) return false;
  return [...root.querySelectorAll('[data-figma="btn_마이크 상태"]')].some((b) => b.dataset.kind === 'off' && b.getClientRects().length > 0);
}
// 지금 낼 수 없는 이유. 없으면 빈 글.
function blockOf(root, scene) {
  if (!root || !root.isConnected) return 'gone';
  if (!scene || curScene !== scene) return 'left';
  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return 'hidden';
  if (micOff(root)) return 'mic';
  if (onboardingUp()) return 'onboarding';
  return '';
}

export function stopVoice(why) {
  token++;
  window.clearInterval(watch);
  window.clearTimeout(nextTimer);
  watch = 0;
  stopChannel(CH);
  if (why) note('stop', { why });
}

// 화면이 붙을 때마다 부른다(live.js attach). scene은 방 묶음 이름(A, B, C, W)이고 방이 아니면 null이다.
export function voiceOnScreen(n, scene) {
  if (scene !== curScene && (watch || nextTimer)) stopVoice('screen ' + n);
  curScene = scene;
  if (scene) preloadSounds(['voiceMuseun', 'voiceNaman']);
}

// 말풍선 하나가 나타날 때 부른다(live.js staggerChat). 내 말풍선이 아니거나 대사 짝이 없으면 아무것도 하지 않는다.
export function voiceOnBubble(el, root) {
  if (!el || !el.matches || !el.matches('[data-figma^="내 채팅"], [data-figma^="Chat Bubble · 나"]')) return;
  if (el.dataset.voiced || getComputedStyle(el).display === 'none') return;
  const line = VOICE_LINES.find((v) => v.text === norm(el.textContent));
  if (!line) return;
  el.dataset.voiced = '1';
  const scene = curScene;
  stopVoice();
  const my = token;
  const startedAt = performance.now();
  note('bubble', { text: line.text, scene });
  let step = -1;
  let waited = false;
  const playStep = (i) => {
    step = i;
    playSound(line.keys[i], {
      channel: CH,
      offset: i === 0 ? line.offset || 0 : 0,
      onEnded: () => {
        if (my !== token) return;
        if (i + 1 >= line.keys.length) { window.clearInterval(watch); watch = 0; note('done'); return; }
        nextTimer = window.setTimeout(() => {
          nextTimer = 0;
          if (my !== token) return;
          const why = blockOf(root, scene);
          if (why) { stopVoice(why); return; }
          playStep(i + 1);
        }, NEXT_GAP_MS);
      },
    });
    note('play', { key: line.keys[i], offset: i === 0 ? line.offset || 0 : 0, at: Math.round(performance.now()) });
  };
  const check = () => {
    if (my !== token) return;
    const why = blockOf(root, scene);
    if (step < 0) {
      // 아직 내지 않았다. 덮개나 숨은 탭이 막고 있으면 기다리고, 다른 이유면 이번 말풍선은 소리 없이 넘긴다.
      if (!why) { playStep(0); return; }
      if ((why === 'onboarding' || why === 'hidden') && performance.now() - startedAt < WAIT_MAX_MS) { if (!waited) { waited = true; note('wait', { why }); } return; }
      stopVoice('skip ' + why);
      return;
    }
    if (why) stopVoice(why);
  };
  watch = window.setInterval(check, 250);
  check();
}
