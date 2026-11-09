// 마이 메인. 팀 피그마 "MY · 리디자인 (히어로 + 엉따 밴드 + 업적 편의점)"(1972:22735, 11. 9. 최신 후보 1980:28455의 "+ 0.5°" 칩 포함)의 자리와 값을 그대로 옮겼다(390 x 844).
// iOS MyScreens.swift와 같은 값이다: 히어로 336 높이, 의자 100,126 190, 디자인 버튼 278,280 84 x 36,
// 엉따 39.2° Bold 26 #FF9A4D, 막대 342 x 6 중 244.8, 업적 편의점 76 x 93 4칸 두 줄(끝 두 칸은 잠긴 칸).
// 의자는 지금 저장된 의자(chairs.js), 나머지 그림은 피그마에서 내보낸 그림(public/assets/my2)이다.
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { BottomNavigation } from '../figma/components/BottomNavigation';
import { getSaved, subscribe, big, KINDS } from './chairs.js';
import { pickItem, itemFrom, pickedSlot } from './my.js';
import { cameFrom } from './lastScreen.js';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const A = (import.meta.env.BASE_URL || '/') + 'assets/my2/';

const ITEMS = [
  { name: '새우깡', img: 's-shrimp', count: 3 },
  { name: '마지막처럼', img: 's-soju', count: 2 },
  { name: '오징어땅콩', img: 's-peanut', count: 1 },
  { name: '노가리', img: 's-nogari', count: 4 },
  { name: '드르라', img: 's-drrra', count: 2 },
  { name: '오징어', img: 's-squid', count: 1 },
  // 잠긴 두 칸도 나의 편의점(53, 피그마 MY2)에서는 보유 칸(몬스타 5개, 마지막처럼 1개)이라 상세에 그 개수를 쓴다.
  { name: '몬스타', img: 's-monster', locked: true, count: 5 },
  { name: '마지막처럼', img: 's-soju', locked: true, count: 1 },
];

const CSS = `
@keyframes mhGauge{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.mh-btn{border:0;background:none;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT};transition:transform 120ms cubic-bezier(.2,0,0,1)}
.mh-btn:active{transform:scale(.96)}
.mh-btn:focus-visible{outline:2px solid #36D2FF;outline-offset:2px;border-radius:12px}
.mh-nav [data-figma="name=my, state=selected"]{position:absolute!important;left:312px!important;top:12px!important;margin:0!important}
`;

const DESC = '라이브에서 던지면 가운데 테이블 위에 바삭하게 올라가요.';

// 마이 안의 화면(나의 편의점 53, 아이템 상세 54, 스킨 팝업 19, 의자 꾸미기 20)에서 돌아오면 엉따 막대를 다시 채우지 않는다.
const INSIDE = [36, 53, 54, 19, 20];
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function go(to, t = 'fade') {
  window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to, t } }));
}

function Title({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 20 }}>
      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.28px', color: '#F8F8F8', lineHeight: '20px' }}>{text}</span>
      <img alt="" src={A + 'info.png'} style={{ width: 13, height: 13 }} />
    </div>
  );
}

