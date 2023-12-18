'use client';

import { useRouter } from 'next/navigation';
import { MISSION_CATEGORIES } from '@/app/select/select.constants';
import useTimer from '@/app/timer/useTimer';
import useTimerStatus from '@/app/timer/useTimerStatus';
import Button from '@/components/Button/Button';
import Dialog from '@/components/Dialog/Dialog';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import useModal from '@/hooks/useModal';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { type ObjectKeys } from '@/utils';
import { css } from '@styled-system/css';

export default function TimerPage() {
  const router = useRouter();
  const category = useGetCategory();

  const { step, prevStep, stepLabel, onNextStep } = useTimerStatus();
  const { seconds, minutes, stepper } = useTimer(step);

  const { isOpen, openModal, closeModal } = useModal();

  const onFinishButtonClick = () => {
    openModal();
    onNextStep('stop');
  };

  const onFinish = () => {
    router.push('/complete');
  };

  const onCancel = () => {
    onNextStep(prevStep);
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
          <Button variant="cta" size="large" type="button" onClick={() => onNextStep('progress')}>
            시작
          </Button>
        )}
        {step === 'progress' && (
          <>
            <Button size="medium" variant="secondary" type="button" onClick={() => onNextStep('stop')}>
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
  const { searchParams } = useSearchParamsTypedValue<ObjectKeys<typeof MISSION_CATEGORIES>>('category');

  const category = MISSION_CATEGORIES[searchParams ?? 'exercise'].label;

  return category;
};

const containerCss = css({
  padding: '24px 16px',
});

const titleCss = css({ color: 'text.primary', textStyle: 'title2' });
const descCss = css({ color: 'text.secondary', textStyle: 'body2', marginTop: '4px', marginBottom: '96px' });

const stopwatchCss = css({
  width: 'fit-content',
  margin: '0 auto',
});

const buttonContainerCss = css({
  margin: '28px auto',
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
});
