// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89832 "Tag / 대화 스타일" (해시 9a54318d)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
import { AutoText } from '../AutoText';
const cx = (...a) => a.filter(Boolean).join(" ");
export function TalkStyleTag({
  label = "#리액션장인",
  labelWidth,
  labelSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:55208" className={cx("[display:inline-flex] [padding:var(--spacing-5,_6px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-full,_999px)] [background:var(--brand-subtle,_#06303C)] [position:relative] [overflow:hidden]", className)} style={style}>
      <AutoText data-figma="#리액션장인" data-node="1204:55209" width={labelWidth} className="[position:relative] [color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={labelSvg && svg[labelSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.132px] [left:0px]">{label}</span>{labelSvg && svg[labelSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[labelSvg]
      }} /> : null}</AutoText>
    </div>;
  return null;
}