'use client';

import Link from 'next/link';
import MissionEmptyList from '@/app/home/MissionEmptyList';
import Badge from '@/components/Badge/Badge';
import Icon from '@/components/Icon';
import { TwoLineListItem } from '@/components/ListItem';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useMissions } from './home.hooks';

type MissionStatusType = 'COMPLETED' | 'NONE' | 'REQUIRED'; //TODO: 삭제

function MissionList() {
  return (
    <div className={containerCss}>
      <Header />
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

function MissionListInner() {
  const { missionList, isLoading } = useMissions();

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
      {missionList?.map((item) => (
        <Link href={ROUTER.MISSION.DETAIL(item.missionId.toString())} key={item.missionId}>
          <TwoLineListItem
            badgeElement={<MissionBadge status={item.missionStatus} />}
            name={item.content}
            subName={MISSION_CATEGORY_LABEL[item.category].label}
            imageUrl={MISSION_CATEGORY_LABEL[item.category].imgUrl}
          />
        </Link>
      ))}
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

function Header() {
  return (
    <h2 className={headingCss}>
      <span>내 미션 목록</span>
      <Link href={ROUTER.MISSION.NEW}>
        <Icon name="plus" size={20} />
      </Link>
    </h2>
  );
}

const containerCss = flex({
  flexDirection: 'column',
  padding: '0 16px 30px',
  flex: 1,
  minWidth: '0',
  display: 'flex',
});

const headingCss = flex({
  padding: '12px 4px',
  justifyContent: 'space-between',
  textStyle: 'body4',
  color: 'text.primary',
  userSelect: 'none',
});

const listCss = flex({
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
  height: '100%',
});

function MissionBadge({ status }: { status: MissionStatusType }) {
  switch (status) {
    case 'COMPLETED':
      return <Badge color="purple">완료</Badge>;
    case 'REQUIRED':
      return <Badge color="red">인증 필요</Badge>;

    default:
      return null;
  }
}
