const DIFFICULTY_KO: Record<string, string> = {
  VERY_EASY: '매우쉬움',
  EASY: '쉬움',
  NORMAL: '보통',
  HARD: '어려움',
};

const AIR_PURIFICATION_KO: Record<string, string> = {
  NORMAL: '보통',
  HIGH: '높음',
  VERY_HIGH: '아주높음',
};

export const toDifficultyShort = (value: string): string =>
  DIFFICULTY_KO[value] ?? value;

export const toDifficultyLabel = (value: string): string =>
  DIFFICULTY_KO[value] ? `관리${DIFFICULTY_KO[value]}` : value;

export const toAirPurificationLabel = (value: string): string =>
  AIR_PURIFICATION_KO[value] ?? value;
