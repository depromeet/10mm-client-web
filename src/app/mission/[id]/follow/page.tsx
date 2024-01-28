'use client';

import MissionHistoryTab from '@/app/mission/[id]/detail/MissionHistoryTab';
import Header from '@/components/Header/Header';
import Tab from '@/components/Tab/Tab';
import { css } from '@styled-system/css';

export default function FollowMissionDetailPage() {
  const tabs = [
    {
      tabName: '미션 내역',
      id: 'mission-history',
    },
  ];

  return (
    <main className={mainWrapperCss}>
      <Header rightAction={'none'} title={'미션 상세'} />
      <div className={tabWrapperCss}>
        <Tab tabs={tabs} activeTab={'mission-history'} />
      </div>
      <MissionHistoryTab isFollow={true} />
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
