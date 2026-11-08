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
    // 피그마 비율을 깨지 않는다. 진짜 상태바가 있으니 피그마 상태바 줄(crop)만 빼고, 남은 390 x 796을
    // 폭과 높이 중 모자란 쪽에 맞춰 같은 배율로 키운다(사파리, 크롬, 카카오톡 인앱처럼 창 높이가 달라도 모양은 같다).
    // 창이 더 길면 폭에 맞추고 남는 높이는 바닥 요소를 창 바닥에 붙여 채운다(요소 크기와 간격은 그대로).
    const need = layout.screenHeight - M.crop;
    const scale = Math.min(w / layout.screenWidth, h / need);
    return (last = { scale, mobile: true, view: Math.max(need, h / scale), height: h });
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
