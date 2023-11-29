'use client';
import useStep from '@/app/timer/useStep';
import { css } from '@styled-system/css';

const STEP_LABEL = {
  ready: {
    title: '준비 되셨나요?',
    desc: '타이머를 눌러서 10분의 미션을 완성해 주세요!',
  },
} as const;

export default function TimerPage() {
  const { step } = useStep();

  return (
    <div>
      <h1 className={titleCss}>{STEP_LABEL[step].title}</h1>
      <p className={descCss}>{STEP_LABEL[step].desc}</p>
    </div>
  );
}

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
