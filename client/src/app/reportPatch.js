// 종료 리포트(1)와 오늘 나눈 대화(3): 팀 피그마 "1110코딩기준 _수정사항" 섹션(2096:22144)의 리포트 프레임을 따른다.
//   쌍밍아웃(ssang): 2096:22857(도움이 된 유저 첫 쪽), 2096:22969(둘째 쪽)
//   사진보정(photo): 2100:24606(첫 쪽), 2100:24718(둘째 쪽)
// 생성 화면 글은 사진보정 글이다. 쌍밍아웃이면 다른 줄(오늘의 고민, 1단계 설명, 둘째 카드 이름과 말, 추천 설명)만 바꾼다.
// 도움이 된 유저: 한 쪽에 의자 3개, 둘째 쪽에 1개(가운데). 좌우 화살표로 쪽을 넘기고 끝 쪽 화살표는 30%로 흐리며 눌리지 않는다.
// 의자를 누르면 추천(하늘색 링과 하늘색 이름), 다시 누르면 취소. 개수 제한은 없고 쪽을 넘겨도 고른 상태는 남는다.
// 피그마 첫 쪽은 "새벽2시 피시방"이 추천된 모습이라 처음 상태도 그대로 둔다.
// 오늘의 드르륵 대화들 카드에는 따봉이 없다(피그마 그대로, taps.js의 따봉도 1, 3번에는 붙이지 않는다).
import { motion } from '../tokens.js';
import { q, setText } from './dom.js';
import { getStory } from './story.js';
import { pressable } from './taps.js';

const SKY = '#36D2FF';
const OFF = '#F8F8F8';
const IMG = (h) => 'url(assets/images/' + h + '.webp)';

// 두 이야기 모두 의자 넷이 같다(2096:22945~22955와 2096:23057, 2100 프레임도 같은 이름과 그림).
const CHAIRS = [
  { key: 'lime', name: '진실의\n의자10', img: IMG('33871c043e7c4e9145ae99a02d9e4f55d741e136') },
  { key: 'swivel', name: '새벽2시\n피시방', img: IMG('f77c03c1bf89bd6ce2986f11ecd9d7660e2d2ad0') },
  { key: 'stool', name: '딱딱한\n나무 스툴12', img: IMG('51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017') },
  { key: 'white', name: '차가운\n새벽의자92', img: IMG('b5c25c4caef8e3119474b09c31d38f8143882196') },
];
const PAGES = [[0, 1, 2], [3]];
const FIRST_PICK = ['swivel'];

// 사진보정 글(생성 화면)과 쌍밍아웃 글(2096:22857)
const SSANG_TEXT = {
  '둘이 찍은 사진, 자기만 보정한 친구': '썸남 앞에서 내 쌍수를 말해버린 친구',
  '"이거 일부러야?"로 이야기가 시작됐어요': '"걔 완전 미친 거 아니야?"로 이야기가 시작됐어요',
  '따딱한 나무 스툴12': '딱딱한 나무 스툴12',
  '다음엔 ‘엥 너 사진?’ 하고 물어봐봐 ㅋ': '다음엔 ‘그 얘길 왜 해?’ 하고 물어봐봐 ㅋ',
  '좋은 이야기를 나눠준 유저를 추천해주세요': '좋은 이야기를 나눠준 유저를 누르면 추천, 다시 누르면 취소돼요',
};

function storyText(root) {
  if (getStory() !== 'ssang') return;
  q(root, 'p').forEach((p) => {
    const next = SSANG_TEXT[p.textContent.trim()];
    if (!next) return;
    setText(p, next);
    // 글이 길어진 줄은 생성 화면의 고정 폭에서 줄이 바뀌지 않게 폭을 글에 맞춘다(피그마는 한 줄).
    p.style.width = 'max-content';
    p.style.whiteSpace = 'nowrap';
  });
}

