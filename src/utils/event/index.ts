import { isProd } from '@/utils/common';
import { type EventLogger } from '@/utils/event/event.types';
import { gtagLogger } from '@/utils/event/gtag';
import { hotjarLogger } from '@/utils/event/hotjar';
import { mixpanelLogger } from '@/utils/event/mixpanel';

class EventLoggerController {
  eventLoggers: EventLogger[];
  category: string;
  constructor(eventLoggers: EventLogger[], category: string) {
    this.eventLoggers = eventLoggers;
    this.category = category;
  }
  initialize() {
    if (!isProd()) return;
    this.eventLoggers.forEach((logger) => logger.initialize());
  }

  logEvent(eventName: string, label: string, properties?: Record<string, string | number | boolean>) {
    if (!isProd()) {
      console.log('EVENT LOGGING', { eventName, label, category, properties }); // eslint-disable-line no-console
      return;
    }
    this.eventLoggers.forEach((logger) => logger.logEvent(eventName, this.category, label, properties));
  }

  identify(userId: string) {
    if (!isProd()) {
      console.log('IDENTIFY', { userId }); // eslint-disable-line no-console
      return;
    }
    this.eventLoggers.forEach((logger) => logger.identify(userId));
  }
}

const category = process.env.NEXT_PUBLIC_WEB_VERSION ?? 'dev';

export const eventLogger = new EventLoggerController([mixpanelLogger, hotjarLogger, gtagLogger], category);
