// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:82792 "Logo" (해시 1ad0f3bc)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function Logo({
  type = "워드마크",
  style,
  className
}) {
  if (type === "워드마크") return <div data-figma="type=워드마크" data-node="1204:82791" className={cx("[width:90.13px] [height:34px] [aspect-ratio:90.13/34.00] [position:relative] [overflow:hidden]", className)} style={style}>
      <span data-figma="Vector" data-node="1204:82786" className="[width:30.55px] [height:31.51px] [position:absolute] [left:0px] [top:2.49px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82786"]
    }} />
      <span data-figma="Vector" data-node="1204:82787" className="[width:24.11px] [height:31.9px] [position:absolute] [left:66.02px] [top:0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82787"]
    }} />
      <span data-figma="Vector" data-node="1204:82788" className="[width:19.55px] [height:20.75px] [position:absolute] [left:25.14px] [top:10.95px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82788"]
    }} />
      <span data-figma="Vector" data-node="1204:82789" className="[width:18.38px] [height:19.84px] [position:absolute] [left:39.81px] [top:9.97px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82789"]
    }} />
      <span data-figma="Vector" data-node="1204:82790" className="[width:18.38px] [height:19.77px] [position:absolute] [left:53.4px] [top:9.57px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82790"]
    }} />
    </div>;
  if (type === "모션") return <div data-figma="type=모션" data-node="1204:89780" className={cx("[display:flex] [width:1920px] [height:1080px] [justify-content:center] [align-items:center] [position:relative] [overflow:hidden]", className)} style={style}>
      <video data-figma="logo motion 1" data-node="1204:89779" src="/assets/video/bcefe2ea4f30096fe31ef0bb4939769a0340321e.mp4" poster="./assets/raster/1204-89779.webp" autoPlay muted loop playsInline className="[width:1920px] [height:1080px] [flex-shrink:0] [aspect-ratio:16/9] [position:absolute] [left:0px] [top:0px] [display:block] [object-fit:cover]" />
    </div>;
  return null;
}