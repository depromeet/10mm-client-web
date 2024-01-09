import { Fragment, Suspense } from 'react';
import { useParams } from 'next/navigation';
import MissionCalendar from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar';
import MissionHistoryBannerApi from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import MissionHistorySkeleton from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistorySkeleton';
import Button from '@/components/Button/Button';
import { css } from '@styled-system/css';

function MissionHistoryTab() {
  const { id } = useParams();
  const missionId = Array.isArray(id) ? id[0] : id;

  return (
    <Fragment>
      <div className={missionHistoryTabCss}>
        <Suspense fallback={<MissionHistorySkeleton />}>
          <MissionHistoryBannerApi missionId={missionId} />
        </Suspense>
        <MissionCalendar currentDate={new Date()} />
      </div>
      <div className={bottomDimCss}>
        <Button size={'medium'} variant={'cta'} className={buttonCss}>
          미션 시작하기
        </Button>
      </div>
    </Fragment>
  );
}

export default MissionHistoryTab;

const buttonCss = css({
  position: 'relative',
  left: '0',
});

const bottomDimCss = css({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor:
    'linear-gradient(180deg, rgba(24, 24, 29, 0.00) 0%, rgba(24, 24, 29, 0.09) 7.58%, rgba(24, 24, 29, 0.59) 34.59%, rgba(24, 24, 29, 0.69) 41.18%, rgba(24, 24, 29, 0.83) 51.39%, #18181D 63.25%)',
  width: '100%',
  maxWidth: 'maxWidth',
  height: '166px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
});

const missionHistoryTabCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '24px 16px 172px 16px',
});
