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

// 쌍밍아웃 의자 넷(2096:22945~22955와 2096:23057, 최종 2340:28973, 2340:29088 첫 쪽과 같은 이름과 그림).
const CHAIRS = [
  { key: 'lime', name: '진실의\n의자10', img: IMG('33871c043e7c4e9145ae99a02d9e4f55d741e136') },
  { key: 'swivel', name: '새벽2시\n피시방', img: IMG('f77c03c1bf89bd6ce2986f11ecd9d7660e2d2ad0') },
  { key: 'stool', name: '딱딱한\n나무 스툴12', img: IMG('51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017') },
  { key: 'white', name: '차가운\n새벽의자92', img: IMG('b5c25c4caef8e3119474b09c31d38f8143882196') },
];
// 사진보정 의자 넷(huisu 11/12 02:15 "리포트3 추가", 최종 종료 2369:4086 첫 쪽과 2369:16173 둘째 쪽, 아침 2369:4202, 오늘 나눈 대화 2369:4316).
// 첫 쪽은 폭신폭신 소파38(sofa_05 2369:16143), 바퀴달린 의자26(wheeled_chair_05 2369:16148, 56 x 47을 원 안 8, 12에), 보라돌이 의자71(convenience_chair_05 2369:16153),
// 둘째 쪽은 편의점 드르륵71(convenience_chair_01 2369:16315) 하나를 가운데에 둔다. 첫 쪽은 바퀴달린 의자26이 추천된 모습(Ellipse 36 하늘색 선, 이름 #36D2FF)이다.
const PHOTO_CHAIRS = [
  { key: 'sofa', name: '폭신폭신\n소파38', img: IMG('66dbe89daeb432881bb2caf2cfd9e219ed206076') },
  { key: 'wheel', name: '바퀴달린\n의자26', img: IMG('ad12677ce6f516292c08fad678792b25e98e881d'), box: [8, 12, 56, 47] },
  { key: 'purple', name: '보라돌이\n의자71', img: IMG('6bfc511e24bfba71de51c7d08b74fd3d6d5d404b') },
  { key: 'store', name: '편의점\n드르륵71', img: IMG('4fdd18ce8a29808bfd7f5ea576d5d32be7ecf5ee') },
];
const PAGES = [[0, 1, 2], [3]];
const FIRST_PICK = ['swivel'];
const PHOTO_FIRST_PICK = ['wheel'];
const storyChairs = () => (getStory() === 'photo' ? PHOTO_CHAIRS : CHAIRS);

// 사진보정 글(생성 화면)과 쌍밍아웃 글. 쌍밍아웃 글은 최종 드르륵 페이지 종료 2340:28973, 2340:29088(huisu 11/12 01:48 "리포트1 수정완",
// 탁빛나 01:58 "리포트1 내용 수정되어서 반영부탁드려요")의 지금 글이다. 오늘의 고민, 1단계와 2단계, 3단계 설명, 둘째 카드 말이 바뀌었고
// 추천 설명은 "좋은 이야기를 나눠준 유저를 추천해주세요"(생성 글과 같음)로 돌아갔다. 의자 이름 "따딱한"은 피그마 오타라 앞서 정한 대로 "딱딱한"으로 둔다.
// 1단계와 2단계, 3단계 설명은 사진보정 최종(2369:4086, 2369:16173, 2369:4202, 2369:4316)도 쌍밍아웃과 같은 글이 되었다(huisu 11/12 02:15 "리포트3 추가").
const STEP_TEXT = {
  '"이거 일부러야?"로 이야기가 시작됐어요': '"내가 예민한거야?"로 이야기가 시작됐어요',
  '서운한 마음에 공감하면서, 실수였을 가능성도 얘기했어요.': '서로 비슷했던 경험을 이야기 하며, 고의였을지 토론했어요',
  '다음엔 한번 직접 말해보기로 했어요': '한번 직접 물어보기로 했어요',
};
const SSANG_TEXT = {
  ...STEP_TEXT,
  '둘이 찍은 사진, 자기만 보정한 친구': '친구가 썸남 앞에서 내 쌍밍아웃함.',
  '따딱한 나무 스툴12': '딱딱한 나무 스툴12',
  '다음엔 ‘엥 너 사진?’ 하고 물어봐봐 ㅋ': '엥 그걸 거기서 왜 말하지?',
};
// 사진보정 오늘의 드르륵 대화들 카드 셋(2369:4086 Comment List): 이름, 말, 의자 프로필 그림(28.477 칸, 피그마 STRETCH 자르기 값 그대로).
// 카드 순서는 피그마 위에서 아래(편의점 드르륵71, 보라돌이 의자71, 폭신폭신 소파38)다. 오늘의 고민 줄은 생성 글과 같다.
const PHOTO_CARDS = [
  { name: '편의점 드르륵71', line: '지만 쏙 빼고 보정한건 진짜 선넘는다', hash: '4fdd18ce8a29808bfd7f5ea576d5d32be7ecf5ee', tf: [1.405815601348877, -0.17877066135406494, -0.1968735158443451] },
  { name: '보라돌이 의자71', line: '그건 서운할 만하지 ㅠㅠ', hash: '6bfc511e24bfba71de51c7d08b74fd3d6d5d404b', tf: [1.4777050018310547, -0.2302054911851883, -0.21845699846744537] },
  { name: '폭신폭신 소파38', line: '맞아여 앞으로 그런 애한테 신경쓰지 마요', hash: 'ad4a14569046edce3d326ee86ce00f27fcf1916c', tf: [1.4436248540878296, -0.21152786910533905, -0.23209701478481293] },
];
const AVATAR = 28.477;
// 생성 코드의 CROP 그림과 같은 식: 크기 100 / 배율 %, 자리 -이동 / 배율 x 칸 크기
const cropBg = (c) => 'url(assets/images/' + c.hash + '.webp) ' + (-c.tf[1] / c.tf[0] * AVATAR).toFixed(3) + 'px ' + (-c.tf[2] / c.tf[0] * AVATAR).toFixed(3) + 'px / ' + (100 / c.tf[0]).toFixed(3) + '% ' + (100 / c.tf[0]).toFixed(3) + '% no-repeat';

