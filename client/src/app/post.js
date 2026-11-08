// 커뮤니티 글 상세(38). 좋아요는 처음에 꺼져 있고 누르면 켜진다(숫자도 하나 늘어난다). 공유는 기기의 공유창을 연다.
import { motion } from '../tokens.js';
import { q, setText } from './dom.js';
import { toast } from './room.js';

const OFF = { bg: '#222628', icon: '#9C9C9C', text: '#9AA1A6' };
const ON = { bg: 'var(--brand-subtle, #06303C)', icon: 'var(--brand-primary, #36D2FF)', text: 'var(--brand-primary, #36D2FF)' };
// 한 번 누른 좋아요는 화면을 나갔다 돌아와도 남는다.
const state = { liked: false, base: null };

function paint(btn, thumb, count, animate) {
  const c = state.liked ? ON : OFF;
  btn.style.backgroundColor = c.bg;
  if (thumb) thumb.style.color = c.icon;
  if (count) {
    count.style.color = c.text;
    setText(count, String(state.base + (state.liked ? 1 : 0)));
    Object.assign(count.style, { width: 'auto' });
  }
  if (animate && thumb && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    thumb.animate([{ transform: 'scale(1) rotate(0deg)' }, { transform: 'scale(1.38) rotate(-14deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)' }], { duration: 360, easing: motion.emphasizedDecel });
  }
}

function postText(root) {
  const post = root.querySelector('[data-figma="Post"]');
  const ps = post ? q(post, 'p[data-outline]') : [];
  ps.sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize));
  return ps[0] ? ps[0].textContent.replace(/\s+/g, ' ').trim() : '드르륵 커뮤니티 글';
}

function copy(root, url) {
  const ok = () => toast(root, '링크를 복사했어요');
  const no = () => toast(root, '이 브라우저는 공유를 지원하지 않아요');
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, no);
  else no();
}

export function attachPost(root) {
  const like = root.querySelector('[data-figma="Button / DRR"]');
  if (!like || like.dataset.live) return;
  like.dataset.live = 'like';
  const thumb = like.querySelector('[data-figma="thumb-up"]');
  const count = like.querySelector('p[data-outline]');
  if (state.base == null) state.base = parseInt((count ? count.textContent : '48').replace(/\D/g, ''), 10) || 48;
  like.style.transition = 'background-color 180ms ' + motion.standard;
  if (thumb) thumb.style.transition = 'color 180ms ' + motion.standard;
  if (count) count.style.transition = 'color 180ms ' + motion.standard;
  paint(like, thumb, count, false);
  like.style.cursor = 'pointer';
  like.setAttribute('role', 'button');
  like.setAttribute('aria-pressed', String(state.liked));
  like.addEventListener('click', (e) => {
    e.stopPropagation();
    state.liked = !state.liked;
    like.setAttribute('aria-pressed', String(state.liked));
    paint(like, thumb, count, true);
  });
  // 공유: 글 아래 공유 버튼과 머리말 공유 아이콘. 기기의 공유창(시스템 공유)을 연다.
  const share = (e) => {
    e.stopPropagation();
    const title = postText(root);
    const data = { title: '드르륵 커뮤니티', text: title, url: window.location.href };
    if (navigator.share) {
      navigator.share(data).catch((err) => { if (!err || err.name !== 'AbortError') copy(root, data.url); });
      return;
    }
    copy(root, data.url);
  };
  [root.querySelector('[data-figma="Button / 공유"]'), root.querySelector('[data-figma="icon/share"]')].forEach((el) => {
    if (!el) return;
    el.style.cursor = 'pointer';
    el.setAttribute('role', 'button');
    el.addEventListener('click', share);
  });
}
