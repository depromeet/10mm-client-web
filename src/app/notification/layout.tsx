import { type PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import { css } from '@/styled-system/css';

function NotificationLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header rightAction="none" title="알림센터" />
      <main className={mainCss}>{children}</main>
    </>
  );
}

export default NotificationLayout;

const mainCss = css({
  padding: '8px 16px 16px',
  height: '100%',
  minHeight: 'calc(100vh - 44px)',
  maxHeight: 'calc(100vh - 44px)',
  display: 'flex',
  flexDirection: 'column',
});
