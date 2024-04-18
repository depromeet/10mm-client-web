import Link from 'next/link';
import { useGetFinishedMissions } from '@/apis/mission';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { EVENT_LOG_CATEGORY, EVENT_LOG_NAME } from '@/constants/eventLog';
import { ROUTER } from '@/constants/router';
import useSearchParamsTypedValue from '@/hooks/useSearchParamsTypedValue';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { eventLogger } from '@/utils';

import FinishedMissionList from './FinishedMissionList';
import OverallStatus from './OverallStatus';
import { ResultTabId } from './result.constants';

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
        <div className={tabWrapperCss}>
          <Tab {...tabProps} />
        </div>
        <Link className={levelGuideLinkCss} onClick={handleLevelGuideClick} href={ROUTER.LEVEL.GUIDE}>
          레벨 안내
        </Link>
      </section>
      {tabProps.activeTab === ResultTabId.OVERALL_STATUS && <OverallStatus />}
      {tabProps.activeTab === ResultTabId.FINISHED_MISSION && (
        <FinishedMissionList queryData={finishedMissionQueryData} />
      )}
      <BottomDim />
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
  justifyContent: 'space-between',
});

const tabWrapperCss = css({
  padding: '28px 16px 4px 16px',
});

const levelGuideLinkCss = css({
  color: 'gray.gray800',
  border: '1px solid',
  borderColor: 'gray.gray500',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: '300',
  width: 'fit-content',
  display: 'block',
  padding: '0 12px',
  minWidth: '75px',
  lineHeight: '28px',
  height: '30px',
  marginTop: '23px',
  marginRight: '16px',
});
