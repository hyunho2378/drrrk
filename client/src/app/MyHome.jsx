// 마이 메인. 팀 피그마 "MY · 리디자인 (히어로 + 엉따 밴드 + 업적 편의점)"(1972:22735, 11. 9. 최신 후보 1980:28455의 "+ 0.5°" 칩 포함)의 자리와 값을 그대로 옮겼다(390 x 844).
// iOS MyScreens.swift와 같은 값이다: 히어로 336 높이, 의자 100,126 190, 디자인 버튼 278,280 84 x 36,
// 엉따 39.2° Bold 26 #FF9A4D, 막대 342 x 6 중 244.8, 업적 편의점 76 x 93 4칸 두 줄(끝 두 칸은 잠긴 칸).
// 의자는 지금 저장된 의자(chairs.js), 나머지 그림은 피그마에서 내보낸 그림(public/assets/my2)이다.
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { BottomNavigation } from '../figma/components/BottomNavigation';
import { getSaved, subscribe, big, KINDS } from './chairs.js';
import { pickItem, itemFrom, pickedSlot, pickedName, chairGetSeen, markChairGetSeen, crossRatio, CHAIR_GET } from './my.js';
import { cameFrom } from './lastScreen.js';
import { ITEM_COPY, LOCKED_COPY, itemChips, keyOf } from './itemCopy.js';
import { playItem, preloadItemSounds } from './sfx.js';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const A = (import.meta.env.BASE_URL || '/') + 'assets/my2/';
const A3 = (import.meta.env.BASE_URL || '/') + 'assets/my3/';

// key는 itemCopy.js의 아이템 키(시트 글과 소리)다. 끝의 두 칸은 잠긴 칸이라 누르면 미획득 시트(2116:28586)가 열린다.
const ITEMS = [
  { key: 'shrimp', name: '새우깡', img: 's-shrimp' },
  { key: 'soju', name: '마지막처럼', img: 's-soju' },
  { key: 'peanut', name: '오징어땅콩', img: 's-peanut' },
  { key: 'nogari', name: '노가리', img: 's-nogari' },
  { key: 'drrra', name: '드르라', img: 's-drrra' },
  { key: 'squid', name: '오징어', img: 's-squid' },
  { key: 'monster', name: '몬스타', img: 's-monster', locked: true },
  // 최종 피그마(2340:30187): 잠긴 마지막처럼은 같은 그림에 노출 -1, 채도 -1 거름을 건다(몬스타 그림 s-monster는 노출 -1이 이미 구워져 있다).
  { key: 'soju', name: '마지막처럼', img: 's-soju', locked: true, dim: 'grayscale(1) brightness(0.18)' },
];

const CSS = `
@keyframes mhGauge{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.mh-btn{border:0;background:none;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT};transition:transform 120ms cubic-bezier(.2,0,0,1)}
.mh-btn:active{transform:scale(.96)}
.mh-btn:focus-visible{outline:2px solid #36D2FF;outline-offset:2px;border-radius:12px}
.mh-hero{transition:transform 120ms cubic-bezier(.2,0,0,1),opacity 120ms cubic-bezier(.2,0,0,1)}
.mh-hero:active{transform:scale(.97);opacity:.85;transition-duration:90ms}
.mh-nav [data-figma="name=my, state=selected"]{position:absolute!important;left:312px!important;top:12px!important;margin:0!important}
.mh-nav [data-figma="name=home, state=default"]{left:20px!important;top:12px!important}
.mh-nav [data-figma="tab/라이브"]{left:120px!important;top:12px!important}
.mh-nav [data-figma="tab/커뮤니티"]{left:216px!important;top:12px!important}
.mh-nav p[data-figma="MY"]{font-weight:700!important}
`;

