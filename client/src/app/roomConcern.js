// 방의 고민 탭(접힌 한 줄, 펼친 글, 키워드) 글을 한 곳에서 정한다(11/10 피드백 "고민 탭 내용 변경 안됨").
// 함께 드르륵 방(28, 29, 30, 31, 40)과 일반 모드(22, 32, 33), 옛 방(9, 23)이 모두 이 값을 읽는다.
//   1) 카드별 고민(story.js getConcern)이 있으면: 접힌 한 줄은 카드 제목 한 줄, 펼친 글은 카드가 쓴 두 줄 그대로, 키워드는 "#"+탭 이름 하나.
//   2) 없으면 이야기(story.js getStory)의 글: 쌍밍아웃(2096:22269), 사진보정(2100:24227).
// 장면과 의자 이름표는 카드별 고민이 있으면 쌍밍아웃 장면(홈 흐름과 같은 라임 장면)을 쓴다.
import { getStory, getConcern } from './story.js';
import { LIVE_LIST } from './liveList.js';

export const STORY_BANNER = {
  // 접힌 한 줄은 생성 화면(2096:22512)의 글자 그대로, 펼친 글은 2096:22269 고민 주제(I2096:22334)의 글과 줄바꿈 그대로다.
  ssang: {
    line: '친구가 썸남 앞에서 내 쌍밍아웃함. 셋이…',
    title: '나 의 고민',
    body: '친구가 썸남 앞에서 내 쌍밍아웃함. 셋이 떡볶이 먹으러\n가고 있었는데 나보고 볼 때마다 00이 쌍수 참 예쁘게 잘되지\n않았냐고 그러는거야. 걔 완전 미친거 아니야? 하..',
    tags: ['#친구관계', '#연애고민'],
  },
  // 접힌 한 줄은 2009:12505, 펼친 글은 2100:24227(1979:27613과 같은 글)의 글과 줄바꿈 그대로다.
  photo: {
    line: '오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가…',
    title: '나 의 고민',
    body: '오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가 인스타\n게시글에 자기 얼굴만 보정을 해서 올렸더라고.. 다들 엄청\n이쁘다고 비교된다는 식으로 댓글 달리는데 너무 속상해...',
    tags: ['#친구관계', '#외모고민'],
  },
};

// 방이 그릴 이야기. 카드별 고민이 있으면 쌍밍아웃 장면을 쓴다.
export function roomStory() {
  return getConcern() ? 'ssang' : getStory();
}

const flat = (s) => String(s || '').replace(/\s+/g, ' ').trim();
// 카드 제목의 두 줄(카드가 쓴 줄바꿈)을 라이브 목록 데이터에서 찾는다. 못 찾으면 한 줄 그대로 둔다.
function twoLines(title) {
  const key = flat(title);
  for (const list of Object.values(LIVE_LIST)) {
    const hit = list.find((c) => flat(c.title) === key);
    if (hit) return hit.title.split('\n').map((s) => s.trim()).join('\n');
  }
  return key;
}

// 지금 그릴 고민 탭 글. story를 넘기면 그 이야기(화면이 뜰 때 적어 둔 값)를 쓴다.
export function bannerSpec(story) {
  const c = getConcern();
  const base = STORY_BANNER[story === 'photo' || story === 'ssang' ? story : roomStory()];
  if (!c || !c.title) return base;
  return {
    line: flat(c.title),
    title: base.title,
    body: twoLines(c.title),
    tags: c.tag ? ['#' + c.tag] : base.tags,
  };
}

// ---------- 고민 글 행간 140% (11. 10. 피그마 댓글 1884:11435 "행간 140%", 답글 "같은 컴포넌트인 것들 다 반영") ----------
// 피그마 1884:11599(펼침)와 1884:11512(접힘)의 본문은 SUIT Medium 14, 행간 140%(19.6px), 자간 -4%이다.
// 작은 글(고민 11, 나 의 고민 12, AI가 읽은 맥락 11, 해시태그 11)은 150% 그대로 두고 본문 두 가지만 바꾼다.
export const BANNER_LH = 19.6;
// 펼친 박스 높이: 위 여백 14, 라벨 줄 18, 간격 12, 본문(줄 수 x 19.6 + 1.2), 간격 12, AI 맥락 줄 25, 아래 여백 12.
// 피그마 본문 글 상자가 3줄에 60(58.8 + 1.2)이라 3줄 153, 2줄 133.4이고 줄 하나마다 19.6씩 달라진다.
export const BANNER_BODY_PAD = 1.2;
export const bannerOpenHeight = (lines) => 14 + 18 + 12 + lines * BANNER_LH + BANNER_BODY_PAD + 12 + 25 + 12;

// 접힌 한 줄: 피그마 1884:11512는 글 상자 높이 17, 위 맞춤이라 19.6 줄 상자가 상자 위에서 시작한다.
// 상자 높이를 19.6으로 늘리고 아래 여백을 -2.6으로 두어 가운데 정렬 기준(17 상자, 위 11.5)은 그대로, 글자 아래가 잘리지 않게 한다.
export function styleBannerLine(p) {
  if (!p) return;
  Object.assign(p.style, { fontSize: '14px', lineHeight: BANNER_LH + 'px', letterSpacing: '-0.04em', height: BANNER_LH + 'px', marginBottom: (17 - BANNER_LH) + 'px' });
}

// 펼친 본문: 행간 19.6, 높이는 줄 수대로. 박스 높이를 줄 수에 맞춰 다시 정하고 그 높이를 돌려준다.
export function styleBannerBody(box, body) {
  if (!box || !body) return 0;
  // 혼자 방 생성 화면(43)의 본문은 끝에 빈 줄이 붙어 있어 줄 수가 늘어 보인다. 글자만 있는 본문이면 끝 빈 줄을 지운다.
  if (!body.children.length && /\s$/.test(body.textContent)) body.textContent = body.textContent.replace(/\s+$/, '');
  Object.assign(body.style, { lineHeight: BANNER_LH + 'px', height: 'auto', paddingBottom: BANNER_BODY_PAD + 'px', boxSizing: 'content-box' });
  const lines = Math.max(1, Math.round((body.scrollHeight - BANNER_BODY_PAD) / BANNER_LH));
  const h = Math.round(bannerOpenHeight(lines) * 10) / 10;
  box.style.height = h + 'px';
  box.dataset.lines = String(lines);
  return h;
}

// 화면에 처음부터 펼쳐 그려진 고민 배너(혼자 방 43, 피그마 1647:25052 153)도 같은 행간과 높이로 맞춘다.
export function fitStaticBanners(root) {
  if (!root) return;
  root.querySelectorAll(':scope > [data-figma="고민 주제"]').forEach((box) => {
    if (box.dataset.lh || box.dataset.openH) return;
    const ps = [...box.querySelectorAll('p[data-outline]')];
    const body = ps.sort((a, b) => b.textContent.length - a.textContent.length)[0];
    if (styleBannerBody(box, body)) box.dataset.lh = '1';
  });
}
