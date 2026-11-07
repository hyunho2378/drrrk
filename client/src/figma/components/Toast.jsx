// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88526 "토스트" (해시 9340e951)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function Toast({
  type = "추천 완료",
  style,
  className
}) {
  if (type === "추천 완료") return <div data-figma="type=추천 완료" data-node="1204:88525" className={cx("[display:flex] [width:342px] [padding:var(--spacing-12,_14px)_var(--spacing-13,_16px)] [justify-content:center] [align-items:center] [gap:var(--spacing-11,_12px)] [border-radius:var(--radius-7xl,_16px)] [background:var(--gray-800,_#30363A)] [box-shadow:0_8px_24px_0_rgba(0,_0,_0,_0.40)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame" data-node="1204:88520" className="[display:flex] [width:28px] [height:28px] [padding:6px] [justify-content:center] [align-items:center] [flex-shrink:0] [border-radius:var(--radius-6xl,_14px)] [background:var(--brand-primary,_#36D2FF)] [position:relative] [overflow:hidden]">
        <div data-figma="Icon / Line" data-node="1204:88521" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:6px] [top:6px]">
          <Icon data-figma="check" data-node="I1204:88521;1299:25635" name="check" color="var(--bg-base, #000000)" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:88522" className="[display:flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [flex:1_0_0] [overflow:hidden]">
        <p data-figma="가죽소파29님의 엉따 지수가 0.3° 올라갔어요" data-node="1204:88523" data-outline="" className="[align-self:stretch] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"가죽소파29님의 엉따 지수가 0.3° 올라갔어요"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88523"]
        }} /></p>
      </div>
      <p data-figma="취소" data-node="1204:88524" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:700] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [width:23px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.268px] [left:0px]">{"취소"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88524"]
      }} /></p>
    </div>;
  return null;
}