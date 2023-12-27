import { type EventLogger } from '@/utils/event/event.types';
import { hotjar } from 'react-hotjar';

const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const HOTJAR_SV = process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION;

export class HotjarEventLogger implements EventLogger {
  hotjarId: string;
  hotjarVersion: string;

  constructor(id: string, version: string) {
    this.hotjarId = id;
    this.hotjarVersion = version;
  }

  initialize() {
    hotjar.initialize(Number(this.hotjarId), Number(this.hotjarVersion));
  }

  logEvent() {
    return null;
  }

  identify() {
    return null;
  }
}

export const hotjarLogger = new HotjarEventLogger(HOTJAR_ID ?? '', HOTJAR_SV ?? '');
