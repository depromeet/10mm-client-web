import { STORAGE_KEY } from '@/constants/storage';

export const startMission = (missionId: string) => {
  const startTime = new Date().toISOString();
  const missionInfo = { missionId, startTime };
  localStorage.setItem(STORAGE_KEY.PROGRESS_MISSION.MISSION, JSON.stringify(missionInfo));
};

export const removeProgressMissionData = () => {
  const missionId = getProgressMissionIdToStorage();
  if (!missionId) return;
  localStorage.removeItem(STORAGE_KEY.PROGRESS_MISSION.MISSION);
  localStorage.removeItem(STORAGE_KEY.PROGRESS_MISSION.TIME(missionId));
  localStorage.removeItem(STORAGE_KEY.PROGRESS_MISSION.TIME_2(missionId));
};

export const setProgressMissionTime = (missionId: string, missionTime: number) => {
  localStorage.setItem(STORAGE_KEY.PROGRESS_MISSION.TIME(missionId), String(missionTime));
};

export const setProgressMissionTime2 = (missionId: string, missionTime: number) => {
  localStorage.setItem(STORAGE_KEY.PROGRESS_MISSION.TIME_2(missionId), String(missionTime));
};

export const getProgressMissionTime = (missionId: string): number => {
  if (checkIsProgressMission(missionId)) return 0;
  const progressTimeString = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME(missionId));
  if (!Number(progressTimeString)) return 0;

  return Number(progressTimeString);
};

const checkIsProgressMission = (missionId: string) => {
  const progressMissionId = getProgressMissionIdToStorage();
  if (!progressMissionId) return false; // 진행중이던 미션이 없음
  if (progressMissionId !== missionId) {
    // 진행중인 미션과, 현재 미션이 다름
    return false;
  }
  return true;
};

const getProgressMissionIdToStorage = () => {
  const progressMissionData = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.MISSION);
  if (!progressMissionData) return false;
  const { missionId } = JSON.parse(progressMissionData);
  return missionId;
};
