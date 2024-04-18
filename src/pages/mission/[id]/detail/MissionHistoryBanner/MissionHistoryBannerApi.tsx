import { useGetMissionDetailNoSuspense } from '@/apis/mission';
import Banner from '@/components/Banner/Banner';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';
import MissionHistorySkeleton from '@/pages/mission/[id]/detail/MissionHistoryBanner/MissionHistorySkeleton';

// TODO : component 폴더로 이동
function MissionHistoryBannerApi({ missionId }: { missionId: string }) {
  const { data } = useGetMissionDetailNoSuspense(missionId);

  if (!data) return <MissionHistorySkeleton />;

  const title = data.name;
  const description = data.content;
  const imageUrl = MISSION_CATEGORY_LABEL[data.category].imgUrl;

  return <Banner type={'list'} title={title} description={description} imageUrl={imageUrl} />;
}

export default MissionHistoryBannerApi;
