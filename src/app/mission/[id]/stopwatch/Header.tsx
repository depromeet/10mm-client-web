import Header from '@/components/Header/Header';
import { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';

import { useStopwatchModalContext } from './Modal.context';
import { useStopwatchStepContext } from './Stopwatch.context';

function StopwatchHeader() {
  const { onNextStep } = useStopwatchStepContext();
  const { openBackModal } = useStopwatchModalContext();

  const onBackAction = () => {
    onNextStep(StopwatchStep.stop);
    openBackModal();
  };

  return <Header rightAction="none" onBackAction={onBackAction} />;
}

export default StopwatchHeader;
