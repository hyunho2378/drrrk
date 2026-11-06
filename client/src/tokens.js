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
  'press-dim': 'rgb(0 0 0 / 0.22)',
  'hint-fill': 'rgb(54 210 255 / 0.14)',
};

export const motion = {
  push: 320,
  fade: 200,
  press: 90,
  hint: 450,
  reduced: 120,
  ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  pushShift: '-28%',
  pushDim: 0.7,
};

export const layout = { screenWidth: 390, touchMin: 44, listWidth: 560 };

export const type = { item: ['15px', { lineHeight: '1.4' }], bar: ['14px', { lineHeight: '1.4' }] };

export const zIndex = { hotspot: 50, bar: 60 };

export const theme = {
  colors: color,
  fontFamily: { suit: ["'SUIT'", 'system-ui', 'sans-serif'] },
  zIndex: { hot: String(zIndex.hotspot), bar: String(zIndex.bar) },
  width: { screen: layout.screenWidth + 'px' },
  minHeight: { touch: layout.touchMin + 'px' },
  transitionDuration: { press: motion.press + 'ms', hint: motion.hint + 'ms' },
  maxWidth: { list: layout.listWidth + 'px' },
  fontSize: type,
  boxShadow: { hint: 'inset 0 0 0 2px var(--brand-primary)' },
};
