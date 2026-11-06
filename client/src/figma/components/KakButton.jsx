// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:50428 "KAK 버튼" (해시 620f11ad)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function KakButton({
  variant = "기본",
  style,
  className
}) {
  if (variant === "기본") return <div data-figma="종류=기본" data-node="1405:50427" className={cx("flex w-[56px] h-[56px] [justify-content:center] [align-items:center] [border-radius:28px] [background:var(--brand-subtle,_#06303C)] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon/up" data-node="1405:50425" className="w-[26px] h-[26px] [transform:rotate(-180deg)] shrink-0 relative overflow-hidden">
        <span data-figma="Vector" data-node="1405:50426" className="w-[19.64px] h-[18.53px] absolute left-[3.11px] top-[4.33px] [transform:rotate(180deg)] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50426"]
      }} />
      </div>
    </div>;
  return null;
}