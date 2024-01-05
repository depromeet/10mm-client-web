import { css } from '@styled-system/css';

export interface MenuItemProps {
  id: string;
  label: string;
  onClick: (id: string) => void;
}

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
