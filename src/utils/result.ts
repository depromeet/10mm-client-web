import { LEVEL_SYSTEM, type LevelSystemType } from '@/constants/level';

export const getLevel = (symbolStack: number): LevelSystemType => {
  const findLevel = LEVEL_SYSTEM.find((level) => {
    if (symbolStack >= level.min && symbolStack <= level.max) {
      return true;
    }
    return false;
  });

  if (!findLevel) return LEVEL_SYSTEM[0];

  return findLevel;
};

export const calcProgress = (symbolStack: number) => {
  const currentLevel = getLevel(symbolStack);
  return ((symbolStack - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;
};

const MIN_PERCENT = 3;

export const getPercent = (props: { symbolStack: number; max: number; min: number }): number => {
  const { symbolStack, max, min } = props;
  const percent = (100 / (max - min)) * (symbolStack - min);

  return Math.max(percent, MIN_PERCENT);
};
