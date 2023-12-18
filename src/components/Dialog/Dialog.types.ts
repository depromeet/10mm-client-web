import { type ModalProps } from '@/components/Modal/Modal';

interface ButtonGroupProps {
  confirmText: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

type Value = {
  value: string;
  text: string;
};

export interface DefaultDialogProps extends ButtonGroupProps, ModalProps {
  variant: 'default';
  title?: string;
  content?: string;
}

export interface ListDialogProps extends ModalProps {
  variant: 'list';
  title: string;
  list: Value[];
  onClick: (value: Value) => void;
}

export interface SelectDialogProps extends Omit<ButtonGroupProps, 'onConfirm'>, ModalProps {
  variant: 'select';
  title?: string;
  content?: string;
  selects: Value[];
  onConfirm: (value: Value) => void;
}

export type DialogProps = DefaultDialogProps | ListDialogProps | SelectDialogProps;
