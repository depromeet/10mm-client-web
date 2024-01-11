import { Suspense } from 'react';
import MissionRecordDetail from '@/app/mission/[id]/history/[historyId]/MissionRecordDetail';
import MissionRecordHeader from '@/app/mission/[id]/history/[historyId]/MissionRecordHeader';
import { css } from '@styled-system/css';

function MissionHistoryPage() {
  return (
    <main className={mainWrapperCss}>
      <MissionRecordHeader historyId={'1'} missionId={'2'} />
      <Suspense>
        <MissionRecordDetail />
      </Suspense>
    </main>
  );
}

export default MissionHistoryPage;

const mainWrapperCss = css({
  width: '100%',
});
