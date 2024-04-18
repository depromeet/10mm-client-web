import { type GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import { MissionDeleteDialog } from '@/components/MissionDetail';
import MissionCalendar from '@/components/MissionDetail/MissionCalender/MissionCalendar';
import MissionHistoryTabLayout from '@/components/MissionDetail/MissionHistoryTabLayout';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import MissionHistoryBannerApi from '@/pages/mission/[id]/detail/MissionHistoryBanner/MissionHistoryBannerApi';
import MissionStatistics from '@/pages/mission/[id]/detail/MissionStatistics';
import { ResultTabId } from '@/pages/result/result.constants';
import { css } from '@/styled-system/css';
import dayjs from 'dayjs';

const MISSION_TAB = [
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

function FinishedMissionDetailPage({ params: { id } }: { params: { id: string } }) {
  const { isOpen, openModal: openDeleteDialog, closeModal: closeDeleteDialog } = useModal();
  const router = useRouter();

  const missionId = id;
  const currentData = dayjs();

  const { tabs, activeTab, onTabClick } = useTab(MISSION_TAB, 'mission-history');
  const handleMenuClick = () => {
    openDeleteDialog();
  };

  return (
    <main className={mainWrapperCss}>
      <Header
        title={'미션 상세'}
        rightAction="icon-menu"
        iconName={'menu'}
        menus={DETAIL_MENUS}
        onMenuClick={handleMenuClick}
        onBackAction={() => router.replace(ROUTER.RESULT.HOME(ResultTabId.FINISHED_MISSION))}
      />

      <div className={tabWrapperCss}>
        <Tab tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>
      {activeTab === 'mission-history' && (
        <MissionHistoryTabLayout>
          {missionId && <MissionHistoryBannerApi missionId={String(missionId)} />}
          <MissionCalendar currentData={currentData} missionId={Number(missionId)} />
        </MissionHistoryTabLayout>
      )}
      {activeTab === 'mission-statistics' && (
        <MissionHistoryTabLayout>
          <MissionStatistics missionId={missionId} />
        </MissionHistoryTabLayout>
      )}
      <MissionDeleteDialog
        isOpen={isOpen}
        closeModal={closeDeleteDialog}
        missionId={String(id)}
        successRoutePath={ROUTER.RESULT.HOME(ResultTabId.FINISHED_MISSION)}
      />
    </main>
  );
}

export default FinishedMissionDetailPage;

const mainWrapperCss = css({
  width: '100%',
});

const DETAIL_MENUS = [
  {
    label: '미션 삭제',
    id: 'mission-delete',
  },
];

const tabWrapperCss = css({
  padding: '16px 16px 4px 16px',
});
