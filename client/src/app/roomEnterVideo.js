// 함께 드르륵 방에 들어올 때 배경에서 한 번 재생하는 입장 영상(11. 10. 피그마 댓글 1807:23214 "영상으로 반영").
// 쌍밍아웃은 room-enter-ssang.mp4(피그마 2096:22459, 1807:23214 영상), 사진보정은 room-enter-photo.mp4(피그마 2100:24322, 1979:27708 영상)이다.
// 둘 다 640 x 1148, 24fps, 3.08초이고 카메라가 멀리서 테이블 쪽으로 다가오는 장면이다. 팀이 넣은 소리 트랙이 있어 소리를 켠 채 재생한다(tokens.js live.roomEnterVolume).
// 11. 11. 사용자 지시("이미지 자체를 교체해야지 위에 새 화면을 하나 더 얹으면 안 된다")에 따라 덧씌움을 대체로 바꿨다.
//   보이기 전(live.js prepare): 장면 칸 그림을 영상 첫 장면 jpg(영상 첫 프레임 그대로, tokens.js live.roomEnterPoster)로 바꾸고,
//   같은 jpg 를 poster 로 가진 video 를 그 자리에 두고, 영상 첫 프레임이 준비될 때까지(최대 live.videoReadyMaxMs) 기다린 뒤에 화면이 보인다.
//   그래서 방이 처음 보이는 순간부터 멀리서 본 첫 장면이고, 가까운 정지 사진이 먼저 보이는 프레임이 없다.
//   영상이 끝나면 장면 칸 그림을 가까운 정지 사진(영상 마지막 장면과 같은 구도, 회색 평균 차이 2.0~2.9/255)으로 바꾸고 영상이 120ms 동안 옅어진다.
//   영상 첫 프레임을 기한 안에 준비하지 못하거나 파일을 못 받으면 영상 층을 만들지 않고 가까운 정지 사진이 처음부터 보인다.
// 새로 들어온 방(live.js room.scene이 B가 아니던 때)에서만 재생한다. 같은 방 안의 화면 전환(퀵슬롯 펼침, 올림)에서는 영상을 새 화면으로 옮겨 이어 간다.
// 방 온보딩 덮개가 떠 있는 동안은 첫 장면에 세워 두고, 덮개가 닫히면 재생한다(roomChat.js와 같은 기준).
// 브라우저가 소리 재생을 막으면 소리 없이 재생한다. 해 뜨는 단계(40)와 해 뜬 순간(35)에서는 재생하지 않는다. iOS RoomEnterVideo.swift와 같은 동작이다.
import { live as LIVE } from '../tokens.js';
import { roomStory } from './roomConcern.js';
import { assetUrl, decodeImage, frameReady, setSceneImage, urlIn } from './videoReplace.js';

// 입장 영상을 까는 방 화면(접힘 29, 펼침 28, 올림 30, 31). 같은 방 안에서 이 화면끼리 옮기면 재생 중인 영상을 새 화면으로 옮겨 이어 간다.
const ENTRY_SCREENS = [28, 29, 30, 31];
// 방으로 이어지는 화면(라이브 목록과 탭, 고민 분석, 추천, 방 구경, 혼자 방의 함께 앉기). 여기서 영상과 첫 장면 그림을 미리 받아 둔다.
const AHEAD_SCREENS = [10, 26, 27, 37, 42, 47, 48, 49, 50, 51, 52];

const cache = {};
const log = [];
let cur = null;
let covTimer = 0;
// 확인용 기록(개발 서버에서 window.__roomEnter로 읽는다).
if (typeof window !== 'undefined') window.__roomEnter = { log, el: () => cur && cur.video, state: () => cur && { phase: cur.phase, key: cur.key } };
const note = (ev, extra) => {
  log.push(Object.assign({ ev, t: Math.round(performance.now()) }, extra || {}));
  if (log.length > 120) log.shift();
};

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const covered = () => !!document.querySelector('[data-figma="방 온보딩"]');
const keyNow = () => (roomStory() === 'photo' ? 'photo' : 'ssang');
const posterOf = (key) => assetUrl(LIVE.roomEnterPoster[key]);

