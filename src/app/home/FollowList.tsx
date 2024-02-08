import { useRouter, useSearchParams } from 'next/navigation';
import { useFollowMembers } from '@/apis/follow';
import UserProfile from '@/app/home/UserProfile';
import { type FollowDataState } from '@/app/page';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { flex } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';

import ProfileItem from './ProfileItem';

function FollowList() {
  const { data } = useFollowMembers();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') ? Number(searchParams.get('id')) : null;

  const onChangeFollowData = (props: FollowDataState) => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.HOME, EVENT_LOG_NAME.HOME.CLICK_FOLLOW_LIST, {
      memberId: props ? props.followId : 'me',
    });
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
          <ProfileItem
            key={profile.memberId}
            id={profile.memberId}
            onClick={onChangeFollowData}
            url={profile.profileImageUrl}
            name={profile.nickname}
            selected={id === profile.memberId}
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
