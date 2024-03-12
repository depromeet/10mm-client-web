'use client';

import { useStopwatchStepContext, useStopwatchTimeContext } from '@/app/mission/[id]/stopwatch/Stopwatch.context';
import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { css } from '@styled-system/css';

interface Props {
  missionName: string;
}

function StopwatchSection({ missionName }: Props) {
  const { step } = useStopwatchStepContext();
  const { minutes, seconds, time } = useStopwatchTimeContext();

  const stepper = time < 60 ? 0 : Math.floor(time / 60 / 10);

  return (
    <section className={opacityAnimation}>
      <Stopwatch
        minutes={minutes}
        seconds={seconds}
        missionName={missionName}
        stepper={stepper}
        isProgress={step === 'progress'}
        isDisabled={step === 'stop'}
      />
    </section>
  );
}

export default StopwatchSection;

const opacityAnimation = css({
  animation: 'fadeIn .7s',
});
