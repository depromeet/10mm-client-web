'use client';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

import MyProfile from './MyProfile';

function Mypage() {
  return (
    <main className={backgroundCss}>
      <Header isBackIcon={false} title={'마이페이지'} rightAction="icon" iconName={'menu'} />

      <MyProfile />
      <AppBarBottom />
      <BottomDim />
    </main>
  );
}
const backgroundCss = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export default Mypage;
