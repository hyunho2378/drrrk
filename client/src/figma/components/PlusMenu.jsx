// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89441 "플러스 메뉴" (해시 b289902e)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { EmojiButton } from './EmojiButton';
const cx = (...a) => a.filter(Boolean).join(' ');
import { ReactionEmoji } from './ReactionEmoji';
export function PlusMenu({
  type = "이모지",
  style,
  className
}) {
  if (type === "이모지") return <div data-figma="type=이모지" data-node="1204:89440" className={cx("inline-flex [padding:var(--spacing-5,_6px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-14xl,_30px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"62\" height=\"230\" viewBox=\"0 0 62 230\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"62\" height=\"230\" rx=\"30\" style=\"fill:var(--bg-base, #000000)\"/><defs><clipPath id=\"c1204_89440\"><rect width=\"62\" height=\"230\" rx=\"30\"/></clipPath></defs><g clip-path=\"url(#c1204_89440)\"><path d=\"M30 0 L30 1 L32 1 L32 0 L32 -1 L30 -1 L30 0 Z M62 30 L61 30 L61 200 L62 200 L63 200 L63 30 L62 30 Z M32 230 L32 229 L30 229 L30 230 L30 231 L32 231 L32 230 Z M0 200 L1 200 L1 30 L0 30 L-1 30 L-1 200 L0 200 Z M30 230 L30 229 C13.9837 229 1 216.016 1 200 L0 200 L-1 200 C-1 217.121 12.8792 231 30 231 L30 230 Z M62 200 L61 200 C61 216.016 48.0163 229 32 229 L32 230 L32 231 C49.1208 231 63 217.121 63 200 L62 200 Z M32 0 L32 1 C48.0163 1 61 13.9837 61 30 L62 30 L63 30 C63 12.8792 49.1208 -1 32 -1 L32 0 Z M30 0 L30 -1 C12.8792 -1 -1 12.8792 -1 30 L0 30 L1 30 C1 13.9837 13.9837 1 30 1 L30 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <EmojiButton data-figma="Emoji Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] [opacity:0.8] shrink-0 overflow-hidden" type={"웃김"} />
      <div data-figma="Emoji Button" data-node="1204:89437" data-instance-of="Emoji Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [opacity:0.8] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <ReactionEmoji data-figma="Reaction Emoji" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 relative" type={"종류 2"} />
      </div>
      <EmojiButton data-figma="Emoji Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"응원"} />
      <EmojiButton data-figma="Emoji Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] [opacity:0.8] shrink-0 overflow-hidden" type={"공감"} />
    </div>;
  return null;
}