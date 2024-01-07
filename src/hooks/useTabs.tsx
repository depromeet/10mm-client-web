import { useState } from 'react';

interface TabType {
  tabName: string;
  active: boolean;
}

const useTabs = (initialTabs: TabType[]) => {
  const [tabs, setTabs] = useState<TabType[]>(initialTabs);

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
