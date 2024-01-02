import type { Metadata } from 'next';
import MonitoringInitializer from '@/components/MonitoringInitializer';
import SnackBarProvider from '@/components/SnackBar/SnackBarProvider';
import { css } from '@/styled-system/css';
import { pretendardFont } from '@/styles/font';

import { QueryProvider } from '../hooks/query';

import './globals.css';

export const metadata: Metadata = {
  title: '10MM',
  description: '10MM',
  openGraph: {
    type: 'website',
    url: 'https://www.10mm.today',
    title: '10MM',
    description: '당신의 인생을 바꿀 10분',
    siteName: '10MM',
    images: [
      {
        url: 'https://www.10mm.today/og-image.png',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={pretendardFont.variable}>
      <body className={css(bodyCss)}>
        <MonitoringInitializer />
        <QueryProvider>
          <SnackBarProvider>
            <div className={css(containerCss)}>{children}</div>
          </SnackBarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

const containerCss = {
  maxWidth: '475px',
  margin: '0 auto',
  minHeight: '100vh',
  backgroundColor: 'bg.surface2',
};

const bodyCss = {
  // backgroundColor: 'bg.surface1',
};
