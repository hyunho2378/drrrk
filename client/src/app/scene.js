// 장면 배경 그림. 팀 피그마의 최신 프레임이 쓰는 그림 원본을 그대로 쓴다(다시 줄이거나 압축하지 않는다).
// 28, 29, 30은 주전부리 퀵슬롯 기본 장면, 31은 이모지가 열린 접힘 장면, 41, 42, 43, 46은 현장 모드 장면이다.
// 옛 프레임은 이 자리에 영상이나 옛 그림이 들어 있었다. 영상이 들어 있던 자리는 그림으로 바꾼다.
const FILES = {
  base: 'fefcb80d4928c0cf3f5620530d53f3059fc8b25b.jpg',
  fold: 'edefa8f194a3501af0e2bc80dad7013e722b3141.jpg',
  field: 'bd5037f7eb80881c82b3de6cd35faf6073b5c925.png',
  // 혼자 드르륵 방에 처음 들어온 장면(1647:25199 영상의 첫 화면, 멀리서 본 흰 의자와 테이블).
  far: 'solo-video-still.png',
};
export const SCENE_OF = { 28: 'base', 29: 'base', 30: 'base', 31: 'fold', 41: 'field', 42: 'field', 43: 'field', 46: 'far' };
export const sceneUrl = (key) => new URL('assets/images/' + FILES[key], document.baseURI).href;
export const sceneFiles = (n) => (SCENE_OF[n] ? ['assets/images/' + FILES[SCENE_OF[n]]] : []);

// 화면 맨 아래 칸(장면)의 영상이나 그림을 새 그림으로 바꾼다. 같은 화면에 한 번만 한다.
export function swapScene(root, n) {
  const key = SCENE_OF[n];
  if (!key || !root || root.dataset.sceneSwapped) return;
  // 맨 아래 칸이 어둡게 깔린 판(scene dim)인 화면이 있어서, 화면을 덮는 그림이나 영상 칸을 먼저 찾는다.
  const kids = [...root.children].slice(0, 4);
  const first = kids.find((c) => /^(IMG|VIDEO|CANVAS)$/.test(c.tagName) || /^image /.test(c.dataset.figma || '')) || root.firstElementChild;
  if (!first) return;
  const r = first.getBoundingClientRect();
  const rr = root.getBoundingClientRect();
  if (r.width < rr.width * 0.9 || r.height < rr.height * 0.9) return;
  root.dataset.sceneSwapped = '1';
  const url = sceneUrl(key);
  if (first.tagName === 'VIDEO' || first.tagName === 'CANVAS' || first.tagName === 'IMG') {
    const div = document.createElement('div');
    div.setAttribute('data-figma', first.getAttribute('data-figma') || 'image 1208091463');
    div.className = first.className;
    Object.assign(div.style, { position: 'absolute', left: '0px', top: '0px', width: '390px', height: '844px', backgroundImage: 'url("' + url + '")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' });
    if (first.tagName === 'VIDEO') { try { first.pause(); } catch (e) { void e; } }
    root.replaceChild(div, first);
  } else {
    Object.assign(first.style, { backgroundImage: 'url("' + url + '")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' });
  }
}
