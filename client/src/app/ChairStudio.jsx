// 의자 꾸미기. 팀 피그마 "의자 꾸미기 · 소파 선택" 다섯 장과 "잠긴 의자 선택"의 자리와 값을 그대로 옮겼다(390 x 844).
// 위에서부터 의자 그림(190), 이름과 스타일 이름, "의자" 종류 다섯 칸(62), "스타일" 가로 목록(108 x 116), "저장하기" 순서다.
// 종류를 누르면 그 종류의 의자가, 스타일을 누르면 큰 그림 하나만 바뀐다(화면 전체는 움직이지 않는다).
// 리클라이너는 엉따 40.0°가 될 때까지 잠겨 있어 고를 수는 있지만 저장할 수 없다.
// 반응 속도(11. 12. 04:46 사용자 지시): 다섯 종류의 모든 스타일 그림을 380px WebP로 미리 받아 디코드해 두고(chairs.js warmStudio, 마이와 이 화면 준비 때),
// 누르면 같은 프레임에 큰 그림과 이름을 바꾼다. 큰 그림은 120ms 교차 페이드(opacity만), 이름은 120ms 페이드, 칸 눌림은 90ms다.
import React, { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { dragScroll } from './rowDrag.js';
import { KINDS, LOCK, isLocked, hero, tile, isWarm, warmStudio, getDraft, subscribe, pickKind, pickColor } from './chairs.js';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const PRIMARY = '#36D2FF';
const SUBTLE = '#06303C';
const ELEVATED = '#222628';
const SECONDARY = '#9AA1A6';

const CSS = `
@keyframes csIn{from{opacity:0;transform:translateY(8px) scale(.95)}to{opacity:1;transform:none}}
@keyframes csOut{from{opacity:1}to{opacity:0}}
@keyframes csFade{from{opacity:0}to{opacity:1}}
.cs-in{animation:csIn 340ms ${EASE} both}
.cs-hero-in{animation:csFade 120ms cubic-bezier(.2,0,0,1) both}
.cs-out{animation:csOut 120ms cubic-bezier(.2,0,0,1) both}
.cs-text{animation:csFade 120ms cubic-bezier(.2,0,0,1) both}
.cs-btn{border:0;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;transition:transform 90ms cubic-bezier(.2,0,0,1),background-color 120ms cubic-bezier(.2,0,0,1),box-shadow 120ms cubic-bezier(.2,0,0,1)}
.cs-btn:active{transform:scale(.96);transition-duration:90ms}
.cs-row[data-dragging] .cs-btn:active{transform:none}
.cs-btn:focus-visible{outline:2px solid #F8F8F8;outline-offset:2px}
.cs-row{overflow-x:auto;overflow-y:hidden;scrollbar-width:none;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}
.cs-row::-webkit-scrollbar{display:none}
@media (prefers-reduced-motion:reduce){.cs-in,.cs-hero-in,.cs-out,.cs-text{animation-duration:1ms}.cs-btn{transition:none}}
`;


const LockIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.4" fill="#F8F8F8" />
    <path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="15.4" r="1.5" fill="#222628" />
  </svg>
);

// 큰 의자 그림. 미리 디코드된 그림이면 누른 그 프레임에 바로 겹쳐 바꾸고(useLayoutEffect, 그리기 전),
// 아직 못 받은 그림이면 다 받고 디코드한 뒤에 바꾼다(받는 동안은 이전 그림이 그대로 있다). 바뀔 때는 120ms 교차 페이드.
function Hero({ src }) {
  const [layers, setLayers] = useState([{ src, id: 0, anim: false }]);
  const seq = useRef(0);
  useLayoutEffect(() => {
    let alive = true;
    let timer = 0;
    const apply = () => {
      if (!alive) return;
      const id = ++seq.current;
      setLayers((ls) => (ls[ls.length - 1].src === src ? ls : [...ls.filter((l) => !l.out).slice(-1).map((l) => ({ ...l, out: true })), { src, id, anim: true }]));
      timer = window.setTimeout(() => alive && setLayers((ls) => ls.filter((l) => !l.out)), 140);
    };
    if (isWarm(src)) apply();
    else {
      const im = new Image();
      im.onload = () => (im.decode ? im.decode().then(apply, apply) : apply());
      im.onerror = apply;
      im.src = src;
    }
    return () => { alive = false; window.clearTimeout(timer); };
  }, [src]);
  return (
    <>
      {layers.map((l) => (
        <img key={l.id} src={l.src} alt="" draggable={false} decoding="sync" className={l.out ? 'cs-out' : l.anim ? 'cs-hero-in' : undefined}
          style={{ position: 'absolute', left: 100, top: 151, width: 190, height: 190, objectFit: 'contain', display: 'block', pointerEvents: 'none' }} />
      ))}
    </>
  );
}

