import { type IconComponentMap } from '@/components/Icon';

export interface SnackBarBaseType {
  message: string;
  offset?: 'appBar' | 'default' | 'cta';
}

export interface SnackBarNoneType extends SnackBarBaseType {
  rightAction?: 'none';
}
export interface SnackBarIconType extends SnackBarBaseType {
  rightAction: 'icon';
  iconName: keyof typeof IconComponentMap;
  iconAction: () => void;
}
export interface SnackBarTextButtonType extends SnackBarBaseType {
  rightAction: 'text-button';
  timerSecond?: number;
  buttonText: string;
  buttonAction: () => void;
}

export type SnackBarType = SnackBarNoneType | SnackBarIconType | SnackBarTextButtonType;
export type SnackBarWithId = SnackBarType & {
  id: string;
};
