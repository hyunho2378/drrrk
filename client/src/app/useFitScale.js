// 앱 화면(390 x 844)을 창에 맞춘다.
// 컴퓨터: 창 높이를 꽉 채우고(바닥에 뜨지 않게), 폭이 좁으면 폭에 맞춘다. 바깥은 회색 바탕이다.
// 휴대폰(폭 mobile.maxWidth 이하): 폭을 꽉 채운다. 보이는 높이(view)는 피그마 단위로 돌려주고, 높이 맞춤은 mobileFit.js가 한다.
import { useEffect, useState } from 'react';
import { layout, mobile as M } from '../tokens.js';

let last = null;
function measure() {
  if (typeof window === 'undefined') return { scale: 1, mobile: false, view: layout.screenHeight, height: layout.screenHeight };
  // 글을 쓰려고 키보드가 올라오면 화면 높이가 줄어든다. 그때는 배치를 다시 계산하지 않는다(화면이 찌그러지지 않게).
  const ae = document.activeElement;
  if (last && last.mobile && ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA') && window.innerWidth <= M.maxWidth) return last;
  const w = window.innerWidth, h = window.innerHeight;
  if (w <= M.maxWidth) {
    const scale = w / layout.screenWidth;
    return (last = { scale, mobile: true, view: h / scale, height: h });
  }
  return (last = { scale: Math.min(w / layout.screenWidth, h / layout.screenHeight), mobile: false, view: layout.screenHeight, height: h });
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
