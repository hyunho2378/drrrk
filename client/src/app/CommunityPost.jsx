// 커뮤니티 글 상세(38). 팀 피그마 "커뮤니티 / 글 상세 (v5 글 중심)" 2100:23295 (390 x 844)와 댓글 모음 2100:23497을 그대로 옮긴 화면(11. 10. 수정사항).
//  1) 상단 바(2100:23454)는 뒤로가기만 있다. 공유는 글 아래 액션줄에만 있다("공유 하단에도 있어서 없앰" 2100:23637).
//  2) 액션줄(2100:23321)은 좋아요와 숫자, 공유만 있다. 좋아요 옆 댓글 수는 아래 "댓글 23"과 겹쳐서 뺐다(2100:23633).
//  3) 댓글 줄마다 작성자 의자 그림(원형 32, 바탕 #33383D, 그림 28.5)을 넣는다(2100:23632). 답글은 왼쪽 42 들여쓴다.
//  4) 대화 다시보기 카드(2100:23307, 11. 11. 팀 수정본 342 x 176)는 모양만 맞춘다. 라벨은 글만(play-circle 숨김), 가운데 play 버튼(2302:12692),
//     아래 라이브 보기 바(2302:12695, 참여 의자와 "라이브 보기")가 있다. 누른 뒤 화면은 아직 없어서 play 버튼은 눌림 반응만 준다.
// 내용은 피그마 사진보정 글이다. 목록에서 다른 글(쌍밍아웃 등)을 열면 제목만 그 글 제목으로 바꾸고 나머지는 지금 앱과 같다.
// 한글 줄바꿈은 피그마처럼 글자 단위로 끊는다(word-break: break-all, 댓글 "기억이 나네/요" 자리가 피그마와 같다).
// 휴대폰 높이 맞춤(mobileFit.js)이 읽을 수 있게 맨 바깥 칸의 자식은 모두 피그마 좌표의 absolute 칸이다.
import { useEffect, useRef, useState } from 'react';
import { motion, live as LIVE } from '../tokens.js';
import { toast } from './room.js';
import { pickedPostTitle } from './community.js';
import { getSaved, thumb as chairThumb } from './chairs.js';
import { POST, COMMENTS, SSANG_TITLE } from './communityPostData.js';

const BASE = import.meta.env.BASE_URL || '/';
const A = BASE + 'assets/community3/';
const C = { bg: '#121415', card: '#222628', avatarBg: '#33383D', text: '#F8F8F8', body: '#D9DBDE', sub: '#9AA1A6', faint: '#6E767C', brand: '#36D2FF' };
const SUIT = "'SUIT', system-ui, sans-serif";
const NOTO = "'Noto Sans KR', 'SUIT', system-ui, sans-serif";
// 좋아요는 화면을 나갔다 돌아와도 남는다(이전 post.js와 같은 동작).
const likeState = { on: false };

