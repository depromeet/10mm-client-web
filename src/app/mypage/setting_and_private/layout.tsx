import React, { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header isBackIcon={true} rightAction="none" title="설정 및 개인정보" />
      <main className={mainCss}>{children}</main>
    </>
  );
}

export default Layout;
const mainCss = css({
  maxWidth: 'maxWidth',
  margin: '0 auto',
  minHeight: '100vh',
  backgroundColor: 'bg.surface2',
});
