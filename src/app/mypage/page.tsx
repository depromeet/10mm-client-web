'use client';
import Link from 'next/link';
import AppBarBottom from '@/components/AppBarBottom/AppBarBottom';
import BottomDim from '@/components/BottomDim/BottomDim';
import Icon from '@/components/Icon';
import { ROUTER } from '@/constants/router';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import MyProfile from './MyProfile';

function Header() {
  return (
    <h2 className={headingCss}>
      <Link href={ROUTER.MYPAGE.SETTING}>
        <Icon name="normal-setting" size={20} color="icon.primary" />
      </Link>
    </h2>
  );
}

function Mypage() {
  return (
    <main className={backgroundCss}>
      <Header />
      <MyProfile />
      <AppBarBottom />
      <div className={dimCss} />
      <BottomDim />
    </main>
  );
}
const backgroundCss = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

const dimCss = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.15) 100%)',
  top: 0,
  zIndex: 1,
});

const headingCss = flex({
  padding: '12px 8px',
  justifyContent: 'flex-end',
  textStyle: 'body4',
  color: 'text.primary',
  userSelect: 'none',
  gap: '10px',
  zIndex: 3,
});

export default Mypage;
