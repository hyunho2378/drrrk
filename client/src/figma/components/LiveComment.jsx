// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88387 "댓글 (라이브 채팅)" (해시 72bb8251)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Comment } from './Comment';
const cx = (...a) => a.filter(Boolean).join(' ');
import { MyComment } from './MyComment';
export function LiveComment({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:88386" className={cx("flex w-[342px] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-7,_8px)] relative overflow-hidden", className)} style={style}>
      <Comment data-figma="댓글" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden" type={"구경하는 스툴3"} />
      <Comment data-figma="댓글" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden" type={"폭신한 방석20"} />
      <MyComment data-figma="내 댓글" className="flex [justify-content:flex-end] [align-items:center] [align-self:stretch] shrink-0 overflow-hidden" type={"default"} />
    </div>;
  return null;
}