'use client';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import Header from '@/components/Header/Header';

import MyProfile from './MyProfile';

function Mypage() {
  return (
    <main>
      <Header isBackIcon={false} title={'마이페이지'} rightAction="icon" iconName={'menu'} />

      <MyProfile />
      <AppBarBottom />
      <BottomDim />
    </main>
  );
}

export default Mypage;
