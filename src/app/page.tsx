import AppBar from '@/app/home/AppBar';
import MissionList from '@/app/home/MissionList';
import ProfileList from '@/app/home/ProfileList';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import { css } from '@styled-system/css';

export default function Home() {
  return (
    <main className={mainCss}>
      <AppBar />
      <ProfileList />
      <MissionList />
      <AppBarBottom />
    </main>
  );
}

const mainCss = css({
  minHeight: '100vh',
  paddingBottom: '113px', // 64(app bar bottom) + 15(gap) + 34(indicator)
});
