import { useGetMissions } from '@/apis/mission';
import { type MissionItemType } from '@/apis/schema/mission';

function useCheckCompleteMission(missionId?: string) {
  const { data, isLoading } = useGetMissions();

  const isCompeteMission = checkComplete(missionId, data);

  return { isCompeteMission, isLoading };
}

export default useCheckCompleteMission;

const checkComplete = (missionId?: string, missions?: MissionItemType[]) => {
  if (!missionId || !missions) return true; // 버튼 클릭 안되도록 true로 반환ㄴ

  const currentMission = missions.find((mission) => String(mission.missionId) === String(missionId));
  console.log('currentMission: ', currentMission);
};
