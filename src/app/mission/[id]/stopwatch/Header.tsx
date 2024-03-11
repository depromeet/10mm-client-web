import { useStopwatchModalContext, useStopwatchStepContext } from '@/app/mission/[id]/stopwatch/Stopwatch.context';
import Header from '@/components/Header/Header';

function StopwatchHeader() {
  const { onNextStep } = useStopwatchStepContext();
  const { openBackModal } = useStopwatchModalContext();

  const onBackAction = () => {
    onNextStep('stop');
    openBackModal();
  };

  return <Header rightAction="none" onBackAction={onBackAction} />;
}

export default StopwatchHeader;
