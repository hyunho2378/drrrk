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
    c.setAttribute('aria-label', ch.name.replace('\n', ' '));
    return { ch, c, pic, nm, ring };
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
