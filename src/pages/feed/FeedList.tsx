import { type FeedVisibilityType, useInfiniteFeedList } from '@/apis/feed';
import Empty from '@/components/Empty/Empty';
import { ROUTER } from '@/constants/router';
import useIntersect from '@/hooks/useIntersect';
import FeedItem, { FeedSkeletonItem } from '@/pages/feed/FeedItem';
import { css } from '@styled-system/css';

interface Props {
  activeTab: FeedVisibilityType;
}

function FeedList({ activeTab }: Props) {
  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } = useInfiniteFeedList({
    visibility: activeTab,
    size: 5,
  });

  const list = data?.content?.filter((feed) => feed.recordImageUrl); // 이미지 없는 경우가 있음. 나중에 리팩토링 + 서버와 이야기, FeedItem에 ErrorBoundary 적용해도 좋을 듯.

  const targetRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  if (!data || isLoading) return <FeedListSkeleton />;

  if (list?.length === 0) {
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
      {list?.map((feed) => <FeedItem key={feed.recordId} {...feed} />)}
      <div className={observerCss} ref={targetRef} />
    </ul>
  );
}

export default FeedList;

function FeedListSkeleton() {
  return (
    <ul className={feedListCss}>
      <FeedSkeletonItem />
      <FeedSkeletonItem />
      <FeedSkeletonItem />
    </ul>
  );
}

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

const observerCss = css({
  height: '1px',
});
