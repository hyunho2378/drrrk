// 클립이 붙은 홈(62). 피그마 FRAME 2296:20815 "DRRRK · 홈 (Dark)" 2026. 11. 11. 현재 값. 네이버 클립에서 드르륵으로 들어오면 이 홈이 뜬다.
// 입력칸을 누르면 같은 장면 안에서 63(2296:20794) 모양으로 펼쳐진다(HomeScene clip).
import React from 'react';
import HomeScene from './HomeScene.jsx';

export default function HomeClip(props) {
  return <HomeScene clip {...props} />;
}
