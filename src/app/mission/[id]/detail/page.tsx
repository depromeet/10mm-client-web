'use client';

import { useParams, useRouter } from 'next/navigation';
import MissionStartButton from '@/app/mission/[id]/detail/MissionStartButton';
import useCheckCompleteMission from '@/app/mission/[id]/detail/useCheckCompleteMission';
import Header from '@/components/Header/Header';
import { MissionDeleteDialog } from '@/components/MissionDetail';
import MissionHistoryTab from '@/components/MissionDetail/MissionHistoryTab';
import Tab from '@/components/Tab/Tab';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import { css } from '@styled-system/css';

export default function MissionDetailPage() {
  const { isOpen, openModal: openDeleteDialog, closeModal: closeDeleteDialog } = useModal();
  const router = useRouter();

  const { id } = useParams();
  const { isCompeteMission } = useCheckCompleteMission(id as string);

  const tabs = [
    {
      tabName: '미션 내역',
      id: 'mission-history',
    },
  ];

  const handleMenuClick = (menuId: string) => {
    if (menuId === 'mission-modify') {
      router.push(ROUTER.MISSION.MODIFY(id as string));
      return;
    }
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
        onBackAction={() => router.replace(ROUTER.HOME)}
      />
      <div className={tabWrapperCss}>
        <Tab tabs={tabs} activeTab={'mission-history'} />
      </div>
      <MissionHistoryTab />
      <MissionStartButton missionId={id as string} isCompeteMission={isCompeteMission} />
      <MissionDeleteDialog
        isOpen={isOpen}
        openModal={openDeleteDialog}
        closeModal={closeDeleteDialog}
        missionId={String(id)}
        successRoutePath={ROUTER.HOME}
      />
    </main>
  );
}

const mainWrapperCss = css({
  height: '100vh',
  width: '100%',
  overflowY: 'hidden',
});

const DETAIL_MENUS = [
  {
    label: '미션 수정',
    id: 'mission-modify',
  },
  {
    label: '미션 삭제',
    id: 'mission-delete',
  },
];

const tabWrapperCss = css({
  padding: '16px 16px 4px 16px',
});
