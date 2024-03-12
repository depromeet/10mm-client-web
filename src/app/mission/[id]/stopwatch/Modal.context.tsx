'use client';

import { createContext, type PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSubmit } from '@/app/mission/[id]/stopwatch/index.hooks';
import { useStopwatchStepContext, useStopwatchTimeContext } from '@/app/mission/[id]/stopwatch/Stopwatch.context';
import Dialog from '@/components/Dialog/Dialog';
import Loading from '@/components/Loading';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import { eventLogger } from '@/utils';
import { removeProgressMissionData } from '@/utils/storage/progressMission';

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

function ModalContextProvider({
  children,
  missionId,
}: PropsWithChildren<{
  missionId: string;
}>) {
  const router = useRouter();
  const { time } = useStopwatchTimeContext();
  const { prevStep, onNextStep } = useStopwatchStepContext();

  const { onSubmit, isSubmitLoading } = useSubmit({ missionId, second: time });

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

  const logData = useMemo(() => ({ finishTime: time }), [time]);

  const onCancel = useCallback(() => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_CANCEL, EVENT_LOG_CATEGORY.STOPWATCH, logData);
    onNextStep(prevStep);
  }, [logData, onNextStep, prevStep]);

  const onFinish = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  // 뒤로가기 버튼 눌렀을 때
  const onExit = useCallback(() => {
    router.replace(ROUTER.MISSION.DETAIL(missionId));
    removeProgressMissionData();
  }, [missionId, router]);

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
      {isSubmitLoading && <Loading />}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;

export const useStopwatchModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useStopwatchModalContext must be used within a StopwatchProvider');
  }

  return context;
};

interface DialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  logData?: Record<string, string | number>;
}

export function FinalDialog({ onConfirm, logData, ...props }: DialogProps) {
  const _onConfirm = () => {
    logData && eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_FINISH, EVENT_LOG_CATEGORY.STOPWATCH);
    onConfirm();
  };
  return (
    <Dialog
      variant={'default'}
      title="미션을 끝내시겠어요?"
      content="지금까지 집중한 시간들이 기록됩니다."
      confirmText="끝내기"
      cancelText="취소"
      onConfirm={_onConfirm}
      {...props}
    />
  );
}

export function BackDialog({ onConfirm, logData, ...props }: DialogProps) {
  const _onConfirm = () => {
    logData && eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_BACK, EVENT_LOG_CATEGORY.STOPWATCH);
    onConfirm();
  };

  return (
    <Dialog
      variant={'default'}
      title="잠깐! 정말 나가시겠어요?"
      content="끝내기 버튼을 누르지 않으면 지금까지 집중한 시간들이 사라져요."
      confirmText="나가기"
      cancelText="취소"
      onConfirm={_onConfirm}
      {...props}
    />
  );
}

export function MidOutDialog({ onConfirm, logData, ...props }: DialogProps) {
  const _onConfirm = () => {
    logData && eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_MID_OUT, EVENT_LOG_CATEGORY.STOPWATCH);
    onConfirm();
  };

  return (
    <Dialog
      variant={'default'}
      title="미션을 끝내시겠어요?"
      content="10분을 채우지 않으면 오늘의 미션을 완료할 수 없어요."
      confirmText="끝내기"
      cancelText="취소"
      onConfirm={_onConfirm}
      {...props}
    />
  );
}
