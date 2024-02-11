'use client';
import { useFeedMe } from '@/apis/feed';
import FeedItem, { FeedSkeletonItem } from '@/app/feed/FeedItem';
import Empty from '@/components/Empty/Empty';
import { ROUTER } from '@/constants/router';
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

  if (data.length === 0) {
    return (
      <div className={emptyFeedCss}>
        <Empty
          type={'suggest'}
          image={'docs'}
          link={ROUTER.SEARCH.HOME}
          title={'피드가 없습니다.'}
          buttonText={'친구 찾기'}
          description={'친구를 팔로우하고 피드를 받아볼까요?'}
        />
      </div>
    );
  }

  return (
    <ul className={feedListCss}>
      {data.map((feed) => (
        <FeedItem key={feed.recordId} {...feed} />
      ))}
    </ul>
  );
}

export default FeedList;

const emptyFeedCss = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 200px)',
});

const feedListCss = css({
  padding: '0 16px 132px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});
