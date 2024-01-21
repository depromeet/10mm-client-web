import { type IconComponentMap } from '@/components/Icon';
import { ROUTER } from '@/constants/router';

export interface NavigationItemType {
  icon: keyof typeof IconComponentMap;
  key: string;
  name: string;
  path: string;
}

export const NAVIGATION: NavigationItemType[] = [
  {
    icon: 'navigation-mission',
    key: 'mission',
    name: 'Mission',
    path: ROUTER.HOME,
  },
  // {
  //   icon: 'navigation-feed',
  //   key: 'feed',
  //   name: 'Feed',
  //   path: ROUTER.RESULT.HOME,
  // },
  {
    icon: 'navigation-result',
    key: 'result',
    name: 'Result',
    path: ROUTER.RESULT.HOME,
  },
  {
    icon: 'navigation-mypage',
    key: 'mypage',
    name: 'My',
    path: ROUTER.MYPAGE.HOME,
  },
];
