// 대화 다시보기(재방송, 61). 팀 피그마 2322:12283 "대화 다시보기 (재방송)"(390 x 844, 2026. 11. 11. 의정 "라이브다시보기 화면 추가")를 그대로 옮긴 화면.
// 글 상세(38)의 대화 다시보기 카드를 누르면 밀어 들어오고(push), 왼쪽 위 뒤로(flow.js 61 -> 38 back)를 누르면 글 상세로 돌아간다.
// 2026. 11. 12. 팀이 "자간줄여" 섹션에 두 상태를 나눠 그렸다: 재생 중 2340:30920(btn_일시정지, 두 막대), 일시정지 2351:34663(btn_재생, 원에 둥근 삼각형 구멍). 두 프레임은 버튼만 다르다.
// 동작: 06:12에서 재생 중(2340:30920)으로 시작해 실제 1초에 1초씩 흐른다. 가운데 버튼을 누르면 일시정지(2351:34663)와 재생을 오간다.
// 애니메이션(팀 댓글 "애니메이션", 2351:34663 진행 바와 컨트롤 줄): 진행 바와 손잡이는 매 화면 그리기(requestAnimationFrame)마다 translateX로 흐르고, 10초 옮김은 180ms 표준 곡선으로 미끄러진다.
// 두 버튼 아이콘은 겹쳐 두고 opacity와 scale(0.9에서 1)을 180ms 표준 곡선으로 바꿔 교차한다. 피그마에 프로토타입 연결과 스마트 애니메이트 값은 없다.
// 10초 버튼은 시간을 10초 옮기고, 배속 칩은 1.0x, 1.5x, 2.0x 순서로 돌며 흐르는 빠르기를 바꾼다. 12:32에 닿으면 멈춘다.
// 댓글 말풍선은 피그마에 순서 단서가 없어 처음부터 프레임 그대로 보인다.
// 제목과 댓글 두 줄은 글 상세에서 연 글을 따른다(11. 12. 03:13 사용자 지시). 목록에서 누른 제목이 postScripts.js 표에 있으면 그 글 제목과 댓글이고, 없으면 사진보정 원문(replayData.js)이다. 장면과 의자 그림, 시간은 그대로다.
// 끌어 옮기기(11. 12. 04:46 사용자 지시): 재생 바 위아래 30 칸 어디든 누르면 그 자리로 바로 옮기고, 누른 채 좌우로 끌면 손잡이와 진행 막대, 시간 글이 손가락을 따라 바뀐다.
// 끄는 동안 흐름은 멈추고 손잡이는 scale 1.3(120ms 표준 곡선)으로 커진다. 놓으면 원래 상태(재생 중이면 이어 재생, 일시정지면 그대로)로 돌아가고, 끝까지 끌어 놓으면 12:32 끝 처리대로 멈춘다.
// 휴대폰 높이 맞춤(mobileFit.js)이 읽을 수 있게 맨 바깥 칸의 자식은 모두 피그마 좌표의 absolute 칸이다.
import { useEffect, useRef, useState } from 'react';
import { motion } from '../tokens.js';
import { REPLAY } from './replayData.js';
import { pickedPostTitle } from './community.js';
import { scriptFor } from './postScripts.js';

const C = { bg: '#121415', card: '#222628', chip: '#33383D', text: '#F8F8F8', sub: '#9AA1A6', faint: '#6E767C', brand: '#36D2FF' };
const SUIT = "'SUIT', system-ui, sans-serif";
const BAR_W = 342;

const t = (size, weight, color, extra) => ({ margin: 0, fontFamily: SUIT, fontSize: size, fontWeight: weight, color, whiteSpace: 'pre', ...extra });
const mmss = (s) => {
  const v = Math.max(0, Math.floor(s));
  return String(Math.floor(v / 60)).padStart(2, '0') + ':' + String(v % 60).padStart(2, '0');
};

