'use client';

import LevelProgressBar from '@/app/result/LevelStatus/LevelProgressBar';

interface Props {
  percent: number;
}
function LevelStatus(props: Props) {
  return (
    <div>
      <LevelProgressBar percent={props.percent} />
    </div>
  );
}

export default LevelStatus;
