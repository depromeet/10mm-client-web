'use client';
import { useFeed } from '@/apis/feed';
import FeedItem from '@/app/feed/FeedItem';
import { css } from '@styled-system/css';

function FeedList() {
  const { data } = useFeed();
  if (!data) return <div>Loading...</div>;

  return (
    <ul className={feedListCss}>
      {data.map((feed, index) => (
        <FeedItem key={feed.recordId + index} {...feed} />
      ))}
      <div className={blockCss} />
    </ul>
  );
}

export default FeedList;

const feedListCss = css({
  padding: '0 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

const blockCss = css({ height: '132px' });
