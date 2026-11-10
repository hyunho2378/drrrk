// 스킨 획득 팝업(19): 팀 피그마 "MY · 리디자인"(1972:22149) 값 그대로. iOS MySkinModal과 같다.
// 새 마이(MyHome) 위에 짙은 덮개(#05080A 88%)를 깔고, 빛과 빛줄기, 소파 230, 반짝이 6개, 새로운 디자인 칩, 이름,
// 36°~40° 막대(39°까지 차오름), 안내 글, 지금 앉아보기, 나중에 할게요 순서로 놓는다.
// 11. 10. 메모 "마이에서 엉따 온도 올라가서 의자 획득하는 장면 나오게": 마이 엉따 막대가 39°를 넘는 순간 이 화면이 이어서 뜬다(MyHome useChairGet).
// 피그마 의자 획득 장면 2100:28164와 같은 값이다. 한 번 뜨면 같은 세션에서는 마이에 다시 들어와도 뜨지 않는다.
import React, { useEffect, useState } from 'react';
import MyHome from './MyHome.jsx';
import { big, openStudio } from './chairs.js';
import { markChairGetSeen } from './my.js';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const BASE = (import.meta.env.BASE_URL || '/') + 'assets/skin2/';
const ORANGE = '#FF9959';
const SPARKLES = [[70, 176, 22], [300, 190, 16], [320, 360, 24], [56, 370, 14], [250, 140, 12], [120, 420, 10]];

const CSS = `
.sk-btn{border:0;padding:0;margin:0;background:none;cursor:pointer;font-family:${FONT};-webkit-tap-highlight-color:transparent;outline:none;transition:transform 120ms cubic-bezier(.2,0,0,1)}
.sk-btn:active{transform:scale(.97)}
.sk-btn:focus-visible{outline:2px solid #F8F8F8;outline-offset:2px}
`;

function go(to, t, act) {
  window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to, t, act } }));
}

export default function SkinPopup() {
  const [shown, setShown] = useState(false);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    markChairGetSeen();
    const a = requestAnimationFrame(() => setShown(true));
    const b = window.setTimeout(() => setFill(1), 250);
    return () => { cancelAnimationFrame(a); window.clearTimeout(b); };
  }, []);
  // 화면 이동이 의자 꾸미기를 열 때 act가 'fresh'여야 지금 의자 대신 새로 얻은 푹신한 가죽 소파가 골라진 채로 열린다(live.js resolveTo).
  const sit = () => { openStudio(true); go(20, 'push', 'fresh'); };
  const later = () => go(36, 'fade');
  const fade = (ms, d = 0) => ({ transition: `opacity ${ms}ms ${EASE} ${d}ms, transform ${ms}ms ${EASE} ${d}ms` });
  return (
    <div style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', fontFamily: FONT }}>
      <style>{CSS}</style>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}><MyHome still /></div>
      <div onClick={later} style={{ position: 'absolute', inset: 0, background: 'rgba(5,8,10,.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', opacity: shown ? 1 : 0, ...fade(350) }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: shown ? 1 : 0, ...fade(350) }}>
        <img alt="" src={BASE + 'D2-skin-glow.webp'} style={{ position: 'absolute', left: 5, top: 101, width: 380, height: 380 }} />
        <img alt="" src={BASE + 'D2-skin-rays.png'} style={{ position: 'absolute', left: 0, top: 100, width: 390, height: 390 }} />
        <img alt="" src={big(2, 0)} style={{ position: 'absolute', left: 80, top: 180, width: 230, height: 230, objectFit: 'contain', filter: 'drop-shadow(0 16px 10px rgba(0,0,0,.5))', transform: shown ? 'scale(1)' : 'scale(.85)', ...fade(350) }} />
        {SPARKLES.map(([x, y, s], i) => (
          <img key={i} alt="" src={BASE + 'D2-sparkle-' + (i + 1) + '.svg'} style={{ position: 'absolute', left: x, top: y, width: s, height: s }} />
        ))}
        <div style={{ position: 'absolute', left: 0, top: 450, width: 390, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 92, height: 28, borderRadius: 14, background: 'rgba(0,0,0,.45)', boxShadow: 'inset 0 0 0 1px rgba(54,210,255,.7)', color: '#36D2FF', fontSize: 12, fontWeight: 700, lineHeight: '28px', textAlign: 'center' }}>새로운 디자인</span>
          <span style={{ height: 38, fontSize: 28, fontWeight: 700, lineHeight: '38px', color: '#F8F8F8', whiteSpace: 'nowrap' }}>푹신한 가죽 소파</span>
        </div>
        <div style={{ position: 'absolute', left: 75, top: 542, width: 240, height: 50 }}>
          <span style={{ position: 'absolute', left: 169.5, top: 0, fontSize: 13, fontWeight: 700, lineHeight: '18px', color: ORANGE, opacity: fill, ...fade(900) }}>39°</span>
          <span style={{ position: 'absolute', left: 0, top: 24, width: 240, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.12)' }} />
          <span style={{ position: 'absolute', left: 0, top: 24, width: 180, height: 6, borderRadius: 3, background: `linear-gradient(90deg,#36D2FF,${ORANGE})`, transformOrigin: 'left center', transform: 'scaleX(' + fill + ')', ...fade(900) }} />
          <span style={{ position: 'absolute', left: 173, top: 20, width: 14, height: 14, borderRadius: 7, boxSizing: 'border-box', background: ORANGE, border: '3px solid #0A0D0F', boxShadow: `0 0 10px ${ORANGE}cc`, opacity: fill, ...fade(900) }} />
          <span style={{ position: 'absolute', left: 0, top: 34, fontSize: 11, fontWeight: 500, lineHeight: '15px', color: '#9AA1A6' }}>36°</span>
          <span style={{ position: 'absolute', right: 0, top: 34, fontSize: 11, fontWeight: 500, lineHeight: '15px', color: '#9AA1A6' }}>40°</span>
        </div>
        <div style={{ position: 'absolute', left: 0, top: 600, width: 390, textAlign: 'center', fontSize: 13, fontWeight: 500, lineHeight: '18px', color: '#9AA1A6' }}>엉따 온도 39°에 도달해서 열렸어요</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 668, width: 390, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: shown ? 1 : 0, ...fade(350) }}>
        <button className="sk-btn" onClick={sit} style={{ width: 278, height: 46, borderRadius: 28, background: '#36D2FF', color: '#000', fontSize: 16, fontWeight: 700, letterSpacing: '-0.64px' }}>지금 앉아보기</button>
        <button className="sk-btn" onClick={later} style={{ height: 34, padding: '0 20px', marginTop: -8, color: '#6E767C', fontSize: 13, fontWeight: 500, letterSpacing: '-0.52px' }}>나중에 할게요</button>
      </div>
    </div>
  );
}
