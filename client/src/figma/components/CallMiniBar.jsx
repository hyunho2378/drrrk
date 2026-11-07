// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:87253 "통화 미니바 (탭하면 채팅으로)" (해시 3d991070)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { VoiceWave } from './VoiceWave';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function CallMiniBar({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:87252" className={cx("[display:flex] [width:342px] [padding:var(--spacing-9,_10px)_var(--spacing-12,_14px)] [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] [border-radius:var(--radius-7xl,_16px)] [background:var(--brand-subtle,_#06303C)] [position:relative] [overflow:hidden]", className)} style={style}>
      <VoiceWave data-figma="voice wave" className="[display:flex] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [flex-shrink:0] [overflow:hidden]" type={"종류 3"} />
      <p data-figma="통화 중 / 단체 사진에 나만 쏙 빼고 보정한…" data-node="1204:87249" data-outline="" className="[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [flex:1_0_0] [overflow:hidden] [color:var(--text-primary,_#F8F8F8)] [text-overflow:ellipsis] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"통화 중 · 단체 사진에 나만 쏙 빼고 보정한…"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87249"]
      }} /></p>
      <p data-figma="05:12" data-node="1204:87250" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"05:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87250"]
      }} /></p>
      <div data-figma="Icon / Line" data-node="1204:87251" data-instance-of="Icon / Line" className="[display:flex] [width:14px] [height:14px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-right" data-node="I1204:87251;1299:25587" name="chevron-right" color="var(--text-primary, #F8F8F8)" strokeScale={1.1429} className="[width:14px] [height:14px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  return null;
}