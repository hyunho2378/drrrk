// 생성 화면이 팀 피그마 현재 값보다 뒤처진 자리를 맞춘다(11. 9. W-REST 재검수). community.js의 patchCommunity가 화면마다 부른다.
//  16, 17 혼자 드르륵 온보딩(1647:22976, 1647:23028): 피그마는 홈 배경을 숨기고 방 장면(1974:19388, 1974:19389) 위에 카드를 띄운다.
//    숨긴 홈 조각(배경, 로고, 방 수 알림, 종, 아래 탭, 옛 의자 그림)을 웹에서도 숨기고 방 장면을 맨 아래에 깐다.
//    카드 위쪽 그림(Visual 1647:23006, 1647:23058)은 피그마 Visual을 2배로 내보낸 그림(onboarding/solo-1, solo-2)으로 바꾼다.
const BASE = import.meta.env.BASE_URL || '/';
const A = BASE + 'assets/rest2/';

const SOLO_OB = {
  16: {
    root: '1647:22976',
    hide: ['1647:22977', '1647:22978', '1620:43258', '1647:22980', '1647:22991', '1647:22992', '1647:22998', '1647:23001'],
    visual: '1647:23006',
    img: BASE + 'assets/onboarding/solo-1.png',
  },
  17: {
    root: '1647:23028',
    hide: ['1647:23029', '1647:23030', '1620:43285', '1647:23032', '1647:23043', '1647:23044', '1647:23050', '1647:23053'],
    visual: '1647:23058',
    img: BASE + 'assets/onboarding/solo-2.png',
  },
};

function soloOnboarding(root, n) {
  const c = SOLO_OB[n];
  if (!c) return;
  const frame = root.querySelector('[data-node="' + c.root + '"]') || root;
  if (frame.dataset.rest) return;
  frame.dataset.rest = '1';
  c.hide.forEach((id) => {
    const el = frame.querySelector('[data-node="' + id + '"]');
    if (el) el.style.display = 'none';
  });
  const bg = document.createElement('img');
  bg.alt = '';
  bg.draggable = false;
  bg.src = A + 'n1974-19388.webp';
  bg.dataset.figma = '방 장면';
  Object.assign(bg.style, { position: 'absolute', left: '0px', top: '0px', width: '390px', height: '844px', objectFit: 'cover', pointerEvents: 'none' });
  frame.insertBefore(bg, frame.firstChild);
  const vis = frame.querySelector('[data-node="' + c.visual + '"]');
  if (vis) {
    [...vis.children].forEach((ch) => (ch.style.visibility = 'hidden'));
    const im = document.createElement('img');
    im.alt = '';
    im.draggable = false;
    im.src = c.img;
    Object.assign(im.style, { position: 'absolute', left: '0px', top: '0px', width: '326px', height: '220px', pointerEvents: 'none' });
    if (getComputedStyle(vis).position === 'static') vis.style.position = 'relative';
    vis.appendChild(im);
  }
}

// 38 글 상세 댓글 프로필: 피그마 "의자 프로필"(1980:28321 등 7개)은 #33383D 원(32) 안에 의자 그림(28, 2만큼 안쪽)이다.
// 웹 생성 화면은 흰 원에 닉네임별 의자를 그려서, 원 색과 그림을 피그마 그대로 바꾼다. 닉네임으로 댓글을 찾는다.
const AVATARS = {
  '푹신푹신 리클라이너17': 'av-1980-28321.png',
  '딱딱한 나무스툴12': 'av-1980-28339.png',
  '새벽2시 소파': 'av-1980-28356.png',
  '퇴근길 편의점 의자': 'av-1980-28373.png',
  '주말 아침 나무스툴': 'av-1980-28390.png',
  '비 오는 날 바퀴달린의자': 'av-1980-28407.png',
  '길거리 편의점 의자': 'av-1980-28424.png',
};
const AV_BG = '#33383D';

function commentProfiles(root) {
  root.querySelectorAll('[data-figma="Community / Comment Item"]').forEach((item) => {
    const nick = Object.keys(AVATARS).find((k) => item.textContent.replace(/\s+/g, ' ').includes(k));
    if (!nick) return;
    const own = (el) => el.closest('[data-figma="Community / Comment Item"]') === item;
    // 크기는 화면 배율과 상관없는 offsetWidth로 잰다(휴대폰 폭에서는 화면 전체가 줄어든다).
    const circle = [...item.querySelectorAll('div, span')].find((el) => {
      if (!own(el)) return false;
      const w = el.offsetWidth, h = el.offsetHeight;
      const rad = parseFloat(getComputedStyle(el).borderRadius) || 0;
      return w > 26 && w < 40 && Math.abs(w - h) < 2 && rad >= w / 2 - 1;
    });
    if (!circle) return;
    circle.style.backgroundColor = AV_BG;
    const url = A + AVATARS[nick];
    [...circle.querySelectorAll('span, div, img')].forEach((el) => {
      const w = el.offsetWidth || el.getBoundingClientRect().width;
      if (w < 18 || w > 32) return;
      if (el.tagName === 'IMG') { if (!el.src.endsWith(AVATARS[nick])) el.src = url; return; }
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.includes('url(')) el.style.background = 'url("' + url + '") center / 100% 100% no-repeat';
    });
  });
}

// 38 글 카드 "대화 다시보기"(1953:12311) 맨 위에 피그마가 얹은 #222628 띠(1971:22954, 카드 기준 0, 118, 342 x 32).
function replayBand(root) {
  const card = root.querySelector('[data-node="1953:12311"]');
  if (!card || card.querySelector('[data-node="1971:22954"]')) return;
  const band = document.createElement('div');
  band.dataset.node = '1971:22954';
  band.dataset.figma = 'Rectangle 1954141400';
  Object.assign(band.style, { position: 'absolute', left: '0px', top: '118px', width: '342px', height: '32px', background: '#222628', pointerEvents: 'none' });
  if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
  card.appendChild(band);
}

export function patchRest(root, n) {
  if (!root) return;
  if (n === 16 || n === 17) soloOnboarding(root, n);
  if (n === 38) { commentProfiles(root); replayBand(root); }
}
