// 네이버 클립 영상 보기에서 열리는 두 시트. 원본 캡처 12번(댓글 시트)과 16번(더보기 메뉴)을 390 x 844 기준으로 재서 같은 자리와 크기로 만든다.
// 값은 artifacts/21_네이버클립_미러링/기준_390x844 의 기준 이미지에서 쟀다(자리는 css px, 색은 픽셀 샘플).
import React, { useEffect, useRef, useState } from 'react';
import { pic } from './ClipKit.jsx';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const SHEET = '#1F1F1F';
const TXT = '#F8F8F8';
const BODY = '#EDEDEE';
const SUB = '#9A9A9A';
const SUB2 = '#A7A7A7';
const GREEN = '#00C859';
const BLUE = '#4F96FF';
const TILE = '#2D2D2D';
const ROW = '#282828';
const HANDLE = '#505050';

export const CSS = `
@keyframes cpPop{0%{transform:scale(1)}40%{transform:scale(1.28)}100%{transform:scale(1)}}
@keyframes cpAgent{0%{opacity:0;transform:translateX(64px) scale(.7)}55%{opacity:1;transform:translateX(-9px) scale(1.07)}78%{transform:translateX(3px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@keyframes cpToast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
.cp-pop{animation:cpPop 360ms cubic-bezier(.2,0,0,1) both;transform-origin:50% 55%}
.cp-agent{animation:cpAgent 640ms cubic-bezier(.2,.9,.3,1) both}
.cp-btn{position:absolute;border:0;padding:0;margin:0;background:transparent;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent}
.cp-btn:focus-visible{box-shadow:0 0 0 2px #36D2FF}
.cp-row{border:0;background:transparent;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT}}
.cp-row.is-down{background:rgba(255,255,255,.06)}
.cp-reply{transition:clip-path 260ms cubic-bezier(.2,0,0,1),opacity 200ms cubic-bezier(.2,0,0,1)}
@keyframes cpIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.cp-new{animation:cpIn 240ms cubic-bezier(.2,0,0,1) both}
.cp-hide{scrollbar-width:none}
.cp-hide::-webkit-scrollbar{display:none}
.cp-imm > [data-figma]:not([data-figma^="영상"]):not([data-figma^="Scrim"]):not([data-figma^="아래 검정"]){opacity:0 !important;pointer-events:none;transition:opacity 260ms cubic-bezier(.2,0,0,1)}
.cp-imm > [data-figma]{transition:opacity 260ms cubic-bezier(.2,0,0,1)}
@media (prefers-reduced-motion:reduce){.cp-pop,.cp-agent{animation-duration:1ms}.cp-btn{transition:none}}
`;

// ---------- 작은 부품 ----------
const Svg = ({ children, size = 24, stroke = TXT, fill = 'none', sw = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>{children}</svg>
);
const HEART_PATH = 'M12 21C5.5 16 2 12.4 2 8.6C2 5.8 4.2 3.8 6.7 3.8C8.9 3.8 10.9 5.1 12 7.1C13.1 5.1 15.1 3.8 17.3 3.8C19.8 3.8 22 5.8 22 8.6C22 12.4 18.5 16 12 21Z';
const Heart = ({ on, size = 17, off = SUB }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={on ? '#FF3B5C' : 'none'} stroke={on ? '#FF3B5C' : off} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d={HEART_PATH} />
  </svg>
);

// ---------- 댓글 데이터(시트를 닫았다 열어도 남는다) ----------
const SEED = [
  { id: 1, name: '먼작귀더쿠', av: 'av2', text: '와 이번꺼 공감 100000% 나도 꼭 저렇게\n여우짓하는 애 있었는데 손절한지 4년됨', when: '3일 전', order: 3, likes: 355 },
  { id: 2, name: '럭키비키', av: 'av3', text: '얼굴 화끈거리는 마음 너무 알아서 두 번 봤어', when: '2일 전', order: 2, likes: 128 },
  { id: 3, name: '모카빵굽는밤', av: null, text: '일단 그 친구한테 바로 따지지 말고 마음 정리부터 해 보자', when: '1일 전', order: 1, likes: 76 },
  { id: 4, name: '새벽세시', av: null, text: '이럴 땐 드르륵에서 비슷한 고민 방을 열어 보는 것도 방법이야', when: '20시간 전', order: 0, likes: 41 },
];
// 클립마다 따로 둔다(첫 클립은 피그마 댓글 그대로, 다른 클립도 같은 댓글로 시작해 공감과 답글은 따로 기억한다).
const store = {};
const listOf = (id) => { if (!store[id]) store[id] = SEED.map((c) => ({ ...c, replies: [] })); return store[id]; };
let liked = new Set();
let nextId = 100;
const extra = (id) => { const l = listOf(id); return l.length - SEED.length + l.reduce((a, c) => a + c.replies.length, 0); };
// 오른쪽 댓글 수(187)에 새로 쓴 댓글과 답글을 더한 값.
export const commentTotal = (id = 's0') => 187 + extra(id);
// 클립의 댓글 수(첫 클립은 피그마 187, 다른 클립은 clipState.js 값)에 새로 쓴 댓글과 답글을 더한 값.
export const commentCount = (c) => (c ? c.comments : 187) + extra(c ? c.id : 's0');

const Avatar = ({ c, size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#3A3A3C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D1D1D6', fontSize: 13, fontWeight: 700 }}>
    {c.av ? <img src={pic(c.av)} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : c.name.slice(0, 1)}
  </div>
);

// 댓글 시트가 올라올 때: 영상이 위쪽 카드(110.5, 0, 169 x 299)로 줄어들고 바탕은 검정이 된다.
// 영상 클립(mirror가 있을 때)은 카드 자리에서도 영상이 그대로 재생된다. 소리는 뒤의 원래 영상이 계속 내고,
// 카드 안 영상은 무음으로 원래 영상의 시간과 재생 상태를 매 프레임 따라간다(0.25초 넘게 벌어지면 맞춘다).
function MirrorVideo({ mirror, img }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const step = () => {
      const m = ref.current;
      const v = mirror.current;
      if (m && v) {
        if (m.src !== v.currentSrc && v.currentSrc) m.src = v.currentSrc;
        if (m.readyState >= 1 && Math.abs(m.currentTime - v.currentTime) > 0.25) m.currentTime = v.currentTime;
        if (v.paused && !m.paused) m.pause();
        else if (!v.paused && m.paused) m.play().catch(() => {});
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); const m = ref.current; if (m) { m.pause(); m.removeAttribute('src'); m.load(); } };
  }, [mirror]);
  const poster = mirror.current ? mirror.current.poster : undefined;
  return (
    <>
      <img src={pic(img)} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <video ref={ref} data-figma="카드 영상" muted playsInline preload="auto" poster={poster} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </>
  );
}

