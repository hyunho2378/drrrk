// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:89402 "받은 배지" (해시 48e992a9)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { ReactionButton } from './ReactionButton';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function ReceivedBadges({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:89401" className={cx("flex w-[342px] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-9,_10px)] relative overflow-hidden", className)} style={style}>
      <p data-figma="받은 배지 4" data-node="1204:89395" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[61px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"받은 배지 4"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:89395"]
      }} /></p>
      <div data-figma="Frame" data-node="1204:89396" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-11,_12px)] shrink-0 overflow-hidden">
        <ReactionButton data-figma="Reaction Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"공감 48"} />
        <ReactionButton data-figma="Reaction Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"응원 48"} />
        <div data-figma="Reaction Button" data-node="1204:89399" data-instance-of="Reaction Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] [border-radius:43.636px] [border:1.477px_solid_transparent] shrink-0 overflow-hidden relative [isolation:isolate]">
          <span aria-hidden="true" className="absolute left-[-1.4769231081008911px] top-[-1.4769231081008911px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
          __html: "<svg data-px=\"\" data-box=\"\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"48\" height=\"48\" rx=\"24\" style=\"fill:var(--brand-primary-39, #36D2FF63)\"/><defs><clipPath id=\"c1204_89399\"><rect width=\"48\" height=\"48\" rx=\"24\"/></clipPath></defs><g clip-path=\"url(#c1204_89399)\"><path d=\"M0 24 M48 24 M48 24 M0 24 M24 0 M48 24 M24 48 M0 24 M24 48 L24 46.5231 C11.5608 46.5231 1.47692 36.4392 1.47692 24 L0 24 L-1.47692 24 C-1.47692 38.0705 9.92948 49.4769 24 49.4769 L24 48 Z M48 24 L46.5231 24 C46.5231 36.4392 36.4392 46.5231 24 46.5231 L24 48 L24 49.4769 C38.0705 49.4769 49.4769 38.0705 49.4769 24 L48 24 Z M24 0 L24 1.47692 C36.4392 1.47692 46.5231 11.5608 46.5231 24 L48 24 L49.4769 24 C49.4769 9.92948 38.0705 -1.47692 24 -1.47692 L24 0 Z M24 0 L24 -1.47692 C9.92948 -1.47692 -1.47692 9.92948 -1.47692 24 L0 24 L1.47692 24 C1.47692 11.5608 11.5608 1.47692 24 1.47692 L24 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--brand-primary, #36D2FF)\"/></g></svg>"
        }} />
          <div data-figma="Mask group" data-node="I1204:89399;1204:85363" data-mask={"{\"x\":0,\"y\":0,\"g\":[{\"r\":\"NONZERO\",\"d\":\"M18.1814 8.34814 L18.7664 2.52019 L18.7664 0 L12.3084 2.52019 L7.98812 8.34814 L0 9.72075 L0 36.5653 L29.4773 36.5653 L29.4773 19.014 L26.192 12.0384 L23.1318 12.7585 L21.3091 13.141 L18.1814 8.34814 Z\"}]}"} className="w-[29.477px] h-[36.565px] shrink-0 relative [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-size:29.48px_36.57px] [-webkit-mask-size:29.48px_36.57px]" style={{
          "maskImage": "url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2229.48%22%20height%3D%2236.57%22%20viewBox%3D%220%200%2029.48%2036.57%22%3E%3Cpath%20transform%3D%22translate(0%200)%22%20d%3D%22M18.1814%208.34814%20L18.7664%202.52019%20L18.7664%200%20L12.3084%202.52019%20L7.98812%208.34814%20L0%209.72075%20L0%2036.5653%20L29.4773%2036.5653%20L29.4773%2019.014%20L26.192%2012.0384%20L23.1318%2012.7585%20L21.3091%2013.141%20L18.1814%208.34814%20Z%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E\")",
          "WebkitMaskImage": "url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2229.48%22%20height%3D%2236.57%22%20viewBox%3D%220%200%2029.48%2036.57%22%3E%3Cpath%20transform%3D%22translate(0%200)%22%20d%3D%22M18.1814%208.34814%20L18.7664%202.52019%20L18.7664%200%20L12.3084%202.52019%20L7.98812%208.34814%20L0%209.72075%20L0%2036.5653%20L29.4773%2036.5653%20L29.4773%2019.014%20L26.192%2012.0384%20L23.1318%2012.7585%20L21.3091%2013.141%20L18.1814%208.34814%20Z%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E\")"
        }}>
            <div data-figma="p_OPENAI_IMAGE_01M5KEJWD26P7FGYG0P7G7AKWP 1" data-node="I1204:89399;1204:85365" data-img={"{\"src\":\"./assets/images/95b00586701c05d92a766dc58abb2b0c5fbf98c0.png\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[69.125px] h-[46.084px] [aspect-ratio:3/2] absolute left-[-19.73px] top-[-3.78px]" style={{
            "background": "url(./assets/images/95b00586701c05d92a766dc58abb2b0c5fbf98c0.png) 50% / cover no-repeat"
          }} />
          </div>
        </div>
        <ReactionButton data-figma="Reaction Button" className="flex w-[48px] h-[48px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"웃김 48"} />
      </div>
    </div>;
  return null;
}