// 다른 화면의 요소를 빌려 온다. 피그마에서 만든 화면을 눈에 안 보이는 곳에 한 번 그려 두고, 필요한 요소를 복제해서 쓴다.
// 복제한 요소는 피그마 값 그대로의 모양이라 새로 그리지 않아도 피그마와 같다.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadScreen } from './screens.js';

const donors = new Map();

export function donor(n) {
  if (donors.has(n)) return donors.get(n);
  const p = (async () => {
    const Comp = await loadScreen(n);
    if (!Comp) return null;
    const host = document.createElement('div');
    host.setAttribute('aria-hidden', 'true');
    Object.assign(host.style, { position: 'fixed', left: '-10000px', top: '0', width: '390px', height: '844px', pointerEvents: 'none', opacity: '0' });
    document.body.appendChild(host);
    createRoot(host).render(React.createElement(Comp));
    for (let i = 0; i < 60 && !host.querySelector('[data-node]'); i++) await new Promise((r) => window.setTimeout(r, 50));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return host.querySelector('[data-node]');
  })();
  donors.set(n, p);
  return p;
}

// n번 화면에서 selector로 찾은 요소의 복제본. 못 찾으면 null.
export async function cloneOf(n, selector, scope) {
  const root = await donor(n);
  if (!root) return null;
  const base = scope ? root.querySelector(scope) : root;
  const el = base && base.querySelector(selector);
  return el ? el.cloneNode(true) : null;
}

export function warm(list) {
  const idle = window.requestIdleCallback || ((f) => window.setTimeout(f, 800));
  idle(() => list.forEach((n, i) => window.setTimeout(() => donor(n), i * 400)));
}
