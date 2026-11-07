// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88424 "댓글 입력" (해시 7e5d81f8)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { SendButton } from './SendButton';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function CommentInput({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:88423" className={cx("[display:flex] [width:358px] [height:52px] [padding:0_var(--spacing-5,_6px)_0_var(--spacing-14,_18px)] [justify-content:space-between] [align-items:center] [border-radius:var(--radius-12xl,_26px)] [border:1px_solid_transparent] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:-1px] [top:-1px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"358\" height=\"52\" viewBox=\"0 0 358 52\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"358\" height=\"52\" rx=\"26\" style=\"fill:var(--bg-base, #000000)\"/><defs><clipPath id=\"c1204_88423\"><rect width=\"358\" height=\"52\" rx=\"26\"/></clipPath></defs><g clip-path=\"url(#c1204_88423)\"><path d=\"M0 26 M358 26 M358 26 M0 26 M26 0 L26 1 L332 1 L332 0 L332 -1 L26 -1 L26 0 Z M358 26 M332 52 L332 51 L26 51 L26 52 L26 53 L332 53 L332 52 Z M0 26 M26 52 L26 51 C12.1929 51 1 39.8071 1 26 L0 26 L-1 26 C-1 40.9117 11.0883 53 26 53 L26 52 Z M358 26 L357 26 C357 39.8071 345.807 51 332 51 L332 52 L332 53 C346.912 53 359 40.9117 359 26 L358 26 Z M332 0 L332 1 C345.807 1 357 12.1929 357 26 L358 26 L359 26 C359 11.0883 346.912 -1 332 -1 L332 0 Z M26 0 L26 -1 C11.0883 -1 -1 11.0883 -1 26 L0 26 L1 26 C1 12.1929 12.1929 1 26 1 L26 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="댓글로 한마디…" data-node="1204:88421" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:400] [line-height:20px] [letter-spacing:-0.56px] [flex-shrink:0] [width:84px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:-0.096px] [left:0px]">{"댓글로 한마디…"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88421"]
      }} /></p>
      <SendButton data-figma="보내기 버튼" className="[display:flex] [width:40px] [height:40px] [padding:11px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative] [overflow:hidden]" type={"comment"} icon={"white"} />
    </div>;
  return null;
}