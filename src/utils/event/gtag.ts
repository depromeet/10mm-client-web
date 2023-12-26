const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: string;
  params?: Record<string, string | number | boolean>;
}

export const pageView = (url: URL) => {
  if (!GA_TRACKING_ID) return;
  if (window === undefined) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const identify = (userId: string) => {
  if (!GA_TRACKING_ID) return;
  if (window === undefined) return;
  window.gtag('config', GA_TRACKING_ID, {
    user_id: userId,
  });
};

export const event = ({ action, category, label, value, params }: GTagEvent) => {
  if (window === undefined) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  });
};

const gtag = {
  pageView,
  event,
  identify,
};

export default gtag;
