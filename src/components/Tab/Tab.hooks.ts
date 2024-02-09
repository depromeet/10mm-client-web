'use client';

import { useState } from 'react';
import { type TabType } from '@/components/Tab/Tab.types';

export const useTab = (tabs: TabType[], initTabId?: string) => {
  const [activeTab, setActiveTab] = useState(initTabId ?? tabs[0].id);

  const onTabClick = (clickedTabType: TabType) => {
    setActiveTab(clickedTabType.id);
  };

  return { tabs, activeTab, onTabClick };
};
