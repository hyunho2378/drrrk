// 네이버 클립 모방 화면을 그리는 도구. 장면 데이터(ClipScenes.js)를 그대로 화면에 그린다.
import React from 'react';

export const BASE = import.meta.env.BASE_URL;
export const pic = (n) => BASE + 'assets/images/clip-' + n + '.webp';
const FONT = "'SUIT', system-ui, sans-serif";

// 눌림 반응: .ck-press, .cp-btn, .cp-row 요소는 누르는 즉시 scale 0.97, opacity 0.85(90ms), 떼면 120ms로 돌아온다.
// 문서 하나에 한 번만 붙이는 공용 처리다(터치와 마우스 모두 pointer 이벤트). 10px 넘게 움직이면 끌기로 보고 눌림을 푼다.
export const PRESS_SEL = '.ck-press, .cp-btn, .cp-row';
const PRESS_CSS = `
.ck-press,.cp-btn,.cp-row{transition:transform 120ms cubic-bezier(.2,0,0,1),opacity 120ms cubic-bezier(.2,0,0,1),background-color 120ms;-webkit-tap-highlight-color:transparent}
.ck-press.is-down,.cp-btn.is-down,.cp-row.is-down{transform:scale(.97);opacity:.85;transition-duration:90ms}
.ck-root,.ck-root *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.ck-root input,.ck-root textarea{-webkit-user-select:text;user-select:text}
.ck-root{touch-action:manipulation}
@media (prefers-reduced-motion:reduce){.ck-press,.cp-btn,.cp-row{transition:none}}
`;
export function installPress(doc) {
  if (!doc || doc.__ckPress) return;
  doc.__ckPress = true;
  const st = doc.createElement('style');
  st.textContent = PRESS_CSS;
  doc.head.appendChild(st);
  let el = null;
  let x = 0;
  let y = 0;
  const off = () => { if (el) el.classList.remove('is-down'); el = null; };
  doc.addEventListener('pointerdown', (e) => {
    off();
    const t = e.target && e.target.closest ? e.target.closest(PRESS_SEL) : null;
    if (!t || t.disabled) return;
    el = t; x = e.clientX; y = e.clientY;
    t.classList.add('is-down');
  }, true);
  doc.addEventListener('pointermove', (e) => { if (el && Math.hypot(e.clientX - x, e.clientY - y) > 10) off(); }, true);
  doc.addEventListener('pointerup', off, true);
  doc.addEventListener('pointercancel', off, true);
  doc.addEventListener('dragstart', off, true);
}
if (typeof document !== 'undefined') installPress(document);
const rgba = (hex, a = 1) => {
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
};
const fillCss = (f) => (!f || f.img ? undefined : f.g ? 'linear-gradient(180deg,' + f.g.map(([c, a, p]) => rgba(c, a) + ' ' + p * 100 + '%').join(',') + ')' : rgba(f.c, f.a == null ? 1 : f.a));
const radius = (r) => (Array.isArray(r) ? r.map((v) => v + 'px').join(' ') : r || 0);
const shadowFilter = (sh) => (sh ? 'drop-shadow(' + sh[0] + 'px ' + sh[1] + 'px ' + sh[2] + 'px rgba(0,0,0,' + sh[3] + '))' : undefined);
const lineH = (it) => it.lh || Math.round(it.size * 1.4);
const textBase = (size, wt, c, a, lh) => ({
  fontFamily: FONT, fontSize: size, fontWeight: wt, color: rgba(c || '#FFFFFF', a == null ? 1 : a),
  lineHeight: lh + 'px', letterSpacing: '-0.02em', whiteSpace: 'pre', margin: 0,
});

function Fill({ img }) {
  return <img src={pic(img)} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
}

