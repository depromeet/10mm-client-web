import { type GetServerSidePropsContext } from 'next';
import { useFetFollowList } from '@/apis/follow';
import Header from '@/components/Header/Header';
import FullTab from '@/components/Tab/FullTab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { ROUTER } from '@/constants/router';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import FollowingList from '@/pages/profile/[id]/follows/FollowingList';
import { useGetMeId } from '@/pages/profile/[id]/follows/index.hooks';
import MyFollowerList from '@/pages/profile/[id]/follows/MyFollowerList';
import { css } from '@/styled-system/css';

type FollowTabType = 'following' | 'follower';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      params: { id: context.query.id },
    },
  };
}

function FollowListPage({ params }: { params: { id: string } }) {
  const currentMemberId = Number(params.id);

  const { data, refetch, isLoading, isFetching } = useFetFollowList(Number(params.id));

  const { tabs, activeTab, onTabClick } = useFollowTab(currentMemberId);

  const myId = useGetMeId();
  const isMyFollowList = myId === currentMemberId;

  if (isLoading) return <div></div>; // 스켈레톤 고민해보기

  return (
    <div>
      <Header rightAction="none" title={data?.targetNickname} className={headerCss} />
      <FullTab
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={(tab) => {
          onTabClick(tab);
        }}
      />
      {/* 내 팔로잉/팔로우 */}
      {isMyFollowList &&
        (activeTab === 'following' ? (
          <FollowingList
            key="my-following"
            list={data?.followingList ?? []}
            refetch={refetch}
            isFetching={isFetching}
          />
        ) : (
          <MyFollowerList key="my-follower" list={data?.followerList ?? []} refetch={refetch} />
        ))}
      {/* 다른 사람 팔로잉/팔로우 */}
      {!isMyFollowList &&
        (activeTab === 'following' ? (
          <FollowingList
            key={`${currentMemberId}-following`}
            list={data?.followingList ?? []}
            refetch={refetch}
            isFetching={isFetching}
          />
        ) : (
          <FollowingList
            key={`${currentMemberId}-follower`}
            list={data?.followerList ?? []}
            refetch={refetch}
            isFetching={isFetching}
          />
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

const useFollowTab = (memberId: number) => {
  const { searchParams } = useSearchParamsTypedValue<FollowTabType>('tab');
  const initTabId = searchParams ?? 'following';

  const { data } = useFetFollowList(memberId);

  const followingCount = data?.followingList.length ?? '';
  const followerCount = data?.followerList.length ?? '';

  const _tabs = [
    {
      id: 'following',
      tabName: `팔로잉 ${followingCount}`,
      href: ROUTER.PROFILE.FOLLOW_LIST(memberId, 'following'),
    },
    {
      id: 'follower',
      tabName: `팔로워 ${followerCount}`,
      href: ROUTER.PROFILE.FOLLOW_LIST(memberId, 'follower'),
    },
  ];

  return useTab(_tabs, initTabId);
};
