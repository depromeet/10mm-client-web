export const MENU_CONTENT_WIDTH = 153;

export const DEFAULT_OFFSET = 12;

export const MENU_MOTION_VARIANTS = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      delay: 0.03,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      delay: 0.03,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      delay: 0.03,
    },
  },
};
