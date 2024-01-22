import { type IconComponentMap } from '@/components/Icon';

interface BaseBannerType {
  type: 'list' | 'card' | 'graphic' | 'level';
}

export interface ListBannerType extends BaseBannerType {
  type: 'list';
  title: string;
  description: string;
  imageUrl: string;
  date?: string; // TODO : 추후 type 변경 여지 있음
}

export interface CardBannerType extends BaseBannerType {
  type: 'card';
  iconName: keyof typeof IconComponentMap;
  title: string;
  description: string;
}

export interface GraphicBannerType extends BaseBannerType {
  type: 'graphic';
  imageUrl: string;
}
export interface LevelBannerType extends BaseBannerType {
  type: 'level';
  level: string;
  imageUrl: string;
  iconName: keyof typeof IconComponentMap;
  amount: number;
}

export type BannerType = ListBannerType | CardBannerType | GraphicBannerType | LevelBannerType;
