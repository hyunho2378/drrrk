// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:55428 "Participant Tile / 그리드" (해시 31b36f24)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function ParticipantTileGrid({
  chair = "새벽2시 택배상자",
  state = "speaking",
  badge = "default",
  style,
  className
}) {
  if (chair === "새벽2시 택배상자" && state === "speaking" && badge === "default") return <div data-figma="chair=새벽2시 택배상자, state=speaking, badge=default" data-node="1204:55429" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"165\" height=\"147\" viewBox=\"0 0 165 147\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"165\" height=\"147\" rx=\"16\" style=\"fill:var(--bg-elevated, #222628)\"/><defs><clipPath id=\"c1204_55429\"><rect width=\"165\" height=\"147\" rx=\"16\"/></clipPath></defs><g clip-path=\"url(#c1204_55429)\"><path d=\"M16 0 L16 2.5 L149 2.5 L149 0 L149 -2.5 L16 -2.5 L16 0 Z M165 16 L162.5 16 L162.5 131 L165 131 L167.5 131 L167.5 16 L165 16 Z M149 147 L149 144.5 L16 144.5 L16 147 L16 149.5 L149 149.5 L149 147 Z M0 131 L2.5 131 L2.5 16 L0 16 L-2.5 16 L-2.5 131 L0 131 Z M16 147 L16 144.5 C8.54416 144.5 2.5 138.456 2.5 131 L0 131 L-2.5 131 C-2.5 141.217 5.78274 149.5 16 149.5 L16 147 Z M165 131 L162.5 131 C162.5 138.456 156.456 144.5 149 144.5 L149 147 L149 149.5 C159.217 149.5 167.5 141.217 167.5 131 L165 131 Z M149 0 L149 2.5 C156.456 2.5 162.5 8.54416 162.5 16 L165 16 L167.5 16 C167.5 5.78273 159.217 -2.5 149 -2.5 L149 0 Z M16 0 L16 -2.5 C5.78273 -2.5 -2.5 5.78274 -2.5 16 L0 16 L2.5 16 C2.5 8.54416 8.54416 2.5 16 2.5 L16 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-success, #2EE59D)\"/></g></svg>"
    }} />
      <div data-figma="Frame 2147249132" data-node="1204:55430" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:55431" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091460" data-node="1299:24941" data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [transform:scaleX(-1)] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]">
          <div data-figma="box" data-node="I1299:24941;1204:89691" data-img={"{\"src\":\"./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.webp) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:55433" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:38px] [top:103px] [width:89px] [height:21px] [overflow:hidden]">
        <p data-figma="새벽2시 택배상자" data-node="1204:55434" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:73px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"새벽2시 택배상자"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55434"]
        }} /></p>
      </div>
      <div data-figma="voice wave" data-node="1204:55435" className="[width:3px] [height:6px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:129px] [top:19px]" />
      <div data-figma="voice wave" data-node="1204:55436" className="[width:3px] [height:11px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:134px] [top:16.5px]" />
      <div data-figma="voice wave" data-node="1204:55437" className="[width:3px] [height:16px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:139px] [top:14px]" />
      <div data-figma="voice wave" data-node="1204:55438" className="[width:3px] [height:11px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:144px] [top:16.5px]" />
      <div data-figma="voice wave" data-node="1204:55439" className="[width:3px] [height:6px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:149px] [top:19px]" />
    </div>;
  if (chair === "따뜻한 가죽소파29" && state === "default" && badge === "default") return <div data-figma="chair=따뜻한 가죽소파29, state=default, badge=default" data-node="1204:55440" className={cx("[display:flex] [width:165px] [height:147px] [padding:18px_35px_23px_35px] [flex-direction:column] [align-items:center] [gap:13px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249132" data-node="1204:55441" className="[width:72px] [height:72px] [flex-shrink:0] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:55442" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091459" data-node="1299:24943" data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]">
          <div data-figma="image 1208091458" data-node="I1299:24943;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp\",\"mode\":\"CROP\",\"tf\":[[1.1916682720184326,0,-0.0958341509103775],[0,1.1916682720184326,-0.09930568933486938]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp) 5.79px 6px / 83.916% 83.916% no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:55444" className="[display:flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:35px] [top:103px] [width:95px] [height:21px] [overflow:hidden]">
        <p data-figma="따뜻한 가죽소파29" data-node="1204:55445" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:79px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55445"]
        }} /></p>
      </div>
    </div>;
  if (chair === "딱딱한 나무 스툴12" && state === "muted" && badge === "default") return <div data-figma="chair=딱딱한 나무 스툴12, state=muted, badge=default" data-node="1204:55446" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249134" data-node="1204:55447" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:55448" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091458" data-node="1299:24945" data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [transform:scaleX(-1)] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]">
          <div data-figma="stool" data-node="I1299:24945;1204:89687" data-img={"{\"src\":\"./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp\",\"mode\":\"CROP\",\"tf\":[[1.0860475301742554,0,-0.043023731559515],[0,1.0860475301742554,-0.04525198042392731]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp) 2.852px 3px / 92.077% 92.077% no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:55450" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:35px] [top:103px] [width:95px] [height:21px] [overflow:hidden]">
        <p data-figma="딱딱한 나무 스툴12" data-node="1204:55451" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:79px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"딱딱한 나무 스툴12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55451"]
        }} /></p>
      </div>
      <div data-figma="음소거 배지" data-node="1204:55452" className="[display:flex] [width:28px] [height:28px] [padding:6px] [justify-content:center] [align-items:center] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-base-70,_rgba(0,_0,_0,_0.70))] [position:absolute] [left:12px] [top:12px] [overflow:hidden]">
        <div data-figma="Frame" data-node="1204:55453" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:6px] [top:6px] [overflow:hidden]">
          <span data-figma="Vector" data-node="1204:55454" className="[width:4px] [height:7.33px] [position:absolute] [left:6px] [top:2px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55454"]
        }} />
          <span data-figma="Vector" data-node="1204:55455" className="[width:8.67px] [height:6.33px] [position:absolute] [left:3.67px] [top:7.67px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55455"]
        }} />
          <span data-figma="slash" data-node="1204:55456" className="[width:10.67px] [height:10.67px] [position:absolute] [left:2.67px] [top:2.67px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55456"]
        }} />
        </div>
      </div>
    </div>;
  if (chair === "푹신푹신 리클라이너17" && state === "default" && badge === "default") return <div data-figma="chair=푹신푹신 리클라이너17, state=default, badge=default" data-node="1204:55457" className={cx("[display:flex] [width:165px] [height:147px] [padding:18px_26px_23px_27px] [flex-direction:column] [align-items:center] [gap:13px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249135" data-node="1204:55458" className="[width:72px] [height:72px] [flex-shrink:0] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:55459" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091458" data-node="1299:24947" data-img={"{\"src\":\"./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp\",\"mode\":\"CROP\",\"tf\":[[1.0857055187225342,0,-0.04285278171300888],[0,1.0857055187225342,-0.04285278171300888]],\"op\":1,\"flip\":\"x\"}"} data-instance-of="Chair Illustration" className="[display:flex] [width:67px] [height:67px] [transform:scaleX(-1)] [justify-content:center] [align-items:center] [position:absolute] [left:2.5px] [top:3px]" style={{
        "background": "url(./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp) 2.644px 2.644px / 92.106% 92.106% no-repeat"
      }}>
          <div data-figma="image 1208091460" data-node="I1299:24947;1204:89693" data-img={"{\"src\":\"./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:67px] [height:67px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:55461" className="[display:flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:27px] [top:103px] [width:112px] [height:21px] [overflow:hidden]">
        <p data-figma="푹신푹신 리클라이너17" data-node="1204:55462" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:96px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"푹신푹신 리클라이너17"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55462"]
        }} /></p>
      </div>
    </div>;
  if (chair === "따뜻한 가죽소파29" && state === "name-tap" && badge === "default") return <div data-figma="chair=따뜻한 가죽소파29, state=name-tap, badge=default" data-node="1204:55463" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [position:relative] [overflow:hidden] [isolation:isolate]", className)} style={style}>
      <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
      __html: "<svg data-px=\"\" data-box=\"\" width=\"165\" height=\"147\" viewBox=\"0 0 165 147\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"165\" height=\"147\" rx=\"16\" style=\"fill:var(--bg-elevated, #222628)\"/><defs><clipPath id=\"c1204_55463\"><rect width=\"165\" height=\"147\" rx=\"16\"/></clipPath></defs><g clip-path=\"url(#c1204_55463)\"><path d=\"M16 0 L16 2.5 L149 2.5 L149 0 L149 -2.5 L16 -2.5 L16 0 Z M165 16 L162.5 16 L162.5 131 L165 131 L167.5 131 L167.5 16 L165 16 Z M149 147 L149 144.5 L16 144.5 L16 147 L16 149.5 L149 149.5 L149 147 Z M0 131 L2.5 131 L2.5 16 L0 16 L-2.5 16 L-2.5 131 L0 131 Z M16 147 L16 144.5 C8.54416 144.5 2.5 138.456 2.5 131 L0 131 L-2.5 131 C-2.5 141.217 5.78274 149.5 16 149.5 L16 147 Z M165 131 L162.5 131 C162.5 138.456 156.456 144.5 149 144.5 L149 147 L149 149.5 C159.217 149.5 167.5 141.217 167.5 131 L165 131 Z M149 0 L149 2.5 C156.456 2.5 162.5 8.54416 162.5 16 L165 16 L167.5 16 C167.5 5.78273 159.217 -2.5 149 -2.5 L149 0 Z M16 0 L16 -2.5 C5.78273 -2.5 -2.5 5.78274 -2.5 16 L0 16 L2.5 16 C2.5 8.54416 8.54416 2.5 16 2.5 L16 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--status-success, #2EE59D)\"/></g></svg>"
    }} />
      <div data-figma="Frame 2147249133" data-node="1204:55464" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:55465" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091459" data-node="1299:24949" data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]">
          <div data-figma="image 1208091458" data-node="I1299:24949;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp\",\"mode\":\"CROP\",\"tf\":[[1.1916682720184326,0,-0.0958341509103775],[0,1.1916682720184326,-0.09930568933486938]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp) 5.79px 6px / 83.916% 83.916% no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:55467" className="[display:inline-flex] [padding:var(--spacing-3,_4px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-5xl,_12px)] [border:1.5px_solid_transparent] [position:absolute] [left:34px] [top:103px] [width:98px] [height:26px] [overflow:hidden] [isolation:isolate]">
        <span aria-hidden="true" className="[position:absolute] [left:-1.5px] [top:-1.5px] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"98\" height=\"26\" viewBox=\"0 0 98 26\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"98\" height=\"26\" rx=\"12\" style=\"fill:var(--bg-base-85, #000000D9)\"/><defs><clipPath id=\"c1204_55467\"><rect width=\"98\" height=\"26\" rx=\"12\"/></clipPath></defs><g clip-path=\"url(#c1204_55467)\"><path d=\"M12 0 L12 1.5 L86 1.5 L86 0 L86 -1.5 L12 -1.5 L12 0 Z M98 12 L96.5 12 L96.5 14 L98 14 L99.5 14 L99.5 12 L98 12 Z M86 26 L86 24.5 L12 24.5 L12 26 L12 27.5 L86 27.5 L86 26 Z M0 14 L1.5 14 L1.5 12 L0 12 L-1.5 12 L-1.5 14 L0 14 Z M12 26 L12 24.5 C6.20101 24.5 1.5 19.799 1.5 14 L0 14 L-1.5 14 C-1.5 21.4558 4.54416 27.5 12 27.5 L12 26 Z M98 14 L96.5 14 C96.5 19.799 91.799 24.5 86 24.5 L86 26 L86 27.5 C93.4558 27.5 99.5 21.4558 99.5 14 L98 14 Z M86 0 L86 1.5 C91.799 1.5 96.5 6.20101 96.5 12 L98 12 L99.5 12 C99.5 4.54416 93.4558 -1.5 86 -1.5 L86 0 Z M12 0 L12 -1.5 C4.54416 -1.5 -1.5 4.54416 -1.5 12 L0 12 L1.5 12 C1.5 6.20101 6.20101 1.5 12 1.5 L12 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--brand-primary, #36D2FF)\"/></g></svg>"
      }} />
        <p data-figma="따뜻한 가죽소파29" data-node="1204:55468" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:79px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55468"]
        }} /></p>
      </div>
      <div data-figma="voice wave" data-node="1204:55469" className="[width:3px] [height:6px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:129px] [top:19px]" />
      <div data-figma="voice wave" data-node="1204:55470" className="[width:3px] [height:11px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:134px] [top:16.5px]" />
      <div data-figma="voice wave" data-node="1204:55471" className="[width:3px] [height:16px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:139px] [top:14px]" />
      <div data-figma="voice wave" data-node="1204:55472" className="[width:3px] [height:11px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:144px] [top:16.5px]" />
      <div data-figma="voice wave" data-node="1204:55473" className="[width:3px] [height:6px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:149px] [top:19px]" />
    </div>;
  if (chair === "새벽2시 택배상자" && state === "default" && badge === "default") return <div data-figma="chair=새벽2시 택배상자, state=default, badge=default" data-node="1204:55474" className={cx("[display:flex] [width:165px] [height:147px] [padding:18px_38px_23px_38px] [flex-direction:column] [align-items:center] [gap:13px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249132" data-node="1204:55475" className="[width:72px] [height:72px] [flex-shrink:0] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:55476" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091459" data-node="1299:24951" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp\",\"mode\":\"CROP\",\"tf\":[[1.1916682720184326,0,-0.0958341509103775],[0,1.1916682720184326,-0.09930568933486938]],\"op\":1,\"flip\":\"\"}"} data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]" style={{
        "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp) 5.79px 6px / 83.916% 83.916% no-repeat"
      }}>
          <div data-figma="box" data-node="I1299:24951;1204:89691" data-img={"{\"src\":\"./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/3ce7017af2e5445570968a1ddfceafe220f58ff8.webp) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:55478" className="[display:flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:38px] [top:103px] [width:89px] [height:21px] [overflow:hidden]">
        <p data-figma="새벽2시 택배상자" data-node="1204:55479" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:73px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"새벽2시 택배상자"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55479"]
        }} /></p>
      </div>
    </div>;
  if (chair === "딱딱한 나무 스툴12" && state === "muted" && badge === "alt") return <div data-figma="chair=딱딱한 나무 스툴12, state=muted, badge=alt" data-node="1204:55498" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249134" data-node="1204:55499" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:55500" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091458" data-node="1299:24957" data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [transform:scaleX(-1)] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]">
          <div data-figma="stool" data-node="I1299:24957;1204:89687" data-img={"{\"src\":\"./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp\",\"mode\":\"CROP\",\"tf\":[[1.0860475301742554,0,-0.043023731559515],[0,1.0860475301742554,-0.04525198042392731]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp) 2.852px 3px / 92.077% 92.077% no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:55502" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:35px] [top:103px] [width:95px] [height:21px] [overflow:hidden]">
        <p data-figma="딱딱한 나무 스툴12" data-node="1204:55503" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:79px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"딱딱한 나무 스툴12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55503"]
        }} /></p>
      </div>
      <div data-figma="음소거 배지" data-node="1204:55504" className="[display:flex] [width:28px] [height:28px] [padding:6px] [justify-content:center] [align-items:center] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-base-70,_rgba(0,_0,_0,_0.70))] [position:absolute] [left:125px] [top:12px] [overflow:hidden]">
        <div data-figma="Frame" data-node="1204:55505" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:6px] [top:6px] [overflow:hidden]">
          <span data-figma="Vector" data-node="1204:55506" className="[width:4px] [height:7.33px] [position:absolute] [left:6px] [top:2px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55506"]
        }} />
          <span data-figma="Vector" data-node="1204:55507" className="[width:8.67px] [height:6.33px] [position:absolute] [left:3.67px] [top:7.67px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55507"]
        }} />
          <span data-figma="slash" data-node="1204:55508" className="[width:10.67px] [height:10.67px] [position:absolute] [left:2.67px] [top:2.67px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:55508"]
        }} />
        </div>
      </div>
    </div>;
  if (chair === "참여자 타일 기본" && state === "참여자 타일 딱딱한 나무 스툴12" && badge === "speaking") return <div data-figma="chair=참여자 타일 기본, state=참여자 타일 딱딱한 나무 스툴12, badge=speaking" data-node="1204:86633" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249134" data-node="1204:86624" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:86625" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091458" data-node="1299:24965" data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [transform:scaleX(-1)] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]">
          <div data-figma="stool" data-node="I1299:24965;1204:89687" data-img={"{\"src\":\"./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp\",\"mode\":\"CROP\",\"tf\":[[1.0860475301742554,0,-0.043023731559515],[0,1.0860475301742554,-0.04525198042392731]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/51be0a544b5f3bf3d8e5aeb89fd60564f8dd6017.webp) 2.852px 3px / 92.077% 92.077% no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:86627" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:21.5px] [top:103px] [width:112px] [height:21px] [overflow:hidden]">
        <div data-figma="Frame" data-node="1204:86628" className="[width:12px] [height:12px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="1204:86629" className="[width:3px] [height:5.5px] [position:absolute] [left:4.5px] [top:1.5px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86629"]
        }} />
          <span data-figma="Vector" data-node="1204:86630" className="[width:6.5px] [height:4.75px] [position:absolute] [left:2.75px] [top:5.75px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86630"]
        }} />
          <span data-figma="slash" data-node="1204:86631" className="[width:8px] [height:8px] [position:absolute] [left:2px] [top:2px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86631"]
        }} />
        </div>
        <p data-figma="딱딱한 나무 스툴12" data-node="1204:86632" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:79px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"딱딱한 나무 스툴12"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86632"]
        }} /></p>
      </div>
    </div>;
  if (chair === "참여자 타일 기본" && state === "참여자 타일 따뜻한 가죽소파29" && badge === "speaking") return <div data-figma="chair=참여자 타일 기본, state=참여자 타일 따뜻한 가죽소파29, badge=speaking" data-node="1204:86640" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249132" data-node="1204:86635" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:86636" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091459" data-node="1299:24967" data-instance-of="Chair Illustration" className="[display:flex] [width:72px] [height:72px] [justify-content:center] [align-items:center] [position:absolute] [left:0px] [top:0px]">
          <div data-figma="image 1208091458" data-node="I1299:24967;1204:89689" data-img={"{\"src\":\"./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:72px] [height:72px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/eab22a7a4d5070b5801bb3367d4f0342e5726543.webp) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:86638" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:31px] [top:103px] [width:95px] [height:21px] [overflow:hidden]">
        <p data-figma="따뜻한 가죽소파29" data-node="1204:86639" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:79px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86639"]
        }} /></p>
      </div>
    </div>;
  if (chair === "참여자 타일 기본" && state === "참여자 타일 푹신푹신 리클라이너17" && badge === "speaking") return <div data-figma="chair=참여자 타일 기본, state=참여자 타일 푹신푹신 리클라이너17, badge=speaking" data-node="1204:86647" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249135" data-node="1204:86642" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:86643" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091458" data-node="1299:24969" data-instance-of="Chair Illustration" className="[display:flex] [width:67px] [height:67px] [transform:scaleX(-1)] [justify-content:center] [align-items:center] [position:absolute] [left:2.5px] [top:3px]">
          <div data-figma="image 1208091460" data-node="I1299:24969;1204:89693" data-img={"{\"src\":\"./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:67px] [height:67px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:86645" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:21px] [top:103px] [width:112px] [height:21px] [overflow:hidden]">
        <p data-figma="푹신푹신 리클라이너17" data-node="1204:86646" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:96px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"푹신푹신 리클라이너17"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86646"]
        }} /></p>
      </div>
    </div>;
  if (chair === "참여자 타일 기본" && state === "참여자 타일 새벽2시 택배상자" && badge === "speaking") return <div data-figma="chair=참여자 타일 기본, state=참여자 타일 새벽2시 택배상자, badge=speaking" data-node="1204:86659" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249132" data-node="1204:86649" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:46.5px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:86650" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091460" data-node="1299:24971" data-instance-of="Chair Illustration" className="[display:flex] [width:65px] [height:65px] [justify-content:center] [align-items:center] [position:absolute] [left:3.5px] [top:3px]">
          <img data-figma="box" data-node="I1299:24971;1204:89691" data-px="" data-hires="" alt="" src="./assets/raster/I1299-24971-1204-89691.webp" className="[width:65px] [height:65px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px] [display:block]" />
        </div>
      </div>
      <div data-figma="name" data-node="1204:86652" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:38px] [top:103px] [width:89px] [height:21px] [overflow:hidden]">
        <p data-figma="새벽2시 택배상자" data-node="1204:86653" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:73px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"새벽2시 택배상자"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86653"]
        }} /></p>
      </div>
      <div data-figma="voice wave" data-node="1204:86654" className="[width:3px] [height:6px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:129px] [top:19px]" />
      <div data-figma="voice wave" data-node="1204:86655" className="[width:3px] [height:11px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:134px] [top:16.5px]" />
      <div data-figma="voice wave" data-node="1204:86656" className="[width:3px] [height:16px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:139px] [top:14px]" />
      <div data-figma="voice wave" data-node="1204:86657" className="[width:3px] [height:11px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:144px] [top:16.5px]" />
      <div data-figma="voice wave" data-node="1204:86658" className="[width:3px] [height:6px] [border-radius:var(--radius-s,_2px)] [background:var(--status-success,_#2EE59D)] [position:absolute] [left:149px] [top:19px]" />
    </div>;
  if (chair === "참여자 타일 기본" && state === "참여자 타일 푹신푹신 리클라이너17 165" && badge === "speaking") return <div data-figma="chair=참여자 타일 기본, state=참여자 타일 푹신푹신 리클라이너17 165, badge=speaking" data-node="1204:86673" className={cx("[width:165px] [height:147px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Frame 2147249136" data-node="1204:86668" className="[width:72px] [height:72px] [border-radius:var(--radius-19xl,_600px)] [position:absolute] [left:41px] [top:18px] [overflow:hidden]">
        <div data-figma="image 1208091463" data-node="1204:86669" className="[width:72px] [height:72px] [background:var(--bg-surface,_#121415)] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="image 1208091458" data-node="1299:24975" data-instance-of="Chair Illustration" className="[display:flex] [width:67px] [height:67px] [transform:scaleX(-1)] [justify-content:center] [align-items:center] [position:absolute] [left:2.5px] [top:3px]">
          <div data-figma="image 1208091460" data-node="I1299:24975;1204:89693" data-img={"{\"src\":\"./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:67px] [height:67px] [flex-shrink:0] [aspect-ratio:1/1] [position:absolute] [left:0px] [top:0px]" style={{
          "background": "url(./assets/images/ef3d01c1807348609019737b6ad41d82875319aa.webp) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <div data-figma="name" data-node="1204:86671" className="[display:inline-flex] [padding:var(--spacing-2,_3px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [gap:var(--spacing-4,_5px)] [border-radius:var(--radius-2xl,_8px)] [background:var(--bg-base,_#000)] [position:absolute] [left:27px] [top:103px] [width:112px] [height:21px] [overflow:hidden]">
        <p data-figma="푹신푹신 리클라이너17" data-node="1204:86672" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] [flex-shrink:0] [width:96px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.496px] [left:0px]">{"푹신푹신 리클라이너17"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:86672"]
        }} /></p>
      </div>
    </div>;
  return null;
}