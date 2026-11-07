// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:86825 "AI 맥락" (해시 93d909a4)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function AiContext({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:86824" className={cx("[display:inline-flex] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="AI가 읽은 맥락" data-node="1204:86819" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:500] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:62px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"AI가 읽은 맥락"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86819"]
      }} /></p>
      <div data-figma="Frame" data-node="1204:86820" className="[display:flex] [padding:var(--spacing-3,_4px)_var(--spacing-8,_9px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-4xl,_11px)] [background:var(--brand-subtle,_#06303C)] [flex-shrink:0] [overflow:hidden]">
        <p data-figma="#가족관계" data-node="1204:86821" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:46px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"#가족관계"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86821"]
        }} /></p>
      </div>
      <div data-figma="Frame" data-node="1204:86822" className="[display:flex] [padding:var(--spacing-3,_4px)_var(--spacing-8,_9px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-4xl,_11px)] [background:var(--brand-subtle,_#06303C)] [flex-shrink:0] [overflow:hidden]">
        <p data-figma="#가정사" data-node="1204:86823" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:37px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"#가정사"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86823"]
        }} /></p>
      </div>
    </div>;
  return null;
}