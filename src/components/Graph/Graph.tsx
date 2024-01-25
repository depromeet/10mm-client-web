import FutureLevelGraph from '@/components/Graph/FutureLevelGraph';
import { type GraphType } from '@/components/Graph/Graph.types';
import LastLevelGraph from '@/components/Graph/LastLevelGraph';
import PastLevelGraph from '@/components/Graph/PastLevelGraph';
import PresentLevelGraph from '@/components/Graph/PresentLevelGraph';

function Graph(props: GraphType) {
  switch (props.status) {
    case 'past-level':
      return <PastLevelGraph {...props} />;
    case 'present-level':
      return <PresentLevelGraph {...props} />;
    case 'future-level':
      return <FutureLevelGraph {...props} />;
    case 'last-level':
      return <LastLevelGraph {...props} />;
    default:
      return <div></div>;
  }
}

export default Graph;
