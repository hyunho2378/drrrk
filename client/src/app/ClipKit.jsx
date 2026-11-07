// 네이버 클립 모방 화면 두 장이 함께 쓰는 도구. 값은 팀 피그마 섹션 "네이버 클립 모방"(1843:40426)에서 가져왔다.
import React from 'react';

export const BASE = import.meta.env.BASE_URL;
export const pic = (n) => BASE + 'assets/images/clip-' + n + '.webp';
const FONT = "'SUIT', system-ui, sans-serif";

export const A = (x, y, w, h, extra) => ({ position: 'absolute', left: x, top: y, width: w, height: h, ...extra });
export const type = (size, weight, color, extra) => ({
  fontFamily: FONT, fontSize: size, fontWeight: weight, color,
  lineHeight: Math.round(size * 1.4) + 'px', letterSpacing: '-0.02em', whiteSpace: 'nowrap', margin: 0, ...extra,
});

// 선 아이콘 한 장(SVG 문장). 피그마와 같은 경로를 쓴다.
export const S = (w, h, body, o = {}) =>
  '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" fill="none" stroke="' +
  (o.c || '#FFFFFF') + '" stroke-width="' + (o.sw || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" style="display:block">' + body + '</svg>';

export function Svg({ html, x, y, w, h, name, style }) {
  return <span data-figma={name} style={{ ...A(x, y, w, h), lineHeight: 0, fontSize: 0, ...style }} dangerouslySetInnerHTML={{ __html: html }} />;
}

// 그림 한 장. round면 원형이다.
export function Pic({ src, x, y, w, h, r = 0, round, name, style }) {
  return (
    <div data-figma={name} style={{ ...A(x, y, w, h), borderRadius: round ? '50%' : r, overflow: 'hidden', background: '#2D2D2D', ...style }}>
      <img src={pic(src)} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

// 글자 한 줄. cx를 주면 그 가운데에 맞추고, x를 주면 왼쪽에 맞춘다. cy는 세로 가운데다.
export function Label({ children, name, x, cx, cy, y, size, weight, color, w = 160, style }) {
  const lh = Math.round(size * 1.4);
  const top = cy != null ? cy - lh / 2 : y;
  const box = cx != null ? { left: cx - w / 2, width: w, textAlign: 'center' } : { left: x };
  return <div data-figma={name} style={{ position: 'absolute', top, height: lh, ...box, ...type(size, weight, color), ...style }}>{children}</div>;
}

// 알약. x 또는 right로 자리를 잡는다.
export function Pill({ children, name, x, right, y, h, bg, color = '#FFFFFF', size = 12, weight = 500, padX = 8, radius, border, style }) {
  const pos = right != null ? { right } : { left: x };
  return (
    <div data-figma={name} style={{
      position: 'absolute', top: y, height: h, ...pos, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
      padding: '0 ' + padX + 'px', borderRadius: radius == null ? h / 2 : radius, background: bg, border: border || 'none',
      ...type(size, weight, color), ...style,
    }}>{children}</div>
  );
}
