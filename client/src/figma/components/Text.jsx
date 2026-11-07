// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:46915 "Text" (해시 73eb60c1)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function Text({
  drrrkB1Bol = "고민을 꺼냈어요",
  drrrkB1BolSvg,
  drrrkB3Reg = "\"이거 일부러야?\"로 이야기가 시작됐어요",
  drrrkB3RegSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:46910" className={cx("[display:flex] [width:302px] [flex-direction:column] [align-items:flex-start] [gap:4px] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="제목 · DRRRK/H2" data-node="1405:46909" data-outline="" className="[align-self:stretch] [color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:24px] [font-style:normal] [font-weight:700] [line-height:34px] [letter-spacing:-0.96px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.264px] [left:0px]"><span className="[font-weight:700] [font-size:24px] [color:var(--text-primary,_#F8F8F8)]">{"오늘 대화에서 의자가"}</span><span className="[font-weight:700] [font-size:24px] [color:var(--brand-primary,_#36D2FF)]">{"\n1.1°C "}</span><span className="[font-weight:700] [font-size:24px] [color:var(--text-primary,_#F8F8F8)]">{"더 뜨끈해졌어요"}</span></span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:46909"]
      }} /></p>
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1405:46914" className={cx("[display:flex] [width:306px] [padding:2px_0_var(--spacing-15,_20px)_0] [flex-direction:column] [align-items:flex-start] [gap:4px] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="단계 제목 · DRRRK/B1 Bold" data-node="1405:46912" className="[position:relative] [align-self:stretch] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrrkB1BolSvg && svg[drrrkB1BolSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.04px] [left:0px]">{drrrkB1Bol}</span>{drrrkB1BolSvg && svg[drrrkB1BolSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[drrrkB1BolSvg]
      }} /> : null}</p>
      <p data-figma="단계 설명 · DRRRK/B3 Regular" data-node="1405:46913" className="[position:relative] [align-self:stretch] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrrkB3RegSvg && svg[drrrkB3RegSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.268px] [left:0px]">{drrrkB3Reg}</span>{drrrkB3RegSvg && svg[drrrkB3RegSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[drrrkB3RegSvg]
      }} /> : null}</p>
    </div>;
  return null;
}