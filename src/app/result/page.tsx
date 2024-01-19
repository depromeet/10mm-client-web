import Button from '@/components/Button/Button';
import Tab from '@/components/Tab/Tab';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getLevel } from '@/utils/result';

import LevelStatus from './LevelStatus/LevelStatus';

const TAB = [
  {
    id: 'result',
    tabName: '전체 현황',
  },
];

const DUMMY_SYMBOL_STACK = 90;

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
      <section>
        <LevelStatus current={DUMMY_SYMBOL_STACK} level={currentLevel} />
      </section>
    </div>
  );
}

export default ResultPage;

const topWrapperCss = flex({});
const buttonCss = css({
  margin: '11px 16px 4px 0 ',
});
