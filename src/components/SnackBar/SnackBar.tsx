import React from 'react';
import IconSnackBar from '@/components/SnackBar/IconSnackBar';
import NoneSnackBar from '@/components/SnackBar/NoneSnackBar';
import { type SnackBarType } from '@/components/SnackBar/SnackBar.types';
import TextButtonSnackBar from '@/components/SnackBar/TextButtonSnackBar';

export default function SnackBar(props: SnackBarType) {
  switch (props.variant) {
    case 'icon':
      return <IconSnackBar {...props} />;
    case 'text-button':
      return <TextButtonSnackBar {...props} />;
    case 'none':
    default:
      return <NoneSnackBar {...props} />;
  }
}
