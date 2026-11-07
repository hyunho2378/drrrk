// 앱 화면(390 x 844)을 창에 맞춘다.
// 컴퓨터: 창 높이를 꽉 채우고(바닥에 뜨지 않게), 폭이 좁으면 폭에 맞춘다. 바깥은 회색 바탕이다.
// 휴대폰(폭 mobile.maxWidth 이하): 폭을 꽉 채운다. 보이는 높이(view)는 피그마 단위로 돌려주고, 높이 맞춤은 mobileFit.js가 한다.
import { useEffect, useState } from 'react';
import { layout, mobile as M } from '../tokens.js';

function measure() {
  if (typeof window === 'undefined') return { scale: 1, mobile: false, view: layout.screenHeight };
  const w = window.innerWidth, h = window.innerHeight;
  if (w <= M.maxWidth) {
    const scale = w / layout.screenWidth;
    return { scale, mobile: true, view: h / scale };
  }
  return { scale: Math.min(w / layout.screenWidth, h / layout.screenHeight), mobile: false, view: layout.screenHeight };
}

export function useViewport() {
  const [v, setV] = useState(measure);
  useEffect(() => {
    const on = () => setV(measure());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return v;
}

export function useFitScale() {
  return useViewport().scale;
}
