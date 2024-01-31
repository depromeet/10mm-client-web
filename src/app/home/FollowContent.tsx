import { useSearchParams } from 'next/navigation';
import { useFollowMembers } from '@/apis/follow';
import FollowMissionList from '@/app/home/FollowMissionList';
import FollowSummary from '@/app/home/FollowSummary';
import MissionList from '@/app/home/MissionList';
import { flex } from '@styled-system/patterns';

function FollowContent() {
  const { data } = useFollowMembers();
  const searchParams = useSearchParams();

  const id = searchParams.get('id') ? Number(searchParams.get('id')) : null;
  const selectedFollowData = data?.find((profile) => profile.memberId === id);
  if (!selectedFollowData)
    return (
      <div className={containerCss}>
        <MissionList />
      </div>
    );
  return (
    <div className={containerCss}>
      <FollowSummary followId={selectedFollowData.memberId} followNickname={selectedFollowData.nickname} />
      <FollowMissionList followId={selectedFollowData.memberId} />
    </div>
  );
}

export default FollowContent;

const containerCss = flex({
  flexDirection: 'column',
  padding: '0 16px 30px',
  flex: 1,
  minWidth: '0',
  display: 'flex',
});
