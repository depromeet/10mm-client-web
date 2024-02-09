import { useParams } from 'next/navigation';
import MissionHistoryBannerApi from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import MissionCalendar from '@/components/MissionDetail/MissionCalender/MissionCalendar';
import MissionHistoryTabLayout from '@/components/MissionDetail/MissionHistoryTabLayout';
import dayjs from 'dayjs';

function MissionHistoryTab({ isFollow }: { isFollow?: boolean }) {
  const { id } = useParams();
  const missionId = id as string;
  const currentData = dayjs();

  return (
    <MissionHistoryTabLayout>
      {missionId && <MissionHistoryBannerApi missionId={missionId} />}
      <MissionCalendar isFollow={isFollow} currentData={currentData} missionId={Number(missionId)} />
    </MissionHistoryTabLayout>
  );
}

export default MissionHistoryTab;
