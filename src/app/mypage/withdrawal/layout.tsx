import { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { flex } from '@/styled-system/patterns';

function WithdrawalLayout({ children }: PropsWithChildren) {
  return (
    <div className={containerCss}>
      <Header rightAction="none" title="회원 탈퇴" />
      <main className={mainCss}>{children}</main>
    </div>
  );
}

export default WithdrawalLayout;

const containerCss = flex({
  minHeight: '100vh',
  flexDirection: 'column',

  paddingBottom: '34px', // indicator
});

const mainCss = flex({
  padding: '24px 16px 0',
  flex: 1,

  justifyContent: 'space-between',
  flexDirection: 'column',
});
