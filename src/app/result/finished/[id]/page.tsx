'use client';

import { useParams, useRouter } from 'next/navigation';
import { ResultTabId } from '@/app/result/result.constants';
import Header from '@/components/Header/Header';
import { MissionDeleteDialog, MissionHistoryTab } from '@/components/MissionDetail';
import Tab from '@/components/Tab/Tab';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import { css } from '@/styled-system/css';

function FinishedMissionDetailPage() {
  const { isOpen, openModal: openDeleteDialog, closeModal: closeDeleteDialog } = useModal();
  const router = useRouter();

  const { id } = useParams();

  const tabs = [
    {
      tabName: '미션 내역',
      id: 'mission-history',
    },
  ];

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
        <Tab tabs={tabs} activeTab={'mission-history'} />
      </div>

      <MissionHistoryTab />

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
  height: '100vh',
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
