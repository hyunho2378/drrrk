// 장면 배경 그림. 팀 피그마의 최신 프레임이 쓰는 그림 원본을 그대로 쓴다.
// 함께 드르륵 방(28, 29, 30, 31, 40)은 빛나가 11. 9. 올린 새 장면(흰 소파, 갈색 리클라이너, 보라 의자, 파랑 의자, 피그마 이미지 해시 eadc5541)이다.
// 피그마 1979:27515 안 "image 1208091463" 사각형을 2배(780 x 1688)로 받아 WebP로 줄였다(assets/room2/scene.webp, 약 57KB).
// 41, 42, 43, 46은 현장 모드 장면이다. 옛 프레임은 이 자리에 영상이나 옛 그림이 들어 있었다. 영상이 들어 있던 자리는 그림으로 바꾼다.
import { setText } from './dom.js';
import { cloneOf } from './donor.js';
import { attachSpeakers } from './room.js';
import { roomStory, STORY_BANNER } from './roomConcern.js';

const FILES = {
  base: 'room2/scene.webp',
  fold: 'room2/scene.webp',
  field: 'images/bd5037f7eb80881c82b3de6cd35faf6073b5c925.webp',
  // 혼자 드르륵 방에 처음 들어온 장면(1647:25199 영상의 첫 화면, 멀리서 본 흰 의자와 테이블).
  far: 'images/solo-video-still.webp',
  // 쌍밍아웃 이야기의 라임 의자 장면. 팀 피그마 2096:22171 등의 그림 원본(이미지 해시 fefcb80d)이고, 이모지 프레임 2096:22531은 빨간 얼굴 의자 그림(edefa8f1)이다. 둘 다 생성 화면에 이미 있던 파일이다.
  ssang: 'images/fefcb80d4928c0cf3f5620530d53f3059fc8b25b.webp',
  ssangEmoji: 'images/edefa8f194a3501af0e2bc80dad7013e722b3141.webp',
};
// 사진보정 이야기(photo)와 혼자 방의 장면.
export const SCENE_OF = { 28: 'base', 29: 'base', 30: 'base', 31: 'fold', 40: 'base', 41: 'field', 42: 'field', 43: 'field', 46: 'far' };
// 쌍밍아웃 이야기(ssang)의 함께 드르륵 방 장면.
const SSANG_OF = { 28: 'ssang', 29: 'ssang', 30: 'ssang', 31: 'ssangEmoji', 40: 'ssang' };
// 카드별 고민으로 들어온 방도 쌍밍아웃 장면이다(roomConcern.js roomStory).
const keyOf = (n) => (roomStory() === 'ssang' && SSANG_OF[n]) || SCENE_OF[n];
export const sceneUrl = (key) => new URL('assets/' + FILES[key], document.baseURI).href;
export const sceneFiles = (n) => (keyOf(n) ? ['assets/' + FILES[keyOf(n)]] : []);

// 화면 맨 아래 칸(장면)의 영상이나 그림을 새 그림으로 바꾼다. 같은 화면에 한 번만 한다.
export function swapScene(root, n) {
  const key = keyOf(n);
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
  // community.js도 40의 장면 칸(1647:24790)을 사진보정 장면으로 바꾸는데, 이야기를 모르는 코드라서 이미 바꿨다는 표시를 먼저 달아 둔다.
  if (n === 40 && first.isConnected) first.dataset.swapped40 = '1';
}

