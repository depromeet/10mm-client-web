import { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={containerCss}>
      <Header rightAction="none" />

      {children}
    </div>
  );
}

const containerCss = css({
  minHeight: '100vh',
});
