import mixpanel from 'mixpanel-browser';

import gtag from './gtag';

export const logEvent = (eventName: string, label: string, properties?: Record<string, string>) => {
  gtag.event({ action: eventName, label, params: { ...properties } });
  mixpanel.track(eventName, { label, ...properties });
};
