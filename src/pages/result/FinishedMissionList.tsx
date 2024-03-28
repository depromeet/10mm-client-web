import Link from 'next/link';
import { type GetFinishedMissionsResponse } from '@/apis/mission';
import { type MissionCategory } from '@/apis/schema/mission';
import Badge from '@/components/Badge/Badge';
import Empty from '@/components/Empty/Empty';
import { TwoLineListItem } from '@/components/ListItem';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { center, flex } from '@/styled-system/patterns';
import { type UseQueryResult } from '@tanstack/react-query';

interface Props {
  queryData: UseQueryResult<GetFinishedMissionsResponse>;
}

function FinishedMissionList({ queryData }: Props) {
  const { data, isLoading } = queryData;

  const list = data ?? [];

  if (!isLoading && list.length === 0) {
    return (
      <div className={emptyContainerCss}>
        <Empty
          type="notice"
          title="아직 종료된 미션이 없어요."
          description="미션을 등록하고 14일이 지나면 <br/>종료 미션으로 등록됩니다."
          image={'docs'}
        />
      </div>
    );
  }

  return (
    <ul className={ulCss}>
      {list.map((item) => {
        const category = MISSION_CATEGORY_LABEL[item.category as MissionCategory];
        return (
          <Link key={item.missionId} href={ROUTER.RESULT.FINISHED_MISSION(item.missionId)}>
            <TwoLineListItem
              key={item.missionId}
              subName={category.label}
              name={item.name}
              imageUrl={category.imgUrl}
              badgeElement={
                <Badge color="gray" variant="solid">
                  {item.missionAttainRate}%
                </Badge>
              }
            />
          </Link>
        );
      })}
    </ul>
  );
}

export default FinishedMissionList;

const ulCss = flex({
  padding: '16px',
  gap: '8px',
  flexDirection: 'column',
});

const emptyContainerCss = center({
  height: 'calc(100vh - 61px)',

  '& > article': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
