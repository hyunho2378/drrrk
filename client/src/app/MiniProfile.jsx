// 미니 프로필(5, 6): 팀 피그마 "DRRRK · 미니 프로필 개선안 (캐릭터 카드)"(1972:22875) 값 그대로. iOS MiniProfileView와 같다.
// 뒤의 방 화면은 생성 화면(1952:15659)을 그대로 쓰고, 옛 바텀시트만 숨긴 뒤 새 캐릭터 카드를 얹는다.
// 시트 y566 높이 278, #121415, 위 모서리 24. 스툴 132가 시트 위로 62 걸친다. 점 세 개를 누르면 신고하기, 차단하기 메뉴가 뜬다.
import React, { useState } from 'react';
import { ChatMiniProfile as Gen } from '../figma/screens/ChatMiniProfile.jsx';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const BASE = import.meta.env.BASE_URL || '/';
const STOOL = BASE + 'assets/chairs/v2/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.png';
const SNACKS = [
  ['오징어땅콩', BASE + 'assets/my2/s-peanut.png'],
  ['새우깡', BASE + 'assets/my2/s-shrimp.png'],
  ['드르라', BASE + 'assets/my2/s-drrra.png'],
];

const CSS = `
[data-mini] [data-figma="바텀시트 · 미니 프로필"]{visibility:hidden!important}
@keyframes mpUp{from{transform:translateY(300px)}to{transform:none}}
@keyframes mpIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes mpWave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.5)}}
.mp-sheet{animation:mpUp 320ms ${EASE} both}
.mp-in{animation:mpIn 240ms ${EASE} both}
.mp-btn{border:0;padding:0;margin:0;background:none;cursor:pointer;font-family:${FONT};-webkit-tap-highlight-color:transparent;outline:none}
.mp-btn:active{transform:scale(.97)}
.mp-btn:focus-visible{outline:2px solid #F8F8F8;outline-offset:2px}
.mp-wave span{display:block;width:3px;border-radius:2px;background:#2EE59D;animation:mpWave 1.1s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.mp-sheet,.mp-in,.mp-wave span{animation:none}}
`;

function go(to, t) {
  window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to, t } }));
}

function Wave() {
  const hs = [5, 10, 14, 10, 5];
  return (
    <span className="mp-wave" style={{ display: 'flex', alignItems: 'center', gap: 2, width: 23, height: 14 }}>
      {hs.map((h, i) => <span key={i} style={{ height: h, animationDelay: -i * 0.13 + 's' }} />)}
    </span>
  );
}

export function MiniProfileScreen({ startRecommended = false, Base = Gen }) {
  const [rec, setRec] = useState(startRecommended);
  const [menu, setMenu] = useState(false);
  return (
    <div data-mini="" style={{ position: 'relative', width: 390, height: 844, fontFamily: FONT }}>
      <style>{CSS}</style>
      <Base />
      {rec && (
        <div className="mp-in" style={{ position: 'absolute', left: 0, right: 0, top: 566 - 62 - 12 - 54, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 6 }}>
          <div style={{ background: '#30363A', color: '#F8F8F8', fontSize: 12, fontWeight: 500, letterSpacing: '-0.48px', lineHeight: '17px', textAlign: 'center', padding: '10px 16px', borderRadius: 12, whiteSpace: 'pre' }}>
            {'딱딱한 나무 스툴12님의 엉따 지수가 0.1°\n올라갔어요'}
          </div>
        </div>
      )}
      <div className="mp-sheet" style={{ position: 'absolute', left: 0, top: 566, width: 390, height: 278, background: '#121415', borderRadius: '24px 24px 0 0', zIndex: 5 }}>
        <img alt="" draggable={false} src={STOOL} style={{ position: 'absolute', left: 129, top: -62, width: 132, height: 132, objectFit: 'contain', filter: 'drop-shadow(0 10px 9px rgba(0,0,0,.45))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 74, height: 27, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.38px', lineHeight: '27px', color: '#F8F8F8', whiteSpace: 'nowrap' }}>딱딱한 나무 스툴12</span>
          <Wave />
        </div>
        <div style={{ position: 'absolute', left: 24, top: 121, width: 51 }}>
          <div style={{ fontSize: 13, fontWeight: 500, lineHeight: '18px', color: '#9AA1A6', whiteSpace: 'nowrap' }}>엉따 지수</div>
          <div style={{ marginTop: 2, fontSize: 22, fontWeight: 700, letterSpacing: '-0.44px', lineHeight: '31px', color: '#FF9A4D', whiteSpace: 'nowrap' }}>41.5°</div>
        </div>
        <div aria-label="대표 업적 오징어땅콩, 새우깡, 드르라" style={{ position: 'absolute', left: 218, top: 125, display: 'flex', gap: 8 }}>
          {SNACKS.map(([n, src]) => (
            <div key={n} style={{ width: 44, height: 44, borderRadius: 12, background: '#1F2226', display: 'grid', placeItems: 'center' }}>
              <img alt="" draggable={false} src={src} style={{ width: 34, height: 34, objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        <button className="mp-btn" onClick={() => setRec((v) => !v)} style={{ position: 'absolute', left: 24, top: 192, width: 342, height: 46, borderRadius: 28, background: rec ? '#06303C' : '#36D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: `background-color 200ms ${EASE}` }}>
          <span style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px', color: rec ? '#36D2FF' : '#000' }}>{rec ? '추천했어요' : '추천하기'}</span>
          {!rec && <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#0D4054' }}>엉따 +0.1°</span>}
        </button>
        <button className="mp-btn" aria-label="더보기" onClick={() => setMenu((v) => !v)} style={{ position: 'absolute', left: 335, top: 6, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ width: 4, height: 4, borderRadius: 2, background: '#F8F8F8' }} />)}
        </button>
        {menu && (
          <div className="mp-in" style={{ position: 'absolute', right: 11, top: 50, padding: '4px 0', borderRadius: 12, background: '#222628', boxShadow: '0 6px 12px rgba(0,0,0,.4)', zIndex: 7 }}>
            {[['신고하기', 7, 'push'], ['차단하기', 8, 'fade']].map(([t, to, tr]) => (
              <button key={t} className="mp-btn" onClick={() => go(to, tr)} style={{ display: 'block', width: 152, height: 40, padding: '0 16px', textAlign: 'left', fontSize: 14, fontWeight: 500, letterSpacing: '-0.28px', color: '#F8F8F8' }}>{t}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MiniProfile() {
  return <MiniProfileScreen />;
}
