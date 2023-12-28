import { type IconComponentMap } from '@/components/Icon';

export interface SnackBarNoneType {
  rightAction: 'none';
  message: string;
}
export interface SnackBarIconType {
  rightAction: 'icon';
  iconName: keyof typeof IconComponentMap;
  iconAction: () => void;
  message: string;
}
export interface SnackBarTextButtonType {
  rightAction: 'text-button';
  message: string;
  timerSecond?: number;
  buttonText: string;
  buttonAction: () => void;
}

export type SnackBarType = SnackBarNoneType | SnackBarIconType | SnackBarTextButtonType;
export type SnackBarWithId = SnackBarType & {
  id: string;
};
