// 함께 드르륵 온보딩 5장. 팀 피그마 "함께 드르륵 1~5"(섹션 1829:11173)의 카드 자리와 글자 값을 그대로 옮겼다(390 x 844).
// 위쪽 그림(326 x 220)은 피그마 Visual 프레임을 2배로 내보낸 그림이고, 글자와 점, 버튼은 코드로 그린다.
// "다음"은 화면 이동 없이 카드 안에서 다음 장으로 넘어가고, 마지막 장 "시작하기"와 건너뛰기, 닫기는 홈으로 간다.
import React, { useState } from 'react';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const BASE = (import.meta.env.BASE_URL || '/') + 'assets/onboarding/';

const PAGES = [
  { title: '고민을 적으면\n비슷한 사람들과 매칭돼요', sub: '대화방에서 사람들이 내 고민을 들어줘요' },
  { title: '말하기 부담되면\n이모지로 반응해요', sub: '+ 버튼을 눌러 이모지를 날려요' },
  { title: '주전부리를 던지면\n가운데 테이블에 올라가요', sub: '오른쪽 퀵슬롯에서 주전부리를 눌러 던져요' },
  { title: '대화는 20분 뒤\n저장되지 않고 사라져요', sub: '해 뜨기 타이머가 끝나면 대화방이 종료돼요' },
  { title: '대화가 끝나면\n리포트가 도착해요', sub: '공감과 추천을 받으면 엉따 온도가 올라가요' },
];

const CSS = `
@keyframes obText{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.ob-text{animation:obText 260ms ${EASE} both}
.ob-btn{border:0;background:none;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT}}
.ob-btn:active{opacity:.6}
.ob-btn:focus-visible{outline:2px solid #36D2FF;outline-offset:2px;border-radius:8px}
`;

function home() {
  window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to: 24, t: 'fade' } }));
}

export default function Onboarding() {
  const [i, setI] = useState(0);
  const [x0, setX0] = useState(null);
  const last = i === PAGES.length - 1;
  const next = () => (last ? home() : setI(i + 1));
  const onUp = (e) => {
    if (x0 == null) return;
    const dx = e.clientX - x0;
    setX0(null);
    if (dx < -40 && !last) setI(i + 1);
    if (dx > 40 && i > 0) setI(i - 1);
  };
  return (
    <div data-figma="함께 드르륵 온보딩" style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', background: '#121415', fontFamily: FONT }}>
      <style>{CSS}</style>
      {PAGES.map((_, k) => <link key={k} rel="preload" as="image" href={BASE + 'ob-' + (k + 1) + '.png'} />)}
      <img alt="" src={BASE + 'ob-bg.png'} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844 }} />
      <button className="ob-btn" aria-label="닫기" onClick={home} style={{ position: 'absolute', left: 322, top: 165, width: 44, height: 44, display: 'grid', placeItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <div
        onPointerDown={(e) => setX0(e.clientX)}
        onPointerUp={onUp}
        onPointerLeave={() => setX0(null)}
        style={{ position: 'absolute', left: 32, top: 213, width: 326, height: 379, borderRadius: 24, overflow: 'hidden', background: '#F8F8F8', touchAction: 'pan-y' }}
      >
        <div style={{ position: 'relative', width: 326, height: 220, overflow: 'hidden', background: '#36D2FF' }}>
          {PAGES.map((_, k) => (
            <img
              key={k}
              alt=""
              draggable={false}
              src={BASE + 'ob-' + (k + 1) + '.png'}
              style={{
                position: 'absolute', left: 0, top: 0, width: 326, height: 220,
                opacity: k === i ? 1 : 0,
                transform: 'translateX(' + (k === i ? 0 : k < i ? -24 : 24) + 'px)',
                transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}`,
              }}
            />
          ))}
        </div>
        <div key={i} className="ob-text" style={{ height: 91, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 24, boxSizing: 'border-box' }}>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '22.4px', letterSpacing: '-0.64px', color: '#121415', textAlign: 'center', whiteSpace: 'pre' }}>{PAGES[i].title}</div>
          <div style={{ marginTop: 8, fontSize: 12, fontWeight: 400, lineHeight: '15px', letterSpacing: '-0.48px', color: '#6E767C', textAlign: 'center', whiteSpace: 'pre' }}>{PAGES[i].sub}</div>
        </div>
        <div style={{ position: 'relative', height: 68 }}>
          <button className="ob-btn" onClick={home} style={{ position: 'absolute', left: 4, top: 20, height: 44, padding: '0 20px', fontSize: 12, fontWeight: 500, letterSpacing: '-0.48px', color: '#6E767C', opacity: last ? 0 : 1, pointerEvents: last ? 'none' : 'auto', transition: `opacity 200ms ${EASE}` }}>건너뛰기</button>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 39, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {PAGES.map((_, k) => (
              <span key={k} style={{ width: k === i ? 16 : 6, height: 6, borderRadius: 3, background: k === i ? '#36D2FF' : 'rgba(154,161,166,.4)', transition: `width 300ms ${EASE}, background-color 300ms ${EASE}` }} />
            ))}
          </div>
          <button className="ob-btn" onClick={next} style={{ position: 'absolute', right: 4, top: 20, height: 44, padding: '0 26px', fontSize: 12, fontWeight: 700, letterSpacing: '-0.48px', color: '#36D2FF' }}>{last ? '시작하기' : '다음'}</button>
        </div>
      </div>
    </div>
  );
}
