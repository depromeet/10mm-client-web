import { MissionStatus } from '@/apis/schema/mission';
import { useMissions } from '@/app/home/home.hooks';
import MissionList from '@/components/MissionList';
import { ROUTER } from '@/constants/router';

// TODO : 확인하기,
function MissionListInner() {
  const { missionList, isLoading, progressMissionId } = useMissions();

  if (isLoading) {
    return <MissionList.Skeleton />;
  }

  if (missionList.length === 0) {
    return <MissionList.SuggestAdd />;
  }

  return (
    <MissionList.Container>
      {missionList.map((item) => {
        const isProgressingMission = progressMissionId === String(item.missionId);
        const status = isProgressingMission ? MissionStatus.PROGRESSING : item.missionStatus;

        const missionId = item.missionId.toString();
        const moveHref = isProgressingMission
          ? ROUTER.MISSION.STOP_WATCH(missionId)
          : item.missionRecordId && status === MissionStatus.REQUIRED
            ? ROUTER.RECORD.CREATE(item.missionRecordId.toString())
            : ROUTER.MISSION.DETAIL(missionId);

        return <MissionList.LinkItem href={moveHref} key={item.missionId} {...item} />;
      })}
    </MissionList.Container>
  );
}

export default MissionListInner;
