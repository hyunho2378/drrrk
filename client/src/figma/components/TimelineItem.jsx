// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:48723 "Timeline Item" (해시 d80f066a)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Num } from './Num';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Text } from './Text';
export function TimelineItem({
  text = "1",
  text2 = "고민을 꺼냈어요",
  text3 = "\"이거 일부러야?\"로 이야기가 시작됐어요",
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:48722" className={cx("flex w-[342px] [align-items:flex-start] [gap:var(--spacing-11,_12px)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Indicator" data-node="1405:48720" data-instance-of="Indicator" className="flex [flex-direction:column] [align-items:center] [gap:var(--spacing-3,_4px)] [align-self:stretch] shrink-0 overflow-hidden">
        <Num data-figma="Num" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" drrrkC1Bold={"1"} drrrkC1BoldWidth={6} drrrkC1BoldSvg={"I1405:48720;1405:47038;1405:46952"} type={"default"} />
        <div data-figma="Line" data-node="I1405:48720;1405:47039" className="w-[2px] [flex:1_0_0] [background:var(--bg-elevated,_#222628)]" />
      </div>
      <Text data-figma="Text" className="flex [padding:2px_0_var(--spacing-15,_20px)_0] [flex-direction:column] [align-items:flex-start] gap-[4px] [flex:1_0_0] overflow-hidden" drrrkB3Reg={"\"이거 일부러야?\"로 이야기가 시작됐어요"} drrrkB3RegSvg={"I1405:48721;1405:46913"} drrrkB1Bol={"고민을 꺼냈어요"} drrrkB1BolSvg={"I1405:48721;1405:46912"} type={"종류 2"} />
    </div>;
  return null;
}