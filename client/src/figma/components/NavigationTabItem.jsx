// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:40245 "Navigation / Tab Item" (해시 517dbd09)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function NavigationTabItem({
  name = "home",
  state = "default",
  style,
  className
}) {
  if (name === "home" && state === "default") return <div data-figma="name=home, state=default" data-node="1405:39766" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:39763" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:39764" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="home-chair" data-node="I1405:39764;1299:25485" name="home-chair-1463-24062" color="var(--text-tertiary, #6E767C)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="홈" data-node="1405:39765" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[11px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"홈"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:39765"]
      }} /></p>
    </div>;
  if (name === "home" && state === "selected") return <div data-figma="name=home, state=selected" data-node="1405:39820" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:39817" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:39818" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="home-chair" data-node="I1405:39818;1299:30463" name="home-chair-1463-24062" color="var(--brand-primary, #36D2FF)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="홈" data-node="1405:39819" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[11px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"홈"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:39819"]
      }} /></p>
    </div>;
  if (name === "live" && state === "default") return <div data-figma="name=live, state=default" data-node="1405:39880" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:39877" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:39878" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="live" data-node="I1405:39878;1299:25493" name="live" color="var(--text-tertiary, #6E767C)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="라이브" data-node="1405:39879" data-outline="" className="[color:var(--text-tertiary,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[31px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"라이브"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:39879"]
      }} /></p>
    </div>;
  if (name === "live" && state === "selected") return <div data-figma="name=live, state=selected" data-node="1405:39935" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:39932" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:39933" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="live" data-node="I1405:39933;1299:30475" name="live" color="var(--brand-primary, #36D2FF)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="라이브" data-node="1405:39934" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[31px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"라이브"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:39934"]
      }} /></p>
    </div>;
  if (name === "community" && state === "default") return <div data-figma="name=community, state=default" data-node="1405:39994" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:39991" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:39992" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="community" data-node="I1405:39992;1299:25501" name="community" color="var(--text-tertiary, #6E767C)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="커뮤니티" data-node="1405:39993" data-outline="" className="[color:var(--text-tertiary,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[41px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"커뮤니티"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:39993"]
      }} /></p>
    </div>;
  if (name === "community" && state === "selected") return <div data-figma="name=community, state=selected" data-node="1405:40082" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:40079" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:40080" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="community" data-node="I1405:40080;1299:30487" name="community" color="var(--brand-primary, #36D2FF)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="커뮤니티" data-node="1405:40081" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[41px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"커뮤니티"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:40081"]
      }} /></p>
    </div>;
  if (name === "my" && state === "default") return <div data-figma="name=my, state=default" data-node="1405:40128" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:40125" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:40126" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="my" data-node="I1405:40126;1299:25509" name="my" color="var(--text-tertiary, #6E767C)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="MY" data-node="1405:40127" data-outline="" className="[color:var(--text-tertiary,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[19px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"MY"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:40127"]
      }} /></p>
    </div>;
  if (name === "my" && state === "selected") return <div data-figma="name=my, state=selected" data-node="1405:40202" className={cx("inline-flex [flex-direction:column] [justify-content:center] [align-items:center] gap-[4px] relative overflow-hidden", className)} style={style}>
      <div data-figma="icon wrap" data-node="1405:40199" className="flex w-[56px] h-[32px] [padding:4px_16px] [justify-content:center] [align-items:center] [border-radius:14px] shrink-0 relative overflow-hidden">
        <div data-figma="Icon / Line" data-node="1405:40200" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[16px] top-[4px]">
          <Icon data-figma="my" data-node="I1405:40200;1299:30499" name="my" color="var(--brand-primary, #36D2FF)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <p data-figma="MY" data-node="1405:40201" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[19px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"MY"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1405:40201"]
      }} /></p>
    </div>;
  return null;
}