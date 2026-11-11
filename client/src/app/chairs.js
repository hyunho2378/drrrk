// 의자 꾸미기에서 고른 의자(종류와 색)를 어느 화면에서든 내 의자로 쓴다.
// 그림은 팀 피그마 Branding의 일러스트 자산 원본(PNG)이고, 작은 칸에는 같은 그림을 256px 무손실로 줄인 것을 쓴다.
import { setText } from './dom.js';

const BASE = import.meta.env.BASE_URL;

// 종류와 스타일(색) 이름, 그림은 팀 피그마 "의자 꾸미기 · 소파 선택" 다섯 장(편의점 의자 5색, 스툴과 소파, 바퀴달린 의자 6색)과
// "잠긴 의자 선택"(리클라이너 3색)에 들어 있는 그대로다. files는 피그마 그림 원본의 해시 이름이다.
export const KINDS = [
  {
    "id": "conv",
    "label": "편의점의자",
    "nick": "졸린 편의점의자12",
    "name": "편의점 의자",
    "colors": [
      "미드나잇 블루",
      "포그 그레이",
      "오프 화이트",
      "네오 라임",
      "울트라 퍼플"
    ],
    "files": [
      "4fdd18ce8a29808bfd7f5ea576d5d32be7ecf5ee",
      "5e85ee935bf42402663b2e77d8a221474cf247c0",
      "b5c25c4caef8e3119474b09c31d38f8143882196",
      "33871c043e7c4e9145ae99a02d9e4f55d741e136",
      "6bfc511e24bfba71de51c7d08b74fd3d6d5d404b"
    ]
  },
  {
    "id": "stool",
    "label": "나무 스툴",
    "nick": "졸린 스툴12",
    "name": "딱딱한 스툴",
    "colors": [
      "클래식 우드",
      "엔틱 우드",
      "화이티 우드",
      "파스텔 퍼플",
      "에너제틱 레드",
      "클리어 블루"
    ],
    "files": [
      "51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017",
      "bbab91fe747a6af0963a989e1bedd5b46ec084b3",
      "450692c4dbd6f70bf357173d769ea9e0c4932145",
      "d7b0bb5005bf858f7cc10867129ee131e9e4f7cd",
      "90255286edc8cfb1926c781e6f530893307bb6eb",
      "964281ee34073888179994f4a14851ee0b07f123"
    ]
  },
  {
    "id": "sofa",
    "label": "소파",
    "nick": "졸린 소파12",
    "name": "푹신한 가죽 소파",
    "colors": [
      "브라운 레더",
      "세이지 그린",
      "엔틱 레더",
      "파스텔 핑크",
      "클라우디 화이트",
      "버터 옐로우"
    ],
    "files": [
      "eab22a7a4d5070b5801bb3367d4f0342e5726543",
      "6e90eda49e343eb6829327dd7e13087ab82f8cc4",
      "b684e5de0a908a2dba00620ac53ac78408378aa1",
      "4a2fafbdd2df80360761b9545fabc16f8eb946ce",
      "66dbe89daeb432881bb2caf2cfd9e219ed206076",
      "ff57f819387eec8e46856697ee330f7e210a8aba"
    ]
  },
  {
    "id": "swivel",
    "label": "바퀴달린 의자",
    "nick": "졸린 바퀴의자12",
    "name": "슝슝 바퀴달린 의자",
    "colors": [
      "미디엄 그레이",
      "라이트 그레이",
      "스카이 블루",
      "크림 옐로우",
      "글로시 레더",
      "클래식 레드"
    ],
    "files": [
      "40b4fa7cb4ef3462ed43c200a5cc19917bef448e",
      "f77c03c1bf89bd6ce2986f11ecd9d7660e2d2ad0",
      "801d8aedde75e785af6bd8cfd63a438caeaaedf9",
      "cf2670f44f764000f060a5c3ce230b9845c0d44a",
      "ad12677ce6f516292c08fad678792b25e98e881d",
      "db7b9eb9eed7f0e0b99d27f32ad7544cfb34fa20"
    ]
  },
  {
    "id": "recl",
    "label": "리클라이너",
    "nick": "졸린 리클라이너12",
    "name": "꿀잠 솔솔 리클라이너",
    "colors": [
      "뮤트 그레이",
      "빈티지 레더",
      "크림 화이트",
      "소프트 블루",
      "라임 그린",
      "토프 그레이"
    ],
    "files": [
      "ef3d01c1807348609019737b6ad41d82875319aa",
      "3ff806dcf77f4614dedcd365e0730d81b262f238",
      "ad4a1456",
      "7c2f0480",
      "25629e6f",
      "07c35f83d0c3997b2e1ea43d8f3a7ce52c5ba07e"
    ]
  }
];

// 리클라이너는 엉따가 40.0°가 될 때까지 잠겨 있다(팀 피그마 1951:13839, 6색과 문구 그대로, iOS ChairStore와 같다). 지금 내 엉따는 39.2°다.
export const LOCK = { recl: { title: '꿀잠 솔솔 리클라이너', need: '엉따 온도 40.0°가 되면 획득할 수 있어요' } };
export const isLocked = (k) => !!LOCK[KINDS[k].id];

const KEY = 'drrrk.chair.v1';
const read = () => {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY));
    if (v && KINDS[v.k] && v.c >= 0 && v.c < KINDS[v.k].colors.length && !isLocked(v.k)) return { k: v.k, c: v.c };
  } catch (e) { /* 저장값이 없거나 읽을 수 없으면 기본 의자 */ }
  return { k: 0, c: 0 };
};

