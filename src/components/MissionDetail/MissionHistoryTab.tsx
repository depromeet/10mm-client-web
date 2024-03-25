import { useRouter } from 'next/router';
import MissionCalendar from '@/components/MissionDetail/MissionCalender/MissionCalendar';
import MissionHistoryTabLayout from '@/components/MissionDetail/MissionHistoryTabLayout';
import MissionHistoryBannerApi from '@/pages/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import { css } from '@styled-system/css';
import dayjs from 'dayjs';

function MissionHistoryTab({ isFollow }: { isFollow?: boolean }) {
  const router = useRouter();
  const id = router.query.id;

  const missionId = id as string;
  const currentData = dayjs();

  return (
    <MissionHistoryTabLayout>
      <div className={bottomDimPaddingCss}>
        {missionId && <MissionHistoryBannerApi missionId={missionId} />}
        <MissionCalendar isFollow={isFollow} currentData={currentData} missionId={Number(missionId)} />
      </div>
    </MissionHistoryTabLayout>
  );
}

export default MissionHistoryTab;

const bottomDimPaddingCss = css({
  paddingBottom: '130px',
});
