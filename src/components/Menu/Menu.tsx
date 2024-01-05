import { useRef } from 'react';
import { MENU_MOTION_VARIANTS } from '@/components/Menu/Menu.contants';
import { useMenuPosition } from '@/components/Menu/Menu.hooks';
import MenuContent from '@/components/Menu/MenuContent';
import { type MenuItemProps } from '@/components/Menu/MenuItem';
import AnimatePortal from '@/components/portal/AnimationPortal';
import useOutsideClick from '@/hooks/lifeCycle/useOutsideClick';
import { css } from '@styled-system/css';
import { motion } from 'framer-motion';

export interface MenuProps {
  menus: MenuItemProps[];
  onClose: () => void;
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  offset?: {
    topOffset: number;
    leftOffset: number;
  };
}

/**
 * @description Menu 컴포넌트
 * useModal 을 사용하여 오픈하면 됩니다.
 * @param menus 메뉴 리스트 (MenuItemProps)
 * @param onClose 메뉴 닫기
 * @param isOpen 메뉴 오픈 여부
 * @param anchorRef 메뉴 오픈 기준이 되는 Ref
 * @param offset 메뉴 오픈 위치 조정 (옵셔널)
 * @constructor
 */
function Menu({ menus, onClose, isOpen, anchorRef, offset }: MenuProps) {
  const modalRef = useRef(null);
  const { position } = useMenuPosition({ anchorRef, offset });

  const newMenus = menus.map((menu) => {
    return {
      ...menu,
      onClick: () => {
        menu.onClick(menu.id);
        onClose();
      },
    };
  });

  useOutsideClick({
    ref: modalRef,
    handler: () => {
      onClose();
    },
  });

  return (
    <AnimatePortal isShowing={isOpen} mode={'popLayout'}>
      <div className={menuOverlayCss}>
        <motion.div
          key="menu"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={MENU_MOTION_VARIANTS}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <MenuContent menus={newMenus} ref={modalRef} />
        </motion.div>
      </div>
    </AnimatePortal>
  );
}

export default Menu;
const menuOverlayCss = css({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
});
