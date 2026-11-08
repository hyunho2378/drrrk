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
@keyframes lv2Bar{0%,100%{transform:scaleY(.45)}50%{transform:scaleY(1)}}
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

function cluster(state, smalls, big, more) {
  const g = el('div', { position: 'absolute', left: '0', top: '0', width: '342px', height: '112px', pointerEvents: 'none' });
  const talking = state === 'talk' || state === 'soon' || state === 'fresh';
  // 오른쪽 큰 원의 왼쪽 끝을 기준으로 작은 원을 22씩 겹쳐 왼쪽으로 늘어놓는다(피그마 묶음 값).
  const bigX = 278;
  const bigY = state === 'quiet' ? 51 : 46;
  const smallY = bigY + 16;
  const list = state === 'alone' ? [] : smalls;
  let x = bigX - 22 * list.length;
  if (more) {
    const m = el('div', { position: 'absolute', left: x - 19 + 'px', top: smallY + 3 + 'px', width: '26px', height: '26px', borderRadius: '50%', background: '#33383D', boxShadow: '0 0 0 2px #222628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: '9.72px', fontWeight: '700', color: '#D9DEE3' }, '+' + more);
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
  eye.appendChild(el('span', { fontSize: '12px', fontWeight: '700', color: '#6E767C', letterSpacing: '-0.48px' }, views));
  m.appendChild(eye);
  if (state === 'soon') return { m, time: null };
  m.appendChild(el('span', { display: 'block', width: '3px', height: '3px', borderRadius: '50%', background: '#9AA1A6' }));
  const blue = state === 'alone' || state === 'fresh';
  const txt = state === 'alone' ? '첫 대화 상대를 기다려요' : state === 'fresh' ? '방금 열림' : left + ' 남음';
  const t = el('span', { fontSize: '12px', fontWeight: '500', color: blue ? '#36D2FF' : '#9AA1A6', letterSpacing: '-0.48px' }, txt);
  m.appendChild(t);
  return { m, time: blue ? null : t };
}

export function patchLiveV2(root, n) {
  if (!LIVE_SCREENS.includes(n) || !root || root.dataset.liveV2) return;
  const plan = PLAN[n] || PLAN[10];
  // 정렬로 카드 순서가 바뀌어도 화면 위에서부터 피그마 시안 순서(말하는 중, 조용함, ...)가 되게 위치 순으로 놓는다.
  const cards = [1, 2, 3].map((i) => root.querySelector('[data-figma="List Card / ' + i + '"]')).filter(Boolean)
    .sort((a, b) => parseFloat(a.style.top || 0) - parseFloat(b.style.top || 0));
  if (!cards.length) return;
  root.dataset.liveV2 = '1';
  if (!document.getElementById('lv2-css')) {
    const st = document.createElement('style');
    st.id = 'lv2-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  cards.forEach((card, i) => {
    if (!card) return;
    const [state, smalls, big, more] = plan[i];
    const badge = card.querySelector('[data-figma^="Timer Badge"]');
    const timeEl = badge && badge.querySelector('[data-figma="time"]');
    const view = card.querySelector('[data-figma="보는 중"] p');
    const left = timeEl ? timeEl.textContent.trim() : '';
    // 옛 썸네일과 타이머 배지, 말하는 사람 수 줄은 숨긴다.
    ['Thumb', 'meta'].forEach((k) => { const e = card.querySelector(':scope > [data-figma="' + k + '"]'); if (e) e.style.visibility = 'hidden'; });
    if (badge) badge.style.visibility = 'hidden';
    const title = card.querySelector('[data-figma="List Title"]');
    if (title) Object.assign(title.style, { left: '16px', top: '16px', width: '196px' });
    const { m, time } = metaRow(state, view ? view.textContent.trim() : '22', soonText(state, left));
    card.appendChild(m);
    card.appendChild(cluster(state, smalls, big, more));
    if (state === 'soon') {
      const pill = el('div', { position: 'absolute', left: '269px', top: '16px', height: '20px', padding: '0 7px 0 6px', borderRadius: '999px', background: '#FF4D6A', display: 'flex', alignItems: 'center', gap: '3px', fontFamily: FONT, fontSize: '11px', fontWeight: '700', color: '#000', letterSpacing: '-0.44px' });
      pill.appendChild(el('span', { display: 'block', width: '13px', height: '13px' }, TIMER));
      pill.appendChild(el('span', null, '03:00'));
      card.appendChild(pill);
    }
    if (state === 'fresh') card.appendChild(el('span', { position: 'absolute', left: '8px', top: '24px', width: '6px', height: '6px', borderRadius: '50%', background: '#36D2FF' }));
    // 옛 타이머 글자가 1초마다 바뀌므로 남은 시간 글도 따라 바꾼다.
    if (time && timeEl) {
      const tick = window.setInterval(() => {
        if (!root.isConnected) { window.clearInterval(tick); return; }
        time.textContent = timeEl.textContent.trim() + ' 남음';
      }, 1000);
    }
  });
}

function soonText(state, left) {
  return state === 'soon' ? '03:00' : left;
}

// 방 구경(37, 피그마 1943:12838) "대화 중 3" 줄. 생성 화면은 흰 바탕이 붙은 원본 그림을 납작하게 구운 그림이라 원 바깥에 흰 테가 보였다.
// 투명판 그림으로 바꾸고 원 바탕을 #222628로 칠한다(iOS LiveWatchView와 같은 값: 원 54, 그림은 원 안에 꽉 채워 둥글게 자름).
const WATCH = { '리클라이너21': C.convBlue, '나무스툴12': C.stoolOak, '가죽소파19': C.sofaBrown };
export function patchWatchSeats(root, n) {
  if (n !== 37 || !root || root.dataset.watchSeats) return;
  const imgs = [...root.querySelectorAll('[data-figma="avatar"]')];
  if (!imgs.length) return;
  root.dataset.watchSeats = '1';
  imgs.forEach((img) => {
    const seat = img.parentElement && img.parentElement.dataset.figma ? img.parentElement.dataset.figma.replace('Seat / ', '') : '';
    const file = WATCH[seat];
    if (!file) return;
    img.src = BASE + file + '.png';
    Object.assign(img.style, { background: '#222628', borderRadius: '50%', objectFit: 'cover', boxSizing: 'border-box' });
  });
}