function CardBackdrop({ open, onClose, img = 'card', mirror }) {
  return (
    <div onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: 'absolute', inset: 0, zIndex: 60, background: open ? '#000' : 'rgba(0,0,0,0)', transition: 'background-color 320ms cubic-bezier(.2,0,0,1)' }}>
      <div style={{ position: 'absolute', left: open ? 110.5 : 0, top: 0, width: open ? 169 : 390, height: open ? 299 : 750, borderRadius: open ? '0 0 14px 14px' : 0, overflow: 'hidden', transition: 'all 380ms ' + EASE, opacity: open ? 1 : 0 }}>
        {mirror ? <MirrorVideo mirror={mirror} img={img} /> : <img src={pic(img)} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      </div>
    </div>
  );
}
// 더보기 메뉴가 올라올 때: 영상은 그대로 두고 위에 반투명 검정을 깐다(원본 16번).
function DimBackdrop({ open, onClose }) {
  return (
    <div onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.5)', opacity: open ? 1 : 0, transition: 'opacity 320ms cubic-bezier(.2,0,0,1)' }} />
  );
}

// 아래에서 올라오는 시트 틀. 손잡이를 아래로 끌면 닫힌다.
function Sheet({ open, top, onClose, children }) {
  const [dy, setDy] = useState(0);
  const drag = useRef(null);
  const down = (e) => { drag.current = { y: e.clientY, id: e.pointerId }; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* 무시 */ } };
  const move = (e) => { if (drag.current) setDy(Math.max(0, e.clientY - drag.current.y)); };
  const up = () => { if (!drag.current) return; const d = dy; drag.current = null; setDy(0); if (d > 70) onClose(); };
  return (
    <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 0, top, bottom: 0, width: 390, zIndex: 61, background: SHEET, borderRadius: '24px 24px 0 0', transform: open ? 'translateY(' + dy + 'px)' : 'translateY(100%)', transition: drag.current ? 'none' : 'transform 360ms ' + EASE, fontFamily: FONT, color: TXT, overflow: 'hidden' }}>
      <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 32, touchAction: 'none', cursor: 'grab' }}>
        <div style={{ position: 'absolute', left: 175, top: 12, width: 40, height: 4, borderRadius: 2, background: HANDLE }} />
      </div>
      {children}
    </div>
  );
}

