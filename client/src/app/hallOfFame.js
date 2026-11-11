// 39 커뮤니티 목록 명예의 전당(탁빛나 11. 12. 새 섹션 "자간줄여" 2340:28014 커뮤니티 목록, 캐러셀 2366:34754).
// 큰 사진 카드(318 x 232)가 지난 밤 이야기 목록 카드와 같은 작은 글 카드(342 x 112, 모서리 16, 사이 12)로 바뀌었다.
// 카드는 왼쪽부터 List Card / 1, 2, 4, 5, 6 다섯 장이고 x 간격은 354다. 점은 다섯 개(Page Dots, y 282)다.
// 생성 화면(옛 1953:19406)의 큰 카드 두 장을 빼고, 목록 첫 카드(List Card / 1)를 본으로 다섯 장을 만들어 같은 자리 규칙으로 놓는다.
// 카드가 낮아져 아래 묶음(점, 탭 줄, 구분선, 정렬 줄, 목록)이 위로 올라왔다. 새 섹션 값(top)으로 옮긴다.
// 카드 넘기기와 점 옮기기는 live.js carouselOf가 맡는다(이름이 "Carousel /"로 시작하는 뿌리 바로 아래 칸). 그래서 attachDrag보다 먼저 불러야 다섯 장을 모두 센다.
// 썸네일은 피그마 Thumb 노드(2366:34756, 34903, 34876, 34821, 34808)를 3배로 내보낸 그림이다. 보이기 전에 받아서 디코드까지 끝낸다.
import { setText } from './dom.js';

const A = (import.meta.env.BASE_URL || '/') + 'assets/hall6/';
const STEP = 354;
const TOP = 158;
// [제목, 따봉, 댓글, 따봉 숫자 폭, 댓글 숫자 폭, 그림]. 피그마 캐러셀 카드 값 그대로다.
export const HALL_CARDS = [
  ['친구가 썸남 앞에서\n내 쌍밍아웃함', 128, 52, 20, 16, 'hall-thumb-1.png'],
  ['부모님은 공무원 하라는데\n나는 그림이 좋다', 97, 61, 14, 12, 'hall-thumb-2.png'],
  ['조별과제 혼자 다 했는데\n이름은 다섯 명', 118, 56, 16, 14, 'hall-thumb-3.png'],
  ['전남친이 내 친구랑\n사귄다는 소식 들음', 156, 63, 18, 14, 'hall-thumb-4.png'],
  ['화장실에서 혼자\n급식 먹다가 걸린 썰 푼다', 31, 17, 16, 16, 'hall-thumb-5.png'],
];
// 카드 아래 묶음의 새 자리(새 섹션 2340:28014 값).
const MOVE = { 'Page Dots': 282, Tabs: 308, 'Tab Divider': 329, '정렬 · 인기순': 360, '지난 밤 이야기': 360, 'Frame 2147249309': 400 };

const ready = new Map();
function load(url) {
  if (!ready.has(url)) {
    const im = new Image();
    im.decoding = 'async';
    im.src = url;
    ready.set(url, (im.decode ? im.decode() : Promise.resolve()).catch(() => {}));
  }
  return ready.get(url);
}

export async function prepareHall(root, n) {
  if (n !== 39 || !root || root.dataset.hall) return;
  const olds = [...root.querySelectorAll(':scope > [data-figma^="Carousel /"]')];
  const list = root.querySelector(':scope > [data-figma="Frame 2147249309"]');
  const base = list && list.querySelector(':scope > [data-figma="List Card / 1"]');
  if (!olds.length || !base) return;
  root.dataset.hall = '1';
  await Promise.all(HALL_CARDS.map((c) => load(A + c[5])));
  let after = olds[olds.length - 1];
  HALL_CARDS.forEach(([title, likes, comments, likeW, commentW, file], i) => {
    const card = base.cloneNode(true);
    [card, ...card.querySelectorAll('[data-node]')].forEach((el) => el.removeAttribute('data-node'));
    card.setAttribute('data-figma', 'Carousel / ' + (i + 1));
    Object.assign(card.style, { position: 'absolute', left: 24 + STEP * i + 'px', top: TOP + 'px', width: '342px', height: '112px' });
    setText(card.querySelector('[data-figma="List Title"]'), title);
    const nums = [...card.querySelectorAll('[data-figma="stats"] > p')];
    [[nums[0], likes, likeW], [nums[1], comments, commentW]].forEach(([el, v, w]) => { if (!el) return; setText(el, String(v)); el.style.width = w + 'px'; });
    const th = card.querySelector('[data-figma="Thumb"]');
    if (th) th.removeAttribute('data-img');
    if (th) th.style.background = 'url("' + A + file + '") center / 100% 100% no-repeat';
    after.after(card);
    after = card;
  });
  olds.forEach((el) => el.remove());
  Object.keys(MOVE).forEach((name) => {
    const el = root.querySelector(':scope > [data-figma="' + name + '"]');
    if (el) el.style.top = MOVE[name] + 'px';
  });
}
