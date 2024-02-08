export interface TabProps {
  tabs: TabType[];
  activeTab: string;
  onTabClick?: (clickedTabType: TabType) => void;
}

export type TabType = {
  tabName: string;
  id: string;
  href?: string;
};

export interface TabPartsProps extends TabType {
  isActive: boolean;
  onTabClick?: (clickedTabType: TabType) => void;
}

export interface FullTabPartsProps extends TabPartsProps {
  isActive: boolean;
  onTabClick?: () => void;
}
