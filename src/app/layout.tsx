import type { Metadata } from 'next';
import MonitoringInitializer from '@/components/MonitoringInitializer';
import { css } from '@/styled-system/css';
import { pretendardFont } from '@/styles/font';

import { QueryProvider } from '../hooks/query';

import './globals.css';

export const metadata: Metadata = {
  title: '10MM',
  description: '10MM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={pretendardFont.variable}>
      <body className={css(bodyCss)}>
        <MonitoringInitializer />
        <QueryProvider>
          <div className={css(containerCss)}>{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}

const containerCss = {
  maxWidth: '475px',
  margin: '0 auto',
  minHeight: '100vh',
  backgroundColor: 'bg.surface1',
};

const bodyCss = {
  // backgroundColor: 'bg.surface1',
};
