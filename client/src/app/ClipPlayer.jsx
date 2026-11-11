// 네이버 클립 영상 보기. 팀 피그마 "클립 영상 보기"(1843:40911)와 같은 값이고, 리스트에서 누른 카드(clipPick)의 장면과 글을 넣는다.
// 영상을 한 번 누르면 재생과 일시정지, 두 번 빠르게 누르면 하트와 좋아요, 위아래로 쓸면 다음과 이전 클립(세로 슬라이드 300ms)이다.
// 아래 진행 막대는 재생 중에 차고(38초 가정, 반복 재생이면 처음부터), 누르거나 끌면 그 자리로 간다.
// 오른쪽 버튼과 댓글 말풍선은 모두 눌린다. 좋아요와 저장은 클립별로 기억하고, 팔로우는 리스트와 같은 상태다(clipState.js).
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Item, pic } from './ClipKit.jsx';
import { PLAYER } from './ClipScenes.js';
import { CSS, CommentSheet, MoreSheet, commentCount } from './ClipSheets.jsx';
import { ClipAgent } from './ClipAgent.jsx';
import { CLIPS, DURATION, clip, saveClip, setPick, isFollow, toggleFollow, isLiked, toggleLike, setLiked, isSaved, toggleSave, likeCount, fmt, onClip } from './clipState.js';
import { videoOf, BUBBLE_AT, BUBBLE_RISE, BUBBLE_IN_MS, BUBBLE_OUT_MS } from './clipVideo.js';

const FONT = "'SUIT', system-ui, sans-serif";
const VID_H = 750;
const SLIDE_MS = 300;
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';

// 소리 끔 모양: 피그마에는 "Icon / 소리"(1843:40920, 1910:11625) 한 가지만 있고 끔 변형이 없다(2026. 11. 11. REST로 페이지 전체 확인).
// 새 모양을 만들지 않고 같은 아이콘 위에 같은 색, 같은 굵기의 대각선 한 줄만 올린다.
const SOUND_ON_SVG = (PLAYER.find((it) => it.n === 'Icon / 소리') || {}).svg || '';
const SOUND_OFF = SOUND_ON_SVG.replace('</svg>', '<path d="M3 2.5L23.5 21.5" stroke-width="2.2"/></svg>');
const FIXED = ['아래 검정 영역', 'Icon / 뒤로', 'Icon / 소리', '댓글 입력', '댓글 입력 안내'];
const SKIP = ['드르륵 에이전트 버튼', '진행 바 트랙', '진행 바'];
const PANEL = PLAYER.filter((it) => !FIXED.includes(it.n) && !SKIP.includes(it.n));
const FIXED_ITEMS = PLAYER.filter((it) => FIXED.includes(it.n));

const P_CSS = `
@keyframes cpHeart{0%{opacity:0;transform:scale(.3) rotate(var(--r))}14%{opacity:1;transform:scale(1.18) rotate(var(--r))}28%{transform:scale(.94) rotate(var(--r))}42%{opacity:1;transform:scale(1) rotate(var(--r))}100%{opacity:0;transform:translateY(-130px) scale(1.3) rotate(var(--r))}}
@keyframes cpFlash{0%{opacity:0;transform:scale(.8)}20%{opacity:1;transform:scale(1)}70%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.08)}}
.cp-heart{position:absolute;width:96px;height:96px;pointer-events:none;z-index:40;animation:cpHeart 900ms cubic-bezier(.2,0,0,1) both}
.cp-flash{position:absolute;left:159px;top:329px;width:72px;height:72px;border-radius:50%;background:rgba(0,0,0,.42);display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:40;animation:cpFlash 600ms cubic-bezier(.2,0,0,1) both}
.cp-strip{touch-action:none;cursor:pointer}
.cp-imm [data-ui]{opacity:0 !important;pointer-events:none;transition:opacity 260ms cubic-bezier(.2,0,0,1)}
[data-ui]{transition:opacity 260ms cubic-bezier(.2,0,0,1)}
.cp-bub{opacity:0;transform:translateY(${BUBBLE_RISE}px);transition:opacity ${BUBBLE_OUT_MS}ms cubic-bezier(.2,0,0,1),transform 0ms linear ${BUBBLE_OUT_MS}ms;will-change:transform,opacity}
.cp-bub.on{opacity:1;transform:translateY(0);transition:opacity ${BUBBLE_IN_MS}ms cubic-bezier(.2,0,0,1),transform ${BUBBLE_IN_MS}ms cubic-bezier(.2,0,0,1)}
@media (prefers-reduced-motion:reduce){.cp-heart,.cp-flash{animation-duration:1ms}.cp-bub,.cp-bub.on{transform:none}}
`;

