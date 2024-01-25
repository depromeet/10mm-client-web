'use client';
import { type PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { motion } from 'framer-motion';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className={containerCss}>{children}</div>
    </motion.div>
  );
}

const containerCss = css({
  maxWidth: 'maxWidth',
  margin: '0 auto',
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});
