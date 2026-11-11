import { LIVE_LIST } from './liveList.js';
import { currentMode } from './sort.js';
import { setText } from './dom.js';
import { motion, live as LIVE } from '../tokens.js';
import { setStory, setConcern } from './story.js';
// 라이브 목록 카드 v2. 팀 피그마 "라이브 · 리스트 시안 v2"(1972:22375)와 "라이브 리스트 카드 · 상태 정의"(1972:22488) 값을 그대로 옮겼다.
// 카드(342 x 112, #222628, 모서리 16)는 그대로 두고, 오른쪽 장면 썸네일과 타이머, 말하는 사람 수를 지운 뒤
// 아래 줄(보는 사람 수, 점, 남은 시간)과 오른쪽 아래 의자 얼굴 묶음을 상태별로 그린다. iOS LiveRoomCard와 같은 값이다.
// 상태: talk(말하는 중), quiet(조용함), alone(혼자 있는 방), soon(곧 끝, 5분 이하), fresh(막 열린 방).

const BASE = (import.meta.env.BASE_URL || '/') + 'assets/chairs/v2/t-';
const LIVE_SCREENS = [10, 47, 48, 49, 50, 51, 52];

// 투명판 의자 그림(일러스트 자산 원본의 투명판 해시).
const C = {
  convBlue: '4fdd18ce8a29808bfd7f5ea576d5d32be7ecf5ee',
  convLime: '33871c043e7c4e9145ae99a02d9e4f55d741e136',
  stoolOak: '51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017',
  stoolPurple: 'd7b0bb5005bf858f7cc10867129ee131e9e4f7cd',
  sofaBrown: 'eab22a7a4d5070b5801bb3367d4f0342e5726543',
  sofaSage: '6e90eda49e343eb6829327dd7e13087ab82f8cc4',
  sofaWhite: '66dbe89daeb432881bb2caf2cfd9e219ed206076',
  wheelDark: '40b4fa7cb4ef3462ed43c200a5cc19917bef448e',
  wheelBlue: 'cf2670f44f764000f060a5c3ce230b9845c0d44a',
  recl: 'ef3d01c1807348609019737b6ad41d82875319aa',
};

// 화면마다 세 카드의 상태와 의자(작은 얼굴들, 큰 얼굴). 피그마 시안 v2 첫 두 카드(말하는 중, 조용함) 순서를 따른다.
const PLAN = {
  10: [['talk', [C.wheelBlue, C.stoolOak], C.convBlue, 1], ['quiet', [C.convBlue], C.sofaBrown], ['soon', [C.stoolPurple, C.sofaSage], C.convLime, 3]],
  47: [['talk', [C.wheelBlue, C.stoolOak], C.convBlue, 1], ['quiet', [C.convBlue], C.sofaBrown], ['soon', [C.stoolPurple, C.sofaSage], C.convLime, 3]],
  48: [['fresh', [C.sofaWhite], C.recl], ['talk', [C.stoolOak, C.wheelDark], C.convLime, 2], ['alone', [], C.stoolOak]],
  49: [['talk', [C.sofaSage, C.stoolPurple], C.convBlue, 2], ['soon', [C.wheelDark, C.stoolOak], C.sofaBrown, 1], ['quiet', [C.convLime], C.sofaWhite]],
  50: [['quiet', [C.stoolOak], C.sofaBrown], ['talk', [C.convBlue, C.sofaSage], C.wheelDark, 3], ['fresh', [C.stoolPurple], C.recl]],
  51: [['alone', [], C.convLime], ['talk', [C.wheelBlue, C.stoolOak], C.sofaWhite, 1], ['quiet', [C.convBlue], C.stoolPurple]],
  52: [['soon', [C.sofaBrown, C.stoolOak], C.convBlue, 2], ['fresh', [C.sofaSage], C.wheelDark], ['talk', [C.stoolPurple, C.convLime], C.recl, 1]],
};

