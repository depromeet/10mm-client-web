import AppBar from '@/app/home/AppBar';
import ProfileList from '@/app/home/ProfileList';
import { css } from '@styled-system/css';

export default function Home() {
  return (
    <main className={mainCss}>
      <AppBar />
      <ProfileList />
    </main>
  );
}

const mainCss = css({
  minHeight: '100vh',
});
