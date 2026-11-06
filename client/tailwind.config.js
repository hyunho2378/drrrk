import { theme } from './src/tokens.js';

// 피그마 생성물(src/figma)은 피그마 값을 그대로 담은 임의 값 클래스로 그린다. 기본 스타일 초기화(preflight)는 끄고 src/styles/base.css를 쓴다.
export default {
  content: ['./index.html', './src/main.jsx', './src/app/**/*.{js,jsx}', './src/figma/**/*.{js,jsx}'],
  corePlugins: { preflight: false },
  theme: { extend: theme },
  plugins: [],
};
