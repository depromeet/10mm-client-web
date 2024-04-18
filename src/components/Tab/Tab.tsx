import { css } from '@styled-system/css';

import { type TabProps } from './Tab.types';
import TabParts from './TabParts';

export default function Tab({ tabs, activeTab, onTabClick }: TabProps) {
  return (
    <div className={tabWrapperCss}>
      {tabs.map((tab) => (
        <TabParts key={tab.id} {...tab} isActive={tab.id === activeTab} onTabClick={onTabClick} />
      ))}
    </div>
  );
}

const tabWrapperCss = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  width: '100%',
  height: 'fit-content',
});
