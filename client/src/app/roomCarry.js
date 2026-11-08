// 같은 방 안 화면(접힘 29, 펼침 28, 새우깡 올림 30, 31)을 오갈 때 채팅 말풍선과 의자 이름표를 그대로 이어 간다.
// 피그마 프레임마다 채팅 내용이 달라서 퀵슬롯만 펼쳐도 말풍선이 바뀌어 보였다(11/09 QA).
const ROOM = [28, 29, 30, 31];
const ROWS = ':scope > [data-figma^="row ·"], :scope > [data-figma^="내 채팅"]';
const NAMES = ':scope > [data-figma="Group 2147229349"]';
let last = null;

export function carryRoom(el, n) {
  const root = el.querySelector('[data-node]') || el;
  if (!ROOM.includes(n)) { last = null; return; }
  if (last && last !== root && last.isConnected) {
    const old = [...last.querySelectorAll(ROWS)];
    const cur = [...root.querySelectorAll(ROWS)];
    if (old.length && cur.length) {
      const anchor = cur[0];
      old.forEach((r) => {
        const c = r.cloneNode(true);
        c.getAnimations && c.getAnimations().forEach((a) => a.cancel());
        c.style.opacity = '';
        anchor.before(c);
      });
      cur.forEach((r) => r.remove());
    }
    const hadNames = !!last.querySelector(NAMES) && last.querySelector(NAMES).style.display !== 'none';
    const names = root.querySelector(NAMES);
    if (names) names.style.display = hadNames ? '' : 'none';
  }
  last = root;
}
