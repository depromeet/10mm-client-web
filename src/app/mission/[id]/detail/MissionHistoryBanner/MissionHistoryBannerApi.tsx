import { useGetMissionDetailNoSuspense } from '@/apis/mission';
import MissionHistoryBanner from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBanner';
import MissionHistorySkeleton from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistorySkeleton';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';

function MissionHistoryBannerApi({ missionId }: { missionId: string }) {
  const { data } = useGetMissionDetailNoSuspense(missionId);
  console.log('data: ', data);

  if (!data) return <MissionHistorySkeleton />;

  const title = data.name;
  const description = data.content;
  const imageUrl = MISSION_CATEGORY_LABEL[data.category].imgUrl;

  return <MissionHistoryBanner title={title} description={description} imageUrl={imageUrl} />;
}

export default MissionHistoryBannerApi;
