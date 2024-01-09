'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BackDialog, FinalDialog, MidOutDialog } from '@/app/mission/[id]/stopwatch/modals';
import { useGetCategory, useRecordMidTime, useUnloadAction } from '@/app/mission/[id]/stopwatch/time.hooks';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { ROUTER } from '@/constants/router';
import useStopwatch from '@/hooks/mission/stopwatch/useStopwatch';
import useStopwatchStatus from '@/hooks/mission/stopwatch/useStopwatchStatus';
import useModal from '@/hooks/useModal';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';

export default function StopwatchPage() {
  const params = useParams();
  const missionId = params.id as string;

  const router = useRouter();
  const category = useGetCategory();

  const { step, prevStep, stepLabel, onNextStep } = useStopwatchStatus();
  const { seconds, minutes, stepper, isFinished } = useStopwatch(step);

  const time = Number(minutes) * 60 + Number(seconds);
  const logData = {
    category,
    finishTime: time,
  };

  const { isOpen: isFinalOpen, openModal: openFinalModal, closeModal: closeFinalModal } = useModal();
  const { isOpen: isBackOpen, openModal: openBackModal, closeModal: closeBackModal } = useModal();
  const { isOpen: isMidOutOpen, openModal: openMidOutModal, closeModal: closeMidOutModal } = useModal();

  useUnloadAction(time);
  useRecordMidTime(time);

  // TODO: 끝내기 후 로직 추가
  const onSubmit = () => {
    router.push(ROUTER.MISSION.RECORD(missionId));
  };

  const onFinishButtonClick = () => {
    onNextStep('stop');
    if (Number(minutes) < 10) {
      eventLogger.logEvent('click/finishButton-mid', 'stopwatch', logData);
      openMidOutModal();
      return;
    }

    eventLogger.logEvent('click/finishButton', 'stopwatch', logData);
    openFinalModal();
  };

  const onExit = () => {
    router.push(ROUTER.MISSION.DETAIL(missionId));
  };

  const onFinish = () => {
    // TODO: 끝내기 로직 추가
    onSubmit();
  };

  const onAutoFinish = () => {
    eventLogger.logEvent('click/auto-finish', 'stopwatch', {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
    });
    onSubmit();
  };

  const onCancel = () => {
    eventLogger.logEvent('click/cancel', 'stopwatch', {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
    });
    onNextStep(prevStep);
  };

  const onStop = () => {
    eventLogger.logEvent('click/stop', 'stopwatch', { category, stopTime: Number(minutes) * 60 + Number(seconds) });
    onNextStep('stop');
  };

  const onStart = () => {
    eventLogger.logEvent('click/start', 'stopwatch', { category });
    onNextStep('progress');
  };

  useEffect(() => {
    if (isFinished) {
      onAutoFinish();
    }
  }, [isFinished]);

  return (
    <>
      <Header rightAction="none" onBackAction={openBackModal} />
      <div className={containerCss}>
        <h1 className={titleCss}>{stepLabel.title}</h1>
        <p className={descCss}>{stepLabel.desc}</p>

        <section className={stopwatchCss}>
          <Stopwatch
            minutes={minutes}
            seconds={seconds}
            category={category}
            stepper={stepper}
            isProgress={step === 'progress'}
            isDisabled={step === 'stop'}
          />
        </section>
        <section className={buttonContainerCss}>
          {step === 'ready' && (
            <Button variant="cta" size="large" type="button" onClick={onStart}>
              시작
            </Button>
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
              <Button size="medium" variant="secondary" type="button" onClick={() => onNextStep('progress')}>
                다시 시작
              </Button>
              <Button size="medium" variant="primary" type="button" onClick={onFinishButtonClick}>
                끝내기
              </Button>
            </>
          )}
        </section>
        <FinalDialog
          isOpen={isFinalOpen}
          onClose={closeFinalModal}
          onCancel={onCancel}
          onConfirm={onFinish}
          logData={logData}
        />
        <BackDialog
          isOpen={isBackOpen}
          onClose={closeBackModal}
          onCancel={onCancel}
          onConfirm={onExit}
          logData={logData}
        />
        <MidOutDialog
          isOpen={isMidOutOpen}
          onClose={closeMidOutModal}
          onCancel={onCancel}
          onConfirm={onExit}
          logData={logData}
        />
      </div>
    </>
  );
}

const containerCss = css({
  padding: '24px 16px',
});

const titleCss = css({ color: 'text.primary', textStyle: 'title2' });
const descCss = css({ color: 'text.secondary', textStyle: 'body4', marginTop: '4px', marginBottom: '96px' });

const stopwatchCss = css({
  width: 'fit-content',
  margin: '0 auto',
  overflow: 'hidden',
  maxWidth: '100vw',
  padding: '4px', // small circle 잘리지 않게
});

const buttonContainerCss = css({
  margin: '28px auto',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
});