function videoFor(key) {
  if (cache[key]) return cache[key];
  const v = document.createElement('video');
  v.playsInline = true;
  v.loop = false;
  v.preload = 'auto';
  v.setAttribute('playsinline', '');
  v.setAttribute('aria-hidden', 'true');
  v.setAttribute('data-figma', 'room enter video');
  // poster 는 영상 첫 프레임 그대로라서 재생 전과 재생 첫 프레임이 같은 그림이다.
  v.poster = posterOf(key);
  v.src = assetUrl(LIVE.roomEnterVideo[key]);
  v.load();
  cache[key] = v;
  return v;
}

// 방으로 이어지는 화면에서 부른다. 두 이야기 영상(합쳐 약 0.8MB)과 첫 장면 그림을 미리 받아 둔다.
export function prefetchRoomEnter(n) {
  if (!AHEAD_SCREENS.includes(n) && !ENTRY_SCREENS.includes(n)) return;
  try { ['ssang', 'photo'].forEach((k) => { videoFor(k); decodeImage(posterOf(k)); }); } catch (e) { void e; }
}

// 장면 그림 칸(scene.js swapScene이 바꾼 "image 1208091463").
const sceneOf = (root) => [...root.children].slice(0, 4).find((c) => /^image /.test(c.dataset.figma || ''));

function place(video, scene) {
  Object.assign(video.style, {
    position: 'absolute', left: '0px', top: '0px', width: '390px', height: '844px',
    objectFit: 'cover', objectPosition: 'center', opacity: '1', transform: 'translateZ(0)', pointerEvents: 'none',
  });
  // 영상은 장면 칸 안에 넣는다. 그래야 같은 방 안 전환(morph.js)이 장면 칸과 영상을 한 덩어리로 다뤄 영상만 따로 옅어졌다 나타나지 않는다.
  if (video.parentNode !== scene) scene.appendChild(video);
}

// 영상을 정리한다. 장면 칸 그림은 가까운 정지 사진으로 돌려 둔다(영상이 없을 때 보일 그림).
function stop(why) {
  window.clearInterval(covTimer);
  covTimer = 0;
  if (!cur) return;
  const my = cur;
  cur = null;
  my.phase = 'done';
  const { video } = my;
  try { video.pause(); } catch (e) { void e; }
  video.onended = null;
  video.onerror = null;
  video.getAnimations().forEach((a) => a.cancel());
  if (my.scene && my.still) setSceneImage(my.scene, my.still);
  if (video.parentNode) video.parentNode.removeChild(video);
  note('stop', { why });
}

// 다른 화면으로 나갈 때. 나가는 화면은 전환 동안 아직 보이므로 영상을 빼지 않고 지금 장면에 멈춰 둔다(빼면 그 자리에 다른 그림이 비친다).
// 나가는 층이 사라질 때 영상도 같이 사라지고, 다음 입장 때 같은 요소를 새 화면으로 옮겨 쓴다.
function leave(why) {
  window.clearInterval(covTimer);
  covTimer = 0;
  if (!cur) return;
  const my = cur;
  cur = null;
  my.phase = 'done';
  try { my.video.pause(); } catch (e) { void e; }
  my.video.onended = null;
  my.video.onerror = null;
  note('leave', { why, currentTime: +my.video.currentTime.toFixed(3) });
}

// 화면을 준비할 때(live.js prepare, 화면이 보이기 전). 새로 들어온 방이면 장면 칸 그림을 영상 첫 장면으로 대체하고 영상 첫 프레임이 준비될 때까지 기다린다.
// 같은 방 안의 다른 화면이면 재생 중인 영상을 새 화면으로 옮긴다(보이기 전에 옮겨서 새 화면이 처음부터 영상 장면으로 보인다).
export async function prepareRoomEnter(root, n, fresh) {
  if (!root || !ENTRY_SCREENS.includes(n)) return;
  const scene = sceneOf(root);
  if (!scene) return;
  if (!fresh) { carry(root, n, scene); return; }
  stop('new room');
  if (reduced()) return;
  const key = keyNow();
  const video = videoFor(key);
  const poster = posterOf(key);
  const still = urlIn(scene.style.backgroundImage);
  const my = { root, video, key, scene, still, poster, phase: 'wait' };
  cur = my;
  try { video.pause(); } catch (e) { void e; }
  const t0 = performance.now();
  const [okImg, okVid] = await Promise.all([decodeImage(poster), frameReady(video, LIVE.videoReadyMaxMs), decodeImage(still)]);
  if (cur !== my) return;
  if (!okImg || !okVid || !root.isConnected) {
    // 첫 프레임을 기한 안에 못 받으면 영상 층을 만들지 않는다(가까운 정지 사진이 처음부터 보인다).
    cur = null;
    note('fallback', { n, key, why: !okImg ? 'poster' : !okVid ? 'video' : 'left', readyState: video.readyState, waited: Math.round(performance.now() - t0) });
    return;
  }
  setSceneImage(scene, poster);
  place(video, scene);
  my.phase = 'ready';
  note('prepare', { n, key, readyState: video.readyState, currentTime: video.currentTime, waited: Math.round(performance.now() - t0) });
}