// 피그마에서 내보낸 아이콘(SVG 그대로)
const icon = {
  chevron: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: 'block' }}><path d="M16 4L8 12L16 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#FFFFFF" /></svg>,
  // icon/replay 2322:12353
  replay: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}><path d="M1.75 7C1.75 8.03835 2.05791 9.05339 2.63478 9.91674C3.21166 10.7801 4.0316 11.453 4.99091 11.8504C5.95022 12.2477 7.00582 12.3517 8.02422 12.1491C9.04262 11.9466 9.97808 11.4465 10.7123 10.7123C11.4465 9.97808 11.9466 9.04262 12.1491 8.02422C12.3517 7.00582 12.2477 5.95022 11.8504 4.99091C11.453 4.0316 10.7801 3.21166 9.91674 2.63478C9.05339 2.05791 8.03835 1.75 7 1.75C5.53231 1.75552 4.12357 2.32821 3.06833 3.34833L1.75 4.66667" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="#F8F8F8" /><path d="M1.75 1.75V4.66667H4.66667" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="#F8F8F8" /></svg>,
  // view 2322:12329
  view: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}><path d="M7.99999 10.2196C9.22683 10.2196 10.2214 9.22509 10.2214 7.99825C10.2214 6.77141 9.22683 5.77686 7.99999 5.77686C6.77315 5.77686 5.7786 6.77141 5.7786 7.99825C5.7786 9.22509 6.77315 10.2196 7.99999 10.2196Z" fill="#F8F8F8" /><path d="M14.2594 6.56499C13.3981 5.16218 11.4388 2.80859 8.00004 2.80859C4.56131 2.80859 2.60203 5.16218 1.74068 6.56499C1.1976 7.44339 1.1976 8.5533 1.74068 9.43172C2.60203 10.8345 4.56131 13.1881 8.00004 13.1881C11.4388 13.1881 13.3981 10.8345 14.2594 9.43172C14.8025 8.5533 14.8025 7.44339 14.2594 6.56499ZM8.00004 11.3304C6.15978 11.3304 4.66794 9.8386 4.66794 7.99834C4.66794 6.15809 6.15978 4.66624 8.00004 4.66624C9.8403 4.66624 11.3321 6.15809 11.3321 7.99834C11.3303 9.83785 9.83955 11.3286 8.00004 11.3304Z" fill="#F8F8F8" /></svg>,
  // 대화한 의자 머리 아이콘 2322:12292
  wave: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}><path d="M3 8C3 7.44772 2.55228 7 2 7C1.44772 7 1 7.44772 1 8V10C1 10.5523 1.44772 11 2 11C2.55228 11 3 10.5523 3 10V8Z" fill="#3CD2F5" /><path d="M7 5C7 4.44772 6.55228 4 6 4C5.44772 4 5 4.44772 5 5V13C5 13.5523 5.44772 14 6 14C6.55228 14 7 13.5523 7 13V5Z" fill="#3CD2F5" /><path d="M11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2V16C9 16.5523 9.44772 17 10 17C10.5523 17 11 16.5523 11 16V2Z" fill="#3CD2F5" /><path d="M15 5C15 4.44772 14.5523 4 14 4C13.4477 4 13 4.44772 13 5V13C13 13.5523 13.4477 14 14 14C14.5523 14 15 13.5523 15 13V5Z" fill="#3CD2F5" /></svg>,
  // 10초 뒤로 화살표 2322:12367, 10초 앞으로 2322:12376
  back10: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" style={{ display: 'block' }}><path d="M3.5 14C3.5 16.0767 4.11581 18.1068 5.26957 19.8335C6.42332 21.5602 8.0632 22.906 9.98182 23.7007C11.9004 24.4955 14.0116 24.7034 16.0484 24.2982C18.0852 23.8931 19.9562 22.8931 21.4246 21.4246C22.8931 19.9562 23.8931 18.0852 24.2982 16.0484C24.7034 14.0116 24.4955 11.9004 23.7007 9.98182C22.906 8.0632 21.5602 6.42332 19.8335 5.26957C18.1068 4.11581 16.0767 3.5 14 3.5C11.0646 3.51104 8.24713 4.65643 6.13667 6.69667L3.5 9.33333" strokeWidth="1.98333" strokeLinecap="round" strokeLinejoin="round" stroke="#F8F8F8" /><path d="M3.5 3.5V9.33333H9.33333" strokeWidth="1.98333" strokeLinecap="round" strokeLinejoin="round" stroke="#F8F8F8" /></svg>,
  fwd10: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" style={{ display: 'block' }}><path d="M24.5 14C24.5 16.0767 23.8842 18.1068 22.7304 19.8335C21.5767 21.5602 19.9368 22.906 18.0182 23.7007C16.0996 24.4955 13.9884 24.7034 11.9516 24.2982C9.91476 23.8931 8.04383 22.8931 6.57538 21.4246C5.10693 19.9562 4.1069 18.0852 3.70176 16.0484C3.29661 14.0116 3.50455 11.9004 4.29927 9.98182C5.09399 8.0632 6.4398 6.42332 8.16652 5.26957C9.89323 4.11581 11.9233 3.5 14 3.5C16.94 3.5 19.7517 4.66667 21.8633 6.69667L24.5 9.33333" strokeWidth="1.98333" strokeLinecap="round" strokeLinejoin="round" stroke="#F8F8F8" /><path d="M24.5 3.5V9.33333H18.6666" strokeWidth="1.98333" strokeLinecap="round" strokeLinejoin="round" stroke="#F8F8F8" /></svg>,
  // btn_일시정지 2322:12371
  pause: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ display: 'block' }}><path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#36D2FF" /><path d="M20.5 15H18.5C17.6716 15 17 15.6716 17 16.5V31.5C17 32.3284 17.6716 33 18.5 33H20.5C21.3284 33 22 32.3284 22 31.5V16.5C22 15.6716 21.3284 15 20.5 15Z" fill="#121415" /><path d="M29.5 15H27.5C26.6716 15 26 15.6716 26 16.5V31.5C26 32.3284 26.6716 33 27.5 33H29.5C30.3284 33 31 32.3284 31 31.5V16.5C31 15.6716 30.3284 15 29.5 15Z" fill="#121415" /></svg>,
  // btn_재생 2351:34663 안 shape: 원(#36D2FF)에서 둥근 삼각형을 빼낸 한 모양(EVENODD). 삼각형 자리는 비어 아래 컨트롤 판(#222628)이 보인다.
  play: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ display: 'block' }}><path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 37.2552 37.2552 48 24 48C10.7448 48 0 37.2552 0 24C0 10.7448 10.7448 0 24 0C37.2552 0 48 10.7448 48 24ZM20.88 15C19.32 14.04 18 14.832 18 16.68L18 31.32C18 33.168 19.32 33.96 20.88 33L32.52 25.68C34.08 24.72 34.08 23.28 32.52 22.32L20.88 15Z" fill="#36D2FF" /></svg>,
};

