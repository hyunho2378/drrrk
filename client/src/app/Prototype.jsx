import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom';
import { SCREEN_BY_N, loadScreen } from './screens.js';
import { LINKS, AUTO, START } from './flow.js';
import { motion, mobile as MOB } from '../tokens.js';
import Hotspots from './Hotspots.jsx';
import { useReducedMotion } from './useReducedMotion.js';
import { morph } from './morph.js';
import { useViewport } from './useFitScale.js';
import { fitMobile } from './mobileFit.js';
import { attach, prepare, swapAssets, resolveTo } from './live.js';
import SystemStatusBar from './SystemStatusBar.jsx';
import { SCREEN_ASSETS } from './screenAssets.js';

// 화면 하나를 그리는 칸. 새 화면은 투명하게 먼저 그리고, 피그마 마무리 단계(그림과 글자 다시 그리기)가 끝나면 알린다.
// 휴대폰에서 칸의 보이는 높이: 한 화면짜리는 창 높이, 긴 화면은 상태바 줄만 뺀 높이(아래로 스크롤).
const visH = (l, vp) => (!vp.mobile ? l.h : l.h <= 845 ? vp.view : l.h - MOB.crop);

function Layer({ layer, hidden, active, onReady, onPress, setNode, vp, prevN }) {
  const ref = useRef(null);
  const [hint, setHint] = useState(false);
  const flash = (e) => {
    if (e.target.closest('[data-hotspot]')) return;
    setHint(true);
    window.setTimeout(() => setHint(false), motion.hint);
  };
  const Comp = layer.Comp;
  // 상태바는 맨 위 시스템 상태바 하나만 쓴다. 화면 안의 상태바는 숨긴다.
  useLayoutEffect(() => {
    ref.current.querySelectorAll('[data-figma="Status Bar"], [data-figma="스테이터스바"]').forEach((e) => (e.style.visibility = 'hidden'));
  }, [layer.key]);
  // 휴대폰이면 그리자마자(보이기 전에) 높이를 맞춘다.
  useLayoutEffect(() => {
    if (vp.mobile) fitMobile(ref.current, ref.current.querySelector('[data-node]'), layer.h <= 845 ? vp.view : layer.h - MOB.crop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer.key]);
  useLayoutEffect(() => {
    setNode(layer.key, ref.current);
    return () => setNode(layer.key, null);
  }, [layer.key, setNode]);
  // 그림과 글꼴이 준비되면 바로 알린다. 피그마 마무리 단계(16점 다시 그리기)는 전환이 끝난 뒤에 돌아서 전환을 막지 않는다.
  useEffect(() => {
    let alive = true;
    const el = ref.current;
    // 옛 그림은 그림 목록을 읽기 전에 새 그림으로 바꾼다(그래야 새 그림이 준비된 뒤에 화면이 보인다).
    swapAssets(el, layer.n);
    const urls = new Set();
    el.querySelectorAll('[style], img').forEach((e) => {
      const st = e.getAttribute('style') || '';
      (st.match(/url\(([^)]+)\)/g) || []).forEach((u) => {
        const v = u.slice(4, -1).replace(/["']/g, '');
        if (v.indexOf('assets/') >= 0 && !/\.mp4$/.test(v)) urls.add(v);
      });
      const s = e.getAttribute('src');
      if (s && s.indexOf('assets/') >= 0 && !/\.mp4$/.test(s)) urls.add(s);
    });
    const load = (u) => new Promise((res) => {
      const i = new Image();
      i.onload = () => (i.decode ? i.decode().then(res, res) : res());
      i.onerror = res;
      i.src = u;
    });
    Promise.all([...urls].map(load))
      .then(() => (document.fonts ? document.fonts.ready : null))
      // 보이기 전에 첫 모습을 만든다(글자 바꾸기, 고민 분석 0, 채팅 숨김, 시계, 막대). 오류가 나도 화면은 보이게 한다.
      .then(() => (alive ? prepare(el, layer.n, prevN).catch(() => {}) : null))
      .then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
      .then(() => {
        if (alive) onReady(layer.key);
      });
    return () => {
      alive = false;
    };
  }, [layer.key, onReady]);
  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 w-screen bg-surface will-change-transform"
      // 미리 그리는 동안은 opacity 0으로 숨긴다. visibility를 쓰면 마무리 단계가 만든 캔버스가 숨김 값을 물려받는다(실측: 그림이 검게 빠졌다).
      style={{ height: visH(layer, vp), overflow: vp.mobile ? 'hidden' : undefined, opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <div className="relative w-screen overflow-hidden" style={{ height: layer.h, marginTop: vp.mobile ? -MOB.crop : 0 }} onClick={flash}>
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
  const vp = useViewport();
  const scale = vp.scale;
  const [layers, setLayers] = useState([]);
  const nodes = useRef(new Map());
  const busy = useRef(false);
  const queued = useRef(null);
  const pending = useRef(null);
  const autoTimer = useRef(0);
  const shown = useRef(false);
  const holdDone = useRef(null);
  // 칸 번호(key)마다 어느 화면인지 적어 둔다. 전환이 겹쳐도 끝난 칸이 어느 화면인지 정확히 안다.
  const keyN = useRef(new Map());
  const prevShown = useRef(0);
  // 전환 중에는 피그마 마무리 단계를 멈춰 둔다(window.__figmaHold). 전환이 끝나면 푼다.
  const hold = () => {
    if (holdDone.current) return;
    window.__figmaHold = new Promise((r) => (holdDone.current = r));
  };
  const release = () => {
    if (holdDone.current) holdDone.current();
    holdDone.current = null;
    window.__figmaHold = null;
  };

  const setNode = useCallback((key, el) => {
    if (el) nodes.current.set(key, el);
    else nodes.current.delete(key);
  }, []);

  // 화면 번호가 바뀌면 새 칸을 만든다. 전환 종류는 누른 자리(state.t)에서, 브라우저 뒤로 가기는 back으로 본다.
  useEffect(() => {
    let alive = true;
    const first = !shown.current;
    const t = navType === 'POP' ? (first ? 'none' : 'back') : (location.state && location.state.t) || 'none';
    shown.current = true;
    busy.current = true;
    if (!first) hold();
    window.clearTimeout(autoTimer.current);
    loadScreen(n).then((Comp) => {
      if (!alive) return;
      if (!Comp) {
        navigate('/s/' + START, { replace: true });
        return;
      }
      const s = SCREEN_BY_N[n];
      const key = ++seq;
      pending.current = { key, t };
      keyN.current.set(key, n);
      // 지금 보이는 칸(준비 끝난 칸) 하나만 남기고 새 칸을 얹는다. 준비 중이던 칸은 버린다(빠르게 두 번 누르면 화면이 비던 문제).
      setLayers((prev) => [...prev.filter((l) => l.ready).slice(-1), { key, n, Comp, h: s.h, ready: false, prev: prevShown.current }]);
      document.title = s.name;
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, location.key]);

  const finish = useCallback(
    (key) => {
      // 끝난 칸과 그보다 늦게 만든 칸은 남긴다. 늦은 칸이 아직 준비 중이면 그 칸이 이어서 들어온다.
      setLayers((prev) => prev.filter((l) => l.key >= key));
      if (pending.current && pending.current.key > key) return;
      busy.current = false;
      release();
      const shownN = keyN.current.get(key);
      [...keyN.current.keys()].forEach((k) => k < key && keyN.current.delete(k));
      // 주소와 화면이 다르면(전환 중에 뒤로 가기를 여러 번 누른 경우) 주소의 화면으로 다시 맞춘다.
      const want = Number((/\/s\/(\d+)/.exec(window.location.hash) || [])[1]);
      if (want && shownN && want !== shownN) {
        navigate('/s/' + want, { replace: true, state: { t: 'fade' } });
        return;
      }
      const el = nodes.current.get(key);
      if (el) attach(el, shownN || n, (l) => go(l), prevShown.current);
      prevShown.current = shownN || n;
      window.scrollTo(0, 0);
      // 이 화면에서 갈 수 있는 화면의 코드를 미리 받아 둔다(다음 누름의 대기를 줄인다).
      const idle = window.requestIdleCallback || ((f) => window.setTimeout(f, 200));
      idle(() =>
        [...new Set(LINKS.filter((l) => l.from === (shownN || n)).map((l) => l.to))].forEach((to) => {
          loadScreen(to);
          (SCREEN_ASSETS[to] || []).forEach((u) => {
            const i = new Image();
            i.src = import.meta.env.BASE_URL + u;
          });
        }),
      );
      const s = SCREEN_BY_N[shownN || n];
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
      // 앞 칸은 이 칸보다 먼저 만든 칸 중 가장 늦은 것이다.
      const prevKey = [...nodes.current.keys()].filter((k) => k < key).sort((a, b) => b - a)[0];
      const prev = prevKey ? nodes.current.get(prevKey) : null;
      setLayers((ls) => ls.map((l) => (l.key === key ? { ...l, ready: true } : l)));
      if (next) next.style.opacity = '1';
      let t = p.t;
      if (!prev || t === 'none') {
        finish(key);
        return;
      }
      // 같은 방 안 상태 변화와 탭 전환: 요소 단위로 잇는다(탭바처럼 같은 요소는 움직이지 않는다).
      // 탭바로 화면을 옮길 때는 새 화면이 이전 화면 위에서 옅게 드러난다(이전 화면이 먼저 빠지면 깜빡여 보인다).
      if (t === 'tab') {
        next.style.zIndex = '2';
        const ta = next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reduced ? motion.reduced : motion.tab, easing: motion.standard, fill: 'both' });
        let td = false;
        const te = () => {
          if (td) return;
          td = true;
          ta.cancel();
          next.style.zIndex = '';
          finish(key);
        };
        ta.onfinish = te;
        window.setTimeout(te, motion.tab + 80);
        return;
      }
      if (t === 'fade') {
        morph(prev, next, reduced).then(() => finish(key));
        return;
      }
      // 화면 이동: 앞으로는 오른쪽에서 들어오고, 뒤로는 반대로 빠진다. 줄인 움직임 설정이면 옅은 페이드로 바꾼다.
      if (reduced) {
        next.style.zIndex = '2';
        const a0 = next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: motion.reduced, easing: motion.easeOut, fill: 'both' });
        let d0 = false;
        const e0 = () => {
          if (d0) return;
          d0 = true;
          a0.cancel();
          next.style.zIndex = '';
          finish(key);
        };
        a0.onfinish = e0;
        window.setTimeout(e0, motion.reduced + 60);
        return;
      }
      const o = { duration: t === 'back' ? motion.back : motion.push, easing: motion.emphasizedDecel, fill: 'both' };
      let a;
      if (t === 'back') {
        prev.style.zIndex = '2';
        next.style.zIndex = '1';
        a = next.animate([{ transform: 'translateX(' + motion.pushShift + ')', opacity: motion.pushDim }, { transform: 'translateX(0)', opacity: 1 }], o);
        prev.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }], o);
      } else {
        next.style.zIndex = '2';
        a = next.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], o);
        prev.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(' + motion.pushShift + ')', opacity: motion.pushDim }], o);
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
      const r = resolveTo(l);
      navigate('/s/' + r.to, { state: { t: r.t } });
    },
    [navigate],
  );

  useEffect(
    () => () => {
      window.clearTimeout(autoTimer.current);
      release();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const top = layers[layers.length - 1];
  const stageH = layers.reduce((m, l) => Math.max(m, visH(l, vp)), 0);
  return (
    <div className="overflow-hidden bg-outside font-suit" style={{ minHeight: vp.mobile ? vp.height + 'px' : '100dvh' }}>
      <div className="mx-auto" style={{ width: 390 * scale, height: stageH * scale }}>
      <div className="relative w-screen origin-top-left overflow-hidden bg-base" style={{ height: stageH, transform: 'scale(' + scale + ')' }}>
        {!vp.mobile && layers.length > 0 && <SystemStatusBar />}
        {layers.map((l) => (
          <Layer
            key={l.key}
            layer={l}
            hidden={!l.ready && layers.length > 1}
            active={!!top && l.key === top.key && l.ready}
            onReady={onReady}
            onPress={go}
            setNode={setNode}
            vp={vp}
            prevN={l.prev}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
