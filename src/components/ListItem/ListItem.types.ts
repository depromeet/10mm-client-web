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
  badgeElement?: ReactNode; // 나중에도 '완료' badge 만을 사용한다면 제거
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
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export type ListItemType =
  | CategoryListItemType
  | MissionListItemType
  | ProfileListItemType
  | ProfileFollowerListItemType;
