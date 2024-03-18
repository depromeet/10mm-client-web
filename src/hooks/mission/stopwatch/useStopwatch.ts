import { useEffect, useState } from 'react';
import { useVisibilityStateVisible } from '@/app/mission/[id]/stopwatch/index.hooks';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { eventLogger } from '@/utils';
import { getPrevProgressMissionStatus, getProgressMissionTime } from '@/utils/storage/progressMission';
import { formatMMSS } from '@/utils/time';

import { type StepType } from './useStopwatchStatus';

const INIT_SECONDS = 0;
const MAX_SECONDS = 3600; // max 1 hour

const DEFAULT_MS = 1000;
const timerMs: number = Number(process.env.NEXT_PUBLIC_TIMER_MS ?? DEFAULT_MS);

export default function useStopwatch(status: StepType, missionId: string, onNextStep?: (step: StepType) => void) {
  const [second, setSecond] = useState(INIT_SECONDS); // 남은 시간 (단위: 초)
  const [isPending, setIsPending] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const { formattedMinutes, formattedSeconds } = formatMMSS(second);

  const stepper = second < 60 ? 0 : Math.floor(second / 60 / 10);

  useEffect(() => {
    if (second >= MAX_SECONDS) {
      setIsFinished(true);
      return;
    }
    if (status === 'ready') return;

    let timer: NodeJS.Timeout;

    if (status === 'progress') {
      timer = setInterval(() => {
        setSecond((prev) => (prev >= MAX_SECONDS ? prev : prev + 1));

        // 10분 넘으면 이벤트 기록
        second === 10 * 60 && recordTenMinuteEvent(missionId);
      }, timerMs);
    }

    return () => clearInterval(timer);
  }, [second, status]);

  /**
   * @description 진행되고 있던 미션 시간 데이터를 세팅합니다.
   * @param {string} currentMissionId 현재 미션 아이디
   */
  const settingInitTime = (currentMissionId: string): void => {
    const initSeconds = getProgressMissionTime(currentMissionId);

    if (initSeconds >= MAX_SECONDS) {
      setSecond(MAX_SECONDS);
    } else {
      setSecond(initSeconds);
    }
  };

  // 화면 visible 상태로 변경 시, 시간을 다시 세팅
  useVisibilityStateVisible(() => {
    setIsPending(true);
    settingInitTime(missionId);
    setIsPending(false);
  });

  useEffect(() => {
    // 진행되고 있던 미션이 있는지 확인합니다.
    const flag = checkIsExistProgressMission(missionId);
    if (!flag) {
      setIsPending(false);
      return;
    }

    // 진행되고 있던 미션이 있는 경우, 시간을 세팅합니다.
    settingInitTime(missionId);

    // 이전 상태가 있을 경우, 이전 상태로 이동합니다.
    const prevStatus = getPrevProgressMissionStatus(missionId);
    prevStatus && onNextStep?.(prevStatus);

    setIsPending(false);
  }, [missionId]);

  return { minutes: formattedMinutes, seconds: formattedSeconds, stepper, isFinished, isPending };
}

const recordTenMinuteEvent = (missionId: string) => {
  eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.COMPLETE_TEM_MINUTE, EVENT_LOG_CATEGORY.STOPWATCH, {
    missionId,
  });
};

/**
 * @description 진행되고 있던 미션이 있는지 확인합니다.
 * @param missionId 미션 아이디
 * @returns {boolean} 진행되고 있던 미션이 있는지 여부
 */
const checkIsExistProgressMission = (missionId: string) => {
  return Boolean(getProgressMissionTime(missionId));
};
