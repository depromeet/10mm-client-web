export interface MenuBaseItem {
  id: string;
  label: string;
}

export interface MenuContentProps {
  menus: MenuBaseItem[];
  onMenuClick: (id: string) => void;
}

export interface MenuItemProps extends MenuBaseItem {
  onClick: (id: string) => void;
}
