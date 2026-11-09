// 온보딩 Visual 부품. 자리와 크기, 색은 팀 피그마 카드의 Visual 트리(326 x 220) 값을 그대로 옮겼다.
// 등장은 an(이름, 시작, 길이)으로 CSS 애니메이션을 건다. 움직임을 줄인 기기에서는 ob.css가 애니메이션을 끄고 최종 모습만 남긴다.
import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../useReducedMotion.js';

export const ED = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
export const ST = 'cubic-bezier(0.2, 0, 0, 1)';
export const FONT = "'SUIT', system-ui, sans-serif";
const ROOT = import.meta.env.BASE_URL || '/';
export const OB2 = ROOT + 'assets/onboarding2/';
export const IMG = ROOT + 'assets/images/';
export const SHADOW = '0 6px 16px rgba(0, 0, 0, 0.12)';
export const useRM = useReducedMotion;
export const noop = () => {};

export const an = (name, t = 0, d = 300, ease = ED) => ({ animation: `${name} ${d}ms ${ease} ${t}ms both` });
export const abs = (x, y, w, h) => ({ position: 'absolute', left: x, top: y, width: w, height: h });

// 주어진 시간 뒤 true가 되는 값. 움직임을 줄인 기기에서는 처음부터 true다.
export function useAfter(ms, reduced) {
  const [on, setOn] = useState(!!reduced);
  useEffect(() => {
    if (reduced) { setOn(true); return undefined; }
    setOn(false);
    const id = window.setTimeout(() => setOn(true), ms);
    return () => window.clearTimeout(id);
  }, [ms, reduced]);
  return on;
}

// 피그마 글자 상자 하나. 줄 높이는 피그마 상자 높이와 같게 둔다.
export function Txt({ x, y, w, h, size, weight = 500, color = '#121415', ls = 0, lh, align = 'left', style, children }) {
  return (
    <div style={{ ...abs(x, y, w, h), fontFamily: FONT, fontSize: size, fontWeight: weight, color, letterSpacing: ls, lineHeight: (lh ?? h) + 'px', textAlign: align, whiteSpace: 'pre', wordBreak: 'keep-all', ...style }}>{children}</div>
  );
}

// 글자 단위로 왼쪽부터 드러나는 글(타자 치듯). 글자마다 30ms 시차.
export function Typed({ text, t = 0, step = 30 }) {
  return Array.from(text).map((c, k) => (
    <span key={k} style={{ display: 'inline-block', whiteSpace: 'pre', ...an('obClip', t + k * step, 60, 'linear') }}>{c}</span>
  ));
}

// 피그마 skel 막대. 왼쪽에서 차오른 뒤 밝은 띠가 1.4초마다 지나간다.
export function Skel({ x, y, w, h, r, t = 0, op, grow = true, dark = false, bg }) {
  return (
    <div style={{ ...abs(x, y, w, h), opacity: op }}>
      <div className="ob-skel" style={{ width: '100%', height: '100%', borderRadius: r, transformOrigin: 'left center', background: bg, ...(grow ? an('obGrowX', t, 360, ST) : an('obFade', t, 240, ST)) }}>
        <span className={'ob-shine' + (dark ? ' dark' : '')} style={{ animationDelay: t + 360 + 'ms' }} />
      </div>
    </div>
  );
}

// 흰 패널(48, 44, 230 x 200, 반경 18)
export function Panel({ t = 60, shadow = true, children }) {
  return (
    <div style={{ ...abs(48, 44, 230, 200), background: '#F8F8F8', borderRadius: 18, boxShadow: shadow ? SHADOW : 'none', ...an('obPanel', t, 400) }}>{children}</div>
  );
}

// 둥근 아바타. 그림이 뜨기 전에는 같은 자리의 회색 원이 반짝이고, 그림이 뜨면 80ms 페이드로 바뀐다. 누르면 1.12배로 튄다.
export function Avatar({ x, y, size = 36, src, t = 0, pop = true }) {
  const [ok, setOk] = useState(false);
  const box = useRef(null);
  const img = useRef(null);
  useEffect(() => { if (img.current && img.current.complete && img.current.naturalWidth) setOk(true); }, []);
  const tap = () => {
    box.current?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)', offset: 0.45 }, { transform: 'scale(1)' }], { duration: 180, easing: ST });
  };
  return (
    <div style={{ ...abs(x, y, size, size), ...(pop ? an('obPop', t, 420) : an('obRise', t, 300)) }}>
      <div ref={box} className="obp" onClick={tap} onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%' }}>
        <div className="ob-skel" style={{ position: 'absolute', inset: 0, borderRadius: '50%', opacity: ok ? 0 : 1, transition: 'opacity 80ms linear' }}><span className="ob-shine" /></div>
        <img ref={img} src={src} alt="" draggable={false} onLoad={() => setOk(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '50%', opacity: ok ? 1 : 0, transition: 'opacity 80ms linear' }} />
      </div>
    </div>
  );
}

// 피그마 아이콘 원본을 내보낸 SVG 그림
export function Svg({ name, x = 0, y = 0, w, h, style }) {
  return <img src={OB2 + name + '.svg'} alt="" draggable={false} style={{ ...abs(x, y, w, h), display: 'block', ...style }} />;
}

// 회전한 그림(피그마 rotation은 왼쪽 위 꼭짓점 기준 반시계, CSS는 시계 방향이라 부호를 바꾼다)
export function RotImg({ x, y, w, h, rot = 0, src, shadow, style }) {
  return (
    <img src={src} alt="" draggable={false}
      style={{ ...abs(x, y, w, h), objectFit: 'contain', transformOrigin: '0 0', transform: `rotate(${-rot}deg)`, filter: shadow, ...style }} />
  );
}

// 둥근 칩(반경 99). 오른쪽 아래에서 올라온다.
export function Chip({ x, y, w, h, bg, t = 0, shadow = true, children, onClick }) {
  return (
    <div style={{ ...abs(x, y, w, h), ...an('obChip', t, 360) }}>
      <div className="obp" onClick={onClick} onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 99, background: bg, boxShadow: shadow ? SHADOW : 'none' }}>{children}</div>
    </div>
  );
}
