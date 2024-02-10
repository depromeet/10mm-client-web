import Link from 'next/link';
import { useFeedByMemberId } from '@/apis/feed';
import ProfileFeedItem, { ProfileFeedItemSkeleton } from '@/app/mypage/ProfileFeedItem';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';

function ProfileFeedList({ memberId, isMySelf }: { memberId: number; isMySelf: boolean }) {
  const { data } = useFeedByMemberId(memberId);

  const handleClickFeedItem = () => {
    eventLogger.logEvent(EVENT_LOG_CATEGORY.FOLLOW_PROFILE, EVENT_LOG_NAME.FOLLOW_PROFILE.CLICK_PROFILE_FEED, {
      isMySelf,
      memberId,
    });
  };

  if (!data)
    return (
      <ul className={feedListCss}>
        <ProfileFeedItemSkeleton />
        <ProfileFeedItemSkeleton />
      </ul>
    );
  return (
    <ul className={feedListCss}>
      {data?.map((feed) => (
        <Link onClick={handleClickFeedItem} key={feed.recordId} href={getHref(feed.recordId.toString(), isMySelf)}>
          <ProfileFeedItem {...feed} />
        </Link>
      ))}
    </ul>
  );
}

export default ProfileFeedList;

const getHref = (recordId: string, isMySelf: boolean) => {
  if (isMySelf) {
    return ROUTER.RECORD.DETAIL.HOME(recordId);
  }
  return ROUTER.RECORD.DETAIL.FOLLOW(recordId);
};

const feedListCss = css({
  display: 'grid',
  padding: '0 0 132px 0',
  columnGap: '12px',
  rowGap: '20px',
  gridTemplateColumns: '1fr 1fr',
});
