// 의자 꾸미기. 팀 피그마 "의자 꾸미기 · 소파 선택"과 같은 틀(390 x 844)에서 5종 6색 30장을 모두 고를 수 있다.
// 종류를 누르면 그 종류의 의자가, 색을 누르면 그 색의 의자 그림 하나만 바뀐다(화면 전체는 움직이지 않는다).
// 고른 의자는 "이 의자로 앉기"를 누르면 내 의자가 된다(flow.js 링크의 act, live.js resolveTo).
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { KINDS, big, thumb, getDraft, subscribe, pickKind, pickColor, lastColor } from './chairs.js';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';

const CSS = `
@keyframes csIn{from{opacity:0;transform:translateY(10px) scale(.94)}to{opacity:1;transform:none}}
@keyframes csOut{from{opacity:1}to{opacity:0;transform:scale(1.02)}}
@keyframes csText{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.cs-in{animation:csIn 340ms ${EASE} both}
.cs-out{animation:csOut 260ms cubic-bezier(.2,0,0,1) both}
.cs-text{animation:csText 240ms ${EASE} both}
.cs-btn{border:0;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;transition:transform 120ms cubic-bezier(.2,0,0,1),background-color 160ms cubic-bezier(.2,0,0,1),box-shadow 160ms cubic-bezier(.2,0,0,1)}
.cs-btn:active{transform:scale(.96)}
.cs-btn:focus-visible{box-shadow:inset 0 0 0 2px #36D2FF}
@media (prefers-reduced-motion:reduce){.cs-in,.cs-out,.cs-text{animation-duration:1ms}.cs-btn{transition:none}}
`;

const preloaded = new Set();
const preload = (urls) => urls.forEach((u) => {
  if (preloaded.has(u)) return;
  preloaded.add(u);
  const i = new Image();
  i.src = u;
});

// 큰 그림 하나. 새 그림이 다 받아진 뒤에 겹쳐서 바뀐다(받는 동안은 이전 그림이 그대로 있다).
function Hero({ src }) {
  const [layers, setLayers] = useState([{ src, id: 0, anim: false }]);
  const seq = useRef(0);
  useEffect(() => {
    let alive = true;
    let timer = 0;
    const apply = () => {
      if (!alive) return;
      const id = ++seq.current;
      setLayers((ls) => (ls[ls.length - 1].src === src ? ls : [...ls.map((l) => ({ ...l, out: true })), { src, id, anim: true }]));
      timer = window.setTimeout(() => alive && setLayers((ls) => ls.filter((l) => !l.out)), 360);
    };
    const im = new Image();
    im.onload = () => (im.decode ? im.decode().then(apply, apply) : apply());
    im.onerror = apply;
    im.src = src;
    return () => { alive = false; window.clearTimeout(timer); };
  }, [src]);
  return (
    <>
      {layers.map((l) => (
        <img key={l.id} src={l.src} alt="" draggable={false} className={l.out ? 'cs-out' : l.anim ? 'cs-in' : undefined}
          style={{ position: 'absolute', left: 91, top: 8, width: 160, height: 160, objectFit: 'contain', display: 'block', pointerEvents: 'none' }} />
      ))}
    </>
  );
}

const label = { position: 'absolute', left: 24, margin: 0, fontFamily: FONT, fontSize: 15, fontWeight: 700, lineHeight: '21px', letterSpacing: '-0.04em', color: '#F8F8F8', whiteSpace: 'pre' };

