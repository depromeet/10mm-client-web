import { isProd } from '@/utils/common';
import mixpanel from 'mixpanel-browser';
import { hotjar } from 'react-hotjar';

import gtag from './gtag';

const category = process.env.NEXT_PUBLIC_WEB_VERSION;
const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION;

const initialize = () => {
  if (!isProd()) return;
  hotjar.initialize(Number(HOTJAR_ID), Number(HOTJAR_SV));
  mixpanel.init(MIXPANEL_ID ?? '', { track_pageview: true, debug: true });
};

const logEvent = (eventName: string, label: string, properties?: Record<string, string | number | boolean>) => {
  if (!isProd()) {
    console.log('EVENT LOGGING', { eventName, label, category, properties }); // eslint-disable-line no-console
    return;
  }
  gtag.event({ action: eventName, category, label, params: { ...properties } });
  mixpanel.track(eventName, { label, category, ...properties });
};

const identify = (userId: string) => {
  if (!isProd()) {
    console.log('IDENTIFY', { userId }); // eslint-disable-line no-console
    return;
  }
  mixpanel.identify(userId);
  mixpanel.people.set({ $name: userId });
};

export const tracker = {
  initialize,
  logEvent,
  identify,
};
