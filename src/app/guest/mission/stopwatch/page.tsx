'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import Header from '@/components/Header/Header';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import useStopwatch from '@/hooks/mission/stopwatch/useStopwatch';
import useStopwatchStatus from '@/hooks/mission/stopwatch/useStopwatchStatus';
import useModal from '@/hooks/useModal';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';

export default function GuestMissionStopwatchPage() {
  const router = useRouter();
  const category = useGetCategory();

  const { step, prevStep, stepLabel, onNextStep } = useStopwatchStatus();
  const { seconds, minutes, stepper } = useStopwatch(step, '');

  const { isOpen, openModal, closeModal } = useModal();

  const onFinishButtonClick = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_FINISH_BUTTON, EVENT_LOG_CATEGORY.STOPWATCH, { category });
    openModal();
    onNextStep('stop');
  };

  const onFinish = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_FINISH, EVENT_LOG_CATEGORY.STOPWATCH, {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
      isGuest: true,
    });
    router.replace(ROUTER.GUEST.MISSION.SUCCESS);
  };

  const onCancel = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_CANCEL, EVENT_LOG_CATEGORY.STOPWATCH, {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
      isGuest: true,
    });
    onNextStep(prevStep);
  };

  const onStop = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_STOP, EVENT_LOG_CATEGORY.STOPWATCH, {
      category,
      stopTime: Number(minutes) * 60 + Number(seconds),
      isGuest: true,
    });
    onNextStep('stop');
  };

  const onStart = () => {
    eventLogger.logEvent(EVENT_LOG_NAME.STOPWATCH.CLICK_START, EVENT_LOG_CATEGORY.STOPWATCH, {
      category,
      isGuest: true,
    });
    onNextStep('progress');
  };

  return (
    <div className={containerCss}>
      <Header rightAction="none" />
      <p className={titleCss}>{stepLabel.title}</p>
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
      <FinalDialog isOpen={isOpen} onClose={closeModal} onCancel={onCancel} onAction={onFinish} />
    </div>
  );
}

function FinalDialog(props: {
  isOpen: boolean;
  onClose: VoidFunction;
  onAction: VoidFunction;
  onCancel: VoidFunction;
}) {
  return (
    <Dialog
      variant={'default'}
      title="미션을 끝내시겠어요?"
      content="지금까지 집중한 시간들이 기록됩니다."
      confirmText="끝내기"
      cancelText="취소"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCancel={props.onCancel}
      onConfirm={props.onAction}
    />
  );
}

const useGetCategory = () => {
  const { searchParams } = useSearchParamsTypedValue<string>('category');

  return searchParams ?? '운동';
};

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
