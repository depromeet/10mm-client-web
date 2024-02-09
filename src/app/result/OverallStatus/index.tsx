'use client';

import { useGetMissionSummary } from '@/apis/mission';
import Character from '@/app/level/guide/Character';
import Banner from '@/components/Banner/Banner';
import LevelStatus from '@/components/LevelStatus/LevelStatus';
import MotionDiv from '@/components/Motion/MotionDiv';
import { css } from '@/styled-system/css';
import { grid } from '@/styled-system/patterns';
import { getLevel } from '@/utils/result';

import MissionCalendar from './Calendar';

function OverallStatus() {
  const { data, isLoading } = useGetMissionSummary();

  const symbolStack = data?.symbolStack ?? 0;
  const currentLevel = getLevel(symbolStack);
  const totalTime = `${data?.totalMissionHour ?? 0}h ${data?.totalMissionMinute ?? 0}m`;
  const totalMissionAttainRate = `${data?.totalMissionAttainRate ?? 0}%`;

  return (
    <>
      {isLoading ? (
        // TODO : 스켈레톤 추가
        <div></div>
      ) : (
        <>
          <MotionDiv variants="fadeInUp" className={imageSectionCss}>
            <Character width={280} height={210} level={currentLevel.level} isBackground />
          </MotionDiv>
          <LevelStatus symbolStack={symbolStack} viewLevel={currentLevel.level} />
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
      <section className={calendarWrapperCss}>
        <MissionCalendar />
      </section>
    </>
  );
}

export default OverallStatus;

const bannerSectionCss = grid({
  gridTemplateColumns: '1fr 1fr',
  padding: '20px 16px',
  gap: '10px',
  maxWidth: '376px',
  margin: '0 auto',
});

const imageSectionCss = css({
  margin: '43px auto 12px',
  position: 'relative',
  height: '210px',
});

const calendarWrapperCss = css({
  padding: '6px 12px 10px',
  // maxWidth: '328px',
  margin: '0 auto',
});