// 추천 따봉(의정, 탁빛나 2026. 11. 11. 종료 1647:26726 댓글): 의자를 추천하는 순간 따봉이 아바타 위에서 떠올라 옅어지며 사라진다.
// 피그마 Icon / Line thumb-up 3개(2308:19637 16px 20%, 2308:19638 18px 45%, 2308:19639 22px 100%, 색 #36D2FF)가 추천된 의자(새벽2시 피시방 칸 x159) 가운데 위로
// 아래에서 위로 겹쳐 그려진 떠오름 자취다. 아이콘은 22(2308:19639) 크기로 칸 가운데(왼쪽 25)에 두고, 아바타 원 위 21에서 시작해 36 올라가
// 끝 자리가 피그마 22px 아이콘 자리(원 위에서 -15)와 같다. 선택 상태는 하늘색 링과 이름으로 남고 따로 남는 따봉 배지는 피그마에 없다.
export const THUMB = { size: 22, left: 25, top: 21, rise: 36, peak: 1.15, ms: 700, hold: 0.35 };
// 피그마 thumb-up(1299:21817) 24 그리드 모양, 앱 C-thumb-up과 같은 경로
const THUMB_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="' + SKY + '" d="M20.9739 9.50733C20.5832 9.05709 20.1003 8.69606 19.558 8.44867C19.0156 8.20129 18.4264 8.07332 17.8303 8.07345H14.5068L14.7868 6.37295C14.8858 5.77412 14.7663 5.15964 14.45 4.64158C14.1338 4.12352 13.6418 3.7364 13.0639 3.55084C12.486 3.36528 11.8607 3.39363 11.3019 3.63073C10.7432 3.86783 10.2883 4.29787 10.0202 4.84242L8.66547 7.58771V20.571H17.2471C18.2498 20.5669 19.2177 20.203 19.9747 19.5455C20.7318 18.888 21.2276 17.9806 21.3721 16.9884L21.9595 12.8225C22.0426 12.2316 21.9975 11.6297 21.8275 11.0577C21.6574 10.4857 21.3663 9.95692 20.9739 9.50733Z"/><path fill="' + SKY + '" d="M2 12.239V16.4048C2.00132 17.5093 2.44065 18.5681 3.22161 19.349C4.00257 20.13 5.0614 20.5693 6.16584 20.5707H6.99901V8.07313H6.16584C5.0614 8.07445 4.00257 8.51377 3.22161 9.29473C2.44065 10.0757 2.00132 11.1345 2 12.239Z"/></svg>';
const reducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// 칸마다 하나만 두는 떠오름 따봉(보이기 전에 만들어 둔다). 다시 띄우면 앞 움직임을 지우고 처음부터 한다.
function makeThumb(circle) {
  const el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  el.dataset.figma = 'thumb float';
  el.innerHTML = THUMB_SVG;
  Object.assign(el.style, { position: 'absolute', left: THUMB.left + 'px', top: THUMB.top + 'px', width: THUMB.size + 'px', height: THUMB.size + 'px', pointerEvents: 'none', opacity: '0', transformOrigin: '50% 50%', zIndex: '2', lineHeight: '0' });
  circle.appendChild(el);
  return el;
}
const stopThumb = (el) => el.getAnimations().forEach((a) => a.cancel());
function flyThumb(el) {
  stopThumb(el);
  if (reducedMotion()) return;
  const r = THUMB.rise;
  // 위치와 크기는 표준 곡선, 옅어짐은 앞 35%를 1로 두고 고르게 사라진다(표준 곡선은 앞이 빨라 옅어짐을 같이 두면 200ms 안에 거의 안 보인다).
  el.animate([
    { transform: 'translateY(0) scale(1)' },
    { transform: 'translateY(' + -r / 2 + 'px) scale(' + THUMB.peak + ')', offset: 0.5 },
    { transform: 'translateY(' + -r + 'px) scale(' + THUMB.peak + ')' },
  ], { duration: THUMB.ms, easing: motion.standard });
  el.animate([{ opacity: 1 }, { opacity: 1, offset: THUMB.hold }, { opacity: 0 }], { duration: THUMB.ms, easing: 'linear' });
}

