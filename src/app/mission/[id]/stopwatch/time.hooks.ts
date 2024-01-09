import { useEffect } from 'react';
import { STORAGE_KEY } from '@/constants/storage';
import useInterval from '@/hooks/useInterval';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { eventLogger } from '@/utils';

export const useGetCategory = () => {
  const { searchParams } = useSearchParamsTypedValue<string>('category');

  return searchParams ?? '운동';
};

export function useUnloadAction(time: number) {
  const onSaveTime = () => {
    eventLogger.logEvent('mid-save', 'stopwatch', { time });
    localStorage.setItem(STORAGE_KEY.STOPWATCH.TIME, String(time));
  };

  useVisibilityState(onSaveTime);
}

function useVisibilityState(onAction: VoidFunction) {
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        onAction();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []); // 빈 의존성 배열을 전달하여 이 훅이 컴포넌트가 마운트되거나 언마운트될 때만 실행되도록 합니다.
}

export function useRecordMidTime(time: number) {
  const onSaveTime = () => {
    eventLogger.logEvent('mid-save-2', 'stopwatch', { time });
    localStorage.setItem(STORAGE_KEY.STOPWATCH.TIME_2, String(time));
  };

  // 카운터 속도 증가
  useInterval(() => {
    onSaveTime();
  }, 10000);
}