// 마이 안의 화면(나의 편의점 53, 아이템 상세 54, 스킨 팝업 19, 의자 꾸미기 20)에서 돌아오면 엉따 막대를 다시 채우지 않는다.
const INSIDE = [36, 53, 54, 19, 20];
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function go(to, t = 'fade') {
  window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to, t } }));
}

function Title({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 20 }}>
      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.04em', color: '#F8F8F8', lineHeight: '20px' }}>{text}</span>
      <img alt="" src={A + 'info.png'} style={{ width: 13, height: 13 }} />
    </div>
  );
}

/// 아이템 상세 시트(팀 피그마 "Section 1" 2116:28581 시트 9장, iOS MyItemSheet와 같은 값): 390 x 393(미획득 397), #121415, 위 모서리 24.
// 위에서부터 손잡이(10, 40 x 4), 그림 칸(38, 132 x 132, 모서리 28, 흰 6%, 그림 112), 이름(186, Bold 20, 행간 28),
// 설명(232, Regular 14, 행간 21, 자간 -4%, 가운데, 두 줄), 칩 줄(290, 칩 높이 27, 사이 8). 피그마 시트에 보유 개수 줄이 없어 뺐다.
// 그림 칸을 누르면 그 아이템 소리가 난다(sfx.js playItem). 바깥을 누르면 마이로 돌아간다.
// 시트는 처음부터 끝까지 불투명 단색이다. 올라올 때와 내려갈 때 모두 translateY로만 움직이고, 뒤 딤 덮개만 투명도로 나타나고 사라진다.
// 화면 전환(페이드)이 시트를 반투명으로 섞지 않게 36과 54 사이는 전환 없이 바로 바꾸고, 시트가 스스로 올라오고 내려간다.
function sheetKey(slot) {
  if (itemFrom() === 53) return keyOf(pickedName());
  const it = ITEMS[slot] || ITEMS[0];
  return it.locked ? 'locked' : it.key;
}

function ItemSheet({ slot }) {
  const key = sheetKey(slot);
  const locked = key === 'locked';
  const copy = locked ? LOCKED_COPY : ITEM_COPY[key];
  const chips = locked ? LOCKED_COPY.chips : itemChips(key);
  const H = locked ? 397 : 393;
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
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H, background: '#121415', borderRadius: '24px 24px 0 0', zIndex: 11, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 24px 0', boxSizing: 'border-box', transform: !up ? 'translateY(100%)' : 'translateY(' + dy + 'px)', touchAction: 'none' }}>
        <span data-figma="handle" style={{ width: 40, height: 4, borderRadius: 2, background: '#6E767C', flex: 'none' }} />
        {/* 11. 11. 팀 댓글(2100:28388 "아이템 누를때 소리 날 수 있게 수정 필요", 2116:28581 "여기서도 아이템 누르면 소리나게"):
            그림 칸을 누를 때마다 그 아이템 소리를 처음부터 다시 낸다(같은 통로라 앞 소리는 30ms 만에 끊긴다). 시트가 열릴 때는 내지 않는다.
            미획득(???) 시트의 그림 칸은 누를 수 없는 칸이라 소리와 누름 반응이 없다. */}
        {locked
          ? <span data-figma="item hero" aria-hidden style={{ marginTop: 24, width: 132, height: 132, borderRadius: 28, background: 'rgba(255,255,255,.06)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <img alt="" src={A3 + 'lock.svg'} style={{ width: 40, height: 40 }} />
            </span>
          : <button type="button" className="mh-btn mh-hero" data-figma="item hero" aria-label={copy.name + ' 소리 듣기'}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => playItem(key)}
              style={{ marginTop: 24, width: 132, height: 132, borderRadius: 28, background: 'rgba(255,255,255,.06)', display: 'grid', placeItems: 'center', flex: 'none' }}>
              <img alt="" draggable={false} src={copy.img} style={{ width: 112, height: 112, objectFit: 'contain' }} />
            </button>}
        <span data-figma="item name" style={{ marginTop: 16, height: 28, fontSize: 20, fontWeight: 700, lineHeight: '28px', color: '#F8F8F8', whiteSpace: 'nowrap' }}>{copy.name}</span>
        <span data-figma="item desc" style={{ marginTop: 18, fontSize: 14, fontWeight: 400, lineHeight: '21px', letterSpacing: '-0.04em', color: '#CCD1D6', textAlign: 'center', whiteSpace: 'pre' }}>{copy.lines.join('\n')}</span>
        <span data-figma="정보 칩" style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          {chips.map((c, i) => (
            <span key={i} data-figma={i === 0 ? 'chip 쿨타임' : 'chip 라이브 전용'} style={{ padding: '5px 10px', borderRadius: 8, background: 'rgba(255,255,255,.08)', fontSize: locked ? 14 : 12, fontWeight: locked ? 400 : 500, lineHeight: locked ? '21px' : '17px', color: '#CCD1D6', whiteSpace: 'nowrap' }}>{c}</span>
          ))}
        </span>
      </div>
    </>
  );
}

