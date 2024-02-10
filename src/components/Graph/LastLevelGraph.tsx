import { type LastLevelGraphType } from '@/components/Graph/Graph.types';
import Graph from '@/components/Graph/GraphBase';
import { LEVEL_SYSTEM } from '@/constants/level';

function LastLevelGraph(props: LastLevelGraphType) {
  const lastLevel = LEVEL_SYSTEM[LEVEL_SYSTEM.length - 1];

  return (
    <Graph>
      <Graph.SymbolText symbolStack={props.symbolStack} />
      {/* TODO : progress bar label이 필요한지 확인 필요 to 디자이너 */}
      <Graph.ProgressBar isFull min={lastLevel.min} />
      <Graph.Description>레벨업에 성공했어요!!</Graph.Description>
    </Graph>
  );
}

export default LastLevelGraph;
