// 커뮤니티 글 상세(38) 글과 댓글. 팀 피그마 2100:23295 글자를 그대로 옮겼고, 댓글 글은 1953:12298(11. 10. 의정 수정본) 기준이다(iOS CommunityScreens.swift와 같은 값).
// 줄바꿈은 피그마에 직접 넣은 줄바꿈만 넣고, 나머지는 칸 폭(본문 342, 댓글 300, 답글 258)에서 저절로 끊긴다.
// 댓글 의자 그림: 피그마 "의자 프로필" 안 그림(recliner_03, wooden_stool_05, sofa_04, convenience_chair_03, wooden_stool_04, wheeled_chair_04, convenience_chair_04)과
// 같은 앱 의자 그림(assets/chairs/t-*.webp, 투명 바탕)을 다시 쓴다.
const BASE = import.meta.env.BASE_URL || '/';
const CH = BASE + 'assets/chairs/';

export const SSANG_TITLE = '친구가 썸남 앞에서\n내 쌍밍아웃함';

export const POST = {
  author: '딱딱한 나무스툴12',
  time: '· 방금',
  title: '둘이 찍은 사진인데\n지만 보정해서 올린 여우',
  body: '유진이 얼굴만 잡티 하나 없이 보정해서 올렸어. 내 얼굴은 그대로… 이거 나만 서운한 거야?',
  replay: '대화 다시보기 · 12:32',
  seats: '의자 3',
  likes: 48,
  comments: 23,
};

export const COMMENTS = [
  { id: 'c1', name: '푹신푹신 리클라이너17', time: '2시간 전', text: '내가 봤을 때는 백퍼 글쓴이 질투하는듯\n웃으면서 나도 보정 좀 해주지~라고 댓글 달아봐', likes: '48', avatar: CH + 't-recl-3.webp' },
  { id: 'c2', reply: true, name: '딱딱한 나무스툴12', time: '1시간 전', text: '근데 사이 틀어질지도.. 괜히 어사되면 어캄', likes: '12', avatar: CH + 't-stool-5.webp' },
  { id: 'c3', name: '새벽2시 소파', time: '41분 전', text: '나도 똑같은 일 있었는데 물어보니까 진짜 걍 생각없이 올린거였음', likes: '9', avatar: CH + 't-sofa-4.webp' },
  { id: 'c4', name: '퇴근길 편의점 의자', time: '1시간 전', text: '그건 선 넘었다 ㅋㅋ', likes: '15', avatar: CH + 't-conv-3.webp' },
  { id: 'c5', name: '주말 아침 나무스툴', time: '3시간 전', text: '근데 그걸 까먹을 수가 있나?', likes: '23', avatar: CH + 't-stool-4.webp' },
  { id: 'c6', name: '비 오는 날 바퀴달린의자', time: '5시간 전', text: '쫀득하게 자기만 보정하면 어떡해ㅠㅠ 속상했겠다...', likes: '8', avatar: CH + 't-swivel-4.webp' },
  { id: 'c7', name: '길거리 편의점 의자', time: '7시간 전', text: '너도 그런거 하나 올려봐ㅋㅋㅋ 역지사지가 되어야함', likes: '12', avatar: CH + 't-conv-4.webp' },
];
