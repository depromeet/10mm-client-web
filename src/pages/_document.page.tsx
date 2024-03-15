import { Head, Html, Main, NextScript } from 'next/document';
import SEO from '@/components/SEO/SEO';

export const metadata = {
  title: '10MM',
  description: '10MM',
  keywords: '10mm, 10분만, 10분, 10MM, 10mm, 하루 10분, 10분 단위, 생환습관',
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

export default function _document() {
  return (
    <Html lang="ko" suppressHydrationWarning>
      <Head>
        <link
          rel="preload"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
        <SEO {...metadata} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
