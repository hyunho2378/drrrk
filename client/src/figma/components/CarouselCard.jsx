// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:85754 "Carousel Card" (해시 5fd2774f)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { WatchingBadge } from './WatchingBadge';
import { Icon } from '../Icon';
import svg from '../../assets/svg-map';
const cx = (...a) => a.filter(Boolean).join(" ");
export function CarouselCard({
  type = "1",
  style,
  className
}) {
  if (type === "1") return <div data-figma="type=1" data-node="1204:85724" className={cx("[width:318px] [height:232px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1204:85716" data-img={"{\"src\":\"./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp\",\"mode\":\"CROP\",\"tf\":[[1,0,0],[0,0.40719613432884216,0.351818710565567]],\"op\":1,\"flip\":\"\"}"} className="[width:318px] [height:232px] [position:absolute] [left:0px] [top:0px]" style={{
      "background": "url(./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp) 0px -200.449px / 100% 245.582% no-repeat"
    }} />
      <div data-figma="Fade" data-node="1204:85717" className="[width:318px] [height:232px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1204:85718" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:164px] [width:180px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"둘이 찍은 사진인데\n지만 보정해서 올린 여우"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85718"]
      }} /></p>
      <p data-figma="Versus" data-node="1204:85719" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:140px] [width:102px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"이거 백퍼 질투 맞지?"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85719"]
      }} /></p>
      <div data-figma="보는 중" data-node="1204:85720" className="[display:inline-flex] [padding:var(--spacing-4,_5px)_var(--spacing-9,_10px)_var(--spacing-4,_5px)_var(--spacing-8,_9px)] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [border-radius:var(--radius-full,_999px)] [background:var(--bg-base-70,_rgba(0,_0,_0,_0.70))] [position:absolute] [left:255px] [top:12px] [width:51px] [height:27px] [overflow:hidden]">
        <div data-figma="Icon / Line" data-node="1204:85721" data-instance-of="Icon / Line" className="[display:flex] [width:14px] [height:14px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
          <Icon data-figma="view" data-node="I1204:85721;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="[width:14px] [height:14px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
        <p data-figma="22" data-node="1204:85722" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:14px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"22"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:85722"]
        }} /></p>
      </div>
      <div data-figma="Timer Badge" data-node="1204:85723" data-instance-of="Timer Badge / 20분 기준" className="[display:inline-flex] [padding:4.69px_10.94px_4.69px_9.38px] [justify-content:center] [align-items:center] [gap:4.69px] [border-radius:1560.94px] [position:absolute] [left:12px] [top:12px] [width:105.31px] [height:40.38px] [isolation:isolate]">
        <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"105.31\" height=\"40.38\" viewBox=\"0 0 105.31 40.38\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"105.31\" height=\"40.38\" rx=\"20.19\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
      }} />
        <div data-figma="timer" data-node="I1204:85723;1204:62112" className="[width:20.31px] [height:20.31px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1204:85723;1204:62113" className="[width:17.77px] [height:17.77px] [position:absolute] [left:1.26px] [top:1.27px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:85723;1204:62113"]
        }} />
          <span data-figma="Vector" data-node="I1204:85723;1204:62114" className="[width:6.77px] [height:6.77px] [position:absolute] [left:10.15px] [top:3.38px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:85723;1204:62114"]
        }} />
        </div>
        <p data-figma="time" data-node="I1204:85723;1204:62115" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:22.5px] [font-style:normal] [font-weight:700] [line-height:31px] [letter-spacing:-0.9px] [flex-shrink:0] [width:60px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.31px] [left:0px]">{"04:30"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:85723;1204:62115"]
        }} /></p>
      </div>
    </div>;
  if (type === "2") return <div data-figma="type=2" data-node="1204:85734" className={cx("[width:318px] [height:232px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1204:85726" data-img={"{\"src\":\"./assets/images/1d41632906932dd6811d6990fd7cd0a8fc9724e5.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:318px] [height:232px] [position:absolute] [left:0px] [top:0px]" style={{
      "background": "url(./assets/images/1d41632906932dd6811d6990fd7cd0a8fc9724e5.webp) 50% / cover no-repeat"
    }} />
      <div data-figma="Fade" data-node="1204:85727" className="[width:318px] [height:232px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1204:85728" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:164px] [width:150px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"남친이 1주년 선물로\n다이소 틴트 사줌"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85728"]
      }} /></p>
      <p data-figma="Versus" data-node="1204:85729" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:140px] [width:69px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"헤어질까 말까"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85729"]
      }} /></p>
      <div data-figma="보는 중" data-node="1204:85730" className="[display:inline-flex] [padding:var(--spacing-4,_5px)_var(--spacing-9,_10px)_var(--spacing-4,_5px)_var(--spacing-8,_9px)] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [border-radius:var(--radius-full,_999px)] [background:var(--bg-base-70,_rgba(0,_0,_0,_0.70))] [position:absolute] [left:255px] [top:12px] [width:49px] [height:27px] [overflow:hidden]">
        <div data-figma="Icon / Line" data-node="1204:85731" data-instance-of="Icon / Line" className="[display:flex] [width:14px] [height:14px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
          <Icon data-figma="view" data-node="I1204:85731;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="[width:14px] [height:14px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
        <p data-figma="15" data-node="1204:85732" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:12px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"15"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:85732"]
        }} /></p>
      </div>
      <div data-figma="Timer Badge" data-node="1204:85733" data-instance-of="Timer Badge / 20분 기준" className="[display:inline-flex] [padding:4.69px_10.94px_4.69px_9.38px] [justify-content:center] [align-items:center] [gap:4.69px] [border-radius:1560.94px] [position:absolute] [left:12px] [top:12px] [width:104.31px] [height:40.38px] [isolation:isolate]">
        <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"104.31\" height=\"40.38\" viewBox=\"0 0 104.31 40.38\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"104.31\" height=\"40.38\" rx=\"20.19\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
      }} />
        <div data-figma="timer" data-node="I1204:85733;1204:62082" className="[width:20.31px] [height:20.31px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1204:85733;1204:62083" className="[width:17.77px] [height:17.77px] [position:absolute] [left:1.26px] [top:1.27px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:85733;1204:62083"]
        }} />
          <span data-figma="Vector" data-node="I1204:85733;1204:62084" className="[width:6.77px] [height:12.25px] [position:absolute] [left:10.15px] [top:3.38px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:85733;1204:62084"]
        }} />
        </div>
        <p data-figma="time" data-node="I1204:85733;1204:62085" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:22.5px] [font-style:normal] [font-weight:700] [line-height:31px] [letter-spacing:-0.9px] [flex-shrink:0] [width:59px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.31px] [left:0px]">{"07:50"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:85733;1204:62085"]
        }} /></p>
      </div>
    </div>;
  if (type === "1 342") return <div data-figma="type=1 342" data-node="1204:85745" className={cx("[width:342px] [height:232px] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1204:85736" data-img={"{\"src\":\"./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp\",\"mode\":\"CROP\",\"tf\":[[1,0,0],[0,0.40719613432884216,0.351818710565567]],\"op\":1,\"flip\":\"\"}"} className="[width:342px] [height:250px] [position:absolute] [left:0px] [top:-9px]" style={{
      "background": "url(./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp) 0px -216.001px / 100% 245.582% no-repeat"
    }} />
      <div data-figma="Fade" data-node="1204:85737" className="[width:342px] [height:232px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1204:85738" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:164px] [width:180px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"둘이 찍은 사진인데\n지만 보정해서 올린 여우"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85738"]
      }} /></p>
      <p data-figma="Versus" data-node="1204:85739" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:140px] [width:102px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"이거 백퍼 질투 맞지?"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85739"]
      }} /></p>
      <div data-figma="Frame 2147249140" data-node="1204:85740" className="[display:flex] [width:318px] [justify-content:space-between] [align-items:center] [position:absolute] [left:12px] [top:12px] [height:40.38px]">
        <div data-figma="Timer Badge" data-node="1204:85741" data-instance-of="Timer Badge / 20분 기준" className="[display:flex] [padding:4.69px_10.94px_4.69px_9.38px] [justify-content:center] [align-items:center] [gap:4.69px] [border-radius:1560.94px] [flex-shrink:0] [width:105.31px] [height:40.38px] [position:relative] [isolation:isolate]">
          <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
          __html: "<svg data-px=\"\" data-box=\"\" width=\"105.31\" height=\"40.38\" viewBox=\"0 0 105.31 40.38\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"105.31\" height=\"40.38\" rx=\"20.19\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
        }} />
          <div data-figma="timer" data-node="I1204:85741;1204:62112" className="[width:20.31px] [height:20.31px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:85741;1204:62113" className="[width:17.77px] [height:17.77px] [position:absolute] [left:1.26px] [top:1.27px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:85741;1204:62113"]
          }} />
            <span data-figma="Vector" data-node="I1204:85741;1204:62114" className="[width:6.77px] [height:6.77px] [position:absolute] [left:10.15px] [top:3.38px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:85741;1204:62114"]
          }} />
          </div>
          <p data-figma="time" data-node="I1204:85741;1204:62115" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:22.5px] [font-style:normal] [font-weight:700] [line-height:31px] [letter-spacing:-0.9px] [flex-shrink:0] [width:60px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.31px] [left:0px]">{"04:30"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:85741;1204:62115"]
          }} /></p>
        </div>
        <div data-figma="Frame 2147249139" data-node="1204:85742" className="[display:flex] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [flex-shrink:0]">
          <div data-figma="Icon / Line" data-node="1204:85743" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
            <Icon data-figma="view" data-node="I1204:85743;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
          <p data-figma="22" data-node="1204:85744" data-outline="" className="[color:var(--white,_#FFF)] [text-align:right] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] [flex-shrink:0] [width:16px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:-0.096px] [left:-0.56px]">{"22"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:85744"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "2 276") return <div data-figma="type=2 276" data-node="1204:85753" className={cx("[width:276px] [height:187px] [aspect-ratio:245/166] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1204:85747" data-img={"{\"src\":\"./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp\",\"mode\":\"CROP\",\"tf\":[[1,0,0],[0,0.40719613432884216,0.351818710565567]],\"op\":1,\"flip\":\"\"}"} className="[width:276px] [height:202px] [position:absolute] [left:0px] [top:-9px]" style={{
      "background": "url(./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp) 0px -174.529px / 100% 245.582% no-repeat"
    }} />
      <div data-figma="Fade" data-node="1204:85748" className="[width:276px] [height:187px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1204:85749" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:122px] [width:109px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"부모님이 맨날\n내 앞에서 싸움"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85749"]
      }} /></p>
      <p data-figma="Versus" data-node="1204:85750" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:98px] [width:78px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"우리 집만 이래?"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:85750"]
      }} /></p>
      <div data-figma="Frame 2147249140" data-node="1204:85751" className="[display:flex] [width:318px] [align-items:center] [gap:131px] [position:absolute] [left:12px] [top:13px] [height:40.38px]">
        <div data-figma="Timer Badge" data-node="1204:85752" data-instance-of="Timer Badge / 20분 기준" className="[display:flex] [padding:4.69px_10.94px_4.69px_9.38px] [justify-content:center] [align-items:center] [gap:4.69px] [border-radius:1560.94px] [flex-shrink:0] [width:105.31px] [height:40.38px] [position:relative] [isolation:isolate]">
          <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
          __html: "<svg data-px=\"\" data-box=\"\" width=\"105.31\" height=\"40.38\" viewBox=\"0 0 105.31 40.38\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"105.31\" height=\"40.38\" rx=\"20.19\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
        }} />
          <div data-figma="timer" data-node="I1204:85752;1204:62112" className="[width:20.31px] [height:20.31px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1204:85752;1204:62113" className="[width:17.77px] [height:17.77px] [position:absolute] [left:1.26px] [top:1.27px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:85752;1204:62113"]
          }} />
          </div>
          <p data-figma="time" data-node="I1204:85752;1204:62115" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:22.5px] [font-style:normal] [font-weight:700] [line-height:31px] [letter-spacing:-0.9px] [flex-shrink:0] [width:60px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.31px] [left:0px]">{"00:02"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:85752;1204:62115"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "수정본") return <div data-figma="type=수정본" data-node="1299:19988" className={cx("[width:318px] [height:232px] [border-radius:20px] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1299:19982" data-img={"{\"src\":\"./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp\",\"mode\":\"CROP\",\"tf\":[[1,0,0],[0,0.40719613432884216,0.351818710565567]],\"op\":1,\"flip\":\"\"}"} className="[width:318px] [height:232px] [position:absolute] [left:0px] [top:0px]" style={{
      "background": "url(./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp) 0px -200.449px / 100% 245.582% no-repeat"
    }} />
      <div data-figma="Fade" data-node="1299:19983" className="[width:318px] [height:232px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1299:19984" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:164px] [width:180px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"둘이 찍은 사진인데\n지만 보정해서 올린 여우"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:19984"]
      }} /></p>
      <p data-figma="Versus" data-node="1299:19985" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:140px] [width:102px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"이거 백퍼 질투 맞지?"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:19985"]
      }} /></p>
      <WatchingBadge data-figma="보는 중" className="[display:inline-flex] [padding:var(--spacing-4,_5px)_var(--spacing-9,_10px)_var(--spacing-4,_5px)_var(--spacing-8,_9px)] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [position:absolute] [left:255px] [top:12px] [width:51px] [height:27px] [overflow:hidden]" type={"종류 4"} />
      <div data-figma="Timer Badge" data-node="1299:19987" data-instance-of="Timer Badge / 20분 기준" className="[display:inline-flex] [padding:3.75px_8.75px_3.75px_7.5px] [justify-content:center] [align-items:center] [gap:3.75px] [border-radius:1248.75px] [position:absolute] [left:12px] [top:12px] [width:73.25px] [height:26.5px] [isolation:isolate]">
        <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"73.25\" height=\"26.5\" viewBox=\"0 0 73.25 26.5\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"73.25\" height=\"26.5\" rx=\"13.25\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
      }} />
        <div data-figma="timer" data-node="I1299:19987;1204:55614" className="[width:16.25px] [height:16.25px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1299:19987;1204:55615" className="[width:14.22px] [height:14.22px] [position:absolute] [left:1.02px] [top:1.01px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:19987;1204:55615"]
        }} />
          <span data-figma="Vector" data-node="I1299:19987;1204:55616" className="[width:5.42px] [height:5.42px] [position:absolute] [left:8.13px] [top:2.7px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:19987;1204:55616"]
        }} />
        </div>
        <p data-figma="time" data-node="I1299:19987;1204:55617" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13.75px] [font-style:normal] [font-weight:700] [line-height:19px] [letter-spacing:-0.55px] [flex-shrink:0] [width:37px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.495px] [left:0px]">{"04:30"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:19987;1204:55617"]
        }} /></p>
      </div>
    </div>;
  if (type === "수정본 2") return <div data-figma="type=수정본 2" data-node="1299:19998" className={cx("[width:318px] [height:232px] [border-radius:20px] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1299:19990" data-img={"{\"src\":\"./assets/images/1d41632906932dd6811d6990fd7cd0a8fc9724e5.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="[width:318px] [height:232px] [position:absolute] [left:0px] [top:0px]" style={{
      "background": "url(./assets/images/1d41632906932dd6811d6990fd7cd0a8fc9724e5.webp) 50% / cover no-repeat"
    }} />
      <div data-figma="Fade" data-node="1299:19991" className="[width:318px] [height:232px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1299:19992" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:164px] [width:150px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"남친이 1주년 선물로\n다이소 틴트 사줌"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:19992"]
      }} /></p>
      <p data-figma="Versus" data-node="1299:19993" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:140px] [width:69px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"헤어질까 말까"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:19993"]
      }} /></p>
      <div data-figma="보는 중" data-node="1299:19994" className="[display:inline-flex] [padding:5px_10px_5px_9px] [justify-content:center] [align-items:center] [gap:4px] [border-radius:999px] [background:var(--bg-base-70,_rgba(0,_0,_0,_0.70))] [position:absolute] [left:255px] [top:12px] [width:49px] [height:27px] [overflow:hidden]">
        <div data-figma="icon/eye" data-node="1299:19995" data-instance-of="Icon / Line" className="[display:flex] [width:14px] [height:14px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
          <Icon data-figma="view" data-node="I1299:19995;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="[width:14px] [height:14px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
        </div>
        <p data-figma="15" data-node="1299:19996" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:12px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"15"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1299:19996"]
        }} /></p>
      </div>
      <div data-figma="Timer Badge" data-node="1299:19997" data-instance-of="Timer Badge / 20분 기준" className="[display:inline-flex] [padding:3.75px_8.75px_3.75px_7.5px] [justify-content:center] [align-items:center] [gap:3.75px] [border-radius:1248.75px] [position:absolute] [left:12px] [top:12px] [width:72.25px] [height:26.5px] [isolation:isolate]">
        <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"72.25\" height=\"26.5\" viewBox=\"0 0 72.25 26.5\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"72.25\" height=\"26.5\" rx=\"13.25\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
      }} />
        <div data-figma="timer" data-node="I1299:19997;1204:55599" className="[width:16.25px] [height:16.25px] [flex-shrink:0] [position:relative] [overflow:hidden]">
          <span data-figma="Vector" data-node="I1299:19997;1204:55600" className="[width:14.22px] [height:14.22px] [position:absolute] [left:1.02px] [top:1.01px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:19997;1204:55600"]
        }} />
          <span data-figma="Vector" data-node="I1299:19997;1204:55601" className="[width:5.41px] [height:9.8px] [position:absolute] [left:8.13px] [top:2.7px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:19997;1204:55601"]
        }} />
        </div>
        <p data-figma="time" data-node="I1299:19997;1204:55602" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13.75px] [font-style:normal] [font-weight:700] [line-height:19px] [letter-spacing:-0.55px] [flex-shrink:0] [width:36px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.495px] [left:0px]">{"07:50"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1299:19997;1204:55602"]
        }} /></p>
      </div>
    </div>;
  if (type === "수정본 3") return <div data-figma="type=수정본 3" data-node="1299:20009" className={cx("[width:342px] [height:232px] [border-radius:20px] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1299:20000" data-img={"{\"src\":\"./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp\",\"mode\":\"CROP\",\"tf\":[[1,0,0],[0,0.40719613432884216,0.351818710565567]],\"op\":1,\"flip\":\"\"}"} className="[width:342px] [height:250px] [position:absolute] [left:0px] [top:-9px]" style={{
      "background": "url(./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp) 0px -216.001px / 100% 245.582% no-repeat"
    }} />
      <div data-figma="Fade" data-node="1299:20001" className="[width:342px] [height:232px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1299:20002" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:164px] [width:180px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"둘이 찍은 사진인데\n지만 보정해서 올린 여우"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20002"]
      }} /></p>
      <p data-figma="Versus" data-node="1299:20003" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:140px] [width:102px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"이거 백퍼 질투 맞지?"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20003"]
      }} /></p>
      <div data-figma="Frame 2147249140" data-node="1299:20004" className="[display:flex] [width:318px] [justify-content:space-between] [align-items:center] [position:absolute] [left:12px] [top:12px] [height:26.5px]">
        <div data-figma="Timer Badge" data-node="1299:20005" data-instance-of="Timer Badge / 20분 기준" className="[display:flex] [padding:3.75px_8.75px_3.75px_7.5px] [justify-content:center] [align-items:center] [gap:3.75px] [border-radius:1248.75px] [flex-shrink:0] [width:73.25px] [height:26.5px] [position:relative] [isolation:isolate]">
          <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
          __html: "<svg data-px=\"\" data-box=\"\" width=\"73.25\" height=\"26.5\" viewBox=\"0 0 73.25 26.5\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"73.25\" height=\"26.5\" rx=\"13.25\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
        }} />
          <div data-figma="timer" data-node="I1299:20005;1204:55614" className="[width:16.25px] [height:16.25px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1299:20005;1204:55615" className="[width:14.22px] [height:14.22px] [position:absolute] [left:1.02px] [top:1.01px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20005;1204:55615"]
          }} />
            <span data-figma="Vector" data-node="I1299:20005;1204:55616" className="[width:5.42px] [height:5.42px] [position:absolute] [left:8.13px] [top:2.7px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20005;1204:55616"]
          }} />
          </div>
          <p data-figma="time" data-node="I1299:20005;1204:55617" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13.75px] [font-style:normal] [font-weight:700] [line-height:19px] [letter-spacing:-0.55px] [flex-shrink:0] [width:37px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.495px] [left:0px]">{"04:30"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20005;1204:55617"]
          }} /></p>
        </div>
        <div data-figma="Frame 2147249139" data-node="1299:20006" className="[display:flex] [justify-content:center] [align-items:center] [gap:4px] [flex-shrink:0]">
          <div data-figma="carbon:view-filled" data-node="1299:20007" data-instance-of="Icon / Line" className="[display:flex] [width:16px] [height:16px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:relative]">
            <Icon data-figma="view" data-node="I1299:20007;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="[width:16px] [height:16px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]" />
          </div>
          <p data-figma="22" data-node="1299:20008" data-outline="" className="[color:var(--white,_#FFF)] [text-align:right] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] [flex-shrink:0] [width:16px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:-0.096px] [left:-0.56px]">{"22"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:20008"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "수정본 4") return <div data-figma="type=수정본 4" data-node="1299:20017" className={cx("[width:276px] [height:187px] [aspect-ratio:245/166] [border-radius:20px] [background:var(--bg-elevated,_#222628)] [position:relative] [overflow:hidden]", className)} style={style}>
      <div data-figma="Scene" data-node="1299:20011" data-img={"{\"src\":\"./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp\",\"mode\":\"CROP\",\"tf\":[[1,0,0],[0,0.40719613432884216,0.351818710565567]],\"op\":1,\"flip\":\"\"}"} className="[width:276px] [height:202px] [position:absolute] [left:0px] [top:-9px]" style={{
      "background": "url(./assets/images/4376d77ef68072b6a51ce4ff9143582be36ad608.webp) 0px -174.529px / 100% 245.582% no-repeat"
    }} />
      <div data-figma="Fade" data-node="1299:20012" className="[width:276px] [height:187px] [background:linear-gradient(180deg,_rgba(18,_20,_21,_0.00)_0%,_rgba(18,_20,_21,_0.00)_35%,_rgba(18,_20,_21,_0.90)_100%)] [position:absolute] [left:0px] [top:0px]" />
      <p data-figma="Carousel Title" data-node="1299:20013" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] [position:absolute] [left:16px] [top:122px] [width:109px] [height:56px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:-0.28px] [left:0px]">{"부모님이 맨날\n내 앞에서 싸움"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20013"]
      }} /></p>
      <p data-figma="Versus" data-node="1299:20014" data-outline="" className="[color:var(--text-primary-80,_rgba(248,_248,_248,_0.80))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] [position:absolute] [left:16px] [top:98px] [width:78px] [height:18px] [flex-shrink:0] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent]"><span className="[position:relative] [top:0.268px] [left:0px]">{"우리 집만 이래?"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1299:20014"]
      }} /></p>
      <div data-figma="Frame 2147249140" data-node="1299:20015" className="[display:flex] [width:318px] [align-items:center] [gap:131px] [position:absolute] [left:12px] [top:13px] [height:26.5px]">
        <div data-figma="Timer Badge" data-node="1299:20016" data-instance-of="Timer Badge / 20분 기준" className="[display:flex] [padding:3.75px_8.75px_3.75px_7.5px] [justify-content:center] [align-items:center] [gap:3.75px] [border-radius:1248.75px] [flex-shrink:0] [width:73.25px] [height:26.5px] [position:relative] [isolation:isolate]">
          <span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
          __html: "<svg data-px=\"\" data-box=\"\" width=\"73.25\" height=\"26.5\" viewBox=\"0 0 73.25 26.5\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"73.25\" height=\"26.5\" rx=\"13.25\" style=\"fill:var(--bg-base-75, #000000BF)\"/></svg>"
        }} />
          <div data-figma="timer" data-node="I1299:20016;1204:55614" className="[width:16.25px] [height:16.25px] [flex-shrink:0] [position:relative] [overflow:hidden]">
            <span data-figma="Vector" data-node="I1299:20016;1204:55615" className="[width:14.22px] [height:14.22px] [position:absolute] [left:1.02px] [top:1.01px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20016;1204:55615"]
          }} />
          </div>
          <p data-figma="time" data-node="I1299:20016;1204:55617" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13.75px] [font-style:normal] [font-weight:700] [line-height:19px] [letter-spacing:-0.55px] [flex-shrink:0] [width:37px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [--webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.495px] [left:0px]">{"00:02"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:20016;1204:55617"]
          }} /></p>
        </div>
      </div>
    </div>;
  return null;
}