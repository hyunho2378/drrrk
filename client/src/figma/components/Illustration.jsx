// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:44533 "Illustration" (해시 bedf1dff)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Illustration({
  name = "sun",
  style,
  className
}) {
  if (name === "sun") return <div data-figma="name=sun" data-node="1405:44532" className={cx("flex w-[225px] h-[158px] [justify-content:center] [align-items:center] relative overflow-hidden", className)} style={style}>
      <img data-figma="image 1208091468" data-node="1405:44531" data-px="" data-hires="" alt="" src="./assets/raster/1405-44531.webp" className="w-[225px] h-[158px] shrink-0 absolute left-[0px] top-[0px] block" />
    </div>;
  return null;
}