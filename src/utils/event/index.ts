import { isProd } from '@/utils/common';
import mixpanel from 'mixpanel-browser';

import gtag from './gtag';

const category = process.env.NEXT_PUBLIC_WEB_VERSION;

export const logEvent = (eventName: string, label: string, properties?: Record<string, string | number | boolean>) => {
  if (!isProd()) {
    console.log('EVENT LOGGING', { eventName, label, category, properties }); // eslint-disable-line no-console
    return;
  }
  gtag.event({ action: eventName, category, label, params: { ...properties } });
  mixpanel.track(eventName, { label, category, ...properties });
};
