import { type MissionItemTypeWithRecordId, MissionStatus } from '@/apis/schema/mission';
import MissionList from '@/components/MissionList';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { useMissions } from '@/pages/home/home.hooks';
import { eventLogger } from '@/utils';

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
        const { moveHref, status } = getMoveHref(item, progressMissionId);

        if (item.missionRecordId && status === MissionStatus.COMPLETED) {
          return (
            <MissionList.ReactionLinkItem
              href={moveHref}
              key={item.missionId}
              {...item}
              missionStatus={status}
              recordId={Number(item.missionRecordId)}
              onClick={() => onClickItem(true)}
            />
          );
        }

        return (
          <MissionList.LinkItem
            href={moveHref}
            key={item.missionId}
            {...item}
            missionStatus={status}
            onClick={() => onClickItem(false)}
          />
        );
      })}
    </MissionList.Container>
  );
}

export default MissionListInner;

const getMoveHref = (item: MissionItemTypeWithRecordId, progressMissionId: string | null) => {
  const isProgressingMission = progressMissionId === String(item.missionId);
  const status = isProgressingMission ? MissionStatus.PROGRESSING : item.missionStatus;

  const missionId = item.missionId.toString();
  const moveHref = isProgressingMission
    ? ROUTER.MISSION.STOP_WATCH(missionId)
    : item.missionRecordId && status === MissionStatus.REQUIRED
      ? ROUTER.RECORD.CREATE(item.missionRecordId.toString())
      : ROUTER.MISSION.DETAIL(missionId);

  return { moveHref, status };
};

const onClickItem = (isReaction: boolean) => {
  eventLogger.logEvent(EVENT_LOG_CATEGORY.HOME, EVENT_LOG_NAME.HOME.CLICK_MY_MISSION, {
    isReaction,
  });
};
