// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:55202 "Button / Secondary" (해시 25f6d707)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
import { AutoText } from '../AutoText';
export function ButtonSecondary({
  label = "버튼",
  labelWidth,
  labelSvg,
  icon = "false",
  style,
  className
}) {
  if (icon === "false") return <div data-figma="icon=false" data-node="1204:55203" className={cx("flex w-[342px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <AutoText data-figma="버튼" data-node="1204:55204" width={labelWidth} className="relative [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={labelSvg && svg[labelSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="relative top-[0.04px] left-[0px]">{label}</span>{labelSvg && svg[labelSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[labelSvg]
      }} /> : null}</AutoText>
    </div>;
  if (icon === "true") return <div data-figma="icon=true" data-node="1204:55205" className={cx("flex w-[342px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <span data-figma="Vector" data-node="1204:55206" className="relative w-[18px] h-[20px] shrink-0 [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:55206"]
    }} />
      <AutoText data-figma="버튼" data-node="1204:55207" width={labelWidth} className="relative [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={labelSvg && svg[labelSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="relative top-[0.04px] left-[0px]">{label}</span>{labelSvg && svg[labelSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[labelSvg]
      }} /> : null}</AutoText>
    </div>;
  return null;
}