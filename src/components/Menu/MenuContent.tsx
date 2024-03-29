import { type ForwardedRef, forwardRef } from 'react';
import MenuItem from '@/components/Menu/MenuItem';
import { css } from '@styled-system/css';

import { type MenuContentProps } from './Menu.types';

function MenuContent({ menus, onMenuClick }: MenuContentProps, ref: ForwardedRef<HTMLUListElement>) {
  return (
    <ul className={menuCss} ref={ref}>
      {menus.map((menu) => (
        <MenuItem key={menu.label} {...menu} onClick={onMenuClick} />
      ))}
    </ul>
  );
}

export default forwardRef<HTMLUListElement, MenuContentProps>(MenuContent);

const menuCss = css({
  display: 'flex',
  padding: '10px 8px',
  flexDirection: 'column',
  minWidth: '153px',
  borderRadius: '20px',
  backgroundColor: 'bg.surface4',

  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});
