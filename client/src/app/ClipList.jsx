// 네이버 클립 콘텐츠 리스트(추천 탭). 팀 피그마 "클립 콘텐츠 리스트"(1843:40980)와 같은 값이다.
// 모든 카드가 눌리고(영상 보기 56, 배너는 스플래시 뒤 드르륵 홈 25), 위 탭(구독, 추천, 내클립)과 아래 탭, 즐겨찾기, 검색이 반응한다.
// 피드는 세로로 스크롤되고 맨 위에서 아래로 당기면 80px까지 늘어났다가 돌아온다. 머리말과 아래 탭은 고정이다.
// 드르륵 에이전트 버튼은 클립 모든 화면에서 같은 자리에 떠다닌다(ClipAgent.jsx).
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Item, Hit } from './ClipKit.jsx';
import { LIST } from './ClipScenes.js';
import { ClipAgent } from './ClipAgent.jsx';
import { CLIPS, SUBS, clip, saveClip, clipPick, isFollow, isSaved, onClip } from './clipState.js';
import { videoOf, previewAt, reducedMotion } from './clipVideo.js';

const FONT = "'SUIT', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.2, 0, 0, 1)';
const byName = Object.fromEntries(LIST.map((it) => [it.n, it]));
const BAR = byName['하단 바'];
const BAR_TOP = BAR.y;
const PULL_MAX = 80;

// 카드 묶음(피그마 이름 그대로). clip은 clipState.js CLIPS 번호, col은 피그마에서 놓인 세로줄(0 왼쪽, 1 오른쪽)이다.
const CARD_DEF = [
  { clip: 0, col: 0, names: ['썸네일 / 쌍밍아웃 영상', '아바타 / 쌍수일기', '크리에이터 이름 줄 / 쌍수일기'] },
  { banner: true, col: 1, names: ['배너 / 드르륵 칵 일단 앉아'] },
  { clip: 1, col: 1, names: ['썸네일 / 편집 영상', 'NEW 알약 / 편집 영상', '시간 알약 / 02:00', '제목 / 편집 영상', '아바타 / 편집하는 하루', '크리에이터 / 편집하는 하루'] },
  { clip: 2, col: 1, names: ['썸네일 / 댄스 연습실', '시간 알약 / 00:11'] },
  { clip: 3, col: 0, names: ['썸네일 / 카페 모아보기', 'NEW 알약 / 카페 모아보기', '제목 / 카페 모아보기'] },
];
const bottomOf = (it) => {
  if (it.k === 'row') return it.cy + 16;
  if (it.k === 'text') { const lh = it.lh || Math.round(it.size * 1.4); return it.cy != null ? it.cy + lh / 2 : it.y + lh * it.s.split('\n').length; }
  return it.y + it.h;
};
const CARDS = CARD_DEF.map((d) => {
  const items = d.names.map((n) => byName[n]);
  const lead = items[0];
  const box = [lead.x, lead.y, lead.w, Math.max(...items.map(bottomOf)) - lead.y];
  return { ...d, items, box };
});
const COL_X = [7.6, 199.2];
const GAP = 16;
const TOP = 109;
const BOTTOM_PAD = 16 + BAR.h;

// 탭별 카드 자리. 추천은 피그마 자리 그대로, 구독과 내클립은 같은 두 줄에 위에서부터 짧은 줄 먼저 채운다.
function layout(tab) {
  if (tab === 'rec') return { cards: CARDS.map((c) => ({ c, at: [c.box[0], c.box[1]] })), h: Math.max(...CARDS.map((c) => c.box[1] + c.box[3])) + BOTTOM_PAD };
  const pickC = tab === 'sub'
    ? CARDS.filter((c) => !c.banner && (SUBS.includes(CLIPS[c.clip].creator) || isFollow(CLIPS[c.clip].creator)))
    : CARDS.filter((c) => !c.banner && isSaved(CLIPS[c.clip].id));
  const colY = [TOP, TOP];
  const cards = pickC.map((c) => {
    const k = colY[0] <= colY[1] ? 0 : 1;
    const at = [COL_X[k] + (c.box[0] - COL_X[c.col]), colY[k]];
    colY[k] += c.box[3] + GAP;
    return { c, at };
  });
  return { cards, h: Math.max(...colY) + BOTTOM_PAD };
}

