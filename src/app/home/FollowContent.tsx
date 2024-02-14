import { useSearchParams } from 'next/navigation';
import { useFollowMembers } from '@/apis/follow';
import { type FollowMemberType } from '@/apis/schema/member';
import FollowMissionList, { FollowMissionListSkeleton } from '@/app/home/FollowMissionList';
import FollowSummary, { FollowSummarySkeleton } from '@/app/home/FollowSummary';
import MissionList from '@/app/home/MissionList';
import { flex } from '@styled-system/patterns';

function FollowContent() {
  const { data: selectedFollowData, isLoading, isFollower } = useGetSelectFollowData();

  if (!isFollower)
    return (
      <div className={containerCss}>
        <MissionList />
      </div>
    );

  if (isLoading || !selectedFollowData) {
    return (
      <div className={containerCss}>
        <FollowSummarySkeleton />
        <FollowMissionListSkeleton />
      </div>
    );
  }

  return (
    <div className={containerCss}>
      <FollowSummary {...selectedFollowData} />
      <FollowMissionList followId={selectedFollowData.memberId} />
    </div>
  );
}

export default FollowContent;

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
