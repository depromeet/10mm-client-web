'use client';
import { MISSION_CATEGORIES } from '@/app/select/select.constants';
import useTimer from '@/app/timer/useTimer';
import useTimerStatus from '@/app/timer/useTimerStatus';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { type ObjectKeys } from '@/utils';
import { css } from '@styled-system/css';

export default function TimerPage() {
  const { step, stepLabel, onNextStep } = useTimerStatus();
  const { seconds, minutes } = useTimer(step);

  const { searchParams } = useSearchParamsTypedValue<ObjectKeys<typeof MISSION_CATEGORIES>>('category');

  const category = MISSION_CATEGORIES[searchParams ?? 'exercise'].label;

  const onFinish = () => {
    onNextStep('stop');
    alert('정말 끝내시겠습니까?');
  };

  return (
    <div className={containerCss}>
      <h1 className={titleCss}>{stepLabel.title}</h1>
      <p className={descCss}>{stepLabel.desc}</p>

      <section className={stopwatchCss}>
        <Stopwatch minutes={minutes} seconds={seconds} category={category} stack={1} />
      </section>
      <section className={buttonContainerCss}>
        {step === 'ready' && (
          <button type="button" onClick={() => onNextStep('progress')}>
            시작
          </button>
        )}
        {step === 'progress' && (
          <>
            <button type="button" onClick={() => onNextStep('stop')}>
              일시정지
            </button>
            <button type="button" onClick={onFinish}>
              끝내기
            </button>
          </>
        )}
        {step === 'stop' && (
          <>
            <button type="button" onClick={() => onNextStep('progress')}>
              다시 시작
            </button>
            <button type="button" onClick={onFinish}>
              끝내기
            </button>
          </>
        )}
      </section>
    </div>
    // <div
    //   className={css(bgCss, {
    //     background: step === 'stop' ? '#F2F4F6' : 'linear-gradient(136deg, #FFF1F2 4.76%, #E9EFFF 89.58%)',
    //   })}
    // >
    //   <Header title={'미션 타이머'} />
    //   <div className={css(containerCss)}>
    //     <h1 className={titleCss}>{stepLabel.title}</h1>
    //     <p className={descCss}>{stepLabel.desc}</p>

    //     <TimerView category={category} time={formattedTime} isActive={step !== 'stop'} />
    //     <div className={css(buttonContainerCss)}>
    //       {step === 'ready' && (
    //         <button type="button" onClick={() => onNextStep('progress')}>
    //           시작
    //         </button>
    //       )}
    //       {step === 'progress' && (
    //         <>
    //           <button type="button" onClick={() => onNextStep('stop')}>
    //             일시정지
    //           </button>
    //           <button type="button" onClick={onFinish}>
    //             끝내기
    //           </button>
    //         </>
    //       )}
    //       {step === 'stop' && (
    //         <>
    //           <button type="button" onClick={() => onNextStep('progress')}>
    //             다시 시작
    //           </button>
    //           <button type="button" onClick={onFinish}>
    //             끝내기
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
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

  '& button': {
    backgroundColor: 'white',
    borderRadius: '30px',
    padding: '16px 24px',
    boxSizing: '0px 4px 20px 0px rgba(18, 23, 41, 0.10)',
  },
});
