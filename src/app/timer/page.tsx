'use client';
import TimerView from '@/app/timer/TimerView';
import useStep from '@/app/timer/useStep';
import useTimer from '@/app/timer/useTimer';
import Header from '@/components/Layout/Header';
import { css } from '@styled-system/css';

export default function TimerPage() {
  const { step, stepLabel, onNextStep } = useStep();
  const { formattedTime } = useTimer(step);

  const onFinish = () => {
    onNextStep('stop');
    alert('정말 끝내시겠습니까?');
  };

  return (
    <div
      className={css(bgCss, {
        background: step === 'stop' ? '#F2F4F6' : 'linear-gradient(136deg, #FFF1F2 4.76%, #E9EFFF 89.58%)',
      })}
    >
      <Header title={'미션 타이머'} />
      <div className={css(containerCss)}>
        <h1 className={titleCss}>{stepLabel.title}</h1>
        <p className={descCss}>{stepLabel.desc}</p>

        <TimerView category="카테고리" time={formattedTime} isActive={step !== 'stop'} />
        <div className={css(buttonContainerCss)}>
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
        </div>
      </div>
    </div>
  );
}

const bgCss = {
  minHeight: '100vh',
  transition: '1s ease',
};

const containerCss = {
  padding: '24px 16px',
};

const font24Css = {
  fontSize: '24px',
  fontFamily: 'Pretendard',
  fontWeight: '700',
  lineHeight: '150%',
  wordWrap: 'break-word',
};

const font14Css = {
  fontSize: '14px',
  fontFamily: 'Pretendard',
  fontWeight: '400',
  lineHeight: '150%',
};

const titleCss = css(font24Css, { color: '#333D4B' });
const descCss = css(font14Css, { color: '#6B7684', marginBottom: '84px' });

const buttonContainerCss = {
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
};
