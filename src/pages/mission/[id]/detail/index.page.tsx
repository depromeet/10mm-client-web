import { useRouter } from 'next/router';
import useCheckCompleteMission from '@/app/mission/[id]/detail/useCheckCompleteMission';
import Header from '@/components/Header/Header';
import { MissionDeleteDialog } from '@/components/MissionDetail';
import Tab from '@/components/Tab/Tab';
import { useTab } from '@/components/Tab/Tab.hooks';
import { ROUTER } from '@/constants/router';
import useModal from '@/hooks/useModal';
import MissionTabContents from '@/pages/mission/[id]/detail/MissionTabContents';
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

export default function MissionDetailPage() {
  const { isOpen, openModal: openDeleteDialog, closeModal: closeDeleteDialog } = useModal();
  const router = useRouter();
  const id = router.query.id;

  const { isCompeteMission } = useCheckCompleteMission(id as string);

  const { tabs, activeTab, onTabClick } = useTab(MISSION_TABS, 'mission-history');

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
        <Tab tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>
      <MissionTabContents tab={activeTab} missionId={id as string} isCompeteMission={isCompeteMission} />
      <MissionDeleteDialog
        isOpen={isOpen}
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
