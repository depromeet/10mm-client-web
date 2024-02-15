import { useSearchParams } from 'next/navigation';
import { useFollowMembers } from '@/apis/follow';
import { type FollowMemberType } from '@/apis/schema/member';
import FollowMissionList from '@/app/home/Content/FollowMissionList';
import FollowSummary, { FollowSummarySkeleton } from '@/app/home/Content/FollowSummary';
import HomeMissionList from '@/app/home/Content/MissionList';
import MissionList from '@/components/MissionList';
import { flex } from '@styled-system/patterns';

function FollowContent() {
  const { data: selectedFollowData, isLoading, isFollower } = useGetSelectFollowData();

  if (!isFollower)
    return (
      <div className={containerCss}>
        <HomeMissionList />
      </div>
    );

  if (isLoading || !selectedFollowData) {
    return (
      <div className={containerCss}>
        <FollowSummarySkeleton />

        <h2 className={headingCss}>
          <span>미션 목록</span>
        </h2>
        <MissionList.Skeleton />
      </div>
    );
  }

  return (
    <div className={containerCss}>
      <FollowSummary {...selectedFollowData} />

      <h2 className={headingCss}>
        <span>미션 목록</span>
      </h2>
      <FollowMissionList followId={selectedFollowData.memberId} />
    </div>
  );
}

export default FollowContent;

const headingCss = flex({
  padding: '12px 4px',
  textStyle: 'body4',
  color: 'text.primary',
});

const useGetSelectFollowData = (): { data: FollowMemberType | null; isLoading: boolean; isFollower: boolean } => {
  const { data, isLoading } = useFollowMembers();
  const searchParams = useSearchParams();

  if (!searchParams.get('id'))
    return {
      data: null,
      isLoading,
      isFollower: false,
    };

  const id = Number(searchParams.get('id'));
  const selectedFollowData = data?.find((profile) => profile.memberId === id);
  return { data: selectedFollowData ?? null, isLoading, isFollower: true };
};

const containerCss = flex({
  flexDirection: 'column',
  padding: '0 16px 30px',
  flex: 1,
  minWidth: '0',
  display: 'flex',
});
