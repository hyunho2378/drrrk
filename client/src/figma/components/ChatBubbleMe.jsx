// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89836 "Chat Bubble / 나" (해시 d818583a)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
import { AutoText } from '../AutoText';
const cx = (...a) => a.filter(Boolean).join(" ");
export function ChatBubbleMe({
  message = "메시지",
  messageWidth,
  messageSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:55377" className={cx("[display:inline-flex] [padding:var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-6xl,_14px)] [background:var(--brand-primary,_#36D2FF)] [position:relative] [overflow:hidden]", className)} style={style}>
      <AutoText data-figma="message" data-node="1204:55378" width={messageWidth} className="[position:relative] [color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={messageSvg && svg[messageSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.268px] [left:0px]">{message}</span>{messageSvg && svg[messageSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[messageSvg]
      }} /> : null}</AutoText>
    </div>;
  return null;
}