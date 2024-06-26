import { type GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';
import { useFollowsCountTargetId } from '@/apis/follow';
import { useGetMembersById, useGetMembersMe } from '@/apis/member';
import { useGetMissionStack } from '@/apis/mission';
import { FollowStatus } from '@/apis/schema/member';
import BottomDim from '@/components/BottomDim/BottomDim';
import Header from '@/components/Header/Header';
import ProfileContent from '@/components/ProfileContent';
import ProfileTab from '@/components/ProfileTab/ProfileTab';
import { ROUTER } from '@/constants/router';
import FollowButton from '@/pages/profile/[id]/FollowButton';
import { css } from '@styled-system/css';

function FollowProfilePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    profileShare?: string;
  };
}) {
  const { data: followCountData, isFetching } = useFollowsCountTargetId(Number(params.id));
  const { data } = useGetMembersById(Number(params.id));
  const { data: symbolStackData } = useGetMissionStack(params.id);
  const { data: memebersMeData } = useGetMembersMe();
  const isMyself = memebersMeData?.memberId === Number(params.id);
  const router = useRouter();
  const handleBack = () => {
    router.push(ROUTER.HOME);
  };
  return (
    <main className={backgroundCss}>
      <Header
        rightAction={'none'}
        headerBgColor={'transparent'}
        iconColor={'icon.primary'}
        onBackAction={searchParams.profileShare ? handleBack : undefined}
      />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  if (context.query?.profileShare) {
    return {
      props: {
        params: {
          id,
        },
        searchParams: {
          profileShare: context.query.profileShare,
        },
      },
    };
  }

  return {
    props: {
      params: {
        id,
      },
      searchParams: {
        profileShare: false,
      },
    },
  };
};

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
