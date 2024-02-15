import { type MissionItemTypeWithRecordId } from '@/apis/schema/mission';
import MissionBadge from '@/app/home/MissionBadge';
import { TwoLineListItem } from '@/components/ListItem';
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
