// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:83843 "보내기 버튼" (해시 710391f5)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function SendButton({
  type = "chat",
  icon = "black",
  style,
  className
}) {
  if (type === "chat" && icon === "black") return <div data-figma="type=chat, icon=black" data-node="1204:83842" className={cx("w-[48px] h-[48px] relative overflow-hidden", className)} style={style}>
      <span data-figma="go button" data-node="1204:83840" className="w-[48px] h-[48px] absolute left-[0px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:83840"]
    }} />
      <div data-figma="Icon / Line" data-node="1204:83841" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] absolute left-[12px] top-[11.5px]">
        <Icon data-figma="arrow-right" data-node="I1204:83841;1299:25613" name="arrow-right" color="var(--bg-base, #000000)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  if (type === "comment" && icon === "white") return <div data-figma="type=comment, icon=white" data-node="1204:87132" className={cx("flex w-[40px] h-[40px] [padding:11px] [justify-content:center] [align-items:center] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Frame" data-node="1204:87129" className="w-[18px] h-[18px] shrink-0 absolute left-[11px] top-[11px] overflow-hidden">
        <span data-figma="Vector" data-node="1204:87130" className="w-[10.5px] h-[5.25px] absolute left-[3.75px] top-[3.75px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87130"]
      }} />
        <span data-figma="Vector" data-node="1204:87131" className="w-[0px] h-[10.5px] absolute left-[9px] top-[3.75px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87131"]
      }} />
      </div>
    </div>;
  if (type === "chat" && icon === "white") return <div data-figma="type=chat, icon=white" data-node="1405:44837" className={cx("w-[48px] h-[48px] relative overflow-hidden", className)} style={style}>
      <span data-figma="go button" data-node="1405:44838" className="w-[48px] h-[48px] absolute left-[0px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1405:44838"]
    }} />
      <div data-figma="Icon / Line" data-node="1405:44839" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] absolute left-[12px] top-[11.5px]">
        <Icon data-figma="arrow-right" data-node="I1405:44839;1299:25613" name="arrow-right" color="var(--bg-base, #000000)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  return null;
}