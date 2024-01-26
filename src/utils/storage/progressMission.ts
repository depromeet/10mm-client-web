import { STORAGE_KEY } from '@/constants/storage';

interface MissionData {
  missionId: string;
  startTime: string;
}

export const setMissionData = (missionId: string) => {
  const startTime = new Date().toISOString();
  const missionInfo: MissionData = { missionId, startTime };
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
  if (!checkIsProgressMission(missionId)) return 0;
  const progressTimeString = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME(missionId));
  if (!Number(progressTimeString)) return 0;

  return Number(progressTimeString);
};

export const checkIsExistProgressMission = (missionId: string) => {
  const progressMissionId = getProgressMissionIdToStorage();
  if (!progressMissionId) return false;
  if (progressMissionId !== missionId) {
    // 진행중인 미션과, 현재 미션이 다름
    return true;
  }
  return false;
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

const getProgressMissionToStorage = (): MissionData | false => {
  const progressMissionData = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.MISSION);
  if (!progressMissionData) return false;
  return JSON.parse(progressMissionData);
};

export const getProgressMissionIdToStorage = () => {
  const data = getProgressMissionToStorage();
  if (!data || !data.missionId) return false;
  return data.missionId;
};

export const getProgressMissionStartTimeToStorage = (missionId: string): string | false => {
  if (checkIsProgressMission(missionId)) {
    const data = getProgressMissionToStorage();
    if (!data || !data.startTime) return false;
    return data.startTime;
  }
  return false;
};

// 현재 미션과 저장되어있는 미션이 다른경우 삭제
export const checkPrevProgressMission = (missionId: string) => {
  if (checkIsExistProgressMission(missionId)) {
    removeProgressMissionData();
    return;
  }
};
