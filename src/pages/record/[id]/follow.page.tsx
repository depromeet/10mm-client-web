import { Suspense } from 'react';
import { type GetServerSidePropsContext } from 'next';
import Header from '@/components/Header/Header';
import MissionRecordDetail from '@/pages/record/[id]/detail/MissionRecordDetail';
import { css } from '@styled-system/css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      id: context.query.id,
    },
  };
}

function FollowMissionRecordDetailPage({ id }: { id: string }) {
  return (
    <main className={mainWrapperCss}>
      <Header rightAction={'none'} title={'미션 내역'} />
      <Suspense>
        <MissionRecordDetail isFollow recordId={id} />
      </Suspense>
    </main>
  );
}

export default FollowMissionRecordDetailPage;

const mainWrapperCss = css({
  width: '100%',
});
