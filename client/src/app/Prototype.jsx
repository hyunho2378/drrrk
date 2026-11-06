import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import { SCREENS, loadScreen } from './screens.js';
import { LINKS, AUTO } from './flow.js';
import { motion } from '../tokens.js';
import Hotspots from './Hotspots.jsx';
import { useReducedMotion } from './useReducedMotion.js';

// 화면 하나를 그리는 칸. 새 화면은 투명하게 먼저 그리고, 피그마 마무리 단계(그림과 글자 다시 그리기)가 끝나면 알린다.
function Layer({ layer, hidden, active, onReady, onPress, setNode }) {
  const ref = useRef(null);
  const [hint, setHint] = useState(false);
  const flash = (e) => {
    if (e.target.closest('[data-hotspot]')) return;
    setHint(true);
    window.setTimeout(() => setHint(false), motion.hint);
  };
  const Comp = layer.Comp;
  useLayoutEffect(() => {
    setNode(layer.key, ref.current);
    return () => setNode(layer.key, null);
  }, [layer.key, setNode]);
  useEffect(() => {
    let alive = true;
    const t0 = performance.now();
    const tick = () => {
      if (!alive) return;
      const el = ref.current;
      if ((el && el.querySelector('[data-raster-done]')) || performance.now() - t0 > 8000) onReady(layer.key);
      else window.setTimeout(tick, 40);
    };
    tick();
    return () => {
      alive = false;
    };
  }, [layer.key, onReady]);
  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 w-screen bg-surface will-change-transform"
      // 미리 그리는 동안은 opacity 0으로 숨긴다. visibility를 쓰면 마무리 단계가 만든 캔버스가 숨김 값을 물려받는다(실측: 그림이 검게 빠졌다).
      style={{ height: layer.h, opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <div className="relative w-screen overflow-hidden" style={{ height: layer.h }} onClick={flash}>
        <Comp />
        <Hotspots links={LINKS.filter((l) => l.from === layer.n)} active={active} hint={hint} onPress={onPress} />
      </div>
    </div>
  );
}

let seq = 0;

export default function Prototype() {
  const params = useParams();
  const n = Number(params.n);
  const navigate = useNavigate();
  const navType = useNavigationType();
  const location = useLocation();
  const reduced = useReducedMotion();
  const [layers, setLayers] = useState([]);
  const nodes = useRef(new Map());
  const busy = useRef(false);
  const queued = useRef(null);
  const pending = useRef(null);
  const autoTimer = useRef(0);
  const shown = useRef(false);

  const setNode = useCallback((key, el) => {
    if (el) nodes.current.set(key, el);
    else nodes.current.delete(key);
  }, []);

  // 화면 번호가 바뀌면 새 칸을 만든다. 전환 종류는 누른 자리(state.t)에서, 브라우저 뒤로 가기는 back으로 본다.
  useEffect(() => {
    let alive = true;
    const t = navType === 'POP' ? (shown.current ? 'back' : 'none') : (location.state && location.state.t) || 'none';
    shown.current = true;
    busy.current = true;
    window.clearTimeout(autoTimer.current);
    loadScreen(n).then((Comp) => {
      if (!alive) return;
      if (!Comp) {
        navigate('/', { replace: true });
        return;
      }
      const s = SCREENS[n - 1];
      const key = ++seq;
      pending.current = { key, t };
      setLayers((prev) => [...prev.slice(-1), { key, n, Comp, h: s.h, ready: false }]);
      document.title = s.name;
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, location.key]);

  const finish = useCallback(
    (key) => {
      setLayers((prev) => prev.filter((l) => l.key === key).map((l) => ({ ...l, z: undefined })));
      busy.current = false;
      window.scrollTo(0, 0);
      const s = SCREENS[n - 1];
      const au = AUTO[s && s.n];
      if (au) autoTimer.current = window.setTimeout(() => go({ to: au.to, t: au.t }), au.ms);
      if (queued.current) {
        const q = queued.current;
        queued.current = null;
        go(q);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n],
  );

  const onReady = useCallback(
    (key) => {
      const p = pending.current;
      if (!p || p.key !== key) return;
      pending.current = null;
      const next = nodes.current.get(key);
      const prevKey = [...nodes.current.keys()].find((k) => k !== key);
      const prev = prevKey ? nodes.current.get(prevKey) : null;
      setLayers((ls) => ls.map((l) => (l.key === key ? { ...l, ready: true } : l)));
      if (next) next.style.opacity = '1';
      let t = p.t;
      if (!prev || t === 'tab' || t === 'none') {
        finish(key);
        return;
      }
      if (reduced) t = 'fade';
      const o = { duration: t === 'fade' ? (reduced ? motion.reduced : motion.fade) : motion.push, easing: t === 'fade' ? motion.easeOut : motion.ease, fill: 'both' };
      let a;
      if (t === 'push') {
        next.style.zIndex = '2';
        a = next.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], o);
        prev.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(' + motion.pushShift + ')', opacity: motion.pushDim }], o);
      } else if (t === 'back') {
        prev.style.zIndex = '2';
        next.style.zIndex = '1';
        a = next.animate([{ transform: 'translateX(' + motion.pushShift + ')', opacity: motion.pushDim }, { transform: 'translateX(0)', opacity: 1 }], o);
        prev.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }], o);
      } else {
        next.style.zIndex = '2';
        a = next.animate([{ opacity: 0 }, { opacity: 1 }], o);
      }
      let done = false;
      const end = () => {
        if (done) return;
        done = true;
        next.getAnimations().forEach((x) => x.cancel());
        next.style.zIndex = '';
        finish(key);
      };
      a.onfinish = end;
      window.setTimeout(end, o.duration + 60);
    },
    [finish, reduced],
  );

  const go = useCallback(
    (l) => {
      if (busy.current) {
        queued.current = l;
        return;
      }
      navigate('/s/' + l.to, { state: { t: l.t } });
    },
    [navigate],
  );

  useEffect(() => () => window.clearTimeout(autoTimer.current), []);

  const top = layers[layers.length - 1];
  const s = SCREENS[n - 1];
  const stageH = layers.reduce((m, l) => Math.max(m, l.h), 0);
  return (
    <div className="min-h-screen bg-base font-suit">
      <header className="sticky top-0 z-bar flex min-h-touch items-center justify-center gap-4 bg-base px-3 text-bar text-text-2">
        <Link to="/" className="text-brand no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">
          목록
        </Link>
        <span>
          {n} / {SCREENS.length}&nbsp;&nbsp;{s ? s.name : ''}
        </span>
      </header>
      <div className="relative mx-auto w-screen overflow-hidden bg-base" style={{ height: stageH }}>
        {layers.map((l) => (
          <Layer
            key={l.key}
            layer={l}
            hidden={!l.ready && layers.length > 1}
            active={!!top && l.key === top.key && l.ready}
            onReady={onReady}
            onPress={go}
            setNode={setNode}
          />
        ))}
      </div>
    </div>
  );
}
