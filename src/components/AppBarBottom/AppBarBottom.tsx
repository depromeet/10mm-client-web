import { useRouter } from 'next/router';
import AppBarBottomView from '@/components/AppBarBottom/AppBarBottomVIew';
import { NAVIGATION } from '@/constants/navigation';

function AppBarBottom() {
  const { pathname } = useRouter();
  const current = NAVIGATION.find((item) => item.path === pathname)?.key || NAVIGATION[0].key;

  return <AppBarBottomView current={current} />;
}

export default AppBarBottom;
