// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:87839 "cells" (해시 76dd315e)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { ChairCell } from './ChairCell';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function ChairCells({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:87816" className={cx("inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] relative overflow-hidden", className)} style={style}>
      <ChairCell data-figma="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0" type={"box"} />
      <ChairCell data-figma="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0" type={"sofa"} />
      <ChairCell data-figma="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0" type={"stool"} />
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:87830" className={cx("inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] relative overflow-hidden", className)} style={style}>
      <div data-figma="추천 줄" data-node="1204:87818" className="flex [justify-content:center] [align-items:flex-start] [gap:var(--spacing-7,_8px)] shrink-0">
        <div data-figma="arrow" data-node="1204:87819" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
          <div data-figma="Icon / Line" data-node="1204:87820" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 [opacity:0.3] absolute left-[0px] top-[24px]">
            <Icon data-figma="chevron-left" data-node="I1204:87820;1299:25581" name="chevron-left" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
        </div>
        <div data-figma="cells" data-node="1204:87821" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-11,_12px)] shrink-0">
          <div data-figma="의자 셀" data-node="1204:87822" data-instance-of="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0">
            <div data-figma="face" data-node="I1204:87822;1204:86731" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] [border-radius:var(--radius-full,_999px)] [background:var(--bg-surface,_#121415)] shrink-0 relative overflow-hidden">
              <div data-figma="chair / box" data-node="I1204:87822;1299:24977" data-instance-of="Chair Illustration" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[0px]">
                <div data-figma="box" data-node="I1204:87822;1299:24977;1204:89691" data-img={"{\"src\":\"./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[72px] h-[72px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
                "background": "url(./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.webp) 50% / cover no-repeat"
              }} />
              </div>
            </div>
            <p data-figma="name" data-node="I1204:87822;1204:86733" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"새벽2시\n택배상자"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1204:87822;1204:86733"]
            }} /></p>
          </div>
          <div data-figma="cell / sofa" data-node="1204:87823" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0">
            <div data-figma="face" data-node="1204:87824" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] [border-radius:var(--radius-full,_999px)] shrink-0 relative overflow-hidden [isolation:isolate]">
              <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
              __html: "<svg data-px=\"\" data-box=\"\" width=\"72\" height=\"72\" viewBox=\"0 0 72 72\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72\" height=\"72\" rx=\"36\" style=\"fill:var(--bg-surface, #121415)\"/><defs><clipPath id=\"c1204_87824\"><rect width=\"72\" height=\"72\" rx=\"36\"/></clipPath></defs><g clip-path=\"url(#c1204_87824)\"><path d=\"M0 36 M72 36 M72 36 M0 36 M36 0 M72 36 M36 72 M0 36 M36 72 L36 70 C17.2223 70 2 54.7777 2 36 L0 36 L-2 36 C-2 56.9868 15.0132 74 36 74 L36 72 Z M72 36 L70 36 C70 54.7777 54.7777 70 36 70 L36 72 L36 74 C56.9868 74 74 56.9868 74 36 L72 36 Z M36 0 L36 2 C54.7777 2 70 17.2223 70 36 L72 36 L74 36 C74 15.0132 56.9868 -2 36 -2 L36 0 Z M36 0 L36 -2 C15.0132 -2 -2 15.0132 -2 36 L0 36 L2 36 C2 17.2223 17.2223 2 36 2 L36 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--brand-primary, #36D2FF)\"/></g></svg>"
            }} />
              <div data-figma="chair / sofa" data-node="1299:24983" data-instance-of="Chair Illustration" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[0px]">
                <div data-figma="image 1208091458" data-node="I1299:24983;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp\",\"mode\":\"CROP\",\"tf\":[[1.1916682720184326,0,-0.0958341509103775],[0,1.1916682720184326,-0.09930568933486938]],\"op\":1,\"flip\":\"\"}"} className="w-[72px] h-[72px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
                "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp) 5.79px 6px / 83.916% 83.916% no-repeat"
              }} />
              </div>
            </div>
            <p data-figma="name" data-node="1204:87826" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[58px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"따뜻한\n가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87826"]
            }} /></p>
          </div>
          <div data-figma="의자 셀" data-node="1204:87827" data-instance-of="의자 셀" className="flex w-[72px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0">
            <div data-figma="face" data-node="I1204:87827;1204:86741" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] [border-radius:var(--radius-full,_999px)] [background:var(--bg-surface,_#121415)] shrink-0 relative overflow-hidden">
              <div data-figma="chair / stool" data-node="I1204:87827;1299:24981" data-instance-of="Chair Illustration" className="flex w-[72px] h-[72px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[0px]">
                <div data-figma="stool" data-node="I1204:87827;1299:24981;1204:89687" data-img={"{\"src\":\"./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp\",\"mode\":\"CROP\",\"tf\":[[1.0860475301742554,0,-0.043023731559515],[0,1.0860475301742554,-0.04525198042392731]],\"op\":1,\"flip\":\"\"}"} className="w-[72px] h-[72px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
                "background": "url(./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp) 2.852px 3px / 92.077% 92.077% no-repeat"
              }} />
              </div>
            </div>
            <p data-figma="name" data-node="I1204:87827;1204:86743" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[58px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"딱딱한\n나무 스툴12"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1204:87827;1204:86743"]
            }} /></p>
          </div>
        </div>
        <div data-figma="arrow" data-node="1204:87828" className="flex w-[24px] h-[72px] [padding:24px_0] [flex-direction:column] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden">
          <div data-figma="Icon / Line" data-node="1204:87829" data-instance-of="Icon / Line" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[24px]">
            <Icon data-figma="chevron-right" data-node="I1204:87829;1299:25589" name="chevron-right" color="var(--text-primary, #F8F8F8)" className="w-[24px] h-[24px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
        </div>
      </div>
    </div>;
  return null;
}