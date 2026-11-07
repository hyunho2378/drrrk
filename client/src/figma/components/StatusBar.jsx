// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89834 "Status Bar" (해시 99923c29)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function StatusBar({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:55342" className={cx("[display:flex] [width:390px] [height:63.31px] [padding:20.258px_33.09px_20.287px_40.52px] [justify-content:flex-end] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Group 3" data-node="1204:55343" className="[width:316.391px] [height:22.767px] [flex-shrink:0] [position:absolute] [left:40.52px] [top:20.26px]">
        <div data-figma="Right Side" data-node="1204:55344" className="[width:77.07px] [height:12.9px] [position:absolute] [left:239.32px] [top:5.06px]">
          <div data-figma="Battery" data-node="1204:55345" className="[width:27.69px] [height:12.9px] [position:absolute] [left:49.38px] [top:0px]">
            <span data-figma="Rectangle" data-node="1204:55346" className="[width:25.04px] [height:12.9px] [position:absolute] [left:0px] [top:0px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:55346"]
          }} />
            <span data-figma="Combined Shape" data-node="1204:55347" className="[width:1.51px] [height:4.55px] [position:absolute] [left:26.18px] [top:4.18px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:55347"]
          }} />
            <span data-figma="Rectangle" data-node="1204:55348" className="[width:20.49px] [height:8.35px] [position:absolute] [left:2.28px] [top:2.28px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:55348"]
          }} />
          </div>
          <span data-figma="Wifi" data-node="1204:55349" className="[width:17.39px] [height:12.48px] [position:absolute] [left:26.11px] [top:0px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55349"]
        }} />
          <span data-figma="Mobile Signal" data-node="1204:55350" className="[width:19.35px] [height:12.14px] [position:absolute] [left:0px] [top:0.38px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55350"]
        }} />
        </div>
        <span data-figma="9:41" data-node="1204:55351" role="img" aria-label="9:41" className="[width:61.47px] [height:22.77px] [position:absolute] [left:0px] [top:0px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [flex-shrink:0] [line-height:0] [display:block]" dangerouslySetInnerHTML={{
        __html: svg["1204:55351"]
      }} />
      </div>
    </div>;
  return null;
}