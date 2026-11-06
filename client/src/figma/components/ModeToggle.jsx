// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:55352 "모드 토글" (해시 57235e25)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function ModeToggle({
  bg = "image",
  style,
  className
}) {
  if (bg === "image") return <div data-figma="bg=image" data-node="1204:55363" className={cx("inline-flex [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] relative overflow-hidden", className)} style={style}>
      <div data-figma="그리드" data-node="1204:55367" className="flex w-[40px] h-[28px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden">
        <div data-figma="icon/그리드" data-node="1204:55368" className="w-[18px] h-[18px] shrink-0 relative overflow-hidden">
          <span data-figma="Vector" data-node="1204:55369" className="w-[6px] h-[6px] absolute left-[2.25px] top-[2.25px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55369"]
        }} />
          <span data-figma="Vector" data-node="1204:55370" className="w-[6px] h-[6px] absolute left-[9.75px] top-[2.25px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55370"]
        }} />
          <span data-figma="Vector" data-node="1204:55371" className="w-[6px] h-[6px] absolute left-[2.25px] top-[9.75px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55371"]
        }} />
          <span data-figma="Vector" data-node="1204:55372" className="w-[6px] h-[6px] absolute left-[9.75px] top-[9.75px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55372"]
        }} />
        </div>
      </div>
    </div>;
  if (bg === "dark") return <div data-figma="bg=dark" data-node="1522:19346" className={cx("inline-flex [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="그리드" data-node="1522:19347" className="flex w-[40px] h-[28px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden">
        <div data-figma="icon/그리드" data-node="1522:19348" className="w-[18px] h-[18px] shrink-0 relative overflow-hidden">
          <span data-figma="Vector" data-node="1522:19349" className="w-[6px] h-[6px] absolute left-[2.25px] top-[2.25px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1522:19349"]
        }} />
          <span data-figma="Vector" data-node="1522:19350" className="w-[6px] h-[6px] absolute left-[9.75px] top-[2.25px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1522:19350"]
        }} />
          <span data-figma="Vector" data-node="1522:19351" className="w-[6px] h-[6px] absolute left-[2.25px] top-[9.75px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1522:19351"]
        }} />
          <span data-figma="Vector" data-node="1522:19352" className="w-[6px] h-[6px] absolute left-[9.75px] top-[9.75px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1522:19352"]
        }} />
        </div>
      </div>
    </div>;
  return null;
}