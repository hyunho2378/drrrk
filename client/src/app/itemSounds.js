// 팀이 녹음해 보낸 소리 파일(mp3)과 앱 아이템의 짝을 한 곳에 모은다(11. 10. 조의정 피드백 "주전부리 올렸을때 소리 반영", 피그마 댓글 "소리 코드에 넣기 필요").
// 파일은 client/public/assets/sfx/ 에 ASCII 이름으로 복사해 두었다. iOS는 ios/DRRRK/Resources/Sounds/ 에 같은 이름으로 있다(SoundFiles.swift의 SoundFiles와 같은 표).
// 11. 10. 밤 팀 요청(조의정 "건어물을 노가리와 오징어로 통일, 과자를 새우깡하고 오징어땅콩, 캔을 맥주랑 몬스타, 소주를 소주종류 2개")으로 주전부리 효과음 원본 4종을 두 아이템씩 함께 쓴다.
// 원본 이름: 주전부리 효과음 건어물(snack-dried, 노가리와 오징어), 과자(snack-chips, 새우깡과 오징어땅콩), 캔(snack-can, 드르라와 몬스타), 소주(snack-soju, 마지막처럼과 별로),
// 대사 녹음 무슨 일이 있었냐면.mp3, 나만예민한거아니지.mp3.
import { ITEM_COPY } from './itemCopy.js';

const B = (import.meta.env.BASE_URL || '/') + 'assets/sfx/';

// 키는 itemCopy.js의 아이템 키다. voice로 시작하는 키는 방 대사 녹음이다(roomVoice.js).
export const SOUND_FILES = {
  shrimp: B + 'snack-chips.mp3',
  peanut: B + 'snack-chips.mp3',
  nogari: B + 'snack-dried.mp3',
  squid: B + 'snack-dried.mp3',
  drrra: B + 'snack-can.mp3',
  monster: B + 'snack-can.mp3',
  soju: B + 'snack-soju.mp3',
  byeollo: B + 'snack-soju.mp3',
  voiceMuseun: B + 'voice-museun-il.mp3',
  voiceNaman: B + 'voice-naman-yemin.mp3',
};

// 서로 다른 파일마다 한 아이템씩(미리 받기용). 같은 파일은 한 번만 받는다.
export const UNIQUE_SOUND_KEYS = ['nogari', 'shrimp', 'drrra', 'soju'];

// 함께 드르륵 퀵슬롯 칸 이름(data-figma 값의 "slot" 뒤 이름)과 아이템 키. 소주 칸은 마지막처럼, DRRRA 칸은 드르라다.
export const SLOT_ITEM = { 새우깡: 'shrimp', 소주: 'soju', 오징어땅콩: 'peanut', 노가리: 'nogari', DRRRA: 'drrra', 오징어: 'squid', 몬스타: 'monster' };

// 한글 마지막 글자에 받침이 있으면 true(가에서 힣 사이 글자만 본다). iOS SoundFiles.swift hasFinalConsonant와 같은 계산이다.
export function hasFinalConsonant(word) {
  const s = String(word || '').trim();
  if (!s) return false;
  const c = s.charCodeAt(s.length - 1);
  if (c < 0xac00 || c > 0xd7a3) return false;
  return (c - 0xac00) % 28 !== 0;
}
// 목적격 조사: 받침이 있으면 을, 없으면 를.
export const withObject = (word) => word + (hasFinalConsonant(word) ? '을' : '를');

// 던진 뒤 안내 글. 예전 글 "주전부리를 테이블에 올렸어요"의 "주전부리"를 마이 아이템 이름으로 바꾼다.
export function throwDoneText(slotName) {
  const key = SLOT_ITEM[slotName];
  const name = key && ITEM_COPY[key] ? ITEM_COPY[key].name : '주전부리';
  return withObject(name) + ' 테이블에 올렸어요';
}
