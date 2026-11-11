import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Prototype from './Prototype.jsx';
import Splash from './Splash.jsx';
import { START } from './flow.js';
import { prefetchClipVideos } from './clipVideo.js';

// 사이트는 네이버 클립 리스트에서 시작한다. 드르륵 로고 스플래시는 클립 영상 보기에서 드르륵 에이전트 버튼을 누른 뒤에 나온다.
// 스플래시가 화면을 덮는 동안 드르륵 홈이 아래에서 그려지고, 스플래시가 옅어지면 홈이 드러난다.
const BASE = import.meta.env.BASE_URL;

export default function App() {
  const [splash, setSplash] = useState(0);
  // 앱이므로 화면을 옮겨도 탭 제목은 늘 Drrrk다.
  useEffect(() => { document.title = 'Drrrk'; }, []);
  // 스플래시 영상을 미리 받아 둔다(에이전트 버튼을 누를 때 기다리지 않게).
  useEffect(() => {
    const v = document.createElement('video');
    v.preload = 'auto';
    v.muted = true;
    v.src = BASE + 'assets/splash/logo-motion.mp4';
    v.load();
    return () => v.removeAttribute('src');
  }, []);
  // 클립 쌍밍아웃 영상을 미리 받는다(미리보기 먼저, 전체 영상은 리스트가 뜬 뒤).
  useEffect(() => prefetchClipVideos(), []);
  useEffect(() => {
    const on = () => setSplash((k) => k + 1);
    window.addEventListener('drrrk:splash', on);
    return () => window.removeEventListener('drrrk:splash', on);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/s/:n" element={<Prototype />} />
        <Route path="*" element={<Navigate to={'/s/' + START} replace />} />
      </Routes>
      {splash > 0 && <Splash key={splash} onDone={() => setSplash(0)} />}
    </>
  );
}
