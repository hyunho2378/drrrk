// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:50260 "Button" (해시 3f241a21)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Button({
  variant = "기본",
  style,
  className
}) {
  if (variant === "기본") return <div data-figma="종류=기본" data-node="1405:50256" className={cx("flex w-[133px] [padding:12px_0] [justify-content:center] [align-items:center] gap-[6px] [border-radius:26px] [background:#222628] relative overflow-hidden", className)} style={style}>
      <p data-figma="이어서 혼자 드르륵" data-node="1405:50255" data-outline="" className="[color:#F8F8F8] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[107px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"이어서 혼자 드르륵"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50255"]
      }} /></p>
    </div>;
  if (variant === "종류 2") return <div data-figma="종류=종류 2" data-node="1405:50259" className={cx("flex w-[133px] [padding:12px_0] [justify-content:center] [align-items:center] gap-[6px] [border-radius:26px] [background:var(--DRRRK,_#36D2FF)] relative overflow-hidden", className)} style={style}>
      <p data-figma="함께 드르륵 앉기" data-node="1405:50258" data-outline="" className="[color:#000] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[94px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"함께 드르륵 앉기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50258"]
      }} /></p>
    </div>;
  return null;
}