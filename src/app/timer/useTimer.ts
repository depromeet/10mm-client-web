import { useEffect, useState } from 'react';
import { type StepType } from '@/app/timer/useTimerStatus';

// 좀 더 의미론적.... useStopwatch
export default function useStopwatch(status: StepType, initSeconds = 600) {
  const [second, setSecond] = useState(initSeconds); // 남은 시간 (단위: 초)

  const { minutes, seconds } = getMMSS(second);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (second <= 0) {
      return;
    }

    if (status === 'progress') {
      timer = setInterval(() => {
        setSecond((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [second, status]);

  return { minutes, seconds };
}

const getMMSS = (second: number) => {
  const minutes = Math.floor(second / 60); // 분 계산
  const seconds = second % 60; // 초 계산

  return {
    minutes,
    seconds,
  };
};

// const formatMMSS = (second: number): [string, string] => {
//   const minutes = Math.floor(second / 60); // 분 계산
//   const seconds = second % 60; // 초 계산
//   const formattedMinutes = String(minutes).padStart(2, '0'); // 두 자리로 변환
//   const formattedSeconds = String(seconds).padStart(2, '0'); // 두 자리로 변환

//   return [formattedMinutes, formattedSeconds];
// };
