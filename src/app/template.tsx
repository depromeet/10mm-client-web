'use client';
import { useAuth } from '@/hooks/useAuth';
import useForegroundNotification from '@/hooks/useForegroundNotification';
// import { useEffect, useState } from 'react';
// import { isWebView } from '@/utils/appEnv';
// import { motion } from 'framer-motion';

// const variants = {
//   enter: { opacity: 1, x: 0, zIndex: 1 },
//   exit: (isExit: boolean) => ({ zIndex: 0, opacity: 0, x: isExit ? -300 : 300 }),
// };

export default function Template({ children }: { children: React.ReactNode }) {
  useAuth();
  useForegroundNotification();
  // const [customMotion, setCustomMotion] = useState(true);

  // useEffect(() => {
  //   const popStateEventHandler = (_event: PopStateEvent) => {
  //     setCustomMotion(false);
  //   };
  //   window.addEventListener('popstate', popStateEventHandler);

  //   return () => {
  //     window.removeEventListener('popstate', popStateEventHandler);
  //   };
  // }, []);

  // if (isWebView()) {
  //   return (
  //     <motion.main
  //       custom={customMotion}
  //       variants={variants}
  //       exit="exit"
  //       animate="enter"
  //       transition={{
  //         type: 'linear',
  //         duration: 0.3,
  //       }}
  //     >
  //       {children}
  //     </motion.main>
  //   );
  // }

  return <main>{children}</main>;
}
