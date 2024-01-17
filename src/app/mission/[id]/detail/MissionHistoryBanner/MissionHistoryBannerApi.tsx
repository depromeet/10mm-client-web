import { useGetMissionDetail } from '@/apis/mission';
import MissionHistoryBanner from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBanner';
import { MISSION_CATEGORY_LABEL } from '@/constants/mission';

function MissionHistoryBannerApi({ missionId }: { missionId: string }) {
  const { data } = useGetMissionDetail(missionId);

  const title = data.name;
  const description = data.content;
  const imageUrl = MISSION_CATEGORY_LABEL[data.category].imgUrl;

  // TODO: 디자인 시스템으로 변경 필요
  return <MissionHistoryBanner title={title} description={description} imageUrl={imageUrl} />;
}

export default MissionHistoryBannerApi;
