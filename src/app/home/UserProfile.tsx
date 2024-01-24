import { useGetMembersMe } from '@/apis/member';
import { useFollowId } from '@/app/home/FollowIdProvider';
import ProfileItem from '@/app/home/ProfileItem';

function UserProfile() {
  const { data } = useGetMembersMe();
  const { followId, setFollowId } = useFollowId();

  const onClickProfile = () => {
    setFollowId(null);
  };

  return (
    <ProfileItem
      id={null}
      name={'나'}
      url={data?.profileImageUrl}
      onClick={onClickProfile}
      selected={followId === null}
    />
  );
}

export default UserProfile;
