// DRRRK 토큰. 색은 피그마 변수(DRRRK / Color)를 CSS 변수로 쓴다(src/styles/tokens.css). 앱 레이어는 이 파일을 거쳐서만 값을 쓴다.
export { tokens as figmaTokens } from './figma/tokens.generated.js';

export const color = {
  base: 'var(--bg-base)',
  surface: 'var(--bg-surface)',
  elevated: 'var(--bg-elevated)',
  text: 'var(--text-primary)',
  'text-2': 'var(--text-secondary)',
  'text-3': 'var(--text-tertiary)',
  brand: 'var(--brand-primary)',
  'brand-subtle': 'var(--brand-subtle)',
  'press-dark': 'var(--bg-base)',
  'press-light': 'var(--text-primary)',
  'hint-fill': 'rgb(54 210 255 / 0.14)',
  // 로고 모션 영상(Brand / Logo, type=모션)의 바탕색. 영상과 이어지게 스플래시 바탕에만 쓴다.
  splash: 'rgb(21 21 21)',
};

// 수치 근거: Material Design 3 Easing and duration tokens(easing, short/medium 토큰), NN/g Executing UX Animations(100~500ms, 진입이 퇴장보다 조금 길게), Apple HIG Motion(짧고 정확하게).
export const motion = {
  push: 300,
  back: 250,
  sheetIn: 300,
  sheetOut: 220,
  modalIn: 250,
  modalOut: 200,
  modalScale: 0.92,
  stateIn: 150,
  stateOut: 90,
  press: 100,
  hint: 450,
  reduced: 150,
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecel: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccel: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  easeOut: 'cubic-bezier(0, 0, 0, 1)',
  pushShift: '-28%',
  pushDim: 0.7,
  pressOpacity: 0.1,
  splashOut: 400,
  splashStill: 1200,
};

export const layout = { screenWidth: 390, screenHeight: 844, touchMin: 44, listWidth: 560, logoWidth: 180 };

export const type = { item: ['15px', { lineHeight: '1.4' }], bar: ['14px', { lineHeight: '1.4' }] };

export const zIndex = { hotspot: 50, bar: 60, splash: 100 };

export const theme = {
  colors: color,
  fontFamily: { suit: ["'SUIT'", 'system-ui', 'sans-serif'] },
  zIndex: { hot: String(zIndex.hotspot), bar: String(zIndex.bar), splash: String(zIndex.splash) },
  width: { screen: layout.screenWidth + 'px', logo: layout.logoWidth + 'px' },
  height: { 'screen-app': layout.screenHeight + 'px' },
  minHeight: { touch: layout.touchMin + 'px' },
  transitionDuration: { press: motion.press + 'ms', hint: motion.hint + 'ms' },
  maxWidth: { list: layout.listWidth + 'px' },
  fontSize: type,
  boxShadow: { hint: 'inset 0 0 0 2px var(--brand-primary)' },
};
