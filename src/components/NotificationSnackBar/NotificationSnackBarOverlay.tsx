'use client';
import React from 'react';
import { cva } from '@styled-system/css';
import { AnimatePresence, motion } from 'framer-motion';

import NotificationSnackBar from './NotificationSnackBar';
import { useNotificationSnackBar } from './NotificationSnackBarProvider';

function NotificationSnackBarOverlay() {
  const { notificationSnackBar } = useNotificationSnackBar();

  return (
    <AnimatePresence mode="wait">
      {notificationSnackBar &&
        notificationSnackBar.map((item) => (
          <motion.div
            key={item.id}
            className={snackBarOverlayCss({ position: 'top' })}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={snackBarMotionVariants}
          >
            <NotificationSnackBar key={item.id} onClick={() => null} {...item} />
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export default NotificationSnackBarOverlay;

export const snackBarOverlayCss = cva({
  base: {
    position: 'fixed',
    left: 0,
    right: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '14px',
    zIndex: 2000,
  },
  variants: {
    position: {
      top: {
        bottom: 'auto',
      },
      bottom: {
        bottom: `20px`,
        top: 'auto',
      },
    },
  },
  compoundVariants: [
    {
      position: 'top',
      css: {
        top: `0px`, // TODO : 임시 추가
      },
    },
  ],
});

const snackBarMotionVariants = {
  initial: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.3,
    },
  },
};
