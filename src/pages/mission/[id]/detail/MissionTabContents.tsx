import { MissionHistoryTab } from '@/components/MissionDetail';
import MissionHistoryTabLayout from '@/components/MissionDetail/MissionHistoryTabLayout';
import MissionStartButton from '@/pages/mission/[id]/detail/MissionStartButton';
import MissionStatistics from '@/pages/mission/[id]/detail/MissionStatistics';

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