const commentsOf = (c) => commentCount(c);
const capOf = (c) => {
  if (c.id === 's0') return null;
  const t = c.title.length > 20 ? c.title.slice(0, 19).trimEnd() : c.title;
  const s = t + (t === c.title ? ' 더보기' : '... 더보기');
  return { s, sp: [[s.length - 3, s.length, '#B7B9BB']] };
};

// 클립 한 장(영상, 어둡게 깔기, 오른쪽 버튼 줄, 말풍선, 크리에이터 줄, 캡션)의 그릴 값.
function panelItems(c, fresh, onFollow) {
  const liked = isLiked(c.id);
  const saved = isSaved(c.id);
  const out = [];
  PANEL.forEach((it) => {
    if (it.n === '영상 / 쌍밍아웃') return out.push(c.wide ? null : { ...it, f: { img: c.img } });
    if (it.n === 'Icon / 좋아요') return out.push(liked ? { ...it, svg: it.svg.replace('fill="none" stroke="#FFFFFF"', 'fill="#FF3B5C" stroke="#FF3B5C"'), cls: fresh === 'like' ? 'cp-pop' : undefined, key: 'like-on' + fresh } : it);
    if (it.n === '좋아요 수') return out.push({ ...it, s: fmt(likeCount(c)) });
    if (it.n === 'Icon / 저장') return out.push(saved ? { ...it, svg: it.svg.replace('fill="none" stroke="#FFFFFF"', 'fill="#FFFFFF" stroke="#FFFFFF"'), cls: fresh === 'save' ? 'cp-pop' : undefined, key: 'save-on' + fresh } : it);
    if (it.n === '저장 라벨') return out.push(saved ? { ...it, s: '저장됨' } : it);
    if (it.n === '댓글 수') return out.push({ ...it, s: fmt(commentsOf(c)) });
    if (it.n === '댓글 말풍선') return out.push({ ...it, ch: it.ch.map((k) => (k.k === 'img' ? { ...k, img: c.bubbleAv } : { ...k, s: c.bubble })) });
    if (it.n === '아바타 / 쌍수일기') return out.push({ ...it, img: c.av });
    if (it.n === '크리에이터 이름 줄') {
      const on = isFollow(c.creator);
      const items = it.items.filter((k) => c.badge || k.n !== '인증 배지').map((k) => {
        if (k.n === '크리에이터 이름') return { ...k, s: c.creator };
        if (k.n === '팔로우 알약') return { ...k, text: { ...k.text, s: on ? '팔로잉' : '팔로우' }, f: on ? { c: '#000000', a: 0.28 } : k.f, on: onFollow, label: on ? '팔로잉' : '팔로우', pressed: on };
        return k;
      });
      return out.push({ ...it, items });
    }
    if (it.n === '캡션') { const cap = capOf(c); return out.push(cap ? { ...it, ...cap } : it); }
    if (it.n === 'AI 활용 칩' && c.id !== 's0') return undefined;
    return out.push(it);
  });
  return out.filter(Boolean);
}

