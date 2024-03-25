import { type GetServerSidePropsContext } from 'next';
import BottomDim from '@/components/BottomDim/BottomDim';
import Header from '@/components/Header/Header';
import MissionHistoryTab from '@/components/MissionDetail/MissionHistoryTab';
import MissionHistoryTabLayout from '@/components/MissionDetail/MissionHistoryTabLayout';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import MissionStatistics from '@/pages/mission/[id]/detail/MissionStatistics';
import { css } from '@styled-system/css';

const MISSION_TABS = [
  {
    tabName: '미션 내역',
    id: 'mission-history',
  },
  {
    tabName: '통계',
    id: 'mission-statistics',
  },
];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      params: { id: context.query.id },
    },
  };
}

export default function FollowMissionDetailPage({ params: { id } }: { params: { id: string } }) {
  const { tabs, activeTab, onTabClick } = useTab(MISSION_TABS, 'mission-history');
  return (
    <main className={mainWrapperCss}>
      <Header rightAction={'none'} title={'미션 상세'} />
      <div className={tabWrapperCss}>
        <Tab tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>
      {activeTab === 'mission-history' && (
        <>
          <MissionHistoryTab isFollow={true} />
          <BottomDim />
        </>
      )}
      {activeTab === 'mission-statistics' && (
        <MissionHistoryTabLayout>
          <MissionStatistics missionId={id} />
        </MissionHistoryTabLayout>
      )}
    </main>
  );
}

const mainWrapperCss = css({
  height: '100vh',
  width: '100%',
  overflowY: 'hidden',
});

const tabWrapperCss = css({
  padding: '16px 16px 4px 16px',
});
