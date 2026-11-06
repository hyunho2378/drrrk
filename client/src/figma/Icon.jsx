// 자동 생성: figma-to-code. 피그마 아이콘 원본(글리프) 컴포넌트를 SVG로 내보낸 목록에서 만든다. 피그마를 고친 뒤 다시 생성한다.
// 사용: <Icon name="thumb-up" color="#36D2FF" className="w-[16px] h-[16px]" />. 한 색 글리프는 color로 칠하고, 여러 색 글리프는 원래 색 그대로다.
// 놓인 상자 크기에 맞춰 원본 비율로 늘린다(피그마 크기 조절과 같다). 피그마는 SVG 크기를 정수로 올려 내보내므로(13.33 → 14) 그 비율을 그대로 둔다.
// 선 굵기: 피그마는 크기 조절에는 선 두께를 그대로 두고, 스케일 도구로 키우면 같이 키운다. 크기 조절한 인스턴스는 생성기가 strokeScale(원본 폭 / 놓인 폭)을 넘겨 SVG가 늘어난 만큼 선을 되돌린다.
import React from 'react';
const files = import.meta.glob('../assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true
});
export const glyphs = {
  "모드-그리드": {
    "file": "모드-그리드.svg",
    "w": 88,
    "h": 34,
    "vw": 88,
    "vh": 34,
    "mono": false
  },
  "home-chair": {
    "file": "home-chair.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "chat": {
    "file": "chat.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "information": {
    "file": "information.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "information-1148-2482": {
    "file": "information-1148-2482.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "기타-gear-20": {
    "file": "기타-gear-20.svg",
    "w": 20,
    "h": 20,
    "vw": 20,
    "vh": 20,
    "mono": true
  },
  "기타-brush-14": {
    "file": "기타-brush-14.svg",
    "w": 14,
    "h": 14,
    "vw": 14,
    "vh": 14,
    "mono": true
  },
  "기타-ban-26": {
    "file": "기타-ban-26.svg",
    "w": 26,
    "h": 26,
    "vw": 26,
    "vh": 26,
    "mono": true
  },
  "기타-share-24": {
    "file": "기타-share-24.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "home-chair-1463-24062": {
    "file": "home-chair-1463-24062.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "live": {
    "file": "live.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "community": {
    "file": "community.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "my": {
    "file": "my.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "microphone": {
    "file": "microphone.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "microphone-off": {
    "file": "microphone-off.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "voice-wave": {
    "file": "voice-wave.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "view": {
    "file": "view.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "thumb-up": {
    "file": "thumb-up.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "thumb-down": {
    "file": "thumb-down.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "moon": {
    "file": "moon.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "sun": {
    "file": "sun.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "view-grid": {
    "file": "view-grid.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "view-field": {
    "file": "view-field.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "pencil": {
    "file": "pencil.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "chevron-left": {
    "file": "chevron-left.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "chevron-right": {
    "file": "chevron-right.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "chevron-down": {
    "file": "chevron-down.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "chevron-up": {
    "file": "chevron-up.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "arrow-right": {
    "file": "arrow-right.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "plus": {
    "file": "plus.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "close": {
    "file": "close.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "check": {
    "file": "check.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "check-circle": {
    "file": "check-circle.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "loading": {
    "file": "loading.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "sliders": {
    "file": "sliders.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "information-1463-24333": {
    "file": "information-1463-24333.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "clock": {
    "file": "clock.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "badge-star": {
    "file": "badge-star.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "lock": {
    "file": "lock.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "settings": {
    "file": "settings.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "signature-eyes": {
    "file": "signature-eyes.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "heart-1": {
    "file": "heart-1.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "heart-2": {
    "file": "heart-2.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "heart-broken": {
    "file": "heart-broken.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "smile": {
    "file": "smile.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "grin": {
    "file": "grin.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "laugh": {
    "file": "laugh.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "joy-tears": {
    "file": "joy-tears.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "sob": {
    "file": "sob.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "wink": {
    "file": "wink.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "heart-eyes": {
    "file": "heart-eyes.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "star-eyes": {
    "file": "star-eyes.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "surprise": {
    "file": "surprise.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "sad": {
    "file": "sad.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "angry": {
    "file": "angry.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "sweat": {
    "file": "sweat.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "thinking": {
    "file": "thinking.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "sleepy": {
    "file": "sleepy.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "cool": {
    "file": "cool.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "fire": {
    "file": "fire.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "friends": {
    "file": "friends.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "love": {
    "file": "love.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "family": {
    "file": "family.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "school": {
    "file": "school.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "career": {
    "file": "career.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "hall-of-fame": {
    "file": "hall-of-fame.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "thumb-up-outline": {
    "file": "thumb-up-outline.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "comment-outline": {
    "file": "comment-outline.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "x-02": {
    "file": "x-02.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "home-chair-1620-22984": {
    "file": "home-chair-1620-22984.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "microphone-1620-23024": {
    "file": "microphone-1620-23024.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "microphone-off-1620-23034": {
    "file": "microphone-off-1620-23034.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "view-1620-23054": {
    "file": "view-1620-23054.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "thumb-up-1620-23064": {
    "file": "thumb-up-1620-23064.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "thumb-down-1620-23074": {
    "file": "thumb-down-1620-23074.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "sun-1620-23094": {
    "file": "sun-1620-23094.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "pencil-1620-23119": {
    "file": "pencil-1620-23119.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "thumb-up-outline-1620-23139": {
    "file": "thumb-up-outline-1620-23139.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "comment-outline-1620-23159": {
    "file": "comment-outline-1620-23159.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "chevron-left-1620-23175": {
    "file": "chevron-left-1620-23175.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "chevron-down-1620-23195": {
    "file": "chevron-down-1620-23195.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "arrow-right-1620-23215": {
    "file": "arrow-right-1620-23215.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "plus-1620-23225": {
    "file": "plus-1620-23225.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "close-1620-23235": {
    "file": "close-1620-23235.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "check-1620-23245": {
    "file": "check-1620-23245.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "sliders-1620-23275": {
    "file": "sliders-1620-23275.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "information-1620-23285": {
    "file": "information-1620-23285.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "clock-1620-23295": {
    "file": "clock-1620-23295.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "lock-1620-23310": {
    "file": "lock-1620-23310.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "settings-1620-23320": {
    "file": "settings-1620-23320.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "play-circle": {
    "file": "play-circle.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "heart-1-1620-23360": {
    "file": "heart-1-1620-23360.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "laugh-1620-23425": {
    "file": "laugh-1620-23425.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "sob-1620-23455": {
    "file": "sob-1620-23455.svg",
    "w": 32,
    "h": 32,
    "vw": 32,
    "vh": 32,
    "mono": false
  },
  "friends-1620-23917": {
    "file": "friends-1620-23917.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "love-1620-23931": {
    "file": "love-1620-23931.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": true
  },
  "family-1620-23942": {
    "file": "family-1620-23942.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "school-1620-23955": {
    "file": "school-1620-23955.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "career-1620-23969": {
    "file": "career-1620-23969.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  },
  "hall-of-fame-1620-23982": {
    "file": "hall-of-fame-1620-23982.svg",
    "w": 24,
    "h": 24,
    "vw": 24,
    "vh": 24,
    "mono": false
  }
};
export function Icon({
  name,
  color,
  strokeScale,
  style,
  ...rest
}) {
  const g = glyphs[name];
  const raw = g ? files['../assets/icons/' + g.file] : undefined;
  if (!g || !raw) {
    if (import.meta.env.DEV) console.warn('[Icon] 없음', name);
    return null;
  }
  let html = raw.replace(/<svg([^>]*?)\s(width|height)="[^"]*"/, '<svg$1').replace(/<svg([^>]*?)\s(width|height)="[^"]*"/, '<svg$1').replace(/<svg\b/, `<svg data-px="" preserveAspectRatio="none" style="display:block;overflow:visible;max-width:none;width:${g.vw / g.w * 100}%;height:${g.vh / g.h * 100}%"`);
  if (strokeScale && strokeScale !== 1) html = html.replace(/stroke-width="([\d.]+)"/g, (_m, v) => 'stroke-width="' + parseFloat(v) * strokeScale + '"');
  return <span data-icon={name} {...rest} style={{
    display: 'block',
    lineHeight: 0,
    color,
    ...style
  }} dangerouslySetInnerHTML={{
    __html: html
  }} />;
}