// 홈 한 장면. 접힌 홈(25, 피그마 1647:23475)과 입력칸을 연 홈(24, 피그마 1647:23436)은 같은 장면이라 한 컴포넌트로 그린다.
// 2026. 11. 10. 피그마 현재 값: 배경 1647:23476(home4/home-bg.webp), 입력칸 2045:11658(24,655)과 1671:45255(20,446),
// 정보 줄 2045:11669, 딤 2047:14201(검정 60%), 키보드 2047:14061(1,541, home4/keyboard.webp).
// 입력칸을 누르면 화면을 바꾸지 않고 제자리에서 딤이 덮이고 입력칸이 올라가며 키보드가 올라온다(주소만 #/s/24로 바꾼다).
// 마우스를 쓰는 컴퓨터에서만 피그마 키보드 그림을 보여 주고, 터치 기기에서는 진짜 키보드를 올린다.
import React from 'react';
import { useFigmaSubpixel } from '../figma/subpixel';
import { Icon } from '../figma/Icon';
import svg from '../assets/svg-map';
import { motion, live as LIVE } from '../tokens.js';
import { INFO_SVG } from './homeInfo.js';
import { KEYS, shifted, addJamo, backJamo, isJamo } from './homeKeyboard.js';

const cx = (...a) => a.filter(Boolean).join(' ');
const OPEN_MS = 310;
const CLOSE_MS = 260;
const EASE = motion.standard;
// 입력칸 자리: 접힘 24,655 펼침 20,446(피그마 값)
const SHUT = { x: 24, y: 655 };
const OPEN = { x: 20, y: 446 };
const KB = { x: 1, y: 541, w: 389, h: 303 };
const fineQuery = '(hover: hover) and (pointer: fine)';
const isFine = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(fineQuery).matches;

function setHash(n) {
  const h = '#/s/' + n;
  if (window.location.hash !== h) window.history.replaceState(window.history.state, '', h);
}
const goTo = (to, t) => window.dispatchEvent(new CustomEvent('drrrk:go', { detail: { to, t } }));

// 눌림 반응: scale 0.97, opacity 0.85를 90ms, 떼면 120ms
function pressOn(el) {
  if (!el) return;
  el.style.transition = 'transform 90ms ' + EASE + ', opacity 90ms ' + EASE;
  el.style.transform = 'scale(0.97)';
  el.style.opacity = '0.85';
}
function pressOff(el) {
  if (!el) return;
  el.style.transition = 'transform 120ms ' + EASE + ', opacity 120ms ' + EASE;
  el.style.transform = '';
  el.style.opacity = '';
}

