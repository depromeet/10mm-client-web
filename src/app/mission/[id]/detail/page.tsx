'use client';

import { useRouter } from 'next/navigation';
import MissionHistoryTab from '@/app/mission/[id]/detail/MissionHistoryTab';
import Dialog from '@/components/Dialog/Dialog';
import Header from '@/components/Header/Header';
import Tab from '@/components/Tab/Tab';
import useModal from '@/hooks/useModal';
import { css } from '@styled-system/css';

export default function MissionDetailPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const tabs = [
    {
      tabName: '미션 내역',
      active: true,
    },
  ];

  const handleMenuClick = (id: string) => {
    id === 'mission-modify' ? router.replace('detail/modify') : openModal();
  };
  const handleDeleteConfirm = () => {
    //TODO: 삭제 API 추가
    alert('미션 삭제 확인');
    router.replace('/');
    closeModal();
  };

  const handleDeleteCancel = () => {
    alert('미션 삭제 취소');
    closeModal();
  };

  return (
    <main className={mainWrapperCss}>
      <Header
        title={'미션 상세'}
        rightAction="icon-menu"
        iconName={'menu'}
        menus={DETAIL_MENUS}
        onMenuClick={handleMenuClick}
      />
      <Tab tabs={tabs} />
      <MissionHistoryTab />
      <Dialog
        variant={'default'}
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
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
