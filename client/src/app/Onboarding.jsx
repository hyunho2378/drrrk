// 드르륵 온보딩. 팀 피그마 "함께 드르륵 1~5"(섹션 1829:11173)와 "혼자 드르륵 5, 6"(1647:22976, 1647:23028)의 카드 자리와 글자 값을 그대로 옮겼다(390 x 844).
// 위쪽 그림(326 x 220)은 피그마 Visual 프레임을 2배로 내보낸 그림이고, 글자와 점, 버튼은 코드로 그린다.
// 온보딩은 방에 처음 들어갔을 때 그 방 화면 위에 60% 어둡게 겹쳐 뜬다(함께 드르륵은 29번 방, 혼자 드르륵은 46번 방).
// 닫기, 건너뛰기, 시작하기를 누르면 온보딩만 사라지고 방이 그대로 이어진다. 한 번 본 온보딩은 이 창에서 다시 뜨지 않는다.
import React, { useState } from 'react';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
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
@keyframes obText{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
@keyframes obIn{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
@keyframes obDim{from{opacity:0}to{opacity:1}}
.ob-text{animation:obText 260ms ${EASE} both}
.ob-in{animation:obIn 360ms ${EASE} both}
.ob-dim{animation:obDim 240ms cubic-bezier(.2,0,0,1) both}
.ob-out{opacity:0;transition:opacity 200ms cubic-bezier(.3,0,1,1)}
.ob-btn{border:0;background:none;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT}}
.ob-btn:active{opacity:.6}
.ob-btn:focus-visible{outline:2px solid #36D2FF;outline-offset:2px;border-radius:8px}
`;

// 카드와 닫기 버튼(피그마 Onboarding Card 32, 213 / close 330, 173)
function Deck({ pages, onFinish }) {
  const [i, setI] = useState(0);
  const [x0, setX0] = useState(null);
  const last = i === pages.length - 1;
  const next = () => (last ? onFinish() : setI(i + 1));
  const onUp = (e) => {
    if (x0 == null) return;
    const dx = e.clientX - x0;
    setX0(null);
    if (dx < -40 && !last) setI(i + 1);
    if (dx > 40 && i > 0) setI(i - 1);
  };
  return (
    <>
      <style>{CSS}</style>
      {pages.map((p) => <link key={p.img} rel="preload" as="image" href={BASE + p.img} />)}
      <button className="ob-btn" aria-label="닫기" onClick={onFinish} style={{ position: 'absolute', left: 322, top: 165, width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <div
        className="ob-in"
        onPointerDown={(e) => setX0(e.clientX)}
        onPointerUp={onUp}
        onPointerLeave={() => setX0(null)}
        style={{ position: 'absolute', left: 32, top: 213, width: 326, height: 379, borderRadius: 24, overflow: 'hidden', background: '#F8F8F8', touchAction: 'pan-y' }}
      >
        <div style={{ position: 'relative', width: 326, height: 220, overflow: 'hidden', background: '#36D2FF' }}>
          {pages.map((p, k) => (
            <img key={k} alt="" draggable={false} src={BASE + p.img}
              style={{ position: 'absolute', left: 0, top: 0, width: 326, height: 220, opacity: k === i ? 1 : 0, transform: 'translateX(' + (k === i ? 0 : k < i ? -24 : 24) + 'px)', transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}` }} />
          ))}
        </div>
        <div key={i} className="ob-text" style={{ height: 91, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, boxSizing: 'border-box' }}>
          <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, lineHeight: '22.4px', letterSpacing: '-0.64px', color: '#121415', textAlign: 'center', whiteSpace: 'pre' }}>{pages[i].title}</div>
          <div style={{ fontFamily: FONT, marginTop: 8, fontSize: 12, fontWeight: 400, lineHeight: '15px', letterSpacing: '-0.48px', color: '#6E767C', textAlign: 'center', whiteSpace: 'pre' }}>{pages[i].sub}</div>
        </div>
        <div style={{ position: 'relative', height: 68 }}>
          <button className="ob-btn" onClick={onFinish} style={{ position: 'absolute', left: 4, top: 20, height: 44, padding: '0 20px', fontSize: 12, fontWeight: 500, letterSpacing: '-0.48px', color: '#6E767C', opacity: last ? 0 : 1, pointerEvents: last ? 'none' : 'auto', transition: `opacity 200ms ${EASE}` }}>건너뛰기</button>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 39, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {pages.map((_, k) => (
              <span key={k} style={{ width: k === i ? 16 : 6, height: 6, borderRadius: 3, background: k === i ? '#36D2FF' : 'rgba(154,161,166,.4)', transition: `width 300ms ${EASE}, background-color 300ms ${EASE}` }} />
            ))}
          </div>
          <button className="ob-btn" onClick={next} style={{ position: 'absolute', right: 4, top: 20, height: 44, padding: '0 26px', fontSize: 12, fontWeight: 700, letterSpacing: '-0.48px', color: '#36D2FF' }}>{last ? '시작하기' : '다음'}</button>
        </div>
      </div>
    </>
  );
}

// 방 화면 위에 겹치는 온보딩. 29번(함께 드르륵 방)과 46번(혼자 드르륵 방)에서만 뜬다.
const GUIDE = { 29: { key: 'drrrk-ob-together', pages: TOGETHER }, 46: { key: 'drrrk-ob-solo', pages: SOLO } };
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
      <Deck pages={g.pages} onFinish={finish} />
    </div>
  );
}

// 12번 화면(예전 시작점): 홈 배경 위 같은 카드. 이제 길은 없고, 주소로 열 때만 보인다.
export default function Onboarding() {
  const home = () => window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to: 24, t: 'fade' } }));
  return (
    <div data-figma="함께 드르륵 온보딩" style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', background: '#121415', fontFamily: FONT }}>
      <img alt="" src={BASE + 'ob-bg.webp'} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844 }} />
      <Deck pages={TOGETHER} onFinish={home} />
    </div>
  );
}
