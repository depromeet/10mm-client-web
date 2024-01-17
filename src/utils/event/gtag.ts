import { type EventLogger, type Properties } from '@/utils/event/event.types';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

class GtagEventLogger implements EventLogger {
  gtagId: string;

  constructor(id: string) {
    this.gtagId = id;
  }

  initialize() {
    return null;
  }

  logEvent(eventName: string, category: string, label: string, properties?: Properties) {
    if (window === undefined) return;
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      ...properties,
    });
  }

  identify(userId: string) {
    if (this.gtagId) return;
    if (window === undefined) return;
    window.gtag('config', this.gtagId, {
      user_id: userId,
    });
  }
}

export const gtagLogger = GA_TRACKING_ID ? new GtagEventLogger(GA_TRACKING_ID) : null;
