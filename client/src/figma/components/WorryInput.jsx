// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:85690 "고민 입력" (해시 e41f9194)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { SendButton } from './SendButton';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function WorryInput({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:85689" className={cx("[width:342px] [height:60px] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249123" data-node="1204:85686" className="[display:flex] [width:342px] [height:60px] [padding:19px_60px_var(--spacing-15,_20px)_var(--spacing-15,_20px)] [align-items:center] [gap:var(--spacing-9,_10px)] [border-radius:var(--radius-14xl,_30px)] [background:var(--bg-elevated,_#222628)] [position:absolute] [left:0px] [top:0px]">
        <p data-figma="편하게 고민을 꺼내보아요" data-node="1204:85687" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:400] [line-height:21px] [letter-spacing:-0.6px] [flex-shrink:0] [width:144px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.04px] [left:0px]">{"편하게 고민을 꺼내보아요"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:85687"]
        }} /></p>
      </div>
      <SendButton data-figma="보내기 버튼" className="[width:48px] [height:48px] [position:absolute] [left:288px] [top:6px]" type={"chat"} icon={"black"} />
    </div>;
  return null;
}