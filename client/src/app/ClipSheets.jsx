// 네이버 클립 영상 보기에서 열리는 두 시트: 댓글 시트(캡처 12번 구성)와 더보기 메뉴(캡처 16번 구성).
// 영상은 시트가 올라오면 위쪽 작은 카드로 줄어든다. 값은 기준 캡처(390 x 844)에서 쟀다.
import React, { useRef, useState } from 'react';
import { pic } from './ClipKit.jsx';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.05, 0.7, 0.1, 1)';
const SHEET_BG = '#1C1C1E';
const TXT = '#F2F2F7';
const SUB = '#8E8E93';

export const CSS = `
@keyframes cpPop{0%{transform:scale(1)}40%{transform:scale(1.28)}100%{transform:scale(1)}}
@keyframes cpAgent{0%{opacity:0;transform:translateX(64px) scale(.7)}55%{opacity:1;transform:translateX(-9px) scale(1.07)}78%{transform:translateX(3px) scale(.98)}100%{opacity:1;transform:translateX(0) scale(1)}}
@keyframes cpToast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
.cp-pop{animation:cpPop 360ms cubic-bezier(.2,0,0,1) both;transform-origin:50% 55%}
.cp-agent{animation:cpAgent 640ms cubic-bezier(.2,.9,.3,1) both}
.cp-btn{position:absolute;border:0;padding:0;margin:0;background:transparent;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;transition:transform 110ms cubic-bezier(.2,0,0,1),opacity 110ms}
.cp-btn:active{transform:scale(.92);opacity:.8}
.cp-btn:focus-visible{box-shadow:0 0 0 2px #36D2FF}
.cp-row{border:0;background:transparent;width:100%;display:flex;align-items:center;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT};transition:background-color 120ms}
.cp-row:active{background:rgba(255,255,255,.06)}
.cp-hide{scrollbar-width:none}
.cp-hide::-webkit-scrollbar{display:none}
.cp-imm > [data-figma]:not([data-figma^="영상"]):not([data-figma^="Scrim"]):not([data-figma^="아래 검정"]){opacity:0 !important;pointer-events:none;transition:opacity 260ms cubic-bezier(.2,0,0,1)}
.cp-imm > [data-figma]{transition:opacity 260ms cubic-bezier(.2,0,0,1)}
@media (prefers-reduced-motion:reduce){.cp-pop,.cp-agent{animation-duration:1ms}.cp-btn{transition:none}}
`;

// ---------- 공용 작은 부품 ----------
const Svg = ({ children, size = 24, stroke = TXT, fill = 'none', sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>{children}</svg>
);
const Heart = ({ on, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={on ? '#FF3B5C' : 'none'} stroke={on ? '#FF3B5C' : SUB} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 21C5.5 16 2 12.4 2 8.6C2 5.8 4.2 3.8 6.7 3.8C8.9 3.8 10.9 5.1 12 7.1C13.1 5.1 15.1 3.8 17.3 3.8C19.8 3.8 22 5.8 22 8.6C22 12.4 18.5 16 12 21Z" />
  </svg>
);

// ---------- 댓글 데이터(시트를 닫았다 열어도 남는다) ----------
const SEED = [
  { id: 1, name: '유니별84', av: 'av2', text: '앗.. 이거 완전 내 얘기잖아. 셋이 있는 자리에서 말하는 건 진짜 선 넘었다', when: '3일 전', order: 3, likes: 355 },
  { id: 2, name: 'inflection', av: 'av1', text: '얼굴 화끈거리는 마음 너무 알아서 두 번 봤어', when: '2일 전', order: 2, likes: 128 },
  { id: 3, name: '모카빵굽는밤', av: null, text: '일단 그 친구한테 바로 따지지 말고 마음 정리부터 해 보자', when: '1일 전', order: 1, likes: 76 },
  { id: 4, name: '새벽세시', av: null, text: '이럴 땐 드르륵에서 비슷한 고민 방을 열어 보는 것도 방법이야', when: '20시간 전', order: 0, likes: 41 },
];
let comments = SEED.map((c) => ({ ...c }));
let liked = new Set();
let nextId = 100;
// 오른쪽 댓글 수(187)에 새로 쓴 댓글을 더한 값.
export const commentTotal = () => 187 + comments.length - SEED.length;

const Avatar = ({ c, size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#3A3A3C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D1D1D6', fontSize: 13, fontWeight: 700 }}>
    {c.av ? <img src={pic(c.av)} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : c.name.slice(0, 1)}
  </div>
);

// 시트가 올라올 때 영상이 줄어드는 카드와 어두운 바탕. open이 true가 되면 부드럽게 바뀐다.
function Backdrop({ open, cardTop = 8, cardH = 297, onClose }) {
  const w = Math.round((cardH * 9) / 16 * 10) / 10;
  return (
    <div onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: 'absolute', inset: 0, zIndex: 60, background: open ? '#000' : 'rgba(0,0,0,0)', transition: 'background-color 320ms cubic-bezier(.2,0,0,1)' }}>
      <div style={{ position: 'absolute', left: open ? (390 - w) / 2 : 0, top: open ? cardTop : 0, width: open ? w : 390, height: open ? cardH : 750, borderRadius: open ? 14 : 0, overflow: 'hidden', transition: 'all 380ms ' + EASE, opacity: open ? 1 : 0 }}>
        <img src={pic('vid')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    </div>
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
    <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 0, top, width: 390, height: 844 - top, zIndex: 61, background: SHEET_BG, borderRadius: '24px 24px 0 0', transform: open ? 'translateY(' + dy + 'px)' : 'translateY(100%)', transition: drag.current ? 'none' : 'transform 360ms ' + EASE, fontFamily: FONT, color: TXT, overflow: 'hidden' }}>
      <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 28, touchAction: 'none', cursor: 'grab' }}>
        <div style={{ position: 'absolute', left: 175, top: 10, width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.28)' }} />
      </div>
      {children}
    </div>
  );
}

