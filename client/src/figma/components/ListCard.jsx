// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88591 "List Card" (해시 5721d67a)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { VoiceWave } from './VoiceWave';
import { WatchingBadge } from './WatchingBadge';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function ListCard({
  type = "1",
  style,
  className
}) {
  if (type === "1") return <div data-figma="type=1" data-node="1204:88544" className={cx("w-[342px] h-[112px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Thumb" data-node="1204:88536" data-img={"{\"src\":\"./assets/images/5534d467597ad85cccf9aa5b99ce17f801a0a8d6.jpg\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,0.5581395626068115,0.22093023359775543]],\"op\":1,\"flip\":\"\"}"} className="w-[80px] h-[80px] [border-radius:var(--radius-5xl,_12px)] absolute left-[246px] top-[16px]" style={{
      "background": "url(./assets/images/5534d467597ad85cccf9aa5b99ce17f801a0a8d6.jpg) 50% / cover no-repeat"
    }} />
      <p data-figma="List Title" data-node="1204:88537" data-outline="" className="w-[214px] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] absolute left-[16px] top-[16px] h-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.176px] left-[0px]">{"친구가 썸남 앞에서\n내 쌍밍아웃함"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88537"]
      }} /></p>
      <div data-figma="meta" data-node="1204:88538" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[16px] top-[76px] w-[129px] h-[17px] overflow-hidden">
        <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] gap-[1.5px] shrink-0 overflow-hidden" type={"default"} />
        <p data-figma="4명 이야기 중" data-node="1204:88540" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[63px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"4명 이야기 중"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88540"]
        }} /></p>
        <span data-figma="Ellipse" data-node="1204:88541" className="relative w-[3px] h-[3px] shrink-0 [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88541"]
      }} />
        <WatchingBadge data-figma="보는 중" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden" type={"default"} />
      </div>
      <div data-figma="Timer Badge" data-node="1204:88543" data-instance-of="Timer Badge / 20분 기준" className="inline-flex [padding:var(--spacing-2,_3px)_var(--spacing-6,_7px)_var(--spacing-2,_3px)_var(--spacing-5,_6px)] [justify-content:center] [align-items:center] [gap:var(--spacing-2,_3px)] [border-radius:var(--radius-full,_999px)] [background:var(--bg-base-75,_rgba(0,_0,_0,_0.75))] absolute left-[258px] top-[72px] w-[55px] h-[21px]">
        <div data-figma="timer" data-node="I1204:88543;1204:55574" className="w-[13px] h-[13px] shrink-0 relative overflow-hidden">
          <span data-figma="Vector" data-node="I1204:88543;1204:55575" className="w-[11.38px] h-[11.38px] absolute left-[0.81px] top-[0.81px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88543;1204:55575"]
        }} />
          <span data-figma="Vector" data-node="I1204:88543;1204:55576" className="w-[7.84px] h-[8.67px] absolute left-[3px] top-[2.17px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88543;1204:55576"]
        }} />
        </div>
        <p data-figma="time" data-node="I1204:88543;1204:55577" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[26px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"12:32"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88543;1204:55577"]
        }} /></p>
      </div>
    </div>;
  if (type === "2") return <div data-figma="type=2" data-node="1204:88554" className={cx("w-[342px] h-[112px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Thumb" data-node="1204:88546" data-img={"{\"src\":\"./assets/images/7a39098e95ff000eea8de3123bf7e72c2ca2e6b1.jpg\",\"mode\":\"CROP\",\"tf\":[[0.5581395626068115,0,0.0006077940342947841],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[80px] h-[80px] [border-radius:var(--radius-5xl,_12px)] absolute left-[246px] top-[16px]" style={{
      "background": "url(./assets/images/7a39098e95ff000eea8de3123bf7e72c2ca2e6b1.jpg) -0.087px 0px / 179.167% 100% no-repeat"
    }} />
      <p data-figma="List Title" data-node="1204:88547" data-outline="" className="w-[214px] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] absolute left-[16px] top-[16px] h-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.176px] left-[0px]">{"화장실에서 혼자\n급식 먹다가 걸린 썰 푼다"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88547"]
      }} /></p>
      <div data-figma="meta" data-node="1204:88548" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[16px] top-[76px] w-[128px] h-[17px] overflow-hidden">
        <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] gap-[1.5px] shrink-0 overflow-hidden" type={"default"} />
        <p data-figma="6명 이야기 중" data-node="1204:88550" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[62px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"6명 이야기 중"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88550"]
        }} /></p>
        <span data-figma="Ellipse" data-node="1204:88551" className="relative w-[3px] h-[3px] shrink-0 [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88551"]
      }} />
        <WatchingBadge data-figma="보는 중" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden" type={"종류 2"} />
      </div>
      <div data-figma="Timer Badge" data-node="1204:88553" data-instance-of="Timer Badge / 20분 기준" className="inline-flex [padding:var(--spacing-2,_3px)_var(--spacing-6,_7px)_var(--spacing-2,_3px)_var(--spacing-5,_6px)] [justify-content:center] [align-items:center] [gap:var(--spacing-2,_3px)] [border-radius:var(--radius-full,_999px)] [background:var(--status-danger,_#FF4D6A)] absolute left-[257px] top-[72px] w-[56px] h-[21px]">
        <div data-figma="timer" data-node="I1204:88553;1204:55624" className="w-[13px] h-[13px] shrink-0 relative overflow-hidden">
          <span data-figma="Vector" data-node="I1204:88553;1204:55625" className="w-[11.38px] h-[11.38px] absolute left-[0.81px] top-[0.81px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88553;1204:55625"]
        }} />
          <span data-figma="Vector" data-node="I1204:88553;1204:55626" className="w-[3.5px] h-[4.33px] absolute left-[6.5px] top-[2.17px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88553;1204:55626"]
        }} />
        </div>
        <p data-figma="time" data-node="I1204:88553;1204:55627" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[27px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"02:41"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88553;1204:55627"]
        }} /></p>
      </div>
    </div>;
  if (type === "3") return <div data-figma="type=3" data-node="1204:88564" className={cx("w-[342px] h-[112px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Thumb" data-node="1204:88556" data-img={"{\"src\":\"./assets/images/25a2bc805dc33cf06662b290446454bc6e680354.jpg\",\"mode\":\"CROP\",\"tf\":[[0.8279028534889221,0,0.0007004235521890223],[0,1,-3.552713678800501e-15]],\"op\":1,\"flip\":\"\"}"} className="w-[80px] h-[80px] [border-radius:var(--radius-5xl,_12px)] absolute left-[246px] top-[16px]" style={{
      "background": "url(./assets/images/25a2bc805dc33cf06662b290446454bc6e680354.jpg) -0.068px 0px / 120.787% 100% no-repeat"
    }} />
      <p data-figma="List Title" data-node="1204:88557" data-outline="" className="w-[214px] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] absolute left-[16px] top-[16px] h-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.176px] left-[0px]">{"맨날 얻어먹고 한 번도\n안 사는 친구 손절각?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88557"]
      }} /></p>
      <div data-figma="meta" data-node="1204:88558" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[16px] top-[76px] w-[123px] h-[17px] overflow-hidden">
        <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] gap-[1.5px] shrink-0 overflow-hidden" type={"default"} />
        <p data-figma="2명 이야기 중" data-node="1204:88560" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[62px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"2명 이야기 중"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88560"]
        }} /></p>
        <span data-figma="Ellipse" data-node="1204:88561" className="relative w-[3px] h-[3px] shrink-0 [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88561"]
      }} />
        <WatchingBadge data-figma="보는 중" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden" type={"종류 3"} />
      </div>
      <div data-figma="Timer Badge" data-node="1204:88563" data-instance-of="Timer Badge / 20분 기준" className="inline-flex [padding:var(--spacing-2,_3px)_var(--spacing-6,_7px)_var(--spacing-2,_3px)_var(--spacing-5,_6px)] [justify-content:center] [align-items:center] [gap:var(--spacing-2,_3px)] [border-radius:var(--radius-full,_999px)] [background:var(--bg-base-75,_rgba(0,_0,_0,_0.75))] absolute left-[263px] top-[72px] w-[58px] h-[21px]">
        <div data-figma="timer" data-node="I1204:88563;1204:55589" className="w-[13px] h-[13px] shrink-0 relative overflow-hidden">
          <span data-figma="Vector" data-node="I1204:88563;1204:55590" className="w-[11.38px] h-[11.38px] absolute left-[0.81px] top-[0.81px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88563;1204:55590"]
        }} />
          <span data-figma="Vector" data-node="I1204:88563;1204:55591" className="w-[4.33px] h-[8.67px] absolute left-[6.5px] top-[2.17px] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88563;1204:55591"]
        }} />
        </div>
        <p data-figma="time" data-node="I1204:88563;1204:55592" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"09:05"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88563;1204:55592"]
        }} /></p>
      </div>
    </div>;
  if (type === "1 342") return <div data-figma="type=1 342" data-node="1204:88577" className={cx("w-[342px] h-[112px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Thumb" data-node="1204:88566" data-img={"{\"src\":\"./assets/images/5534d467597ad85cccf9aa5b99ce17f801a0a8d6.jpg\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,0.5581395626068115,0.22093023359775543]],\"op\":1,\"flip\":\"\"}"} className="w-[80px] h-[80px] [border-radius:var(--radius-5xl,_12px)] absolute left-[246px] top-[16px]" style={{
      "background": "url(./assets/images/5534d467597ad85cccf9aa5b99ce17f801a0a8d6.jpg) 50% / cover no-repeat"
    }} />
      <p data-figma="List Title" data-node="1204:88567" data-outline="" className="w-[214px] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] absolute left-[16px] top-[16px] h-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.176px] left-[0px]">{"친구가 썸남 앞에서\n내 쌍밍아웃함"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88567"]
      }} /></p>
      <div data-figma="Chips" data-node="1204:88568" className="inline-flex [justify-content:center] [align-items:flex-start] [gap:var(--spacing-5,_6px)] absolute left-[16px] top-[73px] w-[143px] h-[25px] overflow-hidden">
        <div data-figma="Chip / 연애" data-node="1204:88569" className="flex [padding:var(--spacing-3,_4px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-l,_6px)] [background:var(--bg-surface,_#121415)] shrink-0 overflow-hidden">
          <p data-figma="연애" data-node="1204:88570" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[21px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"연애"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88570"]
          }} /></p>
        </div>
        <div data-figma="Timer Badge" data-node="1537:19722" data-instance-of="Timer Badge / 20분 기준" className="flex [padding:var(--spacing-2,_3px)_var(--spacing-6,_7px)_var(--spacing-2,_3px)_var(--spacing-5,_6px)] [justify-content:center] [align-items:center] [gap:var(--spacing-2,_3px)] [border-radius:var(--radius-full,_999px)] [background:var(--bg-base-75,_rgba(0,_0,_0,_0.75))] shrink-0">
          <div data-figma="timer" data-node="I1537:19722;1204:55614" className="w-[13px] h-[13px] shrink-0 relative overflow-hidden">
            <span data-figma="Vector" data-node="I1537:19722;1204:55615" className="w-[11.38px] h-[11.38px] absolute left-[0.81px] top-[0.81px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1537:19722;1204:55615"]
          }} />
            <span data-figma="Vector" data-node="I1537:19722;1204:55616" className="w-[4.33px] h-[4.33px] absolute left-[6.5px] top-[2.17px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1537:19722;1204:55616"]
          }} />
          </div>
          <p data-figma="time" data-node="I1537:19722;1204:55617" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"04:30"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1537:19722;1204:55617"]
          }} /></p>
        </div>
        <div data-figma="Frame 2147249139" data-node="1204:88574" className="flex h-[23px] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0">
          <div data-figma="Icon / Line" data-node="1204:88575" data-instance-of="Icon / Line" className="flex w-[16px] h-[16px] [justify-content:center] [align-items:center] shrink-0 relative">
            <Icon data-figma="view" data-node="I1204:88575;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="w-[16px] h-[16px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
          <p data-figma="22" data-node="1204:88576" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:right] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[16px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[-0.56px]">{"22"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88576"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "2 342") return <div data-figma="type=2 342" data-node="1204:88590" className={cx("w-[342px] h-[112px] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Thumb" data-node="1204:88579" data-img={"{\"src\":\"./assets/images/7a39098e95ff000eea8de3123bf7e72c2ca2e6b1.jpg\",\"mode\":\"CROP\",\"tf\":[[0.5581395626068115,0,0.0006077940342947841],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[80px] h-[80px] [border-radius:var(--radius-5xl,_12px)] absolute left-[246px] top-[16px]" style={{
      "background": "url(./assets/images/7a39098e95ff000eea8de3123bf7e72c2ca2e6b1.jpg) -0.087px 0px / 179.167% 100% no-repeat"
    }} />
      <p data-figma="List Title" data-node="1204:88580" data-outline="" className="w-[214px] [color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] absolute left-[16px] top-[16px] h-[44px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.176px] left-[0px]">{"친구가 내 몸무게\n공개해버림"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:88580"]
      }} /></p>
      <div data-figma="Chips" data-node="1204:88581" className="inline-flex [justify-content:center] [align-items:flex-start] [gap:var(--spacing-5,_6px)] absolute left-[16px] top-[73px] w-[143px] h-[25px] overflow-hidden">
        <div data-figma="Chip / 연애" data-node="1204:88582" className="flex [padding:var(--spacing-3,_4px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-l,_6px)] [background:var(--bg-surface,_#121415)] shrink-0 overflow-hidden">
          <p data-figma="학교" data-node="1204:88583" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[21px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"학교"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88583"]
          }} /></p>
        </div>
        <div data-figma="Timer Badge" data-node="1537:19737" data-instance-of="Timer Badge / 20분 기준" className="flex [padding:var(--spacing-2,_3px)_var(--spacing-6,_7px)_var(--spacing-2,_3px)_var(--spacing-5,_6px)] [justify-content:center] [align-items:center] [gap:var(--spacing-2,_3px)] [border-radius:var(--radius-full,_999px)] [background:var(--bg-base-75,_rgba(0,_0,_0,_0.75))] shrink-0">
          <div data-figma="timer" data-node="I1537:19737;1204:55589" className="w-[13px] h-[13px] shrink-0 relative overflow-hidden">
            <span data-figma="Vector" data-node="I1537:19737;1204:55590" className="w-[11.38px] h-[11.38px] absolute left-[0.81px] top-[0.81px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1537:19737;1204:55590"]
          }} />
            <span data-figma="Vector" data-node="I1537:19737;1204:55591" className="w-[4.33px] h-[8.67px] absolute left-[6.5px] top-[2.17px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1537:19737;1204:55591"]
          }} />
          </div>
          <p data-figma="time" data-node="I1537:19737;1204:55592" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[29px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"09:05"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1537:19737;1204:55592"]
          }} /></p>
        </div>
        <div data-figma="Frame 2147249139" data-node="1204:88587" className="flex h-[23px] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0">
          <div data-figma="Icon / Line" data-node="1204:88588" data-instance-of="Icon / Line" className="flex w-[16px] h-[16px] [justify-content:center] [align-items:center] shrink-0 relative">
            <Icon data-figma="view" data-node="I1204:88588;1299:25539" name="view" color="var(--text-primary, #F8F8F8)" className="w-[16px] h-[16px] shrink-0 absolute left-[0px] top-[0px]" />
          </div>
          <p data-figma="22" data-node="1204:88589" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:right] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[16px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[-0.56px]">{"22"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88589"]
          }} /></p>
        </div>
      </div>
    </div>;
  return null;
}