import { type GetServerSidePropsContext } from 'next';
import { useGetMissionDetailNoSuspense } from '@/apis/mission';
import { css } from '@/styled-system/css';

import ButtonSection from './ButtonSection';
import StopwatchHeader from './Header';
import StopwatchProvider from './Stopwatch.context';
import StopwatchSection from './StopwatchSection';
import TextSection from './TextSection';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      id: context.query.id,
    },
  };
}

export default function StopwatchPage(params: { id: string }) {
  const missionId = params.id;

  const { data: missionData } = useGetMissionDetailNoSuspense(missionId);
  // const category = missionData?.category ? MISSION_CATEGORY_LABEL[missionData?.category].label : '';
  const missionName = missionData?.name ?? '';

  return (
    <div className={containerCss}>
      <StopwatchProvider missionId={missionId}>
        <StopwatchHeader />
        <TextSection />
        <StopwatchSection missionName={missionName} />
        <ButtonSection missionId={missionId} />
      </StopwatchProvider>
    </div>
  );
}

const containerCss = css({
  minHeight: '100vh',
  backgroundColor: 'bg.surface2',
});
