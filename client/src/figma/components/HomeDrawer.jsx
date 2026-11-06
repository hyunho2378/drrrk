// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:87684 "홈 서랍" (해시 556060e1)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { WorryInput } from './WorryInput';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function HomeDrawer({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:87683" className={cx("w-[390px] h-[326px] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle 1954141365" data-node="1204:87677" className="w-[390px] h-[326px] [border-radius:20px_20px_0_0] [background:var(--bg-base,_#000)] absolute left-[0px] top-[0px]" />
      <p data-figma="유난히 잠 못드는 밤 혹시 무슨 일 있어?" data-node="1204:87678" data-outline="" className="w-[342px] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:28px] [font-style:normal] [font-weight:700] [line-height:39px] [letter-spacing:-1.12px] absolute left-[24px] top-[38px] h-[78px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.308px] left-[0px]">{"유난히 잠 못드는 밤\n혹시 무슨 일 있어?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87678"]
      }} /></p>
      <WorryInput data-figma="고민 입력" className="w-[342px] h-[60px] absolute left-[24px] top-[136px]" type={"default"} />
      <div data-figma="Frame 2147249122" data-node="1204:87680" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] absolute left-[101px] top-[204px] w-[189px] h-[18px]">
        <p data-figma="자기 전 뒤척이게 만드는 친구의 한 마디" data-node="1204:87681" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[189px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"자기 전 뒤척이게 만드는 친구의 한 마디"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87681"]
        }} /></p>
      </div>
      <div data-figma="drawer handle" data-node="1204:87682" className="w-[40px] h-[4px] [border-radius:var(--radius-m,_3px)] [background:var(--text-tertiary,_#6E767C)] absolute left-[175px] top-[12px]" />
    </div>;
  return null;
}