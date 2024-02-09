import MissionHistoryTab from '@/components/MissionDetail/MissionHistoryTab';
import { css } from '@/styled-system/css';

function FinishedMissionDetailPage() {
  return (
    <main className={mainWrapperCss}>
      <MissionHistoryTab />
    </main>
  );
}

export default FinishedMissionDetailPage;

const mainWrapperCss = css({
  height: '100vh',
  width: '100%',
});
