import { Suspense } from 'react';
import MissionRecordDetail from '@/app/record/[id]/detail/MissionRecordDetail';
import Header from '@/components/Header/Header';
import { css } from '@styled-system/css';

function FollowMissionRecordDetailPage() {
  return (
    <main className={mainWrapperCss}>
      <Header rightAction={'none'} title={'미션 내역'} />
      <Suspense>
        <MissionRecordDetail isFollow />
      </Suspense>
    </main>
  );
}

export default FollowMissionRecordDetailPage;

const mainWrapperCss = css({
  width: '100%',
});
