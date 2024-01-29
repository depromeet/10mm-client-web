'use client';

import { type ComponentProps } from 'react';
import { motion, type Variants } from 'framer-motion';

interface Props extends ComponentProps<typeof motion.div> {}

function MotionDiv(props: Props) {
  return (
    <motion.div
      {...props}
      variants={props.variants ?? defaultFadeInVariants}
      initial={props.initial ?? 'initial'}
      animate={props.animate ?? 'animate'}
      exit={props.exit ?? 'exit'}
    />
  );
}

export default MotionDiv;

const defaultEasing = [0.6, -0.05, 0.01, 0.99];

const defaultFadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
};
