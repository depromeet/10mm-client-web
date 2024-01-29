import { type FutureLevelGraphType } from '@/components/Graph/Graph.types';
import Graph from '@/components/Graph/GraphBase';
import { LEVEL_SYSTEM } from '@/constants/level';

function FutureLevelGraph(props: FutureLevelGraphType) {
  const thisLevel = LEVEL_SYSTEM[props.level - 1];

  return (
    <Graph>
      <Graph.SymbolText symbolStack={props.symbolStack} />
      <Graph.Description>
        아직 10분 토큰이 부족해요.
        <br />
        조금만 더 노력하면 {thisLevel.label}를 볼 수 있어요!
      </Graph.Description>
    </Graph>
  );
}

export default FutureLevelGraph;
