'use client';
import { useFeedMe } from '@/apis/feed';
import FeedItem, { FeedSkeletonItem } from '@/app/feed/FeedItem';
import { css } from '@styled-system/css';

function FeedList() {
  const { data } = useFeedMe();
  if (!data)
    return (
      <ul className={feedListCss}>
        <FeedSkeletonItem />
        <FeedSkeletonItem />
      </ul>
    );

  return (
    <ul className={feedListCss}>
      {data.map((feed) => (
        <FeedItem key={feed.recordId} {...feed} />
      ))}
    </ul>
  );
}

export default FeedList;

const feedListCss = css({
  padding: '0 16px 132px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});
