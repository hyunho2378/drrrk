// 네이버 클립 영상 보기. 팀 피그마 "클립 영상 보기"(1843:40496)를 같은 값으로 옮겼다.
import React from 'react';
import { A, S, Svg, Pic, Label, Pill, type, pic } from './ClipKit.jsx';

const SHADOW = { filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' };
const TSHADOW = { textShadow: '0 1px 4px rgba(0,0,0,0.4)' };

export function ClipPlayer({ style, className }) {
  return (
    <div data-figma="클립 영상 보기" data-node="clip-player" className={className}
      style={{ position: 'relative', width: '390px', height: '844px', overflow: 'hidden', background: '#000000', ...style }}>
      <div data-figma="영상 / 쌍밍아웃" style={A(0, 0, 390, 750, { overflow: 'hidden', background: '#2D2D2D' })}>
        <img src={pic('vid')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div data-figma="Scrim 위" style={A(0, 0, 390, 130, { background: 'linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0))' })} />
      <div data-figma="Scrim 아래" style={A(0, 520, 390, 230, { background: 'linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.6))' })} />
      <div data-figma="아래 검정 영역" style={A(0, 750, 390, 94, { background: '#000000' })} />
      <div data-figma="진행 바 트랙" style={A(0, 748, 390, 3, { background: '#2D2D2D' })} />
      <div data-figma="진행 바" style={A(0, 748, 200, 3, { background: '#A9F472' })} />

      <Svg name="Icon / 뒤로" x={15} y={64} w={15} h={21} html={S(15, 21, '<path d="M12 2.5L4 10.5l8 8"/>', { sw: 2 })} />
      <Svg name="Icon / 소리" x={350} y={64} w={24} h={21} html={S(24, 21, '<path d="M2 7.5h3.5l5-4v14l-5-4H2z"/><path d="M14.5 7.2a5 5 0 0 1 0 6.6"/><path d="M17.5 4.5a8.8 8.8 0 0 1 0 12"/>')} />

      <div data-figma="배지 / 이벤트" style={A(338, 415, 42, 48, SHADOW)}>
        <div style={A(3, 0, 36, 36, { borderRadius: '50%', background: 'linear-gradient(180deg,#2A3A8A,#0F1744)' })} />
        <div style={A(14, 6, 14, 20, { background: '#FFFFFF', borderRadius: 3 })} />
        <div style={A(17, 10, 8, 2, { background: '#D93A3A', borderRadius: 1 })} />
        <div style={A(17, 14, 8, 2, { background: '#222222', borderRadius: 1 })} />
        <div style={A(17, 18, 6, 2, { background: '#222222', borderRadius: 1 })} />
        <div style={A(0, 32, 42, 16, { boxSizing: 'border-box', border: '1px solid #FFFFFF', background: '#0D0D0D', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', ...type(11, 700, '#FFFFFF') })}>이벤트</div>
      </div>
      <Svg name="Icon / 좋아요" x={347} y={492} w={25} h={22} style={SHADOW} html={S(25, 22, '<path d="M12.5 20C5 14.5 2 11 2 7.2A5 5 0 0 1 12.5 5a5 5 0 0 1 10.5 2.2C23 11 20 14.5 12.5 20z"/>')} />
      <Label name="좋아요 수" cx={359} cy={528} size={12} weight={500} color="#FFFFFF" w={60} style={TSHADOW}>2,413</Label>
      <Svg name="Icon / 댓글" x={347} y={561} w={25} h={22} style={SHADOW} html={S(25, 22, '<path d="M12.5 2C6.7 2 2 5.9 2 10.7c0 2.7 1.5 5 3.9 6.6L5 21l4.2-2.3c1.1.3 2.2.4 3.3.4 5.8 0 10.5-3.9 10.5-8.7S18.3 2 12.5 2z"/><circle cx="8" cy="10.7" r="1.2" fill="#FFFFFF"/><circle cx="12.5" cy="10.7" r="1.2" fill="#FFFFFF"/><circle cx="17" cy="10.7" r="1.2" fill="#FFFFFF"/>')} />
      <Label name="댓글 수" cx={359} cy={598} size={12} weight={500} color="#FFFFFF" w={60} style={TSHADOW}>187</Label>
      <Svg name="Icon / 저장" x={349} y={631} w={20} h={21} style={SHADOW} html={S(20, 21, '<path d="M4 2h12a1.5 1.5 0 0 1 1.5 1.5V19L10 14.4 2.5 19V3.5A1.5 1.5 0 0 1 4 2z"/>')} />
      <Label name="저장 라벨" cx={359} cy={666} size={12} weight={500} color="#FFFFFF" w={60} style={TSHADOW}>저장</Label>
      <Svg name="Icon / 더보기" x={348} y={704} w={22} h={12} style={SHADOW} html={S(22, 12, '<circle cx="3" cy="6" r="2" fill="#FFFFFF" stroke="none"/><circle cx="11" cy="6" r="2" fill="#FFFFFF" stroke="none"/><circle cx="19" cy="6" r="2" fill="#FFFFFF" stroke="none"/>')} />

      <div data-figma="댓글 말풍선" style={{ position: 'absolute', left: 16, top: 584, height: 32, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 14px 0 6px', borderRadius: 16, background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <span style={{ width: 20, height: 20, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#2D2D2D', lineHeight: 0 }}><img src={pic('av2')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></span>
        <span style={type(14, 400, '#1A1A1A')}>이거 완전 내 얘기잖아 ㅠㅠ</span>
      </div>

      <div data-figma="크리에이터 줄" style={{ position: 'absolute', left: 15, top: 628, height: 32, display: 'flex', alignItems: 'center' }}>
        <span style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#2D2D2D', lineHeight: 0 }}><img src={pic('av0')} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></span>
        <span style={type(16, 600, '#FFFFFF', { marginLeft: 9, lineHeight: '22px' })}>쌍수일기</span>
        <span style={{ position: 'relative', width: 16, height: 16, marginLeft: 6, borderRadius: '50%', background: '#F5A524', flexShrink: 0, lineHeight: 0, fontSize: 0 }} dangerouslySetInnerHTML={{ __html: S(16, 16, '<path d="M4.6 8.3l2.4 2.4 4.4-4.9" stroke-width="1.7"/>') }} />
        <span data-figma="팔로우 알약" style={{ marginLeft: 10, height: 24, boxSizing: 'border-box', padding: '0 12px', border: '1px solid #FFFFFF', borderRadius: 12, display: 'inline-flex', alignItems: 'center', ...type(13, 500, '#FFFFFF') }}>팔로우</span>
      </div>

      <Label name="캡션" x={16} y={671} size={15} weight={500} color="#FFFFFF" w={314}>친구가 썸남 앞에서 내 쌍밍아웃함... <span style={{ color: '#B0B0B0' }}>더보기</span></Label>
      <Pill name="AI 활용 칩" x={16} y={700} h={30} bg="rgba(255,255,255,0.14)" color="#E6E6E6" size={14} weight={500} padX={12} radius={8}>AI 활용</Pill>

      <div data-figma="댓글 입력" style={A(16, 760, 357, 47, { boxSizing: 'border-box', border: '1px solid #2D2D2D', borderRadius: 24 })} />
      <Label name="댓글 입력 안내" x={36} cy={783.5} size={15} weight={400} color="#8A8A8A">댓글을 남겨보세요...</Label>
    </div>
  );
}
