// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89831 "Button / Danger" (해시 28ffcbd3)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
import { AutoText } from '../AutoText';
export function ButtonDanger({
  label = "버튼",
  labelWidth,
  labelSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:55200" className={cx("flex w-[342px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--accent-red,_#FF5A5F)] relative overflow-hidden", className)} style={style}>
      <AutoText data-figma="버튼" data-node="1204:55201" width={labelWidth} className="relative [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={labelSvg && svg[labelSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="relative top-[0.04px] left-[0px]">{label}</span>{labelSvg && svg[labelSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[labelSvg]
      }} /> : null}</AutoText>
    </div>;
  return null;
}