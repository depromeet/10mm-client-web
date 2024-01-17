import React, { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

function CompleteMissionLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="종료 미션 보관함" />
      <main className={mainCss}>{children}</main>
    </>
  );
}

export default CompleteMissionLayout;

const mainCss = css({
  padding: '16px',
});
