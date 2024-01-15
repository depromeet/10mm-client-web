import { useState } from 'react';

export type StepType = 'ready' | 'progress' | 'stop';

const STOPWATCH_STATUS = {
  ready: {
    title: '준비 되셨나요?',
    desc: '시작 버튼을 눌러서 미션을 완성해 주세요!',
  },
  progress: {
    title: '최선을 다해주세요!',
    desc: '10분 이상 미션을 진행해야 완료할 수 있어요.\n최대 한 시간까지만 기록됩니다.',
  },
  stop: {
    title: '잠시 멈췄어요',
    desc: '준비가 되면 다시 시작해주세요!',
  },
} as const;

function useStopwatchStatus() {
  const [step, setStep] = useState<StepType>('ready');
  const [prevStep, setPrevStep] = useState<StepType>('ready');

  const stepLabel = STOPWATCH_STATUS[step];

  const onNextStep = (nextStep: StepType) => {
    setPrevStep(step);
    setStep(nextStep);
  };

  return { step, prevStep, onNextStep, stepLabel };
}

export default useStopwatchStatus;
