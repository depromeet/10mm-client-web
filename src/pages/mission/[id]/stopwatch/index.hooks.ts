import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecordTime } from '@/apis';
import { isSeverError } from '@/apis/instance.api';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import useInterval from '@/hooks/useInterval';
import { eventLogger } from '@/utils';
import {
  getProgressMissionStartTimeToStorage,
  removeProgressMissionData,
  setProgressMissionTime,
  setProgressMissionTime2,
} from '@/utils/storage/progressMission';
import { formatDate, formatMMSS } from '@/utils/time';

export function useUnloadAction(time: number, missionId: string) {
  const onSaveTime = useCallback(() => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.MID_SAVE, EVENT_LOG_CATEGORY.STOPWATCH, { time });
    setProgressMissionTime(missionId, time);
  }, [time]);

  useVisibilityStateHidden(onSaveTime);
}

function useVisibilityStateHidden(onAction: VoidFunction) {
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

// visible 상태로 바뀔 때 실행되는 훅
export function useVisibilityStateVisible(onAction: VoidFunction) {
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
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

/**
 * 미션 임시 인증 (타이머 시간 서버에 저장)
 * @param missionId
 * @param second 타이머 종료 시간
 * @returns {isSubmitLoading, onSubmit} - isSubmitLoading: 제출 중인지 여부, onSubmit: 제출 함수
 */
export const useSubmit = ({ missionId, second }: { missionId: string; second: number }) => {
  const router = useRouter();

  const { formattedMinutes, formattedSeconds } = formatMMSS(second);

  const { mutate, isPending: isSubmitLoading } = useRecordTime({
    onSuccess: (response) => {
      const missionRecordId = String(response.missionId);
      router.replace(ROUTER.RECORD.CREATE(missionRecordId));
      eventLogger.logEvent('api/record-time', 'stopwatch', { missionRecordId });
      removeProgressMissionData();
    },
    onError: (error) => {
      if (isSeverError(error)) {
        if (error.response.data.data.errorClassName === 'MISSION_RECORD_ALREADY_EXISTS_TODAY') {
          removeProgressMissionData();
          router.replace(ROUTER.HOME);
        }
      }
    },
  });

  const onSubmit = useCallback(async () => {
    const startTimeString = getProgressMissionStartTimeToStorage(missionId);
    if (!startTimeString) return;

    const startTime = new Date(startTimeString);
    const startTimeFormatted = formatDate(startTime);
    const finishTimeFormatted = formatDate(new Date());

    mutate({
      missionId: missionId,
      startedAt: startTimeFormatted,
      finishedAt: finishTimeFormatted,
      durationMin: Number(formattedMinutes),
      durationSec: Number(formattedSeconds),
    });
  }, [formattedMinutes, formattedSeconds, missionId, mutate]);

  return {
    isSubmitLoading,
    onSubmit,
  };
};