/// 아이템 상세 시트(iOS MyItemSheet와 같은 값): 높이 411, #121415, 위 모서리 24. 바깥을 누르면 마이로 돌아간다.
// 시트는 처음부터 끝까지 불투명 단색이다. 올라올 때와 내려갈 때 모두 translateY로만 움직이고, 뒤 딤 덮개만 투명도로 나타나고 사라진다.
// 화면 전환(페이드)이 시트를 반투명으로 섞지 않게 36과 54 사이는 전환 없이 바로 바꾸고, 시트가 스스로 올라오고 내려간다.
function ItemSheet({ slot }) {
  const it = ITEMS[slot] || ITEMS[0];
  const [y0, setY0] = useState(null);
  const [dy, setDy] = useState(0);
  const sheetRef = useRef(null);
  const dimRef = useRef(null);
  const closing = useRef(false);
  const [up, setUp] = useState(false);
  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const sh = sheetRef.current, dm = dimRef.current;
    const back = itemFrom() === 53 ? 53 : 36;
    const t = back === 36 ? 'none' : 'fade';
    if (!sh || !dm) { go(back, t); return; }
    const r = reducedMotion();
    const from = getComputedStyle(sh).transform;
    const dimFrom = getComputedStyle(dm).opacity;
    sh.getAnimations().forEach((a) => a.cancel());
    dm.getAnimations().forEach((a) => a.cancel());
    const a = sh.animate([{ transform: from }, { transform: 'translateY(100%)' }], { duration: r ? 120 : 260, easing: 'cubic-bezier(0.3, 0, 0.8, 0.15)', fill: 'forwards' });
    dm.animate([{ opacity: dimFrom }, { opacity: 0 }], { duration: r ? 120 : 260, easing: 'linear', fill: 'forwards' });
    a.onfinish = () => go(back, t);
  };
  // 화면이 실제로 보이는 순간(미리 그리는 동안의 opacity 0이 풀린 뒤)부터 시트를 올린다.
  // 딜 위를 덮는 화면 이동 칸(아이템 닫기)은 페이드 전환을 쓰므로 그 누름을 가로채 시트를 내린 뒤 돌아간다.
  useEffect(() => {
    const sh = sheetRef.current, dm = dimRef.current;
    if (!sh || !dm) return undefined;
    const layer = sh.closest('.will-change-transform');
    let raf = 0;
    const start = () => {
      const r = reducedMotion();
      sh.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: r ? 120 : 340, easing: EASE, fill: 'forwards' }).onfinish = (e) => {
        sh.style.transform = 'translateY(0px)';
        setUp(true);
        e.target.cancel();
      };
      dm.animate([{ opacity: 0 }, { opacity: 1 }], { duration: r ? 120 : 260, easing: 'linear', fill: 'forwards' }).onfinish = (e) => {
        dm.style.opacity = '1';
        e.target.cancel();
      };
    };
    const wait = () => {
      if (!layer || (layer.style.opacity !== '0' && getComputedStyle(layer).opacity === '1')) start();
      else raf = requestAnimationFrame(wait);
    };
    wait();
    const grab = (e) => {
      const h = e.target.closest && e.target.closest('[data-hotspot][aria-label="아이템 닫기"]');
      if (!h) return;
      e.preventDefault();
      e.stopPropagation();
      close();
    };
    if (layer) layer.addEventListener('click', grab, true);
    return () => {
      cancelAnimationFrame(raf);
      if (layer) layer.removeEventListener('click', grab, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div ref={dimRef} onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)', opacity: up ? 1 : 0, zIndex: 10 }} />
      {/* 이름표의 bottom sheet: 53에서 페이드 전환(morph)으로 열릴 때 전환이 이 칸을 시트로 보고 위치만 옮기게 한다(투명도로 섞지 않는다). */}
      <div
        data-figma="bottom sheet · 아이템 상세"
        ref={sheetRef}
        onPointerDown={(e) => { if (up && !closing.current) setY0(e.clientY); }}
        onPointerMove={(e) => { if (y0 != null) setDy(Math.max(0, e.clientY - y0)); }}
        onPointerUp={() => { if (dy > 120) close(); else setDy(0); setY0(null); }}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 411, background: '#121415', borderRadius: '24px 24px 0 0', zIndex: 11, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px', boxSizing: 'border-box', transform: !up ? 'translateY(100%)' : 'translateY(' + dy + 'px)', touchAction: 'none' }}>
        <span style={{ width: 40, height: 4, borderRadius: 2, background: '#6E767C', marginTop: 10 }} />
        <span style={{ marginTop: 24, width: 132, height: 132, borderRadius: 28, background: 'rgba(255,255,255,.06)', display: 'grid', placeItems: 'center' }}>
          <img alt="" src={A + it.img + '.png'} style={{ width: 112, height: 112, objectFit: 'contain' }} />
        </span>
        <span style={{ marginTop: 16, fontSize: 20, fontWeight: 700, lineHeight: '28px', color: '#F8F8F8' }}>{it.name}</span>
        <span style={{ marginTop: 4, display: 'flex', gap: 4, fontSize: 13, lineHeight: '18px' }}>
          <span style={{ fontWeight: 500, color: '#9AA1A6' }}>보유</span>
          <span style={{ fontWeight: 700, color: '#36D2FF' }}>{it.count}개</span>
        </span>
        <span style={{ marginTop: 14, fontSize: 14, fontWeight: 400, lineHeight: '21px', color: '#CCD1D6', textAlign: 'center' }}>{DESC}</span>
        <span style={{ marginTop: 16, height: 27, padding: '0 10px', borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 500, color: '#CCD1D6' }}>라이브 전용</span>
      </div>
    </>
  );
}

