'use client';

import Link from 'next/link';
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
  const { missionList, isLoading } = useMissions();

  // TODO: 스켈레톤 또는 로딩 추가
  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <div className={containerCss}>
      <h2 className={headingCss}>
        <span>내 미션 목록</span>
        <Link href={ROUTER.MISSION.NEW}>
          <Icon name="plus" />
        </Link>
      </h2>
      <ul className={listCss}>
        {/* TODO : 미션 최근 순 정렬 */}
        {/* TODO : 완료된 미션은 하단 정렬 */}
        {missionList.map((item) => (
          <TwoLineListItem
            key={item.missionId}
            badgeElement={<MissionBadge status={item.status as MissionStatusType} />}
            name={item.content}
            subName={MISSION_CATEGORY_LABEL[item.category].label}
            imageUrl={MISSION_CATEGORY_LABEL[item.category].imgUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export default MissionList;

const containerCss = css({
  padding: '0 16px 30px',
});

const headingCss = flex({
  padding: '16px 0',
  justifyContent: 'space-between',
  textStyle: 'subtitle3',
  color: 'text.primary',
  userSelect: 'none',
});

const listCss = flex({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
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
