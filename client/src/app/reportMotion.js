// 종료(1)와 아침(2)의 움직임. 팀 피그마 댓글(2026. 11. 10.)을 따른다.
// 1) 엉따 온도 막대(엉따온도 Card 안 Track > Bar)가 화면에 보이는 순간 왼쪽에서 오른쪽으로 1.0초 동안 찬다(의정 1647:26876).
//    처음부터 보이면 입장 0.2초 뒤, 스크롤 아래에 있으면 화면에 들어오는 순간 시작한다. 색은 그대로 두고 드러내기만 한다(마이 my.js와 같은 방식, 같은 곡선).
// 2) 종료(1)만: 스크롤을 내리면 내용 덩어리가 화면에 들어오는 순서대로 아래에서 16px 올라오며 옅게 나타난다(의정 1647:26726 핀 175,731).
//    덩어리 안의 줄은 60ms 간격으로 이어진다. 처음 보이는 덩어리는 입장 0.1초 뒤부터, 스크롤로 들어오는 덩어리는 화면 아래 80px 안으로 들어오는 순간 시작한다.
//    한 번 나온 덩어리는 다시 숨지 않는다. 줄인 움직임 설정이면 움직임 없이 바로 보인다.
// 움직임은 opacity와 translate(transform 속성의 한 갈래)만 쓴다. 화면 스크롤(live.js scrollerOf)이 덩어리에 transform을 쓰므로 겹치지 않게 translate로 움직인다.
import { motion, live as LIVE } from '../tokens.js';
import { q, relRect } from './dom.js';
import { SOLO_REPORT, SOLO_REPORT_H } from './soloReport.js';

// 아래 버튼 묶음이 창 바닥에 붙는 종료 화면: 함께 방 종료(1, 1708 프레임)와 혼자 드르륵 종료 리포트(65, 1092 프레임, soloReport.js)
// 아침(2)도 최종 2340:23266, 2369:4202에서 종료 리포트 위쪽과 같은 짜임(종료 생성 화면, MorningReport.jsx)이라 같은 고정 묶음과 스크롤을 쓴다.
// 아침은 엉따 막대만 차고 덩어리 펼침은 하지 않는다(의정 1647:26876 막대 댓글, 펼침 댓글은 종료 1647:26726에만).
export const isEndScreen = (n) => n === 1 || n === 2 || n === SOLO_REPORT;
const rises = (n) => isEndScreen(n) && n !== 2;

const R = LIVE.reportMotion;
const EMPTY = 'inset(0 100% 0 0 round 99px)';
const FULL = 'inset(0 0 0 0 round 99px)';
// 종료(1) 화면 크기 창: 생성 화면(Screen1647_26726)은 뿌리 칸 높이가 피그마 프레임 그대로 1708이다(생성 코드는 고치지 않는다).
// 뿌리 칸을 화면 크기(844)로 묶어 그 안에서 내용이 움직이게 한다(live.js scrollerOf, screens.js h 844). 휴대폰 맞춤(mobileFit.js)도 844 화면으로 읽는다.
if (typeof document !== 'undefined' && !document.getElementById('drrrk-end-window')) {
  const st = document.createElement('style');
  st.id = 'drrrk-end-window';
  // 휴대폰 맞춤이 창 높이에 맞춰 늘린 높이는 --end-h 로 이어받는다(prepReportMotion).
  st.textContent = '[data-figma="종료"][data-node="2023:30658"]{height:var(--end-h, ' + LIVE.screenH + 'px) !important}';
  document.head.appendChild(st);
}
// 종료(1) 창 바닥(뿌리 칸 좌표). 휴대폰 맞춤이 뿌리 칸 높이를 바꿨으면(생성 높이 1708이 아니면) 그 높이를 창 높이로 쓴다.
export function endFloor(root) {
  const h = parseFloat(root.style.height);
  if (root.dataset.fit && h && h !== 1708) { root.style.setProperty('--end-h', h + 'px'); return h; }
  return LIVE.screenH;
}
// 종료(1) 아래 버튼 묶음(피그마 2023:30766, 1804:13238 "Frame 2147249293", 342 x 78, 세로 제약 BOTTOM)은 스크롤해도 창 바닥에 붙어 따라온다(탁빛나 11/12 "하단바 따라오게").
// 피그마 1708 프레임에서 묶음 아래 여백은 40(1590 + 78 = 1668)이다. 창 바닥에서 같은 여백을 두고, 묶음 위의 누르는 자리(커뮤니티에 고민 올리기, 올리지 않고 홈으로)도 같은 만큼 올린다.
// 피그마에 묶음 뒤 배경(판, 그라데이션)은 없다. 묶음 윗선 아래로 내려간 내용은 스크롤 칸(live.js scrollerOf)이 잘라 버튼과 겹치지 않는다.
// 두 번 불러도 같은 결과다(처음 자리를 data-y0에 적어 둔다).
export function pinEndBar(root, layer) {
  const bar = root.querySelector(':scope > [data-figma="Frame 2147249293"]');
  if (!bar) return null;
  if (!bar.dataset.y0) bar.dataset.y0 = String(parseFloat(bar.style.top) || relRect(root, bar).y);
  const y0 = +bar.dataset.y0;
  const H = root.dataset.soloReport ? SOLO_REPORT_H : END_H;
  const shift = y0 - (endFloor(root) - (H - y0));
  bar.style.top = y0 - shift + 'px';
  bar.style.zIndex = '3';
  if (layer) q(layer, '[data-hotspot]').forEach((b) => {
    if (!b.dataset.y0) b.dataset.y0 = b.style.top;
    const t = parseFloat(b.dataset.y0);
    if (!(t >= y0 - 0.5)) return;
    b.style.top = t - shift + 'px';
    b.dataset.fitPinned = '1';
  });
  return bar;
}
const END_H = 1708;
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const bars = (root) => q(root, '[data-figma="엉따온도 Card"] [data-figma="Track"] > [data-figma="Bar"]');

