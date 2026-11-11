// 알림 화면 셋(11/10 피그마 1110코딩기준 섹션): 활동 알림 2100:24856, 키워드 알림 2100:25022, 키워드 알림 설정 2100:24964.
// 피그마 프레임은 1093, 1479 높이로 길게 그려져 있지만 앱 화면은 폰 화면(390 x 844)이고 안에서 스크롤한다.
// 스크롤 단위는 피그마 묶음을 따른다. 활동 알림은 머리말과 탭, 칩 줄이 위에 남고 목록(Activity List, y 221)만 움직인다.
// 키워드 알림은 머리말과 탭이 남고 내용 묶음(Keyword Alert Content, y 162, 칩 줄 포함)이 움직인다.
// 키워드 알림의 오늘 카드(시계 칩이 있는 카드)를 누르면 그 라이브 방의 방 구경(37)으로 간다. 종료 카드는 누름 반응이 없다.
import React, { useLayoutEffect, useRef } from 'react';
import { Screen2100_24856 } from '../figma/screens/Screen2100_24856.jsx';
import { Screen2100_25022 } from '../figma/screens/Screen2100_25022.jsx';
import { Screen2100_24964 } from '../figma/screens/Screen2100_24964.jsx';
import { NotiKeyword } from '../figma/screens/NotiKeyword.jsx';
import { KW_TABS, KW_CHIP_ON, KW_ALL_OFF } from './kwTabs.js';
import { openWatch } from './liveV2.js';
import { pressable } from './taps.js';
import { NOTI_TABS, NOTI_SVG } from './notiTabs.js';
import { fixSubpixel } from '../figma/subpixel.js';
import { motion } from '../tokens.js';
import { unifyTracking } from './tracking.js';

// ---------- 활동 알림 분류 칩(11/11 피그마 활동 알림 1 1952:14673과 분류 화면 네 장) ----------
// 칩(전체, 엉따지수, 댓글, 업적 편의점, 의자꾸미기)을 누르면 목록만 그 분류 프레임의 목록으로 바뀐다. 머리말, 탭, 칩 줄은 제자리다.
// 목록은 생성 화면(2100:24856)의 같은 모양 줄을 복제해 글과 글자 윤곽만 피그마 값으로 바꾼다. 보이기 전(첫 그리기)에 전체 목록으로 만든다.
// 고른 분류는 활동 알림 안(키워드 알림 탭 58, 59와 키워드 관리 60에 다녀오는 동안)에서만 남고, 다른 화면에서 새로 열면 전체에서 시작한다.
let chipKey = 'all';
const NOTI_PATH = /\/s\/(57|58|59|60)(\D|$)/;
// 의자 꾸미기 알림으로 의자 꾸미기(20)에 다녀오는 동안도 분류를 남긴다(20에서 뒤로 가면 57로 돌아온다).
let toStudio = false;
const keepOrReset = () => {
  // 주소는 해시 경로(#/s/57)다. 다른 배포 방식도 있으니 경로와 해시를 함께 본다.
  const p = window.location.pathname + window.location.hash;
  if (!NOTI_PATH.test(p) && !(toStudio && /\/s\/20(\D|$)/.test(p))) { chipKey = 'all'; kwKey = 'all'; }
  toStudio = false;
};
const LIST_TOP = 221;
const FADE = 180;
// 최종 드르륵 활동 알림 다섯 장(전체 2340:28316, 엉따지수 2340:28551, 댓글 2340:28502, 업적 편의점 2340:28607, 의자꾸미기 2340:28453)의 칩 글 칸 폭.
// 자간 -4% 로 칩 폭이 52, 76, 52, 90, 87(자리 24, 84, 168, 228, 326)이 됐다. 칩 글은 실제 글자(tracking.js)라 고른 칩은 #121415 600, 나머지는 #F8F8F8 500 이다(엉따지수 장의 전체 칩만 피그마대로 600, iOS chipSemibold 와 같다).
const ACT_CHIP_W = [24, 48, 24, 62, 59];

function setGlyphs(p, t) {
  if (!p || !t) return;
  p.setAttribute('data-node', t.id);
  p.setAttribute('data-figma', t.text);
  const label = p.querySelector(':scope > span:not([aria-hidden])');
  if (label) label.textContent = t.text;
  const art = p.querySelector(':scope > span[aria-hidden]');
  if (art) art.innerHTML = NOTI_SVG[t.svg] || '';
  if (t.role === 'body') {
    // 본문은 피그마 상자 높이(한 줄 22, 두 줄 44, 세 줄 66) 그대로 둔다. 글자 모양은 윤곽 SVG가 그린다.
    p.style.height = t.h + 'px';
    p.style.whiteSpace = 'normal';
  } else {
    p.style.width = t.w + 'px';
  }
}

