// 화면 폭을 넘는 칩과 태그 줄을 손가락, 마우스 끌기, 트랙패드 가로 스크롤로 옆으로 민다(사용자 지시 2026. 11. 12. 03:45).
// 줄 자체는 overflow-x auto(스크롤 막대 숨김)라 트랙패드와 휴대폰 기본 가로 스크롤이 그대로 돈다.
// 화면 층이 세로 끌기를 직접 처리해 touch-action none을 거는 화면(live.js attachDrag)에서도 밀리도록 끌기는 여기서 직접 scrollLeft로 옮긴다.
// 6px(SLOP)보다 많이 옆으로 끌면 칩 누름을 취소하고(pointercancel), 손을 뗀 직후의 클릭을 막아 칩이 눌리지 않는다.
// 손을 떼면 마지막 속도로 조금 더 미끄러진다(감속 0.95/16ms). 브라우저가 기본 스크롤을 맡으면(pointercancel) 여기서는 손을 뗀다.
const SLOP = 6;

export function dragScroll(row) {
  if (!row || row.dataset.drag) return;
  row.dataset.drag = '1';
  let st = null;
  let swallow = false;
  let fling = 0;
  const scale = () => (row.getBoundingClientRect().width / (row.offsetWidth || 1)) || 1;
  const stopFling = () => { if (fling) cancelAnimationFrame(fling); fling = 0; };
  row.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    stopFling();
    st = { id: e.pointerId, x: e.clientX, y: e.clientY, left: row.scrollLeft, drag: false, target: e.target, s: scale(), hist: [] };
    swallow = false;
  });
  row.addEventListener('pointermove', (e) => {
    if (!st || e.pointerId !== st.id) return;
    const dx = e.clientX - st.x;
    const dy = e.clientY - st.y;
    if (!st.drag) {
      if (Math.abs(dx) <= SLOP) return;
      if (Math.abs(dx) < Math.abs(dy)) { st = null; return; }
      st.drag = true;
      swallow = true;
      row.dataset.dragging = '1';
      // 칩 누름 반응(scale 0.97, opacity 0.85)을 되돌린다. 칩의 pressable이 pointercancel에서 놓을 때 모양으로 돌아간다.
      st.target.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, pointerId: e.pointerId, pointerType: e.pointerType }));
      try { row.setPointerCapture(e.pointerId); } catch (er) { /* 캡처를 못 해도 끌기는 된다 */ }
      st.x = e.clientX;
      st.left = row.scrollLeft;
    }
    e.preventDefault();
    row.scrollLeft = st.left - (e.clientX - st.x) / st.s;
    const now = performance.now();
    st.hist.push({ t: now, x: e.clientX });
    while (st.hist.length > 2 && now - st.hist[0].t > 80) st.hist.shift();
  });
  const end = (e) => {
    if (!st || e.pointerId !== st.id) return;
    // 위에서 보낸 가짜 pointercancel은 끌기를 끝내지 않는다.
    if (e.type === 'pointercancel' && !e.isTrusted) return;
    const was = st;
    st = null;
    if (!was.drag) return;
    delete row.dataset.dragging;
    window.setTimeout(() => { swallow = false; }, 0);
    if (e.type !== 'pointerup' || was.hist.length < 2) return;
    const a = was.hist[0];
    const b = was.hist[was.hist.length - 1];
    let v = b.t > a.t ? -((b.x - a.x) / was.s) / (b.t - a.t) * 16 : 0;
    if (Math.abs(v) < 0.5) return;
    const step = () => {
      v *= 0.95;
      const before = row.scrollLeft;
      row.scrollLeft = before + v;
      fling = Math.abs(v) > 0.3 && row.scrollLeft !== before ? requestAnimationFrame(step) : 0;
    };
    fling = requestAnimationFrame(step);
  };
  row.addEventListener('pointerup', end);
  row.addEventListener('pointercancel', end);
  row.addEventListener('click', (e) => { if (swallow) { e.stopPropagation(); e.preventDefault(); swallow = false; } }, true);
  // 끌던 중 그림이나 글이 끌려 나가지 않게 한다.
  row.addEventListener('dragstart', (e) => e.preventDefault());
}
