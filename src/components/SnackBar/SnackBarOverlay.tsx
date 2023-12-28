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
            className={snackBarOverlayCss({ offset: item.offset })}
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
    bottom: `20px`,
  },
  variants: {
    offset: {
      default: {
        bottom: `16px`,
      },
      appBar: {
        bottom: `136px`,
      },
      cta: {
        bottom: `80px`,
      },
    },
  },
  defaultVariants: {
    offset: 'default',
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
