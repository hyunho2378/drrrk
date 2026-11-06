// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:85452 "Page Dots" (해시 d991929a)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function PageDots({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:85451" className={cx("w-[64px] h-[6px] relative overflow-hidden", className)} style={style}>
      <div data-figma="Dot / active" data-node="1204:85446" className="w-[16px] h-[6px] [border-radius:var(--radius-m,_3px)] [background:var(--text-primary,_#F8F8F8)] absolute left-[0px] top-[0px]" />
      <span data-figma="Dot" data-node="1204:85447" className="w-[6px] h-[6px] absolute left-[22px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:85447"]
    }} />
      <span data-figma="Dot" data-node="1204:85448" className="w-[6px] h-[6px] absolute left-[34px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:85448"]
    }} />
      <span data-figma="Dot" data-node="1204:85449" className="w-[6px] h-[6px] absolute left-[46px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:85449"]
    }} />
      <span data-figma="Dot" data-node="1204:85450" className="w-[6px] h-[6px] absolute left-[58px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:85450"]
    }} />
    </div>;
  return null;
}