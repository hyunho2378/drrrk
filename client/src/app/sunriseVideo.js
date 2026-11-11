// 해 뜨는 단계(40 "DRRRK · 드르륵 · 해뜨기")의 배경 영상. 11/10 팀 요청 "함께드르륵 해뜰 때 영상으로 나오면 좋겠다"와 피그마 댓글(1647:24788 "해뜨기 영상으로 넣기").
// 쌍밍아웃은 sunrise-ssang.mp4(피그마 1647:24788 영상), 사진보정은 sunrise-photo.mp4(피그마 1979:27780, 2100:24394 영상)이다. 둘 다 무음 24fps 5.17초.
// 11. 11. 사용자 지시("이미지 자체를 교체해야지 위에 새 화면을 하나 더 얹으면 안 된다")에 따라 덧씌움을 대체로 바꿨다.
//   보이기 전(live.js prepare): 40의 장면 칸 그림을 영상 첫 장면 jpg(영상 첫 프레임 그대로, tokens.js live.sunrisePoster)로 바꾸고,
//   같은 jpg 를 poster 로 가진 video 를 그 자리에 두고, 영상 첫 프레임이 준비될 때까지(최대 live.videoReadyMaxMs) 기다린 뒤에 화면이 보인다.
//   보인 뒤(live.js attach) 처음부터 한 번 재생한다. 첫 장면이 같은 그림이라 정지 사진에서 영상으로 바뀌는 순간이 없다. 끝나면 마지막 장면에서 멈춘다(반복 없음).
//   첫 프레임을 기한 안에 못 받거나 재생이 막히면 영상 층을 만들지 않고(또는 빼고) 장면 칸에 방 사진이 보인다.
// 다른 화면으로 가면 멈추되, 나가는 화면이 전환 동안 보이므로 영상은 빼지 않고 마지막 장면을 그대로 둔다. iOS SunriseVideo.swift와 같은 동작이다.
// 혼자 방 해 뜨는 단계(66, 피그마 2351:34553, 탁빛나 11/12 "아침해 뜨는거 반영 필요")도 같은 방식으로 sunrise-solo.mp4(640 x 1148, 24fps, 5.07초)를 튼다.
//   혼자 방 안에서 그리드(64)로 갔다 66으로 돌아오면 멈춘 자리부터 이어 틀고, 이미 끝났으면 마지막 장면(해 뜬 아침)이 처음부터 보인다.
import { live as LIVE } from '../tokens.js';
import { roomStory } from './roomConcern.js';
import { assetUrl, decodeImage, frameReady, setSceneImage, urlIn } from './videoReplace.js';

const SCREEN = 40;
const SOLO = 66;
const SCREENS = [SCREEN, SOLO];
const cache = {};
// 혼자 방 영상을 틀던 중에 그리드(64)로 나가면 멈춘 자리를 적어 둔다. 66으로 돌아오면 이어 튼다. 혼자 방을 나가면 지운다(live.js attach).
let soloResume = null;
// 확인용 기록(개발 서버에서 window.__sunrise로 읽는다).
const log = [];
if (typeof window !== 'undefined') window.__sunrise = { log, el: () => active && active.video };

let active = null;

const storyKey = (n = SCREEN) => (n === SOLO ? 'solo' : roomStory() === 'photo' ? 'photo' : 'ssang');
const posterOf = (key) => assetUrl(LIVE.sunrisePoster[key]);
const note = (ev, extra) => {
  log.push(Object.assign({ ev, t: Math.round(performance.now()) }, extra || {}));
  if (log.length > 120) log.shift();
};

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
  // poster 는 영상 첫 프레임 그대로라서 재생 전과 재생 첫 프레임이 같은 그림이다.
  v.poster = posterOf(key);
  v.src = assetUrl(LIVE.sunriseVideo[key]);
  v.load();
  cache[key] = v;
  return v;
}

// 영상이 아직 돌고 있거나 끝난 뒤 마지막 장면에 머무는 중이면 true. 종료(1)로 넘어가는 단계는 이 값이 false가 될 때까지 기다린다(live.js tick).
// 방 구경에서 이어받은 시계가 이미 01:12 아래여서 영상이 늦게 시작해도 끝까지 보이고 마지막 장면이 live.sunHoldMs 동안 남는다.
export function sunriseHolding(now = performance.now()) {
  if (!active || active.failed || !active.startAt) return false;
  // 받기가 멈춰 끝나지 않는 영상은 영상 길이(5.17초)와 머무는 시간을 더한 만큼만 기다린다.
  if (!active.endedAt) return now - active.startAt < 5170 + LIVE.sunHoldMs;
  return now - active.endedAt < LIVE.sunHoldMs;
}

// 방에 들어올 때 부른다. 지금 이야기의 영상과 첫 장면 그림을 받아 둔다. solo면 혼자 방 영상이다.
export function prefetchSunrise(solo = false) {
  try { const k = storyKey(solo ? SOLO : SCREEN); videoFor(k); decodeImage(posterOf(k)); } catch (e) { void e; }
}

// 혼자 방을 나가면(live.js attach, 방 장면이 C가 아님) 이어 틀 자리를 지운다. 다음에 들어온 혼자 방은 처음부터 튼다.
export function resetSoloSunrise() { soloResume = null; }

