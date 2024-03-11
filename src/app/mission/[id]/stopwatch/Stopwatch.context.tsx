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
import { useRouter } from 'next/router';
import { useRecordTime } from '@/apis';
import { isSeverError } from '@/apis/instance.api';
import { BackDialog, FinalDialog, MidOutDialog } from '@/app/mission/[id]/stopwatch/modals';
import Loading from '@/components/Loading';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import useStopwatchSeconds from '@/hooks/mission/stopwatch/useStopwatchLogic';
import useStopwatchStatus, { type StepType } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import useModal from '@/hooks/useModal';
import { eventLogger } from '@/utils';
import { getProgressMissionStartTimeToStorage, removeProgressMissionData } from '@/utils/storage/progressMission';
import { formatDate, formatMMSS } from '@/utils/time';

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

interface ModalContextProps {
  openMidOutModal: () => void;
  openFinalModal: () => void;
  openBackModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  openMidOutModal: () => {},
  openFinalModal: () => {},
  openBackModal: () => {},
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

  const { isSubmitLoading, onSubmit } = useSubmit({
    missionId,
    formattedMinutes,
    formattedSeconds,
  });

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

  return (
    <>
      <StopwatchStepContext.Provider value={stepValue}>
        <StopwatchTimeContext.Provider value={timeValue}>
          <ModalContextProvider missionId={missionId} onSubmit={onSubmit}>
            {children}
          </ModalContextProvider>
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

const useSubmit = ({
  missionId,
  formattedMinutes,
  formattedSeconds,
}: {
  missionId: string;
  formattedMinutes: string;
  formattedSeconds: string;
}) => {
  const router = useRouter();

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

  // TODO: 끝내기 후 로직 추가
  const onSubmit = async () => {
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
  };

  return {
    isSubmitLoading,
    onSubmit,
  };
};

function ModalContextProvider({
  children,
  missionId,
  onSubmit,
}: PropsWithChildren<{
  missionId: string;
  onSubmit: () => void;
}>) {
  const router = useRouter();
  const { time } = useStopwatchTimeContext();
  const { prevStep, onNextStep } = useStopwatchStepContext();

  const { isOpen: isFinalModalOpen, openModal: openFinalModal, closeModal: closeFinalModal } = useModal();
  const { isOpen: isBackModalOpen, openModal: openBackModal, closeModal: closeBackModal } = useModal();
  const { isOpen: isMidOutModalOpen, openModal: openMidOutModal, closeModal: closeMidOutModal } = useModal();

  const value = useMemo(
    () => ({
      openMidOutModal,
      openFinalModal,
      openBackModal,
    }),
    [openBackModal, openFinalModal, openMidOutModal],
  );

  const logData = {
    finishTime: time,
  };

  const onCancel = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_CANCEL, EVENT_LOG_CATEGORY.STOPWATCH, logData);
    onNextStep(prevStep);
  };

  const onFinish = () => {
    // TODO: 끝내기 로직 추가
    // 이쪽에 로딩 추가 필요
    onSubmit();
  };

  // 뒤로가기 버튼 눌렀을 때
  const onExit = () => {
    router.replace(ROUTER.MISSION.DETAIL(missionId));
    removeProgressMissionData();
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <FinalDialog
        isOpen={isFinalModalOpen}
        onClose={closeFinalModal}
        onCancel={onCancel}
        onConfirm={onFinish}
        logData={logData}
      />
      <BackDialog
        isOpen={isBackModalOpen}
        onClose={closeBackModal}
        onCancel={onCancel}
        onConfirm={onExit}
        logData={logData}
      />
      <MidOutDialog
        isOpen={isMidOutModalOpen}
        onClose={closeMidOutModal}
        onCancel={onCancel}
        onConfirm={onExit}
        logData={logData}
      />
    </ModalContext.Provider>
  );
}

export const useStopwatchModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useStopwatchModalContext must be used within a StopwatchProvider');
  }

  return context;
};
