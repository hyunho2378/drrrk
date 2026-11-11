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
export const mobile = { scrollOnly: ['2023:30658'], maxWidth: 600, crop: 48, head: 112, keep: 16, bgMin: 600, bgAnchor: 0.6, bottomSeed: 100, clusterMin: 300, clusterGap: 28, homeBar: [134, 5], pinZ: 3 };

// 방 시계는 화면에 20:00에서 시작해 00:00까지 줄어든다. 시계 값과 실제 초 사이 변환은 roomClock.js 한 곳에서 한다.
// 함께 드르륵 방(B)과 방 구경(W): 해뜨기 영상까지 합쳐 실제 30초(11/11 사용자 전달 "함께 드르륵 실제 체감 시간 30초로").
//   20:00에서 01:12까지 실제 24.6초(이야기 구간, 1초에 (1200 - 72) / 24.6 = 45.85초씩), 01:12에서 00:00까지 실제 5.4초(해뜨기 구간, 1초에 72 / 5.4 = 13.33초씩).
//   iOS RoomModel.storyRealSeconds, sunriseRealSeconds와 같다.
// 혼자 드르륵 방(C)과 옛 방(A): 예전처럼 20분이 실제 1분 30초(90초), 1초에 13.33초씩(11/10 팀 요청 "해뜨기까지 시간 3분이잖아 1분30초로"). iOS RoomModel.realSeconds와 같다.
//   혼자 방은 온보딩을 닫은 뒤 10초짜리 AI 대화와 비슷한 고민 안내 창(42)이 이어지므로 30초로 줄이지 않는다.
const ROOM_REAL_SECONDS = 90;
const ROOM_TIME_SCALE = 1200 / ROOM_REAL_SECONDS;
// 해 뜨는 단계(40)가 시작하는 화면 시계 값. 피그마 "해 뜨기까지 01:12". 01:12에서 0까지 실제 5.4초라 해뜨기 영상(5.17초)과 맞는다. iOS RoomModel.lastMinuteShown과 같다.
const SUNRISE_AT = 72;
const ROOM_STORY_REAL_SECONDS = 24.6;
const ROOM_SUNRISE_REAL_SECONDS = 5.4;
const ROOM_SUNRISE_SCALE = SUNRISE_AT / ROOM_SUNRISE_REAL_SECONDS;
// 시계가 0이 된 뒤 영상 마지막 장면(해 뜬 아침)에 머무는 실제 시간(ms). 예전 해 뜬 순간(35)이 종료로 넘어가던 시간(flow.js AUTO 35, 3000)과 같다.
const SUN_HOLD_MS = 3000;

