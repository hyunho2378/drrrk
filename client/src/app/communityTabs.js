// 커뮤니티 목록(39)의 카테고리 탭. 탭을 누르면 그 탭의 피그마 프레임 내용으로 목록 카드만 바뀐다(의정 11. 11. "커뮤니티 탭 눌러서 바뀌는 화면 추가").
// 피그마 섹션 "커뮤니티 탭 추가"(2272:13452)의 다섯 프레임과 기존 "커뮤니티 목록"(1953:19406)을 노드마다 비교한 결과,
// 프레임마다 다른 곳은 목록 카드 5장의 제목, 따봉 수, 댓글 수, 썸네일 그림과 탭 글자 색과 굵기, 밑줄 자리뿐이다.
// 명예의 전당 카드 줄, 정렬 줄("지난 밤 이야기", "인기순"), 머리, 아래 탭바, 카드 개수와 재생 표식은 다섯 프레임 모두 같아서 그대로 둔다.
//   전체 1953:19406, 친구 2271:12436, 연애 2271:12587, 가족 2271:12738, 학교 2271:12889, 진로 2271:13040
// 전환: 밑줄은 기존처럼 transform으로 옮기고(motion.tab, 표준 곡선), 목록 칸은 180ms 동안 앞 목록과 새 목록이 겹쳐 옅어지고 짙어진다(opacity만).
// 목록은 화면 스크롤(live.js scrollerOf)의 일부라서 탭 줄이 보이는 동안에는 첫 카드도 이미 보인다. 탭을 눌러도 스크롤 값을 바꾸지 않아 머리와 탭 줄과 탭바가 제자리에 있다.
// 고른 탭은 글 상세(38)에 갔다가 뒤로 왔을 때만 이어진다(sessionStorage drrrk-comm-tab). 다른 화면에서 들어오거나 새로 열면 전체에서 시작한다.
import { motion } from '../tokens.js';
import { setText } from './dom.js';
import { pressable } from './taps.js';
import { cameFrom } from './lastScreen.js';

const KEY = 'drrrk-comm-tab';
const TABS = ['전체', '친구', '연애', '가족', '학교', '진로'];
const FADE_MS = 180;
// 피그마 탭 글자 x(모두 폭 27)와 밑줄 폭(전체 27, 나머지 28). 밑줄은 전체 자리(24, 폭 27)를 기준으로 옮기고 늘인다.
const TAB_X = { 전체: 24, 친구: 87, 연애: 150, 가족: 213, 학교: 276, 진로: 339 };
const LINE_W = { 전체: 27, 친구: 28, 연애: 28, 가족: 28, 학교: 28, 진로: 28 };
const ON = '#F8F8F8';
const OFF = '#9AA1A6';

// 썸네일: 피그마 그림 3장(4748fadc3e, 935b1b80a2, 1864c99693)을 카드 자리마다 정해진 자르기(STRETCH 변환 t1, t2, t3)로 80 x 80에 늘린다.
// t1은 카드 1, 4, 5 자리, t2는 카드 2 자리, t3은 카드 3 자리의 변환이다. 전체 탭에 이미 있는 짝(4748 t1, 935b t2, 1864 t3)은 그 그림을 다시 쓴다.
// 새 짝 6개는 피그마 원본 그림을 같은 변환으로 240 x 240에 잘라 WebP로 넣었다(public/assets/community3/thumb-*.webp, 피그마 노드 3배 PNG와 평균 차 1.6~3.9/255).
const BASE = (import.meta.env.BASE_URL || '/') + 'assets/';
const THUMB = {
  '4748fa-t1': null, // 전체 카드 1의 생성 화면 그림(assets/images/4748fadc3e... CROP t1)
  '935b1b-t2': 'community2/n1953-20014.png',
  '1864c9-t3': 'community3/thumb-1864c9-t3.webp',
  '935b1b-t1': 'community3/thumb-935b1b-t1.webp',
  '1864c9-t1': 'community3/thumb-1864c9-t1.webp',
  '1864c9-t2': 'community3/thumb-1864c9-t2.webp',
  '4748fa-t2': 'community3/thumb-4748fa-t2.webp',
  '4748fa-t3': 'community3/thumb-4748fa-t3.webp',
  '935b1b-t3': 'community3/thumb-935b1b-t3.webp',
  // 새 섹션 "자간줄여" 탭 프레임(2340:30370 ~ 2340:30810, 탁빛나 11. 12. "UI 변경되어 반영 필요합니다")에 새로 들어온 그림 6장. 피그마 Thumb 노드를 3배로 내보냈다.
  '5b7485': 'community3/thumb-5b7485.png', // 학교 카드 2, 명예의 전당 셋째와 같은 그림
  '6b25e7': 'community3/thumb-6b25e7.png', // 연애 카드 2, 명예의 전당 넷째와 같은 그림
  'e2f891': 'community3/thumb-e2f891.png', // 연애 카드 1(2340:30484)
  'cfa7e0': 'community3/thumb-cfa7e0.png', // 가족 카드 1(2340:30594)
  'a7bbcf': 'community3/thumb-a7bbcf.png', // 가족 카드 2(2340:30604)
  '17e148': 'community3/thumb-17e148.png', // 진로 카드 1(2340:30814)
};

