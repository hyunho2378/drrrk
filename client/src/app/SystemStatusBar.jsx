// 시스템 상태바. 화면마다 따로 그리지 않고 맨 위에 한 번만 두어 화면을 옮겨도 그대로 있다. 시계는 지금 시각이다.
import React, { useLayoutEffect, useRef } from 'react';
import { mountClock } from './live.js';
import rightSide from './statusBarSvg.js';

export default function SystemStatusBar() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    mountClock(ref.current);
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[60] h-[64px] w-[390px] overflow-hidden">
      <div data-figma="9:41" className="absolute left-[40.52px] top-[20.26px] h-[22.77px] w-[61.47px]" />
      <span className="absolute left-[279.84px] top-[25.32px] block h-[13px] w-[78px] leading-[0]" dangerouslySetInnerHTML={{ __html: rightSide }} />
    </div>
  );
}
