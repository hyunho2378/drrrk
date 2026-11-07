// 네이버 클립 모방 화면을 그리는 도구. 장면 데이터(ClipScenes.js)를 그대로 화면에 그린다.
import React from 'react';

export const BASE = import.meta.env.BASE_URL;
export const pic = (n) => BASE + 'assets/images/clip-' + n + '.webp';
const FONT = "'SUIT', system-ui, sans-serif";

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

function Item({ it, flow, pw }) {
  const pos = (x, y, w, h) => (flow ? { position: 'relative', flexShrink: 0, marginLeft: it.ml || 0 } : { position: 'absolute', left: x, top: y, width: w, height: h });
  switch (it.k) {
    case 'rect':
      return (
        <div data-figma={it.n} style={{ ...pos(it.x, it.y, it.w, it.h), borderRadius: radius(it.r), overflow: 'hidden', boxSizing: 'border-box', background: fillCss(it.f), border: it.s ? it.s.w + 'px solid ' + rgba(it.s.c, it.s.a) : undefined }}>
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
      return <span data-figma={it.n} style={{ ...pos(it.x, it.y, it.w, it.h), width: it.w, height: it.h, lineHeight: 0, fontSize: 0, filter: shadowFilter(it.sh) }} dangerouslySetInnerHTML={{ __html: it.svg }} />;
    case 'text': {
      const lh = lineH(it);
      const st = textBase(it.size, it.wt, it.c, it.a, lh);
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
      return <div data-figma={it.n} style={{ ...box, ...st, textShadow: it.sh ? it.sh[0] + 'px ' + it.sh[1] + 'px ' + it.sh[2] + 'px rgba(0,0,0,' + it.sh[3] + ')' : undefined }}>{body}</div>;
    }
    case 'pill': {
      const tx = it.text;
      const where = flow ? { position: 'relative', flexShrink: 0, marginLeft: it.ml || 0 } : it.right != null ? { position: 'absolute', right: pw - it.right, top: it.y } : { position: 'absolute', left: it.x, top: it.y };
      return (
        <div data-figma={it.n} style={{ ...where, height: it.h, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 ' + it.px + 'px', borderRadius: it.rad, background: fillCss(it.f), border: it.s ? it.s.w + 'px solid ' + rgba(it.s.c, it.s.a) : undefined, ...textBase(tx.size, tx.wt, tx.c, 1, Math.round(tx.size * 1.4)) }}>{tx.s}</div>
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

export function Scene({ items, name, node, bg, style, className }) {
  return (
    <div data-figma={name} data-node={node} className={className} style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', background: bg, ...style }}>
      {items.map((it, i) => <Item key={i} it={it} pw={390} />)}
    </div>
  );
}
