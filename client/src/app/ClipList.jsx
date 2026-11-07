// 네이버 클립 콘텐츠 리스트(추천 탭). 팀 피그마 "클립 콘텐츠 리스트"와 같은 값이다.
import React from 'react';
import { Scene } from './ClipKit.jsx';
import { LIST } from './ClipScenes.js';

export function ClipList(props) {
  return <Scene items={LIST} name="클립 콘텐츠 리스트" node="clip-list" bg="#131313" {...props} />;
}