// 누름 반응: 누르면 scale 0.97과 opacity 0.85(90ms), 떼면 120ms. 표준 곡선.
function pressProps() {
  const set = (el, on) => {
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.transition = 'transform ' + (on ? 90 : 120) + 'ms ' + motion.standard + ', opacity ' + (on ? 90 : 120) + 'ms ' + motion.standard;
    el.style.transform = on ? 'scale(0.97)' : '';
    el.style.opacity = on ? '0.85' : '';
  };
  return {
    onPointerDown: (e) => set(e.currentTarget, true),
    onPointerUp: (e) => set(e.currentTarget, false),
    onPointerLeave: (e) => set(e.currentTarget, false),
    onPointerCancel: (e) => set(e.currentTarget, false),
  };
}

// 표준 곡선 cubic-bezier(0.2, 0, 0, 1)을 자바스크립트로 푼다(10초 옮김 미끄러짐에 쓴다).
const ease = (() => {
  const x1 = 0.2, y1 = 0, x2 = 0, y2 = 1;
  const bz = (t, a, b) => 3 * a * t * (1 - t) * (1 - t) + 3 * b * t * t * (1 - t) + t * t * t;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++) { t = (lo + hi) / 2; if (bz(t, x1, x2) < x) lo = t; else hi = t; }
    return bz(t, y1, y2);
  };
})();
const SEEK_MS = 180;
const ICON_T = 'opacity 180ms ' + motion.standard + ', transform 180ms ' + motion.standard;

