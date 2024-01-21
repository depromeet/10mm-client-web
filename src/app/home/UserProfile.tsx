import { useGetMembersMe } from '@/apis/member';
import ProfileItem from '@/app/home/ProfileItem';

function UserProfile({ selected, onClick }: { selected: boolean; onClick: (id: number) => void }) {
  const { data } = useGetMembersMe();
  return <ProfileItem id={-1} name={'나'} url={data?.profileImageUrl} onClick={onClick} selected={selected} />;
}

export default UserProfile;
