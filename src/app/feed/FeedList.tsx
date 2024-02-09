'use client';
import { useFeed } from '@/apis/feed';
import FeedItem from '@/app/feed/FeedItem';
import { css } from '@styled-system/css';

function FeedList() {
  const { data } = useFeed();
  if (!data) return <div>Loading...</div>;

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
