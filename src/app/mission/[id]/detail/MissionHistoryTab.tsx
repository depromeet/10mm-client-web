import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MissionCalendar from '@/app/mission/[id]/detail/MissionCalender/MissionCalendar';
import MissionHistoryBannerApi from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import MissionHistorySkeleton from '@/app/mission/[id]/detail/MissionHistoryBanner/MissionHistorySkeleton';
import Button from '@/components/Button/Button';
import { ROUTER } from '@/constants/router';
import { css } from '@styled-system/css';

function MissionHistoryTab() {
  const { id } = useParams();
  const router = useRouter();
  const missionId = id as string | undefined;
  const currentDate = new Date();

  const handleMissionStart = () => {
    if (!missionId) return;
    router.push(ROUTER.MISSION.STOP_WATCH(missionId));
  };

  return (
    <div className={scrollAreaCss}>
      <div className={missionHistoryTabCss}>
        <Suspense fallback={<MissionHistorySkeleton />}>
          {missionId && <MissionHistoryBannerApi missionId={missionId} />}
        </Suspense>
        <Suspense>
          <MissionCalendar currentDate={currentDate} missionId={Number(missionId)} />
        </Suspense>
      </div>
      <div className={bottomDimCss}>
        <Button size={'medium'} variant={'cta'} className={buttonCss} onClick={handleMissionStart}>
          미션 시작하기
        </Button>
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
