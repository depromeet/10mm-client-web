'use client';

import MissionHistoryTab from '@/app/mission/[id]/detail/MissionHistoryTab';
import Header from '@/components/Header/Header';
import Tab from '@/components/Tab/Tab';
import { css } from '@styled-system/css';

export default function MissionDetailPage() {
  const handleIconClick = () => {
    // TODO: 메뉴 열기
  };

  const tabs = [
    {
      tabName: '미션 내역',
      active: true,
    },
  ];

  return (
    <main className={mainWrapperCss}>
      <Header title={'미션 상세'} rightAction="icon" iconName={'menu'} onIconClick={handleIconClick} />
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
