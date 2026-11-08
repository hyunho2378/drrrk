// 네이버 클립 영상 보기. 팀 피그마 "클립 영상 보기"와 같은 값이고, 오른쪽 버튼과 댓글 말풍선은 모두 눌린다.
// 좋아요와 저장은 켜고 끌 수 있고, 댓글은 시트가 올라오고, 더보기는 메뉴가 올라온다. 공유는 기기의 공유창을 연다.
// 드르륵 에이전트 버튼은 영상이 나온 뒤 오른쪽에서 튀어나온다.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Scene, pic } from './ClipKit.jsx';
import { PLAYER } from './ClipScenes.js';
import { CSS, CommentSheet, MoreSheet, commentTotal } from './ClipSheets.jsx';
import { ClipAgent } from './ClipAgent.jsx';

const FONT = "'SUIT', system-ui, sans-serif";
// 화면을 나갔다 들어와도 켜 둔 상태가 남는다.
const memo = { like: false, save: false, mute: false };

const SOUND_OFF = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="M2.2 8H5.5L13.2 2.8V21.2L5.5 16H2.2Z" stroke-width="2.2"/><path d="M17.5 9L23.5 15M23.5 9L17.5 15" stroke-width="2.2"/></svg>';

function decorate(items, st) {
  const out = [];
  items.forEach((it) => {
    if (it.n === '드르륵 에이전트 버튼') return;
    if (it.n === 'Icon / 좋아요' && st.like) return out.push({ ...it, svg: it.svg.replace('fill="none" stroke="#FFFFFF"', 'fill="#FF3B5C" stroke="#FF3B5C"'), cls: st.fresh === 'like' ? 'cp-pop' : undefined, key: 'like-on' + (st.fresh || '') });
    if (it.n === '좋아요 수' && st.like) return out.push({ ...it, s: '2,414' });
    if (it.n === 'Icon / 저장' && st.save) return out.push({ ...it, svg: it.svg.replace('fill="none" stroke="#FFFFFF"', 'fill="#FFFFFF" stroke="#FFFFFF"'), cls: st.fresh === 'save' ? 'cp-pop' : undefined, key: 'save-on' + (st.fresh || '') });
    if (it.n === '저장 라벨' && st.save) return out.push({ ...it, s: '저장됨' });
    if (it.n === 'Icon / 소리' && st.mute) return out.push({ ...it, svg: SOUND_OFF, key: 'mute' });
    if (it.n === '댓글 수') return out.push({ ...it, s: String(st.comments) });
    return out.push(it);
  });
  return out;
}

