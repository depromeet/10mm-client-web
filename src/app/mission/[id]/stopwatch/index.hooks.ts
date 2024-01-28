import { useCallback, useEffect } from 'react';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import useInterval from '@/hooks/useInterval';
import { eventLogger } from '@/utils';
import { setProgressMissionTime, setProgressMissionTime2 } from '@/utils/storage/progressMission';

export function useUnloadAction(time: number, missionId: string) {
  const onSaveTime = useCallback(() => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.MID_SAVE, EVENT_LOG_CATEGORY.STOPWATCH, { time });
    setProgressMissionTime(missionId, time);
  }, [time]);

  useVisibilityState(onSaveTime);
}

function useVisibilityState(onAction: VoidFunction) {
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      onAction();
    }
  }, [onAction]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onVisibilityChange]); // 빈 의존성 배열을 전달하여 이 훅이 컴포넌트가 마운트되거나 언마운트될 때만 실행되도록 합니다.
}

export function useRecordMidTime(time: number, missionId: string) {
  const onSaveTime = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.MID_SAVE_2, EVENT_LOG_CATEGORY.STOPWATCH, { time });

    setProgressMissionTime2(missionId, time);
  };

  useInterval(() => {
    onSaveTime();
  }, 10000);
}

export function useCustomBack(customBack: () => void) {
  const browserPreventEvent = (event: () => void) => {
    event();
  };

  useEffect(() => {
    const backAction = () => browserPreventEvent(customBack);

    history.pushState({}, '', location.href);
    window.addEventListener('popstate', backAction);
    return () => {
      window.removeEventListener('popstate', backAction);
    };
  }, []);
}
