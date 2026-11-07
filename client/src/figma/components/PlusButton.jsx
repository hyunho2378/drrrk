// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:84699 "플러스 버튼" (해시 356471a0)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(" ");
export function PlusButton({
  state = "default",
  style,
  className
}) {
  if (state === "default") return <div data-figma="state=default" data-node="1204:84684" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:84683" data-instance-of="Icon / Line" className="[display:flex] [width:22px] [height:22px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="plus" data-node="I1204:84683;1299:25621" name="plus" color="var(--text-primary, #F8F8F8)" strokeScale={1.0909} className="[width:22px] [height:22px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  if (state === "active") return <div data-figma="state=active" data-node="1204:84688" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="icon/plus" data-node="1405:44663" data-instance-of="Icon / Line" className="[display:flex] [width:22px] [height:22px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="plus" data-node="I1405:44663;1299:25621" name="plus" color="var(--bg-base, #000000)" strokeScale={1.0909} className="[width:22px] [height:22px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  if (state === "close") return <div data-figma="state=close" data-node="1204:84691" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:84690" data-instance-of="Icon / Line" className="[display:flex] [width:22px] [height:22px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="close" data-node="I1204:84690;1299:25629" name="close" color="var(--bg-base, #000000)" strokeScale={1.0909} className="[width:22px] [height:22px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  if (state === "waiting") return <div data-figma="state=waiting" data-node="1204:84695" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="home" data-node="1204:84693" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <div data-figma="Vector" data-node="1405:44714" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:-0.5px] [top:0px]">
          <Icon data-figma="home-chair" data-node="I1405:44714;1299:30463" name="home-chair-1463-24062" color="var(--brand-primary, #36D2FF)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
      </div>
    </div>;
  return null;
}