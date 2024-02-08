import { type IconComponentMap } from '@/components/Icon';

export type SnackBarOffset = 'appBar' | 'default' | 'cta';

export interface SnackBarBaseType {
  message: string;
  offset?: SnackBarOffset;
  position?: 'top' | 'bottom';
  id: string;
}

export interface SnackBarNoneType extends SnackBarBaseType {
  variant?: 'none';
}

export interface SnackBarIconType extends SnackBarBaseType {
  variant: 'icon';
  iconName: keyof typeof IconComponentMap;
  onClick: () => void;
}

export interface SnackBarTextButtonType extends SnackBarBaseType {
  variant: 'text-button';
  timerSecond?: number;
  buttonText: string;
  onButtonClick: () => void;
}

export type SnackBarType = SnackBarNoneType | SnackBarIconType | SnackBarTextButtonType;

export type SnackBarWithoutId =
  | Omit<SnackBarNoneType, 'id'>
  | Omit<SnackBarIconType, 'id'>
  | Omit<SnackBarTextButtonType, 'id'>;
