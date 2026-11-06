import { Routes, Route, Navigate } from 'react-router-dom';
import ScreenList from './ScreenList.jsx';
import Prototype from './Prototype.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ScreenList />} />
      <Route path="/s/:n" element={<Prototype />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
