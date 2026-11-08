// 커뮤니티 프로필 아바타. 팀 피그마 "프로필용 의자들"(흰 원 안 의자 25개, 1953:20423)의 그림을 쓴다.
// 사람(닉네임)마다 서로 다른 의자를 하나씩 정하고, 같은 사람은 어느 화면에서나 같은 의자로 보인다.
// 닉네임에 의자 종류(스툴, 소파, 리클라이너, 바퀴, 편의점)가 들어 있으면 그 종류 안에서 고른다.
// 피그마 생성 화면은 고치지 않고, 화면이 뜰 때 아바타 칸의 그림만 바꾼다(live.js가 applyAvatars를 부른다).
// 그림은 원본 PNG(1024px)를 128px PNG로 줄인 것이다(assets/avatars/<이름>.png).

const KINDS = {
  stool: ['wooden_stool_01', 'wooden_stool_02', 'wooden_stool_03', 'wooden_stool_04', 'wooden_stool_05'],
  sofa: ['sofa_01', 'sofa_02', 'sofa_03', 'sofa_04', 'sofa_05'],
  wheel: ['wheeled_chair_01', 'wheeled_chair_02', 'wheeled_chair_03', 'wheeled_chair_04', 'wheeled_chair_05'],
  recl: ['recliner_01', 'recliner_02', 'recliner_03', 'recliner_04', 'recliner_05'],
  conv: ['convenience_chair_01', 'convenience_chair_02', 'convenience_chair_03', 'convenience_chair_04', 'convenience_chair_05'],
};
const ALL = [].concat(KINDS.conv, KINDS.stool, KINDS.sofa, KINDS.wheel, KINDS.recl);
const kindOf = (name) => {
  if (/스툴/.test(name)) return 'stool';
  if (/소파/.test(name)) return 'sofa';
  if (/리클라이너/.test(name)) return 'recl';
  if (/바퀴/.test(name)) return 'wheel';
  if (/편의점|의자/.test(name)) return 'conv';
  return null;
};

// 닉네임별로 정한 의자. 한 번 정하면 바뀌지 않는다.
const byName = new Map();
const used = new Set();
export function chairFor(name) {
  const key = (name || '').trim();
  if (byName.has(key)) return byName.get(key);
  const k = kindOf(key);
  const pool = k ? KINDS[k] : ALL;
  let pick = pool.find((p) => !used.has(p)) || ALL.find((p) => !used.has(p)) || pool[0];
  used.add(pick);
  byName.set(key, pick);
  return pick;
}
const urlOf = (pick) => new URL('assets/avatars/' + pick + '.png', document.baseURI).href;

// 아바타 칸 옆에 적힌 닉네임을 찾는다(같은 댓글 줄이나 작성자 줄 안의 첫 짧은 글자).
function nameNear(el) {
  let p = el.parentElement;
  for (let i = 0; i < 4 && p; i++) {
    const t = Array.from(p.querySelectorAll('p')).map((x) => x.textContent.trim()).find((x) => x && x.length < 24 && !/^\d/.test(x) && !/전$|^댓글/.test(x));
    if (t) return t;
    p = p.parentElement;
  }
  return '';
}

export const AVATAR_SCREENS = [38, 39];

export function applyAvatars(root, n) {
  if (!root || !AVATAR_SCREENS.includes(n) || root.dataset.avatars) return;
  root.dataset.avatars = '1';
  // 1) 그림으로 구워진 아바타(IMG "Avatar"): 같은 자리에 흰 원과 의자 그림을 놓는다.
  root.querySelectorAll('img[data-figma="Avatar"]').forEach((img) => {
    const nm = nameNear(img);
    if (!nm) return;
    const pick = chairFor(nm);
    const box = document.createElement('span');
    box.setAttribute('data-avatar', pick);
    box.className = img.className;
    box.setAttribute('style', img.getAttribute('style') || '');
    Object.assign(box.style, { display: 'block', borderRadius: '50%', background: '#FFFFFF', overflow: 'hidden', backgroundImage: 'url("' + urlOf(pick) + '")', backgroundSize: '88% 88%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' });
    img.replaceWith(box);
  });
  // 2) 흰 원 프레임 안의 의자 그림(피그마 "6878xxx" 프레임): 안쪽 그림만 바꾼다.
  root.querySelectorAll('[data-figma^="68783"]').forEach((frame) => {
    const nm = nameNear(frame);
    if (!nm) return;
    const pick = chairFor(nm);
    const inner = Array.from(frame.querySelectorAll('*')).find((e) => /url\(/.test(getComputedStyle(e).backgroundImage));
    if (inner) {
      inner.style.backgroundImage = 'url("' + urlOf(pick) + '")';
      inner.setAttribute('data-avatar', pick);
    }
  });
}
