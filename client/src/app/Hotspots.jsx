// 누를 수 있는 자리. 화면 위에 투명한 버튼을 얹는다.
// 누르는 동안 상태 덮개를 10% 띄운다(Material Design 3 States: Press +10% opacity, Apple HIG Buttons: 눌림 상태를 항상 둔다).
// 덮개 색은 아래 요소가 밝으면 어두운 색, 어두우면 밝은 색이다. opacity만 바뀐다.
// 빈 곳을 누르면(hint) 누를 수 있는 자리를 잠깐 하늘색으로 보여 준다. 버튼 밖은 눌림을 막지 않아 스크롤이 그대로 된다.
import { useState } from 'react';
import { motion } from '../tokens.js';

function underTone(btn) {
  const r = btn.getBoundingClientRect();
  const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  for (const el of stack) {
    if (el.closest('[data-hotspot]')) continue;
    const c = getComputedStyle(el).backgroundColor;
    const m = /rgba?\(([^)]+)\)/.exec(c);
    if (!m) continue;
    const [rr, g, b, a = 1] = m[1].split(',').map((v) => parseFloat(v));
    if (a < 0.5) continue;
    return (0.2126 * rr + 0.7152 * g + 0.0722 * b) / 255 > 0.5 ? 'dark' : 'light';
  }
  return 'light';
}

export default function Hotspots({ links, active, hint, onPress }) {
  const [down, setDown] = useState({ i: -1, tone: 'light' });
  const release = () => setDown((d) => ({ ...d, i: -1 }));
  return (
    <div className="pointer-events-none absolute inset-0 z-hot">
      {links
        .slice()
        .sort((a, b) => b.w * b.h - a.w * a.h)
        .map((l, i) => (
          <button
            key={i}
            type="button"
            data-hotspot=""
            aria-label={l.label}
            disabled={!active}
            className="pointer-events-auto absolute cursor-pointer border-0 bg-transparent p-0 outline-none [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            style={{ left: l.x, top: l.y, width: l.w, height: l.h, borderRadius: l.r || Math.min(12, l.h / 2) }}
            onPointerDown={(e) => setDown({ i, tone: underTone(e.currentTarget) })}
            onPointerUp={release}
            onPointerLeave={release}
            onPointerCancel={release}
            onClick={(e) => {
              e.stopPropagation();
              window.setTimeout(() => onPress(l), motion.press);
            }}
          >
            <span
              aria-hidden="true"
              className={'absolute inset-0 rounded-[inherit] transition-opacity duration-press ease-out ' + (down.tone === 'dark' ? 'bg-press-dark' : 'bg-press-light')}
              style={{ opacity: down.i === i ? motion.pressOpacity : 0 }}
            />
            <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-hint-fill shadow-hint transition-opacity duration-hint ease-out" style={{ opacity: hint ? 1 : 0 }} />
          </button>
        ))}
    </div>
  );
}
