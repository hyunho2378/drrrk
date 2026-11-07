// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:83942 "Header" (해시 4cdad97f)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function Header({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:83871" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83866" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83866;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83867" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83867;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83867;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83867;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83867;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83867;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83867;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83867;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83867;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83867;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83867;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill" data-node="1537:19534" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:128px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [top:13px] [width:134px]">
        <div data-figma="timer" data-node="I1537:19534;1204:55724" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1537:19534;1204:55725" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19534;1204:55725"]
        }} />
          <span data-figma="Vector" data-node="I1537:19534;1204:55726" className="[width:4.67px] [height:6.11px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19534;1204:55726"]
        }} />
        </div>
        <p data-figma="label" data-node="I1537:19534;1204:55727" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19534;1204:55727"]
        }} /></p>
        <p data-figma="time" data-node="I1537:19534;1204:55728" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"05:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19534;1204:55728"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:83878" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83873" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83873;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83874" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83874;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83874;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83874;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83874;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83874;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83874;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83874;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83874;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83874;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83874;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill" data-node="1537:19552" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:128px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [border:1px_solid_transparent] [top:13px] [width:134px] [isolation:isolate]">
        <span aria-hidden="true" className="[position:absolute] [left:-1px] [top:-1px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"134\" height=\"32\" viewBox=\"0 0 134 32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"134\" height=\"32\" rx=\"16\" style=\"fill:var(--status-danger-18, #FF4D6A2E)\"/><defs><clipPath id=\"c1537_19552\"><rect width=\"134\" height=\"32\" rx=\"16\"/></clipPath></defs><g clip-path=\"url(#c1537_19552)\"><path d=\"M0 16 M134 16 M134 16 M0 16 M16 0 L16 1 L118 1 L118 0 L118 -1 L16 -1 L16 0 Z M134 16 M118 32 L118 31 L16 31 L16 32 L16 33 L118 33 L118 32 Z M0 16 M16 32 L16 31 C7.71573 31 1 24.2843 1 16 L0 16 L-1 16 C-1 25.3888 6.61116 33 16 33 L16 32 Z M134 16 L133 16 C133 24.2843 126.284 31 118 31 L118 32 L118 33 C127.389 33 135 25.3888 135 16 L134 16 Z M118 0 L118 1 C126.284 1 133 7.71573 133 16 L134 16 L135 16 C135 6.61116 127.389 -1 118 -1 L118 0 Z M16 0 L16 -1 C6.61116 -1 -1 6.61116 -1 16 L0 16 L1 16 C1 7.71573 7.71573 1 16 1 L16 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-danger, #FF4D6A)\"/></g></svg>"
      }} />
        <div data-figma="timer" data-node="I1537:19552;1204:55748" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1537:19552;1204:55749" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19552;1204:55749"]
        }} />
          <span data-figma="Vector" data-node="I1537:19552;1204:55750" className="[width:2.74px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19552;1204:55750"]
        }} />
        </div>
        <p data-figma="label" data-node="I1537:19552;1204:55751" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19552;1204:55751"]
        }} /></p>
        <p data-figma="time" data-node="I1537:19552;1204:55752" data-outline="" className="[color:var(--status-danger,_#FF4D6A)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:27px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"01:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19552;1204:55752"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 3") return <div data-figma="type=종류 3" data-node="1204:83882" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83880" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83880;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="Icon / Line" data-node="1204:83881" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="close" data-node="I1204:83881;1299:25629" name="close" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  if (type === "종류 4") return <div data-figma="type=종류 4" data-node="1204:83887" className={cx("[display:flex] [width:80px] [height:26px] [justify-content:center] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Keyword Button" data-node="1204:83884" className="[display:flex] [height:26px] [padding:var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-9xl,_18px)] [background:var(--bg-elevated,_#222628)] [position:absolute] [left:0px] [top:0px] [width:80px] [overflow:hidden]">
        <div data-figma="Icon / Line" data-node="1204:83885" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
          <Icon data-figma="sliders" data-node="I1204:83885;1299:25675" name="sliders" color="var(--text-primary, #F8F8F8)" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
        <p data-figma="Keyword Label" data-node="1204:83886" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [flex-shrink:0] [width:34px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.268px] [left:0px]">{"키워드"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:83886"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 5") return <div data-figma="type=종류 5" data-node="1204:83892" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83889" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83889;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="Timer Pill / 해 뜨기까지" data-node="1204:83890" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [flex-shrink:0]">
        <div data-figma="timer" data-node="I1204:83890;1204:55724" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1204:83890;1204:55725" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83890;1204:55725"]
        }} />
          <span data-figma="Vector" data-node="I1204:83890;1204:55726" className="[width:4.67px] [height:6.11px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83890;1204:55726"]
        }} />
        </div>
        <p data-figma="label" data-node="I1204:83890;1204:55727" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83890;1204:55727"]
        }} /></p>
        <p data-figma="time" data-node="I1204:83890;1204:55728" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"05:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83890;1204:55728"]
        }} /></p>
      </div>
      <div data-figma="모드 토글" data-node="1204:83891" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83891;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83891;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83891;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83891;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83891;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83891;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83891;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83891;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83891;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83891;69:461"]
          }} />
          </div>
        </div>
      </div>
    </div>;
  if (type === "종류 6") return <div data-figma="type=종류 6" data-node="1204:83899" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83894" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83894;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83895" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83895;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83895;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83895;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83895;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83895;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83895;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83895;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83895;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83895;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83895;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill" data-node="1537:19606" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:128px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [top:13px] [width:134px]">
        <div data-figma="timer" data-node="I1537:19606;1204:55736" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1537:19606;1204:55737" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19606;1204:55737"]
        }} />
          <span data-figma="Vector" data-node="I1537:19606;1204:55738" className="[width:4.44px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19606;1204:55738"]
        }} />
        </div>
        <p data-figma="label" data-node="I1537:19606;1204:55739" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19606;1204:55739"]
        }} /></p>
        <p data-figma="time" data-node="I1537:19606;1204:55740" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"03:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19606;1204:55740"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 7") return <div data-figma="type=종류 7" data-node="1204:83904" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83901" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83901;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83902" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83902;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83902;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83902;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83902;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83902;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83902;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83902;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83902;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83902;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83902;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill / 해 뜨기까지" data-node="1204:83903" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:144px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [top:13px] [width:99px]">
        <div data-figma="timer" data-node="I1204:83903;1204:55736" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1204:83903;1204:55737" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83903;1204:55737"]
        }} />
          <span data-figma="Vector" data-node="I1204:83903;1204:55738" className="[width:4.44px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83903;1204:55738"]
        }} />
        </div>
        <p data-figma="label" data-node="I1204:83903;1204:55739" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해가 떴어요"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83903;1204:55739"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 8") return <div data-figma="type=종류 8" data-node="1204:83911" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83906" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83906;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83907" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83907;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83907;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83907;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83907;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83907;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83907;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83907;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83907;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83907;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83907;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill" data-node="1537:19636" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [right:95px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [left:96px] [top:13px] [width:199px]">
        <div data-figma="timer" data-node="I1537:19636;3035:1614" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1537:19636;3035:1615" className="[width:0px] [height:1.75px] [position:absolute] [left:3.5px] [top:9.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19636;3035:1615"]
        }} />
          <span data-figma="Vector" data-node="I1537:19636;3035:1616" className="[width:0px] [height:1.75px] [position:absolute] [left:10.5px] [top:9.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19636;3035:1616"]
        }} />
          <span data-figma="Vector" data-node="I1537:19636;3035:1617" className="[width:8.17px] [height:0px] [position:absolute] [left:2.92px] [top:9.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19636;3035:1617"]
        }} />
          <span data-figma="Vector" data-node="I1537:19636;3035:1618" className="[width:5.83px] [height:7px] [position:absolute] [left:4.08px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19636;3035:1618"]
        }} />
        </div>
        <p data-figma="label" data-node="I1537:19636;3035:1619" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:118px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"의자 꺼내두고 기다리는 중"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19636;3035:1619"]
        }} /></p>
        <p data-figma="time" data-node="I1537:19636;3035:1620" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"01:24"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19636;3035:1620"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 9") return <div data-figma="type=종류 9" data-node="1204:83918" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83913" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83913;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83914" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83914;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83914;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83914;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83914;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83914;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83914;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83914;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83914;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83914;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83914;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill" data-node="1537:19644" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:126px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [border:1px_solid_transparent] [top:13px] [width:138px] [isolation:isolate]">
        <span aria-hidden="true" className="[position:absolute] [left:-1px] [top:-1px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"138\" height=\"32\" viewBox=\"0 0 138 32\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"138\" height=\"32\" rx=\"16\" style=\"fill:var(--status-danger-18, #FF4D6A2E)\"/><defs><clipPath id=\"c1537_19644\"><rect width=\"138\" height=\"32\" rx=\"16\"/></clipPath></defs><g clip-path=\"url(#c1537_19644)\"><path d=\"M0 16 M138 16 M138 16 M0 16 M16 0 L16 1 L122 1 L122 0 L122 -1 L16 -1 L16 0 Z M138 16 M122 32 L122 31 L16 31 L16 32 L16 33 L122 33 L122 32 Z M0 16 M16 32 L16 31 C7.71573 31 1 24.2843 1 16 L0 16 L-1 16 C-1 25.3888 6.61116 33 16 33 L16 32 Z M138 16 L137 16 C137 24.2843 130.284 31 122 31 L122 32 L122 33 C131.389 33 139 25.3888 139 16 L138 16 Z M122 0 L122 1 C130.284 1 137 7.71573 137 16 L138 16 L139 16 C139 6.61116 131.389 -1 122 -1 L122 0 Z M16 0 L16 -1 C6.61116 -1 -1 6.61116 -1 16 L0 16 L1 16 C1 7.71573 7.71573 1 16 1 L16 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-danger, #FF4D6A)\"/></g></svg>"
      }} />
        <div data-figma="timer" data-node="I1537:19644;1204:55742" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1537:19644;1204:55743" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19644;1204:55743"]
        }} />
          <span data-figma="Vector" data-node="I1537:19644;1204:55744" className="[width:3.77px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19644;1204:55744"]
        }} />
        </div>
        <p data-figma="label" data-node="I1537:19644;1204:55745" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19644;1204:55745"]
        }} /></p>
        <p data-figma="time" data-node="I1537:19644;1204:55746" data-outline="" className="[color:var(--status-danger,_#FF4D6A)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:31px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"02:07"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19644;1204:55746"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 10") return <div data-figma="type=종류 10" data-node="1204:83922" className={cx("[display:flex] [width:390px] [height:48px] [padding:12px_176px_12px_24px] [align-items:flex-start] [gap:125px] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83920" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:24px] [top:12px]">
        <Icon data-figma="chevron-left" data-node="I1204:83920;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <p data-figma="프로필" data-node="1204:83921" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] [position:absolute] [left:173px] [top:12px] [width:41px] [height:22px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.176px] [left:0px]">{"프로필"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:83921"]
      }} /></p>
    </div>;
  if (type === "종류 11") return <div data-figma="type=종류 11" data-node="1204:83927" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83924" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83924;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83925" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-elevated,_#222628)] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83925;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83925;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83925;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83925;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83925;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83925;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83925;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83925;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83925;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83925;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill / 해 뜨기까지" data-node="1204:83926" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:127px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [top:13px] [width:134px]">
        <div data-figma="timer" data-node="I1204:83926;1204:55724" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1204:83926;1204:55725" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83926;1204:55725"]
        }} />
          <span data-figma="Vector" data-node="I1204:83926;1204:55726" className="[width:4.67px] [height:6.11px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83926;1204:55726"]
        }} />
        </div>
        <p data-figma="label" data-node="I1204:83926;1204:55727" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83926;1204:55727"]
        }} /></p>
        <p data-figma="time" data-node="I1204:83926;1204:55728" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"05:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83926;1204:55728"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 12") return <div data-figma="type=종류 12" data-node="1204:83930" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83929" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83929;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
    </div>;
  if (type === "종류 13") return <div data-figma="type=종류 13" data-node="1204:83935" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83932" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83932;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1204:83933" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1204:83933;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1204:83933;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:83933;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83933;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1204:83933;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83933;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1204:83933;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83933;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1204:83933;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:83933;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill / 해 뜨기까지 20분 기준" data-node="1204:83934" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:144px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [top:13px] [width:99px]">
        <div data-figma="timer" data-node="I1204:83934;1204:55736" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1204:83934;1204:55737" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83934;1204:55737"]
        }} />
          <span data-figma="Vector" data-node="I1204:83934;1204:55738" className="[width:4.44px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83934;1204:55738"]
        }} />
        </div>
        <p data-figma="label" data-node="I1204:83934;1204:55739" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해가 떴어요"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:83934;1204:55739"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 14") return <div data-figma="type=종류 14" data-node="1204:83941" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_var(--spacing-17,_24px)] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1204:83937" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1204:83937;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="Frame 2147249139" data-node="1204:83938" className="[display:flex] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [flex-shrink:0]">
        <div data-figma="Icon / Line" data-node="1204:83939" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
          <Icon data-figma="view" data-node="I1204:83939;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
        <p data-figma="22" data-node="1204:83940" data-outline="" className="[color:var(--white,_#FFF)] [text-align:right] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] [flex-shrink:0] [width:16px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:-0.096px] [left:-0.56px]">{"22"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:83940"]
        }} /></p>
      </div>
    </div>;
  if (type === "수정본") return <div data-figma="type=수정본" data-node="1299:20306" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_24px] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1299:20303" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1299:20303;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1299:20304" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1299:20304;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1299:20304;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1299:20304;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20304;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1299:20304;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20304;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1299:20304;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20304;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1299:20304;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20304;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill" data-node="1537:19698" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:128px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [top:13px] [width:134px]">
        <div data-figma="timer" data-node="I1537:19698;1204:55724" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1537:19698;1204:55725" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19698;1204:55725"]
        }} />
          <span data-figma="Vector" data-node="I1537:19698;1204:55726" className="[width:4.67px] [height:6.11px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19698;1204:55726"]
        }} />
        </div>
        <p data-figma="label" data-node="I1537:19698;1204:55727" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19698;1204:55727"]
        }} /></p>
        <p data-figma="time" data-node="I1537:19698;1204:55728" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"05:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19698;1204:55728"]
        }} /></p>
      </div>
    </div>;
  if (type === "수정본 2") return <div data-figma="type=수정본 2" data-node="1299:20314" className={cx("[display:inline-flex] [justify-content:center] [align-items:center] [gap:6px] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame" data-node="1299:20308" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
        <span data-figma="Vector" data-node="1299:20309" className="[width:2px] [height:4px] [position:absolute] [left:1px] [top:7px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20309"]
      }} />
        <span data-figma="Vector" data-node="1299:20310" className="[width:2px] [height:10px] [position:absolute] [left:5px] [top:4px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20310"]
      }} />
        <span data-figma="Vector" data-node="1299:20311" className="[width:2px] [height:16px] [position:absolute] [left:9px] [top:1px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20311"]
      }} />
        <span data-figma="Vector" data-node="1299:20312" className="[width:2px] [height:10px] [position:absolute] [left:13px] [top:4px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20312"]
      }} />
      </div>
      <p data-figma="대화 중 4" data-node="1299:20313" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] [flex-shrink:0] [width:50px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:-0.096px] [left:0px]">{"대화 중 4"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20313"]
      }} /></p>
    </div>;
  if (type === "수정본 3") return <div data-figma="type=수정본 3" data-node="1299:20319" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_24px] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1299:20316" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1299:20316;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <span data-figma="모드 토글" data-node="1299:20317" data-icon-fallback="모드-그리드" className="[position:relative] [height:32px] [flex-shrink:0] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1299:20317"]
    }} />
      <div data-figma="Timer Pill / 해 뜨기까지" data-node="1299:20318" data-instance-of="Timer Pill · 해 뜨기까지 (20분 기준)" className="[display:flex] [height:32px] [padding:0_14px_0_12px] [align-items:center] [gap:6px] [position:absolute] [left:144px] [bottom:11px] [border-radius:20px] [background:var(--bg-elevated,_#222628)] [top:13px] [width:102px]">
        <div data-figma="timer" data-node="I1299:20318;3032:1628" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1299:20318;3032:1629" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:20318;3032:1629"]
        }} />
          <span data-figma="Vector" data-node="I1299:20318;3032:1630" className="[width:4.44px] [height:4.67px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:20318;3032:1630"]
        }} />
        </div>
        <p data-figma="label" data-node="I1299:20318;3032:1631" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:15px] [flex-shrink:0] [width:56px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해가 떴어요"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:20318;3032:1631"]
        }} /></p>
      </div>
    </div>;
  if (type === "수정본 4") return <div data-figma="type=수정본 4" data-node="1299:31140" className={cx("[display:flex] [width:390px] [height:56px] [padding:0_24px] [justify-content:space-between] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Icon / Line" data-node="1299:31137" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
        <Icon data-figma="chevron-left" data-node="I1299:31137;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
      </div>
      <div data-figma="모드 토글" data-node="1299:31138" data-instance-of="모드 토글" className="[display:flex] [padding:2px_var(--spacing-2,_3px)] [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] [border-radius:16px] [background:var(--bg-overlay-60,_rgba(10,_11,_12,_0.60))] [flex-shrink:0]">
        <div data-figma="그리드" data-node="I1299:31138;69:456" className="[display:flex] [width:40px] [height:28px] [justify-content:center] [align-items:center] [flex-shrink:0] [overflow:hidden]">
          <div data-figma="icon/그리드" data-node="I1299:31138;69:457" className="[width:18px] [height:18px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1299:31138;69:458" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:31138;69:458"]
          }} />
            <span data-figma="Vector" data-node="I1299:31138;69:459" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:2.25px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:31138;69:459"]
          }} />
            <span data-figma="Vector" data-node="I1299:31138;69:460" className="[width:6px] [height:6px] [position:absolute] [left:2.25px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:31138;69:460"]
          }} />
            <span data-figma="Vector" data-node="I1299:31138;69:461" className="[width:6px] [height:6px] [position:absolute] [left:9.75px] [top:9.75px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:31138;69:461"]
          }} />
          </div>
        </div>
      </div>
      <div data-figma="Timer Pill" data-node="1537:19716" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="[display:flex] [height:32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [position:absolute] [left:128px] [bottom:11px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [top:13px] [width:134px]">
        <div data-figma="timer" data-node="I1537:19716;1204:55724" className="[width:14px] [height:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1537:19716;1204:55725" className="[width:12.25px] [height:12.25px] [position:absolute] [left:0.88px] [top:0.88px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19716;1204:55725"]
        }} />
          <span data-figma="Vector" data-node="I1537:19716;1204:55726" className="[width:4.67px] [height:6.11px] [position:absolute] [left:7px] [top:2.33px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19716;1204:55726"]
        }} />
        </div>
        <p data-figma="label" data-node="I1537:19716;1204:55727" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19716;1204:55727"]
        }} /></p>
        <p data-figma="time" data-node="I1537:19716;1204:55728" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"05:12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1537:19716;1204:55728"]
        }} /></p>
      </div>
    </div>;
  return null;
}