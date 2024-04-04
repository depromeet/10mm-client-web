'use client';

import Stopwatch from '@/components/Stopwatch/Stopwatch';
import { css } from '@styled-system/css';

import { useStopwatchStepContext, useStopwatchTimeContext } from './Stopwatch.context';

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
