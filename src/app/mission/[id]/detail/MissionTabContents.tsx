import MissionStartButton from '@/app/mission/[id]/detail/MissionStartButton';
import MissionStatistics from '@/app/mission/[id]/detail/MissionStatistics';
import { MissionHistoryTab } from '@/components/MissionDetail';
import MissionHistoryTabLayout from '@/components/MissionDetail/MissionHistoryTabLayout';

function MissionTabContents({
  tab,
  missionId,
  isCompeteMission,
}: {
  tab: string;
  missionId: string;
  isCompeteMission: boolean;
}) {
  if (tab === 'mission-history') {
    return (
      <>
        <MissionHistoryTab />
        <MissionStartButton missionId={missionId} isCompeteMission={isCompeteMission} />
      </>
    );
  }
  return (
    <MissionHistoryTabLayout>
      <MissionStatistics missionId={missionId} />
    </MissionHistoryTabLayout>
  );
}

export default MissionTabContents;
