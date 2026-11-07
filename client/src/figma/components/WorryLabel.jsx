// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88356 "고민" (해시 49f4ff6c)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { VoiceWave } from './VoiceWave';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function WorryLabel({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:88355" className={cx("[display:flex] [width:342px] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <p data-figma="둘이 찍은 사진인데 지만 보정해서 올린 여우" data-node="1204:88351" data-outline="" className="[display:-webkit-box] [--webkit-box-orient:vertical] [--webkit-line-clamp:1] [align-self:stretch] [overflow:hidden] [color:var(--text-primary,_#F8F8F8)] [text-overflow:ellipsis] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.176px] [left:0px]">{"둘이 찍은 사진인데 지만 보정해서 올린 여우"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88351"]
      }} /></p>
      <div data-figma="Frame" data-node="1204:88352" className="[display:flex] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [flex-shrink:0] [overflow:hidden]">
        <VoiceWave data-figma="voice wave" className="[display:flex] [justify-content:center] [align-items:center] [gap:1.5px] [flex-shrink:0] [overflow:hidden]" type={"default"} />
        <p data-figma="4명 이야기 중" data-node="1204:88354" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:63px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"4명 이야기 중"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88354"]
        }} /></p>
      </div>
    </div>;
  return null;
}