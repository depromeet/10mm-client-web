import { useGetMembersMe } from '@/apis/member';
import { useFollowNickname } from '@/app/home/FollowNicknameProvider';
import ProfileItem from '@/app/home/ProfileItem';

function UserProfile() {
  const { data } = useGetMembersMe();
  const { followNickname, setFollowNickname } = useFollowNickname();

  const onClickProfile = () => {
    setFollowNickname(null);
  };

  return (
    <ProfileItem name={'나'} url={data?.profileImageUrl} onClick={onClickProfile} selected={followNickname === null} />
  );
}

export default UserProfile;
