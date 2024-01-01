'use client';

import useTabs from '@/hooks/useTabs';

import TabParts from './TabParts';

interface Tab {
  tabName: string;
  active: boolean;
}

export default function Tab() {
  //Tab을 사용하는 공세서 tabName과
  const initialTabs = [
    { tabName: '탭 1', active: true },
    { tabName: '탭 2', active: false },
    { tabName: '탭 3', active: false },
  ];

  const { tabs, handleTabClick } = useTabs(initialTabs);

  return (
    <div>
      {tabs.map((tab, index) => (
        <TabParts key={index} tabName={tab.tabName} status={tab.active} onTabClick={handleTabClick} />
      ))}
    </div>
  );
}
