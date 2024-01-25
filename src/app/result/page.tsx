'use client';

import { useGetMissionSummary } from '@/apis/mission';
import Character from '@/app/level/guide/Character';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import Banner from '@/components/Banner/Banner';
import LinkButton from '@/components/Button/LinkButton';
import Tab from '@/components/Tab/Tab';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';
import { getLevel } from '@/utils/result';

import LevelStatus from '../../components/LevelStatus/LevelStatus';

const TAB = [
  {
    id: 'result',
    tabName: '전체 현황',
  },
];

function ResultPage() {
  const { data } = useGetMissionSummary();

  const symbolStack = data?.symbolStack ?? 0;
  const currentLevel = getLevel(symbolStack);
  const totalTime = `${data?.totalMissionHour ?? 0}h ${data?.totalMissionMinute ?? 0}m`;
  const totalMissionAttainRate = `${data?.totalMissionAttainRate ?? 0}%`;

  return (
    <div>
      <section className={topWrapperCss}>
        <Tab tabs={TAB} activeTab="result" />
        <LinkButton size="small" variant="secondary" href={ROUTER.LEVEL.GUIDE}>
          레벨 안내
        </LinkButton>
      </section>
      <section className={imageSectionCss}>
        <Character width={280} height={210} level={currentLevel.level} isBackground />
      </section>
      <LevelStatus symbolStack={symbolStack} viewLevel={currentLevel.level} />
      <section className={bannerSectionCss}>
        <Banner type="card" description="전체 누적 시간" iconUrl="/assets/icons/graph/clock.png" title={totalTime} />
        <Banner
          type="card"
          description="총 미션 달성률"
          iconUrl="/assets/icons/graph/chart.png"
          title={totalMissionAttainRate}
        />
      </section>
      <AppBarBottom />
    </div>
  );
}

export default ResultPage;

const topWrapperCss = flex({
  zIndex: 1,
  position: 'relative',
  padding: '16px 16px 4px 16px',
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

  // '& img.character': {
  //   height: '210px !important',
  //   objectFit: 'contain',
  // },

  // '& img.bg': {
  //   position: 'absolute',
  //   transform: 'translateY(-20%);',
  //   width: '100vw !important',
  //   height: '382px !important',
  //   objectFit: 'contain',
  // },
});