const icon = {
  chevron: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 4L8 12L16 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#FFFFFF" /></svg>,
  thumb: (color) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <path d="M20.9739 9.50733C20.5832 9.05709 20.1003 8.69606 19.558 8.44867C19.0156 8.20129 18.4264 8.07332 17.8303 8.07345H14.5068L14.7868 6.37295C14.8858 5.77412 14.7663 5.15964 14.45 4.64158C14.1338 4.12352 13.6418 3.7364 13.0639 3.55084C12.486 3.36528 11.8607 3.39363 11.3019 3.63073C10.7432 3.86783 10.2883 4.29787 10.0202 4.84242L8.66547 7.58771V20.571H17.2471C18.2498 20.5669 19.2177 20.203 19.9747 19.5455C20.7318 18.888 21.2276 17.9806 21.3721 16.9884L21.9595 12.8225C22.0426 12.2316 21.9975 11.6297 21.8275 11.0577C21.6574 10.4857 21.3663 9.95692 20.9739 9.50733Z" fill={color} style={{ transition: 'fill 180ms ' + motion.standard }} />
      <path d="M2 12.239V16.4048C2.00132 17.5093 2.44065 18.5681 3.22161 19.349C4.00257 20.13 5.0614 20.5693 6.16584 20.5707H6.99901V8.07313H6.16584C5.0614 8.07445 4.00257 8.51377 3.22161 9.29473C2.44065 10.0757 2.00132 11.1345 2 12.239Z" fill={color} style={{ transition: 'fill 180ms ' + motion.standard }} />
    </svg>
  ),
  share: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: 'block' }}><path d="M11.3998 2.40039V13.6004M15.6427 6.60039L11.3998 2.40039L7.15695 6.60039M4.7998 11.7337V17.3337C4.7998 17.8288 4.99848 18.3036 5.35212 18.6537C5.70576 19.0037 6.1854 19.2004 6.68552 19.2004H16.1141C16.6142 19.2004 17.0939 19.0037 17.4475 18.6537C17.8011 18.3036 17.9998 17.8288 17.9998 17.3337V11.7337" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke={C.sub} /></svg>,
  thumbSmall: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}><path d="M13.9823 6.33887C13.7218 6.03871 13.3999 5.79802 13.0383 5.6331C12.6767 5.46817 12.284 5.38287 11.8866 5.38295H9.67089L9.85751 4.24929C9.92355 3.85007 9.84388 3.44041 9.63304 3.09504C9.4222 2.74966 9.09423 2.49159 8.70896 2.36788C8.32369 2.24417 7.90679 2.26307 7.5343 2.42114C7.1618 2.5792 6.85853 2.8659 6.67981 3.22893L5.77666 5.05913V13.7146H11.4977C12.1662 13.7119 12.8115 13.4693 13.3162 13.031C13.8209 12.5926 14.1514 11.9877 14.2478 11.3262L14.6393 8.54899C14.6947 8.15503 14.6647 7.75376 14.5513 7.37242C14.4379 6.99109 14.2439 6.6386 13.9823 6.33887ZM1.33301 8.15996V10.9372C1.3337 11.6735 1.56214 12.3794 1.96824 12.9C2.37434 13.4207 2.92493 13.7135 3.49925 13.7144H3.93249V5.38274H3.49925C2.92493 5.38362 2.37434 5.6765 1.96824 6.19714C1.56214 6.71778 1.3337 7.42367 1.33301 8.15996Z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" stroke={C.sub} /></svg>,
  play: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}><path d="M16.5 9C16.5 13.1423 13.1423 16.5 9 16.5C4.85775 16.5 1.5 13.1423 1.5 9C1.5 4.85775 4.85775 1.5 9 1.5C13.1423 1.5 16.5 4.85775 16.5 9ZM8.025 6.1875C7.5375 5.8875 7.125 6.135 7.125 6.7125V11.2875C7.125 11.865 7.5375 12.1125 8.025 11.8125L11.6625 9.525C12.15 9.225 12.15 8.775 11.6625 8.475L8.025 6.1875Z" fillRule="evenodd" clipRule="evenodd" fill="#F8F8F8" /></svg>,
  arrow: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: 'block' }}><path d="M3 12H21M15 18L21 12L15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="#000000" /></svg>,
  // 피그마 play 버튼(2302:12692) 48 원(흰색 92%)과 삼각형(15.6 x 19, #1F2226, 원 안 20, 14.5 자리)
  replayPlay: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#FFFFFF" fillOpacity="0.92" />
      <path transform="translate(20 14.5)" d="M2.00786e-06 1.002L2.00786e-06 18.002C-0.000355988 18.1807 0.0471643 18.3562 0.137621 18.5103C0.228078 18.6644 0.358167 18.7914 0.514357 18.8782C0.670547 18.9649 0.847134 19.0083 1.02575 19.0037C1.20437 18.9991 1.37849 18.9467 1.53 18.852L15.13 10.352C15.2747 10.2623 15.3941 10.1372 15.4769 9.98843C15.5598 9.83968 15.6032 9.67225 15.6032 9.502C15.6032 9.33176 15.5598 9.16433 15.4769 9.01558C15.3941 8.86683 15.2747 8.74169 15.13 8.652L1.53 0.152003C1.37849 0.0573049 1.20437 0.00493242 1.02575 0.000331646C0.847134 -0.00426912 0.670547 0.0390705 0.514357 0.125843C0.358167 0.212615 0.228078 0.339651 0.137621 0.493736C0.0471643 0.647822 -0.000355988 0.823329 2.00786e-06 1.002Z" fill="#1F2226" />
    </svg>
  ),
  // 피그마 icon/chevron-right(2302:12698) 16 칸, 선 1.6 둥근 끝, #36D2FF
  chevronSmall: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}><path d="M6 3.5L10.5 8L6 12.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" stroke="#36D2FF" /></svg>,
};

