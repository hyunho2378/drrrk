// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89055 "추천 줄" (해시 64b4ebb5)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { ChairCells } from './ChairCells';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Icon } from '../Icon';
export function RecommendRow({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:89051" className={cx("inline-flex [justify-content:center] [align-items:flex-start] [gap:var(--spacing-5,_6px)] relative overflow-hidden", className)} style={style}>
      <div data-figma="arrow" data-node="1204:89046" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1204:89047" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 [opacity:0.3] absolute left-[0px] top-[24px]">
          <Icon data-figma="chevron-left" data-node="I1204:89047;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <ChairCells data-figma="cells" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0" type={"default"} />
      <div data-figma="arrow" data-node="1204:89049" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1204:89050" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[24px]">
          <Icon data-figma="chevron-right" data-node="I1204:89050;1299:25589" name="chevron-right" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:89054" className={cx("inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] relative overflow-hidden", className)} style={style}>
      <ChairCells data-figma="cells" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0" type={"종류 2"} />
    </div>;
  return null;
}