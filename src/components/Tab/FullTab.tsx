import React from 'react';
import FullTabParts from '@/components/Tab/FullTabParts';
import { type TabProps } from '@/components/Tab/Tab.types';
import { css } from '@/styled-system/css';

function FullTab({ tabs, activeTab, onTabClick }: TabProps) {
  return (
    <div className={tabWrapperCss}>
      {tabs.map((tab) => (
        <FullTabParts key={tab.id} {...tab} isActive={tab.id === activeTab} onTabClick={() => onTabClick?.(tab)} />
      ))}
    </div>
  );
}

export default FullTab;

const tabWrapperCss = css({
  display: 'flex',
  width: '100%',
  height: 'fit-content',
  padding: '0 16px',
});
