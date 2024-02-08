import Link from 'next/link';
import { MissionStatus } from '@/apis/schema/mission';
import { useMissions } from '@/app/home/home.hooks';
import { MissionListSkeleton } from '@/app/home/home.styles';
import MissionBadge from '@/app/home/MissionBadge';
import MissionEmptyList from '@/app/home/MissionEmptyList';
import { TwoLineListItem } from '@/components/ListItem';
import StaggerWrapper from '@/components/Motion/StaggerWrapper';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

function MissionListInner() {
  const { missionList, isLoading, progressMissionId } = useMissions();

  if (isLoading) {
    return <MissionListSkeleton />;
  }

  if (missionList.length === 0) {
    return (
      <div className={containerCss}>
        <MissionEmptyList />
      </div>
    );
  }

  return (
    <StaggerWrapper wrapperOverrideCss={listCss}>
      {missionList.map((item) => {
        const isProgressingMission = progressMissionId === String(item.missionId);
        const status = isProgressingMission ? MissionStatus.PROGRESSING : item.missionStatus;

        const missionId = item.missionId.toString();
        const moveHref = isProgressingMission
          ? ROUTER.MISSION.STOP_WATCH(missionId)
          : item.missionRecordId && status === MissionStatus.REQUIRED
            ? ROUTER.RECORD.CREATE(item.missionRecordId.toString())
            : ROUTER.MISSION.DETAIL(missionId);
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

export default MissionListInner;

const listCss = css({
  flex: 1,
  gap: '8px',
  height: '100%',
});

const containerCss = css({
  height: '100%',
  padding: '60px 0',
});
