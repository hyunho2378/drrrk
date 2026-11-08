// 추천 드르륵(방을 찾지 못함). 팀 피그마 1647:25167을 생성 화면 그대로 쓰고, 빠져 있던 가운데 그림(흰 편의점 의자와 오징어땅콩, 몬스타, 먹태)을 피그마 자리에 얹는다.
// 빛나 요청(피그마 댓글, 2026. 11. 9.): 오징어땅콩, 몬스타, 먹태는 각자 다른 박자로 살짝 좌우로 흔들린다(transform만). iOS와 같은 값: 오땅 ±5°/2.4초, 몬스타 ±4°/2.9초, 먹태 ±6°/2.6초.
import React from 'react';
import { SoloNoRoom as Gen } from '../figma/screens/SoloNoRoom.jsx';

const BASE = (import.meta.env.BASE_URL || '/') + 'assets/solo/';
const CSS = `
@keyframes snWiggle{0%,100%{transform:rotate(calc(-1deg * var(--a, 4)))}50%{transform:rotate(calc(1deg * var(--a, 4)))}}
.sn-w{animation-name:snWiggle;animation-timing-function:cubic-bezier(.45,0,.55,1);animation-iteration-count:infinite}
@media (prefers-reduced-motion:reduce){.sn-w{animation:none}}
`;
const CHAIR = {"id":"1971:20827","name":"image 1208091483","x":87,"y":413,"w":216,"h":201};
const SNACKS = [
  { ...{"id":"1971:20833","name":"squid_peanut_snack","x":75,"y":374,"w":94.3,"h":86.4}, ms: 2400, delay: 0, a: 5 },
  { ...{"id":"1971:20834","name":"energy_drink","x":239.1,"y":412,"w":75.9,"h":95.4}, ms: 2900, delay: -350, a: 4 },
  { ...{"id":"1971:20837","name":"dried_fish","x":215.1,"y":374,"w":95.6,"h":80.6}, ms: 2600, delay: -700, a: 6 },
];

export default function SoloNoRoom() {
  return (
    <div style={{ position: 'relative', width: 390, height: 844 }}>
      <Gen />
      <style>{CSS}</style>
      <img alt="" draggable={false} src={BASE + CHAIR.name + '.png'} style={{ position: 'absolute', left: CHAIR.x, top: CHAIR.y, width: CHAIR.w, height: CHAIR.h, pointerEvents: 'none' }} />
      {SNACKS.map((s) => (
        <img key={s.name} alt="" draggable={false} className="sn-w" src={BASE + s.name + '.png'}
          style={{ position: 'absolute', left: s.x, top: s.y, width: s.w, height: s.h, transformOrigin: '50% 60%', animationDuration: s.ms + 'ms', animationDelay: s.delay + 'ms', '--a': s.a, pointerEvents: 'none' }} />
      ))}
    </div>
  );
}
