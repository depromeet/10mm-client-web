import CategoryListItem from '@/components/List/CategoryListItem';
import { type CategoryListItemType, type ListItemType, type MissionListItemType } from '@/components/List/List.types';
import MissionListItem from '@/components/List/MissionListItem';

function List(props: ListItemType) {
  switch (props.type) {
    case 'category':
      return <CategoryListItem {...(props as CategoryListItemType)} />;
    case 'mission':
      return <MissionListItem {...(props as MissionListItemType)} />;
  }
}

export default List;