// 같은 방 안에서 장면이 있는 다른 화면으로 옮길 때 영상을 새 화면으로 옮긴다(처음부터 다시 재생하지 않는다).
function carry(root, n, scene) {
  if (!cur || cur.root === root || !(cur.phase === 'ready' || cur.phase === 'playing')) return false;
  const my = cur;
  const old = my.scene;
  // 나가는 화면의 장면 칸에는 영상 자리에 지금 프레임을 그린 캔버스 칸을 남긴다(영상을 옮긴 뒤 전환이 시작될 때까지 첫 장면 그림이 비치지 않게).
  // 같은 방 안 전환(morph.js)은 이름과 자리, 배경 그림이 같은 장면 칸을 짝지어 새 화면 쪽을 바로 보이므로 새 화면의 영상이 그대로 이어진다.
  if (old && old.isConnected) {
    try {
      const box = document.createElement('div');
      box.setAttribute('data-figma', 'room enter video');
      box.setAttribute('aria-hidden', 'true');
      Object.assign(box.style, { position: 'absolute', left: '0px', top: '0px', width: '390px', height: '844px', overflow: 'hidden', pointerEvents: 'none' });
      const c = document.createElement('canvas');
      c.width = my.video.videoWidth || 640;
      c.height = my.video.videoHeight || 1148;
      c.getContext('2d').drawImage(my.video, 0, 0, c.width, c.height);
      Object.assign(c.style, { display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' });
      box.appendChild(c);
      old.appendChild(box);
    } catch (e) { void e; }
  }
  // 새 화면 장면 칸도 나간 화면과 같은 첫 장면 그림으로 둔다(두 장면 칸이 같은 그림이라 전환이 옞어지며 바뀜지 않는다). 영상이 끝나면 이 화면의 정지 사진으로 대체한다.
  const own = urlIn(scene.style.backgroundImage);
  my.still = own && own !== my.poster ? own : my.still;
  decodeImage(my.still);
  setSceneImage(scene, my.poster);
  my.root = root;
  my.scene = scene;
  place(my.video, scene);
  note('carry', { n, phase: my.phase, currentTime: +my.video.currentTime.toFixed(3), paused: my.video.paused });
  return true;
}

// 영상이 끝나면 장면 칸 그림을 가까운 정지 사진으로 바꾸고 영상이 옅어진다(120ms 교차).
function finish(my) {
  if (cur !== my || my.phase === 'fading') return;
  my.phase = 'fading';
  const { video } = my;
  note('ended', { currentTime: +video.currentTime.toFixed(3) });
  if (my.scene && my.still) setSceneImage(my.scene, my.still);
  const a = video.animate([{ opacity: 1 }, { opacity: 0 }], { duration: LIVE.roomEnterFadeMs, easing: 'linear', fill: 'forwards' });
  a.onfinish = () => {
    if (cur !== my) return;
    cur = null;
    my.phase = 'done';
    video.onended = null;
    video.onerror = null;
    a.cancel();
    if (video.parentNode) video.parentNode.removeChild(video);
    note('stop', { why: 'ended' });
  };
}

function play(my) {
  if (cur !== my) return;
  const { video } = my;
  my.phase = 'playing';
  const vol = Math.min(1, Math.max(0, Number(LIVE.roomEnterVolume) || 0));
  video.muted = vol === 0;
  video.volume = vol;
  video.onended = () => finish(my);
  const fail = (e) => {
    if (cur !== my) return;
    note('fallback', { why: e && e.name });
    stop('fallback');
  };
  note('play', { muted: video.muted, volume: video.volume, readyState: video.readyState, currentTime: video.currentTime });
  // 재생 첫 프레임이 화면에 그려진 시각(확인용).
  if (typeof video.requestVideoFrameCallback === 'function') video.requestVideoFrameCallback((now, meta) => note('first-frame', { mediaTime: +meta.mediaTime.toFixed(3) }));
  const p = video.play();
  if (!p || !p.catch) return;
  p.then(() => note('playing', { muted: video.muted })).catch((e) => {
    if (cur !== my) return;
    // 화면을 한 번도 누르지 않아 소리가 막히면 소리 없이 다시 재생한다.
    if (e && e.name === 'NotAllowedError' && !video.muted) {
      video.muted = true;
      note('muted-retry');
      const p2 = video.play();
      if (p2 && p2.catch) p2.then(() => note('playing', { muted: true })).catch(fail);
      return;
    }
    if (e && e.name === 'AbortError') return;
    fail(e);
  });
}

// 덮개가 닫힐 때까지 첫 장면에 세워 둔다. 첫 프레임이 준비된 영상만 재생을 시작한다.
function begin(my) {
  window.clearInterval(covTimer);
  covTimer = 0;
  my.video.onerror = () => { if (cur === my) { note('fallback', { why: 'error' }); stop('error'); } };
  const go = () => {
    if (cur !== my) return;
    if (my.video.readyState >= 2) { play(my); return; }
    frameReady(my.video, LIVE.videoReadyMaxMs).then((ok) => { if (cur === my) { if (ok) play(my); else stop('not ready'); } });
  };
  if (!covered()) { go(); return; }
  note('hold', { why: 'onboarding' });
  covTimer = window.setInterval(() => {
    if (cur !== my) { window.clearInterval(covTimer); covTimer = 0; return; }
    if (!my.root.isConnected) { leave('left'); return; }
    if (covered()) return;
    window.clearInterval(covTimer);
    covTimer = 0;
    go();
  }, 100);
}

// 화면이 다 보인 뒤(live.js attach). fresh는 새로 들어온 방.
export function attachRoomEnter(root, n, fresh) {
  prefetchRoomEnter(n);
  if (!root || !cur) return;
  if (cur.root !== root) {
    // prepare 에서 옮기지 못한 경우(같은 방 안 화면)에만 여기서 옮긴다.
    const scene = ENTRY_SCREENS.includes(n) ? sceneOf(root) : null;
    if (!(scene && carry(root, n, scene))) { leave('screen ' + n); return; }
  }
  if (cur.phase === 'ready') begin(cur);
  else if (cur.phase === 'playing' && cur.video.paused && !cur.video.ended) cur.video.play().catch(() => {});
  void fresh;
}

// ---------- 생성 화면 안의 없는 영상 파일 ----------
// 생성 화면 Screen1807_23214.jsx(29)의 장면 칸은 앱에 없는 assets/video/1606e09d5f....mp4를 autoPlay loop로 부른다(파일이 없어 DEMUXER_ERROR).
// 생성 코드는 고치지 않고, 그 요소가 붙는 순간 자동 재생과 반복을 끄고 주소를 비운다(포스터 그림은 남는다). 장면 칸은 scene.js가 방 사진으로 바꾸고, 입장 영상은 위 코드가 따로 깐다.
// 같은 처지의 해시(7b8aa8386b, 1f03a2fd48, b469cd35da)도 함께 막는다.
const MISSING = /assets\/video\/(1606e09d5f|7b8aa8386b|1f03a2fd48|b469cd35da)/;
function quiet(v) {
  const src = v.getAttribute('src') || '';
  if (!MISSING.test(src)) return;
  v.autoplay = false;
  v.loop = false;
  v.removeAttribute('autoplay');
  v.removeAttribute('loop');
  v.removeAttribute('src');
  v.dataset.missingSrc = src.split('/').pop();
  try { v.load(); } catch (e) { void e; }
}
function scan(node) {
  if (!node || node.nodeType !== 1) return;
  if (node.tagName === 'VIDEO') { quiet(node); return; }
  const list = node.getElementsByTagName('video');
  for (let i = 0; i < list.length; i += 1) quiet(list[i]);
}
if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined' && !window.__roomEnterQuiet) {
  window.__roomEnterQuiet = true;
  const start = () => {
    scan(document.body);
    new MutationObserver((recs) => {
      for (const r of recs) {
        if (r.type === 'attributes') scan(r.target);
        else r.addedNodes.forEach(scan);
      }
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
  };
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
}
