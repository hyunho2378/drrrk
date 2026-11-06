// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1405:46964 "Thumb" (해시 38dec0ae)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Thumb({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1405:46963" className={cx("flex w-[24px] h-[24px] [padding:2px_1px_0_1px] [justify-content:center] [align-items:center] [border-radius:999px] relative overflow-hidden", className)} style={style}>
      <div data-figma="Chair" data-node="1405:46962" data-instance-of="Chair Illustration" className="flex w-[22px] h-[22px] [justify-content:center] [align-items:center] shrink-0 absolute left-[1px] top-[2px]">
        <div data-figma="image 1208091458" data-node="I1405:46962;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[22px] h-[22px] shrink-0 [aspect-ratio:1/1] absolute left-[0px] top-[0px]" style={{
        "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp) 50% / cover no-repeat"
      }} />
      </div>
    </div>;
  return null;
}