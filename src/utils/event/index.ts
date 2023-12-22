import { isProd } from '@/utils/common';
import mixpanel from 'mixpanel-browser';

import gtag from './gtag';

export const logEvent = (eventName: string, label: string, properties?: Record<string, string>) => {
  if (!isProd()) {
    console.log('EVENT LOGGING', { eventName, label, properties }); // eslint-disable-line no-console
    return;
  }
  gtag.event({ action: eventName, label, params: { ...properties } });
  mixpanel.track(eventName, { label, ...properties });
};
