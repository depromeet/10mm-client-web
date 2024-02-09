'use client';
import React from 'react';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { cva } from '@styled-system/css';
import { AnimatePresence, motion } from 'framer-motion';

function SnackBarOverlay() {
  const { snackBar } = useSnackBar();

  return (
    <AnimatePresence mode="wait">
      {snackBar &&
        snackBar.map((item) => (
          <motion.div
            key={item.id}
            className={snackBarOverlayCss({ offset: item.offset, position: item.position })}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={snackBarMotionVariants}
          >
            <SnackBar key={item.id} {...item} />
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export default SnackBarOverlay;

export const snackBarOverlayCss = cva({
  base: {
    position: 'fixed',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 16px',
    zIndex: 2000,
  },
  variants: {
    offset: {
      default: {},
      appBar: {},
      cta: {},
    },
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
      offset: 'default',
      position: 'bottom',
      css: {
        bottom: `16px`,
      },
    },
    {
      offset: 'appBar',
      position: 'bottom',
      css: {
        bottom: `136px`,
      },
    },
    {
      offset: 'cta',
      position: 'bottom',
      css: {
        bottom: `80px`,
      },
    },
    {
      offset: 'default',
      position: 'top',
      css: {
        top: `60px`, // TODO : 임시 추가
      },
    },
  ],
  defaultVariants: {
    offset: 'default',
    position: 'bottom',
  },
});

const snackBarMotionVariants = {
  initial: {
    opacity: 0,
    y: 40,
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
