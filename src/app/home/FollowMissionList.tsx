import Link from 'next/link';
import { useFollowMissions } from '@/apis/mission';
import { useFollowId } from '@/app/home/FollowIdProvider';
import MissionBadge from '@/app/home/MissionBadge';
import MissionEmptyList from '@/app/home/MissionEmptyList';
import { TwoLineListItem } from '@/components/ListItem';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

import { Skeleton } from './MissionList';

function FollowMissionList() {
  return (
    <div className={containerCss}>
      <h2 className={headingCss}>
        <span>미션 목록</span>
      </h2>
      <ul className={listCss}>
        <MissionFollowListInner />
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

const containerCss = css({});

const listCss = flex({
  flexDirection: 'column',
  gap: '8px',
});

function MissionFollowListInner() {
  const { followId } = useFollowId();
  const { data, isLoading } = useFollowMissions(followId ?? 0);
  if (isLoading) {
    return <Skeleton />;
  }

  if (!data) {
    return null;
  }

  if (!data || data.followMissions.length === 0) {
    return (
      <div className={containerCss}>
        <MissionEmptyList />
      </div>
    );
  }

  return (
    <>
      {data.followMissions.map((item) => {
        const status = item.missionStatus;

        const moveHref = ROUTER.MISSION.DETAIL(item.missionId.toString());
        return (
          <Link href={moveHref} key={item.missionId}>
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
