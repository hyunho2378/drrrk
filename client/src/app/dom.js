// 화면 요소를 다루는 작은 도구 모음(live.js와 room.js가 함께 쓴다).
import { live as LIVE } from '../tokens.js';

export const q = (root, sel) => Array.from(root.querySelectorAll(sel));
export const rootOf = (layer) => layer.querySelector('[data-node]');
export const scaleOf = (root) => root.getBoundingClientRect().width / LIVE.screenW || 1;
export const relRect = (root, el) => {
  const s = scaleOf(root), a = root.getBoundingClientRect(), b = el.getBoundingClientRect();
  return { x: (b.left - a.left) / s, y: (b.top - a.top) / s, w: b.width / s, h: b.height / s };
};
export const wait = (ms) => new Promise((r) => window.setTimeout(r, ms));

// 윤곽으로 그린 글자(p[data-outline])를 실제 글자로 바꾼다. 글꼴, 크기, 색은 피그마 값(클래스) 그대로다.
export function setText(p, text) {
  if (!p) return;
  const overlay = p.querySelector(':scope > span[aria-hidden]');
  if (overlay) overlay.remove();
  const span = p.querySelector(':scope > span') || p;
  span.textContent = text;
  p.style.webkitTextFillColor = 'currentColor';
}
