// 온보딩 카드 위쪽 Visual(326 x 220)을 부품으로 다시 그린다. 팀 피그마 카드 프레임
// 함께 드르륵 1~5(1829:11174, 2장은 원본 이모지 버전 1955:12292, 1829:11275, 11323, 11366)와 혼자 드르륵 5, 6(1647:22976, 1647:23028)의 Visual 트리 값 그대로다.
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../figma/Icon.jsx';
import { ED, ST, OB2, IMG, SHADOW, an, abs, noop, useRM, useAfter, Txt, Typed, Skel, Panel, Avatar, Svg, RotImg, Chip } from './parts.jsx';

const DARK = '#121415';
const WHITE = '#F8F8F8';
const SKY = '#36D2FF';

// 함께 드르륵 1: 고민 매칭
const AVATARS = ['av-conv', 'av-stool', 'av-sofa', 'av-wheel', 'av-recliner'];
export function V1() {
  return (
    <>
      <Panel t={60}>
        <div data-figma="고민 알약" style={{ ...abs(47, 18, 137, 26), ...an('obFromL', 240, 300) }}>
          <div className="obp" onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 99, background: DARK }}>
            <Txt x={10} y={6} w={20} h={14} size={11} weight={700} color={SKY}>고민</Txt>
            <Txt x={36} y={6} w={91} h={14} size={11} weight={500} color={WHITE}><Typed text="둘이 찍은 사진인데…" t={400} /></Txt>
          </div>
        </div>
        {AVATARS.map((a, k) => <Avatar key={a} x={11 + k * 43} y={66} src={OB2 + a + '.webp'} t={540 + k * 80} />)}
        <Skel x={30} y={124} w={170} h={14} r={7} t={940} />
        <Skel x={55} y={148} w={120} h={14} r={7} t={1000} />
      </Panel>
      <Chip x={194} y={168} w={104} h={32} bg={DARK} t={1080}>
        <div style={{ ...abs(12, 8, 16, 16), ...an('obTilt', 1440, 360, ST) }}><Icon name="home-chair-1620-22984" color={SKY} style={{ width: 16, height: 16 }} /></div>
        <Txt x={34} y={8.5} w={56} h={15} size={12} weight={700} color={WHITE}>함께 드르륵</Txt>
      </Chip>
    </>
  );
}

