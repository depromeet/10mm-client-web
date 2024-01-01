'use client';

import useTabs from '@/hooks/useTabs';

import TabParts from './TabParts';

interface Tab {
  tabName: string;
  active: boolean;
}

interface TabProps {
  Tabs: Tab[];
}

export default function Tab({ Tabs }: TabProps) {
  const { tabs, handleTabClick } = useTabs(Tabs);

  return (
    <div>
      {tabs.map((tab, index) => (
        <TabParts key={index} tabName={tab.tabName} status={tab.active} onTabClick={handleTabClick} />
      ))}
    </div>
  );
}
