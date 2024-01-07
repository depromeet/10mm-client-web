import { type IconComponentMap } from '@/components/Icon';

interface HeaderBaseType {
  rightAction: 'icon' | 'none' | 'text-button';

  title?: string;
  onBackAction?: () => void;
  isBackIcon?: boolean;
}

export interface IconHeaderType extends HeaderBaseType {
  rightAction: 'icon';
  iconName?: keyof typeof IconComponentMap;
  onIconClick?: () => void;
}

export interface NoneHeaderType extends HeaderBaseType {
  rightAction: 'none';
}

export interface TextButtonHeaderType extends HeaderBaseType {
  rightAction: 'text-button';
  rightButtonText?: string;
  onButtonClick?: () => void;
  rightButtonDisabled?: boolean;
}

export type HeaderType = IconHeaderType | NoneHeaderType | TextButtonHeaderType;