// 덩어리 목록(피그마 종료 프레임 순서): 제목, 해 그림, Report 안 네 묶음, 아래 버튼 묶음.
// 줄은 덩어리의 바로 아래 자식이다. 목록(Timeline, Comment List)은 그 안의 항목 하나하나가 줄이고, 엉따 카드는 카드 하나가 한 줄이다.
const LISTS = ['Timeline', 'Comment List'];
function blocksOf(root) {
  const out = [];
  const add = (el, rows) => el && out.push({ el, rows: rows.filter(Boolean) });
  const title = root.querySelector(':scope > [data-figma="아침이 밝아 대화가 종료되었어요"]');
  add(title, [title]);
  const sun = root.querySelector(':scope > [data-figma="image 1208091482"]');
  add(sun, [sun]);
  const report = root.querySelector(':scope > [data-figma="Report"]');
  if (report) {
    [...report.children].forEach((sec) => {
      const rows = [];
      [...sec.children].forEach((c) => {
        if (LISTS.includes(c.getAttribute('data-figma'))) rows.push(...c.children);
        else rows.push(c);
      });
      add(sec, rows);
    });
  }
  const btns = [...root.children].find((c) => c.getAttribute('data-figma') === 'Frame 2147249293');
  if (btns) add(btns, [...btns.children]);
  return out.sort((a, b) => relRect(root, a.el).y - relRect(root, b.el).y);
}

// 화면 창의 보이는 아래 끝(root 좌표). 창(390 x 844 층)과 브라우저 창 중 작은 쪽.
function viewBottom(root) {
  const s = root.getBoundingClientRect().width / LIVE.screenW || 1;
  const top = root.getBoundingClientRect().top;
  let bottom = window.innerHeight;
  for (let p = root; p && p !== document.body; p = p.parentElement) {
    const ov = getComputedStyle(p).overflowY;
    if (ov === 'hidden' || ov === 'clip' || ov === 'auto') bottom = Math.min(bottom, p.getBoundingClientRect().bottom);
  }
  return (bottom - top) / s;
}

// 화면이 보이기 전(prepare): 막대를 비우고, 종료의 줄을 숨겨 둔다.
export function prepReportMotion(root, n) {
  if ((!isEndScreen(n) && n !== 2) || root.dataset.reportMotion) return;
  root.dataset.reportMotion = 'prep';
  if (isEndScreen(n)) endFloor(root);
  if (reduced()) return;
  bars(root).forEach((b) => (b.style.clipPath = EMPTY));
  if (rises(n)) blocksOf(root).forEach((bk) => bk.rows.forEach((r) => Object.assign(r.style, { opacity: '0', translate: '0 ' + R.dy + 'px' })));
}

function fill(bar, delay) {
  const a = bar.animate([{ clipPath: EMPTY }, { clipPath: FULL }], { duration: LIVE.gaugeMs, delay, easing: motion.emphasizedDecel, fill: 'both' });
  a.onfinish = () => { bar.style.clipPath = ''; a.cancel(); };
}

function rise(row, delay) {
  const a = row.animate([{ opacity: 0, translate: '0 ' + R.dy + 'px' }, { opacity: 1, translate: '0 0' }], { duration: R.ms, delay, easing: motion.standard, fill: 'both' });
  a.onfinish = () => { row.style.opacity = ''; row.style.translate = ''; a.cancel(); };
}

// 화면이 자리를 잡은 뒤(attach): 매 프레임 보이는 자리를 재서 막대와 덩어리를 한 번씩만 시작한다.
export function attachReportMotion(root, n) {
  if ((!isEndScreen(n) && n !== 2) || root.dataset.reportMotion !== 'prep') return;
  root.dataset.reportMotion = 'on';
  if (reduced()) return;
  const t0 = performance.now();
  let gauges = bars(root);
  let blocks = rises(n) ? blocksOf(root) : [];
  let nextAt = 0;
  const loop = () => {
    if (!root.isConnected) return;
    const now = performance.now();
    const first = now - t0 < 50;
    const bottom = viewBottom(root);
    gauges = gauges.filter((b) => {
      if (relRect(root, b).y >= bottom) return true;
      fill(b, first ? LIVE.gaugeDelay : 0);
      return false;
    });
    blocks = blocks.filter((bk) => {
      if (relRect(root, bk.el).y >= bottom - R.enterBand) return true;
      const base = Math.max(first ? t0 + R.firstDelay : now, nextAt);
      bk.rows.forEach((r, i) => rise(r, base + i * R.rowGap - now));
      nextAt = base + bk.rows.length * R.rowGap;
      return false;
    });
    if (gauges.length || blocks.length) window.requestAnimationFrame(loop);
  };
  loop();
}
