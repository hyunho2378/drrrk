import { setText } from './dom.js';
import { COMMENTS } from './communityPostData.js';
import { getStory } from './story.js';
// 방 구경(37, 피그마 1943:12838) 채팅이 라이브 방송처럼 계속 올라온다(11/10 팀원 피드백 "라이브-눌러서 라방 보듯이 할라면 계속 새 메시지가 올라오는 것 처럼 해야할듯").
// 채팅 칸(댓글 (라이브 채팅), 342 x 150)과 안내줄, 입력칸은 피그마 그대로 두고, 칸 안에 새 줄을 아래에 붙인다.
// 화면이 처음 뜰 때 채팅 칸은 비어 있다(11. 10. 팀 요청 "처음에 시작했을 때 댓글 아무 것도 없다가 하나씩 생겨나는 느낌으로").
// 0.7초 뒤 첫 줄, 처음 4줄까지는 1.0초에서 1.8초 사이 간격(칸이 빨리 차서 살아 있는 느낌), 그 뒤는 2.4초에서 4.2초 사이 간격.
// 간격은 시작 값 1110으로 고정한 같은 수열이라 웹과 iOS(LiveWatchView)가 같은 순서를 만든다.
// 칸 안 줄은 최대 5개, 이전 줄은 줄 높이만큼 위로 밀려 올라가고(220ms), 칸 위로 넘어간 줄은 옅어진다. 새 줄은 아래에서 8px 올라오며 나타난다.
export const WATCH_CHAT = { firstMs: 700, fastCount: 4, fastMinMs: 1000, fastMaxMs: 1800, minMs: 2400, maxMs: 4200, seed: 1110, maxRows: 5, moveMs: 220, rise: 8, fadeOver: 32 };
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';

// 내 댓글 말풍선(피그마 1943:12890): 하늘색 #36D2FF, 모서리 14, 안쪽 여백 12와 7, 글자 13 굵기 500 행간 18.2, 검정. 칸 오른쪽 끝에 붙는다.
// 피그마 말풍선은 글 길이에 맞춰 늘어나는 모양이라, 긴 글은 칸 폭 342 안에서 줄을 바꾼다(글 폭은 여백 12씩을 뺀 318까지).
export const MINE = { boxW: 342, padX: 12 };
export function styleMine(node) {
  const bub = node && node.querySelector('[data-figma="bubble"]');
  const p = node && node.querySelector('p[data-outline]');
  if (bub) Object.assign(bub.style, { width: 'auto', maxWidth: MINE.boxW + 'px' });
  if (p) Object.assign(p.style, { width: 'auto', maxWidth: MINE.boxW - MINE.padX * 2 + 'px', whiteSpace: 'pre-wrap', wordBreak: 'keep-all', overflowWrap: 'anywhere', height: 'auto' });
}

// 입력칸 보내기 연결(live.js attachInputs가 모든 입력줄에 쓴다).
// 엔터: 한글을 조합하는 도중에 엔터를 누르면 조합이 끝난 직후 한 번 보낸다(예전에는 엔터를 두 번 눌러야 보내졌다). 빈 글은 send가 거른다.
// 보내기 버튼: 누르는 동안 scale 0.97, opacity 0.85(90ms), 떼면 120ms로 돌아오고, 눌러도 입력칸 초점이 빠지지 않아 이어서 칠 수 있다(홈 입력줄과 같다).
const PRESS_IN = 'transform 90ms ' + EASE + ', opacity 90ms ' + EASE;
const PRESS_OUT = 'transform 120ms ' + EASE + ', opacity 120ms ' + EASE;
export function wireSend(input, btn, send) {
  let afterIme = false;
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (e.isComposing) { afterIme = true; return; }
    e.preventDefault();
    afterIme = false;
    send();
  });
  input.addEventListener('compositionend', () => {
    if (!afterIme) return;
    afterIme = false;
    window.setTimeout(send, 0);
  });
  if (!btn) return;
  btn.style.cursor = 'pointer';
  btn.style.touchAction = 'manipulation';
  const up = () => { btn.style.transition = PRESS_OUT; btn.style.transform = ''; btn.style.opacity = ''; };
  btn.addEventListener('pointerdown', () => { btn.style.transition = PRESS_IN; btn.style.transform = 'scale(0.97)'; btn.style.opacity = '0.85'; });
  btn.addEventListener('pointerup', up);
  btn.addEventListener('pointercancel', up);
  btn.addEventListener('pointerleave', up);
  btn.addEventListener('mousedown', (e) => e.preventDefault());
  btn.addEventListener('click', () => { up(); send(); });
}

