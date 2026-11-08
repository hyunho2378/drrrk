// 의자 꾸미기에서 고른 의자(종류와 색)를 어느 화면에서든 내 의자로 쓴다.
// 그림은 팀 피그마 Branding의 일러스트 자산 원본(PNG)이고, 작은 칸에는 같은 그림을 256px 무손실로 줄인 것을 쓴다.
import { setText } from './dom.js';

const BASE = import.meta.env.BASE_URL;

// 종류 순서는 팀 지정: 편의점 의자, 나무 스툴, 소파, 바퀴달린 의자, 리클라이너. 색은 일러스트 자산의 왼쪽부터 순서다.
export const KINDS = [
  { id: 'conv', name: '편의점 의자', label: '편의점의자', nick: '졸린 편의점의자12', colors: ['블루', '그레이', '화이트', '라임', '퍼플', '스카이'] },
  { id: 'stool', name: '나무 스툴', label: '나무 스툴', nick: '졸린 스툴12', colors: ['오크', '월넛', '화이트 애시', '퍼플', '레드', '블루'] },
  { id: 'sofa', name: '소파', label: '소파', nick: '졸린 소파12', colors: ['브라운 레더', '세이지 그린', '초콜릿', '핑크', '아이보리 쿠션', '옐로 쿠션'] },
  { id: 'swivel', name: '바퀴달린 의자', label: '바퀴달린 의자', nick: '졸린 바퀴의자12', colors: ['차콜', '라이트 그레이', '스카이', '버터 옐로', '브라운 레더', '버건디'] },
  { id: 'recl', name: '리클라이너', label: '리클라이너', nick: '졸린 리클라이너12', colors: ['블루 그레이', '브라운 레더', '화이트', '블루', '라임', '토프'] },
];

// 리클라이너는 엉따가 40.0°가 될 때까지 잠겨 있다(팀 피그마 "의자 꾸미기 · 잠긴 의자 선택"). 지금 내 엉따는 39.2°다.
export const LOCK = { recl: { title: '꿀잠 솔솔 리클라이너', need: '엉따 40.0°가 되면 획득할 수 있어요' } };
export const isLocked = (k) => !!LOCK[KINDS[k].id];

const KEY = 'drrrk.chair.v1';
const read = () => {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY));
    if (v && KINDS[v.k] && v.c >= 0 && v.c < 6 && !isLocked(v.k)) return { k: v.k, c: v.c };
  } catch (e) { /* 저장값이 없거나 읽을 수 없으면 기본 의자 */ }
  return { k: 0, c: 0 };
};

let saved = read();
let draft = { k: saved.k, c: saved.c };
const last = [0, 0, 0, 0, 0];
last[saved.k] = saved.c;
const subs = new Set();
const emit = () => subs.forEach((f) => f());

export const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };
export const getDraft = () => draft;
export const getSaved = () => saved;
export const lastColor = (k) => last[k] || 0;

// 종류를 누르면 그 종류에서 마지막으로 보던 색이 열린다. 색을 누르면 그 색만 바뀐다.
export function pickKind(k) {
  if (draft.k === k) return;
  draft = { k, c: last[k] || 0 };
  emit();
}
export function pickColor(c) {
  last[draft.k] = c;
  draft = { k: draft.k, c };
  emit();
}
// 의자 꾸미기를 열 때 보는 의자: 지금 앉은 의자, 새로 얻은 의자는 소파 브라운 레더.
export function openStudio(fresh) {
  const to = fresh ? { k: 2, c: 0 } : { k: saved.k, c: saved.c };
  last[to.k] = to.c;
  draft = to;
  emit();
}
export function commitDraft() {
  // 잠긴 의자는 앉을 수 없다. 앉을 수 있으면 true를 돌려준다.
  if (isLocked(draft.k)) return false;
  saved = { k: draft.k, c: draft.c };
  try { window.localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* 저장 못 해도 이번 방문에서는 유지 */ }
  return true;
}

export const big = (k, c) => BASE + 'assets/chairs/' + KINDS[k].id + '-' + (c + 1) + '.png';
export const thumb = (k, c) => BASE + 'assets/chairs/t-' + KINDS[k].id + '-' + (c + 1) + '.webp';
// 화면 그림 주소(./assets/images/...) 안의 파일 이름 자리에 넣는 값: 한 단계 올라가서 chairs 폴더로 간다.
const rel = (k, c, large) => '../chairs/' + (large ? '' : 't-') + KINDS[k].id + '-' + (c + 1) + (large ? '.png' : '.webp');
export const mineRel = (large) => rel(saved.k, saved.c, large);
export const fixedRel = (id, n, large) => '../chairs/' + (large ? '' : 't-') + id + '-' + n + (large ? '.png' : '.webp');

// MY 화면과 새 의자 팝업의 이름 글자를 내 의자에 맞춘다(화면 그림은 live.js swapAssets가 바꾼다).
export function patchMyChair(root) {
  const k = KINDS[saved.k];
  [...root.querySelectorAll('p[data-outline]')].forEach((p) => {
    const t = p.textContent.trim();
    if ((/^드르륵칵 /.test(t) || t === '딱딱한 나무 스툴') && t !== '드르륵칵 ' + k.label) {
      setText(p, '드르륵칵 ' + k.label);
      p.style.width = 'auto';
    } else if (/졸린 .*\d+$/.test(t) && t !== k.nick) {
      setText(p, k.nick);
      p.style.width = 'auto';
    }
  });
}
