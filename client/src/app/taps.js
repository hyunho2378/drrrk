// 눌릴 것처럼 보이는데 반응이 없던 요소를 제자리에서 동작하게 한다(화면 이동 없이, 퀵슬롯과 같은 방식).
// 움직임은 transform과 opacity만 쓴다. 눌림: scale 0.97, opacity 0.85를 90ms, 떼면 120ms로 돌아온다.
//  1) 도움이 된 의자(1, 2, 3): 의자를 누르면 이름 글자가 하늘색으로 바뀐다. 최대 2명, 세 번째를 고르면 처음 고른 의자가 빠진다. 양쪽 화살표는 의자 줄을 한 칸씩 옮긴다.
//  2) 베스트 댓글 따봉(1, 2): 누르면 수가 하나 오르고 다시 누르면 내려간다.
//  3) 신고 사유(7): 고른 줄만 켜진다. 상세 입력칸에 글을 쓸 수 있고 글자 수가 바뀐다. 신고하기 뒤 방(9)에서 접수 알림을 띄운다.
//  4) 체크박스(7 차단도 함께, 8 신고도 함께, 60 알림 옵션 2개): 누를 때마다 켜지고 꺼진다.
//  5) 칩과 탭(53, 57, 58, 59, 39, 47): 고른 칩이나 탭만 선택색이 된다. 화면 밖으로 넘치는 칩 줄은 옆으로 밀어 볼 수 있다. 59의 추가 칩은 키워드 관리(60)로 간다.
//  6) 키워드 관리(60): 입력칸에 쓰고 등록하면 키워드 줄이 늘고, 줄의 X를 누르면 빠진다. 최근 본 키워드 칩을 누르면 내 키워드로 들어간다. 제목의 개수도 바뀐다.
import { motion } from '../tokens.js';
import { q, relRect, setText } from './dom.js';
import { cloneOf, warm } from './donor.js';
import { toast } from './room.js';

const SKY = '#36D2FF';
const PRESS_IN = 'transform 90ms ' + motion.standard + ', opacity 90ms ' + motion.standard;
const PRESS_OUT = 'transform 120ms ' + motion.standard + ', opacity 120ms ' + motion.standard;

const flag = { report: false };

export function pressable(el, onTap, target) {
  if (!el || el.dataset.tap) return;
  el.dataset.tap = '1';
  const fx = target || el;
  el.style.cursor = 'pointer';
  el.style.touchAction = 'manipulation';
  el.setAttribute('role', 'button');
  const up = () => { fx.style.transition = PRESS_OUT; fx.style.transform = ''; fx.style.opacity = ''; };
  el.addEventListener('pointerdown', () => { fx.style.transition = PRESS_IN; fx.style.transform = 'scale(0.97)'; fx.style.opacity = '0.85'; });
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('pointerleave', up);
  el.addEventListener('click', (e) => { e.stopPropagation(); up(); onTap(e); });
}

const paths = (el) => q(el, 'path');
const fillOf = (el) => { const p = el.querySelector('path'); return p ? (p.style.fill || p.getAttribute('fill')) : null; };
const paint = (el, color) => {
  paths(el).forEach((p) => { p.style.transition = 'fill 150ms ' + motion.standard; p.style.fill = color; });
  q(el, 'p').forEach((p) => { p.style.color = color; });
};

// ---------- 칩과 탭: 하나만 고른다 ----------
function look(el) {
  const cs = getComputedStyle(el);
  return { bg: cs.backgroundColor, fill: fillOf(el) || cs.color };
}
function chipGroup(items, onPick) {
  items = items.filter(Boolean);
  if (items.length < 2 || items[0].dataset.tap) return;
  const looks = items.map(look);
  const count = {};
  looks.forEach((l) => { count[l.bg + l.fill] = (count[l.bg + l.fill] || 0) + 1; });
  let sel = looks.findIndex((l) => count[l.bg + l.fill] === 1);
  if (sel < 0) sel = 0;
  const on = looks[sel];
  const off = looks[sel === 0 ? 1 : 0];
  const apply = (el, l) => {
    el.style.transition = 'background-color 150ms ' + motion.standard;
    el.style.backgroundColor = l.bg;
    el.style.background = l.bg;
    paint(el, l.fill);
  };
  items.forEach((el, i) => pressable(el, () => {
    if (onPick && onPick(el, i) === false) return;
    if (i === sel) return;
    apply(items[sel], off);
    apply(el, on);
    sel = i;
  }));
}

