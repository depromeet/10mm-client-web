import CategoryListItem from '@/components/List/CategoryListItem';
import {
  type CategoryListItemType,
  type ListItemType,
  type MissionListItemType,
  type ProfileFollowerListItemType,
  type ProfileListItemType,
} from '@/components/List/List.types';
import MissionListItem from '@/components/List/MissionListItem';
import ProfileFollowerListItem from '@/components/List/ProfileFollowerListItem';
import ProfileListItem from '@/components/List/ProfileListItem';

function List(props: ListItemType) {
  switch (props.type) {
    case 'category':
      return <CategoryListItem {...(props as CategoryListItemType)} />;
    case 'mission':
      return <MissionListItem {...(props as MissionListItemType)} />;
    case 'profile':
      return <ProfileListItem {...(props as ProfileListItemType)} />;
    case 'profile-follower':
      return <ProfileFollowerListItem {...(props as ProfileFollowerListItemType)} />;
  }
}

export default List;
