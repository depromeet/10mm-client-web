'use client';

import useTabs from '@/hooks/useTabs';
import { css } from '@styled-system/css';

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
    <div className={tabWrapperCss}>
      {tabs.map((tab, index) => (
        <TabParts key={index} tabName={tab.tabName} isActive={tab.active} onTabClick={handleTabClick} />
      ))}
    </div>
  );
}

const tabWrapperCss = css({
  padding: '16px 16px 4px 16px',
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  width: '100%',
});