export function Item({ it, flow, pw }) {
  // 줄 안(flow)에 놓인 요소(예: 팔로우 알약)를 누를 수 있게 감싼다. 절대 위치 요소는 Hit을 쓴다.
  if (it.on && flow) {
    const { on, ...rest } = it;
    return (
      <div className="ck-press" role="button" tabIndex={0} aria-label={it.label || it.n} aria-pressed={it.pressed}
        onClick={(e) => { e.stopPropagation(); on(); }} onKeyDown={(e) => { if (e.key === 'Enter') on(); }}
        style={{ position: 'relative', flexShrink: 0, marginLeft: it.ml || 0, cursor: 'pointer', padding: '6px 0', margin: '-6px 0 -6px ' + (it.ml || 0) + 'px' }}>
        <Item it={{ ...rest, ml: 0 }} flow pw={pw} />
      </div>
    );
  }
  const pos = (x, y, w, h) => (flow ? { position: 'relative', flexShrink: 0, marginLeft: it.ml || 0 } : { position: 'absolute', left: x, top: y, width: w, height: h });
  switch (it.k) {
    case 'rect':
      return (
        <div data-figma={it.n} style={{ ...pos(it.x, it.y, it.w, it.h), borderRadius: radius(it.r), overflow: 'hidden', boxSizing: 'border-box', background: fillCss(it.f), border: it.s ? it.s.w + 'px solid ' + rgba(it.s.c, it.s.a) : undefined, boxShadow: it.sh ? it.sh[0] + 'px ' + it.sh[1] + 'px ' + it.sh[2] + 'px rgba(0,0,0,' + it.sh[3] + ')' : undefined }}>
          {it.f && it.f.img ? <Fill img={it.f.img} /> : null}
        </div>
      );
    case 'img':
      return (
        <div data-figma={it.n} style={{ ...pos(it.x, it.y, it.w, it.h), width: it.w, height: it.h, borderRadius: '50%', overflow: 'hidden', background: '#2D2D2D' }}>
          <Fill img={it.img} />
        </div>
      );
    case 'svg':
      return <span data-figma={it.n} className={it.cls} style={{ ...pos(it.x, it.y, it.w, it.h), width: it.w, height: it.h, lineHeight: 0, fontSize: 0, filter: shadowFilter(it.sh) }} dangerouslySetInnerHTML={{ __html: it.svg }} />;
    case 'text': {
      const lh = lineH(it);
      const st = textBase(it.size, it.wt, it.c, it.a, lh);
      // 피그마에서 SUIT가 아닌 글꼴(ff)이나 다른 자간(ls)을 쓴 글자는 그 값을 따른다.
      if (it.ff) st.fontFamily = it.ff;
      if (it.ls) st.letterSpacing = it.ls;
      let box;
      if (flow) box = { position: 'relative', flexShrink: 0, marginLeft: it.ml || 0 };
      else if (it.cx != null) box = { position: 'absolute', left: it.cx - 150, width: 300, textAlign: 'center', top: it.cy - lh / 2, height: lh };
      else box = { position: 'absolute', left: it.x, top: it.cy != null ? it.cy - lh / 2 : it.y, width: it.w || undefined };
      let body = it.s;
      if (it.sp) {
        const out = [];
        let last = 0;
        it.sp.forEach(([a, b, c], k) => {
          out.push(it.s.slice(last, a));
          out.push(<span key={k} style={{ color: c }}>{it.s.slice(a, b)}</span>);
          last = b;
        });
        out.push(it.s.slice(last));
        body = out;
      }
      return <div data-figma={it.n} className={it.cls} style={{ ...box, ...st, textShadow: it.sh ? it.sh[0] + 'px ' + it.sh[1] + 'px ' + it.sh[2] + 'px rgba(0,0,0,' + it.sh[3] + ')' : undefined }}>{body}</div>;
    }
    case 'pill': {
      const tx = it.text;
      const where = flow ? { position: 'relative', flexShrink: 0, marginLeft: it.ml || 0 } : it.right != null ? { position: 'absolute', right: pw - it.right, top: it.y } : { position: 'absolute', left: it.x, top: it.y };
      return (
        <div data-figma={it.n} style={{ ...where, height: it.h, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 ' + it.px + 'px', borderRadius: it.rad, background: fillCss(it.f), border: it.s ? it.s.w + 'px solid ' + rgba(it.s.c, it.s.a) : undefined, ...textBase(tx.size, tx.wt, tx.c, 1, Math.round(tx.size * 1.4)), margin: flow ? '0 0 0 ' + (it.ml || 0) + 'px' : 0 }}>{tx.s}</div>
      );
    }
    case 'group': {
      const auto = it.w === 'auto';
      const st = {
        ...(flow ? { position: 'relative' } : { position: 'absolute', left: it.x, top: it.y }),
        height: it.h, width: auto ? undefined : it.w, borderRadius: radius(it.r), background: fillCss(it.f), overflow: it.clip ? 'hidden' : undefined,
        backdropFilter: it.blur ? 'blur(' + it.blur + 'px)' : undefined, WebkitBackdropFilter: it.blur ? 'blur(' + it.blur + 'px)' : undefined,
        ...(auto ? { display: 'inline-flex', alignItems: 'center', padding: it.pad[0] + 'px ' + it.pad[1] + 'px ' + it.pad[2] + 'px ' + it.pad[3] + 'px', gap: it.gap, boxSizing: 'border-box' } : {}),
      };
      return <div data-figma={it.n} style={st}>{it.ch.map((c, i) => <Item key={i} it={c} flow={auto} pw={it.w} />)}</div>;
    }
    case 'row':
      return (
        <div data-figma={it.n} style={{ position: 'absolute', left: it.x, top: it.cy - 16, height: 32, display: 'flex', alignItems: 'center' }}>
          {it.items.map((c, i) => <Item key={i} it={c} flow pw={0} />)}
        </div>
      );
    default:
      return null;
  }
}

// 누르는 칸. box(부모 기준 x, y, w, h) 안에서만 눌리고, items는 부모 좌표 그대로 그린다. 눌림 반응은 칸 가운데를 기준으로 줄어든다.
// at을 주면 칸을 그 자리(x, y)로 옮겨 그린다(구독, 내클립 탭에서 카드 다시 배치).
// off를 주면 같은 자리에 같은 모양만 그리고 눌리지 않는다(버튼 역할, 핸들러, 눌림 모양, 손 모양 커서, 키보드 포커스 없음). 글자는 화면 읽기에서 그대로 읽힌다.
export function Hit({ box, label, onTap, items = [], pressed, at, style, children, name, off }) {
  const [x, y, w, h] = box;
  const [ox, oy] = at || [x, y];
  if (off) {
    return (
      <div data-figma={name} data-still="" style={{ position: 'absolute', left: ox, top: oy, width: w, height: h, cursor: 'default', ...style }}>
        <div style={{ position: 'absolute', left: -x, top: -y, width: 390, height: 0, pointerEvents: 'none' }}>
          {items.map((it, i) => <Item key={it.key || i} it={it} pw={390} />)}
        </div>
        {children}
      </div>
    );
  }
  return (
    <div data-figma={name} className="ck-press" role="button" tabIndex={0} aria-label={label} aria-pressed={pressed}
      onClick={(e) => { e.stopPropagation(); onTap(e); }} onKeyDown={(e) => { if (e.key === 'Enter') onTap(e); }}
      style={{ position: 'absolute', left: ox, top: oy, width: w, height: h, cursor: 'pointer', outline: 'none', ...style }}>
      <div style={{ position: 'absolute', left: -x, top: -y, width: 390, height: 0, pointerEvents: 'none' }}>
        {items.map((it, i) => <Item key={it.key || i} it={it} pw={390} />)}
      </div>
      {children}
    </div>
  );
}

export function Scene({ items, name, node, bg, style, className, children }) {
  return (
    <div data-figma={name} data-node={node} className={'ck-root' + (className ? ' ' + className : '')} style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', background: bg, ...style }}>
      {items.map((it, i) => <Item key={it.key || i} it={it} pw={390} />)}
      {children}
    </div>
  );
}
