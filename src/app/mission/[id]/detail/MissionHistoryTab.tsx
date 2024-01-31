import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import MissionCalendar from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar';
import MissionHistoryBannerApi from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import MissionHistorySkeleton from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistorySkeleton';
import { css } from '@styled-system/css';

function MissionHistoryTab({ isFollow }: { isFollow?: boolean }) {
  const { id } = useParams();
  const missionId = id as string;
  const currentDate = new Date();

  return (
    <div className={scrollAreaCss}>
      <div className={missionHistoryTabCss}>
        <Suspense fallback={<MissionHistorySkeleton />}>
          {missionId && <MissionHistoryBannerApi missionId={missionId} />}
        </Suspense>
        <Suspense>
          <MissionCalendar isFollow={isFollow} currentDate={currentDate} missionId={Number(missionId)} />
        </Suspense>
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
