import { css } from '@/styled-system/css';

export const gradientTextCss = css({
  animation: 'gradient 3s ease-in-out infinite',
  backgroundSize: '150% 200%!',
  backgroundClip: 'text!',
  background: 'gradients.primary',
  color: 'transparent',
});
