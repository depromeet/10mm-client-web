import { useState } from 'react';

type StepType = 'ready' | 'progress' | 'stop';

const STEP_LABEL = {
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

function useStep() {
  const [step, setStep] = useState<StepType>('ready');

  const stepLabel = STEP_LABEL[step];

  const onNextStep = (nextStep: StepType) => {
    setStep(nextStep);
  };

  return { step, onNextStep, stepLabel };
}

export default useStep;
