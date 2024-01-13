'use client';
import { useEffect, useState } from 'react';
import { APP_USER_AGENT } from '@/constants/common';
import { motion } from 'framer-motion';

const variants = {
  enter: { opacity: 1, x: 0, zIndex: 1 },
  exit: (test: boolean) => ({ zIndex: 0, opacity: 0, x: test ? -300 : 300 }),
};

export default function Template({ children }: { children: React.ReactNode }) {
  const [customMotion, setCustomMotion] = useState(true);
  const userAgent = window.navigator.userAgent;
  const isApp = RegExp(APP_USER_AGENT).test(userAgent);

  useEffect(() => {
    const popStateEventHandler = (_event: PopStateEvent) => {
      setCustomMotion(false);
    };
    window.addEventListener('popstate', popStateEventHandler);

    return () => {
      window.removeEventListener('popstate', popStateEventHandler);
    };
  }, []);

  if (!isApp) {
    return <motion.main>{children}</motion.main>;
  }

  return (
    <motion.main
      custom={customMotion}
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
