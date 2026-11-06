// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:86773 "설정" (해시 ea18cabb)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
export function SettingsButton({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:86772" className={cx("flex w-[40px] h-[40px] [padding:10px] [justify-content:center] [align-items:center] [border-radius:var(--radius-10xl,_20px)] [background:var(--gray-700-60,_rgba(69,_69,_69,_0.60))] relative overflow-hidden", className)} style={style}>
      <Icon data-figma="Icon / 기타" data-node="1204:86771" name="기타-gear-20" color="var(--text-primary, #F8F8F8)" className="w-[20px] h-[20px] shrink-0 absolute left-[10px] top-[10px]" />
    </div>;
  return null;
}