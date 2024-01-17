'use client';

import { useParams, useRouter } from 'next/navigation';
import MISSION_APIS, { useDeleteMissionMutation } from '@/apis/mission';
import MissionHistoryTab from '@/app/mission/[id]/detail/MissionHistoryTab';
import useCheckCompleteMission from '@/app/mission/[id]/detail/useCheckCompleteMission';
import Dialog from '@/components/Dialog/Dialog';
import Header from '@/components/Header/Header';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import Tab from '@/components/Tab/Tab';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import { css } from '@styled-system/css';

export default function MissionDetailPage() {
  const { isOpen, openModal: openDeleteDialog, closeModal: closeDeleteDialog } = useModal();
  const router = useRouter();

  const { triggerSnackBar } = useSnackBar();
  const { id } = useParams();
  const { isCompeteMission } = useCheckCompleteMission(id as string);

  const { mutate: missionDeleteMutate } = useDeleteMissionMutation(id as string, {
    onSuccess: () => {
      router.replace(ROUTER.HOME);
    },
    onError: () => {
      triggerSnackBar({ message: '미션 삭제에 실패했습니다. 다시 시도해주세요.' });
    },
  });
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

  const handleDeleteCancel = () => {
    closeDeleteDialog();
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
      <Tab tabs={tabs} activeTab={'mission-history'} />
      <MissionHistoryTab isButtonDisabled={isCompeteMission} />
      <Dialog
        variant={'default'}
        isOpen={isOpen}
        onClose={closeDeleteDialog}
        onConfirm={missionDeleteMutate}
        onCancel={handleDeleteCancel}
        title="정말 삭제하시겠어요?"
        content="미션을 삭제하면 그동안의 기록들이 사라져요."
        confirmText="삭제"
        cancelText="취소"
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