// 탭(글자 탭 + 밑줄): 밑줄은 transform으로 옮긴다.
function tabGroup(root, tabs, line) {
  if (!tabs.length || tabs[0].dataset.tap) return;
  const fills = tabs.map(fillOf);
  let sel = fills.findIndex((f, i) => fills.filter((g) => g === f).length === 1);
  if (sel < 0) sel = 0;
  const on = fills[sel];
  const off = fills[sel === 0 ? 1 : 0];
  const base = line ? relRect(root, line) : null;
  tabs.forEach((t, i) => {
    const hit = document.createElement('span');
    Object.assign(hit.style, { position: 'absolute', left: '-14px', right: '-14px', top: '-12px', bottom: '-12px' });
    t.appendChild(hit);
    pressable(t, () => {
      if (i === sel) return;
      paint(tabs[sel], off);
      paint(t, on);
      sel = i;
      if (line && base) {
        const r = relRect(root, t);
        const sx = r.w / base.w;
        line.style.transformOrigin = '0 0';
        line.style.transition = 'transform ' + motion.tab + 'ms ' + motion.standard;
        line.style.transform = 'translateX(' + (r.x - base.x) + 'px) scaleX(' + sx + ')';
      }
    });
  });
}

// 화면 폭을 넘는 칩 줄은 옆으로 밀어 본다(스크롤바는 숨긴다).
function scrollRow(row) {
  if (!row || row.dataset.row) return;
  row.dataset.row = '1';
  Object.assign(row.style, { overflowX: 'auto', overflowY: 'hidden', width: '390px', scrollbarWidth: 'none', touchAction: 'pan-x', overscrollBehaviorX: 'contain' });
  row.style.paddingRight = '24px';
  row.style.boxSizing = 'border-box';
  row.addEventListener('pointerdown', (e) => e.stopPropagation());
  row.addEventListener('wheel', (e) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { row.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
}

// ---------- 1) 도움이 된 의자 ----------
function chairPicker(root) {
  const list = root.querySelector('[data-figma="Vote List"]');
  if (!list || list.dataset.tap) return;
  list.dataset.tap = '1';
  const strips = q(list, '[data-figma="cells"]');
  const strip = strips.find((s) => s.querySelector('[data-figma^="cell / "]') && !s.querySelector('[data-figma="cells"]'));
  if (!strip) return;
  const cells = () => q(strip, ':scope > [data-figma^="cell / "]');
  const nameOf = (c) => c.querySelector('[data-figma="name"]') || c.querySelector('p');
  const all = cells();
  if (!all.length) return;
  const off = all.map((c) => fillOf(nameOf(c))).find((f) => f && f.toUpperCase() !== SKY) || '#F8F8F8';
  let picked = all.filter((c) => (fillOf(nameOf(c)) || '').toUpperCase() === SKY);
  const label = q(root, 'p').find((p) => /^\d명 선택$/.test(p.textContent.trim()));
  let shown = picked.length;
  const sync = () => {
    cells().forEach((c) => paint(nameOf(c), picked.includes(c) ? SKY : off));
    if (label && shown !== picked.length) { shown = picked.length; setText(label, picked.length + '명 선택'); }
  };
  all.forEach((c) => pressable(c, () => {
    if (picked.includes(c)) picked = picked.filter((x) => x !== c);
    else { picked.push(c); if (picked.length > 2) picked.shift(); }
    sync();
    const img = c.firstElementChild;
    if (img && picked.includes(c)) img.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 300, easing: motion.standard });
  }));

  strip.style.overflow = 'hidden';
  const arrows = q(list, '[data-figma="arrow"]');
  let busy = false;
  const step = (dir) => {
    if (busy) return;
    const cs = cells();
    if (cs.length < 2) return;
    busy = true;
    const gap = relRect(root, cs[1]).x - relRect(root, cs[0]).x;
    const ease = motion.standard;
    if (dir > 0) {
      const a = cs.map((c, i) => c.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(' + -gap + 'px)', opacity: i === 0 ? 0 : 1 }], { duration: 300, easing: ease }));
      a[0].onfinish = () => {
        strip.appendChild(cs[0]);
        cs[0].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: ease });
        busy = false;
      };
    } else {
      const last = cs[cs.length - 1];
      strip.insertBefore(last, cs[0]);
      const now = cells();
      const a = now.map((c, i) => c.animate([{ transform: 'translateX(' + -gap + 'px)', opacity: i === 0 ? 0 : 1 }, { transform: 'translateX(0)', opacity: 1 }], { duration: 300, easing: ease }));
      a[0].onfinish = () => { busy = false; };
    }
  };
  arrows.forEach((a) => {
    const r = relRect(root, a), lr = relRect(root, list);
    pressable(a, () => step(r.x + r.w / 2 > lr.x + lr.w / 2 ? 1 : -1));
  });
}

