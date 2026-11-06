// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89835 "Chat Row / 상대" (해시 b409f5d6)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
import { AutoText } from '../AutoText';
export function ChatRowOther({
  name = "따뜻한 가죽소파29",
  nameWidth,
  nameSvg,
  message = "메시지",
  messageWidth,
  messageSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:55373" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] relative overflow-hidden", className)} style={style}>
      <AutoText data-figma="name" data-node="1204:55374" width={nameWidth} className="relative [color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:500] [line-height:15px] [letter-spacing:-0.44px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={nameSvg && svg[nameSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="relative top-[0.496px] left-[0px]">{name}</span>{nameSvg && svg[nameSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[nameSvg]
      }} /> : null}</AutoText>
      <div data-figma="bubble" data-node="1204:55375" className="flex [padding:var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <AutoText data-figma="message" data-node="1204:55376" width={messageWidth} className="relative [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={messageSvg && svg[messageSvg] ? {
        WebkitTextFillColor: 'transparent'
      } : {}}><span className="relative top-[0.268px] left-[0px]">{message}</span>{messageSvg && svg[messageSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg[messageSvg]
        }} /> : null}</AutoText>
      </div>
    </div>;
  return null;
}