// ---------- 댓글 시트 ----------
export function CommentSheet({ open, onClose, onCount, say }) {
  const [sort, setSort] = useState('like');
  const [, force] = useState(0);
  const [draft, setDraft] = useState('');
  const bump = () => force((k) => k + 1);
  const list = comments.slice().sort((a, b) => (sort === 'like' ? b.likes - a.likes : b.order - a.order));
  const send = () => {
    const v = draft.trim();
    if (!v) return;
    comments = [{ id: nextId++, name: '새벽2시', av: null, text: v, when: '방금 전', order: 99 + nextId, likes: 0 }, ...comments];
    setDraft('');
    bump();
    onCount(commentTotal());
    say('댓글을 남겼어요');
  };
  const toggle = (c) => {
    if (liked.has(c.id)) { liked.delete(c.id); c.likes -= 1; } else { liked.add(c.id); c.likes += 1; }
    bump();
  };
  const optStyle = (on) => ({ border: 0, background: 'transparent', padding: 0, margin: 0, cursor: 'pointer', fontFamily: FONT, fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', fontWeight: on ? 700 : 500, color: on ? TXT : SUB, outline: 'none', WebkitTapHighlightColor: 'transparent', transition: 'color 160ms' });
  return (
    <>
      <Backdrop open={open} onClose={onClose} />
      <Sheet open={open} top={312} onClose={onClose}>
        <p style={{ position: 'absolute', left: 24, top: 38, margin: 0, fontSize: 17, fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.34px' }}>{'댓글 ' + commentTotal()}</p>
        <div style={{ position: 'absolute', right: 24, top: 40, display: 'flex', gap: 14 }}>
          <button type="button" onClick={() => setSort('like')} style={optStyle(sort === 'like')} aria-pressed={sort === 'like'}>순공감순</button>
          <button type="button" onClick={() => setSort('new')} style={optStyle(sort === 'new')} aria-pressed={sort === 'new'}>최신순</button>
        </div>
        <div className="cp-hide" style={{ position: 'absolute', left: 0, top: 78, width: 390, height: 460, overflowY: 'auto', overscrollBehavior: 'contain' }} onWheel={(e) => e.stopPropagation()}>
          <div style={{ margin: '0 19px', height: 68, borderRadius: 8, background: 'linear-gradient(90deg,#A79AF3 0%,#8F8EF1 100%)', position: 'relative', overflow: 'hidden' }}>
            <p style={{ position: 'absolute', left: 12, top: 11, margin: 0, fontSize: 14.5, fontWeight: 800, lineHeight: '20px', letterSpacing: '-0.3px', color: '#1A1C6A', whiteSpace: 'pre' }}>댓글 좀 치세요? 장려금 드리려는데!</p>
            <div style={{ position: 'absolute', left: 12, top: 38, height: 20, padding: '0 9px', display: 'flex', alignItems: 'center', background: '#262A9C', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '-0.22px', borderRadius: 2 }}>참여 신청하는 곳</div>
            <div style={{ position: 'absolute', right: 10, top: 12, width: 82, height: 44, transform: 'rotate(-7deg)', borderRadius: 6, background: '#FFF4B0', boxShadow: '0 1px 3px rgba(0,0,0,.25)', color: '#1F1F3D', textAlign: 'center', fontSize: 12, fontWeight: 900, lineHeight: '15px', paddingTop: 7, letterSpacing: '-0.3px', whiteSpace: 'pre' }}>{'웃플 장려금\n드립니다'}</div>
          </div>
          <div style={{ margin: '14px 24px 0', height: 41, borderRadius: 12, background: '#262629', position: 'relative' }}>
            <svg width="22" height="18" viewBox="0 0 22 18" style={{ position: 'absolute', left: 14, top: 12 }} fill="none"><path d="M3 12C3 7.6 6.4 4.5 11 4.5C15.6 4.5 19 7.6 19 12V13.2H3Z" fill="#3DDC84" /><circle cx="8" cy="10" r="1.6" fill="#262629" /><circle cx="14" cy="10" r="1.6" fill="#262629" /><path d="M11 4.5V2" stroke="#3DDC84" strokeWidth="1.6" strokeLinecap="round" /></svg>
            <p style={{ position: 'absolute', left: 44, top: 11, margin: 0, fontSize: 13.5, fontWeight: 500, lineHeight: '19px', letterSpacing: '-0.27px', color: '#E9E9EE', whiteSpace: 'pre' }}><span style={{ color: '#3DDC84' }}>클린봇</span>이 악성댓글을 감지합니다.</p>
            <p style={{ position: 'absolute', right: 16, top: 11, margin: 0, fontSize: 13, fontWeight: 500, lineHeight: '19px', color: SUB, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Svg size={14} stroke={SUB} sw={2}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></Svg>설정
            </p>
          </div>
          {list.map((c) => (
            <div key={c.id} style={{ position: 'relative', margin: '0 24px', padding: '20px 0 0' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <Avatar c={c} />
                <div style={{ flex: 1, minWidth: 0, paddingRight: 44 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.28px' }}>{c.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 14, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.28px', color: '#E5E5EA', wordBreak: 'keep-all' }}>{c.text}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 12, lineHeight: '17px', color: SUB }}>{c.when}</p>
                  <button type="button" className="cp-row" onClick={() => say('답글 쓰기는 준비 중이에요')} style={{ width: 'auto', padding: '8px 0 10px', fontSize: 13, color: '#B0B0B5', fontWeight: 500 }}>답글 쓰기</button>
                </div>
              </div>
              <button type="button" aria-label="공감" aria-pressed={liked.has(c.id)} onClick={() => toggle(c)} className="cp-btn" style={{ right: -6, top: 44, width: 44, height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <span key={liked.has(c.id) ? 'on' : 'off'} className={liked.has(c.id) ? 'cp-pop' : undefined} style={{ display: 'block', lineHeight: 0 }}><Heart on={liked.has(c.id)} /></span>
                <span style={{ fontSize: 12, lineHeight: '17px', color: liked.has(c.id) ? '#FF3B5C' : SUB, fontWeight: 500 }}>{c.likes}</span>
              </button>
              <div style={{ position: 'absolute', right: 8, top: 22, width: 22, height: 8, lineHeight: 0 }}>
                <svg width="22" height="8" viewBox="0 0 22 8" fill={SUB}><circle cx="3" cy="4" r="1.6" /><circle cx="11" cy="4" r="1.6" /><circle cx="19" cy="4" r="1.6" /></svg>
              </div>
            </div>
          ))}
          <div style={{ height: 24 }} />
        </div>
        <div style={{ position: 'absolute', left: 0, top: 420, width: 390, height: 112, background: SHEET_BG, boxShadow: '0 -1px 0 rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'absolute', left: 22, top: 14, width: 32, height: 32, borderRadius: '50%', background: '#3A3A3C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#D1D1D6"><circle cx="12" cy="8" r="4.2" /><path d="M3.5 21C3.5 16.4 7.3 13.6 12 13.6C16.7 13.6 20.5 16.4 20.5 21Z" /></svg>
          </div>
          <div style={{ position: 'absolute', left: 62, top: 10, width: 252, height: 40, borderRadius: 20, border: '1px solid #3A3A3D', boxSizing: 'border-box' }}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} placeholder="힘이 되는 말 한마디 남겨보세요." enterKeyHint="send"
              style={{ position: 'absolute', left: 16, top: 0, width: 188, height: 38, border: 0, outline: 'none', background: 'transparent', color: TXT, fontFamily: FONT, fontSize: 14, letterSpacing: '-0.28px', padding: 0 }} />
          </div>
          <button type="button" aria-label="보내기" onClick={send} className="cp-btn" style={{ left: 326, top: 12, width: 36, height: 36, borderRadius: '50%', background: draft.trim() ? '#36D2FF' : '#3A3A3D', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 160ms, transform 110ms' }}>
            <Svg size={18} stroke={draft.trim() ? '#000' : '#8E8E93'} sw={2.2}><path d="M12 19V5M5 12l7-7 7 7" /></Svg>
          </button>
        </div>
      </Sheet>
    </>
  );
}

// ---------- 더보기 메뉴 ----------
const ICONS = {
  full: <><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" /></>,
  play: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9.5l5 2.5-5 2.5Z" /></>,
  eyeoff: <><path d="M3 3l18 18M10.6 5.2C11 5.1 11.5 5 12 5c5 0 8.5 4.2 9.5 7-0.4 1.1-1.2 2.4-2.3 3.5M6.5 6.8C4.6 8.2 3.4 10.2 2.5 12c1.2 2.9 4.5 7 9.5 7 1.5 0 2.8-.4 4-1M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7M3 3l18 18" /></>,
  share: <><path d="M21 12L14 5v4C7 9.5 4 13.2 3 19c2.5-3.2 5.5-4.5 11-4.5V19Z" /></>,
  bell: <><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15ZM10 21a2 2 0 0 0 4 0" /></>,
  heart: <><path d="M12 21C5.5 16 2 12.4 2 8.6C2 5.8 4.2 3.8 6.7 3.8C8.9 3.8 10.9 5.1 12 7.1C13.1 5.1 15.1 3.8 17.3 3.8C19.8 3.8 22 5.8 22 8.6C22 12.4 18.5 16 12 21Z" /></>,
  chat: <><path d="M12 3C6.5 3 2 6.9 2 11.8C2 14.6 3.4 17 5.7 18.6L4.8 22L9.3 20C10.1 20.1 11 20.2 12 20.2C17.5 20.2 22 16.4 22 11.8C22 6.9 17.5 3 12 3Z" /></>,
};
function Row({ icon, label, tail, color, onClick }) {
  return (
    <button type="button" className="cp-row" onClick={onClick} style={{ height: 50, padding: '0 24px', gap: 14, color: color || TXT }}>
      <span style={{ lineHeight: 0, width: 24, flexShrink: 0 }}><Svg stroke={color || TXT}>{ICONS[icon]}</Svg></span>
      <span style={{ fontSize: 15, fontWeight: 600, lineHeight: '21px', letterSpacing: '-0.3px' }}>{label}</span>
      {tail ? <span style={{ fontSize: 13, color: SUB, fontWeight: 500, marginLeft: 6 }}>{tail}</span> : null}
    </button>
  );
}
export function MoreSheet({ open, onClose, stats, onAction }) {
  const Tile = ({ icon, text }) => (
    <div style={{ flex: 1, height: 78, borderRadius: 14, background: '#2A2A2D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.27px' }}>
      <Svg size={22}>{ICONS[icon]}</Svg>{text}
    </div>
  );
  return (
    <>
      <Backdrop open={open} cardTop={8} cardH={236} onClose={onClose} />
      <Sheet open={open} top={262} onClose={onClose}>
        <div style={{ position: 'absolute', left: 24, top: 44, width: 342, display: 'flex', gap: 10 }}>
          <Tile icon="heart" text={'좋아요 ' + stats.like} />
          <Tile icon="chat" text={'댓글 ' + stats.comment} />
        </div>
        <div style={{ position: 'absolute', left: 0, top: 138, width: 390 }}>
          <Row icon="full" label="몰입 모드로 보기" onClick={() => onAction('immersive')} />
          <Row icon="play" label="재생 방식 설정" tail="반복 재생" onClick={() => onAction('play')} />
          <div style={{ height: 1, margin: '8px 24px', background: 'rgba(255,255,255,0.08)' }} />
          <Row icon="eyeoff" label="이 콘텐츠 숨기기" onClick={() => onAction('hide')} />
          <Row icon="person" label="쌍수일기 콘텐츠 숨기기" onClick={() => onAction('hideCreator')} color="#7AA7FF" />
          <Row icon="share" label="공유하기" onClick={() => onAction('share')} />
          <Row icon="bell" label="신고하기" onClick={() => onAction('report')} />
        </div>
      </Sheet>
    </>
  );
}
