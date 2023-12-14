import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

const buttonStyle = cva({
  base: {
    textStyle: 'subtitle4',
  },
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
        position: 'fixed',
        left: '24px',
        right: '24px',
        bottom: '16px',
        width: '100%',
        maxWidth: 'calc(475px  - 48px)',
        margin: '0 auto',

        '&:hover': {
          // background: 'gradients.button2',
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
        '&:hover': {
          // backgroundColor: 'purple.purple700',
        },
        '&:pressed': {
          backgroundColor: 'purple.purple700',
        },
        '&:active': {
          backgroundColor: 'purple.purple700',
        },
        '&:disabled': {
          opacity: '0.4',
        },
      },
      secondary: {
        backgroundColor: 'gray.gray200',
        color: 'text.secondary',
        '&:hover': {
          // backgroundColor: 'gray.gray100',
        },
        '&:pressed': {
          backgroundColor: 'gray.gray100',
        },
        '&:active': {
          backgroundColor: 'gray.gray100',
        },
        '&:disabled': {
          opacity: '0.4',
          backgroundColor: 'gray.gray100',
          color: 'text.placeholder',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'purple.purple500',
        '&:hover': {
          // color: 'purple.purple400',
        },
        '&:pressed': {
          color: 'purple.purple400',
        },
        '&:active': {
          color: 'purple.purple400',
        },
        '&:disabled': {
          color: 'text.placeholder',
        },
      },
    },
  },
});

const Button = styled('button', buttonStyle);

export default Button;
