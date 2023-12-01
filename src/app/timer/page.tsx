'use client';
import TimerView from '@/app/timer/TimerView';
import useStep from '@/app/timer/useStep';
import { css } from '@styled-system/css';

export default function TimerPage() {
  const { step, stepLabel } = useStep();

  return (
    <div
      className={css(bgCss, {
        background: step === 'stop' ? '#F2F4F6' : 'linear-gradient(136deg, #FFF1F2 4.76%, #E9EFFF 89.58%)',
      })}
    >
      <Header title={'미션 타이머'} />
      <div className={css(containerCss)}>

      <TimerView category="카테고리" time={[10, 0]} isActive={true} />
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
