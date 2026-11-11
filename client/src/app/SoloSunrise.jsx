// 혼자 드르륵 방 해 뜨는 단계(66, 피그마 2351:34553 "DRRRK · 드르륵 · 현장 모드", 해 뜨기까지 01:12 빨강 시계).
// 탁빛나 11/12 "아침해 뜨는거 반영 필요". 채팅 세 줄, 내 말풍선, 고민 줄, 입력줄은 41번(1647:24874) 생성 화면과 같으므로 그대로 그리고,
// 접힌 퀵슬롯과 빨강 시계, 해뜨기 영상 첫 장면 대체는 보이기 전에 soloSunrise.js와 sunriseVideo.js(live.js prepare)가 한다.
import React from 'react';
import { SoloField1 as Gen } from '../figma/screens/SoloField1.jsx';

export default function SoloSunrise(props) {
  return <Gen {...props} />;
}
