import { useEffect, useState } from 'react';
import { type StepType } from '@/app/mission/[id]/stopwatch/useStopwatchStatus';

const INIT_SECONDS = 0;
const MAX_SECONDS = 60 * 60; // max 1 hour

const DEFAULT_MS = 1000;
const TEST_MS = 10;

// 좀 더 의미론적.... useStopwatch
export default function useStopwatch(status: StepType) {
  const [second, setSecond] = useState(INIT_SECONDS); // 남은 시간 (단위: 초)

  const { formattedMinutes, formattedSeconds } = formatMMSS(second);

  const stepper = second < 60 ? 0 : Math.floor(second / 60 / 10);

  useEffect(() => {
    if (second > MAX_SECONDS) return;
    if (status === 'ready') return;

    let timer: NodeJS.Timeout;

    if (status === 'progress') {
      timer = setInterval(() => {
        setSecond((prev) => prev + 1);
      }, TEST_MS);
    }

    return () => clearInterval(timer);
  }, [second, status]);

  return { minutes: formattedMinutes, seconds: formattedSeconds, stepper };
}

const formatMMSS = (second: number) => {
  const minutes = Math.floor(second / 60); // 분 계산
  const seconds = second % 60; // 초 계산
  const formattedMinutes = String(minutes).padStart(2, '0'); // 두 자리로 변환
  const formattedSeconds = String(seconds).padStart(2, '0'); // 두 자리로 변환

  return {
    minutes,
    seconds,
    formattedMinutes,
    formattedSeconds,
  };
};
