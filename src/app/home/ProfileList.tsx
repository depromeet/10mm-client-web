import { useFollowId } from '@/app/home/FollowIdProvider';
import UserProfile from '@/app/home/UserProfile';
import { flex } from '@/styled-system/patterns';

import ProfileItem from './ProfileItem';

const uerProfiles: {
  id: number;
  name: string;
}[] = [
  {
    id: 1,
    name: '김민재',
  },
  {
    id: 2,
    name: '김민재2',
  },
];

function ProfileList() {
  const { followId, setFollowId } = useFollowId();

  return (
    <section className={containerCss}>
      <UserProfile />
      {uerProfiles.map((profile) => (
        <ProfileItem
          key={profile.id}
          id={profile.id}
          onClick={setFollowId}
          name={profile.name}
          selected={followId === profile.id}
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
