'use client';

import { useRouter } from 'next/navigation';
import { MISSION_CATEGORIES } from '@/app/select/select.constants';
import useTimer from '@/app/timer/useTimer';
import useTimerStatus from '@/app/timer/useTimerStatus';
import Button from '@/components/Button/Button';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { type ObjectKeys } from '@/utils';
import { css } from '@styled-system/css';

export default function TimerPage() {
  const router = useRouter();
  const { step, stepLabel, onNextStep } = useTimerStatus();
  const { seconds, minutes } = useTimer(step);

  const { searchParams } = useSearchParamsTypedValue<ObjectKeys<typeof MISSION_CATEGORIES>>('category');

  const category = MISSION_CATEGORIES[searchParams ?? 'exercise'].label;

  const onFinish = () => {
    onNextStep('stop');
    if (confirm('정말 끝내시겠습니까?')) {
      router.push('/complete');
    }
  };

  return (
    <div className={containerCss}>
      <h1 className={titleCss}>{stepLabel.title}</h1>
      <p className={descCss}>{stepLabel.desc}</p>

      <section className={stopwatchCss}>
        <Stopwatch minutes={minutes} seconds={seconds} category={category} stack={1} isDisabled={step === 'stop'} />
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
              일시정지
            </Button>
            <Button size="medium" variant="primary" type="button" onClick={onFinish}>
              끝내기
            </Button>
          </>
        )}
        {step === 'stop' && (
          <>
            <Button size="medium" variant="secondary" type="button" onClick={() => onNextStep('progress')}>
              다시 시작
            </Button>
            <Button size="medium" variant="primary" type="button" onClick={onFinish}>
              끝내기
            </Button>
          </>
        )}
      </section>
    </div>
  );
}

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
