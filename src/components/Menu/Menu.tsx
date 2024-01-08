import { type PropsWithChildren, useRef } from 'react';
import { MENU_MOTION_VARIANTS } from '@/components/Menu/Menu.contants';
import MenuContent from '@/components/Menu/MenuContent';
import { type MenuItemProps } from '@/components/Menu/MenuItem';
import useOutsideClick from '@/hooks/lifeCycle/useOutsideClick';
import { css, cx } from '@styled-system/css';
import { AnimatePresence, motion } from 'framer-motion';

export interface MenuProps extends PropsWithChildren {
  menus: MenuItemProps[];
  onClose: () => void;
  isOpen: boolean;
  offsetTop?: number;
  offsetRight?: number;
}

/**
 * @description Menu 컴포넌트
 * useModal 을 사용하여 오픈하면 됩니다.
 * @param menus 메뉴 리스트 (MenuItemProps)
 * @param onClose 메뉴 닫기
 * @param isOpen 메뉴 오픈 여부
 * @param children 메뉴 오픈 버튼
 * @param offsetRight 메뉴 오픈 버튼 기준으로 오른쪽으로 얼마나 떨어져 있을지
 * @param offsetTop 메뉴 오픈 버튼 기준으로 위쪽으로 얼마나 떨어져 있을지
 * @constructor
 */
function Menu({ menus, onClose, isOpen, children, offsetRight = 8, offsetTop = 4 }: MenuProps) {
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
    <AnimatePresence>
      <div className={menuOverlayCss}>
        {children}
        {isOpen && (
          <motion.div
            key="menu"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={MENU_MOTION_VARIANTS}
            className={cx(
              menuPositionCss,
              css({
                top: `calc(100% + ${offsetTop}px)`,
                right: `${offsetRight}px`,
              }),
            )}
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
});

const menuOverlayCss = css({
  boxSizing: 'border-box',

  position: 'relative',
  top: '0',
  left: '0',
  width: '100%',

  maxWidth: 'maxWidth',
  margin: '0 auto',
  height: '100%',
});
