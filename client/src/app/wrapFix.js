import MAP from './wrapMap.js';

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
  hits.forEach((n) => {
    const el = n.parentElement;
    n.nodeValue = MAP[n.nodeValue];
    if (el) {
      el.style.whiteSpace = 'normal';
      el.style.wordBreak = 'keep-all';
      el.style.overflowWrap = 'break-word';
    }
  });
}
