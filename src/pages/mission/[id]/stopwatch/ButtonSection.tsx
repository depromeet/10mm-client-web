import { NOTIFICATION_MISSIONS_APIS } from '@/apis/notifications';
import Button from '@/components/Button/Button';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { eventLogger } from '@/utils';
import { checkPrevProgressMission, setMissionData, setMissionTimeStack } from '@/utils/storage/progressMission';
import { css, cx } from '@styled-system/css';

import { useStopwatchModalContext } from './Modal.context';
import { useStopwatchStepContext, useStopwatchSyncContext, useStopwatchTimeContext } from './Stopwatch.context';

function ButtonSection({ missionId }: { missionId: string }) {
  const { step } = useStopwatchStepContext();
  const { minutes, time } = useStopwatchTimeContext();

  const logData = { finishTime: time };

  const { onInitStart, onMidStart, onStop, onMidOut, onFinish, onRestart } = useStopwatch(missionId);
  // Restoration moved into StopwatchProvider so the Live Activity is only
  // synchronized once the elapsed time is trustworthy.
  const { isStopwatchPending } = useStopwatchSyncContext();

  const onStartButtonClick = () => {
    if (time > 0) {
      onMidStart();
      eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_RESTART, EVENT_LOG_CATEGORY.STOPWATCH);
      return;
    }
    onInitStart();
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_START, EVENT_LOG_CATEGORY.STOPWATCH);

    NOTIFICATION_MISSIONS_APIS.remind(600);
  };

  const onStopButtonClick = () => {
    onStop();
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_STOP, EVENT_LOG_CATEGORY.STOPWATCH, {
      stopTime: time,
    });
  };

  const onRestartButtonClick = () => {
    onRestart();
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_RESTART, EVENT_LOG_CATEGORY.STOPWATCH);
  };

  const onFinishButtonClick = () => {
    if (Number(minutes) < 10) {
      eventLogger.logEvent(
        EVENT_LOG_NAME.STOPWATCH.CLICK_FINISH_BUTTON_BEFORE_10MM,
        EVENT_LOG_CATEGORY.STOPWATCH,
        logData,
      );
      onMidOut();
      return;
    }
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_FINISH_BUTTON, EVENT_LOG_CATEGORY.STOPWATCH, logData);
    onFinish();
  };

  return (
    <section className={cx(buttonContainerCss, opacityAnimation)}>
      {step === StopwatchStep.ready && (
        <div className={fixedButtonContainerCss}>
          <Button
            variant="primary"
            size="large"
            type="button"
            onClick={onStartButtonClick}
            disabled={isStopwatchPending}
          >
            시작
          </Button>
        </div>
      )}
      {step === 'progress' && (
        <>
          <Button size="medium" variant="secondary" type="button" onClick={onStopButtonClick}>
            일시 정지
          </Button>
          <Button size="medium" variant="primary" type="button" onClick={onFinishButtonClick}>
            끝내기
          </Button>
        </>
      )}
      {step === 'stop' && (
        <>
          <Button size="medium" variant="secondary" type="button" onClick={onRestartButtonClick}>
            다시 시작
          </Button>
          <Button size="medium" variant="primary" type="button" onClick={onFinishButtonClick}>
            끝내기
          </Button>
        </>
      )}
    </section>
  );
}

export default ButtonSection;

const useStopwatch = (missionId: string) => {
  const { onNextStep } = useStopwatchStepContext();
  const { openMidOutModal, openFinalModal } = useStopwatchModalContext();

  const startAction = () => {
    onNextStep(StopwatchStep.progress);

    // 이전 미션 기록 삭제 - 강제 접근 이슈
    checkPrevProgressMission(missionId);
    setMissionTimeStack(missionId, 'start');
  };

  const onInitStart = () => {
    startAction();
    setMissionData(missionId);
  };

  const onMidStart = () => {
    startAction();
  };

  const onStop = () => {
    onNextStep(StopwatchStep.stop);
    setMissionTimeStack(missionId, 'stop');
  };

  const onRestart = () => {
    setMissionTimeStack(missionId, 'restart');
    onNextStep(StopwatchStep.progress);
  };

  const onMidOut = () => {
    onNextStep(StopwatchStep.stop);
    openMidOutModal();
  };

  const onFinish = () => {
    onNextStep(StopwatchStep.stop);
    openFinalModal();
  };

  return {
    onInitStart,
    onMidStart,
    onStop,
    onMidOut,
    onFinish,
    onRestart,
  };
};

const buttonContainerCss = css({
  margin: '28px auto',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
});

const opacityAnimation = css({
  animation: 'fadeIn .7s',
});

const fixedButtonContainerCss = css({
  position: 'fixed',
  left: '16px',
  right: '16px',
  bottom: '16px',
  width: '100%',
  maxWidth: 'calc(475px  - 48px)',
  margin: '0 auto',
  '@media (max-width: 475px)': {
    maxWidth: 'calc(100vw  - 48px)',
  },
});