const EMOJIS = ['👍', '❤️', '🤣', '🎉', '🥰', '👏', '😄', '🔥'];
const LOGO = "<svg style=\"display:block\" width=\"30\" height=\"11\" viewBox=\"0 0 30 11\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0.849453 10.5867L0.518302 10.7057C0.432586 10.604 0.634544 10.5254 0.504429 10.328L0.752328 10.0564L0.292606 10.3092L0.245121 10.3379C0.234947 10.3441 0.209665 10.3148 0.196098 10.3012L0.271024 10.0367C0.167733 10.1091 0.078316 10.1511 0 10.057L1.24936 7.45809L2.80396 3.83613L2.91034 3.55555L2.84435 3.41958C2.75524 3.45658 2.69111 3.46583 2.62451 3.38658L3.80141 1.25571C3.83379 1.23259 3.89484 1.19404 3.92043 1.20823C3.94602 1.22241 3.97623 1.26249 4.01138 1.30381C4.08415 1.38953 4.19392 1.16074 4.26606 1.21655C4.34685 1.27914 4.16832 1.38182 4.13441 1.54554L4.2821 1.42683C4.29628 1.41543 4.36936 1.39785 4.37182 1.41666L4.38446 1.51162L4.4378 1.67319L4.76957 1.11912L4.86947 1.07904C4.8966 1.06825 4.95673 1.1222 4.95981 1.15119L4.9706 1.25694C4.97461 1.29579 5.16331 1.29302 5.14573 1.34389L5.11182 1.44318L5.17626 1.51903C5.19445 1.5403 5.17472 1.59981 5.16392 1.66271C5.33196 1.60443 5.37328 1.43362 5.59404 1.5107L7.93736 0.81264C7.97806 0.800615 8.06347 0.805856 8.09029 0.835764L8.58886 1.38706L8.52812 1.53937L8.76708 1.56743C8.81333 1.57298 8.88671 1.58902 8.92186 1.61769C8.96318 1.6513 8.96811 1.87607 8.99617 1.85757L8.8901 1.92818L9.01806 2.0623C9.26627 2.0142 9.12937 2.27844 9.41581 2.43847C9.47223 2.42613 9.54222 2.41103 9.57028 2.42829C9.6523 2.47793 9.51262 2.621 9.57799 2.67927C9.62917 2.72491 9.69207 2.6025 9.76576 2.63395C9.78519 2.64227 9.81109 2.68082 9.81756 2.70117L9.88262 2.90651L9.26133 4.92423L8.72669 6.63115L8.45289 6.99221C8.40726 7.05264 8.3977 7.10135 8.3533 7.15377L8.07333 7.48307L8.46029 7.32089L8.40356 7.58204C8.39215 7.63446 8.38197 7.69027 8.33171 7.71678L7.80724 7.99151L6.32818 8.83602L1.91227 10.5158L0.818003 10.9845C0.798886 10.9928 0.761887 10.9999 0.744928 10.9987C0.72797 10.9974 0.703612 10.9555 0.706387 10.9379L0.730434 10.7791C0.741842 10.7027 0.768053 10.6712 0.848836 10.5867H0.849453ZM5.86569 6.90433L6.70219 6.44153L7.27692 4.80552L7.5874 3.85679L6.7765 2.9355L4.97276 3.46151L3.70737 6.67031L3.09163 8.19038L4.78591 7.52315L5.86569 6.90433Z\" fill=\"#36D2FF\"/><path d=\"M28.5012 8.72145L28.9338 9.02269C28.9637 9.04365 28.9591 9.12043 28.9375 9.14078L28.7763 9.2934C28.8231 9.34243 28.7747 9.44942 28.7297 9.44202L28.5407 9.41057L28.6702 9.56874L28.6132 9.83576C28.5962 9.86844 28.4914 9.87831 28.4374 9.84501L24.2324 7.24793L23.1958 10.2199C23.1831 10.2563 23.1424 10.306 23.115 10.3137C23.025 10.339 22.9821 10.2415 22.8505 10.2597C22.8187 10.264 22.7299 10.2304 22.7379 10.195L22.8668 9.62085L22.6827 9.89866C22.6531 9.94336 22.5295 9.96649 22.4755 9.94645L22.4216 9.57244L22.2107 9.8743C22.0214 9.88046 21.8234 10.013 21.8148 9.95446L21.8012 9.86135C21.6803 9.94336 21.4559 10.0214 21.3541 9.94583L21.6547 9.06246L24.0983 2.47775L24.3385 1.79418C24.2675 1.83704 24.1285 1.91535 24.0742 1.8247C24.0391 1.72912 24.0964 1.56756 24.1254 1.46612C24.0755 1.44546 23.9617 1.37547 23.9817 1.31411C24.0098 1.22839 24.1054 1.16734 24.1689 1.1066L24.0129 0.920062C23.9962 0.900021 24.052 0.826021 24.0718 0.807213L24.9613 0.317892L25.3088 0.200727L25.845 0.00308689C25.8662 -0.00462138 25.9399 0.00216141 25.9427 0.0228196C25.9455 0.0434777 25.9418 0.0891112 25.9344 0.110078L25.8554 0.330225L25.9812 0.365067C26.0136 0.374009 25.9908 0.456949 25.9868 0.496724L26.3568 0.192094C26.4101 0.325909 26.4197 0.494566 26.3956 0.588915L26.3673 0.641331C26.3636 0.648423 26.3617 0.66014 26.3694 0.66014C26.3812 0.66014 26.4212 0.658907 26.4308 0.665073L26.617 0.782238L25.3433 4.09494L25.1537 4.61325L25.6782 4.27593L27.7088 2.99451C27.8722 2.89153 28.0286 2.81167 28.2126 2.75987C28.2669 2.84497 28.2274 3.06389 28.1448 3.15238L28.2956 3.21466L28.2015 3.43851L28.6936 3.2051C28.7794 3.1644 28.726 3.42556 28.7371 3.43388L28.8333 3.50665C28.8466 3.53594 28.7932 3.61457 28.7562 3.64971L28.6955 3.70768C28.6804 3.72186 28.7094 3.76565 28.7291 3.79771L28.5984 3.9636L28.9298 3.88158L28.8774 4.24171L27.2519 5.163L25.6412 6.06179L28.6529 7.74281L29.1524 8.05083L29.0124 8.25741C29.0041 8.26974 28.9838 8.30644 28.9699 8.30428L28.8771 8.28886L28.985 8.49143C28.923 8.59472 28.813 8.5568 28.7032 8.49914C28.7408 8.58887 28.7843 8.67736 28.7303 8.74211L28.5012 8.72268V8.72145Z\" fill=\"#36D2FF\"/><path d=\"M9.43635 9.9226C9.41693 9.90996 9.36759 10.1119 9.23223 10.0811L9.19153 9.72928C9.12864 9.80482 9.05094 9.96762 8.95813 9.99291C8.84867 10.0228 8.77313 10.0262 8.6831 10.0873C8.66367 10.1005 8.61804 10.1267 8.60139 10.1159L8.52893 10.0688L8.28597 10.136C8.23663 10.1495 8.15184 10.1341 8.12903 10.0869L8.35503 9.50636L8.97539 8.1087L9.81806 6.18564C9.69874 6.23343 9.5862 6.2806 9.47428 6.20198L9.564 5.75798L9.49277 5.55664L9.69288 5.39477C9.64416 5.29672 9.60624 5.21686 9.59391 5.10494C10.16 4.76454 10.7357 4.50493 11.3662 4.31099C11.3983 4.30112 11.4763 4.34182 11.4667 4.37142L11.397 4.58602C12.2298 4.20091 13.0537 3.84911 13.9173 3.55095C13.9488 3.54016 13.9975 3.54016 14.0166 3.55188C14.0878 3.59504 13.9981 3.69371 14.0061 3.82598C14.0101 3.89443 14.0046 3.94037 13.9972 3.99741L14.0052 4.1673L14.4171 3.98385C14.5192 4.14788 14.3345 4.31314 14.4538 4.50215L14.2346 4.63196C14.2657 4.70812 14.2642 4.77533 14.2617 4.85858C14.2593 4.94183 14.267 4.99702 14.1908 5.05314L12.8841 5.71143L11.5281 6.34998L10.2494 9.58283L9.99659 10.2016C9.94941 10.3173 9.84119 10.2081 9.66852 10.2359L9.65064 9.83411C9.62135 9.88252 9.54426 9.96731 9.49462 9.95837C9.48321 9.95621 9.44591 9.92908 9.43635 9.92291V9.9226Z\" fill=\"#36D2FF\"/><path d=\"M14.0323 9.58228C14.0234 9.59338 13.9771 9.60849 13.9691 9.5977C13.9583 9.58351 13.9367 9.54436 13.934 9.52647L13.9124 9.38032C13.827 9.38094 13.789 9.37539 13.744 9.3609C13.6632 9.3979 13.5729 9.42596 13.4782 9.42534L13.2578 9.4238L12.9781 9.43675C12.9482 9.43798 12.9084 9.43397 12.8918 9.41856C12.8751 9.40314 12.8764 9.3387 12.8872 9.31557L13.7795 7.39652L14.4322 5.97203C14.3215 6.00133 14.2124 6.03863 14.1535 5.97388C14.0607 5.87183 14.3539 5.62671 14.1994 5.32547L14.3869 5.18333L14.3453 4.90151L14.7711 4.62956C15.0874 4.4273 15.4278 4.2793 15.787 4.16768L16.1894 4.04281C16.1777 4.16429 16.1573 4.22102 16.1219 4.33326C16.8116 3.94846 17.4912 3.58771 18.2077 3.27137C18.2965 3.23221 18.3952 3.21957 18.4821 3.22635L18.4522 3.52728L18.3622 3.62564L18.5836 3.68299L18.4954 3.86244L18.7729 3.78289C18.8497 3.89296 18.6835 4.03973 18.8256 4.26173L18.628 4.36286C18.6739 4.54446 18.6933 4.75536 18.5765 4.81672L17.1042 5.58693L16.104 6.09105L14.981 8.69583L14.571 9.56162C14.5586 9.58783 14.5065 9.63747 14.4806 9.64148C14.4504 9.6458 14.3952 9.62421 14.357 9.62113L14.2753 9.61466C14.2531 9.6128 14.2303 9.55422 14.2296 9.52986L14.2235 9.34271L14.0323 9.58166V9.58228Z\" fill=\"#36D2FF\"/><path d=\"M18.635 9.14916L18.4571 9.39213C18.4423 9.41217 18.397 9.43653 18.3754 9.43622C18.3538 9.43591 18.3325 9.37856 18.3353 9.35482C18.3455 9.26664 18.3184 9.22655 18.2345 9.19079L18.2456 9.00579C18.1673 9.10106 18.088 9.21299 18.0122 9.27096L17.7276 9.27712C17.657 9.27866 17.5781 9.25739 17.4988 9.27126C17.4122 9.28637 17.3348 9.29593 17.274 9.22286L17.8355 8.00556L18.8339 5.85249C18.7411 5.87993 18.6067 5.90953 18.5487 5.84632C18.5163 5.61323 18.7494 5.46554 18.6113 5.2275C18.6446 5.16738 18.7389 5.09061 18.8114 5.0422L18.7587 4.74312C19.3183 4.41875 19.8754 4.14372 20.4927 3.94269C20.5263 3.93159 20.612 3.95934 20.6111 3.98925L20.5433 4.19922C21.2524 3.81011 21.9594 3.44659 22.6991 3.1176C22.7608 3.09016 22.8718 3.08553 22.9032 3.12099L22.8709 3.37536L22.7697 3.50794L22.9954 3.56252L22.8792 3.76324L23.1672 3.68493C23.2045 3.67475 23.2301 3.77188 23.2144 3.80363C23.0926 4.04999 23.3361 4.07126 23.1339 4.18535L23.0432 4.23653C23.0238 4.24763 23.0827 4.31423 23.0815 4.33766L23.0697 4.61146L22.0504 5.17201L20.5001 5.95208L19.8014 7.57174L19.1055 9.14608L18.9483 9.4208C18.936 9.44239 18.8968 9.49419 18.8749 9.49141L18.7627 9.47692C18.7294 9.4726 18.6276 9.45811 18.6285 9.42142L18.6363 9.14886L18.635 9.14916Z\" fill=\"#36D2FF\"/></svg>";
const CHEV = "<svg style=\"display:block\" width=\"7\" height=\"11\" viewBox=\"0 0 7 11\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_1910_11693)\"><path d=\"M1 1L5.5 5.5L1 10\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke=\"#E7E0FA\"/></g><defs><clipPath id=\"clip0_1910_11693\"><rect width=\"7\" height=\"11\" fill=\"white\"/></clipPath></defs></svg>";
const EMOJI_X = [42, 85, 129, 172, 216, 260, 303, 347];

