// 네이버 클립 영상 보기에서 열리는 두 시트. 원본 캡처 12번(댓글 시트)과 16번(더보기 메뉴)을 390 x 844 기준으로 재서 같은 자리와 크기로 만든다.
// 값은 artifacts/21_네이버클립_미러링/기준_390x844 의 기준 이미지에서 쟀다(자리는 css px, 색은 픽셀 샘플).
import React, { useRef, useState } from 'react';
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
.cp-btn{position:absolute;border:0;padding:0;margin:0;background:transparent;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;transition:transform 110ms cubic-bezier(.2,0,0,1),opacity 110ms}
.cp-btn:active{transform:scale(.92);opacity:.8}
.cp-btn:focus-visible{box-shadow:0 0 0 2px #36D2FF}
.cp-row{border:0;background:transparent;padding:0;margin:0;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;font-family:${FONT};transition:background-color 120ms}
.cp-row:active{background:rgba(255,255,255,.06)}
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

// 댓글 시트가 올라올 때: 영상이 위쪽 카드(110.5, 0, 169 x 299)로 줄어들고 바탕은 검정이 된다.
function CardBackdrop({ open, onClose }) {
  return (
    <div onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: 'absolute', inset: 0, zIndex: 60, background: open ? '#000' : 'rgba(0,0,0,0)', transition: 'background-color 320ms cubic-bezier(.2,0,0,1)' }}>
      <div style={{ position: 'absolute', left: open ? 110.5 : 0, top: 0, width: open ? 169 : 390, height: open ? 299 : 750, borderRadius: open ? '0 0 14px 14px' : 0, overflow: 'hidden', transition: 'all 380ms ' + EASE, opacity: open ? 1 : 0 }}>
        <img src={pic('vid')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 0, top, width: 390, height: 844 - top, zIndex: 61, background: SHEET, borderRadius: '24px 24px 0 0', transform: open ? 'translateY(' + dy + 'px)' : 'translateY(100%)', transition: drag.current ? 'none' : 'transform 360ms ' + EASE, fontFamily: FONT, color: TXT, overflow: 'hidden' }}>
      <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 32, touchAction: 'none', cursor: 'grab' }}>
        <div style={{ position: 'absolute', left: 175, top: 12, width: 40, height: 4, borderRadius: 2, background: HANDLE }} />
      </div>
      {children}
    </div>
  );
}

const EMOJIS = ['👍', '❤️', '🤣', '🎉', '🥰', '👏', '😄', '🔥'];
const EMOJI_X = [42, 85, 129, 172, 216, 260, 303, 347];

// 캡션의 더보기를 누르면 나오는 설명 부분(원본 15번): 만든 사람, 글, 재생수, AI 활용 칩, 구분선 순서다.
function InfoBlock() {
  return (
    <div style={{ position: 'relative', height: 182, margin: '10px 0 0' }}>
      <div style={{ position: 'absolute', left: 20, top: 0, width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
        <img src={pic('av0')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', left: 62, top: 0, height: 32, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', color: '#F6F6F6' }}>쌍수일기</span>
        <svg width="13" height="13" viewBox="0 0 14 14" style={{ display: 'block' }}><circle cx="7" cy="7" r="6.5" fill="#F9A825" /><path d="M4 7.2l2 2L10 5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span style={{ marginLeft: 6, height: 26, padding: '0 9px', display: 'flex', alignItems: 'center', border: '1px solid #343436', borderRadius: 8, fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.27px', color: '#EFEFEF' }}>팔로우</span>
      </div>
      <p style={{ position: 'absolute', left: 20, top: 43, margin: 0, fontSize: 16.5, lineHeight: '22px', letterSpacing: '-0.33px', color: '#F5F5F5', whiteSpace: 'pre' }}>친구가 썸남 앞에서 내 쌍밍아웃함</p>
      <p style={{ position: 'absolute', left: 20, top: 62, margin: 0, fontSize: 16.5, fontWeight: 700, lineHeight: '22px', letterSpacing: '-0.33px', color: '#F5F5F5', whiteSpace: 'pre' }}>#친구관계 #연애</p>
      <p style={{ position: 'absolute', left: 20, top: 90, margin: 0, fontSize: 15, lineHeight: '20px', letterSpacing: '-0.3px', color: SUB, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'pre' }}>재생수 2.4만<i style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: SUB, display: 'block' }} />3일 전</p>
      <div style={{ position: 'absolute', left: 20, top: 127, width: 52, height: 29, borderRadius: 8, border: '1px solid #343436', background: ROW, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, letterSpacing: '-0.28px', color: '#EDEDED' }}>AI 활용</div>
      <div style={{ position: 'absolute', left: 0, top: 181, width: 390, height: 1, background: '#292929' }} />
    </div>
  );
}

