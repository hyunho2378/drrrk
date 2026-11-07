// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:47159 "베스트 댓글 카드" (해시 951a4b77)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Top } from './Top';
import { ThumbsUp } from './ThumbsUp';
import svg from '../../assets/svg-map';
import { AutoText } from '../AutoText';
const cx = (...a) => a.filter(Boolean).join(" ");
export function BestCommentCard({
  drrrkC1Bold = "따뜻한 가죽소파29",
  drrrkB2Medium = "그 친구 외모정병 레전드인듯..ㅠ",
  drrrkB2MediumWidth,
  drrrkB2MediumSvg,
  drrrkC1Bold2 = "24",
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:47158" className={cx("[display:flex] [width:342px] [padding:var(--spacing-13,_16px)] [flex-direction:column] [align-items:flex-start] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <Top data-figma="Top" className="[display:flex] [align-items:center] [gap:var(--spacing-7,_8px)] [align-self:stretch] [flex-shrink:0] [overflow:hidden]" type={"default"} />
      <div data-figma="Frame 2147249204" data-node="1405:47155" className="[display:flex] [justify-content:space-between] [align-items:flex-start] [align-self:stretch] [flex-shrink:0]">
        <AutoText data-figma="댓글 · DRRRK/B2 Medium" data-node="1405:47156" width={drrrkB2MediumWidth} className="[position:relative] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrrkB2MediumSvg && svg[drrrkB2MediumSvg] ? {
        WebkitTextFillColor: 'transparent'
      } : {}}><span className="[position:relative] [top:-0.096px] [left:0px]">{drrrkB2Medium}</span>{drrrkB2MediumSvg && svg[drrrkB2MediumSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg[drrrkB2MediumSvg]
        }} /> : null}</AutoText>
        <ThumbsUp data-figma="따봉" className="[display:flex] [align-items:center] [gap:var(--spacing-3,_4px)] [flex-shrink:0] [overflow:hidden]" drrrkC1Bold={"24"} drrrkC1BoldWidth={14} drrrkC1BoldSvg={"I1405:47157;1405:46979"} type={"default"} />
      </div>
    </div>;
  return null;
}