const go = (to, t) => window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to, t } }));
// 끌어서 스크롤한 직후의 클릭은 카드 누름으로 보지 않는다.
let dragged = false;

const TAB_N = { sub: '탭 구독', rec: '탭 추천', mine: '탭 내클립' };
const BOTTOM = [
  { k: 'shop', icon: '아이콘 / 쇼핑 N+ 넓다세일', label: '라벨 쇼핑', x: 0, w: 77 },
  { k: 'home', icon: 'Icon / 홈', label: '라벨 홈', x: 78.4, w: 77 },
  { k: 'today', icon: 'Icon / 투데이', label: '라벨 투데이', x: 156, w: 77 },
  { k: 'clip', icon: 'Icon / 클립', label: '라벨 클립', x: 234, w: 77 },
  { k: 'my', icon: 'Icon / 마이', label: '라벨 마이', x: 312, w: 78 },
];
const barKid = Object.fromEntries(BAR.ch.map((c) => [c.n, c]));
const FAV_ON = (svg) => svg.replace('<path d="M1.6 22V7.3', '<path fill="#FFFFFF" d="M1.6 22V7.3');

const CSS = `
@keyframes clIn{from{opacity:0}to{opacity:1}}
@keyframes clOut{from{opacity:1}to{opacity:0}}
.cl-feed{scrollbar-width:none;-webkit-overflow-scrolling:touch}
.cl-feed::-webkit-scrollbar{display:none}
.cl-in{animation:clIn 180ms ${EASE} both}
.cl-out{animation:clOut 180ms ${EASE} both;pointer-events:none}
.cl-ul{transition:transform 240ms cubic-bezier(.05,.7,.1,1)}
.cl-tab{transition:color 180ms ${EASE}}
@media (prefers-reduced-motion:reduce){.cl-in,.cl-out{animation-duration:1ms}.cl-ul{transition:none}}
`;

// 썸네일 영상(탁빛나 1843:40980 핀 "쇼츠 미리보기처럼 무음으로 반복재생"): 영상 전체(8초)를 무음으로 반복한다. 끝은 첫 장면으로 디졸브되어 있어 끊기지 않는다.
// 첨 장면이 뜨기 전에는 poster(없으면 아래 깔린 피그마 썸네일 사진)가 보인다. 줄인 움직임 설정이면 poster만 보인다.
// 화면이 숨거나(탭 전환) 피드 밖으로 스크롤되면 멈추고, 돌아오면 멈춘 자리부터 이어서 돈다.
function ThumbVideo({ c, w, h, r }) {
  const src = videoOf(c);
  const ref = useRef(null);
  const still = reducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    v.muted = true;
    v.defaultMuted = true;
    let seen = true;
    const want = () => seen && document.visibilityState === 'visible';
    const run = () => { if (want()) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause(); };
    const meta = () => { if (previewAt.t > 0 && previewAt.t < (v.duration || 8)) v.currentTime = previewAt.t; run(); };
    if (v.readyState >= 1) meta(); else v.addEventListener('loadedmetadata', meta, { once: true });
    const keep = () => { previewAt.t = v.currentTime; };
    v.addEventListener('timeupdate', keep);
    document.addEventListener('visibilitychange', run);
    let io = null;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((es) => { seen = es[es.length - 1].isIntersecting; run(); });
      io.observe(v);
    }
    return () => {
      previewAt.t = v.currentTime;
      v.removeEventListener('loadedmetadata', meta);
      v.removeEventListener('timeupdate', keep);
      document.removeEventListener('visibilitychange', run);
      if (io) io.disconnect();
      v.pause();
    };
  }, []);
  const box = { position: 'absolute', left: 0, top: 0, width: w, height: h, borderRadius: r, overflow: 'hidden', pointerEvents: 'none' };
  if (still) return <div data-figma="썸네일 영상" style={box}><img src={src.poster} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>;
  return (
    <div data-figma="썸네일 영상" style={box}>
      <video ref={ref} src={src.preview} poster={src.poster} muted autoPlay loop playsInline preload="auto" disablePictureInPicture
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%', display: 'block' }} />
    </div>
  );
}