const fitLine = (p, next) => {
  setText(p, next);
  // 글이 길어진 줄은 생성 화면의 고정 폭에서 줄이 바뀌지 않게 폭을 글에 맞춘다(피그마는 한 줄).
  p.style.width = 'max-content';
  p.style.whiteSpace = 'nowrap';
};

function storyText(root) {
  const photo = getStory() === 'photo';
  const map = photo ? STEP_TEXT : SSANG_TEXT;
  q(root, 'p').forEach((p) => {
    const next = map[p.textContent.trim()];
    if (next) fitLine(p, next);
  });
  if (!photo) return;
  q(root, '[data-figma="베스트 댓글 카드"]').forEach((card, i) => {
    const c = PHOTO_CARDS[i];
    if (!c) return;
    const nm = card.querySelector('p[data-figma="이름 · DRRRK/C1 Bold"]');
    const ln = card.querySelector('p[data-figma="댓글 · DRRRK/B2 Medium"]');
    if (nm && nm.textContent.trim() !== c.name) fitLine(nm, c.name);
    if (ln && ln.textContent.trim() !== c.line) fitLine(ln, c.line);
    const pic = card.querySelector('[data-figma="의자 프로필"] > [data-figma]');
    if (pic) { pic.style.background = cropBg(c); pic.removeAttribute('data-img'); }
  });
}
// 바꾼 그림은 보이기 전에 받아 둔다(보인 뒤 늦게 뜨는 그림 0건).
const urlsOf = () => (getStory() === 'photo' ? [...PHOTO_CARDS.map((c) => 'assets/images/' + c.hash + '.webp'), ...PHOTO_CHAIRS.map((c) => c.img.slice(4, -1))] : []);
function decodeAll(urls) {
  if (typeof Image === 'undefined' || !urls.length) return Promise.resolve();
  const one = (u) => new Promise((res) => { const im = new Image(); im.onload = im.onerror = () => res(); im.src = u; if (im.decode) im.decode().then(res, res); });
  return Promise.race([Promise.all(urls.map(one)), new Promise((res) => window.setTimeout(res, 1500))]);
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

  const photo = getStory() === 'photo';
  const picked = new Set(photo ? PHOTO_FIRST_PICK : FIRST_PICK);
  const cells = storyChairs().map((ch) => {
    const c = tpl.cloneNode(true);
    q(c, '[data-tap]').forEach((e) => delete e.dataset.tap);
    const pic = imgOf(c);
    pic.style.backgroundImage = ch.img;
    pic.removeAttribute('data-img');
    // 그림 칸: 기본 56 x 56을 원 안 8, 8에. 바퀴달린 의자26은 피그마 그대로 56 x 47을 8, 12에 둔다.
    const b = ch.box || [8, 8, 56, 56];
    Object.assign(pic.style, { left: b[0] + 'px', top: b[1] + 'px', width: b[2] + 'px', height: b[3] + 'px', aspectRatio: 'auto' });
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

// 혼자 드르륵 종료 리포트(65, soloReport.js)도 같은 글을 쓴다. 도움이 된 유저 칸이 없어 picker는 할 일이 없다.
// 아침(2)은 최종 2340:23266, 2369:4202가 종료 리포트 윗부분과 같은 짜임이라 종료 생성 화면을 그대로 그리고(MorningReport.jsx) 같은 글과 의자 칸을 쓴다.
// 바꾼 그림을 받을 때까지 기다리는 약속을 돌려준다(live.js prepare가 기다린다).
export function patchReportStory(root, n) {
  if ((n !== 1 && n !== 2 && n !== 3 && n !== 65) || !root || root.dataset.reportStory) return Promise.resolve();
  root.dataset.reportStory = '1';
  storyText(root);
  picker(root);
  return decodeAll(urlsOf());
}

// 아침(2)과 오늘 나눈 대화(3)의 아래 막대(피그마 새 섹션 2340:23399, 2340:29284 "Frame 2147249293", 342 x 78, 세로 제약 BOTTOM).
// 탁빛나 11/12 "하단바 내용 바뀌어서 반영 필요": 회색 버튼(btn 342 x 46, 모서리 28, #222628) 글이 "커뮤니티에 고민 올리기"(SUIT Bold 16, 행간 22.4, 자간 -0.64, #9AA1A6),
// 아래 글이 "올리지 않고 홈으로"(SUIT Bold 14, 행간 19.6, 자간 -0.56, #9AA1A6)로 바뀌었다. 버튼 수(둘), 자리(726, 784), 뒤 검은 그라데이션(Rectangle 1954141374)은 그대로다.
// 생성 화면은 옛 버튼 그림(assets/end2/r-1804-13228, end3/r-1804-13233 "함께 드르륵 앉기")과 "새 방 만들기" 글이라 보이기 전(live.js prepare)에 같은 자리 같은 크기로 바꾼다.
export const MORNING_BAR = { primary: '커뮤니티에 고민 올리기', secondary: '올리지 않고 홈으로', bg: '#222628', fg: '#9AA1A6' };
export function patchMorningBar(root, n) {
  if ((n !== 2 && n !== 3) || !root || root.dataset.morningBar) return;
  const bar = root.querySelector('[data-figma="Frame 2147249293"]');
  if (!bar) return;
  root.dataset.morningBar = '1';
  // 아침(2)은 종료 생성 화면(하늘색 btn div)을 쓴다. 최종 2369:4202 btn(2369:4208)은 회색 #222628, 글 #9AA1A6(SUIT Bold 16, 행간 22.4, 자간 -0.64)이고
  // 묶음 뒤에 검은 그라데이션(Rectangle 1954141374 2369:4205, -1, 632, 392 x 212, 투명에서 73.24% 검정, 세로 제약 BOTTOM)이 깔린다.
  // 그라데이션은 묶음(창 바닥에 붙음, reportMotion.js pinEndBar)의 맨 아래 층으로 넣어 스크롤해도 묶음과 함께 제자리에 있다. 묶음 윗선 726에서 94 위가 632다.
  const live = bar.querySelector(':scope > div[data-figma="btn"]');
  if (n === 2 && live) {
    live.style.background = MORNING_BAR.bg;
    const lp = live.querySelector('p');
    if (lp) { lp.style.color = MORNING_BAR.fg; lp.style.lineHeight = '22.4px'; setText(lp, MORNING_BAR.primary); }
    if (!bar.querySelector(':scope > [data-figma="Rectangle 1954141374"]')) {
      const sc = document.createElement('div');
      sc.setAttribute('aria-hidden', 'true');
      sc.dataset.figma = 'Rectangle 1954141374';
      Object.assign(sc.style, { position: 'absolute', left: '-25px', top: '-94px', width: '392px', height: '212px', pointerEvents: 'none', zIndex: '-1', background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 73.24%)' });
      Object.assign(bar.style, { overflow: 'visible', isolation: 'isolate' });
      bar.prepend(sc);
    }
  }
  const img = bar.querySelector(':scope > img[data-figma="btn"]');
  if (img) {
    const btn = document.createElement('div');
    btn.dataset.figma = 'btn';
    Object.assign(btn.style, { display: 'flex', height: '46px', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', flexShrink: '0', borderRadius: '28px', background: MORNING_BAR.bg });
    const p = document.createElement('p');
    p.dataset.figma = MORNING_BAR.primary;
    Object.assign(p.style, { margin: '0', color: MORNING_BAR.fg, textAlign: 'center', fontFamily: "'SUIT', system-ui, sans-serif", fontSize: '16px', fontWeight: '700', lineHeight: '22.4px', letterSpacing: '-0.64px', whiteSpace: 'pre' });
    p.textContent = MORNING_BAR.primary;
    btn.appendChild(p);
    img.replaceWith(btn);
  }
  const sub = bar.querySelector(':scope > p');
  if (sub) { setText(sub, MORNING_BAR.secondary); sub.dataset.figma = MORNING_BAR.secondary; }
}