// 함께 드르륵 2: 이모지 반응. 피그마 "함께 드르륵 2 이모지 (원본 이모지 버전)"(1955:12271) Visual(1955:12292) 값 그대로다.
// 플러스 메뉴 이모지(세로, 1955:12297) 4개 중 누른 이모지가 선택되고, 그 얼굴이 궤적 1(1969:18581), 궤적 2(1969:18587),
// 날아가는 이모지 / 웃음(1969:18593) 자리로 작은 것부터 커지며 날아간 뒤 1.0초에 사라진다.
// 피그마 궤적 얼굴 벡터는 토닥 얼굴(face, feat, mouth, tear) 하나뿐이라 쉬는 모습은 fly-face, 날아가는 얼굴은 누른 이모지의 Reaction Emoji 그림을 쓴다(토닥은 fly-face).
const EMOJI = [
  { k: 'funny', y: 3.9 },
  { k: 'pat', y: 34.3 },
  { k: 'cheer', y: 64.7 },
  { k: 'empathy', y: 95.1, w: 19 },
];
const TRAIL = [
  { x: 60, y: 138, s: 18, op: 0.2, d: 0 },
  { x: 80, y: 114, s: 26, op: 0.45, d: 70 },
  { x: 106, y: 82, s: 48, op: 1, d: 140, shadow: true },
];
const FACE_SHADOW = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.14))';
const MENU = { x: 16, y: 8 };
function Face({ k, s, shadow }) {
  const style = shadow ? { filter: FACE_SHADOW } : undefined;
  if (!k || k === 'pat') return <Svg name="fly-face" w={s} h={s} style={style} />;
  // Reaction Emoji(18 x 18)는 얼굴이 0.8 안쪽에 16.5 크기로 있어 얼굴이 s를 채우게 키운다.
  const z = s / 16.5;
  return <Svg name={'emo-' + k} x={-0.8 * z} y={-0.8 * z} w={(k === 'empathy' ? 19 : 18) * z} h={18 * z} style={style} />;
}
export function V2() {
  const reduced = useRM();
  const [sel, setSel] = useState('pat');
  const [flight, setFlight] = useState(null);
  const selRef = useRef('pat');
  const seq = useRef(0);
  const timer = useRef(0);
  const fly = (k) => {
    selRef.current = k;
    setSel(k);
    if (reduced) return;
    seq.current += 1;
    const e = EMOJI.find((m) => m.k === k);
    setFlight({ id: seq.current, k, cx: MENU.x + 4 + 13, cy: MENU.y + e.y + 13 });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlight(null), 1000);
  };
  useEffect(() => {
    if (reduced) return undefined;
    const first = window.setTimeout(() => fly(selRef.current), 2600);
    const loop = window.setInterval(() => fly(selRef.current), 15000);
    return () => { window.clearTimeout(first); window.clearInterval(loop); window.clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);
  return (
    <Panel t={60}>
      <Skel x={72} y={20} w={120} h={24} r={12} t={300} />
      <Skel x={72} y={54} w={96} h={24} r={12} t={360} />
      <div data-figma="플러스 메뉴 이모지 (세로)" style={{ ...abs(MENU.x, MENU.y, 34, 121), transformOrigin: '50% 100%', ...an('obRise', 420, 300) }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 17, background: '#000000', boxShadow: 'inset 0 0 0 0.55px #222628', overflow: 'hidden' }}>
          {EMOJI.map((e, n) => (
            <div key={e.k} data-figma={'emoji ' + e.k} style={{ ...abs(4, e.y, 26, 26), ...an('obRiseS', 480 + (EMOJI.length - 1 - n) * 60, 260) }}>
              <div className="obp" onClick={() => fly(e.k)} onTouchStart={noop}
                style={{ position: 'relative', width: 26, height: 26, borderRadius: 13, background: '#222628', boxShadow: sel === e.k ? '0 0 0 1.5px ' + SKY : '0 0 0 0 rgba(54, 210, 255, 0)', transition: 'box-shadow 120ms ' + ST }}>
                <Svg name={'emo-' + e.k} x={4} y={4} w={e.w || 18} h={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div data-figma="btn_더보기" style={{ ...abs(16, 135, 34, 34), ...an('obPop', 340, 420) }}>
        <div className="obp" onTouchStart={noop} style={{ position: 'relative', width: 34, height: 34, borderRadius: 24, background: '#000000' }}>
          <div style={abs(5, 5, 24, 24)}><Icon name="plus-1620-23225" color={WHITE} style={{ width: 24, height: 24 }} /></div>
        </div>
      </div>
      {/* 쉬는 모습: 피그마 궤적 1, 2와 큰 얼굴. 날아가는 동안은 숨겼다가 끝나면 다시 보인다. */}
      <div style={{ ...abs(0, 0, 230, 200), pointerEvents: 'none', opacity: flight ? 0 : 1, transition: 'opacity ' + (flight ? 90 : 240) + 'ms ' + ST }}>
        {TRAIL.map((t, n) => (
          <div key={n} data-figma={n === 2 ? '날아가는 이모지 / 웃음' : '이모지 궤적 ' + (n + 1)} style={{ ...abs(t.x, t.y, t.s, t.s), ...an('obPop', 760 + n * 80, 420) }}>
            <div style={{ position: 'relative', width: t.s, height: t.s, opacity: t.op }}><Face s={t.s} shadow={t.shadow} /></div>
          </div>
        ))}
      </div>
      {flight && TRAIL.map((t, n) => (
        <div key={flight.id + '-' + n} style={{
          ...abs(t.x, t.y, t.s, t.s), zIndex: 5, pointerEvents: 'none',
          '--dx': (flight.cx - (t.x + t.s / 2)) + 'px', '--dy': (flight.cy - (t.y + t.s / 2)) + 'px', '--s0': 16.5 / t.s,
          animation: `obFace ${1000 - t.d}ms ${ED} ${t.d}ms both`,
        }}>
          <div style={{ position: 'relative', width: t.s, height: t.s, opacity: t.op }}><Face k={flight.k} s={t.s} shadow={t.shadow} /></div>
        </div>
      ))}
    </Panel>
  );
}

// 함께 드르륵 3: 주전부리. 퀵슬롯 칸을 누르면 그 주전부리가 포물선으로 테이블에 올라앉고 6초 뒤 사라진다.
const SNACK = { 새우깡: 'bed9931029c69814ae2f6dd44ebd80d71fa2505e', 소주: '191be13a520213686ad5b874a05f08d497379aa1', 오징어땅콩: 'c37719d2006c751888fb31e7273db993645ce2b4', 노가리: '0f95cc55d0fc315a02c2b11f5841c19d8657ef4d' };
const SLOTS = [{ n: '새우깡', y: 20, on: true }, { n: '소주', y: 64 }, { n: '오징어땅콩', y: 108 }];
const LAND = [{ x: 86, y: 62, r: 8 }, { x: 56, y: 66, r: -10 }, { x: 112, y: 64, r: 14 }, { x: 72, y: 58, r: -4 }];
const src = (n) => IMG + SNACK[n] + '.webp';
export function V3() {
  const [toss, setToss] = useState([]);
  const seq = useRef(0);
  const throwIt = (s) => {
    const land = LAND[seq.current % LAND.length];
    seq.current += 1;
    const cx = 178 + 1 + 19;
    const cy = 12 + s.y + 19;
    setToss((l) => [...l, { id: seq.current, n: s.n, ...land, sx: cx - land.x, sy: cy - land.y }]);
  };
  return (
    <Panel t={60} shadow={false}>
      <div data-figma="테이블" style={{ ...abs(0, 0, 230, 200), ...an('obRise', 200, 400) }}>
        <div style={{ ...abs(22, 148, 124, 16), borderRadius: '50%', background: 'rgba(18, 20, 21, 0.14)', filter: 'blur(3px)' }} />
        <div style={{ ...abs(54, 140, 60, 12), borderRadius: '50%', background: 'linear-gradient(180deg, #D9DDE0 0%, #B4BBC0 100%)' }} />
        <div style={{ ...abs(77, 93, 14, 52), borderRadius: 3, background: 'linear-gradient(90deg, #B4BBC0 0%, #E6E9EB 45%, #AEB5BA 100%)' }} />
        <div style={{ ...abs(10, 75, 148, 42), borderRadius: '50%', background: 'linear-gradient(180deg, #C9CED2 0%, #A9B0B5 100%)' }} />
        <div style={{ ...abs(10, 68, 148, 42), borderRadius: '50%', background: 'linear-gradient(180deg, #FFFFFF 0%, #E4E7EA 100%)' }} />
        <div style={{ ...abs(28, 73, 88, 12), borderRadius: '50%', background: 'rgba(255, 255, 255, 0.7)', filter: 'blur(2px)' }} />
      </div>
      <div style={{ ...abs(0, 0, 0, 0), ...an('obDrop', 440, 320) }}><RotImg x={34} y={44} w={34} h={38} rot={14} src={src('노가리')} /></div>
      <div style={{ ...abs(0, 0, 0, 0), ...an('obDrop', 500, 320) }}><RotImg x={70} y={38} w={32} h={36} rot={-6} src={src('오징어땅콩')} /></div>
      <div style={{ ...abs(0, 0, 0, 0), ...an('obDrop', 560, 320) }}><RotImg x={104} y={32} w={22} h={46} rot={-16} src={src('소주')} /></div>
      {/* 자동 시연: 새우깡 칸에서 날아가는 새우깡(피그마 "날아가는 새우깡" 자리에서 멈춘다) */}
      <div style={{ ...abs(0, 0, 0, 0), '--sx': '66px', '--sy': '-9px', ...an('obArc', 820, 700, 'cubic-bezier(0.3, 0, 0.5, 1)') }}>
        <RotImg x={126.2} y={41} w={26} h={30} rot={-24} src={src('새우깡')} shadow="drop-shadow(0 4px 4px rgba(18, 20, 20, 0.18))" />
      </div>
      <div data-figma="주전부리 퀵슬롯 (펼침)" style={abs(178, 12, 40, 146)}>
        <div style={{ ...abs(0, 0, 40, 14), borderRadius: 8, background: DARK, ...an('obDrop', 300, 260) }}>
          <div style={{ ...abs(13, 6, 14, 3), borderRadius: 2, background: 'rgba(248, 248, 248, 0.6)' }} />
        </div>
        {SLOTS.map((s, k) => (
          <div key={s.n} style={{ ...abs(1, s.y, 38, 38), ...an('obDrop', 350 + k * 50, 300) }}>
            <div className="obp" onClick={() => throwIt(s)} onTouchStart={noop} style={{ position: 'relative', width: 38, height: 38, borderRadius: 12, background: DARK, boxShadow: s.on ? 'inset 0 0 0 2px ' + SKY : 'none' }}>
              <img src={src(s.n)} alt="" draggable={false} style={{ ...abs(6, 6, 26, 26), objectFit: 'contain' }} />
            </div>
          </div>
        ))}
      </div>
      {toss.map((o) => (
        <div key={o.id} onAnimationEnd={(e) => { if (e.animationName === 'obFadeOut') setToss((l) => l.filter((x) => x.id !== o.id)); }}
          style={{ ...abs(0, 0, 0, 0), zIndex: 4, pointerEvents: 'none', animation: `obFadeOut 600ms ${ST} 6700ms forwards` }}>
          <div style={{ ...abs(0, 0, 0, 0), '--sx': o.sx + 'px', '--sy': o.sy + 'px', ...an('obArc', 0, 700, 'cubic-bezier(0.3, 0, 0.5, 1)') }}>
            <img src={src(o.n)} alt="" draggable={false} style={{ ...abs(o.x - 13, o.y - 15, 26, 30), objectFit: 'contain', transform: `rotate(${o.r}deg)`, filter: 'drop-shadow(0 4px 4px rgba(18, 20, 20, 0.18))' }} />
          </div>
        </div>
      ))}
    </Panel>
  );
}

// 함께 드르륵 4: 해 뜨기 타이머. 20:00에서 00:00까지 2.4초에 줄고, 끝나면 "해가 떴어요" 칩이 떠오른 뒤 타이머가 20:00으로 돌아간다. 누르면 처음부터.
const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
function V4Run({ onReplay }) {
  const reduced = useRM();
  const [sec, setSec] = useState(reduced ? 1200 : 1200);
  const [phase, setPhase] = useState(reduced ? 'done' : 'wait');
  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const timers = [];
    const start = performance.now() + 600;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / 2400));
      setSec(Math.round(1200 * (1 - p)));
      if (p > 0) setPhase((ph) => (ph === 'wait' ? 'run' : ph));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase('sun');
        timers.push(window.setTimeout(() => { setSec(1200); setPhase('done'); }, 900));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach((id) => window.clearTimeout(id)); };
  }, [reduced]);
  const sunUp = phase === 'sun' || phase === 'done';
  return (
    <>
      <Panel t={60}>
        <div data-figma="Timer Pill" style={{ ...abs(44, 18, 142, 32), ...an('obRise', 220, 300) }}>
          <div className="obp" onClick={onReplay} onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 20, background: DARK, overflow: 'hidden' }}>
            <div style={{ ...abs(12, 9, 14, 14), animation: phase === 'run' ? `obBreath 800ms ${ST} infinite` : 'none' }}><Svg name="timer" w={14} h={14} /></div>
            <Txt x={32} y={8.5} w={56} h={15} size={12} weight={500} color={WHITE}>해 뜨기까지</Txt>
            <Txt x={94} y={8.5} w={34} h={15} size={12} weight={700} color={SKY} style={{ fontVariantNumeric: 'tabular-nums' }}>
              <span key={phase === 'done' ? 'reset' : 'count'} style={{ display: 'inline-block', ...(phase === 'done' && !reduced ? an('obLabelUp', 0, 260) : null) }}>{fmt(sec)}</span>
            </Txt>
          </div>
        </div>
        <Skel x={16} y={70} w={120} h={24} r={12} t={320} />
        <Skel x={94} y={104} w={120} h={24} r={12} t={380} op={0.7} />
        <Skel x={16} y={138} w={96} h={24} r={12} t={440} op={0.45} />
        <Skel x={110} y={172} w={104} h={24} r={12} t={500} op={0.2} />
      </Panel>
      {sunUp && (
        <div data-figma="해가 떴어요 칩" style={{ ...abs(20, 150, 110, 34), ...an('obRise', 0, 400) }}>
          <div className="obp" onClick={onReplay} onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 99, background: WHITE, boxShadow: SHADOW }}>
            <div style={{ ...abs(12, 8, 18, 18), ...an('obSun', 120, 500) }}><Icon name="sun-1620-23094" color="#FFB800" style={{ width: 18, height: 18 }} /></div>
            <Txt x={36} y={9} w={60} h={16} size={13} weight={700} color={DARK}>해가 떴어요</Txt>
          </div>
        </div>
      )}
    </>
  );
}
export function V4() {
  const [run, setRun] = useState(0);
  return <V4Run key={run} onReplay={() => setRun((r) => r + 1)} />;
}

