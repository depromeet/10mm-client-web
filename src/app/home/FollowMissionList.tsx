import Link from 'next/link';
import { useFollowMissions } from '@/apis/follow';
import { MissionListSkeleton } from '@/app/home/home.styles';
import MissionBadge from '@/app/home/MissionBadge';
import Empty from '@/components/Empty/Empty';
import { TwoLineListItem } from '@/components/ListItem';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

interface FollowMissionListProps {
  followId: number;
}

function FollowMissionList({ followId }: FollowMissionListProps) {
  return (
    <div>
      <h2 className={headingCss}>
        <span>미션 목록</span>
      </h2>
      <ul className={listCss}>
        <MissionFollowListInner followId={followId} />
      </ul>
    </div>
  );
}

export default FollowMissionList;

const headingCss = flex({
  padding: '12px 4px',
  textStyle: 'body4',
  color: 'text.primary',
});

const containerCss = css({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '60px 0',
});

const listCss = flex({
  flexDirection: 'column',
  gap: '8px',
});

export function MissionFollowListInner({ followId }: { followId: number }) {
  const { data, isLoading } = useFollowMissions(followId);
  if (isLoading) {
    return <MissionListSkeleton />;
  }

  if (!data) {
    return null;
  }

  if (!data || data.followMissions.length === 0) {
    return (
      <div className={containerCss}>
        <Empty type="notice" title={'아직 등록된 미션이 없어요.'} description={''} image={'docs'} />
      </div>
    );
  }

  return (
    <>
      {data.followMissions.map((item) => {
        const status = item.missionStatus;

        const handleClick = () => {
          eventLogger.logEvent(EVENT_LOG_CATEGORY.HOME, EVENT_LOG_NAME.HOME.CLICK_FOLLOW_MISSION, {
            status,
          });
        };

        return (
          <Link onClick={handleClick} href={ROUTER.MISSION.FOLLOW(item.missionId.toString())} key={item.missionId}>
            <TwoLineListItem
              badgeElement={<MissionBadge status={status} />}
              name={item.name}
              subName={MISSION_CATEGORY_LABEL[item.category].label}
              imageUrl={MISSION_CATEGORY_LABEL[item.category].imgUrl}
            />
          </Link>
        );
      })}
    </>
  );
}
