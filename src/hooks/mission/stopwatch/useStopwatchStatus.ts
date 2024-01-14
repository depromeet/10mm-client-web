import { useState } from 'react';

export type StepType = 'ready' | 'progress' | 'stop';

const STOPWATCH_STATUS = {
  ready: {
    title: '준비 되셨나요?',
    desc: '시작 버튼을 눌러서 10분의 미션을 완성해 주세요!',
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

function useStopwatchStatus(initStatus?: StepType) {
  const [step, setStep] = useState<StepType>(initStatus ?? 'ready');
  const [prevStep, setPrevStep] = useState<StepType>('ready');

  const stepLabel = STOPWATCH_STATUS[step];

  const onNextStep = (nextStep: StepType) => {
    setPrevStep(step);
    setStep(nextStep);
  };

  return { step, prevStep, onNextStep, stepLabel };
}

export default useStopwatchStatus;
