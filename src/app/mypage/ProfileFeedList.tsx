import Link from 'next/link';
import { useFeedByMemberId } from '@/apis/feed';
import ProfileFeedItem from '@/app/mypage/ProfileFeedItem';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

function ProfileFeedList({ memberId, isMySelf }: { memberId: number; isMySelf: boolean }) {
  const { data } = useFeedByMemberId(memberId);

  const getHref = (recordId: string) => {
    if (isMySelf) {
      return ROUTER.RECORD.DETAIL.HOME(recordId);
    }
    return ROUTER.RECORD.DETAIL.FOLLOW(recordId);
  };

  return (
    <ul className={feedListCss}>
      {data?.map((feed) => (
        <Link key={feed.recordId} href={getHref(feed.recordId.toString())}>
          <ProfileFeedItem {...feed} />
        </Link>
      ))}
    </ul>
  );
}

export default ProfileFeedList;

const feedListCss = css({
  display: 'grid',
  padding: '0 0 132px 0',
  columnGap: '12px',
  rowGap: '20px',
  gridTemplateColumns: '1fr 1fr',
});
