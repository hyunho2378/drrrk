// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:83650 "DRR" (해시 92a870d)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function DRR({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:83646" className={cx("[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="DRR 버튼" data-node="1204:83642" className="[display:flex] [width:56px] [height:56px] [justify-content:center] [align-items:center] [border-radius:var(--radius-13xl,_28px)] [background:var(--brand-primary,_#36D2FF)] [flex-shrink:0] [overflow:hidden]">
        <div data-figma="Icon / Line" data-node="1204:83643" data-instance-of="Icon / Line" className="[display:flex] [width:26px] [height:26px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
          <Icon data-figma="thumb-up" data-node="I1204:83643;1299:25549" name="thumb-up" color="var(--bg-base, #000000)" strokeScale={0.9231} className="[width:26px] [height:26px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:83644" className="[display:flex] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [flex-shrink:0] [overflow:hidden]">
        <p data-figma="DRR" data-node="1204:83645" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:900] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:26px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"DRR"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:83645"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:83649" className={cx("[display:flex] [width:48px] [height:48px] [padding:13px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--brand-primary,_#36D2FF)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83648" data-instance-of="Icon / Line" className="[display:flex] [width:22px] [height:22px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:13px] [top:13px]">
        <Icon data-figma="thumb-up" data-node="I1204:83648;1299:25549" name="thumb-up" color="var(--bg-base, #000000)" className="[width:22px] [height:22px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  return null;
}