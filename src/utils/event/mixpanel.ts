import { type EventLogger, type Properties } from '@/utils/event/event.types';
import mixpanel from 'mixpanel-browser';

const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL;

export class MixpanelEventLogger implements EventLogger {
  mixpanelId: string;
  constructor(id: string) {
    this.mixpanelId = id;
  }
  initialize() {
    mixpanel.init(this.mixpanelId ?? '', { track_pageview: true, debug: true });
  }

  logEvent(eventName: string, category: string, label: string, properties?: Properties) {
    mixpanel.track(eventName, { label, category, ...properties });
  }

  identify(userId: string) {
    mixpanel.identify(userId);
  }
}

export const mixpanelLogger = new MixpanelEventLogger(MIXPANEL_ID ?? '');