// 글 후보는 앱에 이미 있는 글만 쓴다. 이야기별 방 채팅 줄(iOS RoomModel.ssang, photo의 opening과 talk 중 다른 의자 줄, 웹 방 화면 글과 같다),
// 커뮤니티 글 상세 댓글(communityPostData.js COMMENTS, iOS CommunityData.comments), 방 구경 댓글 두 줄(피그마 1943:12838) 순서로 돈다.
const SSANG_LINES = [
  ['진실의 의자10', '잼얘 없음?'],
  ['차가운 새벽의자92', '님선 ㄱㄱ'],
  ['진실의 의자10', '엥? 미친거 아님?'],
  ['딱딱한 나무 스툴12', '걍 싸우자는 거인듯 ㅋㅋ'],
  ['새벽2시 피시방', '나도 비슷한 일 있었음.. 그거 완전 여우짓임'],
];
const PHOTO_LINES = [
  ['폭신폭신 소파38', '제목보고 들어옴'],
  ['바퀴 달린 의자26', '댓글 단 사람들 미쳤나???'],
  ['바퀴 달린 의자26', '헐 자기 얼굴만 보정한 거 실화?'],
  ['보라돌이 의자71', '그건 서운할 만하지 ㅠㅠ'],
  ['편의점 드르륵71', '지만 쏙 빼고 보정한건 진짜 선넘는다'],
];
const WATCH_LINES = [
  ['구경하는 스툴3', '가죽소파님 목소리 너무 차분해서 더 슬픔'],
  ['폭신한 방석20', '그 친구 원래 그런 스타일이야?'],
];
// 사진보정 카드는 photo 줄을 먼저, 그 밖의 카드는 ssang 줄을 먼저 쓴다. 이어서 다른 이야기 줄, 커뮤니티 댓글, 방 구경 댓글 순서다.
// 순서대로 돌기 때문에 같은 줄이 연달아 나오지 않는다(맨 끝 줄과 맨 앞 줄도 다르다).
export function feedLines(story) {
  const first = story === 'photo' ? PHOTO_LINES : SSANG_LINES;
  const second = story === 'photo' ? SSANG_LINES : PHOTO_LINES;
  return [...first, ...second, ...COMMENTS.map((c) => [c.name, c.text]), ...WATCH_LINES];
}
// 같은 시작 값이면 같은 수열(32비트 선형 합동). iOS WatchFeed.next와 같은 식이다.
export function makeRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const hashN = () => Number((/\/s\/(\d+)/.exec(window.location.hash) || [])[1]);
const ROW = '[data-figma^="댓글 · "]';

// 피그마 줄(댓글 두 줄과 내 댓글)을 틀로 돌리고 숨긴다. 들어오는 전환 동안에도 칸이 비어 보이게 live.js prepare(전환 전)와 startWatchChat이 함께 부른다.
// 내 댓글 틀은 보내기(live.js postLiveComment)가 복제해 쓴다.
export function prepareWatchChat(root, n) {
  if (n !== 37 || !root) return;
  const box = root.querySelector('[data-figma="댓글 (라이브 채팅)"]');
  if (!box) return;
  [...box.children].forEach((c) => { if (c.dataset && c.dataset.figma && !c.dataset.watchRow) { c.dataset.watchTpl = '1'; c.style.display = 'none'; } });
}

