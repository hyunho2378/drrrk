// 아이템 상세 시트 글(최종 드르륵 페이지 "토스트 팝업" 섹션 2340:30205, 시트 9장 390 x 393, 2340:30206 ~ 2340:30350).
// 11. 12. 팀이 시트마다 설명 두 줄과 칩 두 개를 새로 썼다. 글은 피그마 글자 그대로 옮긴다(마지막처럼 둘째 줄 앞 칸 띄움 포함).
// 이전(11. 10.)에는 기능 칩("쿨타임 3초", "라이브 전용")과 직접 쓴 설명이었다.
// iOS ios/DRRRK/Features/My/ItemCopy.swift와 글자가 같아야 한다.
import { live as LIVE } from '../tokens.js';

const A = (import.meta.env.BASE_URL || '/') + 'assets/my3/';

// 던지기 쿨타임(초). 방 쪽 값(tokens live.throwCooldownSec)이 생기면 그 값을 쓰고, 없으면 방 퀵슬롯과 같은 3초다.
export const throwCooldownSec = () => (LIVE && Number(LIVE.throwCooldownSec)) || 3;

export const ITEM_COPY = {
  shrimp: { name: '새우깡', img: A + 'item-shrimp.webp', lines: ['바삭, 하나만 먹으려다 어느새 봉지 바닥.', '자꾸 손이 가는 소리에 이야기도 술술 풀린다.'], chips: ['바삭한수다', '손이가요손이가'] },
  soju: { name: '마지막처럼', img: A + 'item-soju.webp', lines: ['한 잔 한 잔, 내일은 없다.', ' 마음속에 담아둔 이야기도 편하게 꺼내보자.'], chips: ['솔직한수다', '한잔해'] },
  peanut: { name: '오징어땅콩', img: A + 'item-peanut.webp', lines: ['고소한 땅콩과 짭짤한 오징어를 한입에.', '봉지를 돌려 나누다 보면 어색함도 사라진다.'], chips: ['고소한수다', '고소짭짤'] },
  nogari: { name: '노가리', img: A + 'item-nogari.webp', lines: ['질겅질겅 씹는 동안 말문도 천천히 풀린다.', '짭조름한 한 점이 새벽 대화를 오래 붙잡아준다.'], chips: ['느긋한수다', '씹고뜯고'] },
  drrra: { name: '드르라', img: A + 'item-drrra.webp', lines: ['톡 쏘는 첫 모금에 대화도 산뜻하게 시작된다.', '잔을 기울이며 오늘의 이야기를 천천히 이어가자.'], chips: ['상쾌한수다', '캬'] },
  squid: { name: '오징어', img: A + 'item-squid.webp', lines: ['몸통부터 다리까지 하나씩 뜯어 먹듯,', '복잡한 이야기도 차근차근 풀어보자.'], chips: ['쫄깃한수다', '찢어먹자'] },
  monster: { name: '몬스타', img: A + 'item-monster.webp', lines: ['톡 쏘는 한 모금에 잠은 달아나고 기운은 번쩍.', '길어진 밤, 대화는 아직 끝나지 않았다.'], chips: ['활기찬수다', '잠이번쩍'] },
  byeollo: { name: '별로', img: A + 'item-byeollo.webp', lines: ['목 넘김은 부드럽게, 기분은 말랑하게.', '천천히 한 잔 기울이며 오늘의 이야기를 나눠보자.'], chips: ['부드러운수다', '꼴꼴꼴'] },
};

// 미획득 시트(2116:28586)는 피그마 그대로: 이름 ???, 설명 ??????(두 줄), 칩 ??? 두 개, 자물쇠.
export const LOCKED_COPY = { name: '???', lines: ['??????', '??????'], chips: ['???', '???'] };

export const itemChips = (key) => (ITEM_COPY[key] && ITEM_COPY[key].chips) || ITEM_COPY.shrimp.chips;

// 이름으로 아이템 키 찾기(나의 편의점 53의 칸 이름표는 이름으로 온다).
export const keyOf = (name) => Object.keys(ITEM_COPY).find((k) => ITEM_COPY[k].name === name) || 'shrimp';
