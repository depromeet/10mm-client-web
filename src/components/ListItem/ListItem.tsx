import CategoryListItem from '@/components/ListItem/CategoryListItem';
import {
  type CategoryListItemType,
  type ListItemType,
  type MissionListItemType,
  type ProfileFollowerListItemType,
  type ProfileListItemType,
} from '@/components/ListItem/ListItem.types';
import MissionListItem from '@/components/ListItem/MissionListItem';
import ProfileFollowerListItem from '@/components/ListItem/ProfileFollowerListItem';
import ProfileListItem from '@/components/ListItem/ProfileListItem';

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
