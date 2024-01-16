'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge/Badge';
import Empty from '@/components/Empty/Empty';
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
  console.log('missionList: ', missionList);
  const router = useRouter();

  // TODO: 스켈레톤 또는 로딩 추가
  if (isLoading) {
    return (
      <div className={containerCss}>
        <Header />
      </div>
    );
  }
  if (missionList.length === 0) {
    return (
      <div className={containerCss}>
        <Header />
        <article className={emptyWrapperCss}>
          <Empty
            type="suggest"
            title="아직 등록된 미션이 없어요."
            description="미션을 등록하고 습관을 형성해 보세요!"
            buttonText="미션 등록하기"
            buttonAction={() => router.push(ROUTER.MISSION.NEW)}
            image="docs"
          />
        </article>
      </div>
    );
  }
  return (
    <div className={containerCss}>
      <Header />

      <ul className={listCss}>
        {/* TODO : 미션 최근 순 정렬 */}
        {/* TODO : 완료된 미션은 하단 정렬 */}
        {missionList.map((item) => (
          <Link href={ROUTER.MISSION.DETAIL(item.missionId.toString())} key={item.missionId}>
            <TwoLineListItem
              badgeElement={<MissionBadge status={item.status as MissionStatusType} />}
              name={item.content}
              subName={MISSION_CATEGORY_LABEL[item.category].label}
              imageUrl={MISSION_CATEGORY_LABEL[item.category].imgUrl}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default MissionList;

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

const containerCss = css({
  padding: '0 16px 30px',
  flex: 1,
  minWidth: '0',
  display: 'flex',
  flexDirection: 'column',
});

const headingCss = flex({
  padding: '12px 4px',
  justifyContent: 'space-between',
  textStyle: 'body4',
  color: 'text.primary',
  userSelect: 'none',
});

const listCss = flex({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '100%',
});

const emptyWrapperCss = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  minWidth: '0',
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