let saved = read();
let draft = { k: saved.k, c: saved.c };
const last = [0, 0, 0, 0, 0];
last[saved.k] = saved.c;
const subs = new Set();
const emit = () => subs.forEach((f) => f());

export const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };
export const getDraft = () => draft;
export const getSaved = () => saved;
export const lastColor = (k) => last[k] || 0;

// 종류를 누르면 그 종류에서 마지막으로 보던 색이 열린다. 색을 누르면 그 색만 바뀐다.
export function pickKind(k) {
  if (draft.k === k) return;
  draft = { k, c: last[k] || 0 };
  emit();
}
export function pickColor(c) {
  last[draft.k] = c;
  draft = { k: draft.k, c };
  emit();
}
// 의자 꾸미기를 열 때 보는 의자: 지금 앉은 의자, 새로 얻은 의자는 소파 브라운 레더.
export function openStudio(fresh) {
  const to = fresh ? { k: 2, c: 0 } : { k: saved.k, c: saved.c };
  last[to.k] = to.c;
  draft = to;
  emit();
}
export function commitDraft() {
  // 잠긴 의자는 앉을 수 없다. 앉을 수 있으면 true를 돌려준다.
  if (isLocked(draft.k)) return false;
  saved = { k: draft.k, c: draft.c };
  try { window.localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* 저장 못 해도 이번 방문에서는 유지 */ }
  return true;
}

// 큰 자리는 피그마 원본 PNG, 작은 자리는 같은 그림을 256px로 줄인 PNG다.
export const big = (k, c) => BASE + 'assets/chairs/v2/' + KINDS[k].files[c] + '.png';
export const thumb = (k, c) => BASE + 'assets/chairs/v2/t-' + KINDS[k].files[c] + '.png';
// 의자 꾸미기(20) 전용 그림(11. 12. 04:46 사용자 지시 "누르면 큰 그림이 늦게 바뀐다"): 큰 그림은 표시 190의 2배인 380px WebP(투명, 품질 0.92, 한 장 약 17KB),
// 작은 칸은 76 칸의 2배인 152px WebP다. 원본 1024px PNG(한 장 약 710KB, 29장 20.6MB)는 다른 화면이 그대로 쓴다.
export const hero = (k, c) => BASE + 'assets/chairs/v2/h-' + KINDS[k].files[c] + '.webp';
export const tile = (k, c) => BASE + 'assets/chairs/v2/s-' + KINDS[k].files[c] + '.webp';
// 다섯 종류의 모든 스타일 큰 그림과 작은 그림을 미리 받아 디코드해 둔다. 한 번 디코드한 그림은 Image 객체를 붙잡아 두어 눌렀을 때 같은 프레임에 바로 그린다.
// 지금 보는 의자부터 받는다. 돌려주는 약속은 전부 끝나면 풀린다(그림 하나가 실패해도 풀린다).
const warmed = new Map();
export const isWarm = (u) => warmed.get(u) === true;
const warmOne = (u) => {
  if (warmed.has(u)) return warmed.get(u) === true ? Promise.resolve() : warmed.get(u).p;
  const im = new Image();
  im.decoding = 'async';
  const p = new Promise((res) => {
    const done = () => { warmed.set(u, true); keep.push(im); res(); };
    im.onload = () => (im.decode ? im.decode().then(done, done) : done());
    im.onerror = () => { warmed.delete(u); res(); };
  });
  warmed.set(u, { p });
  im.src = u;
  return p;
};
const keep = [];
let warmAll = null;
export function warmStudio() {
  if (warmAll) return warmAll;
  const order = [];
  const d = draft;
  KINDS.forEach((k, i) => order.push(tile(i, 0)));
  KINDS[d.k].colors.forEach((_, c) => { order.push(hero(d.k, c)); order.push(tile(d.k, c)); });
  KINDS.forEach((k, i) => k.colors.forEach((_, c) => { order.push(hero(i, c)); order.push(tile(i, c)); }));
  warmAll = Promise.all([...new Set(order)].map(warmOne));
  return warmAll;
}
// 화면 그림 주소(./assets/images/...) 안의 파일 이름 자리에 넣는 값: 한 단계 올라가서 chairs/v2 폴더로 간다.
const rel = (k, c, large) => '../chairs/v2/' + (large ? '' : 't-') + KINDS[k].files[c] + '.png';
export const mineRel = (large) => rel(saved.k, saved.c, large);
const IDX = { conv: 0, stool: 1, sofa: 2, swivel: 3, recl: 4 };
export const fixedRel = (id, n, large) => rel(IDX[id], Math.min(n - 1, KINDS[IDX[id]].colors.length - 1), large);

// MY 화면과 새 의자 팝업의 이름 글자를 내 의자에 맞춘다(화면 그림은 live.js swapAssets가 바꾼다).
export function patchMyChair(root) {
  const k = KINDS[saved.k];
  [...root.querySelectorAll('p[data-outline]')].forEach((p) => {
    const t = p.textContent.trim();
    if ((/^드르륵칵 /.test(t) || t === '딱딱한 나무 스툴') && t !== '드르륵칵 ' + k.label) {
      setText(p, '드르륵칵 ' + k.label);
      p.style.width = 'auto';
    } else if (/졸린 .*\d+$/.test(t) && t !== k.nick) {
      setText(p, k.nick);
      p.style.width = 'auto';
    }
  });
}
