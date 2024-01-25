import { useFollowMembers } from '@/apis/follow';
import UserProfile from '@/app/home/UserProfile';
import { flex } from '@/styled-system/patterns';

import ProfileItem from './ProfileItem';

interface ProfileListProps {
  selectedFollowId: number | null;
  onChangeFollowId: (id: number | null) => void;
}

function ProfileList({ selectedFollowId, onChangeFollowId }: ProfileListProps) {
  const { data } = useFollowMembers();
  return (
    <section className={containerCss}>
      <UserProfile selectedId={selectedFollowId} onClick={onChangeFollowId} />
      {data &&
        data.map((profile) => (
          <ProfileItem
            key={profile.memberId}
            id={profile.memberId}
            onClick={onChangeFollowId}
            url={profile.profileImageUrl}
            name={profile.nickname}
            selected={selectedFollowId === profile.memberId}
          />
        ))}
    </section>
  );
}

export default ProfileList;

const containerCss = flex({
  overflowY: 'auto',
  padding: '16px 0',
  paddingBottom: '20px',
  gap: '12px',
  alignItems: 'stretch',
  margin: '0 16px',
  _scrollbar: {
    display: 'none',
  },
});
