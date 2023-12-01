import { type PropsWithChildren } from 'react';
import Header from '@/components/Layout/Header';
import { css } from '@/styled-system/css';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={containerCss}>
      <Header title={'미션 타이머'} />
      <main className={mainCss}>{children}</main>
    </div>
  );
}

const containerCss = css({
  minHeight: '100vh',
});

const mainCss = css({});
