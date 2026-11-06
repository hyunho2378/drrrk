// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:50451 "모달" (해시 6e697c41)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { Button } from './Button';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function ModalAlt({
  variant = "기본",
  style,
  className
}) {
  if (variant === "기본") return <div data-figma="종류=기본" data-node="1405:50450" className={cx("flex w-[326px] [padding:32px_24px] [flex-direction:column] [align-items:center] gap-[20px] [border-radius:24px] [border:1px_solid_transparent] relative overflow-hidden [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="absolute left-[-1px] top-[-1px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"326\" height=\"461\" viewBox=\"0 0 326 461\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"326\" height=\"461\" rx=\"24\" style=\"fill:#121415\"/><defs><clipPath id=\"c1405_50450\"><rect width=\"326\" height=\"461\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1405_50450)\"><path d=\"M24 0 L24 1 L302 1 L302 0 L302 -1 L24 -1 L24 0 Z M326 24 L325 24 L325 437 L326 437 L327 437 L327 24 L326 24 Z M302 461 L302 460 L24 460 L24 461 L24 462 L302 462 L302 461 Z M0 437 L1 437 L1 24 L0 24 L-1 24 L-1 437 L0 437 Z M24 461 L24 460 C11.2974 460 1 449.703 1 437 L0 437 L-1 437 C-1 450.807 10.1929 462 24 462 L24 461 Z M326 437 L325 437 C325 449.703 314.703 460 302 460 L302 461 L302 462 C315.807 462 327 450.807 327 437 L326 437 Z M302 0 L302 1 C314.703 1 325 11.2975 325 24 L326 24 L327 24 C327 10.1929 315.807 -1 302 -1 L302 0 Z M24 0 L24 -1 C10.1929 -1 -1 10.1929 -1 24 L0 24 L1 24 C1 11.2974 11.2975 1 24 1 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:#222628\"/></g></svg>"
    }} />
      <div data-figma="Frame 2147249207" data-node="1405:50433" className="flex [flex-direction:column] [align-items:center] gap-[20px] shrink-0">
        <div data-figma="Frame" data-node="1405:50434" className="flex w-[56px] h-[56px] [padding:12px] [justify-content:center] [align-items:center] [border-radius:28px] [background:var(--brand-subtle,_#06303C)] shrink-0 relative overflow-hidden">
          <Icon data-figma="home-chair" data-node="1405:50435" name="home-chair" color="var(--icon-foreground, #36D2FF)" className="w-[32px] h-[32px] shrink-0 [aspect-ratio:1/1] absolute left-[12px] top-[12px]" />
        </div>
        <div data-figma="Frame 2147249206" data-node="1405:50436" className="flex [flex-direction:column] [align-items:center] gap-[4px] shrink-0">
          <p data-figma="비슷한 고민의 사람들을발견했어요!" data-node="1405:50437" data-outline="" className="[color:#F8F8F8] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[239px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"비슷한 고민의 사람들을발견했어요!"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1405:50437"]
          }} /></p>
          <div data-figma="Frame" data-node="1405:50438" className="flex [align-items:center] gap-[8px] shrink-0 overflow-hidden">
            <p data-figma="지금 바로 함께 앉아서 이야기 할까요?" data-node="1405:50439" data-outline="" className="[color:var(--text-secondary,_var(--text-secondary,_#9AA1A6))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[183px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[0px]">{"지금 바로 함께 앉아서 이야기 할까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1405:50439"]
            }} /></p>
          </div>
        </div>
      </div>
      <div data-figma="Carousel / 2" data-node="1405:50440" className="w-[276px] h-[187px] [aspect-ratio:245/166] [border-radius:20px] [background:#222628] shrink-0 relative overflow-hidden">
        <div data-figma="Scene" data-node="1405:50441" data-img={"{\"src\":\"./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp\",\"mode\":\"CROP\",\"tf\":[[1,0,0],[0,0.40719613432884216,0.351818710565567]],\"op\":1,\"flip\":\"\"}"} className="w-[276px] h-[202px] absolute left-[0px] top-[-9px]" style={{
        "background": "url(./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp) 0px -174.529px / 100% 245.582% no-repeat"
      }} />
        <div data-figma="Fade" data-node="1405:50442" className="w-[276px] h-[187px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] absolute left-[0px] top-[0px]" />
        <p data-figma="Carousel Title" data-node="1405:50443" data-outline="" className="[color:#F8F8F8] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] absolute left-[16px] top-[122px] w-[109px] h-[56px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[-0.28px] left-[0px]">{"부모님이 맨날\n내 앞에서 싸움"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1405:50443"]
        }} /></p>
        <p data-figma="Versus" data-node="1405:50444" data-outline="" className="[color:rgba(248,_248,_248,_0.80)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] absolute left-[16px] top-[98px] w-[78px] h-[18px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.268px] left-[0px]">{"우리 집만 이래?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1405:50444"]
        }} /></p>
        <div data-figma="Frame 2147249140" data-node="1405:50445" className="flex w-[318px] [align-items:center] gap-[131px] absolute left-[12px] top-[13px] h-[25.5px]">
          <div data-figma="Timer Badge" data-node="1405:50446" data-instance-of="Timer Badge · 20분 기준" className="flex [padding:3.75px_8.75px_3.75px_7.5px] [align-items:center] gap-[3.75px] [border-radius:1248.75px] shrink-0 w-[75.25px] h-[25.5px] relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"75.25\" height=\"25.5\" viewBox=\"0 0 75.25 25.5\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"75.25\" height=\"25.5\" rx=\"12.75\" style=\"fill:#000000BF\"/></svg>"
          }} />
            <div data-figma="timer" data-node="I1405:50446;1126:2262" className="w-[16.25px] h-[16.25px] shrink-0 relative overflow-hidden">
              <span data-figma="Vector" data-node="I1405:50446;1126:2263" className="w-[14.22px] h-[14.22px] absolute left-[1.02px] top-[1.01px] [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1405:50446;1126:2263"]
            }} />
            </div>
            <p data-figma="time" data-node="I1405:50446;1126:2265" data-outline="" className="[color:#36D2FF] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13.75px] [font-style:normal] [font-weight:700] [line-height:18px] shrink-0 w-[39px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.005px] left-[0px]">{"00:02"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1405:50446;1126:2265"]
            }} /></p>
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1405:50447" className="flex [align-items:flex-start] gap-[10px] [align-self:stretch] shrink-0 overflow-hidden">
        <Button data-figma="Button / Secondary" className="flex [padding:12px_0] [justify-content:center] [align-items:center] gap-[6px] [flex:1_0_0]" variant={"기본"} />
        <Button data-figma="Button / Danger" className="flex [padding:12px_0] [justify-content:center] [align-items:center] gap-[6px] [flex:1_0_0]" variant={"종류 2"} />
      </div>
    </div>;
  return null;
}