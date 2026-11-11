// 드르륵 온보딩. 팀 피그마 "함께 드르륵 1~5"(섹션 1829:11173)와 "혼자 드르륵 5, 6"(1647:22976, 1647:23028)의 카드 자리와 글자 값을 그대로 옮겼다(390 x 844).
// 위쪽 Visual(326 x 220)은 피그마 Visual 트리의 부품(흰 패널, 알약, 아바타, 스켈레톤, 칩 등)을 onboarding/visuals.jsx에서 하나씩 코드로 다시 그린다.
// 온보딩은 방에 처음 들어갔을 때 그 방 화면 위에 60% 어둡게 겹쳐 뜬다(함께 드르륵은 29번 방, 혼자 드르륵은 46번 방).
// 닫기, 건너뛰기, 시작하기를 누르면 온보딩만 사라지고 방이 그대로 이어진다. 한 번 본 온보딩은 이 창에서 다시 뜨지 않는다.
import React, { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';
import { VIS_TOGETHER, VIS_SOLO } from './onboarding/visuals.jsx';
import { an, noop } from './onboarding/parts.jsx';
import './onboarding/ob.css';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const STD = 'cubic-bezier(0.2, 0, 0, 1)';
const BASE = (import.meta.env.BASE_URL || '/') + 'assets/onboarding/';

export const TOGETHER = [
  { img: 'ob-1.png', title: '고민을 적으면\n비슷한 사람들과 매칭돼요', sub: '대화방에서 사람들이 내 고민을 들어줘요' },
  { img: 'ob-2.png', title: '말하기 부담되면\n이모지로 반응해요', sub: '+ 버튼을 눌러 이모지를 날려요' },
  { img: 'ob-3.png', title: '주전부리를 던지면\n가운데 테이블에 올라가요', sub: '오른쪽 퀵슬롯에서 주전부리를 눌러 던져요' },
  { img: 'ob-4.png', title: '대화는 20분 뒤\n저장되지 않고 사라져요', sub: '해 뜨기 타이머가 끝나면 대화방이 종료돼요' },
  { img: 'ob-5.png', title: '대화가 끝나면\n리포트가 도착해요', sub: '공감과 추천을 받으면 엉따 온도가 올라가요' },
];
export const SOLO = [
  { img: 'solo-1.png', title: '매칭될 사람이 없으면\nAI와 먼저 대화해요', sub: '기다리지 않고 바로 고민을 털어놓아요' },
  { img: 'solo-2.png', title: '대화 중에 사람이 매칭되면\n함께 대화방으로 옮겨가요', sub: 'AI와 대화하는 동안에도 계속 사람을 찾아요' },
];

const CSS = `
@keyframes obIn{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
@keyframes obDim{from{opacity:0}to{opacity:1}}
.ob-in{animation:obIn 360ms ${EASE} both}
.ob-dim{animation:obDim 240ms cubic-bezier(.2,0,0,1) both}
.ob-out{opacity:0;transition:opacity 200ms cubic-bezier(.3,0,1,1)}
.ob-btn{border:0;background:none;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT};transition:transform 120ms ${STD},opacity 120ms ${STD}}
.ob-btn:active{transform:scale(.97);opacity:.85;transition-duration:90ms}
.ob-btn:focus-visible{outline:2px solid #36D2FF;outline-offset:2px;border-radius:8px}
`;

// 제목과 부제(피그마 글 프레임: 제목 상자 높이 44, 간격 8, 부제 76). 제목은 줄마다, 줄 안은 어절마다 나눠 아래에서 4px 올라오게 한다(어절 45ms, 줄 90ms 시차). 부제는 제목이 끝난 뒤 한 덩이로 나타난다.
function PageText({ page, mode, dir, delay }) {
  if (mode === 'out') {
    return (
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, ...an('obTextOut', 0, 120, STD) }}>
        <TextBody page={page} />
      </div>
    );
  }
  let n = 0;
  let end = 0;
  const lines = page.title.split('\n').map((line, l) => (
    <div key={l} style={{ whiteSpace: 'nowrap' }}>
      {line.split(' ').map((w, k) => {
        const t = delay + n * 45 + l * 90;
        n += 1;
        end = t + 260;
        return (
          <React.Fragment key={k}>
            {k > 0 ? ' ' : null}
            <span style={{ display: 'inline-block', ...an('obWord', t, 260, EASE) }}>{w}</span>
          </React.Fragment>
        );
      })}
    </div>
  ));
  return (
    <div aria-live="polite" style={{ position: 'absolute', inset: 0, '--tx': dir * 8 + 'px', ...an('obTextIn', delay, 300, EASE) }}>
      <TextBody page={page} title={lines} subStyle={an('obWord', end - 60, 260, EASE)} />
    </div>
  );
}
function TextBody({ page, title, subStyle }) {
  return (
    <div style={{ height: 91, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, boxSizing: 'border-box' }}>
      <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, lineHeight: '22px', letterSpacing: '-0.04em', color: '#121415', textAlign: 'center', whiteSpace: 'pre', wordBreak: 'keep-all' }}>{title || page.title}</div>
      <div style={{ fontFamily: FONT, marginTop: 8, fontSize: 12, fontWeight: 400, lineHeight: '15px', letterSpacing: '-0.04em', color: '#6E767C', textAlign: 'center', whiteSpace: 'pre', wordBreak: 'keep-all', ...subStyle }}>{page.sub}</div>
    </div>
  );
}

