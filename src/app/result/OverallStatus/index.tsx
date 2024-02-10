'use client';

import Link from 'next/link';
import { useGetMissionSummary } from '@/apis/mission';
import Character from '@/app/level/guide/Character';
import MissionSection from '@/app/result/OverallStatus/MissionSection';
import Banner from '@/components/Banner/Banner';
import Graph from '@/components/Graph/GraphBase';
import Icon from '@/components/Icon';
import MotionDiv from '@/components/Motion/MotionDiv';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { grid } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';
import { getLevel } from '@/utils/result';

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
          <section className={characterSectionCss}>
            <div className={levelStatusCss}>
              <Graph.SymbolText symbolStack={symbolStack} />
              <p className={levelTextCss}>{currentLevel.label}</p>
              <Graph.ProgressBar symbolStack={symbolStack} min={currentLevel.min} max={currentLevel.max} />
              <Link className={levelGuideLinkCss} onClick={handleLevelGuideClick} href={ROUTER.LEVEL.GUIDE}>
                레벨 안내 <Icon name="arrow-forward" size={12} />
              </Link>
            </div>
            <MotionDiv variants="fadeInUp" className={imageSectionCss}>
              <Character width={200} height={150} level={currentLevel.level} isBackground />
            </MotionDiv>
          </section>
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

const handleLevelGuideClick = () => {
  eventLogger.logEvent(EVENT_LOG_CATEGORY.RESULT, EVENT_LOG_NAME.RESULT.CLICK_MISSION);
};

const levelGuideLinkCss = css({
  color: 'purple.purple500',
  textStyle: 'body3',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: '17px',
});

const characterSectionCss = css({
  display: 'flex',
  alignItems: 'center',
  height: '219px',
});

const levelTextCss = css({
  margin: '12px 0 10px',
  color: '#fff',
  textStyle: 'caption',
});

const levelStatusCss = css({
  paddingLeft: '28px',
  '& > div': {
    width: '93px',
  },
});

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
