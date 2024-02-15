import MissionEmptyList from './Empty';
import MissionItem from './Item';
import MissionLinkItem from './LinkItem';
import MissionListContainer from './ListContainer';
import MissionListSkeleton from './Skeleton';

export default Object.assign(MissionListContainer, {
  Container: MissionListContainer,
  item: MissionItem,
  LinkItem: MissionLinkItem,
  Empty: MissionEmptyList,
  Skeleton: MissionListSkeleton,
});
