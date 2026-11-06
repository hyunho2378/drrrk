// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89141 "엉따 온도" (해시 4c5e2bcc)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { NextChair } from './NextChair';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function SeatWarmth({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:89140" className={cx("flex w-[342px] [padding:var(--spacing-13,_16px)_var(--spacing-14,_18px)] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-9,_10px)] [border-radius:var(--radius-9xl,_18px)] [background:var(--bg-elevated-85,_rgba(34,_38,_40,_0.85))] relative overflow-hidden", className)} style={style}>
      <div data-figma="Frame" data-node="1204:89133" className="flex [justify-content:space-between] [align-items:center] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:89134" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden">
          <p data-figma="엉따 온도" data-node="1204:89135" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[50px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"엉따 온도"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:89135"]
          }} /></p>
          <div data-figma="Icon / Line" data-node="1204:89136" data-instance-of="Icon / Line" className="flex w-[13px] h-[13px] [justify-content:center] [align-items:center] shrink-0 relative">
            <Icon data-figma="information" data-node="I1204:89136;1299:25683" name="information-1463-24333" color="var(--text-primary, #F8F8F8)" className="w-[13px] h-[13px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
        </div>
        <p data-figma="39.2°" data-node="1204:89137" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:24px] [font-style:normal] [font-weight:700] [line-height:34px] [letter-spacing:-0.96px] shrink-0 w-[57px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.264px] left-[0px]">{"39.2°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:89137"]
        }} /></p>
      </div>
      <div data-figma="gauge" data-node="1204:89138" data-instance-of="gauge" className="flex h-[6px] [padding-right:61.2px] [align-items:center] [align-self:stretch] [border-radius:var(--radius-m,_3px)] [background:var(--text-tertiary-40,_rgba(110,_118,_124,_0.40))] shrink-0 w-[306px] relative overflow-hidden">
        <div data-figma="fill" data-node="I1204:89138;1204:85297" className="w-[244.8px] h-[6px] [border-radius:var(--radius-m,_3px)] [background:linear-gradient(90deg,_#36D2FF_0%,_#FF9A4D_100%)] absolute left-[0px] top-[0px]" />
      </div>
      <NextChair data-figma="다음 의자" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] shrink-0 overflow-hidden" type={"default"} />
    </div>;
  return null;
}