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
  // 앱 화면(390) 바깥. 앱 바탕(검정)과 구분되게 팀 변수 gray/800을 쓴다.
  outside: 'var(--gray-800)',
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
  // 로고 모션 영상(4초)은 2.1초에 움직임이 끝나고 나머지는 거의 멈춰 있다(프레임 차이 실측). 2.6초에서 끊고 옅어지게 한다.
  splashCut: 2600,
};

export const layout = { screenWidth: 390, screenHeight: 844, touchMin: 44, listWidth: 560, logoWidth: 180 };

export const type = { item: ['15px', { lineHeight: '1.4' }], bar: ['14px', { lineHeight: '1.4' }] };

// 휴대폰에서 꽉 채우기(mobileFit.js). 폭 600 이하를 휴대폰으로 본다. crop은 숨기는 피그마 상태바 줄 높이, head는 머리말 끝,
// keep은 빈 띠마다 남기는 최소 높이, bgMin 이상 높이는 배경 그림으로 본다.
export const mobile = { maxWidth: 600, crop: 48, head: 112, keep: 16, bgMin: 600, bgAnchor: 0.6, bottomSeed: 100, clusterMin: 300, clusterGap: 28, homeBar: [134, 5], pinZ: 3 };

// 화면 위에서 실제로 움직이는 것들의 값(live.js).
export const live = {
  screenW: 390,
  timeScale: 10,
  screenH: 844,
  defaultLeft: 312,
  // 방마다 남은 시간(초)이 이 값에 닿으면 넘어가는 화면. A 소파 장면: 1분 12초에 1분 전(40), 0에 종료(2). B 길거리 장면: 0에 해 뜬 순간(35).
  // C 혼자 드르륵은 시계만 흐르고 매칭 발견(42)은 누를 때만 연다. W 라운지 구경 방도 시계만 흐른다.
  rooms: { A: [{ at: 72, to: 40 }, { at: 0, to: 2 }], B: [{ at: 0, to: 35 }] },
  // 입력칸으로 살릴 안내 글(이 글이 있는 칸만 실제로 쓸 수 있게 한다).
  inputHint: /한마디|댓글|메시지/,
  // 카드를 이만큼(px) 넘게 끌면 다음 카드로 넘긴다.
  swipeMin: 40,
  // 카드 아래 점 사이 간격(피그마 Page Dots 값).
  dotGap: 6,
  // 위아래로 움직이는 목록 화면(라이브 10, 커뮤니티 39). 머리말 아래(112)부터 움직이고, 맨 끝 내용 아래로 여백을 둔다.
  scrollScreens: [10, 39],
  scrollTop: 112,
  scrollPad: 24,
  chatFirst: 350,
  chatGap: 900,
  chatSpacing: 12,
  chatTop: 470,
  bubbleMax: 260,
  afterSend: { 44: 43, 46: 41, 43: 41 },
  afterSendMs: 900,
  myName: '나',
  justNow: '방금 전',
  analysisScreen: 26,
  analysisMs: 2400,
  stepDim: 0.4,
  ringColor: 'var(--brand-primary)',
  // 상태바 시간: 피그마 Status Bar의 9:41 글자 값(SF Pro Text Semibold 17.075px, 행간 22.767px, 자간 -0.569px).
  clockStyle: { display: 'block', width: '100%', height: '100%', textAlign: 'center', fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif', fontSize: '17.075px', fontWeight: '600', lineHeight: '22.767px', letterSpacing: '-0.569px', color: 'var(--white)', transform: 'translateY(-0.5px)', whiteSpace: 'pre' },
  inputStyle: { position: 'absolute', inset: '0', width: '100%', height: '100%', border: '0', outline: 'none', background: 'transparent', color: 'var(--text-primary)', caretColor: 'var(--brand-primary)', padding: '0', margin: '0' },
};

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