// 카드 5장: [제목, 따봉, 댓글, 썸네일, 따봉 숫자 폭, 댓글 숫자 폭]. 글과 숫자와 숫자 칸 폭은 각 피그마 프레임의 List Card / 1~5 값 그대로다(스크립트로 옮겼다).
export const TAB_POSTS = {
  전체: [
    ["친구가 썸남 앞에서\n내 쌍밍아웃함", 128, 52, "4748fa-t1", 20, 16],
    ["화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", 31, 17, "935b1b-t2", 16, 16],
    ["맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", 48, 23, "1864c9-t3", 16, 16],
    ["시험 공부 대신\n친구들과 노래방 간 썰", 75, 35, "4748fa-t1", 20, 16],
    ["첫 데이트에서\n의외의 취미 발견!", 64, 29, "4748fa-t1", 20, 16],
  ],
  친구: [
    ["친구가 썸남 앞에서\n내 쌍밍아웃함", 128, 52, "4748fa-t1", 18, 14],
    ["맨날 얻어먹고 한 번도\n안 사는 친구 손절각?", 48, 23, "1864c9-t3", 16, 16],
    ["단톡방에 나만 빼고\n새 방 판 거 알아버림", 73, 38, "1864c9-t3", 14, 14],
    ["생일 파티에 나만\n초대 못 받은 썰", 58, 27, "4748fa-t1", 14, 13],
    ["절친이 내 흑역사를\n스토리에 올렸다", 44, 19, "935b1b-t1", 15, 12],
  ],
  연애: [
    ["고백했는데 답장이\n'ㅇㅋ' 두 글자였다", 214, 87, "e2f891", 18, 14],
    ["전남친이 내 친구랑\n사귄다는 소식 들음", 156, 63, "6b25e7", 18, 14],
    ["첫 데이트에서\n의외의 취미 발견!", 102, 48, "4748fa-t3", 19, 14],
    ["남친 폰에서 내 이름이\n'과제 조원'이었다", 89, 36, "935b1b-t1", 14, 14],
    ["100일 선물로\n문화상품권 받은 썰", 67, 22, "1864c9-t1", 14, 14],
  ],
  가족: [
    ["엄마가 내 일기장\n읽고 모른 척하는 중", 143, 58, "cfa7e0", 19, 14],
    ["동생이 내 옷 입고\n소개팅 나갔다", 91, 33, "a7bbcf", 12, 14],
    ["아빠 카톡 프사가\n내 흑역사 사진임", 78, 29, "935b1b-t3", 14, 14],
    ["명절마다 듣는\n'취업은 했니' 대처법", 62, 44, "1864c9-t1", 14, 15],
    ["가족 단톡방에\n잘못 보낸 메시지", 39, 15, "4748fa-t1", 14, 12],
  ],
  학교: [
    ["화장실에서 혼자\n급식 먹다가 걸린 썰 푼다", 131, 47, "935b1b-t2", 16, 14],
    ["조별과제 혼자 다 했는데\n이름은 다섯 명", 118, 56, "5b7485", 16, 14],
    ["시험 공부 대신\n친구들과 노래방 간 썰", 84, 31, "1864c9-t3", 14, 12],
    ["담임쌤한테 '엄마'라고\n불러버렸다", 70, 24, "4748fa-t1", 14, 14],
    ["발표하다 목소리\n뒤집힌 썰 푼다", 52, 18, "935b1b-t1", 14, 12],
  ],
  진로: [
    ["꿈이 없다고 했더니\n상담이 2시간 됐다", 109, 45, "17e148", 19, 15],
    ["부모님은 공무원 하라는데\n나는 그림이 좋다", 97, 61, "1864c9-t2", 14, 12],
    ["면접에서 장점 묻는데\n머리가 하얘짐", 81, 34, "4748fa-t3", 12, 14],
    ["전과할지 말지\n3학기째 고민 중", 56, 28, "935b1b-t1", 14, 14],
    ["퇴사하고 싶은데\n통장 잔고가 말린다", 48, 37, "1864c9-t1", 14, 14],
  ],
};

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const readTab = () => { try { return window.sessionStorage.getItem(KEY); } catch (e) { return null; } };
const writeTab = (t) => { try { if (t === '전체') window.sessionStorage.removeItem(KEY); else window.sessionStorage.setItem(KEY, t); } catch (e) { /* 저장이 막힌 창에서는 이어지지 않는다 */ } };

