import { type PropsWithChildren, useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

function FrozenRouter(props: PropsWithChildren) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};
export default Layout;