// 54 아이템 상세가 열 칸 번호(0~7). 36에서 누른 칸과 53에서 누른 칸 모두 my.js 한곳에 적고 여기서 읽는다.
// 화면 함수(MyItem)를 이 파일에서 내보내면 화면 목록이 36번에도 MyItem을 골라 마이가 늘 시트가 열린 채로 떴다(11/09). 그래서 MyItem은 MyItem.jsx에 둔다.
export const pickedItem = () => pickedSlot();

// 엉따 막대가 39도를 넘는 순간 의자 획득 장면(19)으로 넘어간다. 다른 화면에서 들어와 막대가 차오를 때만, 같은 세션에서 한 번만.
// 19의 "나중에 할게요"는 마이로 돌아오고(19는 마이 안의 화면이라 막대가 다시 차오르지 않는다), "지금 앉아보기"는 의자 꾸미기(20)로 간다.
function useChairGet(fillRef, on) {
  useEffect(() => {
    if (!on || chairGetSeen()) return undefined;
    let raf = 0;
    let done = false;
    let gapTimer = 0;
    const fire = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      // 막대가 다 차오른 뒤 잠깐 마이를 보여 주고 획득 장면이 뜨도록 텐을 둔다(11/10 팀원 피드백). 그사이 다른 화면으로 가면 뜨지 않는다.
      gapTimer = window.setTimeout(() => {
        if (chairGetSeen()) return;
        markChairGetSeen();
        go(19, 'none');
      }, CHAIR_GET.popGapMs);
    };
    // 실제 막대 길이(scaleX)를 매 프레임 읽어 39 / 39.2에 닿으면 넘어간다. 프레임을 못 받는 경우를 대비해 계산한 시각에도 넘어간다.
    const watch = () => {
      const el = fillRef.current;
      if (el) {
        const m = /matrix\(([^,]+)/.exec(getComputedStyle(el).transform);
        const sx = m ? parseFloat(m[1]) : 1;
        if (sx >= crossRatio() - 1e-4) { fire(); return; }
      }
      raf = requestAnimationFrame(watch);
    };
    const timer = window.setTimeout(fire, CHAIR_GET.crossMs + 120);
    raf = requestAnimationFrame(watch);
    return () => { done = true; cancelAnimationFrame(raf); window.clearTimeout(timer); window.clearTimeout(gapTimer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function MyHome({ item, still }) {
  const saved = useSyncExternalStore(subscribe, getSaved, getSaved);
  const [chairOk, setChairOk] = useState(true);
  useEffect(() => setChairOk(true), [saved.k, saved.c]);
  // 아이템 소리 파일 4개(건어물, 과자, 캔, 소주)를 미리 받아 둔다(첫 누름 소리가 늦지 않게). 8칸이 이 4개를 둘씩 함께 쓴다.
  useEffect(() => { preloadItemSounds(); }, []);
  const kind = KINDS[saved.k];
  // 엉따 막대는 다른 화면에서 마이로 들어올 때만 채운다. 마이 안의 화면에서 돌아오면 처음부터 최종 길이다.
  // still: 획득 장면(19) 아래에 깔린 마이. 막대는 처음부터 최종 길이이고 획득 장면을 다시 부르지 않는다.
  const [fillGauge] = useState(() => !still && !INSIDE.includes(cameFrom(item != null ? 54 : 36)));
  const fillRef = useRef(null);
  useChairGet(fillRef, fillGauge && item == null && !still);
  const step = (342 - 76) / 3;
  // 생성된 아래 탭은 마이 칸이 오른쪽 밖으로 밀리고 글자가 MY로 나온다. 피그마 자리(312, 12)와 글자 "마이"로 맞춘다.
  const navRef = useRef(null);
  useEffect(() => {
    const root = navRef.current;
    if (!root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) if (n.nodeValue.trim() === 'MY') n.nodeValue = '마이';
    // 글자 위에 덮인 피그마 윤곽(MY 모양)을 지우고 실제 글자 "마이"를 보이게 한다.
    // 최종 피그마(2340:30101, 2340:23706): 고른 탭 "마이"는 SUIT 700 #36D2FF, 네 탭은 x 20, 120, 216, 312 와 y 12(아래 탭 안)에 둔다(위 CSS).
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
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: '36px', color: '#FF9A4D' }}>39.2°</span>
        </div>
        {/* 오늘 오른 온도 칩(팀 피그마 1980:28595): 화면 기준 237, 361. 칩 49 x 25, 모서리 11, #36D2FF, 안쪽 여백 9와 4,
            글자 SUIT Bold 11, 행간 150%, 자간 -4%, 검정. 오른쪽 꼬리(1980:28598)는 285, 369의 9.5 x 9 삼각형이다. */}
        <span aria-label="오늘 0.5도 올랐어요" data-figma="+ 0.5°" style={{ position: 'absolute', left: 213, top: 5, width: 58, height: 25, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', left: 0, top: 0, width: 49, height: 25, borderRadius: 11, background: '#36D2FF', boxSizing: 'border-box', padding: '4px 9px', fontSize: 11, fontWeight: 700, lineHeight: '16.5px', letterSpacing: '-0.04em', color: '#000', whiteSpace: 'nowrap' }}>+ 0.5°</span>
          <svg aria-hidden width="58" height="25" viewBox="0 0 58 25" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            <path d="M55.5921 11.5962L48 8V17L55.5921 13.4037C56.3547 13.0425 56.3547 11.9574 55.5921 11.5962Z" fill="#36D2FF" />
          </svg>
        </span>
        <div style={{ position: 'relative', marginTop: 12, width: 342, height: 6, borderRadius: 3, background: 'rgba(110,118,124,.4)', overflow: 'hidden' }}>
          <div ref={fillRef} data-figma="gauge fill" style={{ position: 'absolute', left: 0, top: 0, width: 244.8, height: 6, borderRadius: 3, background: 'linear-gradient(90deg,#36D2FF,#FF9A4D)', transformOrigin: '0 50%', animation: fillGauge ? `mhGauge ${CHAIR_GET.fillMs}ms ${EASE} ${CHAIR_GET.delayMs}ms both` : undefined }} />
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
            onClick={() => { playItem(it.locked ? 'locked' : it.key); pickItem(it.locked ? '???' : it.name, 36, i); go(54, 'none'); }}
            style={{ position: 'absolute', left: (i % 4) * step, top: Math.floor(i / 4) * 105, width: 76, height: 93, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ position: 'relative', width: 72, height: 72, display: 'grid', placeItems: 'center' }}>
              <img alt="" src={A + it.img + '.png'} style={{ width: 68, height: 68, objectFit: 'contain', opacity: it.locked ? 0.35 : 1, filter: it.dim || 'none' }} />
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
