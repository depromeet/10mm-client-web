import { Suspense } from 'react';
import { type GetServerSidePropsContext } from 'next';
import { css } from '@styled-system/css';

import MissionRecordDetail from './MissionRecordDetail';
import MissionRecordHeader from './MissionRecordHeader';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      id: context.query.id,
    },
  };
}

function MissionRecordDetailPage(params: { id: string }) {
  return (
    <main className={mainWrapperCss}>
      <MissionRecordHeader recordId={params.id} />
      <Suspense>
        <MissionRecordDetail isFollow={false} recordId={params.id} />
      </Suspense>
    </main>
  );
}

export default MissionRecordDetailPage;

const mainWrapperCss = css({
  width: '100%',
});
