// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89890 "홈 표시줄" (해시 9ba08183)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function HomeIndicatorBar({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:89888" className={cx("w-[134px] h-[5px] relative overflow-hidden", className)} style={style}>
      <div data-figma="home indicator" data-node="1204:89889" className="w-[134px] h-[5px] [border-radius:3px] [background:var(--text-primary,_#F8F8F8)] absolute left-[0px] top-[0px]" />
    </div>;
  return null;
}