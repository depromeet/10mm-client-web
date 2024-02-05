import { useEffect, useState } from 'react';
import { useVisibilityStateVisible } from '@/app/mission/[id]/stopwatch/index.hooks';
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
      }, timerMs);
    }

    return () => clearInterval(timer);
  }, [second, status]);

  // init time setting 분리
  const settingInitTime = () => {
    const initSeconds = getProgressMissionTime(missionId);

    if (!initSeconds) return false;
    if (initSeconds >= MAX_SECONDS) {
      setSecond(MAX_SECONDS);
    } else {
      setSecond(initSeconds);
    }
    return true;
  };

  // 화면 visible 상태로 변경 시, 시간을 다시 세팅
  useVisibilityStateVisible(() => {
    setIsPending(true);
    settingInitTime();
    setIsPending(false);
  });

  useEffect(() => {
    // 해당 미션을 이어 가는 경우. init time setting
    const flag = settingInitTime();
    setIsPending(false);
    if (!flag) return;

    const prevStatus = getPrevProgressMissionStatus(missionId);
    prevStatus && onNextStep?.(prevStatus); // 바로 재시작
  }, []);

  return { minutes: formattedMinutes, seconds: formattedSeconds, stepper, isFinished, isPending };
}
