// 네이버 클립 화면의 진짜 영상(팀 피그마 영상 채움 f30d08c3d6, 쌍밍아웃 쇼츠 8초).
// 리스트(55) 썸네일은 같은 영상을 무음으로 처음부터 끝까지 반복하고(11/11 사용자 "3초는 짧고 끊긴다"), 영상 보기(56)는 처음부터 소리 켠 채 재생한다.
// 영상 파일은 마지막 0.6초가 첫 장면으로 디졸브되도록 만들어서(소리도 끝에서 줄고 시작에서 커진다) 반복되는 자리가 끊기지 않는다.
// 영상이 없는 클립은 지금처럼 사진과 가짜 시간(clipState.js DURATION)을 쓴다.
const BASE = import.meta.env.BASE_URL;

export const CLIP_VIDEO = {
  ssang: {
    full: BASE + 'assets/clipvid/clip-ssang.mp4',
    preview: BASE + 'assets/clipvid/clip-ssang.mp4',
    poster: BASE + 'assets/clipvid/clip-ssang-poster.jpg',
  },
};
export const videoOf = (c) => (c && c.video ? CLIP_VIDEO[c.video] : null);

// 영상 댓글 말풍선(탁빛나 1843:40911 핀 "처음에는 댓글이 없다가 위로 샥 플로팅"): 재생 1.2초 뒤 28px 아래에서 올라온다.
export const BUBBLE_AT = 1.2;
export const BUBBLE_RISE = 28;
export const BUBBLE_IN_MS = 420;
export const BUBBLE_OUT_MS = 120;

export const reducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 리스트 미리보기가 멈춘 자리. 영상 보기에 갔다 돌아오면 그 자리부터 이어서 돈다.
export const previewAt = { t: 0 };

// 앱을 켜면 영상을 받아 둔다(리스트 미리보기와 영상 보기가 같은 파일이라 한 번만 받는다).
let fetched = false;
export function prefetchClipVideos() {
  if (fetched || typeof document === 'undefined') return () => {};
  fetched = true;
  const made = [];
  const take = (src) => {
    const v = document.createElement('video');
    v.preload = 'auto';
    v.muted = true;
    v.playsInline = true;
    v.src = src;
    v.load();
    made.push(v);
    return v;
  };
  take(CLIP_VIDEO.ssang.full);
  // 한 번만 받으므로 정리할 일이 없다(StrictMode가 두 번 불러도 타이머를 지우지 않는다).
  return () => {};
}
