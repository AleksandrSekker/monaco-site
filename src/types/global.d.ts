// Type definitions for gtag.js
interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: Record<string, any>[];
}

declare global {
  // This extends the global Window interface
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, any>[];
  }
}

// This makes the file a module
export {};
