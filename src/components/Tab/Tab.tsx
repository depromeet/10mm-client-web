'use client';

import { useState } from 'react';

import TabParts from './TabParts';

interface Tab {
  tabName: string;
  status: boolean;
}

export default function Tab() {
  //TabParts를 호출하는 상위 컴포넌트에서 각 TabPart의 status 제어하기
  const [tabs, setTabs] = useState<Tab[]>([
    { tabName: 'tab 1', status: true },
    { tabName: 'tab 2', status: false },
    { tabName: 'tab 3', status: false },
  ]);

  const handleTabClick = (clickedTabName: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      status: tab.tabName === clickedTabName,
    }));
    setTabs(updatedTabs); //현재 선택된 탭
  };

  return (
    <div>
      {tabs.map((tab, index) => (
        <TabParts key={index} tabName={tab.tabName} status={tab.status} onTabClick={handleTabClick} />
      ))}
    </div>
  );
}
