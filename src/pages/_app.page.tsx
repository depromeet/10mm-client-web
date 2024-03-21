import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import MonitoringInitializer from '@/components/MonitoringInitializer';
import NotificationSnackBarProvider from '@/components/NotificationSnackBar/NotificationSnackBarProvider';
import SnackBarProvider from '@/components/SnackBar/SnackBarProvider';
import TemplateComponent from '@/components/TempleteComponent';
import { QueryProvider } from '@/hooks/query';
import { useAuth } from '@/hooks/useAuth';
import { MSWInitComponent } from '@/msw';
import { css } from '@styled-system/css';

import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useAuth();
  return (
    <>
      <MonitoringInitializer />
      <MSWInitComponent />
      <QueryProvider>
        <NotificationSnackBarProvider>
          <SnackBarProvider>
            <Suspense>
              <TemplateComponent>
                <div className={css(containerCss)}>
                  <Component {...pageProps} />
                </div>
              </TemplateComponent>
            </Suspense>
          </SnackBarProvider>
        </NotificationSnackBarProvider>
      </QueryProvider>
    </>
  );
}

const containerCss = {
  maxWidth: 'maxWidth',
  margin: '0 auto',
  minHeight: '100vh',
  backgroundColor: 'bg.surface2',
};