// 가로 영상(혼술바)은 화면 가운데에 맞추고 위아래는 같은 그림을 흐리게 깐다.
function WideVideo({ img }) {
  return (
    <div data-figma="영상 / 가로" style={{ position: 'absolute', left: 0, top: 0, width: 390, height: VID_H, overflow: 'hidden', background: '#000' }}>
      <img src={pic(img)} alt="" draggable={false} style={{ position: 'absolute', left: -40, top: -40, width: 470, height: VID_H + 80, objectFit: 'cover', filter: 'blur(26px) brightness(.55)', display: 'block' }} />
      <img src={pic(img)} alt="" draggable={false} style={{ position: 'absolute', left: 0, top: (VID_H - 215) / 2, width: 390, height: 215, objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

// 진짜 영상(피그마 "영상 / 쌍밍아웃" 390 x 750 자리, 채움 FILL이라 cover). 아래에는 피그마 사진이 깔려 첫 장면이 뜨기 전에도 빈 화면이 없다.
// 지금 보고 있는 칸(active)만 재생하고, 옆 칸으로 밀려나면 멈추고 소리를 끄고 0초로 돌린다(다시 오면 처음부터).
function VideoFill({ it, src, active, vref }) {
  const own = useRef(null);
  const setRef = (el) => { own.current = el; if (vref) vref.current = el; };
  useEffect(() => {
    const v = own.current;
    if (!v || active) return;
    v.pause();
    v.muted = true;
    try { v.currentTime = 0; } catch (e) { /* 메타데이터 전이면 무시 */ }
  }, [active]);
  // 화면이 없어지면 주소를 비워 내려받기와 소리를 끝낸다. 개발 모드(StrictMode)가 다시 붙이면 주소를 되돌린다.
  useEffect(() => {
    const v = own.current;
    if (v && !v.getAttribute('src')) { v.src = src.full; v.load(); }
    return () => {
      if (!v) return;
      v.pause();
      v.removeAttribute('src');
      v.load();
    };
  }, []);
  return (
    <>
      <Item it={it} pw={390} />
      <video ref={setRef} data-figma="영상 / 쌍밍아웃 재생" src={src.full} poster={src.poster} playsInline preload="auto" disablePictureInPicture
        style={{ position: 'absolute', left: 0, top: 0, width: 390, height: VID_H, objectFit: 'cover', objectPosition: '50% 50%', display: 'block', pointerEvents: 'none' }} />
    </>
  );
}

function Panel({ c, top, fresh, onFollow, active, vref, bub }) {
  const items = panelItems(c, fresh, onFollow);
  const [video, ...ui] = c.wide ? [null, ...items] : items;
  const src = videoOf(c);
  const drawUi = (it, i) => {
    // 영상 클립의 댓글 말풍선은 처음에 비어 있다가 재생 1.2초 뒤 아래에서 28px 올라온다(탁빛나 1843:40911 핀 (101,603)).
    if (src && it.n === '댓글 말풍선') {
      return (
        <div key="bub" data-figma="댓글 말풍선 플로팅" className={'cp-bub' + (active && bub ? ' on' : '')} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: VID_H, pointerEvents: 'none' }}>
          <Item it={it} pw={390} />
        </div>
      );
    }
    return <Item key={it.key || it.n + i} it={it} pw={390} />;
  };
  return (
    <div data-clip={c.id} style={{ position: 'absolute', left: 0, top, width: 390, height: VID_H, overflow: 'hidden' }}>
      {c.wide ? <WideVideo img={c.img} /> : src ? <VideoFill it={video} src={src} active={active} vref={active ? vref : null} /> : <Item it={video} pw={390} />}
      {ui.filter((it) => it.n.startsWith('Scrim')).map((it) => <Item key={it.n} it={it} pw={390} />)}
      <div data-ui="" style={{ position: 'absolute', left: 0, top: 0, width: 390, height: VID_H }}>
        {ui.filter((it) => !it.n.startsWith('Scrim')).map(drawUi)}
      </div>
    </div>
  );
}

const PLAY_SVG = <svg width="30" height="30" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M8 5.2v13.6c0 .8.9 1.3 1.6.8l10-6.8c.6-.4.6-1.2 0-1.6l-10-6.8C8.9 3.9 8 4.4 8 5.2Z" /></svg>;
const PAUSE_SVG = <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF"><rect x="5.5" y="4" width="4.6" height="16" rx="1.4" /><rect x="13.9" y="4" width="4.6" height="16" rx="1.4" /></svg>;
const HEART = <svg width="96" height="96" viewBox="0 0 24 24" fill="#FF3B5C"><path d="M12 21C5.5 16 2 12.4 2 8.6C2 5.8 4.2 3.8 6.7 3.8C8.9 3.8 10.9 5.1 12 7.1C13.1 5.1 15.1 3.8 17.3 3.8C19.8 3.8 22 5.8 22 8.6C22 12.4 18.5 16 12 21Z" /></svg>;

export function ClipPlayer(props) {
  const [idx, setIdx] = useState(() => Math.max(0, Math.min(CLIPS.length - 1, clip.pick || 0)));
  const [st, setSt] = useState({ sheet: null, imm: false, fresh: '', sheetOpen: false, info: false });
  const [, force] = useState(0);
  const [toast, setToast] = useState(null);
  const [flash, setFlash] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [playing, setPlaying] = useState(true);
  const [scrub, setScrub] = useState(false);
  const timers = useRef([]);
  const root = useRef(null);
  const strip = useRef(null);
  const bar = useRef(null);
  const tRef = useRef(0);
  const playRef = useRef(true);
  const busy = useRef(false);
  // 진짜 영상(지금 칸이 영상 클립일 때만 값이 있다), 소리가 막혀 무음으로 시작했는지, 화면을 떠나는 중인지.
  const vRef = useRef(null);
  const needUnmute = useRef(false);
  const leaving = useRef(false);
  // 소리를 켠 첫 터치는 한 번 누름(일시정지)으로 세지 않는다.
  const unmuteTap = useRef(0);
  const bubRef = useRef(false);
  const [bub, setBub] = useState(false);
  // 리스트에서 카드를 눌러 들어오면 소리 켬 채 시작한다(브리프 11/11 CLIP 2번).
  const entered = useRef(false);
  if (!entered.current) { entered.current = true; clip.mute = false; }
  const c = CLIPS[idx];
  const later = (f, ms) => { const t = window.setTimeout(f, ms); timers.current.push(t); return t; };
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)); saveClip(); }, []);
  useEffect(() => onClip(() => force((k) => k + 1)), []);
  playRef.current = playing;

  // 화면을 떠날 때(뒤로, 에이전트 버튼, 브라우저 뒤로) 영상과 소리를 바로 멈춘다. 전환이 끝나 화면이 없어지면 VideoFill이 주소를 비운다.
  // 탭이 숨겨지면 일시정지하고, 돌아오면 재생 중이던 영상만 이어서 재생한다.
  // 개발 모드(StrictMode)는 효과를 정리했다가 다시 돌리므로 시작할 때 떠나는 중 표시를 지운다. 이 효과는 재생 시작 효과보다 먼저 선언한다.
  useEffect(() => {
    leaving.current = false;
    const stop = () => {
      leaving.current = true;
      const v = vRef.current;
      if (v) { v.pause(); v.muted = true; }
    };
    const vis = () => {
      const v = vRef.current;
      if (!v || leaving.current) return;
      if (document.visibilityState !== 'visible') v.pause();
      else if (playRef.current) v.play().catch(() => {});
    };
    const host = root.current && root.current.parentElement;
    const hot = (e) => { if (e.target && e.target.closest && e.target.closest('[data-hotspot]')) stop(); };
    // 소리가 막혀 무음으로 시작한 경우 화면 어디든 첫 터치에서 소리를 켠다(소리 버튼은 flipMute가 따로 처리한다).
    const firstTouch = (e) => {
      if (!needUnmute.current) return;
      if (e.target && e.target.closest && e.target.closest('[aria-label="소리"]')) return;
      needUnmute.current = false;
      unmuteTap.current = performance.now();
      const v = vRef.current;
      if (v && !leaving.current) { v.muted = !!clip.mute; if (v.paused && playRef.current) v.play().catch(() => {}); }
    };
    window.addEventListener('drrrk:go', stop);
    window.addEventListener('drrrk:splash', stop);
    window.addEventListener('popstate', stop);
    document.addEventListener('visibilitychange', vis);
    if (host) { host.addEventListener('click', hot, true); host.addEventListener('pointerdown', firstTouch, true); }
    return () => {
      stop();
      window.removeEventListener('drrrk:go', stop);
      window.removeEventListener('drrrk:splash', stop);
      window.removeEventListener('popstate', stop);
      document.removeEventListener('visibilitychange', vis);
      if (host) { host.removeEventListener('click', hot, true); host.removeEventListener('pointerdown', firstTouch, true); }
    };
  }, []);

  // 클립이 바뀌면 그 클립이 멈췄던 자리부터 다시 재생한다.
  useEffect(() => {
    tRef.current = clip.time[c.id] || 0;
    setPlaying(true);
    if (bar.current) bar.current.style.transform = 'scaleX(' + tRef.current / DURATION + ')';
    // 영상 클립은 언제나 0초부터 소리 켬 채 재생한다. 소리 재생이 막히면(NotAllowedError) 무음으로 시작하고 첫 터치에서 소리를 켠다.
    const v = vRef.current;
    bubRef.current = false;
    setBub(false);
    if (!v || leaving.current) return undefined;
    if (bar.current) bar.current.style.transform = 'scaleX(0)';
    v.loop = !!clip.loop;
    v.volume = 1;
    v.muted = !!clip.mute;
    try { v.currentTime = 0; } catch (e) { /* 메타데이터 전 */ }
    needUnmute.current = false;
    const p = v.play();
    if (p && p.catch) {
      p.catch((err) => {
        if (leaving.current || vRef.current !== v) return;
        if (err && err.name === 'NotAllowedError' && !v.muted) {
          v.muted = true;
          needUnmute.current = true;
          v.play().catch(() => {});
        }
      });
    }
    const ended = () => { if (!clip.loop) setPlaying(false); };
    v.addEventListener('ended', ended);
    return () => v.removeEventListener('ended', ended);
  }, [c.id]);

  // 한 번 누름(재생과 일시정지)과 진행 막대 끝기가 바꾼 playing 값을 영상에 그대로 옮긴다.
  useEffect(() => {
    const v = vRef.current;
    if (!v || leaving.current) return;
    if (playing) { if (v.paused && document.visibilityState === 'visible') { if (v.ended) v.currentTime = 0; v.play().catch(() => {}); } } else v.pause();
  }, [playing, c.id]);
  // 재생 방식 설정(더보기 메뉴)을 영상 반복에 그대로 적용한다.
  useEffect(() => { if (vRef.current) vRef.current.loop = !!clip.loop; });


  // 진행 막대: 재생 중이면 매 프레임 시간을 더하고 막대 폭을 transform(scaleX)으로 바꾼다.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      const v = vRef.current;
      if (v) {
        // 영상 클립: 막대는 영상의 실제 시간(currentTime / duration)을 따라 차고, 반복되면 0으로 돌아간다.
        // 말풍선도 같은 시간을 따른다. 1.2초가 지나면 올라오고, 0초로 돌아가면 사라진다(일시정지 중에는 시간이 멈춰 타이머도 멈춘다).
        const dur = v.duration && isFinite(v.duration) ? v.duration : 8;
        const vt = v.currentTime || 0;
        tRef.current = vt;
        if (bar.current) bar.current.style.transform = 'scaleX(' + Math.min(1, vt / dur) + ')';
        const want = vt >= BUBBLE_AT;
        if (want !== bubRef.current) { bubRef.current = want; setBub(want); }
        raf = requestAnimationFrame(tick);
        return;
      }
      if (playRef.current && !scrubRef.current) {
        let t = tRef.current + dt;
        if (t >= DURATION) {
          if (clip.loop) t = 0;
          else { t = DURATION; setPlaying(false); }
        }
        tRef.current = t;
        clip.time[CLIPS[idxRef.current].id] = t;
      }
      if (bar.current) bar.current.style.transform = 'scaleX(' + tRef.current / DURATION + ')';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const idxRef = useRef(idx);
  idxRef.current = idx;
  const scrubRef = useRef(false);

  const say = (text) => {
    const id = Date.now();
    setToast({ text, id });
    later(() => setToast((t) => (t && t.id === id ? null : t)), 1900);
  };
  const pop = (key) => { setSt((s) => ({ ...s, fresh: key })); later(() => setSt((s) => ({ ...s, fresh: '' })), 420); };
  const flipLike = () => { toggleLike(c.id); pop('like'); };
  const flipSave = () => { const on = toggleSave(c.id); pop('save'); say(on ? '저장했어요' : '저장을 취소했어요'); };
  // 소리 아이콘: 영상 클립에서는 영상 소리를 켜고 끈다. 소리가 막혀 무음으로 시작한 상태에서 누르면 소리를 켠다.
  const flipMute = () => {
    const v = vRef.current;
    if (v && needUnmute.current) { needUnmute.current = false; clip.mute = false; v.muted = false; saveClip(); return; }
    clip.mute = !clip.mute;
    if (v) v.muted = clip.mute;
    saveClip();
  };
  const follow = () => { const on = toggleFollow(c.creator); say(on ? c.creator + '님을 팔로우했어요' : '팔로우를 취소했어요'); };
  const openSheet = (kind, info) => {
    setSt((s) => ({ ...s, sheet: kind, info: !!info, sheetOpen: false }));
    later(() => setSt((s) => ({ ...s, sheetOpen: true })), 30);
  };
  const closeSheet = () => {
    setSt((s) => ({ ...s, sheetOpen: false }));
    later(() => setSt((s) => ({ ...s, sheet: null })), 400);
  };
  const copy = (url) => {
    const ok = () => { say('링크를 복사했어요'); closeSheet(); };
    const no = () => { say('이 브라우저는 공유를 지원하지 않아요'); closeSheet(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, no);
    else no();
  };
  const share = () => {
    const data = { title: c.creator + ' 클립', text: c.title, url: window.location.href };
    if (navigator.share) {
      navigator.share(data).then(closeSheet, (e) => { if (e && e.name === 'AbortError') closeSheet(); else copy(data.url); });
      return;
    }
    copy(data.url);
  };
  const act = (kind) => {
    if (kind === 'share') return share();
    if (kind === 'like') { flipLike(); return undefined; }
    if (kind === 'save') { flipSave(); return undefined; }
    if (kind === 'comments') {
      setSt((s) => ({ ...s, sheetOpen: false }));
      later(() => openSheet('comments'), 360);
      return undefined;
    }
    if (kind === 'play') {
      clip.loop = !clip.loop;
      saveClip();
      force((k) => k + 1);
      later(closeSheet, 320);
      say(clip.loop ? '반복 재생으로 설정했어요' : '한 번만 재생으로 설정했어요');
      return undefined;
    }
    closeSheet();
    if (kind === 'immersive') later(() => setSt((s) => ({ ...s, imm: true })), 380);
    else if (kind === 'hide') say('이 콘텐츠를 숨겼어요');
    else if (kind === 'hideCreator') say('웹드플리 콘텐츠를 숨겼어요');
    else if (kind === 'report') say('신고가 접수됐어요');
    return undefined;
  };

  // ---------- 영상 위 손짓: 한 번 누름, 두 번 누름, 위아래 쓸기 ----------
  const g = useRef(null);
  const tap = useRef({ t: 0, x: 0, y: 0, timer: 0 });
  const toScene = (e) => {
    const r = root.current.getBoundingClientRect();
    const s = r.width / 390 || 1;
    return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s, s };
  };
  const setStrip = (y, ms) => {
    const el = strip.current;
    if (!el) return;
    el.style.transition = ms ? 'transform ' + ms + 'ms ' + EASE : 'none';
    el.style.transform = y ? 'translateY(' + y + 'px)' : '';
  };
  const togglePlay = () => {
    const next = !playRef.current;
    if (next && !vRef.current && tRef.current >= DURATION) tRef.current = 0;
    setPlaying(next);
    const fid = Date.now();
    setFlash({ id: fid, on: next });
    later(() => setFlash((f) => (f && f.id === fid ? null : f)), 640);
  };
  const heart = (p) => {
    const id = Date.now() + Math.random();
    setHearts((h) => h.concat({ id, x: p.x, y: p.y, r: Math.round(Math.random() * 30 - 15) }));
    later(() => setHearts((h) => h.filter((k) => k.id !== id)), 950);
    if (!isLiked(c.id)) { setLiked(c.id); pop('like'); }
  };
  const onDown = (e) => {
    if (busy.current || (e.target.closest && e.target.closest('[role="button"], button'))) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const p = toScene(e);
    g.current = { id: e.pointerId, x: p.x, y: p.y, s: p.s, cy: e.clientY, cx: e.clientX, dy: 0, on: false, t: performance.now(), lt: performance.now(), ly: e.clientY, v: 0 };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* 무시 */ }
  };
  const onMove = (e) => {
    const d = g.current;
    if (!d || d.id !== e.pointerId) return;
    const dy = (e.clientY - d.cy) / d.s;
    const dx = (e.clientX - d.cx) / d.s;
    if (!d.on && Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) d.on = true;
    if (!d.on) return;
    const now = performance.now();
    d.v = ((e.clientY - d.ly) / d.s) / Math.max(1, now - d.lt);
    d.lt = now; d.ly = e.clientY;
    const edge = (dy < 0 && idx === CLIPS.length - 1) || (dy > 0 && idx === 0);
    d.dy = edge ? dy * 0.3 : dy;
    setStrip(d.dy, 0);
  };
  const onUp = (e) => {
    const d = g.current;
    g.current = null;
    if (!d) return;
    if (d.on) {
      const dir = d.dy < -90 || (d.dy < -24 && d.v < -0.45) ? 1 : d.dy > 90 || (d.dy > 24 && d.v > 0.45) ? -1 : 0;
      const to = idx + dir;
      if (!dir || to < 0 || to >= CLIPS.length) { setStrip(0, 240); return; }
      busy.current = true;
      clip.time[c.id] = tRef.current;
      // 다른 클립으로 넘어가는 순간 영상을 멈추고 소리를 끈다.
      if (vRef.current) { vRef.current.pause(); vRef.current.muted = true; }
      setStrip(-dir * VID_H, SLIDE_MS);
      later(() => {
        setStrip(0, 0);
        setIdx(to);
        setPick(to);
        busy.current = false;
      }, SLIDE_MS);
      return;
    }
    if (e.type === 'pointercancel') return;
    const now = performance.now();
    const k = tap.current;
    if (now - k.t < 300 && Math.hypot(d.x - k.x, d.y - k.y) < 60) {
      window.clearTimeout(k.timer);
      tap.current = { t: 0, x: 0, y: 0, timer: 0 };
      heart(d);
      return;
    }
    if (unmuteTap.current && now - unmuteTap.current < 600) { unmuteTap.current = 0; return; }
    const timer = later(togglePlay, 300);
    tap.current = { t: now, x: d.x, y: d.y, timer };
  };

  // ---------- 진행 막대 누르기와 끌기 ----------
  const seek = (e) => {
    const p = toScene(e);
    const v = vRef.current;
    if (v) {
      const dur = v.duration && isFinite(v.duration) ? v.duration : 8;
      v.currentTime = Math.max(0, Math.min(dur - 0.05, (p.x / 390) * dur));
      return;
    }
    tRef.current = Math.max(0, Math.min(DURATION, (p.x / 390) * DURATION));
    clip.time[c.id] = tRef.current;
    if (bar.current) bar.current.style.transform = 'scaleX(' + tRef.current / DURATION + ')';
  };
  const barDown = (e) => {
    e.stopPropagation();
    scrubRef.current = true;
    setScrub(true);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* 무시 */ }
    seek(e);
  };
  const barMove = (e) => { if (scrubRef.current) seek(e); };
  const barUp = () => {
    if (!scrubRef.current) return;
    scrubRef.current = false;
    setScrub(false);
    if (tRef.current < DURATION && !playRef.current) setPlaying(true);
  };

  const panels = [idx - 1, idx, idx + 1].filter((i) => i >= 0 && i < CLIPS.length);
  const fixed = useMemo(() => FIXED_ITEMS.map((it) => (it.n === 'Icon / 소리' && clip.mute ? { ...it, svg: SOUND_OFF, key: 'mute' } : it)), [clip.mute]);
  const btn = (label, x, y, w, h, onClick, r) => (
    <button key={label} type="button" aria-label={label} className="cp-btn" onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ left: x, top: y, width: w, height: h, borderRadius: r == null ? 12 : r }} />
  );
  const sheetOn = !!st.sheet;
  return (
    <div ref={root} data-figma="클립 영상 보기" data-node="clip-player" className={'ck-root' + (st.imm ? ' cp-imm' : '')} style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', background: '#000000' }} {...props}>
      <style>{CSS + P_CSS}</style>
      <div data-figma="영상 스트립" className="cp-strip" onClick={(e) => e.stopPropagation()} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        style={{ position: 'absolute', left: 0, top: 0, width: 390, height: VID_H, overflow: 'hidden', pointerEvents: sheetOn ? 'none' : 'auto' }}>
        <div ref={strip} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: VID_H }}>
          {panels.map((i) => <Panel key={CLIPS[i].id} c={CLIPS[i]} top={(i - idx) * VID_H} fresh={i === idx ? st.fresh : ''} onFollow={follow} active={i === idx} vref={vRef} bub={bub} />)}
        </div>
        {flash ? <div key={flash.id} className="cp-flash" aria-hidden="true">{flash.on ? PLAY_SVG : PAUSE_SVG}</div> : null}
        {hearts.map((h) => <div key={h.id} className="cp-heart" aria-hidden="true" style={{ left: h.x - 48, top: h.y - 60, '--r': h.r + 'deg' }}>{HEART}</div>)}
      </div>
      {fixed.map((it) => <Item key={it.key || it.n} it={it} pw={390} />)}
      <div data-figma="진행 바" role="slider" aria-label="재생 위치" aria-valuemin={0} aria-valuemax={DURATION} aria-valuenow={Math.round(tRef.current)}
        onPointerDown={barDown} onPointerMove={barMove} onPointerUp={barUp} onPointerCancel={barUp} onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', left: 0, top: 734, width: 390, height: 26, zIndex: 5, cursor: 'pointer', touchAction: 'none' }}>
        <div style={{ position: 'absolute', left: 0, top: 14.5, width: 390, height: 2, transformOrigin: '50% 50%', transform: scrub ? 'scaleY(2.5)' : 'none', transition: 'transform 160ms ' + EASE }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.18)' }} />
          <div ref={bar} style={{ position: 'absolute', inset: 0, background: '#82CD4A', transformOrigin: '0 50%', transform: 'scaleX(' + (clip.time[c.id] || 0) / DURATION + ')' }} />
        </div>
      </div>
      {btn('소리', 340, 53, 46, 44, flipMute, 22)}
      {btn('이벤트 댓글 남기기', 333, 410, 52, 56, () => openSheet('comments'), 26)}
      {btn('좋아요', 338, 483, 44, 62, flipLike)}
      {btn('댓글', 338, 552, 44, 62, () => openSheet('comments'))}
      {btn('저장', 338, 622, 44, 62, flipSave)}
      {btn('더보기', 336, 696, 48, 32, () => openSheet('more'), 16)}
      {!videoOf(c) || bub ? btn('댓글 미리보기', 12, 580, 240, 38, () => openSheet('comments'), 19) : null}
      {btn('댓글 입력', 15, 759, 359, 47, () => openSheet('comments'), 24)}
      {btn('캡션 더보기', 12, 664, 330, 28, () => openSheet('comments', true), 8)}
      {st.imm ? <button type="button" aria-label="화면 되돌리기" onClick={(e) => { e.stopPropagation(); setSt((s) => ({ ...s, imm: false })); }} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: '100%', zIndex: 55, border: 0, padding: 0, background: 'transparent', cursor: 'pointer' }} /> : null}
      {st.sheet === 'comments' ? <CommentSheet clip={c} mirror={videoOf(c) ? vRef : null} info={st.info} open={st.sheetOpen} onClose={closeSheet} onCount={() => force((k) => k + 1)} say={say} onFollow={follow} following={isFollow(c.creator)} /> : null}
      {st.sheet === 'more' ? <MoreSheet open={st.sheetOpen} onClose={closeSheet} onAction={act} stats={{ like: fmt(likeCount(c)), comment: fmt(commentsOf(c)) }} liked={isLiked(c.id)} saved={isSaved(c.id)} loop={clip.loop} /> : null}
      <ClipAgent delay={1600} />
      {toast ? (
        <div key={toast.id} role="status" style={{ position: 'absolute', left: '50%', top: 692, zIndex: 70, maxWidth: 330, padding: '10px 16px', borderRadius: 14, background: 'rgba(44,44,46,0.96)', color: '#F2F2F7', fontFamily: FONT, fontSize: 13.5, fontWeight: 600, lineHeight: '19px', letterSpacing: '-0.27px', whiteSpace: 'pre', pointerEvents: 'none', animation: 'cpToast 240ms cubic-bezier(0.05,0.7,0.1,1) both', boxShadow: '0 6px 16px rgba(0,0,0,0.4)' }}>{toast.text}</div>
      ) : null}
    </div>
  );
}
