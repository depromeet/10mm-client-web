import { useState } from 'react';

export type StepType = 'ready' | 'progress' | 'stop';

const TIMER_STATUS = {
  ready: {
    title: '준비 되셨나요?',
    desc: '타이머를 눌러서 10분의 미션을 완성해 주세요!',
  },
  progress: {
    title: '시작!',
    desc: '10분 동안 최선을 다해주세요!',
  },
  stop: {
    title: '잠시 멈췄어요',
    desc: '준비가 되면 타이머를 다시 시작해주세요!',
  },
} as const;

function useTimerStatus() {
  const [step, setStep] = useState<StepType>('ready');
  const [prevStep, setPrevStep] = useState<StepType>('ready');

  const stepLabel = TIMER_STATUS[step];

  const onNextStep = (nextStep: StepType) => {
    setPrevStep(step);
    setStep(nextStep);
  };

  return { step, prevStep, onNextStep, stepLabel };
}

export default useTimerStatus;
