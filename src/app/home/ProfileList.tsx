import { useFollowMembers } from '@/apis/follow';
import { useFollowId } from '@/app/home/FollowIdProvider';
import UserProfile from '@/app/home/UserProfile';
import { flex } from '@/styled-system/patterns';

import ProfileItem from './ProfileItem';

function ProfileList() {
  const { followId, setFollowId } = useFollowId();
  const { data } = useFollowMembers();

  return (
    <section className={containerCss}>
      <UserProfile />

      {data &&
        data.length !== 0 &&
        data.map((profile) => (
          <ProfileItem
            key={profile.memberId}
            id={profile.memberId}
            onClick={setFollowId}
            url={profile.profileImageUrl}
            name={profile.nickname}
            selected={followId === profile.memberId}
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
