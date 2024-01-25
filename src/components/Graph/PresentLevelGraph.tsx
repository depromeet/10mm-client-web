import { type PresentLevelGraphType } from '@/components/Graph/Graph.types';
import Graph from '@/components/Graph/GraphBase';
import { getLevel } from '@/utils/result';

function PresentLevelGraph(props: PresentLevelGraphType) {
  const currentLevel = getLevel(props.symbolStack);

  return (
    <Graph>
      <Graph.SymbolText symbolStack={props.symbolStack} />
      <Graph.ProgressBar symbolStack={props.symbolStack} min={currentLevel.min} max={currentLevel.max} />
    </Graph>
  );
}

export default PresentLevelGraph;
