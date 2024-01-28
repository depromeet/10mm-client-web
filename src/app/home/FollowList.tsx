import { useFollowMembers } from '@/apis/follow';
import UserProfile from '@/app/home/UserProfile';
import { type FollowDataState } from '@/app/page';
import { flex } from '@/styled-system/patterns';

import ProfileItem from './ProfileItem';

interface ProfileListProps {
  selectedFollowData: FollowDataState;
  onChangeFollowData: (props: FollowDataState) => void;
}

function FollowList({ selectedFollowData, onChangeFollowData }: ProfileListProps) {
  const { data } = useFollowMembers();
  return (
    <section className={containerCss}>
      <UserProfile selectedData={selectedFollowData} onClick={onChangeFollowData} />
      {data &&
        data.map((profile) => (
          <ProfileItem
            key={profile.memberId}
            id={profile.memberId}
            onClick={onChangeFollowData}
            url={profile.profileImageUrl}
            name={profile.nickname}
            selected={selectedFollowData?.followId === profile.memberId}
          />
        ))}
    </section>
  );
}

export default FollowList;

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
