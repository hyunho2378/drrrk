// 자동 생성: figma-to-code. 피그마는 너비 자동 글자의 상자 폭을 정수로 올린다(15.02 → 16). 같은 폭을 만들어 가운데 정렬이 1px 밀리지 않게 한다.
// width를 받으면(화면 코드가 넘기는 피그마 폭) 그 폭을 쓴다. 글자가 디자인과 다르면 width 없이 불러 브라우저에서 재고 정수로 올린다.
import React, { useLayoutEffect, useRef } from 'react';
export function AutoText({
  style,
  children,
  width,
  ...rest
}) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (width !== undefined) {
      el.style.width = width + 'px';
      return;
    }
    el.style.width = '';
    const r = document.createRange();
    r.selectNodeContents(el);
    const w = r.getBoundingClientRect().width;
    el.style.width = Math.ceil(w - 0.01) + 'px';
  });
  return <p ref={ref} style={{
    ...style,
    width: width !== undefined ? width + 'px' : undefined,
    flexShrink: 0
  }} {...rest}>{children}</p>;
}