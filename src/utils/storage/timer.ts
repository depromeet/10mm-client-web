import { STORAGE_KEY } from '@/constants/storage';

export const resetStopwatchStorage = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY.STOPWATCH.MISSION_ID);
  localStorage.removeItem(STORAGE_KEY.STOPWATCH.TIME);
  localStorage.removeItem(STORAGE_KEY.STOPWATCH.TIME_2);
  localStorage.removeItem(STORAGE_KEY.STOPWATCH.START_TIME);
};

// 진행중 미션 체크
export const checkMissionProgressing = () => {
  const startedMissionId = localStorage.getItem(STORAGE_KEY.STOPWATCH.MISSION_ID);

  return Boolean(startedMissionId);
};
