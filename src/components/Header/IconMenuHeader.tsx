import { type IconMenuHeaderType } from '@/components/Header/Header.types';
import HeaderBase from '@/components/Header/HeaderBase';
import Icon from '@/components/Icon';
import { Menu } from '@/components/Menu';
import useModal from '@/hooks/useModal';
import { css } from '@styled-system/css';

function IconMenuHeader({ iconName = 'menu', menus, onMenuClick, ...props }: IconMenuHeaderType) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <HeaderBase
      rightElement={
        <Menu menus={menus} onMenuClick={onMenuClick} onClose={closeModal} isOpen={isOpen}>
          <div className={iconWrapperCss} onClick={openModal}>
            <Icon name={iconName} width={20} height={20} />
          </div>
        </Menu>
      }
      {...props}
    />
  );
}

export default IconMenuHeader;

const iconWrapperCss = css({
  padding: '12px',
  cursor: 'pointer',
});
