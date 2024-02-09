'use client';
import { type PropsWithChildren } from 'react';
import { css } from '@styled-system/css';
import { motion } from 'framer-motion';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
