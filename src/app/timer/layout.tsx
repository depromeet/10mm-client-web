import { type PropsWithChildren } from 'react';
import { css } from '@/styled-system/css';

export default function Layout({ children }: PropsWithChildren) {
  return <div className={containerCss}>{children}</div>;
}

const containerCss = css({
  minHeight: '100vh',
});
