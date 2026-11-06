// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:84916 "마이크 버튼" (해시 f7e91926)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
export function MicButton({
  state = "on",
  style,
  className
}) {
  if (state === "on") return <div data-figma="state=on" data-node="1204:84909" className={cx("flex w-[48px] h-[48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--status-success,_#2EE59D)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:84908" data-instance-of="Icon / Line" className="flex w-[22px] h-[22px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Icon data-figma="microphone" data-node="I1204:84908;1299:25517" name="microphone" color="var(--bg-base, #000000)" strokeScale={1.0909} className="w-[22px] h-[22px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  if (state === "muted") return <div data-figma="state=muted" data-node="1204:84912" className={cx("flex w-[48px] h-[48px] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--status-danger,_#FF4D6A)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:84911" data-instance-of="Icon / Line" className="flex w-[22px] h-[22px] [justify-content:center] [align-items:center] shrink-0 relative">
        <Icon data-figma="microphone-off" data-node="I1204:84911;1299:25525" name="microphone-off" color="var(--bg-base, #000000)" strokeScale={1.0909} className="w-[22px] h-[22px] shrink-0 absolute left-[0px] top-[0px]" />
      </div>
    </div>;
  return null;
}