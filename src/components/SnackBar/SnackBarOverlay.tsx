'use client';
import React from 'react';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useSnackBar } from '@/components/SnackBar/SnackBarProvider';
import { css } from '@styled-system/css';
import { AnimatePresence, motion } from 'framer-motion';

const BOTTOM_HEIGHT = 40;

function SnackBarOverlay() {
  const { snackBar } = useSnackBar();

  return (
    <AnimatePresence mode="wait">
      {snackBar &&
        snackBar.map((item) => (
          <motion.div
            key={item.id}
            className={snackBarOverlayCss}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {
                opacity: 0,
                y: BOTTOM_HEIGHT,
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
                y: BOTTOM_HEIGHT,
                transition: {
                  duration: 0.3,
                },
              },
            }}
          >
            <SnackBar key={item.id} {...item} />
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export default SnackBarOverlay;

const snackBarOverlayCss = css({
  position: 'fixed',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 2000,
  bottom: BOTTOM_HEIGHT,
});
