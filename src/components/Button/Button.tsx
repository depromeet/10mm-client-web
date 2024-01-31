import { cva } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';

export const buttonStyle = cva({
  base: {
    textStyle: 'subtitle4',
    flexShrink: 0,
    display: 'block',
    textAlign: 'center',
    userSelect: 'none',
  },
  variants: {
    size: {
      small: {
        width: 'fit-content',
        height: '34px',
        textStyle: 'subtitle5',
        padding: '0 12px',
        borderRadius: '12px',
        lineHeight: '34px',
      },
      medium: {
        width: 'fit-content',
        height: '44px',
        padding: '0 20px',
        borderRadius: '16px',
        lineHeight: '44px',
      },
      large: {
        width: '100%',
        height: '44px',
        padding: '0 24px',
        borderRadius: '16px',
        lineHeight: '44px',
      },
    },
    variant: {
      cta: {
        background: 'gradients.button1',
        color: 'gray.gray100',
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: '16px',

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
          filter: 'brightness(0.4)',
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
          filter: 'brightness(0.4)',
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
          filter: 'brightness(0.9)',
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
  compoundVariants: [
    {
      size: 'large',
      variant: 'cta',
      css: {
        width: '100%',
        maxWidth: 'calc(475px  - 48px)',
        margin: '0 auto',
        '@media (max-width: 475px)': {
          maxWidth: 'calc(100vw  - 48px)',
        },
      },
    },
    {
      size: 'medium',
      variant: 'cta',
      css: {
        background: 'gradients.button3',
        width: 'fit-content',
        '@media screen and (min-width: 475px)': {
          right: 'calc(50vw - 237.5px + 16px)',
          left: 'auto',
        },
        '@media screen and (max-width: 475px)': {
          left: 'auto',
          right: '16px',
        },
        _active: {
          background: 'gradients.button4',
        },
        _hover: {
          background: 'gradients.button4',
        },
      },
    },
    {
      size: 'small',
      variant: 'cta',
      css: {
        background: 'gradients.button3',
        position: 'inherit',
        _active: {
          background: 'gradients.button4',
        },
        _hover: {
          background: 'gradients.button4',
        },
      },
    },
  ],
  defaultVariants: {
    size: 'large',
  },
});

const Button = styled('button', buttonStyle);

export default Button;
