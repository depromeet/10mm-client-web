'use client';

import { useEffect } from 'react';
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
  const tabProps = useTab(FEED_TABS, 'FOLLOWER');

  const { data, isLoading } = useGetFeedList(tabProps.activeTab as FeedVisibilityType);
  const feeds = data?.filter((feed) => feed.recordImageUrl); // 이미지 없는 경우가 있음. 나중에 리팩토링 + 서버와 이야기, FeedItem에 ErrorBoundary 적용해도 좋을 듯.

  // NOTE: 초기에 팔로워의 피드가 없는 상태라면, 전체 피드로 변경
  useEffect(() => {
    if (!isLoading) {
      if (feeds?.length === 0) {
        tabProps.onTabClick(FEED_TABS[0]);
      }
    }
  }, [isLoading]);

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
