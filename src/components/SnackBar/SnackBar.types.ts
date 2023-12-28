import { type IconComponentMap } from '@/components/Icon';

interface SnackBarNoneType {
  rightAction: 'none';
  message: string;
}
interface SnackBarIconType {
  rightAction: 'icon';
  iconName: keyof typeof IconComponentMap;
  message: string;
}
interface SnackBarTextButtonType {
  rightAction: 'text-button';
  message: string;
  timer?: number;
  button: React.ReactNode;
}

export type SnackBarType = SnackBarNoneType | SnackBarIconType | SnackBarTextButtonType;
export type SnackBarWithId = SnackBarType & {
  id: string;
};
