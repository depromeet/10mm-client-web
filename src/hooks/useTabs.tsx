import { useState } from 'react';

interface Tab {
  tabName: string;
  active: boolean;
}

const useTabs = (initialTabs: Tab[]) => {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);

  const handleTabClick = (clickedTabName: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      active: tab.tabName === clickedTabName,
    }));
    setTabs(updatedTabs);
  };
  return { tabs, handleTabClick };
};
export default useTabs;
