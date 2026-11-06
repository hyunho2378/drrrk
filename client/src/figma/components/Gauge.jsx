// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:85302 "gauge" (해시 71fa1882)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Gauge({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:85298" className={cx("flex w-[306px] h-[6px] [padding-right:61.2px] [align-items:center] [border-radius:var(--radius-m,_3px)] [background:var(--text-tertiary-40,_rgba(110,_118,_124,_0.40))] relative overflow-hidden", className)} style={style}>
      <div data-figma="fill" data-node="1204:85297" className="w-[244.8px] h-[6px] shrink-0 [border-radius:var(--radius-m,_3px)] [background:linear-gradient(90deg,_#36D2FF_0%,_#FF9A4D_100%)] absolute left-[0px] top-[0px]" />
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:85301" className={cx("flex w-[306px] h-[6px] [padding-right:86px] [align-items:center] [border-radius:var(--radius-m,_3px)] [background:var(--text-tertiary-40,_rgba(110,_118,_124,_0.40))] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle" data-node="1204:85300" className="w-[220px] h-[6px] shrink-0 [border-radius:var(--radius-m,_3px)] [background:linear-gradient(90deg,_#36D2FF_0%,_#FF9A4D_100%)] absolute left-[0px] top-[0px]" />
    </div>;
  return null;
}