const label = { position: 'absolute', left: 24, margin: 0, fontFamily: FONT, fontSize: 15, fontWeight: 700, lineHeight: '21px', letterSpacing: '-0.04em', color: '#F8F8F8', whiteSpace: 'pre' };

export function ChairStudio(props) {
  const sel = useSyncExternalStore(subscribe, getDraft, getDraft);
  const kind = KINDS[sel.k];
  const locked = isLocked(sel.k);
  const lock = LOCK[kind.id];
  const rowRef = useRef(null);
  // 스타일 줄은 손가락과 마우스 끌기, 트랙패드로 옆으로 민다. 6px 넘게 끌면 색 누름이 취소된다(rowDrag.js, 2026. 11. 12. 03:45 사용자 지시).
  useEffect(() => { dragScroll(rowRef.current); }, []);
  const [note, setNote] = useState('');
  // 잠긴 의자로 저장하려고 하면 이유를 알려 준다(링크가 막히면 live.js가 이 신호를 보낸다).
  useEffect(() => {
    let t = 0;
    const on = () => { setNote(lock ? lock.need : ''); window.clearTimeout(t); t = window.setTimeout(() => setNote(''), 2200); };
    window.addEventListener('drrrk:chair-locked', on);
    return () => { window.removeEventListener('drrrk:chair-locked', on); window.clearTimeout(t); };
  }, [lock]);
  // 들어오자마자 다섯 종류의 모든 그림을 받아 디코드한다(마이와 화면 준비 때 이미 시작했으면 같은 약속을 쓴다).
  useState(() => { warmStudio(); });
  // 종류를 바꾸면 스타일 목록을 맨 앞으로 돌린다.
  useEffect(() => {
    if (rowRef.current) rowRef.current.scrollTo({ left: 0, behavior: 'smooth' });
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
      <p data-figma="의자 꾸미기 제목" style={{ position: 'absolute', left: 0, top: 79, width: 390, margin: 0, textAlign: 'center', fontSize: 17, fontWeight: 700, lineHeight: '24px', letterSpacing: '-0.04em' }}>의자 꾸미기</p>
      <div data-figma="내 엉따" style={{ position: 'absolute', left: 293, top: 79, height: 25, padding: '4px 10px', boxSizing: 'border-box', borderRadius: 999, background: 'rgba(255,154,77,0.15)', display: 'inline-flex', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '17px', letterSpacing: '-0.04em', color: '#FF9A4D', whiteSpace: 'pre' }}>엉따 39.2°</span>
      </div>

      {/* 잠긴 의자는 큰 그림을 30%로 두고 가운데 자물쇠를 얹는다(최종 피그마 2340:24031 그림 채우기 불투명도 0.3, 자물쇠 2340:24032). */}
      <div style={{ opacity: locked ? 0.3 : 1, transition: 'opacity 120ms cubic-bezier(0.2, 0, 0, 1)' }}><Hero src={hero(sel.k, sel.c)} /></div>
      {locked ? (
        <div aria-hidden="true" className="cs-hero-in" style={{ position: 'absolute', left: 167, top: 221, width: 56, height: 56, borderRadius: 28, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LockIcon size={24} /></div>
      ) : null}
      <div key={sel.k + '-' + sel.c} className="cs-text" style={{ position: 'absolute', left: 0, top: 349, width: 390, textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 19, fontWeight: 700, lineHeight: '27px', letterSpacing: '-0.04em' }}>{kind.name}</p>
        <p style={{ margin: '8px 0 0', fontSize: 13, fontWeight: 500, lineHeight: '18px', letterSpacing: '-0.04em', color: locked ? '#FF9A4D' : SECONDARY }}>{locked ? lock.need : kind.colors[sel.c]}</p>
      </div>

      <p data-figma="의자" style={{ ...label, top: 430 }}>의자</p>
      <div data-figma="의자 종류" style={{ position: 'absolute', left: 24, top: 459, width: 342, height: 62 }}>
        {KINDS.map((k, i) => {
          const on = i === sel.k;
          return (
            <button key={k.id} type="button" className="cs-btn" aria-label={k.name} aria-pressed={on} data-figma={'의자 / ' + k.name}
              onClick={(e) => { e.stopPropagation(); pickKind(i); }}
              style={{ position: 'absolute', left: i * 70, top: 0, width: 62, height: 62, borderRadius: 14, background: on ? SUBTLE : ELEVATED, boxShadow: on ? 'inset 0 0 0 2px ' + PRIMARY : 'inset 0 0 0 0 ' + PRIMARY }}>
              <img src={tile(i, 0)} alt="" draggable={false} style={{ position: 'absolute', left: 8, top: 8, width: 46, height: 46, objectFit: 'contain', display: 'block', opacity: isLocked(i) ? 0.3 : 1 }} />
              {isLocked(i) ? <span aria-hidden="true" style={{ position: 'absolute', left: 23, top: 23, lineHeight: 0 }}><LockIcon size={16} /></span> : null}
            </button>
          );
        })}
      </div>

      <p data-figma="스타일" style={{ ...label, top: 566 }}>스타일</p>
      <div ref={rowRef} data-figma="색상" className="cs-row"
        onWheel={(e) => { if (rowRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) rowRef.current.scrollLeft += e.deltaY; e.stopPropagation(); }}
        style={{ position: 'absolute', left: 0, top: 595, width: 390, height: 116 }}>
        <div style={{ display: 'flex', gap: 8, padding: '0 24px', width: 'max-content', height: 116 }}>
          {kind.colors.map((name, c) => {
            const on = c === sel.c;
            return (
              <button key={sel.k + '-' + c} type="button" className="cs-btn" aria-label={name} aria-pressed={on} data-figma={'색 / ' + name}
                onClick={(e) => { e.stopPropagation(); pickColor(c); }}
                style={{ position: 'relative', flex: '0 0 108px', width: 108, height: 116, borderRadius: 16, background: on && !locked ? SUBTLE : ELEVATED, boxShadow: on && !locked ? 'inset 0 0 0 2px ' + PRIMARY : 'inset 0 0 0 0 ' + PRIMARY }}>
                <img src={tile(sel.k, c)} alt="" draggable={false} style={{ position: 'absolute', left: 16, top: 8, width: 76, height: 76, objectFit: 'contain', display: 'block', opacity: locked ? 0.23 : 1 }} />
                {locked ? <span aria-hidden="true" style={{ position: 'absolute', left: 42, top: 34, lineHeight: 0 }}><LockIcon size={24} /></span> : null}
                <span style={{ position: 'absolute', left: 0, top: 88, width: 108, textAlign: 'center', fontSize: 12, fontWeight: on && !locked ? 700 : 500, lineHeight: '16.8px', letterSpacing: '-0.04em', color: on && !locked ? PRIMARY : SECONDARY, whiteSpace: 'pre' }}>{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div data-figma="CTA" style={{ position: 'absolute', left: 24, top: 764, width: 342, height: 56, borderRadius: 28, background: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 200ms ' + EASE }}>
        <span style={{ fontSize: 16, fontWeight: 700, lineHeight: '22.4px', letterSpacing: '-0.04em', color: '#000' }}>저장하기</span>
      </div>
      {note ? (
        <div role="status" className="cs-in" style={{ position: 'absolute', left: 24, top: 704, width: 342, height: 44, borderRadius: 14, background: 'rgba(44,44,46,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, letterSpacing: '-0.04em', color: '#FF9A4D' }}>{note}</div>
      ) : null}
    </div>
  );
}
