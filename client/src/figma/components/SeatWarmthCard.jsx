// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:48764 "엉따 온도 카드" (해시 2340c2b0)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Text } from './Text';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function SeatWarmthCard({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:48763" className={cx("flex w-[342px] [padding:var(--spacing-17,_24px)_var(--spacing-15,_20px)] [flex-direction:column] [align-items:flex-start] gap-[12px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <Text data-figma="Text" className="flex [flex-direction:column] [align-items:flex-start] gap-[4px] [align-self:stretch] shrink-0 overflow-hidden" drrrkB3Reg={"\"이거 일부러야?\"로 이야기가 시작됐어요"} drrrkB1Bol={"고민을 꺼냈어요"} type={"default"} />
      <div data-figma="Progress" data-node="1405:48755" className="flex [flex-direction:column] [align-items:flex-start] [gap:var(--spacing-11,_12px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1405:48756" className="flex [justify-content:space-between] [align-items:center] [align-self:stretch] shrink-0 overflow-hidden">
          <div data-figma="Frame" data-node="1405:48757" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden">
            <p data-figma="엉따 온도" data-node="1405:48758" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[50px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"엉따 온도"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1405:48758"]
            }} /></p>
            <div data-figma="Icon / Line" data-node="1405:48759" data-instance-of="Icon / Line" className="flex w-[13px] h-[13px] [justify-content:center] [align-items:center] shrink-0 relative">
              <Icon data-figma="information" data-node="I1405:48759;1299:25683" name="information-1463-24333" color="var(--white, #FFFFFF)" className="w-[13px] h-[13px] shrink-0 absolute left-[0px] top-[0px]" />
            </div>
          </div>
          <p data-figma="39.2°" data-node="1405:48760" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:24px] [font-style:normal] [font-weight:700] [line-height:34px] [letter-spacing:-0.96px] shrink-0 w-[57px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.264px] left-[0px]">{"39.2°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1405:48760"]
          }} /></p>
        </div>
        <div data-figma="Track" data-node="1405:48761" className="flex h-[10px] [padding-right:79px] [align-items:center] [align-self:stretch] [border-radius:999px] [background:var(--bg-surface,_#121415)] shrink-0 w-[302px] relative overflow-hidden">
          <div data-figma="Bar" data-node="1405:48762" className="w-[223px] h-[10px] [border-radius:63px] [background:linear-gradient(90deg,_#36D2FF_0%,_#FF9A4D_100%)] absolute left-[0px] top-[0px]" />
        </div>
      </div>
    </div>;
  return null;
}