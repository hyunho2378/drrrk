// 입력칸을 연 클립이 붙은 홈(63). 피그마 FRAME 2296:20794 "DRRRK · 홈 (Dark)" 2026. 11. 11. 현재 값. 62와 같은 장면을 펼친 상태로 그린다.
import React from 'react';
import HomeScene from './HomeScene.jsx';

export default function HomeClipOpen(props) {
  return <HomeScene clip startOpen {...props} />;
}
