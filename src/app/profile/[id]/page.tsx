'use client';

import { FollowStatus, useFollowsCountTargetId } from '@/apis/follow';
import { useGetMembersById } from '@/apis/member';
import { useGetMissionStack } from '@/apis/mission';
import ProfileMissionList from '@/app/mypage/MyProfileMissionList';
import FollowButton from '@/app/profile/[id]/FollowButton';
import ProfileContent from '@/app/profile/[id]/ProfileContent';
import BottomDim from '@/components/BottomDim/BottomDim';
import Header from '@/components/Header/Header';
import Tab from '@/components/Tab/Tab';
import { css } from '@styled-system/css';

function FollowProfilePage({ params }: { params: { id: string } }) {
  const { data: followCountData } = useFollowsCountTargetId(Number(params.id));
  const { data } = useGetMembersById(Number(params.id));
  const { data: symbolStackData } = useGetMissionStack(params.id);

  return (
    <main className={backgroundCss}>
      <Header rightAction={'none'} headerBgColor={'transparent'} iconColor={'icon.primary'} />
      <ProfileContent
        nickname={data?.nickname || ''}
        followingCount={followCountData?.followingCount || 0}
        followerCount={followCountData?.followerCount || 0}
        profileImageUrl={data?.profileImageUrl || null}
        symbolStack={symbolStackData?.symbolStack || 0}
        rightElement={
          <FollowButton
            followStatus={followCountData?.followStatus || FollowStatus.NOT_FOLLOWING}
            memberId={Number(params.id)}
          />
        }
      >
        <div className={tabWrapper}>
          <Tab tabs={tabs} activeTab={'mission-list'} />
        </div>
        <ProfileMissionList id={Number(params.id)} />
      </ProfileContent>
      <div className={dimCss} />
      <BottomDim />
    </main>
  );
}

export default FollowProfilePage;

const tabs = [
  {
    tabName: '미션 목록',
    id: 'mission-list',
  },
];

const tabWrapper = css({
  margin: '20px 0',
  padding: '16px 16px 0 16px',
});

const backgroundCss = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  background: 'gradients.primary',
});

const dimCss = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.15) 100%)',
  top: 0,
  zIndex: 1,
});
