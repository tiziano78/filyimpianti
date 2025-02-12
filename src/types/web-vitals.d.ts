declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: object) => void;
  }
}

export type WebVitalsName = 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';

export interface WebVitalsMetric {
  id: string;
  name: WebVitalsName;
  value: number;
  label: 'web-vital';
  rating?: 'good' | 'needs-improvement' | 'poor';
}

export interface PerformanceEntryWithExtras extends PerformanceEntry {
  hadRecentInput?: boolean;
  value?: number;
  processingStart?: number;
  duration?: number;
} 