// ---------- 2) 따봉 ----------
function thumbs(root) {
  q(root, '[data-figma="따봉"]').forEach((t) => {
    const num = t.querySelector('p');
    if (!num) return;
    const base = parseInt(num.textContent.trim(), 10);
    if (Number.isNaN(base)) return;
    let on = false;
    const icon = t.querySelector('[data-figma="icon/thumb-up"]') || t;
    const hit = document.createElement('span');
    Object.assign(hit.style, { position: 'absolute', left: '-12px', right: '-8px', top: '-12px', bottom: '-12px' });
    if (getComputedStyle(t).position === 'static') t.style.position = 'relative';
    t.appendChild(hit);
    pressable(t, () => {
      on = !on;
      setText(num, String(base + (on ? 1 : 0)));
      icon.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 300, easing: motion.standard });
    });
  });
}

// ---------- 4) 체크박스 ----------
async function checkbox(root, box, startOn) {
  if (!box || box.dataset.tap) return;
  box.dataset.tap = 'pending';
  const other = startOn
    ? await cloneOf(7, '[data-figma="checkbox"] > [data-figma="Frame"]')
    : await cloneOf(60, '[data-figma="checkbox"]');
  if (!other || !root.isConnected) return;
  delete box.dataset.tap;
  Object.assign(other.style, { position: 'absolute', left: '0px', top: '0px', margin: '0', opacity: '0', pointerEvents: 'none' });
  other.removeAttribute('data-figma');
  if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
  const own = Array.from(box.children);
  const bg = getComputedStyle(box).backgroundColor;
  box.appendChild(other);
  let on = startOn;
  const row = (box.parentElement && box.parentElement.closest('[data-figma^="Option / "]')) || box.closest('[data-figma="checkbox"]') || box;
  const target = row === box ? box : row;
  const set = (v) => {
    on = v;
    const showOther = v !== startOn;
    const tr = 'opacity 150ms ' + motion.standard;
    other.style.transition = tr;
    other.style.opacity = showOther ? '1' : '0';
    own.forEach((c) => { c.style.transition = tr; c.style.opacity = showOther ? '0' : ''; });
    box.style.transition = 'background-color 150ms ' + motion.standard;
    box.style.backgroundColor = showOther ? 'transparent' : bg;
  };
  pressable(target, () => { set(!on); if (row.closest('[data-figma="바텀시트 · 신고"]')) flag.block = on; }, box);
  return { get on() { return on; } };
}

// ---------- 3) 신고 사유 ----------
function reasons(root) {
  const wrap = root.querySelector('[data-figma="신고 사유"]');
  if (!wrap || wrap.dataset.tap) return;
  wrap.dataset.tap = '1';
  const rows = Array.from(wrap.children);
  let sel = rows.findIndex((r) => r.querySelector('[data-figma="Ellipse"]'));
  if (sel < 0) return;
  const onBg = getComputedStyle(rows[sel]).backgroundColor;
  const radioOf = (r) => r.querySelector('[data-figma="radio"]');
  const onHtml = radioOf(rows[sel]).innerHTML;
  const offHtml = radioOf(rows[sel === 0 ? 1 : 0]).innerHTML;
  rows.forEach((r, i) => pressable(r, () => {
    if (i === sel) return;
    const prev = rows[sel];
    prev.style.transition = 'background-color 150ms ' + motion.standard;
    prev.style.backgroundColor = 'transparent';
    radioOf(prev).innerHTML = offHtml;
    r.style.transition = 'background-color 150ms ' + motion.standard;
    r.style.backgroundColor = onBg;
    radioOf(r).innerHTML = onHtml;
    sel = i;
  }));
}
function detailInput(root) {
  const box = root.querySelector('[data-figma="상세 입력 (선택)"]');
  if (!box || box.dataset.tap) return;
  box.dataset.tap = '1';
  const ps = q(box, 'p');
  const ph = ps.find((p) => /자세한/.test(p.textContent));
  const cnt = ps.find((p) => /\/200/.test(p.textContent));
  const ta = document.createElement('textarea');
  ta.maxLength = 200;
  ta.setAttribute('aria-label', ph ? ph.textContent.trim() : '자세한 상황');
  const cs = ph ? getComputedStyle(ph) : null;
  Object.assign(ta.style, { position: 'absolute', left: '14px', top: '12px', width: 'calc(100% - 28px)', height: '40px', border: '0', outline: 'none', background: 'transparent', color: '#F8F8F8', caretColor: SKY, padding: '0', margin: '0', resize: 'none', fontFamily: cs ? cs.fontFamily : 'SUIT', fontSize: cs ? cs.fontSize : '13px', lineHeight: '18px' });
  box.appendChild(ta);
  ta.addEventListener('pointerdown', (e) => e.stopPropagation());
  ta.addEventListener('click', (e) => e.stopPropagation());
  ta.addEventListener('input', () => {
    if (ph) ph.style.opacity = ta.value ? '0' : '';
    if (cnt) setText(cnt, ta.value.length + '/200');
  });
}

