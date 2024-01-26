import { useGetMembersMe } from '@/apis/member';
import ProfileItem from '@/app/home/ProfileItem';
import { type FollowDataState } from '@/app/page';

interface UserProfileProps {
  selectedData: FollowDataState;
  onClick: (props: FollowDataState) => void;
}

function UserProfile({ selectedData, onClick }: UserProfileProps) {
  const { data } = useGetMembersMe();

  const onClickProfile = () => {
    onClick(null);
  };

  return (
    <ProfileItem
      id={null}
      name={'나'}
      url={data?.profileImageUrl}
      onClick={onClickProfile}
      selected={selectedData === null}
    />
  );
}

export default UserProfile;