function makeRow(tpl, it) {
  const row = tpl.cloneNode(true);
  row.setAttribute('data-node', it.node);
  row.querySelectorAll('[data-node]').forEach((e) => e.setAttribute('data-node', it.node + ':' + e.getAttribute('data-node')));
  setGlyphs(row.querySelector('[data-figma="title row"] > p'), it.title);
  setGlyphs(row.querySelector('[data-figma="meta"] > p'), it.ago);
  const dot = row.querySelector('[data-figma="meta"] > [data-figma="Ellipse"]');
  if (dot && !it.dot) dot.remove();
  setGlyphs(row.querySelector('[data-figma="content"] > p'), it.body);
  setGlyphs(row.querySelector('[data-figma="더보기 버튼"] > p'), it.more);
  // 따봉 줄 아이콘은 댓글 프레임 2308:19983 값(#5C5C5C)으로 전체 목록까지 통일한다(11/11 사용자 확인: 팀이 댓글 프레임만 고친 상태).
  if (it.icon) { const ic = row.querySelector('[data-figma="icon"] [data-icon]'); if (ic) ic.style.color = it.icon; }
  // 의자 꾸미기 알림을 누르면 의자 꾸미기(20)로 간다. iOS도 같은 알림에서 의자 꾸미기를 연다(ChairStudioView, 뒤로 가면 알림으로).
  if (it.tpl === '2100:24938') {
    pressable(row, () => { toStudio = true; window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { from: 57, to: 20, t: 'push' } })); });
  }
  return row;
}

function activityChips(root) {
  const list = root && root.querySelector('[data-figma="Activity List"]');
  const row = root && root.querySelector('[data-figma="Keyword Chips"]');
  if (!list || !row || list.dataset.notiTabs) return;
  list.dataset.notiTabs = '1';
  const sc = root.querySelector(':scope > [data-scroll]');
  const content = sc && sc.querySelector(':scope > [data-scroll-content]');
  const tpls = {};
  NOTI_TABS.forEach((t) => t.items.forEach((it) => {
    if (!tpls[it.tpl]) { const e = list.querySelector(':scope > [data-node="' + it.tpl + '"]'); if (e) tpls[it.tpl] = e.cloneNode(true); }
  }));
  const chips = [...row.querySelectorAll(':scope > [data-figma^="Chip / "]')];
  let ghost = null;
  const paint = (tab) => {
    tab.chips.forEach((c, i) => {
      const el = chips[i];
      if (!el) return;
      el.style.background = c.bg;
      el.setAttribute('aria-pressed', c.on ? 'true' : 'false');
      const art = el.querySelector('p > span[aria-hidden]');
      if (art) art.innerHTML = NOTI_SVG[c.svg] || '';
      const cp = el.querySelector(':scope > p');
      if (cp) { cp.style.color = c.on ? '#121415' : '#F8F8F8'; cp.style.fontWeight = c.on || (i === 0 && tab.key === 'heat') ? '600' : '500'; if (ACT_CHIP_W[i]) cp.style.width = ACT_CHIP_W[i] + 'px'; }
    });
    list.replaceChildren(...tab.items.filter((it) => tpls[it.tpl]).map((it) => makeRow(tpls[it.tpl], it)));
    // 새로 복제한 줄의 글도 첫 그리기와 같이 -4% 실제 글자로 바꾼다(이전에는 분류를 바꾸면 옛 자간 윤곽이 보여 줄바꿈이 피그마와 달랐다).
    unifyTracking(row);
    unifyTracking(list);
    list.style.height = tab.listH + 'px';
    if (content) content.style.height = Math.max(844, LIST_TOP + tab.listH) + 'px';
    list.setAttribute('data-tab', tab.key);
    fixSubpixel(row);
    fixSubpixel(list);
  };
  const pick = (key) => {
    if (key === chipKey) return;
    const tab = NOTI_TABS.find((t) => t.key === key);
    if (!tab) return;
    chipKey = key;
    if (ghost) { ghost.remove(); ghost = null; }
    list.getAnimations().forEach((a) => a.cancel());
    // 교차 페이드: 지금 목록의 사본을 보이는 자리 그대로 위에 두고 옅게 지우며, 새 목록은 맨 위(스크롤 0)에서 옅게 나타난다(opacity만, 180ms).
    const top = sc ? sc.scrollTop : 0;
    const g = list.cloneNode(true);
    g.removeAttribute('data-figma');
    g.setAttribute('data-noti-ghost', '');
    g.setAttribute('aria-hidden', 'true');
    g.querySelectorAll('[data-node]').forEach((e) => e.removeAttribute('data-node'));
    g.removeAttribute('data-node');
    Object.assign(g.style, { top: LIST_TOP - top + 'px', pointerEvents: 'none' });
    list.insertAdjacentElement('afterend', g);
    ghost = g;
    if (sc) sc.scrollTop = 0;
    paint(tab);
    const o = { duration: FADE, easing: motion.standard, fill: 'both' };
    const a = list.animate([{ opacity: 0 }, { opacity: 1 }], o);
    a.onfinish = () => a.cancel();
    const b = g.animate([{ opacity: 1 }, { opacity: 0 }], o);
    const end = () => { g.remove(); if (ghost === g) ghost = null; };
    b.onfinish = end;
    window.setTimeout(end, FADE + 80);
  };
  chips.forEach((el, i) => pressable(el, () => pick(NOTI_TABS[i] ? NOTI_TABS[i].key : 'all')));
  const start = NOTI_TABS.find((t) => t.key === chipKey) || NOTI_TABS[0];
  paint(start);
}

