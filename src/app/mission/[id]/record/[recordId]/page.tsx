import { Suspense } from 'react';
import MissionRecordDetail from '@/app/mission/[id]/record/[recordId]/MissionRecordDetail';
import MissionRecordHeader from '@/app/mission/[id]/record/[recordId]/MissionRecordHeader';
import { css } from '@styled-system/css';

function MissionRecordDetailPage({ params }: { params: { recordId: string; id: string } }) {
  return (
    <main className={mainWrapperCss}>
      <MissionRecordHeader recordId={params.recordId} missionId={params.id} />
      <Suspense>
        <MissionRecordDetail />
      </Suspense>
    </main>
  );
}

export default MissionRecordDetailPage;

const mainWrapperCss = css({
  width: '100%',
});
