import { useGetMembersMe } from '@/apis/member';
import ProfileItem from '@/pages/home/FollowList/ProfileItem';
import { type FollowDataState } from '@/pages/index.page';

interface UserProfileProps {
  selected: boolean;
  onClick: (props: FollowDataState) => void;
}

function UserProfile({ selected, onClick }: UserProfileProps) {
  const { data } = useGetMembersMe();

  const onClickProfile = () => {
    onClick(null);
  };

  return <ProfileItem id={null} name={'나'} url={data?.profileImageUrl} onClick={onClickProfile} selected={selected} />;
}

export default UserProfile;