// 캡션의 더보기를 누르면 나오는 설명 부분(원본 15번): 만든 사람, 글, 재생수, AI 활용 칩, 구분선 순서다. 지금 보고 있는 클립의 값을 넣는다.
function InfoBlock({ clip, following, onFollow }) {
  const c = clip || { av: 'av0', creator: '흔한 웹드', badge: true, title: '베프가 내 비밀을 까발린다 ep.01', tags: '#친구관계 #연애', plays: '2.4만', when: '3일 전', id: 's0' };
  return (
    <div style={{ position: 'relative', height: 182, margin: '10px 0 0' }}>
      <div style={{ position: 'absolute', left: 20, top: 0, width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
        <img src={pic(c.av)} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', left: 62, top: 0, height: 32, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.04em', color: '#F6F6F6' }}>{c.creator}</span>
        {c.badge ? <svg width="13" height="13" viewBox="0 0 14 14" style={{ display: 'block' }}><circle cx="7" cy="7" r="6.5" fill="#F9A825" /><path d="M4 7.2l2 2L10 5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
        <span className="ck-press" role="button" tabIndex={0} aria-pressed={!!following} onClick={(e) => { e.stopPropagation(); if (onFollow) onFollow(); }}
          style={{ marginLeft: 6, height: 26, padding: '0 9px', display: 'flex', alignItems: 'center', border: '1px solid #343436', borderRadius: 8, fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.04em', color: '#EFEFEF', background: following ? '#141414' : 'transparent', cursor: 'pointer' }}>{following ? '팔로잉' : '팔로우'}</span>
      </div>
      <p style={{ position: 'absolute', left: 20, top: 43, margin: 0, fontSize: 16.5, lineHeight: '22px', letterSpacing: '-0.04em', color: '#F5F5F5', whiteSpace: 'pre' }}>{c.title}</p>
      <p style={{ position: 'absolute', left: 20, top: 62, margin: 0, fontSize: 16.5, fontWeight: 700, lineHeight: '22px', letterSpacing: '-0.04em', color: '#F5F5F5', whiteSpace: 'pre' }}>{c.tags}</p>
      <p style={{ position: 'absolute', left: 20, top: 90, margin: 0, fontSize: 15, lineHeight: '20px', letterSpacing: '-0.04em', color: SUB, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'pre' }}>{'재생수 ' + c.plays}<i style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: SUB, display: 'block' }} />{c.when}</p>
      {c.id === 's0' ? <div style={{ position: 'absolute', left: 20, top: 127, width: 52, height: 29, borderRadius: 8, border: '1px solid #343436', background: ROW, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, letterSpacing: '-0.04em', color: '#EDEDED' }}>AI 활용</div> : null}
      <div style={{ position: 'absolute', left: 0, top: 181, width: 390, height: 1, background: '#292929' }} />
    </div>
  );
}

const ME = '새벽2시';
const SendIcon = ({ on, size = 19 }) => <Svg size={size} stroke={on ? '#000' : '#6E6E6E'} sw={2.2}><path d="M12 19V5M5 12l7-7 7 7" /></Svg>;

// 답글 입력칸. 열릴 때 clip-path와 opacity로 위에서 아래로 펼쳐지고, "@이름 "이 들어간 채 포커스된다.
function ReplyBox({ open, name, onSend, onCancel, scroller }) {
  const [v, setV] = useState('@' + name + ' ');
  const [on, setOn] = useState(false);
  const box = useRef(null);
  useEffect(() => { if (!open) { setOn(false); return undefined; } const r = requestAnimationFrame(() => setOn(true)); return () => cancelAnimationFrame(r); }, [open]);
  const input = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    setV('@' + name + ' ');
    const t = window.setTimeout(() => {
      const el = input.current;
      if (!el) return;
      try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
      const n = el.value.length;
      try { el.setSelectionRange(n, n); } catch (e) { /* 무시 */ }
      // 입력칸이 아래 입력 줄에 가리지 않게 목록을 그만큼 올린다.
      const sc = scroller && scroller.current;
      if (sc && box.current) {
        const r = box.current.getBoundingClientRect();
        const sr = sc.getBoundingClientRect();
        const s = sr.height / sc.offsetHeight || 1;
        const over = (r.bottom - sr.bottom) / s + 12;
        if (over > 0) sc.scrollTo({ top: sc.scrollTop + over, behavior: 'smooth' });
      }
    }, 30);
    return () => window.clearTimeout(t);
  }, [open, name]);
  const body = v.replace(new RegExp('^@' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*'), '').trim();
  const send = () => { if (!body) return; onSend(v.trim()); };
  if (!open) return null;
  return (
    <div ref={box} className="cp-reply" style={{ margin: '2px 52px 8px 0', height: 40, position: 'relative', clipPath: on ? 'inset(0 0 0 0 round 20px)' : 'inset(0 0 100% 0 round 20px)', opacity: on ? 1 : 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: ROW }} />
      <input ref={input} value={v} onChange={(e) => setV(e.target.value)} enterKeyHint="send" aria-label={name + '님에게 답글'}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } if (e.key === 'Escape') onCancel(); }}
        style={{ position: 'absolute', left: 14, top: 0, width: 'calc(100% - 58px)', height: 40, border: 0, outline: 'none', background: 'transparent', color: TXT, fontFamily: FONT, fontSize: 14.5, letterSpacing: '-0.04em', padding: 0 }} />
      <button type="button" aria-label="답글 보내기" onClick={(e) => { e.stopPropagation(); send(); }} className="cp-btn" style={{ right: 5, top: 5, width: 30, height: 30, borderRadius: '50%', background: body ? '#36D2FF' : '#3A3A3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SendIcon on={!!body} size={16} />
      </button>
    </div>
  );
}

