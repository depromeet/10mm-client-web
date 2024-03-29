'use client';

import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useEffect,
} from 'react';
import Loading from '@/components/Loading';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import useStopwatchSeconds from '@/hooks/mission/stopwatch/useStopwatchLogic';
import useStopwatchStatus, { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { eventLogger } from '@/utils';
import { formatMMSS } from '@/utils/time';

import { useSubmit } from './index.hooks';
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

function StopwatchProvider({
  children,
  missionId,
}: PropsWithChildren<{
  missionId: string;
}>) {
  const stepValue = useStopwatchStatus();
  const { second, setSecond, isFinished } = useStopwatchSeconds({ status: stepValue.step });
  const { formattedMinutes, formattedSeconds } = formatMMSS(second);

  const { isSubmitLoading, onSubmit } = useSubmit({ missionId, second });

  const timeValue = {
    minutes: formattedMinutes,
    seconds: formattedSeconds,
    setTime: setSecond,
    time: second,
  };

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
