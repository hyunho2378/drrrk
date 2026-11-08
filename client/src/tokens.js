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
  tab: 180,
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
  // 휴대폰은 같은 영상을 1.6배 빠르게 틀고, 움직임이 끝나는 자리(영상 시간 2.3초)에서 바로 끊는다. 합쳐서 약 1.7초.
  splashMobileRate: 1.6,
  splashMobileCut: 2300,
  splashMobileOut: 280,
  splashMobileMax: 2200,
};

export const layout = { screenWidth: 390, screenHeight: 844, touchMin: 44, listWidth: 560, logoWidth: 180 };

export const type = { item: ['15px', { lineHeight: '1.4' }], bar: ['14px', { lineHeight: '1.4' }] };

// 휴대폰에서 꽉 채우기(mobileFit.js). 폭 600 이하를 휴대폰으로 본다. crop은 숨기는 피그마 상태바 줄 높이, head는 머리말 끝,
// keep은 빈 띠마다 남기는 최소 높이, bgMin 이상 높이는 배경 그림으로 본다.
export const mobile = { maxWidth: 600, crop: 48, head: 112, keep: 16, bgMin: 600, bgAnchor: 0.6, bottomSeed: 100, clusterMin: 300, clusterGap: 28, homeBar: [134, 5], pinZ: 3 };

// 화면 위에서 실제로 움직이는 것들의 값(live.js).
export const live = {
  screenW: 390,
  screenH: 844,
  // 방 시계는 화면에 20:00에서 시작해 00:00까지 줄어들고, 이 20분이 실제로는 3분(180초)에 지나간다.
  // 그래서 시계는 1초에 6.67초씩 줄어든다(1200 / 180).
  realRoomSeconds: 180,
  timeScale: 1200 / 180,
  roomSeconds: 1200,
  defaultLeft: 180,
  // 방마다 남은 시간(초)이 이 값에 닿으면 넘어가는 화면. A 소파 장면: 1분 남으면 1분 전(40), 0에 종료(2). B 길거리 장면: 0에 해 뜬 순간(35).
  // C 혼자 드르륵과 W 라운지 구경 방은 시계만 흐른다.
  rooms: { A: [{ at: 60, to: 40 }, { at: 0, to: 2 }], B: [{ at: 0, to: 35 }] },
  // 입력칸으로 살릴 안내 글(이 글이 있는 칸만 실제로 쓸 수 있게 한다).
  inputHint: /한마디|댓글|메시지/,
  // 카드를 이만큼(px) 넘게 끌면 다음 카드로 넘긴다.
  swipeMin: 40,
  // 카드 아래 점 사이 간격(피그마 Page Dots 값).
  dotGap: 6,
  // 위아래로 움직이는 화면(라이브 10, 라운지 카테고리 48~52, 글 상세 38, 커뮤니티 39). 머리말 아래(112)부터 움직이고, 맨 끝 내용 아래로 여백을 둔다.
  scrollScreens: [10, 38, 39, 48, 49, 50, 51, 52],
  // 스크롤하지 않고 제자리에 두는 요소(글 상세의 댓글 입력줄).
  pinNames: { 38: ['input'] },
  scrollTop: 112,
  scrollPad: 24,
  chatFirst: 350,
  chatGap: 900,
  chatSpacing: 12,
  chatTop: 470,
  bubbleMax: 260,
  afterSend: {},
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
  // 라운지 카테고리: 연애(49)를 열면 빨간 점이 사라진다.
  loveScreen: 49,
  // 알림 글과 이모지
  toastMs: 2400,
  emojiFlyMs: 1000,
  // 고민 배너 펼치기
  bannerClosedH: 40,
  bannerOpenH: 162,
  bannerMs: 300,
  bannerBody: '친구가 썸남 앞에서 내 쌍꺼풀 수술을 말해버렸어. 셋이 있던 자리라 웃고 넘어갔는데 아직도 얼굴이 화끈거려. 어떻게 풀어야 할까',
  bannerTags: ['#친구관계', '#연애'],
  // 마이크
  micThreshold: 0.07,
  micOnText: '마이크가 켜졌어요',
  micMutedText: '마이크를 껐어요',
  micDeniedText: '마이크 사용을 허용해야 목소리가 전달돼요',
  micUnsupportedText: '이 브라우저는 마이크를 쓸 수 없어요. 사파리나 크롬에서 열어 주세요',
  // 말하는 사람 돌리기
  speakRing: '#2EE59D',
  meWeight: 0.35,
  speakFirst: 1600,
  speakMin: 2200,
  speakMax: 4600,
  // 라운지 카테고리 화면(48 친구): 전체 화면(10)과 같은 틀에서 선택 탭과 카드 내용만 다르다. 값은 팀 피그마 친구 프레임(1810:12798)의 글자다.
  lounge: {
    48: {
      tab: '친구',
      cards: [
        ['둘이 찍은 사진인데\n지만 보정해서 올린 여우', '2명 이야기 중', '11', '16:32'],
        ['생일에 나만 선물\n안 챙겨준 베프', '5명 이야기 중', '10', '02:41'],
        ['맨날 얻어먹고 한 번도 안 사는\n친구 손절할까요?\n잡았대요..', '2명 이야기 중', '7', '09:05'],
      ],
    },
  },
  // 온보딩(13): 팀 제목은 그대로 두고 DRR, KAK 대신 이모지를 중심에 둔다
  onboardScreen: 13,
  onboardSlots: ['새우깡', '소주', '오징어땅콩'],
  onboardTitle: null,
  onboardSub: '+ 버튼을 눌러 이모지를 날려요',
  // MY 엉따 온도 막대
  gaugeMs: 1000,
  gaugeDelay: 200,
  // MY 화면들(엉따 온도 막대가 차는 화면)과 아이템 상세, 미리 그려 둘 화면
  myScreens: [1, 2, 36, 53, 54],
  itemScreen: 54,
  warmDonors: [31, 43, 28],
  // 주전부리 던지기(끌어서 놓기)
  throwFlyMs: 620,
  dragStart: 6,
  // 던지는 곳은 방 한가운데 테이블이다(피그마 390x844 기준 좌표). nameGroupAt는 의자 이름표 묶음의 피그마 위치로, 휴대폰에서 배경이 옮겨진 만큼을 구하는 기준이다.
  nameGroupAt: [-16, 288],
  throwTable: { x: 96, y: 425, w: 198, h: 172 },
  throwLand: { x: 139, y: 475, w: 112, h: 44 },
  throwStayMs: 6000,
  throwHintText: '가운데 테이블로 끌어서 던져요',
  throwDoneText: '주전부리를 테이블에 올렸어요',
  throwEmptyText: '남은 주전부리가 없어요',
  itemDesc: '라이브에서 던지면 가운데 테이블 위에 바삭하게 올라가요.',
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
