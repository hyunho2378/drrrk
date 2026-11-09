// 홈(24) 화면 키보드. 피그마 "Keyboard / KR / iOS"(2047:14061)의 키 자리와 두벌식 한글 조합.
// 키 자리는 키보드 왼쪽 위 기준 피그마 값 그대로다(x, y, w, h). 쉬프트를 누르면 쌍자음과 ㅒ, ㅖ가 된다.

const ROW1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
const ROW2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
const ROW3 = ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'];
const CODES1 = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'];
const CODES2 = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
const CODES3 = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'];

export const KEYS = [
  ...ROW1.map((c, i) => ({ k: c, code: CODES1[i], x: 3 + 39 * i, y: 20, w: 33, h: 42 })),
  ...ROW2.map((c, i) => ({ k: c, code: CODES2[i], x: 22.5 + 39 * i, y: 74, w: 33, h: 42 })),
  { k: 'shift', code: 'ShiftLeft', x: 3, y: 128, w: 44, h: 42 },
  ...ROW3.map((c, i) => ({ k: c, code: CODES3[i], x: 61 + 39 * i, y: 128, w: 33, h: 42 })),
  { k: 'back', code: 'Backspace', x: 343, y: 128, w: 44, h: 42 },
  { k: 'num', x: 3, y: 182, w: 42, h: 42 },
  { k: 'emoji', x: 51, y: 182, w: 43, h: 42 },
  { k: 'space', code: 'Space', x: 100, y: 182, w: 190, h: 42 },
  { k: 'enter', code: 'Enter', x: 296, y: 182, w: 91, h: 42 },
];

const SHIFT = { 'ㅂ': 'ㅃ', 'ㅈ': 'ㅉ', 'ㄷ': 'ㄸ', 'ㄱ': 'ㄲ', 'ㅅ': 'ㅆ', 'ㅐ': 'ㅒ', 'ㅔ': 'ㅖ' };
export const shifted = (c) => SHIFT[c] || c;

const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const JONG = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';
const V2 = { 'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ', 'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ', 'ㅡㅣ': 'ㅢ' };
const T2 = { 'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ', 'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ', 'ㅂㅅ': 'ㅄ' };
const split2 = (map, c) => Object.keys(map).find((k) => map[k] === c);

const isCho = (c) => CHO.includes(c);
const isJung = (c) => JUNG.includes(c);
const syl = (c, v, t = 0) => String.fromCharCode(0xac00 + (CHO.indexOf(c) * 21 + JUNG.indexOf(v)) * 28 + t);
function parts(ch) {
  const n = ch ? ch.charCodeAt(0) - 0xac00 : -1;
  if (n < 0 || n > 11171) return null;
  return { c: CHO[Math.floor(n / 588)], v: JUNG[Math.floor((n % 588) / 28)], t: n % 28 };
}

// 글 끝에 자모 하나를 더한다. composing이 false면(앞 글자를 실제 키보드로 쳤거나 띄어쓴 뒤) 앞 글자와 합치지 않는다.
export function addJamo(text, j, composing) {
  if (!composing || !text) return text + j;
  const base = text.slice(0, -1);
  const last = text.slice(-1);
  const p = parts(last);
  if (p) {
    if (isCho(j)) {
      if (!p.t && JONG.indexOf(j) > 0) return base + syl(p.c, p.v, JONG.indexOf(j));
      const t2 = p.t && T2[JONG[p.t] + j];
      if (t2) return base + syl(p.c, p.v, JONG.indexOf(t2));
      return text + j;
    }
    if (isJung(j)) {
      if (!p.t) {
        const v2 = V2[p.v + j];
        return v2 ? base + syl(p.c, v2) : text + j;
      }
      const jt = JONG[p.t];
      const pair = split2(T2, jt);
      if (pair) return base + syl(p.c, p.v, JONG.indexOf(pair[0])) + syl(pair[1], j);
      return base + syl(p.c, p.v) + syl(jt, j);
    }
    return text + j;
  }
  if (isCho(last) && isJung(j)) return base + syl(last, j);
  if (isJung(last) && isJung(j) && V2[last + j]) return base + V2[last + j];
  return text + j;
}

// 지움. 조합 중이면 마지막 글자를 한 단계씩 푼다(간, 가, ㄱ). 아니면 한 글자를 지운다.
export function backJamo(text, composing) {
  if (!text) return text;
  const base = text.slice(0, -1);
  const last = text.slice(-1);
  if (!composing) return base;
  const p = parts(last);
  if (p) {
    if (p.t) {
      const pair = split2(T2, JONG[p.t]);
      return base + syl(p.c, p.v, pair ? JONG.indexOf(pair[0]) : 0);
    }
    const vp = split2(V2, p.v);
    return base + (vp ? syl(p.c, vp[0]) : p.c);
  }
  const vp = split2(V2, last);
  return vp ? base + vp[0] : base;
}

export const isJamo = (c) => isCho(c) || isJung(c);
