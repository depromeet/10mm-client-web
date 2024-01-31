'use client';
import { useEffect } from 'react';
import Script from 'next/script';
import { isProd } from '@/utils/common';
import { eventLogger } from '@/utils/event';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const JENNIFERSOFT_FRONT_ID = process.env.NEXT_PUBLIC_JENNIFERSOFT_FRONT_ID;

const MonitoringInitializer = () => {
  useEffect(() => {
    eventLogger.initialize();
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
      <Script id="jennifersoft-front">
        {`
          (function(j,ennifer) {
            j['dmndata']=[];j['jenniferFront']=function(args){window.dmndata.push(args)};
            j['dmnaid']=ennifer;j['dmnatime']=new Date();j['dmnanocookie']=false;j['dmnajennifer']='JENNIFER_FRONT@INTG';
        }(window, '${JENNIFERSOFT_FRONT_ID}'));
        `}
      </Script>
      <Script src={`https://d-collect.jennifersoft.com/${JENNIFERSOFT_FRONT_ID}/demian.js`} />
    </div>
  );
};

export default MonitoringInitializer;
