// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:85657 "신고 차단 링크" (해시 53ff4690)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function ReportBlockLink({
  type = "차단",
  style,
  className
}) {
  if (type === "차단") return <div data-figma="type=차단" data-node="1204:85656" className={cx("[display:inline-flex] [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="신고하기" data-node="1204:85653" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [width:44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.268px] [left:0px]">{"신고하기"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85653"]
      }} /></p>
      <div data-figma="Rectangle" data-node="1204:85654" className="[width:1px] [height:10px] [background:var(--text-tertiary,_#6E767C)] [flex-shrink:0]" />
      <p data-figma="차단하기" data-node="1204:85655" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [width:44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.268px] [left:0px]">{"차단하기"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85655"]
      }} /></p>
    </div>;
  return null;
}