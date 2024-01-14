import { useEffect, useState } from 'react';
import { STORAGE_KEY } from '@/constants/storage';
import { formatMMSS } from '@/utils/time';

import { type StepType } from './useStopwatchStatus';

const INIT_SECONDS = 0;
const MAX_SECONDS = 60 * 60; // max 1 hour

const DEFAULT_MS = 1000;
const TEST_MS = 100;

export default function useStopwatch(status: StepType) {
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
      }, TEST_MS);
    }

    return () => clearInterval(timer);
  }, [second, status]);

  useEffect(() => {
    // init time setting
    const initSecondString = localStorage.getItem(STORAGE_KEY.STOPWATCH.TIME);
    const initSeconds = Number(initSecondString);
    if (initSeconds && initSeconds < MAX_SECONDS) {
      setSecond(initSeconds);
    }
    setIsPending(false);
  }, []);

  return { minutes: formattedMinutes, seconds: formattedSeconds, stepper, isFinished, isPending };
}
