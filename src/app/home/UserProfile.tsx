import { useGetMembersMe } from '@/apis/member';
import { useProfileId } from '@/app/home/ProfileIdProvider';
import ProfileItem from '@/app/home/ProfileItem';

function UserProfile() {
  const { data } = useGetMembersMe();
  const { profileId, setProfileId } = useProfileId();

  const onClickProfile = () => {
    setProfileId(null);
  };

  return (
    <ProfileItem
      id={null}
      name={'나'}
      url={data?.profileImageUrl}
      onClick={onClickProfile}
      selected={profileId === null}
    />
  );
}

export default UserProfile;
