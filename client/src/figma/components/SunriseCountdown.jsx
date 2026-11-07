// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:84522 "해 뜨기까지 (남은 시간)" (해시 432feefc)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function SunriseCountdown({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:84521" className={cx("[display:inline-flex] [height:32px] [padding:var(--spacing-7,_8px)_var(--spacing-12,_14px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [position:relative] [left:20px] [top:20px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [overflow:hidden]", className)} style={style}>
      <span data-figma="Ellipse" data-node="1204:84519" className="[position:relative] [width:8px] [height:8px] [flex-shrink:0] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:84519"]
    }} />
      <p data-figma="해 뜨기까지 05:12" data-node="1204:84520" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:83px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지 05:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:84520"]
      }} /></p>
    </div>;
  return null;
}