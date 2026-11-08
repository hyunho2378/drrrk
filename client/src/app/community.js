// 생성된 화면이 팀 피그마 현재 값보다 뒤처진 자리를 화면마다 맞춘다(11. 9. 검수).
//  39 커뮤니티 목록: 명예의 전당 첫 카드 장면, 목록 2, 3번 썸네일
//  38 글 상세: 글 카드 장면과 어둡게 덮는 판, 첫 댓글과 답글 글자, 두 사람 의자 그림, 좋아요, 공유, 누른 카드 제목
//  40 해 뜨기 1분 전: 방 장면(29와 같은 편의점 앞 장면)
//  2 아침: 주황 얼굴 해(구름 없음)
//  7 신고 시트: 제목과 뒤 프로필 의자(딱딱한 나무 스툴12)
// 그림은 피그마 노드를 2배로 내보낸 원본(public/assets/community2)이다.
import { motion } from '../tokens.js';
import { setText } from './dom.js';
import { sceneUrl } from './scene.js';
import { toast } from './room.js';

const A = (import.meta.env.BASE_URL || '/') + 'assets/community2/';
const IMG = {
  39: { '1953:19492': 'n1953-19492.png', '1953:20014': 'n1953-20014.png', '1953:20025': 'n1953-20025.png' },
  38: { '1953:12312': 'n1953-12312.png', '1953:12313': 'n1953-12313.png', '1953:20643': 'n-1980-28321-1953-20583.png' },
  7: { '1647:22120': 'n1647-22120.png', '1647:22149': 'n1647-22149.png', '1647:22151': 'n1647-22151.png', '1647:22155': 'n1647-22155.png' },
  2: { '1647:27007': 'n1951-20746.png' },
};
const TEXT = {
  38: {
    '1953:20650': '내가 봤을 때는 백퍼 글쓴이 질투하는듯\n웃으면서 나도 보정 좀 해주지~라고 댓글 달아봐',
    '1953:20668': '근데 사이 틀어질지도.. 괜히 어사되면 어캄',
  },
  7: { '1647:22174': '딱딱한 나무 스툴12님을 신고할까요?' },
};
// 2 아침 해 자리: 피그마 1951:20746은 화면 기준 (122, 273) 146 x 146이다. 웹의 옛 해 그림 칸(1647:27007)의 부모 기준으로 옮긴다.
const SUN = { x: 122, y: 273, s: 146 };
const BEST = '#36D2FF';

// 목록(39)에서 마지막으로 누른 카드 제목. 상세(38) 제목에 넣는다.
let pickedTitle = null;

function setImg(el, file) {
  const url = A + file;
  if (el.tagName === 'IMG') {
    if (!el.src.endsWith(file)) el.src = url;
    el.style.objectFit = 'cover';
  } else {
    el.style.backgroundImage = 'url("' + url + '")';
    el.style.backgroundSize = '100% 100%';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.background = 'url("' + url + '") center / 100% 100% no-repeat';
  }
}

function frameXY(root, el) {
  const a = el.getBoundingClientRect();
  const b = root.getBoundingClientRect();
  const k = b.width / 390 || 1;
  return { x: (a.x - b.x) / k, y: (a.y - b.y) / k };
}

function titleIn(card) {
  const ps = [...card.querySelectorAll('p[data-outline]')];
  if (!ps.length) return null;
  ps.sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize));
  return ps[0].textContent.replace(/\s+$/g, '').replace(/\n{2,}/g, '\n').trim();
}

function watchCards(root) {
  if (root.dataset.cardWatch) return;
  root.dataset.cardWatch = '1';
  // 누름 자리(투명 버튼)가 카드 위에 있어서 카드 자체는 눌림을 못 받는다. 누른 자리 아래의 카드를 찾아 제목을 기억한다.
  const onDown = (e) => {
    if (!root.isConnected) { window.removeEventListener('pointerdown', onDown, true); return; }
    const stack = document.elementsFromPoint(e.clientX, e.clientY);
    const card = stack.map((el) => el.closest && el.closest('[data-figma^="List Card /"], [data-figma^="Carousel /"]')).find((c) => c && root.contains(c));
    if (card) pickedTitle = titleIn(card);
  };
  window.addEventListener('pointerdown', onDown, true);
}

function likeButton(root) {
  const btn = root.querySelector('[data-figma="Actions"]');
  const thumb = root.querySelector('[data-node="1953:20073"]');
  if (!btn || !thumb) return;
  const box = thumb.parentElement;
  if (!box || box.dataset.live) return;
  box.dataset.live = 'like';
  const count = [...box.querySelectorAll('p[data-outline]')].find((p) => /\d/.test(p.textContent)) || box.parentElement.querySelector('p[data-outline]');
  const base = parseInt(((count && count.textContent) || '48').replace(/\D/g, ''), 10) || 48;
  let on = false;
  const off = count ? getComputedStyle(count).color : '#9AA1A6';
  const offIcon = getComputedStyle(thumb).color;
  const paint = (animate) => {
    if (count) {
      setText(count, String(base + (on ? 1 : 0)));
      Object.assign(count.style, { width: 'auto', color: on ? BEST : off, webkitTextFillColor: on ? BEST : off });
    }
    thumb.style.color = on ? BEST : offIcon;
    thumb.querySelectorAll('path').forEach((p) => { if (p.getAttribute('fill') && p.getAttribute('fill') !== 'none') p.style.fill = on ? BEST : ''; });
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      thumb.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35) rotate(-12deg)', offset: 0.4 }, { transform: 'scale(1)' }], { duration: 360, easing: motion.emphasizedDecel });
    }
  };
  paint(false);
  Object.assign(box.style, { cursor: 'pointer' });
  box.setAttribute('role', 'button');
  box.setAttribute('aria-label', '좋아요');
  // 손가락으로 누르기 쉽게 누름 자리를 넓힌다.
  const hit = document.createElement('span');
  Object.assign(hit.style, { position: 'absolute', left: '-10px', right: '-10px', top: '-12px', bottom: '-12px' });
  if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
  box.appendChild(hit);
  box.addEventListener('click', (e) => { e.stopPropagation(); on = !on; box.setAttribute('aria-pressed', String(on)); paint(true); });
}

