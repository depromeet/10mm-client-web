import React, { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';

function PrivacyLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="개인정보 보호 정책" />
      <main>{children}</main>
    </>
  );
}

export default PrivacyLayout;
