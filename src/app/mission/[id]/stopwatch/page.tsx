'use client';

import { useRouter } from 'next/navigation';
import useStopwatch from '@/app/mission/[id]/stopwatch/useStopwatch';
import useStopwatchStatus from '@/app/mission/[id]/stopwatch/useStopwatchStatus';
import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { eventTracker } from '@/utils';
import { css } from '@styled-system/css';

export default function StopwatchPage() {
  const router = useRouter();
  const category = useGetCategory();

  const { step, prevStep, stepLabel, onNextStep } = useStopwatchStatus();
  const { seconds, minutes, stepper } = useStopwatch(step);

  const { isOpen, openModal, closeModal } = useModal();

  const onFinishButtonClick = () => {
    eventTracker.logEvent('click/finishButton', 'stopwatch', { category });
    openModal();
    onNextStep('stop');
  };

  const onFinish = () => {
    eventTracker.logEvent('click/finish', 'stopwatch', {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
    });
    // TODO: 끝내기 후 로직 추가
    router.push(ROUTER.MISSION.SUCCESS);
  };

  const onCancel = () => {
    eventTracker.logEvent('click/cancel', 'stopwatch', {
      category,
      finishTime: Number(minutes) * 60 + Number(seconds),
    });
    onNextStep(prevStep);
  };

  const onStop = () => {
    eventTracker.logEvent('click/stop', 'stopwatch', { category, stopTime: Number(minutes) * 60 + Number(seconds) });
    onNextStep('stop');
  };

  const onStart = () => {
    eventTracker.logEvent('click/start', 'stopwatch', { category });
    onNextStep('progress');
  };

  return (
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
const descCss = css({ color: 'text.secondary', textStyle: 'body3', marginTop: '4px', marginBottom: '96px' });

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
