'use client';

import { useFollowsCountTargetId } from '@/apis/follow';
import ProfileMissionList from '@/app/mypage/MyProfileMissionList';
import ProfileContent from '@/app/profile/[id]/ProfileContent';
import BottomDim from '@/components/BottomDim/BottomDim';
import GradientTextButton from '@/components/Button/GradientTextButton';
import Header from '@/components/Header/Header';
import Tab from '@/components/Tab/Tab';
import { css } from '@styled-system/css';

function FollowProfilePage({ params }: { params: { id: string } }) {
  const { data: followCountData } = useFollowsCountTargetId(Number(params.id));
  return (
    <main className={backgroundCss}>
      <Header rightAction={'none'} headerBgColor={'transparent'} iconColor={'icon.primary'} />
      <ProfileContent
        nickname={'123123'}
        followingCount={followCountData?.followingCount || 0}
        followerCount={followCountData?.followerCount || 0}
        profileImageUrl={null}
        symbolStack={0}
        rightElement={<GradientTextButton>팔로우</GradientTextButton>}
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
