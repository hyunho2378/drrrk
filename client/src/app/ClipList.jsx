// 네이버 클립 콘텐츠 리스트(추천 탭). 팀 피그마 "클립 콘텐츠 리스트"와 같은 값이다.
// 드르륵 에이전트 버튼은 클립 모든 화면에서 같은 자리에 떠다닌다(ClipAgent.jsx).
import React from 'react';
import { Scene } from './ClipKit.jsx';
import { LIST } from './ClipScenes.js';
import { ClipAgent } from './ClipAgent.jsx';

export function ClipList(props) {
  return (
    <Scene items={LIST.filter((it) => it.n !== '드르륵 에이전트 버튼')} name="클립 콘텐츠 리스트" node="clip-list" bg="#131313" {...props}>
      <ClipAgent delay={700} />
    </Scene>
  );
}
