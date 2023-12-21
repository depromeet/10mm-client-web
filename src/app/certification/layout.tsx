import { type PropsWithChildren } from 'react';
import { css } from '@styled-system/css';

export default function Layout({ children }: PropsWithChildren) {
  return <div className={containerCss}>{children}</div>;
}

const containerCss = css({
  maxWidth: '475px',
  margin: '0 auto',
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});
