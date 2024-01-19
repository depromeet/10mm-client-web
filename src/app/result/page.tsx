import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import Banner from '@/components/Banner/Banner';
import Button from '@/components/Button/Button';
import Tab from '@/components/Tab/Tab';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';
import { getLevel } from '@/utils/result';

import LevelStatus from './LevelStatus/LevelStatus';

const TAB = [
  {
    id: 'result',
    tabName: '전체 현황',
  },
];

const DUMMY_SYMBOL_STACK = 90;
const DUMMY_TIME = '102h 53m';
const DUMMY_PERCENT = '72.5%';

function ResultPage() {
  const currentLevel = getLevel(DUMMY_SYMBOL_STACK);

  return (
    <div>
      <section className={topWrapperCss}>
        <Tab tabs={TAB} activeTab="result" />
        <Button size="small" variant="secondary" className={buttonCss}>
          레벨 안내
        </Button>
      </section>
      <LevelStatus current={DUMMY_SYMBOL_STACK} level={currentLevel} />
      <section className={bannerSectionCss}>
        <Banner type="card" description="전체 누적 시간" iconName="alarm" title={DUMMY_TIME} />
        <Banner type="card" description="총 미션 달성률" iconName="alarm" title={DUMMY_PERCENT} />
      </section>
      <AppBarBottom />
    </div>
  );
}

export default ResultPage;

const topWrapperCss = flex({});
const buttonCss = css({
  margin: '11px 16px 4px 0 ',
});

const bannerSectionCss = grid({
  gridTemplateColumns: '1fr 1fr',
  padding: '20px 16px',
  gap: '10px',
  maxWidth: '376px',
  margin: '0 auto',
});
