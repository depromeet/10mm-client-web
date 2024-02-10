import { Suspense } from 'react';
import type { Metadata } from 'next';
import MonitoringInitializer from '@/components/MonitoringInitializer';
import SnackBarProvider from '@/components/SnackBar/SnackBarProvider';
import { MSWInitComponent } from '@/msw';
import { css } from '@/styled-system/css';

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
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body className={css(bodyCss)}>
        <MonitoringInitializer />
        <MSWInitComponent />
        <QueryProvider>
          <SnackBarProvider>
            <Suspense>
              <div className={css(containerCss)}>{children}</div>
            </Suspense>
          </SnackBarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

const containerCss = {
  maxWidth: 'maxWidth',
  margin: '0 auto',
  minHeight: '100vh',
  backgroundColor: 'bg.surface2',
};

const bodyCss = {
  backgroundColor: 'bg.surface3',
};
