// 아이템 상세 시트 글(팀 피그마 "Section 1" 2116:28581, 시트 9장 390 x 393).
// 피그마 시트의 설명 글은 팀원이 임의로 써 둔 글이라(11. 10. 메모 "아이템 설명글 라이팅 수정 필요") 여기서 새로 썼다.
// 줄마다 사실 하나: 첫 줄은 어떤 간식인지, 둘째 줄은 라이브 방에서 던졌을 때 테이블에 올라가는 쓰임이다.
// 칩 두 개는 피그마 프레임 이름("chip 쿨타임 30초", "chip 라이브 전용")대로 기능 칩으로 쓴다.
// iOS ios/DRRRK/Features/My/ItemCopy.swift와 글자가 같아야 한다.
import { live as LIVE } from '../tokens.js';

const A = (import.meta.env.BASE_URL || '/') + 'assets/my3/';

// 던지기 쿨타임(초). 방 쪽 값(tokens live.throwCooldownSec)이 생기면 그 값을 쓰고, 없으면 방 퀵슬롯과 같은 3초다.
export const throwCooldownSec = () => (LIVE && Number(LIVE.throwCooldownSec)) || 3;

export const ITEM_COPY = {
  shrimp: { name: '새우깡', img: A + 'item-shrimp.webp', lines: ['새우 맛이 나는 짭짤하고 바삭한 과자예요.', '라이브 방에서 던지면 테이블 위에 올라가요.'] },
  soju: { name: '마지막처럼', img: A + 'item-soju.webp', lines: ['초록 병에 담긴 부드러운 맛의 소주예요.', '라이브 방에서 던지면 테이블에 병이 놓여요.'] },
  peanut: { name: '오징어땅콩', img: A + 'item-peanut.webp', lines: ['땅콩을 오징어 맛 과자로 감싼 스낵이에요.', '던지면 봉지째 라이브 방 테이블에 올라가요.'] },
  nogari: { name: '노가리', img: A + 'item-nogari.webp', lines: ['어린 명태를 말려 구운 쫄깃한 안주예요.', '라이브 방에서 던지면 테이블에 한 접시 놓여요.'] },
  drrra: { name: '드르라', img: A + 'item-drrra.webp', lines: ['톡 쏘는 탄산이 시원한 초록 캔 맥주예요.', '라이브 방에서 던지면 테이블에 캔이 올라가요.'] },
  squid: { name: '오징어', img: A + 'item-squid.webp', lines: ['통째로 말려 찢어 먹는 오징어 안주예요.', '라이브 방에서 던지면 테이블에 봉지가 놓여요.'] },
  monster: { name: '몬스타', img: A + 'item-monster.webp', lines: ['잠을 깨워 주는 카페인 에너지 음료예요.', '라이브 방에서 던지면 테이블에 캔이 놓여요.'] },
  byeollo: { name: '별로', img: A + 'item-byeollo.webp', lines: ['투명한 병에 담긴 깔끔한 맛의 소주예요.', '라이브 방에서 던지면 테이블에 병이 올라가요.'] },
};

// 미획득 시트(2116:28586)는 피그마 그대로: 이름 ???, 설명 ??????(두 줄), 칩 ??? 두 개, 자물쇠.
export const LOCKED_COPY = { name: '???', lines: ['??????', '??????'], chips: ['???', '???'] };

export const itemChips = () => ['쿨타임 ' + throwCooldownSec() + '초', '라이브 전용'];

// 이름으로 아이템 키 찾기(나의 편의점 53의 칸 이름표는 이름으로 온다).
export const keyOf = (name) => Object.keys(ITEM_COPY).find((k) => ITEM_COPY[k].name === name) || 'shrimp';
