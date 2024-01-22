import { css } from '@/styled-system/css';

const gradientTextObj = {
  animation: 'gradient 3s ease-in-out infinite',
  backgroundSize: '150% 200%!',
  '-webkit-background-clip': 'text!',
  background: 'gradients.primary',
  color: 'transparent',
};

export const gradientTextCss = css(gradientTextObj);