// ---------- 댓글 시트(원본 12번) ----------
export function CommentSheet({ open, onClose, onCount, say, info }) {
  const [sort, setSort] = useState('like');
  const [, force] = useState(0);
  const [draft, setDraft] = useState('');
  const bump = () => force((k) => k + 1);
  const list = comments.slice().sort((a, b) => (sort === 'like' ? b.likes - a.likes : b.order - a.order));
  const add = (text) => {
    comments = [{ id: nextId++, name: '새벽2시', av: null, text, when: '방금 전', order: 99 + nextId, likes: 0 }, ...comments];
    bump();
    onCount(commentTotal());
    say('댓글을 남겼어요');
  };
  const send = () => {
    const v = draft.trim();
    if (!v) return;
    setDraft('');
    add(v);
  };
  const toggle = (c) => {
    if (liked.has(c.id)) { liked.delete(c.id); c.likes -= 1; } else { liked.add(c.id); c.likes += 1; }
    bump();
  };
  const opt = (on) => ({ border: 0, background: 'transparent', padding: 0, margin: 0, cursor: 'pointer', fontFamily: FONT, fontSize: 15, lineHeight: '22px', letterSpacing: '-0.3px', fontWeight: 500, color: on ? '#F8F8F8' : SUB2, outline: 'none', WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center', gap: 7.5, transition: 'color 160ms' });
  const dot = (on) => ({ width: 5, height: 5, borderRadius: '50%', background: on ? '#F8F8F8' : SUB2, display: 'block' });
  return (
    <>
      <CardBackdrop open={open} onClose={onClose} />
      <Sheet open={open} top={310} onClose={onClose}>
        {!info ? (<>
        <p style={{ position: 'absolute', left: 20, top: 38, margin: 0, fontSize: 17, fontWeight: 500, lineHeight: '24px', letterSpacing: '-0.34px', color: '#F9F9F9' }}>{'댓글 ' + commentTotal()}</p>
        <div style={{ position: 'absolute', right: 21, top: 38, display: 'flex', gap: 12.5 }}>
          <button type="button" onClick={() => setSort('like')} style={opt(sort === 'like')} aria-pressed={sort === 'like'}><i style={dot(sort === 'like')} />순공감순</button>
          <button type="button" onClick={() => setSort('new')} style={opt(sort === 'new')} aria-pressed={sort === 'new'}><i style={dot(sort === 'new')} />최신순</button>
        </div>
        </>) : null}
        <div className="cp-hide" style={{ position: 'absolute', left: 0, top: info ? 30 : 75, width: 390, height: info ? 362 : 317, overflowY: 'auto', overscrollBehavior: 'contain' }} onWheel={(e) => e.stopPropagation()}>
          {info ? <InfoBlock /> : (<>
          <div style={{ margin: '12px 15px 0', height: 67, borderRadius: 6, background: '#ADA8FF', position: 'relative', overflow: 'hidden' }}>
            <p style={{ position: 'absolute', left: 15, top: 10, margin: 0, fontSize: 15.5, fontWeight: 900, lineHeight: '22px', letterSpacing: '-0.5px', color: '#2D31B3', whiteSpace: 'pre', textShadow: '-1.5px 0 #fff, 1.5px 0 #fff, 0 -1.5px #fff, 0 1.5px #fff, -1px -1px #fff, 1px 1px #fff, -1px 1px #fff, 1px -1px #fff' }}>댓글 좀 치세요? 장려금 드리려는데!</p>
            <div style={{ position: 'absolute', left: 17, top: 36, height: 19, padding: '0 9px', display: 'flex', alignItems: 'center', gap: 4, background: '#4F20DA', color: '#E7E0FA', fontSize: 11.5, fontWeight: 600, letterSpacing: '-0.3px', boxShadow: '1px 1px 0 #fff' }}>참여 신청하는 곳<svg width="7" height="11" viewBox="0 0 7 11" fill="none" stroke="#E7E0FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l4.5 4.5L1 10" /></svg></div>
            <div style={{ position: 'absolute', left: 254, top: 9, width: 92, height: 50, transform: 'rotate(-7deg)', borderRadius: 5, background: '#F3EEDF', boxShadow: '0 1px 3px rgba(0,0,0,.3)', color: '#1A1A24', textAlign: 'center', fontSize: 13, fontWeight: 900, lineHeight: '17px', paddingTop: 8, letterSpacing: '-0.4px', whiteSpace: 'pre' }}>
              <i style={{ position: 'absolute', left: -6, top: -4, width: 22, height: 9, background: '#B7A1F0', transform: 'rotate(-30deg)', opacity: 0.9 }} />
              <i style={{ position: 'absolute', right: -6, bottom: -3, width: 22, height: 9, background: '#F6E15F', transform: 'rotate(-30deg)', opacity: 0.95 }} />
              {'웃플 장려금\n드립니다'}
            </div>
          </div>
          <div style={{ margin: '16px 20px 0', height: 42, borderRadius: 8, background: ROW, position: 'relative' }}>
            <svg width="20" height="17" viewBox="0 0 20 17" style={{ position: 'absolute', left: 14, top: 12 }} fill="none"><path d="M3 11.5C3 7.4 6.2 4.6 10 4.6C13.8 4.6 17 7.4 17 11.5V12.5H3Z" fill={GREEN} /><circle cx="7.2" cy="9.6" r="1.4" fill={ROW} /><circle cx="12.8" cy="9.6" r="1.4" fill={ROW} /><path d="M10 4.6V2.2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="1.9" r="1.2" fill={GREEN} /></svg>
            <p style={{ position: 'absolute', left: 39, top: 11, margin: 0, fontSize: 15, fontWeight: 500, lineHeight: '20px', letterSpacing: '-0.3px', color: '#E9E9E9', whiteSpace: 'pre' }}><span style={{ color: GREEN }}>클린봇</span>이 악성댓글을 감지합니다.</p>
            <p style={{ position: 'absolute', right: 13, top: 11, margin: 0, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#A2A2A2', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#A2A2A2"><path d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.6a.5.5 0 0 0 .1-.6l-1.9-3.3a.5.5 0 0 0-.6-.2l-2.4 1a7.6 7.6 0 0 0-1.7-1l-.4-2.5a.5.5 0 0 0-.5-.4h-3.8a.5.5 0 0 0-.5.4l-.4 2.5a7.6 7.6 0 0 0-1.7 1l-2.4-1a.5.5 0 0 0-.6.2L2.5 8.8a.5.5 0 0 0 .1.6l2 1.6a7.5 7.5 0 0 0 0 2l-2 1.6a.5.5 0 0 0-.1.6l1.9 3.3c.1.2.4.3.6.2l2.4-1c.5.4 1.1.7 1.7 1l.4 2.5c0 .2.3.4.5.4h3.8c.2 0 .5-.2.5-.4l.4-2.5c.6-.3 1.2-.6 1.7-1l2.4 1c.2.1.5 0 .6-.2l1.9-3.3a.5.5 0 0 0-.1-.6ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" /></svg>설정
            </p>
          </div>
          </>)}
          {list.map((c, i) => (
            <div key={c.id} style={{ position: 'relative', margin: (info && i === 0 ? 24 : 20) + 'px 0 0', padding: '0 0 0 19px' }}>
              <div style={{ display: 'flex', gap: 11 }}>
                <Avatar c={c} />
                <div style={{ flex: 1, minWidth: 0, paddingRight: 52 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.3px', color: '#F6F6F6' }}>{c.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 15, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.3px', color: BODY, wordBreak: 'keep-all' }}>{c.text}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 13, lineHeight: '17px', color: SUB }}>{c.when}</p>
                  <button type="button" className="cp-row" onClick={() => say('답글 쓰기는 준비 중이에요')} style={{ display: 'block', height: 34, padding: 0, fontSize: 14, color: '#EBEBEB', fontWeight: 400, letterSpacing: '-0.28px' }}>답글 쓰기</button>
                </div>
              </div>
              <button type="button" aria-label="공감" aria-pressed={liked.has(c.id)} onClick={() => toggle(c)} className="cp-btn" style={{ right: 14, top: 27.5, width: 44, height: 54, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <span key={liked.has(c.id) ? 'on' : 'off'} className={liked.has(c.id) ? 'cp-pop' : undefined} style={{ display: 'block', lineHeight: 0 }}><Heart on={liked.has(c.id)} size={17} off="#C4C4C4" /></span>
                <span style={{ fontSize: 14, lineHeight: '19px', color: liked.has(c.id) ? '#FF3B5C' : '#CACACA', fontWeight: 400 }}>{c.likes}</span>
              </button>
              <div style={{ position: 'absolute', right: 28.5, top: 5, width: 16, height: 5, lineHeight: 0 }}>
                <svg width="16" height="5" viewBox="0 0 16 5" fill="#B5B5B5"><circle cx="2" cy="2.5" r="1.5" /><circle cx="8" cy="2.5" r="1.5" /><circle cx="14" cy="2.5" r="1.5" /></svg>
              </div>
            </div>
          ))}
          <div style={{ height: 30 }} />
        </div>
        <div style={{ position: 'absolute', left: 0, top: 392, width: 390, height: 142, background: SHEET, boxShadow: '0 -1px 0 #292929' }}>
          <div style={{ position: 'absolute', left: 19, top: 13, width: 44, height: 44, borderRadius: '50%', background: '#FFFFFF', overflow: 'hidden' }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="#C9C9CE"><circle cx="22" cy="17" r="8" /><path d="M6 44C6 33 13 27 22 27C31 27 38 33 38 44Z" /></svg>
          </div>
          <div style={{ position: 'absolute', left: 70, top: 11, width: 263, height: 45, borderRadius: 22.5, border: '1px solid #343436', boxSizing: 'border-box' }}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} placeholder="힘이 되는 말 한마디 남겨보세요." enterKeyHint="send"
              style={{ position: 'absolute', left: 14, top: 0, width: 200, height: 43, border: 0, outline: 'none', background: 'transparent', color: TXT, fontFamily: FONT, fontSize: 15, letterSpacing: '-0.3px', padding: 0 }} />
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8E8E8E" strokeWidth="1.8" strokeLinecap="round" style={{ position: 'absolute', left: 233, top: 11.5 }}><circle cx="12" cy="12" r="10" /><circle cx="8.6" cy="9.8" r="0.9" fill="#8E8E8E" stroke="none" /><circle cx="15.4" cy="9.8" r="0.9" fill="#8E8E8E" stroke="none" /><path d="M7.5 14.2c1 2 2.8 3 4.5 3s3.5-1 4.5-3" /></svg>
          </div>
          <button type="button" aria-label="보내기" onClick={send} className="cp-btn" style={{ left: 340, top: 19, width: 38, height: 38, borderRadius: '50%', background: draft.trim() ? '#36D2FF' : ROW, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 160ms, transform 110ms' }}>
            <Svg size={19} stroke={draft.trim() ? '#000' : '#6E6E6E'} sw={2.2}><path d="M12 19V5M5 12l7-7 7 7" /></Svg>
          </button>
          {EMOJIS.map((e, i) => (
            <button key={e} type="button" aria-label={'이모지 ' + e} onClick={() => add(e)} className="cp-btn" style={{ left: EMOJI_X[i] - 20, top: 66, width: 40, height: 40, fontSize: 24, lineHeight: '40px', textAlign: 'center' }}>{e}</button>
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
        <span style={{ fontSize: 15.5, fontWeight: 600, lineHeight: '22px', letterSpacing: '-0.31px' }}>{label}</span>
        {tail ? (
          <>
            <i style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: SUB, display: 'block' }} />
            <span style={{ fontSize: 14.5, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.3px', color: '#AEAEAE' }}>{tail}</span>
          </>
        ) : null}
      </span>
    </button>
  );
}
export function MoreSheet({ open, onClose, stats, liked: isLiked, saved, onAction }) {
  const Tile = ({ x, w, icon, text, on, onClick }) => (
    <button type="button" className="cp-btn" onClick={onClick} style={{ left: x, top: 28, width: w, height: 70, borderRadius: 8, background: TILE, display: 'block', fontFamily: FONT }}>
      <span style={{ position: 'absolute', left: 0, top: 11, width: w, display: 'flex', justifyContent: 'center', lineHeight: 0 }}>
        {icon === 'heart' ? <Heart on={on} size={22} off={TXT} /> : <Svg size={22} stroke={on ? TXT : TXT} fill={icon === 'keep' && on ? TXT : 'none'} sw={1.6}>{ICONS[icon]}</Svg>}
      </span>
      <span style={{ position: 'absolute', left: 0, top: 39, width: w, textAlign: 'center', fontSize: 14.5, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.3px', color: '#F2F2F2' }}>{text}</span>
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
        <Row icon="play" label="재생 방식 설정" tail="반복 재생" top={151} onClick={() => onAction('play')} />
        <div style={{ position: 'absolute', left: 20, top: 204, width: 350, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        <Row icon="eyeoff" label="이 콘텐츠 숨기기" top={214} onClick={() => onAction('hide')} />
        <Row icon="person" label={<><span style={{ color: BLUE }}>쌍수일기</span> 콘텐츠 숨기기</>} color={TXT} top={256} onClick={() => onAction('hideCreator')} />
        <Row icon="share" label="공유하기" top={298} onClick={() => onAction('share')} />
        <Row icon="bell" label="신고하기" top={340} onClick={() => onAction('report')} />
      </Sheet>
    </>
  );
}
