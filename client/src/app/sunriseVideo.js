// 해 뜨는 단계(40 "DRRRK · 드르륵 · 해뜨기")의 배경 영상. 11/10 팀 요청 "함께드르륵 해뜰 때 영상으로 나오면 좋겠다"와 피그마 댓글(1647:24788 "해뜨기 영상으로 넣기").
// 쌍밍아웃은 sunrise-ssang.mp4(피그마 1647:24788 영상), 사진보정은 sunrise-photo.mp4(피그마 1979:27780, 2100:24394 영상)이다. 둘 다 무음 24fps 5.17초.
// 방에 들어오면 영상 요소를 미리 만들어 받아 두고(preload auto), 40이 뜨면 그 요소를 장면 그림 바로 위(상태바와 채팅 아래)에 넣어 처음부터 한 번 재생한다.
// 첫 장면이 그려지는 순간 영상은 옅게 나타나고 장면 그림은 옅어진다(tokens.js live.sunriseFadeMs). 끝나면 마지막 장면에서 멈춘다(반복 없음).
// 재생이 막히거나 파일을 못 받으면 영상을 빼고 장면 그림을 그대로 둔다. 다른 화면으로 가면 멈추고 뺀다. iOS SunriseVideo.swift와 같은 동작이다.
import { live as LIVE } from '../tokens.js';
import { roomStory } from './roomConcern.js';

const SCREEN = 40;
const cache = {};
// 확인용 기록(개발 서버에서 window.__sunrise로 읽는다).
const log = [];
if (typeof window !== 'undefined') window.__sunrise = { log, el: () => active && active.video };

let active = null;

const storyKey = () => (roomStory() === 'photo' ? 'photo' : 'ssang');
const urlOf = (key) => new URL('assets/' + LIVE.sunriseVideo[key], document.baseURI).href;

function videoFor(key) {
  if (cache[key]) return cache[key];
  const v = document.createElement('video');
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
  v.loop = false;
  v.preload = 'auto';
  v.setAttribute('muted', '');
  v.setAttribute('playsinline', '');
  v.setAttribute('aria-hidden', 'true');
  v.setAttribute('data-figma', 'sunrise video');
  v.src = urlOf(key);
  v.load();
  cache[key] = v;
  return v;
}

// 영상이 아직 돌고 있거나 끝난 뒤 마지막 장면에 머무는 중이면 true. 종료(1)로 넘어가는 단계는 이 값이 false가 될 때까지 기다린다(live.js tick).
// 방 구경에서 이어받은 시계가 이미 01:12 아래여서 영상이 늦게 시작해도 끝까지 보이고 마지막 장면이 live.sunHoldMs 동안 남는다.
export function sunriseHolding(now = performance.now()) {
  if (!active || active.failed) return false;
  // 받기가 멈춰 끝나지 않는 영상은 영상 길이(5.17초)와 머무는 시간을 더한 만큼만 기다린다.
  if (!active.endedAt) return now - active.startAt < 5170 + LIVE.sunHoldMs;
  return now - active.endedAt < LIVE.sunHoldMs;
}

// 방에 들어올 때 부른다. 지금 이야기의 영상을 받아 둔다.
export function prefetchSunrise() {
  try { videoFor(storyKey()); } catch (e) { void e; }
}

function stop() {
  if (!active) return;
  const { video, scene } = active;
  active = null;
  try { video.pause(); } catch (e) { void e; }
  video.onended = null;
  video.onerror = null;
  if (video.parentNode) video.parentNode.removeChild(video);
  if (scene && scene.isConnected) scene.style.opacity = '';
  log.push({ ev: 'stop', t: performance.now() });
}

// 화면이 붙을 때마다 부른다(live.js attach). 40이면 재생하고, 다른 화면이면 멈춘다.
export function attachSunrise(root, n) {
  if (n !== SCREEN) { stop(); return; }
  if (!root) return;
  if (active && active.root === root) return;
  stop();
  // 장면 그림 칸(scene.js swapScene이 바꾼 "image 1208091463").
  const scene = [...root.children].slice(0, 4).find((c) => /^image /.test(c.dataset.figma || '')) || root.firstElementChild;
  if (!scene) return;
  const key = storyKey();
  const video = videoFor(key);
  Object.assign(video.style, {
    position: 'absolute', left: '0px', top: '0px', width: '390px', height: '844px',
    objectFit: 'cover', objectPosition: 'center', opacity: '0', transform: 'translateZ(0)',
    pointerEvents: 'none', zIndex: getComputedStyle(scene).zIndex === 'auto' ? '' : getComputedStyle(scene).zIndex,
  });
  scene.after(video);
  active = { root, video, scene, key, startAt: performance.now() };
  const my = active;
  const fallback = (why) => {
    if (active !== my) return;
    log.push({ ev: 'fallback', why: String(why), t: performance.now() });
    stop();
  };
  let shown = false;
  const reveal = () => {
    if (shown || active !== my) return;
    shown = true;
    const ms = LIVE.sunriseFadeMs;
    log.push({ ev: 'first-frame', t: performance.now(), currentTime: video.currentTime });
    video.style.opacity = '1';
    video.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, easing: 'linear' });
    scene.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, easing: 'linear', fill: 'forwards' }).onfinish = () => {
      if (active === my) scene.style.opacity = '0';
    };
  };
  video.onerror = () => fallback('error');
  video.onended = () => {
    if (active === my) my.endedAt = performance.now();
    log.push({ ev: 'ended', t: performance.now(), currentTime: video.currentTime });
  };
  try { video.currentTime = 0; } catch (e) { void e; }
  log.push({ ev: 'start', key, t: performance.now(), readyState: video.readyState });
  if (typeof video.requestVideoFrameCallback === 'function') video.requestVideoFrameCallback(() => reveal());
  else video.addEventListener('playing', reveal, { once: true });
  const p = video.play();
  if (p && p.catch) p.catch((e) => fallback(e && e.name));
}