const listOf = (root) => root.querySelector('[data-node="1953:20001"]') || root.querySelector('[data-figma="Frame 2147249309"]');
const cardsOf = (list) => [1, 2, 3, 4, 5].map((i) => list.querySelector(':scope > [data-figma="List Card / ' + i + '"]'));

function partsOf(card) {
  const stats = card.querySelector('[data-figma="stats"]');
  const nums = stats ? [...stats.querySelectorAll(':scope > p')] : [];
  return { title: card.querySelector('[data-figma="List Title"]'), like: nums[0], comment: nums[1], thumb: card.querySelector('[data-figma="Thumb"]') };
}

// 처음 모습(전체 탭)을 기억해 두었다가 전체로 돌아오면 그대로 되돌린다(글자 윤곽 그림과 칸 폭까지).
function remember(cards) {
  return cards.map((card) => {
    const p = partsOf(card);
    const keep = (el) => (el ? { html: el.innerHTML, width: el.style.width, fill: el.style.webkitTextFillColor } : null);
    return { title: keep(p.title), like: keep(p.like), comment: keep(p.comment), thumb: p.thumb ? p.thumb.style.background : '' };
  });
}
function restore(el, k) {
  if (!el || !k) return;
  el.innerHTML = k.html;
  el.style.width = k.width;
  el.style.webkitTextFillColor = k.fill;
}

function fill(cards, tab, saved, firstThumb) {
  cards.forEach((card, i) => {
    if (!card) return;
    const p = partsOf(card);
    if (tab === '전체') {
      restore(p.title, saved[i].title);
      restore(p.like, saved[i].like);
      restore(p.comment, saved[i].comment);
      if (p.thumb) p.thumb.style.background = saved[i].thumb;
      return;
    }
    const [title, likes, comments, thumb, likeW, commentW] = TAB_POSTS[tab][i];
    setText(p.title, title);
    // 숫자 칸 폭은 피그마 탭 프레임의 글자 칸 폭 그대로다(따봉 16, 숫자, 댓글 16, 숫자를 간격 4로 잇는다).
    [[p.like, likes, likeW], [p.comment, comments, commentW]].forEach(([el, v, w]) => { if (!el) return; setText(el, String(v)); el.style.width = w + 'px'; });
    if (p.thumb) {
      const file = THUMB[thumb];
      p.thumb.style.background = file ? 'url("' + BASE + file + '") center / 100% 100% no-repeat' : firstThumb;
    }
  });
}