const EYE = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#6E767C"/><path d="M15.47 7.83C14.8819 6.30882 13.861 4.99331 12.5334 4.04604C11.2058 3.09878 9.62971 2.56129 7.99997 2.5C6.37023 2.56129 4.79416 3.09878 3.46657 4.04604C2.13898 4.99331 1.11805 6.30882 0.52997 7.83C0.490254 7.93985 0.490254 8.06015 0.52997 8.17C1.11805 9.69118 2.13898 11.0067 3.46657 11.954C4.79416 12.9012 6.37023 13.4387 7.99997 13.5C9.62971 13.4387 11.2058 12.9012 12.5334 11.954C13.861 11.0067 14.8819 9.69118 15.47 8.17C15.5097 8.06015 15.5097 7.93985 15.47 7.83ZM7.99997 11.25C7.35718 11.25 6.72883 11.0594 6.19437 10.7023C5.65991 10.3452 5.24335 9.83758 4.99736 9.24372C4.75138 8.64986 4.68702 7.99639 4.81242 7.36596C4.93782 6.73552 5.24735 6.15642 5.70187 5.7019C6.15639 5.24738 6.73549 4.93785 7.36593 4.81245C7.99637 4.68705 8.64983 4.75141 9.24369 4.99739C9.83755 5.24338 10.3451 5.65994 10.7022 6.1944C11.0594 6.72886 11.25 7.35721 11.25 8C11.2486 8.86155 10.9058 9.68743 10.2966 10.2966C9.6874 10.9058 8.86152 11.2487 7.99997 11.25Z" fill="#6E767C"/></svg>';
const TIMER = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M12.1875 6.5C12.1875 9.64112 9.64112 12.1875 6.5 12.1875C3.35888 12.1875 0.8125 9.64112 0.8125 6.5C0.8125 3.35888 3.35888 0.8125 6.5 0.8125C9.64112 0.8125 12.1875 3.35888 12.1875 6.5Z" stroke-width="1.6" stroke="black"/><path d="M6.5 6.5013V2.16797C7.18376 2.16829 7.85773 2.33042 8.46683 2.64109C9.07594 2.95176 9.60288 3.40216 10.0046 3.95547L6.5 6.5013Z" fill="black"/></svg>';

const FONT = "'SUIT', system-ui, sans-serif";
const CSS = `
@keyframes lv2Bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.7)}}
.lv2-bar{transform-origin:50% 50%;animation:lv2Bar 900ms ease-in-out infinite}
`;

function el(tag, style, html) {
  const e = document.createElement(tag);
  if (style) Object.assign(e.style, style);
  if (html != null) e.innerHTML = html;
  return e;
}

// 의자 얼굴 원: 작은 원 32(그림 26~28), 큰 원 48(그림 43). 바탕 #33383D, 테두리 #222628 2. 말하는 큰 원은 #2EE59D 2.5.
function face(file, x, y, big, talking) {
  const d = big ? 48 : 32;
  const w = big ? 2.5 : 2;
  const c = el('div', {
    position: 'absolute', left: x + 'px', top: y + 'px', width: d + 'px', height: d + 'px', borderRadius: '50%',
    background: '#33383D', boxShadow: '0 0 0 ' + w + 'px ' + (big && talking ? '#2EE59D' : '#222628'), overflow: 'hidden',
  });
  const img = el('img', { position: 'absolute', left: (big ? 2.5 : 2) + 'px', top: (big ? 2.5 : 2) + 'px', width: (big ? 43 : 28) + 'px', height: (big ? 43 : 28) + 'px', objectFit: 'contain' });
  img.alt = '';
  img.src = BASE + file + '.png';
  c.appendChild(img);
  return c;
}

function speaking(x, y) {
  const b = el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '20px', height: '16px', borderRadius: '999px', background: '#2EE59D', boxShadow: '0 0 0 2px #222628', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' });
  [4, 8, 5].forEach((h, i) => {
    const bar = el('span', { display: 'block', width: '2px', height: h + 'px', borderRadius: '1px', background: '#0D331F', animationDelay: i * 150 + 'ms' });
    bar.className = 'lv2-bar';
    b.appendChild(bar);
  });
  return b;
}

