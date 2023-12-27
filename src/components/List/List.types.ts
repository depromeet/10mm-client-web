import { type ReactNode } from 'react';

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
  iconElement: ReactNode;
  category: string;
  missionTitle: string;
  badge?: string;
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
