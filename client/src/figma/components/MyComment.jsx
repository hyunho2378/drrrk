// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:87121 "내 댓글" (해시 d238c53b)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function MyComment({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:87120" className={cx("flex w-[342px] [justify-content:flex-end] [align-items:center] relative overflow-hidden", className)} style={style}>
      <div data-figma="bubble" data-node="1204:87118" className="flex [padding:var(--spacing-6,_7px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-6xl,_14px)] [background:var(--brand-primary,_#36D2FF)] shrink-0 overflow-hidden">
        <p data-figma="택배상자님 힘내요!!" data-node="1204:87119" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[98px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"택배상자님 힘내요!!"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87119"]
        }} /></p>
      </div>
    </div>;
  return null;
}