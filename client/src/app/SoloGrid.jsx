// 혼자 드르륵 방 그리드(64, 피그마 2340:21259 "나", 2340:21344 "AI의자"). 머리, 시계, 고민 줄, 입력줄은 혼자 방 첫 화면(46) 생성 화면과 같으므로 그대로 그리고,
// 현장 장면을 빼고 큰 칸 두 장과 점, 채팅 줄을 까는 일은 보이기 전에 soloGrid.js(live.js prepare)가 한다.
import React from 'react';
import { SoloVideo as Gen } from '../figma/screens/SoloVideo.jsx';

export default function SoloGrid(props) {
  return <Gen {...props} />;
}
