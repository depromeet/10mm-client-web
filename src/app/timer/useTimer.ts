import { useEffect, useState } from 'react';
import { type StepType } from '@/app/timer/useStep';

export default function useTimer(status: StepType, initSeconds = 600) {
  const [second, setSecond] = useState(initSeconds); // 남은 시간 (단위: 초)

  const formattedTime = formatMMSS(second);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === 'progress') {
      timer = setInterval(() => {
        setSecond((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [second, status]);

  return { formattedTime };
}

const formatMMSS = (second: number): [string, string] => {
  const minutes = Math.floor(second / 60); // 분 계산
  const seconds = second % 60; // 초 계산
  const formattedMinutes = String(minutes).padStart(2, '0'); // 두 자리로 변환
  const formattedSeconds = String(seconds).padStart(2, '0'); // 두 자리로 변환

  return [formattedMinutes, formattedSeconds];
};