// ---------- 키워드 알림 칩(11/12 피그마 #썸 2340:21569, #전남친 2340:21792, #남친 2340:22015, 전체 1952:14700과 2100:25022) ----------
// 칩을 누르면 그 분류 프레임의 목록(묶음 머리와 카드)만 남고 칩 모양이 바뀐다. 전체를 누르면 전체 목록으로 돌아온다. 활동 알림 칩과 같은 방식이다:
// 머리말과 탭, 요약 줄, 칩 줄은 그대로이고 목록만 180ms 교차 페이드(opacity)하며 새 목록은 맨 위(스크롤 0)에서 시작한다.
// 분류 프레임의 카드는 전체 목록의 같은 제목 카드와 노드 값이 같아서(REST 비교) 카드를 새로 만들지 않고 보이는 카드만 고른다.
// 카드에 붙은 동작(59의 오늘 카드를 누르면 방 구경)은 같은 카드라 그대로 따라간다. 고른 칩은 활동 알림 분류와 같이 알림 화면 안에서만 남는다.
let kwKey = 'all';
const KW_TOP = 162;
const kwText = (el) => ((el && el.querySelector(':scope > span:not([aria-hidden])')) || {}).textContent || '';
const kwNorm = (s) => s.replace(/\s+/g, '');
// 새 섹션 "자간줄여" 키워드 알림 네 장(전체 2340:28704, #썸 2340:28917, #전남친 2340:28874, #남친 2340:28821)의 글 칸 폭.
// 자간 -4% 로 글이 좁아져 칩 폭과 칩 자리(24, 84, 155, 247), "키워드 관리" 자리(281), 썸네일 시계 배지 폭(19:00 56, 14:12 53, 13:01 54)이 바뀌었다.
// 생성 화면은 예전 폭(자간 0)을 글 칸에 고정해 두었으므로 보이기 전에 새 폭으로 바꾼다. 칩 글자 폭은 고른 모양과 아닌 모양이 다를 수 있어 KW_CHIP_W 에 둔다.
const KW_W = { '알림 받는 키워드 3개': 142, '키워드 관리': 67, '오늘': 24, '어제': 24, '이번 주': 39 };
const KW_TIME_W = { '19:00': 27, '14:12': 24, '13:01': 25, '12:32': 26 };
// [고르지 않은 칩 글자 폭, 고른 칩 글자 폭]. 숫자 칸(8, 6)은 그대로다.
const KW_CHIP_W = { '전체': [24, 24], '썸': [23, 23], '전남친': [46, 47], '남친': [35, 35] };
function kwWidths(root) {
  root.querySelectorAll('[data-figma="Keyword Summary"] p[data-figma], [data-figma="Keyword Alert Content"] > [data-figma^="Group /"] p[data-figma]').forEach((p) => {
    const w = KW_W[kwText(p).trim() || p.getAttribute('data-figma')];
    if (w) p.style.width = w + 'px';
  });
  root.querySelectorAll('[data-figma="Keyword Alert Content"] [data-figma="Timer Badge"]').forEach((b) => {
    const p = b.querySelector(':scope > p[data-figma="time"]');
    const w = p && KW_TIME_W[kwText(p).trim()];
    if (!w) return;
    p.style.width = w + 'px';
    b.style.width = 'auto';
  });
}

