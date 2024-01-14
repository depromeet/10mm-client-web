import { type ComponentProps } from 'react';
import type Button from '@/components/Button/Button';
import { type IconComponentMap } from '@/components/Icon';
import { type MenuBaseItem } from '@/components/Menu';

interface HeaderBaseType {
  rightAction: 'icon' | 'none' | 'text-button' | 'icon-menu';

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
  rightButtonProps?: Omit<ComponentProps<typeof Button>, 'children' | 'variant' | 'size'>;
}

export interface IconMenuHeaderType extends HeaderBaseType {
  rightAction: 'icon-menu';
  iconName?: keyof typeof IconComponentMap;
  menus: MenuBaseItem[];
  onMenuClick: (id: string) => void;
}

export type HeaderType = IconHeaderType | NoneHeaderType | TextButtonHeaderType | IconMenuHeaderType;
