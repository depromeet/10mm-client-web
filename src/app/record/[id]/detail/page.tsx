import { Suspense } from 'react';
import { css } from '@styled-system/css';

import MissionRecordDetail from './MissionRecordDetail';
import MissionRecordHeader from './MissionRecordHeader';

function MissionRecordDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className={mainWrapperCss}>
      <MissionRecordHeader recordId={params.id} />
      <Suspense>
        <MissionRecordDetail isFollow={false} />
      </Suspense>
    </main>
  );
}

export default MissionRecordDetailPage;

const mainWrapperCss = css({
  width: '100%',
});
