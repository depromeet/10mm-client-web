import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFollowMembers } from '@/apis/follow';
import UserProfile from '@/app/home/FollowList/UserProfile';
import { type FollowDataState } from '@/app/page';
import Icon from '@/components/Icon';
import MotionDiv from '@/components/Motion/MotionDiv';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
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
      <Link href={ROUTER.SEARCH.HOME} className={plusWrapperCss}>
        <Icon name="plus" size={18} color="purple.purple400" />
      </Link>
    </section>
  );
}

export default FollowList;

const containerCss = flex({
  overflowY: 'auto',
  padding: '16px 16px 20px',
  gap: '12px',
  alignItems: 'stretch',
  _scrollbar: {
    display: 'none',
  },
});

const plusWrapperCss = css({
  backgroundColor: 'purple.purple000',
  width: '28px',
  height: '28px',
  borderRadius: '12px',
  flex: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '28px',
  marginTop: '12px',
});
