// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:55638 "Timer Pill / 해 뜨기까지 20분 기준" (해시 f9c7b0d6)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function TimerPill({
  minutes = "20",
  state = "default",
  style,
  className
}) {
  if (minutes === "20" && state === "default") return <div data-figma="minutes=20, state=default" data-node="1204:55639" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55640" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <div data-figma="Frame 2147249212" data-node="1563:15775" className="[display:inline-flex] [padding:10px] [align-items:center] [gap:10px] [position:absolute] [left:-9.12px] [top:-9.12px] [width:32.25px] [height:32.25px]">
          <span data-figma="Vector" data-node="1204:55641" className="[position:relative] [width:12.25px] [height:12.25px] [flex-shrink:0] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55641"]
        }} />
        </div>
        <span data-figma="Vector" data-node="1204:55642" className="[width:9.33px] [height:9.33px] [position:absolute] [left:2.33px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55642"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55643" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55643"]
      }} /></p>
      <p data-figma="time" data-node="1204:55644" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:32px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"20:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55644"]
      }} /></p>
    </div>;
  if (minutes === "19" && state === "default") return <div data-figma="minutes=19, state=default" data-node="1204:55645" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55646" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55647" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55647"]
      }} />
        <span data-figma="Vector" data-node="1204:55648" className="[width:9.33px] [height:9.33px] [position:absolute] [left:2.33px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55648"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55649" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55649"]
      }} /></p>
      <p data-figma="time" data-node="1204:55650" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"19:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55650"]
      }} /></p>
    </div>;
  if (minutes === "18" && state === "default") return <div data-figma="minutes=18, state=default" data-node="1204:55651" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55652" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55653" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55653"]
      }} />
        <span data-figma="Vector" data-node="1204:55654" className="[width:9.33px] [height:9.33px] [position:absolute] [left:2.34px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55654"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55655" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55655"]
      }} /></p>
      <p data-figma="time" data-node="1204:55656" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"18:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55656"]
      }} /></p>
    </div>;
  if (minutes === "17" && state === "default") return <div data-figma="minutes=17, state=default" data-node="1204:55657" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55658" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55659" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55659"]
      }} />
        <span data-figma="Vector" data-node="1204:55660" className="[width:9.33px] [height:9.33px] [position:absolute] [left:2.34px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55660"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55661" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55661"]
      }} /></p>
      <p data-figma="time" data-node="1204:55662" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"17:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55662"]
      }} /></p>
    </div>;
  if (minutes === "16" && state === "default") return <div data-figma="minutes=16, state=default" data-node="1204:55663" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55664" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55665" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55665"]
      }} />
        <span data-figma="Vector" data-node="1204:55666" className="[width:9.33px] [height:9.33px] [position:absolute] [left:2.33px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55666"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55667" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55667"]
      }} /></p>
      <p data-figma="time" data-node="1204:55668" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"16:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55668"]
      }} /></p>
    </div>;
  if (minutes === "15" && state === "default") return <div data-figma="minutes=15, state=default" data-node="1204:55669" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55670" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55671" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55671"]
      }} />
        <span data-figma="Vector" data-node="1204:55672" className="[width:9.33px] [height:9.33px] [position:absolute] [left:2.33px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55672"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55673" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55673"]
      }} /></p>
      <p data-figma="time" data-node="1204:55674" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"15:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55674"]
      }} /></p>
    </div>;
  if (minutes === "14" && state === "default") return <div data-figma="minutes=14, state=default" data-node="1204:55675" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55676" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55677" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55677"]
      }} />
        <span data-figma="Vector" data-node="1204:55678" className="[width:9.11px] [height:9.33px] [position:absolute] [left:2.56px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55678"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55679" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55679"]
      }} /></p>
      <p data-figma="time" data-node="1204:55680" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"14:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55680"]
      }} /></p>
    </div>;
  if (minutes === "13" && state === "default") return <div data-figma="minutes=13, state=default" data-node="1204:55681" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55682" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55683" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55683"]
      }} />
        <span data-figma="Vector" data-node="1204:55684" className="[width:8.44px] [height:9.33px] [position:absolute] [left:3.23px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55684"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55685" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55685"]
      }} /></p>
      <p data-figma="time" data-node="1204:55686" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"13:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55686"]
      }} /></p>
    </div>;
  if (minutes === "12" && state === "default") return <div data-figma="minutes=12, state=default" data-node="1204:55687" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55688" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55689" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55689"]
      }} />
        <span data-figma="Vector" data-node="1204:55690" className="[width:7.41px] [height:9.33px] [position:absolute] [left:4.26px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55690"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55691" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55691"]
      }} /></p>
      <p data-figma="time" data-node="1204:55692" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"12:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55692"]
      }} /></p>
    </div>;
  if (minutes === "11" && state === "default") return <div data-figma="minutes=11, state=default" data-node="1204:55693" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55694" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55695" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55695"]
      }} />
        <span data-figma="Vector" data-node="1204:55696" className="[width:6.11px] [height:9.33px] [position:absolute] [left:5.56px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55696"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55697" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55697"]
      }} /></p>
      <p data-figma="time" data-node="1204:55698" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:28px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"11:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55698"]
      }} /></p>
    </div>;
  if (minutes === "10" && state === "default") return <div data-figma="minutes=10, state=default" data-node="1204:55699" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55700" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55701" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55701"]
      }} />
        <span data-figma="Vector" data-node="1204:55702" className="[width:4.67px] [height:9.33px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55702"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55703" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55703"]
      }} /></p>
      <p data-figma="time" data-node="1204:55704" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"10:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55704"]
      }} /></p>
    </div>;
  if (minutes === "9" && state === "default") return <div data-figma="minutes=9, state=default" data-node="1204:55705" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55706" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55707" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55707"]
      }} />
        <span data-figma="Vector" data-node="1204:55708" className="[width:4.67px] [height:9.11px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55708"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55709" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55709"]
      }} /></p>
      <p data-figma="time" data-node="1204:55710" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:33px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"09:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55710"]
      }} /></p>
    </div>;
  if (minutes === "8" && state === "default") return <div data-figma="minutes=8, state=default" data-node="1204:55711" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55712" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55713" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55713"]
      }} />
        <span data-figma="Vector" data-node="1204:55714" className="[width:4.66px] [height:8.44px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55714"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55715" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55715"]
      }} /></p>
      <p data-figma="time" data-node="1204:55716" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:32px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"08:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55716"]
      }} /></p>
    </div>;
  if (minutes === "7" && state === "default") return <div data-figma="minutes=7, state=default" data-node="1204:55717" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55718" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55719" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55719"]
      }} />
        <span data-figma="Vector" data-node="1204:55720" className="[width:4.66px] [height:7.41px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55720"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55721" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55721"]
      }} /></p>
      <p data-figma="time" data-node="1204:55722" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:32px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"07:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55722"]
      }} /></p>
    </div>;
  if (minutes === "6" && state === "default") return <div data-figma="minutes=6, state=default" data-node="1204:55723" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55724" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55725" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55725"]
      }} />
        <span data-figma="Vector" data-node="1204:55726" className="[width:4.67px] [height:6.11px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55726"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55727" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55727"]
      }} /></p>
      <p data-figma="time" data-node="1204:55728" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:33px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"06:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55728"]
      }} /></p>
    </div>;
  if (minutes === "5" && state === "default") return <div data-figma="minutes=5, state=default" data-node="1204:55729" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55730" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55731" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55731"]
      }} />
        <span data-figma="Vector" data-node="1204:55732" className="[width:4.67px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55732"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55733" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55733"]
      }} /></p>
      <p data-figma="time" data-node="1204:55734" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:33px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"05:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55734"]
      }} /></p>
    </div>;
  if (minutes === "4" && state === "default") return <div data-figma="minutes=4, state=default" data-node="1204:55735" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:55736" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55737" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55737"]
      }} />
        <span data-figma="Vector" data-node="1204:55738" className="[width:4.44px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55738"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55739" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55739"]
      }} /></p>
      <p data-figma="time" data-node="1204:55740" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:33px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"04:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55740"]
      }} /></p>
    </div>;
  if (minutes === "3" && state === "ending") return <div data-figma="minutes=3, state=ending" data-node="1204:55741" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [border:1px_solid_transparent] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:-1px] [top:-1px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"139\" height=\"32\" viewBox=\"0 0 139 32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"139\" height=\"32\" rx=\"16\" style=\"fill:var(--status-danger-18, #FF4D6A2E)\"/><defs><clipPath id=\"c1204_55741\"><rect width=\"139\" height=\"32\" rx=\"16\"/></clipPath></defs><g clip-path=\"url(#c1204_55741)\"><path d=\"M0 16 M139 16 M139 16 M0 16 M16 0 L16 1 L123 1 L123 0 L123 -1 L16 -1 L16 0 Z M139 16 M123 32 L123 31 L16 31 L16 32 L16 33 L123 33 L123 32 Z M0 16 M16 32 L16 31 C7.71573 31 1 24.2843 1 16 L0 16 L-1 16 C-1 25.3888 6.61116 33 16 33 L16 32 Z M139 16 L138 16 C138 24.2843 131.284 31 123 31 L123 32 L123 33 C132.389 33 140 25.3888 140 16 L139 16 Z M123 0 L123 1 C131.284 1 138 7.71573 138 16 L139 16 L140 16 C140 6.61116 132.389 -1 123 -1 L123 0 Z M16 0 L16 -1 C6.61116 -1 -1 6.61116 -1 16 L0 16 L1 16 C1 7.71573 7.71573 1 16 1 L16 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-danger, #FF4D6A)\"/></g></svg>"
    }} />
      <div data-figma="timer" data-node="1204:55742" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55743" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55743"]
      }} />
        <span data-figma="Vector" data-node="1204:55744" className="[width:3.77px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55744"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55745" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55745"]
      }} /></p>
      <p data-figma="time" data-node="1204:55746" data-outline="" className="[color:var(--status-danger,_#FF4D6A)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:32px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"03:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55746"]
      }} /></p>
    </div>;
  if (minutes === "2" && state === "ending") return <div data-figma="minutes=2, state=ending" data-node="1204:55747" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [border:1px_solid_transparent] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:-1px] [top:-1px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"139\" height=\"32\" viewBox=\"0 0 139 32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"139\" height=\"32\" rx=\"16\" style=\"fill:var(--status-danger-18, #FF4D6A2E)\"/><defs><clipPath id=\"c1204_55747\"><rect width=\"139\" height=\"32\" rx=\"16\"/></clipPath></defs><g clip-path=\"url(#c1204_55747)\"><path d=\"M0 16 M139 16 M139 16 M0 16 M16 0 L16 1 L123 1 L123 0 L123 -1 L16 -1 L16 0 Z M139 16 M123 32 L123 31 L16 31 L16 32 L16 33 L123 33 L123 32 Z M0 16 M16 32 L16 31 C7.71573 31 1 24.2843 1 16 L0 16 L-1 16 C-1 25.3888 6.61116 33 16 33 L16 32 Z M139 16 L138 16 C138 24.2843 131.284 31 123 31 L123 32 L123 33 C132.389 33 140 25.3888 140 16 L139 16 Z M123 0 L123 1 C131.284 1 138 7.71573 138 16 L139 16 L140 16 C140 6.61116 132.389 -1 123 -1 L123 0 Z M16 0 L16 -1 C6.61116 -1 -1 6.61116 -1 16 L0 16 L1 16 C1 7.71573 7.71573 1 16 1 L16 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-danger, #FF4D6A)\"/></g></svg>"
    }} />
      <div data-figma="timer" data-node="1204:55748" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55749" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55749"]
      }} />
        <span data-figma="Vector" data-node="1204:55750" className="[width:2.74px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55750"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55751" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55751"]
      }} /></p>
      <p data-figma="time" data-node="1204:55752" data-outline="" className="[color:var(--status-danger,_#FF4D6A)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:32px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"02:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55752"]
      }} /></p>
    </div>;
  if (minutes === "1" && state === "ending") return <div data-figma="minutes=1, state=ending" data-node="1204:55753" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [border:1px_solid_transparent] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:-1px] [top:-1px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"137\" height=\"32\" viewBox=\"0 0 137 32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"137\" height=\"32\" rx=\"16\" style=\"fill:var(--status-danger-18, #FF4D6A2E)\"/><defs><clipPath id=\"c1204_55753\"><rect width=\"137\" height=\"32\" rx=\"16\"/></clipPath></defs><g clip-path=\"url(#c1204_55753)\"><path d=\"M0 16 M137 16 M137 16 M0 16 M16 0 L16 1 L121 1 L121 0 L121 -1 L16 -1 L16 0 Z M137 16 M121 32 L121 31 L16 31 L16 32 L16 33 L121 33 L121 32 Z M0 16 M16 32 L16 31 C7.71573 31 1 24.2843 1 16 L0 16 L-1 16 C-1 25.3888 6.61116 33 16 33 L16 32 Z M137 16 L136 16 C136 24.2843 129.284 31 121 31 L121 32 L121 33 C130.389 33 138 25.3888 138 16 L137 16 Z M121 0 L121 1 C129.284 1 136 7.71573 136 16 L137 16 L138 16 C138 6.61116 130.389 -1 121 -1 L121 0 Z M16 0 L16 -1 C6.61116 -1 -1 6.61116 -1 16 L0 16 L1 16 C1 7.71573 7.71573 1 16 1 L16 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-danger, #FF4D6A)\"/></g></svg>"
    }} />
      <div data-figma="timer" data-node="1204:55754" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:55755" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55755"]
      }} />
        <span data-figma="Vector" data-node="1204:55756" className="[width:1.44px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55756"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:55757" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55757"]
      }} /></p>
      <p data-figma="time" data-node="1204:55758" data-outline="" className="[color:var(--status-danger,_#FF4D6A)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:30px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"01:00"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:55758"]
      }} /></p>
    </div>;
  if (minutes === "0" && state === "해 뜸") return <div data-figma="minutes=0, state=해 뜸" data-node="1204:56001" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--accent-yellow-18,_rgba(255,_194,_77,_0.18))] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:56002" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:56003" className="[width:4.67px] [height:4.67px] [position:absolute] [left:4.67px] [top:4.67px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56003"]
      }} />
        <span data-figma="Vector" data-node="1204:56004" className="[width:0px] [height:1.17px] [position:absolute] [left:7px] [top:1.17px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56004"]
      }} />
        <span data-figma="Vector" data-node="1204:56005" className="[width:0px] [height:1.17px] [position:absolute] [left:7px] [top:11.67px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56005"]
      }} />
        <span data-figma="Vector" data-node="1204:56006" className="[width:0.82px] [height:0.82px] [position:absolute] [left:2.88px] [top:2.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56006"]
      }} />
        <span data-figma="Vector" data-node="1204:56007" className="[width:0.82px] [height:0.82px] [position:absolute] [left:10.3px] [top:10.3px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56007"]
      }} />
        <span data-figma="Vector" data-node="1204:56008" className="[width:1.17px] [height:0px] [position:absolute] [left:1.17px] [top:7px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56008"]
      }} />
        <span data-figma="Vector" data-node="1204:56009" className="[width:1.17px] [height:0px] [position:absolute] [left:11.67px] [top:7px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56009"]
      }} />
        <span data-figma="Vector" data-node="1204:56010" className="[width:0.82px] [height:0.82px] [position:absolute] [left:2.88px] [top:10.3px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56010"]
      }} />
        <span data-figma="Vector" data-node="1204:56011" className="[width:0.82px] [height:0.82px] [position:absolute] [left:10.3px] [top:2.88px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56011"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:56012" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 떴어요"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56012"]
      }} /></p>
    </div>;
  if (minutes === "대기" && state === "대기") return <div data-figma="minutes=대기, state=대기" data-node="1204:56014" className={cx("[display:inline-flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="timer" data-node="1204:56015" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1204:56016" className="[width:0px] [height:1.75px] [position:absolute] [left:3.5px] [top:9.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56016"]
      }} />
        <span data-figma="Vector" data-node="1204:56017" className="[width:0px] [height:1.75px] [position:absolute] [left:10.5px] [top:9.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56017"]
      }} />
        <span data-figma="Vector" data-node="1204:56018" className="[width:8.17px] [height:0px] [position:absolute] [left:2.92px] [top:9.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56018"]
      }} />
        <span data-figma="Vector" data-node="1204:56019" className="[width:5.83px] [height:7px] [position:absolute] [left:4.08px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56019"]
      }} />
      </div>
      <p data-figma="label" data-node="1204:56020" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:118px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"의자 꺼내두고 기다리는 중"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56020"]
      }} /></p>
      <p data-figma="time" data-node="1204:56021" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"01:24"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:56021"]
      }} /></p>
    </div>;
  return null;
}