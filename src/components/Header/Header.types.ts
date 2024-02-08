import { type ComponentProps } from 'react';
import type Button from '@/components/Button/Button';
import { type IconComponentMap } from '@/components/Icon';
import { type MenuBaseItem } from '@/components/Menu';
import { type ColorToken } from '@styled-system/tokens';

export interface HeaderBaseType {
  rightAction: 'icon' | 'none' | 'text-button' | 'icon-menu' | 'component' | 'custom';

  title?: string;
  onBackAction?: () => void;
  isBackIcon?: boolean;
  headerBgColor?: ColorToken;
  iconColor?: ColorToken;
  textColor?: ColorToken;
  rightElement?: React.ReactNode;
  className?: string;
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
  rightAction: 'text-button' | 'component';
  rightButtonText?: string;
  rightButtonProps?: Omit<ComponentProps<typeof Button>, 'children' | 'variant' | 'size'>;
}

export interface IconMenuHeaderType extends HeaderBaseType {
  rightAction: 'icon-menu';
  iconName?: keyof typeof IconComponentMap;
  menus: MenuBaseItem[];
  onMenuClick: (id: string) => void;
}

export interface CustomHeaderType extends HeaderBaseType {
  rightAction: 'custom';
  rightElement: React.ReactNode;
}

export type HeaderType = IconHeaderType | NoneHeaderType | TextButtonHeaderType | IconMenuHeaderType | CustomHeaderType;
