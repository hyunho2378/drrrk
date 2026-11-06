import { Routes, Route, Navigate } from 'react-router-dom';
import Prototype from './Prototype.jsx';
import { START } from './flow.js';

// 처음 들어오면 홈 화면부터 시작한다. 화면을 고르는 목록은 두지 않는다.
export default function App() {
  return (
    <Routes>
      <Route path="/s/:n" element={<Prototype />} />
      <Route path="*" element={<Navigate to={'/s/' + START} replace />} />
    </Routes>
  );
}
