// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1297:10869 "bottom_navigation" (해시 319d613b)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { NavigationTabItem } from './NavigationTabItem';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function BottomNavigation({
  active = "home",
  style,
  className
}) {
  if (active === "home") return <div data-figma="active=home" data-node="1297:10870" className={cx("[width:390px] [height:84px] [background:var(--bg-surface,_#121415)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="top line" data-node="1297:10871" className="[width:390px] [height:1px] [background:var(--bg-elevated,_#222628)] [position:absolute] [left:0px] [top:0px]" />
      <NavigationTabItem data-figma="tab/홈" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:20.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]" name={"home"} state={"selected"} />
      <div data-figma="tab/라이브" data-node="1405:40252" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:118.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40252;1405:39877" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40252;1405:39878" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="live" data-node="I1405:40252;1405:39878;1299:25493" name="live" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="라이브" data-node="I1405:40252;1405:39879" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:31px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"라이브"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40252;1405:39879"]
        }} /></p>
      </div>
      <div data-figma="tab/커뮤니티" data-node="1405:40258" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:215.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40258;1405:39991" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40258;1405:39992" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="community" data-node="I1405:40258;1405:39992;1299:25501" name="community" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="커뮤니티" data-node="I1405:40258;1405:39993" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:41px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"커뮤니티"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40258;1405:39993"]
        }} /></p>
      </div>
      <div data-figma="tab/MY" data-node="1405:40264" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:313.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40264;1405:40125" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40264;1405:40126" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="my" data-node="I1405:40264;1405:40126;1299:25509" name="my" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="MY" data-node="I1405:40264;1405:40127" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:19px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"MY"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40264;1405:40127"]
        }} /></p>
      </div>
    </div>;
  if (active === "live") return <div data-figma="active=live" data-node="1297:10890" className={cx("[width:390px] [height:84px] [background:var(--bg-surface,_#121415)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="top line" data-node="1297:10891" className="[width:390px] [height:1px] [background:var(--bg-elevated,_#222628)] [position:absolute] [left:0px] [top:0px]" />
      <NavigationTabItem data-figma="tab/홈" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:20.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]" name={"home"} state={"default"} />
      <NavigationTabItem data-figma="tab/라이브" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:118.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]" name={"live"} state={"selected"} />
      <div data-figma="tab/커뮤니티" data-node="1405:40282" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:215.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40282;1405:39991" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40282;1405:39992" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="community" data-node="I1405:40282;1405:39992;1299:25501" name="community" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="커뮤니티" data-node="I1405:40282;1405:39993" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:41px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"커뮤니티"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40282;1405:39993"]
        }} /></p>
      </div>
      <div data-figma="tab/MY" data-node="1405:40288" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:313.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40288;1405:40125" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40288;1405:40126" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="my" data-node="I1405:40288;1405:40126;1299:25509" name="my" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="MY" data-node="I1405:40288;1405:40127" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:19px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"MY"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40288;1405:40127"]
        }} /></p>
      </div>
    </div>;
  if (active === "community") return <div data-figma="active=community" data-node="1297:10910" className={cx("[width:390px] [height:84px] [background:var(--bg-surface,_#121415)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="top line" data-node="1297:10911" className="[width:390px] [height:1px] [background:var(--bg-elevated,_#222628)] [position:absolute] [left:0px] [top:0px]" />
      <NavigationTabItem data-figma="tab/홈" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:20.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]" name={"home"} state={"default"} />
      <div data-figma="tab/라이브" data-node="1405:40300" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:118.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40300;1405:39877" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40300;1405:39878" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="live" data-node="I1405:40300;1405:39878;1299:25493" name="live" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="라이브" data-node="I1405:40300;1405:39879" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:31px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"라이브"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40300;1405:39879"]
        }} /></p>
      </div>
      <NavigationTabItem data-figma="tab/커뮤니티" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:215.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]" name={"community"} state={"selected"} />
      <div data-figma="tab/MY" data-node="1405:40312" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:313.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40312;1405:40125" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40312;1405:40126" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="my" data-node="I1405:40312;1405:40126;1299:25509" name="my" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="MY" data-node="I1405:40312;1405:40127" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:19px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"MY"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40312;1405:40127"]
        }} /></p>
      </div>
    </div>;
  if (active === "my") return <div data-figma="active=my" data-node="1297:10930" className={cx("[width:390px] [height:84px] [background:var(--bg-surface,_#121415)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="top line" data-node="1297:10931" className="[width:390px] [height:1px] [background:var(--bg-elevated,_#222628)] [position:absolute] [left:0px] [top:0px]" />
      <NavigationTabItem data-figma="tab/홈" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:20.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]" name={"home"} state={"default"} />
      <div data-figma="tab/라이브" data-node="1405:40324" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:118.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40324;1405:39877" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40324;1405:39878" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="live" data-node="I1405:40324;1405:39878;1299:25493" name="live" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="라이브" data-node="I1405:40324;1405:39879" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:31px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"라이브"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40324;1405:39879"]
        }} /></p>
      </div>
      <div data-figma="tab/커뮤니티" data-node="1405:40330" data-instance-of="Navigation / Tab Item" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:215.75px] [top:10px] [width:56px] [height:53px] [overflow:hidden]">
        <div data-figma="icon wrap" data-node="I1405:40330;1405:39991" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <div data-figma="Icon / Line" data-node="I1405:40330;1405:39992" data-instance-of="Icon / Line" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
            <Icon data-figma="community" data-node="I1405:40330;1405:39992;1299:25501" name="community" color="var(--text-tertiary, #6E767C)" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
        </div>
        <p data-figma="커뮤니티" data-node="I1405:40330;1405:39993" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:41px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"커뮤니티"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1405:40330;1405:39993"]
        }} /></p>
      </div>
      <NavigationTabItem data-figma="tab/MY" className="[display:inline-flex] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:313.25px] [top:10px] [width:56px] [height:53px] [overflow:hidden]" name={"my"} state={"selected"} />
    </div>;
  return null;
}