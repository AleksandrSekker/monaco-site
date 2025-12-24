// Ensure window is defined
declare const window: Window & typeof globalThis;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagEventValue = string | number | boolean | null | undefined;

interface GtagEventParams {
  event_category: string;
  event_label: string;
  value?: number;
  [key: string]: GtagEventValue | GtagEventValue[] | { [key: string]: GtagEventValue } | undefined;
}

// Log page views
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventParams: GtagEventParams = {
      event_category: category,
      event_label: label,
    };

    if (value !== undefined) {
      eventParams.value = value;
    }

    window.gtag('event', action, eventParams);
  }
};
