'use client';

import { useFetFollowList } from '@/apis/follow';
import { useGetMembersMe } from '@/apis/member';
import FollowingList from '@/app/profile/[id]/follows/FollowingList';
import MyFollowerList from '@/app/profile/[id]/follows/MyFollowerList';
import Header from '@/components/Header/Header';
import FullTab from '@/components/Tab/FullTab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { ROUTER } from '@/constants/router';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { css } from '@/styled-system/css';

type FollowTabType = 'following' | 'follower';
function FollowListPage({ params }: { params: { id: string } }) {
  const { searchParams } = useSearchParamsTypedValue<FollowTabType>('tab');
  const initTabId = searchParams ?? 'following';

  const currentMemberId = Number(params.id);

  const { data, refetch, isLoading } = useFetFollowList(Number(params.id));

  const followingCount = data?.followingList.length ?? '';
  const followerCount = data?.followerList.length ?? '';

  const _tabs = [
    {
      id: 'following',
      tabName: `팔로잉 ${followingCount}`,
      href: ROUTER.PROFILE.FOLLOW_LIST(currentMemberId, 'following'),
    },
    {
      id: 'follower',
      tabName: `팔로워 ${followerCount}`,
      href: ROUTER.PROFILE.FOLLOW_LIST(currentMemberId, 'follower'),
    },
  ];

  const { tabs, activeTab, onTabClick } = useTab(_tabs, initTabId);

  const myId = useGetMeId();
  const isMyself = myId === currentMemberId;

  if (isLoading) return <div></div>; // 스켈레톤 고민해보기

  return (
    <div>
      <Header rightAction="none" title={data?.targetNickname} className={headerCss} />
      <FullTab tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      {/* 내 팔로잉/팔로우 */}
      {isMyself &&
        (activeTab === 'following' ? (
          <FollowingList key="my-following" list={data?.followingList ?? []} refetch={refetch} />
        ) : (
          <MyFollowerList key="my-follower" list={data?.followerList ?? []} refetch={refetch} />
        ))}
      {/* 다른 사람 팔로잉/팔로우 */}
      {!isMyself &&
        (activeTab === 'following' ? (
          <FollowingList key={`${currentMemberId}-following`} list={data?.followingList ?? []} refetch={refetch} />
        ) : (
          <FollowingList key={`${currentMemberId}-follower`} list={data?.followerList ?? []} refetch={refetch} />
        ))}
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

const useGetMeId = () => {
  const { data } = useGetMembersMe();
  const memberId = data?.memberId ?? 0;
  return memberId;
};
