import { useParams } from 'next/navigation';
import MissionCalendar from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar';
import MissionHistoryBannerApi from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import { css } from '@styled-system/css';
import dayjs from 'dayjs';

function MissionHistoryTab({ isFollow }: { isFollow?: boolean }) {
  const { id } = useParams();
  const missionId = id as string;
  const currentData = dayjs();

  return (
    <div className={scrollAreaCss}>
      <div className={missionHistoryTabCss}>
        {missionId && <MissionHistoryBannerApi missionId={missionId} />}
        <MissionCalendar isFollow={isFollow} currentData={currentData} missionId={Number(missionId)} />
      </div>
    </div>
  );
}

export default MissionHistoryTab;

const scrollAreaCss = css({
  overflowY: 'scroll',
  height: 'calc(100vh - 24px - 44px)',
  _scrollbar: {
    display: 'none',
  },
});

const missionHistoryTabCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '24px 16px 192px 16px',
});
