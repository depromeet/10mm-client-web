'use client';
import TimerView from '@/app/timer/TimerView';
import useStep from '@/app/timer/useStep';
import { css } from '@styled-system/css';

export default function TimerPage() {
  const { step, stepLabel } = useStep();

  return (
    <div className={css(containerCss)}>
      <div className={css(headerBlankCss)} />
      <h1 className={titleCss}>{stepLabel.title}</h1>
      <p className={descCss}>{stepLabel.desc}</p>

      <TimerView category="카테고리" time={[10, 0]} isActive={true} />
    </div>
  );
}

const containerCss = {
  background: 'linear-gradient(136deg, #FFF1F2 4.76%, #E9EFFF 89.58%)',
  padding: '24px 16px',
};

const headerBlankCss = {
  height: '42px;',
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