// live.js attach가 부른다(화면이 다 보인 뒤). 같은 화면에 한 번만 붙는다. 화면을 떠나면 타이머와 감시를 정리한다.
export function startWatchChat(root, n) {
  if (n !== 37 || !root || root.dataset.watchChat) return;
  const box = root.querySelector('[data-figma="댓글 (라이브 채팅)"]');
  const tpl = box && box.querySelector(ROW);
  if (!box || !tpl) return;
  root.dataset.watchChat = '1';
  const base = tpl.cloneNode(true);
  base.removeAttribute('data-node');
  delete base.dataset.watchTpl;
  base.style.display = '';
  base.querySelectorAll('[data-node]').forEach((e) => e.removeAttribute('data-node'));
  // 칸 높이와 자리는 피그마 그대로 두고, 줄을 아래부터 쌓아 넘친 줄이 칸 위쪽으로 잘려 나가게 한다(내 댓글 보내기와 같은 방식).
  Object.assign(box.style, { justifyContent: 'flex-end', overflow: 'hidden' });
  const lines = feedLines(getStory());
  const rnd = makeRandom(WATCH_CHAT.seed);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let idx = 0;
  let timer = 0;
  let mine = false;
  const lastTop = new Map();
  // 칸은 빈 채로 시작한다(피그마 줄은 틀로만 남긴다).
  prepareWatchChat(root, n);
  const rows = () => [...box.children].filter((c) => c.dataset && c.dataset.figma && !c.dataset.watchTpl);

  // 줄이 붙은 뒤 자리 정리: 5줄을 넘는 오래된 줄을 지우고, 남은 줄은 이전 자리에서 새 자리로 미끄러지고, 칸 위로 넘어간 만큼 옅어진다.
  const settle = (added) => {
    const list = rows();
    while (list.length > WATCH_CHAT.maxRows) { const old = list.shift(); old.remove(); lastTop.delete(old); }
    list.forEach((r) => {
      const now = r.offsetTop;
      const prev = lastTop.get(r);
      if (!reduce && r !== added && prev != null && Math.abs(prev - now) > 0.5) {
        r.animate([{ transform: 'translateY(' + (prev - now) + 'px)' }, { transform: 'translateY(0)' }], { duration: WATCH_CHAT.moveMs, easing: EASE });
      }
      const o = now >= 0 ? 1 : Math.max(0, 1 + now / WATCH_CHAT.fadeOver);
      const cur = r.__watchO ?? 1;
      if (o !== cur) {
        r.animate([{ opacity: cur }, { opacity: o }], { duration: reduce ? 0 : WATCH_CHAT.moveMs, easing: EASE, fill: 'forwards' });
        r.__watchO = o;
      }
      lastTop.set(r, now);
    });
  };
  // 내 댓글(live.js postLiveComment)도 같은 칸에 붙으니, 붙는 것을 지켜보고 같은 정리를 한다.
  const watch = new MutationObserver((recs) => {
    if (mine) return;
    const added = recs.flatMap((r) => [...r.addedNodes]).find((x) => x.nodeType === 1);
    if (added) settle(added);
  });
  watch.observe(box, { childList: true });

  const push = () => {
    const [name, text] = lines[idx % lines.length];
    idx += 1;
    const node = base.cloneNode(true);
    node.dataset.watchRow = '1';
    node.setAttribute('data-figma', '댓글 · ' + name);
    const ps = [...node.querySelectorAll('p')];
    const np = ps[0];
    const tp = ps[ps.length - 1];
    setText(np, name);
    setText(tp, text);
    Object.assign(np.style, { width: 'auto', whiteSpace: 'nowrap' });
    Object.assign(tp.style, { width: 'auto', whiteSpace: 'pre' });
    const bub = node.querySelector('[data-figma="bubble"]');
    if (bub) bub.style.width = 'auto';
    Object.assign(node.style, { width: 'auto', maxWidth: '342px', flexShrink: '0' });
    mine = true;
    box.appendChild(node);
    mine = false;
    watch.takeRecords();
    settle(node);
    if (!reduce) node.animate([{ opacity: 0, transform: 'translateY(' + WATCH_CHAT.rise + 'px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: WATCH_CHAT.moveMs, easing: EASE });
  };
  const alive = () => root.isConnected && hashN() === 37;
  const stop = () => {
    window.clearTimeout(timer);
    timer = 0;
    watch.disconnect();
    window.removeEventListener('hashchange', onHash);
  };
  const onHash = () => { if (!alive()) stop(); };
  window.addEventListener('hashchange', onHash);
  // idx는 이미 올라온 줄 수다. 4번째 줄까지는 빠른 간격, 그 뒤는 보통 간격.
  const delay = () => (idx < WATCH_CHAT.fastCount
    ? WATCH_CHAT.fastMinMs + rnd() * (WATCH_CHAT.fastMaxMs - WATCH_CHAT.fastMinMs)
    : WATCH_CHAT.minMs + rnd() * (WATCH_CHAT.maxMs - WATCH_CHAT.minMs));
  const step = () => {
    if (!alive()) { stop(); return; }
    push();
    timer = window.setTimeout(step, delay());
  };
  timer = window.setTimeout(step, WATCH_CHAT.firstMs);
  root.__watchChatStop = stop;
}
