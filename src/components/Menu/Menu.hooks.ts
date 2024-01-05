import { useLayoutEffect, useState } from 'react';
import { type MenuProps } from '@/components/Menu/Menu';
import { DEFAULT_OFFSET, MENU_CONTENT_WIDTH } from '@/components/Menu/Menu.contants';
import useThrottle from '@/hooks/lifeCycle/useThrottle';

export const useMenuPosition = ({ anchorRef, offset }: Pick<MenuProps, 'anchorRef' | 'offset'>) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const { topOffset, leftOffset } = offset || {
    topOffset: DEFAULT_OFFSET,
    leftOffset: DEFAULT_OFFSET,
  };

  const resizeHandler = () => {
    if (!anchorRef.current) return;
    const { bottom, right } = anchorRef.current?.getBoundingClientRect();
    setPosition({ left: right - MENU_CONTENT_WIDTH - leftOffset, top: bottom + topOffset });
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

  return { position };
};
