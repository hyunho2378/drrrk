// 네이버 클립 영상 보기. 팀 피그마 "클립 영상 보기"와 같은 값이다.
import React from 'react';
import { Scene } from './ClipKit.jsx';
import { PLAYER } from './ClipScenes.js';

export function ClipPlayer(props) {
  return <Scene items={PLAYER} name="클립 영상 보기" node="clip-player" bg="#000000" {...props} />;
}
