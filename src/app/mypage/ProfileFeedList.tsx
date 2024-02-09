import Link from 'next/link';
import { useFeedByMemberId } from '@/apis/feed';
import ProfileFeedItem, { ProfileFeedItemSkeleton } from '@/app/mypage/ProfileFeedItem';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

function ProfileFeedList({ memberId, isMySelf }: { memberId: number; isMySelf: boolean }) {
  const { data } = useFeedByMemberId(memberId);
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
        <Link key={feed.recordId} href={getHref(feed.recordId.toString(), isMySelf)}>
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
