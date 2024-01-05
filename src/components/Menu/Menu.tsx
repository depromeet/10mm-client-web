import { useLayoutEffect, useRef, useState } from 'react';
import { DEFAULT_OFFSET, MENU_CONTENT_WIDTH, MENU_MOTION_VARIANTS } from '@/components/Menu/Menu.contants';
import MenuContent from '@/components/Menu/MenuContent';
import { type MenuItemProps } from '@/components/Menu/MenuItem';
import AnimatePortal from '@/components/portal/AnimationPortal';
import useOutsideClick from '@/hooks/lifeCycle/useOutsideClick';
import useThrottle from '@/hooks/lifeCycle/useThrottle';
import { css } from '@styled-system/css';
import { motion } from 'framer-motion';

interface MenuProps {
  menus: MenuItemProps[];
  onClose: () => void;
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  offset?: {
    topOffset: number;
    leftOffset: number;
  };
}

function Menu({ menus, onClose, isOpen, anchorRef, offset }: MenuProps) {
  const { topOffset, leftOffset } = offset || {
    topOffset: DEFAULT_OFFSET,
    leftOffset: DEFAULT_OFFSET,
  };
  const modalRef = useRef(null);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useOutsideClick({
    ref: modalRef,
    handler: () => {
      onClose();
    },
  });

  const newMenus = menus.map((menu) => {
    return {
      ...menu,
      onClick: () => {
        menu.onClick(menu.id);
        onClose();
      },
    };
  });

  const resizeHandler = () => {
    if (!anchorRef.current) return;
    const { top, right, height } = anchorRef.current?.getBoundingClientRect();
    setPosition({ left: right - MENU_CONTENT_WIDTH - leftOffset, top: top + height + topOffset });
  };

  const throttledFn = useThrottle(resizeHandler, 100);

  useLayoutEffect(() => {
    if (!anchorRef.current) return;
    resizeHandler();
    window.addEventListener('resize', throttledFn);
    return () => {
      window.removeEventListener('resize', throttledFn);
    };
  }, [topOffset, leftOffset, anchorRef.current]);

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
