// 대화 다시보기(재방송, 61) 글과 그림. 팀 피그마 2322:12283 "대화 다시보기 (재방송)" 글자를 그대로 옮겼다(iOS ReplayView.swift와 같은 값).
// 장면 그림은 피그마 "scene (방 미리보기)"(2322:12284, 390 x 440)를 3배로 내보낸 것이고, 의자 그림은 "avatar" 칸(2322:12300, 2322:12303, 2322:12306)을 그대로 내보낸 것이다.
const BASE = import.meta.env.BASE_URL || '/';
const R = BASE + 'assets/replay/';

export const REPLAY = {
  title: '둘이 찍은 사진인데\n지만 보정해서 올린 여우',
  badge: '다시보기',
  viewers: '22',
  seatsLabel: '대화한 의자 3',
  seats: [
    { name: '리클라이너21', img: R + 'seat-1.webp', on: false },
    { name: '나무스툴12', img: R + 'seat-2.webp', on: false },
    // 세 번째 의자는 하늘색 테두리(바깥 2)와 흰 이름으로 지금 말하는 자리를 나타낸다(피그마 그대로).
    { name: '가죽소파19', img: R + 'seat-3.webp', on: true },
  ],
  note: '라이브 때 달린 댓글이에요',
  comments: [
    { name: '구경하는 스툴3', text: '가죽소파님 목소리 너무 차분해서 더 슬픔' },
    { name: '폭신한 방석20', text: '그 친구 원래 그런 스타일이야?' },
  ],
  // 재생 시간: 피그마 "06:12 / 12:32". 진행 바 169 / 342 = 372 / 752.
  start: 6 * 60 + 12,
  total: 12 * 60 + 32,
  rates: [1, 1.5, 2],
  scene: R + 'scene.webp',
};

export const REPLAY_ASSETS = [REPLAY.scene, ...REPLAY.seats.map((s) => s.img)];