// ---------- 새 방 장면의 이름표, 채팅, 고민 배너 ----------
// 값은 모두 팀 피그마 새 프레임(11. 9.)의 글자와 위치다. 펼침 1979:27515, 배너 펼침 1979:27613, 올려놓기 1979:27416, 해 뜨기 1분 전 1979:27780.
// 생성 화면(옛 프레임 1807:23107, 1807:23214, 1807:22997, 1807:23281, 1647:24788)은 고치지 않고 화면이 뜰 때 글자와 위치만 바꾼다.
export const ROOM2_SCREENS = [28, 29, 30, 31, 40];
export const ROOM2 = {
  // 이름표 묶음(Group 2147229349): 피그마 위치 17, 306, 크기 358 x 84. 안쪽 값은 묶음 기준 위치다.
  group: { x: 17, y: 306, w: 358, h: 84 },
  // 옛 이름(생성 화면 글자)에서 새 이름과 자리로. 말하는 사람(흰 글자, 초록 점, 파동)은 보라돌이 의자71이다.
  names: {
    '진실의 의자10': ['폭신폭신 소파38', 0, 70, 70],
    '딱딱한 나무 스툴12': ['바퀴 달린 의자26', 90, 30, 72],
    '차가운 새벽의자92': ['편의점 드르륵71', 290, 53, 68],
    '새벽2시 피시방': ['보라돌이 의자71', 206, 36, 74],
  },
  dot: [195, 40],
  wave: [228, 0],
  speaker: '보라돌이 의자71',
  banner: '오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가…',
  // 채팅 줄: 생성 화면의 줄 위치(top)마다 [새 위치, 이름, 이름 폭, 글, 글 폭]
  rows: {
    room: {
      509: [509, '바퀴 달린 의자26', 79, '헐 자기 얼굴만 보정한 거 실화?', 162],
      572: [572, '보라돌이 의자71', 74, '그건 서운할 만하지 ㅠㅠ', 126],
      635: [635, '편의점 드르륵71', 74, '지만 쏙 빼고 보정한건 진짜 선넘는다', 190],
    },
    40: {
      536: [536, '바퀴 달린 의자26', 79, '근데 진짜 신경 ㄴㄴ', 102],
      599: [679, '폭신폭신 소파38', 76, '맞아여 앞으로 그런 애한테 신경쓰지 마요', 213],
    },
  },
  // 내 채팅: [왼쪽, 위, 폭, 글, 글 폭]
  mine: {
    room: [221, 698, 145, '나만 예민한 거 아니지?', 121],
    40: [216, 599, 150, '응 그냥 무시하려고 ㅎㅎ', 126],
  },
  // 해 뜨기 1분 전 알림 위치(1979:27780의 System / 1분 전 2009:12527).
  toastTop: { 40: 643 },
};

// ---------- 쌍밍아웃 이야기(ssang) ----------
// 값은 팀 피그마 "1110코딩기준 _수정사항" 함께 드르륵 줄(2096:22459 접힘, 2096:22171 기본, 2096:22269 배너 펼침, 2096:22531 이모지)의 글자와 위치다.
// 생성 화면(1807:23107 등)의 글과 채팅이 이미 이 이야기 그대로라서 글은 두고, 빠진 이름표 묶음(29)과 해 뜨기 1분 전(40) 배치만 맞춘다.
export const SSANG = {
  group: { x: 27, y: 288, w: 357, h: 115 },
  // 이름: [묶음 안 왼쪽, 위, 폭]. 말하는 사람 자리(흰 글자, 초록 점, 파동)는 새벽2시 피시방이다(2096:22173).
  names: {
    '진실의 의자10': [0, 101, 59],
    '딱딱한 나무 스툴12': [80, 87, 79],
    '차가운 새벽의자92': [278, 101, 79],
    '새벽2시 피시방': [199, 36, 70],
  },
  dot: [188, 40],
  wave: [219, 0],
  // 펼친 고민 배너(2096:22269 고민 주제 I2096:22334)의 제목과 글, 키워드. 글의 줄바꿈도 피그마 그대로다.
  // 글은 roomConcern.js 한 곳에 둔다.
  banner: STORY_BANNER.ssang,
  // 해 뜨기 1분 전(40): 사진보정 프레임 2100:24394의 줄 자리에 이 이야기의 이름과 생성 화면(1647:24788) 채팅 글을 넣는다.
  rows: {
    40: {
      536: [536, '진실의 의자10', 65, '아 아쉽다 ㅠ 한창 재밌었는디', 152],
      599: [679, '차가운 새벽의자92', 86, '근데 머 더 얘기할 것도 없고 빠이쳐요', 192],
    },
  },
  mine: { 40: [280, 599, 86, '좋아여 빠이', 62] },
  toastTop: { 40: 643 },
};
const px = (v) => v + 'px';
function placeNames(g) {
  Object.assign(g.style, { left: px(ROOM2.group.x), top: px(ROOM2.group.y), width: px(ROOM2.group.w), height: px(ROOM2.group.h) });
  [...g.querySelectorAll(':scope > p')].forEach((p) => {
    const key = (p.dataset.room2 || p.textContent).trim();
    const spec = ROOM2.names[key] || Object.values(ROOM2.names).find((s) => s[0] === key);
    if (!spec) return;
    p.dataset.room2 = spec[0];
    p.dataset.sync = '1';
    p.dataset.named = '1';
    setText(p, spec[0]);
    Object.assign(p.style, { left: px(spec[1]), top: px(spec[2]), width: px(spec[3]), whiteSpace: 'pre' });
  });
  const dot = g.querySelector(':scope > [data-figma="Ellipse"]');
  if (dot) Object.assign(dot.style, { left: px(ROOM2.dot[0]), top: px(ROOM2.dot[1]) });
  const wave = g.querySelector(':scope > [data-figma="Group 2147229021"]');
  if (wave) Object.assign(wave.style, { left: px(ROOM2.wave[0]), top: px(ROOM2.wave[1]) });
}
function setRow(row, spec) {
  const ps = [...row.querySelectorAll('p')];
  const name = ps[0], body = ps[ps.length - 1];
  row.style.top = px(spec[0]);
  row.setAttribute('data-figma', 'row · ' + spec[1]);
  [[name, spec[1], spec[2]], [body, spec[3], spec[4]]].forEach(([p, t, w]) => {
    if (!p) return;
    p.dataset.sync = '1';
    p.dataset.named = '1';
    setText(p, t);
    Object.assign(p.style, { width: px(w), whiteSpace: 'pre' });
  });
}

