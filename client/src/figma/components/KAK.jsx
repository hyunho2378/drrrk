// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:83749 "KAK" (해시 6de870eb)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function KAK({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:83745" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] relative overflow-hidden", className)} style={style}>
      <div data-figma="KAK 버튼" data-node="1204:83741" className="flex w-[56px] h-[56px] [justify-content:center] [align-items:center] [border-radius:var(--radius-13xl,_28px)] [background:var(--brand-subtle,_#06303C)] shrink-0 overflow-hidden">
        <div data-figma="Icon / Line" data-node="1204:83742" data-instance-of="Icon / Line" className="flex w-[26px] h-[26px] [justify-content:center] [align-items:center] shrink-0 relative">
          <Icon data-figma="thumb-down" data-node="I1204:83742;1299:25557" name="thumb-down" color="var(--text-primary, #F8F8F8)" strokeScale={0.9231} className="w-[26px] h-[26px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:83743" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden">
        <p data-figma="KAK" data-node="1204:83744" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:900] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[28px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[-0.24px]">{"KAK"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:83744"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:83748" className={cx("flex w-[48px] h-[48px] [padding:13px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83747" data-instance-of="Icon / Line" className="flex w-[22px] h-[22px] [justify-content:center] [align-items:center] shrink-0 absolute left-[13px] top-[13px]">
        <Icon data-figma="thumb-down" data-node="I1204:83747;1299:25557" name="thumb-down" color="var(--text-primary, #F8F8F8)" className="w-[22px] h-[22px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  return null;
}