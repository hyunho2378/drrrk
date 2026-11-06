// 누를 수 있는 자리. 화면 위에 투명한 버튼을 얹는다. 누르는 동안 덮개가 살짝 어두워지고(opacity만 바뀐다),
// 빈 곳을 누르면(hint) 누를 수 있는 자리를 잠깐 하늘색으로 보여 준다. 버튼 밖은 눌림을 막지 않아서 스크롤이 그대로 된다.
import { useState } from 'react';

export default function Hotspots({ links, active, hint, onPress }) {
  const [down, setDown] = useState(-1);
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
            onPointerDown={() => setDown(i)}
            onPointerUp={() => setDown(-1)}
            onPointerLeave={() => setDown(-1)}
            onPointerCancel={() => setDown(-1)}
            onClick={(e) => {
              e.stopPropagation();
              window.setTimeout(() => onPress(l), 90);
            }}
          >
            <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-press-dim transition-opacity duration-press ease-out" style={{ opacity: down === i ? 1 : 0 }} />
            <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-hint-fill shadow-hint transition-opacity duration-hint ease-out" style={{ opacity: hint ? 1 : 0 }} />
          </button>
        ))}
    </div>
  );
}
