// 입력칸을 연 홈(24). 피그마 FRAME 1647:23436 "DRRRK · 홈 (Dark)" 2026. 11. 10. 현재 값. 접힌 홈(25)과 같은 장면이라 HomeScene을 펼친 상태로 그린다.
import React from 'react';
import HomeScene from './HomeScene.jsx';

export default function HomeDark(props) {
  return <HomeScene startOpen {...props} />;
}
