// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:84832 "채팅 입력" (해시 aab20f2b)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function ChatInput({
  state = "default",
  style,
  className
}) {
  if (state === "default") return <div data-figma="state=default" data-node="1204:84828" className={cx("flex w-[228px] h-[48px] [padding-right:var(--spacing-13,_16px)] [align-items:center] [border-radius:var(--radius-11xl,_24px)] relative overflow-hidden", className)} style={style}>
      <p data-figma="채팅으로 한마디..." data-node="1204:84827" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:400] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[95px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"채팅으로 한마디..."}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:84827"]
      }} /></p>
    </div>;
  if (state === "waiting") return <div data-figma="state=waiting" data-node="1204:84831" className={cx("flex w-[228px] h-[48px] [padding-right:var(--spacing-13,_16px)] [align-items:center] relative overflow-hidden", className)} style={style}>
      <p data-figma="기다리는 동안 먼저 이야기해 볼까요? AI 의자가 잠시 자리를 채워요" data-node="1204:84830" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[194px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]"><span className="[font-weight:500] [font-size:14px] [color:var(--white,_#FFFFFF)]">{"기다리는 동안 먼저 이야기해 볼까요?"}</span><span className="[font-weight:400] [font-size:14px] [color:var(--text-tertiary,_#6E767C)]">{"\nAI 의자가 잠시 자리를 채워요"}</span></span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:84830"]
      }} /></p>
    </div>;
  return null;
}