function Feed({ tab, cls }) {
  const { cards } = layout(tab);
  const open = (c) => {
    if (dragged) return;
    if (c.banner) { go(25, 'enter'); return; }
    clipPick(c.clip);
    go(56, 'push');
  };
  return (
    <div className={cls} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: '100%' }}>
      {cards.map(({ c, at }) => (
        <Hit key={c.banner ? 'banner' : c.clip} name={c.banner ? '배너 카드' : '카드 / ' + CLIPS[c.clip].card} box={c.box} at={at} items={c.items}
          label={c.banner ? '드르륵 칵 일단 앉아' : CLIPS[c.clip].title} onTap={() => open(c)}>
          {!c.banner && videoOf(CLIPS[c.clip]) ? <ThumbVideo c={CLIPS[c.clip]} w={c.items[0].w} h={c.items[0].h} r={c.items[0].r} /> : null}
        </Hit>
      ))}
      {tab === 'mine' && !cards.length ? (
        <p style={{ position: 'absolute', left: 0, top: 418, width: 390, margin: 0, textAlign: 'center', fontFamily: FONT, fontSize: 15, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.3px', color: '#9AA1A6' }}>저장한 클립이 없어요</p>
      ) : null}
    </div>
  );
}

export function ClipList(props) {
  const [tab, setTab] = useState(clip.tab || 'rec');
  const [prev, setPrev] = useState(null);
  const [fav, setFav] = useState(!!clip.fav);
  const [hot, setHot] = useState('clip');
  const [, force] = useState(0);
  const [ul, setUl] = useState({ x: 0, s: 1 });
  const sc = useRef(null);
  const rootEl = useRef(null);
  const pullEl = useRef(null);
  const tabRefs = useRef({});
  const timers = useRef([]);
  const later = (f, ms) => { const t = window.setTimeout(f, ms); timers.current.push(t); return t; };
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  useEffect(() => onClip(() => force((k) => k + 1)), []);
  // flow.js의 첫 카드 누름 칸(55에서 56)은 자리가 고정이라 스크롤과 탭 바꿈을 못 따라간다. 이 화면에서는 카드가 직접 받으므로 그 칸을 숨긴다.
  useLayoutEffect(() => {
    const box = rootEl.current && rootEl.current.parentElement;
    if (!box) return;
    box.querySelectorAll("[data-hotspot]").forEach((b) => { if (b.getAttribute("aria-label") === "쌍밍아웃 영상") b.style.display = "none"; });
  }, []);

  // 밑줄 자리: 피그마 밑줄(추천 아래 x 172, 폭 33)을 고른 탭 글자 폭과 자리에 맞게 옮기고 늘린다(transform만).
  useLayoutEffect(() => {
    const el = tabRefs.current[tab];
    const base = tabRefs.current.rec;
    if (!el || !base) return;
    const w = el.firstChild ? el.firstChild.offsetWidth : 0;
    const bw = base.firstChild ? base.firstChild.offsetWidth : 0;
    if (!w || !bw) return;
    setUl({ x: byName[TAB_N[tab]].x - byName['탭 추천'].x, s: w / bw });
  }, [tab]);

  const pick = (t) => {
    if (t === tab) { sc.current && sc.current.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setPrev(tab);
    setTab(t);
    clip.tab = t;
    saveClip();
    if (sc.current) sc.current.scrollTop = 0;
    later(() => setPrev(null), 200);
  };

  // 당겨서 늘이기: 맨 위에서 아래로 끌면 피드가 최대 80px까지 따라 내려오고, 놓으면 300ms에 돌아간다.
  const setPull = (p, anim) => {
    const el = pullEl.current;
    if (!el) return;
    el.style.transition = anim ? 'transform 300ms ' + EASE : 'none';
    el.style.transform = p ? 'translateY(' + p + 'px)' : '';
  };
  const rubber = (d) => PULL_MAX * (1 - Math.exp(-d / 120));

  // 터치: 브라우저 스크롤을 그대로 쓰고, 맨 위에서 아래로 당길 때만 가로챈다.
  useEffect(() => {
    const el = sc.current;
    if (!el) return undefined;
    let y0 = null;
    let pulling = false;
    const scale = () => (el.getBoundingClientRect().height / el.offsetHeight) || 1;
    const ts = (e) => { y0 = el.scrollTop <= 0 ? e.touches[0].clientY : null; pulling = false; };
    const tm = (e) => {
      if (y0 == null) return;
      const d = (e.touches[0].clientY - y0) / scale();
      if (d > 0 && el.scrollTop <= 0) { pulling = true; e.preventDefault(); setPull(rubber(d), false); }
      else if (pulling) { setPull(0, false); pulling = false; }
    };
    const te = () => { if (pulling) setPull(0, true); y0 = null; pulling = false; };
    el.addEventListener('touchstart', ts, { passive: true });
    el.addEventListener('touchmove', tm, { passive: false });
    el.addEventListener('touchend', te);
    el.addEventListener('touchcancel', te);
    return () => { el.removeEventListener('touchstart', ts); el.removeEventListener('touchmove', tm); el.removeEventListener('touchend', te); el.removeEventListener('touchcancel', te); };
  }, []);

  // 마우스: 끌면 피드가 손가락처럼 따라 움직이고(관성 포함), 맨 위에서는 당겨진다.
  const drag = useRef(null);
  const onDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = sc.current;
    drag.current = { y: e.clientY, top: el.scrollTop, on: false, id: e.pointerId, s: (el.getBoundingClientRect().height / el.offsetHeight) || 1, v: 0, t: performance.now(), ly: e.clientY, pull: 0 };
    dragged = false;
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dy = (e.clientY - d.y) / d.s;
    if (!d.on && Math.abs(dy) > 6) {
      d.on = true; dragged = true;
      try { sc.current.setPointerCapture(d.id); } catch (err) { /* 무시 */ }
    }
    if (!d.on) return;
    const now = performance.now();
    d.v = ((e.clientY - d.ly) / d.s) / Math.max(1, now - d.t);
    d.t = now; d.ly = e.clientY;
    const want = d.top - dy;
    if (want < 0) { sc.current.scrollTop = 0; d.pull = rubber(-want); setPull(d.pull, false); }
    else { sc.current.scrollTop = want; if (d.pull) { d.pull = 0; setPull(0, false); } }
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.pull) setPull(0, true);
    else if (d.on && Math.abs(d.v) > 0.2) {
      let v = -d.v * 16;
      const step = () => { if (!sc.current || Math.abs(v) < 0.4) return; sc.current.scrollTop += v; v *= 0.94; requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    if (d.on) window.setTimeout(() => { dragged = false; }, 0);
  };

  const tapBottom = (k) => {
    if (k === 'clip') { setHot('clip'); if (sc.current) sc.current.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setHot(k);
    later(() => setHot('clip'), 220);
  };
  const tapFav = () => { const v = !fav; setFav(v); clip.fav = v; saveClip(); };

  const L = layout(tab);
  const H = prev ? Math.max(L.h, layout(prev).h) : L.h;
  const head = (n) => byName[n];
  const tabItem = (t) => ({ ...head(TAB_N[t]), c: t === tab ? '#FFFFFF' : '#B0B0B0', cls: 'cl-tab' });
  const iconOf = (b) => {
    const it = barKid[b.icon];
    if (b.k === 'shop') return it;
    const on = hot === b.k;
    if (b.k === 'clip') return on ? it : { ...it, svg: it.svg.replace('fill="#FFFFFF" stroke="none"', 'fill="#D9D9D9" stroke="none"').replace('stroke="#FFFFFF"', 'stroke="#D9D9D9"') };
    return on ? { ...it, svg: it.svg.replace('stroke="#F5F5F5"', 'stroke="#FFFFFF"') } : it;
  };
  const labelOf = (b) => ({ ...barKid[b.label], c: hot === b.k ? '#FFFFFF' : '#D9D9D9', wt: hot === b.k ? 600 : 400 });

  return (
    <div ref={rootEl} data-figma="클립 콘텐츠 리스트" data-node="clip-list" className="ck-root" style={{ position: 'relative', width: 390, height: 844, overflow: 'hidden', background: '#131313' }} {...props}>
      <style>{CSS}</style>
      <div ref={sc} data-figma="피드" className="cl-feed" onClick={(e) => e.stopPropagation()} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, overflowY: 'auto', overflowX: 'hidden', overscrollBehavior: 'contain', touchAction: 'pan-y' }}>
        <div ref={pullEl} style={{ position: 'relative', width: 390, height: H }}>
          {prev ? <Feed key={'p' + prev} tab={prev} cls="cl-out" /> : null}
          <Feed key={'t' + tab} tab={tab} cls={prev ? 'cl-in' : undefined} />
        </div>
      </div>
      <div data-figma="머리말" style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 100, background: '#131313', zIndex: 2 }}>
        <Hit name="즐겨찾기" box={[8, 55, 41, 40]} label="즐겨찾기" pressed={fav} onTap={tapFav} items={[fav ? { ...head('Icon / 즐겨찾기'), svg: FAV_ON(head('Icon / 즐겨찾기').svg) } : head('Icon / 즐겨찾기')]} />
        <Hit name="검색" box={[340, 54, 43, 41]} label="검색" onTap={() => {}} items={[head('Icon / 검색')]} />
        {['sub', 'rec', 'mine'].map((t) => {
          const it = head(TAB_N[t]);
          const w = t === 'mine' ? 54 : 38;
          return (
            <div key={t} ref={(el) => { tabRefs.current[t] = el; }} style={{ position: 'absolute', left: it.x - 4, top: 56, width: w + 8, height: 38 }}>
              <span style={{ position: 'absolute', left: 4, top: 0, fontFamily: FONT, fontSize: it.size, fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'pre', visibility: 'hidden', pointerEvents: 'none' }}>{it.s}</span>
              <Hit box={[it.x - 4, 56, w + 8, 38]} at={[0, 0]} label={it.s} pressed={t === tab} onTap={() => pick(t)} items={[tabItem(t)]} />
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 0, pointerEvents: 'none' }}>
          <div className="cl-ul" style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 0, transformOrigin: byName['탭 추천'].x + 'px 0', transform: 'translateX(' + ul.x + 'px) scaleX(' + ul.s + ')' }}>
            <Item it={head('탭 밑줄')} pw={390} />
          </div>
        </div>
      </div>
      <div data-figma="하단 바" style={{ position: 'absolute', left: 0, top: BAR_TOP, width: 390, height: BAR.h, borderRadius: '26px 26px 0 0', background: 'linear-gradient(180deg,#1A1A1A 0%,#2F2F2F 100%)', zIndex: 3 }}>
        <Item it={barKid['구분선']} pw={390} />
        {BOTTOM.map((b) => (
          <Hit key={b.k} name={'아래 탭 ' + b.k} box={[b.x, 0, b.w, BAR.h]} label={barKid[b.label].s} pressed={hot === b.k} onTap={() => tapBottom(b.k)} items={[iconOf(b), labelOf(b)]} />
        ))}
      </div>
      <ClipAgent delay={700} />
    </div>
  );
}