const t = (size, weight, color, extra) => ({ margin: 0, fontFamily: SUIT, fontSize: size, fontWeight: weight, color, whiteSpace: 'pre', ...extra });

// 누름 반응: 누르면 scale 0.97과 opacity 0.85(90ms), 떼면 120ms. 표준 곡선.
function pressProps() {
  const set = (el, on) => {
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.transition = 'transform ' + (on ? 90 : 120) + 'ms ' + motion.standard + ', opacity ' + (on ? 90 : 120) + 'ms ' + motion.standard;
    el.style.transform = on ? 'scale(0.97)' : '';
    el.style.opacity = on ? '0.85' : '';
  };
  return {
    onPointerDown: (e) => set(e.currentTarget, true),
    onPointerUp: (e) => set(e.currentTarget, false),
    onPointerLeave: (e) => set(e.currentTarget, false),
    onPointerCancel: (e) => set(e.currentTarget, false),
  };
}

function ChairAvatar({ src }) {
  return (
    <div data-figma="의자 프로필" style={{ width: 32, height: 32, borderRadius: '50%', background: C.avatarBg, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      <img alt="" draggable={false} src={src} style={{ position: 'absolute', left: 2, top: 2, width: 28.477, height: 28.477, display: 'block' }} />
    </div>
  );
}

function CommentItem({ c, width }) {
  return (
    <div data-figma="Community / Comment Item" style={{ display: 'flex', width, padding: '14px 0', gap: 10, alignItems: 'flex-start' }}>
      <ChairAvatar src={c.avatar} />
      <div data-figma="Content" style={{ display: 'flex', flexDirection: 'column', gap: 6, width: width - 42, minWidth: 0 }}>
        <div data-figma="Header" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 16 }}>
          <p style={t(13, 700, C.text, { lineHeight: '16px' })}>{c.name}</p>
          <p style={t(12, 500, C.faint, { lineHeight: '15px' })}>{c.time}</p>
        </div>
        <p style={t(14, 400, C.text, { lineHeight: '21px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', width: width - 42 })}>{c.text}</p>
        <div data-figma="Footer" style={{ display: 'flex', alignItems: 'center', gap: 14, height: 16 }}>
          <div data-figma="DRR" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {icon.thumbSmall}
            <p style={t(12, 500, C.sub, { lineHeight: '15px' })}>{c.likes}</p>
          </div>
          <p style={t(12, 500, C.faint, { lineHeight: '15px' })}>답글 달기</p>
        </div>
      </div>
    </div>
  );
}

function share(root, title) {
  const data = { title: '드르륵 커뮤니티', text: title.replace(/\n/g, ' '), url: window.location.href };
  const copy = () => {
    const ok = () => toast(root, '링크를 복사했어요');
    const no = () => toast(root, '이 브라우저는 공유를 지원하지 않아요');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(data.url).then(ok, no);
    else no();
  };
  if (navigator.share) {
    navigator.share(data).catch((err) => { if (!err || err.name !== 'AbortError') copy(); });
    return;
  }
  copy();
}

function titleFor(picked) {
  if (!picked) return POST.title;
  const flat = (s) => s.replace(/\s+/g, '');
  if (flat(picked) === flat(POST.title)) return POST.title;
  if (flat(picked) === flat(SSANG_TITLE)) return SSANG_TITLE;
  return picked;
}

