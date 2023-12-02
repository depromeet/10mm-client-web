import { useState } from 'react';

type StepType = 'ready';

function useStep() {
  const [step, setStep] = useState<StepType>('ready');

  const onNextStep = () => {};
  return { step, onNextStep };
}

export default useStep;
