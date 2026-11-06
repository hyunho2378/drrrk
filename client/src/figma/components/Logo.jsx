// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:82792 "Logo" (해시 1ad0f3bc)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Logo({
  type = "워드마크",
  style,
  className
}) {
  if (type === "워드마크") return <div data-figma="type=워드마크" data-node="1204:82791" className={cx("w-[90.13px] h-[34px] [aspect-ratio:90.13/34.00] relative overflow-hidden", className)} style={style}>
      <span data-figma="Vector" data-node="1204:82786" className="w-[30.55px] h-[31.51px] absolute left-[0px] top-[2.49px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82786"]
    }} />
      <span data-figma="Vector" data-node="1204:82787" className="w-[24.11px] h-[31.9px] absolute left-[66.02px] top-[0px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82787"]
    }} />
      <span data-figma="Vector" data-node="1204:82788" className="w-[19.55px] h-[20.75px] absolute left-[25.14px] top-[10.95px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82788"]
    }} />
      <span data-figma="Vector" data-node="1204:82789" className="w-[18.38px] h-[19.84px] absolute left-[39.81px] top-[9.97px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82789"]
    }} />
      <span data-figma="Vector" data-node="1204:82790" className="w-[18.38px] h-[19.77px] absolute left-[53.4px] top-[9.57px] [line-height:0]" dangerouslySetInnerHTML={{
      __html: svg["1204:82790"]
    }} />
    </div>;
  if (type === "모션") return <div data-figma="type=모션" data-node="1204:89780" className={cx("flex w-[1920px] h-[1080px] [justify-content:center] [align-items:center] relative overflow-hidden", className)} style={style}>
      <video data-figma="logo motion 1" data-node="1204:89779" src="./assets/video/bcefe2ea4f30096fe31ef0bb4939769a0340321e.mp4" poster="./assets/raster/1204-89779.jpg" autoPlay muted loop playsInline className="w-[1920px] h-[1080px] shrink-0 [aspect-ratio:16/9] absolute left-[0px] top-[0px] block [object-fit:cover]" />
    </div>;
  return null;
}