// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:50235 "고민 주제 칩" (해시 9779f26d)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function WorryTopicChip({
  variant = "기본",
  style,
  className
}) {
  if (variant === "기본") return <div data-figma="종류=기본" data-node="1405:50229" className={cx("flex w-[342px] h-[40px] [padding:10px_14px] [align-items:center] gap-[8px] [border-radius:16px] [background:var(--bg-overlay,_rgba(10,_11,_12,_0.60))] relative overflow-hidden", className)} style={style}>
      <p data-figma="고민" data-node="1405:50226" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'Noto_Sans_KR',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:13px] shrink-0 w-[21px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative">{"고민"}<span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50226"]
      }} /></p>
      <p data-figma="둘이 찍은 사진인데 지만 보정해서 올린…" data-node="1405:50227" data-outline="" className="h-[17px] [flex:1_0_0] overflow-hidden [color:var(--text-primary,_#F8F8F8)] [text-overflow:ellipsis] [white-space:pre] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.56px] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.404px] left-[0px]">{"둘이 찍은 사진인데 지만 보정해서 올린…"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50227"]
      }} /></p>
      <p data-figma="⌄" data-node="1405:50228" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'Noto_Sans_KR',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:17px] shrink-0 w-[8px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative">{"⌄"}<span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50228"]
      }} /></p>
    </div>;
  if (variant === "종류 2") return <div data-figma="종류=종류 2" data-node="1405:50234" className={cx("flex w-[342px] h-[40px] [padding:10px_14px] [align-items:center] gap-[8px] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] relative overflow-hidden", className)} style={style}>
      <p data-figma="고민" data-node="1405:50231" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[19px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"고민"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50231"]
      }} /></p>
      <p data-figma="단체 사진에 나만 쏙 빼고 보정한 애 어떻게…" data-node="1405:50232" data-outline="" className="h-[17px] [flex:1_0_0] overflow-hidden [color:var(--text-primary,_#F8F8F8)] [text-overflow:ellipsis] [white-space:pre] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"단체 사진에 나만 쏙 빼고 보정한 애 어떻게…"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:50232"]
      }} /></p>
      <div data-figma="Icon / Line" data-node="1405:50233" data-instance-of="Icon / Line" className="flex w-[14px] h-[14px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Icon data-figma="chevron-down" data-node="I1405:50233;1299:25595" name="chevron-down" color="var(--white, #FFFFFF)" className="w-[14px] h-[14px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  return null;
}