// 함께 드르륵 5: 리포트. 엉따 온도가 38.1°에서 39.2°로 오르고(1.2초) 막대가 차며, 끝나는 순간 "1.1°C"가 한 번 튄다. 카드를 누르면 다시.
function V5Run({ onReplay }) {
  const reduced = useRM();
  const [v, setV] = useState(reduced ? 39.2 : 38.1);
  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const start = performance.now() + 500;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / 1200));
      const e = 1 - Math.pow(1 - p, 3);
      setV(38.1 + 1.1 * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  const T = { size: 11, weight: 700, ls: -0.22, h: 15 };
  return (
    <Panel t={60}>
      <div data-figma="엉따 온도 카드" style={{ ...abs(16, 14, 198, 76), ...an('obRise', 200, 300) }}>
        <div className="obp" onClick={onReplay} onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14, background: 'rgba(18, 20, 21, 0.05)' }}>
          <Txt x={8} y={9} w={102} {...T} color={DARK}>오늘 대화로 엉따 온도가</Txt>
          <Txt x={8} y={24} w={65} {...T} color={DARK}>
            <span style={{ display: 'inline-block', color: SKY, transformOrigin: '50% 70%', ...an('obBounce', 1700, 300, ST) }}>1.1°C</span>{' 올랐어요'}
          </Txt>
          <Txt x={14} y={46} w={37} h={14} size={10} weight={500} ls={-0.2} color="#6E767C">엉따 온도</Txt>
          <Txt x={152} y={43} w={32} h={18} size={13} weight={700} ls={-0.26} color={SKY} style={{ fontVariantNumeric: 'tabular-nums' }}>{v.toFixed(1) + '°'}</Txt>
          <div style={{ ...abs(14, 62, 170, 6), borderRadius: 3, background: 'rgba(154, 161, 166, 0.28)' }} />
          <div style={{ ...abs(14, 62, 122, 6), borderRadius: 3, overflow: 'hidden', transformOrigin: 'left center', background: SKY, ...an('obGrowX', 500, 1200, 'cubic-bezier(0.33, 1, 0.68, 1)') }}>
            <span className="ob-shine" style={{ animation: `obShimmer 900ms ${ST} 900ms 1 both` }} />
          </div>
        </div>
      </div>
      {[{ y: 104, w: 146, bar: 120, n: '1', nx: 6.5, nw: 5 }, { y: 128, w: 122, bar: 96, n: '2', nx: 5.5, nw: 7 }].map((s, k) => (
        <div key={s.n} data-figma={'단계 ' + s.n} style={{ ...abs(16, s.y, s.w, 18), ...an('obRiseS', 380 + k * 60, 260) }}>
          <div style={{ ...abs(0, 0, 18, 18), borderRadius: '50%', background: SKY }} />
          <Txt x={s.nx} y={2} w={s.nw} h={14} size={11} weight={700} color={WHITE} align="center">{s.n}</Txt>
          <Skel x={26} y={4} w={s.bar} h={10} r={5} t={440 + k * 60} />
        </div>
      ))}
      <div data-figma="베스트 댓글 줄" style={{ ...abs(16, 152, 198, 56), borderRadius: 14, background: 'rgba(18, 20, 21, 0.05)', ...an('obRise', 520, 300) }}>
        <Avatar x={12} y={12} size={32} src={OB2 + 'av-sofa.webp'} t={600} />
        <Skel x={56} y={16} w={100} h={10} r={5} t={660} />
        <Skel x={56} y={32} w={64} h={8} r={4} t={700} />
      </div>
    </Panel>
  );
}
export function V5() {
  const [run, setRun] = useState(0);
  return <V5Run key={run} onReplay={() => setRun((r) => r + 1)} />;
}

