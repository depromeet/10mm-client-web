'use client';

import { useGetMissionSummary } from '@/apis/mission';
import BannerSection, { BannerSectionSkeleton } from '@/app/result/OverallStatus/BannerSection';
import ImageAreaSection, { ImageSectionSkeleton } from '@/app/result/OverallStatus/ImageAreaSection';
import MissionSection from '@/app/result/OverallStatus/MissionSection';

function OverallStatus() {
  const { data, isLoading } = useGetMissionSummary();

  const totalTime = `${data?.totalMissionHour ?? 0}h ${data?.totalMissionMinute ?? 0}m`;
  const totalMissionAttainRate = `${data?.totalMissionAttainRate ?? 0}%`;

  if (isLoading) {
    return (
      <>
        <ImageSectionSkeleton />
        <BannerSectionSkeleton />
      </>
    );
  }

  return (
    <>
      <ImageAreaSection symbolStack={data?.symbolStack} />
      <BannerSection totalTime={totalTime} totalMissionAttainRate={totalMissionAttainRate} />
      <MissionSection />
    </>
  );
}

export default OverallStatus;
