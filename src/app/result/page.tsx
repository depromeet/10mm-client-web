'use client';

import FinishedMissionList from '@/app/result/FinishedMissionList';
import OverallStatus from '@/app/result/OverallStatus';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import LinkButton from '@/components/Button/LinkButton';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import { flex } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';

const TAB = [
  {
    id: 'overall-status',
    tabName: '전체 현황',
  },
  {
    id: 'finished-mission',
    tabName: '종료 미션',
  },
];

const handleLevelGuideClick = () => {
  eventLogger.logEvent(EVENT_LOG_CATEGORY.RESULT, EVENT_LOG_NAME.RESULT.CLICK_MISSION);
};

function ResultPage() {
  const tabProps = useTab(TAB);

  return (
    <div>
      <section className={topWrapperCss}>
        <Tab {...tabProps} />
        <LinkButton onClick={handleLevelGuideClick} size="small" variant="secondary" href={ROUTER.LEVEL.GUIDE}>
          레벨 안내
        </LinkButton>
      </section>
      {tabProps.activeTab === 'overall-status' && <OverallStatus />}
      {tabProps.activeTab === 'finished-mission' && <FinishedMissionList />}
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