// 영상을 t초 위치로 옮기고 그 장면을 그릴 수 있을 때까지 기다린다(이어 틀기). ms 안에 안 되면 false.
function frameAt(v, t, ms) {
  return new Promise((res) => {
    let done = false;
    const fin = (ok) => { if (done) return; done = true; window.clearTimeout(timer); v.removeEventListener('seeked', on); v.removeEventListener('loadeddata', on); res(ok); };
    const on = () => { if (v.readyState >= 2 && !v.seeking && !v.error) fin(true); };
    const timer = window.setTimeout(() => fin(v.readyState >= 2 && !v.seeking && !v.error), ms);
    v.addEventListener('seeked', on);
    v.addEventListener('loadeddata', on);
    try { if (Math.abs(v.currentTime - t) > 0.01) v.currentTime = t; } catch (e) { void e; }
    on();
  });
}

// 장면 그림 칸(scene.js swapScene이 바꾼 "image 1208091463").
const sceneIn = (root) => [...root.children].slice(0, 4).find((c) => /^image /.test(c.dataset.figma || ''));

// 영상을 빼고 장면 칸을 방 사진으로 돌린다(재생 실패).
function drop(why) {
  if (!active) return;
  const my = active;
  active = null;
  try { my.video.pause(); } catch (e) { void e; }
  my.video.onended = null;
  my.video.onerror = null;
  if (my.scene && my.still) setSceneImage(my.scene, my.still);
  if (my.video.parentNode) my.video.parentNode.removeChild(my.video);
  note('fallback', { why: String(why) });
}

// 다른 화면으로 갈 때. 나가는 화면이 아직 보이는 동안 영상을 빼면 그 자리에 첫 장면(밤)이 비치므로 멈추기만 한다.
function leave() {
  if (!active) return;
  const my = active;
  active = null;
  try { my.video.pause(); } catch (e) { void e; }
  my.video.onended = null;
  my.video.onerror = null;
  if (my.key === 'solo' && my.startAt) soloResume = { time: my.video.currentTime, ended: !!my.endedAt || my.video.ended };
  note('leave', { currentTime: +my.video.currentTime.toFixed(3) });
}

// 화면을 준비할 때(live.js prepare, 보이기 전). 40과 66이면 장면 칸 그림을 영상 첫 장면으로 대체하고 영상 첫 프레임이 준비될 때까지 기다린다.
// 66에 다시 들어오는 길(그리드에서 현장 모드)이면 멈춘 장면에서 기다린다. 영상이 그 장면을 덮고 있어 첫 장면(밤)이 비치지 않는다.
export async function prepareSunrise(root, n) {
  if (!SCREENS.includes(n) || !root) return;
  const scene = sceneIn(root);
  if (!scene) return;
  leave();
  const key = storyKey(n);
  const video = videoFor(key);
  const poster = posterOf(key);
  const resume = key === 'solo' ? soloResume : null;
  const still = urlIn(scene.style.backgroundImage || getComputedStyle(scene).backgroundImage);
  // community.js 가 40 장면 칸을 다른 그림으로 바꾸지 않게 표시를 먼저 단다.
  scene.dataset.swapped40 = '1';
  const my = { root, video, scene, key, still, phase: 'wait', resume };
  active = my;
  try { video.pause(); } catch (e) { void e; }
  const t0 = performance.now();
  const ready = resume ? frameAt(video, resume.ended ? Math.max(0, (video.duration || 5.07) - 0.001) : resume.time, LIVE.videoReadyMaxMs) : frameReady(video, LIVE.videoReadyMaxMs);
  const [okImg, okVid] = await Promise.all([decodeImage(poster), ready]);
  if (active !== my) return;
  if (!okImg || !okVid || !root.isConnected) {
    active = null;
    note('fallback', { why: !okImg ? 'poster' : !okVid ? 'video' : 'left', readyState: video.readyState, waited: Math.round(performance.now() - t0) });
    return;
  }
  setSceneImage(scene, poster);
  scene.style.opacity = '';
  Object.assign(video.style, {
    position: 'absolute', left: '0px', top: '0px', width: '390px', height: '844px',
    objectFit: 'cover', objectPosition: 'center', opacity: '1', transform: 'translateZ(0)', pointerEvents: 'none',
  });
  video.getAnimations().forEach((a) => a.cancel());
  // 영상은 장면 칸 안에 넣는다. 앞 화면에서 넘어오는 전환(morph.js)이 장면 칸과 영상을 한 덩어리로 다뤄 영상만 따로 옅어졌다 나타나지 않는다.
  if (video.parentNode !== scene) scene.appendChild(video);
  my.phase = 'ready';
  note('prepare', { key, readyState: video.readyState, currentTime: video.currentTime, waited: Math.round(performance.now() - t0) });
}

// 화면이 붙을 때마다 부른다(live.js attach). 40과 66이면 재생하고, 다른 화면이면 멈춘다.
export function attachSunrise(root, n) {
  if (!SCREENS.includes(n)) { leave(); return; }
  if (!root || !active || active.root !== root || active.phase !== 'ready') return;
  const my = active;
  const { video } = my;
  my.phase = 'playing';
  my.startAt = performance.now();
  // 이미 끝난 영상으로 돌아왔으면 마지막 장면에 그대로 둔다(머무는 시간은 이미 지났다).
  if (my.resume && my.resume.ended) {
    my.endedAt = my.startAt - LIVE.sunHoldMs;
    note('resume-ended', { key: my.key, currentTime: +video.currentTime.toFixed(3) });
    return;
  }
  video.onerror = () => drop('error');
  video.onended = () => {
    if (active === my) my.endedAt = performance.now();
    note('ended', { currentTime: video.currentTime });
  };
  note('start', { key: my.key, readyState: video.readyState, currentTime: video.currentTime });
  if (typeof video.requestVideoFrameCallback === 'function') video.requestVideoFrameCallback((now, meta) => note('first-frame', { mediaTime: +meta.mediaTime.toFixed(3) }));
  const p = video.play();
  if (p && p.catch) p.catch((e) => { if (active === my) drop(e && e.name); });
}
