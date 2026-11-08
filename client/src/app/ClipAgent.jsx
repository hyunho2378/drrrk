// 드르륵 에이전트 버튼. 팀 피그마 네이버 클립 네 화면(리스트, 영상 보기, 댓글, 더보기 메뉴) 모두 같은 자리(344, 298, 60 x 60, 모서리 13)다.
// 화면이 보인 뒤 오른쪽에서 튀어나오고, 그다음에는 위아래로 천천히 떠다닌다(transform만 움직인다).
// 시트가 열려도 시트 위에 그대로 보이며, 누르면 드르륵 스플래시 뒤 홈으로 들어간다.
import React, { useEffect, useState } from 'react';
import { pic } from './ClipKit.jsx';

const CSS = `
@keyframes caPop{0%{opacity:0;transform:translateX(64px) scale(.7)}55%{opacity:1;transform:translateX(-9px) scale(1.07)}78%{transform:translateX(3px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@keyframes caFloat{0%,100%{transform:translateY(6px)}50%{transform:translateY(-6px)}}
.ca-pop{animation:caPop 640ms cubic-bezier(.2,.9,.3,1) both}
.ca-float{animation:caFloat 3200ms cubic-bezier(.45,0,.55,1) infinite}
.ca-btn{border:0;padding:0;margin:0;background:none;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}
.ca-btn:active .ca-face{transform:scale(.94)}
.ca-btn:focus-visible{outline:2px solid #36D2FF;outline-offset:3px;border-radius:15px}
.ca-face{transition:transform 120ms cubic-bezier(.2,0,0,1)}
@media (prefers-reduced-motion:reduce){.ca-pop{animation-duration:1ms}.ca-float{animation:none}}
`;

function enter() {
  window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to: 25, t: 'enter', label: '드르륵 에이전트' } }));
}

export function ClipAgent({ delay = 900 }) {
  const [shown, setShown] = useState(false);
  const [floating, setFloating] = useState(false);
  useEffect(() => {
    const on = () => setShown(true);
    window.addEventListener('drrrk:clip-shown', on);
    const t = window.setTimeout(on, delay);
    return () => { window.removeEventListener('drrrk:clip-shown', on); window.clearTimeout(t); };
  }, [delay]);
  useEffect(() => {
    if (!shown) return undefined;
    const t = window.setTimeout(() => setFloating(true), 660);
    return () => window.clearTimeout(t);
  }, [shown]);
  return (
    <>
      <style>{CSS}</style>
      <div data-figma="드르륵 에이전트 버튼" className={shown ? 'ca-pop' : undefined} style={{ position: 'absolute', left: 344, top: 298, width: 60, height: 60, zIndex: 65, opacity: shown ? undefined : 0, pointerEvents: shown ? 'auto' : 'none' }}>
        <div className={floating ? 'ca-float' : undefined} style={{ width: 60, height: 60 }}>
          <button type="button" className="ca-btn" aria-label="드르륵 에이전트" onClick={(e) => { e.stopPropagation(); enter(); }} style={{ width: 60, height: 60, display: 'block' }}>
            <div className="ca-face" style={{ width: 60, height: 60, borderRadius: 13, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
              <img src={pic('agent')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
