// 혼자 드르륵 방(46, 43, 41, 42)을 팀 피그마 최신 프레임에 맞춘다.
// 1647:25199(영상), 1647:25052(배너 펼침), 1647:24874(퀵슬롯 펼침), 1804:12770(사람을 찾았다는 알림).
// 옛 프레임에 있던 가운데 "AI 드르륵 의자" 이름표와 소리 막대는 새 프레임에 없어 숨긴다.
// 옛 41, 42의 빨간 시계(곧 끝)는 새 프레임에서 기본 시계(#222628, 하늘색 시간)다.
// 66은 혼자 방 해 뜨는 단계(피그마 2351:34553, 탁빛나 11/12 "아침해 뜨는거 반영 필요")다. 41 생성 화면을 바탕으로 쓰고,
// 시계 칸은 41 생성 화면에 남은 빨간 시계(빨강 18% 바탕, 빨강 1 선, 빨강 시계 아이콘과 시간)가 새 프레임 값과 같아 그대로 둔다.
import { cloneOf } from './donor.js';

const q = (r, s) => [...r.querySelectorAll(s)];
// 64는 혼자 방 그리드(soloGrid.js)다. 46 생성 화면을 바탕으로 쓰므로 시계 칸과 옛 이름표를 같이 고친다.
export const SOLO_SCREENS = [46, 43, 41, 42, 64, 66];
export const SOLO_SUNRISE = 66;
// 방 움직임(room.js)이 나중에 display를 되돌려도 숨김이 유지되게 속성 규칙으로 숨긴다.
if (typeof document !== 'undefined' && !document.getElementById('solo-hide')) {
  const st = document.createElement('style');
  st.id = 'solo-hide';
  st.textContent = '[data-solo-hide]{display:none!important}';
  document.head.appendChild(st);
}

export function patchSolo(root, n) {
  if (!SOLO_SCREENS.includes(n) || !root || root.dataset.solo) return;
  root.dataset.solo = '1';
  [...root.children].forEach((c) => {
    if (/^row · /.test(c.dataset.figma || '')) return;
    const label = c.matches('p[data-figma="AI 드르륵 의자"]') || (c.querySelector('p[data-figma="AI 드르륵 의자"]') && !c.querySelector('[data-figma^="row · "]'));
    if (label) c.setAttribute('data-solo-hide', '');
  });
  // 옛 이름표 옆의 초록 점(Ellipse)과 소리 막대(Group)도 숨긴다. 위쪽 장면 안에 있는 작은 조각만 대상이다.
  const rr = root.getBoundingClientRect();
  const sc = rr.width / 390 || 1;
  [...root.children].forEach((c) => {
    const nm = c.dataset.figma || '';
    if (!(nm === 'Ellipse' || /^Group 2147229\d+$/.test(nm))) return;
    if (c.querySelector('[data-figma^="btn_"], [data-figma="input"], [data-figma*="채팅"]')) return;
    const r = c.getBoundingClientRect();
    const top = (r.top - rr.top) / sc, h = r.height / sc;
    if (top < 520 && h < 60) c.setAttribute('data-solo-hide', '');
  });
  q(root, '[data-figma^="Timer Pill"]').forEach((pill) => {
    if (n === SOLO_SUNRISE) return;
    Object.assign(pill.style, { background: '#222628', borderColor: 'transparent', boxShadow: 'none' });
    // 옛 빨간 테두리는 시계 칸 맨 아래에 깔린 그림이다.
    q(pill, ':scope > span').forEach((sp) => { if (/ff4d6a/i.test(sp.innerHTML)) sp.style.display = 'none'; });
    q(pill, 'p[data-outline]').forEach((p) => {
      p.style.webkitTextFillColor = 'currentColor';
      p.querySelectorAll(':scope > span[aria-hidden]').forEach((o) => (o.style.display = 'none'));
      p.style.color = /\d:\d\d/.test(p.textContent) ? '#36D2FF' : '#F8F8F8';
    });
    q(pill, 'svg [stroke]').forEach((e) => e.setAttribute('stroke', '#36D2FF'));
    q(pill, 'svg [fill]').forEach((e) => { const f = (e.getAttribute('fill') || '').toUpperCase(); if (f && f !== 'NONE') e.setAttribute('fill', '#36D2FF'); });
  });
  // 내 말풍선은 오른쪽 끝(366)에 붙는다. 글자가 바뀌어 폭이 달라졌으므로 왼쪽 자리를 다시 잡는다.
  q(root, ':scope > [data-figma="내 채팅 (잠깐 떴다 사라짐)"]').forEach((b) => {
    b.style.width = 'auto';
    const w = b.offsetWidth;
    if (w > 0) b.style.left = 366 - w + 'px';
  });
}

// 혼자 방 해 뜨는 단계(66): 피그마 2351:34553 은 퀵슬롯이 접힌 알약(324, 192, 42 x 82, 새우깡과 DRRRA, 소주)이다.
// 41 생성 화면의 펼친 목록은 숨겨 두고(펼치면 이 목록이 나온다, quickSlot.js) 46 생성 화면의 같은 알약을 복제해 같은 자리에 넣는다. 보이기 전(live.js prepare)에 한다.
export async function prepareSoloSunrise(root, n) {
  if (n !== SOLO_SUNRISE || !root || root.dataset.soloSun) return;
  root.dataset.soloSun = '1';
  const panel = root.querySelector(':scope > [data-figma="주전부리 퀵슬롯"]');
  if (!panel || root.querySelector(':scope > [data-figma="퀵슬롯 · 접힘"]')) return;
  const pill = await cloneOf(46, '[data-figma="퀵슬롯 · 접힘"]');
  if (!pill || !root.isConnected) return;
  Object.assign(pill.style, { left: '324px', top: '192px' });
  panel.style.visibility = 'hidden';
  panel.before(pill);
}