// 카드와 닫기 버튼(피그마 Onboarding Card 32, 213 / close 330, 173)
// 장 번호(cur)만 기준으로 화면을 그린다. 넘길 때 지금 장은 prev로 옮겨 같은 부품 그대로 밀려 나가고, 320ms 뒤 지운다. 연타하면 마지막 장만 남는다.
function Deck({ pages, visuals, onFinish }) {
  const reduced = useReducedMotion();
  const [st, setSt] = useState({ cur: { idx: 0, id: 0 }, prev: null, dir: 1 });
  const [drag, setDrag] = useState(null);
  const [xOut, setXOut] = useState(false);
  const i = st.cur.idx;
  const last = i === pages.length - 1;
  const go = useCallback((to) => setSt((s) => {
    if (to < 0 || to >= pages.length || to === s.cur.idx) return s;
    return { cur: { idx: to, id: s.cur.id + 1 }, prev: s.cur, dir: to > s.cur.idx ? 1 : -1 };
  }), [pages.length]);
  useEffect(() => {
    if (!st.prev) return undefined;
    const id = st.cur.id;
    const tm = window.setTimeout(() => setSt((s) => (s.cur.id === id ? { ...s, prev: null } : s)), 320);
    return () => window.clearTimeout(tm);
  }, [st.cur.id, st.prev]);
  const close = useCallback(() => { setXOut(true); onFinish(); }, [onFinish]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(st.cur.idx + 1);
      else if (e.key === 'ArrowLeft') go(st.cur.idx - 1);
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, close, st.cur.idx]);
  const next = () => (last ? onFinish() : go(i + 1));
  const onUp = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x0;
    setDrag(null);
    if (dx < -40 && !last) go(i + 1);
    if (dx > 40 && i > 0) go(i - 1);
  };
  const dx = drag ? drag.dx : 0;
  const layers = [];
  if (st.prev && !reduced) layers.push({ ...st.prev, out: true });
  layers.push({ ...st.cur, out: false });
  const moved = st.cur.id > 0;
  return (
    <div className="ob-root" style={{ position: 'absolute', inset: 0 }}>
      <style>{CSS}</style>
      <button className="ob-btn" aria-label="닫기" onClick={close} onTouchStart={noop} style={{ position: 'absolute', left: 322, top: 165, width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: xOut ? 'rotate(90deg)' : 'none', opacity: xOut ? 0 : 1, transition: `transform 200ms ${STD}, opacity 200ms ${STD}` }}><path d="M1 1l12 12M13 1L1 13" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <div
        className="ob-in"
        role="group"
        aria-roledescription="온보딩"
        onPointerDown={(e) => setDrag({ x0: e.clientX, dx: 0 })}
        onPointerMove={(e) => { if (drag) setDrag({ x0: drag.x0, dx: e.clientX - drag.x0 }); }}
        onPointerUp={onUp}
        onPointerCancel={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
        style={{ position: 'absolute', left: 32, top: 213, width: 326, height: 379, borderRadius: 24, overflow: 'hidden', background: '#F8F8F8', touchAction: 'pan-y' }}
      >
        <div aria-hidden="true" style={{ position: 'relative', width: 326, height: 220, overflow: 'hidden', background: '#36D2FF' }}>
          {layers.map((L) => {
            const V = visuals[L.idx];
            const enter = !L.out && moved ? an(st.dir > 0 ? 'obInR' : 'obInL', 0, 320, EASE) : null;
            const leave = L.out ? an(st.dir > 0 ? 'obOutL' : 'obOutR', 0, 250, STD) : null;
            return (
              <div key={'v' + L.id} data-figma="Visual" style={{ position: 'absolute', inset: 0, pointerEvents: L.out ? 'none' : 'auto', ...(enter || leave) }}>
                <div style={{ position: 'absolute', inset: 0, transform: L.out || !dx ? 'none' : `translateX(${dx * 0.3}px)`, transition: drag ? 'none' : `transform 240ms ${STD}` }}>
                  <V />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ position: 'relative', height: 91 }}>
          {layers.map((L) => <PageText key={'t' + L.id} page={pages[L.idx]} mode={L.out ? 'out' : 'in'} dir={st.dir} delay={moved ? 100 : 160} />)}
        </div>
        <div style={{ position: 'relative', height: 68 }}>
          <button className="ob-btn" onClick={onFinish} onTouchStart={noop} style={{ position: 'absolute', left: 4, top: 20, height: 44, padding: '0 20px', fontSize: 12, fontWeight: 500, letterSpacing: '-0.04em', color: '#6E767C', opacity: last ? 0 : 1, pointerEvents: last ? 'none' : 'auto', transition: `opacity 200ms ${EASE}` }}>건너뛰기</button>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 39, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {pages.map((_, k) => (
              <span key={k} style={{ width: k === i ? 16 : 6, height: 6, borderRadius: 3, background: k === i ? '#36D2FF' : 'rgba(154,161,166,.4)', transition: `width 300ms ${EASE}, background-color 300ms ${EASE}` }} />
            ))}
          </div>
          <button className="ob-btn" onClick={next} onTouchStart={noop} style={{ position: 'absolute', right: 4, top: 20, height: 44, padding: '0 26px', fontSize: 12, fontWeight: 700, letterSpacing: '-0.04em', color: '#36D2FF', overflow: 'hidden' }}>
            <span key={last ? 'start' : 'next'} style={{ display: 'inline-block', ...(moved ? an(last ? 'obLabelUp' : 'obLabelDown', 0, 220, EASE) : null) }}>{last ? '시작하기' : '다음'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 방 화면 위에 겹치는 온보딩. 29번(함께 드르륵 방)과 46번(혼자 드르륵 방)에서만 뜬다.
const GUIDE = { 29: { key: 'drrrk-ob-together', pages: TOGETHER, visuals: VIS_TOGETHER }, 46: { key: 'drrrk-ob-solo', pages: SOLO, visuals: VIS_SOLO } };
const seen = (k) => { try { return window.sessionStorage.getItem(k) === '1'; } catch (e) { return false; } };

export function RoomGuide({ n }) {
  const g = GUIDE[n];
  const [state, setState] = useState(() => (g && !seen(g.key) ? 'on' : 'off'));
  if (!g || state === 'off') return null;
  const finish = () => {
    try { window.sessionStorage.setItem(g.key, '1'); } catch (e) { /* 저장이 막힌 창에서는 이번만 닫는다 */ }
    setState('closing');
    window.setTimeout(() => setState('off'), 220);
  };
  return (
    <div data-figma="방 온보딩" className={state === 'closing' ? 'ob-out' : undefined} onClick={(e) => e.stopPropagation()}
      style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 90, fontFamily: FONT }}>
      <div className="ob-dim" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <Deck pages={g.pages} visuals={g.visuals} onFinish={finish} />
    </div>
  );
}

// 12번 화면(예전 시작점): 홈 배경 위 같은 카드. 이제 길은 없고, 주소로 열 때만 보인다.
export default function Onboarding() {
  const home = () => window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to: 24, t: 'fade' } }));
  return (
    <div data-figma="함께 드르륵 온보딩" style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', background: '#121415', fontFamily: FONT }}>
      <img alt="" src={BASE + 'ob-bg.webp'} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844 }} />
      <Deck pages={TOGETHER} visuals={VIS_TOGETHER} onFinish={home} />
    </div>
  );
}