function cluster(state, smalls, big, more, talkFlag) {
  const g = el('div', { position: 'absolute', left: '0', top: '0', width: '342px', height: '112px', pointerEvents: 'none' });
  const talking = talkFlag === undefined ? (state === 'talk' || state === 'soon' || state === 'fresh') : talkFlag;
  // 오른쪽 큰 원의 왼쪽 끝을 기준으로 작은 원을 22씩 겹쳐 왼쪽으로 늘어놓는다(피그마 묶음 값).
  // +N 원이 있는 묶음은 피그마에서 3 왼쪽(275)에 놓인다.
  const bigX = more ? 275 : 278;
  const bigY = state === 'quiet' ? 51 : 46;
  const smallY = bigY + 16;
  const list = state === 'alone' ? [] : smalls;
  let x = bigX - 22 * list.length;
  if (more) {
    const m = el('div', { position: 'absolute', left: x - 19 + 'px', top: smallY + 3 + 'px', width: '26px', height: '26px', borderRadius: '50%', background: '#33383D', boxShadow: '0 0 0 2px #222628', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '6px', boxSizing: 'border-box', fontFamily: "'Noto Sans KR', " + FONT, fontSize: '9.72px', fontWeight: '700', lineHeight: '14px', letterSpacing: '-0.04em', color: '#D9DEE3', whiteSpace: 'nowrap' }, '+' + more);
    g.appendChild(m);
  }
  list.forEach((f) => { g.appendChild(face(f, x, smallY, false, false)); x += 22; });
  if (state === 'alone') {
    const seat = el('div', { position: 'absolute', left: '256px', top: '62px', width: '32px', height: '32px', borderRadius: '50%', background: '#222628', border: '1.5px dashed rgba(255,255,255,.35)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: '16px', fontWeight: '700', color: 'rgba(255,255,255,.5)' }, '+');
    g.appendChild(seat);
  }
  g.appendChild(face(big, bigX, bigY, true, talking));
  if (talking) g.appendChild(speaking(bigX + 34, bigY + 35));
  return g;
}

function metaRow(state, views, left) {
  const m = el('div', { position: 'absolute', left: '16px', top: '76px', height: '23px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: FONT, whiteSpace: 'nowrap' });
  const eye = el('div', { display: 'flex', alignItems: 'center', gap: '4px' });
  eye.appendChild(el('span', { display: 'block', width: '16px', height: '16px' }, EYE));
  eye.appendChild(el('span', { fontSize: '12px', fontWeight: '700', color: '#6E767C', letterSpacing: '-0.04em' }, views));
  m.appendChild(eye);
  // 곧 끝 카드(빨간 시계 배지 카드)도 보는 수 옆에 남은 시간을 쓴다(11/11 의정 댓글 1943:12022 핀 (88,699) "여기도 남은 시간 뜨게").
  // 시간은 배지와 같은 값(카드 timer, 없으면 03:00)이고 글 모양은 말하는 중 카드의 "12:32 남음"과 같다(12 Medium #9AA1A6, 점 3, 간격 6).
  m.appendChild(el('span', { display: 'block', width: '3px', height: '3px', borderRadius: '50%', background: '#9AA1A6' }));
  const blue = state === 'alone' || state === 'fresh';
  const txt = state === 'alone' ? '첫 대화 상대를 기다려요' : state === 'fresh' ? '방금 열림' : left + ' 남음';
  const t = el('span', { fontSize: '12px', fontWeight: '500', color: blue ? '#36D2FF' : '#9AA1A6', letterSpacing: '-0.04em' }, txt);
  m.appendChild(t);
  return { m, time: blue ? null : t };
}

// 목록에서 누른 카드(방 구경 37의 제목과 보는 수에 쓴다). 한 번 쓰면 비운다(위 가로 카드로 들어가면 37 기본 글자 그대로).
let picked = null;
// 사진보정 이야기 카드(라이브 목록 첫 카드, 위 가로 카드 첫 장). 이 카드로 들어가면 방 구경과 방이 사진보정 이야기다(팀 메모 2100:24023).
export const PHOTO_TITLE = '둘이 찍은 사진인데\n지만 보정해서 올린 여우';
const flat = (t) => String(t || '').replace(/\s+/g, '');
export const isPhotoCard = (card) => flat(card && (card.title || card)) === flat(PHOTO_TITLE);
// 방 구경(37)에 들어가기 전에 고른 카드와 이야기 값을 정한다. card는 LIVE_LIST 카드 모양({ title, views, meta, st, timer }).
// 사진보정 카드면 setStory('photo'), 다른 카드는 setStory('ssang').
// 카드별 고민(방 고민 탭이 읽는다): 사진보정 카드는 null, 그 밖의 카드는 { title: 카드 제목, tag: 카드가 속한 탭 이름 }.
// 알림 키워드 카드와 위 가로 카드도 이 함수를 지나서 같은 규칙을 받는다.
export function pickWatch(card) {
  const photo = isPhotoCard(card);
  setStory(photo ? 'photo' : 'ssang');
  setConcern(photo || !card ? null : { title: card.title, tag: tabOf(card.title) });
  picked = card ? { title: String(card.title).replace(/ \n/g, '\n'), views: String(card.views ?? ''), left: leftOf(card) } : null;
}
// 위 가로 카드 첫 두 장 값(피그마 1943:12396 캐러셀 Carousel / 1, 4의 제목, 보는 수, 시계). 둘째 장은 곧 끝 방(빨간 시계 02:30)이다.
// 다섯 장 전체 값은 liveCarousel.js LIVE_CARDS 에 있고, 셋째부터 다섯째 장은 그 파일이 직접 누름을 받는다. iOS LiveData.featured와 같다.
const FEATURED = [
  { title: PHOTO_TITLE, views: '22', meta: '04:30 남음', st: 'talk' },
  { title: '남친이 1주년 선물로\n다이소 틴트 사줌', views: '12', meta: '02:30 남음', st: 'soon', timer: '02:30' },
];
// 방 구경(37)으로 들어간다. 알림 키워드 카드처럼 라이브 목록 밖에서도 부른다.
// 예: openWatch(LIVE_LIST[10][0]) 은 사진보정 방 구경, openWatch({ title: '3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?', views: '22', meta: '12:32 남음', st: 'talk' }).
export function openWatch(card) {
  pickWatch(card);
  window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to: 37, t: 'push' } }));
}
// 방 구경(37)의 시계가 시작할 초. 누른 카드의 남은 시간(카드 글 "12:32 남음", 곧 끝 카드는 03:00 배지)에서 시작한다. 방금 열린 방과 기다리는 방은 20:00.
// 위 가로 카드로 들어오면 피그마 값 06:12.
let watchLeft = 372;
export const watchStart = () => watchLeft;
// 카드가 속한 탭 이름. 친구(48), 연애(49), 가족(50), 학교(51), 진로(52) 목록에서 같은 제목(빈칸과 줄바꿈 무시)을 찾는다.
// 전체(10)에만 있거나 어느 탭에도 없는 제목은 빈 글자. iOS LiveData.tab(for:)와 같은 규칙이다.
const TABS = [[48, '친구'], [49, '연애'], [50, '가족'], [51, '학교'], [52, '진로']];
export function tabOf(title) {
  const t = flat(title);
  const hit = TABS.find(([n]) => (LIVE_LIST[n] || []).some((c) => flat(c.title) === t));
  return hit ? hit[1] : '';
}
const secOf = (s) => { const m = /(\d{1,2}):(\d{2})/.exec(s || ''); return m ? +m[1] * 60 + +m[2] : null; };
const leftOf = (c) => (c.st === 'soon' ? secOf(c.timer || '03:00') : secOf(c.meta)) ?? 1200;

