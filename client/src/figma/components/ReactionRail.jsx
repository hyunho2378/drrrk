// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88865 "공감 표시" (해시 309ea1ee)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { DRR } from './DRR';
const cx = (...a) => a.filter(Boolean).join(' ');
import { KAK } from './KAK';
export function ReactionRail({
  type = "DRR / KAK",
  style,
  className
}) {
  if (type === "DRR / KAK") return <div data-figma="type=DRR / KAK" data-node="1204:88864" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-12,_14px)] relative overflow-hidden", className)} style={style}>
      <DRR data-figma="DRR" className="flex [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden" type={"default"} />
      <KAK data-figma="KAK" className="flex [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden" type={"default"} />
    </div>;
  return null;
}