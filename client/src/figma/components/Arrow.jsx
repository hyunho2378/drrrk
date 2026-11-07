// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:47002 "arrow" (해시 917a8af0)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(" ");
export function Arrow({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:47001" className={cx("[display:flex] [width:27px] [height:83.13px] [padding:27.71px_0_28.068px_0] [flex-direction:column] [justify-content:center] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1405:47000" data-instance-of="Icon / Line" className="[display:flex] [width:27.35px] [height:27.35px] [justify-content:center] [align-items:center] [flex-shrink:0] [opacity:0.3] [position:absolute] [left:0px] [top:27.71px]">
        <Icon data-figma="chevron-left" data-node="I1405:47000;1299:25581" name="chevron-left" color="var(--white, #FFFFFF)" className="[width:27.35px] [height:27.35px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  return null;
}