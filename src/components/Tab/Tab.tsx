'use client';

import useTabs from '@/hooks/useTabs';

import TabParts from './TabParts';

interface TabItemType {
  tabName: string;
  active: boolean;
}

interface TabProps {
  Tabs: TabItemType[];
}

export default function Tab({ Tabs }: TabProps) {
  const { tabs, handleTabClick } = useTabs(Tabs);

  return (
    <div>
      {tabs.map((tab, index) => (
        <TabParts key={index} tabName={tab.tabName} isActive={tab.active} onTabClick={handleTabClick} />
      ))}
    </div>
  );
}
