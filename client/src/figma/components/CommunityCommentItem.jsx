// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1299:19715 "Community / Comment Item" (해시 2a90bea4)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
import { AutoText } from '../AutoText';
export function CommunityCommentItem({
  nickname = "따뜻한 가죽소파29",
  nicknameWidth,
  nicknameSvg,
  time = "12분 전",
  timeWidth,
  timeSvg,
  body = "댓글",
  bodySvg,
  drr = "12",
  drrWidth,
  drrSvg,
  best = false,
  stamp = false,
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1299:19697" className={cx("flex w-[342px] [padding:14px_0] [justify-content:center] [align-items:flex-start] gap-[10px] relative overflow-hidden", className)} style={style}>
      <img data-figma="Avatar" data-node="1299:19698" data-px="" data-hires="" alt="" src="./assets/raster/1299-19698.webp" className="w-[32px] h-[32px] shrink-0 block" />
      <div data-figma="Content" data-node="1299:19699" className="flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[6px] [flex:1_0_0] overflow-hidden">
        <div data-figma="Header" data-node="1299:19700" className="flex [align-items:center] gap-[6px] [align-self:stretch] shrink-0 overflow-hidden">
          <AutoText data-figma="따뜻한 가죽소파29" data-node="1299:19701" width={nicknameWidth} className="relative [color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:700] [line-height:18px] [letter-spacing:-0.52px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={nicknameSvg && svg[nicknameSvg] ? {
          WebkitTextFillColor: 'transparent'
        } : {}}><span className="relative top-[0.268px] left-[0px]">{nickname}</span>{nicknameSvg && svg[nicknameSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg[nicknameSvg]
          }} /> : null}</AutoText>
          {best && <div data-figma="Badge / BEST" data-node="1299:19702" className="flex [padding:2px_6px] [justify-content:center] [align-items:center] [border-radius:5px] [background:var(--brand-primary,_#36D2FF)] shrink-0 overflow-hidden">
            <p data-figma="BEST" data-node="1299:19703" data-outline="" className="[color:var(--bg-surface,_#121415)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[27px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"BEST"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1299:19703"]
            }} /></p>
          </div>}
          <AutoText data-figma="12분 전" data-node="1299:19704" width={timeWidth} className="relative [color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={timeSvg && svg[timeSvg] ? {
          WebkitTextFillColor: 'transparent'
        } : {}}><span className="relative top-[0.132px] left-[0px]">{time}</span>{timeSvg && svg[timeSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg[timeSvg]
          }} /> : null}</AutoText>
        </div>
        <p data-figma="댓글" data-node="1299:19705" className="relative [align-self:stretch] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:400] [line-height:20px] [letter-spacing:-0.56px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={bodySvg && svg[bodySvg] ? {
        WebkitTextFillColor: 'transparent'
      } : {}}><span className="relative top-[-0.096px] left-[0px]">{body}</span>{bodySvg && svg[bodySvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg[bodySvg]
        }} /> : null}</p>
        <div data-figma="Footer" data-node="1299:19706" className="flex [justify-content:center] [align-items:center] gap-[14px] [align-self:stretch] shrink-0 overflow-hidden">
          <div data-figma="DRR" data-node="1299:19707" className="flex [justify-content:center] [align-items:center] gap-[4px] shrink-0 overflow-hidden">
            <div data-figma="Frame" data-node="1299:19708" className="w-[16px] h-[16px] shrink-0 relative overflow-hidden">
              <span data-figma="Vector" data-node="1299:19709" className="w-[11.02px] h-[11.34px] absolute left-[2.67px] top-[2px] [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1299:19709"]
            }} />
            </div>
            <AutoText data-figma="12" data-node="1299:19710" width={drrWidth} className="relative [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0" style={drrSvg && svg[drrSvg] ? {
            WebkitTextFillColor: 'transparent'
          } : {}}><span className="relative top-[0.132px] left-[0px]">{drr}</span>{drrSvg && svg[drrSvg] ? <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg[drrSvg]
            }} /> : null}</AutoText>
          </div>
          <p data-figma="답글 달기" data-node="1299:19711" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"답글 달기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:19711"]
          }} /></p>
          <div data-figma="spacer" data-node="1299:19712" className="h-[1px] [flex:1_0_0] overflow-hidden" />
          {stamp && <div data-figma="Badge / 스탬프" data-node="1299:19713" className="flex [padding:2px_6px] [justify-content:center] [align-items:center] [border-radius:5px] [border:1px_solid_transparent] shrink-0 overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"56\" height=\"18\" viewBox=\"0 0 56 18\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"c1299_19713\"><rect width=\"56\" height=\"18\" rx=\"5\"/></clipPath></defs><g clip-path=\"url(#c1299_19713)\"><path d=\"M5 0 L5 1 L51 1 L51 0 L51 -1 L5 -1 L5 0 Z M56 5 L55 5 L55 13 L56 13 L57 13 L57 5 L56 5 Z M51 18 L51 17 L5 17 L5 18 L5 19 L51 19 L51 18 Z M0 13 L1 13 L1 5 L0 5 L-1 5 L-1 13 L0 13 Z M5 18 L5 17 C2.79086 17 1 15.2091 1 13 L0 13 L-1 13 C-1 16.3137 1.68629 19 5 19 L5 18 Z M56 13 L55 13 C55 15.2091 53.2091 17 51 17 L51 18 L51 19 C54.3137 19 57 16.3137 57 13 L56 13 Z M51 0 L51 1 C53.2091 1 55 2.79086 55 5 L56 5 L57 5 C57 1.68629 54.3137 -1 51 -1 L51 0 Z M5 0 L5 -1 C1.68629 -1 -1 1.68629 -1 5 L0 5 L1 5 C1 2.79086 2.79086 1 5 1 L5 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-warning, #FFC93C)\"/></g></svg>"
          }} />
            <p data-figma="스탬프 +1" data-node="1299:19714" data-outline="" className="[color:var(--status-warning,_#FFC93C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[42px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"스탬프 +1"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1299:19714"]
            }} /></p>
          </div>}
        </div>
      </div>
    </div>;
  return null;
}