// ---------- 6) 키워드 관리 ----------
function keywords(root, go) {
  if (root.dataset.kw) return;
  const field = root.querySelector('[data-figma="Keyword Input"]');
  const recent = root.querySelector('[data-figma="Recent Keywords"]');
  const title = q(root, 'p').find((p) => /^키워드 관리 \(\d+\/30\)$/.test(p.textContent.trim()));
  if (!field || !recent) return;
  root.dataset.kw = '1';
  const rowsNow = () => q(root, ':scope > [data-figma^="Keyword / "]').filter((r) => !r.dataset.gone);
  const first = rowsNow()[0];
  if (!first) return;
  const top0 = relRect(root, first).y;
  const STEP = 65;
  const recentGap = relRect(root, recent).y - (top0 + STEP * rowsNow().length);
  const MAX = 6;
  const tmpl = first.cloneNode(true);
  const ease = motion.standard;
  const layout = () => {
    const rs = rowsNow();
    rs.forEach((r, i) => { r.style.transition = 'transform 300ms ' + ease; r.style.top = top0 + 'px'; r.style.transform = 'translateY(' + i * STEP + 'px)'; });
    recent.style.transition = 'transform 300ms ' + ease;
    recent.style.transform = 'translateY(' + (rs.length - 3) * STEP + 'px)';
    if (title) setText(title, '키워드 관리 (' + rs.length + '/30)');
  };
  const nameOf = (r) => r.querySelector(':scope > p');
  const bindRow = (r) => {
    const x = r.querySelector('[data-figma="trash"]') || r.querySelector('[data-figma="actions"]');
    if (!x) return;
    const hit = document.createElement('span');
    Object.assign(hit.style, { position: 'absolute', left: '-10px', right: '-10px', top: '-10px', bottom: '-10px' });
    x.appendChild(hit);
    pressable(x, () => {
      r.dataset.gone = '1';
      const a = r.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: ease, fill: 'forwards' });
      a.onfinish = () => r.remove();
      layout();
    });
  };
  const has = (word) => rowsNow().some((r) => nameOf(r) && nameOf(r).textContent.trim() === word);
  const shake = (el) => el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }], { duration: 240, easing: ease });
  const add = (word, from) => {
    word = (word || '').trim();
    if (!word || has(word) || rowsNow().length >= MAX) { shake(from || field); return false; }
    const r = tmpl.cloneNode(true);
    r.removeAttribute('data-tap');
    const p = nameOf(r);
    if (p) setText(p, word);
    const rs = rowsNow();
    const last = rs[rs.length - 1];
    if (last) last.after(r); else field.after(r);
    r.style.top = top0 + 'px';
    r.style.transform = 'translateY(' + rs.length * STEP + 'px)';
    r.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: ease });
    bindRow(r);
    layout();
    return true;
  };
  rowsNow().forEach(bindRow);
  // 입력칸
  const ps = q(field, 'p');
  const ph = ps.find((p) => /입력/.test(p.textContent));
  const reg = ps.find((p) => p.textContent.trim() === '등록');
  const input = document.createElement('input');
  input.type = 'text';
  input.enterKeyHint = 'done';
  input.maxLength = 20;
  input.setAttribute('aria-label', ph ? ph.textContent.trim() : '키워드');
  const cs = ph ? getComputedStyle(ph) : null;
  const pr = ph ? relRect(root, ph) : null, fr = relRect(root, field);
  Object.assign(input.style, { position: 'absolute', left: (pr ? pr.x - fr.x : 20) + 'px', top: '0px', height: '100%', width: (fr.w - (pr ? pr.x - fr.x : 20) - 64) + 'px', border: '0', outline: 'none', background: 'transparent', color: '#F8F8F8', caretColor: SKY, padding: '0', margin: '0', fontFamily: cs ? cs.fontFamily : 'SUIT', fontSize: cs ? cs.fontSize : '15px', letterSpacing: cs ? cs.letterSpacing : '0' });
  field.appendChild(input);
  input.addEventListener('pointerdown', (e) => e.stopPropagation());
  input.addEventListener('click', (e) => e.stopPropagation());
  const regOff = reg ? fillOf(reg) : null;
  input.addEventListener('input', () => {
    if (ph) ph.style.opacity = input.value ? '0' : '';
    if (reg) paint(reg, input.value.trim() ? SKY : regOff);
  });
  const submit = () => {
    if (add(input.value, field)) { input.value = ''; if (ph) ph.style.opacity = ''; if (reg) paint(reg, regOff); }
  };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); submit(); } });
  if (reg) {
    const hit = document.createElement('span');
    Object.assign(hit.style, { position: 'absolute', left: '-12px', right: '-16px', top: '-18px', bottom: '-18px' });
    if (getComputedStyle(reg).position === 'static') reg.style.position = 'relative';
    reg.appendChild(hit);
    pressable(reg, submit);
  }
  // 최근 본 키워드 칩
  q(recent, '[data-figma^="Chip / "]').forEach((c) => pressable(c, () => {
    const w = c.querySelector('p');
    if (!w) return;
    if (add(w.textContent, c)) {
      const a = c.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.9)' }], { duration: 180, easing: ease, fill: 'forwards' });
      a.onfinish = () => { c.remove(); };
    }
  }));
  void recentGap;
}

