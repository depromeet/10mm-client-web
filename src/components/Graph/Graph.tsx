import { type GraphType } from '@/components/Graph/Graph.types';
import PastLevelGraph from '@/components/Graph/PastLevelGraph';
import PresentLevelGraph from '@/components/Graph/PresentLevelGraph';

function Graph(props: GraphType) {
  switch (props.status) {
    case 'past-level':
      return <PastLevelGraph {...props} />;
    case 'present-level':
      return <PresentLevelGraph {...props} />;
    default:
      return <div></div>;
  }
}

export default Graph;
