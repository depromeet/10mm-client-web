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
      <Link href={ROUTER.MISSION.NEW}>
        <Icon name="normal-link" size={20} color="icon.primary" />
      </Link>
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
      <BottomDim />
    </main>
  );
}
const backgroundCss = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});
const headingCss = flex({
  padding: '12px 8px',
  justifyContent: 'flex-end',
  textStyle: 'body4',
  color: 'text.primary',
  userSelect: 'none',
  gap: '10px',
});

export default Mypage;
