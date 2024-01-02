'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const variants = {
  enter: { opacity: 1, x: 0, zIndex: 1 },
  exit: (test: boolean) => ({ zIndex: 0, opacity: 0, x: test ? -300 : 300 }),
};

export default function Template({ children }: { children: React.ReactNode }) {
  const [test, setTest] = useState(true);

  useEffect(() => {
    window.addEventListener('popstate', (_event) => {
      setTest(false);
    });
  }, []);

  return (
    <motion.main
      custom={test}
      variants={variants}
      exit="exit"
      animate="enter"
      transition={{
        type: 'linear',
        duration: 0.3,
      }}
    >
      {children}
    </motion.main>
  );
}
