import Link from 'next/link';
import { useFollowMissions } from '@/apis/follow';
import { MissionListSkeleton } from '@/app/home/home.styles';
import MissionBadge from '@/app/home/MissionBadge';
import Empty from '@/components/Empty/Empty';
import { TwoLineListItem } from '@/components/ListItem';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
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

      <MissionFollowListInner followId={followId} />
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
    return (
      <ul className={listCss}>
        <MissionListSkeleton />
      </ul>
    );
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
    <StaggerWrapper wrapperOverrideCss={listCss}>
      {data.followMissions.map((item) => {
        const status = item.missionStatus;

        const moveHref = ROUTER.MISSION.FOLLOW(item.missionId.toString());
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
    </StaggerWrapper>
  );
}
