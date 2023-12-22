import DefaultDialog from '@/components/Dialog/DefaultDialog';
import { type DialogProps } from '@/components/Dialog/Dialog.types';
import { type ModalProps } from '@/components/Modal/Modal';

import ListDialog from './ListDialog';

/**
 * dialog 컴포넌트
 * @description 각 dialog variant 타입에 따라 다른 컴포넌트들을 랜더링합니다.
 * @param props.variant 'default' | 'list' | 'select'
 */
function Dialog(props: DialogProps & ModalProps) {
  if (props.variant === 'default') {
    return <DefaultDialog {...props} />;
  }
  if (props.variant === 'list') {
    return <ListDialog {...props} />;
  }
}

export default Dialog;
