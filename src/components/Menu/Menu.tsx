import { type PropsWithChildren, useRef } from 'react';
import { MENU_MOTION_VARIANTS } from '@/components/Menu/Menu.contants';
import MenuContent from '@/components/Menu/MenuContent';
import { type MenuItemProps } from '@/components/Menu/MenuItem';
import useOutsideClick from '@/hooks/lifeCycle/useOutsideClick';
import { css } from '@styled-system/css';
import { AnimatePresence, motion } from 'framer-motion';

export interface MenuProps extends PropsWithChildren {
  menus: MenuItemProps[];
  onClose: () => void;
  isOpen: boolean;
}

/**
 * @description Menu 컴포넌트
 * useModal 을 사용하여 오픈하면 됩니다.
 * @param menus 메뉴 리스트 (MenuItemProps)
 * @param onClose 메뉴 닫기
 * @param isOpen 메뉴 오픈 여부
 * @param children 메뉴 오픈 버튼
 * @constructor
 */
function Menu({ menus, onClose, isOpen, children }: MenuProps) {
  const modalRef = useRef(null);

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
    <AnimatePresence mode="wait">
      <div className={menuOverlayCss}>
        {children}
        {isOpen && (
          <motion.div
            key="menu"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={MENU_MOTION_VARIANTS}
            className={menuPositionCss}
          >
            <MenuContent menus={newMenus} ref={modalRef} />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default Menu;

const menuPositionCss = css({
  position: 'absolute',
  top: 'calc(100% + 12px)',
  right: `12px`,
});

const menuOverlayCss = css({
  position: 'relative',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
});