// 정렬 순서. 인기순: 피그마 목록 순서. 최신순: 방금 열린 방, 첫 상대를 기다리는 방, 그다음 남은 시간이 긴 방.
// 맞춤순: 기본 고민(친구가 썸남 앞에서 내 쌍밍아웃함)과 가까운 친구와 연애 고민이 먼저(친구 48, 연애 49 탭에 있는 글).
const secsOf = (c) => { if (c.st === 'soon') return 180; const m = /(\d{1,2}):(\d{2})/.exec(c.meta || ''); return m ? +m[1] * 60 + +m[2] : 0; };
const MATCH_TITLES = new Set([...(LIVE_LIST[48] || []), ...(LIVE_LIST[49] || [])].map((c) => c.title));
function orderList(list, mode) {
  const a = list.map((c, i) => ({ c, i }));
  const key = (x) => {
    if (mode === 'new') return [x.c.st === 'fresh' ? 0 : x.c.st === 'alone' ? 1 : 2, -secsOf(x.c), x.i];
    // 친구 이야기와 썸, 연애 이야기가 둘 다 있는 글이 가장 가깝고, 그다음 한쪽만 있는 글, 친구와 연애 탭 글, 나머지 순이다.
    if (mode === 'match') { const t = x.c.title; const sc = (/친구|베프|동기/.test(t) ? 1 : 0) + (/썸|남친|애인|여친/.test(t) ? 1 : 0); return [-sc, MATCH_TITLES.has(t) ? 0 : 1, x.i]; }
    // 인기순은 보는 수 큰 순, 같으면 피그마 목록 순서다(11/09 사용자 지적 정렬 오류로 정한 규칙, iOS LiveView와 같다).
    return [-(parseInt(x.c.views, 10) || 0), x.i];
  };
  a.sort((p, q) => { const kp = key(p), kq = key(q); for (let k = 0; k < kp.length; k++) if (kp[k] !== kq[k]) return kp[k] - kq[k]; return 0; });
  return a;
}