// 탭 글자는 굵기(고른 탭 700, 나머지 500)까지 피그마와 같아야 해서 윤곽 그림 대신 글자로 그린다.
function paintTabs(tabEls, tab, animate) {
  tabEls.forEach((el, i) => {
    const on = TABS[i] === tab;
    el.style.transition = animate ? 'color 150ms ' + motion.standard : 'none';
    el.style.color = on ? ON : OFF;
    el.style.fontWeight = on ? '700' : '500';
  });
}
function moveLine(line, tab, animate) {
  if (!line) return;
  line.style.transformOrigin = '0 0';
  line.style.transition = animate && !reduced() ? 'transform ' + motion.tab + 'ms ' + motion.standard : 'none';
  line.style.transform = 'translateX(' + (TAB_X[tab] - TAB_X['전체']) + 'px) scaleX(' + LINE_W[tab] / LINE_W['전체'] + ')';
}

// 앞 목록을 복제해 같은 자리에 겹쳐 두고, 원래 목록은 새 내용으로 바꾼 뒤 둘을 180ms 동안 엇갈려 옅게, 짙게 한다.
function crossFade(list, swap) {
  if (reduced()) { swap(); return; }
  const ghost = list.cloneNode(true);
  [ghost, ...ghost.querySelectorAll('[data-node], [data-figma]')].forEach((el) => { el.removeAttribute('data-node'); el.removeAttribute('data-figma'); });
  ghost.setAttribute('aria-hidden', 'true');
  ghost.dataset.commFade = '1';
  ghost.style.pointerEvents = 'none';
  list.parentElement.insertBefore(ghost, list.nextSibling);
  swap();
  const opt = { duration: FADE_MS, easing: motion.standard, fill: 'forwards' };
  const a = list.animate([{ opacity: 0 }, { opacity: 1 }], opt);
  ghost.animate([{ opacity: 1 }, { opacity: 0 }], opt).onfinish = () => ghost.remove();
  a.onfinish = () => a.cancel();
}

export function attachCommunityTabs(root) {
  if (!root) return;
  // 두 번째 부름(전환이 끝난 뒤 patchCommunity가 한 번 더 부른다): 그 사이 전체 탭 그림을 다시 입힌 썸네일을 고른 탭 그림으로 되돌린다.
  if (root.dataset.commTabs) { if (root.__commRefill) root.__commRefill(); return; }
  const tabsBox = root.querySelector('[data-figma="Tabs"]');
  const list = listOf(root);
  if (!tabsBox || !list) return;
  const tabEls = TABS.map((t) => tabsBox.querySelector(':scope > [data-figma="Tab / ' + t + '"]'));
  if (tabEls.some((el) => !el)) return;
  root.dataset.commTabs = '1';
  // 탭 그림은 탭을 누르기 전에 미리 받아 디코드해 둔다(누른 뒤 빈 칸이나 예전 그림이 보이지 않게).
  Object.values(THUMB).forEach((f) => { if (!f) return; const im = new Image(); im.src = BASE + f; if (im.decode) im.decode().catch(() => {}); });
  const line = tabsBox.querySelector('[data-figma="Tab Underline"]');
  const cards = cardsOf(list);
  const saved = remember(cards);
  const firstThumb = saved[0].thumb || (cards[0] && cards[0].querySelector('[data-figma="Thumb"]') ? getComputedStyle(cards[0].querySelector('[data-figma="Thumb"]')).background : '');
  tabEls.forEach((el, i) => setText(el, TABS[i]));

  const stored = readTab();
  let sel = cameFrom(39) === 38 && TABS.includes(stored) ? stored : '전체';
  if (sel === '전체') writeTab('전체');
  paintTabs(tabEls, sel, false);
  moveLine(line, sel, false);
  if (sel !== '전체') fill(cards, sel, saved, firstThumb);
  root.dataset.commTab = sel;
  root.__commRefill = () => { if (sel !== '전체') fill(cards, sel, saved, firstThumb); };

  tabEls.forEach((el, i) => {
    const hit = document.createElement('span');
    Object.assign(hit.style, { position: 'absolute', left: '-14px', right: '-14px', top: '-12px', bottom: '-12px' });
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.appendChild(hit);
    pressable(el, () => {
      const next = TABS[i];
      if (next === sel) return;
      sel = next;
      root.dataset.commTab = sel;
      writeTab(sel);
      paintTabs(tabEls, sel, true);
      moveLine(line, sel, true);
      crossFade(list, () => fill(cards, sel, saved, firstThumb));
    });
  });
}