export default function CommunityPost() {
  const rootRef = useRef(null);
  const thumbRef = useRef(null);
  const inputRef = useRef(null);
  const [title] = useState(() => titleFor(pickedPostTitle()));
  const [liked, setLiked] = useState(likeState.on);
  const [mine, setMine] = useState([]);
  const [draft, setDraft] = useState('');

  useEffect(() => { likeState.on = liked; }, [liked]);

  const toggleLike = (e) => {
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    const el = thumbRef.current;
    if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.animate([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.38) rotate(-14deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)' }], { duration: 360, easing: motion.emphasizedDecel });
    }
  };

  const send = () => {
    const v = draft.trim();
    if (!v) return;
    const s = getSaved();
    setMine((m) => [{ id: 'mine' + Date.now(), name: LIVE.myName, time: LIVE.justNow, text: v, likes: '0', avatar: chairThumb(s.k, s.c), fresh: true }, ...m]);
    setDraft('');
  };

  const likeColor = liked ? C.brand : C.sub;
  const count = POST.likes + (liked ? 1 : 0);

  return (
    <div ref={rootRef} data-figma="커뮤니티 / 글 상세 (v5 글 중심)" data-node="2100:23295" style={{ width: 390, height: 844, background: C.bg, position: 'relative', overflow: 'hidden' }}>
      <style>{'.cp5-scroll{scrollbar-width:none}.cp5-scroll::-webkit-scrollbar{display:none}'}</style>
      <div data-figma="Scroll" data-node="2100:23296" className="cp5-scroll" style={{ position: 'absolute', left: 0, top: 112, width: 390, height: 732, overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'contain' }}>
        <div data-figma="Post" style={{ display: 'flex', flexDirection: 'column', width: 390, padding: '8px 24px 24px 24px', boxSizing: 'border-box' }}>
          <div data-figma="Author" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28 }}>
            <img alt="" draggable={false} src={A + 'author.webp'} style={{ width: 28, height: 28, display: 'block', flexShrink: 0 }} />
            <p style={t(13, 700, C.text, { lineHeight: '16px' })}>{POST.author}</p>
            <p style={t(12, 500, C.faint, { lineHeight: '15px' })}>{POST.time}</p>
          </div>
          <div style={{ height: 16 }} />
          <p style={t(20, 700, C.text, { lineHeight: '28px' })}>{title}</p>
          <div style={{ height: 12 }} />
          <p style={t(15, 400, C.body, { lineHeight: '24px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', width: 342 })}>{POST.body}</p>
          <div style={{ height: 24 }} />
          <div data-figma="대화 다시보기" data-node="2100:23307" style={{ position: 'relative', width: 342, height: 176, borderRadius: 16, overflow: 'hidden', background: '#1F2226', flexShrink: 0 }}>
            {/* 장면: 피그마 fade(2100:23309, 342 x 150)가 scene(2100:23308)을 모두 덮은 모습 그대로다. */}
            <img alt="" draggable={false} src={A + 'replay-bg.webp'} style={{ position: 'absolute', left: 0, top: 0, width: 342, height: 150, display: 'block' }} />
            <div data-figma="다시보기 라벨" data-node="2100:23310" style={{ position: 'absolute', left: 12, top: 12, height: 25, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.55)' }}>
              <p style={{ margin: 0, fontFamily: NOTO, fontSize: 12, fontWeight: 500, lineHeight: '17px', color: '#FFFFFF', whiteSpace: 'pre' }}>{POST.replay}</p>
            </div>
            <div data-figma="play 버튼" data-node="2302:12692" aria-hidden="true" {...pressProps()} style={{ position: 'absolute', left: 147, top: 42, width: 48, height: 48, borderRadius: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.35)' }}>
              {icon.replayPlay}
            </div>
            <div data-figma="라이브 보기 바" data-node="2302:12695" style={{ position: 'absolute', left: 0, top: 132, width: 342, height: 44, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px 0 12px', background: C.card }}>
              <div data-figma="참여 의자" data-node="2100:23313" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 26 }}>
                <img alt="" draggable={false} src={A + 'replay-avatars.webp'} style={{ width: 62, height: 26, display: 'block' }} />
                <p style={{ margin: 0, fontFamily: NOTO, fontSize: 12, fontWeight: 500, lineHeight: '16.8px', color: C.text, whiteSpace: 'pre' }}>{POST.seats}</p>
              </div>
              <div data-figma="라이브 보기 CTA" data-node="2302:12696" style={{ display: 'flex', alignItems: 'center', gap: 2, height: 16 }}>
                <p style={{ margin: 0, fontFamily: NOTO, fontSize: 13, fontWeight: 700, lineHeight: '15.6px', color: C.brand, whiteSpace: 'pre' }}>{POST.liveCta}</p>
                {icon.chevronSmall}
              </div>
            </div>
          </div>
          <div style={{ height: 16 }} />
          <div data-figma="Actions" data-node="2100:23321" style={{ display: 'flex', alignItems: 'center', width: 342, height: 36 }}>
            <div role="button" tabIndex={0} aria-label="좋아요" aria-pressed={liked} onClick={toggleLike} onKeyDown={(e) => { if (e.key === 'Enter') toggleLike(e); }} {...pressProps()} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, cursor: 'pointer', position: 'relative' }}>
              <span ref={thumbRef} style={{ display: 'block', width: 24, height: 24 }}>{icon.thumb(likeColor)}</span>
              <p style={t(16, 700, likeColor, { lineHeight: '20px', letterSpacing: '-0.64px', transition: 'color 180ms ' + motion.standard })}>{count}</p>
            </div>
            <div style={{ flex: 1 }} />
            <div role="button" tabIndex={0} aria-label="공유" onClick={(e) => { e.stopPropagation(); share(rootRef.current, title); }} onKeyDown={(e) => { if (e.key === 'Enter') share(rootRef.current, title); }} {...pressProps()} style={{ display: 'flex', alignItems: 'center', gap: 4, height: 36, cursor: 'pointer' }}>
              {icon.share}
              <p style={t(16, 700, C.sub, { lineHeight: '20px', letterSpacing: '-0.64px', width: 28 })}>공유</p>
            </div>
          </div>
        </div>
        <div data-figma="Divider" style={{ width: 390, height: 8, background: C.card }} />
        <div data-figma="Comments" style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px 120px 24px', boxSizing: 'border-box', width: 390 }}>
          <p style={t(16, 700, C.text, { lineHeight: '20px' })}>{'댓글 ' + (POST.comments + mine.length)}</p>
          <div style={{ display: 'flex', flexDirection: 'column', width: 342 }}>
            {mine.map((c) => <Fresh key={c.id}><CommentItem c={c} width={342} /></Fresh>)}
            {COMMENTS.map((c) => (c.reply ? (
              <div key={c.id} data-figma="Reply" style={{ display: 'flex', paddingLeft: 42, width: 342, boxSizing: 'border-box' }}><CommentItem c={c} width={300} /></div>
            ) : <CommentItem key={c.id} c={c} width={342} />))}
          </div>
        </div>
      </div>
      <div data-figma="Top Bar" data-node="2100:23454" style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 112, background: C.bg }}>
        <div data-figma="chevron-left" style={{ position: 'absolute', left: 24, top: 79, width: 24, height: 24 }}>{icon.chevron}</div>
      </div>
      <div data-figma="Rectangle 1954141374" style={{ position: 'absolute', left: -1, top: 632, width: 392, height: 212, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 73.24%)' }} />
      <div data-figma="input" data-node="2100:23469" style={{ position: 'absolute', left: 24, top: 754, width: 342, height: 66, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px 8px 20px', borderRadius: 32, background: C.card }}>
        <div data-figma="댓글 입력칸" style={{ position: 'relative', width: 256, height: 48, display: 'flex', alignItems: 'center', paddingRight: 16, boxSizing: 'border-box', flexShrink: 0 }} onClick={() => inputRef.current && inputRef.current.focus()}>
          <p aria-hidden="true" style={t(14, 400, C.sub, { lineHeight: '19.6px', letterSpacing: '-0.56px', opacity: draft ? 0 : 1, pointerEvents: 'none' })}>댓글 달기</p>
          <input
            ref={inputRef}
            className="cp5-input"
            type="text"
            enterKeyHint="send"
            aria-label="댓글 달기"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, outline: 'none', background: 'transparent', color: C.text, caretColor: C.brand, padding: '0 16px 0 0', margin: 0, fontFamily: SUIT, fontSize: 14, letterSpacing: '-0.56px' }}
          />
        </div>
        <div role="button" tabIndex={0} aria-label="보내기" data-figma="btn_전송 (글 상세)" onClick={send} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} {...pressProps()} style={{ width: 48, height: 48, borderRadius: 24, background: C.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          {icon.arrow}
        </div>
      </div>
    </div>
  );
}

// 새로 단 댓글은 위에서 살짝 내려오며 나타난다(이전 동작과 같은 값).
function Fresh({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ref.current.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: motion.stateIn + 100, easing: motion.emphasizedDecel });
  }, []);
  return <div ref={ref}>{children}</div>;
}