// 피그마 카드 한 장(342 x 112, #222628, 모서리 16). 제목 16 Bold 196 폭, 아래 줄은 카드 왼쪽 16, 위 76.
function cardOf(c) {
  const card = el('button', { position: 'relative', display: 'block', width: '342px', height: '112px', flex: '0 0 auto', borderRadius: '16px', background: '#222628', border: '0', padding: '0', margin: '0', cursor: 'pointer', textAlign: 'left', WebkitTapHighlightColor: 'transparent', fontFamily: FONT });
  card.className = 'lv2-card';
  card.setAttribute('aria-label', c.title.replace(/\n/g, ' '));
  const t = el('div', { position: 'absolute', left: '16px', top: '16px', width: '196px', fontSize: '16px', fontWeight: '700', lineHeight: '22px', letterSpacing: '-0.04em', color: '#F8F8F8', whiteSpace: 'pre' }, c.title.replace(/ \n/g, '\n'));
  card.appendChild(t);
  const { m } = metaRow(c.st, c.views, c.st === 'soon' ? (c.timer || '03:00') : c.meta.replace(' 남음', ''));
  card.appendChild(m);
  const smalls = c.small.map((h) => h);
  card.appendChild(cluster(c.st, smalls, c.big, c.more ? c.more.replace('+', '') : 0, c.talk));
  if (c.st === 'soon') {
    const pill = el('div', { position: 'absolute', left: '269px', top: '16px', height: '20px', padding: '0 7px 0 6px', borderRadius: '999px', background: '#FF4D6A', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: '700', color: '#000', letterSpacing: '-0.04em' });
    pill.appendChild(el('span', { display: 'block', width: '13px', height: '13px' }, TIMER));
    pill.appendChild(el('span', null, c.timer || '03:00'));
    card.appendChild(pill);
  }
  // 막 열린 방 왼쪽 위 파란 점(6 x 6 #36D2FF)은 팀이 11. 11. 21:59 라이브 목록에서 지웠다(의정 "목록부분 표시되는거 바꿨습니다").
  card.addEventListener('click', () => openWatch(c));
  return card;
}

