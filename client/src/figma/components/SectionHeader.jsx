// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:46938 "Section Header" (해시 18de6224)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function SectionHeader({
  drrrkH3 = "오늘의 베스트 댓글",
  drrrkH3Svg,
  drrrkB3Reg = "의자들이 가장 많이 공감한 말이에요",
  drrrkB3RegSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:46933" className={cx("[display:flex] [width:342px] [flex-direction:column] [align-items:flex-start] [gap:8px] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="섹션 제목 · DRRRK/H3" data-node="1405:46928" data-outline="" className="[align-self:stretch] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"오늘 나눈 대화"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:46928"]
      }} /></p>
      <div data-figma="Meta" data-node="1405:46929" className="[display:flex] [align-items:center] [gap:var(--spacing-5,_6px)] [align-self:stretch] [flex-shrink:0] [overflow:hidden]">
        <div data-figma="Chip" data-node="1405:46930" className="[display:flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [align-items:flex-start] [border-radius:var(--radius-full,_999px)] [background:var(--brand-subtle,_#06303C)] [flex-shrink:0] [overflow:hidden]">
          <p data-figma="관계 · DRRRK/C1 Bold" data-node="1405:46931" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"오늘의 고민"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1405:46931"]
          }} /></p>
        </div>
        <p data-figma="시간 · DRRRK/C1 Medium" data-node="1405:46932" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:155px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"둘이 찍은 사진, 자기만 보정한 친구"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1405:46932"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1405:46937" className={cx("[display:flex] [width:342px] [flex-direction:column] [align-items:flex-start] [gap:var(--spacing-3,_4px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="섹션 제목 · DRRRK/H3" data-node="1405:46935" className="[position:relative] [align-self:stretch] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrrkH3Svg && svg[drrrkH3Svg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:-0.28px] [left:0px]">{drrrkH3}</span>{drrrkH3Svg && svg[drrrkH3Svg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[drrrkH3Svg]
      }} /> : null}</p>
      <p data-figma="섹션 설명 · DRRRK/B3 Regular" data-node="1405:46936" className="[position:relative] [align-self:stretch] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrrkB3RegSvg && svg[drrrkB3RegSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.268px] [left:0px]">{drrrkB3Reg}</span>{drrrkB3RegSvg && svg[drrrkB3RegSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[drrrkB3RegSvg]
      }} /> : null}</p>
    </div>;
  return null;
}