'use client';

import { useGetMissionSummary } from '@/apis/mission';
import ImageAreaSection from '@/app/result/OverallStatus/ImageAreaSection';
import MissionSection from '@/app/result/OverallStatus/MissionSection';
import Banner from '@/components/Banner/Banner';
import MotionDiv from '@/components/Motion/MotionDiv';
import { grid } from '@/styled-system/patterns';

function OverallStatus() {
  const { data, isLoading } = useGetMissionSummary();

  const symbolStack = data?.symbolStack ?? 0;
  const totalTime = `${data?.totalMissionHour ?? 0}h ${data?.totalMissionMinute ?? 0}m`;
  const totalMissionAttainRate = `${data?.totalMissionAttainRate ?? 0}%`;

  return (
    <>
      {isLoading ? (
        // TODO : 스켈레톤 추가
        <div></div>
      ) : (
        <>
          <ImageAreaSection symbolStack={symbolStack} />
          <MotionDiv className={bannerSectionCss}>
            <Banner
              type="card"
              description="전체 누적 시간"
              iconUrl="/assets/icons/graph/clock.png"
              title={totalTime}
            />
            <Banner
              type="card"
              description="총 미션 달성률"
              iconUrl="/assets/icons/graph/chart.png"
              title={totalMissionAttainRate}
            />
          </MotionDiv>
        </>
      )}
      <MissionSection />
    </>
  );
}

export default OverallStatus;

const bannerSectionCss = grid({
  gridTemplateColumns: '1fr 1fr',
  padding: '20px 16px',
  gap: '10px',
  margin: '0 auto',
});
