import type { Metadata } from 'next';

import { QueryProvider } from '../hooks/query';

import './globals.css';

export const metadata: Metadata = {
  title: '10MM',
  description: '10MM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
