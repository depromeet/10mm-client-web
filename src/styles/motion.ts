import { defineKeyframes } from '@pandacss/dev';
import { type Variants } from 'framer-motion';

export const keyframeList = defineKeyframes({
  gradient: {
    '0%': { transform: 'rotate(0deg)', backgroundPositionX: '0%', backgroundPositionY: '0%' },
    '50%': { backgroundPositionX: '50%', backgroundPositionY: '100%' },
    '100%': { transform: 'rotate(0deg)', backgroundPositionX: '0%', backgroundPositionY: '0%' },
  },
  circleRotate: {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  fadeIn: {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
});

export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const defaultFadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing, delay: 0 },
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

export const defaultFadeInAnimation = {
  variants: defaultFadeInVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};
