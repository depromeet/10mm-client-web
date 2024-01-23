import React, { type PropsWithChildren } from 'react';
import { css } from '@/styled-system/css';

function Layout({ children }: PropsWithChildren) {
  return <main className={mainCss}>{children}</main>;
}

export default Layout;

const mainCss = css({
  maxWidth: 'maxWidth',
  margin: '0 auto',
  minHeight: '100vh',
  backgroundColor: 'gradients.primary',
});
