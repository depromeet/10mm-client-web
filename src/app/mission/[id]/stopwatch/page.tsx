'use client';

import { Fragment, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetMissionDetailNoSuspense } from '@/apis/mission';
import { useRecordTime } from '@/apis/record';
import { useCustomBack, useRecordMidTime, useUnloadAction } from '@/app/mission/[id]/stopwatch/index.hooks';
import { BackDialog, FinalDialog, MidOutDialog } from '@/app/mission/[id]/stopwatch/modals';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Loading from '@/components/Loading';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import useStopwatch from '@/hooks/mission/stopwatch/useStopwatch';
import useStopwatchStatus from '@/hooks/mission/stopwatch/useStopwatchStatus';
import useModal from '@/hooks/useModal';
import { eventLogger } from '@/utils';
import {
  checkPrevProgressMission,
  getProgressMissionStartTimeToStorage,
  removeProgressMissionData,
  setMissionData,
} from '@/utils/storage/progressMission';
import { formatDate } from '@/utils/time';
import { css, cx } from '@styled-system/css';

export default function StopwatchPage() {
  const params = useParams();
  const missionId = params.id as string;

  const router = useRouter();

  const { data: missionData } = useGetMissionDetailNoSuspense(missionId);
  const category = missionData?.category ? MISSION_CATEGORY_LABEL[missionData?.category].label : '';
  const missionName = missionData?.name ?? '';

  const { step, prevStep, stepLabel, onNextStep } = useStopwatchStatus();
  const { seconds, minutes, stepper, isFinished, isPending: isStopwatchPending } = useStopwatch(step, missionId);
  const [isMoveLoading, setIsMoveLoading] = useState(false);

  const time = Number(minutes) * 60 + Number(seconds);
  const logData = {
    category,
    finishTime: time,
  };

  const { isOpen: isFinalModalOpen, openModal: openFinalModal, closeModal: closeFinalModal } = useModal();
  const { isOpen: isBackModalOpen, openModal: openBackModal, closeModal: closeBackModal } = useModal();
  const { isOpen: isMidOutModalOpen, openModal: openMidOutModal, closeModal: closeMidOutModal } = useModal();
  const {
    isOpen: isBackMidOutModalOpen,
    openModal: openBackMidOutModal,
    closeModal: closeBackMidOutModal,
  } = useModal();

  useCustomBack(() => {
    onNextStep('stop');
    openBackMidOutModal();
  });

  useRecordMidTime(time, missionId);
  useUnloadAction(time, missionId);

  // isError 처리 어떻게 할것인지?
  const { mutate, isPending: isSubmitLoading } = useRecordTime({
    onSuccess: (response) => {
      const missionRecordId = String(response.missionId);
      router.replace(ROUTER.RECORD.CREATE(missionRecordId));
      eventLogger.logEvent('api/record-time', 'stopwatch', { missionRecordId });

      setIsMoveLoading(true);
      removeProgressMissionData();
    },
    onError: () => {
      setIsMoveLoading(() => false); // 없어도 되는지 확인 필요
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
    router.replace(ROUTER.MISSION.DETAIL(missionId));
    removeProgressMissionData();
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
    onNextStep('progress');

    // 이전 미션 기록 삭제 - 강제 접근 이슈
    checkPrevProgressMission(missionId);

    // 중도 재시작
    if (time > 0) {
      eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_RESTART, EVENT_LOG_CATEGORY.STOPWATCH);
      return;
    }
    // 초기시작
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_START, EVENT_LOG_CATEGORY.STOPWATCH);
    setMissionData(missionId);
  };

  const onBackAction = () => {
    onNextStep('stop');
    openBackModal();
  };

  const onBackMidModalClose = () => {
    closeBackMidOutModal();
    history.pushState(null, '', location.href);
    onNextStep(prevStep);
  };

  useEffect(() => {
    if (isFinished) {
      onAutoFinish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  return (
    <>
      {isSubmitLoading || (isMoveLoading && <Loading />)}
      <Header rightAction="none" onBackAction={onBackAction} />
      <div className={containerCss}>
        <section key={step} className={opacityAnimation}>
          <h1 className={cx(titleCss)}>{stepLabel.title}</h1>
          <p className={cx(descCss)}>
            {stepLabel.desc.split('\n').map((text) => (
              <Fragment key={text}>
                {text}
                <br />
              </Fragment>
            ))}
          </p>
        </section>
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
            <Button variant="cta" size="large" type="button" onClick={onStart} disabled={isStopwatchPending}>
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
        <MidOutDialog
          isOpen={isBackMidOutModalOpen}
          onClose={closeBackMidOutModal}
          onCancel={onBackMidModalClose}
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
const descCss = css({
  color: 'text.secondary',
  textStyle: 'body4',
  marginTop: '8px',
  marginBottom: '76px',
  minHeight: '40px',
});

const buttonContainerCss = css({
  margin: '28px auto',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
});

const opacityAnimation = css({
  animation: 'fadeIn .7s',
});
