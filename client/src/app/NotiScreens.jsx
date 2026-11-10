// 알림 화면 셋(11/10 피그마 1110코딩기준 섹션): 활동 알림 2100:24856, 키워드 알림 2100:25022, 키워드 알림 설정 2100:24964.
// 피그마 프레임은 1093, 1479 높이로 길게 그려져 있지만 앱 화면은 폰 화면(390 x 844)이고 안에서 스크롤한다.
// 스크롤 단위는 피그마 묶음을 따른다. 활동 알림은 머리말과 탭, 칩 줄이 위에 남고 목록(Activity List, y 221)만 움직인다.
// 키워드 알림은 머리말과 탭이 남고 내용 묶음(Keyword Alert Content, y 162, 칩 줄 포함)이 움직인다.
// 키워드 알림의 오늘 카드(시계 칩이 있는 카드)를 누르면 그 라이브 방의 방 구경(37)으로 간다. 종료 카드는 누름 반응이 없다.
import React, { useLayoutEffect, useRef } from 'react';
import { Screen2100_24856 } from '../figma/screens/Screen2100_24856.jsx';
import { Screen2100_25022 } from '../figma/screens/Screen2100_25022.jsx';
import { Screen2100_24964 } from '../figma/screens/Screen2100_24964.jsx';
import { openWatch } from './liveV2.js';
import { pressable } from './taps.js';

// 스크롤 층의 윗선을 움직이는 묶음의 윗선에 맞춘다. 그 위(머리말, 탭)로 내용이 올라가 겹치지 않는다.
function clipScroll(root, top) {
  const sc = root && root.querySelector(':scope > [data-scroll]');
  if (!sc || sc.dataset.noti) return;
  sc.dataset.noti = '1';
  Object.assign(sc.style, { top: top + 'px', bottom: '0px', height: 'auto' });
  const content = sc.querySelector(':scope > [data-scroll-content]');
  if (content) content.style.marginTop = -top + 'px';
}

// 오늘 구역 카드 셋(피그마 글 그대로). 남은 시간은 카드의 시계 칩, 이야기 수는 카드 메타 글에서 읽는다.
export const NOTI_LIVE = [
  { title: '3일째 읽씹하는 썸남\n내가 먼저 연락해도 될까?', timer: '19:00', views: '4' },
  { title: '친구 전남친이랑 썸 타는 중…\n나 이대로 괜찮을까', timer: '14:12', views: '3' },
  { title: '조별과제 무임승차한 동기\n이름 빼버리고 싶은데', timer: '13:01', views: '4' },
];

function wireAlerts(root) {
  const box = root && root.querySelector('[data-figma="Keyword Alert Content"]');
  if (!box || box.dataset.noti) return;
  box.dataset.noti = '1';
  const alerts = [...box.querySelectorAll(':scope > [data-figma^="Alert / "]')];
  // 종료 표시(Ended Overlay)가 보이지 않는 카드가 지금 열린 방이다.
  const live = alerts.filter((a) => {
    const ov = a.querySelector('[data-figma="Ended Overlay"]');
    return !ov || getComputedStyle(ov).display === 'none' || ov.style.visibility === 'hidden';
  });
  live.forEach((card, i) => {
    const base = NOTI_LIVE[i];
    if (!base) return;
    pressable(card, () => {
      const badge = card.querySelector('[data-figma="Timer Badge"]');
      const t = (/(\d{1,2}:\d{2})/.exec(badge ? badge.textContent : '') || [])[1] || base.timer;
      const meta = card.querySelector('[data-figma="Meta"]');
      const v = (/(\d+)명/.exec(meta ? meta.textContent : '') || [])[1] || base.views;
      openWatch({ title: base.title, views: v, meta: t + ' 남음', st: 'talk' });
    });
  });
  // 키워드 관리: 스크롤하면 같이 움직이므로 고정 누름 자리 대신 글자 묶음에 직접 단다.
  const manage = box.querySelector('[data-figma="키워드 관리"]');
  if (manage) pressable(manage, () => window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to: 60, t: 'push' } })));
}

// 생성 코드는 선을 투명 테두리 자리(-1px)에 그린 상자층 SVG로 그리는데, 같은 상자의 overflow hidden이 그 자리를 잘라 선이 안 보였다
// (최근 본 키워드 칩의 #33383D 1px 선, 2100:24971). 선이 있는 상자만 자르기를 푼다. 안쪽 글자는 상자보다 작아 넘치지 않는다.
function showStrokes(root) {
  if (!root) return;
  root.querySelectorAll(':scope [data-figma] > span[aria-hidden] > svg[data-box]').forEach((svg) => {
    const box = svg.parentElement.parentElement;
    if (/transparent/.test(box.style.border || '') && box.style.overflow === 'hidden') box.style.overflow = 'visible';
  });
}

function useRoot() {
  const ref = useRef(null);
  return [ref, () => ref.current && ref.current.querySelector('[data-node]')];
}

export function NotiActivityScreen() {
  const [ref, root] = useRoot();
  useLayoutEffect(() => { clipScroll(root(), 221); showStrokes(root()); }, []);
  return <div ref={ref} style={{ display: 'contents' }}><Screen2100_24856 /></div>;
}

export function NotiKeywordScreen() {
  const [ref, root] = useRoot();
  useLayoutEffect(() => { const r = root(); clipScroll(r, 162); showStrokes(r); wireAlerts(r); }, []);
  return <div ref={ref} style={{ display: 'contents' }}><Screen2100_25022 /></div>;
}

export function NotiSettingsScreen() {
  const [ref, root] = useRoot();
  useLayoutEffect(() => { showStrokes(root()); }, []);
  return <div ref={ref} style={{ display: 'contents' }}><Screen2100_24964 /></div>;
}
