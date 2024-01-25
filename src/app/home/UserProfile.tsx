import { useGetMembersMe } from '@/apis/member';
import ProfileItem from '@/app/home/ProfileItem';

interface UserProfileProps {
  selectedId: number | null;
  onClick: (id: number | null) => void;
}

function UserProfile({ selectedId, onClick }: UserProfileProps) {
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
      selected={selectedId === null}
    />
  );
}

export default UserProfile;
