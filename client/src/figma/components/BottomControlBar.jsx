// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:86139 "하단 컨트롤 바" (해시 12b52909)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { PlusButton } from './PlusButton';
import { ChatInput } from './ChatInput';
import { MicButton } from './MicButton';
const cx = (...a) => a.filter(Boolean).join(' ');
import { SendButton } from './SendButton';
export function BottomControlBar({
  state = "default",
  style,
  className
}) {
  if (state === "default") return <div data-figma="state=default" data-node="1204:86123" className={cx("flex w-[358px] h-[64px] [padding:var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-15xl,_32px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"358\" height=\"64\" viewBox=\"0 0 358 64\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"358\" height=\"64\" rx=\"32\" style=\"fill:var(--bg-base, #000000)\"/><defs><clipPath id=\"c1204_86123\"><rect width=\"358\" height=\"64\" rx=\"32\"/></clipPath></defs><g clip-path=\"url(#c1204_86123)\"><path d=\"M0 32 M358 32 M358 32 M0 32 M32 0 L32 1 L326 1 L326 0 L326 -1 L32 -1 L32 0 Z M358 32 M326 64 L326 63 L32 63 L32 64 L32 65 L326 65 L326 64 Z M0 32 M32 64 L32 63 C14.8792 63 1 49.1208 1 32 L0 32 L-1 32 C-1 50.2254 13.7746 65 32 65 L32 64 Z M358 32 L357 32 C357 49.1208 343.121 63 326 63 L326 64 L326 65 C344.225 65 359 50.2254 359 32 L358 32 Z M326 0 L326 1 C343.121 1 357 14.8792 357 32 L358 32 L359 32 C359 13.7746 344.225 -1 326 -1 L326 0 Z M32 0 L32 -1 C13.7746 -1 -1 13.7746 -1 32 L0 32 L1 32 C1 14.8792 14.8792 1 32 1 L32 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <PlusButton data-figma="플러스 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"default"} />
      <ChatInput data-figma="채팅 입력" className="flex h-[48px] [padding-right:var(--spacing-13,_16px)] [align-items:center] [flex:1_0_0] overflow-hidden" state={"default"} />
      <MicButton data-figma="마이크 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"on"} />
    </div>;
  if (state === "muted") return <div data-figma="state=muted" data-node="1204:86128" className={cx("flex w-[358px] h-[64px] [padding:var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-15xl,_32px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"358\" height=\"64\" viewBox=\"0 0 358 64\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"358\" height=\"64\" rx=\"32\" style=\"fill:var(--bg-base, #000000)\"/><defs><clipPath id=\"c1204_86128\"><rect width=\"358\" height=\"64\" rx=\"32\"/></clipPath></defs><g clip-path=\"url(#c1204_86128)\"><path d=\"M0 32 M358 32 M358 32 M0 32 M32 0 L32 1 L326 1 L326 0 L326 -1 L32 -1 L32 0 Z M358 32 M326 64 L326 63 L32 63 L32 64 L32 65 L326 65 L326 64 Z M0 32 M32 64 L32 63 C14.8792 63 1 49.1208 1 32 L0 32 L-1 32 C-1 50.2254 13.7746 65 32 65 L32 64 Z M358 32 L357 32 C357 49.1208 343.121 63 326 63 L326 64 L326 65 C344.225 65 359 50.2254 359 32 L358 32 Z M326 0 L326 1 C343.121 1 357 14.8792 357 32 L358 32 L359 32 C359 13.7746 344.225 -1 326 -1 L326 0 Z M32 0 L32 -1 C13.7746 -1 -1 13.7746 -1 32 L0 32 L1 32 C1 14.8792 14.8792 1 32 1 L32 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <PlusButton data-figma="플러스 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"active"} />
      <ChatInput data-figma="채팅 입력" className="flex h-[48px] [padding-right:var(--spacing-13,_16px)] [align-items:center] [flex:1_0_0] overflow-hidden" state={"default"} />
      <MicButton data-figma="마이크 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"muted"} />
    </div>;
  if (state === "dimmed") return <div data-figma="state=dimmed" data-node="1204:86133" className={cx("flex w-[358px] h-[64px] [padding:var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-15xl,_32px)] [border:1px_solid_var(--bg-elevated,_#222628)] [opacity:0.35] [background:var(--bg-base,_#000)] relative overflow-hidden", className)} style={style}>
      <PlusButton data-figma="플러스 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"close"} />
      <ChatInput data-figma="채팅 입력" className="flex h-[48px] [padding-right:var(--spacing-13,_16px)] [align-items:center] [flex:1_0_0] overflow-hidden" state={"default"} />
      <MicButton data-figma="마이크 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"muted"} />
    </div>;
  if (state === "waiting") return <div data-figma="state=waiting" data-node="1204:86138" className={cx("flex w-[358px] h-[64px] [padding:var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-15xl,_32px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"358\" height=\"64\" viewBox=\"0 0 358 64\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"358\" height=\"64\" rx=\"32\" style=\"fill:var(--bg-base, #000000)\"/><defs><clipPath id=\"c1204_86138\"><rect width=\"358\" height=\"64\" rx=\"32\"/></clipPath></defs><g clip-path=\"url(#c1204_86138)\"><path d=\"M0 32 M358 32 M358 32 M0 32 M32 0 L32 1 L326 1 L326 0 L326 -1 L32 -1 L32 0 Z M358 32 M326 64 L326 63 L32 63 L32 64 L32 65 L326 65 L326 64 Z M0 32 M32 64 L32 63 C14.8792 63 1 49.1208 1 32 L0 32 L-1 32 C-1 50.2254 13.7746 65 32 65 L32 64 Z M358 32 L357 32 C357 49.1208 343.121 63 326 63 L326 64 L326 65 C344.225 65 359 50.2254 359 32 L358 32 Z M326 0 L326 1 C343.121 1 357 14.8792 357 32 L358 32 L359 32 C359 13.7746 344.225 -1 326 -1 L326 0 Z M32 0 L32 -1 C13.7746 -1 -1 13.7746 -1 32 L0 32 L1 32 C1 14.8792 14.8792 1 32 1 L32 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <PlusButton data-figma="플러스 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"waiting"} />
      <ChatInput data-figma="채팅 입력" className="flex w-[228px] h-[48px] [padding-right:var(--spacing-13,_16px)] [align-items:center] shrink-0 overflow-hidden" state={"waiting"} />
      <SendButton data-figma="보내기 버튼" className="w-[48px] h-[48px] shrink-0 relative" type={"chat"} icon={"black"} />
    </div>;
  if (state === "menu-open") return <div data-figma="state=menu-open" data-node="1547:19956" className={cx("flex w-[358px] h-[64px] [padding:var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] [border-radius:var(--radius-15xl,_32px)] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"358\" height=\"64\" viewBox=\"0 0 358 64\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"358\" height=\"64\" rx=\"32\" style=\"fill:var(--bg-base, #000000)\"/><defs><clipPath id=\"c1547_19956\"><rect width=\"358\" height=\"64\" rx=\"32\"/></clipPath></defs><g clip-path=\"url(#c1547_19956)\"><path d=\"M0 32 M358 32 M358 32 M0 32 M32 0 L32 1 L326 1 L326 0 L326 -1 L32 -1 L32 0 Z M358 32 M326 64 L326 63 L32 63 L32 64 L32 65 L326 65 L326 64 Z M0 32 M32 64 L32 63 C14.8792 63 1 49.1208 1 32 L0 32 L-1 32 C-1 50.2254 13.7746 65 32 65 L32 64 Z M358 32 L357 32 C357 49.1208 343.121 63 326 63 L326 64 L326 65 C344.225 65 359 50.2254 359 32 L358 32 Z M326 0 L326 1 C343.121 1 357 14.8792 357 32 L358 32 L359 32 C359 13.7746 344.225 -1 326 -1 L326 0 Z M32 0 L32 -1 C13.7746 -1 -1 13.7746 -1 32 L0 32 L1 32 C1 14.8792 14.8792 1 32 1 L32 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--bg-elevated, #222628)\"/></g></svg>"
    }} />
      <PlusButton data-figma="플러스 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"close"} />
      <ChatInput data-figma="채팅 입력" className="flex h-[48px] [padding-right:var(--spacing-13,_16px)] [align-items:center] [flex:1_0_0] overflow-hidden" state={"default"} />
      <MicButton data-figma="마이크 버튼" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" state={"muted"} />
    </div>;
  return null;
}