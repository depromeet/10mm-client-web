'use client';

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useSubmit } from '@/app/mission/[id]/stopwatch/index.hooks';
import ModalContextProvider from '@/app/mission/[id]/stopwatch/Modal.context';
import Loading from '@/components/Loading';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import useStopwatchSeconds from '@/hooks/mission/stopwatch/useStopwatchLogic';
import useStopwatchStatus, { type StepType } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { eventLogger } from '@/utils';
import { formatMMSS } from '@/utils/time';

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
  step: StepType;
  prevStep: StepType;
  onNextStep: (nextStep: StepType) => void;
}

export const StopwatchStepContext = createContext<StepContextProps>({
  step: 'ready',
  prevStep: 'ready',
  onNextStep: () => {},
});

function StopwatchProvider({
  children,
  missionId,
}: PropsWithChildren<{
  missionId: string;
}>) {
  const { step, prevStep, onNextStep } = useStopwatchStatus();
  const { second, setSecond, isFinished } = useStopwatchSeconds({ status: step });
  const { formattedMinutes, formattedSeconds } = formatMMSS(second);

  const { isSubmitLoading, onSubmit } = useSubmit({ missionId, second });

  const timeValue = {
    minutes: formattedMinutes,
    seconds: formattedSeconds,
    setTime: setSecond,
    time: second,
  };

  const stepValue = useMemo(
    () => ({
      step,
      prevStep,
      onNextStep,
    }),
    [onNextStep, prevStep, step],
  );

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
          <ModalContextProvider missionId={missionId}>{children}</ModalContextProvider>
        </StopwatchTimeContext.Provider>
      </StopwatchStepContext.Provider>
      {isSubmitLoading && <Loading />}
    </>
  );
}

export default StopwatchProvider;

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
