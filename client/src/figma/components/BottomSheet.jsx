// 자동 생성: figma-to-code. 피그마 COMPONENT_SET 1204:88081 "Bottom Sheet" (해시 82dd49a2)
// 손으로 고치지 말고 피그마를 고친 뒤 다시 생성한다. 다듬은 코드는 별도 파일에서 이 컴포넌트를 감싼다.
import React from 'react';
import { ReactionButton } from './ReactionButton';
import { ChairAvatar } from './ChairAvatar';
import { VoiceWave } from './VoiceWave';
import { ReportBlockLink } from './ReportBlockLink';
import { Checkbox } from './Checkbox';
import { Icon } from '../Icon';
const cx = (...a) => a.filter(Boolean).join(' ');
import svg from '../../assets/svg-map';
export function BottomSheet({
  type = "뱃지",
  style,
  className
}) {
  if (type === "뱃지") return <div data-figma="type=뱃지" data-node="1204:87963" className={cx("w-[390px] h-[294px] [border-radius:24px_24px_0_0] [background:var(--bg-base,_#000)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle" data-node="1204:87954" className="w-[40px] h-[4px] [border-radius:var(--radius-s,_2px)] [background:var(--text-tertiary,_#6E767C)] absolute left-[175px] top-[10px]" />
      <p data-figma="나의 뱃지" data-node="1204:87955" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] absolute left-[24px] top-[30px] w-[65px] h-[25px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[-0.052px] left-[0px]">{"나의 뱃지"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87955"]
      }} /></p>
      <ReactionButton data-figma="Reaction Button" className="flex w-[56px] h-[56px] [justify-content:center] [align-items:center] absolute left-[24px] top-[70px] overflow-hidden" type={"공감"} />
      <ReactionButton data-figma="Reaction Button" className="flex w-[56px] h-[56px] [justify-content:center] [align-items:center] absolute left-[96px] top-[70px] overflow-hidden" type={"응원"} />
      <div data-figma="Reaction Button" data-node="1204:87958" data-instance-of="Reaction Button" className="flex w-[56px] h-[56px] [justify-content:center] [align-items:center] [border-radius:50.909px] [border:1.723px_solid_transparent] absolute left-[168px] top-[70px] overflow-hidden [isolation:isolate]">
        <span aria-hidden="true" className="absolute left-[-1.7230769395828247px] top-[-1.7230769395828247px] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
        __html: "<svg data-px=\"\" data-box=\"\" width=\"56\" height=\"56\" viewBox=\"0 0 56 56\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"56\" height=\"56\" rx=\"28\" style=\"fill:var(--brand-primary-39, #36D2FF63)\"/><defs><clipPath id=\"c1204_87958\"><rect width=\"56\" height=\"56\" rx=\"28\"/></clipPath></defs><g clip-path=\"url(#c1204_87958)\"><path d=\"M0 28 M56 28 M56 28 M0 28 M28 0 M56 28 M28 56 M0 28 M28 56 L28 54.2769 C13.4877 54.2769 1.72308 42.5123 1.72308 28 L0 28 L-1.72308 28 C-1.72308 44.4156 11.5844 57.7231 28 57.7231 L28 56 Z M56 28 L54.2769 28 C54.2769 42.5123 42.5123 54.2769 28 54.2769 L28 56 L28 57.7231 C44.4156 57.7231 57.7231 44.4156 57.7231 28 L56 28 Z M28 0 L28 1.72308 C42.5123 1.72308 54.2769 13.4877 54.2769 28 L56 28 L57.7231 28 C57.7231 11.5844 44.4156 -1.72308 28 -1.72308 L28 0 Z M28 0 L28 -1.72308 C11.5844 -1.72308 -1.72308 11.5844 -1.72308 28 L0 28 L1.72308 28 C1.72308 13.4877 13.4877 1.72308 28 1.72308 L28 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--brand-primary, #36D2FF)\"/></g></svg>"
      }} />
        <div data-figma="Mask group" data-node="I1204:87958;1204:85338" data-mask={"{\"x\":0,\"y\":0,\"g\":[{\"r\":\"NONZERO\",\"d\":\"M21.2116 9.7395 L21.8942 2.94023 L21.8942 0 L14.3599 2.94023 L9.31947 9.7395 L0 11.3409 L0 42.6595 L34.3902 42.6595 L34.3902 22.183 L30.5574 14.0448 L26.9871 14.8849 L24.8607 15.3312 L21.2116 9.7395 Z\"}]}"} className="w-[34.39px] h-[42.66px] shrink-0 relative [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-size:34.39px_42.66px] [-webkit-mask-size:34.39px_42.66px]" style={{
        "maskImage": "url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2234.39%22%20height%3D%2242.66%22%20viewBox%3D%220%200%2034.39%2042.66%22%3E%3Cpath%20transform%3D%22translate(0%200)%22%20d%3D%22M21.2116%209.7395%20L21.8942%202.94023%20L21.8942%200%20L14.3599%202.94023%20L9.31947%209.7395%20L0%2011.3409%20L0%2042.6595%20L34.3902%2042.6595%20L34.3902%2022.183%20L30.5574%2014.0448%20L26.9871%2014.8849%20L24.8607%2015.3312%20L21.2116%209.7395%20Z%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E\")",
        "WebkitMaskImage": "url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2234.39%22%20height%3D%2242.66%22%20viewBox%3D%220%200%2034.39%2042.66%22%3E%3Cpath%20transform%3D%22translate(0%200)%22%20d%3D%22M21.2116%209.7395%20L21.8942%202.94023%20L21.8942%200%20L14.3599%202.94023%20L9.31947%209.7395%20L0%2011.3409%20L0%2042.6595%20L34.3902%2042.6595%20L34.3902%2022.183%20L30.5574%2014.0448%20L26.9871%2014.8849%20L24.8607%2015.3312%20L21.2116%209.7395%20Z%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E\")"
      }}>
          <div data-figma="p_OPENAI_IMAGE_01M5KEJWD26P7FGYG0P7G7AKWP 1" data-node="I1204:87958;1204:85340" data-img={"{\"src\":\"./assets/images/95b00586701c05d92a766dc58abb2b0c5fbf98c0.webp\",\"mode\":\"FILL\",\"tf\":[[1,0,0],[0,1,0]],\"op\":1,\"flip\":\"\"}"} className="w-[80.646px] h-[53.764px] [aspect-ratio:3/2] absolute left-[-23.03px] top-[-4.41px]" style={{
          "background": "url(./assets/images/95b00586701c05d92a766dc58abb2b0c5fbf98c0.webp) 50% / cover no-repeat"
        }} />
        </div>
      </div>
      <ReactionButton data-figma="Reaction Button" className="flex w-[56px] h-[56px] [justify-content:center] [align-items:center] absolute left-[240px] top-[70px] overflow-hidden" type={"웃김"} />
      <ReactionButton data-figma="Reaction Button" className="flex w-[56px] h-[56px] [justify-content:center] [align-items:center] absolute left-[312px] top-[70px] overflow-hidden" type={"웃김 56"} />
      <p data-figma="불꽃 드륵" data-node="1204:87961" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:700] [line-height:22px] [letter-spacing:-0.64px] absolute left-[164px] top-[142px] w-[58px] h-[22px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.176px] left-[0px]">{"불꽃 드륵"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87961"]
      }} /></p>
      <p data-figma="하루 3회 드르륵을 달성했어요" data-node="1204:87962" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] absolute left-[123px] top-[168px] w-[134px] h-[17px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.132px] left-[0px]">{"하루 3회 드르륵을 달성했어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1204:87962"]
      }} /></p>
    </div>;
  if (type === "정렬") return <div data-figma="type=정렬" data-node="1204:87981" className={cx("flex w-[390px] [padding:var(--spacing-12,_14px)_var(--spacing-17,_24px)_40px_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] [border-radius:24px_24px_0_0] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Frame" data-node="1204:87965" className="flex [justify-content:center] [align-items:center] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Rectangle" data-node="1204:87966" className="w-[40px] h-[4px] [border-radius:var(--radius-s,_2px)] [background:var(--text-tertiary,_#6E767C)] shrink-0" />
      </div>
      <div data-figma="Frame" data-node="1204:87967" className="w-[10px] h-[8px] shrink-0 overflow-hidden" />
      <div data-figma="인기순" data-node="1204:87968" className="flex [padding:var(--spacing-12,_14px)_0] [justify-content:center] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:87969" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-1,_2px)] [flex:1_0_0] overflow-hidden">
          <p data-figma="인기순" data-node="1204:87970" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[39px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"인기순"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87970"]
          }} /></p>
          <p data-figma="보는 사람과 공감이 많은 방부터" data-node="1204:87971" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[140px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"보는 사람과 공감이 많은 방부터"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87971"]
          }} /></p>
        </div>
        <div data-figma="Icon / Line" data-node="1204:87972" data-instance-of="Icon / Line" className="flex w-[20px] h-[20px] [justify-content:center] [align-items:center] shrink-0 relative">
          <Icon data-figma="check" data-node="I1204:87972;1299:25635" name="check" color="var(--text-primary, #F8F8F8)" strokeScale={0.8} className="w-[20px] h-[20px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
      </div>
      <div data-figma="최신순" data-node="1204:87973" className="flex [padding:var(--spacing-12,_14px)_0] [justify-content:center] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:87974" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-1,_2px)] [flex:1_0_0] overflow-hidden">
          <p data-figma="최신순" data-node="1204:87975" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[39px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"최신순"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87975"]
          }} /></p>
          <p data-figma="방금 의자를 꺼낸 방부터" data-node="1204:87976" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[108px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"방금 의자를 꺼낸 방부터"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87976"]
          }} /></p>
        </div>
      </div>
      <div data-figma="맞춤순" data-node="1204:87977" className="flex [padding:var(--spacing-12,_14px)_0] [justify-content:center] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:87978" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-1,_2px)] [flex:1_0_0] overflow-hidden">
          <p data-figma="맞춤순" data-node="1204:87979" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 w-[39px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"맞춤순"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87979"]
          }} /></p>
          <p data-figma="내 고민이랑 비슷한 이야기부터" data-node="1204:87980" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[138px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"내 고민이랑 비슷한 이야기부터"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87980"]
          }} /></p>
        </div>
      </div>
    </div>;
  if (type === "미니 프로필") return <div data-figma="type=미니 프로필" data-node="1204:88002" className={cx("flex w-[390px] [padding:var(--spacing-12,_14px)_var(--spacing-17,_24px)_var(--spacing-20,_34px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-14,_18px)] [border-radius:24px_24px_0_0] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle" data-node="1204:87983" className="w-[40px] h-[4px] [border-radius:var(--radius-s,_2px)] [background:var(--text-tertiary,_#6E767C)] shrink-0" />
      <div data-figma="Frame" data-node="1204:87984" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] [align-self:stretch] shrink-0 overflow-hidden">
        <ChairAvatar data-figma="Avatar / 의자" className="flex w-[72px] h-[72px] [padding:6.48px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"avatar 작은 종류 3"} />
        <div data-figma="Frame" data-node="1204:87986" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] [flex:1_0_0] overflow-hidden">
          <div data-figma="Frame" data-node="1204:87987" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
            <p data-figma="따뜻한 가죽소파29" data-node="1204:87988" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[129px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:87988"]
            }} /></p>
            <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden" type={"종류 3"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:87990" className="flex [padding:var(--spacing-11,_12px)_var(--spacing-13,_16px)] [justify-content:space-between] [align-items:center] [align-self:stretch] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:87991" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden">
          <p data-figma="엉따 지수" data-node="1204:87992" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"엉따 지수"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87992"]
          }} /></p>
          <p data-figma="41.5°" data-node="1204:87993" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] shrink-0 w-[45px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.28px] left-[0px]">{"41.5°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87993"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:87994" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-end] [gap:var(--spacing-5,_6px)] shrink-0 overflow-hidden">
          <p data-figma="대표 배지" data-node="1204:87995" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"대표 배지"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:87995"]
          }} /></p>
          <div data-figma="Frame" data-node="1204:87996" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] shrink-0 overflow-hidden">
            <ReactionButton data-figma="Reaction Button" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"토닥 36"} />
            <ReactionButton data-figma="Reaction Button" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"웃김 36"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:87999" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Button / Primary" data-node="1204:88000" data-instance-of="Button / Primary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)]">
          <p data-figma="버튼" data-node="I1204:88000;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"추천하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:88000;3004:1215"]
          }} /></p>
        </div>
      </div>
      <ReportBlockLink data-figma="신고 차단 링크" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] shrink-0 overflow-hidden" type={"차단"} />
    </div>;
  if (type === "미니 프로필 390") return <div data-figma="type=미니 프로필 390" data-node="1204:88023" className={cx("flex w-[390px] [padding:var(--spacing-12,_14px)_var(--spacing-17,_24px)_var(--spacing-20,_34px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-14,_18px)] [border-radius:24px_24px_0_0] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle" data-node="1204:88004" className="w-[40px] h-[4px] [border-radius:var(--radius-s,_2px)] [background:var(--text-tertiary,_#6E767C)] shrink-0" />
      <div data-figma="Frame" data-node="1204:88005" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] [align-self:stretch] shrink-0 overflow-hidden">
        <ChairAvatar data-figma="Avatar / 의자" className="flex w-[72px] h-[72px] [padding:6.48px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"avatar 작은 종류 3"} />
        <div data-figma="Frame" data-node="1204:88007" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] [flex:1_0_0] overflow-hidden">
          <div data-figma="Frame" data-node="1204:88008" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
            <p data-figma="따뜻한 가죽소파29" data-node="1204:88009" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[129px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:88009"]
            }} /></p>
            <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden" type={"종류 3"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:88011" className="flex [padding:var(--spacing-11,_12px)_var(--spacing-13,_16px)] [justify-content:space-between] [align-items:center] [align-self:stretch] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:88012" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden">
          <p data-figma="엉따 지수" data-node="1204:88013" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"엉따 지수"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88013"]
          }} /></p>
          <p data-figma="41.5°" data-node="1204:88014" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] shrink-0 w-[45px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.28px] left-[0px]">{"41.5°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88014"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:88015" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-end] [gap:var(--spacing-5,_6px)] shrink-0 overflow-hidden">
          <p data-figma="대표 배지" data-node="1204:88016" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"대표 배지"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88016"]
          }} /></p>
          <div data-figma="Frame" data-node="1204:88017" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] shrink-0 overflow-hidden">
            <ReactionButton data-figma="Reaction Button" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"토닥 36"} />
            <ReactionButton data-figma="Reaction Button" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"웃김 36"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:88020" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="추천하기" data-node="1204:88021" data-instance-of="Button / Secondary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-subtle,_#06303C)]">
          <p data-figma="버튼" data-node="I1204:88021;3004:1217" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[79px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"✓ 추천했어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:88021;3004:1217"]
          }} /></p>
        </div>
      </div>
      <ReportBlockLink data-figma="신고 차단 링크" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] shrink-0 overflow-hidden" type={"차단"} />
    </div>;
  if (type === "신고") return <div data-figma="type=신고" data-node="1204:88058" className={cx("flex w-[390px] [padding:var(--spacing-12,_14px)_var(--spacing-17,_24px)_var(--spacing-21,_36px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] [border-radius:24px_24px_0_0] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Frame" data-node="1204:88025" className="flex [justify-content:center] [align-items:center] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Rectangle" data-node="1204:88026" className="w-[40px] h-[4px] [border-radius:var(--radius-s,_2px)] [background:var(--text-tertiary,_#6E767C)] shrink-0" />
      </div>
      <div data-figma="Frame" data-node="1204:88027" className="flex [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] shrink-0 overflow-hidden">
        <p data-figma="따뜻한 가죽소파29님을 신고할까요?" data-node="1204:88028" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[247px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[-0.36px]">{"따뜻한 가죽소파29님을 신고할까요?"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88028"]
        }} /></p>
        <p data-figma="신고 사유를 하나 골라주세요" data-node="1204:88029" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] shrink-0 w-[139px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.268px] left-[-0.26px]">{"신고 사유를 하나 골라주세요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88029"]
        }} /></p>
      </div>
      <div data-figma="신고 사유" data-node="1204:88030" className="flex [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-3,_4px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:88031" className="flex [padding:var(--spacing-9,_10px)_var(--spacing-12,_14px)] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] [border-radius:var(--radius-5xl,_12px)] [background:var(--brand-subtle,_#06303C)] shrink-0 overflow-hidden">
          <div data-figma="radio" data-node="1204:88032" className="w-[20px] h-[20px] [border-radius:10px] shrink-0 relative overflow-hidden [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"c1204_88032\"><rect width=\"20\" height=\"20\" rx=\"10\"/></clipPath></defs><g clip-path=\"url(#c1204_88032)\"><path d=\"M0 10 M20 10 M20 10 M0 10 M10 0 M20 10 M10 20 M0 10 M10 20 L10 18 C5.58172 18 2 14.4183 2 10 L0 10 L-2 10 C-2 16.6274 3.37258 22 10 22 L10 20 Z M20 10 L18 10 C18 14.4183 14.4183 18 10 18 L10 20 L10 22 C16.6274 22 22 16.6274 22 10 L20 10 Z M10 0 L10 2 C14.4183 2 18 5.58172 18 10 L20 10 L22 10 C22 3.37258 16.6274 -2 10 -2 L10 0 Z M10 0 L10 -2 C3.37258 -2 -2 3.37258 -2 10 L0 10 L2 10 C2 5.58172 5.58172 2 10 2 L10 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--brand-primary, #36D2FF)\"/></g></svg>"
          }} />
            <span data-figma="Ellipse" data-node="1204:88033" className="w-[10px] h-[10px] absolute left-[5px] top-[5px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88033"]
          }} />
          </div>
          <p data-figma="욕설 / 비하 / 혐오 표현" data-node="1204:88034" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:700] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[121px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"욕설 · 비하 · 혐오 표현"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88034"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:88035" className="flex [padding:var(--spacing-9,_10px)_var(--spacing-12,_14px)] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] [border-radius:var(--radius-5xl,_12px)] shrink-0 overflow-hidden">
          <div data-figma="radio" data-node="1204:88036" className="w-[20px] h-[20px] [border-radius:var(--radius-3xl,_10px)] shrink-0 overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"c1204_88036\"><rect width=\"20\" height=\"20\" rx=\"10\"/></clipPath></defs><g clip-path=\"url(#c1204_88036)\"><path d=\"M0 10 M20 10 M20 10 M0 10 M10 0 M20 10 M10 20 M0 10 M10 20 L10 18 C5.58172 18 2 14.4183 2 10 L0 10 L-2 10 C-2 16.6274 3.37258 22 10 22 L10 20 Z M20 10 L18 10 C18 14.4183 14.4183 18 10 18 L10 20 L10 22 C16.6274 22 22 16.6274 22 10 L20 10 Z M10 0 L10 2 C14.4183 2 18 5.58172 18 10 L20 10 L22 10 C22 3.37258 16.6274 -2 10 -2 L10 0 Z M10 0 L10 -2 C3.37258 -2 -2 3.37258 -2 10 L0 10 L2 10 C2 5.58172 5.58172 2 10 2 L10 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--text-tertiary, #6E767C)\"/></g></svg>"
          }} />

          </div>
          <p data-figma="성적인 발언" data-node="1204:88037" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[62px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"성적인 발언"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88037"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:88038" className="flex [padding:var(--spacing-9,_10px)_var(--spacing-12,_14px)] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] [border-radius:var(--radius-5xl,_12px)] shrink-0 overflow-hidden">
          <div data-figma="radio" data-node="1204:88039" className="w-[20px] h-[20px] [border-radius:var(--radius-3xl,_10px)] shrink-0 overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"c1204_88039\"><rect width=\"20\" height=\"20\" rx=\"10\"/></clipPath></defs><g clip-path=\"url(#c1204_88039)\"><path d=\"M0 10 M20 10 M20 10 M0 10 M10 0 M20 10 M10 20 M0 10 M10 20 L10 18 C5.58172 18 2 14.4183 2 10 L0 10 L-2 10 C-2 16.6274 3.37258 22 10 22 L10 20 Z M20 10 L18 10 C18 14.4183 14.4183 18 10 18 L10 20 L10 22 C16.6274 22 22 16.6274 22 10 L20 10 Z M10 0 L10 2 C14.4183 2 18 5.58172 18 10 L20 10 L22 10 C22 3.37258 16.6274 -2 10 -2 L10 0 Z M10 0 L10 -2 C3.37258 -2 -2 3.37258 -2 10 L0 10 L2 10 C2 5.58172 5.58172 2 10 2 L10 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--text-tertiary, #6E767C)\"/></g></svg>"
          }} />

          </div>
          <p data-figma="개인정보를 묻거나 노출함" data-node="1204:88040" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[135px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"개인정보를 묻거나 노출함"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88040"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:88041" className="flex [padding:var(--spacing-9,_10px)_var(--spacing-12,_14px)] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] [border-radius:var(--radius-5xl,_12px)] shrink-0 overflow-hidden">
          <div data-figma="radio" data-node="1204:88042" className="w-[20px] h-[20px] [border-radius:var(--radius-3xl,_10px)] shrink-0 overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"c1204_88042\"><rect width=\"20\" height=\"20\" rx=\"10\"/></clipPath></defs><g clip-path=\"url(#c1204_88042)\"><path d=\"M0 10 M20 10 M20 10 M0 10 M10 0 M20 10 M10 20 M0 10 M10 20 L10 18 C5.58172 18 2 14.4183 2 10 L0 10 L-2 10 C-2 16.6274 3.37258 22 10 22 L10 20 Z M20 10 L18 10 C18 14.4183 14.4183 18 10 18 L10 20 L10 22 C16.6274 22 22 16.6274 22 10 L20 10 Z M10 0 L10 2 C14.4183 2 18 5.58172 18 10 L20 10 L22 10 C22 3.37258 16.6274 -2 10 -2 L10 0 Z M10 0 L10 -2 C3.37258 -2 -2 3.37258 -2 10 L0 10 L2 10 C2 5.58172 5.58172 2 10 2 L10 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--text-tertiary, #6E767C)\"/></g></svg>"
          }} />

          </div>
          <p data-figma="스팸 / 홍보" data-node="1204:88043" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[59px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"스팸 · 홍보"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88043"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:88044" className="flex [padding:var(--spacing-9,_10px)_var(--spacing-12,_14px)] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] [border-radius:var(--radius-5xl,_12px)] shrink-0 overflow-hidden">
          <div data-figma="radio" data-node="1204:88045" className="w-[20px] h-[20px] [border-radius:var(--radius-3xl,_10px)] shrink-0 overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"c1204_88045\"><rect width=\"20\" height=\"20\" rx=\"10\"/></clipPath></defs><g clip-path=\"url(#c1204_88045)\"><path d=\"M0 10 M20 10 M20 10 M0 10 M10 0 M20 10 M10 20 M0 10 M10 20 L10 18 C5.58172 18 2 14.4183 2 10 L0 10 L-2 10 C-2 16.6274 3.37258 22 10 22 L10 20 Z M20 10 L18 10 C18 14.4183 14.4183 18 10 18 L10 20 L10 22 C16.6274 22 22 16.6274 22 10 L20 10 Z M10 0 L10 2 C14.4183 2 18 5.58172 18 10 L20 10 L22 10 C22 3.37258 16.6274 -2 10 -2 L10 0 Z M10 0 L10 -2 C3.37258 -2 -2 3.37258 -2 10 L0 10 L2 10 C2 5.58172 5.58172 2 10 2 L10 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--text-tertiary, #6E767C)\"/></g></svg>"
          }} />

          </div>
          <p data-figma="대화 방해 (도배 / 소음)" data-node="1204:88046" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[121px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"대화 방해 (도배 · 소음)"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88046"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:88047" className="flex [padding:var(--spacing-9,_10px)_var(--spacing-12,_14px)] [align-items:center] [gap:var(--spacing-11,_12px)] [align-self:stretch] [border-radius:var(--radius-5xl,_12px)] shrink-0 overflow-hidden">
          <div data-figma="radio" data-node="1204:88048" className="w-[20px] h-[20px] [border-radius:var(--radius-3xl,_10px)] shrink-0 overflow-hidden relative [isolation:isolate]">
            <span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [z-index:-1] [line-height:0]" dangerouslySetInnerHTML={{
            __html: "<svg data-px=\"\" data-box=\"\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"c1204_88048\"><rect width=\"20\" height=\"20\" rx=\"10\"/></clipPath></defs><g clip-path=\"url(#c1204_88048)\"><path d=\"M0 10 M20 10 M20 10 M0 10 M10 0 M20 10 M10 20 M0 10 M10 20 L10 18 C5.58172 18 2 14.4183 2 10 L0 10 L-2 10 C-2 16.6274 3.37258 22 10 22 L10 20 Z M20 10 L18 10 C18 14.4183 14.4183 18 10 18 L10 20 L10 22 C16.6274 22 22 16.6274 22 10 L20 10 Z M10 0 L10 2 C14.4183 2 18 5.58172 18 10 L20 10 L22 10 C22 3.37258 16.6274 -2 10 -2 L10 0 Z M10 0 L10 -2 C3.37258 -2 -2 3.37258 -2 10 L0 10 L2 10 C2 5.58172 5.58172 2 10 2 L10 0 Z\" fill-rule=\"nonzero\" style=\"fill:var(--text-tertiary, #6E767C)\"/></g></svg>"
          }} />

          </div>
          <p data-figma="기타" data-node="1204:88049" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:14px] [font-style:normal] [font-weight:500] [line-height:20px] [letter-spacing:-0.56px] shrink-0 w-[24px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.096px] left-[0px]">{"기타"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88049"]
          }} /></p>
        </div>
      </div>
      <div data-figma="상세 입력 (선택)" data-node="1204:88050" className="h-[76px] [align-self:stretch] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-elevated,_#222628)] shrink-0 w-[342px] relative overflow-hidden">
        <p data-figma="자세한 상황을 알려주세요 (선택)" data-node="1204:88051" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:13px] [font-style:normal] [font-weight:400] [line-height:18px] [letter-spacing:-0.52px] absolute left-[14px] top-[12px] w-[158px] h-[18px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.268px] left-[0px]">{"자세한 상황을 알려주세요 (선택)"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88051"]
        }} /></p>
        <p data-figma="0/200" data-node="1204:88052" data-outline="" className="[color:var(--text-tertiary,_#6E767C)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:11px] [font-style:normal] [font-weight:500] [line-height:15px] [letter-spacing:-0.44px] absolute left-[300px] top-[54px] w-[30px] h-[15px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent]"><span className="relative top-[0.496px] left-[0px]">{"0/200"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88052"]
        }} /></p>
      </div>
      <div data-figma="정책 안내" data-node="1204:88053" className="flex [padding:var(--spacing-11,_12px)_var(--spacing-12,_14px)] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-7,_8px)] [align-self:stretch] [border-radius:var(--radius-6xl,_14px)] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Icon / Line" data-node="1204:88054" data-instance-of="Icon / Line" className="flex w-[16px] h-[16px] [justify-content:center] [align-items:center] shrink-0 relative">
          <Icon data-figma="information" data-node="I1204:88054;1299:30760" name="information-1463-24333" color="var(--brand-primary, #36D2FF)" className="w-[16px] h-[16px] shrink-0 absolute left-[0px] top-[0px]" />
        </div>
        <p data-figma="신고해도 통화는 그대로 유지되고, 상대에게 알리지 않아요. 바로 대화를 끊고 싶다면 차단도 함께 해주세요." data-node="1204:88055" data-outline="" className="[flex:1_0_0] [color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"신고해도 통화는 그대로 유지되고, 상대에게 알리지 않아요. 바로\n대화를 끊고 싶다면 차단도 함께 해주세요."}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1204:88055"]
        }} /></p>
      </div>
      <Checkbox data-figma="checkbox" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden" type={"default"} />
      <div data-figma="Button / Danger" data-node="1204:88057" data-instance-of="Button / Danger" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [align-self:stretch] [border-radius:var(--radius-12xl,_26px)] [background:var(--accent-red,_#FF5A5F)] shrink-0">
        <p data-figma="버튼" data-node="I1204:88057;3004:1219" data-outline="" className="[color:var(--text-primary,_#F8F8F8)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"신고하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["I1204:88057;3004:1219"]
        }} /></p>
      </div>
    </div>;
  if (type === "미니 프로필 390 2") return <div data-figma="type=미니 프로필 390 2" data-node="1204:88080" className={cx("flex w-[390px] [padding:var(--spacing-12,_14px)_var(--spacing-17,_24px)_var(--spacing-20,_34px)_var(--spacing-17,_24px)] [flex-direction:column] [justify-content:center] [align-items:center] [gap:var(--spacing-14,_18px)] [border-radius:24px_24px_0_0] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle" data-node="1204:88060" className="w-[40px] h-[4px] [border-radius:var(--radius-s,_2px)] [background:var(--text-tertiary,_#6E767C)] shrink-0" />
      <div data-figma="Frame" data-node="1204:88061" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] [align-self:stretch] shrink-0 overflow-hidden">
        <ChairAvatar data-figma="avatar" className="flex w-[72px] h-[72px] [padding:6.792px_6.48px_6.168px_6.48px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"72"} />
        <div data-figma="Frame" data-node="1204:88063" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-3,_4px)] [flex:1_0_0] overflow-hidden">
          <div data-figma="Frame" data-node="1204:88064" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-7,_8px)] shrink-0 overflow-hidden">
            <p data-figma="따뜻한 가죽소파29" data-node="1204:88065" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[129px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1204:88065"]
            }} /></p>
            <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden" type={"종류 3"} />
          </div>
          <p data-figma="Lv.3" data-node="1204:88067" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[21px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"Lv.3 "}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88067"]
          }} /></p>
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:88068" className="flex [padding:var(--spacing-11,_12px)_var(--spacing-13,_16px)] [justify-content:space-between] [align-items:center] [align-self:stretch] [border-radius:var(--radius-7xl,_16px)] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1204:88069" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden">
          <p data-figma="엉따 지수" data-node="1204:88070" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"엉따 지수"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88070"]
          }} /></p>
          <p data-figma="41.5°" data-node="1204:88071" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] shrink-0 w-[45px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.28px] left-[0px]">{"41.5°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88071"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1204:88072" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-end] [gap:var(--spacing-5,_6px)] shrink-0 overflow-hidden">
          <p data-figma="대표 배지" data-node="1204:88073" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"대표 배지"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1204:88073"]
          }} /></p>
          <div data-figma="Frame" data-node="1204:88074" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] shrink-0 overflow-hidden">
            <ReactionButton data-figma="Reaction Button" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"토닥 36"} />
            <ReactionButton data-figma="Reaction Button" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"웃김 36"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1204:88077" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-9,_10px)] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Button / Primary" data-node="1204:88078" data-instance-of="Button / Primary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)]">
          <p data-figma="버튼" data-node="I1204:88078;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"추천하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1204:88078;3004:1215"]
          }} /></p>
        </div>
      </div>
      <ReportBlockLink data-figma="신고 / 차단" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] shrink-0 overflow-hidden" type={"차단"} />
    </div>;
  if (type === "수정본") return <div data-figma="type=수정본" data-node="1299:21255" className={cx("flex w-[390px] [padding:14px_24px_34px_24px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[18px] [border-radius:24px_24px_0_0] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle" data-node="1299:21236" className="w-[40px] h-[4px] [border-radius:2px] [background:var(--text-tertiary,_#6E767C)] shrink-0" />
      <div data-figma="Frame" data-node="1299:21237" className="flex [justify-content:center] [align-items:center] gap-[16px] [align-self:stretch] shrink-0 overflow-hidden">
        <ChairAvatar data-figma="avatar" className="flex w-[72px] h-[72px] [padding:6.792px_6.48px_6.168px_6.48px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"72"} />
        <div data-figma="Frame" data-node="1299:21239" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] gap-[4px] [flex:1_0_0] overflow-hidden">
          <div data-figma="Frame" data-node="1299:21240" className="flex [justify-content:center] [align-items:center] gap-[8px] shrink-0 overflow-hidden">
            <p data-figma="따뜻한 가죽소파29" data-node="1299:21241" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[129px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1299:21241"]
            }} /></p>
            <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden" type={"종류 3"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1299:21243" className="flex [padding:12px_16px] [justify-content:space-between] [align-items:center] [align-self:stretch] [border-radius:16px] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1299:21244" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] gap-[2px] shrink-0 overflow-hidden">
          <p data-figma="엉따 지수" data-node="1299:21245" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"엉따 지수"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:21245"]
          }} /></p>
          <p data-figma="41.5°" data-node="1299:21246" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] shrink-0 w-[45px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.28px] left-[0px]">{"41.5°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:21246"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1299:21247" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-end] gap-[6px] shrink-0 overflow-hidden">
          <p data-figma="대표 배지" data-node="1299:21248" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"대표 배지"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:21248"]
          }} /></p>
          <div data-figma="Frame" data-node="1299:21249" className="flex [justify-content:center] [align-items:center] gap-[6px] shrink-0 overflow-hidden">
            <ReactionButton data-figma="reaction / 토닥" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"토닥 36"} />
            <ReactionButton data-figma="reaction / 웃김" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"웃김 36"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1299:21252" className="flex [justify-content:center] [align-items:center] gap-[10px] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="Button / Primary" data-node="1299:21253" data-instance-of="Button / Primary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-primary,_#36D2FF)]">
          <p data-figma="버튼" data-node="I1299:21253;3004:1215" data-outline="" className="[color:var(--bg-base,_#000)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[51px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"추천하기"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:21253;3004:1215"]
          }} /></p>
        </div>
      </div>
      <ReportBlockLink data-figma="신고 / 차단" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] shrink-0 overflow-hidden" type={"차단"} />
    </div>;
  if (type === "수정본 2") return <div data-figma="type=수정본 2" data-node="1299:21276" className={cx("flex w-[390px] [padding:14px_24px_34px_24px] [flex-direction:column] [justify-content:center] [align-items:center] gap-[18px] [border-radius:24px_24px_0_0] [background:var(--bg-surface,_#121415)] relative overflow-hidden", className)} style={style}>
      <div data-figma="Rectangle" data-node="1299:21257" className="w-[40px] h-[4px] [border-radius:2px] [background:var(--text-tertiary,_#6E767C)] shrink-0" />
      <div data-figma="Frame" data-node="1299:21258" className="flex [justify-content:center] [align-items:center] gap-[16px] [align-self:stretch] shrink-0 overflow-hidden">
        <ChairAvatar data-figma="avatar" className="flex w-[72px] h-[72px] [padding:6.792px_6.48px_6.168px_6.48px] [justify-content:center] [align-items:center] shrink-0 relative overflow-hidden" size={"72"} />
        <div data-figma="Frame" data-node="1299:21260" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] gap-[4px] [flex:1_0_0] overflow-hidden">
          <div data-figma="Frame" data-node="1299:21261" className="flex [justify-content:center] [align-items:center] gap-[8px] shrink-0 overflow-hidden">
            <p data-figma="따뜻한 가죽소파29" data-node="1299:21262" data-outline="" className="[color:var(--text-primary-50,_rgba(248,_248,_248,_0.50))] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:18px] [font-style:normal] [font-weight:700] [line-height:25px] [letter-spacing:-0.72px] shrink-0 w-[129px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.052px] left-[0px]">{"따뜻한 가죽소파29"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["1299:21262"]
            }} /></p>
            <VoiceWave data-figma="voice wave" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-1,_2px)] shrink-0 overflow-hidden" type={"종류 3"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1299:21264" className="flex [padding:12px_16px] [justify-content:space-between] [align-items:center] [align-self:stretch] [border-radius:16px] [background:var(--bg-elevated,_#222628)] shrink-0 overflow-hidden">
        <div data-figma="Frame" data-node="1299:21265" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-start] gap-[2px] shrink-0 overflow-hidden">
          <p data-figma="엉따 지수" data-node="1299:21266" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"엉따 지수"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:21266"]
          }} /></p>
          <p data-figma="41.5°" data-node="1299:21267" data-outline="" className="[color:var(--accent-orange,_#FF9A4D)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:20px] [font-style:normal] [font-weight:700] [line-height:28px] [letter-spacing:-0.8px] shrink-0 w-[45px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[-0.28px] left-[0px]">{"41.5°"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:21267"]
          }} /></p>
        </div>
        <div data-figma="Frame" data-node="1299:21268" className="flex [flex-direction:column] [justify-content:center] [align-items:flex-end] gap-[6px] shrink-0 overflow-hidden">
          <p data-figma="대표 배지" data-node="1299:21269" data-outline="" className="[color:var(--text-secondary,_#9AA1A6)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] shrink-0 w-[43px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.132px] left-[0px]">{"대표 배지"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["1299:21269"]
          }} /></p>
          <div data-figma="Frame" data-node="1299:21270" className="flex [justify-content:center] [align-items:center] gap-[6px] shrink-0 overflow-hidden">
            <ReactionButton data-figma="reaction / 토닥" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"토닥 36"} />
            <ReactionButton data-figma="reaction / 웃김" className="flex w-[36px] h-[36px] [justify-content:center] [align-items:center] shrink-0 overflow-hidden" type={"웃김 36"} />
          </div>
        </div>
      </div>
      <div data-figma="Frame" data-node="1299:21273" className="flex [justify-content:center] [align-items:center] gap-[10px] [align-self:stretch] shrink-0 overflow-hidden">
        <div data-figma="추천하기" data-node="1299:21274" data-instance-of="Button / Secondary" className="flex h-[52px] [justify-content:center] [align-items:center] [gap:var(--spacing-5,_6px)] [flex:1_0_0] [border-radius:var(--radius-12xl,_26px)] [background:var(--brand-subtle,_#06303C)]">
          <p data-figma="버튼" data-node="I1299:21274;3004:1217" data-outline="" className="[color:var(--brand-primary,_#36D2FF)] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:15px] [font-style:normal] [font-weight:700] [line-height:21px] [letter-spacing:-0.6px] shrink-0 [white-space:pre] [word-break:normal] [overflow-wrap:normal] m-0 w-[79px] [-webkit-text-fill-color:transparent] relative"><span className="relative top-[0.04px] left-[0px]">{"✓ 추천했어요"}</span><span aria-hidden="true" className="absolute left-[0] top-[0] w-[0] h-[0] overflow-visible [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1299:21274;3004:1217"]
          }} /></p>
        </div>
      </div>
      <ReportBlockLink data-figma="신고 / 차단" className="flex [justify-content:center] [align-items:center] [gap:var(--spacing-13,_16px)] shrink-0 overflow-hidden" type={"차단"} />
    </div>;
  return null;
}