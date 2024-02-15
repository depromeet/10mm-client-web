import { useFollowMissions } from '@/apis/follow';
import MissionList from '@/components/MissionList';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';

interface FollowMissionListProps {
  followId: number;
}

function FollowMissionList({ followId }: FollowMissionListProps) {
  const { data } = useFollowMissions(followId);

  if (!data) {
    return null;
  }

  if (!data || data.followMissions.length === 0) {
    return <MissionList.NoticeEmpty />;
  }

  return (
    <MissionList.Container>
      {data.followMissions.map((item) => {
        const status = item.missionStatus;

        const handleClick = () => {
          eventLogger.logEvent(EVENT_LOG_CATEGORY.HOME, EVENT_LOG_NAME.HOME.CLICK_FOLLOW_MISSION, {
            status,
          });
        };

        return (
          <MissionList.LinkItem
            key={item.missionId}
            onClick={handleClick}
            href={ROUTER.MISSION.FOLLOW(item.missionId.toString())}
            {...item}
          />
        );
      })}
    </MissionList.Container>
  );
}

export default FollowMissionList;
