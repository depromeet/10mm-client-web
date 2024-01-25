import { css, cva } from '@/styled-system/css';

export const gradientTextCss = css({
  animation: 'gradient 3s ease-in-out infinite',
  backgroundSize: '150% 200%!',
  backgroundClip: 'text!',
  background: 'gradients.primary',
  color: 'transparent',
});

export const gradientBorderWrapperCss = cva({
  base: {
    border: '.5px solid transparent',
    padding: '0px!', // NOTE: padding 0 필수,
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
  },
  variants: {
    bg: {
      surface3: {
        backgroundImage:
          'linear-gradient(token(colors.bg.surface3), token(colors.bg.surface3)), token(colors.gradients.primary)',
      },
    },
  },
  defaultVariants: {
    bg: 'surface3',
  },
});