// ---------- 7) 추천 드르륵 방 고르기(27) ----------
// 고른 카드의 테두리 그림(피그마 값 그대로)을 누른 카드로 옮긴다. 같은 자리에 겹친 카드는 위에 그려진 하나만 쓴다.
function roomPick(root) {
  const all = q(root, ':scope > [data-figma^="List Card / "]');
  if (all.length < 2 || all[0].dataset.tap) return;
  const byTop = new Map();
  all.forEach((c) => byTop.set(Math.round(relRect(root, c).y), c));
  const cards = Array.from(byTop.values());
  const ringOf = (c) => { const k = c.firstElementChild; return k && k.tagName === 'SPAN' && k.querySelector('svg[data-box]') ? k : null; };
  let sel = cards.find(ringOf);
  if (!sel) return;
  const plain = getComputedStyle(cards.find((c) => c !== sel)).backgroundColor;
  cards.forEach((c) => pressable(c, () => {
    if (c === sel) return;
    const ring = ringOf(sel);
    if (!ring) return;
    sel.style.background = plain;
    c.style.isolation = 'isolate';
    c.insertBefore(ring, c.firstChild);
    ring.animate([{ opacity: 0 }, { opacity: 1 }], { duration: motion.stateIn, easing: motion.standard });
    sel = c;
  }));
}

// ---------- 붙이기 ----------
export function attachTaps(root, n, go, prevN) {
  if (!root) return;
  if ([1, 2, 3].includes(n)) { chairPicker(root); thumbs(root); }
  if (n === 7) {
    reasons(root);
    detailInput(root);
    checkbox(root, root.querySelector('[data-figma="checkbox"] > [data-figma="Frame"]'), false);
    flag.report = true;
  }
  if (n === 8) checkbox(root, root.querySelector('[data-figma="checkbox"] > [data-figma="Frame"]'), false);
  if (n === 9 && prevN === 7 && flag.report && !root.dataset.reported) {
    root.dataset.reported = '1';
    flag.report = false;
    window.setTimeout(() => { if (root.isConnected) toast(root, '신고가 접수됐어요'); }, 120);
  }
  if (n === 60) {
    q(root, '[data-figma="Alert Options"] [data-figma="checkbox"]').forEach((b) => checkbox(root, b, true));
    keywords(root, go);
  }
  if (n === 27) roomPick(root);
  if (n === 53) chipGroup(q(root, '[data-figma^="chip · "]'));
  if ([57, 58, 59].includes(n)) {
    const row = root.querySelector('[data-figma="Keyword Chips"]');
    if (row) {
      const w = row.scrollWidth;
      if (w > 390 || relRect(root, row).w > 390) scrollRow(row);
      const chips = q(row, ':scope > [data-figma^="Chip / "]');
      const addChip = chips.find((c) => c.getAttribute('data-figma') === 'Chip / 추가');
      chipGroup(chips.filter((c) => c !== addChip));
      if (addChip && go) pressable(addChip, () => go({ to: 60, t: 'push' }));
    }
  }
  if (n === 39 || n === 47) {
    const tabs = root.querySelector('[data-figma="Tabs"]');
    if (tabs && n === 39) tabGroup(root, q(tabs, ':scope > [data-figma^="Tab / "]'), tabs.querySelector('[data-figma="Tab Underline"]'));
  }
  if (n === 7 || n === 59) warm([60, 7]);
}