function shareButtons(root) {
  const share = (e) => {
    e.stopPropagation();
    const title = (root.querySelector('[data-figma="Post"]') && titleIn(root.querySelector('[data-figma="Post"]'))) || '드르륵 커뮤니티 글';
    const data = { title: '드르륵 커뮤니티', text: title.replace(/\n/g, ' '), url: window.location.href };
    const copy = () => {
      const ok = () => toast(root, '링크를 복사했어요');
      const no = () => toast(root, '이 브라우저는 공유를 지원하지 않아요');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(data.url).then(ok, no);
      else no();
    };
    if (navigator.share) { navigator.share(data).catch((err) => { if (!err || err.name !== 'AbortError') copy(); }); return; }
    copy();
  };
  const word = root.querySelector('[data-node="1953:12332"]');
  [word && word.parentElement, root.querySelector('[data-figma="icon/share"]')].forEach((el) => {
    if (!el || el.dataset.live) return;
    el.dataset.live = 'share';
    el.style.cursor = 'pointer';
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', '공유');
    el.addEventListener('click', share);
  });
}

// 댓글 두 개(푹신푹신 리클라이너17, 딱딱한 나무스툴12)의 의자 그림을 피그마 그림으로 바꾼다.
// 의자 그림은 의자 이름표 코드(avatars.js)가 댓글 칸 안에 덧붙인 span이라서 노드 번호가 없다. 글자가 든 댓글 칸 안에서 찾는다.
const AVATAR = { '1953:20650': 'n-1980-28321-1953-20583.png', '1953:20668': 'n-1980-28339-1953-20597.png' };
function commentAvatars(root) {
  Object.keys(AVATAR).forEach((id) => {
    const p = root.querySelector('[data-node="' + id + '"]');
    const item = p && p.closest('[data-figma="Community / Comment Item"]');
    if (!item) return;
    const own = (el) => el.closest('[data-figma="Community / Comment Item"]') === item;
    const cands = [...item.querySelectorAll('span, div, img')].filter((el) => {
      if (!own(el)) return false;
      const r = el.getBoundingClientRect();
      const bg = getComputedStyle(el).backgroundImage;
      return r.width > 18 && r.width < 50 && Math.abs(r.width - r.height) < 3 && ((bg && bg.includes('url(')) || el.tagName === 'IMG');
    });
    cands.forEach((el) => setImg(el, AVATAR[id]));
  });
}

export function patchCommunity(root, n) {
  if (!root) return;
  const imgs = IMG[n];
  if (imgs) Object.keys(imgs).forEach((id) => { const el = root.querySelector('[data-node="' + id + '"]'); if (el) setImg(el, imgs[id]); });
  const texts = TEXT[n];
  if (texts) Object.keys(texts).forEach((id) => {
    const p = root.querySelector('[data-node="' + id + '"]');
    if (p && p.textContent.replace(/\s+/g, '') !== texts[id].replace(/\s+/g, '')) setText(p, texts[id]);
    if (p && texts[id].includes('\n')) p.style.whiteSpace = 'pre-line';
  });
  if (n === 39) watchCards(root);
  if (n === 38) {
    commentAvatars(root);
    likeButton(root);
    shareButtons(root);
    if (pickedTitle) {
      const post = root.querySelector('[data-figma="Post"]');
      const ps = post ? [...post.querySelectorAll('p[data-outline]')] : [];
      ps.sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize));
      if (ps[0] && ps[0].textContent.replace(/\s+/g, '') !== pickedTitle.replace(/\s+/g, '')) setText(ps[0], pickedTitle);
    }
  }
  if (n === 40) {
    const bg = root.querySelector('[data-node="1647:24790"]');
    if (bg && !bg.dataset.swapped40) {
      bg.dataset.swapped40 = '1';
      const url = sceneUrl('base');
      if (bg.tagName === 'IMG') bg.src = url;
      else bg.style.background = 'url("' + url + '") center / cover no-repeat';
      bg.querySelectorAll('video').forEach((v) => (v.style.display = 'none'));
    }
  }
  if (n === 2) {
    const img = root.querySelector('[data-node="1647:27007"]');
    if (img && !img.dataset.sun) {
      img.dataset.sun = '1';
      const par = img.parentElement;
      const pr = frameXY(root, par);
      Object.assign(img.style, { left: SUN.x - pr.x + 'px', top: SUN.y - pr.y + 'px', width: SUN.s + 'px', height: SUN.s + 'px', translate: 'none' });
      par.style.overflow = 'visible';
    }
  }
}
