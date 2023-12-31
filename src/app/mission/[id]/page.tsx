'use client';

import MissionHistoryTab from '@/app/mission/[id]/MissionHistoryTab';
import Tab from '@/app/mission/[id]/Tab';
import Header from '@/components/Header/Header';
import { css } from '@styled-system/css';

export default function MissionDetailPage() {
  const handleIconClick = () => {
    // TODO: 메뉴 열기
  };

  const tabs = [
    {
      label: '미션 내역',
      component: <MissionHistoryTab />,
    },
  ];

  return (
    <main className={mainWrapperCss}>
      <Header title={'미션 상세'} rightAction="icon" iconName={'menu'} onIconClick={handleIconClick} />
      <Tab tabs={tabs} />
    </main>
  );
}

const mainWrapperCss = css({
  height: '100vh',
  width: '100%',
  overflowY: 'hidden',
});
