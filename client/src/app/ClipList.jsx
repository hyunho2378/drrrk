// 네이버 클립 콘텐츠 리스트(추천 탭). 팀 피그마 "클립 콘텐츠 리스트"(1843:40427)를 같은 값으로 옮겼다.
import React from 'react';
import { A, S, Svg, Pic, Label, Pill, type, pic } from './ClipKit.jsx';

const DIM = '#9A9A9A';
const TAB = '#BDBDBD';

export function ClipList({ style, className }) {
  return (
    <div data-figma="클립 콘텐츠 리스트" data-node="clip-list" className={className}
      style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', background: '#131313', ...style }}>
      <Svg name="Icon / 즐겨찾기" x={17} y={64} w={21} h={21} html={S(21, 21, '<path d="M5.5 2.5h10a1.5 1.5 0 0 1 1.5 1.5v14.5l-6.5-4-6.5 4V4a1.5 1.5 0 0 1 1.5-1.5z"/><path d="M12.5 6l-4.5 4.5"/>')} />
      <Svg name="Icon / 검색" x={351} y={64} w={21} h={21} html={S(21, 21, '<circle cx="9" cy="9" r="6.3"/><path d="M13.8 13.8L18.5 18.5"/>')} />
      <Label name="탭 구독" x={124} cy={75} size={18} weight={700} color={DIM}>구독</Label>
      <Label name="탭 추천" x={172} cy={75} size={18} weight={700} color="#FFFFFF">추천</Label>
      <Label name="탭 내클립" x={220} cy={75} size={18} weight={700} color={DIM}>내클립</Label>
      <div data-figma="탭 밑줄" style={A(172, 87, 33, 2, { background: '#FFFFFF', borderRadius: 1 })} />

      <Pic name="썸네일 / 쌍밍아웃 영상" src="vid" x={8} y={109} w={183} h={326} r={12} />
      <div data-figma="배너 / 오늘의 행운 뽑기" style={A(199, 109, 183, 183, { borderRadius: 12, overflow: 'hidden', background: '#3E8CF0' })}>
        <img src={pic('banner')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={A(0, 19, 183, 18, { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 })}>
          <span style={{ width: 18, height: 18, lineHeight: 0, fontSize: 0 }} dangerouslySetInnerHTML={{ __html: S(18, 18, '<circle cx="9" cy="9" r="7.5" stroke-width="1.9"/><path d="M7.3 5.9l4.7 3.1-4.7 3.1z" fill="#FFFFFF" stroke-width="1"/>') }} />
          <span style={type(17, 700, '#FFFFFF', { lineHeight: '18px' })}>Clip</span>
        </div>
        <Label name="배너 제목" cx={91.5} cy={51} size={19} weight={700} color="#FFFFFF" w={183} style={{ lineHeight: '26px', height: 26, top: 38 }}>오늘의 행운 뽑기</Label>
        <Label name="배너 부제" cx={91.5} cy={75} size={14} weight={500} color="#FFFFFF" w={183} style={{ opacity: 0.85 }}>무조건 내 편 들어주는</Label>
      </div>

      <Pic name="썸네일 / 편집 영상" src="desk" x={199} y={305} w={183} h={101} r={12} />
      <Pill name="NEW 알약 / 편집 영상" x={207} y={313} h={22} bg="#FFFFFF" color="#131313" weight={700} padX={9}>NEW</Pill>
      <Pill name="시간 알약 / 02:00" right={16} y={313} h={22} bg="rgba(0,0,0,0.5)" padX={7} radius={6}>02:00</Pill>
      <Label name="제목 / 편집 영상" x={202} y={414} size={14} weight={500} color="#FFFFFF">주말 브이로그 편집 꿀팁</Label>
      <Pic name="아바타 / 편집하는 하루" src="av1" x={202} y={435} w={20} h={20} round />
      <Label name="크리에이터 / 편집하는 하루" x={228} cy={445} size={13} weight={500} color="#FFFFFF">편집하는 하루</Label>

      <Pic name="아바타 / 쌍수일기" src="av0" x={12} y={441} w={20} h={20} round />
      <Label name="크리에이터 / 쌍수일기" x={38} cy={451} size={13} weight={500} color="#FFFFFF">쌍수일기</Label>

      <Pic name="썸네일 / 카페 모아보기" src="cafe" x={8} y={479} w={183} h={244} r={12} />
      <Pill name="NEW 알약 / 카페 모아보기" x={16} y={487} h={22} bg="#FFFFFF" color="#131313" weight={700} padX={9}>NEW</Pill>
      <Label name="제목 / 카페 모아보기" x={12} y={731} size={14} weight={500} color="#FFFFFF" style={{ whiteSpace: 'pre', height: 40 }}>{'겨울 카페 모아보기\n이번 주 다섯 곳'}</Label>

      <Pic name="썸네일 / 댄스 연습실" src="dance" x={199} y={473} w={183} h={284} r={12} />
      <Pill name="시간 알약 / 00:11" right={16} y={481} h={22} bg="rgba(0,0,0,0.5)" padX={7} radius={6}>00:11</Pill>

      <div data-figma="하단 바" style={A(0, 756, 390, 88, { background: '#1D1D1D', borderRadius: '24px 24px 0 0' })}>
        <div style={A(25, 4, 28, 28, { borderRadius: 8, background: 'linear-gradient(180deg,#7A4BE8,#35208F)' })} />
        <div style={A(77, 5, 1, 39, { background: '#2D2D2D' })} />
        <Svg name="Icon / 홈" x={104} y={6} w={24} h={24} html={S(24, 24, '<rect x="3" y="3" width="18" height="18" rx="5.5"/><path d="M9 16.5V7.5l6 9v-9"/>', { c: TAB })} />
        <Svg name="Icon / 투데이" x={182} y={6} w={24} h={24} html={S(24, 24, '<rect x="4" y="3" width="16" height="18" rx="3.2"/><path d="M8 9h8M8 13h5"/>', { c: TAB })} />
        <Svg name="Icon / 클립" x={260} y={6} w={24} h={24} html={S(24, 24, '<circle cx="12" cy="12" r="9" stroke-width="2.2"/><path d="M10 8.5l6 3.5-6 3.5z" fill="#FFFFFF" stroke-width="1.2"/>', { sw: 2.2 })} />
        <Svg name="Icon / 마이" x={338} y={6} w={24} h={24} html={S(24, 24, '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18c1.2-2.4 3.2-3.5 5.5-3.5s4.3 1.1 5.5 3.5"/>', { c: TAB })} />
        <Label name="라벨 쇼핑" cx={39} cy={40} size={12} weight={500} color={TAB} w={60}>쇼핑</Label>
        <Label name="라벨 홈" cx={116} cy={40} size={12} weight={500} color={TAB} w={60}>홈</Label>
        <Label name="라벨 투데이" cx={194} cy={40} size={12} weight={500} color={TAB} w={60}>투데이</Label>
        <Label name="라벨 클립" cx={272} cy={40} size={12} weight={700} color="#FFFFFF" w={60}>클립</Label>
        <Label name="라벨 마이" cx={350} cy={40} size={12} weight={500} color={TAB} w={60}>마이</Label>
      </div>
    </div>
  );
}
