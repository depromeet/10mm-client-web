import { type ComponentProps, type PropsWithChildren, useRef } from 'react';
import { DEFAULT_OFFSET_RIGHT, DEFAULT_OFFSET_TOP, MENU_MOTION_VARIANTS } from '@/components/Menu/Menu.contants';
import MenuContent from '@/components/Menu/MenuContent';
import useOutsideClick from '@/hooks/useOutsideClick';
import { css } from '@styled-system/css';
import { AnimatePresence, motion } from 'framer-motion';

export interface MenuProps extends PropsWithChildren<ComponentProps<typeof MenuContent>> {
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
 * @param onMenuClick 메뉴 클릭시 이벤트
 * @param offsetRight 메뉴 오픈 버튼 기준으로 오른쪽으로 얼마나 떨어져 있을지
 * @param offsetTop 메뉴 오픈 버튼 기준으로 위쪽으로 얼마나 떨어져 있을지
 * @constructor
 */
function Menu({
  menus,
  onClose,
  isOpen,
  children,
  onMenuClick,
  offsetRight = DEFAULT_OFFSET_RIGHT,
  offsetTop = DEFAULT_OFFSET_TOP,
}: MenuProps) {
  const modalRef = useRef(null);

  const newMenuClick = (id: string) => {
    onMenuClick(id);
    onClose();
  };

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
            className={menuPositionCss}
            style={{
              top: `calc(100% + ${offsetTop}px)`,
              right: `${offsetRight}px`,
            }}
          >
            <MenuContent menus={menus} onMenuClick={newMenuClick} ref={modalRef} />
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

  height: '100%',
});
