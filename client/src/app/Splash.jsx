// 스플래시. 피그마 Brand / Logo의 로고 모션 영상(type=모션, 소리 포함)을 그대로 튼다.
// 브라우저가 소리 있는 자동 재생을 막으면 소리 없이 먼저 틀고, 화면을 처음 누르는 순간 소리를 켠다.
// 영상은 원본 비율 그대로(object-contain) 화면 가운데에 두고, 바탕은 영상 바탕색과 같은 bg/surface(#121415)로 이어 붙인다.
// 줄인 움직임 설정이면 영상 대신 정지한 로고(SVG)를 잠깐 보여 준다. 끝나면 옅어지며 아래에 미리 그려 둔 홈이 드러난다.
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from '../tokens.js';
import { useReducedMotion } from './useReducedMotion.js';
import { useViewport } from './useFitScale.js';

const BASE = import.meta.env.BASE_URL;

export default function Splash({ onDone }) {
  const video = useRef(null);
  const reduced = useReducedMotion();
  const vp = useViewport();
  const scale = vp.scale;
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    window.setTimeout(onDone, motion.splashOut);
  }, [onDone]);

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(finish, motion.splashStill);
      return () => window.clearTimeout(t);
    }
    const v = video.current;
    if (!v) return undefined;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(finish);
    });
    return undefined;
  }, [reduced, finish]);

  const unmute = () => {
    const v = video.current;
    if (v && v.muted) v.muted = false;
  };

  return (
    <div
      className="fixed inset-0 z-splash flex items-start justify-center bg-outside transition-opacity ease-out"
      style={{ opacity: leaving ? 0 : 1, transitionDuration: motion.splashOut + 'ms', pointerEvents: leaving ? 'none' : 'auto' }}
      onPointerDown={unmute}
      aria-label="DRRRK"
      role="img"
    >
      {/* 휴대폰은 창 전체를 채우고, 컴퓨터는 앱 크기(390 x 844)를 창 높이에 맞춘다. */}
      <div className="relative h-screen-app w-screen shrink-0 origin-top overflow-hidden bg-surface" style={vp.mobile ? { width: '100vw', height: '100%', transform: 'none' } : { transform: 'scale(' + scale + ')' }}>
        {reduced ? (
          <img src={BASE + 'logo.svg'} alt="" className="absolute left-1/2 top-1/2 w-logo -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <video
            ref={video}
            src={BASE + 'assets/splash/logo-motion.mp4'}
            poster={BASE + 'assets/splash/logo-motion-poster.jpg'}
            playsInline
            preload="auto"
            onPlaying={(e) => {
              // 로고가 다 그려진 뒤(splashCut)에 끝낸다. 뒤쪽의 멈춘 구간을 기다리지 않는다.
              const v = e.currentTarget;
              window.setTimeout(finish, Math.max(0, motion.splashCut - v.currentTime * 1000));
            }}
            onEnded={finish}
            onError={finish}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