function keywordChips(root) {
  const box = root && root.querySelector('[data-figma="Keyword Alert Content"]');
  const row = box && box.querySelector(':scope > [data-figma="Keyword Chips"]');
  if (!box || !row || box.dataset.kwTabs) return;
  box.dataset.kwTabs = '1';
  kwWidths(root);
  const sc = root.querySelector(':scope > [data-scroll]');
  const content = sc && sc.querySelector(':scope > [data-scroll-content]');
  const base = { box: box.style.height, content: content ? content.style.height : '' };
  const rows = [...box.children].filter((c) => /^(Group|Alert) \//.test(c.getAttribute('data-figma') || ''));
  const keyOf = (c) => (/^Group/.test(c.getAttribute('data-figma')) ? 'g:' + kwNorm(kwText(c.querySelector('p'))) : 't:' + kwNorm(kwText(c.querySelector('[data-figma="Title"]'))));
  // 59 생성 화면은 줄 배치(display flex)를 인라인으로 단다. 숨겼다 다시 보일 때 그 값으로 되돌린다.
  const disp = new Map(rows.map((c) => [c, c.style.display]));
  rows.forEach((c) => { c.dataset.kwKey = keyOf(c); });
  const chips = [...row.querySelectorAll(':scope > [data-figma^="Chip / "]')];
  // 칩 글자: 고르지 않은 모양은 생성 화면 값을 그대로 쓰고(전체만 고른 모양), 나머지 모양은 피그마 분류 프레임의 윤곽(kwTabs.js)을 쓴다.
  const parts = chips.map((el) => [...el.querySelectorAll(':scope > p')].map((p) => ({ p, art: p.querySelector(':scope > span[aria-hidden]') })));
  const gen = parts.map((ps) => ps.map((x) => (x.art ? x.art.innerHTML : '')));
  const names = chips.map((el) => (el.getAttribute('data-figma') || '').replace('Chip / ', ''));
  const paint = (tab) => {
    chips.forEach((el, i) => {
      const on = i === tab.on;
      // 피그마 Chip: 고른 칩 #F8F8F8 바탕에 글자와 숫자 #121415 SemiBold 14(행간 17), 고르지 않은 칩 #222628 바탕에 글자 #F8F8F8 Medium 14, 숫자 #36D2FF Bold 13(행간 16)
      el.style.background = on ? '#F8F8F8' : '#222628';
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      const nm = names[i];
      parts[i].forEach((x, k) => {
        const isAll = nm === '전체';
        if (k === 0 && KW_CHIP_W[nm]) x.p.style.width = KW_CHIP_W[nm][on ? 1 : 0] + 'px';
        let html = gen[i][k];
        if (isAll && !on) html = KW_ALL_OFF;
        if (!isAll && on && KW_CHIP_ON[nm]) html = k === 0 ? KW_CHIP_ON[nm].label : KW_CHIP_ON[nm].count;
        if (x.art && html) x.art.innerHTML = html;
        x.p.style.color = on ? '#121415' : k === 0 ? '#F8F8F8' : '#36D2FF';
        x.p.style.fontWeight = on ? '600' : k === 0 ? '500' : '700';
        if (k > 0) { x.p.style.fontSize = on ? '14px' : '13px'; x.p.style.lineHeight = on ? '17px' : '16px'; }
      });
    });
    const want = tab.rows ? new Set(tab.rows.map((r) => (r.group ? 'g:' + kwNorm(r.group) : 't:' + kwNorm(r.title)))) : null;
    rows.forEach((c) => { c.style.display = !want || want.has(c.dataset.kwKey) ? disp.get(c) : 'none'; });
    box.style.height = tab.key === 'all' ? base.box : tab.h + 'px';
    if (content) content.style.height = tab.key === 'all' ? base.content : Math.max(844, KW_TOP + tab.h) + 'px';
    box.setAttribute('data-tab', tab.key);
    fixSubpixel(row);
  };
  let ghost = null;
  const pick = (key) => {
    if (key === kwKey) return;
    const tab = KW_TABS.find((t) => t.key === key);
    if (!tab) return;
    kwKey = key;
    if (ghost) { ghost.remove(); ghost = null; }
    rows.forEach((c) => c.getAnimations().forEach((a) => a.cancel()));
    // 교차 페이드: 지금 목록의 사본을 보이는 자리 그대로 위에 두고 옅게 지우며(요약 줄, 칩 줄, 구분 띠는 사본에서 숨김), 새 목록은 맨 위에서 옅게 나타난다.
    const top = sc ? sc.scrollTop : 0;
    const g = box.cloneNode(true);
    g.removeAttribute('data-figma');
    g.removeAttribute('data-kw-tabs');
    g.setAttribute('data-noti-ghost', '');
    g.setAttribute('aria-hidden', 'true');
    g.querySelectorAll('[data-node]').forEach((e) => e.removeAttribute('data-node'));
    g.removeAttribute('data-node');
    [...g.children].forEach((c) => { if (!/^(Group|Alert) \//.test(c.getAttribute('data-figma') || '')) c.style.visibility = 'hidden'; c.removeAttribute('data-figma'); });
    const gTop = KW_TOP - top;
    const floor = root.clientHeight || 844;
    Object.assign(g.style, { top: gTop + 'px', height: Math.max(0, Math.min(box.offsetHeight, floor - gTop)) + 'px', pointerEvents: 'none' });
    box.insertAdjacentElement('afterend', g);
    ghost = g;
    if (sc) sc.scrollTop = 0;
    paint(tab);
    const o = { duration: FADE, easing: motion.standard, fill: 'both' };
    rows.filter((c) => c.style.display !== 'none').forEach((c) => { const a = c.animate([{ opacity: 0 }, { opacity: 1 }], o); a.onfinish = () => a.cancel(); });
    const b = g.animate([{ opacity: 1 }, { opacity: 0 }], o);
    const end = () => { g.remove(); if (ghost === g) ghost = null; };
    b.onfinish = end;
    window.setTimeout(end, FADE + 80);
  };
  chips.forEach((el, i) => pressable(el, () => pick((KW_TABS.find((t) => t.on === i) || KW_TABS[0]).key)));
  const start = KW_TABS.find((t) => t.key === kwKey) || KW_TABS[0];
  // 전체로 시작해도 칩 글자 폭을 새 값으로 칠하려고 항상 한 번 칠한다(보이기 전 useLayoutEffect).
  paint(start);
}

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
  useLayoutEffect(() => { clipScroll(root(), 221); showStrokes(root()); activityChips(root()); return keepOrReset; }, []);
  return <div ref={ref} style={{ display: 'contents' }}><Screen2100_24856 /></div>;
}

export function NotiKeywordScreen() {
  const [ref, root] = useRoot();
  useLayoutEffect(() => { const r = root(); clipScroll(r, 162); showStrokes(r); wireAlerts(r); keywordChips(r); return keepOrReset; }, []);
  return <div ref={ref} style={{ display: 'contents' }}><Screen2100_25022 /></div>;
}

// 키워드 알림(58, 피그마 1952:14700): 생성 화면 그대로에 키워드 칩만 붙인다(카드 누름 동작은 지금처럼 없음).
export function NotiKeyword58Screen() {
  const [ref, root] = useRoot();
  useLayoutEffect(() => { keywordChips(root()); return keepOrReset; }, []);
  return <div ref={ref} style={{ display: 'contents' }}><NotiKeyword /></div>;
}

// 최종 드르륵 키워드 알림 설정(2340:28646): 자간 -4% 로 최근 본 키워드 칩 글 칸 폭이 36, 24, 36, 24, 48, 24 가 되어
// 칩 폭 80, 68, 80, 68, 92, 68(자리 24, 112, 188, 276 / 24, 124)이 됐다. 생성 화면은 예전 폭(37, 25, 49)을 고정해 두었으므로 보이기 전에 바꾼다.
const SET_CHIP_W = { '짝사랑': 36, '용돈': 24, '단톡방': 36, '바람': 24, '고등학교': 48, '연애': 24 };
function settingsWidths(root) {
  if (!root) return;
  root.querySelectorAll('[data-figma^="Chip / "] > p').forEach((p) => {
    const w = SET_CHIP_W[kwText(p).trim()];
    if (w) p.style.width = w + 'px';
  });
}

export function NotiSettingsScreen() {
  const [ref, root] = useRoot();
  useLayoutEffect(() => { showStrokes(root()); settingsWidths(root()); return keepOrReset; }, []);
  return <div ref={ref} style={{ display: 'contents' }}><Screen2100_24964 /></div>;
}
