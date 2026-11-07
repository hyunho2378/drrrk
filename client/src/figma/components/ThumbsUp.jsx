// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:46981 "따봉" (해시 dd35fe05)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
import { AutoText } from '../AutoText';
const cx = (...a) => a.filter(Boolean).join(" ");
export function ThumbsUp({
  drrrkC1Bold = "24",
  drrrkC1BoldWidth,
  drrrkC1BoldSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:46980" className={cx("[display:inline-flex] [align-items:center] [gap:var(--spacing-3,_4px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="icon/thumb-up" data-node="1405:46978" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="thumb-up" data-node="I1405:46978;1299:30556" name="thumb-up" color="var(--brand-primary, #36D2FF)" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <AutoText data-figma="따봉 수 · DRRRK/C1 Bold" data-node="1405:46979" width={drrrkC1BoldWidth} className="[position:relative] [color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrrkC1BoldSvg && svg[drrrkC1BoldSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.132px] [left:0px]">{drrrkC1Bold}</span>{drrrkC1BoldSvg && svg[drrrkC1BoldSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[drrrkC1BoldSvg]
      }} /> : null}</AutoText>
    </div>;
  return null;
}