// 화면 위에서 실제로 움직이는 것들의 값(live.js).
export const live = {
  screenW: 390,
  screenH: 844,
  realRoomSeconds: ROOM_REAL_SECONDS,
  timeScale: ROOM_TIME_SCALE,
  // 함께 드르륵 방 두 구간 시계(roomClock.js). storyReal 이야기 구간 실제 초, sunriseReal 해뜨기 구간 실제 초.
  clock: { storyReal: ROOM_STORY_REAL_SECONDS, sunriseReal: ROOM_SUNRISE_REAL_SECONDS, storyScale: (1200 - SUNRISE_AT) / ROOM_STORY_REAL_SECONDS, sunriseScale: ROOM_SUNRISE_SCALE },
  roomSeconds: 1200,
  defaultLeft: 180,
  sunriseAt: SUNRISE_AT,
  sunHoldMs: SUN_HOLD_MS,
  // 해 뜨는 단계 배경 영상(sunriseVideo.js). 이야기마다 하나. 첫 장면이 그려지면 장면 그림이 이 시간(ms) 동안 옅어진다.
  sunriseVideo: { ssang: 'sunrise/sunrise-ssang.mp4', photo: 'sunrise/sunrise-photo.mp4' },
  sunriseFadeMs: 120,
  // 해뜨기 영상 첫 장면(영상 첫 프레임 그대로 뽑은 jpg). 40이 보이기 전에 장면 칸 그림을 이 그림으로 바꾸고 video poster로도 준다(덧씌움 대신 대체).
  sunrisePoster: { ssang: 'sunrise/sunrise-ssang-first.jpg', photo: 'sunrise/sunrise-photo-first.jpg' },
  // 함께 드르륵 방 입장 영상(roomEnterVideo.js, 피그마 댓글 1807:23214 "영상으로 반영"). 3.08초 한 번 재생하고, 끝나면 이 시간(ms) 동안 옅어지며 방 사진으로 이어진다.
  // 영상 소리 음량(0에서 1). 0이면 소리를 끈다. iOS RoomEnterPlayer.volume과 같다.
  // solo는 혼자 드르륵 방 첫 화면(46, 피그마 1647:25199 "영상" 배경의 영상 채우기 1f03a2fd48b1, 11. 12. 팀 댓글 "영상 반영")이다. 640 x 1148, 30fps, 3.0초, 소리 있음.
  roomEnterVideo: { ssang: 'roomenter/room-enter-ssang.mp4', photo: 'roomenter/room-enter-photo.mp4', solo: 'roomenter/room-enter-solo.mp4' },
  roomEnterFadeMs: 120,
  // 영상이 끝난 뒤 장면 칸에 남기는 정지 사진(영상 마지막 장면과 같은 구도). 함께 방은 그 화면의 방 사진을 쓰고, 혼자 방은 41, 42, 43과 같은 현장 장면이다(회색 평균 차이 1.4/255).
  roomEnterAfter: { solo: 'images/bd5037f7eb80881c82b3de6cd35faf6073b5c925.webp' },
  // 입장 영상 첫 장면(영상 첫 프레임 그대로 뽑은 jpg). 방이 보이기 전에 장면 칸 그림을 이 그림으로 바꾸고 video poster로도 준다.
  roomEnterPoster: { ssang: 'roomenter/room-enter-ssang-first.jpg', photo: 'roomenter/room-enter-photo-first.jpg', solo: 'roomenter/room-enter-solo-first.jpg' },
  // 영상 첫 프레임이 준비될 때까지 화면을 보이지 않고 기다리는 최대 시간(ms). 넘으면 영상 없이 방 사진으로 보인다.
  videoReadyMaxMs: 1500,
  roomEnterVolume: 0.6,
  // 방마다 남은 시간(초)이 이 값에 닿으면 넘어가는 화면. W 라운지 구경 방은 시계만 흐른다.
  // A 옛 방(9): 01:12에 해 뜨는 단계(40), 0에 종료(1).
  // B 함께 드르륵 방(28, 29, 쌍밍아웃과 사진보정 둘 다): 01:12에 해 뜨는 단계(40, 해뜨기 영상), 0이 된 뒤 영상 마지막 장면에 3초 머물고 종료(1).
  //   예전 B는 0에 해 뜬 순간(35)으로 가서 40과 영상을 건너뛰었다. 이제 영상 마지막 장면이 35의 역할을 하므로 35를 거치지 않는다.
  //   머무는 3초는 해뜨기 구간 빠르기로 시계 값 0 아래 40초(3 x 13.33)다. 화면 시계는 00:00에 멈춰 보인다.
  //   그래서 홈에서 들어온 함께 방은 입장 뒤 24.6초에 40, 30초에 00:00, 33초에 종료(1)로 간다.
  rooms: {
    A: [{ at: SUNRISE_AT, to: 40 }, { at: 0, to: 1 }],
    B: [{ at: SUNRISE_AT, to: 40 }, { at: -(SUN_HOLD_MS / 1000) * ROOM_SUNRISE_SCALE, to: 1 }],
    // C 혼자 드르륵 방(46, 41, 42, 43, 64): 0(실제 90초, 아침)이 되면 혼자 드르륵 종료 리포트(65, 피그마 2337:15695)로 간다(탁빛나 11/12 "아침이 밝아오면 리포트 추가").
    C: [{ at: 0, to: 65 }],
  },
  // 입력칸으로 살릴 안내 글(이 글이 있는 칸만 실제로 쓸 수 있게 한다).
  inputHint: /한마디|댓글|메시지/,
  // 카드를 이만큼(px) 넘게 끌면 다음 카드로 넘긴다.
  swipeMin: 40,
  // 카드 아래 점 사이 간격(피그마 Page Dots 값).
  dotGap: 6,
  // 위아래로 움직이는 화면(라이브 10, 라운지 카테고리 48~52, 글 상세 38, 커뮤니티 39). 머리말 아래(112)부터 움직이고, 맨 끝 내용 아래로 여백을 둔다.
  // 종료(1)도 화면 크기(390 x 844) 창 안에서 움직인다(의정 1647:26726 "스크롤 화면 크기로 수정", 11. 11.).
  // 혼자 드르륵 종료 리포트(65)도 종료(1)와 같다.
  scrollScreens: [1, 10, 38, 39, 48, 49, 50, 51, 52, 65],
  // 스크롤하지 않고 제자리에 두는 요소(글 상세의 댓글 입력줄).
  pinNames: { 38: ['input'] },
  scrollTop: 112,
  scrollPad: 24,
  // 화면별 맨 끝 여백. 종료(1)는 아래 버튼 묶음이 창 바닥에 붙어 있어(reportMotion.js pinEndBar) 스크롤 내용 끝(Report 1548)에서 버튼 묶음 윗선(1590)까지 42를 둔다(피그마 1708 프레임 값).
  // 혼자 드르륵 종료 리포트(65)는 Report 끝 932에서 묶음 윗선 974까지 42다(피그마 1092 프레임 값).
  scrollPadBy: { 1: 42, 65: 42 },
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
  clockStyle: { display: 'block', width: '100%', height: '100%', textAlign: 'center', fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif', fontSize: '17.075px', fontWeight: '600', lineHeight: '22.767px', letterSpacing: '-0.04em', color: 'var(--white)', transform: 'translateY(-0.5px)', whiteSpace: 'pre' },
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
  // 배너가 펼쳐지면 퀵슬롯이 내려가는 거리. 피그마 주전부리 퀵슬롯 기본(1884:11435)에서 192에서 296으로 104px 내려간다.
  dockShift: 104,
  // 펼친 고민 배너 글과 키워드는 팀 피그마 원문(주전부리 퀵슬롯 기본 1884:11599) 그대로다. 일반 모드(22, 23, 32, 33)가 아직 이 이야기다.
  bannerBody: '친구가 썸남 앞에서 내 쌍밍아웃함. 셋이 떡볶이 먹으러 가고 있었는데 나보고 볼 때마다 00이 쌍수 참 예쁘게 잘되지 않았냐고 그러는거야. 걔 완전 미친거 아니야? 하..',
  bannerTags: ['#가족관계', '#가정사'],
  // 함께 드르륵 새 방 장면(28, 29, 30, 31, 40)의 펼친 배너: 팀 피그마 배너 펼침(1979:27613, 11. 9.)의 제목과 글, 키워드 그대로다. 글의 줄바꿈도 피그마 그대로다.
  bannerRoom2: {
    title: '나 의 고민',
    body: '오늘 친구랑 인생네컷을 찍었는데, 글쎄 친구가 인스타\n게시글에 자기 얼굴만 보정을 해서 올렸더라고.. 다들 엄청\n이쁘다고 비교된다는 식으로 댓글 달리는데 너무 속상해...',
    tags: ['#친구관계', '#외모고민'],
  },
  // 마이크
  micThreshold: 0.07,
  // 받아쓰기와 마이크를 켠 뒤 말이 없는 상태가 이만큼(초) 이어지면 받아쓰기를 멈추고 마이크를 놓는다(iOS Dictation.idleSeconds 와 같은 값).
  dictIdleSec: 30,
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
  // 종료(1) 덩어리 펼침(reportMotion.js): 420ms, 아래 16px에서 올라옴, 줄 사이 60ms, 첫 덩어리 0.1초 뒤, 화면 아래 80px 안으로 들어오면 시작.
  reportMotion: { ms: 420, dy: 16, rowGap: 60, firstDelay: 100, enterBand: 80 },
  // 아침(2)과 오늘 나눈 대화(3)의 고정 버튼 막대 위 바탕색 띠 높이.
  reportBand: 24,
  // MY 화면들(엉따 온도 막대가 차는 화면)과 아이템 상세, 미리 그려 둘 화면
  myScreens: [1, 2, 36, 53, 54],
  itemScreen: 54,
  warmDonors: [31, 43, 28],
  // 주전부리 던지기(끌어서 놓기)
  throwFlyMs: 620,
  dragStart: 6,
  // 던지는 곳은 방 한가운데 테이블이다(피그마 390x844 기준 좌표). nameGroupAt는 의자 이름표 묶음의 피그마 위치로, 휴대폰에서 배경이 옮겨진 만큼을 구하는 기준이다.
  // 11. 9. 새 방 장면(1979:27515): 이름표 묶음 17, 306. 흰 테이블은 윗면 x 131~260, y 500~537, 다리 끝 y 620이다(장면 그림 2배에서 잰 값의 절반).
  nameGroupAt: [17, 306],
  throwTable: { x: 110, y: 440, w: 170, h: 190 },
  throwLand: { x: 150, y: 500, w: 90, h: 18 },
  throwStayMs: 6000,
  // 던진 뒤 쿨타임(초). 던진 칸에 하늘색 2px 안쪽 선과 검정 60% 부채꼴 덮개가 이 시간 동안 줄어들고, 그동안 그 칸만 눌리지 않는다. 다른 칸은 바로 던질 수 있다(iOS RoomModel.throwCooldownSeconds와 같은 값).
  throwCooldownSec: 3,
  // 테이블에 올라간 주전부리는 머무는 6초의 마지막 1.2초 동안 투명해지며 조금 작아진다(1 → 0.9).
  throwFadeMs: 1200,
  throwFadeScale: 0.9,
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