function Btn({ label, onPress, style, children, figma }) {
  return (
    <div role="button" tabIndex={0} aria-label={label} data-figma={figma} onClick={(e) => { e.stopPropagation(); onPress(); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPress(); } }} {...pressProps()} style={{ cursor: 'pointer', flexShrink: 0, ...style }}>
      {children}
    </div>
  );
}

export default function ReplayScreen() {
  const rootRef = useRef(null);
  const [copy] = useState(() => { const sc = scriptFor(pickedPostTitle()); return sc ? { title: sc.title, comments: sc.replay } : { title: REPLAY.title, comments: REPLAY.comments }; });
  const pos = useRef(REPLAY.start);
  const rateRef = useRef(1);
  const playRef = useRef(true);
  const barRef = useRef(null);
  const thumbRef = useRef(null);
  // 10초 옮김 미끄러짐: 옮기기 직전 보이던 위치와 새 위치의 차이(초)를 180ms 동안 0으로 줄인다.
  const glide = useRef({ gap: 0, t0: 0 });
  // 끄는 중인지와 끌기를 받는 칸(위아래 30), 손잡이 안쪽 원(눌림 반응 scale을 따로 건다).
  const dragRef = useRef(null);
  const hitRef = useRef(null);
  const knobRef = useRef(null);
  const [sec, setSec] = useState(REPLAY.start);
  const [playing, setPlaying] = useState(true);
  const [rateI, setRateI] = useState(0);

  // 진행 바와 손잡이는 transform만 바꾼다(그리기마다 React를 다시 돌리지 않는다).
  const gapNow = (now) => {
    const g = glide.current;
    if (!g.gap) return 0;
    const k = (now - g.t0) / SEEK_MS;
    if (k >= 1) { g.gap = 0; return 0; }
    return g.gap * (1 - ease(k));
  };
  const paint = (now = performance.now()) => {
    const shownSec = Math.min(REPLAY.total, Math.max(0, pos.current + gapNow(now)));
    const p = shownSec / REPLAY.total;
    // 진행 바는 트랙 폭(342) 그대로 두고 둥근 트랙 칸 안에서 왼쪽으로 밀어 낸다(scaleX처럼 끝 둥근 모서리가 찌그러지지 않는다).
    if (barRef.current) barRef.current.style.transform = 'translateX(' + ((p - 1) * BAR_W) + 'px)';
    if (thumbRef.current) thumbRef.current.style.transform = 'translateX(' + (p * BAR_W - 7) + 'px)';
    const s = Math.floor(pos.current);
    setSec((v) => (v === s ? v : s));
  };

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    // 화면 칸(Prototype Layer)이 준비 중이라 opacity 0으로 숨어 있는 동안은 흐르지 않는다. 보이는 순간 06:12부터 흐른다.
    const shown = () => { for (let e = rootRef.current; e; e = e.parentElement) { if (e.style && e.style.opacity === '0') return false; } return true; };
    const tick = (now) => {
      const dt = Math.min(0.25, (now - last) / 1000);
      last = now;
      if (dragRef.current) {
        // 끄는 동안은 흐르지 않는다(위치는 포인터가 정한다).
      } else if (playRef.current && !document.hidden && shown()) {
        pos.current = Math.min(REPLAY.total, pos.current + dt * rateRef.current);
        if (pos.current >= REPLAY.total) { playRef.current = false; setPlaying(false); }
        paint(now);
      } else if (glide.current.gap) {
        paint(now);
      }
      raf = requestAnimationFrame(tick);
    };
    paint();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    // 끝까지 간 뒤 재생을 누르면 처음부터 다시 본다.
    if (!playRef.current && pos.current >= REPLAY.total) pos.current = 0;
    playRef.current = !playRef.current;
    setPlaying(playRef.current);
    paint();
  };
  const seek = (d) => {
    const now = performance.now();
    const before = pos.current + gapNow(now);
    pos.current = Math.min(REPLAY.total, Math.max(0, pos.current + d));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    glide.current = { gap: reduce ? 0 : before - pos.current, t0: now };
    paint(now);
  };
  // 포인터 x를 0에서 12:32 사이 위치로 바꾼다. 화면 배율(mobileFit, 1440 틀)과 상관없이 트랙의 실제 화면 폭으로 나눈다.
  const posAt = (clientX) => {
    const r = hitRef.current.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    return k * REPLAY.total;
  };
  const knob = (on) => {
    const el = knobRef.current;
    if (!el) return;
    el.style.transition = 'transform 120ms ' + motion.standard;
    el.style.transform = on ? 'scale(1.3)' : 'scale(1)';
  };
  const scrubDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) { /* 포인터가 이미 떨어졌다 */ }
    dragRef.current = { id: e.pointerId };
    glide.current = { gap: 0, t0: 0 };
    pos.current = posAt(e.clientX);
    knob(true);
    paint();
  };
  const scrubMove = (e) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    pos.current = posAt(e.clientX);
    paint();
  };
  const scrubUp = (e) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    if (e.type === 'pointerup') pos.current = posAt(e.clientX);
    dragRef.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) { /* 이미 풀렸다 */ }
    knob(false);
    // 재생 중이었고 끝(12:32)에 놓았으면 다음 그리기에서 끝 처리(멈춤)가 돈다. 일시정지였으면 그 자리에 멈춰 있다.
    paint();
  };
  const cycleRate = () => {
    const next = (rateI + 1) % REPLAY.rates.length;
    rateRef.current = REPLAY.rates[next];
    setRateI(next);
  };

  return (
    <div ref={rootRef} data-figma="대화 다시보기 (재방송)" data-node="2322:12283" style={{ width: 390, height: 844, background: C.bg, position: 'relative', overflow: 'hidden' }}>
      <img data-figma="scene (방 미리보기)" data-node="2322:12284" alt="" draggable={false} src={REPLAY.scene} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 440, display: 'block', objectFit: 'cover' }} />
      {/* 피그마 높이는 140이다. 화면 배율에서 장면 그림 아래 끝(440)이 한 줄 비쳐 보여 1만큼 더 내려 덮는다. */}
      <div data-figma="scene fade" data-node="2322:12285" style={{ position: 'absolute', left: -7, top: 300, width: 404, height: 141, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(18,20,21,0) 0%, #121415 100%)' }} />
      <div data-figma="Rectangle 1954141373" data-node="2322:12286" style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 125, pointerEvents: 'none', background: 'linear-gradient(180deg, #000000 0%, rgba(0,0,0,0) 100%)' }} />
      <div data-figma="chevron-left" data-node="2322:12287" style={{ position: 'absolute', left: 24, top: 79, width: 24, height: 24 }}>{icon.chevron}</div>
      <div data-figma="다시보기 배지" data-node="2322:12352" style={{ position: 'absolute', left: 56, top: 78, height: 27, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px 5px 9px', borderRadius: 999, background: 'rgba(0,0,0,0.7)' }}>
        {icon.replay}
        <p style={t(12, 700, C.text, { lineHeight: '17px' })}>{REPLAY.badge}</p>
      </div>
      <div data-figma="보는 중" data-node="2322:12328" style={{ position: 'absolute', left: 313, top: 78, height: 27, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px 5px 9px', borderRadius: 999, background: 'rgba(0,0,0,0.7)' }}>
        {icon.view}
        <p style={t(12, 700, C.text, { lineHeight: '17.4px', letterSpacing: '-0.04em' })}>{REPLAY.viewers}</p>
      </div>

      <div data-figma="고민" data-node="2322:12288" style={{ position: 'absolute', left: 24, top: 321, width: 342, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={t(21, 700, C.text, { lineHeight: '28.4px', height: 56 })}>{copy.title}</p>
        <div data-figma="대화 중인 의자" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div data-figma="Header" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 18 }}>
            {icon.wave}
            <p style={t(14, 700, C.text, { lineHeight: '17.5px' })}>{REPLAY.seatsLabel}</p>
          </div>
          <div data-figma="Seats" style={{ display: 'flex', gap: 14 }}>
            {REPLAY.seats.map((s) => (
              <div key={s.name} data-figma={'Seat / ' + s.name} style={{ width: 58, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div data-figma="avatar" style={{ position: 'relative', width: 54, height: 54 }}>
                  {/* 말하는 자리의 하늘색 테두리(안쪽 2)는 그림 안에 들어 있다. 세 자리 모두 54 칸 그대로다. */}
                  <img alt="" draggable={false} src={s.img} style={{ position: 'absolute', left: 0, top: 0, width: 54, height: 54, display: 'block' }} />
                </div>
                <p style={t(11, 500, s.on ? C.text : C.sub, { lineHeight: '13.728px', width: 58, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div data-figma="Rectangle" data-node="2322:12313" style={{ position: 'absolute', left: 0, top: 519, width: 92, height: 1, background: C.card }} />
      <div data-figma="Rectangle" data-node="2322:12314" style={{ position: 'absolute', left: 298, top: 519, width: 92, height: 1, background: C.card }} />
      <p data-figma="댓글 안내" data-node="2322:12357" style={t(11, 400, C.faint, { position: 'absolute', left: 136, top: 512, lineHeight: '16px' })}>{REPLAY.note}</p>

      <div data-figma="댓글 (라이브 채팅)" data-node="2322:12315" style={{ position: 'absolute', left: 24, top: 540, width: 342, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        {copy.comments.map((c) => (
          <div key={c.name} data-figma={'댓글 ' + c.name} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
            <p style={t(11, 500, C.faint, { lineHeight: '15.4px', letterSpacing: '-0.04em', height: 15 })}>{c.name}</p>
            <div data-figma="bubble" style={{ display: 'flex', alignItems: 'center', height: 32, boxSizing: 'border-box', padding: '7px 12px', borderRadius: 14, background: C.card }}>
              <p style={t(13, 500, C.text, { lineHeight: '18.2px', letterSpacing: '-0.04em' })}>{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div data-figma="재생 바" data-node="2322:12358" style={{ position: 'absolute', left: 24, top: 716, width: BAR_W, height: 14 }}>
        <div data-figma="track" style={{ position: 'absolute', left: 0, top: 5, width: BAR_W, height: 4, borderRadius: 2, background: C.chip, overflow: 'hidden' }}>
          <div ref={barRef} data-figma="progress" style={{ position: 'absolute', left: 0, top: 0, width: BAR_W, height: 4, borderRadius: 2, background: C.brand, willChange: 'transform', transform: 'translateX(' + (REPLAY.start / REPLAY.total - 1) * BAR_W + 'px)' }} />
        </div>
        <div ref={thumbRef} data-figma="thumb" style={{ position: 'absolute', left: 0, top: 0, width: 14, height: 14, willChange: 'transform', transform: 'translateX(' + (REPLAY.start / REPLAY.total * BAR_W - 7) + 'px)' }}>
          <div ref={knobRef} style={{ width: 14, height: 14, borderRadius: 7, background: C.text, transform: 'scale(1)' }} />
        </div>
        {/* 끌기를 받는 칸: 바 폭 그대로, 위아래로 8씩 넓혀 높이 30(손잡이 위에 덮여 손잡이를 눌러도 같다). */}
        <div ref={hitRef} data-figma="재생 바 끌기 칸" role="slider" aria-label="재생 위치" aria-valuemin={0} aria-valuemax={REPLAY.total} aria-valuenow={sec} tabIndex={-1}
          onPointerDown={scrubDown} onPointerMove={scrubMove} onPointerUp={scrubUp} onPointerCancel={scrubUp} onLostPointerCapture={scrubUp} onClick={(e) => e.stopPropagation()}
          style={{ position: 'absolute', left: 0, top: -8, width: BAR_W, height: 30, cursor: 'pointer', touchAction: 'none' }} />
      </div>

      <div data-figma="플레이어 컨트롤" data-node="2322:12362" style={{ position: 'absolute', left: 24, top: 754, width: 342, height: 66, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px 8px 20px', borderRadius: 32, background: C.card }}>
        <div data-figma="재생 시간" style={{ width: 84, height: 32, display: 'flex', alignItems: 'center' }}>
          <p aria-live="off" style={t(12, 500, C.sub, { lineHeight: '17px'})}><span style={{ fontWeight: 700, color: C.text }}>{mmss(sec)}</span>{' / ' + mmss(REPLAY.total)}</p>
        </div>
        <div data-figma="controls" style={{ display: 'flex', alignItems: 'center', gap: 12, height: 48 }}>
          <Btn label="10초 뒤로" figma="10초 뒤로" onPress={() => seek(-10)} style={{ position: 'relative', width: 32, height: 32 }}>
            <div style={{ position: 'absolute', left: 2, top: 2 }}>{icon.back10}</div>
            <p style={t(8, 700, C.text, { position: 'absolute', left: 11, top: 12, lineHeight: '10px' })}>10</p>
          </Btn>
          <Btn label={playing ? '일시정지' : '재생'} figma={playing ? 'btn_일시정지' : 'btn_재생'} onPress={toggle} style={{ position: 'relative', width: 48, height: 48, borderRadius: 24 }}>
            {/* 두 아이콘을 겹쳐 두고 보이는 쪽만 opacity 1, scale 1. 숨는 쪽은 opacity 0, scale 0.9. */}
            <div data-figma="btn_일시정지 아이콘" style={{ position: 'absolute', left: 0, top: 0, transition: ICON_T, opacity: playing ? 1 : 0, transform: playing ? 'scale(1)' : 'scale(0.9)' }}>{icon.pause}</div>
            <div data-figma="btn_재생 아이콘" style={{ position: 'absolute', left: 0, top: 0, transition: ICON_T, opacity: playing ? 0 : 1, transform: playing ? 'scale(0.9)' : 'scale(1)' }}>{icon.play}</div>
          </Btn>
          <Btn label="10초 앞으로" figma="10초 앞으로" onPress={() => seek(10)} style={{ position: 'relative', width: 32, height: 32 }}>
            <div style={{ position: 'absolute', left: 2, top: 2 }}>{icon.fwd10}</div>
            <p style={t(8, 700, C.text, { position: 'absolute', left: 11, top: 12, lineHeight: '10px' })}>10</p>
          </Btn>
        </div>
        <div data-figma="배속" style={{ width: 84, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Btn label="재생 빠르기" figma="배속 칩" onPress={cycleRate} style={{ height: 27, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '5px 10px', borderRadius: 999, background: C.chip }}>
            <p style={t(12, 700, C.text, { lineHeight: '17px' })}>{REPLAY.rates[rateI].toFixed(1) + 'x'}</p>
          </Btn>
        </div>
      </div>
    </div>
  );
}
