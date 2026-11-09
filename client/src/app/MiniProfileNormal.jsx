// 일반 모드 이름 누름(23, 피그마 1952:16490): 일반 모드 참여자 칸 위에 미니 프로필 새 카드(1972:22875와 같은 값)를 얹는다.
import React from 'react';
import { MiniProfileScreen } from './MiniProfile.jsx';
import { NormalNameTap2 } from '../figma/screens/NormalNameTap2.jsx';

export default function MiniProfileNormal() {
  return <MiniProfileScreen Base={NormalNameTap2} />;
}
