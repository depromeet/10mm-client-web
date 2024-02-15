'use client';

import { type FeedVisibilityType, useGetFeedList } from '@/apis/feed';
import FeedList from '@/app/feed/FeedList';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { css } from '@/styled-system/css';

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
  const tabProps = useTab(FEED_TABS);

  const { data: data } = useGetFeedList(tabProps.activeTab as FeedVisibilityType);

  const feeds = data?.filter((feed) => feed.recordImageUrl); // 이미지 없는 경우가 있음. 나중에 리팩토링 + 서버와 이야기, FeedItem에 ErrorBoundary 적용해도 좋을 듯.

  return (
    <div>
      <div className={tabWrapperCss}>
        <Tab {...tabProps} />
      </div>
      <FeedList data={feeds} />
    </div>
  );
}

export default FeedSection;

const tabWrapperCss = css({
  padding: '16px 16px 4px 16px',
});
