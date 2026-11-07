// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1299:19792 "Community / Post Item" (해시 99ae651)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
import { AutoText } from '../AutoText';
const cx = (...a) => a.filter(Boolean).join(" ");
export function CommunityPostItem({
  nickname = "딱딱한 나무스툴12",
  nicknameWidth,
  nicknameSvg,
  title = "제목",
  titleSvg,
  preview = "미리보기",
  previewSvg,
  time = "2시간 전",
  timeWidth,
  timeSvg,
  drr = "12",
  drrWidth,
  drrSvg,
  comments = "3",
  commentsWidth,
  commentsSvg,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1299:19716" className={cx("[display:flex] [width:342px] [padding:18px_0] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:8px] [border-bottom:1px_solid_var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <AutoText data-figma="딱딱한 나무스툴12" data-node="1299:19717" width={nicknameWidth} className="[position:relative] [color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={nicknameSvg && svg[nicknameSvg] ? {
      WebkitTextFillColor: 'transparent'
    } : {}}><span className="[position:relative] [top:0.132px] [left:0px]">{nickname}</span>{nicknameSvg && svg[nicknameSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg[nicknameSvg]
      }} /> : null}</AutoText>
      <div data-figma="Main" data-node="1299:19718" className="[display:flex] [justify-content:center] [align-items:center] [gap:14px] [align-self:stretch] [flex-shrink:0] [overflow:hidden]">
        <div data-figma="Text" data-node="1299:19719" className="[display:flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:6px] [flex:1_0_0] [overflow:hidden]">
          <p data-figma="제목" data-node="1299:19720" className="[position:relative] [align-self:stretch] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={titleSvg && svg[titleSvg] ? {
          WebkitTextFillColor: 'transparent'
        } : {}}><span className="[position:relative] [top:0.176px] [left:0px]">{title}</span>{titleSvg && svg[titleSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg[titleSvg]
          }} /> : null}</p>
          <p data-figma="미리보기" data-node="1299:19721" className="[position:relative] [height:16px] [align-self:stretch] [overflow:hidden] [color:var(--text-secondary,_#9AA1A6)] [text-overflow:ellipsis] [white-space:pre] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={previewSvg && svg[previewSvg] ? {
          WebkitTextFillColor: 'transparent'
        } : {}}><span className="[position:relative] [top:0.268px] [left:0px]">{preview}</span>{previewSvg && svg[previewSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg[previewSvg]
          }} /> : null}</p>
        </div>
        <div data-figma="Thumb" data-node="1299:19722" data-img={"{\"src\":\"./assets/images/5534d467597ad85cccf9aa5b99ce17f801a0a8d6.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:64px] [height:64px] [border-radius:10px] [background:url(./assets/images/5534d467597ad85cccf9aa5b99ce17f801a0a8d6.webp)_50%_/_cover_no-repeat] [flex-shrink:0]" />
      </div>
      <div data-figma="Meta" data-node="1299:19723" className="[display:flex] [justify-content:center] [align-items:center] [gap:8px] [align-self:stretch] [flex-shrink:0] [overflow:hidden]">
        <div data-figma="Tag / 대화 다시보기" data-node="1299:19724" className="[display:flex] [padding:4px_10px_4px_8px] [justify-content:center] [align-items:center] [gap:4px] [border-radius:12px] [background:var(--brand-subtle,_#06303C)] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="Frame" data-node="1299:19725" className="[width:12px] [height:12px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="1299:19726" className="[width:5.5px] [height:6.5px] [position:absolute] [left:4px] [top:2.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19726"]
          }} />
          </div>
          <p data-figma="대화 다시보기" data-node="1299:19727" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:58px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"대화 다시보기"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19727"]
          }} /></p>
        </div>
        <AutoText data-figma="2시간 전" data-node="1299:19728" width={timeWidth} className="[position:relative] [color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={timeSvg && svg[timeSvg] ? {
        WebkitTextFillColor: 'transparent'
      } : {}}><span className="[position:relative] [top:0.132px] [left:0px]">{time}</span>{timeSvg && svg[timeSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg[timeSvg]
        }} /> : null}</AutoText>
        <div data-figma="spacer" data-node="1299:19729" className="[height:1px] [flex:1_0_0] [overflow:hidden]" />
        <div data-figma="DRR" data-node="1299:19730" className="[display:flex] [justify-content:center] [align-items:center] [gap:4px] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="Frame" data-node="1299:19731" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="1299:19732" className="[width:12.39px] [height:12.75px] [position:absolute] [left:3px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19732"]
          }} />
          </div>
          <AutoText data-figma="12" data-node="1299:19733" width={drrWidth} className="[position:relative] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={drrSvg && svg[drrSvg] ? {
          WebkitTextFillColor: 'transparent'
        } : {}}><span className="[position:relative] [top:0.268px] [left:0px]">{drr}</span>{drrSvg && svg[drrSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg[drrSvg]
          }} /> : null}</AutoText>
        </div>
        <div data-figma="댓글" data-node="1299:19734" className="[display:flex] [justify-content:center] [align-items:center] [gap:4px] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="Frame" data-node="1299:19735" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="1299:19736" className="[width:13.5px] [height:12.75px] [position:absolute] [left:2.25px] [top:3px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19736"]
          }} />
            <span data-figma="Vector" data-node="1299:19737" className="[width:1.5px] [height:1.5px] [position:absolute] [left:5.25px] [top:8.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19737"]
          }} />
            <span data-figma="Vector" data-node="1299:19738" className="[width:1.5px] [height:1.5px] [position:absolute] [left:8.25px] [top:8.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19738"]
          }} />
            <span data-figma="Vector" data-node="1299:19739" className="[width:1.5px] [height:1.5px] [position:absolute] [left:11.25px] [top:8.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19739"]
          }} />
          </div>
          <AutoText data-figma="3" data-node="1299:19740" width={commentsWidth} className="[position:relative] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0]" style={commentsSvg && svg[commentsSvg] ? {
          WebkitTextFillColor: 'transparent'
        } : {}}><span className="[position:relative] [top:0.268px] [left:0px]">{comments}</span>{commentsSvg && svg[commentsSvg] ? <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg[commentsSvg]
          }} /> : null}</AutoText>
        </div>
      </div>
    </div>;
  return null;
}