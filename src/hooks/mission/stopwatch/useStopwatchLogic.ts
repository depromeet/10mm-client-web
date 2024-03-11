import { useEffect, useState } from 'react';
import { type StepType } from '@/hooks/mission/stopwatch/useStopwatchStatus';

const INIT_SECONDS = 0;
const MAX_SECONDS = 3600; // max 1 hour

const DEFAULT_MS = 1000;
const timerMs: number = Number(process.env.NEXT_PUBLIC_TIMER_MS ?? DEFAULT_MS);

interface UseStopwatchProps {
  status: StepType;
}

function useStopwatchLogic({ status }: UseStopwatchProps) {
  const [second, setSecond] = useState(0); // 남은 시간 (단위: 초)
  const [isFinished, setIsFinished] = useState(false);

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
        // second === 10 * 60 && recordTenMinuteEvent(missionId);
      }, timerMs);
    }

    return () => clearInterval(timer);
  }, [second, status]);

  return { isFinished, second, setSecond };
}

export default useStopwatchLogic;

// const recordTenMinuteEvent = (missionId: string) => {
//   eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.COMPLETE_TEM_MINUTE, EVENT_LOG_CATEGORY.STOPWATCH, {
//     missionId,
//   });
// };
