'use client';

import { usePathname } from 'next/navigation';
import AppBarBottomView from '@/components/AppBarBottom/AppBarBottomVIew';
import { NAVIGATION } from '@/constants/navigation';

function AppBarBottom() {
  const pathname = usePathname();
  const current = NAVIGATION.find((item) => item.path === pathname)?.key || NAVIGATION[0].key;

  return <AppBarBottomView current={current} />;
}

export default AppBarBottom;
