import { type FeedVisibilityType } from '@/apis/feed';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import FeedList from '@/pages/feed/FeedList';
import { css, cx } from '@/styled-system/css';
import { fixedPositionCss } from '@/styles/position';

const FEED_TABS: { id: FeedVisibilityType; tabName: string }[] = [
  {
    id: 'ALL',
    tabName: '전체',
  },
  {
    id: 'FOLLOWER',
    tabName: '팔로워',
  },
];

function FeedSection() {
  const tabProps = useTab(FEED_TABS, 'FOLLOWER');

  // const { data, isLoading } = useGetFeedList(tabProps.activeTab as FeedVisibilityType);
  // const feeds = data?.filter((feed) => feed.recordImageUrl); // 이미지 없는 경우가 있음. 나중에 리팩토링 + 서버와 이야기, FeedItem에 ErrorBoundary 적용해도 좋을 듯.

  // // NOTE: 초기에 팔로워의 피드가 없는 상태라면, 전체 피드로 변경
  // useEffect(() => {
  //   if (!isLoading) {
  //     if (feeds?.length === 0) {
  //       tabProps.onTabClick(FEED_TABS[0]);
  //     }
  //   }
  // }, [isLoading]);

  // useShowGuide(GUIDE_KEY.ALL_FEED_OPEN, 'appBar');
  // TODO : 팔로워 피드 없을 때 전체 피드 유도 가이드

  return (
    <div>
      <div className={cx(fixedPositionCss, tabWrapperCss)}>
        <Tab {...tabProps} />
      </div>
      <div className={blankCss} />
      <FeedList activeTab={tabProps.activeTab as FeedVisibilityType} />
    </div>
  );
}

export default FeedSection;

const tabWrapperCss = css({
  padding: '16px 16px 4px 16px',
  backgroundColor: 'bg.surface2',
  zIndex: 1,
});

const blankCss = css({
  height: '50px',
});
