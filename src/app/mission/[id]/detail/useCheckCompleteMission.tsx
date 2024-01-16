import { useGetMissions } from '@/apis/mission';
import { type MissionItemType, MissionStatus } from '@/apis/schema/mission';

function useCheckCompleteMission(missionId?: string) {
  const { data, isLoading } = useGetMissions();

  const isCompeteMission = checkComplete(missionId, data);

  return { isCompeteMission: isCompeteMission || isLoading };
}

export default useCheckCompleteMission;

const checkComplete = (missionId?: string, missions?: MissionItemType[]) => {
  if (!missionId || !missions) return true; // 버튼 클릭 안되도록 true로 반환

  const currentMission = missions.find((mission) => String(mission.missionId) === String(missionId));
  if (!currentMission) return true; // 버튼 클릭 안되도록 true로 반환
  return currentMission.missionStatus === MissionStatus.COMPLETED;
};