export function ClipPlayer(props) {
  const [st, setSt] = useState({ ...memo, sheet: null, imm: false, fresh: '', comments: commentTotal(), popped: false, sheetOpen: false });
  const [toast, setToast] = useState(null);
  const timers = useRef([]);
  const later = (f, ms) => { const t = window.setTimeout(f, ms); timers.current.push(t); return t; };
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // 에이전트 버튼: 화면이 다 보인 뒤(live.js attach가 알려 준다) 오른쪽에서 튀어나온다. 알림이 없어도 1.6초 뒤에는 나온다.
  useEffect(() => {
    const on = () => setSt((s) => (s.popped ? s : { ...s, popped: true }));
    window.addEventListener('drrrk:clip-shown', on);
    const t = window.setTimeout(on, 1600);
    return () => { window.removeEventListener('drrrk:clip-shown', on); window.clearTimeout(t); };
  }, []);

  const say = (text) => {
    const id = Date.now();
    setToast({ text, id });
    later(() => setToast((t) => (t && t.id === id ? null : t)), 1900);
  };
  const flip = (key) => {
    memo[key] = !memo[key];
    setSt((s) => ({ ...s, [key]: memo[key], fresh: key }));
    later(() => setSt((s) => ({ ...s, fresh: '' })), 420);
    if (key === 'save') say(memo.save ? '저장했어요' : '저장을 취소했어요');
  };
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
    const data = { title: '쌍수일기 클립', text: '친구가 썸남 앞에서 내 쌍밍아웃함...', url: window.location.href };
    if (navigator.share) {
      navigator.share(data).then(closeSheet, (e) => { if (e && e.name === 'AbortError') closeSheet(); else copy(data.url); });
      return;
    }
    copy(data.url);
  };
  const act = (kind) => {
    if (kind === 'share') return share();
    if (kind === 'like') { flip('like'); return undefined; }
    if (kind === 'save') { flip('save'); return undefined; }
    if (kind === 'comments') {
      setSt((s) => ({ ...s, sheetOpen: false }));
      later(() => openSheet('comments'), 360);
      return undefined;
    }
    closeSheet();
    if (kind === 'immersive') later(() => setSt((s) => ({ ...s, imm: true })), 380);
    else if (kind === 'play') say('반복 재생으로 설정했어요');
    else if (kind === 'hide') say('이 콘텐츠를 숨겼어요');
    else if (kind === 'hideCreator') say('쌍수일기 콘텐츠를 숨겼어요');
    else if (kind === 'report') say('신고가 접수됐어요');
    return undefined;
  };

  const items = useMemo(() => decorate(PLAYER, st), [st.like, st.save, st.mute, st.fresh, st.comments]);
  const btn = (label, x, y, w, h, onClick, r) => (
    <button key={label} type="button" aria-label={label} className="cp-btn" onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ left: x, top: y, width: w, height: h, borderRadius: r == null ? 12 : r }} />
  );
  return (
    <Scene items={items} name="클립 영상 보기" node="clip-player" bg="#000000" className={st.imm ? 'cp-imm' : undefined} {...props}>
      <style>{CSS}</style>
      {btn('소리', 340, 53, 46, 44, () => flip('mute'), 22)}
      {btn('이벤트 댓글 남기기', 333, 410, 52, 56, () => openSheet('comments'), 26)}
      {btn('좋아요', 338, 483, 44, 62, () => flip('like'))}
      {btn('댓글', 338, 552, 44, 62, () => openSheet('comments'))}
      {btn('저장', 338, 622, 44, 62, () => flip('save'))}
      {btn('더보기', 336, 696, 48, 32, () => openSheet('more'), 16)}
      {btn('댓글 미리보기', 12, 580, 240, 38, () => openSheet('comments'), 19)}
      {btn('댓글 입력', 15, 759, 359, 47, () => openSheet('comments'), 24)}
      {btn('캡션 더보기', 12, 664, 330, 28, () => openSheet('comments', true), 8)}
      {st.imm ? <button type="button" aria-label="화면 되돌리기" onClick={(e) => { e.stopPropagation(); setSt((s) => ({ ...s, imm: false })); }} style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, zIndex: 55, border: 0, padding: 0, background: 'transparent', cursor: 'pointer' }} /> : null}
      {st.sheet === 'comments' ? <CommentSheet info={st.info} open={st.sheetOpen} onClose={closeSheet} onCount={(n) => setSt((s) => ({ ...s, comments: n }))} say={say} /> : null}
      {st.sheet === 'more' ? <MoreSheet open={st.sheetOpen} onClose={closeSheet} onAction={act} stats={{ like: st.like ? '2,414' : '2,413', comment: st.comments }} liked={st.like} saved={st.save} /> : null}
      <ClipAgent delay={1600} />
      {toast ? (
        <div key={toast.id} role="status" style={{ position: 'absolute', left: '50%', top: 692, zIndex: 70, maxWidth: 330, padding: '10px 16px', borderRadius: 14, background: 'rgba(44,44,46,0.96)', color: '#F2F2F7', fontFamily: FONT, fontSize: 13.5, fontWeight: 600, lineHeight: '19px', letterSpacing: '-0.27px', whiteSpace: 'pre', pointerEvents: 'none', animation: 'cpToast 240ms cubic-bezier(0.05,0.7,0.1,1) both', boxShadow: '0 6px 16px rgba(0,0,0,0.4)' }}>{toast.text}</div>
      ) : null}
    </Scene>
  );
}
