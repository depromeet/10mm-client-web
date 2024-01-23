import { css } from '@/styled-system/css';
import { type Variants } from 'framer-motion';

const gradientTextObj = {
  animation: 'gradient 3s ease-in-out infinite',
  backgroundSize: '150% 200%!',
  '-webkit-background-clip': 'text!',
  background: 'gradients.primary',
  color: 'transparent',
};

export const gradientTextCss = css(gradientTextObj);

export const fadeInAnimationCss = css({
  animation: `fadeIn  .7s ease-in`,
});

export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const defaultFadeInVariants: Variants = {
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

export const defaultFadeInMotion = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: defaultFadeInVariants,
};
