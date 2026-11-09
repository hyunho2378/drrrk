// 네이버 클립 화면(리스트 55, 영상 보기 56)이 함께 쓰는 데이터와 상태. 화면을 나갔다 들어와도 남도록 모듈 변수에 두고 sessionStorage에도 적는다.
// 클립 순서는 리스트 카드 순서(위에서 아래, 같은 높이면 왼쪽 먼저)다. 첫 클립(쌍밍아웃)은 피그마 영상 보기 값 그대로다.

export const CLIPS = [
  {
    id: 's0', card: '쌍밍아웃 영상', img: 'vid', back: 'card', title: '베프가 내 비밀을 까발린다 ep.01', tags: '#친구관계 #연애',
    creator: '흔한 웹드', av: 'av0', badge: true, likes: 2413, comments: 187, plays: '2.4만', when: '3일 전', bubble: '와 이번꺼 공감 100000%', bubbleAv: 'av2',
  },
  {
    id: 's1', card: '혼술바 영상', img: 'desk', back: 'desk', wide: true, title: '드디어 가봤습니다 혼술바!', tags: '#혼술 #바투어',
    creator: '트민언니', av: 'av1', badge: false, likes: 864, comments: 52, plays: '9,120', when: '5일 전', bubble: '분위기 미쳤다 위치 어디예요', bubbleAv: 'av3',
  },
  {
    id: 's2', card: '패션 추천 영상', img: 'dance', back: 'dance', title: '올겨울 느좋녀 패션템 추천', tags: '#겨울코디 #패션템',
    creator: '옷장일기', av: 'av3', badge: false, likes: 1532, comments: 96, plays: '1.8만', when: '1일 전', bubble: '머플러 정보 알려 주세요', bubbleAv: 'av2',
  },
  {
    id: 's3', card: '카페 추천 영상', img: 'cafe', back: 'cafe', title: '군자 주민들만 몰래 가는 느좋 카페 추천 top 3', tags: '#군자카페 #카페추천',
    creator: '군자동산책', av: 'av2', badge: false, likes: 677, comments: 38, plays: '7,450', when: '2일 전', bubble: '저장해 두고 이번 주말에 가요', bubbleAv: 'av3',
  },
];

// 구독 탭에 늘 보이는 크리에이터(팀 지시: 흔한 웹드, 트민언니). 영상 보기에서 팔로우한 크리에이터도 더해진다.
export const SUBS = ['흔한 웹드', '트민언니'];
export const DURATION = 38;

const KEY = 'drrrk.clip.v1';
const empty = () => ({ pick: 0, tab: 'rec', fav: false, follow: [], liked: [], saved: [], mute: false, loop: true, time: { s0: 10.4 } });
function load() {
  try {
    const raw = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(KEY);
    if (raw) return Object.assign(empty(), JSON.parse(raw));
  } catch (e) { /* 저장소를 못 쓰면 모듈 변수만 쓴다 */ }
  return empty();
}
export const clip = load();
const subs = new Set();
export function saveClip() {
  try { sessionStorage.setItem(KEY, JSON.stringify(clip)); } catch (e) { /* 무시 */ }
  subs.forEach((f) => f());
}
export function onClip(f) { subs.add(f); return () => subs.delete(f); }

const flipIn = (arr, v) => { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); return i < 0; };
export const isFollow = (name) => clip.follow.includes(name);
export const toggleFollow = (name) => { const on = flipIn(clip.follow, name); saveClip(); return on; };
export const isLiked = (id) => clip.liked.includes(id);
export const toggleLike = (id) => { const on = flipIn(clip.liked, id); saveClip(); return on; };
export const setLiked = (id) => { if (!clip.liked.includes(id)) { clip.liked.push(id); saveClip(); } };
export const isSaved = (id) => clip.saved.includes(id);
export const toggleSave = (id) => { const on = flipIn(clip.saved, id); saveClip(); return on; };
export const likeCount = (c) => c.likes + (isLiked(c.id) ? 1 : 0);
export const fmt = (n) => n.toLocaleString('en-US');
export const setPick = (i) => { clip.pick = Math.max(0, Math.min(CLIPS.length - 1, i)); saveClip(); };
// 리스트에서 카드를 누르면 고른 클립 번호(clipPick)를 적는다.
export function clipPick(i) { if (i != null) setPick(i); return clip.pick; }
