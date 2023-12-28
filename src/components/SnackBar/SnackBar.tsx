import React from 'react';
import IconSnackBar from '@/components/SnackBar/IconSnackBar';
import NoneSnackBar from '@/components/SnackBar/NoneSnackBar';
import { type SnackBarWithId } from '@/components/SnackBar/SnackBar.types';
import TextButtonSnackBar from '@/components/SnackBar/TextButtonSnackBar';
import { cva } from '@styled-system/css';

export default function SnackBar(props: SnackBarWithId) {
  switch (props.rightAction) {
    case 'none':
      return <NoneSnackBar {...props} />;
    case 'icon':
      return <IconSnackBar {...props} />;
    case 'text-button':
      return <TextButtonSnackBar {...props} />;
  }
}

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
    boxShadow: '0px 5px 50px 4px rgba(92, 78, 122, 0.30) inset',
    background: 'rgba(32, 30, 40, 0.90)',
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
