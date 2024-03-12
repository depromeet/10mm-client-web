'use client';

import { useParams } from 'next/navigation';
import { useGetMissionDetailNoSuspense } from '@/apis/mission';
import ButtonSection from '@/app/mission/[id]/stopwatch/ButtonSection';
import StopwatchSection from '@/app/mission/[id]/stopwatch/StopwatchSection';

import StopwatchHeader from './Header';
import StopwatchProvider from './Stopwatch.context';
import TextSection from './TextSection';

export default function StopwatchPage() {
  const params = useParams();
  const missionId = params.id as string;

  const { data: missionData } = useGetMissionDetailNoSuspense(missionId);
  // const category = missionData?.category ? MISSION_CATEGORY_LABEL[missionData?.category].label : '';
  const missionName = missionData?.name ?? '';

  return (
    <StopwatchProvider missionId={missionId}>
      <StopwatchHeader />
      <TextSection />
      <StopwatchSection missionName={missionName} />
      <ButtonSection missionId={missionId} />
    </StopwatchProvider>
  );
}
