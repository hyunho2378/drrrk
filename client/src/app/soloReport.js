// 혼자 드르륵 종료 리포트(65, 피그마 새 섹션 "자간줄여" 2337:15695, 옆 장 2337:15583). 탁빛나 11/12 "아침이 밝아오면 리포트 추가", "하단바 따라오게".
// 피그마 혼자 드르륵 줄(영상, 현장 모드, 나, AI의자) 맨 끝 두 장이다. 혼자 방 시계(실제 90초)가 00:00이 되면 이 화면으로 넘어간다(tokens.js live.rooms.C).
// 함께 방 종료(1, 1708 프레임)와 같은 틀에서 아래 둘이 빠진 1092 프레임이다: 제목, 해 그림, Report(00 엉따온도, 02 오늘 나눈 대화, 높이 480), 버튼 묶음(974, 세로 제약 BOTTOM).
// 머리 왼쪽은 뒤로 가기(chevron-left) 대신 닫기(close 24, 선 2, #F8F8F8)다.
// 화면은 종료(1) 생성 화면(Screen1647_26726)을 그대로 그리고, 보이기 전(live.js prepare)에 여기서 빠진 덩어리를 지우고 자리를 옮긴다.
// 버튼 묶음을 창 바닥에 붙이는 일과 스크롤은 종료(1)와 같은 길(reportMotion.js pinEndBar, live.js scrollerOf)을 쓴다.
// 11/12 01:53 huisu "리포트2 수정완"(2337:15695): 프레임 높이가 1094(버튼 묶음 974~1052, 아래 42)로 바뀌었고 오늘 나눈 대화 글이 혼자 방 고민(사진보정) 글로 고정됐다.
// 이야기(story.js)에 따라 글을 바꾸는 종료(1)와 달리 65는 아래 TALK 글 그대로 쓴다(reportPatch.js storyText를 건너뛰게 reportStory 표식을 먼저 단다).
import closeSvg from '../assets/icons/close-1620-23235.svg?raw';
import { setText } from './dom.js';

export const SOLO_REPORT = 65;
// 피그마 1094 프레임 값(2337:15695)
export const SOLO_REPORT_H = 1094;
// 피그마 2337:15695 "02 오늘 나눈 대화" 글(오늘의 고민 옆 줄, 단계 제목 셋, 단계 설명 셋)
const TALK = {
  worry: '둘이 찍은 사진, 자기만 보정한 친구',
  titles: ['고민을 꺼냈어요', '여러 이야기를 나눴어요', '다음 행동을 정했어요'],
  descs: ['"이거 일부러야?"로 이야기가 시작됐어요', '서운한 마음에 공감하며, 지난 일에 대해서도 이야기 했어요', '속상한 마음을 접고, 다음날에 집중하기로 했어요'],
};
const REPORT_H = 480;
const BAR_TOP = 974;
const DROP = ['03 베스트 댓글', '04 대화 상대 추천'];

export function prepSoloReport(root, n) {
  if (n !== SOLO_REPORT || !root || root.dataset.soloReport) return;
  root.dataset.soloReport = '1';
  root.dataset.reportStory = '1';
  const report = root.querySelector(':scope > [data-figma="Report"]');
  if (report) {
    const talk = report.querySelector('[data-figma="02 오늘 나눈 대화"]');
    if (talk) {
      const one = (s) => talk.querySelector('p[data-figma="' + s + '"]');
      const all = (s) => [...talk.querySelectorAll('p[data-figma="' + s + '"]')];
      const w = one('시간 · DRRRK/C1 Medium');
      if (w && w.textContent.trim() !== TALK.worry) setText(w, TALK.worry);
      all('단계 제목 · DRRRK/B1 Bold').forEach((p, i) => { if (TALK.titles[i] && p.textContent.trim() !== TALK.titles[i]) setText(p, TALK.titles[i]); });
      all('단계 설명 · DRRRK/B3 Regular').forEach((p, i) => { if (TALK.descs[i] && p.textContent.trim() !== TALK.descs[i]) setText(p, TALK.descs[i]); });
    }
    [...report.children].forEach((c) => { if (DROP.includes(c.getAttribute('data-figma'))) c.remove(); });
    report.style.height = REPORT_H + 'px';
  }
  // 도움이 된 유저 칸에 붙어 있던 낱개 요소(Report 밖, Report 끝 932보다 아래, 버튼 묶음 제외)도 함께 지운다.
  [...root.children].forEach((c) => {
    const name = c.getAttribute('data-figma');
    if (name === 'Frame 2147249293' || name === 'Report') return;
    const t = parseFloat(c.style.top);
    if (t >= 452 + REPORT_H && t < 1590) c.remove();
  });
  const bar = root.querySelector(':scope > [data-figma="Frame 2147249293"]');
  if (bar) { bar.style.top = BAR_TOP + 'px'; delete bar.dataset.y0; }
  const back = root.querySelector(':scope > [data-figma="chevron-left"]');
  if (back) {
    back.setAttribute('data-figma', 'close');
    back.setAttribute('data-icon', 'close-1620-23235');
    back.style.color = '#F8F8F8';
    back.innerHTML = closeSvg
      .replace(/\s(width|height)="[^"]*"/g, '')
      .replace(/<svg\b/, '<svg data-px="" preserveAspectRatio="none" style="display:block;overflow:visible;max-width:none;width:100%;height:100%"');
  }
}
