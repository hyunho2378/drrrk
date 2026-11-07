// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:87729 "Emoji Button" (해시 25c7ff86)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { ReactionEmoji } from './ReactionEmoji';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(" ");
export function EmojiButton({
  type = "웃김",
  style,
  className
}) {
  if (type === "웃김") return <div data-figma="type=웃김" data-node="1204:87719" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [opacity:0.8] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <ReactionEmoji data-figma="Reaction Emoji" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]" type={"default"} />
    </div>;
  if (type === "토닥") return <div data-figma="type=토닥" data-node="1204:87722" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [opacity:0.8] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Reaction Emoji" data-node="1204:87721" data-instance-of="Reaction Emoji" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <div data-figma="Icon / Emoji" data-node="I1204:87721;1299:24397" data-instance-of="Icon / Emoji" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]">
          <Icon data-figma="laugh" data-node="I1204:87721;1299:24397;1299:25839" name="laugh" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
      </div>
    </div>;
  if (type === "응원") return <div data-figma="type=응원" data-node="1204:87725" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [border:2px_solid_transparent] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:-2px] [top:-2px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"48\" height=\"48\" rx=\"24\" style=\"fill:var(--bg-elevated, #222628)\"/><defs><clipPath id=\"c1204_87725\"><rect width=\"48\" height=\"48\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1204_87725)\"><path d=\"M0 24 M48 24 M48 24 M0 24 M24 0 M48 24 M24 48 M0 24 M24 48 L24 46 C11.8497 46 2 36.1503 2 24 L0 24 L-2 24 C-2 38.3594 9.6406 50 24 50 L24 48 Z M48 24 L46 24 C46 36.1503 36.1503 46 24 46 L24 48 L24 50 C38.3594 50 50 38.3594 50 24 L48 24 Z M24 0 L24 2 C36.1503 2 46 11.8497 46 24 L48 24 L50 24 C50 9.6406 38.3594 -2 24 -2 L24 0 Z M24 0 L24 -2 C9.6406 -2 -2 9.6406 -2 24 L0 24 L2 24 C2 11.8497 11.8497 2 24 2 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-success, #2EE59D)\"/></g></svg>"
    }} />
      <ReactionEmoji data-figma="Reaction Emoji" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]" type={"종류 3"} />
    </div>;
  if (type === "공감") return <div data-figma="type=공감" data-node="1204:87728" className={cx("[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [opacity:0.8] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <ReactionEmoji data-figma="Reaction Emoji" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]" type={"종류 4"} />
    </div>;
  return null;
}