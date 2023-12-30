'use client';
import { usePathname, useRouter } from 'next/navigation';
import AppBarBottomView from '@/components/AppBarBottom/AppBarBottomVIew';
import { NAVIGATION, type NavigationItemType } from '@/constants/navigation';

function AppBarBottom() {
  const pathname = usePathname();
  const router = useRouter();
  const current = NAVIGATION.find((item) => item.path === pathname)?.key || NAVIGATION[0].key;

  const onClick = (item: NavigationItemType) => {
    router.push(item.path);
  };

  return <AppBarBottomView current={current} onClick={onClick} />;
}

export default AppBarBottom;
