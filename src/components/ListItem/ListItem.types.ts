import { type MouseEventHandler, type ReactNode } from 'react';

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
  badgeElement?: ReactNode;
}

export interface ProfileListItemType extends ListItemBaseType {
  type: 'profile';
  thumbnailElement: ReactNode;
  name: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ProfileFollowerListItemType extends ListItemBaseType {
  type: 'profile-follower';
  thumbnailElement: ReactNode;
  name: string;
  buttonElement?: ReactNode;
}

export type ListItemType =
  | CategoryListItemType
  | MissionListItemType
  | ProfileListItemType
  | ProfileFollowerListItemType;
