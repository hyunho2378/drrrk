import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Prototype from './Prototype.jsx';
import Splash from './Splash.jsx';
import { START } from './flow.js';

// 사이트는 네이버 클립 리스트에서 시작한다. 드르륵 로고 스플래시는 클립 영상 보기에서 드르륵 에이전트 버튼을 누른 뒤에 나온다.
// 스플래시가 화면을 덮는 동안 드르륵 홈이 아래에서 그려지고, 스플래시가 옅어지면 홈이 드러난다.
export default function App() {
  const [splash, setSplash] = useState(0);
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
