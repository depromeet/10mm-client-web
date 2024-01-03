'use client';

import useTabs from '@/hooks/useTabs';

import TabParts from './TabParts';

interface TabItemType {
  tabName: string;
  active: boolean;
}

interface TabProps {
  tabs: TabItemType[];
}

export default function Tab({ tabs: initialTabs }: TabProps) {
  const { tabs, handleTabClick } = useTabs(initialTabs);

  return (
    <div>
      {tabs.map((tab, index) => (
        <TabParts key={index} tabName={tab.tabName} isActive={tab.active} onTabClick={handleTabClick} />
      ))}
    </div>
  );
}
