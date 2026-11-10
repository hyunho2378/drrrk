// 함께 드르륵 방에 들어올 때 배경에서 한 번 재생하는 입장 영상(11. 10. 피그마 댓글 1807:23214 "영상으로 반영").
// 쌍밍아웃은 room-enter-ssang.mp4(피그마 2096:22459, 1807:23214 영상), 사진보정은 room-enter-photo.mp4(피그마 2100:24322, 1979:27708 영상)이다.
// 둘 다 640 x 1148, 24fps, 3.08초이고 카메라가 멀리서 테이블 쪽으로 다가오는 장면이다. 팀이 넣은 소리 트랙이 있어 소리를 켠 채 재생한다(tokens.js live.roomEnterVolume).
// 영상 마지막 장면은 방 사진(scene.js 장면 그림)과 같은 구도다(390 x 844 cover로 겹쳐 회색 평균 차이 2.0~2.9/255, 크기와 위치를 바꿔 찾아도 1.0배 0, 0이 가장 맞음).
// 그래서 끝나면 영상이 120ms 동안 옅어지며 아래의 방 사진이 그대로 이어진다(tokens.js live.roomEnterFadeMs).
// 새로 들어온 방(live.js room.scene이 B가 아니던 때)에서만 재생한다. 같은 방 안의 화면 전환(퀵슬롯 펼침, 일반 모드, 미니프로필)에서는 다시 재생하지 않는다.
// 방 온보딩 덮개가 떠 있는 동안은 첫 장면에 세워 두고, 덮개가 닫히면 재생한다(roomChat.js와 같은 기준).
// 브라우저가 소리 재생을 막으면 소리 없이 재생하고, 그것도 막히거나 파일을 못 받으면 영상을 빼서 방 사진이 그대로 남는다.
// 해 뜨는 단계(40)와 해 뜬 순간(35)에서는 재생하지 않는다(해뜨기 영상 sunriseVideo.js와 겹치지 않게). iOS RoomEnterVideo.swift와 같은 동작이다.
import { live as LIVE } from '../tokens.js';
import { roomStory } from './roomConcern.js';

// 입장 영상을 까는 방 화면(접힘 29, 펼침 28, 올림 30, 31). 같은 방 안에서 이 화면끼리 옮기면 재생 중인 영상을 새 화면으로 옮겨 이어 간다.
const ENTRY_SCREENS = [28, 29, 30, 31];
// 방으로 이어지는 화면(라이브 목록과 탭, 고민 분석, 추천, 방 구경, 혼자 방의 함께 앉기). 여기서 영상을 미리 받아 둔다.
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
const urlOf = (key) => new URL('assets/' + LIVE.roomEnterVideo[key], document.baseURI).href;

function videoFor(key) {
  if (cache[key]) return cache[key];
  const v = document.createElement('video');
  v.playsInline = true;
  v.loop = false;
  v.preload = 'auto';
  v.setAttribute('playsinline', '');
  v.setAttribute('aria-hidden', 'true');
  v.setAttribute('data-figma', 'room enter video');
  v.src = urlOf(key);
  v.load();
  cache[key] = v;
  return v;
}

// 방으로 이어지는 화면에서 부른다. 두 이야기 영상을 미리 받아 둔다(합쳐 약 0.8MB).
export function prefetchRoomEnter(n) {
  if (!AHEAD_SCREENS.includes(n) && !ENTRY_SCREENS.includes(n)) return;
  try { videoFor('ssang'); videoFor('photo'); } catch (e) { void e; }
}

// 장면 그림 칸(scene.js swapScene이 바꾼 "image 1208091463").
const sceneOf = (root) => [...root.children].slice(0, 4).find((c) => /^image /.test(c.dataset.figma || ''));

function place(video, scene) {
  Object.assign(video.style, {
    position: 'absolute', left: '0px', top: '0px', width: '390px', height: '844px',
    objectFit: 'cover', objectPosition: 'center', opacity: '1', transform: 'translateZ(0)', pointerEvents: 'none',
  });
  scene.after(video);
}

function stop(why) {
  window.clearInterval(covTimer);
  covTimer = 0;
  if (!cur) return;
  const { video } = cur;
  cur.phase = 'done';
  cur = null;
  try { video.pause(); } catch (e) { void e; }
  video.onended = null;
  video.onerror = null;
  video.getAnimations().forEach((a) => a.cancel());
  if (video.parentNode) video.parentNode.removeChild(video);
  note('stop', { why });
}

// 화면을 준비할 때(live.js prepare). 새로 들어온 방이면 영상을 장면 그림 바로 위에 첫 장면으로 깔아 둔다. 전환 중에도 첫 장면이 보인다.
export function prepareRoomEnter(root, n, fresh) {
  if (!fresh || !ENTRY_SCREENS.includes(n) || !root || reduced()) return;
  const scene = sceneOf(root);
  if (!scene) return;
  stop('new room');
  const key = keyNow();
  const video = videoFor(key);
  try { video.pause(); video.currentTime = 0; } catch (e) { void e; }
  place(video, scene);
  cur = { root, video, key, phase: 'ready' };
  note('prepare', { n, key, readyState: video.readyState });
}

function finish(my) {
  if (cur !== my || my.phase === 'fading') return;
  my.phase = 'fading';
  const { video } = my;
  note('ended', { currentTime: +video.currentTime.toFixed(3) });
  const a = video.animate([{ opacity: 1 }, { opacity: 0 }], { duration: LIVE.roomEnterFadeMs, easing: 'linear', fill: 'forwards' });
  a.onfinish = () => { if (cur === my) stop('ended'); };
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
  note('play', { muted: video.muted, volume: video.volume, readyState: video.readyState });
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

// 덮개가 닫힐 때까지 첫 장면에 세워 둔다.
function begin(my) {
  window.clearInterval(covTimer);
  covTimer = 0;
  my.video.onerror = () => { if (cur === my) { note('fallback', { why: 'error' }); stop('error'); } };
  if (!covered()) { play(my); return; }
  note('hold', { why: 'onboarding' });
  covTimer = window.setInterval(() => {
    if (cur !== my) { window.clearInterval(covTimer); covTimer = 0; return; }
    if (!my.root.isConnected) { stop('left'); return; }
    if (covered()) return;
    window.clearInterval(covTimer);
    covTimer = 0;
    play(my);
  }, 100);
}

// 화면이 다 보인 뒤(live.js attach). fresh는 새로 들어온 방.
export function attachRoomEnter(root, n, fresh) {
  prefetchRoomEnter(n);
  if (!root) return;
  if (fresh && ENTRY_SCREENS.includes(n)) {
    if (!cur || cur.root !== root) prepareRoomEnter(root, n, true);
    if (cur && cur.root === root && cur.phase === 'ready') begin(cur);
    return;
  }
  if (!cur || cur.root === root) return;
  // 같은 방 안에서 장면이 있는 다른 화면으로 옮기면 재생 중인 영상을 새 화면으로 옮겨 이어 간다(처음부터 다시 재생하지 않는다).
  const scene = ENTRY_SCREENS.includes(n) && (cur.phase === 'playing' || cur.phase === 'ready') ? sceneOf(root) : null;
  if (scene) {
    cur.root = root;
    place(cur.video, scene);
    note('carry', { n, currentTime: +cur.video.currentTime.toFixed(3) });
    if (cur.phase === 'ready') begin(cur);
    else if (cur.video.paused && !cur.video.ended) cur.video.play().catch(() => {});
    return;
  }
  stop('screen ' + n);
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