export default function HomeScene({ startOpen = false, style, className }) {
  const __root = React.useRef(null);
  useFigmaSubpixel(__root);
  const [open, setOpen] = React.useState(startOpen);
  const [hasText, setHasText] = React.useState(false);
  const [fine] = React.useState(isFine);
  const [shift, setShift] = React.useState(false);
  const [lift, setLift] = React.useState(null);
  const inputRef = React.useRef(null);
  const fieldRef = React.useRef(null);
  const btnRef = React.useRef(null);
  const flashRefs = React.useRef({});
  const comp = React.useRef({ on: false, val: '' });
  const anim = React.useRef(false);

  // 펼친 동안은 이 화면의 누르는 자리(탭바, 알림, 칩)를 막는다. 피그마 24에서는 모두 딤 뒤에 있다.
  React.useEffect(() => {
    const root = __root.current;
    const host = root && root.parentElement;
    if (!host) return;
    host.querySelectorAll('[data-hotspot]').forEach((b) => { b.style.pointerEvents = open ? 'none' : ''; });
  });

  const refreshText = () => setHasText(!!(inputRef.current && inputRef.current.value));

  const expand = (e) => {
    if (e) e.stopPropagation();
    if (open) return;
    anim.current = true;
    setOpen(true);
    setHash(24);
    const inp = inputRef.current;
    // 터치 기기는 누른 순간 진짜 입력칸에 포커스해야 키보드가 올라온다.
    if (inp) inp.focus({ preventScroll: true });
  };
  const collapse = (e) => {
    if (e) e.stopPropagation();
    if (!open) return;
    const inp = inputRef.current;
    if (inp) inp.blur();
    setShift(false);
    setLift(null);
    setOpen(false);
    setHash(25);
  };
  const send = () => {
    const inp = inputRef.current;
    if (inp) inp.blur();
    window.setTimeout(() => goTo(26, 'push'), motion.press);
  };

  // 터치 기기: 진짜 키보드가 올라오면 보이는 창(visualViewport) 바닥 바로 위에 입력칸을 붙인다.
  React.useEffect(() => {
    if (fine || !open || !window.visualViewport) return undefined;
    const vv = window.visualViewport;
    const fit = () => {
      const root = __root.current;
      if (!root) return;
      const rr = root.getBoundingClientRect();
      const s = rr.width / 390 || 1;
      const kbTop = vv.offsetTop + vv.height;
      // 키보드가 올라오지 않았으면(창 높이가 그대로) 피그마 자리 그대로 둔다.
      if (window.innerHeight - kbTop < 80) { setLift(null); return; }
      const y = (kbTop - rr.top) / s - 66 - 12;
      setLift(Math.min(y, OPEN.y + 200));
    };
    vv.addEventListener('resize', fit);
    vv.addEventListener('scroll', fit);
    fit();
    return () => { vv.removeEventListener('resize', fit); vv.removeEventListener('scroll', fit); };
  }, [open, fine]);

  // 화면 키보드 키 누름: 자모는 앞 글자와 합치고, 쉬프트는 한 번만 쌍자음으로 바꾼다.
  const flash = (k) => {
    const el = flashRefs.current[k];
    if (!el) return;
    el.style.transition = 'opacity 60ms linear';
    el.style.opacity = '1';
    window.clearTimeout(el.__t);
    el.__t = window.setTimeout(() => { el.style.transition = 'opacity 120ms linear'; el.style.opacity = '0'; }, 90);
  };
  const keyPress = (key) => {
    const inp = inputRef.current;
    if (!inp) return;
    flash(key.k);
    const v = inp.value;
    const composing = comp.current.on && comp.current.val === v;
    let nv = v;
    let on = false;
    if (isJamo(key.k)) {
      nv = addJamo(v, shift ? shifted(key.k) : key.k, composing);
      on = true;
      if (shift) setShift(false);
    } else if (key.k === 'shift') { setShift((s) => !s); return; }
    else if (key.k === 'space') nv = v + ' ';
    else if (key.k === 'back') { nv = backJamo(v, composing); on = composing && nv.length === v.length; }
    else if (key.k === 'enter') { if (v.trim()) send(); return; }
    else return;
    inp.value = nv;
    comp.current = { on, val: nv };
    try { inp.setSelectionRange(nv.length, nv.length); } catch (er) { /* 선택 범위를 못 바꿔도 글은 들어간다 */ }
    refreshText();
  };

  // 실제 키보드로 칠 때도 같은 키가 눌린 모양을 보인다(글자는 입력칸이 직접 받는다).
  React.useEffect(() => {
    if (!open || !fine) return undefined;
    const on = (e) => {
      const key = KEYS.find((k) => k.code && (k.code === e.code || (k.k === 'shift' && e.code === 'ShiftRight')));
      if (key) flash(key.k);
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [open, fine]);

  // 키보드는 화면 바닥에 붙는다. 휴대폰 틀에서 화면 바닥이 늘어나면(mobileFit) 키보드와 입력칸도 같이 내려간다(피그마 간격 95 유지).
  const [kbTop, setKbTop] = React.useState(KB.y);
  const [settled, setSettled] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => {
      const root = __root.current;
      if (root) {
        const h = parseFloat(getComputedStyle(root).height) || 844;
        setKbTop(h - KB.h);
        // 24에서 시작하면 mobileFit이 키보드 위에 있는 입력칸과 정보 줄을 바닥 요소로 보고 내린다. 접힌 홈(25)과 같은 피그마 자리로 되돌린다.
        if (fieldRef.current) fieldRef.current.style.top = SHUT.y + "px";
        const info = root.querySelector("[data-node=\"2045:11669\"]");
        if (info) info.style.top = "729px";
      }
      setSettled(true);
    }));
    return () => cancelAnimationFrame(id);
  }, []);
  const openY = kbTop - (KB.y - OPEN.y);
  const inputPos = open ? { x: OPEN.x, y: lift != null ? lift : openY } : SHUT;
  const dur = open ? OPEN_MS : CLOSE_MS;
  const tr = (p) => p + ' ' + dur + 'ms ' + EASE;
  const tdur = settled ? null : 'none';

  return (
    <div ref={__root} data-figma="DRRRK · 홈 (Dark)" data-node={startOpen ? '1647:23436' : '1647:23475'} className={cx('[width:390px] [height:844px] [background:#121415] [position:relative] [overflow:hidden] [user-select:none] [-webkit-user-select:none] [-webkit-touch-callout:none]', className)} style={style}>
      <div data-figma="Rectangle 1954141366" data-node="1647:23476" className="[position:absolute] [width:390px] [height:761px] [left:0px] [top:0px] [display:block] [overflow:visible]"><img alt="" src={'./assets/home4/home-bg.webp'} className="[position:absolute] [left:0px] [top:0px] [width:390px] [height:761px] [display:block] [max-width:none]" /></div>
      <div data-figma="bottom_navigation" data-node="1620:43312" data-instance-of="bottom_navigation" className="[width:390px] [height:84px] [background:#121415] [position:absolute] [left:0px] [top:760px]">
        <div data-figma="top line" data-node="I1620:43312;1647:27183" className="[width:392px] [height:1px] [background:#222628] [position:absolute] [left:0px] [top:0px]" />
        <div data-figma="tab/홈" data-node="I1620:43312;1647:27184" className="[display:flex] [width:56px] [height:52px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:20px] [top:12px] [overflow:hidden]">
          <div data-figma="icon wrap" data-node="I1620:43312;1647:27185" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [flex-shrink:0] [border-radius:16px] [position:relative] [overflow:hidden]">
            <div data-figma="Icon / Line" data-node="I1620:43312;1647:27186" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
              <div data-figma="home-chair" data-node="I1620:43312;1647:27187" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]">
                <span data-figma="shape" data-node="I1620:43312;1647:27188" className="[width:20px] [height:20px] [position:absolute] [left:2px] [top:2px] [line-height:0]" dangerouslySetInnerHTML={{
                __html: svg["I1620:43312;1647:27188"]
              }} />
              </div>
            </div>
          </div>
          <p data-figma="홈" data-node="I1620:43312;1647:27189" data-outline="" className="[width:12px] [height:16px] [flex-shrink:0] [color:#36D2FF] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:700] [line-height:17px] [letter-spacing:-0.48px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:-0.24px]">{"홈"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1620:43312;1647:27189"]
          }} /></p>
        </div>
        <div data-figma="tab/라이브" data-node="I1620:43312;1647:27190" className="[display:flex] [width:56px] [height:52px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:120px] [top:12px] [overflow:hidden]">
          <div data-figma="icon wrap" data-node="I1620:43312;1647:27191" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [flex-shrink:0] [border-radius:16px] [position:relative] [overflow:hidden]">
            <div data-figma="Icon / Line" data-node="I1620:43312;1647:27192" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
              <div data-figma="live" data-node="I1620:43312;1647:27193" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]">
                <span data-figma="shape" data-node="I1620:43312;1647:27194" className="[width:20px] [height:19px] [position:absolute] [left:2px] [top:3px] [line-height:0]" dangerouslySetInnerHTML={{
                __html: svg["I1620:43312;1647:27194"]
              }} />
              </div>
            </div>
          </div>
          <p data-figma="라이브" data-node="I1620:43312;1647:27195" data-outline="" className="[width:32px] [height:16px] [flex-shrink:0] [color:#6E767C] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:-0.24px]">{"라이브"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1620:43312;1647:27195"]
          }} /></p>
        </div>
        <div data-figma="tab/커뮤니티" data-node="I1620:43312;1647:27196" className="[display:flex] [width:56px] [height:52px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:216px] [top:12px] [overflow:hidden]">
          <div data-figma="icon wrap" data-node="I1620:43312;1647:27197" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [flex-shrink:0] [border-radius:16px] [position:relative] [overflow:hidden]">
            <div data-figma="Icon / Line" data-node="I1620:43312;1647:27198" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
              <div data-figma="community" data-node="I1620:43312;1647:27199" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]">
                <span data-figma="shape" data-node="I1620:43312;1647:27200" className="[width:20px] [height:20px] [position:absolute] [left:2px] [top:2px] [line-height:0]" dangerouslySetInnerHTML={{
                __html: svg["I1620:43312;1647:27200"]
              }} />
              </div>
            </div>
          </div>
          <p data-figma="커뮤니티" data-node="I1620:43312;1647:27201" data-outline="" className="[width:44px] [height:16px] [flex-shrink:0] [color:#6E767C] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:-0.24px]">{"커뮤니티"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1620:43312;1647:27201"]
          }} /></p>
        </div>
        <div data-figma="tab/MY" data-node="I1620:43312;1647:27202" className="[display:flex] [width:56px] [height:52px] [flex-direction:column] [justify-content:center] [align-items:center] [gap:4px] [position:absolute] [left:312px] [top:12px] [overflow:hidden]">
          <div data-figma="icon wrap" data-node="I1620:43312;1647:27203" className="[display:flex] [width:56px] [height:32px] [padding:4px_16px] [justify-content:center] [align-items:center] [flex-shrink:0] [border-radius:16px] [position:relative] [overflow:hidden]">
            <div data-figma="Icon / Line" data-node="I1620:43312;1647:27204" className="[display:flex] [width:24px] [height:24px] [justify-content:center] [align-items:center] [flex-shrink:0] [position:absolute] [left:16px] [top:4px]">
              <div data-figma="my" data-node="I1620:43312;1647:27205" className="[width:24px] [height:24px] [flex-shrink:0] [position:absolute] [left:0px] [top:0px]">
                <span data-figma="shape" data-node="I1620:43312;1647:27206" className="[width:15px] [height:20px] [position:absolute] [left:4px] [top:2px] [line-height:0]" dangerouslySetInnerHTML={{
                __html: svg["I1620:43312;1647:27206"]
              }} />
              </div>
            </div>
          </div>
          <p data-figma="마이" data-node="I1620:43312;1647:27207" data-outline="" className="[color:#6E767C] [text-align:center] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:400] [line-height:17px] [letter-spacing:-0.48px] [flex-shrink:0] [width:21px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:-0.24px]">{"마이"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1620:43312;1647:27207"]
          }} /></p>
        </div>
      </div>
      <div data-figma="image 1208091451" data-node="1647:23491" className="[width:257px] [height:257px] [aspect-ratio:1/1] [position:absolute] [left:54px] [top:237px]" />
      <div data-figma="Status Bar" data-node="1712:25186" data-instance-of="Status Bar" className="[display:flex] [width:390px] [height:64px] [padding:20.258px_33.09px_20.975px_40.52px] [justify-content:flex-end] [align-items:center] [position:absolute] [left:0px] [top:0px] [overflow:hidden]">
        <div data-figma="Group 3" data-node="I1712:25186;3035:448" className="[width:316.391px] [height:22.767px] [flex-shrink:0] [position:absolute] [left:40.52px] [top:20.26px]">
          <div data-figma="Right Side" data-node="I1712:25186;3035:449" className="[width:77.07px] [height:12.9px] [position:absolute] [left:239.32px] [top:5.06px]">
            <div data-figma="Battery" data-node="I1712:25186;3035:450" className="[width:27.69px] [height:12.9px] [position:absolute] [left:49.38px] [top:0px]">
              <span data-figma="Rectangle" data-node="I1712:25186;3035:451" className="[width:25.04px] [height:12.9px] [position:absolute] [left:0px] [top:0px] [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1712:25186;3035:451"]
            }} />
              <span data-figma="Combined Shape" data-node="I1712:25186;3035:452" className="[width:1.51px] [height:4.55px] [position:absolute] [left:26.18px] [top:4.18px] [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1712:25186;3035:452"]
            }} />
              <span data-figma="Rectangle" data-node="I1712:25186;3035:453" className="[width:20.49px] [height:8.35px] [position:absolute] [left:2.28px] [top:2.28px] [line-height:0]" dangerouslySetInnerHTML={{
              __html: svg["I1712:25186;3035:453"]
            }} />
            </div>
            <span data-figma="Wifi" data-node="I1712:25186;3035:454" className="[width:17.39px] [height:12.48px] [position:absolute] [left:26.11px] [top:0px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1712:25186;3035:454"]
          }} />
            <span data-figma="Mobile Signal" data-node="I1712:25186;3035:455" className="[width:19.35px] [height:12.14px] [position:absolute] [left:0px] [top:0.39px] [line-height:0]" dangerouslySetInnerHTML={{
            __html: svg["I1712:25186;3035:455"]
          }} />
          </div>
          <span data-figma="9:41" data-node="I1712:25186;3035:456" role="img" aria-label="9:41" className="[width:61.47px] [height:22.77px] [position:absolute] [left:0px] [top:0px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [flex-shrink:0] [line-height:0] [display:block]" dangerouslySetInnerHTML={{
          __html: svg["I1712:25186;3035:456"]
        }} />
        </div>
      </div>
      <div data-figma="Group 2147229002" data-node="1647:23503" className="[width:90.13px] [height:34px] [aspect-ratio:90.13/34.00] [position:absolute] [left:24px] [top:64px]">
        <span data-figma="Vector" data-node="1647:23504" className="[width:30.55px] [height:31.51px] [position:absolute] [left:0px] [top:2.49px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1647:23504"]
      }} />
        <span data-figma="Vector" data-node="1647:23505" className="[width:24.11px] [height:31.9px] [position:absolute] [left:66.02px] [top:0px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1647:23505"]
      }} />
        <span data-figma="Vector" data-node="1647:23506" className="[width:19.55px] [height:20.75px] [position:absolute] [left:25.14px] [top:10.95px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1647:23506"]
      }} />
        <span data-figma="Vector" data-node="1647:23507" className="[width:18.38px] [height:19.84px] [position:absolute] [left:39.81px] [top:9.97px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1647:23507"]
      }} />
        <span data-figma="Vector" data-node="1647:23508" className="[width:18.38px] [height:19.77px] [position:absolute] [left:53.4px] [top:9.57px] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1647:23508"]
      }} />
      </div>
      <div data-figma="live signal" data-node="1647:23509" className="[display:inline-flex] [padding:8px_14px] [align-items:center] [gap:8px] [border-radius:20px] [background:#222628] [position:absolute] [left:24px] [top:118px] [width:167px] [height:31px] [overflow:hidden]">
        <span data-figma="Ellipse" data-node="1647:23510" className="[position:relative] [width:8px] [height:8px] [flex-shrink:0] [line-height:0]" dangerouslySetInnerHTML={{
        __html: svg["1647:23510"]
      }} />
        <p data-figma="지금 23개 방에서 드르륵 중" data-node="1647:23511" data-outline="" className="[color:#F8F8F8] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:12px] [font-style:normal] [font-weight:500] [line-height:15px] [letter-spacing:-0.48px] [flex-shrink:0] [width:123px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]"><span className="[position:relative] [top:0.132px] [left:0px]">{"지금 23개 방에서 드르륵 중"}</span><span aria-hidden="true" className="[position:absolute] [left:0] [top:0] [width:0] [height:0] [overflow:visible] [line-height:0]" dangerouslySetInnerHTML={{
          __html: svg["1647:23511"]
        }} /></p>
      </div>
      <div data-figma="Group 2147229009" data-node="1647:23512" className="[width:26px] [height:26px] [position:absolute] [left:339px] [top:69px]">
        <img data-figma="bell" data-node="1647:23513" data-px="" data-hires="" alt="" src="./assets/home3/home-profile.webp" className="[width:26px] [height:26px] [position:absolute] [left:0px] [top:0px] [display:block]" />
      </div>
      <div data-figma="Frame 2147249328" data-node="2045:11669" aria-label="자기 전 뒤척이게 만드는 친구의 한 마디" role="img" className="[position:absolute] [left:98px] [top:729px] [width:195px] [height:16px] [line-height:0]" style={{ opacity: open ? 0 : 1, transition: tdur || tr('opacity') }} dangerouslySetInnerHTML={{ __html: INFO_SVG }} />
      <div data-figma="dim" data-node="2047:14201" aria-hidden="true" onClick={collapse} className="[position:absolute] [left:0px] [top:-200px] [width:390px] [height:calc(100%+400px)] [background:rgba(0,0,0,0.6)]" style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: tdur || tr('opacity') }} />
      <div ref={fieldRef} data-figma="input" data-node={startOpen ? '1671:45255' : '2045:11658'} data-instance-of="input" onClick={(e) => { e.stopPropagation(); if (!open) expand(e); else if (inputRef.current) inputRef.current.focus({ preventScroll: true }); }} onPointerDown={() => { if (!open) pressOn(fieldRef.current); }} onPointerUp={() => pressOff(fieldRef.current)} onPointerCancel={() => pressOff(fieldRef.current)} onPointerLeave={() => pressOff(fieldRef.current)} className="[display:flex] [width:342px] [padding:8px_8px_8px_20px] [align-items:center] [gap:8px] [border-radius:32px] [border:1px_solid_transparent] [position:absolute] [left:24px] [top:655px] [height:66px] [overflow:hidden] [isolation:isolate] [cursor:text] [touch-action:manipulation]" style={{ translate: (inputPos.x - SHUT.x) + 'px ' + (inputPos.y - SHUT.y) + 'px', transition: tdur || tr('translate') }}>
        <span aria-hidden="true" style={{ position: 'absolute', left: '-1px', top: '-1px', width: 0, height: 0, overflow: 'visible', zIndex: -1, lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: "<svg data-box=\"\" width=\"342\" height=\"66\" viewBox=\"0 0 342 66\" style=\"position:absolute;left:0;top:0;overflow:visible;z-index:-1;pointer-events:none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"342\" height=\"66\" rx=\"32\" style=\"fill:#222628\"/><defs><clipPath id=\"chome_input\"><rect width=\"342\" height=\"66\" rx=\"32\"/></clipPath></defs><g clip-path=\"url(#chome_input)\"><path d=\"M32 0 L32 1 L310 1 L310 0 L310 -1 L32 -1 L32 0 Z M342 32 L341 32 L341 34 L342 34 L343 34 L343 32 L342 32 Z M310 66 L310 65 L32 65 L32 66 L32 67 L310 67 L310 66 Z M0 34 L1 34 L1 32 L0 32 L-1 32 L-1 34 L0 34 Z M32 66 L32 65 C14.8792 65 1 51.1208 1 34 L0 34 L-1 34 C-1 52.2254 13.7746 67 32 67 L32 66 Z M342 34 L341 34 C341 51.1208 327.121 65 310 65 L310 66 L310 67 C328.225 67 343 52.2254 343 34 L342 34 Z M310 0 L310 1 C327.121 1 341 14.8792 341 32 L342 32 L343 32 C343 13.7746 328.225 -1 310 -1 L310 0 Z M32 0 L32 -1 C13.7746 -1 -1 13.7746 -1 32 L0 32 L1 32 C1 14.8792 14.8792 1 32 1 L32 0 Z\" fill-rule=\"nonzero\" style=\"fill:#222628\"/></g></svg>" }} />
        <div data-figma="채팅 입력" data-live="home" data-node="I2045:11658;1620:43934" className="[display:flex] [height:48px] [padding-right:16px] [align-items:center] [flex:1_0_0] [border-radius:24px] [overflow:hidden] [position:relative]">
          <p data-figma="편하게 고민을 꺼내보아요" data-node="I2045:11658;1620:43935" data-outline="" className="[color:#9AA1A6] [font-family:'SUIT',_system-ui,_sans-serif] [font-size:16px] [font-style:normal] [font-weight:400] [line-height:22px] [letter-spacing:-0.64px] [flex-shrink:0] [width:154px] [white-space:pre] [word-break:normal] [overflow-wrap:normal] [margin:0] [-webkit-text-fill-color:transparent] [position:relative]" style={{ opacity: hasText ? 0 : 1 }}><span style={{ position: 'relative', top: '0.176px', left: '0px' }}>{"편하게 고민을 꺼내보아요"}</span><span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, overflow: 'visible', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svg["I1671:45255;1620:43935"] }} /></p>
          <input
            ref={inputRef}
            type="text"
            enterKeyHint="send"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="편하게 고민을 꺼내보아요"
            className="live-input"
            tabIndex={open ? 0 : -1}
            readOnly={!open && fine}
            style={{ ...LIVE.inputStyle, fontFamily: "'SUIT', system-ui, sans-serif", fontSize: '16px', letterSpacing: '-0.64px', lineHeight: '22px', pointerEvents: open ? 'auto' : 'none', userSelect: 'text', WebkitUserSelect: 'text' }}
            onInput={() => { comp.current.on = false; refreshText(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); if (e.currentTarget.value.trim()) send(); } }}
          />
        </div>
        <div ref={btnRef} data-figma="btn_전송" data-node="I2045:11658;1671:44260" data-instance-of="btn_전송" role="button" aria-label="보내기" onPointerDown={(e) => { e.stopPropagation(); pressOn(btnRef.current); }} onPointerUp={() => pressOff(btnRef.current)} onPointerCancel={() => pressOff(btnRef.current)} onPointerLeave={() => pressOff(btnRef.current)} onMouseDown={(e) => e.preventDefault()} onClick={(e) => { e.stopPropagation(); send(); }} className="[display:flex] [width:48px] [height:48px] [justify-content:center] [align-items:center] [flex-shrink:0] [border-radius:24px] [background:#36D2FF] [overflow:hidden] [cursor:pointer] [touch-action:manipulation]">
          <Icon data-figma="arrow-right" data-node="I2045:11658;1671:44260;1620:43796" name="arrow-right-1620-23215" color="#000000" className="[width:24px] [height:24px] [flex-shrink:0] [position:relative]" />
        </div>
      </div>
      {fine && (
        <div data-figma="Keyboard / KR / iOS" data-node="2047:14061" aria-hidden="true" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.preventDefault()} className="[position:absolute] [touch-action:manipulation]" style={{ left: KB.x, top: kbTop, width: KB.w, height: KB.h, transform: open ? 'translateY(0)' : 'translateY(' + KB.h + 'px)', visibility: open ? 'visible' : 'hidden', transition: tdur || (tr('transform') + ', visibility 0ms linear ' + (open ? 0 : dur) + 'ms') }}>
          <img alt="" src={'./assets/home4/keyboard.webp'} draggable={false} className="[position:absolute] [left:0px] [top:0px] [width:389px] [height:303px] [display:block] [max-width:none] [pointer-events:none]" />
          {KEYS.map((key) => (
            <div key={key.k} className="[position:absolute] [cursor:pointer]" style={{ left: key.x - 3, top: key.y - 6, width: key.w + 6, height: key.h + 12 }} onPointerDown={(e) => { e.preventDefault(); keyPress(key); }}>
              <span ref={(el) => { flashRefs.current[key.k] = el; }} className="[position:absolute] [border-radius:5px] [pointer-events:none]" style={{ left: 3, top: 6, width: key.w, height: key.h, background: 'rgba(255,255,255,0.22)', opacity: key.k === 'shift' && shift ? 1 : 0 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
