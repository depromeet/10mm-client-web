import { type MissionItemTypeWithRecordId } from '@/apis/schema/mission';
import { TwoLineListItem } from '@/components/ListItem';
import MissionBadge from '@/components/MissionList/Badge';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';

function MissionItem(item: MissionItemTypeWithRecordId) {
  return (
    <TwoLineListItem
      badgeElement={<MissionBadge status={item.missionStatus} />}
      name={item.name}
      subName={MISSION_CATEGORY_LABEL[item.category].label}
      imageUrl={MISSION_CATEGORY_LABEL[item.category].imgUrl}
    />
  );
}

export default MissionItem;
