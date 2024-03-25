import Graph from '@/components/Graph/Graph';
import { getLevel } from '@/utils/result';

interface Props {
  symbolStack: number;
  viewLevel: number;
}

function LevelStatus({ viewLevel, ...props }: Props) {
  const currentLevel = getLevel(props.symbolStack);

  if (currentLevel.isFinal) {
    return <Graph status="last-level" {...props} />;
  }

  if (currentLevel.level === viewLevel) {
    return <Graph status="present-level" {...props} />;
  }

  if (currentLevel.level < viewLevel) {
    return <Graph status="future-level" level={viewLevel} {...props} />;
  }

  if (currentLevel.level > viewLevel) {
    return <Graph status="past-level" level={viewLevel} {...props} />;
  }
}

export default LevelStatus;