function placeSsangNames(g) {
  Object.assign(g.style, { left: px(SSANG.group.x), top: px(SSANG.group.y), width: px(SSANG.group.w), height: px(SSANG.group.h) });
  [...g.querySelectorAll(':scope > p')].forEach((p) => {
    const key = p.textContent.trim();
    const spec = SSANG.names[key];
    if (!spec) return;
    Object.assign(p.style, { left: px(spec[0]), top: px(spec[1]), width: px(spec[2]), whiteSpace: 'pre' });
  });
  const dot = g.querySelector(':scope > [data-figma="Ellipse"]');
  if (dot) Object.assign(dot.style, { left: px(SSANG.dot[0]), top: px(SSANG.dot[1]) });
  const wave = g.querySelector(':scope > [data-figma="Group 2147229021"]');
  if (wave) Object.assign(wave.style, { left: px(SSANG.wave[0]), top: px(SSANG.wave[1]) });
}

async function patchSsang(root, n) {
  // 1) 이름표 묶음. 옛 접힘 프레임(1807:23214)에는 묶음이 없어서 28번 화면에서 빌려 온다(팀 피그마 2096:22531 접힘에는 이름표가 있다).
  let g = root.querySelector(':scope > [data-figma="Group 2147229349"]');
  let added = false;
  if (!g) {
    g = await cloneOf(28, ':scope > [data-figma="Group 2147229349"]');
    if (g && root.isConnected) {
      g.removeAttribute('data-node');
      const after = root.querySelector(':scope > [data-figma="chat fade"]') || root.firstElementChild;
      after.before(g);
      added = true;
    }
  }
  if (g) placeSsangNames(g);
  // 2) 접힌 고민 배너 글자 값(2096:22512, SUIT Medium 14, 자간 -4%). 글은 생성 화면 그대로다.
  const ban = root.querySelector('[data-figma="고민 주제 · 최소화 (탭하면 자세히)"]');
  const bp = ban && [...ban.querySelectorAll(':scope > p')].find((p) => p.textContent.trim() !== '고민');
  if (bp) Object.assign(bp.style, { fontSize: '14px', lineHeight: '17px', letterSpacing: '-0.56px' });
  const handle = root.querySelector('[data-figma="주전부리 퀵슬롯"] > [data-figma="접기 핸들"]');
  if (handle) handle.style.background = 'rgba(0, 0, 0, 0.45)';
  // 3) 해 뜨기 1분 전 채팅과 알림 자리
  const spec = SSANG.rows[n];
  if (spec) {
    const topOf = (r) => Math.round(parseFloat(getComputedStyle(r).top));
    [...root.querySelectorAll(':scope > [data-figma^="row ·"]')].forEach((r) => { const s = spec[topOf(r)]; if (s) setRow(r, s); });
  }
  const m = SSANG.mine[n];
  const mine = m && root.querySelector(':scope > [data-figma^="내 채팅"]');
  if (mine) {
    Object.assign(mine.style, { left: px(m[0]), top: px(m[1]), width: px(m[2]) });
    const p = mine.querySelector('p');
    if (p) { p.dataset.sync = '1'; setText(p, m[3]); Object.assign(p.style, { width: px(m[4]), whiteSpace: 'pre' }); }
  }
  if (SSANG.toastTop[n]) {
    const t = root.querySelector(':scope > [data-figma="System / 1분 전"]');
    if (t) t.style.top = px(SSANG.toastTop[n]);
  }
  if (added && root.isConnected) attachSpeakers(root);
}

