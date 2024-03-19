import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { STORAGE_KEY } from '@/constants/storage';
import { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { eventLogger } from '@/utils';

interface MissionData {
  missionId: string;
  startTime: string;
}

// 미션을 "처음" 시작할 때 미션 데이터 (시작 시간, mission ID)를 storage에 저장
export const setMissionData = (missionId: string) => {
  const startTime = new Date().toISOString();
  const missionInfo: MissionData = { missionId, startTime };
  localStorage.setItem(STORAGE_KEY.PROGRESS_MISSION.MISSION, JSON.stringify(missionInfo));
};

// 미션 진행 상태 storage에 저장
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

// 미션 진행 상태 storage에서 삭제
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

  if (!checkTodayMission(missionId)) return 0;

  const progressTimeMs = getProgressMissionTimeToStack(missionId);
  const progressTime = Math.floor(progressTimeMs / timerMs);

  if (!progressTime) return 0;

  if (progressTime >= 10 * 60) {
    recordTenMinuteEvent(missionId);
  }

  return progressTime;
};

export const getPrevProgressMissionStatus = (missionId: string): StopwatchStep | undefined => {
  const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(missionId)) || '[]';
  const timeStackData = JSON.parse(timeStack);

  if (!timeStackData || timeStackData.length === 0) return StopwatchStep.ready;
  const status = timeStackData[timeStackData.length - 1].status;

  if (status === 'restart') return StopwatchStep.progress;
  if (status === 'stop') return StopwatchStep.stop;

  return StopwatchStep.progress;
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

//  오늘 날짜에 진행되고 있던 미션인지 확인
// return : true - 오늘 날짜에 진행되고 있던 미션 데이터, false - 오늘 날짜에 진행되고 있던 미션 데이터가 아니거나 없음
const checkTodayMission = (missionId: string) => {
  const mission = getProgressMissionStartTimeToStorage(missionId);
  if (!mission) return false;
  const missionDate = new Date(mission).getDate();
  const currentDate = new Date().getDate();

  if (missionDate === currentDate) return true;

  // 오늘 날짜에 진행되고 있던 미션 데이터가 아님 -> 삭제
  removeProgressMissionData();
  return false;
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

const recordTenMinuteEvent = (missionId: string) => {
  eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.COMPLETE_TEM_MINUTE, EVENT_LOG_CATEGORY.STOPWATCH, {
    missionId,
  });
};
