interface ErrorMetadata {
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  componentStack: string | undefined;
  timestamp: string;
  [key: string]: any;
}

interface PerformanceMetrics {
  FCP: number;    // First Contentful Paint
  LCP: number;    // Largest Contentful Paint
  FID: number;    // First Input Delay
  CLS: number;    // Cumulative Layout Shift
  TTFB: number;   // Time to First Byte
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

/**
 * Sistema centralizzato di logging e monitoraggio
 */
export const monitoring = {
  /**
   * Logga un errore con metadati aggiuntivi
   */
  logError: (message: string, metadata: ErrorMetadata): void => {
    console.error(`[Error] ${message}`, metadata);
  },

  /**
   * Traccia metriche di performance web vitals
   */
  trackPerformance: (metrics: PerformanceMetrics): void => {
    if (process.env.NODE_ENV === 'production') {
      console.info('[Performance] Web Vitals:', metrics);
    }
  },

  /**
   * Monitora le interazioni utente critiche
   */
  trackUserInteraction: (action: string, data?: Record<string, any>): void => {
    if (process.env.NODE_ENV === 'production') {
      console.info('[User Interaction]', action, data);
    }
  }
};

/**
 * Utility per monitorare le Web Vitals
 */
export function monitorWebVitals(): void {
  if (typeof window !== 'undefined') {
    // Monitora First Contentful Paint (FCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          monitoring.trackPerformance({
            FCP: entry.startTime,
            LCP: 0,
            FID: 0,
            CLS: 0,
            TTFB: 0
          });
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Monitora Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      monitoring.trackPerformance({
        FCP: 0,
        LCP: lastEntry.startTime,
        FID: 0,
        CLS: 0,
        TTFB: 0
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitora Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as LayoutShiftEntry[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      monitoring.trackPerformance({
        FCP: 0,
        LCP: 0,
        FID: 0,
        CLS: clsValue,
        TTFB: 0
      });
    }).observe({ entryTypes: ['layout-shift'] });

    // Monitora First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as FirstInputEntry[]) {
        monitoring.trackPerformance({
          FCP: 0,
          LCP: 0,
          FID: entry.processingStart - entry.startTime,
          CLS: 0,
          TTFB: 0
        });
      }
    }).observe({ entryTypes: ['first-input'] });
  }
}

export const logError = monitoring.logError;
export const trackPerformance = monitoring.trackPerformance;
export const trackUserInteraction = monitoring.trackUserInteraction; 