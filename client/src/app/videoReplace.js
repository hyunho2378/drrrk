// 방 입장 영상(roomEnterVideo.js)과 해뜨기 영상(sunriseVideo.js)이 같이 쓰는 도구.
// 영상은 정지 사진 위에 덧씌우지 않고 그 자리의 그림을 대체한다(11. 11. 사용자 지시 "이미지 자체를 교체").
// 1) 화면이 보이기 전에 장면 칸 그림을 영상 첫 장면(영상 첫 프레임 그대로 뽑은 jpg)으로 바꾸고 디코드까지 끝낸다.
// 2) video 는 같은 jpg 를 poster 로 갖고, 첫 프레임이 준비된(readyState 2 이상, 0초 위치) 뒤에만 화면이 보인다.
// 그래서 화면이 처음 보이는 순간부터 영상 첫 장면이고, 재생이 시작되어도 같은 그림에서 이어진다.

const decoded = new Map();
// 디코드한 그림 객체를 붙잡아 둔다(놓으면 메모리 캐시에서 빠져 장면 칸에 넣을 때 다시 받는다. 실측: 영상이 끝난 뒤 정지 사진이 2초 늦게 도착).
const keep = [];

export const assetUrl = (rel) => new URL('assets/' + rel, document.baseURI).href;

// 그림을 받아 디코드까지 끝낸다(같은 주소는 한 번만). 실패해도 끝난 것으로 본다(false).
export function decodeImage(url) {
  if (!url) return Promise.resolve(false);
  if (decoded.has(url)) return decoded.get(url);
  const p = new Promise((res) => {
    const i = new Image();
    keep.push(i);
    i.decoding = 'async';
    i.onload = () => (i.decode ? i.decode().then(() => res(true), () => res(true)) : res(true));
    i.onerror = () => res(false);
    i.src = url;
  });
  decoded.set(url, p);
  return p;
}

// 영상이 0초 위치의 첫 프레임을 그릴 수 있을 때까지 기다린다(readyState 2 이상, 탐색 끝). ms 안에 안 되면 false.
export function frameReady(v, ms) {
  return new Promise((res) => {
    let done = false;
    let timer = 0;
    const evs = ['loadeddata', 'canplay', 'seeked'];
    const fin = (ok) => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      evs.forEach((e) => v.removeEventListener(e, on));
      v.removeEventListener('error', bad);
      res(ok);
    };
    const on = () => { if (v.readyState >= 2 && !v.seeking && !v.error) fin(true); };
    const bad = () => fin(false);
    if (v.error) { res(false); return; }
    evs.forEach((e) => v.addEventListener(e, on));
    v.addEventListener('error', bad);
    timer = window.setTimeout(() => fin(v.readyState >= 2 && !v.seeking && !v.error), ms);
    try { if (v.currentTime !== 0) v.currentTime = 0; } catch (e) { void e; }
    on();
  });
}

// 장면 칸 그림을 바꾼다(그림 칸은 배경 그림 div). 이전 그림 주소를 돌려준다.
export function setSceneImage(scene, url) {
  const prev = scene.style.backgroundImage || '';
  Object.assign(scene.style, { backgroundImage: 'url("' + url + '")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' });
  return prev;
}

// 배경 그림 값 url("...")에서 주소만.
export const urlIn = (bg) => ((/url\(["']?([^"')]+)["']?\)/.exec(bg || '') || [])[1]) || '';