export async function patchRoom2(root, n) {
  if (!ROOM2_SCREENS.includes(n) || !root || root.dataset.room2) return;
  // 어느 이야기를 그릴지는 story.js 한 곳에서 읽는다. 이 값은 펼친 고민 배너 글(room.js)도 읽는다.
  const story = roomStory();
  root.dataset.room2 = story;
  if (story === 'ssang') { await patchSsang(root, n); return; }
  // 1) 이름표 묶음. 옛 접힘 프레임(1807:23214)에는 묶음이 없어서 28번 화면에서 빌려 온다.
  let g = root.querySelector(':scope > [data-figma="Group 2147229349"]');
  if (!g) {
    g = await cloneOf(28, ':scope > [data-figma="Group 2147229349"]');
    if (g && root.isConnected) {
      g.removeAttribute('data-node');
      const after = root.querySelector(':scope > [data-figma="chat fade"]') || root.firstElementChild;
      after.before(g);
    }
  }
  if (g) placeNames(g);
  // 2) 고민 배너 글
  const ban = root.querySelector('[data-figma="고민 주제 · 최소화 (탭하면 자세히)"]');
  const bp = ban && [...ban.querySelectorAll(':scope > p')].find((p) => p.textContent.trim() !== '고민');
  // 글자 값은 피그마 2009:12505(SUIT Medium 14, 자간 -4%, 행간 자동 17). 옛 해 뜨기 프레임(1647:24788)은 12였다.
  if (bp) { bp.dataset.sync = '1'; setText(bp, ROOM2.banner); Object.assign(bp.style, { fontSize: '14px', lineHeight: '17px', letterSpacing: '-0.56px' }); }
  // 퀵슬롯 접기 핸들 바탕: 피그마 1979:27597(44 x 20, 모서리 10, 검정 45%). 생성 코드가 fill로 적어 바탕이 비어 있었다.
  const handle = root.querySelector('[data-figma="주전부리 퀵슬롯"] > [data-figma="접기 핸들"]');
  if (handle) handle.style.background = 'rgba(0, 0, 0, 0.45)';
  // 3) 채팅 줄
  const spec = ROOM2.rows[n] || ROOM2.rows.room;
  let rows = [...root.querySelectorAll(':scope > [data-figma^="row ·"]')];
  const topOf = (r) => Math.round(parseFloat(getComputedStyle(r).top));
  // 옛 접힘 프레임은 줄이 둘(572, 635)뿐이다. 새 장면의 맨 위 줄(509, 불투명도 0.4)을 572 줄을 복제해 만든다.
  if (!ROOM2.rows[n] && !rows.some((r) => topOf(r) === 509)) {
    const tpl = rows.find((r) => topOf(r) === 572) || rows[0];
    if (tpl) {
      const c = tpl.cloneNode(true);
      c.removeAttribute('data-node');
      c.querySelectorAll('[data-node]').forEach((e) => e.removeAttribute('data-node'));
      Object.assign(c.style, { top: '509px', opacity: '0.4' });
      tpl.before(c);
      rows = [...root.querySelectorAll(':scope > [data-figma^="row ·"]')];
    }
  }
  rows.forEach((r) => { const s = spec[topOf(r)]; if (s) setRow(r, s); });
  // 4) 내 채팅
  const m = ROOM2.mine[n] || ROOM2.mine.room;
  const mine = root.querySelector(':scope > [data-figma^="내 채팅"]');
  if (mine) {
    Object.assign(mine.style, { left: px(m[0]), top: px(m[1]), width: px(m[2]) });
    const p = mine.querySelector('p');
    if (p) { p.dataset.sync = '1'; setText(p, m[3]); Object.assign(p.style, { width: px(m[4]), whiteSpace: 'pre' }); }
  }
  // 5) 해 뜨기 1분 전 알림 위치
  if (ROOM2.toastTop[n]) {
    const t = root.querySelector(':scope > [data-figma="System / 1분 전"]');
    if (t) t.style.top = px(ROOM2.toastTop[n]);
  }
  // 이름표 묶음을 늦게 붙인 화면(29)은 말하는 사람 돌리기를 다시 붙인다.
  if (g && root.isConnected) attachSpeakers(root);
}
