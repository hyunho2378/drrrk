// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89566 "Modal" (해시 174dc603)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { RecommendRow } from './RecommendRow';
import { ChairCell } from './ChairCell';
import { Dots } from './Dots';
import { CarouselCard } from './CarouselCard';
import { CTA } from './CTA';
import { Checkbox } from './Checkbox';
import { ButtonSecondary } from './ButtonSecondary';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function Modal({
  type = "해가 떴어요",
  style,
  className
}) {
  if (type === "해가 떴어요") return <div data-figma="type=해가 떴어요" data-node="1204:89547" className={cx("flex w-[326px] [padding:var(--spacing-21,_36px)_var(--spacing-17,_24px)_var(--spacing-19,_28px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"510\" viewBox=\"0 0 326 510\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"510\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1204_89547\"><rect width=\"326\" height=\"510\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1204_89547)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 486 L326 486 L327 486 L327 24 L326 24 Z M302 510 L302 509 L24 509 L24 510 L24 511 L302 511 L302 510 Z M0 486 L1 486 L1 24 L0 24 L-1 24 L-1 486 L0 486 Z M24 510 L24 509 C11.2974 509 1 498.703 1 486 L0 486 L-1 486 C-1 499.807 10.1929 511 24 511 L24 510 Z M326 486 L325 486 C325 498.703 314.703 509 302 509 L302 510 L302 511 C315.807 511 327 499.807 327 486 L326 486 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1204:89531" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[140px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"아침이 밝아\n대화가 종료되었어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89531"]
      }} /></p>
      <div data-figma="gap 8" data-node="1204:89532" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1204:89533" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[171px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"종료된 대화는 안전하게 사라졌어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89533"]
      }} /></p>
      <div data-figma="gap 32" data-node="1204:89534" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Tips" data-node="1204:89535" className="flex [padding:var(--spacing-3,_4px)_var(--spacing-9,_10px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-18xl,_99px)] [background:var(--text-primary-8,_rgba(248,_248,_248,_0.08))] shrink-0">
        <p data-figma="Tips" data-node="1204:89536" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[22px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[-0.24px]">{"Tips"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:89536"]
        }} /></p>
      </div>
      <div data-figma="gap 12" data-node="1204:89537" className="w-[1px] h-[12px] shrink-0 overflow-hidden" />
      <p data-figma="tips1" data-node="1204:89538" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[195px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[-0.3px]">{"특별히 위로가 된 의자가 있었나요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89538"]
      }} /></p>
      <div data-figma="gap 6" data-node="1204:89539" className="w-[1px] h-[6px] shrink-0 overflow-hidden" />
      <p data-figma="tips2" data-node="1204:89540" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[200px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"추천하면 다음엔 더 잘 맞는 방을 찾아줘요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89540"]
      }} /></p>
      <div data-figma="gap 20" data-node="1204:89541" className="w-[1px] h-[20px] shrink-0 overflow-hidden" />
      <RecommendRow data-figma="추천 줄" className="flex [justify-content:center] [align-items:flex-start] [gap:var(--spacing-5,_6px)] shrink-0" type={"default"} />
      <div data-figma="gap 32" data-node="1204:89543" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1204:89544" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)] shrink-0">
        <p data-figma="버튼" data-node="I1204:89544;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[94px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"라운지 구경 가기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:89544;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1204:89545" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1204:89546" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[34px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"홈으로"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89546"]
      }} /></p>
    </div>;
  if (type === "해가 떴어요 326") return <div data-figma="type=해가 떴어요 326" data-node="1204:89565" className={cx("flex w-[326px] [padding:var(--spacing-21,_36px)_var(--spacing-17,_24px)_var(--spacing-19,_28px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"510\" viewBox=\"0 0 326 510\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"510\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1204_89565\"><rect width=\"326\" height=\"510\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1204_89565)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 486 L326 486 L327 486 L327 24 L326 24 Z M302 510 L302 509 L24 509 L24 510 L24 511 L302 511 L302 510 Z M0 486 L1 486 L1 24 L0 24 L-1 24 L-1 486 L0 486 Z M24 510 L24 509 C11.2974 509 1 498.703 1 486 L0 486 L-1 486 C-1 499.807 10.1929 511 24 511 L24 510 Z M326 486 L325 486 C325 498.703 314.703 509 302 509 L302 510 L302 511 C315.807 511 327 499.807 327 486 L326 486 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1204:89549" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[140px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"아침이 밝아\n대화가 종료되었어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89549"]
      }} /></p>
      <div data-figma="gap 8" data-node="1204:89550" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1204:89551" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[171px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"종료된 대화는 안전하게 사라졌어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89551"]
      }} /></p>
      <div data-figma="gap 32" data-node="1204:89552" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Tips" data-node="1204:89553" className="flex [padding:var(--spacing-3,_4px)_var(--spacing-9,_10px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-18xl,_99px)] [background:var(--text-primary-8,_rgba(248,_248,_248,_0.08))] shrink-0">
        <p data-figma="Tips" data-node="1204:89554" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[22px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[-0.24px]">{"Tips"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:89554"]
        }} /></p>
      </div>
      <div data-figma="gap 12" data-node="1204:89555" className="w-[1px] h-[12px] shrink-0 overflow-hidden" />
      <p data-figma="tips1" data-node="1204:89556" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[195px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[-0.3px]">{"특별히 위로가 된 의자가 있었나요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89556"]
      }} /></p>
      <div data-figma="gap 6" data-node="1204:89557" className="w-[1px] h-[6px] shrink-0 overflow-hidden" />
      <p data-figma="tips2" data-node="1204:89558" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[200px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"추천하면 다음엔 더 잘 맞는 방을 찾아줘요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89558"]
      }} /></p>
      <div data-figma="gap 20" data-node="1204:89559" className="w-[1px] h-[20px] shrink-0 overflow-hidden" />
      <RecommendRow data-figma="추천 줄" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] shrink-0" type={"종류 2"} />
      <div data-figma="gap 32" data-node="1204:89561" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1204:89562" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)] shrink-0">
        <p data-figma="버튼" data-node="I1204:89562;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[94px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"라운지 구경 가기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:89562;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1204:89563" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1204:89564" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[34px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"홈으로"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89564"]
      }} /></p>
    </div>;
  if (type === "수정본") return <div data-figma="type=수정본" data-node="1299:20962" className={cx("flex w-[326px] [padding:36px_24px_28px_24px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"539\" viewBox=\"0 0 326 539\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"539\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_20962\"><rect width=\"326\" height=\"539\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1299_20962)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 515 L326 515 L327 515 L327 24 L326 24 Z M302 539 L302 538 L24 538 L24 539 L24 540 L302 540 L302 539 Z M0 515 L1 515 L1 24 L0 24 L-1 24 L-1 515 L0 515 Z M24 539 L24 538 C11.2974 538 1 527.703 1 515 L0 515 L-1 515 C-1 528.807 10.1929 540 24 540 L24 539 Z M326 515 L325 515 C325 527.703 314.703 538 302 538 L302 539 L302 540 C315.807 540 327 528.807 327 515 L326 515 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2974 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1299:20944" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[140px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"아침이 밝아\n대화가 종료되었어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20944"]
      }} /></p>
      <div data-figma="gap 8" data-node="1299:20945" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1299:20946" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[171px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"종료된 대화는 안전하게 사라졌어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20946"]
      }} /></p>
      <div data-figma="gap 32" data-node="1299:20947" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Tips" data-node="1299:20948" className="flex [padding:4px_10px] [justify-content:center] [align-items:center] [border-radius:99px] [background:var(--text-primary-8,_rgba(248,_248,_248,_0.08))] shrink-0">
        <p data-figma="Tips" data-node="1299:20949" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[22px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[-0.24px]">{"Tips"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1299:20949"]
        }} /></p>
      </div>
      <div data-figma="gap 12" data-node="1299:20950" className="w-[1px] h-[12px] shrink-0 overflow-hidden" />
      <p data-figma="tips1" data-node="1299:20951" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[195px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[-0.3px]">{"특별히 위로가 된 의자가 있었나요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20951"]
      }} /></p>
      <div data-figma="gap 6" data-node="1299:20952" className="w-[1px] h-[6px] shrink-0 overflow-hidden" />
      <p data-figma="tips2" data-node="1299:20953" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[200px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"추천하면 다음엔 더 잘 맞는 방을 찾아줘요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20953"]
      }} /></p>
      <div data-figma="gap 20" data-node="1299:20954" className="w-[1px] h-[20px] shrink-0 overflow-hidden" />
      <div data-figma="추천 줄" data-node="1299:20955" data-instance-of="추천 줄" className="flex [justify-content:center] [align-items:flex-start] [gap:var(--spacing-5,_6px)] shrink-0">
        <div data-figma="arrow" data-node="I1299:20955;1204:89046" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
          <div data-figma="Icon / Line" data-node="I1299:20955;1204:89047" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 [opacity:0.3] absolute left-[0px] top-[24px]">
            <Icon data-figma="chevron-left" data-node="I1299:20955;1204:89047;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
        </div>
        <div data-figma="cells" data-node="I1299:20955;1204:89048" data-instance-of="cells" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0">
          <ChairCell data-figma="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0" type={"box"} />
          <div data-figma="의자 셀" data-node="I1299:20955;1204:89048;1204:87814" data-instance-of="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0">
            <div data-figma="face" data-node="I1299:20955;1204:89048;1204:87814;1204:86736" className="w-[72px] h-[72px] [fill:var(--bg-elevated,_#222628)] [border-radius:999px] shrink-0 overflow-hidden" />
            <p data-figma="name" data-node="I1299:20955;1204:89048;1204:87814;1204:86738" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[58px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"따뜻한\n가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:20955;1204:89048;1204:87814;1204:86738"]
            }} /></p>
          </div>
          <ChairCell data-figma="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0" type={"stool"} />
        </div>
        <div data-figma="arrow" data-node="I1299:20955;1204:89049" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
          <div data-figma="Icon / Line" data-node="I1299:20955;1204:89050" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[24px]">
            <Icon data-figma="chevron-right" data-node="I1299:20955;1204:89050;1299:25589" name="chevron-right" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
        </div>
      </div>
      <div data-figma="gap 32" data-node="1299:20956" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1299:20957" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--bg-elevated,_#222628)] shrink-0">
        <p data-figma="버튼" data-node="I1299:20957;3004:1215" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"투표하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:20957;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1299:20958" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1299:20959" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20959"]
      }} /></p>
      <div data-figma="아래 줄" data-node="1299:20960" className="flex w-[326px] h-[29px] [padding-top:23px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Dots data-figma="dots" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[149px] top-[23px] w-[28px] h-[6px] overflow-hidden" type={"종류 5"} />
      </div>
    </div>;
  if (type === "수정본 2") return <div data-figma="type=수정본 2" data-node="1299:20982" className={cx("flex w-[326px] [padding:36px_24px_28px_24px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"539\" viewBox=\"0 0 326 539\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"539\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_20982\"><rect width=\"326\" height=\"539\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1299_20982)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 515 L326 515 L327 515 L327 24 L326 24 Z M302 539 L302 538 L24 538 L24 539 L24 540 L302 540 L302 539 Z M0 515 L1 515 L1 24 L0 24 L-1 24 L-1 515 L0 515 Z M24 539 L24 538 C11.2974 538 1 527.703 1 515 L0 515 L-1 515 C-1 528.807 10.1929 540 24 540 L24 539 Z M326 515 L325 515 C325 527.703 314.703 538 302 538 L302 539 L302 540 C315.807 540 327 528.807 327 515 L326 515 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2974 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1299:20964" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[140px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"아침이 밝아\n대화가 종료되었어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20964"]
      }} /></p>
      <div data-figma="gap 8" data-node="1299:20965" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1299:20966" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[171px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"종료된 대화는 안전하게 사라졌어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20966"]
      }} /></p>
      <div data-figma="gap 32" data-node="1299:20967" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Tips" data-node="1299:20968" className="flex [padding:4px_10px] [justify-content:center] [align-items:center] [border-radius:99px] [background:var(--text-primary-8,_rgba(248,_248,_248,_0.08))] shrink-0">
        <p data-figma="Tips" data-node="1299:20969" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[22px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[-0.24px]">{"Tips"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1299:20969"]
        }} /></p>
      </div>
      <div data-figma="gap 12" data-node="1299:20970" className="w-[1px] h-[12px] shrink-0 overflow-hidden" />
      <p data-figma="tips1" data-node="1299:20971" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[195px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[-0.3px]">{"특별히 위로가 된 의자가 있었나요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20971"]
      }} /></p>
      <div data-figma="gap 6" data-node="1299:20972" className="w-[1px] h-[6px] shrink-0 overflow-hidden" />
      <p data-figma="tips2" data-node="1299:20973" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[200px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"추천하면 다음엔 더 잘 맞는 방을 찾아줘요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20973"]
      }} /></p>
      <div data-figma="gap 20" data-node="1299:20974" className="w-[1px] h-[20px] shrink-0 overflow-hidden" />
      <RecommendRow data-figma="추천 줄" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] shrink-0" type={"종류 2"} />
      <div data-figma="gap 32" data-node="1299:20976" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1299:20977" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)] shrink-0">
        <p data-figma="버튼" data-node="I1299:20977;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"투표하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:20977;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1299:20978" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1299:20979" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20979"]
      }} /></p>
      <div data-figma="아래 줄" data-node="1299:20980" className="flex w-[326px] h-[29px] [padding-top:23px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Dots data-figma="dots" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[149px] top-[23px] w-[28px] h-[6px] overflow-hidden" type={"종류 5"} />
      </div>
    </div>;
  if (type === "수정본 3") return <div data-figma="type=수정본 3" data-node="1299:20998" className={cx("flex w-[326px] [padding:36px_24px_28px_24px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"473.32\" viewBox=\"0 0 326 473.32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"473.32\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_20998\"><rect width=\"326\" height=\"473.32\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1299_20998)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 449.319 L326 449.319 L327 449.319 L327 24 L326 24 Z M302 473.319 L302 472.319 L24 472.319 L24 473.319 L24 474.319 L302 474.319 L302 473.319 Z M0 449.319 L1 449.319 L1 24 L0 24 L-1 24 L-1 449.319 L0 449.319 Z M24 473.319 L24 472.319 C11.2974 472.319 1 462.021 1 449.319 L0 449.319 L-1 449.319 C-1 463.126 10.1929 474.319 24 474.319 L24 473.319 Z M326 449.319 L325 449.319 C325 462.021 314.703 472.319 302 472.319 L302 473.319 L302 474.319 C315.807 474.319 327 463.126 327 449.319 L326 449.319 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1299:20984" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[149px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"오늘 나눈 고민을\n커뮤니티에 올릴까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20984"]
      }} /></p>
      <div data-figma="gap 8" data-node="1299:20985" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1299:20986" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[249px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"라이브 대화는 종료 되었지만,\n내 고민에 대한 여러 사람들이 의견을 들을 수 있어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20986"]
      }} /></p>
      <div data-figma="gap 32" data-node="1299:20987" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="고민 주제" data-node="1299:20988" data-instance-of="고민 주제" className="flex w-[284.91px] [padding:11.66px_13.33px_10px_13.33px] [flex-direction:column] [align-items:flex-start] gap-[10px] [border-radius:15px] shrink-0 h-[134.32px] relative [isolation:isolate]">
        <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"284.91\" height=\"134.32\" viewBox=\"0 0 284.91 134.32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"284.91\" height=\"134.32\" rx=\"14.995475769042969\" style=\"fill:var(--bg-elevated, #222628)\"/></svg>"
      }} />
        <div data-figma="top" data-node="I1299:20988;56:386" className="flex [justify-content:space-between] [align-items:center] [align-self:stretch] shrink-0 w-[258.26px] h-[15px] overflow-hidden">
          <div data-figma="Frame" data-node="I1299:20988;56:387" className="flex [align-items:center] gap-[6.66px] shrink-0 w-[199.66px] h-[15px] overflow-hidden">
            <p data-figma="고민" data-node="I1299:20988;56:388" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:700] [line-height:14px] [letter-spacing:-0.367px] shrink-0 w-[149px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.336px] left-[0px]">{"둘이 찍은 사진인데 지만 보정해서 올린 여우"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:20988;56:388"]
            }} /></p>
            <p data-figma="새벽2시 택배상자님의 고민" data-node="I1299:20988;56:389" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:10px] [font-style:normal] [font-weight:500] [line-height:15px] [letter-spacing:-0.4px] shrink-0 w-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.139px] left-[0px]">{"익명의 고민"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:20988;56:389"]
            }} /></p>
          </div>
        </div>
        <p data-figma="단체 사진에 나만 쏙 빼고 보정한 애 어떻게 생각함? 다섯 명이 같이 찍었는데 걔가 인스타에 올리면서 나만 보정 안 해줌. 이거 일부러야, 내가 예민한 거야?" data-node="I1299:20988;56:391" data-outline="" className="[align-self:stretch] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12.5px] [font-style:normal] [font-weight:500] [line-height:19px] [letter-spacing:-0.5px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.049px] left-[0px]">{"단체 사진에 나만 쏙 빼고 보정한 애 어떻게 생각함? 다섯\n명이 같이 찍었는데 걔가 인스타에 올리면서 나만 보정\n안 해줌. 이거 일부러야, 내가 예민한 거야?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:20988;56:391"]
        }} /></p>
        <div data-figma="AI 맥락" data-node="I1299:20988;56:392" className="flex [align-items:center] gap-[5px] shrink-0 w-[203.99px] h-[20.66px] overflow-hidden">
          <p data-figma="AI가 읽은 맥락" data-node="I1299:20988;56:393" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:500] [line-height:14px] [letter-spacing:-0.367px] shrink-0 w-[51px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.336px] left-[0px]">{"AI가 읽은 맥락"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20988;56:393"]
          }} /></p>
          <div data-figma="Frame" data-node="I1299:20988;56:394" className="flex [padding:3.33px_7.5px_3.33px_7.5px] [align-items:flex-start] gap-[5px] [border-radius:9.16px] shrink-0 w-[80px] h-[20.66px] overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"80\" height=\"20.66\" viewBox=\"0 0 80 20.66\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"80\" height=\"20.66\" rx=\"9.163901329040527\" style=\"fill:var(--brand-subtle, #06303C)\"/></svg>"
          }} />
            <p data-figma="#친구 사이 서운함" data-node="I1299:20988;56:395" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:700] [line-height:14px] [letter-spacing:-0.367px] shrink-0 w-[65px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.336px] left-[0px]">{"#친구 사이 서운함"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:20988;56:395"]
            }} /></p>
          </div>
          <div data-figma="Frame" data-node="I1299:20988;56:396" className="flex [padding:3.33px_7.5px_3.33px_7.5px] [align-items:flex-start] gap-[5px] [border-radius:9.16px] shrink-0 w-[63px] h-[20.66px] overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"63\" height=\"20.66\" viewBox=\"0 0 63 20.66\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"63\" height=\"20.66\" rx=\"9.163901329040527\" style=\"fill:var(--brand-subtle, #06303C)\"/></svg>"
          }} />
            <p data-figma="#배려의 차이" data-node="I1299:20988;56:397" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:700] [line-height:14px] [letter-spacing:-0.367px] shrink-0 w-[48px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.336px] left-[0px]">{"#배려의 차이"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:20988;56:397"]
            }} /></p>
          </div>
        </div>
      </div>
      <div data-figma="gap 33" data-node="1299:20989" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1299:20990" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] gap-[6px] [border-radius:26px] shrink-0 relative [isolation:isolate]">
        <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"278\" height=\"52\" viewBox=\"0 0 278 52\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"278\" height=\"52\" rx=\"26\" style=\"fill:var(--brand-primary, #36D2FF)\"/></svg>"
      }} />
        <p data-figma="버튼" data-node="I1299:20990;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.3px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[135px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"커뮤니티에 고민 올리기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:20990;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1299:20991" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1299:20992" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[93px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"올리지 않고 홈으로"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20992"]
      }} /></p>
      <div data-figma="아래 줄" data-node="1299:20993" className="flex w-[326px] h-[29px] [padding-top:23px] [justify-content:center] [align-items:center] shrink-0 relative">
        <div data-figma="dots" data-node="1299:20994" className="flex [justify-content:center] [align-items:center] gap-[6px] absolute left-[149px] top-[23px] w-[28px] h-[6px] overflow-hidden">
          <div data-figma="dot" data-node="1299:20995" className="w-[6px] h-[6px] [border-radius:3px] shrink-0 relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"6\" height=\"6\" viewBox=\"0 0 6 6\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"6\" height=\"6\" rx=\"3\" style=\"fill:var(--text-secondary-40, #9AA1A666)\"/></svg>"
          }} />

          </div>
          <div data-figma="dot / now" data-node="1299:20996" className="w-[16px] h-[6px] [border-radius:3px] shrink-0 relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"16\" height=\"6\" viewBox=\"0 0 16 6\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"16\" height=\"6\" rx=\"3\" style=\"fill:var(--brand-primary, #36D2FF)\"/></svg>"
          }} />

          </div>
        </div>
      </div>
      <div data-figma="Icon / Line" data-node="1299:20997" data-instance-of="Icon / Line" className="flex w-[16px] h-[16px] [justify-content:center] [align-items:center] absolute right-[34px] top-[174.16px] left-[276px]">
        <Icon data-figma="pencil" data-node="I1299:20997;1299:30796" name="pencil" color="var(--brand-primary, #36D2FF)" className="w-[16px] h-[16px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  if (type === "모달 차단 확인") return <div data-figma="type=모달 차단 확인" data-node="1204:86848" className={cx("flex w-[326px] [padding:var(--spacing-19,_28px)_var(--spacing-17,_24px)_var(--spacing-17,_24px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] [border-radius:var(--radius-11xl,_24px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"481\" viewBox=\"0 0 326 481\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"481\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1204_86848\"><rect width=\"326\" height=\"481\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1204_86848)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 457 L326 457 L327 457 L327 24 L326 24 Z M302 481 L302 480 L24 480 L24 481 L24 482 L302 482 L302 481 Z M0 457 L1 457 L1 24 L0 24 L-1 24 L-1 457 L0 457 Z M24 481 L24 480 C11.2974 480 1 469.703 1 457 L0 457 L-1 457 C-1 470.807 10.1929 482 24 482 L24 481 Z M326 457 L325 457 C325 469.703 314.703 480 302 480 L302 481 L302 482 C315.807 482 327 470.807 327 457 L326 457 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <div data-figma="Frame" data-node="1204:86839" className="flex w-[56px] h-[56px] [padding:12px] [justify-content:center] [align-items:center] [border-radius:var(--radius-13xl,_28px)] [background:var(--brand-subtle,_#06303C)] shrink-0 relative overflow-hidden">
        <div data-figma="home-chair" data-node="1204:86840" data-instance-of="Icon / Line" className="flex w-[32px] h-[32px] [justify-content:center] [align-items:center] shrink-0 [aspect-ratio:1/1] absolute left-[12px] top-[12px]">
          <Icon data-figma="home-chair" data-node="I1204:86840;1299:30466" name="home-chair-1463-24062" color="var(--brand-primary, #36D2FF)" className="w-[32px] h-[32px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="비슷한 고민의 사람들을 발견했어요!" data-node="1204:86841" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[158px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"비슷한 고민의 사람들을\n발견했어요!"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86841"]
      }} /></p>
      <div data-figma="Frame" data-node="1204:86842" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
        <p data-figma="지금 바로 함께 앉아서 이야기 할까요?" data-node="1204:86843" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[183px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"지금 바로 함께 앉아서 이야기 할까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86843"]
        }} /></p>
      </div>
      <CarouselCard data-figma="Carousel Card" className="w-[276px] h-[187px] shrink-0 relative overflow-hidden" type={"2 276"} />
      <div data-figma="Frame" data-node="1204:86845" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Button / Secondary" data-node="1204:86846" data-instance-of="Button / Secondary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--bg-elevated,_#222628)]">
          <p data-figma="버튼" data-node="I1204:86846;3004:1217" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[107px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"이어서 혼자 드르륵"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:86846;3004:1217"]
          }} /></p>
        </div>
        <div data-figma="Button / Danger" data-node="1204:86847" data-instance-of="Button / Danger" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)]">
          <p data-figma="버튼" data-node="I1204:86847;3004:1219" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[94px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"함께 드르륵 앉기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:86847;3004:1219"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "모달 새 의자 획득") return <div data-figma="type=모달 새 의자 획득" data-node="1204:86865" className={cx("flex w-[326px] [padding:var(--spacing-19,_28px)_var(--spacing-17,_24px)_var(--spacing-16,_22px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-12,_14px)] [border-radius:var(--radius-13xl,_28px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Frame" data-node="1204:86850" className="flex [padding:var(--spacing-3,_4px)_var(--spacing-9,_10px)] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [border-radius:var(--radius-full,_999px)] [background:var(--accent-orange-18,_rgba(255,_154,_77,_0.18))] shrink-0 overflow-hidden">
        <p data-figma="엉따 39.0° 달성" data-node="1204:86851" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[74px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"엉따 39.0° 달성"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86851"]
        }} /></p>
      </div>
      <div data-figma="stage" data-node="1204:86852" className="w-[200px] h-[170px] shrink-0 relative overflow-hidden">
        <span data-figma="glow" data-node="1204:86853" className="w-[200px] h-[170px] absolute left-[0px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86853"]
      }} />
        <div data-figma="Chair Illustration" data-node="1204:86854" data-instance-of="Chair Illustration" className="flex w-[170px] h-[170px] [justify-content:center] [align-items:center] absolute left-[15px] top-[0px]">
          <div data-figma="image 1208091458" data-node="I1204:86854;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.png\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[170px] h-[170px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
          "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.png) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <p data-figma="새 의자를 얻었어요!" data-node="1204:86855" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] shrink-0 w-[148px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.28px] left-[0px]">{"새 의자를 얻었어요!"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86855"]
      }} /></p>
      <p data-figma="엉따가 따뜻해져서 ‘푹신한 가죽 소파’에 앉을 수 있게 됐어요" data-node="1204:86856" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:400] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[205px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[-0.28px]">{"엉따가 따뜻해져서 ‘푹신한 가죽 소파’에\n앉을 수 있게 됐어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86856"]
      }} /></p>
      <div data-figma="포함된 색" data-node="1204:86857" className="flex [padding:var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Chair Illustration" data-node="1204:86858" data-instance-of="Chair Illustration" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 relative">
          <div data-figma="image 1208091458" data-node="I1204:86858;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.png\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[36px] h-[36px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
          "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.png) 50% / cover no-repeat"
        }} />
        </div>
        <div data-figma="Chair Illustration" data-node="1204:86859" data-instance-of="Chair Illustration" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 relative">
          <div data-figma="sofa-1" data-node="I1204:86859;1204:89709" data-img={"{\"src\":\"./assets/images/6e90eda49e343eb6829327dd7e13087ab82f8cc4.png\",\"mode\":\"FIT\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[36px] h-[36px] shrink-0 absolute left-[0px] top-[0px]" style={{
          "background": "url(./assets/images/6e90eda49e343eb6829327dd7e13087ab82f8cc4.png) 50% / contain no-repeat"
        }} />
        </div>
        <div data-figma="Chair Illustration" data-node="1204:86860" data-instance-of="Chair Illustration" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 relative">
          <div data-figma="image 1208091458" data-node="I1204:86860;1204:89711" data-img={"{\"src\":\"./assets/images/66dbe89daeb432881bb2caf2cfd9e219ed206076.png\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[36px] h-[36px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
          "background": "url(./assets/images/66dbe89daeb432881bb2caf2cfd9e219ed206076.png) 50% / cover no-repeat"
        }} />
        </div>
        <p data-figma="색상 3종 포함" data-node="1204:86861" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[62px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"색상 3종 포함"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86861"]
        }} /></p>
      </div>
      <div data-figma="Frame" data-node="1204:86862" className="w-[10px] h-[4px] shrink-0 overflow-hidden" />
      <CTA data-figma="CTA" className="flex h-[52px] [justify-content:center] [align-items:center] [align-self:stretch] shrink-0 overflow-hidden" type={"지금 앉아보기"} />
      <p data-figma="나중에 할게요" data-node="1204:86864" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[69px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"나중에 할게요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86864"]
      }} /></p>
    </div>;
  if (type === "모달 차단 확인 326") return <div data-figma="type=모달 차단 확인 326" data-node="1204:86891" className={cx("flex w-[326px] [padding:var(--spacing-19,_28px)_var(--spacing-17,_24px)_var(--spacing-17,_24px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] [border-radius:var(--radius-11xl,_24px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"420\" viewBox=\"0 0 326 420\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"420\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1204_86891\"><rect width=\"326\" height=\"420\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1204_86891)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 396 L326 396 L327 396 L327 24 L326 24 Z M302 420 L302 419 L24 419 L24 420 L24 421 L302 421 L302 420 Z M0 396 L1 396 L1 24 L0 24 L-1 24 L-1 396 L0 396 Z M24 420 L24 419 C11.2974 419 1 408.703 1 396 L0 396 L-1 396 C-1 409.807 10.1929 421 24 421 L24 420 Z M326 396 L325 396 C325 408.703 314.703 419 302 419 L302 420 L302 421 C315.807 421 327 409.807 327 396 L326 396 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <div data-figma="Frame" data-node="1204:86867" className="flex w-[56px] h-[56px] [padding:15px] [justify-content:center] [align-items:center] [border-radius:var(--radius-13xl,_28px)] [background:var(--accent-red-15,_rgba(255,_90,_95,_0.15))] shrink-0 relative overflow-hidden">
        <Icon data-figma="Icon / 기타" data-node="1204:86868" name="기타-ban-26" color="var(--accent-red, #FF5A5F)" className="w-[26px] h-[26px] shrink-0 absolute left-[15px] top-[15px]" />
      </div>
      <p data-figma="따뜻한 가죽소파29님을 차단할까요?" data-node="1204:86869" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[160px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"따뜻한 가죽소파29님을\n차단할까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:86869"]
      }} /></p>
      <div data-figma="Frame" data-node="1204:86870" className="flex [padding:var(--spacing-12,_14px)_var(--spacing-13,_16px)] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-7,_8px)] [align-self:stretch] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:86871" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
          <div data-figma="icon/check" data-node="1405:44702" data-instance-of="Icon / Line" className="flex w-[14px] h-[14px] [justify-content:center] [align-items:center] shrink-0 relative">
            <Icon data-figma="check" data-node="I1405:44702;1299:25635" name="check" color="var(--text-primary, #F8F8F8)" strokeScale={1.1429} className="w-[14px] h-[14px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
          <p data-figma="지금 바로 서로의 목소리와 채팅이 끊겨요" data-node="1204:86874" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[198px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"지금 바로 서로의 목소리와 채팅이 끊겨요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:86874"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:86875" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
          <div data-figma="icon/check" data-node="1405:44705" data-instance-of="Icon / Line" className="flex w-[14px] h-[14px] [justify-content:center] [align-items:center] shrink-0 relative">
            <Icon data-figma="check" data-node="I1405:44705;1299:25635" name="check" color="var(--text-primary, #F8F8F8)" strokeScale={1.1429} className="w-[14px] h-[14px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
          <p data-figma="앞으로 같은 방에 매칭되지 않아요" data-node="1204:86878" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[163px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"앞으로 같은 방에 매칭되지 않아요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:86878"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:86879" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
          <div data-figma="icon/check" data-node="1405:44708" data-instance-of="Icon / Line" className="flex w-[14px] h-[14px] [justify-content:center] [align-items:center] shrink-0 relative">
            <Icon data-figma="check" data-node="I1405:44708;1299:25635" name="check" color="var(--text-primary, #F8F8F8)" strokeScale={1.1429} className="w-[14px] h-[14px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
          <p data-figma="나는 이 방에 계속 남아 있어요" data-node="1204:86882" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[144px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"나는 이 방에 계속 남아 있어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:86882"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:86883" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
          <div data-figma="icon/check" data-node="1405:44711" data-instance-of="Icon / Line" className="flex w-[14px] h-[14px] [justify-content:center] [align-items:center] shrink-0 relative">
            <Icon data-figma="check" data-node="I1405:44711;1299:25635" name="check" color="var(--text-primary, #F8F8F8)" strokeScale={1.1429} className="w-[14px] h-[14px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
          <span data-figma="MY › 설정 › 차단 목록에서 풀 수 있어요" data-node="1204:86886" role="img" aria-label="MY › 설정 › 차단 목록에서 풀 수 있어요" className="relative shrink-0 w-[188px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 h-[18px] [line-height:0] block" dangerouslySetInnerHTML={{
          __html: svg["1204:86886"]
        }} />
        </div>
      </div>
      <Checkbox data-figma="checkbox" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden" type={"종류 2"} />
      <div data-figma="Frame" data-node="1204:86888" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] [align-self:stretch] shrink-0 overflow-hidden">
        <ButtonSecondary data-figma="Button / Secondary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0]" label={"취소"} labelWidth={26} labelSvg={"I1204:86889;3004:1217"} icon={"false"} />
        <div data-figma="Button / Danger" data-node="1204:86890" data-instance-of="Button / Danger" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--accent-red,_#FF5A5F)]">
          <p data-figma="버튼" data-node="I1204:86890;3004:1219" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"차단하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:86890;3004:1219"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "모달 수정본 2") return <div data-figma="type=모달 수정본 2" data-node="1299:20706" className={cx("flex w-[326px] [padding:28px_24px_24px_24px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[16px] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"481\" viewBox=\"0 0 326 481\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"481\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_20706\"><rect width=\"326\" height=\"481\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1299_20706)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 457 L326 457 L327 457 L327 24 L326 24 Z M302 481 L302 480 L24 480 L24 481 L24 482 L302 482 L302 481 Z M0 457 L1 457 L1 24 L0 24 L-1 24 L-1 457 L0 457 Z M24 481 L24 480 C11.2974 480 1 469.703 1 457 L0 457 L-1 457 C-1 470.807 10.1929 482 24 482 L24 481 Z M326 457 L325 457 C325 469.703 314.703 480 302 480 L302 481 L302 482 C315.807 482 327 470.807 327 457 L326 457 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <div data-figma="Frame" data-node="1299:20697" className="flex w-[56px] h-[56px] [padding:12px] [justify-content:center] [align-items:center] [border-radius:28px] [background:var(--brand-subtle,_#06303C)] shrink-0 relative overflow-hidden">
        <div data-figma="home-chair" data-node="1299:20698" data-instance-of="Icon / Line" className="flex w-[32px] h-[32px] [justify-content:center] [align-items:center] shrink-0 [aspect-ratio:1/1] absolute left-[12px] top-[12px]">
          <Icon data-figma="home-chair" data-node="I1299:20698;1299:25487" name="home-chair-1463-24062" color="var(--text-primary, #F8F8F8)" className="w-[32px] h-[32px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="비슷한 고민의 사람들을 발견했어요!" data-node="1299:20699" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[158px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"비슷한 고민의 사람들을\n발견했어요!"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20699"]
      }} /></p>
      <div data-figma="Frame" data-node="1299:20700" className="flex [justify-content:center] [align-items:center] gap-[8px] shrink-0 overflow-hidden">
        <p data-figma="지금 바로 함께 앉아서 이야기 할까요?" data-node="1299:20701" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[183px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"지금 바로 함께 앉아서 이야기 할까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1299:20701"]
        }} /></p>
      </div>
      <CarouselCard data-figma="Carousel / 2" className="w-[276px] h-[187px] shrink-0 relative overflow-hidden" type={"수정본 4"} />
      <div data-figma="Frame" data-node="1299:20703" className="flex [justify-content:center] [align-items:center] gap-[10px] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Button / Secondary" data-node="1299:20704" data-instance-of="Button / Secondary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--bg-elevated,_#222628)]">
          <p data-figma="버튼" data-node="I1299:20704;3004:1217" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[107px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"이어서 혼자 드르륵"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20704;3004:1217"]
          }} /></p>
        </div>
        <div data-figma="Button / Danger" data-node="1299:20705" data-instance-of="Button / Danger" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)]">
          <p data-figma="버튼" data-node="I1299:20705;3004:1219" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[94px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"함께 드르륵 앉기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20705;3004:1219"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "수정본 6") return <div data-figma="type=수정본 6" data-node="1299:31432" className={cx("flex w-[326px] [padding:36px_24px_28px_24px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"307\" viewBox=\"0 0 326 307\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"307\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_31432\"><rect width=\"326\" height=\"307\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1299_31432)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 283 L326 283 L327 283 L327 24 L326 24 Z M302 307 L302 306 L24 306 L24 307 L24 308 L302 308 L302 307 Z M0 283 L1 283 L1 24 L0 24 L-1 24 L-1 283 L0 283 Z M24 307 L24 306 C11.2974 306 1 295.703 1 283 L0 283 L-1 283 C-1 296.807 10.1929 308 24 308 L24 307 Z M326 283 L325 283 C325 295.703 314.703 306 302 306 L302 307 L302 308 C315.807 308 327 296.807 327 283 L326 283 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1299:31422" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[149px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"오늘 나눈 고민을\n커뮤니티에 올릴까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:31422"]
      }} /></p>
      <div data-figma="gap 8" data-node="1299:31423" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1299:31424" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[249px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"라이브 대화는 종료 되었지만,\n내 고민에 대한 여러 사람들이 의견을 들을 수 있어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:31424"]
      }} /></p>
      <div data-figma="gap 32" data-node="1299:31425" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1299:31426" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)] shrink-0">
        <p data-figma="버튼" data-node="I1299:31426;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[132px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"커뮤니티에 고민 올리기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:31426;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1299:31427" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1299:31428" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[93px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"올리지 않고 홈으로"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:31428"]
      }} /></p>
      <div data-figma="아래 줄" data-node="1299:31429" className="flex w-[326px] h-[29px] [padding-top:23px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Dots data-figma="dots" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[149px] top-[23px] w-[28px] h-[6px] overflow-hidden" type={"종류 6"} />
      </div>
      <div data-figma="Icon / Line" data-node="1299:31431" data-instance-of="Icon / Line" className="flex w-[16px] h-[16px] [justify-content:center] [align-items:center] absolute right-[34px] bottom-[116.84px] left-[276px] top-[174.16px]">
        <Icon data-figma="pencil" data-node="I1299:31431;1299:25707" name="pencil" color="var(--bg-base, #000000)" className="w-[16px] h-[16px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  if (type === "수정본 4") return <div data-figma="type=수정본 4" data-node="1299:36271" className={cx("flex w-[326px] [padding:36px_24px_28px_24px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"539\" viewBox=\"0 0 326 539\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"539\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_36271\"><rect width=\"326\" height=\"539\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1299_36271)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 515 L326 515 L327 515 L327 24 L326 24 Z M302 539 L302 538 L24 538 L24 539 L24 540 L302 540 L302 539 Z M0 515 L1 515 L1 24 L0 24 L-1 24 L-1 515 L0 515 Z M24 539 L24 538 C11.2974 538 1 527.703 1 515 L0 515 L-1 515 C-1 528.807 10.1929 540 24 540 L24 539 Z M326 515 L325 515 C325 527.703 314.703 538 302 538 L302 539 L302 540 C315.807 540 327 528.807 327 515 L326 515 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2974 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1299:36234" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[140px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"아침이 밝아\n대화가 종료되었어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36234"]
      }} /></p>
      <div data-figma="gap 8" data-node="1299:36235" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1299:36236" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[171px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"종료된 대화는 안전하게 사라졌어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36236"]
      }} /></p>
      <div data-figma="gap 32" data-node="1299:36237" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Tips" data-node="1299:36238" className="flex [padding:4px_10px] [justify-content:center] [align-items:center] [border-radius:99px] [background:var(--text-primary-8,_rgba(248,_248,_248,_0.08))] shrink-0">
        <p data-figma="Tips" data-node="1299:36239" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[22px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[-0.24px]">{"Tips"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1299:36239"]
        }} /></p>
      </div>
      <div data-figma="gap 12" data-node="1299:36240" className="w-[1px] h-[12px] shrink-0 overflow-hidden" />
      <p data-figma="tips1" data-node="1299:36241" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[195px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[-0.3px]">{"특별히 위로가 된 의자가 있었나요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36241"]
      }} /></p>
      <div data-figma="gap 6" data-node="1299:36242" className="w-[1px] h-[6px] shrink-0 overflow-hidden" />
      <p data-figma="tips2" data-node="1299:36243" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[200px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"추천하면 다음엔 더 잘 맞는 방을 찾아줘요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36243"]
      }} /></p>
      <div data-figma="gap 20" data-node="1299:36244" className="w-[1px] h-[20px] shrink-0 overflow-hidden" />
      <div data-figma="추천 줄" data-node="1299:36245" className="flex [justify-content:center] [align-items:center] gap-[6px] shrink-0">
        <div data-figma="cells" data-node="1299:36246" className="flex [justify-content:center] [align-items:center] gap-[8px] shrink-0">
          <div data-figma="추천 줄" data-node="1299:36247" className="flex [justify-content:center] [align-items:flex-start] gap-[8px] shrink-0">
            <div data-figma="arrow" data-node="1299:36248" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
              <div data-figma="Icon / Line" data-node="1299:36249" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 [opacity:0.3] absolute left-[0px] top-[24px]">
                <Icon data-figma="chevron-left" data-node="I1299:36249;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
              </div>
            </div>
            <div data-figma="cells" data-node="1299:36250" className="flex [justify-content:center] [align-items:center] gap-[12px] shrink-0">
              <div data-figma="cell / box" data-node="1299:36251" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[8px] shrink-0">
                <div data-figma="face" data-node="1299:36252" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] [border-radius:999px] [background:var(--bg-surface,_#121415)] shrink-0 relative overflow-hidden">
                  <div data-figma="chair / box" data-node="1398:36589" data-instance-of="Chair Illustration" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[0px]">
                    <div data-figma="box" data-node="I1398:36589;1204:89691" data-img={"{\"src\":\"./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.png\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[72px] h-[72px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
                    "background": "url(./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.png) 50% / cover no-repeat"
                  }} />
                  </div>
                </div>
                <p data-figma="name" data-node="1299:36254" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"새벽2시\n택배상자"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
                  __html: svg["1299:36254"]
                }} /></p>
              </div>
              <div data-figma="cell / sofa" data-node="1299:36255" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[8px] shrink-0">
                <div data-figma="face" data-node="1299:36256" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] [border-radius:999px] shrink-0 relative overflow-hidden [isolation:isolate]">
                  <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
                  __html: "<svg data-px=\"\" data-box=\"\" width=\"72\" height=\"72\" viewBox=\"0 0 72 72\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"36\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_36256\"><rect width=\"72\" height=\"72\" rx=\"36\"/></clipPath></defs><g clip-path=\"url(#c1299_36256)\"><path d=\"M0 36 M72 36 M72 36 M0 36 M36 0 M72 36 M36 72 M0 36 M36 72 L36 70 C17.2223 70 2 54.7777 2 36 L0 36 L-2 36 C-2 56.9868 15.0132 74 36 74 L36 72 Z M72 36 L70 36 C70 54.7777 54.7777 70 36 70 L36 72 L36 74 C56.9868 74 74 56.9868 74 36 L72 36 Z M36 0 L36 2 C54.7777 2 70 17.2223 70 36 L72 36 L74 36 C74 15.0132 56.9868 -2 36 -2 L36 0 Z M36 0 L36 -2 C15.0132 -2 -2 15.0132 -2 36 L0 36 L2 36 C2 17.2223 17.2223 2 36 2 L36 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--brand-primary, #36D2FF)\"/></g></svg>"
                }} />
                  <div data-figma="chair / sofa" data-node="1398:36591" data-instance-of="Chair Illustration" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[0px]">
                    <div data-figma="image 1208091458" data-node="I1398:36591;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.png\",\"mode\":\"CROP\",\"tf\":[[1.1916682720184326,0,-0.0958341509103775],[0,1.1916682720184326,-0.09930568933486938]],\"op\":1,\"flip\":\"\"}"} className="w-[72px] h-[72px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
                    "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.png) 5.79px 6px / 83.916% 83.916% no-repeat"
                  }} />
                  </div>
                </div>
                <p data-figma="name" data-node="1299:36258" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[58px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"따뜻한\n가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
                  __html: svg["1299:36258"]
                }} /></p>
              </div>
              <div data-figma="cell / stool" data-node="1299:36259" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[8px] shrink-0">
                <div data-figma="face" data-node="1299:36260" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] [border-radius:999px] [background:var(--bg-surface,_#121415)] shrink-0 relative overflow-hidden">
                  <div data-figma="chair / stool" data-node="1398:36593" data-instance-of="Chair Illustration" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[0px]">
                    <div data-figma="stool" data-node="I1398:36593;1204:89687" data-img={"{\"src\":\"./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.png\",\"mode\":\"CROP\",\"tf\":[[1.0860475301742554,0,-0.043023731559515],[0,1.0860475301742554,-0.04525198042392731]],\"op\":1,\"flip\":\"\"}"} className="w-[72px] h-[72px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
                    "background": "url(./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.png) 2.852px 3px / 92.077% 92.077% no-repeat"
                  }} />
                  </div>
                </div>
                <p data-figma="name" data-node="1299:36262" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[58px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"딱딱한\n나무 스툴12"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
                  __html: svg["1299:36262"]
                }} /></p>
              </div>
            </div>
            <div data-figma="arrow" data-node="1299:36263" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
              <div data-figma="Icon / Line" data-node="1299:36264" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[24px]">
                <Icon data-figma="chevron-right" data-node="I1299:36264;1299:25589" name="chevron-right" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-figma="gap 32" data-node="1299:36265" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1299:36266" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)] shrink-0">
        <p data-figma="버튼" data-node="I1299:36266;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"투표하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:36266;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1299:36267" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1299:36268" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36268"]
      }} /></p>
      <div data-figma="아래 줄" data-node="1299:36269" className="flex w-[326px] h-[29px] [padding-top:23px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Dots data-figma="dots" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[149px] top-[23px] w-[28px] h-[6px] overflow-hidden" type={"종류 5"} />
      </div>
    </div>;
  if (type === "수정본 5") return <div data-figma="type=수정본 5" data-node="1299:36285" className={cx("flex w-[326px] [padding:36px_24px_28px_24px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"465.32\" viewBox=\"0 0 326 465.32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"465.32\" rx=\"24\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1299_36285\"><rect width=\"326\" height=\"465.32\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1299_36285)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 441.319 L326 441.319 L327 441.319 L327 24 L326 24 Z M302 465.319 L302 464.319 L24 464.319 L24 465.319 L24 466.319 L302 466.319 L302 465.319 Z M0 441.319 L1 441.319 L1 24 L0 24 L-1 24 L-1 441.319 L0 441.319 Z M24 465.319 L24 464.319 C11.2974 464.319 1 454.021 1 441.319 L0 441.319 L-1 441.319 C-1 455.126 10.1929 466.319 24 466.319 L24 465.319 Z M326 441.319 L325 441.319 C325 454.021 314.703 464.319 302 464.319 L302 465.319 L302 466.319 C315.807 466.319 327 455.126 327 441.319 L326 441.319 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2975 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <p data-figma="title" data-node="1299:36273" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[149px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"오늘 나눈 고민을\n커뮤니티에 올릴까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36273"]
      }} /></p>
      <div data-figma="gap 8" data-node="1299:36274" className="w-[1px] h-[8px] shrink-0 overflow-hidden" />
      <p data-figma="desc" data-node="1299:36275" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[249px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"라이브 대화는 종료 되었지만,\n내 고민에 대한 여러 사람들이 의견을 들을 수 있어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36275"]
      }} /></p>
      <div data-figma="gap 32" data-node="1299:36276" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="고민 주제" data-node="1299:36277" data-instance-of="고민 주제" className="flex w-[284.91px] [padding:11.66px_13.33px_10px_13.33px] [flex-direction:column] [justify-content:center] [align-items:flex-start] gap-[10px] [border-radius:15px] shrink-0 h-[126.32px] relative [isolation:isolate]">
        <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"284.91\" height=\"126.32\" viewBox=\"0 0 284.91 126.32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"284.91\" height=\"126.32\" rx=\"14.995475769042969\" style=\"fill:var(--bg-elevated, #222628)\"/></svg>"
      }} />
        <div data-figma="top" data-node="I1299:36277;56:386" className="flex [justify-content:space-between] [align-items:center] [align-self:stretch] shrink-0 w-[258.26px] h-[14px] overflow-hidden">
          <div data-figma="Frame" data-node="I1299:36277;56:387" className="flex [justify-content:center] [align-items:center] gap-[6.66px] shrink-0 w-[199.66px] h-[14px] overflow-hidden">
            <p data-figma="고민" data-node="I1299:36277;56:388" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:700] [line-height:13px] [letter-spacing:-0.367px] shrink-0 w-[149px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.164px] left-[0px]">{"둘이 찍은 사진인데 지만 보정해서 올린 여우"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:36277;56:388"]
            }} /></p>
            <p data-figma="새벽2시 택배상자님의 고민" data-node="I1299:36277;56:389" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:10px] [font-style:normal] [font-weight:500] [line-height:14px] [letter-spacing:-0.4px] shrink-0 w-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.361px] left-[0px]">{"익명의 고민"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:36277;56:389"]
            }} /></p>
          </div>
        </div>
        <p data-figma="단체 사진에 나만 쏙 빼고 보정한 애 어떻게 생각함? 다섯 명이 같이 찍었는데 걔가 인스타에 올리면서 나만 보정 안 해줌. 이거 일부러야, 내가 예민한 거야?" data-node="I1299:36277;56:391" data-outline="" className="[align-self:stretch] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12.5px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.5px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.049px] left-[0px]">{"단체 사진에 나만 쏙 빼고 보정한 애 어떻게 생각함? 다섯\n명이 같이 찍었는데 걔가 인스타에 올리면서 나만 보정\n안 해줌. 이거 일부러야, 내가 예민한 거야?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:36277;56:391"]
        }} /></p>
        <div data-figma="AI 맥락" data-node="I1299:36277;56:392" className="flex [justify-content:center] [align-items:center] gap-[5px] shrink-0 w-[203.99px] h-[19.66px] overflow-hidden">
          <p data-figma="AI가 읽은 맥락" data-node="I1299:36277;56:393" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:500] [line-height:13px] [letter-spacing:-0.367px] shrink-0 w-[51px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.164px] left-[0px]">{"AI가 읽은 맥락"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:36277;56:393"]
          }} /></p>
          <div data-figma="Frame" data-node="I1299:36277;56:394" className="flex [padding:3.33px_7.5px_3.33px_7.5px] [justify-content:center] [align-items:center] gap-[5px] [border-radius:9.16px] shrink-0 w-[80px] h-[19.66px] overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"80\" height=\"19.66\" viewBox=\"0 0 80 19.66\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"80\" height=\"19.66\" rx=\"9.163901329040527\" style=\"fill:var(--brand-subtle, #06303C)\"/></svg>"
          }} />
            <p data-figma="#친구 사이 서운함" data-node="I1299:36277;56:395" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:700] [line-height:13px] [letter-spacing:-0.367px] shrink-0 w-[65px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.164px] left-[0px]">{"#친구 사이 서운함"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:36277;56:395"]
            }} /></p>
          </div>
          <div data-figma="Frame" data-node="I1299:36277;56:396" className="flex [padding:3.33px_7.5px_3.33px_7.5px] [justify-content:center] [align-items:center] gap-[5px] [border-radius:9.16px] shrink-0 w-[63px] h-[19.66px] overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"63\" height=\"19.66\" viewBox=\"0 0 63 19.66\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"63\" height=\"19.66\" rx=\"9.163901329040527\" style=\"fill:var(--brand-subtle, #06303C)\"/></svg>"
          }} />
            <p data-figma="#배려의 차이" data-node="I1299:36277;56:397" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:9.16px] [font-style:normal] [font-weight:700] [line-height:13px] [letter-spacing:-0.367px] shrink-0 w-[48px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.164px] left-[0px]">{"#배려의 차이"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1299:36277;56:397"]
            }} /></p>
          </div>
        </div>
      </div>
      <div data-figma="gap 33" data-node="1299:36278" className="w-[1px] h-[32px] shrink-0 overflow-hidden" />
      <div data-figma="Button / Primary" data-node="1299:36279" data-instance-of="Button / Primary" className="flex w-[278px] h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-12xl,_26px)] shrink-0 relative [isolation:isolate]">
        <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"278\" height=\"52\" viewBox=\"0 0 278 52\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"278\" height=\"52\" rx=\"26\" style=\"fill:var(--brand-primary, #36D2FF)\"/></svg>"
      }} />
        <p data-figma="버튼" data-node="I1299:36279;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[132px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"커뮤니티에 고민 올리기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:36279;3004:1215"]
        }} /></p>
      </div>
      <div data-figma="gap 16" data-node="1299:36280" className="w-[1px] h-[16px] shrink-0 overflow-hidden" />
      <p data-figma="home" data-node="1299:36281" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[93px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"올리지 않고 홈으로"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:36281"]
      }} /></p>
      <div data-figma="아래 줄" data-node="1299:36282" className="flex w-[326px] h-[29px] [padding-top:23px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Dots data-figma="dots" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[149px] top-[23px] w-[28px] h-[6px] overflow-hidden" type={"종류 6"} />
      </div>
      <div data-figma="Icon / Line" data-node="1299:36284" data-instance-of="Icon / Line" className="flex w-[16px] h-[16px] [justify-content:center] [align-items:center] absolute right-[34px] top-[174.16px] left-[276px]">
        <Icon data-figma="pencil" data-node="I1299:36284;1299:25707" name="pencil" color="var(--text-primary, #F8F8F8)" className="w-[16px] h-[16px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  return null;
}