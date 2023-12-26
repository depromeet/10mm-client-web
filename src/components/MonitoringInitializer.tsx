'use client';
import { useEffect } from 'react';
import Script from 'next/script';
import { isProd } from '@/utils/common';
import { tracker } from '@/utils/event';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

const MonitoringInitializer = () => {
  useEffect(() => {
    tracker.initialize();
  }, []);
  if (!isProd()) return null;

  return (
    <div className="container">
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </div>
  );
};

export default MonitoringInitializer;
