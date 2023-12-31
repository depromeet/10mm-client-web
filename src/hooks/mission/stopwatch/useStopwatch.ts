import { useEffect, useState } from 'react';
import { formatMMSS } from '@/utils/time';

import { type StepType } from './useStopwatchStatus';

const INIT_SECONDS = 0;
const MAX_SECONDS = 60 * 60; // max 1 hour

const DEFAULT_MS = 1000;
const TEST_MS = 1;

// 좀 더 의미론적.... useStopwatch
export default function useStopwatch(status: StepType) {
  const [second, setSecond] = useState(INIT_SECONDS); // 남은 시간 (단위: 초)
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
        setSecond((prev) => prev + 1);
      }, TEST_MS);
    }

    return () => clearInterval(timer);
  }, [second, status]);

  return { minutes: formattedMinutes, seconds: formattedSeconds, stepper, isFinished };
}
