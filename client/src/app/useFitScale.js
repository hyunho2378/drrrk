// 앱 화면(390 x 844)을 창에 맞춘다. 창 높이를 꽉 채우고(바닥에 뜨지 않게), 폭이 좁으면 폭에 맞춘다.
import { useEffect, useState } from 'react';
import { layout } from '../tokens.js';

function fit() {
  if (typeof window === 'undefined') return 1;
  const w = window.innerWidth, h = window.innerHeight;
  return Math.min(w / layout.screenWidth, h / layout.screenHeight);
}

export function useFitScale() {
  const [s, setS] = useState(fit);
  useEffect(() => {
    const on = () => setS(fit());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return s;
}
