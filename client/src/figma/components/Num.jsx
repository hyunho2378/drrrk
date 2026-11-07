// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:46954 "Num" (해시 c18e0945)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
import { AutoText } from '../AutoText';
const cx = (...a) => a.filter(Boolean).join(" ");
export function Num({
  drrrkC1Bold = "1",
  drrrkC1BoldWidth,
  drrrkC1BoldSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:46953" className={cx("[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [border-radius:var(--radius-full,_999px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <AutoText data-figma="번호 · DRRRK/C1 Bold" data-node="1405:46952" width={drrrkC1BoldWidth} className="[position:relative] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrrkC1BoldSvg && svg[drrrkC1BoldSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.132px] [left:0px]">{drrrkC1Bold}</span>{drrrkC1BoldSvg && svg[drrrkC1BoldSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[drrrkC1BoldSvg]
      }} /> : null}</AutoText>
    </div>;
  return null;
}