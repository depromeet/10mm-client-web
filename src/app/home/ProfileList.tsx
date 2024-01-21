import UserProfile from '@/app/home/UserProfile';
import { flex } from '@/styled-system/patterns';

import ProfileItem from './ProfileItem';

const uerProfiles = [
  {
    name: '변수미칩',
    id: 1,
  },
  {
    name: '도모',
    id: 2,
  },
  {
    name: '당근조이',
    id: 3,
  },
  {
    name: '당근조이1',
    id: 4,
  },
  {
    name: '당근조이2',
    id: 5,
  },
  {
    name: '당근조이3',
    id: 6,
  },
  {
    name: '당근조이4',
    id: 7,
  },
];

function ProfileList({
  selectedProfile,
  onClickProfile,
}: {
  selectedProfile: number;
  onClickProfile: (id: number) => void;
}) {
  return (
    <section className={containerCss}>
      <UserProfile onClick={onClickProfile} selected={selectedProfile === -1} />
      {uerProfiles.map((profile) => (
        <ProfileItem
          key={profile.id}
          onClick={onClickProfile}
          id={profile.id}
          name={profile.name}
          selected={selectedProfile === profile.id}
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
