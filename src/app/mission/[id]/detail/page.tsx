'use client';

import MissionHistoryTab from '@/app/mission/[id]/detail/MissionHistoryTab';
import Header from '@/components/Header/Header';
import Tab from '@/components/Tab/Tab';
import { css } from '@styled-system/css';

export default function MissionDetailPage() {
  const tabs = [
    {
      tabName: '미션 내역',
      active: true,
    },
  ];
  const handleMenuClick = () => {
    // TODO : 수정하기로 라우팅
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
    label: '수정하기',
    id: 'edit',
  },
];
