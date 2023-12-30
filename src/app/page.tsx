'use client';

import Link from 'next/link';
import AppBar from '@/app/home/AppBar';
import LogoIcon from '@/app/LogoIcon';
import { ROUTER } from '@/constants/router';
import { eventLogger } from '@/utils';
import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';

export default function Home() {
  // const handleLogin = () => {
  //   eventLogger.logEvent('click/guestLogin', 'guest_login');
  // };

  return (
    <main className={mainCss}>
      <AppBar />
      {/* <div className={logoCss}>
        <LogoIcon />
        <h1 className={MainTitleCss}>하루 10분의 변화를 경험하세요.</h1>
      </div>
      <Link className={LinkCss} href={ROUTER.MISSION.NEW} onClick={handleLogin}>
        <button type={'button'} className={LoginButtonCss}>
          게스트 로그인
        </button>
      </Link> */}
    </main>
  );
}

const mainCss = css({
  minHeight: '100vh',
});
