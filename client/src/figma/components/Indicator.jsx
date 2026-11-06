// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:47044 "Indicator" (해시 51608fed)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Num } from './Num';
export function Indicator({
  drrrkC1Bold = "1",
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:47040" className={cx("inline-flex h-[65px] [flex-direction:column] [align-items:center] [gap:var(--spacing-3,_4px)] relative overflow-hidden", className)} style={style}>
      <Num data-figma="Num" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" drrrkC1Bold={"1"} drrrkC1BoldWidth={6} drrrkC1BoldSvg={"I1405:47038;1405:46952"} type={"default"} />
      <div data-figma="Line" data-node="1405:47039" className="w-[2px] [flex:1_0_0] [background:var(--bg-elevated,_#222628)]" />
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1405:47043" className={cx("inline-flex h-[45px] [flex-direction:column] [align-items:center] [gap:var(--spacing-3,_4px)] relative overflow-hidden", className)} style={style}>
      <Num data-figma="Num" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" drrrkC1Bold={"3"} drrrkC1BoldWidth={8} drrrkC1BoldSvg={"I1405:47042;1405:46952"} type={"default"} />
    </div>;
  return null;
}