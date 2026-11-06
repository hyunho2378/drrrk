// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88450 "색상" (해시 266df765)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { ColorSwatch } from './ColorSwatch';
export function ColorOption({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:88444" className={cx("inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-8,_9px)] relative overflow-hidden", className)} style={style}>
      <ColorSwatch data-figma="색" className="w-[108px] h-[116px] shrink-0 relative overflow-hidden" type={"브라운"} />
      <ColorSwatch data-figma="색" className="flex w-[108px] h-[116px] [padding:8px_16px_11px_16px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] shrink-0 relative overflow-hidden" type={"그린"} />
      <ColorSwatch data-figma="색" className="flex w-[108px] h-[116px] [padding:8px_16px_11px_16px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] shrink-0 relative overflow-hidden" type={"아이보리"} />
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:88449" className={cx("inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-8,_9px)] relative overflow-hidden", className)} style={style}>
      <ColorSwatch data-figma="색" className="w-[108px] h-[116px] shrink-0 relative overflow-hidden" type={"블루그레이"} />
      <ColorSwatch data-figma="색" className="w-[108px] h-[116px] shrink-0 relative overflow-hidden" type={"브라운 가죽"} />
      <ColorSwatch data-figma="색" className="w-[108px] h-[116px] shrink-0 relative overflow-hidden" type={"베이지"} />
    </div>;
  return null;
}