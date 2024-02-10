import Link from 'next/link';
import { type GetFinishedMissionsResponse } from '@/apis/mission';
import { type MissionCategory } from '@/apis/schema/mission';
import Badge from '@/components/Badge/Badge';
import { TwoLineListItem } from '@/components/ListItem';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import { ROUTER } from '@/constants/router';
import { flex } from '@/styled-system/patterns';
import { type UseQueryResult } from '@tanstack/react-query';

interface Props {
  queryData: UseQueryResult<GetFinishedMissionsResponse>;
}

function FinishedMissionList({ queryData }: Props) {
  const { data } = queryData;

  const list = data ?? [];

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
