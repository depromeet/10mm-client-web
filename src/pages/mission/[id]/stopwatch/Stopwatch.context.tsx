'use client';

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Loading from '@/components/Loading';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import useStopwatchSeconds from '@/hooks/mission/stopwatch/useStopwatchLogic';
import useStopwatchStatus, { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { eventLogger } from '@/utils';
import { getPrevProgressMissionStatus, getProgressMissionTime } from '@/utils/storage/progressMission';
import { formatMMSS } from '@/utils/time';

import { useSubmit, useVisibilityStateVisible } from './index.hooks';
import { useMissionTimerSync } from './missionTimerSync';
import ModalContextProvider from './Modal.context';

interface TimeContextProps {
  minutes: string;
  seconds: string;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
}

const StopwatchTimeContext = createContext<TimeContextProps>({
  minutes: '00',
  seconds: '00',
  setTime: () => {},
  time: 0,
});

interface StepContextProps {
  step: StopwatchStep;
  prevStep: StopwatchStep;
  onNextStep: (nextStep: StopwatchStep) => void;
}

export const StopwatchStepContext = createContext<StepContextProps>({
  step: StopwatchStep.ready,
  prevStep: StopwatchStep.ready,
  onNextStep: () => {},
});

interface SyncContextProps {
  /** Storage restoration is still in flight, so the stopwatch is not startable yet. */
  isStopwatchPending: boolean;
  /** Tears down the Live Activity. Only call after an irreversible user action. */
  endMissionTimer: () => void;
}

const StopwatchSyncContext = createContext<SyncContextProps>({
  isStopwatchPending: true,
  endMissionTimer: () => {},
});

const MAX_SECONDS = 3600; // max 1 hour

function StopwatchProvider({
  children,
  missionId,
  missionName,
}: PropsWithChildren<{
  missionId: string;
  missionName: string;
}>) {
  const stepValue = useStopwatchStatus();
  const { second, setSecond, isFinished } = useStopwatchSeconds({ status: stepValue.step });
  const { formattedMinutes, formattedSeconds } = formatMMSS(second);

  // Restoration lives in the provider rather than in a visual component: the
  // Live Activity must never be synchronized from a not-yet-restored elapsed
  // time, and the provider is what owns both step and elapsed state.
  const { isStopwatchPending, visibleToken } = useInitTimeSetting({
    missionId,
    setSecond,
    onNextStep: stepValue.onNextStep,
  });

  const { resync, endMissionTimer } = useMissionTimerSync({
    missionId,
    missionName,
    step: stepValue.step,
    second,
    isRestored: !isStopwatchPending,
  });

  useEffect(() => {
    // The activity may have drifted while the app was backgrounded.
    if (visibleToken > 0) {
      resync();
    }
  }, [visibleToken, resync]);

  const { isSubmitLoading, onSubmit } = useSubmit({ missionId, second, onRecordSuccess: endMissionTimer });

  const timeValue = {
    minutes: formattedMinutes,
    seconds: formattedSeconds,
    setTime: setSecond,
    time: second,
  };

  const syncValue = { isStopwatchPending, endMissionTimer };

  const onAutoFinish = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_AUTO_FINISH, EVENT_LOG_CATEGORY.STOPWATCH, {
      finishTime: second,
    });
    onSubmit();
  };

  useEffect(() => {
    if (isFinished) {
      onAutoFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    // 10분 넘으면 이벤트 기록
    if (Number(formattedMinutes) === 10) {
      const recordTenMinuteEvent = () => {
        eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.COMPLETE_TEM_MINUTE, EVENT_LOG_CATEGORY.STOPWATCH, {
          missionId,
        });
      };
      recordTenMinuteEvent();
    }
  }, [formattedMinutes, missionId]);

  return (
    <>
      <StopwatchStepContext.Provider value={stepValue}>
        <StopwatchTimeContext.Provider value={timeValue}>
          <StopwatchSyncContext.Provider value={syncValue}>
            <ModalContextProvider missionId={missionId}>{children}</ModalContextProvider>
          </StopwatchSyncContext.Provider>
        </StopwatchTimeContext.Provider>
      </StopwatchStepContext.Provider>
      {isSubmitLoading && <Loading />}
    </>
  );
}

export default StopwatchProvider;

const useInitTimeSetting = ({
  missionId,
  setSecond,
  onNextStep,
}: {
  missionId: string;
  setSecond: Dispatch<SetStateAction<number>>;
  onNextStep: (nextStep: StopwatchStep) => void;
}) => {
  const [isStopwatchPending, setIsStopwatchPending] = useState(true);
  // Bumped on every foreground restore so the provider can force a resync.
  const [visibleToken, setVisibleToken] = useState(0);

  const settingInitTime = () => {
    const initSeconds = getProgressMissionTime(missionId);

    if (!initSeconds) return false;
    if (initSeconds >= MAX_SECONDS) {
      setSecond(MAX_SECONDS);
    } else {
      setSecond(initSeconds);
    }
    return true;
  };

  // 화면 visible 상태로 변경 시, 시간을 다시 세팅
  useVisibilityStateVisible(() => {
    setIsStopwatchPending(true);
    settingInitTime();
    setIsStopwatchPending(false);
    setVisibleToken((token) => token + 1);
  });

  useEffect(() => {
    // 해당 미션을 이어 가는 경우. init time setting
    const isSettingInit = settingInitTime();
    setIsStopwatchPending(false);
    if (!isSettingInit) return;

    const prevStatus = getPrevProgressMissionStatus(missionId);
    prevStatus && onNextStep?.(prevStatus); // 바로 재시작
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isStopwatchPending, visibleToken };
};

export const useStopwatchTimeContext = () => {
  const context = useContext(StopwatchTimeContext);
  if (!context) {
    throw new Error('useStopwatchTimeContext must be used within a StopwatchProvider');
  }
  return context;
};

export const useStopwatchStepContext = () => {
  const context = useContext(StopwatchStepContext);
  if (!context) {
    throw new Error('useStopwatchStepContext must be used within a StopwatchProvider');
  }

  return context;
};

export const useStopwatchSyncContext = () => {
  const context = useContext(StopwatchSyncContext);
  if (!context) {
    throw new Error('useStopwatchSyncContext must be used within a StopwatchProvider');
  }

  return context;
};
