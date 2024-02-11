'use client';

import { useGetFinishedMissions } from '@/apis/mission';
import FinishedMissionList from '@/app/result/FinishedMissionList';
import OverallStatus from '@/app/result/OverallStatus';
import { ResultTabId } from '@/app/result/result.constants';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { flex } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';

const handleLevelGuideClick = () => {
  eventLogger.logEvent(EVENT_LOG_CATEGORY.RESULT, EVENT_LOG_NAME.RESULT.CLICK_MISSION);
};

function ResultPage() {
  const finishedMissionQueryData = useGetFinishedMissions();
  const finishedMissionCount = finishedMissionQueryData.data?.length ?? 0;

  const tabProps = useResultTab(finishedMissionCount);

  return (
    <>
      <section className={topWrapperCss}>
        <Tab {...tabProps} />
        {/* <Link className={levelGuideLinkCss} onClick={handleLevelGuideClick} href={ROUTER.LEVEL.GUIDE}>
          레벨 안내 <Icon name="arrow-forward" size={12} />
        </Link> */}
      </section>
      {tabProps.activeTab === 'overall-status' && <OverallStatus />}
      {tabProps.activeTab === 'finished-mission' && <FinishedMissionList queryData={finishedMissionQueryData} />}
      <AppBarBottom />
    </>
  );
}

export default ResultPage;

const useResultTab = (finishedMissionCount: number) => {
  const { searchParams } = useSearchParamsTypedValue<ResultTabId>('tab');
  const initTabId = searchParams ?? ResultTabId.OVERALL_STATUS;

  const tabList = [
    {
      id: ResultTabId.OVERALL_STATUS,
      tabName: '전체 현황',
      href: ROUTER.RESULT.HOME(ResultTabId.OVERALL_STATUS),
    },
    {
      id: ResultTabId.FINISHED_MISSION,
      tabName: `종료 미션 ${finishedMissionCount === 0 ? '' : finishedMissionCount}`,
      href: ROUTER.RESULT.HOME(ResultTabId.FINISHED_MISSION),
    },
  ];

  const tabProps = useTab(tabList, initTabId);

  return tabProps;
};
const topWrapperCss = flex({
  zIndex: 1,
  position: 'relative',
  padding: '28px 16px 4px 16px',
});
