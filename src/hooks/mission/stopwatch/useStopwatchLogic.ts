import { useEffect, useState } from 'react';
import { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';

const INIT_SECONDS = 0;
const MAX_SECONDS = 3600; // max 1 hour

const DEFAULT_MS = 1000;
const timerMs: number = Number(process.env.NEXT_PUBLIC_TIMER_MS ?? DEFAULT_MS);

interface UseStopwatchProps {
  status: StopwatchStep;
}

function useStopwatchLogic({ status }: UseStopwatchProps) {
  const [second, setSecond] = useState(0); // 남은 시간 (단위: 초)
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (second >= MAX_SECONDS) {
      setIsFinished(true);
      return;
    }
    if (status === StopwatchStep.ready) return;

    let timer: NodeJS.Timeout;

    if (status === StopwatchStep.progress) {
      timer = setInterval(() => {
        setSecond((prev) => (prev >= MAX_SECONDS ? prev : prev + 1));
      }, timerMs);
    }

    return () => clearInterval(timer);
  }, [second, status]);

  return { isFinished, second, setSecond };
}

export default useStopwatchLogic;
