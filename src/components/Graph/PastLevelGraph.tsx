import { type PastLabelGraphType } from '@/components/Graph/Graph.types';
import Graph from '@/components/Graph/GraphBase';

function PastLevelGraph(props: PastLabelGraphType) {
  return (
    <Graph>
      <Graph.SymbolText symbolStack={props.symbolStack} />
      {/* TODO : progress bar label이 필요한지 확인 필요 to 디자이너 */}
      <Graph.ProgressBar isFull />
      <Graph.Description>레벨업에 성공했어요!!</Graph.Description>
    </Graph>
  );
}

export default PastLevelGraph;
