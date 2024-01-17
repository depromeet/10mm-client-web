'use client';
import MenuList from '@/app/mypage/MenuList';
import Profile from '@/app/mypage/Profile';
import VersionInfo from '@/app/mypage/VersionInfo';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import Header from '@/components/Header/Header';

function Mypage() {
  return (
    <main>
      <Header isBackIcon={false} title="마이페이지" rightAction="none" />
      <Profile />
      <MenuList />
      <VersionInfo />
      <AppBarBottom />
    </main>
  );
}

export default Mypage;
