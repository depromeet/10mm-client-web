import { useRouter, useSearchParams } from 'next/navigation';
import { useFollowMembers } from '@/apis/follow';
import UserProfile from '@/app/home/UserProfile';
import { type FollowDataState } from '@/app/page';
import MotionDiv from '@/components/Motion/MotionDiv';
import { flex } from '@/styled-system/patterns';

import ProfileItem from './ProfileItem';

function FollowList() {
  const { data } = useFollowMembers();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') ? Number(searchParams.get('id')) : null;

  const onChangeFollowData = (props: FollowDataState) => {
    if (props === null) {
      router.push('/');
      return;
    }
    router.push('/?id=' + props.followId);
  };

  return (
    <section className={containerCss}>
      <UserProfile selected={id === null} onClick={onChangeFollowData} />
      {data &&
        data.map((profile) => (
          <MotionDiv key={profile.memberId}>
            <ProfileItem
              id={profile.memberId}
              onClick={onChangeFollowData}
              url={profile.profileImageUrl}
              name={profile.nickname}
              selected={id === profile.memberId}
            />
          </MotionDiv>
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
