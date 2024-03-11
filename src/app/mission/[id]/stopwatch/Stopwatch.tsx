'use client';

import { Fragment } from 'react';
import { useStopwatchModalContext, useStopwatchTimeContext } from '@/app/mission/[id]/stopwatch/Stopwatch.context';
import Button from '@/components/Button/Button';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import useStopwatchStatus from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { eventLogger } from '@/utils';
import { checkPrevProgressMission, setMissionData, setMissionTimeStack } from '@/utils/storage/progressMission';
import { css, cx } from '@styled-system/css';

interface Props {
  missionId: string;
  missionName: string;
}

function StopwatchSection({ missionId, missionName }: Props) {
  const { step, onNextStep } = useStopwatchStatus();
  const { minutes, seconds, time } = useStopwatchTimeContext();
  const { openMidOutModal, openFinalModal } = useStopwatchModalContext();

  const logData = { finishTime: time };

  const isStopwatchPending = false; //TODO
  const stepper = time < 60 ? 0 : Math.floor(time / 60 / 10);

  const onStop = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_STOP, EVENT_LOG_CATEGORY.STOPWATCH, {
      stopTime: Number(minutes) * 60 + Number(seconds),
    });
    onNextStep('stop');
    setMissionTimeStack(missionId, 'stop');
  };

  const onStart = () => {
    onNextStep('progress');

    // 이전 미션 기록 삭제 - 강제 접근 이슈
    checkPrevProgressMission(missionId);
    setMissionTimeStack(missionId, 'start');

    // 중도 재시작
    if (time > 0) {
      eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_RESTART, EVENT_LOG_CATEGORY.STOPWATCH);
      return;
    }
    // 초기시작
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_START, EVENT_LOG_CATEGORY.STOPWATCH);
    setMissionData(missionId);
  };

  const onFinishButtonClick = () => {
    onNextStep('stop');

    // 10분 지나기 전 끝내기 눌렀을 때
    if (Number(minutes) < 10) {
      eventLogger.logEvent(
        EVENT_LOG_NAME.STOPWATCH.CLICK_FINISH_BUTTON_BEFORE_10MM,
        EVENT_LOG_CATEGORY.STOPWATCH,
        logData,
      );
      openMidOutModal();
      return;
    }

    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_FINISH_BUTTON, EVENT_LOG_CATEGORY.STOPWATCH, logData);
    openFinalModal();
  };

  return (
    <>
      <section className={opacityAnimation}>
        <Stopwatch
          minutes={minutes}
          seconds={seconds}
          missionName={missionName}
          stepper={stepper}
          isProgress={step === 'progress'}
          isDisabled={step === 'stop'}
        />
      </section>
      <section className={cx(buttonContainerCss, opacityAnimation)}>
        {step === 'ready' && (
          <div className={fixedButtonContainerCss}>
            <Button variant="primary" size="large" type="button" onClick={onStart} disabled={isStopwatchPending}>
              시작
            </Button>
          </div>
        )}
        {step === 'progress' && (
          <>
            <Button size="medium" variant="secondary" type="button" onClick={onStop}>
              일시 정지
            </Button>
            <Button size="medium" variant="primary" type="button" onClick={onFinishButtonClick}>
              끝내기
            </Button>
          </>
        )}
        {step === 'stop' && (
          <>
            <Button
              size="medium"
              variant="secondary"
              type="button"
              onClick={() => {
                setMissionTimeStack(missionId, 'restart');
                onNextStep('progress');
              }}
            >
              다시 시작
            </Button>
            <Button size="medium" variant="primary" type="button" onClick={onFinishButtonClick}>
              끝내기
            </Button>
          </>
        )}
      </section>
    </>
  );
}

export default StopwatchSection;

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
