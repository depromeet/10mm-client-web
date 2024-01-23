import { useFollowNickname } from '@/app/home/FollowNicknameProvider';
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
  const { followNickname, setFollowNickname } = useFollowNickname();

  return (
    <section className={containerCss}>
      <UserProfile />
      {uerProfiles.map((profile) => (
        <ProfileItem
          key={profile.id}
          onClick={setFollowNickname}
          name={profile.name}
          selected={followNickname === profile.name}
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
