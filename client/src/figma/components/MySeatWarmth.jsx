// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:85568 "내 엉따" (해시 84f3bc95)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function MySeatWarmth({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:85567" className={cx("[display:inline-flex] [padding:var(--spacing-3,_4px)_var(--spacing-9,_10px)] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [border-radius:var(--radius-full,_999px)] [background:var(--accent-orange-15,_rgba(255,_154,_77,_0.15))] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="엉따 39.2°" data-node="1204:85566" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:51px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"엉따 39.2°"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85566"]
      }} /></p>
    </div>;
  return null;
}