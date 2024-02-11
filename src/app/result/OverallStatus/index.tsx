'use client';

import { useGetMissionSummary } from '@/apis/mission';
import BannerSection from '@/app/result/OverallStatus/BannerSection';
import ImageAreaSection from '@/app/result/OverallStatus/ImageAreaSection';
import MissionSection from '@/app/result/OverallStatus/MissionSection';

function OverallStatus() {
  const { data, isLoading } = useGetMissionSummary();

  const totalTime = `${data?.totalMissionHour ?? 0}h ${data?.totalMissionMinute ?? 0}m`;
  const totalMissionAttainRate = `${data?.totalMissionAttainRate ?? 0}%`;

  return (
    <>
      <ImageAreaSection symbolStack={data?.symbolStack} />
      <BannerSection isLoading={isLoading} totalTime={totalTime} totalMissionAttainRate={totalMissionAttainRate} />
      <MissionSection />
    </>
  );
}

export default OverallStatus;
