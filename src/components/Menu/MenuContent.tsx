import { type ForwardedRef, forwardRef } from 'react';
import MenuItem, { type MenuItemProps } from '@/components/Menu/MenuItem';
import { css } from '@styled-system/css';

interface MenuContentProps {
  menus: MenuItemProps[];
}

function MenuContent({ menus }: MenuContentProps, ref: ForwardedRef<HTMLUListElement>) {
  return (
    <ul className={menuCss} ref={ref}>
      {menus.map((menu) => (
        <MenuItem key={menu.label} {...menu} />
      ))}
    </ul>
  );
}

export default forwardRef<HTMLUListElement, MenuContentProps>(MenuContent);

const menuCss = css({
  display: 'flex',
  padding: '10px 0',
  flexDirection: 'column',
  minWidth: '153px',
  borderRadius: '20px',
  backgroundColor: 'bg.surface4',

  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});
