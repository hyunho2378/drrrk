// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:82887 "live signal" (해시 88966942)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function LiveSignal({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:82886" className={cx("inline-flex [padding:var(--spacing-7,_8px)_var(--spacing-12,_14px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <span data-figma="Ellipse" data-node="1204:82884" className="relative w-[8px] h-[8px] shrink-0 [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82884"]
    }} />
      <p data-figma="지금 23개 방에서 드르륵 중" data-node="1204:82885" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[133px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"지금 23개 방에서 드르륵 중"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:82885"]
      }} /></p>
    </div>;
  return null;
}