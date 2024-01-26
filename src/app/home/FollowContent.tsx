import FollowMissionList from '@/app/home/FollowMissionList';
import FollowSummary from '@/app/home/FollowSummary';
import MissionList from '@/app/home/MissionList';
import { flex } from '@styled-system/patterns';

interface ProfileContentProps {
  selectedFollowData: {
    followId: number;
    nickname: string;
  } | null;
}

function FollowContent({ selectedFollowData }: ProfileContentProps) {
  if (!selectedFollowData)
    return (
      <div className={containerCss}>
        <MissionList />
      </div>
    );
  return (
    <div className={containerCss}>
      <FollowSummary followId={selectedFollowData.followId} followNickname={selectedFollowData.nickname} />
      <FollowMissionList followId={selectedFollowData.followId} />
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
