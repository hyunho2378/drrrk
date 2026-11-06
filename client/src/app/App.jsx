import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Prototype from './Prototype.jsx';
import Splash from './Splash.jsx';
import { START } from './flow.js';

// 처음 들어오면 로고 스플래시를 보여 주고 홈 화면부터 시작한다. 홈은 스플래시 아래에서 미리 그려 둔다.
export default function App() {
  const [splash, setSplash] = useState(true);
  return (
    <>
      <Routes>
        <Route path="/s/:n" element={<Prototype />} />
        <Route path="*" element={<Navigate to={'/s/' + START} replace />} />
      </Routes>
      {splash && <Splash onDone={() => setSplash(false)} />}
    </>
  );
}
