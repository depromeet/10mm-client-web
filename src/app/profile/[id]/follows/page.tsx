'use client';

import { useFetFollowList } from '@/apis/follow';
import FollowerList from '@/app/profile/[id]/follows/List';
import Header from '@/components/Header/Header';
import FullTab from '@/components/Tab/FullTab';
import { useTab } from '@/components/Tab/Tab.hooks';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { css } from '@/styled-system/css';

type TabType = 'following' | 'follower';
function FollowListPage({ params }: { params: { id: string } }) {
  const { searchParams } = useSearchParamsTypedValue<TabType>('tab');
  const initTabId = searchParams ?? 'following';

  const { data, isPending, refetch } = useFetFollowList(Number(params.id));

  const followingCount = data?.followingList.length;
  const followerCount = data?.followerList.length;

  const { tabs, activeTab, onTabClick } = useTab(
    [
      {
        id: 'following',
        tabName: `팔로잉 ${followingCount}`,
      },
      {
        id: 'follower',
        tabName: `팔로워 ${followerCount}`,
      },
    ],
    initTabId,
  );

  const viewList = activeTab === 'following' ? data?.followingList : data?.followerList;

  if (isPending) return <div></div>; // 스켈레톤 고민해보기

  return (
    <div>
      <Header rightAction="none" title={data?.targetNickname} className={headerCss} />
      <FullTab tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      <FollowerList list={viewList ?? []} refetch={refetch} />
    </div>
  );
}

export default FollowListPage;

const headerCss = css({
  '& h2': {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    textStyle: 'subtitle1',
  },
});
