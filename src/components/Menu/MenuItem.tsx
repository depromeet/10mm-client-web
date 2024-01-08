import { css } from '@styled-system/css';

import { type MenuItemProps } from './Menu.types';

function MenuItem({ id, label, onClick }: MenuItemProps) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <li className={menuItemCss} onClick={handleClick}>
      {label}
    </li>
  );
}

export default MenuItem;

const menuItemCss = css({
  padding: '6px 16px',
  textAlign: 'left',
  textStyle: 'subtitle3',
  color: 'gray.gray800',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'bg.surface3',
  },
});
