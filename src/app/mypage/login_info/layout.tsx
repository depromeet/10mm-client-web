import React, { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

function LoginInfoLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="로그인 정보" />
      <main className={mainCss}>{children}</main>
    </>
  );
}

export default LoginInfoLayout;

const mainCss = css({
  padding: '16px',
});
