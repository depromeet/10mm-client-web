'use client';

import { useFollowsCountTargetId } from '@/apis/follow';
import { useGetMembersById, useGetMembersMe } from '@/apis/member';
import { useGetMissionStack } from '@/apis/mission';
import { FollowStatus } from '@/apis/schema/member';
import ProfileTab from '@/app/mypage/ProfileTab';
import FollowButton from '@/app/profile/[id]/FollowButton';
import ProfileContent from '@/app/profile/[id]/ProfileContent';
import BottomDim from '@/components/BottomDim/BottomDim';
import Header from '@/components/Header/Header';
import { css } from '@styled-system/css';

function FollowProfilePage({ params }: { params: { id: string } }) {
  const { data: followCountData, isFetching } = useFollowsCountTargetId(Number(params.id));
  const { data } = useGetMembersById(Number(params.id));
  const { data: symbolStackData } = useGetMissionStack(params.id);
  const { data: memebersMeData } = useGetMembersMe();
  const isMyself = memebersMeData?.memberId === Number(params.id);
  return (
    <main className={backgroundCss}>
      <Header rightAction={'none'} headerBgColor={'transparent'} iconColor={'icon.primary'} />
      <ProfileContent
        memberId={Number(params.id)}
        nickname={data?.nickname || ''}
        followingCount={followCountData?.followingCount || 0}
        followerCount={followCountData?.followerCount || 0}
        profileImageUrl={data?.profileImageUrl || null}
        symbolStack={symbolStackData?.symbolStack || 0}
        isFollow={true}
        rightElement={
          !isMyself ? (
            <FollowButton
              followStatus={followCountData?.followStatus || FollowStatus.NOT_FOLLOWING}
              memberId={Number(params.id)}
              isFetching={isFetching}
            />
          ) : null
        }
      >
        <ProfileTab memberId={Number(params.id)} />
      </ProfileContent>
      <div className={profileBackgroundDimCss} />
      <BottomDim type={'bottomDim2'} />
    </main>
  );
}

export default FollowProfilePage;

const backgroundCss = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  background: 'gradients.primary',
});

const profileBackgroundDimCss = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.15) 100%)',
  top: 0,
  zIndex: 1,
});