const imgOf = (cell) => q(cell, '[data-figma]').find((e) => /url\(/.test(e.style.backgroundImage || ''));
const nameOf = (cell) => cell.querySelector('[data-figma="name"]') || cell.querySelector('p');

function picker(root) {
  const list = root.querySelector('[data-figma="Vote List"]');
  if (!list || list.dataset.tap) return;
  const holder = q(list, '[data-figma="cells"]').find((s) => s.querySelector('[data-figma="name"]') && !s.querySelector('[data-figma="cells"]'));
  if (!holder) return;
  const old = [...holder.children];
  // 고르지 않은 칸(이름이 하늘색이 아닌 칸)을 틀로 쓴다.
  const tpl = old.find((c) => { const n = nameOf(c); const f = n && n.querySelector('path'); return !(f && (f.style.fill || f.getAttribute('fill') || '').toUpperCase() === SKY); }) || old[0];
  if (!tpl || !imgOf(tpl) || !nameOf(tpl)) return;
  list.dataset.tap = '1';
  // 떠오르는 따봉이 줄 위로 나가므로 줄(생성 화면 overflow hidden)의 자르기를 푼다. 줄 안 내용은 줄 크기 안에 있어 보이는 모양은 같다.
  list.style.overflow = 'visible';

  const picked = new Set(FIRST_PICK);
  const cells = CHAIRS.map((ch) => {
    const c = tpl.cloneNode(true);
    q(c, '[data-tap]').forEach((e) => delete e.dataset.tap);
    const pic = imgOf(c);
    pic.style.backgroundImage = ch.img;
    Object.assign(pic.style, { left: '8px', top: '8px' });
    const nm = nameOf(c);
    setText(nm, ch.name);
    Object.assign(nm.style, { width: 'auto', whiteSpace: 'pre', transition: 'color ' + motion.stateIn + 'ms ' + motion.standard });
    const circle = pic.parentElement;
    if (getComputedStyle(circle).position === 'static') circle.style.position = 'relative';
    // 추천 링: 피그마 Ellipse 36의 안쪽 2 하늘색 선(2096:22952)
    const ring = document.createElement('div');
    ring.setAttribute('aria-hidden', 'true');
    Object.assign(ring.style, { position: 'absolute', left: '0px', top: '0px', width: '72px', height: '72px', borderRadius: '50%', boxShadow: 'inset 0 0 0 2px ' + SKY, pointerEvents: 'none', opacity: '0', transition: 'opacity ' + motion.stateIn + 'ms ' + motion.standard });
    circle.appendChild(ring);
    const thumb = makeThumb(circle);
    c.setAttribute('aria-label', ch.name.replace('\n', ' '));
    return { ch, c, pic, nm, ring, thumb };
  });
  const paintCell = (it) => {
    const on = picked.has(it.ch.key);
    it.ring.style.opacity = on ? '1' : '0';
    it.nm.style.color = on ? SKY : OFF;
    it.c.setAttribute('aria-pressed', on ? 'true' : 'false');
  };
  cells.forEach((it) => {
    paintCell(it);
    pressable(it.c, () => {
      if (picked.has(it.ch.key)) picked.delete(it.ch.key);
      else picked.add(it.ch.key);
      paintCell(it);
      // 추천하면 따봉이 한 번 떠오르고, 취소하면 떠오르던 따봉도 바로 지운다(움직임 없음).
      if (picked.has(it.ch.key)) flyThumb(it.thumb);
      else stopThumb(it.thumb);
      if (picked.has(it.ch.key)) it.pic.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 300, easing: motion.standard });
    });
  });

  // 쪽 칸: 240 폭에 의자 72씩 사이 12, 남은 한 개는 가운데(피그마 2096:23057 x159 = 칸 75 + 84)
  const pageEl = document.createElement('div');
  Object.assign(pageEl.style, { display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'flex-start', width: '240px', height: '116px', flex: 'none' });
  old.forEach((c) => c.remove());
  holder.appendChild(pageEl);
  let at = 0;
  const fill = () => { pageEl.replaceChildren(...PAGES[at].map((i) => cells[i].c)); };
  fill();

  const arrows = q(list, '[data-figma="arrow"]');
  const sideOf = (a) => (a.querySelector('[data-figma="chevron-right"]') ? 1 : -1);
  const icon = (a) => a.querySelector('[data-figma="Icon / Line"]') || a;
  const syncArrows = () => arrows.forEach((a) => {
    const can = sideOf(a) > 0 ? at < PAGES.length - 1 : at > 0;
    const ic = icon(a);
    ic.style.transition = 'opacity ' + motion.stateIn + 'ms ' + motion.standard;
    ic.style.opacity = can ? '1' : '0.3';
    a.style.pointerEvents = can ? 'auto' : 'none';
    a.setAttribute('aria-disabled', can ? 'false' : 'true');
  });
  syncArrows();
  let busy = false;
  const step = (dir) => {
    const nx = at + dir;
    if (busy || nx < 0 || nx >= PAGES.length) return;
    busy = true;
    const out = pageEl.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(' + -24 * dir + 'px)', opacity: 0 }], { duration: 150, easing: motion.standard, fill: 'forwards' });
    out.onfinish = () => {
      at = nx;
      fill();
      syncArrows();
      const back = pageEl.animate([{ transform: 'translateX(' + 24 * dir + 'px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], { duration: 150, easing: motion.standard });
      back.onfinish = () => { out.cancel(); busy = false; };
    };
  };
  arrows.forEach((a) => {
    a.setAttribute('aria-label', sideOf(a) > 0 ? '다음 의자' : '이전 의자');
    // 눈림 반응은 안쪽 화살표에 주고, 끝 쪽 흐림(0.3)은 바깥 Icon / Line에 둔다. 같은 요소에 두면 손을 뗄 때 흐림이 지워진다.
    const ic = icon(a);
    pressable(a, () => step(sideOf(a)), ic.firstElementChild || ic);
  });
}

export function patchReportStory(root, n) {
  if ((n !== 1 && n !== 3) || !root || root.dataset.reportStory) return;
  root.dataset.reportStory = '1';
  storyText(root);
  picker(root);
}