// 목록: 피그마 "지금 들어갈 수 있는 방" 아래(위 488)부터 아래 탭 윗선까지를 스크롤 칸으로 두고, 카드를 12 간격으로 쌓는다.
export function patchLiveV2(root, n) {
  if (!LIVE_SCREENS.includes(n) || !root || root.dataset.liveV2) return;
  const list = LIVE_LIST[n] || LIVE_LIST[10];
  // 위 가로 카드 다섯 장의 장면과 글은 liveCarousel.js prepareLiveCarousel 이 이 함수보다 먼저 깐다(피그마 1943:12396 캐러셀).
  const olds = [1, 2, 3].map((i) => root.querySelector('[data-figma="List Card / ' + i + '"]')).filter(Boolean);
  if (!olds.length) return;
  root.dataset.liveV2 = '1';
  if (!document.getElementById('lv2-css')) {
    const st = document.createElement('style');
    st.id = 'lv2-css';
    st.textContent = CSS + '.lv2-scroll{scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}.lv2-scroll::-webkit-scrollbar{display:none}.lv2-card{transition:transform 120ms cubic-bezier(.2,0,0,1)}.lv2-card:active{transform:scale(.98)}';
    document.head.appendChild(st);
  }
  const top = Math.min(...olds.map((o) => parseFloat(o.style.top || getComputedStyle(o).top) || 488));
  olds.forEach((o) => (o.style.display = 'none'));
  const nav = root.querySelector('[data-figma="bottom_navigation"]');
  const navTop = nav ? parseFloat(nav.style.top || getComputedStyle(nav).top) || 760 : 760;
  // 화면 스크롤(live.js scrollerOf)이 있는 화면(10, 48~52)은 목록을 따로 스크롤하지 않고 카드 높이만큼 길게 깔아서,
  // 위 가로 카드와 탭과 목록이 한 장으로 같이 올라간다(피그마 2100:23638 목록 칸 1476 높이, iOS LiveView FigmaScroll과 같은 동작).
  // 11/10 메모 "지금 라이브 부분 스크롤이 이상해요(전체 탭만)": 목록 안 스크롤과 화면 스크롤이 따로 놀아 화면 스크롤이 위쪽만 64 올리고
  // 목록은 제자리에 남아 탭 아래 빈 띠가 생겼다. 전체 탭은 카드가 12장이라 목록 안 스크롤이 길어 이 어긋남이 늘 보였다.
  const pageScroll = LIVE.scrollScreens.includes(n);
  const box = el('div', pageScroll
    ? { position: 'absolute', left: '0', top: top + 'px', width: '390px', zIndex: '2' }
    : { position: 'absolute', left: '0', top: top + 'px', width: '390px', height: Math.max(120, navTop - top) + 'px', overflowY: 'auto', overflowX: 'hidden', zIndex: '2' });
  box.className = 'lv2-scroll';
  box.dataset.figma = '라이브 목록';
  // 화면 스크롤이 없는 화면만 목록 안 스크롤을 쓴다. 이때는 화면 전체 끌기와 휠 처리(live.js)가 목록 스크롤을 막지 않게 입력을 위로 올려 보내지 않는다.
  if (!pageScroll) ['wheel', 'pointerdown', 'touchstart', 'touchmove'].forEach((ev) => box.addEventListener(ev, (e) => e.stopPropagation(), { passive: true }));
  // 맨 끝 여백은 화면 스크롤 쪽(LIVE.scrollPad 24)이 둔다. 마지막 카드 아래가 아래 탭 윗선에서 24 떨어진다(iOS와 같은 값).
  const col = el('div', { display: 'flex', flexDirection: 'column', gap: '12px', padding: pageScroll ? '0 24px' : '0 24px 24px 24px' });
  const cards = list.map((c) => cardOf(c));
  orderList(list, currentMode()).forEach((x) => col.appendChild(cards[x.i]));
  box.appendChild(col);
  // 정렬 시트(sort.js)가 고른 순서로 카드를 다시 쌓는다. 카드는 제자리에서 새 자리로 미끄러진다.
  root.__lv2Sort = (mode, animate) => {
    const before = new Map(cards.map((k) => [k, k.offsetTop]));
    orderList(list, mode).forEach((x) => col.appendChild(cards[x.i]));
    if (!pageScroll) box.scrollTop = 0;
    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cards.forEach((k) => {
      const dy = before.get(k) - k.offsetTop;
      if (Math.abs(dy) > 0.5) k.animate([{ transform: 'translateY(' + dy + 'px)' }, { transform: 'translateY(0)' }], { duration: 440, easing: motion.emphasizedDecel });
    });
  };
  // 아래 탭보다 아래에 놓아 탭바가 목록을 덮는다.
  if (nav) root.insertBefore(box, nav); else root.appendChild(box);
  // 예전 카드 세 장 자리에 있던 누름 자리는 지운다(새 카드가 직접 눌린다).
  const layer = root.parentElement || root;
  layer.querySelectorAll('[data-hotspot]').forEach((h) => {
    const y = parseFloat(h.style.top), x = parseFloat(h.style.left), w = parseFloat(h.style.width);
    if (y >= top - 2 && Math.abs(x - 24) < 2 && Math.abs(w - 342) < 2) h.style.display = 'none';
    // 위 가로 카드 두 장(피그마 Carousel / 1, 2). 누르면 그 카드 값으로 방 구경에 들어간다. 첫 장은 사진보정 이야기, 둘째 장은 쌍밍아웃 이야기다.
    // 화면 이동은 원래 누름 자리(flow.js "라이브 방 구경")가 하고, 여기서는 그보다 먼저 카드와 이야기 값만 정한다.
    const feat = Math.abs(y - 128) < 2 && Math.abs(w - 318) < 2 ? FEATURED[Math.abs(x - 24) < 2 ? 0 : Math.abs(x - 354) < 2 ? 1 : -1] : null;
    if (feat && !h.dataset.lv2Pick) {
      h.dataset.lv2Pick = '1';
      h.addEventListener('click', () => pickWatch(feat), true);
    }
  });
}