// ---------- 댓글 시트(원본 12번) ----------
export function CommentSheet({ open, onClose, onCount, say, info, clip, following, onFollow, mirror }) {
  const id = clip ? clip.id : 's0';
  const [sort, setSort] = useState('like');
  const [, force] = useState(0);
  const [draft, setDraft] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [fresh, setFresh] = useState(null);
  const scroller = useRef(null);
  const bump = () => force((k) => k + 1);
  const comments = listOf(id);
  const list = comments.slice().sort((a, b) => (sort === 'like' ? b.likes - a.likes : b.order - a.order));
  const add = (text) => {
    store[id] = [{ id: nextId++, name: ME, av: null, text, when: '방금 전', order: 99 + nextId, likes: 0, replies: [] }, ...comments];
    bump();
    onCount(commentCount(clip));
    say('댓글을 남겼어요');
  };
  const send = () => {
    const v = draft.trim();
    if (!v) return;
    setDraft('');
    add(v);
  };
  const reply = (c, text) => {
    const r = { id: nextId++, name: ME, av: null, text, when: '방금 전', likes: 0 };
    c.replies.push(r);
    setReplyTo(null);
    setFresh(r.id);
    bump();
    onCount(commentCount(clip));
    say('답글을 남겼어요');
  };
  const toggle = (c) => {
    if (liked.has(c.id)) { liked.delete(c.id); c.likes -= 1; } else { liked.add(c.id); c.likes += 1; }
    bump();
  };
  const opt = (on) => ({ border: 0, background: 'transparent', padding: 0, margin: 0, cursor: 'pointer', fontFamily: FONT, fontSize: 15, lineHeight: '22px', letterSpacing: '-0.04em', fontWeight: 500, color: on ? '#F8F8F8' : SUB2, outline: 'none', WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center', gap: 7.5, transition: 'color 160ms' });
  const dot = (on) => ({ width: 5, height: 5, borderRadius: '50%', background: on ? '#F8F8F8' : SUB2, display: 'block' });
  const LikeBtn = ({ c, top, small }) => (
    <button type="button" aria-label="공감" aria-pressed={liked.has(c.id)} onClick={() => toggle(c)} className="cp-btn" style={{ right: 14, top, width: 44, height: small ? 46 : 54, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.3 }}>
      <span key={liked.has(c.id) ? 'on' : 'off'} className={liked.has(c.id) ? 'cp-pop' : undefined} style={{ display: 'block', lineHeight: 0 }}><Heart on={liked.has(c.id)} size={small ? 15 : 17} off="#C4C4C4" /></span>
      <span style={{ fontSize: small ? 13 : 14, lineHeight: '19px', color: liked.has(c.id) ? '#FF3B5C' : '#CACACA', fontWeight: 400 }}>{c.likes}</span>
    </button>
  );
  return (
    <>
      <CardBackdrop open={open} onClose={onClose} img={clip ? clip.back : 'card'} mirror={mirror} />
      <Sheet open={open} top={310} onClose={onClose}>
        {!info ? (<>
        <p style={{ position: 'absolute', left: 20, top: 38, margin: 0, fontSize: 17, fontWeight: 500, lineHeight: '24px', letterSpacing: '-0.04em', color: '#F9F9F9' }}>{'댓글 ' + commentCount(clip).toLocaleString('en-US')}</p>
        <div style={{ position: 'absolute', right: 21, top: 38, display: 'flex', gap: 12.5 }}>
          <button type="button" onClick={() => setSort('like')} style={opt(sort === 'like')} aria-pressed={sort === 'like'}><i style={dot(sort === 'like')} />순공감순</button>
          <button type="button" onClick={() => setSort('new')} style={opt(sort === 'new')} aria-pressed={sort === 'new'}><i style={dot(sort === 'new')} />최신순</button>
        </div>
        </>) : null}
        <div ref={scroller} className="cp-hide" style={{ position: 'absolute', left: 0, top: info ? 30 : 62, width: 390, bottom: 142, overflowY: 'auto', overscrollBehavior: 'contain', touchAction: 'pan-y' }} onWheel={(e) => e.stopPropagation()}>
          {info ? <InfoBlock clip={clip} following={following} onFollow={onFollow} /> : (<>
          <div style={{ margin: '25px 0 0 15px', width: 359, height: 67, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 6, background: '#36D2FF' }} />
            <p style={{ position: 'absolute', left: 16, top: 10, margin: 0, fontSize: 15.5, fontWeight: 800, lineHeight: '22px', letterSpacing: '-0.04em', color: '#000000', whiteSpace: 'pre', textShadow: '-2px 0 #fff, 2px 0 #fff, 0 -2px #fff, 0 2px #fff, -1.4px -1.4px #fff, 1.4px 1.4px #fff, -1.4px 1.4px #fff, 1.4px -1.4px #fff' }}>드르륵 칵, 잼컨 썰 여기 다 있네</p>
            <div style={{ position: 'absolute', left: 16, top: 36, height: 19, padding: '0 9px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 4, borderRadius: 5, background: '#222628', overflow: 'hidden' }}>
              <span style={{ width: 29.2, height: 11, lineHeight: 0, flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: LOGO }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, lineHeight: '16px', letterSpacing: '-0.04em', color: '#E7E0FA', whiteSpace: 'pre' }}>지금 다운받기</span>
              <span style={{ width: 7, height: 11, lineHeight: 0, flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: CHEV }} />
            </div>
            <img src={pic('cmt-drrra')} alt="" draggable={false} style={{ position: 'absolute', left: 216, top: -18, width: 55.3, height: 55.3, display: 'block' }} />
            <img src={pic('cmt-squid')} alt="" draggable={false} style={{ position: 'absolute', left: 319, top: 8, width: 56.4, height: 56.4, display: 'block' }} />
            <i style={{ position: 'absolute', left: 259, top: 50, width: 66, height: 12, borderRadius: '50%', background: '#000', opacity: 0.2, filter: 'blur(5px)', mixBlendMode: 'multiply', display: 'block' }} />
            <img src={pic('cmt-chair')} alt="" draggable={false} style={{ position: 'absolute', left: 242, top: -35, width: 110.2, height: 110.2, display: 'block' }} />
          </div>
          <div style={{ margin: '16px 20px 0', height: 42, borderRadius: 8, background: ROW, position: 'relative' }}>
            <svg width="20" height="17" viewBox="0 0 20 17" style={{ position: 'absolute', left: 14, top: 12 }} fill="none"><path d="M3 11.5C3 7.4 6.2 4.6 10 4.6C13.8 4.6 17 7.4 17 11.5V12.5H3Z" fill={GREEN} /><circle cx="7.2" cy="9.6" r="1.4" fill={ROW} /><circle cx="12.8" cy="9.6" r="1.4" fill={ROW} /><path d="M10 4.6V2.2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="1.9" r="1.2" fill={GREEN} /></svg>
            <p style={{ position: 'absolute', left: 39, top: 10, margin: 0, fontSize: 15, fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.04em', color: '#E9E9E9', whiteSpace: 'pre' }}><span style={{ color: GREEN }}>클린봇</span>이 악성댓글을 감지합니다.</p>
            <p style={{ position: 'absolute', right: 13, top: 10, margin: 0, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#A2A2A2', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#A2A2A2"><path d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.6a.5.5 0 0 0 .1-.6l-1.9-3.3a.5.5 0 0 0-.6-.2l-2.4 1a7.6 7.6 0 0 0-1.7-1l-.4-2.5a.5.5 0 0 0-.5-.4h-3.8a.5.5 0 0 0-.5.4l-.4 2.5a7.6 7.6 0 0 0-1.7 1l-2.4-1a.5.5 0 0 0-.6.2L2.5 8.8a.5.5 0 0 0 .1.6l2 1.6a7.5 7.5 0 0 0 0 2l-2 1.6a.5.5 0 0 0-.1.6l1.9 3.3c.1.2.4.3.6.2l2.4-1c.5.4 1.1.7 1.7 1l.4 2.5c0 .2.3.4.5.4h3.8c.2 0 .5-.2.5-.4l.4-2.5c.6-.3 1.2-.6 1.7-1l2.4 1c.2.1.5 0 .6-.2l1.9-3.3a.5.5 0 0 0-.1-.6ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" /></svg>설정
            </p>
          </div>
          </>)}
          {list.map((c, i) => (
            <div key={c.id} style={{ position: 'relative', margin: (info && i === 0 ? 24 : 20) + 'px 0 0', padding: '0 0 0 19px' }}>
              <div style={{ display: 'flex', gap: 11 }}>
                <Avatar c={c} />
                <div style={{ flex: 1, minWidth: 0, paddingRight: 52 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.04em', color: '#F6F6F6' }}>{c.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 15, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.04em', color: BODY, wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>{c.text}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 13, lineHeight: '17px', color: SUB }}>{c.when}</p>
                  <button type="button" className="cp-row" aria-expanded={replyTo === c.id} onClick={(e) => { e.stopPropagation(); setReplyTo((r) => (r === c.id ? null : c.id)); }} style={{ display: 'block', height: 34, padding: 0, fontSize: 14, color: '#EBEBEB', fontWeight: 400, letterSpacing: '-0.04em' }}>답글 쓰기</button>
                </div>
              </div>
              <div style={{ paddingLeft: 43 }}>
                <ReplyBox open={replyTo === c.id} name={c.name} scroller={scroller} onSend={(t) => reply(c, t)} onCancel={() => setReplyTo(null)} />
                {c.replies.map((r) => (
                  <div key={r.id} className={fresh === r.id ? 'cp-new' : undefined} style={{ position: 'relative', display: 'flex', gap: 9, margin: '4px 0 6px' }}>
                    <Avatar c={r} size={24} />
                    <div style={{ flex: 1, minWidth: 0, paddingRight: 52 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, lineHeight: '19px', letterSpacing: '-0.04em', color: '#F6F6F6' }}>{r.name}</p>
                      <p style={{ margin: '2px 0 0', fontSize: 14.5, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.04em', color: BODY, wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>{r.text}</p>
                      <p style={{ margin: '1px 0 0', fontSize: 12.5, lineHeight: '17px', color: SUB }}>{r.when}</p>
                    </div>
                    <LikeBtn c={r} top={-4} small />
                  </div>
                ))}
              </div>
              <LikeBtn c={c} top={20.65} />
              <div style={{ position: 'absolute', right: 28.5, top: 6.2, width: 16, height: 5, lineHeight: 0 }}>
                <svg width="16" height="5" viewBox="0 0 16 5" fill="#B5B5B5"><circle cx="2" cy="2.5" r="1.5" /><circle cx="8" cy="2.5" r="1.5" /><circle cx="14" cy="2.5" r="1.5" /></svg>
              </div>
            </div>
          ))}
          <div style={{ height: 30 }} />
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: 390, height: 142, background: SHEET, boxShadow: '0 -1px 0 #292929' }}>
          <div style={{ position: 'absolute', left: 19, top: 13, width: 44, height: 44, borderRadius: '50%', background: '#FFFFFF', overflow: 'hidden' }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="#C9C9CE"><circle cx="22" cy="17" r="8" /><path d="M6 44C6 33 13 27 22 27C31 27 38 33 38 44Z" /></svg>
          </div>
          <div style={{ position: 'absolute', left: 70, top: 11, width: 263, height: 45, borderRadius: 22.5, border: '1px solid #343436', boxSizing: 'border-box' }}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} placeholder="힘이 되는 말 한마디 남겨보세요." enterKeyHint="send"
              style={{ position: 'absolute', left: 14, top: 0, width: 200, height: 43, border: 0, outline: 'none', background: 'transparent', color: TXT, fontFamily: FONT, fontSize: 15, letterSpacing: '-0.04em', padding: 0 }} />
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth="1.8" strokeLinecap="round" style={{ position: 'absolute', left: 233, top: 11.5 }}><circle cx="12" cy="12" r="10" /><circle cx="8.6" cy="9.8" r="0.9" fill="#8E8E8E" stroke="none" /><circle cx="15.4" cy="9.8" r="0.9" fill="#8E8E8E" stroke="none" /><path d="M7.5 14.2c1 2 2.8 3 4.5 3s3.5-1 4.5-3" /></svg>
          </div>
          <button type="button" aria-label="보내기" onClick={send} className="cp-btn" style={{ left: 340, top: 19, width: 38, height: 38, borderRadius: '50%', background: draft.trim() ? '#36D2FF' : ROW, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 160ms, transform 110ms' }}>
            <Svg size={19} stroke={draft.trim() ? '#000' : '#6E6E6E'} sw={2.2}><path d="M12 19V5M5 12l7-7 7 7" /></Svg>
          </button>
          {EMOJIS.map((e, i) => (
            <button key={e} type="button" aria-label={'이모지 ' + e} onClick={() => add(e)} className="cp-btn" style={{ left: EMOJI_X[i] - 20, top: 66, width: 40, height: 40 }}><img src={pic('emoji' + (i + 1))} alt="" draggable={false} style={{ position: 'absolute', left: 6, top: 6, width: 28, height: 28, display: 'block' }} /></button>
          ))}
        </div>
      </Sheet>
    </>
  );
}

// ---------- 더보기 메뉴(원본 16번) ----------
const ICONS = {
  full: <><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></>,
  play: <><path d="M12 4.5H6.5A3.5 3.5 0 0 0 3 8v7a3.5 3.5 0 0 0 3.5 3.5H11M12 4.5h5.5A3.5 3.5 0 0 1 21 8v3" /><path d="M9.5 8.5l5 2.8-5 2.8Z" /><path d="M21 14.5v1a3 3 0 0 1-3 3h-4M16 16.5l-2 2 2 2" /></>,
  eyeoff: <><path d="M3 3l18 18M10.6 5.2C11 5.1 11.5 5 12 5c5 0 8.5 4.2 9.5 7-0.4 1.1-1.2 2.4-2.3 3.5M6.5 6.8C4.6 8.2 3.4 10.2 2.5 12c1.2 2.9 4.5 7 9.5 7 1.5 0 2.8-.4 4-1M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7M3 3l18 18" /></>,
  share: <><path d="M21 12L14 5v4C7 9.5 4 13.2 3 19c2.5-3.2 5.5-4.5 11-4.5V19Z" /></>,
  bell: <><path d="M5.5 16.5V12a6.5 6.5 0 0 1 13 0v4.5" /><path d="M3.5 16.5h17a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1Z" /><path d="M9.2 12.2A3 3 0 0 1 12 9.6" /></>,
  chat: <><path d="M12 3C6.5 3 2 6.9 2 11.8C2 14.6 3.4 17 5.7 18.6L4.8 22L9.3 20C10.1 20.1 11 20.2 12 20.2C17.5 20.2 22 16.4 22 11.8C22 6.9 17.5 3 12 3Z" /><circle cx="8" cy="11.8" r="0.9" fill={TXT} stroke="none" /><circle cx="12" cy="11.8" r="0.9" fill={TXT} stroke="none" /><circle cx="16" cy="11.8" r="0.9" fill={TXT} stroke="none" /></>,
  keep: <><path d="M5 21V4.5Q5 3 6.5 3h11Q19 3 19 4.5V21l-6.5-6" /><path d="M5 21L19 5.5" /></>,
};
function Row({ icon, label, tail, color, top, onClick }) {
  return (
    <button type="button" className="cp-row" onClick={onClick} style={{ position: 'absolute', left: 0, top, width: 390, height: 42, display: 'block', textAlign: 'left', color: color || TXT }}>
      <span style={{ position: 'absolute', left: 20, top: 10, lineHeight: 0, width: 22 }}><Svg size={22} stroke={TXT} sw={1.5}>{ICONS[icon]}</Svg></span>
      <span style={{ position: 'absolute', left: 54, top: 10, display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'pre' }}>
        <span style={{ fontSize: 15.5, fontWeight: 600, lineHeight: '22px', letterSpacing: '-0.04em' }}>{label}</span>
        {tail ? (
          <>
            <i style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: SUB, display: 'block' }} />
            <span style={{ fontSize: 14.5, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.04em', color: '#AEAEAE' }}>{tail}</span>
          </>
        ) : null}
      </span>
    </button>
  );
}
export function MoreSheet({ open, onClose, stats, liked: isLiked, saved, onAction, loop = true }) {
  const Tile = ({ x, w, icon, text, on, onClick }) => (
    <button type="button" className="cp-btn" onClick={onClick} style={{ left: x, top: 28, width: w, height: 70, borderRadius: 8, background: TILE, display: 'block', fontFamily: FONT }}>
      <span style={{ position: 'absolute', left: 0, top: 11, width: w, display: 'flex', justifyContent: 'center', lineHeight: 0 }}>
        {icon === 'heart' ? <Heart on={on} size={22} off={TXT} /> : <Svg size={22} stroke={on ? TXT : TXT} fill={icon === 'keep' && on ? TXT : 'none'} sw={1.6}>{ICONS[icon]}</Svg>}
      </span>
      <span style={{ position: 'absolute', left: 0, top: 39, width: w, textAlign: 'center', fontSize: 14.5, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.04em', color: '#F2F2F2' }}>{text}</span>
    </button>
  );
  return (
    <>
      <DimBackdrop open={open} onClose={onClose} />
      <Sheet open={open} top={413} onClose={onClose}>
        <Tile x={19.5} w={113.5} icon="heart" text={'좋아요 ' + stats.like} on={isLiked} onClick={() => onAction('like')} />
        <Tile x={138} w={113.5} icon="chat" text={'댓글 ' + stats.comment} onClick={() => onAction('comments')} />
        <Tile x={256.5} w={113.5} icon="keep" text="Keep" on={saved} onClick={() => onAction('save')} />
        <Row icon="full" label="몰입 모드로 보기" top={109} onClick={() => onAction('immersive')} />
        <Row icon="play" label="재생 방식 설정" tail={loop ? '반복 재생' : '한 번만 재생'} top={151} onClick={() => onAction('play')} />
        <div style={{ position: 'absolute', left: 20, top: 204, width: 350, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        <Row icon="eyeoff" label="이 콘텐츠 숨기기" top={214} onClick={() => onAction('hide')} />
        <Row icon="person" label={<><span style={{ color: BLUE }}>웹드플리</span> 콘텐츠 숨기기</>} color={TXT} top={256} onClick={() => onAction('hideCreator')} />
        <Row icon="share" label="공유하기" top={298} onClick={() => onAction('share')} />
        <Row icon="bell" label="신고하기" top={340} onClick={() => onAction('report')} />
      </Sheet>
    </>
  );
}
