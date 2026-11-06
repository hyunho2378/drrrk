// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:87430 "Onboarding Card" (해시 395db020)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { ChairAvatar } from './ChairAvatar';
import { Chip } from './Chip';
import { Dots } from './Dots';
import { DRR } from './DRR';
import { KAK } from './KAK';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function OnboardingCard({
  type = "default",
  style,
  className
}) {
  if (type === "default") return <div data-figma="type=default" data-node="1204:87338" className={cx("flex w-[326px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Visual" data-node="1204:87318" className="w-[326px] h-[220px] [background:var(--brand-primary,_#36D2FF)] shrink-0 relative overflow-hidden">
        <div data-figma="흰 패널" data-node="1204:87319" className="w-[230px] h-[200px] [border-radius:var(--radius-9xl,_18px)] [background:var(--text-primary,_#F8F8F8)] [box-shadow:0_6px_16px_0_rgba(0,_0,_0,_0.12)] absolute left-[48px] top-[44px] overflow-hidden">
          <div data-figma="고민 알약" data-node="1204:87320" className="inline-flex [padding:var(--spacing-5,_6px)_var(--spacing-9,_10px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-18xl,_99px)] [background:var(--bg-surface,_#121415)] absolute left-[47px] top-[18px] w-[132px] h-[27px] overflow-hidden">
            <p data-figma="고민" data-node="1204:87321" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[19px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"고민"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87321"]
            }} /></p>
            <p data-figma="둘이 찍은 사진인데…" data-node="1204:87322" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:500] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[87px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"둘이 찍은 사진인데…"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87322"]
            }} /></p>
          </div>
          <div data-figma="아바타 줄" data-node="1204:87323" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] absolute left-[20px] top-[64px] w-[190px] h-[40px] overflow-hidden">
            <ChairAvatar data-figma="Avatar / 의자" className="flex w-[40px] h-[40px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"avatar 작은 box"} />
            <ChairAvatar data-figma="Avatar / 의자" className="flex w-[40px] h-[40px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"avatar 작은 box"} />
            <ChairAvatar data-figma="Avatar / 의자" className="flex w-[40px] h-[40px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"avatar 작은 box"} />
            <ChairAvatar data-figma="Avatar / 의자" className="flex w-[40px] h-[40px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"avatar 작은 box"} />
          </div>
          <div data-figma="skel / 글 줄" data-node="1204:87328" className="w-[170px] h-[14px] [border-radius:var(--radius-xl,_7px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[30px] top-[124px]" />
          <div data-figma="skel / 글 줄" data-node="1204:87329" className="w-[120px] h-[14px] [border-radius:var(--radius-xl,_7px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[55px] top-[148px]" />
        </div>
        <Chip data-figma="칩" className="inline-flex [padding:var(--spacing-7,_8px)_var(--spacing-12,_14px)_var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[194px] top-[168px] w-[106px] h-[34px] overflow-hidden" type={"default"} />
      </div>
      <div data-figma="글" data-node="1204:87331" className="flex w-[326px] [padding:var(--spacing-17,_24px)_var(--spacing-17,_24px)_0_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
        <p data-figma="title" data-node="1204:87332" data-outline="" className="[color:var(--bg-surface,_#121415)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[158px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"고민이 비슷한 사람들과\n익명으로 대화해요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87332"]
        }} /></p>
        <p data-figma="sub" data-node="1204:87333" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[184px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"고민을 적으면 맞는 대화방에 매칭돼요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87333"]
        }} /></p>
      </div>
      <div data-figma="아래 줄" data-node="1204:87334" className="w-[326px] h-[68px] shrink-0 relative">
        <p data-figma="skip" data-node="1204:87335" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] absolute left-[24px] top-[34px] w-[44px] h-[18px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.268px] left-[0px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87335"]
        }} /></p>
        <Dots data-figma="dots" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[137px] top-[39px] w-[52px] h-[6px] overflow-hidden" type={"default"} />
        <p data-figma="next" data-node="1204:87337" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] absolute left-[275px] top-[33px] w-[26px] h-[21px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.04px] left-[0px]">{"다음"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87337"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 2") return <div data-figma="type=종류 2" data-node="1204:87357" className={cx("flex w-[326px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Visual" data-node="1204:87340" className="w-[326px] h-[220px] [background:var(--brand-primary,_#36D2FF)] shrink-0 relative overflow-hidden">
        <div data-figma="흰 패널" data-node="1204:87341" className="w-[230px] h-[200px] [border-radius:var(--radius-9xl,_18px)] [background:var(--text-primary,_#F8F8F8)] [box-shadow:0_6px_16px_0_rgba(0,_0,_0,_0.12)] absolute left-[48px] top-[44px] overflow-hidden">
          <div data-figma="skel / 말풍선" data-node="1204:87342" className="w-[120px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[20px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87343" className="w-[96px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[54px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87344" className="w-[110px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[88px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87345" className="w-[84px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[122px]" />
          <div data-figma="DRR KAK" data-node="1204:87346" className="flex w-[48px] h-[108px] [flex-direction:column] [justify-content:center] [align-items:flex-start] gap-[12px] absolute left-[166px] top-[22px] overflow-hidden">
            <DRR data-figma="DRR" className="flex w-[48px] h-[48px] [padding:13px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[0px] overflow-hidden" type={"종류 2"} />
            <KAK data-figma="KAK" className="flex w-[48px] h-[48px] [padding:13px] [justify-content:center] [align-items:center] shrink-0 absolute left-[0px] top-[60px] overflow-hidden" type={"종류 2"} />
          </div>
        </div>
        <Chip data-figma="칩" className="inline-flex [padding:var(--spacing-7,_8px)_var(--spacing-9,_10px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[20px] top-[158px] w-[98px] h-[38px] overflow-hidden" type={"종류 2"} />
      </div>
      <div data-figma="글" data-node="1204:87350" className="flex w-[326px] [padding:var(--spacing-17,_24px)_var(--spacing-17,_24px)_0_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
        <p data-figma="title" data-node="1204:87351" data-outline="" className="[color:var(--bg-surface,_#121415)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[121px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"말하기 부담되면\n버튼으로반응해요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87351"]
        }} /></p>
        <p data-figma="sub" data-node="1204:87352" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[183px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"공감되면 DRR, 별로면 KAK을 눌러요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87352"]
        }} /></p>
      </div>
      <div data-figma="아래 줄" data-node="1204:87353" className="w-[326px] h-[68px] shrink-0 relative">
        <p data-figma="skip" data-node="1204:87354" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] absolute left-[24px] top-[34px] w-[44px] h-[18px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.268px] left-[0px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87354"]
        }} /></p>
        <Dots data-figma="dots" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[137px] top-[39px] w-[52px] h-[6px] overflow-hidden" type={"종류 2"} />
        <p data-figma="next" data-node="1204:87356" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] absolute left-[275px] top-[33px] w-[26px] h-[21px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.04px] left-[0px]">{"다음"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87356"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 3") return <div data-figma="type=종류 3" data-node="1204:87374" className={cx("flex w-[326px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Visual" data-node="1204:87359" className="w-[326px] h-[220px] [background:var(--brand-primary,_#36D2FF)] shrink-0 relative overflow-hidden">
        <div data-figma="흰 패널" data-node="1204:87360" className="w-[230px] h-[200px] [border-radius:var(--radius-9xl,_18px)] [background:var(--text-primary,_#F8F8F8)] [box-shadow:0_6px_16px_0_rgba(0,_0,_0,_0.12)] absolute left-[48px] top-[44px] overflow-hidden">
          <div data-figma="Timer Pill" data-node="1204:87361" data-instance-of="Timer Pill / 해 뜨기까지 20분 기준" className="inline-flex h-[32px] [padding:0_var(--spacing-12,_14px)_0_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [border-radius:var(--radius-10xl,_20px)] [background:var(--bg-surface,_#121415)] absolute left-[44px] top-[18px] w-[137px]">
            <div data-figma="timer" data-node="I1204:87361;1204:55640" className="w-[14px] h-[14px] shrink-0 relative overflow-hidden">
              <div data-figma="Frame 2147249212" data-node="I1204:87361;1563:15775" className="inline-flex [padding:10px] [align-items:center] gap-[10px] absolute left-[-9.12px] top-[-9.12px] w-[32.25px] h-[32.25px]">
                <span data-figma="Vector" data-node="I1204:87361;1204:55641" className="relative w-[12.25px] h-[12.25px] shrink-0 [line-height:0]" dangerouslySetInnerHTML={{
                __html: svg["I1204:87361;1204:55641"]
              }} />
              </div>
              <span data-figma="Vector" data-node="I1204:87361;1204:55642" className="w-[9.33px] h-[9.33px] absolute left-[2.33px] top-[2.33px] [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1204:87361;1204:55642"]
            }} />
            </div>
            <p data-figma="label" data-node="I1204:87361;1204:55643" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[53px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"해 뜨기까지"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1204:87361;1204:55643"]
            }} /></p>
            <p data-figma="time" data-node="I1204:87361;1204:55644" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[32px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"20:00"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1204:87361;1204:55644"]
            }} /></p>
          </div>
          <div data-figma="skel / 말풍선" data-node="1204:87362" className="w-[120px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[70px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87363" className="w-[120px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [opacity:0.7] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[94px] top-[104px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87364" className="w-[96px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [opacity:0.45] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[138px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87365" className="w-[104px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [opacity:0.2] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[110px] top-[172px]" />
        </div>
        <Chip data-figma="칩" className="inline-flex [padding:var(--spacing-7,_8px)_var(--spacing-12,_14px)_var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[20px] top-[150px] w-[108px] h-[34px] overflow-hidden" type={"종류 3"} />
      </div>
      <div data-figma="글" data-node="1204:87367" className="flex w-[326px] [padding:var(--spacing-17,_24px)_var(--spacing-17,_24px)_0_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
        <p data-figma="title" data-node="1204:87368" data-outline="" className="[color:var(--bg-surface,_#121415)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[158px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"대화는 20분 뒤\n저장되지 않고 사라져요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87368"]
        }} /></p>
        <p data-figma="sub" data-node="1204:87369" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[139px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"해가 뜨면 대화방이 종료돼요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87369"]
        }} /></p>
      </div>
      <div data-figma="아래 줄" data-node="1204:87370" className="w-[326px] h-[68px] shrink-0 relative">
        <p data-figma="skip" data-node="1204:87371" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] absolute left-[24px] top-[34px] w-[44px] h-[18px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.268px] left-[0px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87371"]
        }} /></p>
        <Dots data-figma="dots" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[137px] top-[39px] w-[52px] h-[6px] overflow-hidden" type={"종류 3"} />
        <p data-figma="next" data-node="1204:87373" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] absolute left-[275px] top-[33px] w-[26px] h-[21px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.04px] left-[0px]">{"다음"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87373"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 4") return <div data-figma="type=종류 4" data-node="1204:87393" className={cx("flex w-[326px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Visual" data-node="1204:87376" className="w-[326px] h-[220px] [background:var(--brand-primary,_#36D2FF)] shrink-0 relative overflow-hidden">
        <div data-figma="흰 패널" data-node="1204:87377" className="w-[230px] h-[200px] [border-radius:var(--radius-9xl,_18px)] [background:var(--text-primary,_#F8F8F8)] [box-shadow:0_6px_16px_0_rgba(0,_0,_0,_0.12)] absolute left-[48px] top-[44px] overflow-hidden">
          <ChairAvatar data-figma="Avatar / 의자" className="flex w-[64px] h-[64px] [justify-content:center] [align-items:center] absolute left-[16px] top-[18px] overflow-hidden" size={"avatar 작은 sofa"} />
          <div data-figma="skel / 글 줄" data-node="1204:87379" className="w-[96px] h-[14px] [border-radius:var(--radius-xl,_7px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[92px] top-[26px]" />
          <div data-figma="skel / 짧은 줄" data-node="1204:87380" className="w-[60px] h-[10px] [border-radius:5px] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[92px] top-[48px]" />
          <div data-figma="엉따 줄" data-node="1204:87381" className="inline-flex [padding:13px_18px_9px_14px] [align-items:center] gap-[66px] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-surface-5,_rgba(18,_20,_21,_0.05))] absolute left-[16px] top-[98px] w-[198px] h-[56px] overflow-hidden">
            <p data-figma="엉따 지수" data-node="1204:87382" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] absolute left-[14px] top-[21px] w-[43px] h-[17px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.132px] left-[0px]">{"엉따 지수"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87382"]
            }} /></p>
            <p data-figma="36.8°" data-node="1204:87383" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:24px] [font-style:normal] [font-weight:700] [line-height:34px] [letter-spacing:-0.96px] absolute left-[123px] top-[13px] w-[57px] h-[34px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.264px] left-[0px]">{"36.8°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87383"]
            }} /></p>
          </div>
          <div data-figma="skel / 글 줄" data-node="1204:87384" className="w-[198px] h-[14px] [border-radius:var(--radius-xl,_7px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[170px]" />
        </div>
        <Chip data-figma="칩" className="inline-flex [padding:var(--spacing-7,_8px)_var(--spacing-12,_14px)_var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[201px] top-[24px] w-[103px] h-[34px] overflow-hidden" type={"종류 4"} />
      </div>
      <div data-figma="글" data-node="1204:87386" className="flex w-[326px] [padding:var(--spacing-17,_24px)_var(--spacing-17,_24px)_0_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
        <p data-figma="title" data-node="1204:87387" data-outline="" className="[color:var(--bg-surface,_#121415)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[125px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"진심으로 들어주면\n추천을 받아요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87387"]
        }} /></p>
        <p data-figma="sub" data-node="1204:87388" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[174px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"추천이 쌓이면 엉따 지수가 올라가요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87388"]
        }} /></p>
      </div>
      <div data-figma="아래 줄" data-node="1204:87389" className="w-[326px] h-[68px] shrink-0 relative">
        <p data-figma="skip" data-node="1204:87390" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] absolute left-[24px] top-[34px] w-[44px] h-[18px] [opacity:0] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.268px] left-[0px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87390"]
        }} /></p>
        <Dots data-figma="dots" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[137px] top-[39px] w-[52px] h-[6px] overflow-hidden" type={"종류 4"} />
        <p data-figma="next" data-node="1204:87392" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] absolute left-[249px] top-[33px] w-[51px] h-[21px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.04px] left-[0px]">{"시작하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87392"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 5") return <div data-figma="type=종류 5" data-node="1204:87411" className={cx("flex w-[326px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Visual" data-node="1204:87395" className="w-[326px] h-[220px] [background:var(--brand-primary,_#36D2FF)] shrink-0 relative overflow-hidden">
        <div data-figma="흰 패널" data-node="1204:87396" className="w-[230px] h-[200px] [border-radius:var(--radius-9xl,_18px)] [background:var(--text-primary,_#F8F8F8)] [box-shadow:0_6px_16px_0_rgba(0,_0,_0,_0.12)] absolute left-[48px] top-[44px] overflow-hidden">
          <ChairAvatar data-figma="Avatar / 의자" className="flex w-[40px] h-[40px] [justify-content:center] [align-items:center] absolute left-[16px] top-[18px] overflow-hidden" size={"avatar 작은 box"} />
          <p data-figma="AI 드르륵 의자" data-node="1204:87398" data-outline="" className="[color:var(--bg-surface,_#121415)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:700] [line-height:15px] [letter-spacing:-0.44px] absolute left-[64px] top-[31px] w-[62px] h-[15px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.496px] left-[0px]">{"AI 드르륵 의자"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87398"]
          }} /></p>
          <div data-figma="AI 말풍선" data-node="1204:87399" className="inline-flex [padding:var(--spacing-9,_10px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-surface,_#121415)] absolute left-[16px] top-[70px] w-[163px] h-[37px] overflow-hidden">
            <p data-figma="많이 놀랐겠다. 지금은 좀 어때?" data-node="1204:87400" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[139px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"많이 놀랐겠다. 지금은 좀 어때?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87400"]
            }} /></p>
          </div>
          <div data-figma="skel / 말풍선" data-node="1204:87401" className="w-[110px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[104px] top-[122px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87402" className="w-[80px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[134px] top-[156px]" />
        </div>
        <Chip data-figma="칩" className="inline-flex [padding:var(--spacing-7,_8px)_var(--spacing-12,_14px)_var(--spacing-7,_8px)_var(--spacing-11,_12px)] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[16px] top-[172px] w-[176px] h-[34px] overflow-hidden" type={"종류 5"} />
      </div>
      <div data-figma="글" data-node="1204:87404" className="flex w-[326px] [padding:var(--spacing-17,_24px)_var(--spacing-17,_24px)_0_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
        <p data-figma="title" data-node="1204:87405" data-outline="" className="[color:var(--bg-surface,_#121415)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[143px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"매칭될 사람이 없으면\nAI와 먼저 대화해요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87405"]
        }} /></p>
        <p data-figma="sub" data-node="1204:87406" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[184px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"기다리지 않고 바로 고민을 털어놓아요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87406"]
        }} /></p>
      </div>
      <div data-figma="아래 줄" data-node="1204:87407" className="w-[326px] h-[68px] shrink-0 relative">
        <p data-figma="skip" data-node="1204:87408" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:500] [line-height:18px] [letter-spacing:-0.52px] absolute left-[24px] top-[34px] w-[44px] h-[18px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.268px] left-[0px]">{"건너뛰기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87408"]
        }} /></p>
        <Dots data-figma="dots" className="inline-flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[149px] top-[39px] w-[28px] h-[6px] overflow-hidden" type={"종류 5"} />
        <p data-figma="next" data-node="1204:87410" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] absolute left-[275px] top-[33px] w-[26px] h-[21px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.04px] left-[0px]">{"다음"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87410"]
        }} /></p>
      </div>
    </div>;
  if (type === "종류 6") return <div data-figma="type=종류 6" data-node="1204:87429" className={cx("flex w-[326px] [flex-direction:column] [justify-content:center] [align-items:center] [border-radius:var(--radius-11xl,_24px)] [background:var(--text-primary,_#F8F8F8)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Visual" data-node="1204:87413" className="w-[326px] h-[220px] [background:var(--brand-primary,_#36D2FF)] shrink-0 relative overflow-hidden">
        <div data-figma="흰 패널" data-node="1204:87414" className="w-[230px] h-[200px] [border-radius:var(--radius-9xl,_18px)] [background:var(--text-primary,_#F8F8F8)] [box-shadow:0_6px_16px_0_rgba(0,_0,_0,_0.12)] absolute left-[48px] top-[44px] overflow-hidden">
          <div data-figma="skel / 말풍선" data-node="1204:87415" className="w-[120px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[20px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87416" className="w-[90px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[16px] top-[54px]" />
          <div data-figma="관리자 메시지" data-node="1204:87417" className="inline-flex [padding:var(--spacing-5,_6px)_var(--spacing-9,_10px)] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [border-radius:var(--radius-5xl,_12px)] [background:var(--bg-surface,_#121415)] absolute left-[32px] top-[96px] w-[161px] h-[27px] overflow-hidden">
            <div data-figma="Icon / Line" data-node="1204:87418" data-instance-of="Icon / Line" className="flex w-[14px] h-[14px] [justify-content:center] [align-items:center] shrink-0 relative">
              <Icon data-figma="information" data-node="I1204:87418;1299:25683" name="information-1463-24333" color="var(--text-primary, #F8F8F8)" className="w-[14px] h-[14px] shrink-0 absolute left-[0px] top-[0px]" />
            </div>
            <p data-figma="리클라이너17님이 들어왔어요" data-node="1204:87419" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:500] [line-height:15px] [letter-spacing:-0.44px] shrink-0 w-[123px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.496px] left-[0px]">{"리클라이너17님이 들어왔어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87419"]
            }} /></p>
          </div>
          <div data-figma="skel / 말풍선" data-node="1204:87420" className="w-[110px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[104px] top-[140px]" />
          <div data-figma="skel / 말풍선" data-node="1204:87421" className="w-[76px] h-[24px] [border-radius:var(--radius-5xl,_12px)] [background:var(--text-secondary-28,_rgba(154,_161,_166,_0.28))] absolute left-[138px] top-[174px]" />
        </div>
        <Chip data-figma="칩" className="inline-flex [padding:var(--spacing-5,_6px)_var(--spacing-7,_8px)] [justify-content:center] [align-items:center] gap-[0px] absolute left-[238px] top-[26px] w-[64px] h-[40px] overflow-hidden" type={"종류 6"} />
      </div>
      <div data-figma="글" data-node="1204:87423" className="flex w-[326px] [padding:var(--spacing-17,_24px)_var(--spacing-17,_24px)_0_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
        <p data-figma="title" data-node="1204:87424" data-outline="" className="[color:var(--bg-surface,_#121415)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[177px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"대화 중에 사람이 매칭되면\n함께 대화방으로 옮겨가요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87424"]
        }} /></p>
        <p data-figma="sub" data-node="1204:87425" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[210px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"AI와 대화하는 동안에도 계속 사람을 찾아요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87425"]
        }} /></p>
      </div>
      <div data-figma="아래 줄" data-node="1204:87426" className="flex h-[68px] [padding:33px_26px_14px_149px] [justify-content:flex-end] [align-items:center] gap-[72px] shrink-0 w-[326px] relative">
        <Dots data-figma="dots" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] absolute left-[149px] top-[39px] w-[28px] h-[6px] overflow-hidden" type={"종류 6"} />
        <p data-figma="next" data-node="1204:87428" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] absolute left-[249px] top-[33px] w-[51px] h-[21px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.04px] left-[0px]">{"시작하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:87428"]
        }} /></p>
      </div>
    </div>;
  return null;
}