function soonText(state, left) {
  return state === 'soon' ? '03:00' : left;
}

// 방 구경(37, 피그마 1943:12838) "대화 중 3" 줄. 생성 화면은 흰 바탕이 붙은 원본 그림을 납작하게 구운 그림이라 원 바깥에 흰 테가 보였다.
// 투명판 그림으로 바꾸고 원 바탕을 #222628로 칠한다(iOS LiveWatchView와 같은 값: 원 54, 그림은 원 안에 꽉 채워 둥글게 자름).
const WATCH = { '리클라이너21': C.convBlue, '나무스툴12': C.stoolOak, '가죽소파19': C.sofaBrown };
const WATCH_SEAT = { '리클라이너21': '3ab7dfb2602df8c0d82aa5a0372d6fea572af0c1', '나무스툴12': '6977f0a432c84a681ba24727c6cf90be17ca73b3', '가죽소파19': '24a5f181f6780ce4f26219b8a54ffece8c11c38c' };
function patchWatchTitle(root) {
  if (root.dataset.watchTitle) return;
  root.dataset.watchTitle = '1';
  const p = picked;
  picked = null;
  watchLeft = p ? p.left : 372;
  if (!p) return;
  const title = [...root.querySelectorAll('p[data-figma]')].find((e) => e.getAttribute('data-figma').indexOf('둘이 찍은 사진인데') === 0);
  if (title) { setText(title, p.title); Object.assign(title.style, { whiteSpace: 'pre', width: 'auto' }); }
  const view = root.querySelector('[data-figma="보는 중"] p');
  if (view) { setText(view, p.views); Object.assign(view.style, { width: 'auto', whiteSpace: 'nowrap' }); }
}
// 방 구경 장면: 생성 화면은 옛 장면(길거리)과 바닥 이름표 4개를 그대로 담고 있다. 팀 피그마 1943:12838은 새 장면(편의점 앞 밤)이고 이름표가 없다(11/09 QA).
const OLD_FLOOR = ['부드러운 리클라이너21', '아기자기 나무스툴12', '새로 산 가죽소파19', '새벽2시 편의점 의자', 'Group 2147229021'];
function patchWatchScene(root) {
  if (root.dataset.watchScene) return;
  const sc = root.querySelector('[data-figma="scene (방 미리보기)"]');
  if (!sc) return;
  root.dataset.watchScene = '1';
  sc.style.setProperty('background-image', 'url(' + (import.meta.env.BASE_URL || '/') + 'assets/live2/watch-scene.webp)', 'important');
  sc.style.setProperty('background-size', '100% 100%', 'important');
  OLD_FLOOR.forEach((name) => root.querySelectorAll(':scope > [data-figma="' + name + '"]').forEach((e) => (e.style.display = 'none')));
}
export function patchWatchSeats(root, n) {
  if (n === 37 && root) { patchWatchScene(root); patchWatchTitle(root); }
  if (n !== 37 || !root || root.dataset.watchSeats) return;
  const imgs = [...root.querySelectorAll('[data-figma="avatar"]')];
  if (!imgs.length) return;
  root.dataset.watchSeats = '1';
  imgs.forEach((img) => {
    const seat = img.parentElement && img.parentElement.dataset.figma ? img.parentElement.dataset.figma.replace('Seat / ', '') : '';
    // 최종 드르륵 방 구경 2340:26264(11/12): 자리 아바타(2340:26281, 26284, 26287, 54 원, 모서리 27)는 흰 바탕 의자 그림 채우기(FIT)다.
    // 그림은 피그마 채우기 그대로(assets/images, 37번 미리 받기 목록 screenAssets.js에 이미 있음).
    const file = WATCH_SEAT[seat];
    if (!file) return;
    img.src = (import.meta.env.BASE_URL || '/') + 'assets/images/' + file + '.webp';
    Object.assign(img.style, { background: '#222628', borderRadius: '50%', objectFit: 'cover', boxSizing: 'border-box' });
  });
}
