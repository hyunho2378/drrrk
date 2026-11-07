// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:86793 "의자 꾸미기 버튼" (해시 8b45c1d)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function ChairCustomizeButton({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:86792" className={cx("[display:inline-flex] [padding:var(--spacing-6,_7px)_var(--spacing-11,_12px)_var(--spacing-6,_7px)_var(--spacing-12,_14px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-full,_999px)] [border:1px_solid_transparent] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:-1px] [top:-1px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"126\" height=\"34\" viewBox=\"0 0 126 34\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"126\" height=\"34\" rx=\"17\" style=\"fill:var(--brand-subtle, #06303C)\"/><defs><clipPath id=\"c1204_86792\"><rect width=\"126\" height=\"34\" rx=\"17\"/></clipPath></defs><g clip-path=\"url(#c1204_86792)\"><path d=\"M0 17 M126 17 M126 17 M0 17 M17 0 L17 1 L109 1 L109 0 L109 -1 L17 -1 L17 0 Z M126 17 M109 34 L109 33 L17 33 L17 34 L17 35 L109 35 L109 34 Z M0 17 M17 34 L17 33 C8.16345 33 1 25.8366 1 17 L0 17 L-1 17 C-1 26.9411 7.05888 35 17 35 L17 34 Z M126 17 L125 17 C125 25.8366 117.837 33 109 33 L109 34 L109 35 C118.941 35 127 26.9411 127 17 L126 17 Z M109 0 L109 1 C117.837 1 125 8.16344 125 17 L126 17 L127 17 C127 7.05887 118.941 -1 109 -1 L109 0 Z M17 0 L17 -1 C7.05888 -1 -1 7.05887 -1 17 L0 17 L1 17 C1 8.16344 8.16345 1 17 1 L17 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--brand-primary-50, #36D2FF80)\"/></g></svg>"
    }} />
      <Icon data-figma="Icon / 기타" data-node="1204:86789" name="기타-brush-14" color="var(--brand-primary, #36D2FF)" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative]" />
      <p data-figma="의자 꾸미기" data-node="1204:86790" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:700] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [width:58px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.268px] [left:0px]">{"의자 꾸미기"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86790"]
      }} /></p>
      <div data-figma="Icon / Line" data-node="1204:86791" data-instance-of="Icon / Line" className="[display:flex] [width:14px] [height:14px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-right" data-node="I1204:86791;1299:25587" name="chevron-right" color="var(--text-primary, #F8F8F8)" strokeScale={1.1429} className="[width:14px] [height:14px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  return null;
}