// 54 아이템 상세가 열 칸 번호(0~7). 36에서 누른 칸과 53에서 누른 칸 모두 my.js 한곳에 적고 여기서 읽는다.
// 화면 함수(MyItem)를 이 파일에서 내보내면 화면 목록이 36번에도 MyItem을 골라 마이가 늘 시트가 열린 채로 떴다(11/09). 그래서 MyItem은 MyItem.jsx에 둔다.
export const pickedItem = () => pickedSlot();

export default function MyHome({ item }) {
  const saved = useSyncExternalStore(subscribe, getSaved, getSaved);
  const [chairOk, setChairOk] = useState(true);
  useEffect(() => setChairOk(true), [saved.k, saved.c]);
  const kind = KINDS[saved.k];
  // 엉따 막대는 다른 화면에서 마이로 들어올 때만 채운다. 마이 안의 화면에서 돌아오면 처음부터 최종 길이다.
  const [fillGauge] = useState(() => !INSIDE.includes(cameFrom(item != null ? 54 : 36)));
  const step = (342 - 76) / 3;
  // 생성된 아래 탭은 마이 칸이 오른쪽 밖으로 밀리고 글자가 MY로 나온다. 피그마 자리(312, 12)와 글자 "마이"로 맞춘다.
  const navRef = useRef(null);
  useEffect(() => {
    const root = navRef.current;
    if (!root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) if (n.nodeValue.trim() === 'MY') n.nodeValue = '마이';
    // 글자 위에 덮인 피그마 윤곽(MY 모양)을 지우고 실제 글자 "마이"를 보이게 한다. 굵기는 다른 탭 글자와 같게 둔다.
    root.querySelectorAll('p[data-figma="MY"][data-outline]').forEach((p) => {
      p.querySelectorAll('span[aria-hidden="true"]').forEach((s) => s.remove());
      p.style.webkitTextFillColor = 'currentColor';
      p.style.width = 'auto';
    });
  });
  return (
    <div data-figma="MY · 리디자인" data-node="1980:28455" style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', background: '#121415', fontFamily: FONT }}>
      <style>{CSS}</style>
      <img alt="" src={A + 'hero.webp'} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 336 }} />
      <img alt="Drrrk" src={A + 'logo.png'} style={{ position: 'absolute', left: 24, top: 64, width: 90, height: 34 }} />
      <img alt="" aria-hidden src={A + 'settings.png'} style={{ position: 'absolute', left: 326, top: 68, width: 40, height: 40 }} />

      {/* 현재 의자(100, 126, 190 x 190). 누르면 의자 꾸미기 */}
      <button className="mh-btn" aria-label={'의자 꾸미기, 지금 의자 ' + (kind ? kind.name : '')} onClick={() => go(20, 'push')}
        style={{ position: 'absolute', left: 100, top: 126, width: 190, height: 190 }}>
        {chairOk && <img alt="" draggable={false} src={big(saved.k, saved.c)} onError={() => setChairOk(false)} style={{ width: 190, height: 190, objectFit: 'contain', display: 'block' }} />}
      </button>

      {/* 디자인 버튼(278, 280, 84 x 36): 검정 45% 바탕 */}
      <button className="mh-btn" aria-label="의자 디자인 바꾸기" onClick={() => go(20, 'push')}
        style={{ position: 'absolute', left: 278, top: 280, width: 84, height: 36, borderRadius: 18, background: 'rgba(0,0,0,.45)', boxShadow: 'inset 0 0 0 1px rgba(54,210,255,.7)', display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 13, boxSizing: 'border-box' }}>
        <img alt="" src={A + 'hanger.png'} style={{ width: 18, height: 18 }} />
        <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color: '#36D2FF' }}>디자인</span>
      </button>

      {/* 엉따 온도 밴드(24, 356) */}
      <div style={{ position: 'absolute', left: 24, top: 356, width: 342 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 36 }}>
          <Title text="엉따 온도" />
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.52px', lineHeight: '36px', color: '#FF9A4D' }}>39.2°</span>
        </div>
        {/* 오늘 오른 온도 칩(팀 피그마 1980:28595): 화면 기준 237, 361. 칩 49 x 25, 모서리 11, #36D2FF, 안쪽 여백 9와 4,
            글자 SUIT Bold 11, 행간 150%, 자간 -4%, 검정. 오른쪽 꼬리(1980:28598)는 285, 369의 9.5 x 9 삼각형이다. */}
        <span aria-label="오늘 0.5도 올랐어요" data-figma="+ 0.5°" style={{ position: 'absolute', left: 213, top: 5, width: 58, height: 25, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, width: 49, height: 25, borderRadius: 11, background: '#36D2FF', boxSizing: 'border-box', padding: '4px 9px', fontSize: 11, fontWeight: 700, lineHeight: '16.5px', letterSpacing: '-0.44px', color: '#000', whiteSpace: 'nowrap' }}>+ 0.5°</span>
          <svg aria-hidden width="58" height="25" viewBox="0 0 58 25" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            <path d="M55.5921 11.5962L48 8V17L55.5921 13.4037C56.3547 13.0425 56.3547 11.9574 55.5921 11.5962Z" fill="#36D2FF" />
          </svg>
        </span>
        <div style={{ position: 'relative', marginTop: 12, width: 342, height: 6, borderRadius: 3, background: 'rgba(110,118,124,.4)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 244.8, height: 6, borderRadius: 3, background: 'linear-gradient(90deg,#36D2FF,#FF9A4D)', transformOrigin: '0 50%', animation: fillGauge ? `mhGauge 1000ms ${EASE} 200ms both` : undefined }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 40, marginTop: 12 }}>
          <img alt="" src={A + 'next.png'} style={{ width: 40, height: 40 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, lineHeight: '18px', color: '#F8F8F8' }}>다음 캐릭터 · ???</span>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '17px', color: '#9AA1A6' }}>0.8° 더 따뜻해지면 열려요</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#F8F8F8' }}>40°</span>
        </div>
      </div>

      {/* 업적 편의점 머리줄(24, 498) */}
      <div style={{ position: 'absolute', left: 24, top: 498, width: 342, height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title text="업적 편의점" />
        <button className="mh-btn" aria-label="나의 편의점 전체 8종 보기" onClick={() => go(53)}
          style={{ display: 'flex', alignItems: 'center', gap: 2, height: 44, marginRight: 0, paddingLeft: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500, lineHeight: '18px', color: '#9AA1A6' }}>전체 8</span>
          <img alt="" src={A + 'chev.png'} style={{ width: 16, height: 16 }} />
        </button>
      </div>

      {/* 업적 편의점 격자(24, 534, 342 x 198): 칸 76 x 93, 줄 간격 105 */}
      <div style={{ position: 'absolute', left: 24, top: 534, width: 342, height: 198 }}>
        {ITEMS.map((it, i) => (
          <button key={i} className="mh-btn" aria-label={it.locked ? '잠긴 칸' : it.name}
            onClick={() => { if (it.locked) return; pickItem(it.name, 36, i); go(54, 'none'); }}
            style={{ position: 'absolute', left: (i % 4) * step, top: Math.floor(i / 4) * 105, width: 76, height: 93, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: it.locked ? 'default' : 'pointer' }}>
            <span style={{ position: 'relative', width: 72, height: 72, display: 'grid', placeItems: 'center' }}>
              <img alt="" src={A + it.img + '.png'} style={{ width: 68, height: 68, objectFit: 'contain', opacity: it.locked ? 0.35 : 1 }} />
              {it.locked && <img alt="" src={A + 'lock.png'} style={{ position: 'absolute', width: 24, height: 24 }} />}
            </span>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '17px', color: it.locked ? '#666B73' : '#D9DEE3', whiteSpace: 'nowrap' }}>{it.locked ? '???' : it.name}</span>
          </button>
        ))}
      </div>

      <div ref={navRef} className="mh-nav" style={{ position: 'absolute', left: 0, top: 760, width: 390, height: 84, overflow: 'hidden' }}>
        <BottomNavigation active="my" />
      </div>
      {item != null && <ItemSheet slot={item} />}
    </div>
  );
}
