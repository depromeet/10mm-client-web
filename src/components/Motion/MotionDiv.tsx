'use client';

import { type ComponentProps, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

interface Props extends Omit<ComponentProps<typeof motion.div>, 'variants'> {
  variants?: Variants | 'fadeIn' | 'fadeInUp';
}

function MotionDiv({ variants = 'fadeIn', ...props }: Props) {
  const _variants: Variants = useMemo(() => {
    switch (variants) {
      case 'fadeIn':
        return defaultFadeInVariants;
      case 'fadeInUp':
        return defaultFadeInUpVariants;
      default:
        return variants;
    }
  }, [variants]);

  return (
    <motion.div
      {...props}
      variants={_variants}
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

const defaultFadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};
