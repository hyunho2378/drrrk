// 자간 -4% 통일(탁빛나 2026. 11. 12. 01:05 "자간줄여" 섹션 핀): 앱 전체 글자 자간을 글자 크기 x -0.04 로 맞춘다.
// 실제 글자는 index.css 전역 규칙 한 곳(letter-spacing: -0.04em)이 맡는다.
// 피그마 윤곽(SVG) 글자는 생성 당시 자간으로 그려져 있다. 새 섹션에서는 같은 글이 모두 -4% 로 바뀌었으므로,
// 생성 당시 자간이 -4% 가 아닌 윤곽은 덮개를 숨기고 실제 글자(-0.04em)를 보이게 한다. -4% 로 그려진 윤곽은 그대로 둔다.
// 화면이 보이기 전(prepare 의 fixWraps, donor)에 부르므로 옛 모양이 먼저 보이지 않는다.
export const TRACK = -0.04;

const num = (v) => { const x = parseFloat(v); return Number.isFinite(x) ? x : null; };
const fromClass = (cls, prop) => { const m = new RegExp('\\[' + prop + ':(-?[\\d.]+)(px|em)?\\]').exec(cls || ''); return m ? { v: parseFloat(m[1]), u: m[2] || 'px' } : null; };

// 생성 코드가 적어 둔 자간(px)과 글자 크기(px). 전역 규칙이 계산값을 덮으므로 인라인 값과 클래스 글자에서 읽는다.
function genTracking(p) {
  const cls = typeof p.className === 'string' ? p.className : '';
  let fs = num(p.style.fontSize);
  if (fs == null) { const c = fromClass(cls, 'font-size'); fs = c ? c.v : null; }
  if (fs == null) fs = num(window.getComputedStyle(p).fontSize);
  let ls = null;
  const inl = p.style.letterSpacing;
  if (inl) ls = /em$/.test(inl) ? num(inl) * fs : num(inl);
  if (ls == null) { const c = fromClass(cls, 'letter-spacing'); ls = c ? (c.u === 'em' ? c.v * fs : c.v) : 0; }
  return { fs, ls };
}

export function unifyTracking(root) {
  if (!root || !root.querySelectorAll) return 0;
  let n = 0;
  root.querySelectorAll('p[data-outline]').forEach((p) => {
    if (p.dataset.track) return;
    const ov = p.querySelector(':scope > span[aria-hidden]');
    if (!ov || ov.style.display === 'none' || !ov.innerHTML.trim() || !p.textContent.trim()) return;
    const cls = (typeof p.className === 'string' ? p.className : '') + ' ' + (p.getAttribute('style') || '');
    if (/background-clip|bg-clip/.test(cls)) return;
    const { fs, ls } = genTracking(p);
    if (!fs || Math.abs(ls / fs - TRACK) < 0.002) return;
    p.dataset.track = '1';
    ov.style.display = 'none';
    p.style.webkitTextFillColor = 'currentColor';
    n++;
  });
  return n;
}