// 혼자 드르륵 1: AI와 먼저 대화. AI 말풍선 안에서 스켈레톤 줄이 반짝이다가 1.2초 뒤 글이 타자처럼 나타난다.
const AI_TEXT = '많이 당황했겠다. 지금은 좀 어때?';
const ME_TEXT = '원래부터 걔가 나한테 좀…';
export function S1() {
  const reduced = useRM();
  const typing = !useAfter(1500, reduced);
  const meAt = 1500 + Array.from(AI_TEXT).length * 30 + 120;
  const B = { size: 12, weight: 500, ls: -0.48, h: 17, lh: 16.8 };
  return (
    <>
      <Panel t={60}>
        <Txt x={16} y={18} w={62} h={15} lh={15.4} size={11} weight={500} ls={-0.44} color="#6E767C" style={an('obFade', 200, 260, ST)}>AI 드르륵 의자</Txt>
        <div data-figma="AI 말풍선" style={{ ...abs(16, 41, 173, 37), ...an('obRise', 260, 300) }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14, background: DARK }}>
            {typing ? (
              <Skel x={12} y={14} w={96} h={9} r={5} t={0} grow={false} dark bg="rgba(248, 248, 248, 0.16)" />
            ) : (
              <Txt x={12} y={10} w={149} {...B} color={WHITE}><Typed text={AI_TEXT} t={0} /></Txt>
            )}
          </div>
        </div>
        <div data-figma="내 말풍선" style={{ ...abs(73, 86, 141, 37), ...an('obFromR', meAt, 300) }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14, background: SKY }}>
            <Txt x={12} y={10} w={117} {...B} color={DARK}>{ME_TEXT}</Txt>
          </div>
        </div>
        <Skel x={16} y={131} w={120} h={24} r={12} t={meAt + 200} />
      </Panel>
      <Chip x={16} y={172} w={182} h={32} bg={WHITE} t={500}>
        <div style={abs(12, 8, 16, 16)}><Icon name="clock-1620-23295" color="#6E767C" style={{ width: 16, height: 16 }} /></div>
        <Txt x={34} y={8} w={134} h={16} size={13} weight={700} color={DARK} style={{ animation: `obPulse 1600ms ${ST} 1000ms infinite` }}>의자 꺼내두고 기다리는 중</Txt>
      </Chip>
    </>
  );
}