export function ChairStudio(props) {
  const sel = useSyncExternalStore(subscribe, getDraft, getDraft);
  const kind = KINDS[sel.k];
  // 들어오면 지금 종류의 큰 그림 6장을 미리 받아 두고, 나머지 종류는 한가한 때에 첫 색만 받는다.
  useEffect(() => {
    preload(KINDS[sel.k].colors.map((_, c) => big(sel.k, c)));
    const idle = window.requestIdleCallback || ((f) => window.setTimeout(f, 600));
    idle(() => KINDS.forEach((_, k) => preload([big(k, lastColor(k))])));
  }, [sel.k]);
  return (
    <div data-figma="의자 꾸미기" data-node="chair-studio" {...props}
      style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', background: '#121415', fontFamily: FONT, color: '#F8F8F8' }}>
      <style>{CSS}</style>
      <span data-figma="chevron-left" style={{ position: 'absolute', left: 24, top: 79, width: 24, height: 24, lineHeight: 0, color: '#F8F8F8' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
          <path d="M16 4L8 12L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p data-figma="의자 꾸미기 제목" style={{ position: 'absolute', left: 0, top: 79, width: 390, margin: 0, textAlign: 'center', fontSize: 17, fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.34px' }}>의자 꾸미기</p>
      <div data-figma="내 엉따" style={{ position: 'absolute', left: 293, top: 79, width: 73, height: 25, borderRadius: 999, background: 'rgba(255,154,77,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '17px', letterSpacing: '-0.24px', color: '#FF9A4D', whiteSpace: 'pre' }}>엉따 39.2°</span>
      </div>

      <div data-figma="미리보기" style={{ position: 'absolute', left: 24, top: 112, width: 342, height: 252, borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(180deg, #06303C 0%, #222628 100%)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: 41, top: 0, width: 260, height: 190, background: 'radial-gradient(closest-side, rgba(54,210,255,0.22), rgba(54,210,255,0))' }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: 96, top: 152, width: 150, height: 24, background: 'radial-gradient(closest-side, rgba(0,0,0,0.5), rgba(0,0,0,0))' }} />
        <Hero src={big(sel.k, sel.c)} />
        <div key={sel.k + '-' + sel.c} className="cs-text" style={{ position: 'absolute', left: 0, top: 178, width: 342, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 19, fontWeight: 700, lineHeight: '27px', letterSpacing: '-0.38px' }}>{kind.name}</p>
          <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.26px', color: '#9AA1A6' }}>{kind.colors[sel.c]}</p>
        </div>
      </div>

      <p data-figma="의자" style={{ ...label, top: 384 }}>의자</p>
      <div data-figma="의자 종류" style={{ position: 'absolute', left: 24, top: 410, width: 342, height: 62 }}>
        {KINDS.map((k, i) => {
          const on = i === sel.k;
          return (
            <button key={k.id} type="button" className="cs-btn" aria-label={k.name} aria-pressed={on} data-figma={'의자 / ' + k.name}
              onPointerDown={() => preload(k.colors.map((_, c) => big(i, c)).slice(0, 1))}
              onClick={(e) => { e.stopPropagation(); pickKind(i); }}
              style={{ position: 'absolute', left: i * 70, top: 0, width: 62, height: 62, borderRadius: 14, background: on ? '#0E3444' : '#222628', boxShadow: on ? 'inset 0 0 0 2px #36D2FF' : 'inset 0 0 0 0 #36D2FF' }}>
              <img src={thumb(i, i === sel.k ? sel.c : lastColor(i))} alt="" draggable={false} style={{ position: 'absolute', left: 8, top: 8, width: 46, height: 46, objectFit: 'contain', display: 'block' }} />
            </button>
          );
        })}
      </div>

      <p data-figma="색상" style={{ ...label, top: 492 }}>색상</p>
      <div data-figma="색상 목록" style={{ position: 'absolute', left: 24, top: 520, width: 342, height: 200 }}>
        {kind.colors.map((name, c) => {
          const on = c === sel.c;
          return (
            <button key={sel.k + '-' + c} type="button" className="cs-btn" aria-label={name} aria-pressed={on} data-figma={'색 / ' + name}
              onPointerDown={() => preload([big(sel.k, c)])}
              onClick={(e) => { e.stopPropagation(); pickColor(c); }}
              style={{ position: 'absolute', left: (c % 3) * 117, top: Math.floor(c / 3) * 104, width: 108, height: 96, borderRadius: 16, background: on ? '#0E3444' : '#222628', boxShadow: on ? 'inset 0 0 0 2px #36D2FF' : 'inset 0 0 0 0 #36D2FF' }}>
              <img src={thumb(sel.k, c)} alt="" draggable={false} style={{ position: 'absolute', left: 26, top: 8, width: 56, height: 56, objectFit: 'contain', display: 'block' }} />
              <span style={{ position: 'absolute', left: 0, top: 68, width: 108, textAlign: 'center', fontSize: 12, fontWeight: on ? 700 : 500, lineHeight: '17px', letterSpacing: '-0.24px', color: on ? '#36D2FF' : '#9AA1A6', whiteSpace: 'pre' }}>{name}</span>
            </button>
          );
        })}
      </div>

      <div data-figma="CTA" style={{ position: 'absolute', left: 24, top: 764, width: 342, height: 56, borderRadius: 28, background: '#36D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px', letterSpacing: '-0.32px', color: '#000' }}>이 의자로 앉기</span>
      </div>
    </div>
  );
}
