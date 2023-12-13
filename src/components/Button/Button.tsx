import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

const buttonStyle = cva({
  base: {},
  variants: {
    size: {
      medium: {
        borderRadius: '16px',
        height: '44px',
        padding: '0 20px',
        width: 'fit-content',
      },
      large: {
        padding: '0 24px',
        borderRadius: '16px',
        height: '44px',
        width: '100%',
      },
    },
    variant: {
      cta: {
        background: 'gradients.button1',
        color: 'gray.gray100',
        '&:hover': {
          background: 'gradients.button2',
        },
        '&:pressed': {
          background: 'gradients.button2',
        },
        '&:active': {
          background: 'gradients.button2',
        },
        '&:disabled': {
          opacity: '0.4',
        },
      },
      primary: {
        backgroundColor: 'purple.purple800',
        color: 'gray.gray100',
      },
      secondary: {
        backgroundColor: 'gray.gray200',
        color: 'text.secondary',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'purple.purple500',
      },
    },
  },
});

const Button = styled('button', buttonStyle);

export default Button;
