import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app/App.jsx';
import './index.css';
import { START } from './app/flow.js';

// 사이트를 새로 열거나 새로고침하면 늘 홈에서 시작한다(주소에 남은 이전 화면 번호는 버린다).
if (window.location.hash !== '#/s/' + START) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search + '#/s/' + START);
}

// 앱에서는 피그마 16점 다시 그리기를 끈다. 화면 전환이 가볍고 빠르다(피그마 대조는 대조 도구에서만 켠다).
window.__figmaExact = false;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
