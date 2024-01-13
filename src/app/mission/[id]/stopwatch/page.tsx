'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRecordTime } from '@/apis/record';
import {
  useCustomBack,
  useGetCategory,
  useRecordMidTime,
  useUnloadAction,
} from '@/app/mission/[id]/stopwatch/index.hooks';
import { BackDialog, FinalDialog, MidOutDialog } from '@/app/mission/[id]/stopwatch/modals';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Loading from '@/components/Loading';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { STORAGE_KEY } from '@/constants/storage';
import useStopwatch from '@/hooks/mission/stopwatch/useStopwatch';
import useStopwatchStatus from '@/hooks/mission/stopwatch/useStopwatchStatus';
import useModal from '@/hooks/useModal';
import { eventLogger } from '@/utils';
import { formatDate } from '@/utils/time';
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

  const { isOpen: isFinalModalOpen, openModal: openFinalModal, closeModal: closeFinalModal } = useModal();
  const { isOpen: isBackModalOpen, openModal: openBackModal, closeModal: closeBackModal } = useModal();
  const { isOpen: isMidOutModalOpen, openModal: openMidOutModal, closeModal: closeMidOutModal } = useModal();

  useCustomBack(openMidOutModal);

  useUnloadAction(time);
  useRecordMidTime(time);

  // isError 처리 어떻게 할것인지?
  const { mutate, isPending: isSubmitLoading } = useRecordTime({
    onSuccess: (response) => {
      const missionRecordId = String(response.missionId);
      router.replace(ROUTER.RECORD.CREATE(missionRecordId));
      eventLogger.logEvent('api/record-time', 'stopwatch', { missionRecordId });
    },
    onError: (error) => {
      // TODO
      console.log('error: ', error);
    },
  });

  // TODO: 끝내기 후 로직 추가
  const onSubmit = async () => {
    const startTimeString = localStorage.getItem(STORAGE_KEY.STOPWATCH.START_TIME);
    if (!startTimeString) return;

    const startTime = new Date(startTimeString);
    const startTimeFormatted = formatDate(startTime);
    const finishTimeFormatted = formatDate(new Date());

    mutate({
      missionId: missionId,
      startedAt: startTimeFormatted,
      finishedAt: finishTimeFormatted,
      durationMin: Number(minutes),
      durationSec: Number(seconds),
    });
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

  // 뒤로가기 버튼 눌렀을 때
  const onExit = () => {
    router.push(ROUTER.MISSION.DETAIL(missionId));
  };

  const onFinish = () => {
    // TODO: 끝내기 로직 추가
    // 이쪽에 로딩 추가 필요
    onSubmit();
  };

  const onAutoFinish = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_AUTO_FINISH, EVENT_LOG_CATEGORY.STOPWATCH, {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
    });
    onSubmit();
  };

  const onCancel = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_CANCEL, EVENT_LOG_CATEGORY.STOPWATCH, {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
    });
    onNextStep(prevStep);
  };

  const onStop = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_STOP, EVENT_LOG_CATEGORY.STOPWATCH, {
      category,
      stopTime: Number(minutes) * 60 + Number(seconds),
    });
    onNextStep('stop');
  };

  const onStart = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_START, EVENT_LOG_CATEGORY.STOPWATCH, { category });
    onNextStep('progress');
    const startTime = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY.STOPWATCH.MISSION_ID, missionId);
    localStorage.setItem(STORAGE_KEY.STOPWATCH.START_TIME, startTime);
  };

  useEffect(() => {
    if (isFinished) {
      onAutoFinish();
    }
  }, [isFinished]);

  return (
    <>
      {isSubmitLoading && <Loading />}
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
