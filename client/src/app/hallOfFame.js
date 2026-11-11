// 39 커뮤니티 목록 명예의 전당 카우셀 5장(탁빛나 11. 11. "5장 추가작업", 답글 "반영부탁드립니다!").
// 피그마 1953:19406 안 캐러셀(2298:20561)은 왼쪽부터 Carousel / 1, 4, 3, 2, 5 다섯 장이고 간격은 330(폭 318, 사이 12)이다.
// 생성 화면에는 앞 두 장만 있다. 둘째 장(1953:19496)을 본으로 셋째부터 다섯째 장을 같은 자리 규칙으로 덧붙인다.
// 앞 두 장의 그림과 글은 피그마 현재 값과 같아서(첫 장 eadc554 장면, 둘째 장 제목 같음) 둘째 장 장면만 새 그림(4f7f22b4)으로 바꾼다.
// 카드 넘기기와 점 옮기기는 live.js carouselOf가 맡는다. 그래서 attachDrag보다 먼저 불러야 다섯 장을 모두 센다.
// 그림은 보이기 전에 받아서 디코드까지 끝낸다(예전 그림이 먼저 보였다가 바뀌지 않게).
import { setText } from './dom.js';

const A = (import.meta.env.BASE_URL || '/') + 'assets/hall5/';
const STEP = 330;
// 둘째 장부터 다섯째 장(피그마 x 순서). node는 피그마 카드 노드, w는 제목 칸 폭.
const CARDS = [
  { node: '2296:20166', file: 'hall-2.webp', title: '남친이 1주년 선물로\n다이소 틴트 사줌', w: 158 },
  { node: '2296:20162', file: 'hall-3.webp', title: '남사친이 자꾸만\n좋아져서 고민이야', w: 145 },
  { node: '2298:20557', file: 'hall-4.webp', title: '너네는 친구가 남미새면\n어떻게 할거야?', w: 185 },
  { node: '2296:20170', file: 'hall-5.webp', title: '친친 스토리에 나만 빼고\n등록해둔 친구가 있어', w: 189 },
];

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

function paintScene(card, url) {
  const old = card.querySelector(':scope > [data-figma="Scene"]');
  if (!old) return;
  const img = document.createElement('img');
  img.alt = '';
  img.decoding = 'sync';
  img.src = url;
  img.setAttribute('data-figma', 'Scene');
  Object.assign(img.style, { position: 'absolute', left: '0px', top: '0px', width: '318px', height: '232px', display: 'block', objectFit: 'fill' });
  old.replaceWith(img);
}

export async function prepareHall(root, n) {
  if (n !== 39 || !root || root.dataset.hall) return;
  const base = root.querySelector(':scope > [data-figma="Carousel / 2"]');
  if (!base) return;
  root.dataset.hall = '1';
  await Promise.all(CARDS.map((c) => load(A + c.file)));
  const left0 = parseFloat(getComputedStyle(base).left) - STEP;
  let after = base;
  CARDS.forEach((c, i) => {
    const card = i === 0 ? base : base.cloneNode(true);
    if (i > 0) {
      card.setAttribute('data-figma', 'Carousel / ' + (i + 2));
      card.setAttribute('data-node', c.node);
      card.querySelectorAll('[data-node]').forEach((el) => el.removeAttribute('data-node'));
      card.style.left = left0 + STEP * (i + 1) + 'px';
      after.after(card);
      after = card;
      const p = card.querySelector(':scope > [data-figma="Carousel Title"]');
      if (p) { setText(p, c.title); p.style.width = c.w + 'px'; }
    }
    paintScene(card, A + c.file);
  });
}
