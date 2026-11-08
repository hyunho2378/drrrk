import MAP from './wrapMap.js';
import { SOLO_TEXT, SOLO_BODY_OLD, SOLO_BODY } from './soloText.js';

// 사용자가 쓴 글과 안내 글도 낱말 중간에서 줄이 바뀌지 않게 한다.
if (typeof document !== 'undefined' && !document.getElementById('wrap-keep-all')) {
  const st = document.createElement('style');
  st.id = 'wrap-keep-all';
  st.textContent = 'html, body { word-break: keep-all; overflow-wrap: break-word; }';
  document.head.appendChild(st);
}

// 생성 화면의 글자 중 피그마가 글자 단위로 줄을 바꾼 것(예: "마주하 / 기")을 원본 글자로 되돌리고
// 브라우저가 낱말 단위로 줄을 바꾸게 한다. 줄 폭은 글자를 감싼 칸이 그대로 정한다.
export function fixWraps(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const hits = [];
  let node = walker.nextNode();
  while (node) {
    if (MAP[node.nodeValue]) hits.push(node);
    node = walker.nextNode();
  }
  // 혼자 드르륵 방의 옛 글자도 같은 방법으로 새 글자로 바꾼다(soloText.js). 글자 길이가 바뀌므로 칸 폭은 글자에 맞춘다.
  const solo = [];
  const walker2 = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let t = walker2.nextNode(); t; t = walker2.nextNode()) {
    const v = t.nodeValue;
    if (SOLO_TEXT[v] || (v && v.startsWith(SOLO_BODY_OLD))) solo.push(t);
  }
  solo.forEach((t) => {
    const body = t.nodeValue.startsWith(SOLO_BODY_OLD);
    t.nodeValue = body ? SOLO_BODY : SOLO_TEXT[t.nodeValue];
    const el = (t.parentElement && t.parentElement.closest('p')) || t.parentElement;
    if (!el) return;
    el.querySelectorAll(':scope > span[aria-hidden]').forEach((o) => (o.style.display = 'none'));
    el.style.webkitTextFillColor = 'currentColor';
    el.style.whiteSpace = 'pre';
    el.querySelectorAll('span').forEach((s) => { if (!s.hasAttribute('aria-hidden')) s.style.whiteSpace = 'pre'; });
    if (body) { el.style.width = '310px'; el.style.height = 'auto'; return; }
    el.style.width = 'auto';
    // 말풍선과 키워드 칩은 글자 길이대로 늘거나 줄어든다.
    const box = el.parentElement;
    if (box && box.dataset.figma !== '고민 주제 · 최소화 (탭하면 자세히)') { box.style.width = 'auto'; box.style.flex = '0 0 auto'; }
  });
  hits.forEach((n) => {
    const el = (n.parentElement && n.parentElement.closest('p')) || n.parentElement;
    n.nodeValue = MAP[n.nodeValue];
    if (el) {
      el.style.whiteSpace = 'normal';
      el.style.wordBreak = 'keep-all';
      el.style.overflowWrap = 'break-word';
      // 피그마 윤곽 글자 덮개는 옛 줄바꿈으로 그려져 있으므로 숨기고 실제 글자를 보이게 한다.
      el.querySelectorAll(':scope > span[aria-hidden]').forEach((o) => (o.style.display = 'none'));
      el.style.webkitTextFillColor = 'currentColor';
      el.style.whiteSpace = 'normal';
      el.querySelectorAll('span').forEach((s) => { if (!s.hasAttribute('aria-hidden')) s.style.whiteSpace = 'normal'; });
    }
  });
}
