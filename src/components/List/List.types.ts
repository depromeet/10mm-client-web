import { type ReactNode } from 'react';
import type Badge from '@/components/Badge/Badge';

export interface ListItemBaseType {
  type: 'category' | 'mission' | 'profile' | 'profile-follower';
}

export interface CategoryListItemType extends ListItemBaseType {
  type: 'category';
  category: string;
  imageUrl?: string;
  checked?: boolean;
}

export interface MissionListItemType extends ListItemBaseType {
  type: 'mission';
  imageUrl: string;
  category: string;
  missionTitle: string;
  badge?: ReactNode;
}

export interface ProfileListItemType extends ListItemBaseType {
  type: 'profile';
  thumbnail: ReactNode;
  name: string;
  buttonElement?: ReactNode;
}

export interface ProfileFollowerListItemType extends ListItemBaseType {
  type: 'profile-follower';
  thumbnail: ReactNode;
  name: string;
  buttonElement?: ReactNode;
}

export type ListItemType =
  | CategoryListItemType
  | MissionListItemType
  | ProfileListItemType
  | ProfileFollowerListItemType;
