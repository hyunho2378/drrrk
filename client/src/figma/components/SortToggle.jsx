// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:87076 "정렬" (해시 263fe061)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function SortToggle({
  type = "인기순",
  style,
  className
}) {
  if (type === "인기순") return <div data-figma="type=인기순" data-node="1204:87075" className={cx("[display:inline-flex] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="인기순" data-node="1204:87073" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [width:34px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.268px] [left:0px]">{"인기순"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87073"]
      }} /></p>
      <div data-figma="Icon / Line" data-node="1204:87074" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-down" data-node="I1204:87074;1299:25595" name="chevron-down" color="var(--text-primary, #F8F8F8)" strokeScale={0.6667} className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  if (type === "수정본") return <div data-figma="type=수정본" data-node="1299:20670" className={cx("[display:inline-flex] [justify-content:center] [align-items:center] [gap:2px] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="인기순" data-node="1299:20667" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [width:34px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.268px] [left:0px]">{"인기순"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20667"]
      }} /></p>
      <div data-figma="icon/down" data-node="1405:44687" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-down" data-node="I1405:44687;1299:25595" name="chevron-down" color="var(--text-primary, #F8F8F8)" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  return null;
}