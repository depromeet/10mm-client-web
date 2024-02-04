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

export const setMissionTimeStack = (missionId: string, status: 'start' | 'stop' | 'restart') => {
  const time = new Date().getTime();
  const timeInfo = { time, status };

  const prevStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(missionId)) || '[]';
  const prevStackData = JSON.parse(prevStack);

  localStorage.setItem(
    STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(missionId),
    JSON.stringify([...prevStackData, timeInfo]),
  );
};

export const removeProgressMissionData = () => {
  const missionId = getProgressMissionIdToStorage();
  if (!missionId) return;
  localStorage.removeItem(STORAGE_KEY.PROGRESS_MISSION.MISSION);
  localStorage.removeItem(STORAGE_KEY.PROGRESS_MISSION.TIME(missionId));
  localStorage.removeItem(STORAGE_KEY.PROGRESS_MISSION.TIME_2(missionId));
  localStorage.removeItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(missionId));
};

export const setProgressMissionTime = (missionId: string, missionTime: number) => {
  localStorage.setItem(STORAGE_KEY.PROGRESS_MISSION.TIME(missionId), String(missionTime));
};

export const setProgressMissionTime2 = (missionId: string, missionTime: number) => {
  localStorage.setItem(STORAGE_KEY.PROGRESS_MISSION.TIME_2(missionId), String(missionTime));
};

const getProgressMissionTimeToStack = (missionId: string) => {
  const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(missionId)) || '[]';
  const timeStackData = JSON.parse(timeStack);
  let stopTime = 0;

  if (!timeStack || timeStackData.length === 0) return 0;

  for (let i = 1; i < timeStackData.length; i++) {
    const { time: prevStackTime, status: prevStatus } = timeStackData[i - 1];
    const { time: stackTime, status } = timeStackData[i];

    if (prevStatus === 'stop' && status === 'start') {
      stopTime += stackTime - prevStackTime;
    }
    if (prevStatus === 'stop' && status === 'restart') {
      stopTime += stackTime - prevStackTime;
    }
  }

  const currentTime = new Date().getTime();

  if (timeStackData[timeStackData.length - 1].status === 'stop') {
    stopTime += currentTime - timeStackData[timeStackData.length - 1].time;
  }

  const progressTime = currentTime - timeStackData[0].time - stopTime;

  return progressTime;
};

const DEFAULT_MS = 1000;
const timerMs: number = Number(process.env.NEXT_PUBLIC_TIMER_MS ?? DEFAULT_MS);

export const getProgressMissionTime = (missionId: string): number => {
  if (!checkIsProgressMission(missionId)) return 0;
  // const progressTimeString = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME(missionId));

  // TODO : 오늘 날짜에 진행되고 있던 미션인지 확인

  const progressTimeMs = getProgressMissionTimeToStack(missionId);
  const progressTime = Math.floor(progressTimeMs / timerMs);

  if (!progressTime) return 0;

  return progressTime;
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
