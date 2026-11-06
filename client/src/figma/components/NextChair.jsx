// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:85317 "다음 의자" (해시 b2e44311)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(' ');
export function NextChair({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:85316" className={cx("inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Chair Illustration" data-node="1204:85314" data-instance-of="Chair Illustration" className="flex w-[24px] h-[24px] [justify-content:center] [align-items:center] [opacity:0.5] shrink-0 relative">
        <div data-figma="image 1208091460" data-node="I1204:85314;1204:89693" data-img={"{\"src\":\"./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.png\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[24px] h-[24px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
        "background": "url(./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.png) 50% / cover no-repeat"
      }} />
      </div>
      <p data-figma="0.8° 더 따뜻해지면 꿀잠 솔솔 리클라이너가 열려요" data-node="1204:85315" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[226px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"0.8° 더 따뜻해지면 꿀잠 솔솔 리클라이너가 열려요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85315"]
      }} /></p>
    </div>;
  return null;
}