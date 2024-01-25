'use client';

import Link from 'next/link';
import { MissionStatus } from '@/apis/schema/mission';
import MissionEmptyList from '@/app/home/MissionEmptyList';
import { TwoLineListItem } from '@/components/ListItem';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useMissions } from '../home/home.hooks';
import { MissionBadge } from '../home/MissionList';

function MissionList() {
  return (
    <div className={containerCss}>
      <ul className={listCss}>
        {/* TODO : Suspense로 리팩토링 */}
        {/* <Suspense fallback={<Skeleton />}> */}
        {/* TODO : 미션 최근 순 정렬 */}
        {/* TODO : 완료된 미션은 하단 정렬 */}
        <MissionListInner />
        {/* </Suspense> */}
      </ul>
    </div>
  );
}

export default MissionList;

export function MissionListInner() {
  const { missionList, isLoading, progressMissionId } = useMissions();

  if (isLoading) {
    return <Skeleton />;
  }

  if (missionList.length === 0) {
    return (
      <div className={containerCss}>
        <MissionEmptyList />
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}

// TODO: 공통으로 분리
function Skeleton() {
  return (
    <>
      <div className={missionItemSkeletonCss} />
      <div className={missionItemSkeletonCss} />
    </>
  );
}

const missionItemSkeletonCss = css({
  animation: 'skeleton',
  height: '74px',
  width: '100%',
  backgroundColor: 'bg.surface4',
  borderRadius: '22px',
});

const containerCss = css({
  paddingBottom: '100px',
});

const listCss = flex({
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
  height: '100%',
});
