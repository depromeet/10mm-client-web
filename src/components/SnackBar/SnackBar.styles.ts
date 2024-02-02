import { cva } from '@styled-system/css';

export const snackBarWrapperCss = cva({
  base: {
    padding: '16px 24px',

    width: 'fit-content',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
    textStyle: 'subtitle5',
    color: 'text.secondary',
    backdropFilter: 'blur(20px)',
    boxShadow: '0px 5px 50px 4px rgba(78, 90, 122, 0.30) inset',
    background: 'rgba(30, 30, 40, 0.90)',
    borderRadius: '24px',
    cursor: 'pointer',
  },

  variants: {
    cursor: {
      pointer: {
        cursor: 'pointer',
      },
      default: {
        cursor: 'default',
      },
    },

    flexGap: {
      small: {
        gap: '6px',
      },
      medium: {
        gap: '12px',
      },
    },
  },

  defaultVariants: {
    flexGap: 'small',
    cursor: 'default',
  },
});