// 혼자 드르륵 2: 사람이 매칭되면. 발견 알림이 0.92배에서 커지며 뜨고, 의자 아이콘이 먼저 튄 뒤 두 버튼이 90ms 시차로 올라온다.
export function S2() {
  const BT = { h: 14, size: 10, weight: 700, ls: -0.4 };
  return (
    <Panel t={60}>
      <Skel x={40} y={18} w={150} h={20} r={10} t={240} />
      <div data-figma="발견 알림" style={{ ...abs(18, 48, 194, 140), ...an('obModal', 320, 300) }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 16, background: DARK }}>
          <div style={{ ...abs(80, 14, 34, 34), ...an('obPop', 480, 420) }}>
            <div className="obp" onClick={(e) => e.currentTarget.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)', offset: 0.4 }, { transform: 'scale(1)' }], { duration: 300, easing: ST })} onTouchStart={noop}
              style={{ position: 'relative', width: 34, height: 34, borderRadius: 999, background: '#06303C' }}>
              <div style={abs(8, 8, 18, 18)}><Icon name="home-chair-1620-22984" color={SKY} style={{ width: 18, height: 18 }} /></div>
            </div>
          </div>
          <Txt x={44} y={56} w={106} h={34} lh={16.8} size={12} weight={700} ls={-0.48} color={WHITE} align="center" style={an('obRiseS', 600, 260)}>{'비슷한 고민의 사람들을\n발견했어요!'}</Txt>
          <div style={{ ...abs(14, 98, 75, 28), ...an('obRise', 700, 300) }}>
            <div className="obp" onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14, background: '#222628' }}>
              <Txt x={11} y={7} w={53} {...BT} color={WHITE}>마저 얘기하기</Txt>
            </div>
          </div>
          <div style={{ ...abs(95, 98, 85, 28), ...an('obRise', 790, 300) }}>
            <div style={{ width: '100%', height: '100%', animation: `obBeat 1800ms ${ST} 1300ms infinite` }}>
              <div className="obp" onTouchStart={noop} style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 14, background: SKY }}>
                <Txt x={11} y={7} w={63} {...BT} color={DARK}>함께 드르륵 앉기</Txt>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export const VIS_TOGETHER = [V1, V2, V3, V4, V5];
export const VIS_SOLO = [S1, S2];
