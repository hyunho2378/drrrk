// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89365 "엉따 지수" (해시 82553f17)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function SeatWarmthIndex({
  type = "안내",
  style,
  className
}) {
  if (type === "안내") return <div data-figma="type=안내" data-node="1204:89364" className={cx("[display:flex] [width:342px] [padding:var(--spacing-13,_16px)_var(--spacing-14,_18px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] [border-radius:var(--radius-9xl,_18px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame" data-node="1204:89357" className="[display:flex] [justify-content:space-between] [align-items:center] [align-self:stretch] [flex-shrink:0] [overflow:hidden]">
        <div data-figma="Frame" data-node="1204:89358" className="[display:flex] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [flex-shrink:0] [overflow:hidden]">
          <p data-figma="엉따 지수" data-node="1204:89359" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] [flex-shrink:0] [width:50px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:-0.096px] [left:0px]">{"엉따 지수"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:89359"]
          }} /></p>
          <div data-figma="Icon / Line" data-node="1204:89360" data-instance-of="Icon / Line" className="[display:flex] [width:13px] [height:13px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
            <Icon data-figma="information" data-node="I1204:89360;1299:25683" name="information-1463-24333" color="var(--text-primary, #F8F8F8)" className="[width:13px] [height:13px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="41.5°" data-node="1204:89361" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:24px] [font-style:normal] [font-weight:700] [line-height:34px] [letter-spacing:-0.96px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.264px] [left:0px]">{"41.5°"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:89361"]
        }} /></p>
      </div>
      <div data-figma="gauge" data-node="1204:89362" data-instance-of="gauge" className="[display:flex] [height:6px] [padding-right:86px] [align-items:center] [align-self:stretch] [border-radius:var(--radius-m,_3px)] [background:var(--text-tertiary-40,_rgba(110,_118,_124,_0.40))] [flex-shrink:0] [width:306px] [position:relative] [overflow:hidden]">
        <div data-figma="Rectangle" data-node="I1204:89362;1204:85300" className="[width:220px] [height:6px] [border-radius:var(--radius-m,_3px)] [background:linear-gradient(90deg,_#36D2FF_0%,_#FF9A4D_100%)] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <p data-figma="36.5°에서 시작해요. 대화에서 받은 공감 / 추천으로 올라가고, 신고가 확인되면 내려가요." data-node="1204:89363" data-outline="" className="[align-self:stretch] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"36.5°에서 시작해요. 대화에서 받은 공감·추천으로 올라가고, 신고가\n확인되면 내려가요."}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89363"]
      }} /></p>
    </div>;
  return null;
}