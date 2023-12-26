export interface EventLogger {
  initialize(): void;
  logEvent(eventName: string, category: string, label: string, properties?: Properties): void;
  identify(userId: string): void;
}

export type Properties = Record<string, string | number | boolean>;
