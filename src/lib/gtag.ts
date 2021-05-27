export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const gtagPageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gtagEvent = ({
  action,
  category,
  label,
  value,
  options,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
  options?: {
    non_interaction?: boolean;
  };
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...options,
  });
};
