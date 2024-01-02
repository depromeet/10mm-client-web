import React, { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';

function TermLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="이용약관" />
      <main>{children}</main>
    </>
  );
}

export default TermLayout;
