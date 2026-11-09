// 직전 화면 번호를 기억한다. 주소(#/s/번호)가 바뀔 때마다 지금 화면과 바로 앞 화면을 적어 둔다.
// 마이(36)가 다른 화면에서 들어왔는지, 마이 안의 시트(53, 54, 19, 20)에서 돌아왔는지 가르는 데 쓴다.
const num = () => {
  if (typeof window === 'undefined') return 0;
  return Number((/\/s\/(\d+)/.exec(window.location.hash) || [])[1]) || 0;
};

const rec = (typeof window !== 'undefined' && window.__drrrkLast) || { cur: num(), prev: 0 };

function note() {
  const n = num();
  if (n && n !== rec.cur) {
    rec.prev = rec.cur;
    rec.cur = n;
  }
}

if (typeof window !== 'undefined' && !window.__drrrkLast) {
  window.__drrrkLast = rec;
  ['pushState', 'replaceState'].forEach((k) => {
    const orig = window.history[k];
    window.history[k] = function patched(...args) {
      const r = orig.apply(this, args);
      note();
      return r;
    };
  });
  window.addEventListener('popstate', note);
  window.addEventListener('hashchange', note);
}

// n번 화면으로 오기 직전에 있던 화면 번호(모르면 0).
export function cameFrom(n) {
  note();
  return rec.cur === n ? rec.prev : rec.cur;
}
